import api from "../../plugins/api.js";
import { createProductCard, productBtnHandler } from "../../components/product_card.js";
import loader from "../../components/loader.js";
import { setActiveCategory } from "../../handlers/nav.js";

const article = document.querySelector('article')

window.addEventListener('focus', () => {
  const productsFromStorage = $localStorage.get('products').map(p => p.id)
  const pathname = location.pathname

  if (/^\/?(category)?\/?(\w+)?/.test(pathname)) {
    document.querySelectorAll('.product__card').forEach(product => {
      const product_cardBtn = product.querySelector('button')

      if (productsFromStorage.includes(Number(product.id.replace('product__card-', '')))) {
        product_cardBtn.classList.add('secondary')
        product_cardBtn.innerHTML = 'Убрать'
      } else {
        product_cardBtn.classList.remove('secondary')
        product_cardBtn.innerHTML = 'Добавить'
      }
    })
  }
})

function getProducts(query) {
  article.innerHTML = ''
  article.append(loader())

  api.get({query})
    .then(res => {
      if (res.length) {
        article.innerHTML = '<div class="wrap"></div>'
        let wrap = document.querySelector('.wrap')
        const productsFromStorage = $localStorage.get('products').map(p => p.id)

        res.forEach(product => {
          wrap.append(createProductCard(product))
          const product_cardBtn = wrap.querySelector(`#product__card-${product.id} button`)

          if (productsFromStorage.includes(product.id)) {
            product_cardBtn.classList.add('secondary')
            product_cardBtn.innerHTML = 'Убрать'
          }

          product_cardBtn.addEventListener('click', () => productBtnHandler(product, product_cardBtn))
        })
      } else {
        article.innerHTML = 'Список пуст'
      }
    })
}

export default function(params) {
  if (params?.category) {
    getProducts(`products/category/${params.category}`)
    setActiveCategory(params.category)
  } else {
    getProducts('products')
    setActiveCategory('all')
  }
}
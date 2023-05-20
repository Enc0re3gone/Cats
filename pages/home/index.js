import api from "../../plugins/api.js";
import product_card from "../../components/product_card.js";
import loader from "../../components/loader.js";
import { setActiveCategory } from "../../handlers/nav.js";

const article = document.querySelector('article')

export default function(params) {
  if (params?.category) {
    getProducts(`products/category/${params.category}`)
    setActiveCategory(params.category)
  } else {
    getProducts('products')
    setActiveCategory('all')
  }

  function setProductsForCart(product, action) {
    const products = $localStorage.get('products') || []

    if (action === 'add') {
      products.push(product)
    } else if (action === 'remove') {
      products.splice(products.findIndex(p => p.id === product.id), 1)
    }

    $localStorage.set('products', products)
    document.querySelector('header .cart').dataset.content = products.length > 9 ? '9+' : products.length
  }

  function productBtnHandler(product, btn) {
    btn.classList.toggle('secondary')
    if (btn.innerHTML === 'Добавить') {
      setProductsForCart(product, 'add')
      btn.innerHTML = 'Убрать'
    } else {
      btn.innerHTML = 'Добавить'
      setProductsForCart(product, 'remove')
    }
  }

  function getProducts(query) {
    article.innerHTML = ''
    article.append(loader())

    api.get({query})
      .then(res => {
        if (res.length) {
          article.innerHTML = '<div class="wrap"></div>'
          let wrap = document.querySelector('.wrap')

          const productsFromStorage = $localStorage.get('products')

          res.forEach(product => {
            wrap.append(product_card(product))
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
}
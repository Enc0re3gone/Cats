import api from "../../plugins/api.js";
import product_card from "../../components/product_card.js";
import loader from "../../components/loader.js";
import { setActiveCategory } from "../../handlers/nav.js";

const wrap = document.querySelector('article .wrap')

document.addEventListener('getProducts', (e) => getProducts(e.detail))

function setProductsForCart (id, action) {
  const products = $localStorage.get('products') || []

  if (action === 'add') {
    products.push(id)
  } else if (action === 'remove') {
    products.splice(products.findIndex(product => product === id), 1)
  }

  $localStorage.set('products', products)
  document.querySelector('header .cart').dataset.content = products.length > 9 ? '9+' : products.length
}

function productBtnHandler (id, btn) {
  btn.classList.toggle('secondary')
  if (btn.innerHTML === 'Добавить') {
    setProductsForCart(id, 'add')
    btn.innerHTML = 'Убрать'
  } else {
    btn.innerHTML = 'Добавить'
    setProductsForCart(id, 'remove')
  }
}

async function getProducts(query) {
  wrap.innerHTML = ''
  wrap.append(loader())

 await api.get({query})
    .then(res => {
      if (res.length) {
        document.querySelector('.wrap').innerHTML = ''

        const productsFromStorage = $localStorage.get('products')

        res.forEach(product => {
          wrap.append(product_card(product))
          const product_cardBtn = wrap.querySelector(`#product__card-${product.id} button`)

          if (productsFromStorage.includes(product.id)) {
            product_cardBtn.classList.add('secondary')
            product_cardBtn.innerHTML = 'Убрать'
          }

          product_cardBtn.addEventListener('click', () => productBtnHandler(product.id, product_cardBtn))
        })
      } else {
        wrap.innerHTML = 'Список пуст'
      }
    })
}

if (location?.params?.category) {
  document.addEventListener('preload-removed', () => setActiveCategory(location.params.category))
  getProducts(`products/category/${location.params.category}`)
} else {
  getProducts('products')
}
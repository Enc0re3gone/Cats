import loader from "../../components/loader.js";
import { createCart } from "../../components/cart.js";
import { createProductCard, productBtnHandler } from "../../components/product_card.js";

const article = document.querySelector('article')

window.addEventListener('focus', () => {
  if (location.pathname === '/cart') {
    renderCart($localStorage.get('products'))
  }
})

function renderCart (product_list) {
  article.innerHTML = ''
  article.append(createCart())

  const wrap = document.querySelector('.cart__product_list')

  product_list.forEach(product => {
    wrap.append(createProductCard(product))
    const btn = wrap.querySelector(`#product__card-${product.id} button`)

    btn.classList.add('secondary')
    btn.innerHTML = 'Убрать'

    btn.addEventListener('click', () => productBtnHandler(product, btn))
  })

  document.querySelector('.cart__order button').addEventListener('click', () => {
    $localStorage.set('products', [])
  })
}

export default function () {
  article.innerHTML = ''
  article.append(loader())

  const product_list = $localStorage.get('products')

  if (product_list.length) {
    renderCart(product_list)
  } else {
    article.innerHTML = 'Список пуст'
  }
}

import stringToHtml from "../plugins/stringToHtml.js"

function setProductsForCart(product, action) {
  const products = $localStorage.get('products') || []

  if (action === 'add') {
    products.push(product)
  } else if (action === 'remove') {
    products.splice(products.findIndex(p => p.id === product.id), 1)
  }

  $localStorage.set('products', products)
  document.querySelector('header .icon-cart').dataset.content = products.length > 9 ? '9+' : products.length
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

const createProductCard = ({ id, title, price, category, description, image }) => stringToHtml(`
<div class="product__card" id="product__card-${id}">
  <a href="/product/${id}" class="product__card-image">
    <img src="${image}">
  </a>
  <div class="product__card-body">
    <h3><a href="/product/${id}">${title}</a></h3>
    <p>${description}</p>
    <div class="product__card-body-price">
      <button>Добавить</button>
      <h3>${price} руб.</h3>  
    </div>
  </div>
</div>
`)


export { createProductCard, productBtnHandler }
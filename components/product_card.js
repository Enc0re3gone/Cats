import stringToHtml from "../plugins/stringToHtml.js"

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


export default createProductCard
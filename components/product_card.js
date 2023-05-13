import stringToHtml from "../plugins/stringToHtml.js"

const createProductCard = ({ id, title, price, category, description, image }) => stringToHtml(`
<a class="product__card" id="product__card-${id}" href="/product/${id}">
  <div class="product__card-image">
    <img src="${image}">
  </div>
  <div class="product__card-body">
    <h3>${title}</h3>
    <p>${description}</p>
    <div class="product__card-body-price">
      <h3>${price} руб.</h3>  
    </div>
  </div>
</a>
`)


export default createProductCard
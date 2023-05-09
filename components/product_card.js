import stringToHtml from "../plugins/stringToHtml.js"

const createProductCard = ({ id, title, price, category, description, image }) => stringToHtml(`
<div class="product_card" id="product_card-${id}">
  <div class="product_card-image">
    <img src="${image}">
  </div>
  <div class="product_card-body">
    <h3>${title}</h3>
    <p>${description}</p>
    <div class="product_card-body-price">
      <h3>${price} руб.</h3>  
    </div>
  </div>
</div>
`)


export default createProductCard
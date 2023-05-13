import stringToHtml from "../plugins/stringToHtml.js"

export function createProduct ({ id, title, price, category, description, image, rating }) {
  return stringToHtml(`
    <div class="product" data-id="${id}" data-category="${category}">
      <div class="product__image">
        <img src="${image}">
      </div>
      <div class="product__info">
        <h1>${title}</h1>

        <div class="product__info-rating">
          <span id="rating-count">${rating.rate}</span> 
          <span class="star" style="--rating: 0">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        </div>

        <p>${description}</p>

        <h3 class="product__info-price">${price} руб.</h3>
      </div>
    </div>
  `)
}
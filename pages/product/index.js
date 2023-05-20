import api from "../../plugins/api.js";
import loader from "../../components/loader.js";
import { createProduct } from "../../components/product.js";
import { createBreadcrumbs } from "../../components/breadcrumbs.js";

const article = document.querySelector('article')

export default function({id}) {
  article.innerHTML = '';
  article.append(loader())

  api.get({query: `products/${id}`}).then(product => {
    if (product.id) {
      article.innerHTML = '<div class="product__wrap"></div>';
      let product__wrap = document.querySelector('.product__wrap')
      product__wrap.append(createBreadcrumbs([product.category, product.title]))

      product__wrap.append(createProduct(product))

      let rating = 0
      let star = document.querySelector('.star')
      const timeout = 300 / (product.rating.rate * 10)

      let rateInterval = setInterval(() => {
        if (rating < product.rating.rate) {
          rating = Number((rating + 0.1).toFixed(1))
          star.style = `--rating: ${rating}`
        } else {
          clearInterval(rateInterval)
        }
      }, timeout)
    }
  })
}
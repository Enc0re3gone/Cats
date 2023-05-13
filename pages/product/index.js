import api from "../../plugins/api.js";
import loader from "../../components/loader.js";
import { createProduct } from "../../components/product.js";

const wrap = document.querySelector('main article .wrap')

async function getProductById(id) {
  wrap.innerHTML = '';
  wrap.append(loader())

  await api.get({query: `products/${id}`}).then(product => {
    if (product.id) {
      wrap.innerHTML = '';
      wrap.append(createProduct(product))

      let rating = 0
      let star = document.querySelector('.star')
      const timeout = 300 / (product.rating.rate * 10)

      document.addEventListener('preload-removed', () => {
        let rateInterval = setInterval(() => {
          if (rating < product.rating.rate) {
            rating = Number((rating + 0.1).toFixed(1))
            star.style = `--rating: ${rating}`
          } else {
            clearInterval(rateInterval)
          }
        }, timeout)
      })
    }
  })
}

getProductById(location.params.id)
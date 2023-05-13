import api from "../../plugins/api.js";
import product_card from "../../components/product_card.js";
import loader from "../../components/loader.js";

const wrap = document.querySelector('article .wrap')

document.addEventListener('getProducts', (e) => getProducts(e.detail))

async function getProducts(query) {
  wrap.innerHTML = ''
  wrap.append(loader())

 await api.get({query})
    .then(res => {
      if (res.length) {
        document.querySelector('.wrap').innerHTML = ''

        res.forEach(product => {
          wrap.append(product_card(product))
        })
      } else {
        wrap.innerHTML = 'Список пуст'
      }
    })
}

getProducts('products')
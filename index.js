import api from "./plugins/api.js";
import stringToHtml from "./plugins/stringToHtml.js";
import product_card from "./components/product_card.js";
import loader from "./components/loader.js";
import initNav from "./handlers/nav.js"

const wrap = document.querySelector('article .wrap')

window.addEventListener("load", async () => {
  const loader = document.querySelector('.loader')
  await getCategories();
  getProducts('products')

  setTimeout(() => {
    loader.classList.add('hide')
    setTimeout(() => {
      document.body.classList.remove('scroll-off');
      loader.remove()
    }, 350)
  }, 2000)
});

async function getCategories() {
  const navElm = document.querySelector('nav ul')
  await api.get({query:'products/categories'})
    .then(res => {
      navElm.append(stringToHtml(`<li class="active">All</li>`))

      if (res.length) {
        res.forEach(cat => {
          navElm.append(stringToHtml(`<li>${cat.charAt(0).toUpperCase() + cat.slice(1)}</li>`))
        })

        initNav();
      } else {
        wrap.innerHTML = 'Список пуст'
      }
    })
}

function getProducts(query) {
  wrap.innerHTML = ''
  wrap.append(loader())

  api.get({query})
    .then(res => {
      if (res.length) {
        document.querySelector('.wrap').innerHTML = ''

        res.forEach(product => {
          wrap.append(product_card(product))
        })
      } else if (query === 'products' && !res.length) {
        getProducts('products')
      } else {
        wrap.innerHTML = 'Список пуст'
      }
    })
}


//Category change handler
document.addEventListener('change_category', data => {
  const category = data.detail.toLowerCase();
  if (!category) return void 0;

  document.querySelectorAll('aside nav ul li').forEach(cat => {
    if (cat.innerHTML.toLowerCase() !== category) {
      cat.classList.remove('active')
    } else {
      cat.classList.add('active')
    }
  })

  if (category === 'all') {
    getProducts('products')
  } else {
    getProducts(`products/category/${category}`)
  }
})


import api from "./plugins/api.js";
import stringToHtml from "./plugins/stringToHtml.js";
import { addCategoryChangeHandler, setActiveCategory } from "./handlers/nav.js"
import { router } from "./router.js";
import { localStorage } from "./plugins/storage.js";

window.$localStorage = localStorage

const observer = new MutationObserver(mutations => {
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href')
    if (href) {
      link.onclick = event => {
        event.preventDefault()
        router.go(href)
      }
    }
  })
})

observer.observe(document.body, {
  childList: true,
  subtree: true
})

router.dispatch(location.pathname)

window.addEventListener("load", async () => {
  const loader = document.querySelector('.loader')
  await getCategories()

  setTimeout(() => {
    loader.classList.add('hide')
    setTimeout(() => {
      document.body.classList.remove('scroll-off');
      loader.remove()

      if ($localStorage.get('products').length) {
        document.querySelector('header .cart').dataset.content = $localStorage.get('products').length
      }

      document.dispatchEvent(new CustomEvent('preload-removed'))
    }, 350)
  }, 2000)
});

async function getCategories() {
  const navElm = document.querySelector('nav ul')
  await api.get({query:'products/categories'})
    .then(res => {
      navElm.append(stringToHtml(`<li class="active" id="all"><a href="/">All</a></li>`))

      if (res.length) {
        res.forEach(cat => {
          navElm.append(stringToHtml(`<li id="${cat}"><a href="/${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</a></li>`))
        })

        addCategoryChangeHandler()
      }
    })
    .catch(e => console.error(e.message))
}

//Category change handler
document.addEventListener('change_category', data => {
  const category = data.detail.toLowerCase();
  if (!category) return void 0;

  setActiveCategory(category)

  document.dispatchEvent(new CustomEvent('getProducts', {
    detail: category === 'all' ? 'products' : `products/category/${category}`
  }))
})


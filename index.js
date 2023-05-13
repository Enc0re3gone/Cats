import api from "./plugins/api.js";
import stringToHtml from "./plugins/stringToHtml.js";
import initNav from "./handlers/nav.js"
import { router } from "./router.js";

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
      document.dispatchEvent(new CustomEvent('preload-removed'))
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
      }
    })
    .catch(e => console.error(e.message))
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

  document.dispatchEvent(new CustomEvent('getProducts', {
    detail: category === 'all' ? 'products' : `products/category/${category}`
  }))
})


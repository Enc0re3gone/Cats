import routes from "./routes.json" assert { type: "json" };
import api from "./plugins/api.js";
import stringToHtml from "./plugins/stringToHtml.js";
import { router } from "./router.js";
import { localStorage } from "./plugins/storage.js";

window.$localStorage = localStorage

window.addEventListener("load", async () => {
  await getCategories()

  for (let route in routes) {
    let controller = await import(routes[route].controller)
    router.add(route, controller.default)
  }

  router.dispatch(location.pathname)
});

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

async function getCategories() {
  const navElm = document.querySelector('nav ul')
  await api.get({query:'products/categories'})
    .then(res => {
      navElm.append(stringToHtml(`<li class="active" id="all"><a href="/">All</a></li>`))

      if (res.length) {
        res.forEach(cat => {
          navElm.append(stringToHtml(`<li id="${cat}"><a href="/${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</a></li>`))
        })
      }
    })
    .catch(e => console.error(e.message))
}


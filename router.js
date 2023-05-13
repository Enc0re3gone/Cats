import routes from "./routes.json" assert { type: "json" };

function createScript (route, path) {
  const script = document.createElement('script')
  script.async = true
  script.dataset.path = path
  script.src = `${route.controller}`
  script.type = 'module'

  return script;
}

function findScript (path) {
  document.head.querySelectorAll('script')
    .forEach(script => {
      if (script.dataset.path === path) {
        return true
      }
    })
  return false
}

export const router = {
  go: (uri) => {
    history.pushState(null, "", uri)
    router.dispatch(uri)
  },
  dispatch: (uri) => {
    for (let route in routes) {
      const matched = uri.match(route.replace(/:([^\/]+)/g, "(?<$1>[^\\/]+)"))
      if (matched && matched[0] === matched.input) {
        if (!findScript(route)) {
          document.head.append(createScript(routes[route], route))
          location.params = matched.groups;
        }
        break;
      }
    }
  }
}
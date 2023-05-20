class Router {
  routes = []

  add(route, cb) {
    this.routes[route.replace(/:([^\/]+)/g, "(?<$1>[^\\/]+)")] = [cb, {}]
  }

  go(uri) {
    history.pushState(null, "", uri)
    this.dispatch(uri)
  }

  dispatch(uri) {
    for (let route in this.routes) {
      const matched = uri.match(route)

      if (matched && matched[0] === matched.input) {
        let params = this.routes[route][1];

        if (matched.groups) {
          for (let param in matched.groups) {
            params[param] = matched.groups[param]
          }
        }

        this.routes[route][0](params)
      }
    }
  }
}

export const router = new Router()
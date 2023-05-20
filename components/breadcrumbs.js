import stringToHtml from "../plugins/stringToHtml.js"

export function createBreadcrumbs (crumbs) {
  let crumbsEl = ''

  if (crumbs.length) {
    crumbs.forEach((crumb, i) => {
      crumbsEl += `${crumbs.length - 1 > i ? `<a href="/${crumb}">${crumb}</a> <span>/</span> ` : `<a>${crumb}</a>`}`
    })
  }

  return stringToHtml(`
    <div class="breadcrumbs">
      <a href="/">Home</a> <span>/</span> ${crumbsEl}
    </div>`)
}
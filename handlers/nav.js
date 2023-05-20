function setActiveCategory(category) {
  document.querySelectorAll('aside nav ul li').forEach(cat => {
    if (cat.id.toLowerCase() !== (category.search('%20') !== -1 ? category.replace('$20', ' ') : category)) {
      cat.classList.remove('active')
    } else {
      cat.classList.add('active')
    }
  })
}

export { setActiveCategory }
function addCategoryChangeHandler () {
  document.querySelectorAll('aside nav ul li').forEach(li => {
    li.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('change_category', {detail: li.id}))
    })
  })
}

function setActiveCategory(category) {
  document.querySelectorAll('aside nav ul li').forEach(cat => {
    if (cat.id.toLowerCase() !== category.replace('%20', ' ')) {
      cat.classList.remove('active')
    } else {
      cat.classList.add('active')
    }
  })
}

export { addCategoryChangeHandler, setActiveCategory }
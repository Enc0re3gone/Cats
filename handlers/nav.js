export default function() {
  document.querySelectorAll('aside nav ul li').forEach(li => {
    li.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('change_category', {detail: li.innerHTML}))
    })
  })
}
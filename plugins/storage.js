export const localStorage = {
  get: (value) => {
    let localStorage = window.localStorage.getItem(value)
    return JSON.parse(localStorage)
  },
  set: (item, value) => {
    value = JSON.stringify(value)
    console.log(value)
    window.localStorage.setItem(item, value)
  }
}
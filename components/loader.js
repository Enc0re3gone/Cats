import stringToHtml from "../plugins/stringToHtml.js";

function createLoader() {
  return stringToHtml(`
    <div class="loader loader_list">
      <span>E-Shop</span>
    </div>
  `)
}

export default createLoader
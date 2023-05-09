export default function (html) {
  let div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstChild;
}
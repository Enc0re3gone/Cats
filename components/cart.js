import stringToHtml from "../plugins/stringToHtml.js";

export function createCart() {
  const products = $localStorage.get('products')

  return stringToHtml(`
    <div class="cart">
      <div class="cart__product_list wrap"></div>

      <div class="cart__order">
        <h2>Ваш Заказ</h2>
    
        <div class="cart__order-items">
          ${products.reduce((acc, cur) => acc += `
            <div class="cart__order-item">
              <div class="cart__order-item-title">${cur.title}</div>
              <div class="cart__order-item-price">${cur.price} руб.</div>
            </div>
          `, '')}
        </div>
    
        <h3>Всего: ${products.reduce((acc, cur) => acc += cur.price, 0).toFixed(2)} руб.</h3>
        
        <button>Оформить</button>
      </div>
    </div>
  `)
}
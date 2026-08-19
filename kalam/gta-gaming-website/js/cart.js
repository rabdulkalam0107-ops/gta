// Simple cart implementation using localStorage
const CART_KEY = 'gta_demo_cart_v1';
function loadCart(){try{return JSON.parse(localStorage.getItem(CART_KEY))||{items:{}}}catch(e){return {items:{}}}}
function saveCart(cart){localStorage.setItem(CART_KEY,JSON.stringify(cart)); updateCartCount();}

function addToCartById(id,qty=1){
  const game = window.GAMES?.find(g=>g.id===id);
  if(!game) return;
  const cart = loadCart();
  if(cart.items[id]) cart.items[id].qty += qty; else cart.items[id] = {id,qty,price:game.price,title:game.title};
  saveCart(cart);
}

function updateCartCount(){const cart=loadCart(); const count = Object.values(cart.items).reduce((s,i)=>s+i.qty,0); document.getElementById('cart-count') && (document.getElementById('cart-count').textContent = count);}

function renderCartRoot(){const root = document.getElementById('cart-root'); if(!root) return; const cart = loadCart(); if(Object.keys(cart.items).length===0){root.innerHTML='<p>Your cart is empty.</p>'; return}
  let html = `<table class='cart-table' style='width:100%'><thead><tr><th>Game</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr></thead><tbody>`;
  let total=0; Object.values(cart.items).forEach(it=>{const sub = it.price*it.qty; total+=sub; html+=`<tr data-id='${it.id}'><td>${it.title}</td><td>$${it.price.toFixed(2)}</td><td><input class='qty' type='number' min='1' value='${it.qty}' style='width:64px;padding:6px'></td><td>$${sub.toFixed(2)}</td><td><button class='btn btn-danger remove'>Remove</button></td></tr>`});
  html += `</tbody></table><div style='text-align:right;margin-top:12px'><strong>Total: $${total.toFixed(2)}</strong></div>`;
  root.innerHTML = html;
  root.querySelectorAll('.qty').forEach(inp=>{inp.addEventListener('change',e=>{const tr = e.target.closest('tr'); const id = tr.dataset.id; const q = parseInt(e.target.value)||1; const cart = loadCart(); cart.items[id].qty = q; saveCart(cart); renderCartRoot();})});
  root.querySelectorAll('.remove').forEach(b=>b.addEventListener('click',e=>{const id = e.target.closest('tr').dataset.id; const cart = loadCart(); delete cart.items[id]; saveCart(cart); renderCartRoot();}));
}

document.addEventListener('DOMContentLoaded',()=>{
  updateCartCount();
  // when on cart page
  if(document.getElementById('cart-root')){
    renderCartRoot();
    document.getElementById('clear-cart').addEventListener('click',()=>{localStorage.removeItem(CART_KEY); renderCartRoot(); updateCartCount();});
  }
});

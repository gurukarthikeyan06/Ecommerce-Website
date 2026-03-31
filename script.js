let products = [
  {id:1, name:"Laptop", price:50000, category:"electronics"},
  {id:2, name:"Phone", price:20000, category:"electronics"},
  {id:3, name:"T-Shirt", price:500, category:"fashion"},
  {id:4, name:"Shoes", price:2000, category:"fashion"},
];

let cart = [];

// Display Products
function displayProducts(list) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="product bg-white p-4 shadow">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})"
          class="bg-blue-500 text-white px-2 py-1 mt-2">
          Add to Cart
        </button>
      </div>
    `;
  });
}

displayProducts(products);

// Add to Cart
function addToCart(id) {
  let item = cart.find(p => p.id === id);

  if(item) {
    item.qty++;
  } else {
    let product = products.find(p => p.id === id);
    cart.push({...product, qty:1});
  }

  updateCart();
}

// Update Cart
function updateCart() {
  let cartItems = document.getElementById("cartItems");
  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="mb-2">
        ${item.name} x ${item.qty}
      </div>
    `;
  });

  document.getElementById("total").innerText = total;
  document.getElementById("cartCount").innerText = cart.length;
}

// Toggle Cart
function toggleCart() {
  document.getElementById("cart").classList.toggle("hidden");
}

// Filter
function filterCategory(cat) {
  if(cat === "all") displayProducts(products);
  else displayProducts(products.filter(p => p.category === cat));
}

// Search
document.getElementById("search").addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();
  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  displayProducts(filtered);
});
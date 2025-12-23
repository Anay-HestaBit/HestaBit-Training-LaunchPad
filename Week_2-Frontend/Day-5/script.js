const productGrid = document.getElementById('productGrid');
const sortSelect = document.getElementById('sortSelect');
const searchInput = document.getElementById('searchInput');

let products = [];
let searchQuery = '';

fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    products = data.products;
    applyFilters();
  });

function renderProducts(list) {
  productGrid.innerHTML = '';

  list.forEach((product) => {
    const badge =
      product.stock === 0 ? 'out' : product.price < 50 ? 'sale' : 'new';

    const badgeText =
      badge === 'out' ? 'OUT OF STOCK' : badge === 'sale' ? 'SALE' : 'NEW';

    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <span class="badge ${badge}">${badgeText}</span>
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="product-info">
        <h4>${product.title}</h4>
        <div class="stars">★★★★★</div>
        <div class="price">$${product.price}</div>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

sortSelect.addEventListener('change', applyFilters);

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase();
  applyFilters();
});

function applyFilters() {
  let filtered = [...products];

  if (searchQuery) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(searchQuery)
    );
  }

  if (sortSelect.value === 'high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortSelect.value === 'low') {
    filtered.sort((a, b) => a.price - b.price);
  }

  renderProducts(filtered);
}

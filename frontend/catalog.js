const CATALOG_URL = '../products.json';

const imageMap = {
  "Bread (loaf)": "Bread.jpeg",
  "Matches (box)": "box matches.jpeg",
  "Palm Oil 5L": "palm oil 5L.jpeg",
  "Beans (White)": "white beans.jpeg",
  "Plantain (bunch)": "plantain.jpeg",
  "Beans (Red)": "red beans.jpeg",
  "Maggi Cubes (pack)": "pack maggi.jpeg",
  "Tomato Paste (tin)": "tin tomatoes.jpeg",
  "Soap (bar)": "bar soap.jpeg",
  "Onions 1kg": "onion.jpeg",
  "Vegetable Oil 5L": "Vegetable Oil 5L.jpeg",
  "Salt 1kg": "salt 1 kg.jpeg",
  "Cassava (bag)": "cassava(bag).jpeg",
  "Sugar 1kg": "sugar 1kg.jpeg",
  "Rice 25kg": "rice 25kg.jpeg",
  "Rice 50kg": "rice 50kg.jpeg",
  "Detergent 1kg": "detergent 1kg.jpeg",
  "Palm Oil 1L": "palm oil 1L.jpeg",
  "Milk Powder 400g": "milk powder.jpeg",
  "Tomatoes 1kg": "tomato.jpeg"
};

async function loadCatalog() {
  const grid = document.getElementById('catalog-grid');
  const errorMsg = document.getElementById('catalog-error');

  try {
    const response = await fetch(CATALOG_URL);
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const products = await response.json();
    renderProducts(products, grid);
  } catch (err) {
    console.error('Failed to load catalog:', err);
    errorMsg.hidden = false;
  }
}

function renderProducts(products, container) {
  if (!products || products.length === 0) {
    container.innerHTML = '<p>No products available right now.</p>';
    return;
  }
  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

function getImagePath(productName) {
  const filename = imageMap[productName];
  if (!filename) {
    return `https://placehold.co/300x200?text=${encodeURIComponent(productName)}`;
  }
  return `assets/${encodeURIComponent(filename)}`;
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';

  const img = document.createElement('img');
  img.src = getImagePath(product.name);
  img.alt = product.name;
  img.className = 'product-image';
  img.onerror = function() {
    this.src = 'https://placehold.co/300x200?text=' + encodeURIComponent(product.name);
  };

  const name = document.createElement('h3');
  name.textContent = product.name;

  const category = document.createElement('p');
  category.className = 'product-category';
  category.textContent = product.category;

  const price = document.createElement('p');
  price.className = 'product-price';
  price.textContent = `${product.price.toLocaleString()} XAF`;

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(category);
  card.appendChild(price);

  return card;
}

document.addEventListener('DOMContentLoaded', loadCatalog);
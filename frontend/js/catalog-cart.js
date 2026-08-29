// Adds an "Add to Cart" button to each product card once catalog.js has
// rendered them. Depends on cart.js being loaded first, and on the
// 'catalog:rendered' event already dispatched from catalog.js.

document.addEventListener('catalog:rendered', (event) => {
  const products = event.detail.products || [];
  const cards = document.querySelectorAll('#catalog-grid .product-card');

  cards.forEach(card => {
    const productName = card.dataset.name
      ? products.find(p => p.name.toLowerCase() === card.dataset.name)?.name
      : card.querySelector('h3')?.textContent;

    const product = products.find(p => p.name === productName);
    if (!product) return;

    const imgEl = card.querySelector('.product-image');
    const productWithImage = { ...product, image: imgEl ? imgEl.src : '' };

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-add-cart';
    btn.textContent = 'Add to Cart';

    btn.addEventListener('click', () => {
      addToCart(productWithImage);
      btn.textContent = 'Added ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.disabled = false;
      }, 1000);
    });

    card.appendChild(btn);
  });
});

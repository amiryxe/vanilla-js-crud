let products = getSavedProducts();

const filters = {
  searchItem: '',
  existProducts: false,
  sortBy: 'byEdited',
};

const ul = document.createElement('ul');
document.querySelector('.container').appendChild(ul);

// Show Exist Products
document.querySelector('#existCheck').addEventListener('change', (e) => {
  filters.existProducts = e.target.checked;
  renderProducts(products, filters);
});

// Add Product
document.querySelector('#addProductForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const timestamp = moment().valueOf();

  if (e.target.elements.addProductTitle.value && e.target.elements.addProductPrice.value) {
    if (!isNaN(e.target.elements.addProductPrice.value)) {
      products.push({
        id: uuidv4(),
        title: e.target.elements.addProductTitle.value,
        price: e.target.elements.addProductPrice.value,
        exist: true,
        created: timestamp,
        updated: timestamp,
      });

      e.target.elements.addProductTitle.value = '';
      e.target.elements.addProductPrice.value = '';

      renderProducts(products, filters);
    } else {
      alert('Please enter a valid price');
    }
  } else {
    alert("Please enter title and price")
  }
});

// Search Product
document.querySelector('#searchText').addEventListener('input', (e) => {
  filters.searchItem = e.target.value;
  renderProducts(products, filters);
});

renderProducts(products, filters);

// Live Change
window.addEventListener('storage', (e) => {
  if (e.key === 'products') {
    products = JSON.parse(e.newValue);

    renderProducts(products, filters);
  }
});

// Sort Select
document.querySelector('#sort').addEventListener('change', (e) => {
  filters.sortBy = e.target.value;
  renderProducts(products, filters);
});

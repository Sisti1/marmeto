const URL = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"

// Function to fetch JSON data
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonData = await response.json(); // Parse JSON response
    return jsonData; // Return the parsed JSON data
  } catch (error) {
    console.log('The error is inside the Fetch DATA FUNCTION');
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error or handle it as needed
  }
}



async function displayData(data,selectedCategory) {
  if(selectedCategory==undefined){
    selectedCategory="Men"
  }
  const dataListElement = document.getElementById('dataList');
  dataListElement.innerHTML='';

  // Iterate over each category in the 'categories' array
  
  await data.categories.forEach(category => {

    if (!selectedCategory || category.category_name === selectedCategory) {
    // Create a container for cards of this category
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    // Create a heading element for the category
    const categoryHeader = document.createElement('h2');
    categoryHeader.textContent = category.category_name;

    // Append the category header to the category container
    // categoryContainer.appendChild(categoryHeader);

    // Iterate over each product in the 'category_products' array of the current category
    category.category_products.forEach(product => {
      // Create card elements for each product
      const card = document.createElement('div');
      card.classList.add('card');

      // Create card image div
      const cardImage = document.createElement('div');
      cardImage.classList.add('card-image');
      const image = document.createElement('img');

      image.src = product.image;
      image.alt = product.title;
      cardImage.appendChild(image);

      // Create overlay div
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      // Apply styles to position the overlay on the top left corner
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';

      const overlayText = document.createElement('div');
      overlayText.classList.add('overlay-text');
      overlayText.textContent = product.badge_text || '';
      overlay.appendChild(overlayText);
      cardImage.appendChild(overlay);

      // Append card image to card
      card.appendChild(cardImage);

      // Create card details div
      const cardDetails = document.createElement('div');
      cardDetails.classList.add('card-details');
      const title = document.createElement('h3');
      // Create spans for the title and vendor separately
      const titleElement = document.createElement('span');
      titleElement.textContent = `${product.title} • `;
      titleElement.classList.add('first')
      title.appendChild(titleElement);
      
      // Create h6 element for the vendor
      const vendor = document.createElement('span');
      vendor.textContent = product.vendor;
      vendor.classList.add('second')
      title.appendChild(vendor);
      const price = document.createElement('div');
      price.classList.add('price');
      const discountedPrice = document.createElement('span');
      discountedPrice.classList.add('discounted-price');
      discountedPrice.textContent = `₹${product.price}`;
      const originalPrice = document.createElement('span');
      originalPrice.classList.add('original-price');
      originalPrice.textContent = `₹${product.compare_at_price}`;
      const discount = document.createElement('span');
      discount.classList.add('discount');
      discount.textContent = `${Math.floor(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}% Off`;

      
      const addToCartBtn = document.createElement('button');
      addToCartBtn.classList.add('add-to-cart');
      addToCartBtn.textContent = 'Add to Cart';
      const space = document.createElement('div');
      space.classList.add('space')
      // Append elements to card details
      price.appendChild(discountedPrice);
      price.appendChild(originalPrice);
      price.appendChild(discount);
      cardDetails.appendChild(title);
      cardDetails.appendChild(price);
      cardDetails.appendChild(space);
      cardDetails.appendChild(addToCartBtn);

      // Append card details to card
      card.appendChild(cardDetails);

      // Append card to category container
      categoryContainer.appendChild(card);
    });

    // Append the category container to the data list element
    dataListElement.appendChild(categoryContainer);
  }})};


async function main() {
  let data;

  try {
    data = await fetchData(URL);
    displayData(data); // Display all data initially
  } catch (error) {
    console.error('Error:', error);
  }

  const toggleBtns = document.querySelectorAll('.toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedCategory = btn.getAttribute('data-category');
      console.log(selectedCategory);
      // Remove active class from all buttons
      toggleBtns.forEach(btn => btn.classList.remove('active'));

      // Add active class to the clicked button
      btn.classList.add('active');

      // Display data for the selected category
      displayData(data, selectedCategory);
    });
  });
}
main()
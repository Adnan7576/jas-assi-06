// DOM Elements
const categoryList = document.getElementById("category-list");
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

// State
let cart = [];
let activeCategory = null;

// Show Loading Spinner
function showLoading(parent) {
  parent.innerHTML = `
    <div class="flex justify-center items-center py-10">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  `;// DOM Elements
const categoryList = document.getElementById("category-list");
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

const modal = document.getElementById("tree-modal");
const modalName = document.getElementById("modal-tree-name");
const modalImage = document.getElementById("modal-tree-image");
const modalDesc = document.getElementById("modal-tree-desc");
const modalCategory = document.getElementById("modal-tree-category");
const modalPrice = document.getElementById("modal-tree-price");

// State
let cart = [];
let activeCategory = null;

// Show Loading Spinner
function showLoading(parent) {
  parent.innerHTML = `
    <div class="flex justify-center items-center py-10">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  `;
}

// Fetch Categories
async function loadCategories() {
  showLoading(categoryList);
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    const categories = data.categories;

    categoryList.innerHTML = "";

    // All Trees button
    const allLi = document.createElement("li");
    allLi.innerHTML = `
      <button data-id="all" class="btn btn-sm w-full text-left ${activeCategory === null ? 'bg-green-800 text-white' : 'bg-green-200 text-green-800'}">
        All Trees
      </button>
    `;
    allLi.querySelector("button").addEventListener("click", () => {
      activeCategory = null;
      setActiveCategory();
      loadTreesByCategory();
    });
    categoryList.appendChild(allLi);

    // Other categories
    categories.forEach(category => {
      const li = document.createElement("li");
      li.innerHTML = `
        <button data-id="${category.id}" class="btn btn-sm w-full text-left ${category.id === activeCategory ? 'bg-green-800 text-white' : 'bg-green-200 text-green-800'}">
          ${category.category_name}
        </button>
      `;
      li.querySelector("button").addEventListener("click", () => {
        activeCategory = category.id;
        setActiveCategory();
        loadTreesByCategory(category.id);
      });
      categoryList.appendChild(li);
    });
  } catch (err) {
    categoryList.innerHTML = `<p class="text-red-500">Failed to load categories.</p>`;
    console.error(err);
  }
}

// Set Active Category
function setActiveCategory() {
  document.querySelectorAll("#category-list button").forEach(btn => {
    if ((btn.dataset.id === "all" && activeCategory === null) || (btn.dataset.id == activeCategory)) {
      btn.classList.add("bg-green-800", "text-white");
      btn.classList.remove("bg-green-200", "text-green-800");
    } else {
      btn.classList.remove("bg-green-800", "text-white");
      btn.classList.add("bg-green-200", "text-green-800");
    }
  });
}

// Fetch Trees
async function loadTreesByCategory(categoryId = null) {
  showLoading(productList);
  try {
    let url = categoryId === null ? "https://openapi.programming-hero.com/api/plants" 
                                  : `https://openapi.programming-hero.com/api/category/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    const trees = data.plants;
    productList.innerHTML = "";

    trees.forEach(tree => {
      const card = document.createElement("div");
      card.className = "card w-full bg-base-100 shadow-sm";

      card.innerHTML = `
        <figure>
          <img src="${tree.image}" alt="${tree.name}" class="h-56 w-full object-cover cursor-pointer"/>
        </figure>
        <div class="px-6 py-4">
          <h2 class="card-title cursor-pointer text-green-800">${tree.name}</h2>
          <p>${tree.description ? tree.description.slice(0, 60) : ""}...</p>
          <div class="flex justify-between items-center mt-2">
            <button class="btn btn-sm bg-green-200 text-green-800 rounded-full">${tree.category || "Unknown"}</button>
            <p class="text-lg font-bold">৳${tree.price || 100}</p>
          </div>
          <div class="card-actions justify-end mt-3">
            <button class="btn rounded-full text-white bg-green-800 w-full">Add to Cart</button>
          </div>
        </div>
      `;

      // Add to cart
      card.querySelector(".card-actions button").addEventListener("click", () => addToCart(tree));

      // Show modal on name click
      card.querySelector(".card-title").addEventListener("click", () => {
        modalName.textContent = tree.name;
        modalImage.src = tree.image;
        modalDesc.textContent = tree.description || "No description available.";
        modalCategory.textContent = tree.category || "Unknown";
        modalPrice.textContent = tree.price || 100;
        modal.checked = true;
      });

      productList.appendChild(card);
    });
  } catch (err) {
    productList.innerHTML = `<p class="text-red-500">Failed to load trees.</p>`;
    console.error(err);
  }
}

// Add Tree to Cart
function addToCart(tree) {
  cart.push(tree);
  renderCart();
}

// Remove Tree from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Render Cart
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="text-gray-500 text-sm">No products added yet.</p>`;
  }

  cart.forEach((tree, index) => {
    total += Number(tree.price) || 100;
    const div = document.createElement("div");
    div.className = "flex justify-between items-center bg-green-100 p-2 rounded";
    div.innerHTML = `
      <span>${tree.name}</span>
      <button class="text-red-500 font-bold">❌</button>
    `;
    div.querySelector("button").addEventListener("click", () => removeFromCart(index));
    cartItems.appendChild(div);
  });

  totalPriceElement.innerText = `${total}৳`;
}

// Handle Donation Form
document.getElementById("donation-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("donor-name").value;
  const email = document.getElementById("donor-email").value;
  const count = document.getElementById("tree-count").value;

  if (!name || !email || !count) {
    alert("Please fill all fields!");
    return;
  }

  alert(`Thank you ${name} for donating ${count} tree(s)!`);
  e.target.reset();
});

// Initialize
loadCategories();
loadTreesByCategory();

}

// Fetch Categories
async function loadCategories() {
  showLoading(categoryList);
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    const categories = data.categories;

    categoryList.innerHTML = "";

    // Add "All Trees" button at the tops
    const allLi = document.createElement("li");
    allLi.innerHTML = `
      <button data-id="all" class="btn btn-sm w-full text-left ${activeCategory === null ? 'bg-green-800 text-white' : 'bg-green-200 text-green-800'}">
        All Trees
      </button>
    `;
    allLi.querySelector("button").addEventListener("click", () => {
      activeCategory = null; // null means all trees
      setActiveCategory();
      loadTreesByCategory(); // no categoryId loads all
    });
    categoryList.appendChild(allLi);

    // Add other categories
    categories.forEach(category => {
      const li = document.createElement("li");
      li.innerHTML = `
        <button data-id="${category.id}" class="btn btn-sm w-full text-left ${category.id === activeCategory ? 'bg-green-800 text-white' : 'bg-green-200 text-green-800'}">
          ${category.category_name}
        </button>
      `;
      li.querySelector("button").addEventListener("click", () => {
        activeCategory = category.id;
        setActiveCategory();
        loadTreesByCategory(category.id);
      });
      categoryList.appendChild(li);
    });
  } catch (err) {
    categoryList.innerHTML = `<p class="text-red-500">Failed to load categories.</p>`;
    console.error(err);
  }
}

// 🌿 Set Active Category Highlight
function setActiveCategory() {
  document.querySelectorAll("#category-list button").forEach(btn => {
    if ((btn.dataset.id === "all" && activeCategory === null) || (btn.dataset.id == activeCategory)) {
      btn.classList.add("bg-green-800", "text-white");
      btn.classList.remove("bg-green-200", "text-green-800");
    } else {
      btn.classList.remove("bg-green-800", "text-white");
      btn.classList.add("bg-green-200", "text-green-800");
    }
  });
}

// Fetch All Trees or By Category
async function loadTreesByCategory(categoryId = null) {
  showLoading(productList);
  try {
    let url;
    if (categoryId === null) {
      url = "https://openapi.programming-hero.com/api/plants"; // all plants
    } else {
      url = `https://openapi.programming-hero.com/api/category/${categoryId}`; // category-specific
    }

    const res = await fetch(url);
    const data = await res.json();

    // Use correct array depending on response
    const trees = data.plants;

    productList.innerHTML = "";

    trees.forEach(tree => {
      const card = document.createElement("div");
      card.className = "card w-full bg-base-100 shadow-sm";

      card.innerHTML = `
        <figure>
          <img src="${tree.image}" alt="${tree.name}" class="h-56 w-full object-cover cursor-pointer"/>
        </figure>
        <div class="px-6 py-4">
          <h2 class="card-title cursor-pointer text-green-800">${tree.name}</h2>
          <p>${tree.description ? tree.description.slice(0, 60) : ""}...</p>
          <div class="flex justify-between items-center mt-2">
            <button class="btn btn-sm bg-green-200 text-green-800 rounded-full">${tree.category || "Unknown"}</button>
            <p class="text-lg font-bold">৳${tree.price || 100}</p>
          </div>
          <div class="card-actions justify-end mt-3">
            <button class="btn rounded-full text-white bg-green-800 w-full">Add to Cart</button>
          </div>
        </div>
      `;

      card.querySelector(".card-actions button").addEventListener("click", () => addToCart(tree));

      productList.appendChild(card);
    });

  } catch (err) {
    productList.innerHTML = `<p class="text-red-500">Failed to load trees.</p>`;
    console.error(err);
  }
}



// 🌿 Add Tree to Cart
function addToCart(tree) {
  cart.push(tree);
  renderCart();
}

// 🌿 Remove Tree from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// 🌿 Render Cart
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="text-gray-500 text-sm">No products added yet.</p>`;
  }

  cart.forEach((tree, index) => {
    total += Number(tree.price) || 100;
    const div = document.createElement("div");
    div.className = "flex justify-between items-center bg-green-100 p-2 rounded";
    div.innerHTML = `
      <span>${tree.name}</span>
      <button class="text-red-500 font-bold">❌</button>
    `;
    div.querySelector("button").addEventListener("click", () => removeFromCart(index));
    cartItems.appendChild(div);
  });

  totalPriceElement.innerText = `${total}৳`;
}

// 🌿 Initialize
loadCategories();
loadTreesByCategory();

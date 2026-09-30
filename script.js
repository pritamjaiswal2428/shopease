// ==========================================
// PRODUCT DATA
// ==========================================

const products = [

    {
        id: 1,
        name: "Relaxed Cotton T-Shirt",
        category: "Clothing",
        price: 29,
        rating: "★★★★★",
        tag: "Bestseller",
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 2,
        name: "Minimal Runner Sneakers",
        category: "Shoes",
        price: 79,
        rating: "★★★★★",
        tag: "Popular",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 3,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 129,
        rating: "★★★★☆",
        tag: "New",
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 4,
        name: "Everyday Leather Bag",
        category: "Accessories",
        price: 89,
        rating: "★★★★★",
        tag: "Editor's Pick",
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 5,
        name: "Classic Denim Jacket",
        category: "Clothing",
        price: 94,
        rating: "★★★★☆",
        tag: "",
        image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 6,
        name: "Smart Watch Pro",
        category: "Electronics",
        price: 159,
        rating: "★★★★★",
        tag: "New",
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 7,
        name: "Canvas Low Top Shoes",
        category: "Shoes",
        price: 59,
        rating: "★★★★☆",
        tag: "",
        image:
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 8,
        name: "Classic Sunglasses",
        category: "Accessories",
        price: 45,
        rating: "★★★★★",
        tag: "",
        image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
    }

];


// ==========================================
// VARIABLES
// ==========================================

let currentFilter = "All";
let cart = [];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");

const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts() {

    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            currentFilter === "All" ||
            product.category === currentFilter;

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;
    });


    if (filteredProducts.length === 0) {

        productGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }


    productGrid.innerHTML = filteredProducts.map(product => {

        return `
            <article class="product-card">

                <div class="product-image">

                    ${
                        product.tag
                            ? `<span class="product-tag">
                                ${product.tag}
                               </span>`
                            : ""
                    }

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                </div>


                <div class="product-info">

                    <div class="product-category">
                        ${product.category}
                    </div>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="rating">
                        ${product.rating}
                    </div>


                    <div class="product-bottom">

                        <span class="price">
                            $${product.price.toFixed(2)}
                        </span>

                        <button
                            class="add-btn"
                            onclick="addToCart(${product.id})"
                            aria-label="Add ${product.name} to cart"
                        >
                            +
                        </button>

                    </div>

                </div>

            </article>
        `;

    }).join("");
}


// ==========================================
// FILTER PRODUCTS
// ==========================================

const filterButtons =
    document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter =
            button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayProducts();

    });

});


// ==========================================
// CATEGORY CARDS
// ==========================================

const categoryCards =
    document.querySelectorAll(".category-card");

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        currentFilter =
            card.dataset.category;

        filterButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === currentFilter
            );

        });

        displayProducts();

        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    displayProducts
);


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {

    const product =
        products.find(
            product => product.id === productId
        );

    if (!product) {
        return;
    }

    cart.push(product);

    updateCart();

    showToast(
        `${product.name} added to cart!`
    );
}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    cartCount.textContent =
        cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some products to get started.</p>
            </div>
        `;

    } else {

        cartItems.innerHTML =
            cart.map((product, index) => {

                return `
                    <div class="cart-item">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                        <div>

                            <h4>
                                ${product.name}
                            </h4>

                            <p>
                                $${product.price.toFixed(2)}
                            </p>

                        </div>

                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${index})"
                        >
                            Remove
                        </button>

                    </div>
                `;

            }).join("");
    }


    const total =
        cart.reduce(
            (sum, product) =>
                sum + product.price,
            0
        );

    cartTotal.textContent =
        `$${total.toFixed(2)}`;
}


// ==========================================
// OPEN CART
// ==========================================

document
    .getElementById("cartBtn")
    .addEventListener("click", () => {

        cartOverlay.classList.add("active");

        document.body.style.overflow =
            "hidden";

    });


// ==========================================
// CLOSE CART
// ==========================================

document
    .getElementById("closeCart")
    .addEventListener("click", closeCart);


cartOverlay.addEventListener(
    "click",
    event => {

        if (event.target === cartOverlay) {
            closeCart();
        }

    }
);


function closeCart() {

    cartOverlay.classList.remove("active");

    document.body.style.overflow =
        "";

}


// ==========================================
// CHECKOUT
// ==========================================

document
    .getElementById("checkoutBtn")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            showToast(
                "Your cart is empty."
            );

            return;
        }

        showToast(
            "Demo checkout — connect your payment gateway here."
        );

    });


// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


menuBtn.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle("active");

    }
);


// Close mobile menu after clicking a link

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove(
                    "active"
                );

            }
        );

    });


// ==========================================
// SEARCH BUTTON
// ==========================================

document
    .getElementById("searchBtn")
    .addEventListener("click", () => {

        searchInput.focus();

        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


// ==========================================
// CONTACT FORM
// ==========================================

document
    .getElementById("contactForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            event.target.reset();

            showToast(
                "Thanks! Your message has been sent."
            );

        }
    );


// ==========================================
// TOAST MESSAGE
// ==========================================

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ==========================================
// INITIALIZE WEBSITE
// ==========================================

displayProducts();

updateCart();

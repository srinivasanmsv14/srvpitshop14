/* ================= CART ================= */

let cart = [];


/* ADD PRODUCT */

function addToCart(name, price, image) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    updateCart();

    openCart();

}


/* UPDATE CART */

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(product => {

        totalItems += product.quantity;

        totalPrice +=
            product.price * product.quantity;

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        "₹" + totalPrice.toLocaleString("en-IN");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((product, index) => {

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <div class="cart-item-image">
                ${product.image}
            </div>

            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <div class="quantity">

                    <button onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-button"
                onclick="removeFromCart(${index})">
                ✕
            </button>
        `;

        cartItems.appendChild(item);

    });

}


/* CHANGE QUANTITY */

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}


/* REMOVE PRODUCT */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* OPEN CART */

function openCart() {

    document
        .getElementById("cart-sidebar")
        .classList.add("active");

    document
        .getElementById("cart-overlay")
        .classList.add("active");

}


/* CLOSE CART */

function closeCart() {

    document
        .getElementById("cart-sidebar")
        .classList.remove("active");

    document
        .getElementById("cart-overlay")
        .classList.remove("active");

}


/* ================= CATEGORY FILTER ================= */

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


/* ================= SORT ================= */

function sortProducts() {

    const select =
        document.getElementById("sort-products");

    const value = select.value;

    const container =
        document.getElementById("products-grid");

    const products =
        Array.from(
            container.querySelectorAll(".product-card")
        );


    if (value === "low") {

        products.sort(
            (a, b) =>
                Number(a.dataset.price) -
                Number(b.dataset.price)
        );

    }


    if (value === "high") {

        products.sort(
            (a, b) =>
                Number(b.dataset.price) -
                Number(a.dataset.price)
        );

    }


    products.forEach(product => {

        container.appendChild(product);

    });

}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    alert(
        "Thank you for shopping at PITSHOP! 🏍️\n\n" +
        "Checkout system can be connected here."
    );

}
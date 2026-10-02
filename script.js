let cart = [];


// ================= ADD TO CART =================

function addToCart(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    openCart();
}


// ================= UPDATE CART =================

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Votre panier est vide.
            </p>
        `;

    }


    let total = 0;
    let count = 0;


    cart.forEach((product, index) => {

        total += product.price * product.quantity;

        count += product.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <h4>${product.name}</h4>

                    <small>
                        ${product.price} DH
                    </small>

                </div>


                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>


                <button
                    class="remove"
                    onclick="removeFromCart(${index})"
                >
                    🗑️
                </button>

            </div>

        `;

    });


    cartCount.textContent = count;

    cartTotal.textContent = total + " DH";
}


// ================= QUANTITY =================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();
}


// ================= REMOVE =================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// ================= OPEN CART =================

function openCart() {

    document
        .getElementById("cart-overlay")
        .classList.add("active");
}


// ================= CLOSE CART =================

function closeCart() {

    document
        .getElementById("cart-overlay")
        .classList.remove("active");
}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        alert("Votre panier est vide.");

        return;
    }


    let message = "Bonjour, je souhaite commander :%0A%0A";

    let total = 0;


    cart.forEach(product => {

        message +=
            "- " +
            product.name +
            " x" +
            product.quantity +
            " = " +
            (product.price * product.quantity) +
            " DH%0A";

        total += product.price * product.quantity;

    });


    message +=
        "%0ATotal : " +
        total +
        " DH";


    // Remplace ce numéro par ton numéro WhatsApp

    const phone = "0713564912";


    window.open(
        "https://wa.me/" +
        phone +
        "?text=" +
        message,
        "_blank"
    );
}


// ================= ORDER FORM =================

document
    .getElementById("order-form")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;

        const phone =
            document.getElementById("phone").value;

        const product =
            document.getElementById("product").value;

        const message =
            document.getElementById("message").value;


        alert(
            "Merci " +
            name +
            " ! Votre demande concernant " +
            product +
            " a été enregistrée."
        );


        this.reset();

    });
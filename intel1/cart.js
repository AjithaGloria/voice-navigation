document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let clearCartButton = document.getElementById("clear-cart");

    function displayCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item, index) => {
                let itemElement = document.createElement("div");
                itemElement.innerHTML = `
                    <p>${item.name} - $${item.price} <button class="remove-item" data-index="${index}">Remove</button></p>
                `;
                cartContainer.appendChild(itemElement);
                total += parseFloat(item.price);
            });
        }

        cartTotal.textContent = total.toFixed(2);
        document.getElementById("cart-count").textContent = cart.length;
    }

    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            let index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        }
    });

    clearCartButton.addEventListener("click", function () {
        localStorage.removeItem("cart");
        cart = [];
        displayCart();
    });

    displayCart();
});

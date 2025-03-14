document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let productElement = this.closest(".product");
            let name = productElement.getAttribute("data-name");
            let price = productElement.getAttribute("data-price");

            let product = { name, price };
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(`${name} added to cart!`);
        });
    });

    function updateCartCount() {
        document.getElementById("cart-count").textContent = cart.length;
    }
});

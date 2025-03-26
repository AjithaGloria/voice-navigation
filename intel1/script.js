document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let productElement = this.closest(".product");
            let name = productElement.getAttribute("data-name");
            let price = parseFloat(productElement.getAttribute("data-price"));
            let image = productElement.getAttribute("data-image");

            if (!name || isNaN(price)) {
                alert("Invalid product details. Please try again.");
                return;
            }

            let existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(`${name} added to cart!`);
        });
    });

    function updateCartCount() {
        let cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }
    window.onload = function () {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Your browser doesn't support voice recognition. Try using Google Chrome.");
            return;
        }
    
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
    
        recognition.onresult = function (event) {
            let transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log("Recognized:", transcript);
            handleVoiceCommand(transcript);
        };
    
        function handleVoiceCommand(command) {
            if (command.includes("go to cart")) {
                window.location.href = "cart.html";
            } else if (command.includes("go to clothing")) {
                document.getElementById("clothing").scrollIntoView({ behavior: "smooth" });
            } else if (command.includes("go to accessories")) {
                document.getElementById("accessories").scrollIntoView({ behavior: "smooth" });
            } else if (command.includes("go to slippers")) {
                document.getElementById("slippers").scrollIntoView({ behavior: "smooth" });
            } else if (command.includes("go to home appliances")) {
                document.getElementById("appliances").scrollIntoView({ behavior: "smooth" });
            } else if (command.includes("go back home")) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                speak("Sorry, I didn't understand that.");
            }
        }
    
        function speak(text) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = "en-US";
            speech.rate = 1;
            speech.pitch = 1;
            window.speechSynthesis.speak(speech);
        }
    
        document.getElementById("voice-start").addEventListener("click", function () {
            recognition.start();
            speak("Voice control activated. You can navigate by speaking commands.");
        });
    };
});

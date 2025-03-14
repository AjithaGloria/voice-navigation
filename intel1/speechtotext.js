document.addEventListener("DOMContentLoaded", function() {
    console.log("Page Loaded! Script is running!");

    // Check if SpeechRecognition is available
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!window.SpeechRecognition) {
        console.error("Speech Recognition not supported in this browser.");
        alert("Speech Recognition is not supported in your browser. Try Chrome.");
        return;
    }

    // Initialize Speech Recognition
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    // Event when speech is recognized
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        console.log("Recognized Text:", transcript);
        document.getElementById("output").innerText = transcript;
    };

    // Handle errors
    recognition.onerror = function(event) {
        console.error("Speech recognition error:", event.error);
        alert("Error: " + event.error);
    };

    // Button click event
    document.getElementById("start-btn").addEventListener("click", () => {
        console.log("Button Clicked! Starting recognition...");
        recognition.start();
    });
});



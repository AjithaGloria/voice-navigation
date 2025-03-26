from flask import Flask, jsonify
import speech_recognition as sr
import nltk
from gtts import gTTS
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

nltk.download('punkt')

# Commands mapped to website sections
COMMANDS = {
    "go to home": "index.html",
    "open shop": "shop.html",
    "view cart": "cart.html",
    "go to profile": "profile.html",
}

def recognize_speech():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio).lower()
        print("Recognized:", text)
        return text
    except sr.UnknownValueError:
        return "I couldn't understand. Please try again."
    except sr.RequestError:
        return "Speech recognition service is unavailable."

def process_command(command):
    """Return page URL based on recognized command"""
    for key, value in COMMANDS.items():
        if key in command:
            return value
    return "not_found"

@app.route('/voice', methods=['GET'])
def voice_navigation():
    user_command = recognize_speech()
    response = process_command(user_command)

    return jsonify({"command": user_command, "response": response})

if __name__ == '__main__':
    app.run(debug=True)


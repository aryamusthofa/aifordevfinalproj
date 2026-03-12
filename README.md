# 0waste AI Assistant 🤖🍱

AI-powered customer service chatbot for a food waste e-commerce platform.

This project was developed as the **Final Project** of the **Maju Bareng AI (Wave 3)** program organized by **Hacktiv8** and supported by **Google.org**.

---

## About The Project

**0waste AI Assistant** is an intelligent web-based chatbot designed to help customers interact with a food waste marketplace.

The AI assistant provides:
- Information about available leftover meals
- Education about food waste and sustainability
- Guidance for ordering food (Delivery or Pick-Up)
- Friendly, empathetic, and context-aware responses

The chatbot uses **Google Gemini API** (`gemini-3-flash-preview`) integrated via an **Express.js API** backend, and comes with a modern, responsive web interface.

---

## Key Features

### 🤖 Web-based AI Customer Assistant
Helps customers interact with the food waste platform naturally through a beautifully designed web interface.

### 🌱 Environmental Education
Explains the impact of food waste and promotes sustainable consumption.

### 📦 Ordering Information
Guides users about available ordering methods:
- Delivery
- Self Pick-Up

### 💬 Empathetic & Context-Aware Responses
Configured with strict system instructions and conversation history mapping so the chatbot responds in a friendly tone without losing context.

### 🎨 Brand Awareness
The AI understands the brand identity (*tone of voice*) and the frontend matches the visual style (Dark Blue `#40407a`).

---

## Tech Stack

- **Node.js** — JavaScript runtime environment
- **Express.js** — Backend web framework
- **Google Gemini API** — AI model for natural language processing
- **HTML, CSS, Vanilla JS** — Frontend interface
- **dotenv** — Environment variable management

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/aryamusthofa/aifordevfinalproj.git
cd aifordevfinalproj
```

### 2. Install Dependencies

Since `node_modules` is included in the repository, you can skip this step, but to reinstall:
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add your API key.

Example:
```env
GEMINI_API_KEY="YOUR_API_KEY_HERE"
MODEL="gemini-3-flash-preview"
```
You can obtain the API key from: [Google AI Studio](https://aistudio.google.com/)

### 4. How to Run

Run the application backend server using:

```bash
node index.js
```

Once the server is running, open your web browser and navigate to:
```text
http://localhost:3001
```

You can now interact with the 0waste AI Assistant via the web interface.

---

## Target Users

- **Customers:** People who want to purchase quality food at discounted prices while helping the environment.
- **Restaurant Partners:** Restaurants or hotels that want to reduce daily food waste.

---

## Author

**Arya Musthofa Roja**

Final Project — Maju Bareng AI  
Hacktiv8 x Google.org  

**Instructor:**  
Arrizal Rahmat Kurniawan (Batch 5)

---

## Screenshots & Demo

Here is a visual overview of the 0waste AI Assistant web application UI and its empathetic conversational capabilities:

<details>
<summary><b>Click to view screenshots</b></summary>
<br>

<div align="center">
  <img src="assets-markdownreadme/Screenshot%20(1285).png" width="800" alt="Chat UI - Truncation Error">
  <br><br>
  <img src="assets-markdownreadme/Screenshot%20(1287).png" width="800" alt="VS Code Terminal - Backend API Testing">
  <br><br>
  <img src="assets-markdownreadme/Screenshot%20(1289).png" width="800" alt="GitHub Repository Overview">
  <br><br>
  <img src="assets-markdownreadme/Screenshot%20(1290).png" width="800" alt="Chat UI - Successful Long Response">
</div>

</details>

---

## Project Structure

```text
aifordevfinalproj
│
├── public/                 # Frontend Web Interface
│   ├── index.html          # Main HTML layout
│   ├── script.js           # Client-side chat logic
│   └── style.css           # UI Styling
│
├── index.js                # Express API Backend & Gemini setup
├── package.json            # Project dependencies & scripts
├── test.js                 # Local test script
└── README.md               # Project documentation
```

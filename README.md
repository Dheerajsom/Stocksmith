# Stocksmith 📈

## 🌟 Key Features

* **Stock Search:** Instantly search for any stock by its ticker symbol.
* **Detailed Stock Data:** Access key metrics including real-time price, day high/low, volume, market cap, and more.
* **Interactive Charts:** Visualize historical stock performance with dynamic and responsive charts.
* **Earnings Calendar:** Keep track of upcoming corporate earnings announcements.
* **Watchlist:** Save stocks to a personal watchlist for easy monitoring (using browser `localStorage`).
* **Responsive Design:** Fully functional on desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack & APIs

This project is built using modern web technologies and is powered by external financial data APIs.

### Frontend:
* **HTML5**
* **CSS3** (with potential for frameworks like Bootstrap or Tailwind CSS)
* **JavaScript (ES6+)**: For DOM manipulation, user interactions, and API calls.
* **Charting Library**: [Chart.js](https://www.chartjs.org/) or [TradingView Lightweight Charts](https://www.tradingview.com/lightweight-charts/)

### Backend & Deployment:
* **Netlify:** Hosting platform for the live site.
* **Netlify Functions:** Serverless functions (written in Node.js) to securely handle API requests and protect secret keys.

### Data Sources:
* **Financial Data API:** [Financial Modeling Prep](https://site.financialmodelingprep.com/) / [Alpha Vantage](https://www.alphavantage.co/) / [Finnhub](https://finnhub.io/) *(Choose and specify the one you are using)*
* **Earnings Calendar API:** Sourced from the primary financial data provider.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Git](https://git-scm.com/) installed on your machine.
* [Node.js](https://nodejs.org/) (which includes npm) installed. This is required for running the Netlify CLI.
* A code editor like [Visual Studio Code](https://code.visualstudio.com/).
* A free account with a financial data provider (e.g., Alpha Vantage) to get an API key.

### Installation & Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[YOUR_GITHUB_USERNAME]/stocksmith.git
    cd stocksmith
    ```

2.  **Install the Netlify CLI:**
    This will allow you to run the serverless functions locally.
    ```bash
    npm install netlify-cli -g
    ```

3.  **Create an environment variables file:**
    Serverless functions need your secret API key. Create a file named `.env` in the root of your project. **This file is included in `.gitignore` and should never be committed to GitHub.**
    ```
    # .env file
    API_KEY=[YOUR_SECRET_API_KEY_HERE]
    ```

4.  **Update the Serverless Function:**
    Ensure your serverless function (e.g., `netlify/functions/getStockData.js`) is configured to use this environment variable:
    ```javascript
    // Example inside a Netlify function
    const apiKey = process.env.API_KEY;
    ```

5.  **Run the local development server:**
    Use the Netlify CLI to serve your `public` folder and run your functions locally.
    ```bash
    netlify dev
    ```
    This will start a local server, typically at `http://localhost:8888`. You can now view and interact with the site in your browser.

---

## ⚙️ Configuration

The primary configuration file for deployment is `netlify.toml`. It tells Netlify how to build the site.

```toml
[build]
  # Folder with your static files (HTML, CSS, client-side JS)
  publish = "public"
  # Folder where your serverless functions are located
  functions = "netlify/functions"

# Redirect rule to make function endpoints cleaner
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
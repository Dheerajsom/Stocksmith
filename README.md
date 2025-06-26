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
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const stockForm = document.getElementById('stock-search-form');
    const tickerInput = document.getElementById('stock-ticker-input');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const stockResultDiv = document.getElementById('stock-result');

    // --- State Management Functions ---
    const showLoader = () => loader.classList.remove('hidden');
    const hideLoader = () => loader.classList.add('hidden');
    const showError = (message) => {
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
    };
    const hideError = () => errorMessage.classList.add('hidden');
    const hideResults = () => stockResultDiv.classList.add('hidden');
    const showResults = () => stockResultDiv.classList.remove('hidden');

    // --- Main Search Logic ---
    stockForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const ticker = tickerInput.value.trim().toUpperCase();
        if (!ticker) return;

        fetchAndDisplayStockData(ticker);
        tickerInput.value = ''; // Clear input after search
    });

    async function fetchAndDisplayStockData(ticker) {
        // Reset UI
        showLoader();
        hideError();
        hideResults();

        try {
            // NOTE: This now calls your Netlify serverless function
            const response = await fetch(`/api/getStockData?ticker=${ticker}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Check for API-specific error messages (e.g., from Alpha Vantage)
            if (data['Error Message']) {
                throw new Error('Invalid ticker symbol or API limit reached.');
            }
            if (Object.keys(data['Global Quote']).length === 0) {
                 throw new Error(`No data found for ticker: ${ticker}. Please check the symbol.`);
            }

            renderStockData(data);

        } catch (error) {
            console.error('Fetch error:', error);
            showError(error.message);
        } finally {
            hideLoader();
        }
    }

    // --- Rendering Functions ---
    function renderStockData(data) {
        const quote = data['Global Quote'];
        const companyName = quote['01. symbol']; // In a real scenario, you might fetch company name from another endpoint
        const ticker = quote['01. symbol'];
        const price = parseFloat(quote['05. price']).toFixed(2);
        const change = parseFloat(quote['09. change']).toFixed(2);
        const changePercent = parseFloat(quote['10. change percent'].replace('%', '')).toFixed(2);
        const high = parseFloat(quote['03. high']).toFixed(2);
        const low = parseFloat(quote['04. low']).toFixed(2);
        const volume = parseInt(quote['06. volume']).toLocaleString();

        const changeClass = change >= 0 ? 'positive-change' : 'negative-change';
        const changeSign = change >= 0 ? '+' : '';

        const stockHTML = `
            <div class="card">
                <div class="stock-header">
                    <h2>${companyName} <span>(${ticker})</span></h2>
                    </div>
                <div class="stock-data-grid">
                    <div class="data-card">
                        <h4>Price</h4>
                        <p>$${price}</p>
                    </div>
                    <div class="data-card">
                        <h4>Day Change</h4>
                        <p class="${changeClass}">${changeSign}$${change} (${changeSign}${changePercent}%)</p>
                    </div>
                    <div class="data-card">
                        <h4>Day High</h4>
                        <p>$${high}</p>
                    </div>
                    <div class="data-card">
                        <h4>Day Low</h4>
                        <p>$${low}</p>
                    </div>
                    <div class="data-card">
                        <h4>Volume</h4>
                        <p>${volume}</p>
                    </div>
                </div>
            </div>
        `;

        stockResultDiv.innerHTML = stockHTML;
        showResults();
    }

    // --- TODO: Watchlist Functions ---
    // 1. Create a function to add a ticker to localStorage.
    // 2. Create a function to remove a ticker from localStorage.
    // 3. Create a function to render the watchlist from localStorage on page load.
    // 4. Add event listeners to the "Add to Watchlist" and "Remove" buttons.
});
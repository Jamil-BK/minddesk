// =============================
// 🧰 MindDesk Tools JS
// =============================

// 🌤 Weather Tool
const weatherContainer = document.getElementById("weather-content");

// ✅ API Key
const weatherApiKey = OPENWEATHER_API_KEY;
const defaultCity = "Toronto";

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found.");
      }
      return response.json();
    })
    .then(data => {
      const weatherHTML = `
        <div class="card mx-auto shadow-sm" style="max-width: 400px;">
          <div class="card-body">
            <h5 class="card-title">${data.name}, ${data.sys.country}</h5>
            <p class="card-text">
              <strong>Temperature:</strong> ${data.main.temp}°C<br/>
              <strong>Condition:</strong> ${data.weather[0].description}<br/>
              <strong>Humidity:</strong> ${data.main.humidity}%<br/>
              <strong>Wind:</strong> ${data.wind.speed} km/h
            </p>
          </div>
        </div>
      `;
      weatherContainer.innerHTML = weatherHTML;
    })
    .catch(error => {
      weatherContainer.innerHTML = `<div class="alert alert-danger">⚠️ ${error.message}</div>`;
    });
}

fetchWeather(defaultCity);

// 💱 Currency Converter


// 💱 Currency Converter (Using frankfurter.app)
document.getElementById("currency-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const amount = document.getElementById("amount").value;
    const from = document.getElementById("from-currency").value;
    const to = document.getElementById("to-currency").value;
    const resultDiv = document.getElementById("currency-result");
  
    if (from === to) {
      resultDiv.innerText = `${amount} ${from} = ${amount} ${to}`;
      return;
    }
  
    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const converted = data.rates[to];
        resultDiv.innerHTML = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
      })
      .catch(error => {
        resultDiv.innerHTML = "Error fetching conversion.";
        console.error(error);
      });
  });
  


// Stocks Placeholder
// 📈 Finnhub Smart Stock Tracker
const stockForm = document.getElementById("stock-form");
const stockSymbolInput = document.getElementById("stock-symbol");
const stockResult = document.getElementById("stock-result");
const finnhubApiKey = "5858cc257e294c908053c1f..."; // Replace with full key

stockForm.addEventListener("submit", async () => {
  const query = stockSymbolInput.value.trim();
  if (!query) return;

  stockResult.innerHTML = "🔍 Searching...";

  try {
    const searchUrl = `https://finnhub.io/api/v1/search?q=${query}&token=${finnhubApiKey}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.result || searchData.result.length === 0) {
      stockResult.innerHTML = "❌ No matching stock found.";
      return;
    }

    // 🧠 Try to match input with name or symbol
    const match = searchData.result.find(item =>
      item.symbol.toLowerCase() === query.toLowerCase() ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    const selectedSymbol = match ? match.symbol : searchData.result[0].symbol;

    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${selectedSymbol}&token=${finnhubApiKey}`;
    const quoteRes = await fetch(quoteUrl);
    const quoteData = await quoteRes.json();

    if (quoteData.c) {
      stockResult.innerHTML = `💹 <strong>${selectedSymbol}</strong>: $${quoteData.c.toFixed(2)} (Live)`;
    } else {
      stockResult.innerHTML = "⚠️ Unable to fetch price.";
    }
  } catch (err) {
    console.error(err);
    stockResult.innerHTML = "❌ Error fetching stock data.";
  }
});

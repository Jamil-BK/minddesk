// =============================
// 🧰 MindDesk Tools JS
// =============================

// 🌤 Weather Tool
const weatherContainer = document.getElementById("weather-content");

// ✅ API Key
const weatherApiKey = "2acb7aaa608320a266ab9e93eac51581";
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
// Stock Tracker using Twelve Data's demo key
document.getElementById("stock-form").addEventListener("submit", function () {
    const symbol = document.getElementById("stock-symbol").value.toUpperCase();
    const resultDiv = document.getElementById("stock-result");
  
    resultDiv.innerText = "Fetching stock price...";
  
    const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=demo`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.price) {
          resultDiv.innerHTML = `💹 <strong>${symbol}</strong>: $${data.price}`;
        } else {
          resultDiv.innerHTML = `❌ Stock symbol not found or limit reached.`;
        }
      })
      .catch(err => {
        resultDiv.innerHTML = "❌ Error fetching stock data.";
        console.error(err);
      });
  });
  
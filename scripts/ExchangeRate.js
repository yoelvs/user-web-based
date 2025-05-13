// Populate currency dropdowns on page load
fetch('https://v6.exchangerate-api.com/v6/28d80ac21c82ae0f18de0c89/latest/USD')
  .then(response => response.json())
  .then(data => {
    if (data && data.conversion_rates) {
      const currencies = Object.keys(data.conversion_rates);
      currencies.sort(); 

      const fromSelect = document.getElementById("fromCurrency");
      const toSelect = document.getElementById("toCurrency");

      // Clear existing options
      fromSelect.innerHTML = '<option value="">Select a base currency</option>';
      toSelect.innerHTML = '<option value="">Select a target currency</option>';

      // Populate options
      currencies.forEach(currency => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.textContent = currency;
        toSelect.appendChild(optionTo);
      });

      // Default values (optional)
      // fromSelect.value = "USD";
      // toSelect.value = "EUR";

      updateFlags();
    }
  })
  .catch(err => console.error("Error fetching currencies: ", err));

// Update currency flags
function updateFlags() {
  const from = document.getElementById("fromCurrency").value.toLowerCase();
  const to = document.getElementById("toCurrency").value.toLowerCase();
  document.getElementById("fromFlag").className = `currency-flag currency-flag-${from}`;
  document.getElementById("toFlag").className = `currency-flag currency-flag-${to}`;
}

// Convert currency
async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const resultEl = document.getElementById("result");

  if (!amount || amount <= 0) {
    resultEl.innerText = "Please enter a valid amount.";
    resultEl.style.color = "red";
    return;
  }

  if (!from || !to) {
    resultEl.innerText = "Please select both currencies.";
    resultEl.style.color = "red";
    return;
  }

  const apiKey = "28d80ac21c82ae0f18de0c89";
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.result === "success") {
      const rate = data.conversion_rate;
      const converted = (amount * rate).toFixed(2);
      resultEl.innerText = `${amount} ${from} = ${converted} ${to}`;
      resultEl.style.color = "#333";
    } else {
      resultEl.innerText = "Failed to convert. Try again.";
      resultEl.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    resultEl.innerText = "Error connecting to the API.";
    resultEl.style.color = "red";
  }
}

document.getElementById("fromCurrency").addEventListener("change", updateFlags);
document.getElementById("toCurrency").addEventListener("change", updateFlags);

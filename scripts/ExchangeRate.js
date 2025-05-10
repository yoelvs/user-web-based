function updateFlags() {
  const from = document.getElementById("fromCurrency").value.toLowerCase();
  const to = document.getElementById("toCurrency").value.toLowerCase();
  document.getElementById("fromFlag").className = `currency-flag currency-flag-${from}`;
  document.getElementById("toFlag").className = `currency-flag currency-flag-${to}`;
}

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

  const apiKey = "28d80ac21c82ae0f18de0c89"; // ← Use your valid API key
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

// Set initial flags on page load
updateFlags();

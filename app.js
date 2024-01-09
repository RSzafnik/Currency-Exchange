document.addEventListener("DOMContentLoaded", function () {
  const currencyForm = document.querySelector("#currencyForm");
  const amountInput = document.querySelector("#amount");
  const currencySelect = document.querySelector("#currency");
  const convertedAmountDiv = document.querySelector("#convertedAmount");
  const loader = document.querySelector("#loader");
  const errorMessageDiv = document.querySelector("#error-message");

  currencyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    convertCurrency();
  });

  function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const selectedCurrency = currencySelect.value;

    if (isNaN(amount) || amount <= 0) {
      updateErrorMessage("Proszę wprowadzić poprawną kwotę.");
      return;
    }

    loader.style.display = "block";

    fetch(
      `https://api.nbp.pl/api/exchangerates/rates/a/${selectedCurrency}/?format=json`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd sieci lub odpowiedź API nie jest prawidłowa");
        }
        return response.json();
      })
      .then((data) => {
        if (
          !data.rates ||
          !data.rates.length ||
          typeof data.rates[0].mid !== "number"
        ) {
          throw new Error("Nieprawidłowe dane z API");
        }
        const rate = data.rates[0].mid;
        const convertedAmount = rate * amount;
        convertedAmountDiv.textContent = `Przeliczona kwota: ${convertedAmount.toFixed(
          2
        )} PLN`;
      })
      .catch((error) => {
        updateErrorMessage(error.message);
      })
      .finally(() => {
        loader.style.display = "none";
      });
  }

  function updateErrorMessage(message) {
    errorMessageDiv.textContent = message;
  }
});

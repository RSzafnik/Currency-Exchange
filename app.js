document.addEventListener("DOMContentLoaded", function () {
  function checkExchangeRate() {
    document.querySelector("#loader").style.display = "block";

    const selectedCurrency = document.querySelector("#currency").value;

    fetch(
      `https://api.nbp.pl/api/exchangerates/rates/a/${selectedCurrency}/?format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          const resultDiv = document.querySelector("#result");
          resultDiv.innerHTML = `${data.currency} (${data.code}): ${data.rates[0].mid}`;

          document.querySelector("#loader").style.display = "none";
        }, 2000);
      })
      .catch((error) => {
        console.error("Wystąpił błąd podczas pobierania kursu waluty", error);
        setTimeout(() => {
          document.querySelector("#loader").style.display = "none";
          document.querySelector("#result").innerHTML =
            "Wystąpił błąd podczas pobierania kursu waluty. Spróbuj ponownie później.";
        }, 2000);
      });
  }

  function convertToPLN() {
    const selectedCurrencyRate = parseFloat(
      document.querySelector("#result").textContent.split(": ")[1]
    );
    const amount = parseFloat(document.querySelector("#amount").value);

    if (!isNaN(selectedCurrencyRate) && !isNaN(amount)) {
      const convertedAmount = amount * selectedCurrencyRate;
      document.querySelector(
        "#convertedAmount"
      ).innerHTML = `Przeliczona kwota: ${convertedAmount.toFixed(2)} PLN`;
    } else {
      document.querySelector("#convertedAmount").innerHTML =
        "Proszę najpierw sprawdzić kurs i wprowadzić kwotę.";
    }
  }

  const checkRateButton = document.querySelector("#checkRateButton");
  checkRateButton.addEventListener("click", checkExchangeRate);

  const convertToPLNButton = document.querySelector("#convertToPLN");
  convertToPLNButton.addEventListener("click", convertToPLN);
});

const countryInput = document.querySelector("#country-input");
const firstOption = document.querySelector("#first-option");
countryInput.addEventListener("change", getCountryInfo);

window.addEventListener("load", getOptions);
function getOptions() {
  xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://api.covid19api.com/summary", true);
  xhttp.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      const allCountries = response.Countries;
      let output = "";
      for (var i in allCountries) {
        output += `
            <option>${allCountries[i].Country}</option>
            `;
      }
      countryInput.innerHTML = output;
    }
  };
  xhttp.send();
}

function getCountryInfo() {
  const selectedCountry = document.querySelector("#country-input").value;

  let totalConfirmedCasesText = document.querySelector("#cases");
  let totalRecoveriesText = document.querySelector("#recoveries");
  let totalDeathsText = document.querySelector("#deaths");

  //create XML obj and create request
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://api.covid19api.com/summary", true);

  xhttp.onload = function () {
    const allCovidData = JSON.parse(this.responseText);
    const countries = allCovidData.Countries;

    let cases = 0;
    let recovered = 0;
    let deaths = 0;

    if (this.status == 200) {
      for (var i in countries) {
        if (countries[i].Country == selectedCountry) {
          console.log("match");
          cases = countries[i].TotalConfirmed;
          recovered = countries[i].TotalRecovered;
          deaths = countries[i].TotalDeaths;
        }
      }
      // update the text
      totalConfirmedCasesText.innerHTML = cases;
      totalRecoveriesText.innerHTML = recovered;
      totalDeathsText.innerHTML = deaths;
    }
  };
  //   send request
  xhttp.send();
}

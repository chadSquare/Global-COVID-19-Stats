const countryInput = document.querySelector("#country-input");
let allCountries;
window.addEventListener("load", getObj);

//create XML obj and creat the xml request
function getObj() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://api.covid19api.com/summary", true);
  xhttp.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      allCountries = response.Countries;
    }

    //get the country names for the selection options
    function listCountries() {
      let output = `<option  value="" disabled selected>Select a country to display</option>`;
      for (i in allCountries) {
        output += `<option>${allCountries[i].Country}</option>`;
      }
      countryInput.innerHTML = output;
    }
    listCountries();

    function showData() {
      const selectedCountry = document.querySelector("#country-input").value;

      let totalConfirmedCasesText = document.querySelector("#cases");
      let totalRecoveriesText = document.querySelector("#recoveries");
      let totalDeathsText = document.querySelector("#deaths");

      let cases = 0;
      let recovered = 0;
      let deaths = 0;

      for (i in allCountries) {
        if (allCountries[i].Country == selectedCountry) {
          cases = allCountries[i].TotalConfirmed;
          recovered = allCountries[i].TotalRecovered;
          deaths = allCountries[i].TotalDeaths;
        }
      }
      // update the text
      totalConfirmedCasesText.innerHTML = cases;
      totalRecoveriesText.innerHTML = recovered;
      totalDeathsText.innerHTML = deaths;

      //start of chart
      //if another chart exists, delete that chart then create a new chart
      if (window.chart != undefined) {
        window.chart.destroy();
      }
      const ctx = document.getElementById("myChart").getContext("2d");
      window.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Total Confirmed Cases", "Total Recoveries", "Total Deaths"],
          datasets: [
            {
              label: "My First dataset",
              backgroundColor: ["#204051", "#32e0c4", "#84a9ac"],
              borderColor: "#fff8b5",
              //use the data from the XML obj
              data: [cases, recovered, deaths],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1,
          legend: {
            display: true,
            position: "top",
            align: "center",
            fontSize: 20,
            fontColor: "green",
          },
        },
      });
      // end of chart
    }
    // run the show data func everytime the use chooses new option
    countryInput.addEventListener("change", showData);
  };

  xhttp.send();
}

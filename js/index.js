var patientName = document.getElementById("patientname");
var patientDOB = document.getElementById("patientdob");
var patientGender = document.getElementById("patientgender");
var patientContact = document.getElementById("patientcontact");
var weightValue = [];
var weightDate = [];
var heightValue = [];
var heightDate = [];

// fatching the resource
FHIR.oauth2.ready(onReady, onError);

function onReady(smart) {
  console.log(smart);
  if (smart.hasOwnProperty("patient")) {
    var patientPromise = smart.patient.read();
    var encounterPromise = smart.encounter.read();
    var patientData = Promise.resolve(patientPromise);
    patientData.then(
      (results) => {
        // setting the patient information
        patientName.innerText =
          "Patient Name: " +
          results.name[0].given[0] +
          " " +
          results.name[0].family;
        patientGender.innerText = "Gender: " + results.gender;
        patientDOB.innerText = "DOB: " + results.birthDate;
        patientContact.innerText = "Contact: " + results.telecom[0].value;

        // Fetching the patient's height data.
        var query = new URLSearchParams();
        query.set("_sort:desc", "date");
        query.set("code", "5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

        // Calling the EndPoint
        smart.patient
          .request("Observation?" + query, {
            pageLimit: 0,
            flat: true,
          })
          .then((res) => {
            res.forEach((entry) => {
              heightDate.push(entry.effectiveDateTime.substring(0, 10));
              heightValue.push(entry.valueQuantity.value);
            });

            setHeightGraph(heightValue, heightDate);
          });

        // Fetching the patient's weight
        query = new URLSearchParams();
        query.set("code", "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

        smart.patient
          .request("Observation?" + query, {
            pageLimit: 0,
            flat: true,
          })
          .then((res) => {
            res.forEach((entry) => {
              weightDate.push(entry.effectiveDateTime.substring(0, 10));
              weightValue.push(entry.valueQuantity.value);
            });

            setWeightGraph(weightValue, weightDate);
          });
      },
      () => {
        console.log("Failed to fatch the patient resource");
      }
    );

    // fetching the Encounter resource
    var encounterData = Promise.resolve(encounterPromise);
    encounterData.then(
      (results) => {
        console.log(results);
      },
      () => {
        console.log("Failed to fatch the encounter resource");
      }
    );
  }
}

function onError() {
  console.error;
}

function setHeightGraph(value, date) {
  var ctx = document.getElementById("patientheight").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Height",
          data: value,
          borderWidth: 2,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.3,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function setWeightGraph(value, date) {
  var ctx = document.getElementById("patientweight").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Weight",
          data: value,
          borderWidth: 2,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.3,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

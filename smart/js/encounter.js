var ctx = document.getElementById("patientweight").getContext("2d");
var patientName = document.getElementById("patientname");
var patientDOB = document.getElementById("patientdob");
var patientGender = document.getElementById("patientgender");
var patientContact = document.getElementById("patientcontact");

// fatching the resource
FHIR.oauth2.ready(onReady, onError);

var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "weight of the patient",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
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

var ctx = document.getElementById("patientheight").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "height of the patient",
        data: [1, 19, 2, 8, 14, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
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

function onReady(smart) {
  if (smart.hasOwnProperty("patient")) {
    var patientPromise = smart.patient.read();
    var encounterPromise = smart.encounter.read();
    var patientData = Promise.resolve(patientPromise);
    patientData.then(
      (results) => {
        console.log(results);
        // setting the patient information

        console.log(results.name[0].given[0]);
        patientName.innerText =
          "Patient Name: " +
          results.name[0].given[0] +
          " " +
          results.name[0].family;
        patientGender.innerText = "Gender: " + results.gender;
        patientDOB.innerText = "DOB:" + results.birthDate;
        patientContact.innerText = "Contact: " + results.telecom[0].value;
      },
      () => {
        console.log("Failed to fatch the patient resource");
      }
    );

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

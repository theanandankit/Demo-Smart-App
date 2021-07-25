var ctx = document.getElementById("patientweight").getContext("2d");
var name = document.getAnimations("patientname");
var dob = document.getAnimations("patientdob");
var gender = document.getAnimations("patientgender");
var contact = document.getAnimations("patientcontact");

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
    var patient = Promise.resolve(patientPromise);
    patient.then(
      (results) => {
        console.log(results);
      },
      () => {
        console.log("failed");
      }
    );

    var encounter = Promise.resolve(encounterPromise);
    encounter.then(
      (result) => {
        console.log(result);
      },
      () => {}
    );
  }
}

function onError() {
  console.error;
}

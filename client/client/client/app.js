const activitiesCO2 = {
  car: 2.3,
  meat: 5.0,
  electricity: 1.5
};

let logs = JSON.parse(localStorage.getItem("logs")) || [];

function addActivity() {
  const act = document.getElementById("activity").value;
  const qty = Number(document.getElementById("quantity").value);

  const emission = qty * activitiesCO2[act];

  logs.push({ act, qty, emission });

  localStorage.setItem("logs", JSON.stringify(logs));

  updateUI();
}

function updateUI() {
  let total = logs.reduce((sum, l) => sum + l.emission, 0);
  document.getElementById("total").innerText = total.toFixed(2);

  let categories = { car:0, meat:0, electricity:0 };

  logs.forEach(l => categories[l.act] += l.emission);

  new Chart(document.getElementById("chart"), {
    type: "pie",
    data: {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories)
      }]
    }
  });

  let highest = Object.keys(categories).reduce((a,b)=>
    categories[a] > categories[b] ? a : b
  );

  let tip = "";

  if(highest === "car") tip = "Use public transport or carpool.";
  if(highest === "meat") tip = "Reduce meat consumption.";
  if(highest === "electricity") tip = "Turn off unused appliances.";

  document.getElementById("tip").innerText = "Tip: " + tip;
}

updateUI();

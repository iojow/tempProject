const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
let x = 10;
let y = 0;

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function changeText() {
    x = x + y - 4.2;
    x = Math.round(10 * x) / 10;
    document.getElementById("token").innerHTML = "You have " + x + " tokens left";
}

const rotationValues = [
    { minDegree: 0, maxDegree: 10, value: 9},
    { minDegree: 11, maxDegree: 50, value: 6},
    { minDegree: 51, maxDegree: 90, value: 3},
    { minDegree: 91, maxDegree: 130, value: 3},
    { minDegree: 131, maxDegree: 170, value: 2},
    { minDegree: 171, maxDegree: 210, value: 1},
    { minDegree: 211, maxDegree: 250, value: 6 },
    { minDegree: 251, maxDegree: 290, value: 4 },
    { minDegree: 291, maxDegree: 330, value: 2 },
    { minDegree: 331, maxDegree: 360, value: 9 }
];
const data = [16, 16, 16, 16, 16, 16, 16, 16, 16];
var pieColors = [
    "#C40233",
    "#009F6B",
    "#0087BD",
    "#C40233",
    "#009F6B",
    "#0087BD",
    "#C40233",
    "#009F6B",
    "#0087BD"
];

let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 1, 1, 2, 2, 2, 3, 3, 3],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        finalValue.innerHTML = `<p>You won ${i.value} tokens</p>`;
        y = i.value;
        spinBtn.disabled = false;
        break;
    }
  }
};


let resultValue = 101;
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Good Luck!</p>`;
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 360) {
        resultValue -= 5;
        myChart.options.rotation = 0;
    }
    else if (myChart.options.rotation == randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        resultValue = 101;
    }
    }, 10);
});

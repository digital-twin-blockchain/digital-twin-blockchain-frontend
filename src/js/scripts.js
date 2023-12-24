import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { AxesHelper } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
const HostelUrl = new URL("../assets/boysHostel.glb", import.meta.url);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
const axesHelper = new AxesHelper(500);
//scene.add(axesHelper);

camera.position.set(-250, 40, -300);
camera.rotation.x = (-180 * Math.PI) / 180;
camera.rotation.y = (-45 * Math.PI) / 180;
camera.rotation.z = (-180 * Math.PI) / 180;

orbit.update();

const assetLoader = new GLTFLoader();
assetLoader.load(
  HostelUrl.href,
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-234, 200, -87);
scene.add(directionalLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(72, 180, -59);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(68, 178, 516);
scene.add(directionalLight2);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// setting up label renderer
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth / 10, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.zIndex = -1;
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.zIndex = 1000;
document.body.appendChild(labelRenderer.domElement);


// past data
var pastDataAPI;
async function getPastApi(days) {
  url = "http://localhost:3000/api/boys/past/";
  var stringDays = days.toString();
  url = url.concat(stringDays);
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  pastDataAPI = await response.json();
  console.log(pastDataAPI);
}
getPastApi(100);

var futureDataAPI;
async function getFutureApi() {
  url = "http://localhost:3000/api/boys/future";
  // var stringDays = days.toString();
  // url = url.concat(stringDays);
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  futureDataAPI = await response.json();
  console.log(futureDataAPI);
}
getFutureApi();

var currentDataB1;

async function getCurrentApiB1() {
  url = "http://localhost:3000/api/b1/current";

  const response = await fetch(url);

  // Storing data in form of JSON
  currentDataB1 = await response.json();
  console.log(currentDataB1);
}

getCurrentApiB1();

var currentDataB2;

async function getCurrentApiB2() {
  url = "http://localhost:3000/api/b2/current";

  const response = await fetch(url);

  // Storing data in form of JSON
  currentDataB2 = await response.json();
  console.log(currentDataB2);
}

getCurrentApiB2();
var leftButton = document.createElement("button");
leftButton.className = "custom-btn btn-3";
leftButton.textContent = "Boys Hostel 1";
leftButton.id = "water-button";
leftButton.style.top = "200px";
leftButton.style.left = "0px";
leftButton.style.position = "absolute";

labelRenderer.domElement.appendChild(leftButton);

var rightButton = document.createElement("button");
rightButton.className = "custom-btn btn-6";
rightButton.textContent = "Boys Hostel 2";
rightButton.id = "water-right-button";
rightButton.style.top = "275px";
rightButton.style.left = "0px";
rightButton.style.position = "absolute";

labelRenderer.domElement.appendChild(rightButton);

var allButton = document.createElement("button");
allButton.className = "custom-btn btn-9";
allButton.textContent = "Total";
allButton.id = "water-all-button";
allButton.style.top = "350px";
allButton.style.left = "0px";
allButton.style.position = "absolute";

labelRenderer.domElement.appendChild(allButton);

function hideSideBar() {
  leftButton.style.display = "none";
  rightButton.style.display = "none";
  allButton.style.display = "none";
}
function showSideBar() {
  leftButton.style.display = "block";
  rightButton.style.display = "block";
  allButton.style.display = "block";
}
function cameraCenter() {
  camera.position.set(-250, 40, -300);
  camera.rotation.x = (-180 * Math.PI) / 180;
  camera.rotation.y = (-45 * Math.PI) / 180;
  camera.rotation.z = (-180 * Math.PI) / 180;
}
leftButton.addEventListener("click", function () {
  // code to zoom in and display the dashboard
  hideSideBar();
  camera.position.set(-54, 64.59, -120);
  camera.rotation.x = (90 * Math.PI) / 180;
  camera.rotation.y = (-80 * Math.PI) / 180;
  camera.rotation.z = (90 * Math.PI) / 180;
  labelRenderer.setSize(window.innerWidth, window.innerHeight);

  // chart div
  var container = document.createElement("div");
  container.className = "chart";
  container.style.position = "relative";
  container.style.position = "absolute";
  container.style.top = "200px";
  container.style.left = "200px";
  container.style.width = "800px";
  container.style.height = "800px";

  var newDiv = document.createElement("canvas");
  newDiv.id = "myChart1";
  const ctx = newDiv.getContext("2d");
  const labels = currentDataB1.map((curr) => curr.Datetime);
  var dataOutput = currentDataB1.map((curr) => curr.Vplus);
  var firstEl = dataOutput[0];
  for (var i = 0; i < dataOutput.length; i++) {
    dataOutput[i] -= firstEl;
  }
  console.log(dataOutput);
  const data = {
    labels,
    datasets: [
      {
        data: dataOutput,
        label: "water usage (Vplus)",
        fill: false,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
    },
  };
  const myChart = new Chart(ctx, config);

  // Add the new div element to the container element
  container.appendChild(newDiv);
  labelRenderer.domElement.appendChild(container);
  // top bar of chart
  var topChartBar = document.createElement("div");
  topChartBar.style.position = "absolute";
  topChartBar.style.top = "100px";
  topChartBar.style.left = "400px";
  topChartBar.style.height = "150px";
  topChartBar.style.width = "400px";
  labelRenderer.domElement.appendChild(topChartBar);

  // top bar buttons

  var pastData = document.createElement("button");
  pastData.style.position = "absolute";
  pastData.className = "btn btn-primary";
  pastData.textContent = "Past Data";
  pastData.id = "past-data";
  topChartBar.appendChild(pastData);

  var topBarClose = document.createElement("button");
  topBarClose.style.position = "absolute";
  topBarClose.className = "btn btn-success";
  topBarClose.textContent = "Close";
  topBarClose.style.left = "100px";
  topBarClose.id = "water-close-button";
  topChartBar.appendChild(topBarClose);

  var futureData = document.createElement("button");
  futureData.style.position = "absolute";
  futureData.className = "btn btn-secondary";
  futureData.textContent = "Predict data";
  futureData.style.left = "170px";
  futureData.id = "future-button";
  topChartBar.appendChild(futureData);

  // future data on click

  futureData.addEventListener("click", function () {
    var check = document.getElementById("myChart1");
    if (check) {
      check.remove();
    }

    var check1 = document.getElementById("myChart2");
    if (check1) {
      check1.remove();
    }

    var check2 = document.getElementById("myChart3");
    if (check2) {
      console.log("already there");
      return;
    }

    var new1Div = document.createElement("canvas");
    new1Div.id = "myChart3";
    const ctx = new1Div.getContext("2d");
    const labels = futureDataAPI.map((curr) => curr.Date);
    const data = {
      labels,
      datasets: [
        {
          data: futureDataAPI.map((curr) => curr.b1_usage),
          label: "water usage (Vplus)",
          fill: false,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
      },
    };
    const myChart = new Chart(ctx, config);

    // Add the new div element to the container element
    container.appendChild(new1Div);
    labelRenderer.domElement.appendChild(container);
  });
  pastData.addEventListener("click", function () {
    var check = document.getElementById("myChart1");
    if (check) {
      check.remove();
    }

    var check1 = document.getElementById("myChart3");
    if (check1) {
      check1.remove();
    }

    var check2 = document.getElementById("myChart2");
    if (check2) {
      console.log("already there");
      return;
    }

    var new2Div = document.createElement("canvas");
    new2Div.id = "myChart2";
    const ctx = new2Div.getContext("2d");
    const labels = pastDataAPI.map((curr) => curr.Date);
    const data = {
      labels,
      datasets: [
        {
          data: pastDataAPI.map((curr) => curr.b1_usage),
          label: "water usage (Vplus)",
          fill: false,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
      },
    };
    const myChart = new Chart(ctx, config);

    // Add the new div element to the container element
    container.appendChild(new2Div);
    labelRenderer.domElement.appendChild(container);
  });

  // create a chart
  // Create a new div element

  topBarClose.addEventListener("click", function () {
    showSideBar();
    topChartBar.remove();
    container.remove();
    cameraCenter();
    labelRenderer.setSize(window.innerWidth / 10, window.innerHeight);
  });
});
rightButton.addEventListener("click", function () {
  hideSideBar();
  camera.position.set(135, 75, 110);
  camera.rotation.x = (-180 * Math.PI) / 180;
  camera.rotation.y = (-180 * Math.PI) / 180;
  camera.rotation.z = (-180 * Math.PI) / 180;
  labelRenderer.setSize(window.innerWidth, window.innerHeight);

  // chart div
  var container = document.createElement("div");
  container.className = "chart";
  container.style.position = "relative";

  // top bar of chart

  // top bar div
  var topChartBar = document.createElement("div");
  topChartBar.style.position = "absolute";
  topChartBar.style.top = "100px";
  topChartBar.style.left = "400px";
  topChartBar.style.height = "50px";
  topChartBar.style.width = "400px";
  labelRenderer.domElement.appendChild(topChartBar);

  // top bar buttons

  var pastData = document.createElement("button");
  pastData.style.position = "absolute";
  pastData.className = "btn btn-primary";
  pastData.textContent = "Past Data";
  pastData.id = "past-data";
  topChartBar.appendChild(pastData);

  var topBarClose = document.createElement("button");
  topBarClose.style.position = "absolute";
  topBarClose.className = "btn btn-success";
  topBarClose.textContent = "Close";
  topBarClose.style.left = "100px";
  topBarClose.id = "water-close-button";
  topChartBar.appendChild(topBarClose);

  var futureData = document.createElement("button");
  futureData.style.position = "absolute";
  futureData.className = "btn btn-secondary";
  futureData.textContent = "Predict data";
  futureData.style.left = "170px";
  futureData.id = "future-button";
  topChartBar.appendChild(futureData);
  labelRenderer.domElement.appendChild(topChartBar);
  // create a chart
  // Create a new div element
  var newDiv = document.createElement("canvas");
  newDiv.id = "myChart1";
  container.style.position = "absolute";
  container.style.top = "200px";
  container.style.left = "200px";
  container.style.width = "800px";
  container.style.height = "800px";
  const ctx = newDiv.getContext("2d");
  const labels = currentDataB2.map((curr) => curr.time);

  const data = {
    labels,
    datasets: [
      {
        data: currentDataB2.map((curr) => curr.Vplus),
        label: "water consumption",
        fill: false,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
    },
  };
  const myChart = new Chart(ctx, config);

  // Add the new div element to the container element
  container.appendChild(newDiv);
  labelRenderer.domElement.appendChild(container);

  futureData.addEventListener("click", function () {
    var check = document.getElementById("myChart1");
    if (check) {
      check.remove();
    }

    var check1 = document.getElementById("myChart2");
    if (check1) {
      check1.remove();
    }

    var check2 = document.getElementById("myChart3");
    if (check2) {
      console.log("already there");
      return;
    }
    var new1Div = document.createElement("canvas");
    new1Div.id = "myChart3";
    const ctx = new1Div.getContext("2d");
    const labels = futureDataAPI.map((curr) => curr.Date);
    const data = {
      labels,
      datasets: [
        {
          data: futureDataAPI.map((curr) => curr.b2_usage),
          label: "water usage (Vplus)",
          fill: false,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
      },
    };
    const myChart = new Chart(ctx, config);

    // Add the new div element to the container element
    container.appendChild(new1Div);
    labelRenderer.domElement.appendChild(container);
  });
  pastData.addEventListener("click", function () {
    var check = document.getElementById("myChart1");
    if (check) {
      check.remove();
    }

    var check1 = document.getElementById("myChart3");
    if (check1) {
      check1.remove();
    }

    var check2 = document.getElementById("myChart2");
    if (check2) {
      console.log("already there");
      return;
    }

    var new2Div = document.createElement("canvas");
    new2Div.id = "myChart2";
    const ctx = new2Div.getContext("2d");
    const labels = pastDataAPI.map((curr) => curr.Date);
    const data = {
      labels,
      datasets: [
        {
          data: pastDataAPI.map((curr) => curr.b2_usage),
          label: "water usage (Vplus)",
          fill: false,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
      },
    };
    const myChart = new Chart(ctx, config);

    // Add the new div element to the container element
    container.appendChild(new2Div);
    labelRenderer.domElement.appendChild(container);
  });
  topBarClose.addEventListener("click", function () {
    showSideBar();
    topChartBar.remove();
    container.remove();
    cameraCenter();
    labelRenderer.setSize(window.innerWidth / 10, window.innerHeight);
  });
});
allButton.addEventListener("click", function () {
  hideSideBar();
  camera.position.set(270, 100, -60);
  camera.rotation.x = (-180 * Math.PI) / 180;
  camera.rotation.y = (-280 * Math.PI) / 180;
  camera.rotation.z = (-180 * Math.PI) / 180;
  labelRenderer.setSize(window.innerWidth, window.innerHeight);

  // chart div
  var container = document.createElement("div");
  container.className = "chart";
  container.style.position = "relative";

  // top bar div
  var topChartBar = document.createElement("div");
  topChartBar.style.position = "absolute";
  topChartBar.style.top = "100px";
  topChartBar.style.left = "400px";
  topChartBar.style.height = "50px";
  topChartBar.style.width = "400px";
  labelRenderer.domElement.appendChild(topChartBar);

  // top bar buttons

  var pastData = document.createElement("button");
  pastData.style.position = "absolute";
  pastData.className = "btn btn-primary";
  pastData.textContent = "Past Data";
  pastData.id = "past-data";
  topChartBar.appendChild(pastData);

  var topBarClose = document.createElement("button");
  topBarClose.style.position = "absolute";
  topBarClose.className = "btn btn-success";
  topBarClose.textContent = "Close";
  topBarClose.style.left = "100px";
  topBarClose.id = "water-close-button";
  topChartBar.appendChild(topBarClose);

  var futureData = document.createElement("button");
  futureData.style.position = "absolute";
  futureData.className = "btn btn-secondary";
  futureData.textContent = "Predict data";
  futureData.style.left = "170px";
  futureData.id = "future-button";
  topChartBar.appendChild(futureData);
  labelRenderer.domElement.appendChild(topChartBar);

  // create a chart
  // Create a new div element
  var newDiv = document.createElement("canvas");
  newDiv.id = "myChart1";
  container.style.position = "absolute";
  container.style.top = "200px";
  container.style.left = "200px";
  container.style.width = "800px";
  container.style.height = "800px";
  const ctx = newDiv.getContext("2d");
  const labels = pastDataAPI.map((curr) => curr.Date);

  const data = {
    labels,
    datasets: [
      {
        data: pastDataAPI.map((curr) => curr.total_usage),
        label: "water consumption",
        fill: false,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
    },
  };
  const myChart = new Chart(ctx, config);

  futureData.addEventListener("click", function () {
    var check = document.getElementById("myChart1");
    if (check) {
      check.remove();
    }

    var check1 = document.getElementById("myChart2");
    if (check1) {
      check1.remove();
    }

    var check2 = document.getElementById("myChart3");
    if (check2) {
      console.log("already there");
      return;
    }
    var new1Div = document.createElement("canvas");
    new1Div.id = "myChart3";
    const ctx = new1Div.getContext("2d");
    const labels = futureDataAPI.map((curr) => curr.Date);
    const data = {
      labels,
      datasets: [
        {
          data: futureDataAPI.map((curr) => curr.total_usage),
          label: "water usage (Vplus)",
          fill: false,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
      },
    };
    const myChart = new Chart(ctx, config);

    // Add the new div element to the container element
    container.appendChild(new1Div);
    labelRenderer.domElement.appendChild(container);
  });

  // Add the new div element to the container element
  container.appendChild(newDiv);
  labelRenderer.domElement.appendChild(container);
  topBarClose.addEventListener("click", function () {
    showSideBar();
    topChartBar.remove();
    container.remove();
    cameraCenter();
    labelRenderer.setSize(window.innerWidth / 10, window.innerHeight);
  });
  pastData.addEventListener("click", function () {
    var check = document.getElementById("myChart3");
    if (check) {
      check.remove();
    }

    var check1 = document.getElementById("myChart3");
    if (check1) {
      check1.remove();
    }

    var check2 = document.getElementById("myChart1");
    if (check2) {
      console.log("already there");
      return;
    }

    var new2Div = document.createElement("canvas");
    new2Div.id = "myChart1";
    const ctx = new2Div.getContext("2d");
    const labels = pastDataAPI.map((curr) => curr.Date);
    const data = {
      labels,
      datasets: [
        {
          data: pastDataAPI.map((curr) => curr.total_usage),
          label: "water usage (Vplus)",
          fill: false,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
      },
    };
    const myChart = new Chart(ctx, config);

    // Add the new div element to the container element
    container.appendChild(new2Div);
    labelRenderer.domElement.appendChild(container);
  });
});

// var closeButton = document.createElement("button");
// closeButton.className = "btn";
// closeButton.addEventListener("click", function () {
//   container.style.display = "none";
// });
// newDiv.appendChild(closeButton);

animate();
renderer.render(scene, camera);

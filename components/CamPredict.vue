<template>
  <div>
    <button v-if="!isStarted" class="btn btn-primary" type="button" @click="init()">Start</button>
    <div class="my-3">
      <div v-if="detected" class="badge bg-success">Detected</div>
      <div v-else class="badge bg-danger">Who are you?</div>
    </div>
    <div id="webcam-container"></div>
    <div id="label-container"></div>
  </div>
</template>

<script setup>
// const URL = "./public/tm-my-image-model/";
const URL = "https://teachablemachine.withgoogle.com/models/CBvMo7Z8W/"

let model, webcam, labelContainer, maxPredictions;
let results = []
let detected = ref(false)
let isStarted = ref(false)

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam
  webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);
  isStarted.value = true

  // append elements to the DOM
  document.getElementById("webcam-container").appendChild(webcam.canvas);
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  // for (let i = 0; i < maxPredictions; i++) {
  //   const classPrediction =
  //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
  //   labelContainer.childNodes[i].innerHTML = classPrediction;
  // }
  results = prediction
  if(prediction[0].probability >= 0.9) {
    detected.value = true
    labelContainer.innerHTML = prediction[0].className
  } else {
    detected.value = false
    labelContainer.innerHTML = "Who are you??"
  }
}
</script>
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import SplitType from "./lib/index.js";

gsap.registerPlugin(ScrollTrigger);

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas2 = document.getElementById("webgl2");
const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera2.position.set(0, 0, 10);
scene2.add(camera2);

const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.8);
scene2.add(ambientLight2);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(1, 2, 0);
scene2.add(directionalLight2);

const renderer2 = new THREE.WebGLRenderer({
  canvas: canvas2,
  antialias: true,
  alpha: true,
});
// renderer2.setSize(window.innerWidth / 1.5, window.innerHeight / 1.8);
// renderer2.render(scene2, camera2);

renderer2.domElement.addEventListener(
  "webglcontextlost",
  handleContextLost,
  false
);
renderer2.domElement.addEventListener(
  "webglcontextrestored",
  handleContextRestored,
  false
);
initWebGL();

function initWebGL() {
  renderer2.setSize(window.innerWidth / 1.5, window.innerHeight / 1.8);
  renderer2.render(scene2, camera2);
}

const controls = new OrbitControls(camera2, renderer2.domElement);
controls.enableDamping = false;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;
controls.enableRotate = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.target.set(0, 0, 0);
controls.update();

const lottieContainer = document.getElementById("loader-lottie-container");
const lottieAnimation = lottie.loadAnimation({
  container: lottieContainer,
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: "assets/lottie/pulsar_load_lottie.json",
});

function hideLoadingOverlay() {
  console.log("hide overlay");
  const loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.style.display = "none";
  getExperienceTextAnimation();
}

function getExperienceTextAnimation() {
  // GET EXPERIENCE SECTION
  const getExperienceTitle = new SplitType(".get-experience-title");
  const getExperienceItalicTitle = new SplitType(
    ".get-experience-italic-title"
  );
  const experienceDesc = new SplitType(".experience_desc", {
    types: "words, chars",
  });
  const t1 = gsap.timeline({
    duration: 0.2,
  });
  t1.from(getExperienceTitle.chars, {
    opacity: 0,
    stagger: 0.1,
  });
  t1.from(getExperienceItalicTitle.chars, {
    opacity: 0,
    stagger: 0.015,
  });
  t1.from(
    experienceDesc.chars,
    {
      opacity: 0,
      stagger: 0.02,
      delay: 0.2,
    },
    0.2
  );
}

let mesh2;
const loader2 = new GLTFLoader().setPath("assets/BikeModels/");
const loaderElement = document.getElementById("loader");
const isMobile = window.innerWidth <= 767;
const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
function loadModel(modelPath) {
  loaderElement.style.display = "block";
  if (mesh2) {
    scene2.remove(mesh2);
  }
  hideLoadingOverlay();
  loader2.load(modelPath, (gltf) => {
    mesh2 = gltf.scene;
    if (isMobile) {
      mesh2.position.set(-0.1, 0, 0);
      mesh2.scale.set(2.7, 2.7, 2.7);
      mesh2.rotation.set(0, 0, 0);
      const lookAtVector = new THREE.Vector3(0, 0, 28);
      mesh2.lookAt(lookAtVector);
    } else if (isTablet) {
      mesh2.position.set(-0.1, -1.2, 0);
      mesh2.scale.set(3.5, 3.5, 3.5);
    } else {
      mesh2.position.set(0, -1.7, 0);
      mesh2.scale.set(4.1, 4.1, 4.1);
      mesh2.rotation.set(0, 1.5, 0);
      const lookAtVector = new THREE.Vector3(0, -2, 28);
      mesh2.lookAt(lookAtVector);
    }

    scene2.add(mesh2);
    loaderElement.style.display = "none";
  });
}

if (isMobile && isTablet) {
  let isModelInteracting = false;
  window.addEventListener("scroll", () => {
    if (isModelInteracting) {
      controls.enabled = true;
    } else {
      controls.enabled = false;
    }
  });

  // Event listeners for touch events
  renderer2.domElement.addEventListener("touchstart", () => {
    isModelInteracting = true;
  });

  renderer2.domElement.addEventListener("touchmove", () => {
    isModelInteracting = true;
  });

  renderer2.domElement.addEventListener("touchend", () => {
    isModelInteracting = false;
  });

  renderer2.domElement.addEventListener("touchcancel", () => {
    isModelInteracting = false;
  });
}

function handleButtonClick(buttonId, modelPath) {
  document.getElementById("button1").classList.remove("btn-active");
  document.getElementById("button2").classList.remove("btn-active");
  document.getElementById("button3").classList.remove("btn-active");

  document.getElementById(buttonId).classList.add("btn-active");

  loadModel(modelPath);
}

lottieAnimation.addEventListener("complete", function () {
  hideLoadingOverlay();
  loadModel("Pulsar_Black.glb");
});

document.getElementById("button1").addEventListener("click", () => {
  handleButtonClick("button1", "Pulsar_Black.glb");
});

document.getElementById("button2").addEventListener("click", () => {
  handleButtonClick("button2", "Pulsar_Red.glb");
});

document.getElementById("button3").addEventListener("click", () => {
  handleButtonClick("button3", "Pulsar_Blue.glb");
});

let rotationSpeed = 1;
let rotationDirection = 0;

const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
arrowLeft.addEventListener("click", () => {
  rotationDirection = -1;
  RotateModel();
});
arrowRight.addEventListener("click", () => {
  rotationDirection = 1;
  RotateModel();
});
function RotateModel() {
  if (mesh2) {
    mesh2.rotation.y += rotationSpeed * rotationDirection;
  }
}

window.addEventListener("resize", () => {
  let sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  camera2.aspect = sizes.width / sizes.height;
  camera2.updateProjectionMatrix();

  renderer2.setSize(sizes.width, sizes.height);
  renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer2.render(scene2, camera2);
});

function handleContextLost(event) {
  event.preventDefault();
  console.warn("WebGL context lost. Attempting to recover...");
  cancelAnimationFrame(animationId);
}

function handleContextRestored() {
  console.log("WebGL context restored. Resuming...");
  initWebGL();
  animate();
}

let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
  renderer2.render(scene2, camera2);
}
animate();

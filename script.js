// Set up ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

//canvas
const canvas = document.querySelector("canvas.webgl3");

//scene
const scene = new THREE.Scene();

//canvas
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 5); // Adjust the camera position

scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: false,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// Add lighting (optional)
const light = new THREE.PointLight(0xffffff);
light.position.set(5, 5, 5);
scene.add(light);

//Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Color can be adjusted (hex format)
scene.add(ambientLight);

//Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Color and intensity
directionalLight.position.set(1, 1, 1); // Set the light's direction
scene.add(directionalLight);

let model;
let frontwheel;
let backwheel;
let engine;
let mixer;
let mesh1;
let speedlines;

// GLTF Loader
const loader = new THREE.GLTFLoader().setPath("assets/");
loader.load("model/bajaj.glb", (gltf) => {
  console.log("Model loaded successfully:", gltf);
  mesh1 = gltf.scene;
  //   mesh1.position.set(0, -7.8, 0);
  //   mesh1.rotation.y = Math.PI / 2;
  //   mesh1.scale.set(13, 13, 13);
  //   camera.position.z = 25;
  //   frontwheel = mesh1.children[1];
  //   backwheel = mesh1.children[2];

  //Responsive Design
  const isMobile = window.innerWidth <= 430;
  const isTablet = window.innerWidth >= 767 && window.innerWidth <= 1024;
  if (isMobile) {
  } else if (isTablet) {
  } else {
    frontwheel = mesh1.children[1];
    backwheel = mesh1.children[2];
    mesh1.position.set(-25, -7.8, 0);
    mesh1.rotation.y = Math.PI / 2;
    mesh1.scale.set(13, 13, 13);
    camera.position.z = 25;

    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__one",
        start: "top top",
        end: "bottom top",
        markers: true,
        scrub: 0.5,
        duration: 10,
      },
    });
    t1.to(mesh1.position, {
      x: -13.5,
      duration: 6,
      ease: "power2.inOut",
    })
      .to(".light__img__desktop", { opacity: 1, duration: 6 })
      .to(".section__one .title", { opacity: 1 });

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__two",
        start: "top top",
        end: "bottom 50%",
        markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t2.to(
      ".light__img__desktop",
      { opacity: 0, duration: 2, left: "15%" },
      "ss"
    );
    t2.to(
      camera.position,
      {
        x: -4,
        y: -1,
        z: 23,
      },
      "ss"
    );
    t2.to(".section__one .title", {
      opacity: 0,
      duration: 10,
      scrub: 0.5,
    });
  }

  ScrollTrigger.create({
    trigger: ".get-experience",
    start: "50% 50%",
    // markers: true,
    onEnter: () => {
      canvas.style.transform = "translateY(-200%)";
    },
    onEnterBack: () => {
      canvas.style.position = "relative";
      canvas.style.transform = "translateY(-200%)";
    },
    onLeaveBack: () => {
      canvas.style.position = "relative";
      canvas.style.transform = "translateY(0%)";
    },
  });

  ScrollTrigger.create({
    trigger: ".section__one",
    start: "top top",
    end: "",
    // markers: true,
    onEnter: () => {
      canvas.style.position = "fixed";
      canvas.style.zIndex = "3";
      document.querySelector(".section__one").style.zIndex = "6";
      document.querySelector(".light__img__desktop").style.zIndex = "5";
      document.querySelector(".section__two").style.zIndex = "5";
      document.querySelector(".section__three").style.zIndex = "5";
      canvas.style.transform = "translateY(0%)";
    },
    onLeaveBack: () => {
      canvas.style.position = "relative";
      canvas.style.transform = "translateY(0%)";
    },
  });

  ScrollTrigger.create({
    trigger: ".section__three",
    start: "top top",
    end: "",
    // markers: true,
    onEnter: () => {
      canvas.style.position = "relative";
      canvas.style.transform = "translateY(0%)";
    },
    onLeaveBack: () => {
      canvas.style.position = "fixed";
    },
  });

  // Set up animation mixer
  mixer = new THREE.AnimationMixer(mesh1);
  const animations = gltf.animations;

  if (animations && animations.length > 0) {
    const action = mixer.clipAction(animations[0]); // Assuming the first animation is the loop
    action.play();
  }

  scene.add(mesh1);
});

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  if (mixer) {
    mixer.update(0.016); // Update with your frame time
  }
  if (frontwheel && backwheel) {
    frontwheel.rotation.x += 0.19;
    backwheel.rotation.x += 0.19;
  }
  renderer.render(scene, camera);
}

animate();

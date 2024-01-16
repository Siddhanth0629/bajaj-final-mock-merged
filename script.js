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
loader.load("model/bajaj2.glb", (gltf) => {
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
    mesh1.position.set(-8, -3.3, 0);
    mesh1.rotation.y = Math.PI / 2;
    mesh1.scale.set(4.7, 4.7, 4.7);
    camera.position.set(0.5, 0, 11);
    // frontwheel = mesh1.children[1];
    // backwheel = mesh1.children[2];
    //Section One
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__one",
        start: "top 50%",
        end: "bottom top",
        // markers: true,
        scrub: 0.5,
        duration: 20,
      },
    });
    t1.to(mesh1.position, {
      x: -2.5,
      duration: 2,
      ease: "power2.inOut",
    });

    t1.to(".light__img", { opacity: 1 });
    t1.to(".section__one .title", { opacity: 1, duration: 1.3 });
    //Section two
    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__two",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 20,
      },
    });
    t2.to(".light__img", { opacity: 0, duration: 2, left: "15%" }, "ss");

    t2.to(".section__one .title", {
      opacity: 0,
      duration: 10,
      scrub: 0.5,
    });
    //Section Three
    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__three",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t3.to(
      camera.position,
      {
        x: -0.5,
      },
      "ss"
    );
    t3.to(".black-overlay", {
      opacity: 0.9,
      left: "-72%",
    });
    t3.to(".section__three .title", {
      opacity: 1,
      duration: 2,
      scrub: 0.3,
    });
    t3.to(".front__suspension", {
      opacity: 1,
    });
    //Section four
    const t4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__four",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t4.to(".black-overlay", { opacity: 0, scrub: 0.4, duration: 1 });
    t4.to(".front__suspension", { opacity: 0 });
    t4.to(".section__three .title", { opacity: 0 });
    //Section five
    const t5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__five",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t5.to(".black-overlay", {
      opacity: 1,
      top: "-4%",
      left: "-79%",
    });
    t5.to(".section__five .title", {
      opacity: 1,
      duration: 2,
      scrub: 0.3,
    });
    t5.to(".abs", {
      opacity: 1,
      duration: 1,
      scrub: 0.4,
    });
    //Section six
    const t6 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__six",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t6.to(".black-overlay", {
      opacity: 0,
      left: "-70%",
      duration: 2,
    });
    t6.to(".section__five .title", {
      opacity: 0,
      duration: 2,
      scrub: 0.3,
    });
    t6.to(".abs", {
      opacity: 0,
      duration: 2,
    });
    //Section seven
    const t7 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__seven",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t7.to(".black-overlay", {
      opacity: 1,
    });
    t7.to(".section__seven .title", {
      opacity: 1,
    });
    t7.to(".abs-brake", {
      opacity: 1,
    });
    //Section eight
    const t8 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__eight",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t8.to(".black-overlay", {
      opacity: 0,
    });
    t8.to(".section__seven .title", {
      opacity: 0,
    });
    t8.to(".abs-brake", {
      opacity: 0,
    });
    //Section nine
    const t9 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__nine",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t9.to(camera.position, {
      x: -5.1,
      duration: 1,
    });
    t9.to(".black-overlay", {
      opacity: 1,
      left: "-42%",
      top: "-14%",
    });
    t9.to(".section__nine .title", {
      opacity: 1,
    });
    t9.to(".back-abs", {
      opacity: 1,
    });
    //Section ten
    const t10 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__ten",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t10.to(".section__nine .title", {
      opacity: 0,
    });
    t10.to(".back-abs", {
      opacity: 0,
    });
    //Section eleven
    const t11 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__eleven",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t11.to(camera.position, {
      x: -2.6,
    });
    t11.to(".black-overlay", {
      opacity: 1,
      left: "-61%",
      top: "0%",
    });
    t11.to(".section__eleven .title", {
      opacity: 1,
    });
    t11.to(".box", {
      opacity: 1,
    });
    //Section twelve
    const t12 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__twelve",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t12.to(".black-overlay", {
      opacity: 0,
    });
    t12.to(".section__eleven .title", {
      opacity: 0,
    });
    //Section thirteen
    const t13 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__thirteen",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t13.to(".black-overlay", {
      opacity: 1,
    });
    t13.to(".section__thirteen .title", { opacity: 1 });
    t13.to(".torque", { opacity: 1 });
    t13.to(".box", {
      opacity: 0,
    });
    //Section fourteen
    const t14 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__fourteen",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t14.to(".section__thirteen .title", { opacity: 0 });
    t14.to(".torque", { opacity: 0 });
    //Section fifteen
    const t15 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__fifteen",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t15.to(camera.position, {
      x: -3.8,
      z: 7.5,
      y: -1.5,
    });
    t15.to(".black-overlay", {
      opacity: 1,
      top: "-25%",
    });
    t15.to(".section__fifteen .title", {
      opacity: 1,
    });
    t15.to(".exhaust", { opacity: 1 });
    //Section sixteen
    const t16 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__sixteen",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t16.to(".black-overlay", {
      opacity: 0,
    });
    t16.to(".section__fifteen .title", {
      opacity: 0,
    });
    t16.to(".exhaust", { opacity: 0 });

    //Section seventeen
    const t17 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__seventeen",
        start: "top top",
        end: "bottom 50%",
        markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t17.to(camera.position, {
      y: -1,
      z: 7.5,
    });
    t17.to(".black-overlay", { opacity: 1, top: "-28%", left: "-18%" });
    t17.to(".section__seventeen .title", {
      opacity: 1,
    });
    t17.to(".monoshock", { opacity: 1 });
    t17.to(".section__seventeen .title", {
      opacity: 0,
    });
    t17.to(".monoshock", { opacity: 0 });
  } else if (isTablet) {
    mesh1.position.set(-20, -3.3, 0);
    mesh1.rotation.y = Math.PI / 2;
    mesh1.scale.set(4.7, 4.7, 4.7);
    camera.position.set(0.5, 0, 11);
    frontwheel = mesh1.children[1];
    backwheel = mesh1.children[2];

    //Section One
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__one",
        start: "top 50%",
        end: "bottom top",
        // markers: true,
        scrub: 0.5,
        duration: 20,
      },
    });
    t1.to(mesh1.position, {
      x: -2.5,
      duration: 6,
      ease: "power2.inOut",
    });
    t1.to(".light__img__tab", { opacity: 1 });
    t1.to(".section__one .title", { opacity: 1 });

    //Section two
    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__two",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 20,
      },
    });
    t2.to(".light__img__tab", { opacity: 0, duration: 2, left: "15%" }, "ss");
    t2.to(
      camera.position,
      {
        x: 0.2,
      },
      "ss"
    );
    t2.to(".section__one .title", {
      opacity: 0,
      duration: 10,
      scrub: 0.5,
    });

    //Section Three
    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__three",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t3.to(".black-overlay", {
      opacity: 0.9,
      left: "-72%",
    });
    t3.to(".section__three .title", {
      opacity: 1,
      duration: 2,
      scrub: 0.3,
    });
    t3.to(
      ".front__suspension__tab",
      {
        opacity: 1,
      },
      "ss"
    );
    //Section four
    const t4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__four",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t4.to(".black-overlay", { opacity: 0, scrub: 0.4, duration: 1 });
    t4.to(".front__suspension__tab", { opacity: 0 });
    t4.to(".section__three .title", { opacity: 0 });
    //Section five
    const t5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__five",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t5.to(".black-overlay", {
      opacity: 1,
      top: "-4%",
      left: "-79%",
    });
    t5.to(".section__five .title", {
      opacity: 1,
      duration: 2,
      scrub: 0.3,
    });
    t5.to(".abs__tab", {
      opacity: 1,
    });
    //Section six
    const t6 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__six",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t6.to(".black-overlay", {
      opacity: 0,
      left: "-70%",
      duration: 2,
    });
    t6.to(".section__five .title", {
      opacity: 0,
      duration: 2,
      scrub: 0.3,
    });
    t6.to(".abs__tab", {
      opacity: 0,
      duration: 2,
    });
    //Section seven
    const t7 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__seven",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t7.to(".black-overlay", {
      opacity: 1,
    });
    t7.to(".section__seven .title", {
      opacity: 1,
    });
    t7.to(".abs-brake__tab", {
      opacity: 1,
    });
    //Section eight
    const t8 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__eight",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t8.to(".black-overlay", {
      opacity: 0,
    });
    t8.to(".section__seven .title", {
      opacity: 0,
    });
    t8.to(".abs-brake__tab", {
      opacity: 0,
    });
    //Section nine
    const t9 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__nine",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t9.to(camera.position, {
      x: -5.3,
      duration: 1,
    });
    t9.to(".black-overlay", {
      opacity: 1,
      left: "-42%",
      top: "-14%",
    });
    t9.to(".section__nine .title", {
      opacity: 1,
    });
    t9.to(".back-abs__tab", {
      opacity: 1,
    });
    //Section ten
    const t10 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__ten",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t10.to(".section__nine .title", {
      opacity: 0,
    });
    t10.to(".back-abs__tab", {
      opacity: 0,
    });
    //Section eleven
    const t11 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__eleven",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t11.to(camera.position, {
      x: -2.6,
    });
    t11.to(camera.position, {
      z: 7.5,
      y: -1,
    });
    t11.to(".black-overlay", {
      opacity: 1,
      left: "-61%",
      top: "0%",
    });
    t11.to(".section__eleven .title", {
      opacity: 1,
    });
    t11.to(".web_power__tab", {
      opacity: 1,
    });
    //Section twelve
    const t12 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__twelve",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t12.to(".black-overlay", {
      opacity: 0,
    });
    t12.to(".section__eleven .title", {
      opacity: 0,
    });
    //Section thirteen
    const t13 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__thirteen",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t13.to(".black-overlay", {
      opacity: 1,
    });
    t13.to(".section__thirteen .title", { opacity: 1 });
    t13.to(".torque__tab", { opacity: 1 });
    t13.to(".web_power__tab", {
      opacity: 0,
    });
    //Section fourteen
    const t14 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__fourteen",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t14.to(".section__thirteen .title", { opacity: 0 });
    t14.to(".torque__tab", { opacity: 0 });
    //Section fifteen
    const t15 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__fifteen",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t15.to(camera.position, {
      x: -3.8,
      z: 7.5,
      y: -1.5,
    });
    t15.to(".black-overlay", {
      opacity: 1,
      top: "-25%",
    });
    t15.to(".section__fifteen .title", {
      opacity: 1,
    });
    t15.to(".exhaust__tab", { opacity: 1 });
    //Section sixteen
    const t16 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__sixteen",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t16.to(".black-overlay", {
      opacity: 0,
    });
    t16.to(".section__fifteen .title", {
      opacity: 0,
    });
    t16.to(".exhaust__tab", { opacity: 0 });

    //Section seventeen
    const t17 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__seventeen",
        start: "top top",
        end: "bottom 50%",
        markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t17.to(camera.position, {
      y: -0.5,
      z: 8,
    });
    t17.to(".black-overlay", { opacity: 1, top: "5%", left: "-18%" });
    t17.to(".section__seventeen .title", {
      opacity: 1,
    });
    t17.to(".monoshock__tab", { opacity: 1 });
  } else {
    // frontwheel = mesh1.children[1];
    // backwheel = mesh1.children[2];
    mesh1.position.set(-25, -7.8, 0);
    mesh1.rotation.y = Math.PI / 2;
    mesh1.scale.set(13, 13, 13);
    camera.position.z = 25;

    //Section One
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__one",
        start: "top 50%",
        end: "bottom top",
        // markers: true,
        scrub: 0.5,
        duration: 20,
      },
    });
    t1.to(mesh1.position, {
      x: -13.5,
      duration: 6,
      ease: "power2.inOut",
    });
    t1.to(".light__img__desktop", { opacity: 1 });
    t1.to(".section__one .title", { opacity: 1 });

    //Section two
    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__two",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 20,
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

    //Section Three
    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__three",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t3.to(".black-overlay", {
      opacity: 0.9,
      left: "-70%",
    });
    t3.to(".section__three .title", {
      opacity: 1,
      duration: 2,
      scrub: 0.3,
    });
    t3.to(
      ".front__suspension__desktop",
      {
        opacity: 1,
      },
      "ss"
    );

    //Section four
    const t4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__four",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t4.to(".black-overlay", { opacity: 0 });
    t4.to(".front__suspension__desktop", { opacity: 0 });
    t4.to(".section__three .title", { opacity: 0 });

    //Section five
    const t5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__five",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t5.to(".black-overlay", {
      opacity: 0.9,
      left: "-70%",
    });
    t5.to(".section__five .title", {
      opacity: 1,
      duration: 2,
      scrub: 0.3,
    });
    t5.to(".abs__desktop", {
      opacity: 1,
    });

    //Section six
    const t6 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__six",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t6.to(".black-overlay", {
      opacity: 0,
      left: "-70%",
      duration: 2,
    });
    t6.to(".section__five .title", {
      opacity: 0,
      duration: 2,
      scrub: 0.3,
    });
    t6.to(".abs__desktop", {
      opacity: 0,
      duration: 2,
    });

    //Section seven
    const t7 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__seven",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t7.to(".black-overlay", {
      opacity: 1,
    });
    t7.to(".section__seven .title", {
      opacity: 1,
    });
    t7.to(".abs-brake__desktop", {
      opacity: 1,
    });
    //Section eight
    const t8 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__eight",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t8.to(".black-overlay", {
      opacity: 0,
    });
    t8.to(".section__seven .title", {
      opacity: 0,
    });
    t8.to(".abs-brake__desktop", {
      opacity: 0,
    });

    //Section nine
    const t9 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__nine",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });

    t9.to(camera.position, {
      x: -20.3,
      duration: 1,
    });
    t9.to(".black-overlay", {
      opacity: 1,
    });
    t9.to(".section__nine .title", {
      opacity: 1,
    });
    t9.to(".back-abs__desktop", {
      opacity: 1,
    });
    //Section ten
    const t10 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__ten",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });

    t10.to(".section__nine .title", {
      opacity: 0,
    });
    t10.to(".back-abs__desktop", {
      opacity: 0,
    });
    //Section eleven
    const t11 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__eleven",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t11.to(camera.position, {
      x: -13.6,
    });
    t11.to(".black-overlay", {
      opacity: 1,
    });

    t11.to(".section__eleven .title", {
      opacity: 1,
    });
    t11.to(".web_power__desktop", {
      opacity: 1,
    });

    //Section twelve
    const t12 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__twelve",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });

    t12.to(".black-overlay", {
      opacity: 0,
    });

    t12.to(".section__eleven .title", {
      opacity: 0,
    });

    //Section thirteen
    const t13 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__thirteen",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t13.to(".black-overlay", {
      opacity: 1,
    });
    t13.to(".section__thirteen .title", { opacity: 1 });
    t13.to(".torque__desktop", { opacity: 1 });
    t13.to(".web_power__desktop", {
      opacity: 0,
    });

    //Section fourteen
    const t14 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__fourteen",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });

    t14.to(".section__thirteen .title", { opacity: 0 });
    t14.to(".torque__desktop", { opacity: 0 });

    //Section fifteen
    const t15 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__fifteen",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t15.to(camera.position, {
      x: -17,
      z: 20.5,
      y: -1.5,
    });
    t15.to(".black-overlay", {
      opacity: 1,
      top: "6%",
      left: "-67%",
    });
    t15.to(".section__fifteen .title", {
      opacity: 1,
    });
    t15.to(".exhaust__desktop", { opacity: 1 });

    //Section sixteen
    const t16 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__sixteen",
        start: "top top",
        end: "bottom 50%",
        // markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t16.to(".black-overlay", {
      opacity: 0,
    });
    t16.to(".section__fifteen .title", {
      opacity: 0,
    });
    t16.to(".exhaust__desktop", { opacity: 0 });

    //Section seventeen
    const t17 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section__seventeen",
        start: "top top",
        end: "bottom 50%",
        markers: true,
        scrub: 0.5,
        duration: 3,
      },
    });
    t17.to(camera.position, {
      y: -0.5,
      x: -22,
      z: 23.5,
    });
    t17.to(".black-overlay", { opacity: 1, top: "8%", left: "-18%" });
    t17.to(".section__seventeen .title", {
      opacity: 1,
    });
    t17.to(".monoshock__desktop", { opacity: 1 });
    t17.to(".section__seventeen .title", {
      opacity: 0,
    });
    t17.to(".black-overlay", { opacity: 0, top: "8%", left: "-18%" });
    t17.to(".monoshock__desktop", { opacity: 0 });
  }

  ScrollTrigger.create({
    trigger: ".get-experience",
    start: "50% 50%",
    // markers: true,
    onEnter: () => {
      canvas.style.transform = "translateY(-1700%)";
    },
    onEnterBack: () => {
      canvas.style.position = "relative";
      canvas.style.transform = "translateY(-1700%)";
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
      document.querySelector(".section__four").style.zIndex = "5";
      document.querySelector(".section__five").style.zIndex = "5";
      document.querySelector(".section__seven").style.zIndex = "5";
      document.querySelector(".section__nine").style.zIndex = "5";
      document.querySelector(".section__eleven").style.zIndex = "5";
      document.querySelector(".section__thirteen").style.zIndex = "5";
      document.querySelector(".section__fifteen").style.zIndex = "5";
      document.querySelector(".section__seventeen").style.zIndex = "5";
      canvas.style.transform = "translateY(0%)";
    },
    onLeaveBack: () => {
      canvas.style.position = "relative";
      canvas.style.transform = "translateY(0%)";
    },
  });

  ScrollTrigger.create({
    trigger: ".section__eighteen",
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

  // if (animations && animations.length > 0) {
  //   const action = mixer.clipAction(animations[2]); // Assuming the first animation is the loop
  //   action.play();
  // }
  if (animations && animations.length > 0) {
    // Assuming the first animation is the loop
    const loopAction = mixer.clipAction(animations[0]);
    loopAction.play();

    // Play other animations (starting from index 1, as we already played the first one)
    for (let i = 1; i < animations.length; i++) {
      const action = mixer.clipAction(animations[i]);
      // You can set a delay or use other settings if needed
      action.play();
    }
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
    // frontwheel.rotation.x += 0.19;
    // backwheel.rotation.x += 0.19;
  }
  renderer.render(scene, camera);
}

animate();

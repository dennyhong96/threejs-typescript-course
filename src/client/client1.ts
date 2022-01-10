// THREE.js helps add and descirbe data in 3 dimensions (as meshes & lights)
// then help convert 3 dimensions data into 3d representation onto a <canvas/>
import * as THREE from "three";
import { Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// a scene sets up what is to be rendered by THREE.js and where it is in 3D coords
// we can then add objects and lightings into a scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xff0000);
const scene2 = new THREE.Scene();

// a camera describes the view boundaries of the scene
// perspective camera mimics the way human eye sees
// closer objects appears larger, furthur objects appears smaller
const camera = new THREE.PerspectiveCamera(
  75, // FOV
  200 / 200, // aspect ratio
  0.1, // near clipping plane
  10 // far clipping plane (renderer draws everything within near and far plane)
);
camera.position.z = 2;

// a OrthographicCamera is like a tube, no perspective
// far plane is always the same as near plane, always looks flat
const camera2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10); // left, right, top, bottom, near plane, far plane
// make camera2 look top-down
camera2.position.y = 2; // lift camera up by 2
camera2.lookAt(new Vector3(0, 0, 0)); // face camera to scene, scene is at 0,0,0, so we look at 0,0,0
// make camera3 look from left side
const camera3 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10); // left, right, top, bottom, near plane, far plane
camera3.position.x = -2; // move camera left by 2
camera3.lookAt(new THREE.Vector3(0, 0, 0));
// camera4 looks from front
const camera4 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10); // left, right, top, bottom, near plane, far plane
camera4.position.z = 2; // move camera closer to screen by 2

// a renderer displays the scene onto a HTML canvas element
// can use existing canvas in document, or insert into document dynamically
const canvas = document.querySelector("#scene1")!;
const canvas2 = document.querySelector("#scene2")!;
const canvas3 = document.querySelector("#scene3")!;
const canvas4 = document.querySelector("#scene4")!;
const renderer = new THREE.WebGLRenderer({ canvas }); // WebGL allows GPU-accelerated image processing
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 }); // WebGL allows GPU-accelerated image processing
const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3 }); // WebGL allows GPU-accelerated image processing
const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4 }); // WebGL allows GPU-accelerated image processing
renderer.setSize(200, 200); // must set a size for WebGL renderer
renderer2.setSize(200, 200); // must set a size for WebGL renderer
renderer3.setSize(200, 200); // must set a size for WebGL renderer
renderer4.setSize(200, 200); // must set a size for WebGL renderer
// document.body.appendChild(renderer.domElement); // renderer.domElement is the <canvas/> element
// console.dir(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);
const control2 = new OrbitControls(camera2, renderer2.domElement);

// const geometry = new THREE.BoxGeometry();
const geometry = new THREE.TorusKnotGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
cube.scale.x = 0.5;
cube.scale.y = 0.5;
cube.scale.z = 0.5;
scene.add(cube); // a mesh can only be a member of ONE SINGLE scene

const cube2 = new THREE.Mesh(geometry, material);
scene2.add(cube2); // a mesh can only be a member of ONE SINGLE scene

console.dir(scene);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = 200 / 200;
  camera.updateProjectionMatrix();
  renderer.setSize(200, 200);
  render();
}

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube2.rotation.y += 0.01;
  render();
  requestAnimationFrame(animate);
}

function render() {
  renderer.render(scene, camera);
  renderer2.render(scene, camera2);
  renderer3.render(scene2, camera3);
  renderer4.render(scene, camera4);
}

animate();

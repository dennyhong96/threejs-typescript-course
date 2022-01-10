// THREE.js helps add and descirbe data in 3 dimensions (as meshes & lights)
// then help convert 3 dimensions data into 3d representation onto a <canvas/>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// a scene sets up what is to be rendered by THREE.js and where it is in 3D coords
// we can then add objects and lightings into a scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xff0000);

// a camera describes the view boundaries of the scene
// perspective camera mimics the way human eye sees
// closer objects appears larger, furthur objects appears smaller
const camera = new THREE.PerspectiveCamera(
  75, // fov
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near clipping plane
  1000 // far clipping plane
);
camera.position.z = 2;

// a renderer displays the scene onto a HTML canvas element
const renderer = new THREE.WebGLRenderer(); // WebGL allows GPU-accelerated image processing
renderer.setSize(window.innerWidth, window.innerHeight); // must set a size for WebGL renderer
document.body.appendChild(renderer.domElement); // renderer.domElement is the <canvas/> element
// console.dir(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);
control.addEventListener("change", render);
// if OrbitControls doesn't have it's own change handler,
// it needs render to be called in animate to work

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

console.dir(scene);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function animate() {
  // requestAnimationFrame tells the browser to to perform an animation
  // and requests that the browser invokes the callback to update
  // an animation before next repaint. callback in invoked about 60times/sec
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  render();
}

function render() {
  renderer.render(scene, camera);
}

animate(); // or commonly called "the game loop" in game development
// render();

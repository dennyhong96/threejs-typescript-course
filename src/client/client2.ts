// THREE.js helps add and descirbe data in 3 dimensions (as meshes & lights)
// then help convert 3 dimensions data into 3d representation onto a <canvas/>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
import { Vector3 } from "three";

class App {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  private control: OrbitControls;

  private cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;

  private stats: Stats;
  private gui: GUI;

  constructor() {
    // a scene sets up what is to be rendered by THREE.js and where it is in 3D coords
    // we can then add objects and lightings into a scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#333");
    this.scene.add(new THREE.AxesHelper(5));
    console.dir(this.scene);
    // Everything that can be displayed into a 3D space extends Object3D class, scene,camera,mesh,etc.

    // a camera describes the view boundaries of the scene
    // perspective camera mimics the way human eye sees
    // closer objects appears larger, furthur objects appears smaller
    this.camera = new THREE.PerspectiveCamera(
      75, // fov
      window.innerWidth / window.innerHeight, // aspect ratio
      0.1, // near clipping plane
      1000 // far clipping plane
    );
    this.camera.position.z = 2;

    // a renderer displays the scene onto a HTML canvas element
    this.renderer = new THREE.WebGLRenderer(); // WebGL allows GPU-accelerated image processing
    this.renderer.setSize(window.innerWidth, window.innerHeight); // must set a size for WebGL renderer
    document.body.appendChild(this.renderer.domElement); // renderer.domElement is the <canvas/> element
    // console.dir(this.renderer.domElement);

    this.control = new OrbitControls(this.camera, this.renderer.domElement);
    // this.control.addEventListener("change", render);
    // if OrbitControls doesn't have it's own change handler,
    // it needs render to be called in animate to work

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // const ambient = new THREE.HemisphereLight(0xffffff, 0x666666, 0.3);
    // this.scene.add(ambient);
    // const light = new THREE.DirectionalLight();
    // light.position.set(0.2, 1, 1);
    // this.scene.add(light);

    // Stats panel (useful in dev mode)
    this.stats = Stats();
    document.body.appendChild(this.stats.domElement);

    // GUI adds a basic UI to interact with the 3d scene and the objects within it.
    this.gui = new GUI();
    this.addGui();

    window.addEventListener("resize", this.handleResize.bind(this), false);
    this.animate();
  }

  private addGui(): void {
    const cubeFolder = this.gui.addFolder("Cube"); // for grouping controls
    cubeFolder.add(this.cube, "visible");
    const cubeRotationFolder = cubeFolder.addFolder("Rotation");
    cubeRotationFolder.add(this.cube.rotation, "x", 0, Math.PI * 2);
    cubeRotationFolder.add(this.cube.rotation, "y", 0, Math.PI * 2);
    cubeRotationFolder.add(this.cube.rotation, "z", 0, Math.PI * 2);
    cubeRotationFolder.open(); // group is default open
    const cubePositionFolder = cubeFolder.addFolder("Position");
    cubePositionFolder.add(this.cube.position, "x", -10, 10, 0.1);
    cubePositionFolder.add(this.cube.position, "y", -10, 10, 0.1);
    cubePositionFolder.add(this.cube.position, "z", -10, 10, 0.1);
    cubePositionFolder.open();
    const cubeScaleFolder = cubeFolder.addFolder("Scale");
    cubeScaleFolder.add(this.cube.scale, "x", -5, 5);
    cubeScaleFolder.add(this.cube.scale, "y", -5, 5);
    cubeScaleFolder.add(this.cube.scale, "z", -5, 5);
    cubeScaleFolder.open();
    cubeFolder.open(); // group is default open
    const cameraFolder = this.gui.addFolder("Camera");
    cameraFolder.add(this.camera.position, "z", 0, 20);
    cameraFolder.open();
  }

  private handleResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  // animate() commonly called "the game loop" in game development
  private animate(): void {
    // requestAnimationFrame tells the browser to to perform an animation
    // and requests that the browser invokes the callback to update
    // an animation before next repaint. callback in invoked about 60times/sec
    requestAnimationFrame(this.animate.bind(this));

    // stats.begin() && stats.end() measure perf of operations in between
    // this.stats.begin();
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    // this.stats.end();

    this.render();

    this.stats.update();
  }
}

new App();

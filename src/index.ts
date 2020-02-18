import {
  PerspectiveCamera,
  BoxGeometry,
  MeshPhysicalMaterial,
  Mesh,
  Scene,
  DirectionalLight,
  PointLight,
  SphereGeometry,
  MeshBasicMaterial
} from 'three';
import { createRenderer, resizeRendererToDisplaySize } from './util';
import { CameraController } from './CameraController';

const renderer = createRenderer();

const camera = new PerspectiveCamera(75, 1, 0.01, 0.8);
const cameraController = new CameraController(0.4, 0.01);

const scene = new Scene();
const box = createBox(0.1, 0xff0000);
scene.add(box);

const light = new PointLight();
scene.add(light);

const render = () => {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  light.position.copy(camera.position);

  cameraController.update(camera);

  renderer.render(scene, camera);

  requestAnimationFrame(render);
};

render();

function createBox(size: number, color: number) {
  const geometry = new BoxGeometry(size, size, size);
  const material = new MeshPhysicalMaterial({
    color,
    metalness: 0.1,
    roughness: 0.5
  });
  return new Mesh(geometry, material);
}

// function createSphere(radius: number, color: number) {
//   const geometry = new SphereGeometry(radius, 32, 32);
//   const material = new MeshBasicMaterial({
//     color
//   });
//   return new Mesh(geometry, material);
// }

import {
  PerspectiveCamera,
  BoxGeometry,
  MeshPhysicalMaterial,
  Mesh,
  Scene,
  PointLight,
  Vector4
} from 'three';
import { createRenderer, resizeRendererToDisplaySize } from './util';
import { CameraController } from './CameraController';
import { Spinner } from './Spinner';

const renderer = createRenderer();

const camera = new PerspectiveCamera(75, 1, 0.01, 0.8);
const cameraController = new CameraController(0.4, 0.01);

const scene = new Scene();

const box = createBox(0.1, 0xff0000);
box.position.y = -0.05;
scene.add(box);

const spinner = new Spinner(0.1, new Vector4(0, 1, 0, 0.4));
spinner.position.y = 0.05;
scene.add(spinner);

const light = new PointLight();
scene.add(light);

let angleFrom = 0;
let angleTo = 0;

const render = () => {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  light.position.copy(camera.position);

  cameraController.update(camera);

  angleFrom += 0.05;
  angleTo += 0.1;

  spinner.setFromAngle(angleFrom);
  spinner.setToAngle(angleTo);

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

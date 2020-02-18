import { Mesh, PlaneGeometry, DoubleSide, ShaderMaterial } from 'three';
import spinnerVert from './shaders/spinner_vert.glsl';
import spinnerFrag from './shaders/spinner_frag.glsl';

export class Spinner extends Mesh {
  constructor(size: number) {
    const geometry = new PlaneGeometry(size, size);
    const material = new ShaderMaterial({
      vertexShader: spinnerVert,
      fragmentShader: spinnerFrag,
      side: DoubleSide,
      transparent: true
    });

    super(geometry, material);
  }
}

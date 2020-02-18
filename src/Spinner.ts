import {
  Mesh,
  PlaneGeometry,
  DoubleSide,
  ShaderMaterial,
  Vector4
} from 'three';
import spinnerVert from './shaders/spinner_vert.glsl';
import spinnerFrag from './shaders/spinner_frag.glsl';

export class Spinner extends Mesh {
  public material: ShaderMaterial;

  constructor(size: number, color: Vector4) {
    super();

    this.geometry = new PlaneGeometry(size, size);
    this.material = new ShaderMaterial({
      vertexShader: spinnerVert,
      fragmentShader: spinnerFrag,
      side: DoubleSide,
      transparent: true,
      uniforms: {
        fromAngle: {
          value: 0
        },
        toAngle: {
          value: Math.PI / 2
        },
        color: {
          value: color
        }
      }
    });
  }

  setFromAngle(value: number) {
    this.material.uniforms.fromAngle.value = value;
  }

  setToAngle(value: number) {
    this.material.uniforms.toAngle.value = value;
  }
}

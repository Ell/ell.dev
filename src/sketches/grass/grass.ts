import * as THREE from 'three';

import fragShader from './grass.frag';
import vertShader from './grass.vert';

type State = {};

const state: State = {};

const three = new THREE.WebGLRenderer();

const canvasEl = document.getElementById('canvas');
canvasEl?.appendChild(three.domElement);

window.addEventListener('resize', () => {
  three.setSize(window.innerWidth, window.innerHeight);
});

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 1000);
camera.position.set(0, 0, 1);

const material = new THREE.ShaderMaterial({
  uniforms: {},
  vertexShader: vertShader,
  fragmentShader: fragShader,
});

const geometry = new THREE.PlaneGeometry(1, 1);

const plane = new THREE.Mesh(geometry, material);
plane.position.set(0.5, 0.5, 0);

scene.add(plane);

export function run() {
  three.setSize(window.innerWidth, window.innerHeight);

  requestAnimationFrame(function loop(time) {
    three.render(scene, camera);
    requestAnimationFrame(loop);
  });
}

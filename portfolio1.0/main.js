import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//geometries

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0xFF637});
const torus = new THREE.Mesh(geometry, material);


const ryanTexture = new THREE.TextureLoader().load('ryan.JPG');
const ryan = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:ryanTexture})
);

const earthTexture = new THREE.TextureLoader().load('earth.jpeg')

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:earthTexture
    })
);


earth.position.z = 30;
earth.position.x = -10;

scene.add(torus, ryan ,earth)


//lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,10,10)

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const  gridHelper = new THREE.GridHelper(200, 50);

// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpeg');
scene.background = spaceTexture;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  earth.rotation.x += .05;  
  earth.rotation.y += .075;
  earth.rotation.z += .05;

  ryan.rotation.y += .01;
  ryan.rotation.x += .01;

camera.position.z = t * -.01;
camera.position.x = t * -.0002;
camera.position.y = t * -.0002;

}

document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += .01;  
  torus.rotation.y += .005;
  torus.rotation.z += .01;

  controls.update;

  renderer.render(scene, camera);
}

animate()

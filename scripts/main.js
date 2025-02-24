import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js';
// import WebGL from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/capabilities/WebGL.js';


const scene = new THREE.Scene();

// Добавляем освещение
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Мягкий белый свет
scene.add(ambientLight);

// Добавляем несколько направленных источников света
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5); // Направленный свет
directionalLight1.position.set(1, 1, 1).normalize(); // Положение света
scene.add(directionalLight1);

// const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5); // Второй направленный свет
// directionalLight2.position.set(-1, 1, -1).normalize(); // Положение света
// scene.add(directionalLight2);

// const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5); // Третий направленный свет
// directionalLight3.position.set(1, -1, -1).normalize(); // Положение света
// scene.add(directionalLight3);

// const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.5); // Четвертый направленный свет
// directionalLight4.position.set(-1, -1, 1).normalize(); // Положение света
// scene.add(directionalLight4);

// const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.5); // Пятый направленный свет
// directionalLight5.position.set(1, -1, 1).normalize(); // Положение света
// scene.add(directionalLight5);

// const directionalLight6 = new THREE.DirectionalLight(0xffffff, 0.5); // Шестой направленный свет
// directionalLight6.position.set(-1, 1, 1).normalize(); // Положение света
// scene.add(directionalLight6);

const camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('scene').appendChild( renderer.domElement );

// Добавляем OrbitControls
const controls = new OrbitControls(camera, renderer.domElement); // Создаем контроллер
controls.enableDamping = true; // Включаем затухание
controls.dampingFactor = 0.25; // Фактор затухания

// Устанавливаем пределы приближения
controls.minDistance = 10; // Минимальное расстояние
controls.maxDistance = 100; // Максимальное расстояние

const loader = new GLTFLoader();

loader.load('../Gipsy.glb', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

function animate() {
    // Убираем вращение сцены, чтобы свет всегда падал с одной стороны
    scene.rotation.y += 0.001; // Закомментируем эту строку
    controls.update(); // Обновляем контроллер
	renderer.render( scene, camera );
}

if ( WebGL.isWebGL2Available() ) {
	// Initiate function or other initializations here
	animate();
    renderer.setAnimationLoop( animate );
} else {
	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}
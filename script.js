// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initial object setup: a cube by default
let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let object = new THREE.Mesh(geometry, material);
scene.add(object);

// Position the camera
camera.position.z = 5;

// Add controls for rotation, scale, and color
const rotateXControl = document.getElementById('rotateX');
const rotateYControl = document.getElementById('rotateY');
const scaleControl = document.getElementById('scale');
const colorControl = document.getElementById('color');
const shapeControl = document.getElementById('shape');

// Function to update the 3D object's color
colorControl.addEventListener('input', (e) => {
    object.material.color.set(e.target.value);
});

// Function to update the object's shape based on user selection
shapeControl.addEventListener('change', (e) => {
    scene.remove(object); // Remove the current object
    const shape = e.target.value;

    switch (shape) {
        case 'cube':
            geometry = new THREE.BoxGeometry();
            break;
        case 'sphere':
            geometry = new THREE.SphereGeometry(1, 32, 32);
            break;
        case 'cone':
            geometry = new THREE.ConeGeometry(1, 2, 32);
            break;
    }

    object = new THREE.Mesh(geometry, material);
    scene.add(object); // Add the new object to the scene
});

// Animate the scene and object
function animate() {
    requestAnimationFrame(animate);

    // Rotate the object based on slider values
    object.rotation.x = THREE.Math.degToRad(rotateXControl.value);
    object.rotation.y = THREE.Math.degToRad(rotateYControl.value);

    // Scale the object based on the scale slider
    const scale = scaleControl.value;
    object.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
}

animate();

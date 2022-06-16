import './style.css'
import * as THREE from 'three'



// Config
const canvas = document.querySelector('.webgl')
const sizes = {
    width: 800,
    height: 600
}
const fieldOfView = 75
const aspectRatio = sizes.width / sizes.height

console.log(canvas);

// Setup Scene
const scene = new THREE.Scene()


// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff3333 })
const cube     = new THREE.Mesh(geometry, material)
scene.add(cube)

// Camera
const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio)
camera.position.z = 3
scene.add(camera)

// Render Scene
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


console.log("Hello?")
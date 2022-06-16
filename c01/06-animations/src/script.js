import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Time
// let time = Date.now()

// Clock
// const clock = new THREE.Clock()

// Greensock Stuff
// Has its own tick, doesn't need to update itself, but you still need to render in tick
gsap.to(mesh.position, { durection: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { durection: 1, delay: 2, x: 0 })


// Animation 
const tick = () =>
{
    // Time: Simon's First Solution
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime

    // Time: My version of DeltaTime which compares Miliseconds between frames with the ideal FPS
    // const fps = 60
    // const currentTime = Date.now()
    // const deltaTime = (currentTime - time) / (1000 / fps)
    // time = currentTime
    // console.log(deltaTime)

    // Update Objects
    // mesh.rotation.y -= 0.01
    // mesh.rotation.x -= 0.01
    // mesh.rotation.z -= 0.01

    // Clock
    // const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)

    // Update Objects
    // mesh.rotation.y = elapsedTime * Math.PI * 2
    // mesh.rotation.y = Math.sin(elapsedTime)
    // mesh.position.y = Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)
    // mesh.rotation.z = elapsedTime * Math.PI * 2

    // camera.lookAt(mesh.position)
 


    // Renderer
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
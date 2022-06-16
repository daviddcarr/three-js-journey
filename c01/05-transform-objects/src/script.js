import './style.css'
import * as THREE from 'three'
import { CameraHelper } from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff3333 })
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x33ff33 })
)
cube2.position.x = 1.1
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x3333ff })
)
cube3.position.x = -1.1
group.add(cube3)



// Axes Helper Model
const axesLength = 1
const axesHelper = new THREE.AxesHelper(axesLength)
scene.add(axesHelper)

group.rotation.x = Math.PI * 0.2

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 1
camera.position.x = 1
scene.add(camera)

// Distance from Camera
console.log(axesHelper.position.distanceTo(camera.position))

// const position = new THREE.Vector3(3, 0, 0)
camera.lookAt(axesHelper.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
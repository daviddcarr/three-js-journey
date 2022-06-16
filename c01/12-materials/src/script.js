import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()


const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const foamColorTexture = textureLoader.load('/textures/PackingFoam/PackingFoam_COL_4K.jpg')
const foamAmbientOcclusionTexture = textureLoader.load('/textures/PackingFoam/PackingFoam_AO_4K.jpg')
const foamHeightTexture = textureLoader.load('/textures/PackingFoam/PackingFoam_DISP_4K.jpg')
const foamNormalTexture = textureLoader.load('/textures/PackingFoam/PackingFoam_NRM_4K.jpg')
const foamRoughnessTexture = textureLoader.load('/textures/PackingFoam/PackingFoam_REFL_4K.jpg')


const matcapTexture = textureLoader.load('/textures/matcaps/7.png')

// Toon gradient texture must have mipmaps set to nearest / disabled
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false


const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/2/px.jpg',
    '/textures/environmentMaps/2/nx.jpg',
    '/textures/environmentMaps/2/py.jpg',
    '/textures/environmentMaps/2/ny.jpg',
    '/textures/environmentMaps/2/pz.jpg',
    '/textures/environmentMaps/2/nz.jpg',
])

/**
 * Debug
 */
 const gui = new lil.GUI({ closed: true })



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Materials
 */
// const material = new THREE.MeshBasicMaterial({
//     // map: doorColorTexture
//     // color: 0xff0000
//     // color: 'red'
// })
// material.map = doorColorTexture
// material.side = THREE.DoubleSide
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// // material.color = new THREE.Color( 'yellow' )
// // material.color.set( '#ff3333' )

// // material.wireframe = true

// // material.opacity = 0.5

// // Change culling, Doubleside is harder on GPU
// // material.side = THREE.FrontSide
// // material.side = THREE.BackSide



// const material = new THREE.MeshNormalMaterial()
// material.wireframe = true
// material.flatShading = true


// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// Very performant and reactive to light, but has strange graphical effects
// const material = new THREE.MeshLambertMaterial()

// Less Performant, reactive to light, no graphic effect, and some glossy light bounce
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 1000 
// material.specular = new THREE.Color(0xff3333)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

const material = new THREE.MeshStandardMaterial()
material.metalness = 0
material.roughness = 1
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.05

material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture

material.normalMap = doorNormalTexture
material.normalScale.set(0.5, 0.5)

material.transparent = true
material.alphaMap = doorAlphaTexture

material.envMap = environmentMapTexture

// material.wireframe = true

const torusMaterial = new THREE.MeshStandardMaterial()
torusMaterial.map = foamColorTexture
torusMaterial.aoMap = foamAmbientOcclusionTexture
torusMaterial.displacementMap = foamHeightTexture
torusMaterial.displacementScale = 0.1
torusMaterial.roughnessMap = foamRoughnessTexture
torusMaterial.normalMap = foamNormalTexture

torusMaterial.envMap = environmentMapTexture


const sphereMaterial = new THREE.MeshStandardMaterial()
sphereMaterial.metalness = 0.7
sphereMaterial.roughness = 0.2

sphereMaterial.envMap = environmentMapTexture

gui.add(sphereMaterial, 'metalness').min(0).max(1).step(0.0001)
gui.add(sphereMaterial, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(10).step(0.0001)

gui.add(material.normalScale, 'x').min(0).max(3).step(0.001)
gui.add(material.normalScale, 'y').min(0).max(3).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    sphereMaterial
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)


const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    torusMaterial
)
torus.position.x = 1.5

plane.geometry.setAttribute(
    'uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)
sphere.geometry.setAttribute(
    'uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)
torus.geometry.setAttribute(
    'uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)

scene.add(sphere, plane, torus)


/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
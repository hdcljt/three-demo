import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { resizeRendererToDisplaySize, getCtx } from '../utils'
import style from '../styles/c2.module.css'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

let rafId = 0

const geometries = [
    'TextureLoader',
    'LoadingManager',
    'CubeTextureLoader',
    'VideoTexture',
    'CanvasTexture',
    'RenderTarget.texture',
    'Scene.background'
]

/**
 * @callback sceneCallBack
 * @param {number} time
 * @return {void}
 *
 * @type {{elem: HTMLDivElement; fn: sceneCallBack}[]}
 */
const sceneElements = []

/**
 * @param {HTMLDivElement} elem
 * @param {sceneCallBack} fn
 */
const addScene = (elem, fn) => {
    sceneElements.push({ elem, fn })
}

/**
 * @param {HTMLDivElement} elem
 * @returns {{ scene: THREE.Scene; camera: THREE.PerspectiveCamera, controls: OrbitControls }}
 */
const makeScene = elem => {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(-1, 1, 2)
    scene.add(camera)

    const light = new THREE.DirectionalLight()
    light.position.set(-1, 2, 4)
    camera.add(light)

    const controls = new TrackballControls(camera, elem)
    controls.noPan = true
    controls.noZoom = true

    return { scene, camera, controls }
}

/**
 * @param {THREE.WebGLRenderer} renderer
 * @param {HTMLSpanElement} elem
 * @param {THREE.Mesh | THREE.LineSegments | THREE.Object3D} mesh
 * @param {(renderer: THREE.WebGLRenderer, scene: THREE.Scene) => void} update
 * @param {(scene: THREE.Scene, camera: THREE.PerspectiveCamera) => void} init
 */
const setupSence = (renderer, elem, mesh, update, init) => {
    const { scene, camera, controls } = makeScene(elem)
    scene.add(mesh)
    init && init(scene, camera)
    addScene(elem, time => {
        // mesh.rotation.y = time * 0.1
        update && update(renderer, scene)
        controls.update()
        renderer.render(scene, camera)
    })
}

/**
 * @param {THREE.WebGLRenderer} renderer
 * @param {number} time
 * @param {HTMLDivElement} scrollElem
 */
const renderSceneInfo = (renderer, time, scrollElem) => {
    const canvas = renderer.domElement
    const translateY = scrollElem.scrollTop
    canvas.style.transform = `translateY(${translateY}px)`

    const {
        left: parentLeft,
        top: parentTop,
        bottom: parentBottom
    } = scrollElem.getBoundingClientRect()

    sceneElements.forEach(({ elem, fn }) => {
        const {
            left,
            top,
            bottom,
            width,
            height
        } = elem.getBoundingClientRect()
        if (bottom < parentTop || top > parentBottom) return
        const positiveYUpBottom = parentBottom - bottom
        const positiveYLeftRight = left - parentLeft
        renderer.setScissor(
            positiveYLeftRight,
            positiveYUpBottom,
            width,
            height
        )
        renderer.setViewport(
            positiveYLeftRight,
            positiveYUpBottom,
            width,
            height
        )

        fn(time)
    })
}

export default defineComponent({
    setup() {
        /** @type {import('vue').Ref<HTMLCanvasElement>} */
        const cvs = ref(null)
        /** @type {import('vue').Ref<HTMLDivElement>} */
        const list = ref(null)
        /** @type {import('vue').Ref<HTMLVideoElement>} */
        const video = ref(null)
        /** @type {import('vue').Ref<HTMLDivElement[]>} */
        const item = ref([])

        onMounted(() => {
            const renderer = new THREE.WebGLRenderer({ canvas: cvs.value })

            const geometry = new THREE.BoxBufferGeometry()
            geometries.forEach((v, i) => {
                let mesh
                if (v === 'TextureLoader') {
                    const loader = new THREE.TextureLoader()
                    const material = new THREE.MeshBasicMaterial({
                        map: loader.load('/textures/cube/neg-x.jpg')
                    })
                    mesh = new THREE.Mesh(geometry, material)
                    setupSence(renderer, item.value[i], mesh)
                } else if (v === 'LoadingManager') {
                    const loadMgr = new THREE.LoadingManager()
                    const loader = new THREE.TextureLoader(loadMgr)
                    const materials = [
                        new THREE.MeshBasicMaterial({
                            map: loader.load('/textures/cube/pos-x.jpg')
                        }),
                        new THREE.MeshBasicMaterial({
                            map: loader.load('/textures/cube/neg-x.jpg')
                        }),
                        new THREE.MeshBasicMaterial({
                            map: loader.load('/textures/cube/pos-y.jpg')
                        }),
                        new THREE.MeshBasicMaterial({
                            map: loader.load('/textures/cube/neg-y.jpg')
                        }),
                        new THREE.MeshBasicMaterial({
                            map: loader.load('/textures/cube/pos-z.jpg')
                        }),
                        new THREE.MeshBasicMaterial({
                            map: loader.load('/textures/cube/neg-z.jpg')
                        })
                    ]
                    mesh = new THREE.Mesh(geometry, materials)
                    setupSence(renderer, item.value[i], mesh)
                } else if (v === 'CubeTextureLoader') {
                    const loader = new THREE.CubeTextureLoader()
                    const texture = loader
                        .setPath('/textures/cube/')
                        .load([
                            'pos-x.jpg',
                            'neg-x.jpg',
                            'pos-y.jpg',
                            'neg-y.jpg',
                            'pos-z.jpg',
                            'neg-z.jpg'
                        ])
                    const material = new THREE.MeshBasicMaterial({
                        envMap: texture
                    })
                    // mesh = new THREE.Mesh(geometry, material)
                    mesh = new THREE.Mesh(
                        new THREE.SphereBufferGeometry(0.8, 32, 16),
                        material
                    )
                    setupSence(renderer, item.value[i], mesh)
                } else if (v === 'VideoTexture') {
                    video.value.play()
                    const texture = new THREE.VideoTexture(video.value)
                    const material = new THREE.MeshBasicMaterial({
                        map: texture
                    })
                    const sphere = new THREE.SphereBufferGeometry(2, 32, 16)
                    sphere.scale(-1, 1, 1)
                    mesh = new THREE.Mesh(sphere, material)
                    setupSence(renderer, item.value[i], mesh)
                } else if (v === 'CanvasTexture') {
                    const { canvas, drawRandDot } = getCtx
                    const texture = new THREE.CanvasTexture(canvas)
                    const material = new THREE.MeshBasicMaterial({
                        map: texture
                    })
                    mesh = new THREE.Mesh(geometry, material)
                    setupSence(renderer, item.value[i], mesh, () => {
                        drawRandDot()
                        texture.needsUpdate = true
                    })
                } else if (v === 'RenderTarget.texture') {
                    const renderTarget = new THREE.WebGLRenderTarget(512, 512, {
                        depthBuffer: false,
                        stencilBuffer: false
                    })
                    mesh = new THREE.Mesh(
                        geometry,
                        new THREE.MeshPhongMaterial({
                            map: renderTarget.texture
                        })
                    )
                    const { canvas, drawRandDot } = getCtx
                    const texture = new THREE.CanvasTexture(canvas)
                    const rtCube = new THREE.Mesh(
                        geometry,
                        new THREE.MeshBasicMaterial({
                            map: texture
                        })
                    )
                    const rtCamera = new THREE.PerspectiveCamera(
                        45,
                        1,
                        0.1,
                        100
                    )
                    rtCamera.position.z = 3
                    const rtScene = new THREE.Scene()
                    rtScene.background = new THREE.Color('cyan')
                    rtScene.add(rtCube)
                    setupSence(renderer, item.value[i], mesh, renderer => {
                        drawRandDot()
                        texture.needsUpdate = true

                        rtCube.rotation.x += 0.01
                        rtCube.rotation.y += 0.01

                        renderer.setRenderTarget(renderTarget)
                        renderer.render(rtScene, rtCamera)
                        renderer.setRenderTarget(null)
                    })
                } else {
                    const loader = new THREE.CubeTextureLoader()
                    const texture = loader
                        .setPath('/textures/cube/')
                        .load([
                            'pos-x.jpg',
                            'neg-x.jpg',
                            'pos-y.jpg',
                            'neg-y.jpg',
                            'pos-z.jpg',
                            'neg-z.jpg'
                        ])

                    const material = new THREE.MeshBasicMaterial({
                        envMap: texture
                    })
                    mesh = new THREE.Mesh(
                        new THREE.SphereBufferGeometry(0.4, 32, 16),
                        material
                    )

                    setupSence(
                        renderer,
                        item.value[i],
                        mesh,
                        undefined,
                        scene => {
                            scene.background = texture
                        }
                    )
                }
            })

            const animate = time => {
                time *= 0.001

                resizeRendererToDisplaySize(renderer)

                renderer.setClearColor(0xffffff)
                renderer.setScissorTest(false)
                renderer.clear()

                renderer.setClearColor(0xe0e0e0)
                renderer.setScissorTest(true)

                renderSceneInfo(renderer, time, list.value)

                rafId = requestAnimationFrame(animate)
            }

            rafId = requestAnimationFrame(animate)
        })

        onBeforeUnmount(() => {
            cancelAnimationFrame(rafId)
        })

        return () => (
            <div ref={list} class={style.content}>
                <video
                    ref={video}
                    src='/textures/pano.mp4'
                    muted
                    loop
                    playsinline
                    crossorigin='anonymous'
                    class={style.hide}
                ></video>
                <canvas ref={cvs} class={style.canvas}></canvas>
                {geometries.map((v, i) => (
                    <div class={style.item}>
                        <div
                            ref={el => {
                                item.value[i] = el
                            }}
                        ></div>
                        <div>{v}</div>
                    </div>
                ))}
            </div>
        )
    }
})

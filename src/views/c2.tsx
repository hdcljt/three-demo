import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { resizeRendererToDisplaySize, randColor } from '../utils'
// @ts-ignore
import style from '../styles/c2.module.css'

let rafId = 0

const geometries = [
    'BoxBufferGeometry',
    'SphereBufferGeometry',
    'EdgesGeometry',
    'WireframeGeometry',
    'TextBufferGeometry'
]

interface SceneElemType {
    elem: HTMLDivElement
    fn(time: number): void
}

const sceneElements: SceneElemType[] = []

const addScene = (elem: HTMLDivElement, fn: (time: number) => void) => {
    sceneElements.push({ elem, fn })
}

const makeScene = (elem: HTMLDivElement) => {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 3)
    scene.add(camera)

    const light = new THREE.DirectionalLight()
    light.position.set(-1, 2, 4)
    camera.add(light)

    const controls = new OrbitControls(camera, elem)
    controls.enablePan = false
    controls.enableZoom = false
    controls.update()

    const axesHelper = new THREE.AxesHelper()
    axesHelper.material['depthTest'] = false
    axesHelper.renderOrder = 2
    scene.add(axesHelper)

    const gridHelper = new THREE.GridHelper(3, 3)
    gridHelper.material['depthTest'] = false
    axesHelper.renderOrder = 1
    scene.add(gridHelper)

    return { scene, camera }
}

const setupSence = (
    renderer: THREE.WebGLRenderer,
    elem: HTMLDivElement,
    mesh: THREE.Mesh | THREE.LineSegments | THREE.Object3D
) => {
    const { scene, camera } = makeScene(elem)
    scene.add(mesh)
    addScene(elem, time => {
        mesh.rotation.y = time * 0.1
        renderer.render(scene, camera)
    })
}

const renderSceneInfo = (
    renderer: THREE.WebGLRenderer,
    time: number,
    scrollElem: HTMLDivElement
) => {
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
        const cvs = ref<HTMLCanvasElement>(null)
        const list = ref<HTMLDivElement>(null)
        const item = ref<HTMLDivElement[]>([])

        onMounted(() => {
            const renderer = new THREE.WebGLRenderer({ canvas: cvs.value })

            geometries.forEach((v, i) => {
                let mesh: THREE.Mesh | THREE.LineSegments
                if (v === 'BoxBufferGeometry') {
                    const material = new THREE.MeshPhongMaterial({
                        color: randColor()
                    })
                    const geometry = new THREE.BoxBufferGeometry()
                    mesh = new THREE.Mesh(geometry, material)
                    setupSence(renderer, item.value[i], mesh)
                } else if (v === 'SphereBufferGeometry') {
                    const material = new THREE.MeshPhongMaterial({
                        color: randColor()
                    })
                    const geometry = new THREE.SphereBufferGeometry()
                    mesh = new THREE.Mesh(geometry, material)
                    setupSence(renderer, item.value[i], mesh)
                } else if (v === 'EdgesGeometry') {
                    const geometry = new THREE.BoxBufferGeometry()
                    const edges = new THREE.EdgesGeometry(geometry, 90)
                    const material = new THREE.LineBasicMaterial({
                        color: randColor()
                    })
                    mesh = new THREE.LineSegments(edges, material)
                    setupSence(renderer, item.value[i], mesh)
                } else if (v === 'WireframeGeometry') {
                    const geometry = new THREE.SphereBufferGeometry()
                    const line = new THREE.WireframeGeometry(geometry)
                    const material = new THREE.LineBasicMaterial({
                        color: randColor()
                    })
                    mesh = new THREE.LineSegments(line, material)
                    setupSence(renderer, item.value[i], mesh)
                } else if (v === 'TextBufferGeometry') {
                    const loader = new THREE.FontLoader()
                    loader.load(
                        '/fonts/helvetiker_regular.typeface.json',
                        font => {
                            const geometry = new THREE.TextBufferGeometry(
                                'three.js',
                                {
                                    font,
                                    size: 0.5,
                                    height: 0.1,
                                    curveSegments: 12,
                                    bevelEnabled: true,
                                    bevelThickness: 0.06,
                                    bevelSize: 0.05,
                                    bevelSegments: 5
                                }
                            )
                            const material = new THREE.MeshPhongMaterial({
                                color: randColor()
                            })
                            mesh = new THREE.Mesh(geometry, material)
                            geometry.computeBoundingBox()
                            geometry.boundingBox
                                .getCenter(mesh.position)
                                .multiplyScalar(-1)
                            const parent = new THREE.Object3D()
                            parent.add(mesh)
                            setupSence(renderer, item.value[i], parent)
                        }
                    )
                }
            })

            const animate = (time: number) => {
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
                <canvas ref={cvs} class={style.canvas}></canvas>
                {geometries.map((v, i) => (
                    <div class={style.item}>
                        <div
                            ref={el => {
                                item.value[i] = el as HTMLDivElement
                            }}
                        ></div>
                        <div>{v}</div>
                    </div>
                ))}
            </div>
        )
    }
})

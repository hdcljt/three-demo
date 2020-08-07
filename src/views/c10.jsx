import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import style from '../styles/c10.module.css'
import {
    randColor,
    randInt,
    resizeRendererToDisplaySize,
    PickHelper,
    GPUPickHelper
} from '../utils'

let rafId = 0

/**
 * @callback sceneCallBack
 * @param {number} time
 * @return {void}
 * @type {{fn: sceneCallBack}[]}
 */
const sceneElements = []

const makeScene = () => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('white')

    const camera = new THREE.PerspectiveCamera(60, 2, 0.1, 200)
    camera.position.z = 30

    const cameraPole = new THREE.Object3D()
    cameraPole.add(camera) // 当作相机杆，方便使相机在场景中移动
    scene.add(cameraPole) // 将相机添加到场景中

    const light = new THREE.DirectionalLight()
    light.position.set(-1, 2, 4)
    camera.add(light) // 光源随相机移动

    return { scene, camera, cameraPole }
}

/**
 * @param {HTMLDivElement} elem
 * @param {THREE.WebGLRenderer} renderer
 * @param {1|2|3} type 1-光线投射；2-光线投射（透明）；3-像素（透明）
 */
const setupScene = (elem, renderer, type) => {
    const { scene, camera, cameraPole } = makeScene()
    const geometry = new THREE.BoxBufferGeometry()

    const loader = new THREE.TextureLoader()
    const texture = loader.load('/textures/frame.png')
    const idToObject = {}
    const pickScene = new THREE.Scene()
    pickScene.background = new THREE.Color(0) // 黑色

    for (let i = 100; i--; ) {
        const material = new THREE.MeshPhongMaterial({ color: randColor() })
        if (type === 2 || type === 3) {
            material.map = texture
            material.transparent = true
            material.alphaTest = 0.5
            material.side = THREE.DoubleSide
        }
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)

        cube.position.set(randInt(-20, 20), randInt(-20, 20), randInt(-20, 20))
        cube.rotation.set(randInt(Math.PI), randInt(Math.PI), 0)
        cube.scale.set(randInt(2, 5), randInt(2, 5), randInt(2, 5))

        if (type === 3) {
            // 像素拾取
            const id = i + 1
            idToObject[id] = cube
            // 用唯一的颜色渲染每个对象
            const pickMat = new THREE.MeshPhongMaterial({
                emissive: id,
                map: texture,
                color: 0,
                specular: 0,
                transparent: true,
                alphaTest: 0.5, // 仅在大于0.5时渲染纹理
                blending: THREE.NoBlending // id不乘以alpha
            })
            const pickCube = new THREE.Mesh(geometry, pickMat)
            pickScene.add(pickCube)
            // 复制尺寸、旋转、缩放
            pickCube.position.copy(cube.position)
            pickCube.rotation.copy(cube.rotation)
            pickCube.scale.copy(cube.scale)
        }
    }

    const controls = new TrackballControls(camera, elem)
    controls.noPan = true // 禁用平移
    controls.noZoom = true // 禁用缩放
    controls.update()

    const pickPosition = new THREE.Vector2(-1e4, -1e4)
    const pickHelper = type === 3 ? new GPUPickHelper() : new PickHelper()

    elem.addEventListener('mousemove', event => {
        const { left, top, width, height } = elem.getBoundingClientRect()
        if (type === 3) {
            // 因为是像素拾取，只需要计算像素位置
            pickPosition.x = event.clientX - left
            pickPosition.y = event.clientY - top
        } else {
            // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
            pickPosition.x = ((event.clientX - left) / width) * 2 - 1
            pickPosition.y = -((event.clientY - top) / height) * 2 + 1
        }
    })

    elem.addEventListener('mouseleave', () => {
        // 停止拾取，赋一个不太可能的值
        pickPosition.x = -1e4
        pickPosition.y = -1e4
    })

    const canvas = renderer.domElement
    const parentEl = canvas.parentElement
    const pRect = parentEl.getBoundingClientRect()

    const render = time => {
        const rect = elem.getBoundingClientRect()

        if (rect.bottom < pRect.top || rect.top > pRect.bottom) return

        const x = rect.left - pRect.left
        const y = pRect.bottom - rect.bottom
        renderer.setScissor(x, y, rect.width, rect.height)
        renderer.setViewport(x, y, rect.width, rect.height)

        camera.aspect = rect.width / rect.height
        camera.updateProjectionMatrix()

        cameraPole.rotation.y = time * 0.02

        if (type === 3) {
            // 查找与鼠标位置相对应的像素的颜色
            pickHelper.pick(
                pickPosition,
                idToObject,
                renderer,
                pickScene,
                camera,
                time,
                rect.width,
                rect.height
            )
        } else {
            pickHelper.pick(pickPosition, scene, camera, time)
        }

        controls.update()

        renderer.render(scene, camera)
    }

    sceneElements.push(render)
}

export default defineComponent({
    setup() {
        const cvs = ref(null)
        const base = ref(null)
        const left = ref(null)
        const right = ref(null)

        onMounted(() => {
            const renderer = new THREE.WebGLRenderer({ canvas: cvs.value })

            setupScene(base.value, renderer, 1)
            setupScene(left.value, renderer, 2)
            setupScene(right.value, renderer, 3)

            const render = time => {
                time *= 0.001

                resizeRendererToDisplaySize(renderer)

                renderer.setClearColor(0xffffff)
                renderer.setScissorTest(false)
                renderer.clear()

                renderer.setClearColor(0xe0e0e0)
                renderer.setScissorTest(true)

                const canvas = renderer.domElement
                const scrollElem = canvas.parentElement
                canvas.style.transform = `translateY(${scrollElem.scrollTop}px)`

                sceneElements.forEach(fn => fn(time))

                rafId = requestAnimationFrame(render)
            }

            rafId = requestAnimationFrame(render)
        })

        onBeforeUnmount(() => {
            cancelAnimationFrame(rafId)
        })

        return () => (
            <div class={style.content}>
                <canvas ref={cvs} class={style.canvas}></canvas>
                <span>光线投射（非透明）</span>
                <div ref={base} class={style.base}></div>
                <div class={style.compare}>
                    <div>
                        <span>光线投射（透明）</span>
                        <div ref={left}></div>
                    </div>
                    <div>
                        <span>像素拾取（透明）</span>
                        <div ref={right}></div>
                    </div>
                </div>
            </div>
        )
    }
})

import { defineComponent, h, ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { resizeRendererToDisplaySize, frameArea, FogGUIHelper, saveBlob, useGUI } from '../utils'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import style from '../styles/c7.module.css'

let rafId = 0

const addLight = (scene, ...pos) => {
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(...pos)
    scene.add(light)
}

export default defineComponent({
    setup() {
        const cvs = ref(null)

        const gui = useGUI.create()

        const scene = new THREE.Scene()
        const near = 1
        const far = 1000
        const color = 'lightblue'
        scene.fog = new THREE.Fog(color, near, far)
        scene.background = new THREE.Color(color)

        const fogGUIHelper = new FogGUIHelper(scene.fog, scene.background)
        const folder = gui.addFolder('Fog')
        folder.add(fogGUIHelper, 'near', near, far).listen() // 同时更新near和far
        folder.add(fogGUIHelper, 'far', near, far).listen() // 同时更新near和far
        folder.addColor(fogGUIHelper, 'color')
        folder.open()

        const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5)
        camera.position.set(0, 0, 2)

        addLight(scene, -1, 2, 4)
        addLight(scene, 2, -2, 3)

        const gltfLoader = new GLTFLoader()
        gltfLoader.load('/models/mountain_landscape/scene.gltf', gltf => {
            const root = gltf.scene
            scene.add(root)

            const box = new THREE.Box3().setFromObject(root)
            const boxSize = box.getSize(new THREE.Vector3()).length()
            const boxCenter = box.getCenter(new THREE.Vector3())
            console.log(boxSize)

            frameArea(boxSize, boxSize, boxCenter, camera)

            controls.maxDistance = boxSize * 10
            controls.target.copy(boxCenter)
            controls.update()
        })

        let controls, renderer

        const render = () => {
            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement
                camera.aspect = canvas.clientWidth / canvas.clientHeight
                camera.updateProjectionMatrix()
            }
            renderer.render(scene, camera)
        }

        const onClick = () => {
            // 默认情况下，浏览器将在您绘制到WebGL画布后清除其绘图缓冲区
            // 解决方案是在捕获之前调用渲染代码
            render()
            const canvas = cvs.value
            canvas.toBlob(blob => {
                saveBlob(
                    blob,
                    `Test-${canvas.width}x${canvas.height}.png`
                )
            })
        }

        onMounted(() => {
            controls = new OrbitControls(camera, cvs.value)
            controls.enableDamping = true
            controls.target.set(0, 5, 0)
            controls.update()

            renderer = new THREE.WebGLRenderer({ canvas: cvs.value })

            const animate = () => {
                render()
                rafId = requestAnimationFrame(animate)
            }
            rafId = requestAnimationFrame(animate)
        })

        onBeforeUnmount(() => {
            cancelAnimationFrame(rafId)
            useGUI.dispose()
        })

        return () => [
            h('canvas', { ref: cvs, class: 'canvas' }),
            h('button', { class: style.btn, onClick }, '保存图片')
        ]
    }
})

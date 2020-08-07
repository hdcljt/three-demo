import { defineComponent, ref, onMounted, h, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { resizeRendererToDisplaySize, useGUI } from '../utils'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FilmShader } from 'three/examples/jsm/shaders/FilmShader'
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader'

let rafId = 0

const makeXYZGUI = (gui, vector3, name, onChangeFn) => {
    const folder = gui.addFolder(name)
    folder.add(vector3, 'x', -1000, 1000).onChange(onChangeFn)
    folder.add(vector3, 'y', -1000, 1000).onChange(onChangeFn)
    folder.add(vector3, 'z', -1000, 1000).onChange(onChangeFn)
    folder.open()
}

export default defineComponent({
    setup() {
        /** @type {import('vue').Ref<HTMLCanvasElement>} */
        const cvs = ref(null)
        /** @type {import('vue').Ref<HTMLVideoElement>} */
        const video = ref(null)

        const gui = useGUI.create()

        onMounted(() => {
            // const camera = new THREE.PerspectiveCamera(75, 2, 1, 1100)
            const camera = new THREE.PerspectiveCamera(75, 2, 1, 2000)
            camera.position.set(0, 10, 20)

            const scene = new THREE.Scene()

            const helper = new THREE.AxesHelper(500)
            scene.add(helper)

            const geometry = new THREE.SphereBufferGeometry(500, 60, 40)
            // 在x轴上翻转几何图形，使所有的面都指向内
            geometry.scale(-1, 1, 1)

            video.value.play()

            const texture = new THREE.VideoTexture(video.value)
            const material = new THREE.MeshBasicMaterial({ map: texture })

            const mesh = new THREE.Mesh(geometry, material)
            scene.add(mesh)

            makeXYZGUI(gui, mesh.position, 'sphere')
            makeXYZGUI(gui, camera.position, 'camera')

            const controls = new OrbitControls(camera, cvs.value)
            controls.update()

            const renderer = new THREE.WebGLRenderer({ canvas: cvs.value })

            const composer = new EffectComposer(renderer)
            composer.addPass(new RenderPass(scene, camera))
            const filmPass = new ShaderPass(FilmShader)
            filmPass.enabled = false
            composer.addPass(filmPass)
            const pixelPass = new ShaderPass(PixelShader)
            pixelPass.uniforms['resolution'].value = new THREE.Vector2(1920, 1080)
            pixelPass.uniforms['pixelSize'].value = 16
            pixelPass.enabled = false
            composer.addPass(pixelPass)

            gui.add(filmPass, 'enabled').name('FilmShader')
            gui.add(pixelPass, 'enabled').name('PixelShader')

            let last = 0
            const render = (time) => {
                time *= 0.001 // 单位秒
                const deltaTime = time - last // 自渲染最后一帧以来的时间
                last = time

                if (resizeRendererToDisplaySize(renderer)) {
                    const canvas = renderer.domElement
                    camera.aspect = canvas.clientWidth / canvas.clientHeight
                    camera.updateProjectionMatrix()

                    composer.setSize(canvas.width, canvas.height)
                }
                // renderer.render(scene, camera)
                composer.render(deltaTime)

                rafId = requestAnimationFrame(render)
            }

            rafId = requestAnimationFrame(render)
        })

        onBeforeUnmount(() => {
            cancelAnimationFrame(rafId)
            useGUI.dispose()
        })

        return () => [
            h('video', {
                ref: video,
                src: 'textures/pano.mp4',
                loop: true,
                muted: true,
                playsinline: true,
                autoplay: true,
                crossorigin: 'anonymous',
                style: { display: 'none' }
            }),
            h('canvas', { ref: cvs, class: 'canvas' })
        ]
    }
})

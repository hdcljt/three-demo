import { defineComponent, ref, onMounted, h, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton'
import { resizeRendererToDisplaySize } from '../utils'

export default defineComponent({
    setup() {
        /** @type {import('vue').Ref<HTMLCanvasElement>} */
        const cvs = ref(null)
        /** @type {HTMLElement} */
        let vrBtn
        /** @type {THREE.WebGLRenderer} */
        let renderer

        const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 50)
        camera.position.set(0, 1.7, 0) // 普通用户的平均水平（VR中的单位是米）

        const scene = new THREE.Scene()

        const loader = new THREE.CubeTextureLoader()
        const texture = loader
            .setPath('textures/cube/')
            .load([
                'pos-x.jpg',
                'neg-x.jpg',
                'pos-y.jpg',
                'neg-y.jpg',
                'pos-z.jpg',
                'neg-z.jpg'
            ])
        scene.background = texture

        const light = new THREE.DirectionalLight()
        light.position.set(-1, 2, 4)
        scene.add(light)

        const geometry = new THREE.SphereBufferGeometry(0.3, 32, 16)
        const material = new THREE.MeshPhongMaterial({ envMap: texture })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 1.6, -2)
        scene.add(mesh)

        const render = () => {
            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement
                camera.aspect = canvas.clientWidth / canvas.clientHeight
                camera.updateProjectionMatrix()
            }
            renderer.render(scene, camera)
        }

        onMounted(() => {
            renderer = new THREE.WebGLRenderer({ canvas: cvs.value })
            // 启用XR渲染，并将VR按钮添加到页面中
            renderer.xr.enabled = true
            vrBtn = VRButton.createButton(renderer)
            document.body.appendChild(vrBtn)

            renderer.setAnimationLoop(render)
        })
        
        onBeforeUnmount(() => {
            renderer && renderer.setAnimationLoop(null)
            vrBtn && document.body.removeChild(vrBtn)
        })

        return () => h('canvas', { ref: cvs, class: 'canvas' })
    }
})

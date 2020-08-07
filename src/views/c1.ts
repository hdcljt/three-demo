import { defineComponent, ref, h, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { resizeRendererToDisplaySize, randColor } from '../utils'

let rafId = 0

export default defineComponent({
    setup() {
        const cvs = ref<HTMLCanvasElement>(null)

        onMounted(() => {
            const scene = new THREE.Scene()

            const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5)
            camera.position.z = 2

            const geometry = new THREE.BoxBufferGeometry()
            const material = new THREE.MeshPhongMaterial({ color: randColor() })

            const cube = new THREE.Mesh(geometry, material)

            scene.add(cube)

            const light = new THREE.DirectionalLight()
            light.position.set(-1, 2, 4)

            scene.add(light)

            const renderer = new THREE.WebGLRenderer({ canvas: cvs.value })

            const animate = () => {
                if (resizeRendererToDisplaySize(renderer)) {
                    const canvas = renderer.domElement
                    camera.aspect = canvas.clientWidth / canvas.clientHeight
                    camera.updateProjectionMatrix()
                }

                cube.rotation.x += 0.01
                cube.rotation.y += 0.01

                renderer.render(scene, camera)

                rafId = requestAnimationFrame(animate)
            }

            animate()
        })

        onBeforeUnmount(() => {
            cancelAnimationFrame(rafId)
        })

        return () => h('canvas', { ref: cvs, class: 'canvas' })
    }
})

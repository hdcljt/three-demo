import { defineComponent, ref, h, onMounted } from 'vue'
import * as THREE from 'three'

export default defineComponent({
    setup() {
        const cvs = ref<HTMLCanvasElement>(null)

        onMounted(() => {
            const scene = new THREE.Scene()

            const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5)
            camera.position.z = 2

            const geometry = new THREE.BoxBufferGeometry()
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

            const cube = new THREE.Mesh(geometry, material)

            scene.add(cube)

            const renderer = new THREE.WebGLRenderer({ canvas: cvs.value })

            const animate = () => {
                cube.rotation.x += 0.01
                cube.rotation.y += 0.01

                renderer.render(scene, camera)
            }

            renderer.setAnimationLoop(animate)
        })

        return () => h('canvas', { ref: cvs })
    }
})

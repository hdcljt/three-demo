import { defineComponent, ref, onMounted, onBeforeUnmount, h } from 'vue'
import * as THREE from 'three'
import {
    randColor,
    randInt,
    resizeRendererToDisplaySize,
    PickHelper
} from '../utils'

let rafId = 0

const makeScene = () => {
    const camera = new THREE.PerspectiveCamera(60, 2, 0.1, 200)
    camera.position.z = 30

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('white')

    // 将相机放在杆子上（将其作为对象），这样就可以旋转杆以使摄像机在场景中移动
    const cameraPole = new THREE.Object3D()
    cameraPole.add(camera)
    scene.add(cameraPole) // 将相机添加到场景中

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(-1, 2, 4)
    camera.add(light) // 把光照在相机上，这样光线就会跟着它移动

    return { scene, camera, cameraPole }
}

export default defineComponent({
    setup() {
        /** @type {import('vue').Ref<HTMLCanvasElement>} */
        const cvs = ref(null)

        const { scene, camera, cameraPole } = makeScene()

        const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
        for (let i = 100; i--; ) {
            const material = new THREE.MeshPhongMaterial({ color: randColor() })
            const cube = new THREE.Mesh(geometry, material)
            scene.add(cube)
            cube.position.set(
                randInt(-20, 20),
                randInt(-20, 20),
                randInt(-20, 20)
            )
            cube.rotation.set(randInt(Math.PI), randInt(Math.PI), 0)
            cube.scale.set(randInt(3, 6), randInt(3, 6), randInt(3, 6))
        }

        const pickPosition = new THREE.Vector2()
        const pickHelper = new PickHelper()

        const getCanvasRelativePosition = event => {
            const rect = cvs.value.getBoundingClientRect()
            return {
                x: ((event.clientX - rect.left) * cvs.value.width) / rect.width,
                y: ((event.clientY - rect.top) * cvs.value.height) / rect.height
            }
        }

        const setPickPosition = event => {
            const pos = getCanvasRelativePosition(event)
            // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
            pickPosition.x = (pos.x / cvs.value.width) * 2 - 1
            pickPosition.y = (pos.y / cvs.value.height) * -2 + 1
        }

        const clearPickPosition = () => {
            // 停止拾取，赋一个不太可能的值
            pickPosition.x = -1e5
            pickPosition.y = -1e5
        }

        onMounted(() => {
            // 创建一个画布用于渲染，并将结果复制到每个元素的2D画布中
            const renderer = new THREE.WebGLRenderer({ canvas: cvs.value })

            const render = time => {
                time *= 0.001

                if (resizeRendererToDisplaySize(renderer)) {
                    const canvas = renderer.domElement
                    camera.aspect = canvas.clientWidth / canvas.clientHeight
                    camera.updateProjectionMatrix()
                }

                cameraPole.rotation.y = time * 0.1

                pickHelper.pick(pickPosition, scene, camera, time)

                renderer.render(scene, camera)

                rafId = requestAnimationFrame(render)
            }

            rafId = requestAnimationFrame(render)

            cvs.value.addEventListener('mousemove', setPickPosition)
            cvs.value.addEventListener('mouseleave', clearPickPosition)
        })

        onBeforeUnmount(() => {
            cancelAnimationFrame(rafId)
        })

        return () => h('canvas', { ref: cvs, class: 'canvas' })
    }
})

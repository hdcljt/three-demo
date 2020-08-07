import { defineComponent, ref, h, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import {
    resizeRendererToDisplaySize,
    makePlane,
    requestRenderIfNotRequested,
    setScissorForElement,
    MinMaxGUIHelper,
    useGUI
} from '../utils'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import style from '../styles/c5.module.css'

const makeXYZGUI = (gui, vector3, name, onChangeFn) => {
    const folder = gui.addFolder(name)
    folder.add(vector3, 'x', 0, 10).onChange(onChangeFn)
    folder.add(vector3, 'y', 0, 20).onChange(onChangeFn)
    folder.add(vector3, 'z', 0, 30).onChange(onChangeFn)
    folder.open()
}

export default defineComponent({
    setup() {
        /** @type {import('vue').Ref<HTMLCanvasElement>} */
        const cvs = ref(null)
        /** @type {import('vue').Ref<HTMLDivElement>} */
        const viewLeft = ref(null)
        /** @type {import('vue').Ref<HTMLDivElement>} */
        const viewRight = ref(null)

        const gui = useGUI.create()

        onMounted(() => {
            const scene = new THREE.Scene()

            const helper = new THREE.AxesHelper(2)
            helper.position.set(0, 4, 0)
            scene.add(helper)

            makePlane().then(mesh => {
                scene.add(mesh)
                requestRenderIfNotRequested(render) // 纹理加载完，按需渲染
            })

            const geoFolder = gui.addFolder('BufferGeometry')
            {
                const cubeSize = 4
                const cubeGeo = new THREE.BoxBufferGeometry(
                    cubeSize,
                    cubeSize,
                    cubeSize
                )
                const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' })
                const mesh = new THREE.Mesh(cubeGeo, cubeMat)
                mesh.position.set(cubeSize + 1, cubeSize / 2, 0)
                scene.add(mesh)

                const folder = geoFolder.addFolder('BoxBufferGeometry')
                folder.open()
                folder
                    .add(mesh.position, 'x', 0, cubeSize + 1, 0.01)
                    .name('x')
                    .onChange(() => requestRenderIfNotRequested(render))
                folder
                    .add(mesh.position, 'y', 0, cubeSize / 2, 0.01)
                    .name('y')
                    .onChange(() => requestRenderIfNotRequested(render))
                folder
                    .add(mesh.position, 'z', -cubeSize, 0, 0.01)
                    .name('z')
                    .onChange(() => requestRenderIfNotRequested(render))
            }

            {
                const sphereRadius = 3
                const sphereWidthDivisions = 32
                const sphereHeightDivisions = 16
                const sphereGeo = new THREE.SphereBufferGeometry(
                    sphereRadius,
                    sphereWidthDivisions,
                    sphereHeightDivisions
                )
                const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' })
                const mesh = new THREE.Mesh(sphereGeo, sphereMat)
                mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0)
                scene.add(mesh)

                const folder = geoFolder.addFolder('SphereBufferGeometry')
                folder.open()
                folder
                    .add(mesh.position, 'x', -sphereRadius - 1, 0, 0.01)
                    .name('x')
                    .onChange(() => requestRenderIfNotRequested(render))
                folder
                    .add(mesh.position, 'y', 0, sphereRadius + 2, 0.01)
                    .name('y')
                    .onChange(() => requestRenderIfNotRequested(render))
                folder
                    .add(mesh.position, 'z', 0, sphereRadius * 2, 0.01)
                    .name('z')
                    .onChange(() => requestRenderIfNotRequested(render))
            }

            {
                const color = 0xffffff
                const intensity = 1
                const light = new THREE.DirectionalLight(color, intensity)
                light.position.set(0, 10, 0)
                light.target.position.set(-5, 0, 0)
                scene.add(light)
                scene.add(light.target)
            }

            const cameraPerspective = new THREE.PerspectiveCamera(45, 2, 5, 50)
            cameraPerspective.position.set(0, 10, 20)

            const cameraPerspectiveHelper = new THREE.CameraHelper(
                cameraPerspective
            )
            cameraPerspectiveHelper.visible = false
            scene.add(cameraPerspectiveHelper)

            const cameraOrthographic = new THREE.OrthographicCamera(
                -1, // left
                1, // right
                1, // top
                -1, // bottom
                5, // near
                50 // far
            )
            cameraOrthographic.zoom = 0.2 // 缩放倍数
            cameraOrthographic.position.set(0, 10, 20)

            const cameraOrthographicHelper = new THREE.CameraHelper(
                cameraOrthographic
            )
            cameraOrthographicHelper.visible = false
            scene.add(cameraOrthographicHelper)

            let cameraActive = cameraPerspective
            let cameraActiveHelper = cameraPerspectiveHelper

            let controlsLeft = new OrbitControls(cameraActive, viewLeft.value)
            controlsLeft.target.set(0, 5, 0)
            controlsLeft.enableDamping = true

            {
                const ctrl = gui.add(
                    {
                        camera: 'Perspective'
                    },
                    'camera',
                    ['Perspective', 'Orthographic']
                )
                let pFolder = gui.addFolder('PerspectiveCamera')
                const minMaxHelper1 = new MinMaxGUIHelper(
                    cameraPerspective,
                    'near',
                    'far',
                    0.1
                )
                const minMaxHelper2 = new MinMaxGUIHelper(
                    cameraOrthographic,
                    'near',
                    'far',
                    0.1
                )
                pFolder.open()
                pFolder
                    .add(cameraPerspective, 'fov', 1, 180)
                    .onChange(() => requestRenderIfNotRequested(render))
                pFolder
                    .add(minMaxHelper1, 'min', 0.1, 50, 0.1)
                    .name('near')
                    .onChange(() => requestRenderIfNotRequested(render))
                pFolder
                    .add(minMaxHelper1, 'max', 0.1, 50, 0.1)
                    .name('far')
                    .onChange(() => requestRenderIfNotRequested(render))
                makeXYZGUI(
                    pFolder,
                    cameraPerspective.position,
                    'position',
                    () => requestRenderIfNotRequested(render)
                )
                let oFolder
                ctrl.onChange(type => {
                    if (type === 'Perspective') {
                        cameraOrthographicHelper.visible = false
                        cameraActive = cameraPerspective
                        cameraActiveHelper = cameraPerspectiveHelper

                        gui.removeFolder(oFolder)
                        pFolder = gui.addFolder('PerspectiveCamera')
                        pFolder.open()
                        pFolder
                            .add(cameraPerspective, 'fov', 1, 180)
                            .onChange(() => requestRenderIfNotRequested(render))
                        pFolder
                            .add(minMaxHelper1, 'min', 0.1, 50, 0.1)
                            .name('near')
                            .onChange(() => requestRenderIfNotRequested(render))
                        pFolder
                            .add(minMaxHelper1, 'max', 0.1, 50, 0.1)
                            .name('far')
                            .onChange(() => requestRenderIfNotRequested(render))
                        makeXYZGUI(
                            pFolder,
                            cameraPerspective.position,
                            'position',
                            () => requestRenderIfNotRequested(render)
                        )
                    } else {
                        cameraPerspectiveHelper.visible = false
                        cameraActive = cameraOrthographic
                        cameraActiveHelper = cameraOrthographicHelper

                        gui.removeFolder(pFolder)
                        oFolder = gui.addFolder('OrthographicCamera')
                        oFolder.open()
                        oFolder
                            .add(cameraOrthographic, 'zoom', 0.01, 1, 0.01)
                            .listen() // 调用listen是因为OrbitControls也可以控制缩放
                            .onChange(() => requestRenderIfNotRequested(render))
                        oFolder
                            .add(minMaxHelper2, 'min', 0.1, 50, 0.1)
                            .name('near')
                            .onChange(() => requestRenderIfNotRequested(render))
                        oFolder
                            .add(minMaxHelper2, 'max', 0.1, 50, 0.1)
                            .name('far')
                            .onChange(() => requestRenderIfNotRequested(render))
                        makeXYZGUI(
                            oFolder,
                            cameraOrthographic.position,
                            'position',
                            () => requestRenderIfNotRequested(render)
                        )
                    }
                    controlsLeft.object = cameraActive
                    requestRenderIfNotRequested(render)
                })
            }

            const cameraRight = new THREE.PerspectiveCamera(60, 2, 0.1, 500)
            cameraRight.position.set(40, 10, 30)
            cameraRight.lookAt(0, 5, 0)

            const controlsRight = new OrbitControls(
                cameraRight,
                viewRight.value
            )
            controlsRight.target.set(0, 5, 0)
            controlsRight.enableDamping = true

            const renderer = new THREE.WebGLRenderer({ canvas: cvs.value })
            renderer.setClearColor('blue')
            renderer.setScissorTest(true)

            const render = () => {
                resizeRendererToDisplaySize(renderer)

                controlsLeft.update() // 继续触发惯性运动
                controlsRight.update()

                // 原始视图
                {
                    const aspect = setScissorForElement(
                        viewLeft.value,
                        cvs.value,
                        renderer
                    )
                    if (cameraActive === cameraPerspective) {
                        cameraActive.aspect = aspect
                    } else {
                        cameraActive.left = -aspect
                        cameraActive.right = aspect
                    }
                    cameraActive.updateProjectionMatrix()
                    cameraActiveHelper.update()

                    cameraActiveHelper.visible = false

                    scene.background = new THREE.Color(0x000000)
                    renderer.render(scene, cameraActive)
                }

                // 另一个视角的视图
                {
                    const aspect = setScissorForElement(
                        viewRight.value,
                        cvs.value,
                        renderer
                    )
                    cameraRight.aspect = aspect
                    cameraRight.updateProjectionMatrix()

                    cameraActiveHelper.visible = true

                    scene.background = new THREE.Color(0x000040)
                    renderer.render(scene, cameraRight)
                }
            }

            requestRenderIfNotRequested(render)

            controlsLeft.addEventListener('change', () =>
                requestRenderIfNotRequested(render)
            ) // 按需触发渲染
            controlsRight.addEventListener('change', () =>
                requestRenderIfNotRequested(render)
            ) // 按需触发渲染
        })

        onBeforeUnmount(() => {
            useGUI.dispose()
        })

        return () => [
            h('canvas', { ref: cvs, class: 'canvas' }),
            h('div', { class: style.split }, [
                h('div', { ref: viewLeft }),
                h('div', { ref: viewRight })
            ])
        ]
    }
})

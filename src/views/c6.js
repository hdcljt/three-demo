import { defineComponent, ref, h, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import {
    resizeRendererToDisplaySize,
    makePlane,
    requestRenderIfNotRequested,
    ColorGUIHelper,
    DegRadHelper,
    DimensionGUIHelper,
    MinMaxGUIHelper,
    useGUI
} from '../utils'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const makeXYZGUI = (gui, vector3, name, onChangeFn) => {
    const folder = gui.addFolder(name)
    folder.add(vector3, 'x', -10, 10, 0.1).onChange(onChangeFn)
    folder.add(vector3, 'y', -10, 10, 0.1).onChange(onChangeFn)
    folder.add(vector3, 'z', -10, 10, 0.1).onChange(onChangeFn)
    folder.open()
}

export default defineComponent({
    setup() {
        /** @type {import('vue').Ref<HTMLCanvasElement>} */
        const cvs = ref(null)

        const gui = useGUI.create()

        onMounted(() => {
            const scene = new THREE.Scene()

            makePlane().then(mesh => {
                mesh.receiveShadow = true
                scene.add(mesh)
                requestRenderIfNotRequested(render) // 纹理加载完，按需渲染
            })

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
                mesh.castShadow = true
                mesh.receiveShadow = true
                scene.add(mesh)

                gui.addColor(new ColorGUIHelper(cubeMat, 'color'), 'value')
                    .name('box.color')
                    .onChange(() => requestRenderIfNotRequested(render))
            }

            {
                const cubeSize = 30
                const cubeGeo = new THREE.BoxBufferGeometry(
                    cubeSize,
                    cubeSize,
                    cubeSize
                )
                const cubeMat = new THREE.MeshPhongMaterial({
                    color: '#CCC',
                    side: THREE.BackSide
                })
                const mesh = new THREE.Mesh(cubeGeo, cubeMat)
                mesh.position.set(0, cubeSize / 2 - 0.1, 0)
                mesh.receiveShadow = true
                scene.add(mesh)
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
                mesh.castShadow = true
                mesh.receiveShadow = true
                scene.add(mesh)

                gui.addColor(new ColorGUIHelper(sphereMat, 'color'), 'value')
                    .name('sphere.color')
                    .onChange(() => requestRenderIfNotRequested(render))
            }

            {
                const lights = [
                    'none',
                    'AmbientLight',
                    'HemisphereLight',
                    'DirectionalLight',
                    'SpotLight',
                    'PointLight'
                ]
                let light
                let helper
                let cameraHelper
                let folder
                const ctrl = gui
                    .add(
                        {
                            light: 'none'
                        },
                        'light',
                        lights
                    )
                    .listen()
                    .onChange(type => {
                        if (light) {
                            scene.remove(light)
                            light = null
                        }
                        if (helper) {
                            scene.remove(helper)
                            helper.dispose()
                            helper = null
                        }
                        if (cameraHelper) {
                            scene.remove(cameraHelper)
                            cameraHelper = null
                        }
                        // if (cameraHelper && cameraHelper.visible) {
                        //     cameraHelper.visible = false
                        // }
                        if (folder) {
                            gui.removeFolder(folder)
                            folder = null
                        }
                        if (type === 'none')
                            return requestRenderIfNotRequested(render)
                        folder = gui.addFolder(type)
                        folder.open()
                        const color = 0xffffff
                        const intensity = 1
                        if (type === 'DirectionalLight') {
                            light = new THREE.DirectionalLight(color, intensity)
                            light.castShadow = true
                            light.position.set(0, 10, 0)
                            light.target.position.set(-4, 0, -4)
                            scene.add(light.target)
                            cameraHelper = new THREE.CameraHelper(
                                light.shadow.camera
                            )
                            scene.add(cameraHelper)
                            helper = new THREE.DirectionalLightHelper(light)
                            scene.add(helper)
                            const update = () => {
                                light.target.updateMatrixWorld()
                                helper.update()
                                light.shadow.camera.updateProjectionMatrix()
                                cameraHelper.update()
                            }
                            update()
                            makeXYZGUI(
                                folder,
                                light.position,
                                'position',
                                () => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                }
                            )
                            makeXYZGUI(
                                folder,
                                light.target.position,
                                'target',
                                () => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                }
                            )
                            folder.add(light, 'castShadow').onChange(enable => {
                                light.castShadow = enable
                                update()
                                requestRenderIfNotRequested(render)
                            })
                            const subFolder = folder.addFolder('Shadow Camera')
                            subFolder.open()
                            subFolder
                                .add(
                                    new DimensionGUIHelper(
                                        light.shadow.camera,
                                        'left',
                                        'right'
                                    ),
                                    'value',
                                    1,
                                    100
                                )
                                .name('width')
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                            subFolder
                                .add(
                                    new DimensionGUIHelper(
                                        light.shadow.camera,
                                        'bottom',
                                        'top'
                                    ),
                                    'value',
                                    1,
                                    100
                                )
                                .name('height')
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                            const minMaxHelper = new MinMaxGUIHelper(
                                light.shadow.camera,
                                'near',
                                'far',
                                0.1
                            )
                            subFolder
                                .add(minMaxHelper, 'min', 0.1, 50, 0.1)
                                .name('near')
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                            subFolder
                                .add(minMaxHelper, 'max', 0.1, 50, 0.1)
                                .name('far')
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                            subFolder
                                .add(light.shadow.camera, 'zoom', 0.01, 2, 0.01)
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                        } else if (type === 'SpotLight') {
                            const distance = 0
                            const angle = Math.PI / 3
                            const penumbra = 0
                            const decay = 1
                            light = new THREE.SpotLight(
                                color,
                                intensity,
                                distance,
                                angle,
                                penumbra,
                                decay
                            )
                            light.castShadow = true
                            light.position.set(0, 10, 0)
                            light.target.position.set(-5, 0, 0)
                            scene.add(light.target)
                            cameraHelper = new THREE.CameraHelper(
                                light.shadow.camera
                            )
                            scene.add(cameraHelper)
                            helper = new THREE.SpotLightHelper(light)
                            scene.add(helper)
                            const update = () => {
                                light.target.updateMatrixWorld()
                                helper.update()
                                light.shadow.camera.updateProjectionMatrix()
                                cameraHelper.update()
                            }
                            update()
                            makeXYZGUI(
                                folder,
                                light.position,
                                'position',
                                () => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                }
                            )
                            makeXYZGUI(
                                folder,
                                light.target.position,
                                'target',
                                () => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                }
                            )
                            folder
                                .add(light, 'distance', 0, 40)
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                            folder
                                .add(
                                    new DegRadHelper(light, 'angle'),
                                    'value',
                                    0,
                                    90
                                )
                                .name('angle')
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                            folder
                                .add(light, 'penumbra', 0, 1, 0.1)
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                            folder
                                .add(light, 'decay', 0, 4, 0.1)
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                            folder.add(light, 'castShadow').onChange(enable => {
                                update()
                                requestRenderIfNotRequested(render)
                            })
                            const subFolder = folder.addFolder('Shadow Camera')
                            subFolder.open()
                            const minMaxHelper = new MinMaxGUIHelper(
                                light.shadow.camera,
                                'near',
                                'far',
                                0.1
                            )
                            subFolder
                                .add(minMaxHelper, 'min', 0.1, 50, 0.1)
                                .name('near')
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                            subFolder
                                .add(minMaxHelper, 'max', 0.1, 50, 0.1)
                                .name('far')
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                        } else if (type === 'PointLight') {
                            const distance = 0
                            const decay = 1
                            light = new THREE.PointLight(
                                color,
                                intensity,
                                distance,
                                decay
                            )
                            light.castShadow = true
                            // light.decay = 2
                            // light.intensity = 1
                            // light.distance = Infinity
                            // light.power = 800 // 默认(4 * Math.PI)
                            light.position.set(0, 10, 0)
                            helper = new THREE.PointLightHelper(light, 1)
                            scene.add(helper)
                            const update = () => {
                                // helper.update()
                            }
                            update()
                            makeXYZGUI(
                                folder,
                                light.position,
                                'position',
                                () => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                }
                            )
                            folder
                                .add(light, 'distance', 0, 40)
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                            folder
                                .add(light, 'decay', 0, 4, 0.1)
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                            folder.add(light, 'castShadow').onChange(enable => {
                                light.castShadow = enable
                                update()
                                requestRenderIfNotRequested(render)
                            })
                            const subFolder = folder.addFolder('Shadow Camera')
                            subFolder.open()
                            const minMaxHelper = new MinMaxGUIHelper(
                                light.shadow.camera,
                                'near',
                                'far',
                                0.1
                            )
                            subFolder
                                .add(minMaxHelper, 'min', 0.1, 50, 0.1)
                                .name('near')
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                            subFolder
                                .add(minMaxHelper, 'max', 0.1, 50, 0.1)
                                .name('far')
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                        } else if (type === 'HemisphereLight') {
                            const groundColor = 0xffffff
                            light = new THREE.HemisphereLight(
                                color,
                                groundColor,
                                intensity
                            )
                            helper = new THREE.HemisphereLightHelper(light, 5)
                            scene.add(helper)
                            const update = () => {
                                helper.update()
                            }
                            update()
                            makeXYZGUI(
                                folder,
                                light.position,
                                'position',
                                () => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                }
                            )
                            folder
                                .addColor(
                                    new ColorGUIHelper(light, 'groundColor'),
                                    'value'
                                )
                                .name('groundColor')
                                .onChange(() => {
                                    update()
                                    requestRenderIfNotRequested(render)
                                })
                        } else if (type === 'AmbientLight') {
                            light = new THREE.AmbientLight(color, intensity)
                        }
                        scene.add(light)
                        folder
                            .addColor(
                                new ColorGUIHelper(light, 'color'),
                                'value'
                            )
                            .name('color')
                            .onChange(() => requestRenderIfNotRequested(render))
                        folder
                            .add(light, 'intensity', 0, 3)
                            .onChange(() => requestRenderIfNotRequested(render))
                        requestRenderIfNotRequested(render)
                    })
            }

            const camera = new THREE.PerspectiveCamera(45, 2, 5, 100)
            camera.position.set(0, 10, 20)

            let controls = new OrbitControls(camera, cvs.value)
            controls.target.set(0, 5, 0)
            controls.enableDamping = true

            const renderer = new THREE.WebGLRenderer({ canvas: cvs.value })
            // renderer.physicallyCorrectLights = true
            renderer.shadowMap.enabled = true

            const render = () => {
                if (resizeRendererToDisplaySize(renderer)) {
                    const canvas = renderer.domElement
                    camera.aspect = canvas.clientWidth / canvas.clientHeight
                    camera.updateProjectionMatrix()
                }

                controls.update() // 继续触发惯性运动

                renderer.render(scene, camera)
            }

            requestRenderIfNotRequested(render)

            controls.addEventListener('change', () =>
                requestRenderIfNotRequested(render)
            )
        })

        onBeforeUnmount(() => {
            useGUI.dispose()
        })

        return () => h('canvas', { ref: cvs, class: 'canvas' })
    }
})

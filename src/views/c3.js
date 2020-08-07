import { defineComponent, ref, h, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { resizeRendererToDisplaySize, AxisGridHelper, useGUI } from '../utils'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

let rafId = 0

export default defineComponent({
    setup() {
        const cvs = ref(null)
        const gui = useGUI.create()

        onMounted(() => {
            const scene = new THREE.Scene()
            scene.background = new THREE.Color('lightblue')

            const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 60)
            camera.position.set(0, 30, 0)
            camera.up.set(0, 0, 1)
            camera.lookAt(0, 0, 0)

            const light = new THREE.PointLight(0xffffff, 3)
            scene.add(light)

            const objects = []

            const solarSystem = new THREE.Object3D()
            scene.add(solarSystem)
            objects.push(solarSystem)

            const geometry = new THREE.SphereBufferGeometry(1, 8, 6)

            const sun = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ emissive: 0xffff00 }))
            sun.scale.set(5, 5, 5)
            solarSystem.add(sun)
            objects.push(sun)

            const earthOrbit = new THREE.Object3D()
            earthOrbit.position.x = 10
            solarSystem.add(earthOrbit)
            objects.push(earthOrbit)

            const earth = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 }))
            earthOrbit.add(earth)
            objects.push(earth)

            const moonOrbit = new THREE.Object3D()
            moonOrbit.position.x = 2
            earthOrbit.add(moonOrbit)

            const moon = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 }))
            moon.scale.set(0.5, 0.5, 0.5)
            moonOrbit.add(moon)
            objects.push(moon)

            const makeAxisGrid = (node, label, units) => {
                const helper = new AxisGridHelper(node, units)
                gui.add(helper, 'visible').name(label)
            }

            makeAxisGrid(solarSystem, 'solarSystem', 26)
            makeAxisGrid(sun, 'sun')
            makeAxisGrid(earthOrbit, 'earthOrbit')
            makeAxisGrid(earth, 'earth')
            makeAxisGrid(moonOrbit, 'moonOrbit')
            makeAxisGrid(moon, 'moon')

            const renderer = new THREE.WebGLRenderer({ canvas: cvs.value })

            const controls = new TrackballControls(camera, cvs.value)

            const animate = (time = 0) => {
                time *= 0.001

                if (resizeRendererToDisplaySize(renderer)) {
                    const canvas = renderer.domElement
                    camera.aspect = canvas.clientWidth / canvas.clientHeight
                    camera.updateProjectionMatrix()
                }

                objects.forEach(obj => {
                    obj.rotation.y = time * 0.5
                })

                controls.update()

                renderer.render(scene, camera)

                rafId = requestAnimationFrame(animate)
            }

            animate()
        })

        onBeforeUnmount(() => {
            cancelAnimationFrame(rafId)
            useGUI.dispose()
        })

        return () => h('canvas', { ref: cvs, class: 'canvas' })
    }
})

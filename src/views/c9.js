import { defineComponent, h, ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader'
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader'
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader'
import { useGUI, resizeRendererToDisplaySize } from '../utils'

let rafId = 0

export default defineComponent({
    setup() {
        /** @type {import('vue').Ref<HTMLCanvasElement>} */
        const cvs = ref(null)

        const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5)
        camera.position.z = 2

        const scene = new THREE.Scene()

        const light = new THREE.DirectionalLight()
        light.position.set(-1, 2, 4)
        scene.add(light)

        const geometry = new THREE.BoxBufferGeometry()

        const makeInstance = (color, x) => {
            const material = new THREE.MeshPhongMaterial({ color })
            const cube = new THREE.Mesh(geometry, material)
            cube.position.x = x
            scene.add(cube)
            return cube
        }

        const cubes = [
            makeInstance(0x44aa88, 0),
            makeInstance(0x8844aa, -2),
            makeInstance(0xaa8844, 2)
        ]

        const bloomPass = new BloomPass(
            1, // strength
            25, // kernel size
            4, // sigma
            256 // blur render target resolution
        )
        bloomPass.enabled = false // 是否使用此处理过程

        const filmPass = new FilmPass(
            0.35, // noise intensity
            0.025, // scanline intensity
            648, // scanline count
            false // grayscale
        )

        const afterimagePass = new AfterimagePass(0.8)
        afterimagePass.enabled = false

        const glitchPass = new GlitchPass()
        glitchPass.enabled = false

        // 它获取一个对象，其中包含定义顶点着色器、片段着色器和默认输入的信息
        const colorShader = {
            uniforms: {
                // tDiffuse 传递上一遍结果纹理的名称（必需的）
                tDiffuse: { value: null },
                color: { value: new THREE.Color(0x88ccff) }
            },
            // 顶点着色器（变量 uv, projectionMatrix, modelViewMatrix 和 position 已由 three.js 添加了）
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
                }
            `,
            // 片段着色器（从上一个过程中得到一个像素颜色，乘以定义的颜色）
            fragmentShader: `
                uniform vec3 color;
                uniform sampler2D tDiffuse;
                varying vec2 vUv;
                void main() {
                    vec4 previousPassColor = texture2D(tDiffuse, vUv);
                    gl_FragColor = vec4(
                        previousPassColor.rgb * color,
                        previousPassColor.a
                    );
                }
            `
        }
        const colorPass = new ShaderPass(colorShader)
        // colorPass.renderToScreen = true // 后处理结束，渲染到画布

        const dotPass = new ShaderPass(DotScreenShader)
        dotPass.uniforms['scale'].value = 4
        dotPass.enabled = false

        const rgbPass = new ShaderPass(RGBShiftShader)
        rgbPass.uniforms['amount'].value = 0.0015
        rgbPass.enabled = false

        const pixelPass = new ShaderPass(PixelShader)
        pixelPass.uniforms['resolution'].value = new THREE.Vector2(window.innerWidth, window.innerHeight);
        pixelPass.uniforms['resolution'].value.multiplyScalar(window.devicePixelRatio);
        pixelPass.uniforms['pixelSize'].value = 16
        pixelPass.enabled = false

        const gui = useGUI.create()
        {
            const folder = gui.addFolder('BloomPass')
            folder.add(bloomPass, 'enabled')
            folder
                .add(bloomPass.copyUniforms.opacity, 'value', 0, 2)
                .name('strength')
        }
        {
            const folder = gui.addFolder('FilmPass')
            folder.add(filmPass, 'enabled')
            folder.add(filmPass.uniforms.grayscale, 'value').name('grayscale')
            folder
                .add(filmPass.uniforms.nIntensity, 'value', 0, 1)
                .name('noise intensity')
            folder
                .add(filmPass.uniforms.sIntensity, 'value', 0, 1)
                .name('scanline intensity')
            folder
                .add(filmPass.uniforms.sCount, 'value', 0, 1e3)
                .name('scanline count')
            folder.open()
        }
        {
            const folder = gui.addFolder('ShaderPass')
            folder.add(colorPass, 'enabled')
            folder.add(colorPass.uniforms.color.value, 'r', 0, 4).name('red')
            folder.add(colorPass.uniforms.color.value, 'g', 0, 4).name('green')
            folder.add(colorPass.uniforms.color.value, 'b', 0, 4).name('blue')
            folder.open()
        }
        {
            const folder = gui.addFolder('AfterImagePass')
            folder.add(afterimagePass, 'enabled')
            folder.add(afterimagePass.uniforms.damp, 'value', 0, 1, 0.01).name('damp')
        }
        {
            const folder = gui.addFolder('GlitchPass')
            folder.add(glitchPass, 'enabled')
            folder.add(glitchPass, 'goWild')
        }
        {
            const folder = gui.addFolder('DotScreenShader')
            folder.add(dotPass, 'enabled')
            folder.add(dotPass.uniforms.scale, 'value', 0, 5, 0.01).name('scale')
        }
        {
            const folder = gui.addFolder('RGBShiftShader')
            folder.add(rgbPass, 'enabled')
            folder.add(rgbPass.uniforms.amount, 'value', 0, 0.01, 0.0001).name('amount')
        }
        {
            const folder = gui.addFolder('PixelShader')
            folder.add(pixelPass, 'enabled')
            folder.add(pixelPass.uniforms.pixelSize, 'value', 0, 32).name('pixelSize')
        }

        onMounted(() => {
            const renderer = new THREE.WebGLRenderer({ canvas: cvs.value })

            // 它将创建两个渲染目标（rtA,rtB），可以添加多个过程对象
            const composer = new EffectComposer(renderer)
            // 首先，将RenderPass传递给rtA
            composer.addPass(new RenderPass(scene, camera))
            // 添加模糊效果
            composer.addPass(bloomPass)
            // 绘制噪音和扫描线
            composer.addPass(filmPass)
            // 乘以一种颜色
            composer.addPass(colorPass)
            // 其他过程
            composer.addPass(afterimagePass)
            composer.addPass(glitchPass)
            composer.addPass(dotPass)
            composer.addPass(rgbPass)
            composer.addPass(pixelPass)

            let last = 0
            const render = time => {
                time *= 0.001 // 单位秒
                const deltaTime = time - last // 自渲染最后一帧以来的时间
                last = time

                if (resizeRendererToDisplaySize(renderer)) {
                    const canvas = renderer.domElement
                    camera.aspect = canvas.clientWidth / canvas.clientHeight
                    camera.updateProjectionMatrix()
                    // 匹配画布的大小
                    composer.setSize(canvas.width, canvas.height)
                }

                cubes.forEach((cube, ndx) => {
                    const speed = 1 + ndx * 0.1
                    const rot = time * speed
                    cube.rotation.x = rot
                    cube.rotation.y = rot
                })

                // 使用后处理的render渲染各种效果
                composer.render(deltaTime)

                rafId = requestAnimationFrame(render)
            }

            rafId = requestAnimationFrame(render)
        })

        onBeforeUnmount(() => {
            cancelAnimationFrame(rafId)
            useGUI.dispose()
        })

        return () => h('canvas', { ref: cvs, class: 'canvas' })
    }
})

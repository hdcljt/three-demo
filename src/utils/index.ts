import {
    WebGLRenderer,
    GridHelper,
    AxesHelper,
    Object3D,
    TextureLoader,
    RepeatWrapping,
    NearestFilter,
    PlaneBufferGeometry,
    MeshPhongMaterial,
    DoubleSide,
    Mesh,
    MathUtils,
    Vector3,
    PerspectiveCamera,
    Color,
    Raycaster,
    Scene,
    Vector2,
    WebGLRenderTarget,
    BoxBufferGeometry
} from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

export const resizeRendererToDisplaySize = (renderer: WebGLRenderer) => {
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = (canvas.clientWidth * pixelRatio) | 0
    const height = (canvas.clientHeight * pixelRatio) | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
        renderer.setSize(width, height, false)
    }
    return needResize
}

export class AxisGridHelper {
    grid: GridHelper
    axes: AxesHelper
    private _vis = false

    constructor(node: Object3D, units = 10) {
        const axes = new AxesHelper()
        axes.material['depthTest'] = false
        axes.renderOrder = 2
        node.add(axes)

        const grid = new GridHelper(units, units)
        grid.material['depthTest'] = false
        grid.renderOrder = 1
        node.add(grid)

        this.axes = axes
        this.grid = grid
        this.visible = false
    }

    get visible() {
        return this._vis
    }

    set visible(v) {
        this._vis = v
        this.axes.visible = v
        this.grid.visible = v
    }
}

export const randInt = (min: number, max?: number) => {
    if (max === undefined) {
        max = min
        min = 0
    }
    return (min + (max - min) * Math.random()) | 0
}

export const getCtx = (() => {
    const ctx = document.createElement('canvas').getContext('2d')
    ctx.canvas.width = 256
    ctx.canvas.height = 256
    ctx.fillStyle = '#fff'
    const drawRandDot = () => {
        const x = randInt(ctx.canvas.width)
        const y = randInt(ctx.canvas.width)
        const r = randInt(10, 64)
        const color = randInt(0x1000000).toString(16).padStart(6, '0')
        ctx.fillStyle = `#${color}`
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
    }
    return {
        canvas: ctx.canvas,
        drawRandDot
    }
})()

export const makePlane = (planeSize = 40) =>
    new Promise<Mesh<PlaneBufferGeometry, MeshPhongMaterial>>(
        (resolve, reject) => {
            const loader = new TextureLoader()
            loader.load(
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACAQMAAABIeJ9nAAAABlBMVEXAwMCAgIAc2aFNAAAADElEQVQI12NoYHAAAAHEAMFJRSpJAAAAAElFTkSuQmCC',
                texture => {
                    texture.wrapS = RepeatWrapping
                    texture.wrapT = RepeatWrapping
                    texture.magFilter = NearestFilter
                    const repeats = planeSize / 2
                    texture.repeat.set(repeats, repeats)

                    const planeGeo = new PlaneBufferGeometry(
                        planeSize,
                        planeSize
                    )
                    const planeMat = new MeshPhongMaterial({
                        map: texture,
                        side: DoubleSide
                    })
                    const mesh = new Mesh(planeGeo, planeMat)
                    mesh.rotation.x = MathUtils.degToRad(-90) // Math.PI * -.5
                    resolve(mesh)
                },
                undefined,
                reject
            )
        }
    )

export const requestRenderIfNotRequested = (() => {
    let renderRequested = false
    return (render: (time?: number) => void) => {
        if (renderRequested) return
        renderRequested = true
        requestAnimationFrame(time => {
            renderRequested = false
            render(time)
        })
    }
})()

export const setScissorForElement = (
    elm: HTMLDivElement,
    canvas: HTMLCanvasElement,
    renderer: WebGLRenderer
) => {
    const cvsRect = canvas.getBoundingClientRect()
    const elmRect = elm.getBoundingClientRect()

    const right = Math.min(elmRect.right, cvsRect.right) - cvsRect.left
    const left = Math.max(0, elmRect.left - cvsRect.left)
    const bottom = Math.min(elmRect.bottom, cvsRect.bottom) - cvsRect.top
    const top = Math.max(0, elmRect.top - cvsRect.top)
    const width = Math.min(right - left, cvsRect.width)
    const height = Math.min(bottom - top, cvsRect.height)

    const y = cvsRect.height - bottom
    renderer.setScissor(left, y, width, height)
    renderer.setViewport(left, y, width, height)

    return width / height
}

export class MinMaxGUIHelper {
    obj
    minProp
    maxProp
    minDif
    constructor(obj, minProp, maxProp, minDif) {
        this.obj = obj
        this.minProp = minProp
        this.maxProp = maxProp
        this.minDif = minDif
    }
    get min() {
        return this.obj[this.minProp]
    }
    set min(v) {
        this.obj[this.minProp] = v
        this.obj[this.maxProp] = Math.max(
            this.obj[this.maxProp],
            v + this.minDif
        )
    }
    get max() {
        return this.obj[this.maxProp]
    }
    set max(v) {
        this.obj[this.maxProp] = v
        this.min = this.min // 调用 min setter
    }
}

export class DimensionGUIHelper {
    obj
    minProp
    maxProp
    constructor(obj, minProp, maxProp) {
        this.obj = obj
        this.minProp = minProp
        this.maxProp = maxProp
    }
    get value() {
        return this.obj[this.maxProp] * 2
    }
    set value(v) {
        this.obj[this.maxProp] = v / 2
        this.obj[this.minProp] = v / -2
    }
}

export class ColorGUIHelper {
    obj
    prop
    constructor(obj, prop) {
        this.obj = obj
        this.prop = prop
    }
    get value() {
        return `#${this.obj[this.prop].getHexString()}`
    }
    set value(hexString) {
        this.obj[this.prop].set(hexString)
    }
}

export class DegRadHelper {
    obj
    prop
    constructor(obj, prop) {
        this.obj = obj
        this.prop = prop
    }
    get value() {
        return MathUtils.radToDeg(this.obj[this.prop])
    }
    set value(v) {
        this.obj[this.prop] = MathUtils.degToRad(v)
    }
}

export class FogGUIHelper {
    fog
    backgroundColor
    constructor(fog, backgroundColor) {
        this.fog = fog
        this.backgroundColor = backgroundColor
    }
    get near() {
        return this.fog.near
    }
    set near(v) {
        this.fog.near = v
        this.fog.far = Math.max(this.fog.far, v)
    }
    get far() {
        return this.fog.far
    }
    set far(v) {
        this.fog.far = v
        this.fog.near = Math.min(this.fog.near, v)
    }
    get color() {
        return `#${this.fog.color.getHexString()}`
    }
    set color(hexString) {
        this.fog.color.set(hexString)
        this.backgroundColor.set(hexString)
    }
}

export const frameArea = (
    sizeToFitOnScreen: number,
    boxSize: number,
    boxCenter: Vector3,
    camera: PerspectiveCamera
) => {
    const halfSizeToFitOnScreen = sizeToFitOnScreen / 2
    const halfFovY = MathUtils.degToRad(camera.fov / 2)
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY)
    // 计算一个单位向量，该向量指向相机现在在xz平面上从长方体中心开始的方向
    const direction = new Vector3()
        .subVectors(camera.position, boxCenter)
        .multiply(new Vector3(1, 0, 1))
        .normalize()
    // 移动相机，无论相机已从中心向何方向移动
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter))
    // 为将包含长方体的视锥体设置near和far值
    camera.near = boxSize / 100
    camera.far = boxSize * 100
    camera.updateProjectionMatrix()
    // 把相机看向盒子的中心
    camera.lookAt(boxCenter)
}

export const saveBlob = (blob: Blob, fileName: string) => {
    const a = document.createElement('a')
    const url = URL.createObjectURL(blob)
    const event = new MouseEvent('click')
    a.href = url
    a.download = fileName
    a.dispatchEvent(event)
    URL.revokeObjectURL(url)
}

export const useGUI = (() => {
    const node = document.querySelector('#app > section')
    let gui
    return {
        create() {
            gui = new GUI({ autoPlace: false })
            node.appendChild(gui.domElement)
            gui.domElement.style.position = 'absolute'
            gui.domElement.style.top = '12px'
            gui.domElement.style.right = '12px'
            gui.domElement.style.zIndex = '1'
            gui.domElement.style.textAlign = 'left'
            return gui
        },
        dispose() {
            node.removeChild(gui.domElement)
        }
    }
})()

export const randColor = () => new Color().setHSL(Math.random(), 1, 0.5)

export class PickHelper {
    raycaster = new Raycaster()
    pickedObject = null
    pickedObjectColor = 0

    pick(
        coords: Vector2,
        scene: Scene,
        camera: PerspectiveCamera,
        time: number
    ) {
        if (this.pickedObject) {
            // 恢复已拾取对象的颜色 - 材质的放射（光）颜色，基本上是不受其他光照影响的固有颜色。默认为黑色
            this.pickedObject.material.emissive.setHex(this.pickedObjectColor)
            this.pickedObject = null
        }
        // 投一道射线穿过视锥体（通过相机和鼠标位置更新射线）
        this.raycaster.setFromCamera(coords, camera)
        // 获取与光线相交的对象列表（计算物体和射线的焦点）
        const intersectedObjects = this.raycaster.intersectObjects(
            scene.children
        )
        if (intersectedObjects.length) {
            // 选择第一个对象。这是最近的一个
            this.pickedObject = intersectedObjects[0].object
            // 保存它的颜色
            this.pickedObjectColor = this.pickedObject.material.emissive.getHex()
            // 将其发射颜色设置为闪烁的红色/黄色
            this.pickedObject.material.emissive.setHex(
                (time * 8) % 2 > 1 ? 0xffff00 : 0xff0000
            )
        }
    }
}

export class GPUPickHelper {
    // raycaster = new THREE.Raycaster()
    pickingTexture = new WebGLRenderTarget(1, 1) // 创建一个1x1像素的渲染目标
    pixelBuffer = new Uint8Array(4) // r,g,b,a
    pickedObject = null
    pickedObjectColor = 0

    pick(
        cssPosition: Vector2,
        idToObject: Record<string, Mesh<BoxBufferGeometry, MeshPhongMaterial>>,
        renderer: WebGLRenderer,
        scene: Scene,
        camera: PerspectiveCamera,
        time: number,
        fullWidth = renderer.getContext().drawingBufferWidth,
        fullHeight = renderer.getContext().drawingBufferHeight
    ) {
        if (this.pickedObject) {
            this.pickedObject.material.emissive.setHex(this.pickedObjectColor)
            this.pickedObject = null
        }
        // 设置视图偏移以仅表示鼠标下方的单个像素
        const pixelRatio = renderer.getPixelRatio()
        // 仅渲染相机中的1x1像素
        camera.setViewOffset(
            fullWidth, // full width
            fullHeight, // full height
            (cssPosition.x * pixelRatio) | 0, // rect x
            (cssPosition.y * pixelRatio) | 0, // rect y
            1, // rect width
            1 // rect height
        )
        // 渲染目标场景
        renderer.setRenderTarget(this.pickingTexture)
        renderer.render(scene, camera)
        renderer.setRenderTarget(null)
        // 清除视图偏移，使渲染恢复正常
        camera.clearViewOffset()
        // 读取像素
        renderer.readRenderTargetPixels(
            this.pickingTexture,
            0, // x
            0, // y
            1, // width
            1, // height
            this.pixelBuffer
        )

        const id =
            (this.pixelBuffer[0] << 16) |
            (this.pixelBuffer[1] << 8) |
            this.pixelBuffer[2]

        const intersectedObject = idToObject[id]
        if (intersectedObject) {
            // 选择第一个对象。这是最近的一个
            this.pickedObject = intersectedObject
            // 保存它的颜色
            this.pickedObjectColor = this.pickedObject.material.emissive.getHex()
            // 将其发射颜色设置为闪烁的红色/黄色
            this.pickedObject.material.emissive.setHex(
                (time * 8) % 2 > 1 ? 0xffff00 : 0xff0000
            )
        }
    }
}

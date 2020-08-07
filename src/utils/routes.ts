import { defineAsyncComponent } from 'vue'
import HelloWorld from '../views/HelloWorld'

const routeMap = {
    helloWorld: HelloWorld,
    responsive: defineAsyncComponent(() => import('../views/c1')), // ts
    geometry: defineAsyncComponent(() => import('../views/c2')), // tsx
    scenegraph: defineAsyncComponent(() => import('../views/c3')), // js
    texture: defineAsyncComponent(() => import('../views/c4')), // jsx
    camera: defineAsyncComponent(() => import('../views/c5')),
    light: defineAsyncComponent(() => import('../views/c6')),
    gltf: defineAsyncComponent(() => import('../views/c7')),
    video: defineAsyncComponent(() => import('../views/c8')),
    postprocessing: defineAsyncComponent(() => import('../views/c9')),
    pick: defineAsyncComponent(() => import('../views/c10')),
    webvr: defineAsyncComponent(() => import('../views/c11')),
}

export default routeMap

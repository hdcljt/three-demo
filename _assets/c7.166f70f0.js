let e=document.createElement("style");e.innerHTML=".btn_6dd485ae{position:absolute;top:2em;left:2em;padding:10px;background:rgba(255,255,255,.9);color:#000;border:1px solid gray;cursor:pointer}.btn_6dd485ae:hover{background:#444;color:#fff}.btn_6dd485ae:focus{outline:0}",document.head.appendChild(e);import{a2 as t,a3 as s,a4 as a,C as r,Y as n,w as o,D as i,x as l,a5 as u,a6 as c,a7 as p,T as d,a8 as h,a9 as f,aa as m,ab as g,R as v,ac as T,ad as y,ae as x,L as S,e as R,v as M,af as _,ag as b,ah as w,a as E,k as A,ai as L,aj as I,ak as C,al as P,P as O,f as H,K as N,am as U,an as F,ao as D,O as k,ap as G,aq as K,ar as j,as as B,at as V,N as X,au as z,av as q,aw as W,ax as Y,ay as J,az as Z,aA as $,aB as Q,aC as ee,H as te,aD as se,aE as ae,aF as re,aG as ne,aH as oe,V as ie,aI as le,aJ as ue,d as ce,r as pe,S as de,aK as he,o as fe,W as me,b as ge,h as ve}from"./index.f7c153f6.js";import{u as Te,f as ye,F as xe,a as Se,d as Re}from"./index.22ce2b7e.js";import{O as Me}from"./OrbitControls.7a42b37a.js";var _e=function(){function e(e){t.call(this,e),this.dracoLoader=null,this.ddsLoader=null,this.ktx2Loader=null,this.pluginCallbacks=[],this.register((function(e){return new me(e)})),this.register((function(e){return new ve(e)})),this.register((function(e){return new ge(e)}))}function ce(){var e={};return{get:function(t){return e[t]},add:function(t,s){e[t]=s},remove:function(t){delete e[t]},removeAll:function(){e={}}}}e.prototype=Object.assign(Object.create(t.prototype),{constructor:e,load:function(e,t,r,n){var o,i=this;o=""!==this.resourcePath?this.resourcePath:""!==this.path?this.path:s.extractUrlBase(e),i.manager.itemStart(e);var l=function(t){n?n(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},u=new a(i.manager);u.setPath(this.path),u.setResponseType("arraybuffer"),u.setRequestHeader(this.requestHeader),"use-credentials"===i.crossOrigin&&u.setWithCredentials(!0),u.load(e,(function(s){try{i.parse(s,o,(function(s){t(s),i.manager.itemEnd(e)}),l)}catch(e){l(e)}}),r,l)},setDRACOLoader:function(e){return this.dracoLoader=e,this},setDDSLoader:function(e){return this.ddsLoader=e,this},setKTX2Loader:function(e){return this.ktx2Loader=e,this},register:function(e){return-1===this.pluginCallbacks.indexOf(e)&&this.pluginCallbacks.push(e),this},unregister:function(e){return-1!==this.pluginCallbacks.indexOf(e)&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this},parse:function(e,t,a,r){var n,o={},i={};if("string"==typeof e)n=e;else if(s.decodeText(new Uint8Array(e,0,4))===Te){try{o[pe.KHR_BINARY_GLTF]=new Se(e)}catch(e){return void(r&&r(e))}n=o[pe.KHR_BINARY_GLTF].content}else n=s.decodeText(new Uint8Array(e));var l=JSON.parse(n);if(void 0===l.asset||l.asset.version[0]<2)r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));else{var u=new Ze(l,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,manager:this.manager,ktx2Loader:this.ktx2Loader});u.fileLoader.setRequestHeader(this.requestHeader);for(var c=0;c<this.pluginCallbacks.length;c++){var p=this.pluginCallbacks[c](u);i[p.name]=p,o[p.name]=!0}if(l.extensionsUsed)for(c=0;c<l.extensionsUsed.length;++c){var d=l.extensionsUsed[c],h=l.extensionsRequired||[];switch(d){case pe.KHR_LIGHTS_PUNCTUAL:o[d]=new he(l);break;case pe.KHR_MATERIALS_UNLIT:o[d]=new fe;break;case pe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:o[d]=new be;break;case pe.KHR_DRACO_MESH_COMPRESSION:o[d]=new Re(l,this.dracoLoader);break;case pe.MSFT_TEXTURE_DDS:o[d]=new de(this.ddsLoader);break;case pe.KHR_TEXTURE_TRANSFORM:o[d]=new Me;break;case pe.KHR_MESH_QUANTIZATION:o[d]=new we;break;default:h.indexOf(d)>=0&&void 0===i[d]&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}u.setExtensions(o),u.setPlugins(i),u.parse(a,r)}}});var pe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:"KHR_materials_pbrSpecularGlossiness",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",MSFT_TEXTURE_DDS:"MSFT_texture_dds"};function de(e){if(!e)throw new Error("THREE.GLTFLoader: Attempting to load .dds texture without importing DDSLoader");this.name=pe.MSFT_TEXTURE_DDS,this.ddsLoader=e}function he(e){this.name=pe.KHR_LIGHTS_PUNCTUAL;var t=e.extensions&&e.extensions[pe.KHR_LIGHTS_PUNCTUAL]||{};this.lightDefs=t.lights||[]}function fe(){this.name=pe.KHR_MATERIALS_UNLIT}function me(e){this.parser=e,this.name=pe.KHR_MATERIALS_CLEARCOAT}function ge(e){this.parser=e,this.name=pe.KHR_MATERIALS_TRANSMISSION}function ve(e){this.parser=e,this.name=pe.KHR_TEXTURE_BASISU}he.prototype.loadLight=function(e){var t,s=this.lightDefs[e],a=new r(16777215);void 0!==s.color&&a.fromArray(s.color);var l=void 0!==s.range?s.range:0;switch(s.type){case"directional":(t=new i(a)).target.position.set(0,0,-1),t.add(t.target);break;case"point":(t=new o(a)).distance=l;break;case"spot":(t=new n(a)).distance=l,s.spot=s.spot||{},s.spot.innerConeAngle=void 0!==s.spot.innerConeAngle?s.spot.innerConeAngle:0,s.spot.outerConeAngle=void 0!==s.spot.outerConeAngle?s.spot.outerConeAngle:Math.PI/4,t.angle=s.spot.outerConeAngle,t.penumbra=1-s.spot.innerConeAngle/s.spot.outerConeAngle,t.target.position.set(0,0,-1),t.add(t.target);break;default:throw new Error('THREE.GLTFLoader: Unexpected light type, "'+s.type+'".')}return t.position.set(0,0,0),t.decay=2,void 0!==s.intensity&&(t.intensity=s.intensity),t.name=s.name||"light_"+e,Promise.resolve(t)},fe.prototype.getMaterialType=function(){return l},fe.prototype.extendParams=function(e,t,s){var a=[];e.color=new r(1,1,1),e.opacity=1;var n=t.pbrMetallicRoughness;if(n){if(Array.isArray(n.baseColorFactor)){var o=n.baseColorFactor;e.color.fromArray(o),e.opacity=o[3]}void 0!==n.baseColorTexture&&a.push(s.assignTexture(e,"map",n.baseColorTexture))}return Promise.all(a)},me.prototype.getMaterialType=function(){return B},me.prototype.extendMaterialParams=function(e,t){var s=this.parser,a=s.json.materials[e];if(!a.extensions||!a.extensions[this.name])return Promise.resolve();var r=[],n=a.extensions[this.name];if(void 0!==n.clearcoatFactor&&(t.clearcoat=n.clearcoatFactor),void 0!==n.clearcoatTexture&&r.push(s.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),void 0!==n.clearcoatRoughnessFactor&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),void 0!==n.clearcoatRoughnessTexture&&r.push(s.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),void 0!==n.clearcoatNormalTexture&&(r.push(s.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),void 0!==n.clearcoatNormalTexture.scale)){var o=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new M(o,o)}return Promise.all(r)},ge.prototype.getMaterialType=function(){return B},ge.prototype.extendMaterialParams=function(e,t){var s=this.parser,a=s.json.materials[e];if(!a.extensions||!a.extensions[this.name])return Promise.resolve();var r=[],n=a.extensions[this.name];return void 0!==n.transmissionFactor&&(t.transmission=n.transmissionFactor),void 0!==n.transmissionTexture&&r.push(s.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(r)},ve.prototype.loadTexture=function(e){var t=this.parser,s=t.json,a=s.textures[e];if(!a.extensions||!a.extensions[this.name])return null;var r=a.extensions[this.name],n=s.images[r.source],o=t.options.ktx2Loader;if(!o)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return t.loadTextureImage(e,n,o)};var Te="glTF",ye=1313821514,xe=5130562;function Se(e){this.name=pe.KHR_BINARY_GLTF,this.content=null,this.body=null;var t=new DataView(e,0,12);if(this.header={magic:s.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Te)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");for(var a=new DataView(e,12),r=0;r<a.byteLength;){var n=a.getUint32(r,!0);r+=4;var o=a.getUint32(r,!0);if(r+=4,o===ye){var i=new Uint8Array(e,12+r,n);this.content=s.decodeText(i)}else if(o===xe){var l=12+r;this.body=e.slice(l,l+n)}r+=n}if(null===this.content)throw new Error("THREE.GLTFLoader: JSON content not found.")}function Re(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=pe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}function Me(){this.name=pe.KHR_TEXTURE_TRANSFORM}function _e(e){u.call(this),this.isGLTFSpecularGlossinessMaterial=!0;var t=["#ifdef USE_SPECULARMAP","\tuniform sampler2D specularMap;","#endif"].join("\n"),s=["#ifdef USE_GLOSSINESSMAP","\tuniform sampler2D glossinessMap;","#endif"].join("\n"),a=["vec3 specularFactor = specular;","#ifdef USE_SPECULARMAP","\tvec4 texelSpecular = texture2D( specularMap, vUv );","\ttexelSpecular = sRGBToLinear( texelSpecular );","\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture","\tspecularFactor *= texelSpecular.rgb;","#endif"].join("\n"),n=["float glossinessFactor = glossiness;","#ifdef USE_GLOSSINESSMAP","\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );","\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture","\tglossinessFactor *= texelGlossiness.a;","#endif"].join("\n"),o=["PhysicalMaterial material;","material.diffuseColor = diffuseColor.rgb;","vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );","float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );","material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.","material.specularRoughness += geometryRoughness;","material.specularRoughness = min( material.specularRoughness, 1.0 );","material.specularColor = specularFactor.rgb;"].join("\n"),i={specular:{value:(new r).setHex(16777215)},glossiness:{value:1},specularMap:{value:null},glossinessMap:{value:null}};this._extraUniforms=i,this.onBeforeCompile=function(e){for(var r in i)e.uniforms[r]=i[r];e.fragmentShader=e.fragmentShader.replace("uniform float roughness;","uniform vec3 specular;"),e.fragmentShader=e.fragmentShader.replace("uniform float metalness;","uniform float glossiness;"),e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_pars_fragment>",t),e.fragmentShader=e.fragmentShader.replace("#include <metalnessmap_pars_fragment>",s),e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_fragment>",a),e.fragmentShader=e.fragmentShader.replace("#include <metalnessmap_fragment>",n),e.fragmentShader=e.fragmentShader.replace("#include <lights_physical_fragment>",o)},Object.defineProperties(this,{specular:{get:function(){return i.specular.value},set:function(e){i.specular.value=e}},specularMap:{get:function(){return i.specularMap.value},set:function(e){i.specularMap.value=e}},glossiness:{get:function(){return i.glossiness.value},set:function(e){i.glossiness.value=e}},glossinessMap:{get:function(){return i.glossinessMap.value},set:function(e){i.glossinessMap.value=e,e?(this.defines.USE_GLOSSINESSMAP="",this.defines.USE_ROUGHNESSMAP=""):(delete this.defines.USE_ROUGHNESSMAP,delete this.defines.USE_GLOSSINESSMAP)}}}),delete this.metalness,delete this.roughness,delete this.metalnessMap,delete this.roughnessMap,this.setValues(e)}function be(){return{name:pe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,specularGlossinessParams:["color","map","lightMap","lightMapIntensity","aoMap","aoMapIntensity","emissive","emissiveIntensity","emissiveMap","bumpMap","bumpScale","normalMap","normalMapType","displacementMap","displacementScale","displacementBias","specularMap","specular","glossinessMap","glossiness","alphaMap","envMap","envMapIntensity","refractionRatio"],getMaterialType:function(){return _e},extendParams:function(e,t,s){var a=t.extensions[this.name];e.color=new r(1,1,1),e.opacity=1;var n=[];if(Array.isArray(a.diffuseFactor)){var o=a.diffuseFactor;e.color.fromArray(o),e.opacity=o[3]}if(void 0!==a.diffuseTexture&&n.push(s.assignTexture(e,"map",a.diffuseTexture)),e.emissive=new r(0,0,0),e.glossiness=void 0!==a.glossinessFactor?a.glossinessFactor:1,e.specular=new r(1,1,1),Array.isArray(a.specularFactor)&&e.specular.fromArray(a.specularFactor),void 0!==a.specularGlossinessTexture){var i=a.specularGlossinessTexture;n.push(s.assignTexture(e,"glossinessMap",i)),n.push(s.assignTexture(e,"specularMap",i))}return Promise.all(n)},createMaterial:function(e){var t=new _e(e);return t.fog=!0,t.color=e.color,t.map=void 0===e.map?null:e.map,t.lightMap=null,t.lightMapIntensity=1,t.aoMap=void 0===e.aoMap?null:e.aoMap,t.aoMapIntensity=1,t.emissive=e.emissive,t.emissiveIntensity=1,t.emissiveMap=void 0===e.emissiveMap?null:e.emissiveMap,t.bumpMap=void 0===e.bumpMap?null:e.bumpMap,t.bumpScale=1,t.normalMap=void 0===e.normalMap?null:e.normalMap,t.normalMapType=c,e.normalScale&&(t.normalScale=e.normalScale),t.displacementMap=null,t.displacementScale=1,t.displacementBias=0,t.specularMap=void 0===e.specularMap?null:e.specularMap,t.specular=e.specular,t.glossinessMap=void 0===e.glossinessMap?null:e.glossinessMap,t.glossiness=e.glossiness,t.alphaMap=null,t.envMap=void 0===e.envMap?null:e.envMap,t.envMapIntensity=1,t.refractionRatio=.98,t}}}function we(){this.name=pe.KHR_MESH_QUANTIZATION}function Ee(e,t,s,a){V.call(this,e,t,s,a)}Re.prototype.decodePrimitive=function(e,t){var s=this.json,a=this.dracoLoader,r=e.extensions[this.name].bufferView,n=e.extensions[this.name].attributes,o={},i={},l={};for(var u in n){var c=ke[u]||u.toLowerCase();o[c]=n[u]}for(u in e.attributes){c=ke[u]||u.toLowerCase();if(void 0!==n[u]){var p=s.accessors[e.attributes[u]],d=Ne[p.componentType];l[c]=d,i[c]=!0===p.normalized}}return t.getDependency("bufferView",r).then((function(e){return new Promise((function(t){a.decodeDracoFile(e,(function(e){for(var s in e.attributes){var a=e.attributes[s],r=i[s];void 0!==r&&(a.normalized=r)}t(e)}),o,l)}))}))},Me.prototype.extendTexture=function(e,t){return e=e.clone(),void 0!==t.offset&&e.offset.fromArray(t.offset),void 0!==t.rotation&&(e.rotation=t.rotation),void 0!==t.scale&&e.repeat.fromArray(t.scale),void 0!==t.texCoord&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),e.needsUpdate=!0,e},_e.prototype=Object.create(u.prototype),_e.prototype.constructor=_e,_e.prototype.copy=function(e){return u.prototype.copy.call(this,e),this.specularMap=e.specularMap,this.specular.copy(e.specular),this.glossinessMap=e.glossinessMap,this.glossiness=e.glossiness,delete this.metalness,delete this.roughness,delete this.metalnessMap,delete this.roughnessMap,this},Ee.prototype=Object.create(V.prototype),Ee.prototype.constructor=Ee,Ee.prototype.copySampleValue_=function(e){for(var t=this.resultBuffer,s=this.sampleValues,a=this.valueSize,r=e*a*3+a,n=0;n!==a;n++)t[n]=s[r+n];return t},Ee.prototype.beforeStart_=Ee.prototype.copySampleValue_,Ee.prototype.afterEnd_=Ee.prototype.copySampleValue_,Ee.prototype.interpolate_=function(e,t,s,a){for(var r=this.resultBuffer,n=this.sampleValues,o=this.valueSize,i=2*o,l=3*o,u=a-t,c=(s-t)/u,p=c*c,d=p*c,h=e*l,f=h-l,m=-2*d+3*p,g=d-p,v=1-m,T=g-p+c,y=0;y!==o;y++){var x=n[f+y+o],S=n[f+y+i]*u,R=n[h+y+o],M=n[h+y]*u;r[y]=v*x+T*S+m*R+g*M}return r};var Ae=0,Le=1,Ie=2,Ce=3,Pe=4,Oe=5,He=6,Ne={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ue={9728:X,9729:m,9984:z,9985:q,9986:W,9987:g},Fe={33071:Y,33648:J,10497:v},De={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ke={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ge={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Ke={CUBICSPLINE:void 0,LINEAR:U,STEP:Z},je="OPAQUE",Be="MASK",Ve="BLEND",Xe={"image/png":$,"image/jpeg":T};function ze(e,t){return"string"!=typeof e||""===e?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}function qe(e,t,s){for(var a in s.extensions)void 0===e[a]&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[a]=s.extensions[a])}function We(e,t){void 0!==t.extras&&("object"==typeof t.extras?Object.assign(e.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function Ye(e,t){if(e.updateMorphTargets(),void 0!==t.weights)for(var s=0,a=t.weights.length;s<a;s++)e.morphTargetInfluences[s]=t.weights[s];if(t.extras&&Array.isArray(t.extras.targetNames)){var r=t.extras.targetNames;if(e.morphTargetInfluences.length===r.length){e.morphTargetDictionary={};for(s=0,a=r.length;s<a;s++)e.morphTargetDictionary[r[s]]=s}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Je(e){for(var t="",s=Object.keys(e).sort(),a=0,r=s.length;a<r;a++)t+=s[a]+":"+e[s[a]]+";";return t}function Ze(e,t){this.json=e||{},this.extensions={},this.plugins={},this.options=t||{},this.cache=new ce,this.associations=new Map,this.primitiveCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},"undefined"!=typeof createImageBitmap&&!1===/Firefox/.test(navigator.userAgent)?this.textureLoader=new p(this.options.manager):this.textureLoader=new d(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.fileLoader=new a(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),"use-credentials"===this.options.crossOrigin&&this.fileLoader.setWithCredentials(!0)}function $e(e,t,s){var a=t.attributes,r=[];function n(t,a){return s.getDependency("accessor",t).then((function(t){e.setAttribute(a,t)}))}for(var o in a){var i=ke[o]||o.toLowerCase();i in e.attributes||r.push(n(a[o],i))}if(void 0!==t.indices&&!e.index){var l=s.getDependency("accessor",t.indices).then((function(t){e.setIndex(t)}));r.push(l)}return We(e,t),function(e,t,s){var a=t.attributes,r=new le;if(void 0!==a.POSITION){var n=(h=s.json.accessors[a.POSITION]).min,o=h.max;if(void 0!==n&&void 0!==o){r.set(new ie(n[0],n[1],n[2]),new ie(o[0],o[1],o[2]));var i=t.targets;if(void 0!==i){for(var l=new ie,u=new ie,c=0,p=i.length;c<p;c++){var d=i[c];if(void 0!==d.POSITION){var h;n=(h=s.json.accessors[d.POSITION]).min,o=h.max;void 0!==n&&void 0!==o?(u.setX(Math.max(Math.abs(n[0]),Math.abs(o[0]))),u.setY(Math.max(Math.abs(n[1]),Math.abs(o[1]))),u.setZ(Math.max(Math.abs(n[2]),Math.abs(o[2]))),l.max(u)):console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(l)}e.boundingBox=r;var f=new ue;r.getCenter(f.center),f.radius=r.min.distanceTo(r.max)/2,e.boundingSphere=f}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}(e,t,s),Promise.all(r).then((function(){return void 0!==t.targets?function(e,t,s){for(var a=!1,r=!1,n=0,o=t.length;n<o;n++){if(void 0!==(u=t[n]).POSITION&&(a=!0),void 0!==u.NORMAL&&(r=!0),a&&r)break}if(!a&&!r)return Promise.resolve(e);var i=[],l=[];for(n=0,o=t.length;n<o;n++){var u=t[n];if(a){var c=void 0!==u.POSITION?s.getDependency("accessor",u.POSITION):e.attributes.position;i.push(c)}if(r){c=void 0!==u.NORMAL?s.getDependency("accessor",u.NORMAL):e.attributes.normal;l.push(c)}}return Promise.all([Promise.all(i),Promise.all(l)]).then((function(t){var s=t[0],n=t[1];return a&&(e.morphAttributes.position=s),r&&(e.morphAttributes.normal=n),e.morphTargetsRelative=!0,e}))}(e,t.targets,s):e}))}function Qe(e,t){var s=e.getIndex();if(null===s){var a=[],r=e.getAttribute("position");if(void 0===r)return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e;for(var n=0;n<r.count;n++)a.push(n);e.setIndex(a),s=e.getIndex()}var o=s.count-2,i=[];if(t===se)for(n=1;n<=o;n++)i.push(s.getX(0)),i.push(s.getX(n)),i.push(s.getX(n+1));else for(n=0;n<o;n++)n%2==0?(i.push(s.getX(n)),i.push(s.getX(n+1)),i.push(s.getX(n+2))):(i.push(s.getX(n+2)),i.push(s.getX(n+1)),i.push(s.getX(n)));i.length/3!==o&&console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");var l=e.clone();return l.setIndex(i),l}return Ze.prototype.setExtensions=function(e){this.extensions=e},Ze.prototype.setPlugins=function(e){this.plugins=e},Ze.prototype.parse=function(e,t){var s=this,a=this.json,r=this.extensions;this.cache.removeAll(),this._markDefs(),Promise.all([this.getDependencies("scene"),this.getDependencies("animation"),this.getDependencies("camera")]).then((function(t){var n={scene:t[0][a.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:a.asset,parser:s,userData:{}};qe(r,n,a),We(n,a),e(n)})).catch(t)},Ze.prototype._markDefs=function(){for(var e=this.json.nodes||[],t=this.json.skins||[],s=this.json.meshes||[],a=0,r=t.length;a<r;a++)for(var n=t[a].joints,o=0,i=n.length;o<i;o++)e[n[o]].isBone=!0;for(var l=0,u=e.length;l<u;l++){var c=e[l];void 0!==c.mesh&&(this._addNodeRef(this.meshCache,c.mesh),void 0!==c.skin&&(s[c.mesh].isSkinnedMesh=!0)),void 0!==c.camera&&this._addNodeRef(this.cameraCache,c.camera),c.extensions&&c.extensions[pe.KHR_LIGHTS_PUNCTUAL]&&void 0!==c.extensions[pe.KHR_LIGHTS_PUNCTUAL].light&&this._addNodeRef(this.lightCache,c.extensions[pe.KHR_LIGHTS_PUNCTUAL].light)}},Ze.prototype._addNodeRef=function(e,t){void 0!==t&&(void 0===e.refs[t]&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)},Ze.prototype._getNodeRef=function(e,t,s){if(e.refs[t]<=1)return s;var a=s.clone();return a.name+="_instance_"+e.uses[t]++,a},Ze.prototype._invokeOne=function(e){var t=Object.values(this.plugins);t.push(this);for(var s=0;s<t.length;s++){var a=e(t[s]);if(a)return a}},Ze.prototype._invokeAll=function(e){var t=Object.values(this.plugins);t.unshift(this);for(var s=[],a=0;a<t.length;a++)s.push(e(t[a]));return Promise.all(s)},Ze.prototype.getDependency=function(e,t){var s=e+":"+t,a=this.cache.get(s);if(!a){switch(e){case"scene":a=this.loadScene(t);break;case"node":a=this.loadNode(t);break;case"mesh":a=this._invokeOne((function(e){return e.loadMesh&&e.loadMesh(t)}));break;case"accessor":a=this.loadAccessor(t);break;case"bufferView":a=this._invokeOne((function(e){return e.loadBufferView&&e.loadBufferView(t)}));break;case"buffer":a=this.loadBuffer(t);break;case"material":a=this._invokeOne((function(e){return e.loadMaterial&&e.loadMaterial(t)}));break;case"texture":a=this._invokeOne((function(e){return e.loadTexture&&e.loadTexture(t)}));break;case"skin":a=this.loadSkin(t);break;case"animation":a=this.loadAnimation(t);break;case"camera":a=this.loadCamera(t);break;case"light":a=this.extensions[pe.KHR_LIGHTS_PUNCTUAL].loadLight(t);break;default:throw new Error("Unknown type: "+e)}this.cache.add(s,a)}return a},Ze.prototype.getDependencies=function(e){var t=this.cache.get(e);if(!t){var s=this,a=this.json[e+("mesh"===e?"es":"s")]||[];t=Promise.all(a.map((function(t,a){return s.getDependency(e,a)}))),this.cache.add(e,t)}return t},Ze.prototype.loadBuffer=function(e){var t=this.json.buffers[e],s=this.fileLoader;if(t.type&&"arraybuffer"!==t.type)throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(void 0===t.uri&&0===e)return Promise.resolve(this.extensions[pe.KHR_BINARY_GLTF].body);var a=this.options;return new Promise((function(e,r){s.load(ze(t.uri,a.path),e,void 0,(function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))}))}))},Ze.prototype.loadBufferView=function(e){var t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then((function(e){var s=t.byteLength||0,a=t.byteOffset||0;return e.slice(a,a+s)}))},Ze.prototype.loadAccessor=function(e){var t=this,s=this.json,a=this.json.accessors[e];if(void 0===a.bufferView&&void 0===a.sparse)return Promise.resolve(null);var r=[];return void 0!==a.bufferView?r.push(this.getDependency("bufferView",a.bufferView)):r.push(null),void 0!==a.sparse&&(r.push(this.getDependency("bufferView",a.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",a.sparse.values.bufferView))),Promise.all(r).then((function(e){var r,n,o=e[0],i=De[a.type],l=Ne[a.componentType],u=l.BYTES_PER_ELEMENT,c=u*i,p=a.byteOffset||0,d=void 0!==a.bufferView?s.bufferViews[a.bufferView].byteStride:void 0,m=!0===a.normalized;if(d&&d!==c){var g=Math.floor(p/d),v="InterleavedBuffer:"+a.bufferView+":"+a.componentType+":"+g+":"+a.count,T=t.cache.get(v);T||(r=new l(o,g*d,a.count*d/u),T=new h(r,d/u),t.cache.add(v,T)),n=new ee(T,i,p%d/u,m)}else r=null===o?new l(a.count*i):new l(o,p,a.count*i),n=new f(r,i,m);if(void 0!==a.sparse){var y=De.SCALAR,x=Ne[a.sparse.indices.componentType],S=a.sparse.indices.byteOffset||0,R=a.sparse.values.byteOffset||0,M=new x(e[1],S,a.sparse.count*y),_=new l(e[2],R,a.sparse.count*i);null!==o&&(n=new f(n.array.slice(),n.itemSize,n.normalized));for(var b=0,w=M.length;b<w;b++){var E=M[b];if(n.setX(E,_[b*i]),i>=2&&n.setY(E,_[b*i+1]),i>=3&&n.setZ(E,_[b*i+2]),i>=4&&n.setW(E,_[b*i+3]),i>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return n}))},Ze.prototype.loadTexture=function(e){var t,s,a=this.json,r=this.options,n=a.textures[e],o=n.extensions||{};return(t=o[pe.MSFT_TEXTURE_DDS]?a.images[o[pe.MSFT_TEXTURE_DDS].source]:a.images[n.source]).uri&&(s=r.manager.getHandler(t.uri)),s||(s=o[pe.MSFT_TEXTURE_DDS]?this.extensions[pe.MSFT_TEXTURE_DDS].ddsLoader:this.textureLoader),this.loadTextureImage(e,t,s)},Ze.prototype.loadTextureImage=function(e,t,s){var a=this,r=this.json,n=this.options,o=r.textures[e],i=self.URL||self.webkitURL,l=t.uri,u=!1;return void 0!==t.bufferView&&(l=a.getDependency("bufferView",t.bufferView).then((function(e){u=!0;var s=new Blob([e],{type:t.mimeType});return l=i.createObjectURL(s)}))),Promise.resolve(l).then((function(e){return new Promise((function(t,a){var r=t;!0===s.isImageBitmapLoader&&(r=function(e){t(new te(e))}),s.load(ze(e,n.path),r,void 0,a)}))})).then((function(s){!0===u&&i.revokeObjectURL(l),s.flipY=!1,o.name&&(s.name=o.name),t.mimeType in Xe&&(s.format=Xe[t.mimeType]);var n=(r.samplers||{})[o.sampler]||{};return s.magFilter=Ue[n.magFilter]||m,s.minFilter=Ue[n.minFilter]||g,s.wrapS=Fe[n.wrapS]||v,s.wrapT=Fe[n.wrapT]||v,a.associations.set(s,{type:"textures",index:e}),s}))},Ze.prototype.assignTexture=function(e,t,s){var a=this;return this.getDependency("texture",s.index).then((function(r){if(!r.isCompressedTexture)switch(t){case"aoMap":case"emissiveMap":case"metalnessMap":case"normalMap":case"roughnessMap":r.format=T}if(void 0===s.texCoord||0==s.texCoord||"aoMap"===t&&1==s.texCoord||console.warn("THREE.GLTFLoader: Custom UV set "+s.texCoord+" for texture "+t+" not yet supported."),a.extensions[pe.KHR_TEXTURE_TRANSFORM]){var n=void 0!==s.extensions?s.extensions[pe.KHR_TEXTURE_TRANSFORM]:void 0;if(n){var o=a.associations.get(r);r=a.extensions[pe.KHR_TEXTURE_TRANSFORM].extendTexture(r,n),a.associations.set(r,o)}}e[t]=r}))},Ze.prototype.assignFinalMaterial=function(e){var t=e.geometry,s=e.material,a=void 0!==t.attributes.tangent,r=void 0!==t.attributes.color,n=void 0===t.attributes.normal,o=!0===e.isSkinnedMesh,i=Object.keys(t.morphAttributes).length>0,l=i&&void 0!==t.morphAttributes.normal;if(e.isPoints){var u="PointsMaterial:"+s.uuid,c=this.cache.get(u);c||(c=new y,x.prototype.copy.call(c,s),c.color.copy(s.color),c.map=s.map,c.sizeAttenuation=!1,this.cache.add(u,c)),s=c}else if(e.isLine){u="LineBasicMaterial:"+s.uuid;var p=this.cache.get(u);p||(p=new S,x.prototype.copy.call(p,s),p.color.copy(s.color),this.cache.add(u,p)),s=p}if(a||r||n||o||i){u="ClonedMaterial:"+s.uuid+":";s.isGLTFSpecularGlossinessMaterial&&(u+="specular-glossiness:"),o&&(u+="skinning:"),a&&(u+="vertex-tangents:"),r&&(u+="vertex-colors:"),n&&(u+="flat-shading:"),i&&(u+="morph-targets:"),l&&(u+="morph-normals:");var d=this.cache.get(u);d||(d=s.clone(),o&&(d.skinning=!0),a&&(d.vertexTangents=!0),r&&(d.vertexColors=!0),n&&(d.flatShading=!0),i&&(d.morphTargets=!0),l&&(d.morphNormals=!0),this.cache.add(u,d),this.associations.set(d,this.associations.get(s))),s=d}s.aoMap&&void 0===t.attributes.uv2&&void 0!==t.attributes.uv&&t.setAttribute("uv2",t.attributes.uv),s.normalScale&&!a&&(s.normalScale.y=-s.normalScale.y),s.clearcoatNormalScale&&!a&&(s.clearcoatNormalScale.y=-s.clearcoatNormalScale.y),e.material=s},Ze.prototype.getMaterialType=function(){return u},Ze.prototype.loadMaterial=function(e){var t,s=this,a=this.json,n=this.extensions,o=a.materials[e],i={},u=o.extensions||{},c=[];if(u[pe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]){var p=n[pe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];t=p.getMaterialType(),c.push(p.extendParams(i,o,s))}else if(u[pe.KHR_MATERIALS_UNLIT]){var d=n[pe.KHR_MATERIALS_UNLIT];t=d.getMaterialType(),c.push(d.extendParams(i,o,s))}else{var h=o.pbrMetallicRoughness||{};if(i.color=new r(1,1,1),i.opacity=1,Array.isArray(h.baseColorFactor)){var f=h.baseColorFactor;i.color.fromArray(f),i.opacity=f[3]}void 0!==h.baseColorTexture&&c.push(s.assignTexture(i,"map",h.baseColorTexture)),i.metalness=void 0!==h.metallicFactor?h.metallicFactor:1,i.roughness=void 0!==h.roughnessFactor?h.roughnessFactor:1,void 0!==h.metallicRoughnessTexture&&(c.push(s.assignTexture(i,"metalnessMap",h.metallicRoughnessTexture)),c.push(s.assignTexture(i,"roughnessMap",h.metallicRoughnessTexture))),t=this._invokeOne((function(t){return t.getMaterialType&&t.getMaterialType(e)})),c.push(this._invokeAll((function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,i)})))}!0===o.doubleSided&&(i.side=R);var m=o.alphaMode||je;return m===Ve?(i.transparent=!0,i.depthWrite=!1):(i.transparent=!1,m===Be&&(i.alphaTest=void 0!==o.alphaCutoff?o.alphaCutoff:.5)),void 0!==o.normalTexture&&t!==l&&(c.push(s.assignTexture(i,"normalMap",o.normalTexture)),i.normalScale=new M(1,1),void 0!==o.normalTexture.scale&&i.normalScale.set(o.normalTexture.scale,o.normalTexture.scale)),void 0!==o.occlusionTexture&&t!==l&&(c.push(s.assignTexture(i,"aoMap",o.occlusionTexture)),void 0!==o.occlusionTexture.strength&&(i.aoMapIntensity=o.occlusionTexture.strength)),void 0!==o.emissiveFactor&&t!==l&&(i.emissive=(new r).fromArray(o.emissiveFactor)),void 0!==o.emissiveTexture&&t!==l&&c.push(s.assignTexture(i,"emissiveMap",o.emissiveTexture)),Promise.all(c).then((function(){var a;return a=t===_e?n[pe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(i):new t(i),o.name&&(a.name=o.name),a.map&&(a.map.encoding=_),a.emissiveMap&&(a.emissiveMap.encoding=_),We(a,o),s.associations.set(a,{type:"materials",index:e}),o.extensions&&qe(n,a,o),a}))},Ze.prototype.loadGeometries=function(e){var t=this,s=this.extensions,a=this.primitiveCache;function r(e){return s[pe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then((function(s){return $e(s,e,t)}))}for(var n,o,i=[],l=0,u=e.length;l<u;l++){var c,p=e[l],d=(o=void 0,(o=(n=p).extensions&&n.extensions[pe.KHR_DRACO_MESH_COMPRESSION])?"draco:"+o.bufferView+":"+o.indices+":"+Je(o.attributes):n.indices+":"+Je(n.attributes)+":"+n.mode),h=a[d];if(h)i.push(h.promise);else c=p.extensions&&p.extensions[pe.KHR_DRACO_MESH_COMPRESSION]?r(p):$e(new b,p,t),a[d]={primitive:p,promise:c},i.push(c)}return Promise.all(i)},Ze.prototype.loadMesh=function(e){for(var t,s=this,a=this.json.meshes[e],r=a.primitives,n=[],o=0,i=r.length;o<i;o++){var l=void 0===r[o].material?(void 0===(t=this.cache).DefaultMaterial&&(t.DefaultMaterial=new u({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Q})),t.DefaultMaterial):this.getDependency("material",r[o].material);n.push(l)}return n.push(s.loadGeometries(r)),Promise.all(n).then((function(t){for(var n=t.slice(0,t.length-1),o=t[t.length-1],i=[],l=0,u=o.length;l<u;l++){var c,p=o[l],d=r[l],h=n[l];if(d.mode===Pe||d.mode===Oe||d.mode===He||void 0===d.mode)!0!==(c=!0===a.isSkinnedMesh?new w(p,h):new E(p,h)).isSkinnedMesh||c.geometry.attributes.skinWeight.normalized||c.normalizeSkinWeights(),d.mode===Oe?c.geometry=Qe(c.geometry,ae):d.mode===He&&(c.geometry=Qe(c.geometry,se));else if(d.mode===Le)c=new A(p,h);else if(d.mode===Ce)c=new L(p,h);else if(d.mode===Ie)c=new I(p,h);else{if(d.mode!==Ae)throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+d.mode);c=new C(p,h)}Object.keys(c.geometry.morphAttributes).length>0&&Ye(c,a),c.name=a.name||"mesh_"+e,o.length>1&&(c.name+="_"+l),We(c,a),s.assignFinalMaterial(c),i.push(c)}if(1===i.length)return i[0];var f=new P;for(l=0,u=i.length;l<u;l++)f.add(i[l]);return f}))},Ze.prototype.loadCamera=function(e){var t,s=this.json.cameras[e],a=s[s.type];if(a)return"perspective"===s.type?t=new O(H.radToDeg(a.yfov),a.aspectRatio||1,a.znear||1,a.zfar||2e6):"orthographic"===s.type&&(t=new N(-a.xmag,a.xmag,a.ymag,-a.ymag,a.znear,a.zfar)),s.name&&(t.name=s.name),We(t,s),Promise.resolve(t);console.warn("THREE.GLTFLoader: Missing camera parameters.")},Ze.prototype.loadSkin=function(e){var t=this.json.skins[e],s={joints:t.joints};return void 0===t.inverseBindMatrices?Promise.resolve(s):this.getDependency("accessor",t.inverseBindMatrices).then((function(e){return s.inverseBindMatrices=e,s}))},Ze.prototype.loadAnimation=function(e){for(var t=this.json.animations[e],s=[],a=[],r=[],n=[],o=[],i=0,l=t.channels.length;i<l;i++){var u=t.channels[i],c=t.samplers[u.sampler],p=u.target,d=void 0!==p.node?p.node:p.id,h=void 0!==t.parameters?t.parameters[c.input]:c.input,f=void 0!==t.parameters?t.parameters[c.output]:c.output;s.push(this.getDependency("node",d)),a.push(this.getDependency("accessor",h)),r.push(this.getDependency("accessor",f)),n.push(c),o.push(p)}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(r),Promise.all(n),Promise.all(o)]).then((function(s){for(var a=s[0],r=s[1],n=s[2],o=s[3],i=s[4],l=[],u=0,c=a.length;u<c;u++){var p=a[u],d=r[u],h=n[u],f=o[u],m=i[u];if(void 0!==p){var g;switch(p.updateMatrix(),p.matrixAutoUpdate=!0,Ge[m.path]){case Ge.weights:g=oe;break;case Ge.rotation:g=ne;break;case Ge.position:case Ge.scale:default:g=re}var v=p.name?p.name:p.uuid,T=void 0!==f.interpolation?Ke[f.interpolation]:U,y=[];Ge[m.path]===Ge.weights?p.traverse((function(e){!0===e.isMesh&&e.morphTargetInfluences&&y.push(e.name?e.name:e.uuid)})):y.push(v);var x=h.array;if(h.normalized){var S;if(x.constructor===Int8Array)S=1/127;else if(x.constructor===Uint8Array)S=1/255;else if(x.constructor==Int16Array)S=1/32767;else{if(x.constructor!==Uint16Array)throw new Error("THREE.GLTFLoader: Unsupported output accessor component type.");S=1/65535}for(var R=new Float32Array(x.length),M=0,_=x.length;M<_;M++)R[M]=x[M]*S;x=R}for(M=0,_=y.length;M<_;M++){var b=new g(y[M]+"."+Ge[m.path],d.array,x,T);"CUBICSPLINE"===f.interpolation&&(b.createInterpolant=function(e){return new Ee(this.times,this.values,this.getValueSize()/3,e)},b.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),l.push(b)}}}var w=t.name?t.name:"animation_"+e;return new F(w,void 0,l)}))},Ze.prototype.loadNode=function(e){var t=this.json,s=this.extensions,a=this,r=t.nodes[e];return function(){var e=[];if(void 0!==r.mesh&&e.push(a.getDependency("mesh",r.mesh).then((function(e){var t=a._getNodeRef(a.meshCache,r.mesh,e);return void 0!==r.weights&&t.traverse((function(e){if(e.isMesh)for(var t=0,s=r.weights.length;t<s;t++)e.morphTargetInfluences[t]=r.weights[t]})),t}))),void 0!==r.camera&&e.push(a.getDependency("camera",r.camera).then((function(e){return a._getNodeRef(a.cameraCache,r.camera,e)}))),r.extensions&&r.extensions[pe.KHR_LIGHTS_PUNCTUAL]&&void 0!==r.extensions[pe.KHR_LIGHTS_PUNCTUAL].light){var t=r.extensions[pe.KHR_LIGHTS_PUNCTUAL].light;e.push(a.getDependency("light",t).then((function(e){return a._getNodeRef(a.lightCache,t,e)})))}return Promise.all(e)}().then((function(t){var n;if((n=!0===r.isBone?new D:t.length>1?new P:1===t.length?t[0]:new k)!==t[0])for(var o=0,i=t.length;o<i;o++)n.add(t[o]);if(r.name&&(n.userData.name=r.name,n.name=G.sanitizeNodeName(r.name)),We(n,r),r.extensions&&qe(s,n,r),void 0!==r.matrix){var l=new K;l.fromArray(r.matrix),n.applyMatrix4(l)}else void 0!==r.translation&&n.position.fromArray(r.translation),void 0!==r.rotation&&n.quaternion.fromArray(r.rotation),void 0!==r.scale&&n.scale.fromArray(r.scale);return a.associations.set(n,{type:"nodes",index:e}),n}))},Ze.prototype.loadScene=function(){function e(t,s,a,r){var n=a.nodes[t];return r.getDependency("node",t).then((function(e){return void 0===n.skin?e:r.getDependency("skin",n.skin).then((function(e){for(var s=[],a=0,n=(t=e).joints.length;a<n;a++)s.push(r.getDependency("node",t.joints[a]));return Promise.all(s)})).then((function(s){return e.traverse((function(e){if(e.isMesh){for(var a=[],r=[],n=0,o=s.length;n<o;n++){var i=s[n];if(i){a.push(i);var l=new K;void 0!==t.inverseBindMatrices&&l.fromArray(t.inverseBindMatrices.array,16*n),r.push(l)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[n])}e.bind(new j(a,r),e.matrixWorld)}})),e}));var t})).then((function(t){s.add(t);var o=[];if(n.children)for(var i=n.children,l=0,u=i.length;l<u;l++){var c=i[l];o.push(e(c,t,a,r))}return Promise.all(o)}))}return function(t){var s=this.json,a=this.extensions,r=this.json.scenes[t],n=new P;r.name&&(n.name=r.name),We(n,r),r.extensions&&qe(a,n,r);for(var o=r.nodes||[],i=[],l=0,u=o.length;l<u;l++)i.push(e(o[l],n,s,this));return Promise.all(i).then((function(){return n}))}}(),e}(),be="btn_6dd485ae";let we=0;const Ee=(e,...t)=>{const s=new i(16777215,1);s.position.set(...t),e.add(s)};var Ae=ce({setup(){const e=pe(null),t=Te.create(),s=new de;s.fog=new he("lightblue",1,1e3),s.background=new r("lightblue");const a=new xe(s.fog,s.background),n=t.addFolder("Fog");n.add(a,"near",1,1e3).listen(),n.add(a,"far",1,1e3).listen(),n.addColor(a,"color"),n.open();const o=new O(75,2,.1,5);o.position.set(0,0,2),Ee(s,-1,2,4),Ee(s,2,-2,3);let i,l;(new _e).load("/models/mountain_landscape/scene.gltf",e=>{const t=e.scene;s.add(t);const a=(new le).setFromObject(t),r=a.getSize(new ie).length(),n=a.getCenter(new ie);console.log(r),ye(r,r,n,o),i.maxDistance=10*r,i.target.copy(n),i.update()});const u=()=>{if(Se(l)){const e=l.domElement;o.aspect=e.clientWidth/e.clientHeight,o.updateProjectionMatrix()}l.render(s,o)},c=()=>{u();const t=e.value;t.toBlob(e=>{Re(e,`Test-${t.width}x${t.height}.png`)})};return fe(()=>{i=new Me(o,e.value),i.enableDamping=!0,i.target.set(0,5,0),i.update(),l=new me({canvas:e.value});const t=()=>{u(),we=requestAnimationFrame(t)};we=requestAnimationFrame(t)}),ge(()=>{cancelAnimationFrame(we),Te.dispose()}),()=>[ve("canvas",{ref:e,class:"canvas"}),ve("button",{class:be,onClick:c},"保存图片")]}});export default Ae;

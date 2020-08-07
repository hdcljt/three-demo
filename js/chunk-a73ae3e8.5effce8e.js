(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a73ae3e8"],{4721:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n("5a89"),o=function(e,t){void 0===t&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),t===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=e,this.domElement=t,this.enabled=!0,this.target=new a["Qb"],this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:a["V"].ROTATE,MIDDLE:a["V"].DOLLY,RIGHT:a["V"].PAN},this.touches={ONE:a["Ib"].ROTATE,TWO:a["Ib"].DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return d.phi},this.getAzimuthalAngle=function(){return d.theta},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(o),n.update(),s=r.NONE},this.update=function(){var t=new a["Qb"],i=(new a["tb"]).setFromUnitVectors(e.up,new a["Qb"](0,1,0)),c=i.clone().inverse(),p=new a["Qb"],f=new a["tb"],g=2*Math.PI;return function(){var e=n.object.position;t.copy(e).sub(n.target),t.applyQuaternion(i),d.setFromVector3(t),n.autoRotate&&s===r.NONE&&C(y()),n.enableDamping?(d.theta+=h.theta*n.dampingFactor,d.phi+=h.phi*n.dampingFactor):(d.theta+=h.theta,d.phi+=h.phi);var a=n.minAzimuthAngle,v=n.maxAzimuthAngle;return isFinite(a)&&isFinite(v)&&(a<-Math.PI?a+=g:a>Math.PI&&(a-=g),v<-Math.PI?v+=g:v>Math.PI&&(v-=g),d.theta=a<v?Math.max(a,Math.min(v,d.theta)):d.theta>(a+v)/2?Math.max(a,d.theta):Math.min(v,d.theta)),d.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,d.phi)),d.makeSafe(),d.radius*=l,d.radius=Math.max(n.minDistance,Math.min(n.maxDistance,d.radius)),!0===n.enableDamping?n.target.addScaledVector(m,n.dampingFactor):n.target.add(m),t.setFromSpherical(d),t.applyQuaternion(c),e.copy(n.target).add(t),n.object.lookAt(n.target),!0===n.enableDamping?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,m.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),m.set(0,0,0)),l=1,!!(b||p.distanceToSquared(n.object.position)>u||8*(1-f.dot(n.object.quaternion))>u)&&(n.dispatchEvent(o),p.copy(n.object.position),f.copy(n.object.quaternion),b=!1,!0)}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",re,!1),n.domElement.removeEventListener("mousedown",$,!1),n.domElement.removeEventListener("wheel",ne,!1),n.domElement.removeEventListener("touchstart",oe,!1),n.domElement.removeEventListener("touchend",ce,!1),n.domElement.removeEventListener("touchmove",ie,!1),n.domElement.ownerDocument.removeEventListener("mousemove",ee,!1),n.domElement.ownerDocument.removeEventListener("mouseup",te,!1),n.domElement.removeEventListener("keydown",ae,!1)};var n=this,o={type:"change"},i={type:"start"},c={type:"end"},r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},s=r.NONE,u=1e-6,d=new a["Fb"],h=new a["Fb"],l=1,m=new a["Qb"],b=!1,p=new a["Pb"],f=new a["Pb"],g=new a["Pb"],v=new a["Pb"],w=new a["Pb"],O=new a["Pb"],E=new a["Pb"],j=new a["Pb"],P=new a["Pb"];function y(){return 2*Math.PI/60/60*n.autoRotateSpeed}function T(){return Math.pow(.95,n.zoomSpeed)}function C(e){h.theta-=e}function L(e){h.phi-=e}var A=function(){var e=new a["Qb"];return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),m.add(e)}}(),N=function(){var e=new a["Qb"];return function(t,a){!0===n.screenSpacePanning?e.setFromMatrixColumn(a,1):(e.setFromMatrixColumn(a,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),m.add(e)}}(),S=function(){var e=new a["Qb"];return function(t,a){var o=n.domElement;if(n.object.isPerspectiveCamera){var i=n.object.position;e.copy(i).sub(n.target);var c=e.length();c*=Math.tan(n.object.fov/2*Math.PI/180),A(2*t*c/o.clientHeight,n.object.matrix),N(2*a*c/o.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(A(t*(n.object.right-n.object.left)/n.object.zoom/o.clientWidth,n.object.matrix),N(a*(n.object.top-n.object.bottom)/n.object.zoom/o.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function k(e){n.object.isPerspectiveCamera?l/=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*e)),n.object.updateProjectionMatrix(),b=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function M(e){n.object.isPerspectiveCamera?l*=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/e)),n.object.updateProjectionMatrix(),b=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function D(e){p.set(e.clientX,e.clientY)}function x(e){E.set(e.clientX,e.clientY)}function R(e){v.set(e.clientX,e.clientY)}function Y(e){f.set(e.clientX,e.clientY),g.subVectors(f,p).multiplyScalar(n.rotateSpeed);var t=n.domElement;C(2*Math.PI*g.x/t.clientHeight),L(2*Math.PI*g.y/t.clientHeight),p.copy(f),n.update()}function I(e){j.set(e.clientX,e.clientY),P.subVectors(j,E),P.y>0?k(T()):P.y<0&&M(T()),E.copy(j),n.update()}function H(e){w.set(e.clientX,e.clientY),O.subVectors(w,v).multiplyScalar(n.panSpeed),S(O.x,O.y),v.copy(w),n.update()}function F(){}function z(e){e.deltaY<0?M(T()):e.deltaY>0&&k(T()),n.update()}function Z(e){var t=!1;switch(e.keyCode){case n.keys.UP:S(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:S(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:S(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:S(-n.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),n.update())}function X(e){if(1==e.touches.length)p.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),n=.5*(e.touches[0].pageY+e.touches[1].pageY);p.set(t,n)}}function _(e){if(1==e.touches.length)v.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),n=.5*(e.touches[0].pageY+e.touches[1].pageY);v.set(t,n)}}function V(e){var t=e.touches[0].pageX-e.touches[1].pageX,n=e.touches[0].pageY-e.touches[1].pageY,a=Math.sqrt(t*t+n*n);E.set(0,a)}function U(e){n.enableZoom&&V(e),n.enablePan&&_(e)}function Q(e){n.enableZoom&&V(e),n.enableRotate&&X(e)}function W(e){if(1==e.touches.length)f.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),a=.5*(e.touches[0].pageY+e.touches[1].pageY);f.set(t,a)}g.subVectors(f,p).multiplyScalar(n.rotateSpeed);var o=n.domElement;C(2*Math.PI*g.x/o.clientHeight),L(2*Math.PI*g.y/o.clientHeight),p.copy(f)}function G(e){if(1==e.touches.length)w.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),a=.5*(e.touches[0].pageY+e.touches[1].pageY);w.set(t,a)}O.subVectors(w,v).multiplyScalar(n.panSpeed),S(O.x,O.y),v.copy(w)}function B(e){var t=e.touches[0].pageX-e.touches[1].pageX,a=e.touches[0].pageY-e.touches[1].pageY,o=Math.sqrt(t*t+a*a);j.set(0,o),P.set(0,Math.pow(j.y/E.y,n.zoomSpeed)),k(P.y),E.copy(j)}function K(e){n.enableZoom&&B(e),n.enablePan&&G(e)}function q(e){n.enableZoom&&B(e),n.enableRotate&&W(e)}function J(){}function $(e){if(!1!==n.enabled){var t;switch(e.preventDefault(),n.domElement.focus?n.domElement.focus():window.focus(),e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case a["V"].DOLLY:if(!1===n.enableZoom)return;x(e),s=r.DOLLY;break;case a["V"].ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;R(e),s=r.PAN}else{if(!1===n.enableRotate)return;D(e),s=r.ROTATE}break;case a["V"].PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;D(e),s=r.ROTATE}else{if(!1===n.enablePan)return;R(e),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&(n.domElement.ownerDocument.addEventListener("mousemove",ee,!1),n.domElement.ownerDocument.addEventListener("mouseup",te,!1),n.dispatchEvent(i))}}function ee(e){if(!1!==n.enabled)switch(e.preventDefault(),s){case r.ROTATE:if(!1===n.enableRotate)return;Y(e);break;case r.DOLLY:if(!1===n.enableZoom)return;I(e);break;case r.PAN:if(!1===n.enablePan)return;H(e);break}}function te(e){!1!==n.enabled&&(F(e),n.domElement.ownerDocument.removeEventListener("mousemove",ee,!1),n.domElement.ownerDocument.removeEventListener("mouseup",te,!1),n.dispatchEvent(c),s=r.NONE)}function ne(e){!1===n.enabled||!1===n.enableZoom||s!==r.NONE&&s!==r.ROTATE||(e.preventDefault(),e.stopPropagation(),n.dispatchEvent(i),z(e),n.dispatchEvent(c))}function ae(e){!1!==n.enabled&&!1!==n.enableKeys&&!1!==n.enablePan&&Z(e)}function oe(e){if(!1!==n.enabled){switch(e.preventDefault(),e.touches.length){case 1:switch(n.touches.ONE){case a["Ib"].ROTATE:if(!1===n.enableRotate)return;X(e),s=r.TOUCH_ROTATE;break;case a["Ib"].PAN:if(!1===n.enablePan)return;_(e),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(n.touches.TWO){case a["Ib"].DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;U(e),s=r.TOUCH_DOLLY_PAN;break;case a["Ib"].DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;Q(e),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(i)}}function ie(e){if(!1!==n.enabled)switch(e.preventDefault(),e.stopPropagation(),s){case r.TOUCH_ROTATE:if(!1===n.enableRotate)return;W(e),n.update();break;case r.TOUCH_PAN:if(!1===n.enablePan)return;G(e),n.update();break;case r.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;K(e),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;q(e),n.update();break;default:s=r.NONE}}function ce(e){!1!==n.enabled&&(J(e),n.dispatchEvent(c),s=r.NONE)}function re(e){!1!==n.enabled&&e.preventDefault()}n.domElement.addEventListener("contextmenu",re,!1),n.domElement.addEventListener("mousedown",$,!1),n.domElement.addEventListener("wheel",ne,!1),n.domElement.addEventListener("touchstart",oe,!1),n.domElement.addEventListener("touchend",ce,!1),n.domElement.addEventListener("touchmove",ie,!1),n.domElement.addEventListener("keydown",ae,!1),-1===n.domElement.tabIndex&&(n.domElement.tabIndex=0),this.update()};o.prototype=Object.create(a["v"].prototype),o.prototype.constructor=o;var i=function(e,t){o.call(this,e,t),this.screenSpacePanning=!1,this.mouseButtons.LEFT=a["V"].PAN,this.mouseButtons.RIGHT=a["V"].ROTATE,this.touches.ONE=a["Ib"].PAN,this.touches.TWO=a["Ib"].DOLLY_ROTATE};i.prototype=Object.create(a["v"].prototype),i.prototype.constructor=i},b0c0:function(e,t,n){var a=n("83ab"),o=n("9bf2").f,i=Function.prototype,c=i.toString,r=/^\s*function ([^ (]*)/,s="name";a&&!(s in i)&&o(i,s,{configurable:!0,get:function(){try{return c.call(this).match(r)[1]}catch(e){return""}}})},f445:function(e,t,n){"use strict";n.r(t);n("b0c0");var a=n("5c40"),o=n("a1e9"),i=n("5a89"),c=n("ed08"),r=n("4721"),s=function(e,t,n,a){var o=e.addFolder(n);o.add(t,"x",-10,10,.1).onChange(a),o.add(t,"y",-10,10,.1).onChange(a),o.add(t,"z",-10,10,.1).onChange(a),o.open()};t["default"]=Object(a["i"])({setup:function(){var e=Object(o["i"])(null),t=c["r"].create();return Object(a["n"])((function(){var n=new i["zb"];Object(c["k"])().then((function(e){e.receiveShadow=!0,n.add(e),Object(c["n"])(N)}));var a=4,o=new i["h"](a,a,a),u=new i["bb"]({color:"#8AC"}),d=new i["Z"](o,u);d.position.set(a+1,a/2,0),d.castShadow=!0,d.receiveShadow=!0,n.add(d),t.addColor(new c["b"](u,"color"),"value").name("box.color").onChange((function(){return Object(c["n"])(N)}));var h=30,l=new i["h"](h,h,h),m=new i["bb"]({color:"#CCC",side:i["e"]}),b=new i["Z"](l,m);b.position.set(0,h/2-.1,0),b.receiveShadow=!0,n.add(b);var p=3,f=32,g=16,v=new i["Eb"](p,f,g),w=new i["bb"]({color:"#CA8"}),O=new i["Z"](v,w);O.position.set(-p-1,p+2,0),O.castShadow=!0,O.receiveShadow=!0,n.add(O),t.addColor(new c["b"](w,"color"),"value").name("sphere.color").onChange((function(){return Object(c["n"])(N)}));var E,j,P,y,T=["none","AmbientLight","HemisphereLight","DirectionalLight","SpotLight","PointLight"],C=(t.add({light:"none"},"light",T).listen().onChange((function(e){if(E&&(n.remove(E),E=null),j&&(n.remove(j),j.dispose(),j=null),P&&(n.remove(P),P=null),y&&(t.removeFolder(y),y=null),"none"===e)return Object(c["n"])(N);y=t.addFolder(e),y.open();var a=16777215,o=1;if("DirectionalLight"===e){E=new i["r"](a,o),E.castShadow=!0,E.position.set(0,10,0),E.target.position.set(-4,0,-4),n.add(E.target),P=new i["k"](E.shadow.camera),n.add(P),j=new i["s"](E),n.add(j);var r=function(){E.target.updateMatrixWorld(),j.update(),E.shadow.camera.updateProjectionMatrix(),P.update()};r(),s(y,E.position,"position",(function(){r(),Object(c["n"])(N)})),s(y,E.target.position,"target",(function(){r(),Object(c["n"])(N)})),y.add(E,"castShadow").onChange((function(e){E.castShadow=e,r(),Object(c["n"])(N)}));var u=y.addFolder("Shadow Camera");u.open(),u.add(new c["d"](E.shadow.camera,"left","right"),"value",1,100).name("width").onChange((function(){r(),Object(c["n"])(N)})),u.add(new c["d"](E.shadow.camera,"bottom","top"),"value",1,100).name("height").onChange((function(){r(),Object(c["n"])(N)}));var d=new c["g"](E.shadow.camera,"near","far",.1);u.add(d,"min",.1,50,.1).name("near").onChange((function(){r(),Object(c["n"])(N)})),u.add(d,"max",.1,50,.1).name("far").onChange((function(){r(),Object(c["n"])(N)})),u.add(E.shadow.camera,"zoom",.01,2,.01).onChange((function(){r(),Object(c["n"])(N)}))}else if("SpotLight"===e){var h=0,l=Math.PI/3,m=0,b=1;E=new i["Gb"](a,o,h,l,m,b),E.castShadow=!0,E.position.set(0,10,0),E.target.position.set(-5,0,0),n.add(E.target),P=new i["k"](E.shadow.camera),n.add(P),j=new i["Hb"](E),n.add(j);var p=function(){E.target.updateMatrixWorld(),j.update(),E.shadow.camera.updateProjectionMatrix(),P.update()};p(),s(y,E.position,"position",(function(){p(),Object(c["n"])(N)})),s(y,E.target.position,"target",(function(){p(),Object(c["n"])(N)})),y.add(E,"distance",0,40).onChange((function(){p(),Object(c["n"])(N)})),y.add(new c["c"](E,"angle"),"value",0,90).name("angle").onChange((function(){p(),Object(c["n"])(N)})),y.add(E,"penumbra",0,1,.1).onChange((function(){p(),Object(c["n"])(N)})),y.add(E,"decay",0,4,.1).onChange((function(){p(),Object(c["n"])(N)})),y.add(E,"castShadow").onChange((function(e){p(),Object(c["n"])(N)}));var f=y.addFolder("Shadow Camera");f.open();var g=new c["g"](E.shadow.camera,"near","far",.1);f.add(g,"min",.1,50,.1).name("near").onChange((function(){p(),Object(c["n"])(N)})),f.add(g,"max",.1,50,.1).name("far").onChange((function(){p(),Object(c["n"])(N)}))}else if("PointLight"===e){var v=0,w=1;E=new i["ob"](a,o,v,w),E.castShadow=!0,E.position.set(0,10,0),j=new i["pb"](E,1),n.add(j);var O=function(){};O(),s(y,E.position,"position",(function(){O(),Object(c["n"])(N)})),y.add(E,"distance",0,40).onChange((function(){O(),Object(c["n"])(N)})),y.add(E,"decay",0,4,.1).onChange((function(){O(),Object(c["n"])(N)})),y.add(E,"castShadow").onChange((function(e){E.castShadow=e,O(),Object(c["n"])(N)}));var T=y.addFolder("Shadow Camera");T.open();var C=new c["g"](E.shadow.camera,"near","far",.1);T.add(C,"min",.1,50,.1).name("near").onChange((function(){O(),Object(c["n"])(N)})),T.add(C,"max",.1,50,.1).name("far").onChange((function(){O(),Object(c["n"])(N)}))}else if("HemisphereLight"===e){var L=16777215;E=new i["D"](a,L,o),j=new i["E"](E,5),n.add(j);var A=function(){j.update()};A(),s(y,E.position,"position",(function(){A(),Object(c["n"])(N)})),y.addColor(new c["b"](E,"groundColor"),"value").name("groundColor").onChange((function(){A(),Object(c["n"])(N)}))}else"AmbientLight"===e&&(E=new i["b"](a,o));n.add(E),y.addColor(new c["b"](E,"color"),"value").name("color").onChange((function(){return Object(c["n"])(N)})),y.add(E,"intensity",0,3).onChange((function(){return Object(c["n"])(N)})),Object(c["n"])(N)})),new i["mb"](45,2,5,100));C.position.set(0,10,20);var L=new r["a"](C,e.value);L.target.set(0,5,0),L.enableDamping=!0;var A=new i["Ub"]({canvas:e.value});A.shadowMap.enabled=!0;var N=function(){if(Object(c["o"])(A)){var e=A.domElement;C.aspect=e.clientWidth/e.clientHeight,C.updateProjectionMatrix()}L.update(),A.render(n,C)};Object(c["n"])(N),L.addEventListener("change",(function(){return Object(c["n"])(N)}))})),Object(a["m"])((function(){c["r"].dispose()})),function(){return Object(a["l"])("canvas",{ref:e,class:"canvas"})}}})}}]);
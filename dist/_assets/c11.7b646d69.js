let e=document.createElement("style");e.innerHTML="",document.head.appendChild(e);import{d as t,r as n,P as o,S as s,y as a,D as l,j as r,M as i,a as c,o as d,W as p,b as u,h as y}from"./index.f7c153f6.js";import{a as f}from"./index.22ce2b7e.js";var m=function(e,t){function n(){s.style.display="",s.style.cursor="auto",s.style.left="calc(50% - 75px)",s.style.width="150px",s.onmouseenter=null,s.onmouseleave=null,s.onclick=null,s.textContent="VR NOT SUPPORTED"}function o(e){e.style.position="absolute",e.style.bottom="20px",e.style.padding="12px 6px",e.style.border="1px solid #fff",e.style.borderRadius="4px",e.style.background="rgba(0,0,0,0.1)",e.style.color="#fff",e.style.font="normal 13px sans-serif",e.style.textAlign="center",e.style.opacity="0.5",e.style.outline="none",e.style.zIndex="999"}if(t&&console.error('THREE.VRButton: The "options" parameter has been removed. Please set the reference space type via renderer.xr.setReferenceSpaceType() instead.'),"xr"in navigator){var s=document.createElement("button");return s.id="VRButton",s.style.display="none",o(s),navigator.xr.isSessionSupported("immersive-vr").then((function(t){t?function(){var t=null;function n(n){n.addEventListener("end",o),e.xr.setSession(n),s.textContent="EXIT VR",t=n}function o(){t.removeEventListener("end",o),s.textContent="ENTER VR",t=null}s.style.display="",s.style.cursor="pointer",s.style.left="calc(50% - 50px)",s.style.width="100px",s.textContent="ENTER VR",s.onmouseenter=function(){s.style.opacity="1.0"},s.onmouseleave=function(){s.style.opacity="0.5"},s.onclick=function(){if(null===t){navigator.xr.requestSession("immersive-vr",{optionalFeatures:["local-floor","bounded-floor","hand-tracking"]}).then(n)}else t.end()}}():n()})),s}var a=document.createElement("a");return!1===window.isSecureContext?(a.href=document.location.href.replace(/^http:/,"https:"),a.innerHTML="WEBXR NEEDS HTTPS"):(a.href="https://immersiveweb.dev/",a.innerHTML="WEBXR NOT AVAILABLE"),a.style.left="calc(50% - 90px)",a.style.width="180px",a.style.textDecoration="none",o(a),a},x=t({setup(){const e=n(null);let t,x;const v=new o(75,2,.1,50);v.position.set(0,1.7,0);const h=new s,g=(new a).setPath("/textures/cube/").load(["pos-x.jpg","neg-x.jpg","pos-y.jpg","neg-y.jpg","pos-z.jpg","neg-z.jpg"]);h.background=g;const E=new l;E.position.set(-1,2,4),h.add(E);const b=new r(.3,32,16),w=new i({envMap:g}),R=new c(b,w);R.position.set(0,1.6,-2),h.add(R);const T=()=>{if(f(x)){const e=x.domElement;v.aspect=e.clientWidth/e.clientHeight,v.updateProjectionMatrix()}x.render(h,v)};return d(()=>{x=new p({canvas:e.value}),x.xr.enabled=!0,t=m(x),document.body.appendChild(t),x.setAnimationLoop(T)}),u(()=>{x&&x.setAnimationLoop(null),t&&document.body.removeChild(t)}),()=>y("canvas",{ref:e,class:"canvas"})}});export default x;
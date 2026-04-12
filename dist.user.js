// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      1.0.8
// @description  Macro para automatizar pintado en https://wplace.live
// @author       robergallardof + contributors
// @license      MPL-2.0
// @homepageURL  https://github.com/robgallardof/kglacer-macro
// @updateURL    https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/dist.user.js
// @downloadURL  https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/dist.user.js
// @run-at       document-start
// @match        *://*.wplace.live/*
// @grant        none
// ==/UserScript==

// Wplace  --> https://wplace.live
// License --> https://www.mozilla.org/en-US/MPL/2.0/
function t(o,f,l){let p=o[l];return o[l]=o[f],o[f]=p,o}function e(o,f){let l=o.indexOf(f);if(l!==-1)o.splice(l,1);return l}var x0=Math.floor(Math.random()*65536),y0=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function F(o){return new Promise((f)=>setTimeout(f,o))}function X(o,f,l=["error"],p="addEventListener"){return new Promise((w,z)=>{for(let c=0;c<f.length;c++)o[p]?.(f[c],w);for(let c=0;c<l.length;c++)o[p]?.(l[c],z)})}class V0{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,f=15000){this.size=o,this.historyTime=f}push(o){if(o<0)throw new Error("Negative chunk size");let{time:f,historyTime:l}=this.getTime();if(this.history.push({time:f,chunk:o}),this.history[0]&&this.history[0].time+l<f)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((f,l)=>f+l.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),f=o-this.startTime,l=Math.min(f,this.historyTime);return{time:o,historyTime:l}}}class h{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,f){for(let l in f)this[l]=o.querySelector(f[l])}registerEvent(o,f,l,p={}){p.passive??=!0,o.addEventListener(f,l,p),this.runOnDestroy.push(()=>{o.removeEventListener(f,l)})}}function o0(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function H0(o,f,l){let p=o0(o/255),w=o0(f/255),z=o0(l/255),c=Math.cbrt(0.4122214708*p+0.5363325363*w+0.0514459929*z),M=Math.cbrt(0.2119034982*p+0.6806995451*w+0.1073969566*z),A=Math.cbrt(0.0883024619*p+0.2817188376*w+0.6299787005*z),g=0.2104542553*c+0.793617785*M-0.0040720468*A,H=1.9779984951*c-2.428592205*M+0.4505937099*A,b=0.0259040371*c+0.7827717662*M-0.808675766*A;return[g,H,b]}function b0(o,f,l){let[p,w,z]=o,[c,M,A]=f,g=(i)=>i*180/Math.PI,H=(i)=>i*Math.PI/180,b=1,G=1,N=1,J=Math.sqrt(w**2+z**2),Q=Math.sqrt(M**2+A**2),S=(J+Q)/2,j=0.5*(1-Math.sqrt(S**7/(S**7+6103515625))),U=w*(1+j),B=M*(1+j),O=Math.sqrt(U**2+z**2),V=Math.sqrt(B**2+A**2),s=z===0&&U===0?0:g(Math.atan2(z,U))%360,W=A===0&&B===0?0:g(Math.atan2(A,B))%360,I=c-p,z0=V-O,T=0;if(O*V!==0){if(T=W-s,T>180)T-=360;else if(T<-180)T+=360}let c0=2*Math.sqrt(O*V)*Math.sin(H(T)/2),M0=(p+c)/2,x=(O+V)/2,a=(s+W)/2;if(Math.abs(s-W)>180)a+=180;let j0=1-0.17*Math.cos(H(a-30))+0.24*Math.cos(H(2*a))+0.32*Math.cos(H(3*a+6))-0.2*Math.cos(H(4*a-63)),F0=1+0.015*(M0-50)**2/Math.sqrt(20+(M0-50)**2),A0=1+0.045*x,g0=1+0.015*x*j0,P0=30*Math.exp((-((a-275)/25))**2),W0=-(2*Math.sqrt(x**7/(x**7+6103515625)))*Math.sin(H(2*P0));return Math.sqrt((I/(1*F0))**2+(z0/(1*A0))**2+(c0/(1*g0))**2+W0*(z0/(1*A0))*(c0/(1*g0)))-I*l}var E=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],R=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function r(o){if(o===0)return"transparent";let f=E[o];return`oklab(${f[0]*100}% ${f[1]} ${f[2]})`}var J0=["kglacermacro:locale"],f0={en:{widgetTitle:"KGlacerMacro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",random:"Random",humanized:"Humanized",humanSoftDither:"Human soft dither",humanPatchy:"Human patchy",humanSweepArcs:"Human sweep arcs",humanMicroCorrections:"Human micro corrections",humanJitterFill:"Human jitter fill",humanCornerBias:"Human corner bias",humanLongStrokes:"Human long strokes",humanTapClusters:"Human tap clusters",humanMessySpiral:"Human messy spiral",humanDrunkWalk:"Human drunk walk",humanNoiseCloud:"Human noise cloud",humanPatchJump:"Human patch jump",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutsHelp:"Shift+B toggle widget · Shift+M hide/show panel · Shift+S show panel · Shift+H hide panel · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the color strip to change drawing priority.",colorPanelOrderHint:"Color #1 is painted first.",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",random:"Aleatorio",humanized:"Humanizado",humanSoftDither:"Difuminado humano suave",humanPatchy:"Parches humanos",humanSweepArcs:"Barridos humanos en arco",humanMicroCorrections:"Micro correcciones humanas",humanJitterFill:"Relleno humano con jitter",humanCornerBias:"Sesgo humano por esquina",humanLongStrokes:"Trazos humanos largos",humanTapClusters:"Toques humanos por grupos",humanMessySpiral:"Espiral humana irregular",humanDrunkWalk:"Caminata humana errática",humanNoiseCloud:"Nube humana de ruido",humanPatchJump:"Saltos humanos por parches",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutsHelp:"Shift+B mostrar widget · Shift+M ocultar/mostrar panel · Shift+S mostrar panel · Shift+H ocultar panel · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra de colores para cambiar la prioridad de pintado.",colorPanelOrderHint:"El color #1 se pinta primero.",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays"}};function X0(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function l0(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in f0)return o;for(let f=0;f<J0.length;f++){let l=localStorage.getItem(J0[f]);if(!l||!(l in f0))continue;return localStorage.setItem("kglacer-macro:locale",l),l}return X0()}function G0(o){localStorage.setItem("kglacer-macro:locale",o)}function K(o){let f=l0();return f0[f][o]}function $(o){for(let f of o.querySelectorAll("[data-i18n]"))f.textContent=K(f.dataset.i18n);for(let f of o.querySelectorAll("[data-i18n-title]"))f.setAttribute("title",K(f.dataset.i18nTitle));for(let f of o.querySelectorAll("[data-i18n-aria-label]"))f.setAttribute("aria-label",K(f.dataset.i18nAriaLabel));for(let f of o.querySelectorAll("[data-i18n-placeholder]"))f.setAttribute("placeholder",K(f.dataset.i18nPlaceholder))}var K0=`<div class="wtopbar">
  <button
    class="open-colors"
    type="button"
    data-i18n-title="openColorPanel"
    data-i18n-aria-label="openColorPanel"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 1 0 0 16h1a3 3 0 0 0 0-6h-1a2 2 0 0 1 0-4h5a3 3 0 0 0 3-3 9 9 0 0 0-8-3Z"/><path d="M7.5 10.5h.01M10 7.5h.01M14 7.5h.01M16.5 10.5h.01"/></svg>
  </button>
  <button class="export" data-i18n-title="exportImage" data-i18n-aria-label="exportImage">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 15v3h14v-3"/></svg>
  </button>
  <button class="lock" data-i18n-title="lockImage" data-i18n-aria-label="lockImage">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path class="icon-unlocked" d="M7 10V7a5 5 0 0 1 10 0"/>
      <path d="M6 10h12v10H6z"/>
    </svg>
  </button>
  <button class="delete" data-i18n-title="deleteImage" data-i18n-aria-label="deleteImage">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V5h6v2m-7 3v7m4-7v7m4-7v7M7 7l1 12h8l1-12"/></svg>
  </button>
</div>
<div class="wrapper">
  <div class="wform">
    <div class="wprogress">
      <div></div>
      <span></span>
    </div>
    <div class="colors"></div>
    <label><span data-i18n="opacity">Opacity</span>:&nbsp;<input class="opacity" type="range" min="0" max="100"/></label>
    <label><span data-i18n="brightness">Brightness</span>:&nbsp;<input class="brightness" type="number" step="0.1"/></label>
    <label>
      <span data-i18n="strategy">Strategy</span>:&nbsp;<select class="strategy">
        <option value="RANDOM" selected data-i18n="random">Random</option>
        <option value="HUMANIZED" data-i18n="humanized">Humanized</option>
        <option value="HUMAN_SOFT_DITHER" data-i18n="humanSoftDither">Human soft dither</option>
        <option value="HUMAN_PATCHY" data-i18n="humanPatchy">Human patchy</option>
        <option value="HUMAN_SWEEP_ARCS" data-i18n="humanSweepArcs">Human sweep arcs</option>
        <option value="HUMAN_MICRO_CORRECTIONS" data-i18n="humanMicroCorrections">Human micro corrections</option>
        <option value="HUMAN_JITTER_FILL" data-i18n="humanJitterFill">Human jitter fill</option>
        <option value="HUMAN_CORNER_BIAS" data-i18n="humanCornerBias">Human corner bias</option>
        <option value="HUMAN_LONG_STROKES" data-i18n="humanLongStrokes">Human long strokes</option>
        <option value="HUMAN_TAP_CLUSTERS" data-i18n="humanTapClusters">Human tap clusters</option>
        <option value="HUMAN_MESSY_SPIRAL" data-i18n="humanMessySpiral">Human messy spiral</option>
        <option value="HUMAN_DRUNK_WALK" data-i18n="humanDrunkWalk">Human drunk walk</option>
        <option value="HUMAN_NOISE_CLOUD" data-i18n="humanNoiseCloud">Human noise cloud</option>
        <option value="HUMAN_PATCH_JUMP" data-i18n="humanPatchJump">Human patch jump</option>
        <option value="ZIGZAG" data-i18n="zigzag">Zigzag</option>
        <option value="BRUSH_STROKES" data-i18n="brushStrokes">Brush strokes</option>
        <option value="DIAGONAL_BRUSH" data-i18n="diagonalBrush">Diagonal brush</option>
        <option value="SCRIBBLE" data-i18n="scribble">Scribble</option>
        <option value="CROSSHATCH" data-i18n="crosshatch">Crosshatch</option>
        <option value="WAVE_SWEEP" data-i18n="waveSweep">Wave sweep</option>
        <option value="SCATTERED_LINES" data-i18n="scatteredLines">Scattered lines</option>
        <option value="CONTOUR_JITTER" data-i18n="contourJitter">Contour jitter</option>
        <option value="SPIRAL_WOBBLE" data-i18n="spiralWobble">Spiral wobble</option>
        <option value="CLUSTER_BURSTS" data-i18n="clusterBursts">Cluster bursts</option>
        <option value="ORBITAL" data-i18n="orbital">Orbital</option>
        <option value="FLOW_FIELD" data-i18n="flowField">Flow field</option>
        <option value="EDGE_IN" data-i18n="edgeIn">Edge in</option>
        <option value="DOWN" data-i18n="down">Down</option>
        <option value="UP" data-i18n="up">Up</option>
        <option value="LEFT" data-i18n="left">Left</option>
        <option value="RIGHT" data-i18n="right">Right</option>
        <option value="SPIRAL_FROM_CENTER" data-i18n="spiralOut">Spiral out</option>
        <option value="SPIRAL_TO_CENTER" data-i18n="spiralIn">Spiral in</option>
      </select>
    </label>
    <button class="reset-size"><span data-i18n="resetSize">Reset size</span> [<span></span>px]</button>
    <label>
      <input type="checkbox" class="draw-transparent" />&nbsp;<span data-i18n="eraseTransparent">Erase transparent pixels</span>
    </label>
    <label>
      <input type="checkbox" class="draw-colors-in-order" />&nbsp;<span data-i18n="drawColorsInOrder">Draw colors in order</span>
    </label>
  </div>
  <dialog class="colors-dialog">
    <div class="colors-dialog-head">
      <strong data-i18n="overlayColors">Overlay colors</strong>
      <button class="close-colors" type="button" data-i18n="close">Close</button>
    </div>
    <p class="colors-dialog-help" data-i18n="colorPanelHelp">
      Toggle each color to enable/disable it. Drag colors in the strip to reorder paint priority.
    </p>
    <p class="colors-dialog-help order" data-i18n="colorPanelOrderHint">
      Color #1 paints first.
    </p>
    <input class="color-search" type="search" data-i18n-placeholder="searchColors" placeholder="Search color by hex, English or Spanish"/>
    <div class="colors-dialog-list"></div>
  </dialog>
  <div class="resize n"></div>
  <div class="resize e"></div>
  <div class="resize s"></div>
  <div class="resize w"></div>
</div>
`;class L{bot;image;width;brightness;exactColor;static async fromJSON(o,f){let l=new Image;return l.src=f.url.startsWith("http")?await fetch(f.url,{cache:"no-store"}).then((p)=>p.blob()).then((p)=>URL.createObjectURL(p)):f.url,await X(l,["load"],["error"]),new L(o,l,f.width,f.brightness,f.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,f,l=f.naturalWidth,p=0,w=!1){this.bot=o;this.image=f;this.width=l;this.brightness=p;this.exactColor=w;if(w)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let l=1;l<64;l++)if(this.exactColor||!this.bot.unavailableColors.has(l))o.set(R[l],[l,l]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let f=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let l=0;l<this.canvas.height;l++)for(let p=0;p<this.canvas.width;p++){let w=(l*this.canvas.width+p)*4,z=f[w],c=f[w+1],M=f[w+2],A=f[w+3],g=`${z},${c},${M}`;if(this.exactColor){this.pixels[l][p]=A<100?0:R.indexOf(g);continue}let H,b;if(A<100)H=b=0;else if(o.has(g))[H,b]=o.get(g);else{let N=1/0,J=1/0;for(let Q=0;Q<E.length;Q++){let S=E[Q],j=b0(H0(z,c,M),S,this.brightness);if(!this.bot.unavailableColors.has(Q)&&j<N)N=j,H=Q;if(j<J)J=j,b=Q}o.set(g,[H,b])}if(H!==0)this.context.fillStyle=`oklab(${E[H][0]*100}% ${E[H][1]} ${E[H][2]})`,this.context.fillRect(p,l,1,1);this.pixels[l][p]=H;let G=this.colors.get(b);if(G)G.amount++;else this.colors.set(b,{color:H,amount:1,realColor:b})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor}}}var k="kglacer-macro-settings",Q0=["kglacermacro","wbot"],d="kgm";function R0(){let o=[k,...Q0];for(let f=0;f<o.length;f++){let l=o[f],p=localStorage.getItem(l);if(!p)continue;return{json:p,key:l}}return}function U0(){let o=R0();if(!o)return;let f;try{if(f=JSON.parse(o.json),typeof f!=="object")throw new Error("NOT VALID SAVE");if(f.version===1){let l=f;f.images=l.widget.images,f.strategy=l.widget.strategy,delete l.widget}if(o.key!==k)localStorage.setItem(k,o.json)}catch{localStorage.removeItem(o.key),f=void 0}return f}var u0;function u(o,f=!1){if(clearTimeout(u0),f)localStorage.setItem(k,JSON.stringify(o));else u0=setTimeout(()=>{localStorage.setItem(k,JSON.stringify(o))},600)}var Z=1000,_0=2048,m=Z*_0,P=[],v=[],C0=Date.now();function n(o){P.push(o),v.push({id:C0++,latitude:(2*Math.atan(Math.exp(-(o.y/m*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/m*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}n({x:m/3|0,y:m/3|0});n({x:m/3*2|0,y:m/3*2|0});function _(o){let[f,l]=o.style.transform.slice(32,-31).split(", ").map((p)=>Number.parseFloat(p));return{x:f,y:l}}class q{bot;static fromJSON(o,f){return new q(o,...f)}static fromScreenPosition(o,f){let{anchorScreenPosition:l,pixelSize:p,anchorWorldPosition:w}=o.findAnchorsForScreen(f);return new q(o,w.x+(f.x-l.x)/p|0,w.y+(f.y-l.y)/p|0)}globalX=0;globalY=0;get tileX(){return this.globalX/Z|0}set tileX(o){this.globalX=o*Z+this.x}get tileY(){return this.globalY/Z|0}set tileY(o){this.globalY=o*Z+this.y}get x(){return this.globalX%Z}set x(o){this.globalX=this.tileX*Z+o}get y(){return this.globalY%Z}set y(o){this.globalY=this.tileY*Z+o}anchor1Index;anchor2Index;get pixelSize(){return(_(this.bot.$stars[this.anchor2Index]).x-_(this.bot.$stars[this.anchor1Index]).x)/(P[this.anchor2Index].x-P[this.anchor1Index].x)}constructor(o,f,l,p,w){this.bot=o;if(p===void 0||w===void 0)this.globalX=f,this.globalY=l;else this.globalX=f*Z+p,this.globalY=l*Z+w;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,f=1/0;for(let l=0;l<P.length;l++){let{x:p,y:w}=P[l];if(p<this.globalX&&w<this.globalY){let z=this.globalX-p+(this.globalY-w);if(z<o)o=z,this.anchor1Index=l}else if(p>this.globalX&&w>this.globalY){let z=p-this.globalX+(w-this.globalY);if(z<f)f=z,this.anchor2Index=l}}}toScreenPosition(){let o=P[this.anchor1Index],f=_(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+f.x,y:(this.globalY-o.y)*this.pixelSize+f.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:f}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:f-window.innerHeight/3})}clone(){return new q(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class C extends h{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(o,f){return new C(o,q.fromJSON(o,f.position),await L.fromJSON(o,f.pixels),f.strategy,f.opacity,f.drawTransparentPixels,f.drawColorsInOrder,f.colors,f.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colors;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$closeColors;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;constructor(o,f,l,p="SPIRAL_FROM_CENTER",w=50,z=!1,c=!1,M=[],A=!1){super();this.bot=o;this.position=f;this.pixels=l;this.strategy=p;this.opacity=w;this.drawTransparentPixels=z;this.drawColorsInOrder=c;this.colors=M;this.lock=A;this.element.innerHTML=K0,this.element.classList.add("wimage"),$(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colors:".colors",$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$closeColors:".close-colors",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,u(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),u(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let g;this.registerEvent(this.$brightness,"change",()=>{clearTimeout(g),g=setTimeout(()=>{this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),u(this.bot)},1000)}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),u(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,u(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,u(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),u(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.$colorsDialog.close()}),this.registerEvent(this.$colorsDialog,"click",(H)=>{if(H.target===this.$colorsDialog)this.$colorsDialog.close()}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let H of this.element.querySelectorAll(".resize"))this.registerEvent(H,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),f=new Set,l=new Map;for(let p=0;p<this.colors.length;p++){let w=this.colors[p];if(w.disabled)f.add(w.realColor);l.set(w.realColor,p)}for(let{x:p,y:w}of this.strategyPositionIterator()){let z=this.pixels.pixels[w][p];if(f.has(z))continue;o.globalX=this.position.globalX+p,o.globalY=this.position.globalY+w;let c=o.getMapColor();if(z!==c&&(this.drawTransparentPixels||z!==0))this.tasks.push({position:o.clone(),color:z})}if(this.drawColorsInOrder)this.tasks.sort((p,w)=>(l.get(p.color)??0)-(l.get(w.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:f}=this.position.toScreenPosition(),l=Math.round(this.position.pixelSize*this.pixels.width),p=Math.round(this.position.pixelSize*this.pixels.height);this.element.style.transform=`translate3d(${Math.round(o)}px, ${Math.round(f)}px, 0)`,this.element.style.width=`${l}px`,this.element.style.height=`${p}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let w=this.pixels.pixels.length*this.pixels.pixels[0].length,z=w-this.tasks.length,c=z/w*100|0;this.$progressText.textContent=`${z}/${w} ${c}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${c}%)`,this.$wrapper.classList[this.lock?"add":"remove"]("no-pointer-events"),this.$lock.classList[this.lock?"add":"remove"]("locked")}destroy(){super.destroy(),this.element.remove(),e(this.bot.images,this),this.bot.widget.update(),u(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}let f=Math.min(560,window.innerWidth-16),l=Math.min(680,window.innerHeight-16),p=Math.max(8,(window.innerWidth-f)/2),w=Math.max(8,(window.innerHeight-l)/2);this.$colorsDialog.style.margin="0",this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left=`${Math.round(p)}px`,this.$colorsDialog.style.top=`${Math.round(w)}px`,this.$colorsDialog.show()}applyLocale(){$(this.element),this.updateColors()}colorHex(o){let f=R[o]??"0,0,0",[l=0,p=0,w=0]=f.split(",").map((z)=>Number.parseInt(z,10));return`#${[l,p,w].map((z)=>z.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let f=R[o]??"0,0,0",[l=0,p=0,w=0]=f.split(",").map((A)=>Number.parseInt(A,10)),z=Math.max(l,p,w),c=Math.min(l,p,w);if(z-c<15)return["gray","grey","gris","neutral","neutro"];if(l>p+30&&l>w+30)return["red","rojo"];if(p>l+30&&p>w+30)return["green","verde"];if(w>l+30&&w>p+30)return["blue","azul"];if(l>170&&p>120&&w<130)return["orange","naranja"];if(l>170&&p>110&&w>140)return["pink","rosa"];if(l>120&&p<100&&w>120)return["purple","violet","morado"];if(l>130&&p>130&&w<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colors.innerHTML="",this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length,f=100/this.pixels.colors.size,l=document.createElement("div");l.className="colors-track",l.setAttribute("aria-label",K("overlayColors")),this.$colorsDialogList.setAttribute("aria-label",K("colorPanelResults"));let p=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((z)=>!this.pixels.colors.has(z.realColor)))this.colors=this.pixels.colors.values().toArray().sort((z,c)=>c.amount-z.amount).map((z)=>({realColor:z.realColor,disabled:!1})),u(this.bot);let w=0;for(let z=0;z<this.colors.length;z++){let c=this.colors[z],M=this.pixels.colors.get(c.realColor),A=!1,g=M.realColor!==M.color,H=M.amount/o*100,b=this.colorHex(M.realColor),G=this.colorKeywords(M.realColor),N=()=>{if(A)return;c.disabled=c.disabled?void 0:!0,J.classList.toggle("color-disabled"),Q.classList.toggle("disabled",Boolean(c.disabled));let U=Q.querySelector(".state");if(U)U.textContent=c.disabled?K("disabled"):K("enabled");u(this.bot)},J=document.createElement("button");if(J.setAttribute("aria-label",`${K("overlayColors")} #${z+1}: ${b.toUpperCase()}`),J.title=`${H.toFixed(1)}%`,J.innerHTML=`<span class="order-index">#${z+1}</span>`,c.disabled)J.classList.add("color-disabled");if(!g)J.style.background=r(M.realColor);else{J.classList.add("substitution"),J.style.setProperty("--wreal-color",r(M.realColor)),J.style.setProperty("--wsubstitution-color",r(M.color));let U=document.createElement("button"),B=document.createElement("button");U.textContent=K("buy"),B.textContent="✓",U.classList.add("buy"),B.classList.add("disable"),U.addEventListener("click",()=>{document.getElementById("color-"+M.realColor)?.click()}),B.addEventListener("click",N),J.append(U),J.append(B)}J.style.left=w+"%",J.style.width=H+"%",w+=H,J.style.setProperty("--wleft",f*z+"%"),J.style.setProperty("--wwidth",f+"%"),l.append(J);let Q=document.createElement("button");if(Q.className=`color-chip ${c.disabled?"disabled":""}`,Q.innerHTML=`<span class="order-index">#${z+1}</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${H.toFixed(1)}% · ${b.toUpperCase()}</span>
  <span class="state">${c.disabled?K("disabled"):K("enabled")}</span>
</span>
<span class="premium ${g?"on":""}">${g?K("premium"):""}</span>`,Q.querySelector(".swatch").style.setProperty("--swatch-color",r(M.realColor)),Q.addEventListener("click",()=>{N()}),g){let U=document.createElement("button");U.textContent=K("buy"),U.className="buy-chip",U.addEventListener("click",(B)=>{B.stopPropagation(),document.getElementById("color-"+M.realColor)?.click()}),Q.append(U)}let S=`${b} ${G.join(" ")} ${M.realColor} ${R[M.realColor]}`;if(!p||S.toLowerCase().includes(p))this.$colorsDialogList.append(Q);let j=(U)=>{let B=z,O=J.getBoundingClientRect().width,V=(s)=>{if(B=Math.min(this.colors.length-1,Math.max(0,Math.round(z+(s.clientX-U.clientX)/O))),B!==z)A=!0;let W=0;for(let I of l.children){if(I===J)continue;if(W===B)W++;I.style.setProperty("--wleft",f*W+"%"),W++}J.style.setProperty("--wleft",f*B+"%")};document.addEventListener("mousemove",V),document.addEventListener("mouseup",()=>{if(document.removeEventListener("mousemove",V),B!==z)this.colors.splice(B,0,...this.colors.splice(z,1));u(this.bot),J.removeEventListener("mousedown",j),setTimeout(()=>{this.updateColors()},200)},{once:!0})};if(J.addEventListener("mousedown",j),!g)J.addEventListener("click",N)}this.$colors.append(l)}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,f=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let l=0;l<f;l++)for(let p=0;p<o;p++)yield{x:p,y:l};break}case"UP":{for(let l=f-1;l>=0;l--)for(let p=0;p<o;p++)yield{x:p,y:l};break}case"LEFT":{for(let l=0;l<o;l++)for(let p=0;p<f;p++)yield{x:l,y:p};break}case"RIGHT":{for(let l=o-1;l>=0;l--)for(let p=0;p<f;p++)yield{x:l,y:p};break}case"RANDOM":{let l=[];for(let p=0;p<f;p++)for(let w=0;w<o;w++)l.push({x:w,y:p});for(let p=l.length-1;p>=0;p--){let w=Math.floor(Math.random()*(p+1)),z=l[p];l[p]=l[w],l[w]=z}yield*l;break}case"ZIGZAG":{for(let l=0;l<f;l++)if(l%2===0)for(let p=0;p<o;p++)yield{x:p,y:l};else for(let p=o-1;p>=0;p--)yield{x:p,y:l};break}case"HUMANIZED":{let l=Math.max(4,Math.floor(Math.min(o,f)/10)),p=[];for(let w=0;w<f;w+=l)for(let z=0;z<o;z+=l)p.push({x:z,y:w});for(let w=p.length-1;w>=0;w--){let z=Math.floor(Math.random()*(w+1)),c=p[w];p[w]=p[z],p[z]=c}for(let w=0;w<p.length;w++){let z=p[w],c=Math.min(f,z.y+l),M=Math.min(o,z.x+l);for(let A=z.y;A<c;A++)if(Math.random()>0.35)for(let H=z.x;H<M;H++)yield{x:H,y:A};else for(let H=M-1;H>=z.x;H--)yield{x:H,y:A}}break}case"HUMAN_SOFT_DITHER":{let l=new Set;for(let p=0;p<f;p++){let w=Math.floor(Math.random()*3)-1;if((p+w)%2===0)for(let c=0;c<o;c+=2)l.add(`${c},${p}`),yield{x:c,y:p};else for(let c=1;c<o;c+=2)l.add(`${c},${p}`),yield{x:c,y:p}}for(let p=0;p<f;p++)for(let w=0;w<o;w++){let z=`${w},${p}`;if(l.has(z))continue;yield{x:w,y:p}}break}case"HUMAN_PATCHY":{let l=new Set,p=o*f;while(l.size<p){let w=Math.floor(Math.random()*o),z=Math.floor(Math.random()*f),c=1+Math.floor(Math.random()*5);for(let M=z-c;M<=z+c;M++)for(let A=w-c;A<=w+c;A++){if(A<0||A>=o||M<0||M>=f)continue;if(Math.hypot(A-w,M-z)>c+Math.random()*1.2)continue;let g=`${A},${M}`;if(l.has(g))continue;l.add(g),yield{x:A,y:M}}}break}case"HUMAN_SWEEP_ARCS":{let l=new Set,p=(o-1)/2,w=(f-1)/2,z=Math.hypot(p,w);for(let c=0;c<4;c++){let M=Math.random()*Math.PI*2;for(let A=0;A<=z;A+=0.35){let g=Math.PI/2+Math.random()*(Math.PI/1.5),H=Math.max(10,Math.floor(A*8));for(let b=0;b<H;b++){let G=M+g*b/H+Math.sin(A)*0.08,N=Math.round(p+Math.cos(G)*A),J=Math.round(w+Math.sin(G)*A);if(N<0||N>=o||J<0||J>=f)continue;let Q=`${N},${J}`;if(l.has(Q))continue;l.add(Q),yield{x:N,y:J}}}}for(let c=0;c<f;c++)for(let M=0;M<o;M++){let A=`${M},${c}`;if(l.has(A))continue;yield{x:M,y:c}}break}case"HUMAN_MICRO_CORRECTIONS":{let l=new Set;for(let p=0;p<f;p++){let w=p%2===0?1:-1,z=w>0?0:o-1;for(let c=0;c<o;c++){let M=z+(Math.random()>0.82?w:0),A=p+(Math.random()>0.9?1:0);for(let g of[{x:z,y:p},{x:M,y:p},{x:z,y:A}]){if(g.x<0||g.x>=o||g.y<0||g.y>=f)continue;let H=`${g.x},${g.y}`;if(l.has(H))continue;l.add(H),yield g}z+=w}}for(let p=0;p<f;p++)for(let w=0;w<o;w++){let z=`${w},${p}`;if(l.has(z))continue;yield{x:w,y:p}}break}case"HUMAN_JITTER_FILL":{let l=[];for(let p=0;p<f;p++)for(let w=0;w<o;w++)l.push({x:w,y:p});l.sort((p,w)=>{let z=p.y+(Math.random()-0.5)*1.8,c=w.y+(Math.random()-0.5)*1.8;if(z!==c)return z-c;return p.x+(Math.random()-0.5)*2-(w.x+(Math.random()-0.5)*2)}),yield*l;break}case"HUMAN_CORNER_BIAS":{let l=[{x:0,y:0},{x:o-1,y:0},{x:0,y:f-1},{x:o-1,y:f-1}],p=l[Math.floor(Math.random()*l.length)],w=[];for(let z=0;z<f;z++)for(let c=0;c<o;c++){let A=Math.hypot(c-p.x,z-p.y)+Math.random()*3.5;w.push({point:{x:c,y:z},score:A})}w.sort((z,c)=>z.score-c.score);for(let z of w)yield z.point;break}case"HUMAN_LONG_STROKES":{let l=new Set,p=o*f;while(l.size<p){let w=Math.floor(Math.random()*o),z=Math.floor(Math.random()*f),c=Math.random()*Math.PI*2,M=Math.sign(Math.cos(c)),A=Math.sign(Math.sin(c)),g=10+Math.floor(Math.random()*40);for(let H=0;H<g;H++){if(w<0||w>=o||z<0||z>=f)break;let b=`${w},${z}`;if(!l.has(b))l.add(b),yield{x:w,y:z};if(Math.random()>0.78)w+=A,z+=M;else w+=M,z+=A}}break}case"HUMAN_TAP_CLUSTERS":{let l=new Set,p=o*f;while(l.size<p){let w=Math.floor(Math.random()*o),z=Math.floor(Math.random()*f),c=3+Math.floor(Math.random()*10);for(let M=0;M<c;M++){let A=Math.round(w+(Math.random()-0.5)*6),g=Math.round(z+(Math.random()-0.5)*6);if(A<0||A>=o||g<0||g>=f)continue;let H=`${A},${g}`;if(l.has(H))continue;l.add(H),yield{x:A,y:g}}}break}case"HUMAN_MESSY_SPIRAL":{let l=new Set,p=(o-1)/2,w=(f-1)/2,z=Math.hypot(p,w)+2;for(let c=0;l.size<o*f;c++){let M=c/3,A=Math.min(z,M*0.18),g=M*0.29+Math.sin(M*0.13)*0.8,H=Math.round(p+Math.cos(g)*A+Math.sin(M)*0.7),b=Math.round(w+Math.sin(g)*A+Math.cos(M)*0.7);if(H<0||H>=o||b<0||b>=f){if(c>o*f*18)break;continue}let G=`${H},${b}`;if(l.has(G)){if(Math.random()>0.9)continue}else l.add(G),yield{x:H,y:b};if(c>o*f*18)break}for(let c=0;c<f;c++)for(let M=0;M<o;M++){let A=`${M},${c}`;if(l.has(A))continue;yield{x:M,y:c}}break}case"HUMAN_DRUNK_WALK":{let l=new Set,p=Math.floor(Math.random()*o),w=Math.floor(Math.random()*f),z=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(l.size<o*f){let c=`${p},${w}`;if(!l.has(c))l.add(c),yield{x:p,y:w};let M=[];for(let H of z){let b=p+H.x,G=w+H.y;if(b<0||b>=o||G<0||G>=f)continue;M.push({x:b,y:G})}if(!M.length)break;let A=M.filter((H)=>{return!l.has(`${H.x},${H.y}`)});if(A.length&&Math.random()>0.2){let H=A[Math.floor(Math.random()*A.length)];p=H.x,w=H.y;continue}let g=M[Math.floor(Math.random()*M.length)];p=g.x,w=g.y}for(let c=0;c<f;c++)for(let M=0;M<o;M++){let A=`${M},${c}`;if(l.has(A))continue;yield{x:M,y:c}}break}case"HUMAN_NOISE_CLOUD":{let l=[];for(let p=0;p<f;p++)for(let w=0;w<o;w++){let z=Math.sin((w+1)*0.93+Math.random()*0.8)+Math.cos((p+1)*1.17+Math.random()*0.8),c=(Math.random()-0.5)*2.6,M=Math.hypot(w-o/2,p-f/2)*0.08;l.push({point:{x:w,y:p},score:z+c+M})}l.sort((p,w)=>p.score-w.score);for(let p of l)yield p.point;break}case"HUMAN_PATCH_JUMP":{let l=new Set,p=[];for(let w=0;w<Math.max(6,o*f/18);w++)p.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*f)});while(l.size<o*f){let w=p[Math.floor(Math.random()*p.length)],z=1+Math.floor(Math.random()*3),c=1+Math.floor(Math.random()*3);for(let M=w.y-c;M<=w.y+c;M++)for(let A=w.x-z;A<=w.x+z;A++){if(A<0||A>=o||M<0||M>=f)continue;if(Math.random()>0.86)continue;let g=`${A},${M}`;if(l.has(g))continue;l.add(g),yield{x:A,y:M}}if(Math.random()>0.72&&p.length<o*f/2)p.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*f)});if(l.size>o*f*0.92)break}for(let w=0;w<f;w++)for(let z=0;z<o;z++){let c=`${z},${w}`;if(l.has(c))continue;yield{x:z,y:w}}break}case"DIAGONAL_BRUSH":{for(let l=0;l<o+f-1;l++){let p=l%2===0,w=[],z=Math.max(0,l-o+1),c=Math.min(f-1,l);for(let M=z;M<=c;M++){let A=l-M;if(A>=0&&A<o)w.push({x:A,y:M})}if(Math.random()>0.55)w.reverse();if(p)for(let M=w.length-1;M>=0;M--)yield w[M];else yield*w}break}case"BRUSH_STROKES":{let l=Array.from({length:f},()=>Array(o).fill(!1)),p=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],w=(M,A)=>M>=0&&M<o&&A>=0&&A<f,z=0,c=o*f;for(let M=0;M<c*6&&z<c;M++){let A=Math.floor(Math.random()*o),g=Math.floor(Math.random()*f),H=p[Math.floor(Math.random()*p.length)],b=3+Math.floor(Math.random()*16);for(let G=0;G<b;G++){if(!w(A,g))break;if(!l[g][A])l[g][A]=!0,z++,yield{x:A,y:g};if(Math.random()>0.72)H=p[Math.floor(Math.random()*p.length)];A+=H.x,g+=H.y}}for(let M=0;M<f;M++)for(let A=0;A<o;A++)if(!l[M][A])yield{x:A,y:M};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let l=new Set,p=o*f,w=Math.floor(o/2),z=Math.floor(f/2),c=[[1,0],[0,1],[-1,0],[0,-1]],M=0,A=1,g=(b,G)=>b>=0&&b<o&&G>=0&&G<f,H=function*(){let b=0;while(b<p){for(let G=0;G<2;G++){for(let N=0;N<A;N++){if(g(w,z)){let J=`${w},${z}`;if(!l.has(J)){if(l.add(J),yield{x:w,y:z},b++,b>=p)return}}w+=c[M][0],z+=c[M][1]}M=(M+1)%4}A++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*H();else{let b=[...H()];for(let G=b.length-1;G>=0;G--)yield b[G]}break}case"SCRIBBLE":{let l=new Set,p=o*f,w=Math.floor(o/2),z=Math.floor(f/2);for(let c=0;l.size<p&&c<p*24;c++){let M=`${w},${z}`;if(!l.has(M))l.add(M),yield{x:w,y:z};if(w+=Math.floor(Math.random()*3)-1,z+=Math.floor(Math.random()*3)-1,w<0||w>=o||z<0||z>=f)w=Math.floor(Math.random()*o),z=Math.floor(Math.random()*f)}for(let c=0;c<f;c++)for(let M=0;M<o;M++){let A=`${M},${c}`;if(l.has(A))continue;l.add(A),yield{x:M,y:c}}break}case"CROSSHATCH":{let l=[];for(let z=0;z<o+f-1;z++)for(let c=Math.max(0,z-o+1);c<=Math.min(f-1,z);c++){let M=z-c;l.push({x:M,y:c})}let p=[];for(let z=-f+1;z<o;z++)for(let c=0;c<f;c++){let M=c+z;if(M>=0&&M<o)p.push({x:M,y:c})}let w=new Set;for(let z of[...l,...p]){let c=`${z.x},${z.y}`;if(w.has(c))continue;w.add(c),yield z}break}case"WAVE_SWEEP":{let l=new Set;for(let p=0;p<o;p++){let z=(Math.sin(p/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(f-1)|0;for(let c=0;c<f;c++){let M=z+c,A=z-c;for(let g of[M,A]){if(g<0||g>=f)continue;let H=`${p},${g}`;if(l.has(H))continue;l.add(H),yield{x:p,y:g}}}}break}case"SCATTERED_LINES":{let l=new Set,p=o*f;for(let w=0;l.size<p&&w<p*14;w++){let z=Math.floor(Math.random()*o),c=Math.floor(Math.random()*f),M=Math.random()*Math.PI*2,A=Math.round(Math.cos(M)),g=Math.round(Math.sin(M)),H=6+Math.floor(Math.random()*28);for(let b=0;b<H;b++){if(z<0||z>=o||c<0||c>=f)break;let G=`${z},${c}`;if(!l.has(G))l.add(G),yield{x:z,y:c};z+=A,c+=g}}for(let w=0;w<f;w++)for(let z=0;z<o;z++){let c=`${z},${w}`;if(l.has(c))continue;l.add(c),yield{x:z,y:w}}break}case"CONTOUR_JITTER":{let l=new Set;for(let p=0;p<Math.ceil(Math.min(o,f)/2);p++){let w=[],z=p,c=p,M=o-p-1,A=f-p-1;for(let g=z;g<=M;g++)w.push({x:g,y:c});for(let g=c+1;g<=A;g++)w.push({x:M,y:g});for(let g=M-1;g>=z;g--)w.push({x:g,y:A});for(let g=A-1;g>c;g--)w.push({x:z,y:g});for(let g=w.length-1;g>0;g--){let H=Math.floor(Math.random()*(g+1)),b=w[g];w[g]=w[H],w[H]=b}for(let g of w){let H=`${g.x},${g.y}`;if(l.has(H))continue;l.add(H),yield g}}break}case"SPIRAL_WOBBLE":{let l=new Set,p=o/2,w=f/2,z=Math.hypot(p,w);for(let c=0;l.size<o*f&&c<o*f*9;c++){let M=c/(o*f*9)*z,A=c*0.31+Math.sin(c*0.07)*0.7,g=Math.round(p+Math.cos(A)*M),H=Math.round(w+Math.sin(A)*M);if(g<0||g>=o||H<0||H>=f)continue;let b=`${g},${H}`;if(l.has(b))continue;l.add(b),yield{x:g,y:H}}for(let c=0;c<f;c++)for(let M=0;M<o;M++){let A=`${M},${c}`;if(l.has(A))continue;yield{x:M,y:c}}break}case"CLUSTER_BURSTS":{let l=new Set,p=o*f;for(let w=0;l.size<p&&w<p*12;w++){let z=Math.floor(Math.random()*o),c=Math.floor(Math.random()*f),M=2+Math.floor(Math.random()*10);for(let A=c-M;A<=c+M;A++)for(let g=z-M;g<=z+M;g++){if(g<0||g>=o||A<0||A>=f)continue;if(Math.hypot(g-z,A-c)>M)continue;let H=`${g},${A}`;if(l.has(H))continue;l.add(H),yield{x:g,y:A}}}for(let w=0;w<f;w++)for(let z=0;z<o;z++){let c=`${z},${w}`;if(l.has(c))continue;l.add(c),yield{x:z,y:w}}break}case"ORBITAL":{let l=new Set,p=(o-1)/2,w=(f-1)/2,z=Math.ceil(Math.max(p,w));for(let c=0;c<=z;c++){let M=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,c)*2));for(let A=0;A<M;A++){let g=A/M*Math.PI*2+(c%2?0.3:-0.3),H=Math.round(p+Math.cos(g)*c),b=Math.round(w+Math.sin(g)*c);if(H<0||H>=o||b<0||b>=f)continue;let G=`${H},${b}`;if(l.has(G))continue;l.add(G),yield{x:H,y:b}}}for(let c=0;c<f;c++)for(let M=0;M<o;M++){let A=`${M},${c}`;if(l.has(A))continue;yield{x:M,y:c}}break}case"FLOW_FIELD":{let l=new Set,p=o*f;for(let w=0;l.size<p&&w<p*18;w++){let z=Math.floor(Math.random()*o),c=Math.floor(Math.random()*f);for(let M=0;M<120;M++){if(z<0||z>=o||c<0||c>=f)break;let A=`${z},${c}`;if(!l.has(A))l.add(A),yield{x:z,y:c};let g=Math.sin(z*0.09)*1.8+Math.cos(c*0.08)*1.6+Math.sin((z+c)*0.05);z+=Math.round(Math.cos(g)),c+=Math.round(Math.sin(g))}}for(let w=0;w<f;w++)for(let z=0;z<o;z++){let c=`${z},${w}`;if(l.has(c))continue;l.add(c),yield{x:z,y:w}}break}case"EDGE_IN":{let l=new Set,p=Math.ceil(Math.min(o,f)/2);for(let w=0;w<p;w++){let z=w,c=o-1-w,M=w,A=f-1-w;for(let g=z;g<=c;g++)for(let H of[M,A]){let b=`${g},${H}`;if(l.has(b))continue;l.add(b),yield{x:g,y:H}}for(let g=M+1;g<=A-1;g++)for(let H of[z,c]){let b=`${H},${g}`;if(l.has(b))continue;l.add(b),yield{x:H,y:g}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),u(this.bot)}move(o){if(!this.moveInfo)return;let f=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),l=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=f+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-f)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,f+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=l+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-l)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,l+this.moveInfo.height);this.update(),u(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let f=o.target;if(f.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(f.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(f.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(f.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${d}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var B0=`/* stylelint-disable declaration-no-important */
/* stylelint-disable plugin/no-low-performance-animation-properties */
/* stylelint-disable no-descending-specificity */
/* stylelint-disable declaration-block-single-line-max-declarations */
@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';

:root {
  --hover: #1f2433;
  --text-invert: #fff;
  --error: #ff5c7c;
  --resize: 8px;
  --text: #ecf2ff;
  --background: #0f111a;
  --background-hover: #20263a;
  --background-disabled: #2f3448;
  --main: #6d7bff;
  --main-hover: #7f8bff;
  --border: #2a3044;
}

.text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center:nth-child(
    -n + FAKE_FAVORITE_LOCATIONS
  ) {
  display: none;
}

.wwidget {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min(340px, 92vw);
  height: 100dvh;
  border-right: var(--border) 1px solid;
  background: linear-gradient(180deg, #101526, #0b0e18);
  color: var(--text);
  font-family: Poppins, sans-serif;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

.wwidget .title {
  display: grid;
  gap: 8px;
  padding: 14px 12px;
  border-bottom: var(--border) 1px solid;
  background-color: #0f1424;
  color: var(--text-invert);
  font-weight: 700;
  font-size: 18px;
  text-align: left;
}

.wwidget .widget-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.wwidget .minimized-bar {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  margin: 0 8px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #161e31;
  font-size: 12px;
}

.wwidget .minimized-bar button {
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #222c48;
  color: var(--text);
}

.wwidget .widget-actions button {
  padding: 6px 8px;
  border: var(--border) 1px solid;
  border-radius: 8px;
  background: #1a2032;
  color: var(--text);
  font-size: 11px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.wwidget .widget-actions button:hover {
  background: #24304d;
  box-shadow: 0 6px 14px rgb(0 0 0 / 30%);
  transform: translateY(-1px);
}

.wwidget.wopen .wopen-button svg {
  transform: rotate(90deg);
}

.wwidget.wopen {
  box-shadow: 0 12px 30px rgb(15 23 42 / 30%);
  transform: translateX(0);
}

.wwidget .wopen-button svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentcolor;
  transition: transform 0.3s ease;
  stroke-width: 2.5;
  stroke-linecap: round;
}

.wwidget .wopen-button {
  position: fixed;
  bottom: 16px;
  left: 16px;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: var(--border) 1px solid;
  border-color: #3b4360;
  border-radius: 999px;
  background-color: #171d2d;
  color: #e7ecff;
  box-shadow: 0 8px 24px rgb(2 6 23 / 55%);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.wwidget .wopen-button:hover {
  background-color: #202943;
  box-shadow: 0 10px 26px rgb(2 6 23 / 65%);
  transform: scale(1.05);
}

.wwidget .images {
  display: grid;
  gap: 10px;
  overflow-y: auto;
  max-height: 32dvh;
  padding: 4px 8px;
}

.wwidget .images .image {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: stretch;
  width: 100%;
  min-height: 72px;
  padding: 8px;
  border: 1px solid rgb(109 123 255 / 20%);
  border-radius: 12px;
  background: linear-gradient(180deg, #171f33, #141a2a);
  box-shadow: 0 10px 24px rgb(0 0 0 / 25%);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.wwidget .images .image:hover {
  border-color: rgb(109 123 255 / 55%);
  box-shadow: 0 14px 28px rgb(0 0 0 / 35%);
  transform: translateY(-1px);
}

.wwidget .images .image .preview {
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 60px;
  margin: 0;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 10px;
  background: #0f1321;
}

.wwidget .images .image img {
  max-width: 100%;
  max-height: 56px;
  margin: 0 auto;
  border-radius: 8px;
  cursor: pointer;
}

.wwidget .images .image .image-controls {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
}

.wwidget .images .image .image-controls button {
  width: 30px;
  height: 30px;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 8px;
  background: linear-gradient(180deg, #212b45, #1a2238);
  color: #d9e3ff;
  font-size: 14px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}

.wwidget .images .image .image-controls button:hover {
  border-color: rgb(109 123 255 / 55%);
  box-shadow: 0 8px 16px rgb(0 0 0 / 30%);
  filter: saturate(1.12);
  transform: scale(1.06);
}

.wwidget .images .image .image-controls .settings {
  color: #a9d6ff;
}

.wwidget .shortcuts {
  display: grid;
  gap: 4px;
  justify-items: start;
  width: calc(100% - 10px);
  margin: 4px 5px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #151d30;
  text-align: left;
  white-space: normal;
}

.wwidget .shortcuts.shortcut-pulse {
  border-color: rgb(109 123 255 / 75%);
  box-shadow: 0 0 0 1px rgb(109 123 255 / 35%);
}

.wimage {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  container-type: normal;
}

.wimage canvas {
  width: 100%;
  height: 100%;
  box-shadow: inset var(--text) 0 0 0 1px;
  cursor: all-scroll;
  image-rendering: pixelated;
}

.wimage .wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dashed rgb(109 123 255 / 75%);
  border-radius: 6px;
  box-shadow: 0 0 0 1px rgb(9 12 20 / 65%);
}

.wimage .wform {
  position: absolute;
  top: calc(100% + 50px);
  left: 0;
  overflow: auto;
  width: 320px;
  max-height: min(70dvh, 520px);
  border: var(--border) 1px solid;
  border-radius: 10px;
  background-color: #151c2d;
  color: var(--text);
  box-shadow: 0 18px 36px rgb(2 6 23 / 45%);
  transform-origin: top left;
}

.wimage:hover .wrapper .wform,
.wimage:hover .wtopbar {
  opacity: 1;
}

.wtopbar button svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentcolor;
  transition: transform 0.2s ease;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.wtopbar .lock.locked .icon-unlocked {
  opacity: 0.25;
}

.wform {
  font-size: 13px;
  font-family: Poppins, sans-serif;
}

.wform > * {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: calc(100% - 10px);
  margin: 5px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wwidget .wform {
  display: grid;
  gap: 6px;
  padding-bottom: 10px;
}

.wform button,
.wform input,
.wform select,
.wform textarea,
.wform label:has(input[type='checkbox']) {
  padding: 8px;
  border: var(--border) 1px solid;
  border-radius: 10px;
  background: #171e30;
  color: var(--text);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.wform input[type='range'] {
  width: 100%;
  height: 32px;
  background: linear-gradient(
    to right,
    var(--main) var(--val),
    var(--background-disabled) var(--val)
  );
  cursor: ew-resize;
  appearance: none;
}

.wform input[type='range']::-moz-range-thumb {
  width: 0;
  height: 0;
  opacity: 0;
}

.wform button:hover,
.wform input:hover,
.wform select:hover {
  border-color: rgb(109 123 255 / 60%);
  background-color: var(--background-hover);
  box-shadow: 0 8px 18px rgb(0 0 0 / 20%);
  transform: translateY(-1px);
}

.wform select {
  background-image:
    linear-gradient(45deg, transparent 50%, #8fa2ff 50%),
    linear-gradient(135deg, #8fa2ff 50%, transparent 50%);
  background-position:
    calc(100% - 16px) 55%,
    calc(100% - 11px) 55%;
  background-size:
    5px 5px,
    5px 5px;
  background-repeat: no-repeat;
  appearance: none;
}

.wform button:active,
.wform select:active {
  transform: scale(0.98);
}

.wform button:disabled,
.wform input:disabled {
  background-color: var(--background-disabled);
  cursor: no-drop;
}

.wform label input:not([type='checkbox']) {
  width: inherit;
}

.wform .wprogress {
  position: relative;
  width: 100%;
  margin: 0;
}

.wform .wprogress div {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: var(--main);
  transform-origin: left;
}

.wform .wprogress span {
  z-index: 1;
  mix-blend-mode: screen;
}

.wform .colors {
  display: grid;
  gap: 8px;
  width: 100%;
  height: auto;
  margin: 0;
}

.wform .colors .colors-track {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 32px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: repeating-linear-gradient(
    25deg,
    var(--background),
    var(--background),
    var(--hover) 8px,
    var(--hover) 12px
  );
  cursor: ew-resize;
}

.wform .colors .colors-track > button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  cursor: grab;
  transition:
    0.2s left,
    0.2s width,
    0.2s filter;
}

.wform .colors .colors-track > button .order-index {
  position: absolute;
  top: 2px;
  left: 4px;
  padding: 1px 4px;
  border-radius: 999px;
  background: rgb(0 0 0 / 45%);
  color: #fff;
  font-weight: 600;
  font-size: 9px;
  pointer-events: none;
}

.wform .colors .colors-track > button:hover {
  filter: brightness(0.8);
}

.wform .colors .colors-track > button.color-disabled::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  box-shadow: inset 0 0 0 2px var(--error);
  pointer-events: none;
}

.wform .colors .colors-track > button.substitution button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 4px;
  color: var(--background);
  font-size: 10px;
}

.wform .colors .colors-track > button.substitution button.buy {
  top: 2px;
  height: calc(50% - 2px);
}

.wform .colors .colors-track > button.substitution button.disable {
  top: 50%;
}

.wform .colors .colors-legend {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}

.wimage .colors-dialog {
  width: min(560px, 92vw);
  max-height: min(85dvh, 680px);
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #0f1526;
  color: var(--text);
  box-shadow: 0 22px 40px rgb(2 6 23 / 55%);
}

.wimage .colors-dialog::backdrop {
  background: rgb(0 0 0 / 55%);
}

.wimage .colors-dialog-head {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.wimage .close-colors {
  min-width: 72px;
  padding: 6px 10px;
  border: 1px solid #56608a;
  border-radius: 8px;
  background: #212c49;
  color: #f0f4ff;
  font-weight: 600;
}

.wimage .colors-dialog-help {
  margin: 0 0 8px;
  color: #b4bfdc;
  font-size: 12px;
  line-height: 1.35;
}

.wimage .colors-dialog-help.order {
  color: #d6defa;
  font-weight: 600;
}

.wimage .color-search {
  width: 100%;
  margin-bottom: 10px;
}

.wimage .colors-dialog-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  overflow: auto;
  max-height: min(62dvh, 520px);
  padding-right: 2px;
}

.wimage .color-chip {
  display: grid;
  grid-template-columns: auto 18px 1fr auto auto;
  gap: 6px;
  align-items: center;
  width: 100%;
  padding: 6px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #161d2f;
  color: var(--text);
  font-size: 11px;
}

.wimage .color-chip .order-index {
  padding: 2px 6px;
  border-radius: 999px;
  background: #202a43;
  color: #b8c8ff;
  font-weight: 700;
  font-size: 10px;
}

.wimage .color-chip.disabled {
  opacity: 0.65;
}

.wimage .color-chip .swatch {
  width: 14px;
  height: 14px;
  border: 1px solid rgb(255 255 255 / 15%);
  border-radius: 4px;
  background: var(--swatch-color);
}

.wimage .color-chip .meta {
  display: grid;
  gap: 2px;
  justify-items: start;
}

.wimage .color-chip .premium.on {
  color: #ffd166;
}

.wimage .color-chip .buy-chip {
  padding: 3px 6px;
  border-radius: 6px;
  font-size: 10px;
}

.wtopbar {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  width: 214px;
  margin-bottom: 4px;
  opacity: 0.92;
}

.wtopbar button {
  min-height: 36px;
  border: 1px solid var(--border);
  background: #182035;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.wtopbar button:hover {
  background: #273150;
  box-shadow: 0 8px 18px rgb(0 0 0 / 30%);
  transform: translateY(-1px);
}

.wtopbar button:hover svg {
  transform: scale(1.08);
}

.wtopbar button.delete {
  color: #ff8fa3;
}

.wtopbar button.open-colors {
  color: #9ed6ff;
}

.wtopbar button.lock.locked {
  color: #ffd166;
}

.resize {
  position: absolute;
  background: transparent;
}

.resize.n,
.resize.s {
  left: 0;
  width: 100%;
  height: var(--resize);
  cursor: ns-resize;
}

.resize.n {
  top: calc(var(--resize) / -2);
}

.resize.s {
  bottom: calc(var(--resize) / -2);
}

.resize.e,
.resize.w {
  top: 0;
  width: var(--resize);
  height: 100%;
  cursor: ew-resize;
}

.resize.e {
  right: calc(var(--resize) / -2);
}

.resize.w {
  left: calc(var(--resize) / -2);
}

.hidden {
  display: none !important;
}

.overlay-hidden .wimage {
  display: none !important;
}

.no-pointer-events {
  pointer-events: none;
}

@media (width <= 700px) {
  .wwidget {
    width: 100vw;
    max-width: 100vw;
  }

  .wwidget .images {
    max-height: 26dvh;
  }

  .wimage .wform {
    width: min(320px, calc(100vw - 20px));
  }
}
`;class y extends Error{name="KGlacerMacroError";constructor(o,f){super(o);f.widget.status=o}}class p0 extends y{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var Y={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0}};function D(o,f){return o.key.toLowerCase()===f.key&&o.shiftKey===Boolean(f.shift)&&o.ctrlKey===Boolean(f.ctrl)&&o.altKey===Boolean(f.alt)}function N0(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let f=o.tagName.toLowerCase();return f==="input"||f==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var Y0=`<button class="wopen-button" aria-label="Toggle widget">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16"/>
  </svg>
</button>
<div class="title">
  <span data-i18n="widgetTitle">KGlacerMacro</span>
  <div class="widget-actions">
    <button class="toggle-overlay" data-i18n="toggleOverlay">Hide/show overlays</button>
    <button class="minimize" data-i18n="minimize">Minimize panel</button>
  </div>
</div>
<div class="minimized-bar hidden">
  <span data-i18n="panelHidden">Panel hidden</span>
  <button class="restore-panel" data-i18n="restorePanel">Restore</button>
</div>
<div class="wform">
  <label><span data-i18n="language">Language</span>:&nbsp;<select class="locale">
    <option value="en">English</option>
    <option value="es">Español</option>
  </select></label>
  <div class="wprogress"><div></div><span></span></div>
  <div class="wp wstatus"></div>
  <button class="draw" disabled data-i18n="draw">Draw</button>
  <div class="shortcuts">
    <strong data-i18n="keyboardShortcuts">Shortcuts</strong>
    <span data-i18n="shortcutsHelp"
      >Shift+B toggle widget · Shift+M hide/show panel · Shift+S show panel · Shift+H hide panel · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image</span
    >
  </div>
  <label><span data-i18n="strategy">Strategy</span>:&nbsp;<select class="strategy">
    <option value="SEQUENTIAL" selected data-i18n="sequential">Sequential</option>
    <option value="ALL" data-i18n="all">All</option>
    <option value="PERCENTAGE" data-i18n="percentage">Percentage</option>
  </select></label>
  <div class="images"></div>
  <button class="add-image" disabled data-i18n="addImage">Add image</button>
</div>
`;var D0="kglacer-macro:overlay-hidden";class w0 extends h{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$minimize;$shortcuts;$locale;$minimizedBar;$restorePanel;$topbar;$draw;$addImage;$toggleOverlay;$strategy;$progressLine;$progressText;$images;$wopenButton;activeImageIndex=-1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=Y0,$(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$settings:".wform",$status:".wstatus",$minimize:".minimize",$shortcuts:".shortcuts",$locale:".locale",$minimizedBar:".minimized-bar",$restorePanel:".restore-panel",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$toggleOverlay:".toggle-overlay",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$minimize.addEventListener("click",()=>{this.minimize()}),this.$restorePanel.addEventListener("click",()=>{this.minimize(!1)}),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=l0(),this.$locale.addEventListener("change",()=>{G0(this.$locale.value),$(this.element);for(let f=0;f<this.bot.images.length;f++)this.bot.images[f].applyLocale();this.refreshOverlayToggleText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run("Adding image",async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${d}`,o.click(),await X(o,["change"],["cancel","error"]);let f=o.files?.[0];if(!f)throw new p0(this.bot);console.log("[KGM][Widget] File selected",{name:f.name,size:f.size,type:f.type});let l;if(f.name.endsWith(`.${d}`))l=await C.fromJSON(this.bot,JSON.parse(await f.text()));else{let p=new FileReader;p.readAsDataURL(f),await X(p,["load"],["error"]);let w=await this.compressImageBeforeLoad(p.result),z=new Image;z.src=w,await X(z,["load"],["error"]),l=new C(this.bot,q.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new L(this.bot,z))}this.bot.images.push(l),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),l.updateTasks(),u(this.bot,!0),console.log("[KGM][Widget] Image persisted, reloading page"),document.location.reload()},()=>{this.setDisabled("add-image",!1)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let f=new Image;if(f.src=o,await X(f,["load"],["error"]),!(f.naturalWidth*f.naturalHeight>3000000||o.length>3000000))return o;let p=document.createElement("canvas");p.width=f.naturalWidth,p.height=f.naturalHeight;let w=p.getContext("2d");if(!w)return o;return w.drawImage(f,0,0),p.toDataURL("image/png")}update(){this.$strategy.value=this.bot.strategy,this.$minimize.textContent=this.$settings.classList.contains("hidden")?K("expandPanel"):K("minimize");let o=0,f=0;for(let z=0;z<this.bot.images.length;z++){let c=this.bot.images[z];o+=c.pixels.pixels.length*c.pixels.pixels[0].length,f+=c.tasks.length}let l=o-f,p=l/o*100|0;this.$progressText.textContent=`${l}/${o} ${p}% ETA: ${f/120|0}h`,this.$progressLine.style.transform=`scaleX(${p}%)`,this.$images.innerHTML="";let w=document.createDocumentFragment();for(let z=0;z<this.bot.images.length;z++){let c=this.bot.images[z],M=document.createElement("div");w.append(M),M.className="image",M.innerHTML=`<button class="preview" title="Focus image">
  <img src="${c.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="settings" title="Color settings">⚙</button>
    <button class="up" title="Move up" ${z===0?"disabled":""}>▴</button>
    <button class="down" title="Move down" ${z===this.bot.images.length-1?"disabled":""}>▾</button>
  </div>`,M.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=z,c.position.scrollScreenTo()}),M.querySelector(".settings").addEventListener("click",()=>{this.activeImageIndex=z,c.openColorPanel()}),M.querySelector(".up").addEventListener("click",()=>{t(this.bot.images,z,z-1),this.update(),u(this.bot)}),M.querySelector(".down").addEventListener("click",()=>{t(this.bot.images,z,z+1),this.update(),u(this.bot)})}this.$images.append(w)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(D0)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let f=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",f),localStorage.setItem(D0,String(f)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${K("toggleOverlay")} (${K("disabled")})`:`${K("toggleOverlay")} (${K("enabled")})`}setDisabled(o,f){this.element.querySelector("."+o).disabled=f}async run(o,f,l,p="..."){console.log("[KGM][Widget] Task started",{status:o});let w=this.status;this.status=`${p} ${o}`;try{let z=await f();return this.status=w,console.log("[KGM][Widget] Task completed",{status:o}),z}catch(z){if(!(z instanceof y))console.error(z),this.status=`Error: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:z}),z}finally{await l?.()}}minimize(o){let f=o===void 0?!this.$settings.classList.contains("hidden"):!o;this.$settings.classList.toggle("hidden",f),this.$minimizedBar.classList.toggle("hidden",!f),this.$minimize.textContent=f?K("expandPanel"):K("minimize")}handleKeyboard(o){if(N0(o.target))return;if(D(o,Y.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(D(o,Y.minimizeWidget)){o.preventDefault(),this.minimize();return}if(D(o,Y.showWidgetPanel)){o.preventDefault(),this.minimize(!1);return}if(D(o,Y.showShortcuts)){o.preventDefault(),this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(D(o,Y.hideWidgetPanel)){o.preventDefault(),this.minimize(!0);return}if(D(o,Y.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(D(o,Y.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(D(o,Y.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(D(o,Y.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(D(o,Y.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(D(o,Y.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(D(o,Y.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),u(this.bot)}}var T0=2,Z0="[KGM]";class q0{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];widget=new w0(this);markerPixelPositionResolvers=[];lastColor;log(o,f){if(f===void 0)console.log(`${Z0} ${o}`);else console.log(`${Z0} ${o}`,f)}constructor(){this.log("Boot sequence started");let o=U0();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let l=0;l<o.images.length;l++){let p=o.images[l];n({x:p.position[0]-1000,y:p.position[1]-1000}),n({x:p.position[0]+1000,y:p.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let f=document.createElement("style");f.textContent=B0.replace("FAKE_FAVORITE_LOCATIONS",v.length.toString()),document.head.append(f),this.log("Styles injected",{fakeFavoriteLocations:v.length}),this.widget.run("Initializing",async()=>{this.log("Widget initialization flow started"),await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let l=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((p)=>{for(let w=0;w<p.length;w++)if(p[w].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(l,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await F(500),await this.updateColors(),o)for(let p=0;p<o.images.length;p++){let w=await C.fromJSON(this,o.images[p]);this.images.push(w),w.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.log("Initialization completed; controls enabled")})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),f=(l)=>{if(!l.shiftKey)l.stopPropagation()};return this.widget.run("Drawing",async()=>{await this.widget.run("Initializing draw",()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",f,!0),o.addEventListener("wheel",f,!0),this.updateTasks();let l=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((z)=>z.json()),p=Math.floor(l.charges.count);this.log("Charges fetched",{charges:p});let w=0;for(let z=0;z<this.images.length;z++)w+=this.images[z].tasks.length;switch(this.log("Tasks prepared",{tasks:w}),this.strategy){case"ALL":{while(p>0){let z=!0;for(let c=0;c<this.images.length;c++){let M=this.images[c].tasks.shift();if(!M)continue;this.drawTask(M),p--,await F(1),z=!1}if(z)break}break}case"PERCENTAGE":{for(let z=0;z<w&&p>0;z++){let c=1,M;for(let A=0;A<this.images.length;A++){let g=this.images[A],H=1-g.tasks.length/(g.pixels.pixels.length*g.pixels.pixels[0].length);if(H<c)c=H,M=g}this.drawTask(M.tasks.shift()),p--,await F(1)}break}case"SEQUENTIAL":for(let z=0;z<this.images.length;z++){let c=this.images[z];for(let M=c.tasks.shift();M&&p>0;M=c.tasks.shift())this.drawTask(M),p--,await F(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:p})},()=>{globalThis.removeEventListener("mousemove",f,!0),o.removeEventListener("wheel",f,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:T0,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let f=document.querySelector(".maplibregl-canvas"),l=window.innerWidth/2,p=window.innerHeight/2,w=l-o.x,z=p-o.y;function c(M,A,g){f.dispatchEvent(new MouseEvent(M,{bubbles:!0,cancelable:!0,clientX:A,clientY:g,buttons:1}))}c("mousedown",l,p),c("mousemove",w,z),c("mouseup",w,z)}readMap(){this.mapsCache.clear();let o=new Set;for(let l=0;l<this.images.length;l++){let p=this.images[l],{tileX:w,tileY:z}=new q(this,p.position.globalX+p.pixels.pixels[0].length,p.position.globalY+p.pixels.pixels.length);for(let c=p.position.tileX;c<=w;c++)for(let M=p.position.tileY;M<=z;M++)o.add(`${c}/${M}`)}let f=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`Reading map [0/${o.size}]`,()=>Promise.all([...o].map(async(l)=>{this.mapsCache.set(l,await L.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${l}.png`,exactColor:!0})),this.widget.status=`⌛ Reading map [${++f}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let f=0,l=1,p=1/0,w=1/0;for(let M=0;M<this.$stars.length;M++){let{x:A,y:g}=_(this.$stars[M]);if(A<o.x&&g<o.y){let H=o.x-A+(o.y-g);if(H<p)p=H,f=M}else if(A>o.x&&g>o.y){let H=A-o.x+(g-o.y);if(H<w)w=H,l=M}}let z=_(this.$stars[f]),c=P[f];return{anchorScreenPosition:z,anchorWorldPosition:c,pixelSize:(_(this.$stars[l]).x-z.x)/(P[l].x-c.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await F(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await F(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await F(1)}drawTask(o){if(this.lastColor!==o.color)document.getElementById("color-"+o.color).click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color});let f=o.position.pixelSize/2,l=o.position.toScreenPosition();document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:l.x+f,clientY:l.y+f,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let o=globalThis.fetch,f=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(l,p)=>{let w=await o(l,p),z=w.clone(),c="";if(typeof l=="string")c=l;else if(l instanceof Request)c=l.url;else if(l instanceof URL)c=l.href;if(w.url==="https://backend.wplace.live/me")this.me=await z.json(),this.me.favoriteLocations.unshift(...v),this.me.maxFavoriteLocations=1/0,w.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let M=f.exec(c);if(M){for(let A=0;A<this.markerPixelPositionResolvers.length;A++)this.markerPixelPositionResolvers[A](new q(this,+M[1],+M[2],+M[3],+M[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return w}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await F(1)}waitForElement(o,f){return this.log("Waiting for element",{name:o,selector:f}),this.widget.run(`Waiting for ${o}`,()=>{return new Promise((l)=>{let p=document.querySelector(f);if(p){l(p);return}let w=new MutationObserver(()=>{let z=document.querySelector(f);if(z)w.disconnect(),l(z)});w.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,v.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new q0;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
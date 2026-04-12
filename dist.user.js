// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      1.1.7
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
function f0(o,p,l){let f=o[l];return o[l]=o[p],o[p]=f,o}function w0(o,p){let l=o.indexOf(p);if(l!==-1)o.splice(l,1);return l}var p1=Math.floor(Math.random()*65536),l1=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function F(o){return new Promise((p)=>setTimeout(p,o))}function R(o,p,l=["error"],f="addEventListener"){return new Promise((w,g)=>{for(let c=0;c<p.length;c++)o[f]?.(p[c],w);for(let c=0;c<l.length;c++)o[f]?.(l[c],g)})}class C0{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,p=15000){this.size=o,this.historyTime=p}push(o){if(o<0)throw new Error("Negative chunk size");let{time:p,historyTime:l}=this.getTime();if(this.history.push({time:p,chunk:o}),this.history[0]&&this.history[0].time+l<p)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((p,l)=>p+l.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),p=o-this.startTime,l=Math.min(p,this.historyTime);return{time:o,historyTime:l}}}var u0=["kglacermacro:locale"],e={en:{widgetTitle:"KGlacerMacro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",random:"Random",humanized:"Humanized",humanSoftDither:"Human soft dither",humanPatchy:"Human patchy",humanSweepArcs:"Human sweep arcs",humanMicroCorrections:"Human micro corrections",humanJitterFill:"Human jitter fill",humanCornerBias:"Human corner bias",humanLongStrokes:"Human long strokes",humanTapClusters:"Human tap clusters",humanMessySpiral:"Human messy spiral",humanDrunkWalk:"Human drunk walk",humanNoiseCloud:"Human noise cloud",humanPatchJump:"Human patch jump",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of all paint modes using the KGlacer logo as the base preview image.",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again."},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",random:"Aleatorio",humanized:"Humanizado",humanSoftDither:"Difuminado humano suave",humanPatchy:"Parches humanos",humanSweepArcs:"Barridos humanos en arco",humanMicroCorrections:"Micro correcciones humanas",humanJitterFill:"Relleno humano con jitter",humanCornerBias:"Sesgo humano por esquina",humanLongStrokes:"Trazos humanos largos",humanTapClusters:"Toques humanos por grupos",humanMessySpiral:"Espiral humana irregular",humanDrunkWalk:"Caminata humana errática",humanNoiseCloud:"Nube humana de ruido",humanPatchJump:"Saltos humanos por parches",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada de todos los modos de pintado usando el logo de KGlacer como imagen base.",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Overlay",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo."}};function m0(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function d(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in e)return o;for(let p=0;p<u0.length;p++){let l=localStorage.getItem(u0[p]);if(!l||!(l in e))continue;return localStorage.setItem("kglacer-macro:locale",l),l}return m0()}function o0(o){localStorage.setItem("kglacer-macro:locale",o)}function J0(){return Object.keys(e)}function u(o){let p=d();return e[p][o]}function W(o){for(let p of o.querySelectorAll("[data-i18n]"))p.textContent=u(p.dataset.i18n);for(let p of o.querySelectorAll("[data-i18n-title]"))p.setAttribute("title",u(p.dataset.i18nTitle));for(let p of o.querySelectorAll("[data-i18n-aria-label]"))p.setAttribute("aria-label",u(p.dataset.i18nAriaLabel));for(let p of o.querySelectorAll("[data-i18n-placeholder]"))p.setAttribute("placeholder",u(p.dataset.i18nPlaceholder))}class n{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,p){for(let l in p)this[l]=o.querySelector(p[l])}registerEvent(o,p,l,f={}){f.passive??=!0,o.addEventListener(p,l,f),this.runOnDestroy.push(()=>{o.removeEventListener(p,l)})}}function g0(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function a0(o,p,l){let f=g0(o/255),w=g0(p/255),g=g0(l/255),c=Math.cbrt(0.4122214708*f+0.5363325363*w+0.0514459929*g),b=Math.cbrt(0.2119034982*f+0.6806995451*w+0.1073969566*g),z=Math.cbrt(0.0883024619*f+0.2817188376*w+0.6299787005*g),M=0.2104542553*c+0.793617785*b-0.0040720468*z,H=1.9779984951*c-2.428592205*b+0.4505937099*z,A=0.0259040371*c+0.7827717662*b-0.808675766*z;return[M,H,A]}function G0(o,p,l){let[f,w,g]=o,[c,b,z]=p,M=(l0)=>l0*180/Math.PI,H=(l0)=>l0*Math.PI/180,A=1,a=1,D=1,U=Math.sqrt(w**2+g**2),J=Math.sqrt(b**2+z**2),K=(U+J)/2,Y=0.5*(1-Math.sqrt(K**7/(K**7+6103515625))),s=w*(1+Y),Q=b*(1+Y),N=Math.sqrt(s**2+g**2),S=Math.sqrt(Q**2+z**2),T=g===0&&s===0?0:M(Math.atan2(g,s))%360,I=z===0&&Q===0?0:M(Math.atan2(z,Q))%360,L=c-f,h=S-N,O=0;if(N*S!==0){if(O=I-T,O>180)O-=360;else if(O<-180)O+=360}let M0=2*Math.sqrt(N*S)*Math.sin(H(O)/2),H0=(f+c)/2,t=(N+S)/2,r=(T+I)/2;if(Math.abs(T-I)>180)r+=180;let W0=1-0.17*Math.cos(H(r-30))+0.24*Math.cos(H(2*r))+0.32*Math.cos(H(3*r+6))-0.2*Math.cos(H(4*r-63)),V0=1+0.015*(H0-50)**2/Math.sqrt(20+(H0-50)**2),G=1+0.045*t,A0=1+0.015*t*W0,X0=30*Math.exp((-((r-275)/25))**2),L0=-(2*Math.sqrt(t**7/(t**7+6103515625)))*Math.sin(H(2*X0));return Math.sqrt((L/(1*V0))**2+(h/(1*G))**2+(M0/(1*A0))**2+L0*(h/(1*G))*(M0/(1*A0)))-L*l}var C=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],m=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function i(o){if(o===0)return"transparent";let p=C[o];return`oklab(${p[0]*100}% ${p[1]} ${p[2]})`}var K0=`<div class="wtopbar">
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
    <label class="strategy-row">
      <span data-i18n="strategy">Strategy</span>:&nbsp;
      <span class="strategy-controls">
        <select class="strategy">
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
        <button
          class="open-preview"
          type="button"
          data-i18n="previewStrategy"
          data-i18n-title="previewStrategyTitle"
          data-i18n-aria-label="previewStrategyTitle"
        >
          Preview
        </button>
      </span>
    </label>
    <button class="reset-size"><span data-i18n="resetSize">Reset size</span> [<span></span>px]</button>
    <label>
      <input type="checkbox" class="draw-transparent" />&nbsp;<span data-i18n="eraseTransparent">Erase transparent pixels</span>
    </label>
    <label>
      <input type="checkbox" class="draw-colors-in-order" />&nbsp;<span data-i18n="drawColorsInOrder">Draw colors in order</span>
    </label>
  </div>
  <dialog class="kgm-modal colors-dialog">
    <div class="kgm-modal-head colors-dialog-head">
      <strong data-i18n="overlayColors">Overlay colors</strong>
      <button class="modal-close close-colors" type="button" data-i18n="close">Close</button>
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
  <dialog class="kgm-modal preview-dialog">
    <div class="kgm-modal-head preview-dialog-head">
      <strong data-i18n="previewStrategyTitle">Paint preview</strong>
      <button class="modal-close close-preview" type="button" data-i18n="close">Close</button>
    </div>
    <p class="preview-dialog-help" data-i18n="previewStrategyHelp">
      Simple visual reference using the KGlacer logo.
    </p>
    <div class="preview-dialog-list"></div>
  </dialog>
  <div class="resize n"></div>
  <div class="resize e"></div>
  <div class="resize s"></div>
  <div class="resize w"></div>
</div>
`;class X{bot;image;width;brightness;exactColor;static async fromJSON(o,p){let l=new Image;return l.src=p.url.startsWith("http")?await fetch(p.url,{cache:"no-store"}).then((f)=>f.blob()).then((f)=>URL.createObjectURL(f)):p.url,await R(l,["load"],["error"]),new X(o,l,p.width,p.brightness,p.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,p,l=p.naturalWidth,f=0,w=!1){this.bot=o;this.image=p;this.width=l;this.brightness=f;this.exactColor=w;if(w)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let l=1;l<64;l++)if(this.exactColor||!this.bot.unavailableColors.has(l))o.set(m[l],[l,l]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let p=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let l=0;l<this.canvas.height;l++)for(let f=0;f<this.canvas.width;f++){let w=(l*this.canvas.width+f)*4,g=p[w],c=p[w+1],b=p[w+2],z=p[w+3],M=`${g},${c},${b}`;if(this.exactColor){this.pixels[l][f]=z<100?0:m.indexOf(M);continue}let H,A;if(z<100)H=A=0;else if(o.has(M))[H,A]=o.get(M);else{let D=1/0,U=1/0;for(let J=0;J<C.length;J++){let K=C[J],Y=G0(a0(g,c,b),K,this.brightness);if(!this.bot.unavailableColors.has(J)&&Y<D)D=Y,H=J;if(Y<U)U=Y,A=J}o.set(M,[H,A])}if(H!==0)this.context.fillStyle=`oklab(${C[H][0]*100}% ${C[H][1]} ${C[H][2]})`,this.context.fillRect(f,l,1,1);this.pixels[l][f]=H;let a=this.colors.get(A);if(a)a.amount++;else this.colors.set(A,{color:H,amount:1,realColor:A})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor}}}var k="kglacer-macro-settings",Q0=["kglacermacro","wbot"],x="kgm";function _0(){let o=[k,...Q0];for(let p=0;p<o.length;p++){let l=o[p],f=localStorage.getItem(l);if(!f)continue;return{json:f,key:l}}return}function N0(){let o=_0();if(!o)return;let p;try{if(p=JSON.parse(o.json),typeof p!=="object")throw new Error("NOT VALID SAVE");if(p.version===1){let l=p;p.images=l.widget.images,p.strategy=l.widget.strategy,delete l.widget}if(o.key!==k)localStorage.setItem(k,o.json)}catch{localStorage.removeItem(o.key),p=void 0}return p}var U0;function B(o,p=!1){if(clearTimeout(U0),p)localStorage.setItem(k,JSON.stringify(o));else U0=setTimeout(()=>{localStorage.setItem(k,JSON.stringify(o))},600)}var Z=1000,s0=2048,$=Z*s0,V=[],v=[],S0=Date.now();function y(o){V.push(o),v.push({id:S0++,latitude:(2*Math.atan(Math.exp(-(o.y/$*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/$*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}y({x:$/3|0,y:$/3|0});y({x:$/3*2|0,y:$/3*2|0});function E(o){let[p,l]=o.style.transform.slice(32,-31).split(", ").map((f)=>Number.parseFloat(f));return{x:p,y:l}}class j{bot;static fromJSON(o,p){return new j(o,...p)}static fromScreenPosition(o,p){let{anchorScreenPosition:l,pixelSize:f,anchorWorldPosition:w}=o.findAnchorsForScreen(p);return new j(o,w.x+(p.x-l.x)/f|0,w.y+(p.y-l.y)/f|0)}globalX=0;globalY=0;get tileX(){return this.globalX/Z|0}set tileX(o){this.globalX=o*Z+this.x}get tileY(){return this.globalY/Z|0}set tileY(o){this.globalY=o*Z+this.y}get x(){return this.globalX%Z}set x(o){this.globalX=this.tileX*Z+o}get y(){return this.globalY%Z}set y(o){this.globalY=this.tileY*Z+o}anchor1Index;anchor2Index;get pixelSize(){return(E(this.bot.$stars[this.anchor2Index]).x-E(this.bot.$stars[this.anchor1Index]).x)/(V[this.anchor2Index].x-V[this.anchor1Index].x)}constructor(o,p,l,f,w){this.bot=o;if(f===void 0||w===void 0)this.globalX=p,this.globalY=l;else this.globalX=p*Z+f,this.globalY=l*Z+w;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,p=1/0;for(let l=0;l<V.length;l++){let{x:f,y:w}=V[l];if(f<this.globalX&&w<this.globalY){let g=this.globalX-f+(this.globalY-w);if(g<o)o=g,this.anchor1Index=l}else if(f>this.globalX&&w>this.globalY){let g=f-this.globalX+(w-this.globalY);if(g<p)p=g,this.anchor2Index=l}}}toScreenPosition(){let o=V[this.anchor1Index],p=E(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+p.x,y:(this.globalY-o.y)*this.pixelSize+p.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:p}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:p-window.innerHeight/3})}clone(){return new j(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}var T0="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg",B0;((G)=>{G.RANDOM="RANDOM";G.HUMANIZED="HUMANIZED";G.HUMAN_SOFT_DITHER="HUMAN_SOFT_DITHER";G.HUMAN_PATCHY="HUMAN_PATCHY";G.HUMAN_SWEEP_ARCS="HUMAN_SWEEP_ARCS";G.HUMAN_MICRO_CORRECTIONS="HUMAN_MICRO_CORRECTIONS";G.HUMAN_JITTER_FILL="HUMAN_JITTER_FILL";G.HUMAN_CORNER_BIAS="HUMAN_CORNER_BIAS";G.HUMAN_LONG_STROKES="HUMAN_LONG_STROKES";G.HUMAN_TAP_CLUSTERS="HUMAN_TAP_CLUSTERS";G.HUMAN_MESSY_SPIRAL="HUMAN_MESSY_SPIRAL";G.HUMAN_DRUNK_WALK="HUMAN_DRUNK_WALK";G.HUMAN_NOISE_CLOUD="HUMAN_NOISE_CLOUD";G.HUMAN_PATCH_JUMP="HUMAN_PATCH_JUMP";G.ZIGZAG="ZIGZAG";G.BRUSH_STROKES="BRUSH_STROKES";G.DIAGONAL_BRUSH="DIAGONAL_BRUSH";G.DOWN="DOWN";G.UP="UP";G.LEFT="LEFT";G.RIGHT="RIGHT";G.SPIRAL_FROM_CENTER="SPIRAL_FROM_CENTER";G.SPIRAL_TO_CENTER="SPIRAL_TO_CENTER";G.SCRIBBLE="SCRIBBLE";G.CROSSHATCH="CROSSHATCH";G.WAVE_SWEEP="WAVE_SWEEP";G.SCATTERED_LINES="SCATTERED_LINES";G.CONTOUR_JITTER="CONTOUR_JITTER";G.SPIRAL_WOBBLE="SPIRAL_WOBBLE";G.CLUSTER_BURSTS="CLUSTER_BURSTS";G.ORBITAL="ORBITAL";G.FLOW_FIELD="FLOW_FIELD";G.EDGE_IN="EDGE_IN"})(B0||={});class _ extends n{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(o,p){return new _(o,j.fromJSON(o,p.position),await X.fromJSON(o,p.pixels),p.strategy,p.opacity,p.drawTransparentPixels,p.drawColorsInOrder,p.colors,p.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colors;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;logoPreviewMask;logoPreviewImage;previewAnimations=new WeakMap;constructor(o,p,l,f="SPIRAL_FROM_CENTER",w=50,g=!1,c=!1,b=[],z=!1){super();this.bot=o;this.position=p;this.pixels=l;this.strategy=f;this.opacity=w;this.drawTransparentPixels=g;this.drawColorsInOrder=c;this.colors=b;this.lock=z;this.element.innerHTML=K0,this.element.classList.add("wimage"),W(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colors:".colors",$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,B(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),B(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let M;this.registerEvent(this.$brightness,"change",()=>{clearTimeout(M),M=setTimeout(()=>{this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),B(this.bot)},1000)}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),B(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,B(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,B(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),B(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.$colorsDialog.close()}),this.registerEvent(this.$closePreview,"click",()=>{this.$previewDialog.close()}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(H)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(H.target===this.$colorsDialog)this.$colorsDialog.close()}),this.registerEvent(this.$previewDialog,"click",(H)=>{if(H.target===this.$previewDialog)this.$previewDialog.close()}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let H of this.element.querySelectorAll(".resize"))this.registerEvent(H,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),p=new Set,l=new Map;for(let f=0;f<this.colors.length;f++){let w=this.colors[f];if(w.disabled)p.add(w.realColor);l.set(w.realColor,f)}for(let{x:f,y:w}of this.strategyPositionIterator()){let g=this.pixels.pixels[w][f];if(p.has(g))continue;o.globalX=this.position.globalX+f,o.globalY=this.position.globalY+w;let c=o.getMapColor();if(g!==c&&(this.drawTransparentPixels||g!==0))this.tasks.push({position:o.clone(),color:g})}if(this.drawColorsInOrder)this.tasks.sort((f,w)=>(l.get(f.color)??0)-(l.get(w.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:p}=this.position.toScreenPosition(),l=Math.round(this.position.pixelSize*this.pixels.width),f=Math.round(this.position.pixelSize*this.pixels.height);this.element.style.transform=`translate3d(${Math.round(o)}px, ${Math.round(p)}px, 0)`,this.element.style.width=`${l}px`,this.element.style.height=`${f}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let w=this.pixels.pixels.length*this.pixels.pixels[0].length,g=w-this.tasks.length,c=g/w*100|0;this.$progressText.textContent=`${g}/${w} ${c}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${c}%)`,this.$wrapper.classList[this.lock?"add":"remove"]("no-pointer-events"),this.$lock.classList[this.lock?"add":"remove"]("locked")}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),w0(this.bot.images,this),this.bot.widget.update(),B(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let l=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-l.left,offsetY:o.clientY-l.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let p=this.$colorsDialog.getBoundingClientRect(),l=Math.max(8,window.innerWidth-p.width-8),f=Math.max(8,window.innerHeight-p.height-8),w=Math.min(l,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),g=Math.min(f,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(w)}px`,this.$colorsDialog.style.top=`${Math.round(g)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){let o=this.$strategy.value,p=Object.values(B0).sort((f,w)=>{if(f===o)return-1;if(w===o)return 1;return 0});this.$previewDialogList.innerHTML="";let l=document.createDocumentFragment();for(let f=0;f<p.length;f++){let w=p[f],g=document.createElement("article");g.className="preview-card";let c=document.createElement("strong");c.textContent=this.getStrategyLabel(w);let b=document.createElement("canvas");b.className="preview-canvas",b.width=156,b.height=156,this.paintStrategyPreview(b,w),g.append(c,b),l.append(g)}this.$previewDialogList.append(l)}getStrategyLabel(o){switch(o){case"RANDOM":return u("random");case"HUMANIZED":return u("humanized");case"HUMAN_SOFT_DITHER":return u("humanSoftDither");case"HUMAN_PATCHY":return u("humanPatchy");case"HUMAN_SWEEP_ARCS":return u("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return u("humanMicroCorrections");case"HUMAN_JITTER_FILL":return u("humanJitterFill");case"HUMAN_CORNER_BIAS":return u("humanCornerBias");case"HUMAN_LONG_STROKES":return u("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return u("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return u("humanMessySpiral");case"HUMAN_DRUNK_WALK":return u("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return u("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return u("humanPatchJump");case"ZIGZAG":return u("zigzag");case"BRUSH_STROKES":return u("brushStrokes");case"DIAGONAL_BRUSH":return u("diagonalBrush");case"DOWN":return u("down");case"UP":return u("up");case"LEFT":return u("left");case"RIGHT":return u("right");case"SPIRAL_FROM_CENTER":return u("spiralOut");case"SPIRAL_TO_CENTER":return u("spiralIn");case"SCRIBBLE":return u("scribble");case"CROSSHATCH":return u("crosshatch");case"WAVE_SWEEP":return u("waveSweep");case"SCATTERED_LINES":return u("scatteredLines");case"CONTOUR_JITTER":return u("contourJitter");case"SPIRAL_WOBBLE":return u("spiralWobble");case"CLUSTER_BURSTS":return u("clusterBursts");case"ORBITAL":return u("orbital");case"FLOW_FIELD":return u("flowField");case"EDGE_IN":return u("edgeIn");default:return o}}paintStrategyPreview(o,p){let l=o.getContext("2d");if(!l)return;l.fillStyle="#0f1526",l.fillRect(0,0,o.width,o.height);let f=this.getLogoPreviewMask(),w=this.strategy;this.strategy=p;let g=[...this.strategyPositionIterator()];this.strategy=w;let c=new Set(f.map(({x:U,y:J})=>`${U}:${J}`)),b=g.filter(({x:U,y:J})=>c.has(`${U}:${J}`)),z=o.width/this.pixels.width,M=this.previewAnimations.get(o);if(M)cancelAnimationFrame(M);let H=(U)=>{l.fillStyle="#0f1526",l.fillRect(0,0,o.width,o.height),this.paintLogoGhost(l,z,f);for(let J=0;J<Math.min(U,b.length);J++){let K=b[J],Y=J/Math.max(1,b.length-1);l.fillStyle=`hsl(${220-Y*110} 90% ${43+Y*18}%)`,l.fillRect(K.x*z,K.y*z,Math.max(1,z),Math.max(1,z))}},A=performance.now(),a=Math.min(3800,Math.max(900,b.length*8)),D=(U)=>{let J=U-A,K=Math.min(1,J/a);H(Math.floor(b.length*K));let Y=K>=1?requestAnimationFrame(()=>{H(b.length)}):requestAnimationFrame(D);this.previewAnimations.set(o,Y)};D(A)}paintLogoGhost(o,p,l){if(this.logoPreviewImage){o.save(),o.globalAlpha=0.22,o.drawImage(this.logoPreviewImage,0,0,this.pixels.width*p,this.pixels.height*p),o.restore();return}o.fillStyle="rgb(115 132 190 / 28%)";for(let f=0;f<l.length;f++){let w=l[f];o.fillRect(w.x*p,w.y*p,Math.max(1,p),Math.max(1,p))}}getLogoPreviewMask(){if(this.logoPreviewMask)return this.logoPreviewMask;this.logoPreviewMask=this.fallbackPreviewMask();let o=new Image;return o.src=T0,o.decode().then(()=>{this.logoPreviewImage=o;let p=document.createElement("canvas");p.width=this.pixels.width,p.height=this.pixels.height;let l=p.getContext("2d");if(!l)return;if(l.clearRect(0,0,p.width,p.height),l.drawImage(o,0,0,p.width,p.height),this.logoPreviewMask=this.alphaMaskFromCanvas(l,p.width,p.height),this.$previewDialog.open)this.renderStrategyPreviewSamples()}).catch(()=>{return}),this.logoPreviewMask}alphaMaskFromCanvas(o,p,l){let f=o.getImageData(0,0,p,l).data,w=[];for(let g=0;g<l;g++)for(let c=0;c<p;c++)if((f[(g*p+c)*4+3]??0)>24)w.push({x:c,y:g});return w.length?w:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],p=this.pixels.width/2,l=this.pixels.height/2,f=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let w=0;w<this.pixels.height;w++)for(let g=0;g<this.pixels.width;g++)if((g-p)**2+(w-l)**2<=f**2)o.push({x:g,y:w});return o}applyLocale(){if(W(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let p=m[o]??"0,0,0",[l=0,f=0,w=0]=p.split(",").map((g)=>Number.parseInt(g,10));return`#${[l,f,w].map((g)=>g.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let p=m[o]??"0,0,0",[l=0,f=0,w=0]=p.split(",").map((z)=>Number.parseInt(z,10)),g=Math.max(l,f,w),c=Math.min(l,f,w);if(g-c<15)return["gray","grey","gris","neutral","neutro"];if(l>f+30&&l>w+30)return["red","rojo"];if(f>l+30&&f>w+30)return["green","verde"];if(w>l+30&&w>f+30)return["blue","azul"];if(l>170&&f>120&&w<130)return["orange","naranja"];if(l>170&&f>110&&w>140)return["pink","rosa"];if(l>120&&f<100&&w>120)return["purple","violet","morado"];if(l>130&&f>130&&w<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colors.innerHTML="",this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length,p=100/this.pixels.colors.size,l=document.createElement("div");l.className="colors-track",l.setAttribute("aria-label",u("overlayColors")),this.$colorsDialogList.setAttribute("aria-label",u("colorPanelResults"));let f=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((g)=>!this.pixels.colors.has(g.realColor)))this.colors=this.pixels.colors.values().toArray().sort((g,c)=>c.amount-g.amount).map((g)=>({realColor:g.realColor,disabled:!1})),B(this.bot);let w=0;for(let g=0;g<this.colors.length;g++){let c=this.colors[g],b=this.pixels.colors.get(c.realColor),z=!1,M=!1,H=b.realColor!==b.color,A=b.amount/o*100,a=this.colorHex(b.realColor),D=this.colorKeywords(b.realColor),U=()=>{if(z)return;c.disabled=c.disabled?void 0:!0,J.classList.toggle("color-disabled"),K.classList.toggle("disabled",Boolean(c.disabled));let Q=K.querySelector(".state");if(Q)Q.textContent=c.disabled?u("disabled"):u("enabled");B(this.bot)},J=document.createElement("button");if(J.setAttribute("aria-label",`${u("overlayColors")} #${g+1}: ${a.toUpperCase()}`),J.title=`${A.toFixed(1)}%`,J.innerHTML=`<span class="order-index">#${g+1}</span>`,c.disabled)J.classList.add("color-disabled");if(!H)J.style.background=i(b.realColor);else{J.classList.add("substitution"),J.style.setProperty("--wreal-color",i(b.realColor)),J.style.setProperty("--wsubstitution-color",i(b.color));let Q=document.createElement("button"),N=document.createElement("button");Q.textContent=u("buy"),N.textContent="✓",Q.classList.add("buy"),N.classList.add("disable"),Q.addEventListener("click",()=>{document.getElementById("color-"+b.realColor)?.click()}),N.addEventListener("click",U),J.append(Q),J.append(N)}J.style.left=w+"%",J.style.width=A+"%",w+=A,J.style.setProperty("--wleft",p*g+"%"),J.style.setProperty("--wwidth",p+"%"),l.append(J);let K=document.createElement("button");if(K.className=`color-chip ${c.disabled?"disabled":""}`,K.draggable=!0,K.innerHTML=`<span class="order-index">#${g+1}</span>
<span class="drag" title="${u("up")} / ${u("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${A.toFixed(1)}% · ${a.toUpperCase()}</span>
  <span class="state">${c.disabled?u("disabled"):u("enabled")}</span>
</span>
<span class="premium ${H?"on":""}">${H?u("premium"):""}</span>`,K.querySelector(".swatch").style.setProperty("--swatch-color",i(b.realColor)),K.addEventListener("click",()=>{if(M){M=!1;return}U()}),K.addEventListener("dragstart",(Q)=>{M=!0,K.classList.add("dragging"),Q.dataTransfer?.setData("text/plain",String(g)),Q.dataTransfer.effectAllowed="move"}),K.addEventListener("dragend",()=>{K.classList.remove("dragging")}),K.addEventListener("dragover",(Q)=>{Q.preventDefault(),K.classList.add("drag-target")}),K.addEventListener("dragleave",()=>{K.classList.remove("drag-target")}),K.addEventListener("drop",(Q)=>{Q.preventDefault(),K.classList.remove("drag-target");let N=Number.parseInt(Q.dataTransfer?.getData("text/plain")??"-1",10);if(N<0||N===g||N>=this.colors.length)return;this.colors.splice(g,0,...this.colors.splice(N,1)),B(this.bot),this.updateColors()}),H){let Q=document.createElement("button");Q.textContent=u("buy"),Q.className="buy-chip",Q.addEventListener("click",(N)=>{N.stopPropagation(),document.getElementById("color-"+b.realColor)?.click()}),K.append(Q)}let Y=`${a} ${D.join(" ")} ${b.realColor} ${m[b.realColor]}`;if(!f||Y.toLowerCase().includes(f))this.$colorsDialogList.append(K);let s=(Q)=>{let N=g,S=J.getBoundingClientRect().width,T=(I)=>{if(N=Math.min(this.colors.length-1,Math.max(0,Math.round(g+(I.clientX-Q.clientX)/S))),N!==g)z=!0;let L=0;for(let h of l.children){if(h===J)continue;if(L===N)L++;h.style.setProperty("--wleft",p*L+"%"),L++}J.style.setProperty("--wleft",p*N+"%")};document.addEventListener("mousemove",T),document.addEventListener("mouseup",()=>{if(document.removeEventListener("mousemove",T),N!==g)this.colors.splice(N,0,...this.colors.splice(g,1));B(this.bot),J.removeEventListener("mousedown",s),setTimeout(()=>{this.updateColors()},200)},{once:!0})};if(J.addEventListener("mousedown",s),!H)J.addEventListener("click",U)}this.$colors.append(l)}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,p=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let l=0;l<p;l++)for(let f=0;f<o;f++)yield{x:f,y:l};break}case"UP":{for(let l=p-1;l>=0;l--)for(let f=0;f<o;f++)yield{x:f,y:l};break}case"LEFT":{for(let l=0;l<o;l++)for(let f=0;f<p;f++)yield{x:l,y:f};break}case"RIGHT":{for(let l=o-1;l>=0;l--)for(let f=0;f<p;f++)yield{x:l,y:f};break}case"RANDOM":{let l=[];for(let f=0;f<p;f++)for(let w=0;w<o;w++)l.push({x:w,y:f});for(let f=l.length-1;f>=0;f--){let w=Math.floor(Math.random()*(f+1)),g=l[f];l[f]=l[w],l[w]=g}yield*l;break}case"ZIGZAG":{for(let l=0;l<p;l++)if(l%2===0)for(let f=0;f<o;f++)yield{x:f,y:l};else for(let f=o-1;f>=0;f--)yield{x:f,y:l};break}case"HUMANIZED":{let l=Math.max(4,Math.floor(Math.min(o,p)/10)),f=[];for(let w=0;w<p;w+=l)for(let g=0;g<o;g+=l)f.push({x:g,y:w});for(let w=f.length-1;w>=0;w--){let g=Math.floor(Math.random()*(w+1)),c=f[w];f[w]=f[g],f[g]=c}for(let w=0;w<f.length;w++){let g=f[w],c=Math.min(p,g.y+l),b=Math.min(o,g.x+l);for(let z=g.y;z<c;z++)if(Math.random()>0.35)for(let H=g.x;H<b;H++)yield{x:H,y:z};else for(let H=b-1;H>=g.x;H--)yield{x:H,y:z}}break}case"HUMAN_SOFT_DITHER":{let l=new Set;for(let f=0;f<p;f++){let w=Math.floor(Math.random()*3)-1;if((f+w)%2===0)for(let c=0;c<o;c+=2)l.add(`${c},${f}`),yield{x:c,y:f};else for(let c=1;c<o;c+=2)l.add(`${c},${f}`),yield{x:c,y:f}}for(let f=0;f<p;f++)for(let w=0;w<o;w++){let g=`${w},${f}`;if(l.has(g))continue;yield{x:w,y:f}}break}case"HUMAN_PATCHY":{let l=new Set,f=o*p;while(l.size<f){let w=Math.floor(Math.random()*o),g=Math.floor(Math.random()*p),c=1+Math.floor(Math.random()*5);for(let b=g-c;b<=g+c;b++)for(let z=w-c;z<=w+c;z++){if(z<0||z>=o||b<0||b>=p)continue;if(Math.hypot(z-w,b-g)>c+Math.random()*1.2)continue;let M=`${z},${b}`;if(l.has(M))continue;l.add(M),yield{x:z,y:b}}}break}case"HUMAN_SWEEP_ARCS":{let l=new Set,f=(o-1)/2,w=(p-1)/2,g=Math.hypot(f,w);for(let c=0;c<4;c++){let b=Math.random()*Math.PI*2;for(let z=0;z<=g;z+=0.35){let M=Math.PI/2+Math.random()*(Math.PI/1.5),H=Math.max(10,Math.floor(z*8));for(let A=0;A<H;A++){let a=b+M*A/H+Math.sin(z)*0.08,D=Math.round(f+Math.cos(a)*z),U=Math.round(w+Math.sin(a)*z);if(D<0||D>=o||U<0||U>=p)continue;let J=`${D},${U}`;if(l.has(J))continue;l.add(J),yield{x:D,y:U}}}}for(let c=0;c<p;c++)for(let b=0;b<o;b++){let z=`${b},${c}`;if(l.has(z))continue;yield{x:b,y:c}}break}case"HUMAN_MICRO_CORRECTIONS":{let l=new Set;for(let f=0;f<p;f++){let w=f%2===0?1:-1,g=w>0?0:o-1;for(let c=0;c<o;c++){let b=g+(Math.random()>0.82?w:0),z=f+(Math.random()>0.9?1:0);for(let M of[{x:g,y:f},{x:b,y:f},{x:g,y:z}]){if(M.x<0||M.x>=o||M.y<0||M.y>=p)continue;let H=`${M.x},${M.y}`;if(l.has(H))continue;l.add(H),yield M}g+=w}}for(let f=0;f<p;f++)for(let w=0;w<o;w++){let g=`${w},${f}`;if(l.has(g))continue;yield{x:w,y:f}}break}case"HUMAN_JITTER_FILL":{let l=[];for(let f=0;f<p;f++)for(let w=0;w<o;w++)l.push({x:w,y:f});l.sort((f,w)=>{let g=f.y+(Math.random()-0.5)*1.8,c=w.y+(Math.random()-0.5)*1.8;if(g!==c)return g-c;return f.x+(Math.random()-0.5)*2-(w.x+(Math.random()-0.5)*2)}),yield*l;break}case"HUMAN_CORNER_BIAS":{let l=[{x:0,y:0},{x:o-1,y:0},{x:0,y:p-1},{x:o-1,y:p-1}],f=l[Math.floor(Math.random()*l.length)],w=[];for(let g=0;g<p;g++)for(let c=0;c<o;c++){let z=Math.hypot(c-f.x,g-f.y)+Math.random()*3.5;w.push({point:{x:c,y:g},score:z})}w.sort((g,c)=>g.score-c.score);for(let g of w)yield g.point;break}case"HUMAN_LONG_STROKES":{let l=new Set,f=o*p;while(l.size<f){let w=Math.floor(Math.random()*o),g=Math.floor(Math.random()*p),c=Math.random()*Math.PI*2,b=Math.sign(Math.cos(c)),z=Math.sign(Math.sin(c)),M=10+Math.floor(Math.random()*40);for(let H=0;H<M;H++){if(w<0||w>=o||g<0||g>=p)break;let A=`${w},${g}`;if(!l.has(A))l.add(A),yield{x:w,y:g};if(Math.random()>0.78)w+=z,g+=b;else w+=b,g+=z}}break}case"HUMAN_TAP_CLUSTERS":{let l=new Set,f=o*p;while(l.size<f){let w=Math.floor(Math.random()*o),g=Math.floor(Math.random()*p),c=3+Math.floor(Math.random()*10);for(let b=0;b<c;b++){let z=Math.round(w+(Math.random()-0.5)*6),M=Math.round(g+(Math.random()-0.5)*6);if(z<0||z>=o||M<0||M>=p)continue;let H=`${z},${M}`;if(l.has(H))continue;l.add(H),yield{x:z,y:M}}}break}case"HUMAN_MESSY_SPIRAL":{let l=new Set,f=(o-1)/2,w=(p-1)/2,g=Math.hypot(f,w)+2;for(let c=0;l.size<o*p;c++){let b=c/3,z=Math.min(g,b*0.18),M=b*0.29+Math.sin(b*0.13)*0.8,H=Math.round(f+Math.cos(M)*z+Math.sin(b)*0.7),A=Math.round(w+Math.sin(M)*z+Math.cos(b)*0.7);if(H<0||H>=o||A<0||A>=p){if(c>o*p*18)break;continue}let a=`${H},${A}`;if(l.has(a)){if(Math.random()>0.9)continue}else l.add(a),yield{x:H,y:A};if(c>o*p*18)break}for(let c=0;c<p;c++)for(let b=0;b<o;b++){let z=`${b},${c}`;if(l.has(z))continue;yield{x:b,y:c}}break}case"HUMAN_DRUNK_WALK":{let l=new Set,f=Math.floor(Math.random()*o),w=Math.floor(Math.random()*p),g=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(l.size<o*p){let c=`${f},${w}`;if(!l.has(c))l.add(c),yield{x:f,y:w};let b=[];for(let H of g){let A=f+H.x,a=w+H.y;if(A<0||A>=o||a<0||a>=p)continue;b.push({x:A,y:a})}if(!b.length)break;let z=b.filter((H)=>{return!l.has(`${H.x},${H.y}`)});if(z.length&&Math.random()>0.2){let H=z[Math.floor(Math.random()*z.length)];f=H.x,w=H.y;continue}let M=b[Math.floor(Math.random()*b.length)];f=M.x,w=M.y}for(let c=0;c<p;c++)for(let b=0;b<o;b++){let z=`${b},${c}`;if(l.has(z))continue;yield{x:b,y:c}}break}case"HUMAN_NOISE_CLOUD":{let l=[];for(let f=0;f<p;f++)for(let w=0;w<o;w++){let g=Math.sin((w+1)*0.93+Math.random()*0.8)+Math.cos((f+1)*1.17+Math.random()*0.8),c=(Math.random()-0.5)*2.6,b=Math.hypot(w-o/2,f-p/2)*0.08;l.push({point:{x:w,y:f},score:g+c+b})}l.sort((f,w)=>f.score-w.score);for(let f of l)yield f.point;break}case"HUMAN_PATCH_JUMP":{let l=new Set,f=[];for(let w=0;w<Math.max(6,o*p/18);w++)f.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});while(l.size<o*p){let w=f[Math.floor(Math.random()*f.length)],g=1+Math.floor(Math.random()*3),c=1+Math.floor(Math.random()*3);for(let b=w.y-c;b<=w.y+c;b++)for(let z=w.x-g;z<=w.x+g;z++){if(z<0||z>=o||b<0||b>=p)continue;if(Math.random()>0.86)continue;let M=`${z},${b}`;if(l.has(M))continue;l.add(M),yield{x:z,y:b}}if(Math.random()>0.72&&f.length<o*p/2)f.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});if(l.size>o*p*0.92)break}for(let w=0;w<p;w++)for(let g=0;g<o;g++){let c=`${g},${w}`;if(l.has(c))continue;yield{x:g,y:w}}break}case"DIAGONAL_BRUSH":{for(let l=0;l<o+p-1;l++){let f=l%2===0,w=[],g=Math.max(0,l-o+1),c=Math.min(p-1,l);for(let b=g;b<=c;b++){let z=l-b;if(z>=0&&z<o)w.push({x:z,y:b})}if(Math.random()>0.55)w.reverse();if(f)for(let b=w.length-1;b>=0;b--)yield w[b];else yield*w}break}case"BRUSH_STROKES":{let l=Array.from({length:p},()=>Array(o).fill(!1)),f=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],w=(b,z)=>b>=0&&b<o&&z>=0&&z<p,g=0,c=o*p;for(let b=0;b<c*6&&g<c;b++){let z=Math.floor(Math.random()*o),M=Math.floor(Math.random()*p),H=f[Math.floor(Math.random()*f.length)],A=3+Math.floor(Math.random()*16);for(let a=0;a<A;a++){if(!w(z,M))break;if(!l[M][z])l[M][z]=!0,g++,yield{x:z,y:M};if(Math.random()>0.72)H=f[Math.floor(Math.random()*f.length)];z+=H.x,M+=H.y}}for(let b=0;b<p;b++)for(let z=0;z<o;z++)if(!l[b][z])yield{x:z,y:b};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let l=new Set,f=o*p,w=Math.floor(o/2),g=Math.floor(p/2),c=[[1,0],[0,1],[-1,0],[0,-1]],b=0,z=1,M=(A,a)=>A>=0&&A<o&&a>=0&&a<p,H=function*(){let A=0;while(A<f){for(let a=0;a<2;a++){for(let D=0;D<z;D++){if(M(w,g)){let U=`${w},${g}`;if(!l.has(U)){if(l.add(U),yield{x:w,y:g},A++,A>=f)return}}w+=c[b][0],g+=c[b][1]}b=(b+1)%4}z++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*H();else{let A=[...H()];for(let a=A.length-1;a>=0;a--)yield A[a]}break}case"SCRIBBLE":{let l=new Set,f=o*p,w=Math.floor(o/2),g=Math.floor(p/2);for(let c=0;l.size<f&&c<f*24;c++){let b=`${w},${g}`;if(!l.has(b))l.add(b),yield{x:w,y:g};if(w+=Math.floor(Math.random()*3)-1,g+=Math.floor(Math.random()*3)-1,w<0||w>=o||g<0||g>=p)w=Math.floor(Math.random()*o),g=Math.floor(Math.random()*p)}for(let c=0;c<p;c++)for(let b=0;b<o;b++){let z=`${b},${c}`;if(l.has(z))continue;l.add(z),yield{x:b,y:c}}break}case"CROSSHATCH":{let l=[];for(let g=0;g<o+p-1;g++)for(let c=Math.max(0,g-o+1);c<=Math.min(p-1,g);c++){let b=g-c;l.push({x:b,y:c})}let f=[];for(let g=-p+1;g<o;g++)for(let c=0;c<p;c++){let b=c+g;if(b>=0&&b<o)f.push({x:b,y:c})}let w=new Set;for(let g of[...l,...f]){let c=`${g.x},${g.y}`;if(w.has(c))continue;w.add(c),yield g}break}case"WAVE_SWEEP":{let l=new Set;for(let f=0;f<o;f++){let g=(Math.sin(f/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(p-1)|0;for(let c=0;c<p;c++){let b=g+c,z=g-c;for(let M of[b,z]){if(M<0||M>=p)continue;let H=`${f},${M}`;if(l.has(H))continue;l.add(H),yield{x:f,y:M}}}}break}case"SCATTERED_LINES":{let l=new Set,f=o*p;for(let w=0;l.size<f&&w<f*14;w++){let g=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),b=Math.random()*Math.PI*2,z=Math.round(Math.cos(b)),M=Math.round(Math.sin(b)),H=6+Math.floor(Math.random()*28);for(let A=0;A<H;A++){if(g<0||g>=o||c<0||c>=p)break;let a=`${g},${c}`;if(!l.has(a))l.add(a),yield{x:g,y:c};g+=z,c+=M}}for(let w=0;w<p;w++)for(let g=0;g<o;g++){let c=`${g},${w}`;if(l.has(c))continue;l.add(c),yield{x:g,y:w}}break}case"CONTOUR_JITTER":{let l=new Set;for(let f=0;f<Math.ceil(Math.min(o,p)/2);f++){let w=[],g=f,c=f,b=o-f-1,z=p-f-1;for(let M=g;M<=b;M++)w.push({x:M,y:c});for(let M=c+1;M<=z;M++)w.push({x:b,y:M});for(let M=b-1;M>=g;M--)w.push({x:M,y:z});for(let M=z-1;M>c;M--)w.push({x:g,y:M});for(let M=w.length-1;M>0;M--){let H=Math.floor(Math.random()*(M+1)),A=w[M];w[M]=w[H],w[H]=A}for(let M of w){let H=`${M.x},${M.y}`;if(l.has(H))continue;l.add(H),yield M}}break}case"SPIRAL_WOBBLE":{let l=new Set,f=o/2,w=p/2,g=Math.hypot(f,w);for(let c=0;l.size<o*p&&c<o*p*9;c++){let b=c/(o*p*9)*g,z=c*0.31+Math.sin(c*0.07)*0.7,M=Math.round(f+Math.cos(z)*b),H=Math.round(w+Math.sin(z)*b);if(M<0||M>=o||H<0||H>=p)continue;let A=`${M},${H}`;if(l.has(A))continue;l.add(A),yield{x:M,y:H}}for(let c=0;c<p;c++)for(let b=0;b<o;b++){let z=`${b},${c}`;if(l.has(z))continue;yield{x:b,y:c}}break}case"CLUSTER_BURSTS":{let l=new Set,f=o*p;for(let w=0;l.size<f&&w<f*12;w++){let g=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),b=2+Math.floor(Math.random()*10);for(let z=c-b;z<=c+b;z++)for(let M=g-b;M<=g+b;M++){if(M<0||M>=o||z<0||z>=p)continue;if(Math.hypot(M-g,z-c)>b)continue;let H=`${M},${z}`;if(l.has(H))continue;l.add(H),yield{x:M,y:z}}}for(let w=0;w<p;w++)for(let g=0;g<o;g++){let c=`${g},${w}`;if(l.has(c))continue;l.add(c),yield{x:g,y:w}}break}case"ORBITAL":{let l=new Set,f=(o-1)/2,w=(p-1)/2,g=Math.ceil(Math.max(f,w));for(let c=0;c<=g;c++){let b=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,c)*2));for(let z=0;z<b;z++){let M=z/b*Math.PI*2+(c%2?0.3:-0.3),H=Math.round(f+Math.cos(M)*c),A=Math.round(w+Math.sin(M)*c);if(H<0||H>=o||A<0||A>=p)continue;let a=`${H},${A}`;if(l.has(a))continue;l.add(a),yield{x:H,y:A}}}for(let c=0;c<p;c++)for(let b=0;b<o;b++){let z=`${b},${c}`;if(l.has(z))continue;yield{x:b,y:c}}break}case"FLOW_FIELD":{let l=new Set,f=o*p;for(let w=0;l.size<f&&w<f*18;w++){let g=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p);for(let b=0;b<120;b++){if(g<0||g>=o||c<0||c>=p)break;let z=`${g},${c}`;if(!l.has(z))l.add(z),yield{x:g,y:c};let M=Math.sin(g*0.09)*1.8+Math.cos(c*0.08)*1.6+Math.sin((g+c)*0.05);g+=Math.round(Math.cos(M)),c+=Math.round(Math.sin(M))}}for(let w=0;w<p;w++)for(let g=0;g<o;g++){let c=`${g},${w}`;if(l.has(c))continue;l.add(c),yield{x:g,y:w}}break}case"EDGE_IN":{let l=new Set,f=Math.ceil(Math.min(o,p)/2);for(let w=0;w<f;w++){let g=w,c=o-1-w,b=w,z=p-1-w;for(let M=g;M<=c;M++)for(let H of[b,z]){let A=`${M},${H}`;if(l.has(A))continue;l.add(A),yield{x:M,y:H}}for(let M=b+1;M<=z-1;M++)for(let H of[g,c]){let A=`${H},${M}`;if(l.has(A))continue;l.add(A),yield{x:H,y:M}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),B(this.bot)}move(o){if(!this.moveInfo)return;let p=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),l=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=p+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-p)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,p+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=l+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-l)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,l+this.moveInfo.height);this.update(),B(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let p=o.target;if(p.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(p.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(p.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(p.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${x}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var D0=`/* stylelint-disable declaration-no-important */
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
  gap: 12px;
  padding: 16px 12px 12px 66px;
  border-bottom: var(--border) 1px solid;
  background-color: #0f1424;
  color: var(--text-invert);
  font-weight: 700;
  font-size: 18px;
  text-align: left;
}

.wwidget .widget-logo {
  object-fit: contain;
  width: 52px;
  height: auto;
  border-radius: 14px;
  filter: drop-shadow(0 8px 14px rgb(0 0 0 / 35%))
    drop-shadow(0 0 14px rgb(125 145 255 / 35%));
  animation: logo-float 3.6s ease-in-out infinite;
}

.wwidget .widget-brand {
  display: flex;
  gap: 10px;
  align-items: center;
}

.wwidget .widget-brand-text {
  position: relative;
  color: #e8ecff;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.4px;
  text-shadow:
    0 0 12px rgb(109 123 255 / 35%),
    0 0 26px rgb(87 189 255 / 22%);
}

.wwidget .widget-brand-text::after {
  content: '';
  position: absolute;
  right: -8px;
  bottom: -2px;
  width: 46px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, #6d7bff, #8fd8ff);
  box-shadow: 0 0 10px rgb(143 216 255 / 55%);
}

@keyframes logo-float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(-2px) scale(1.02);
  }
}

.wwidget .widget-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 4px;
  padding-top: 10px;
  border-top: 1px solid rgb(143 162 255 / 20%);
}

.wwidget .widget-actions strong {
  color: #c1cdf3;
  font-size: 11px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.wwidget .widget-actions button {
  width: 100%;
  min-height: 34px;
  padding: 7px 10px;
  border: var(--border) 1px solid;
  border-radius: 8px;
  background: #1a2032;
  color: var(--text);
  font-weight: 600;
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
  top: 14px;
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

.wform .strategy-row {
  align-items: stretch;
}

.wform .strategy-controls {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  align-items: center;
  width: 100%;
}

.wform .strategy-controls .open-preview {
  min-width: 86px;
  padding: 8px 10px;
  font-size: 11px;
  white-space: nowrap;
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

.kgm-modal {
  margin: auto;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #0f1526;
  color: var(--text);
  box-shadow: 0 22px 40px rgb(2 6 23 / 55%);
}

.kgm-modal::backdrop {
  background: rgb(0 0 0 / 55%);
}

.kgm-modal-head {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.wimage .colors-dialog {
  overflow: auto;
  width: min(560px, 92vw);
  min-width: min(320px, 92vw);
  max-height: min(85dvh, 680px);
  padding: 12px;
  resize: both;
}

.wimage .colors-dialog-head {
  cursor: move;
  user-select: none;
}

.wimage .close-colors {
  min-width: 72px;
}

.wimage .modal-close {
  min-width: 72px;
  padding: 6px 10px;
  border: 1px solid #56608a;
  border-radius: 8px;
  background: #212c49;
  color: #f0f4ff;
  font-weight: 600;
}

.wimage .preview-dialog {
  overflow: auto;
  width: min(760px, 94vw);
  min-width: min(330px, 92vw);
  max-height: min(86dvh, 720px);
  padding: 12px;
}

.wimage .preview-dialog-help {
  margin: 0 0 10px;
  color: #b4bfdc;
  font-size: 12px;
}

.wimage .preview-dialog-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  overflow: auto;
  max-height: min(70dvh, 600px);
  padding-right: 2px;
}

.wimage .preview-card {
  display: grid;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #131c30;
}

.wimage .preview-card strong {
  color: #dce6ff;
  font-size: 12px;
}

.wimage .preview-canvas {
  width: 100%;
  height: auto;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 8px;
  image-rendering: pixelated;
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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 8px;
  overflow: auto;
  max-height: min(62dvh, 520px);
  padding-right: 2px;
}

.access-dialog {
  width: min(440px, 92vw);
  padding: 14px;
}

.access-form {
  display: grid;
  gap: 10px;
}

.access-label {
  display: grid;
  gap: 6px;
  font-size: 12px;
}

.access-input,
.access-locale,
.access-submit {
  min-height: 38px;
}

.access-submit {
  border: 1px solid #5c6bc9;
  border-radius: 8px;
  background: #233155;
  color: #edf2ff;
  font-weight: 600;
}

.access-error {
  min-height: 18px;
  color: #ff9bb0;
}

.wimage .color-chip {
  display: grid;
  grid-template-columns: auto 18px 1fr auto auto auto;
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

.wimage .color-chip .drag {
  color: #8da1e5;
  font-size: 12px;
  cursor: grab;
  user-select: none;
}

.wimage .color-chip.dragging {
  border-style: dashed;
  opacity: 0.45;
}

.wimage .color-chip.drag-target {
  border-color: #8fa2ff;
  box-shadow: 0 0 0 1px rgb(143 162 255 / 45%);
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

  .wimage .colors-dialog-list {
    grid-template-columns: 1fr;
  }

  .wimage .preview-dialog-list {
    grid-template-columns: 1fr;
  }
}
`;class p0 extends Error{name="KGlacerMacroError";constructor(o,p){super(o);p.widget.status=o}}class c0 extends p0{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var q={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0}};function P(o,p){return o.key.toLowerCase()===p.key&&o.shiftKey===Boolean(p.shift)&&o.ctrlKey===Boolean(p.ctrl)&&o.altKey===Boolean(p.alt)}function Y0(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let p=o.tagName.toLowerCase();return p==="input"||p==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var Z0=`<button class="wopen-button" aria-label="Toggle widget">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16"/>
  </svg>
</button>
<div class="title">
  <div class="widget-brand">
    <img class="widget-logo" src="" alt="KGlacer Macro logo" />
    <span class="widget-brand-text">KGlacer</span>
  </div>
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
      >Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image</span
    >
  </div>
  <label><span data-i18n="strategy">Strategy</span>:&nbsp;<select class="strategy">
    <option value="SEQUENTIAL" selected data-i18n="sequential">Sequential</option>
    <option value="ALL" data-i18n="all">All</option>
    <option value="PERCENTAGE" data-i18n="percentage">Percentage</option>
  </select></label>
  <div class="widget-actions">
    <strong data-i18n="overlaySection">Overlay</strong>
    <button class="toggle-overlay" data-i18n="toggleOverlay">Hide/show overlays</button>
  </div>
  <div class="images"></div>
  <button class="add-image" disabled data-i18n="addImage">Add image</button>
</div>
`;var j0="kglacer-macro:overlay-hidden",k0="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class b0 extends n{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$shortcuts;$locale;$topbar;$draw;$addImage;$toggleOverlay;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=Z0,W(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$shortcuts:".shortcuts",$locale:".locale",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$toggleOverlay:".toggle-overlay",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=k0,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=d(),this.$locale.addEventListener("change",()=>{o0(this.$locale.value),W(this.element);for(let p=0;p<this.bot.images.length;p++)this.bot.images[p].applyLocale();this.refreshOverlayToggleText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run("Adding image",async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${x}`,o.click(),await R(o,["change"],["cancel","error"]);let p=o.files?.[0];if(!p)throw new c0(this.bot);console.log("[KGM][Widget] File selected",{name:p.name,size:p.size,type:p.type});let l;if(p.name.endsWith(`.${x}`))l=await _.fromJSON(this.bot,JSON.parse(await p.text()));else{let f=new FileReader;f.readAsDataURL(p),await R(f,["load"],["error"]);let w=await this.compressImageBeforeLoad(f.result),g=new Image;g.src=w,await R(g,["load"],["error"]),l=new _(this.bot,j.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new X(this.bot,g))}this.bot.images.push(l),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),l.updateTasks(),B(this.bot,!0),console.log("[KGM][Widget] Image persisted, reloading page"),document.location.reload()},()=>{this.setDisabled("add-image",!1)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let p=new Image;if(p.src=o,await R(p,["load"],["error"]),!(p.naturalWidth*p.naturalHeight>3000000||o.length>3000000))return o;let f=document.createElement("canvas");f.width=p.naturalWidth,f.height=p.naturalHeight;let w=f.getContext("2d");if(!w)return o;return w.drawImage(p,0,0),f.toDataURL("image/png")}update(){this.$strategy.value=this.bot.strategy;let o=0,p=0;for(let g=0;g<this.bot.images.length;g++){let c=this.bot.images[g];o+=c.pixels.pixels.length*c.pixels.pixels[0].length,p+=c.tasks.length}let l=o-p,f=l/o*100|0;this.$progressText.textContent=`${l}/${o} ${f}% ETA: ${p/120|0}h`,this.$progressLine.style.transform=`scaleX(${f}%)`,this.$images.innerHTML="";let w=document.createDocumentFragment();for(let g=0;g<this.bot.images.length;g++){let c=this.bot.images[g],b=document.createElement("div");w.append(b),b.className="image",b.innerHTML=`<button class="preview" title="View preview">
  <img src="${c.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="settings" title="Show colors">⚙</button>
    <button class="up" title="Move up" ${g===0?"disabled":""}>▴</button>
    <button class="down" title="Move down" ${g===this.bot.images.length-1?"disabled":""}>▾</button>
  </div>`,b.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=g,c.openPreviewPanel()}),b.querySelector(".settings").addEventListener("click",()=>{this.activeImageIndex=g,c.openColorPanel()}),b.querySelector(".up").addEventListener("click",()=>{f0(this.bot.images,g,g-1),this.update(),B(this.bot)}),b.querySelector(".down").addEventListener("click",()=>{f0(this.bot.images,g,g+1),this.update(),B(this.bot)})}this.$images.append(w)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(j0)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let p=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",p),localStorage.setItem(j0,String(p)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${u("toggleOverlay")} (${u("disabled")})`:`${u("toggleOverlay")} (${u("enabled")})`}setDisabled(o,p){this.element.querySelector("."+o).disabled=p}async run(o,p,l,f="..."){console.log("[KGM][Widget] Task started",{status:o});let w=this.status;this.status=`${f} ${o}`;try{let g=await p();return this.status=w,console.log("[KGM][Widget] Task completed",{status:o}),g}catch(g){if(!(g instanceof p0))console.error(g),this.status=`Error: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:g}),g}finally{await l?.()}}handleKeyboard(o){if(Y0(o.target))return;if(P(o,q.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(P(o,q.showShortcuts)){o.preventDefault(),this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(P(o,q.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(P(o,q.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(P(o,q.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(P(o,q.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(P(o,q.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(P(o,q.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(P(o,q.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),B(this.bot)}}var $0=2,q0="[KGM]",P0="kglacer-macro:access-ok",z0="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz";class F0{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];widget=new b0(this);markerPixelPositionResolvers=[];lastColor;log(o,p){if(p===void 0)console.log(`${q0} ${o}`);else console.log(`${q0} ${o}`,p)}constructor(){this.log("Boot sequence started");let o=N0();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let l=0;l<o.images.length;l++){let f=o.images[l];y({x:f.position[0]-1000,y:f.position[1]-1000}),y({x:f.position[0]+1000,y:f.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let p=document.createElement("style");p.textContent=D0.replace("FAKE_FAVORITE_LOCATIONS",v.length.toString()),document.head.append(p),this.log("Styles injected",{fakeFavoriteLocations:v.length}),this.widget.run("Initializing",async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let l=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((f)=>{for(let w=0;w<f.length;w++)if(f[w].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(l,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await F(500),await this.updateColors(),o)for(let f=0;f<o.images.length;f++){let w=await _.fromJSON(this,o.images[f]);this.images.push(w),w.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.log("Initialization completed; controls enabled")})}async ensureAccessKey(){if(localStorage.getItem(P0)===z0)return;await new Promise((o)=>{let p=document.createElement("dialog");p.className="kgm-modal access-dialog",p.innerHTML=`<form method="dialog" class="access-form">
  <div class="kgm-modal-head">
    <strong data-i18n="accessTitle">Access key</strong>
  </div>
  <p data-i18n="accessHelp">Enter your serial key to continue.</p>
  <label class="access-label">
    <span data-i18n="accessInputLabel">Serial key</span>
    <input class="access-input" type="password" required data-i18n-placeholder="accessInputPlaceholder" placeholder="KGM-********" />
  </label>
  <label class="access-label">
    <span data-i18n="language">Language</span>
    <select class="access-locale"></select>
  </label>
  <button type="submit" class="access-submit" data-i18n="accessContinue">Continue</button>
  <small class="access-error" role="alert" aria-live="assertive"></small>
</form>`,document.body.append(p),W(p);let l=p.querySelector(".access-input"),f=p.querySelector(".access-error"),w=p.querySelector(".access-locale");w.innerHTML=J0().map((g)=>`<option value="${g}" ${g===d()?"selected":""}>${g.toUpperCase()}</option>`).join(""),w.addEventListener("change",()=>{o0(w.value),W(p)}),p.addEventListener("cancel",(g)=>{g.preventDefault()}),p.querySelector("form").addEventListener("submit",(g)=>{g.preventDefault();let c=atob(z0);if(l.value.trim()!==c){f.textContent=u("invalidAccessKey");return}localStorage.setItem(P0,z0),p.close(),p.remove(),o()}),p.showModal(),l.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),p=(l)=>{if(!l.shiftKey)l.stopPropagation()};return this.widget.run("Drawing",async()=>{await this.widget.run("Initializing draw",()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",p,!0),o.addEventListener("wheel",p,!0),this.updateTasks();let l=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((g)=>g.json()),f=Math.floor(l.charges.count);this.log("Charges fetched",{charges:f});let w=0;for(let g=0;g<this.images.length;g++)w+=this.images[g].tasks.length;switch(this.log("Tasks prepared",{tasks:w}),this.strategy){case"ALL":{while(f>0){let g=!0;for(let c=0;c<this.images.length;c++){let b=this.images[c].tasks.shift();if(!b)continue;this.drawTask(b),f--,await F(1),g=!1}if(g)break}break}case"PERCENTAGE":{for(let g=0;g<w&&f>0;g++){let c=1,b;for(let z=0;z<this.images.length;z++){let M=this.images[z],H=1-M.tasks.length/(M.pixels.pixels.length*M.pixels.pixels[0].length);if(H<c)c=H,b=M}this.drawTask(b.tasks.shift()),f--,await F(1)}break}case"SEQUENTIAL":for(let g=0;g<this.images.length;g++){let c=this.images[g];for(let b=c.tasks.shift();b&&f>0;b=c.tasks.shift())this.drawTask(b),f--,await F(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:f})},()=>{globalThis.removeEventListener("mousemove",p,!0),o.removeEventListener("wheel",p,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:$0,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let p=document.querySelector(".maplibregl-canvas"),l=window.innerWidth/2,f=window.innerHeight/2,w=l-o.x,g=f-o.y;function c(b,z,M){p.dispatchEvent(new MouseEvent(b,{bubbles:!0,cancelable:!0,clientX:z,clientY:M,buttons:1}))}c("mousedown",l,f),c("mousemove",w,g),c("mouseup",w,g)}readMap(){this.mapsCache.clear();let o=new Set;for(let l=0;l<this.images.length;l++){let f=this.images[l],{tileX:w,tileY:g}=new j(this,f.position.globalX+f.pixels.pixels[0].length,f.position.globalY+f.pixels.pixels.length);for(let c=f.position.tileX;c<=w;c++)for(let b=f.position.tileY;b<=g;b++)o.add(`${c}/${b}`)}let p=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`Reading map [0/${o.size}]`,()=>Promise.all([...o].map(async(l)=>{this.mapsCache.set(l,await X.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${l}.png`,exactColor:!0})),this.widget.status=`⌛ Reading map [${++p}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let p=0,l=1,f=1/0,w=1/0;for(let b=0;b<this.$stars.length;b++){let{x:z,y:M}=E(this.$stars[b]);if(z<o.x&&M<o.y){let H=o.x-z+(o.y-M);if(H<f)f=H,p=b}else if(z>o.x&&M>o.y){let H=z-o.x+(M-o.y);if(H<w)w=H,l=b}}let g=E(this.$stars[p]),c=V[p];return{anchorScreenPosition:g,anchorWorldPosition:c,pixelSize:(E(this.$stars[l]).x-g.x)/(V[l].x-c.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await F(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await F(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await F(1)}drawTask(o){if(this.lastColor!==o.color)document.getElementById("color-"+o.color).click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color});let p=o.position.pixelSize/2,l=o.position.toScreenPosition();document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:l.x+p,clientY:l.y+p,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let o=globalThis.fetch,p=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(l,f)=>{let w=await o(l,f),g=w.clone(),c="";if(typeof l=="string")c=l;else if(l instanceof Request)c=l.url;else if(l instanceof URL)c=l.href;if(w.url==="https://backend.wplace.live/me")this.me=await g.json(),this.me.favoriteLocations.unshift(...v),this.me.maxFavoriteLocations=1/0,w.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let b=p.exec(c);if(b){for(let z=0;z<this.markerPixelPositionResolvers.length;z++)this.markerPixelPositionResolvers[z](new j(this,+b[1],+b[2],+b[3],+b[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return w}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await F(1)}waitForElement(o,p){return this.log("Waiting for element",{name:o,selector:p}),this.widget.run(`Waiting for ${o}`,()=>{return new Promise((l)=>{let f=document.querySelector(p);if(f){l(f);return}let w=new MutationObserver(()=>{let g=document.querySelector(p);if(g)w.disconnect(),l(g)});w.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,v.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new F0;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
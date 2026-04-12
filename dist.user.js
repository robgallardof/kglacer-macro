// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      2.1.2
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
function o0(o,p,l){let f=o[l];return o[l]=o[p],o[p]=f,o}function p0(o,p){let l=o.indexOf(p);if(l!==-1)o.splice(l,1);return l}var lo=Math.floor(Math.random()*65536),fo=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function j(o){return new Promise((p)=>setTimeout(p,o))}function q(o,p,l=["error"],f="addEventListener"){return new Promise((g,w)=>{for(let a=0;a<p.length;a++)o[f]?.(p[a],g);for(let a=0;a<l.length;a++)o[f]?.(l[a],w)})}class R0{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,p=15000){this.size=o,this.historyTime=p}push(o){if(o<0)throw new Error("Negative chunk size");let{time:p,historyTime:l}=this.getTime();if(this.history.push({time:p,chunk:o}),this.history[0]&&this.history[0].time+l<p)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((p,l)=>p+l.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),p=o-this.startTime,l=Math.min(p,this.historyTime);return{time:o,historyTime:l}}}var z0=["kglacermacro:locale"],I={en:{widgetTitle:"KGlacerMacro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",random:"Random",humanized:"Humanized",humanSoftDither:"Human soft dither",humanPatchy:"Human patchy",humanSweepArcs:"Human sweep arcs",humanMicroCorrections:"Human micro corrections",humanJitterFill:"Human jitter fill",humanCornerBias:"Human corner bias",humanLongStrokes:"Human long strokes",humanTapClusters:"Human tap clusters",humanMessySpiral:"Human messy spiral",humanDrunkWalk:"Human drunk walk",humanNoiseCloud:"Human noise cloud",humanPatchJump:"Human patch jump",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of all paint modes using the KGlacer logo as the base preview image.",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again."},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",random:"Aleatorio",humanized:"Humanizado",humanSoftDither:"Difuminado humano suave",humanPatchy:"Parches humanos",humanSweepArcs:"Barridos humanos en arco",humanMicroCorrections:"Micro correcciones humanas",humanJitterFill:"Relleno humano con jitter",humanCornerBias:"Sesgo humano por esquina",humanLongStrokes:"Trazos humanos largos",humanTapClusters:"Toques humanos por grupos",humanMessySpiral:"Espiral humana irregular",humanDrunkWalk:"Caminata humana errática",humanNoiseCloud:"Nube humana de ruido",humanPatchJump:"Saltos humanos por parches",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada de todos los modos de pintado usando el logo de KGlacer como imagen base.",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Overlay",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo."}};function L0(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function _(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in I)return o;for(let p=0;p<z0.length;p++){let l=localStorage.getItem(z0[p]);if(!l||!(l in I))continue;return localStorage.setItem("kglacer-macro:locale",l),l}return L0()}function v(o){localStorage.setItem("kglacer-macro:locale",o)}function H0(){return Object.keys(I)}function H(o){let p=_();return I[p][o]}function B(o){for(let p of o.querySelectorAll("[data-i18n]"))p.textContent=H(p.dataset.i18n);for(let p of o.querySelectorAll("[data-i18n-title]"))p.setAttribute("title",H(p.dataset.i18nTitle));for(let p of o.querySelectorAll("[data-i18n-aria-label]"))p.setAttribute("aria-label",H(p.dataset.i18nAriaLabel));for(let p of o.querySelectorAll("[data-i18n-placeholder]"))p.setAttribute("placeholder",H(p.dataset.i18nPlaceholder))}class T{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,p){for(let l in p)this[l]=o.querySelector(p[l])}registerEvent(o,p,l,f={}){f.passive??=!0,o.addEventListener(p,l,f),this.runOnDestroy.push(()=>{o.removeEventListener(p,l)})}}function l0(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function s0(o,p,l){let f=l0(o/255),g=l0(p/255),w=l0(l/255),a=Math.cbrt(0.4122214708*f+0.5363325363*g+0.0514459929*w),b=Math.cbrt(0.2119034982*f+0.6806995451*g+0.1073969566*w),c=Math.cbrt(0.0883024619*f+0.2817188376*g+0.6299787005*w),r=0.2104542553*a+0.793617785*b-0.0040720468*c,u=1.9779984951*a-2.428592205*b+0.4505937099*c,z=0.0259040371*a+0.7827717662*b-0.808675766*c;return[r,u,z]}function M0(o,p,l){let[f,g,w]=o,[a,b,c]=p,r=(e)=>e*180/Math.PI,u=(e)=>e*Math.PI/180,z=1,s=1,A=1,J=Math.sqrt(g**2+w**2),G=Math.sqrt(b**2+c**2),N=(J+G)/2,K=0.5*(1-Math.sqrt(N**7/(N**7+6103515625))),n=g*(1+K),x=b*(1+K),k=Math.sqrt(n**2+w**2),$=Math.sqrt(x**2+c**2),y=w===0&&n===0?0:r(Math.atan2(w,n))%360,t=c===0&&x===0?0:r(Math.atan2(c,x))%360,a0=a-f,b0=$-k,R=0;if(k*$!==0){if(R=t-y,R>180)R-=360;else if(R<-180)R+=360}let c0=2*Math.sqrt(k*$)*Math.sin(u(R)/2),r0=(f+a)/2,h=(k+$)/2,L=(y+t)/2;if(Math.abs(y-t)>180)L+=180;let q0=1-0.17*Math.cos(u(L-30))+0.24*Math.cos(u(2*L))+0.32*Math.cos(u(3*L+6))-0.2*Math.cos(u(4*L-63)),W0=1+0.015*(r0-50)**2/Math.sqrt(20+(r0-50)**2),M=1+0.045*h,u0=1+0.015*h*q0,F0=30*Math.exp((-((L-275)/25))**2),X0=-(2*Math.sqrt(h**7/(h**7+6103515625)))*Math.sin(u(2*F0));return Math.sqrt((a0/(1*W0))**2+(b0/(1*M))**2+(c0/(1*u0))**2+X0*(b0/(1*M))*(c0/(1*u0)))-a0*l}var W=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],F=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function A0(o){if(o===0)return"transparent";let p=W[o];return`oklab(${p[0]*100}% ${p[1]} ${p[2]})`}var J0=`<div class="wtopbar">
  <button
    class="open-colors"
    type="button"
    data-i18n-title="openColorPanel"
    data-i18n-aria-label="openColorPanel"
  >
    <i class="icon fa-solid fa-palette" aria-hidden="true"></i>
  </button>
  <button class="export" data-i18n-title="exportImage" data-i18n-aria-label="exportImage">
    <i class="icon fa-solid fa-download" aria-hidden="true"></i>
  </button>
  <button class="lock" data-i18n-title="lockImage" data-i18n-aria-label="lockImage">
    <i class="icon icon-lock-open fa-solid fa-lock-open" aria-hidden="true"></i>
    <i class="icon icon-lock-closed fa-solid fa-lock" aria-hidden="true"></i>
  </button>
  <button class="delete" data-i18n-title="deleteImage" data-i18n-aria-label="deleteImage">
    <i class="icon fa-solid fa-trash" aria-hidden="true"></i>
  </button>
</div>
<div class="wrapper">
  <div class="wform">
    <div class="wprogress">
      <div></div>
      <span></span>
    </div>
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
      <button
        class="modal-close close-colors"
        type="button"
        aria-label="Close"
        data-i18n-aria-label="close"
      >
        <i class="icon fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
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
      <button
        class="modal-close close-preview"
        type="button"
        aria-label="Close"
        data-i18n-aria-label="close"
      >
        <i class="icon fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
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
`;class P{bot;image;width;brightness;exactColor;static async fromJSON(o,p){let l=new Image;return l.src=p.url.startsWith("http")?await fetch(p.url,{cache:"no-store"}).then((f)=>f.blob()).then((f)=>URL.createObjectURL(f)):p.url,await q(l,["load"],["error"]),new P(o,l,p.width,p.brightness,p.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,p,l=p.naturalWidth,f=0,g=!1){this.bot=o;this.image=p;this.width=l;this.brightness=f;this.exactColor=g;if(g)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let l=1;l<64;l++)if(this.exactColor||!this.bot.unavailableColors.has(l))o.set(F[l],[l,l]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let p=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let l=0;l<this.canvas.height;l++)for(let f=0;f<this.canvas.width;f++){let g=(l*this.canvas.width+f)*4,w=p[g],a=p[g+1],b=p[g+2],c=p[g+3],r=`${w},${a},${b}`;if(this.exactColor){this.pixels[l][f]=c<100?0:F.indexOf(r);continue}let u,z;if(c<100)u=z=0;else if(o.has(r))[u,z]=o.get(r);else{let A=1/0,J=1/0;for(let G=0;G<W.length;G++){let N=W[G],K=M0(s0(w,a,b),N,this.brightness);if(!this.bot.unavailableColors.has(G)&&K<A)A=K,u=G;if(K<J)J=K,z=G}o.set(r,[u,z])}if(u!==0)this.context.fillStyle=`oklab(${W[u][0]*100}% ${W[u][1]} ${W[u][2]})`,this.context.fillRect(f,l,1,1);this.pixels[l][f]=u;let s=this.colors.get(z);if(s)s.amount++;else this.colors.set(z,{color:u,amount:1,realColor:z})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor}}}var d="kglacer-macro-settings",G0=["kglacermacro","wbot"],S="kgm";function C0(){let o=[d,...G0];for(let p=0;p<o.length;p++){let l=o[p],f=localStorage.getItem(l);if(!f)continue;return{json:f,key:l}}return}function K0(){let o=C0();if(!o)return;let p;try{if(p=JSON.parse(o.json),typeof p!=="object")throw new Error("NOT VALID SAVE");if(p.version===1){let l=p;p.images=l.widget.images,p.strategy=l.widget.strategy,delete l.widget}if(o.key!==d)localStorage.setItem(d,o.json)}catch{localStorage.removeItem(o.key),p=void 0}return p}var m0;function m(o,p=!1){if(clearTimeout(m0),p)localStorage.setItem(d,JSON.stringify(o));else m0=setTimeout(()=>{localStorage.setItem(d,JSON.stringify(o))},600)}var Q=1000,E0=2048,C=Q*E0,Z=[],E=[],_0=Date.now();function O(o){Z.push(o),E.push({id:_0++,latitude:(2*Math.atan(Math.exp(-(o.y/C*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/C*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}O({x:C/3|0,y:C/3|0});O({x:C/3*2|0,y:C/3*2|0});function X(o){let[p,l]=o.style.transform.slice(32,-31).split(", ").map((f)=>Number.parseFloat(f));return{x:p,y:l}}class U{bot;static fromJSON(o,p){return new U(o,...p)}static fromScreenPosition(o,p){let{anchorScreenPosition:l,pixelSize:f,anchorWorldPosition:g}=o.findAnchorsForScreen(p);return new U(o,g.x+(p.x-l.x)/f|0,g.y+(p.y-l.y)/f|0)}globalX=0;globalY=0;get tileX(){return this.globalX/Q|0}set tileX(o){this.globalX=o*Q+this.x}get tileY(){return this.globalY/Q|0}set tileY(o){this.globalY=o*Q+this.y}get x(){return this.globalX%Q}set x(o){this.globalX=this.tileX*Q+o}get y(){return this.globalY%Q}set y(o){this.globalY=this.tileY*Q+o}anchor1Index;anchor2Index;get pixelSize(){return(X(this.bot.$stars[this.anchor2Index]).x-X(this.bot.$stars[this.anchor1Index]).x)/(Z[this.anchor2Index].x-Z[this.anchor1Index].x)}constructor(o,p,l,f,g){this.bot=o;if(f===void 0||g===void 0)this.globalX=p,this.globalY=l;else this.globalX=p*Q+f,this.globalY=l*Q+g;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,p=1/0;for(let l=0;l<Z.length;l++){let{x:f,y:g}=Z[l];if(f<this.globalX&&g<this.globalY){let w=this.globalX-f+(this.globalY-g);if(w<o)o=w,this.anchor1Index=l}else if(f>this.globalX&&g>this.globalY){let w=f-this.globalX+(g-this.globalY);if(w<p)p=w,this.anchor2Index=l}}}toScreenPosition(){let o=Z[this.anchor1Index],p=X(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+p.x,y:(this.globalY-o.y)*this.pixelSize+p.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:p}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:p-window.innerHeight/3})}clone(){return new U(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}var T0="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg",Q0;((M)=>{M.RANDOM="RANDOM";M.HUMANIZED="HUMANIZED";M.HUMAN_SOFT_DITHER="HUMAN_SOFT_DITHER";M.HUMAN_PATCHY="HUMAN_PATCHY";M.HUMAN_SWEEP_ARCS="HUMAN_SWEEP_ARCS";M.HUMAN_MICRO_CORRECTIONS="HUMAN_MICRO_CORRECTIONS";M.HUMAN_JITTER_FILL="HUMAN_JITTER_FILL";M.HUMAN_CORNER_BIAS="HUMAN_CORNER_BIAS";M.HUMAN_LONG_STROKES="HUMAN_LONG_STROKES";M.HUMAN_TAP_CLUSTERS="HUMAN_TAP_CLUSTERS";M.HUMAN_MESSY_SPIRAL="HUMAN_MESSY_SPIRAL";M.HUMAN_DRUNK_WALK="HUMAN_DRUNK_WALK";M.HUMAN_NOISE_CLOUD="HUMAN_NOISE_CLOUD";M.HUMAN_PATCH_JUMP="HUMAN_PATCH_JUMP";M.ZIGZAG="ZIGZAG";M.BRUSH_STROKES="BRUSH_STROKES";M.DIAGONAL_BRUSH="DIAGONAL_BRUSH";M.DOWN="DOWN";M.UP="UP";M.LEFT="LEFT";M.RIGHT="RIGHT";M.SPIRAL_FROM_CENTER="SPIRAL_FROM_CENTER";M.SPIRAL_TO_CENTER="SPIRAL_TO_CENTER";M.SCRIBBLE="SCRIBBLE";M.CROSSHATCH="CROSSHATCH";M.WAVE_SWEEP="WAVE_SWEEP";M.SCATTERED_LINES="SCATTERED_LINES";M.CONTOUR_JITTER="CONTOUR_JITTER";M.SPIRAL_WOBBLE="SPIRAL_WOBBLE";M.CLUSTER_BURSTS="CLUSTER_BURSTS";M.ORBITAL="ORBITAL";M.FLOW_FIELD="FLOW_FIELD";M.EDGE_IN="EDGE_IN"})(Q0||={});class V extends T{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(o,p){return new V(o,U.fromJSON(o,p.position),await P.fromJSON(o,p.pixels),p.strategy,p.opacity,p.drawTransparentPixels,p.drawColorsInOrder,p.colors,p.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;logoPreviewMask;logoPreviewImage;previewAnimations=new WeakMap;constructor(o,p,l,f="SPIRAL_FROM_CENTER",g=50,w=!1,a=!1,b=[],c=!1){super();this.bot=o;this.position=p;this.pixels=l;this.strategy=f;this.opacity=g;this.drawTransparentPixels=w;this.drawColorsInOrder=a;this.colors=b;this.lock=c;this.element.innerHTML=J0,this.element.classList.add("wimage"),B(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,m(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),m(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let r;this.registerEvent(this.$brightness,"change",()=>{clearTimeout(r),r=setTimeout(()=>{this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),m(this.bot)},1000)}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),m(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,m(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,m(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),m(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(u)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(u.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(u)=>{if(u.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let u of this.element.querySelectorAll(".resize"))this.registerEvent(u,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),p=new Set,l=new Map;for(let f=0;f<this.colors.length;f++){let g=this.colors[f];if(g.disabled)p.add(g.realColor);l.set(g.realColor,f)}for(let{x:f,y:g}of this.strategyPositionIterator()){let w=this.pixels.pixels[g][f];if(p.has(w))continue;o.globalX=this.position.globalX+f,o.globalY=this.position.globalY+g;let a=o.getMapColor();if(w!==a&&(this.drawTransparentPixels||w!==0))this.tasks.push({position:o.clone(),color:w})}if(this.drawColorsInOrder)this.tasks.sort((f,g)=>(l.get(f.color)??0)-(l.get(g.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:p}=this.position.toScreenPosition(),l=Math.round(this.position.pixelSize*this.pixels.width),f=Math.round(this.position.pixelSize*this.pixels.height);this.element.style.transform=`translate3d(${Math.round(o)}px, ${Math.round(p)}px, 0)`,this.element.style.width=`${l}px`,this.element.style.height=`${f}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let g=this.pixels.pixels.length*this.pixels.pixels[0].length,w=Math.max(0,g-this.tasks.length),a=g>0?w/g*100|0:0;this.$progressText.textContent=`${w}/${g} ${a}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${a/100})`,this.$wrapper.classList[this.lock?"add":"remove"]("no-pointer-events"),this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),p0(this.bot.images,this),this.bot.widget.update(),m(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(typeof o.requestClose==="function")o.requestClose();else o.close()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let l=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-l.left,offsetY:o.clientY-l.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let p=this.$colorsDialog.getBoundingClientRect(),l=Math.max(8,window.innerWidth-p.width-8),f=Math.max(8,window.innerHeight-p.height-8),g=Math.min(l,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),w=Math.min(f,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(g)}px`,this.$colorsDialog.style.top=`${Math.round(w)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){let o=this.$strategy.value,p=Object.values(Q0).sort((f,g)=>{if(f===o)return-1;if(g===o)return 1;return 0});this.$previewDialogList.innerHTML="";let l=document.createDocumentFragment();for(let f=0;f<p.length;f++){let g=p[f],w=document.createElement("article");w.className="preview-card";let a=document.createElement("strong");a.textContent=this.getStrategyLabel(g);let b=document.createElement("canvas");b.className="preview-canvas",b.width=156,b.height=156,this.paintStrategyPreview(b,g),w.append(a,b),l.append(w)}this.$previewDialogList.append(l)}getStrategyLabel(o){switch(o){case"RANDOM":return H("random");case"HUMANIZED":return H("humanized");case"HUMAN_SOFT_DITHER":return H("humanSoftDither");case"HUMAN_PATCHY":return H("humanPatchy");case"HUMAN_SWEEP_ARCS":return H("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return H("humanMicroCorrections");case"HUMAN_JITTER_FILL":return H("humanJitterFill");case"HUMAN_CORNER_BIAS":return H("humanCornerBias");case"HUMAN_LONG_STROKES":return H("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return H("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return H("humanMessySpiral");case"HUMAN_DRUNK_WALK":return H("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return H("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return H("humanPatchJump");case"ZIGZAG":return H("zigzag");case"BRUSH_STROKES":return H("brushStrokes");case"DIAGONAL_BRUSH":return H("diagonalBrush");case"DOWN":return H("down");case"UP":return H("up");case"LEFT":return H("left");case"RIGHT":return H("right");case"SPIRAL_FROM_CENTER":return H("spiralOut");case"SPIRAL_TO_CENTER":return H("spiralIn");case"SCRIBBLE":return H("scribble");case"CROSSHATCH":return H("crosshatch");case"WAVE_SWEEP":return H("waveSweep");case"SCATTERED_LINES":return H("scatteredLines");case"CONTOUR_JITTER":return H("contourJitter");case"SPIRAL_WOBBLE":return H("spiralWobble");case"CLUSTER_BURSTS":return H("clusterBursts");case"ORBITAL":return H("orbital");case"FLOW_FIELD":return H("flowField");case"EDGE_IN":return H("edgeIn");default:return o}}paintStrategyPreview(o,p){let l=o.getContext("2d");if(!l)return;l.fillStyle="#0f1526",l.fillRect(0,0,o.width,o.height);let f=this.getLogoPreviewMask(),g=this.strategy;this.strategy=p;let w=[...this.strategyPositionIterator()];this.strategy=g;let a=new Set(f.map(({x:J,y:G})=>`${J}:${G}`)),b=w.filter(({x:J,y:G})=>a.has(`${J}:${G}`)),c=o.width/this.pixels.width,r=this.previewAnimations.get(o);if(r)cancelAnimationFrame(r);let u=(J)=>{l.fillStyle="#0f1526",l.fillRect(0,0,o.width,o.height),this.paintLogoGhost(l,c,f);for(let G=0;G<Math.min(J,b.length);G++){let N=b[G],K=G/Math.max(1,b.length-1);l.fillStyle=`hsl(${220-K*110} 90% ${43+K*18}%)`,l.fillRect(N.x*c,N.y*c,Math.max(1,c),Math.max(1,c))}},z=performance.now(),s=Math.min(3800,Math.max(900,b.length*8)),A=(J)=>{let G=J-z,N=Math.min(1,G/s);u(Math.floor(b.length*N));let K=N>=1?requestAnimationFrame(()=>{u(b.length)}):requestAnimationFrame(A);this.previewAnimations.set(o,K)};A(z)}paintLogoGhost(o,p,l){if(this.logoPreviewImage){o.save(),o.globalAlpha=0.22,o.drawImage(this.logoPreviewImage,0,0,this.pixels.width*p,this.pixels.height*p),o.restore();return}o.fillStyle="rgb(115 132 190 / 28%)";for(let f=0;f<l.length;f++){let g=l[f];o.fillRect(g.x*p,g.y*p,Math.max(1,p),Math.max(1,p))}}getLogoPreviewMask(){if(this.logoPreviewMask)return this.logoPreviewMask;this.logoPreviewMask=this.fallbackPreviewMask();let o=new Image;return o.src=T0,o.decode().then(()=>{this.logoPreviewImage=o;let p=document.createElement("canvas");p.width=this.pixels.width,p.height=this.pixels.height;let l=p.getContext("2d");if(!l)return;if(l.clearRect(0,0,p.width,p.height),l.drawImage(o,0,0,p.width,p.height),this.logoPreviewMask=this.alphaMaskFromCanvas(l,p.width,p.height),this.$previewDialog.open)this.renderStrategyPreviewSamples()}).catch(()=>{return}),this.logoPreviewMask}alphaMaskFromCanvas(o,p,l){let f=o.getImageData(0,0,p,l).data,g=[];for(let w=0;w<l;w++)for(let a=0;a<p;a++)if((f[(w*p+a)*4+3]??0)>24)g.push({x:a,y:w});return g.length?g:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],p=this.pixels.width/2,l=this.pixels.height/2,f=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let g=0;g<this.pixels.height;g++)for(let w=0;w<this.pixels.width;w++)if((w-p)**2+(g-l)**2<=f**2)o.push({x:w,y:g});return o}applyLocale(){if(B(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let p=F[o]??"0,0,0",[l=0,f=0,g=0]=p.split(",").map((w)=>Number.parseInt(w,10));return`#${[l,f,g].map((w)=>w.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let p=F[o]??"0,0,0",[l=0,f=0,g=0]=p.split(",").map((c)=>Number.parseInt(c,10)),w=Math.max(l,f,g),a=Math.min(l,f,g);if(w-a<15)return["gray","grey","gris","neutral","neutro"];if(l>f+30&&l>g+30)return["red","rojo"];if(f>l+30&&f>g+30)return["green","verde"];if(g>l+30&&g>f+30)return["blue","azul"];if(l>170&&f>120&&g<130)return["orange","naranja"];if(l>170&&f>110&&g>140)return["pink","rosa"];if(l>120&&f<100&&g>120)return["purple","violet","morado"];if(l>130&&f>130&&g<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",H("colorPanelResults"));let p=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((l)=>!this.pixels.colors.has(l.realColor)))this.colors=this.pixels.colors.values().toArray().sort((l,f)=>f.amount-l.amount).map((l)=>({realColor:l.realColor,disabled:!1})),m(this.bot);for(let l=0;l<this.colors.length;l++){let f=this.colors[l],g=this.pixels.colors.get(f.realColor),w=!1,a=g.realColor!==g.color,b=g.amount/o*100,c=this.colorHex(g.realColor),r=this.colorKeywords(g.realColor),u=()=>{f.disabled=f.disabled?void 0:!0,z.classList.toggle("disabled",Boolean(f.disabled));let A=z.querySelector(".state");if(A)A.textContent=f.disabled?H("disabled"):H("enabled");m(this.bot)},z=document.createElement("button");if(z.className=`color-chip ${f.disabled?"disabled":""}`,z.draggable=!0,z.setAttribute("aria-label",`${H("overlayColors")} #${l+1}: ${c.toUpperCase()}`),z.innerHTML=`<span class="order-index">#${l+1}</span>
<span class="drag" title="${H("up")} / ${H("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${b.toFixed(1)}%</span>
  <span class="hex">${c.toUpperCase()}</span>
  <span class="state">${f.disabled?H("disabled"):H("enabled")}</span>
</span>
<span class="premium ${a?"on":""}">${a?H("premium"):""}</span>`,z.querySelector(".swatch").style.setProperty("--swatch-color",A0(g.realColor)),z.addEventListener("click",()=>{if(w){w=!1;return}u()}),z.addEventListener("dragstart",(A)=>{w=!0,z.classList.add("dragging"),A.dataTransfer?.setData("text/plain",String(l)),A.dataTransfer.effectAllowed="move"}),z.addEventListener("dragend",()=>{z.classList.remove("dragging")}),z.addEventListener("dragover",(A)=>{A.preventDefault(),z.classList.add("drag-target")}),z.addEventListener("dragleave",()=>{z.classList.remove("drag-target")}),z.addEventListener("drop",(A)=>{A.preventDefault(),z.classList.remove("drag-target");let J=Number.parseInt(A.dataTransfer?.getData("text/plain")??"-1",10);if(J<0||J===l||J>=this.colors.length)return;this.colors.splice(l,0,...this.colors.splice(J,1)),m(this.bot),this.updateColors()}),a){let A=document.createElement("button");A.textContent=H("buy"),A.className="buy-chip",A.addEventListener("click",(J)=>{J.stopPropagation(),document.getElementById("color-"+g.realColor)?.click()}),z.append(A)}let s=`${c} ${r.join(" ")} ${g.realColor} ${F[g.realColor]}`;if(!p||s.toLowerCase().includes(p))this.$colorsDialogList.append(z)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,p=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let l=0;l<p;l++)for(let f=0;f<o;f++)yield{x:f,y:l};break}case"UP":{for(let l=p-1;l>=0;l--)for(let f=0;f<o;f++)yield{x:f,y:l};break}case"LEFT":{for(let l=0;l<o;l++)for(let f=0;f<p;f++)yield{x:l,y:f};break}case"RIGHT":{for(let l=o-1;l>=0;l--)for(let f=0;f<p;f++)yield{x:l,y:f};break}case"RANDOM":{let l=[];for(let f=0;f<p;f++)for(let g=0;g<o;g++)l.push({x:g,y:f});for(let f=l.length-1;f>=0;f--){let g=Math.floor(Math.random()*(f+1)),w=l[f];l[f]=l[g],l[g]=w}yield*l;break}case"ZIGZAG":{for(let l=0;l<p;l++)if(l%2===0)for(let f=0;f<o;f++)yield{x:f,y:l};else for(let f=o-1;f>=0;f--)yield{x:f,y:l};break}case"HUMANIZED":{let l=Math.max(4,Math.floor(Math.min(o,p)/10)),f=[];for(let g=0;g<p;g+=l)for(let w=0;w<o;w+=l)f.push({x:w,y:g});for(let g=f.length-1;g>=0;g--){let w=Math.floor(Math.random()*(g+1)),a=f[g];f[g]=f[w],f[w]=a}for(let g=0;g<f.length;g++){let w=f[g],a=Math.min(p,w.y+l),b=Math.min(o,w.x+l);for(let c=w.y;c<a;c++)if(Math.random()>0.35)for(let u=w.x;u<b;u++)yield{x:u,y:c};else for(let u=b-1;u>=w.x;u--)yield{x:u,y:c}}break}case"HUMAN_SOFT_DITHER":{let l=new Set;for(let f=0;f<p;f++){let g=Math.floor(Math.random()*3)-1;if((f+g)%2===0)for(let a=0;a<o;a+=2)l.add(`${a},${f}`),yield{x:a,y:f};else for(let a=1;a<o;a+=2)l.add(`${a},${f}`),yield{x:a,y:f}}for(let f=0;f<p;f++)for(let g=0;g<o;g++){let w=`${g},${f}`;if(l.has(w))continue;yield{x:g,y:f}}break}case"HUMAN_PATCHY":{let l=new Set,f=o*p;while(l.size<f){let g=Math.floor(Math.random()*o),w=Math.floor(Math.random()*p),a=1+Math.floor(Math.random()*5);for(let b=w-a;b<=w+a;b++)for(let c=g-a;c<=g+a;c++){if(c<0||c>=o||b<0||b>=p)continue;if(Math.hypot(c-g,b-w)>a+Math.random()*1.2)continue;let r=`${c},${b}`;if(l.has(r))continue;l.add(r),yield{x:c,y:b}}}break}case"HUMAN_SWEEP_ARCS":{let l=new Set,f=(o-1)/2,g=(p-1)/2,w=Math.hypot(f,g);for(let a=0;a<4;a++){let b=Math.random()*Math.PI*2;for(let c=0;c<=w;c+=0.35){let r=Math.PI/2+Math.random()*(Math.PI/1.5),u=Math.max(10,Math.floor(c*8));for(let z=0;z<u;z++){let s=b+r*z/u+Math.sin(c)*0.08,A=Math.round(f+Math.cos(s)*c),J=Math.round(g+Math.sin(s)*c);if(A<0||A>=o||J<0||J>=p)continue;let G=`${A},${J}`;if(l.has(G))continue;l.add(G),yield{x:A,y:J}}}}for(let a=0;a<p;a++)for(let b=0;b<o;b++){let c=`${b},${a}`;if(l.has(c))continue;yield{x:b,y:a}}break}case"HUMAN_MICRO_CORRECTIONS":{let l=new Set;for(let f=0;f<p;f++){let g=f%2===0?1:-1,w=g>0?0:o-1;for(let a=0;a<o;a++){let b=w+(Math.random()>0.82?g:0),c=f+(Math.random()>0.9?1:0);for(let r of[{x:w,y:f},{x:b,y:f},{x:w,y:c}]){if(r.x<0||r.x>=o||r.y<0||r.y>=p)continue;let u=`${r.x},${r.y}`;if(l.has(u))continue;l.add(u),yield r}w+=g}}for(let f=0;f<p;f++)for(let g=0;g<o;g++){let w=`${g},${f}`;if(l.has(w))continue;yield{x:g,y:f}}break}case"HUMAN_JITTER_FILL":{let l=[];for(let f=0;f<p;f++)for(let g=0;g<o;g++)l.push({x:g,y:f});l.sort((f,g)=>{let w=f.y+(Math.random()-0.5)*1.8,a=g.y+(Math.random()-0.5)*1.8;if(w!==a)return w-a;return f.x+(Math.random()-0.5)*2-(g.x+(Math.random()-0.5)*2)}),yield*l;break}case"HUMAN_CORNER_BIAS":{let l=[{x:0,y:0},{x:o-1,y:0},{x:0,y:p-1},{x:o-1,y:p-1}],f=l[Math.floor(Math.random()*l.length)],g=[];for(let w=0;w<p;w++)for(let a=0;a<o;a++){let c=Math.hypot(a-f.x,w-f.y)+Math.random()*3.5;g.push({point:{x:a,y:w},score:c})}g.sort((w,a)=>w.score-a.score);for(let w of g)yield w.point;break}case"HUMAN_LONG_STROKES":{let l=new Set,f=o*p;while(l.size<f){let g=Math.floor(Math.random()*o),w=Math.floor(Math.random()*p),a=Math.random()*Math.PI*2,b=Math.sign(Math.cos(a)),c=Math.sign(Math.sin(a)),r=10+Math.floor(Math.random()*40);for(let u=0;u<r;u++){if(g<0||g>=o||w<0||w>=p)break;let z=`${g},${w}`;if(!l.has(z))l.add(z),yield{x:g,y:w};if(Math.random()>0.78)g+=c,w+=b;else g+=b,w+=c}}break}case"HUMAN_TAP_CLUSTERS":{let l=new Set,f=o*p;while(l.size<f){let g=Math.floor(Math.random()*o),w=Math.floor(Math.random()*p),a=3+Math.floor(Math.random()*10);for(let b=0;b<a;b++){let c=Math.round(g+(Math.random()-0.5)*6),r=Math.round(w+(Math.random()-0.5)*6);if(c<0||c>=o||r<0||r>=p)continue;let u=`${c},${r}`;if(l.has(u))continue;l.add(u),yield{x:c,y:r}}}break}case"HUMAN_MESSY_SPIRAL":{let l=new Set,f=(o-1)/2,g=(p-1)/2,w=Math.hypot(f,g)+2;for(let a=0;l.size<o*p;a++){let b=a/3,c=Math.min(w,b*0.18),r=b*0.29+Math.sin(b*0.13)*0.8,u=Math.round(f+Math.cos(r)*c+Math.sin(b)*0.7),z=Math.round(g+Math.sin(r)*c+Math.cos(b)*0.7);if(u<0||u>=o||z<0||z>=p){if(a>o*p*18)break;continue}let s=`${u},${z}`;if(l.has(s)){if(Math.random()>0.9)continue}else l.add(s),yield{x:u,y:z};if(a>o*p*18)break}for(let a=0;a<p;a++)for(let b=0;b<o;b++){let c=`${b},${a}`;if(l.has(c))continue;yield{x:b,y:a}}break}case"HUMAN_DRUNK_WALK":{let l=new Set,f=Math.floor(Math.random()*o),g=Math.floor(Math.random()*p),w=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(l.size<o*p){let a=`${f},${g}`;if(!l.has(a))l.add(a),yield{x:f,y:g};let b=[];for(let u of w){let z=f+u.x,s=g+u.y;if(z<0||z>=o||s<0||s>=p)continue;b.push({x:z,y:s})}if(!b.length)break;let c=b.filter((u)=>{return!l.has(`${u.x},${u.y}`)});if(c.length&&Math.random()>0.2){let u=c[Math.floor(Math.random()*c.length)];f=u.x,g=u.y;continue}let r=b[Math.floor(Math.random()*b.length)];f=r.x,g=r.y}for(let a=0;a<p;a++)for(let b=0;b<o;b++){let c=`${b},${a}`;if(l.has(c))continue;yield{x:b,y:a}}break}case"HUMAN_NOISE_CLOUD":{let l=[];for(let f=0;f<p;f++)for(let g=0;g<o;g++){let w=Math.sin((g+1)*0.93+Math.random()*0.8)+Math.cos((f+1)*1.17+Math.random()*0.8),a=(Math.random()-0.5)*2.6,b=Math.hypot(g-o/2,f-p/2)*0.08;l.push({point:{x:g,y:f},score:w+a+b})}l.sort((f,g)=>f.score-g.score);for(let f of l)yield f.point;break}case"HUMAN_PATCH_JUMP":{let l=new Set,f=[];for(let g=0;g<Math.max(6,o*p/18);g++)f.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});while(l.size<o*p){let g=f[Math.floor(Math.random()*f.length)],w=1+Math.floor(Math.random()*3),a=1+Math.floor(Math.random()*3);for(let b=g.y-a;b<=g.y+a;b++)for(let c=g.x-w;c<=g.x+w;c++){if(c<0||c>=o||b<0||b>=p)continue;if(Math.random()>0.86)continue;let r=`${c},${b}`;if(l.has(r))continue;l.add(r),yield{x:c,y:b}}if(Math.random()>0.72&&f.length<o*p/2)f.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});if(l.size>o*p*0.92)break}for(let g=0;g<p;g++)for(let w=0;w<o;w++){let a=`${w},${g}`;if(l.has(a))continue;yield{x:w,y:g}}break}case"DIAGONAL_BRUSH":{for(let l=0;l<o+p-1;l++){let f=l%2===0,g=[],w=Math.max(0,l-o+1),a=Math.min(p-1,l);for(let b=w;b<=a;b++){let c=l-b;if(c>=0&&c<o)g.push({x:c,y:b})}if(Math.random()>0.55)g.reverse();if(f)for(let b=g.length-1;b>=0;b--)yield g[b];else yield*g}break}case"BRUSH_STROKES":{let l=Array.from({length:p},()=>Array(o).fill(!1)),f=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],g=(b,c)=>b>=0&&b<o&&c>=0&&c<p,w=0,a=o*p;for(let b=0;b<a*6&&w<a;b++){let c=Math.floor(Math.random()*o),r=Math.floor(Math.random()*p),u=f[Math.floor(Math.random()*f.length)],z=3+Math.floor(Math.random()*16);for(let s=0;s<z;s++){if(!g(c,r))break;if(!l[r][c])l[r][c]=!0,w++,yield{x:c,y:r};if(Math.random()>0.72)u=f[Math.floor(Math.random()*f.length)];c+=u.x,r+=u.y}}for(let b=0;b<p;b++)for(let c=0;c<o;c++)if(!l[b][c])yield{x:c,y:b};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let l=new Set,f=o*p,g=Math.floor(o/2),w=Math.floor(p/2),a=[[1,0],[0,1],[-1,0],[0,-1]],b=0,c=1,r=(z,s)=>z>=0&&z<o&&s>=0&&s<p,u=function*(){let z=0;while(z<f){for(let s=0;s<2;s++){for(let A=0;A<c;A++){if(r(g,w)){let J=`${g},${w}`;if(!l.has(J)){if(l.add(J),yield{x:g,y:w},z++,z>=f)return}}g+=a[b][0],w+=a[b][1]}b=(b+1)%4}c++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*u();else{let z=[...u()];for(let s=z.length-1;s>=0;s--)yield z[s]}break}case"SCRIBBLE":{let l=new Set,f=o*p,g=Math.floor(o/2),w=Math.floor(p/2);for(let a=0;l.size<f&&a<f*24;a++){let b=`${g},${w}`;if(!l.has(b))l.add(b),yield{x:g,y:w};if(g+=Math.floor(Math.random()*3)-1,w+=Math.floor(Math.random()*3)-1,g<0||g>=o||w<0||w>=p)g=Math.floor(Math.random()*o),w=Math.floor(Math.random()*p)}for(let a=0;a<p;a++)for(let b=0;b<o;b++){let c=`${b},${a}`;if(l.has(c))continue;l.add(c),yield{x:b,y:a}}break}case"CROSSHATCH":{let l=[];for(let w=0;w<o+p-1;w++)for(let a=Math.max(0,w-o+1);a<=Math.min(p-1,w);a++){let b=w-a;l.push({x:b,y:a})}let f=[];for(let w=-p+1;w<o;w++)for(let a=0;a<p;a++){let b=a+w;if(b>=0&&b<o)f.push({x:b,y:a})}let g=new Set;for(let w of[...l,...f]){let a=`${w.x},${w.y}`;if(g.has(a))continue;g.add(a),yield w}break}case"WAVE_SWEEP":{let l=new Set;for(let f=0;f<o;f++){let w=(Math.sin(f/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(p-1)|0;for(let a=0;a<p;a++){let b=w+a,c=w-a;for(let r of[b,c]){if(r<0||r>=p)continue;let u=`${f},${r}`;if(l.has(u))continue;l.add(u),yield{x:f,y:r}}}}break}case"SCATTERED_LINES":{let l=new Set,f=o*p;for(let g=0;l.size<f&&g<f*14;g++){let w=Math.floor(Math.random()*o),a=Math.floor(Math.random()*p),b=Math.random()*Math.PI*2,c=Math.round(Math.cos(b)),r=Math.round(Math.sin(b)),u=6+Math.floor(Math.random()*28);for(let z=0;z<u;z++){if(w<0||w>=o||a<0||a>=p)break;let s=`${w},${a}`;if(!l.has(s))l.add(s),yield{x:w,y:a};w+=c,a+=r}}for(let g=0;g<p;g++)for(let w=0;w<o;w++){let a=`${w},${g}`;if(l.has(a))continue;l.add(a),yield{x:w,y:g}}break}case"CONTOUR_JITTER":{let l=new Set;for(let f=0;f<Math.ceil(Math.min(o,p)/2);f++){let g=[],w=f,a=f,b=o-f-1,c=p-f-1;for(let r=w;r<=b;r++)g.push({x:r,y:a});for(let r=a+1;r<=c;r++)g.push({x:b,y:r});for(let r=b-1;r>=w;r--)g.push({x:r,y:c});for(let r=c-1;r>a;r--)g.push({x:w,y:r});for(let r=g.length-1;r>0;r--){let u=Math.floor(Math.random()*(r+1)),z=g[r];g[r]=g[u],g[u]=z}for(let r of g){let u=`${r.x},${r.y}`;if(l.has(u))continue;l.add(u),yield r}}break}case"SPIRAL_WOBBLE":{let l=new Set,f=o/2,g=p/2,w=Math.hypot(f,g);for(let a=0;l.size<o*p&&a<o*p*9;a++){let b=a/(o*p*9)*w,c=a*0.31+Math.sin(a*0.07)*0.7,r=Math.round(f+Math.cos(c)*b),u=Math.round(g+Math.sin(c)*b);if(r<0||r>=o||u<0||u>=p)continue;let z=`${r},${u}`;if(l.has(z))continue;l.add(z),yield{x:r,y:u}}for(let a=0;a<p;a++)for(let b=0;b<o;b++){let c=`${b},${a}`;if(l.has(c))continue;yield{x:b,y:a}}break}case"CLUSTER_BURSTS":{let l=new Set,f=o*p;for(let g=0;l.size<f&&g<f*12;g++){let w=Math.floor(Math.random()*o),a=Math.floor(Math.random()*p),b=2+Math.floor(Math.random()*10);for(let c=a-b;c<=a+b;c++)for(let r=w-b;r<=w+b;r++){if(r<0||r>=o||c<0||c>=p)continue;if(Math.hypot(r-w,c-a)>b)continue;let u=`${r},${c}`;if(l.has(u))continue;l.add(u),yield{x:r,y:c}}}for(let g=0;g<p;g++)for(let w=0;w<o;w++){let a=`${w},${g}`;if(l.has(a))continue;l.add(a),yield{x:w,y:g}}break}case"ORBITAL":{let l=new Set,f=(o-1)/2,g=(p-1)/2,w=Math.ceil(Math.max(f,g));for(let a=0;a<=w;a++){let b=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,a)*2));for(let c=0;c<b;c++){let r=c/b*Math.PI*2+(a%2?0.3:-0.3),u=Math.round(f+Math.cos(r)*a),z=Math.round(g+Math.sin(r)*a);if(u<0||u>=o||z<0||z>=p)continue;let s=`${u},${z}`;if(l.has(s))continue;l.add(s),yield{x:u,y:z}}}for(let a=0;a<p;a++)for(let b=0;b<o;b++){let c=`${b},${a}`;if(l.has(c))continue;yield{x:b,y:a}}break}case"FLOW_FIELD":{let l=new Set,f=o*p;for(let g=0;l.size<f&&g<f*18;g++){let w=Math.floor(Math.random()*o),a=Math.floor(Math.random()*p);for(let b=0;b<120;b++){if(w<0||w>=o||a<0||a>=p)break;let c=`${w},${a}`;if(!l.has(c))l.add(c),yield{x:w,y:a};let r=Math.sin(w*0.09)*1.8+Math.cos(a*0.08)*1.6+Math.sin((w+a)*0.05);w+=Math.round(Math.cos(r)),a+=Math.round(Math.sin(r))}}for(let g=0;g<p;g++)for(let w=0;w<o;w++){let a=`${w},${g}`;if(l.has(a))continue;l.add(a),yield{x:w,y:g}}break}case"EDGE_IN":{let l=new Set,f=Math.ceil(Math.min(o,p)/2);for(let g=0;g<f;g++){let w=g,a=o-1-g,b=g,c=p-1-g;for(let r=w;r<=a;r++)for(let u of[b,c]){let z=`${r},${u}`;if(l.has(z))continue;l.add(z),yield{x:r,y:u}}for(let r=b+1;r<=c-1;r++)for(let u of[w,a]){let z=`${u},${r}`;if(l.has(z))continue;l.add(z),yield{x:u,y:r}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),m(this.bot)}move(o){if(!this.moveInfo)return;let p=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),l=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=p+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-p)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,p+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=l+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-l)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,l+this.moveInfo.height);this.update(),m(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let p=o.target;if(p.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(p.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(p.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(p.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${S}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var U0=`/* stylelint-disable declaration-no-important */
/* stylelint-disable plugin/no-low-performance-animation-properties */
/* stylelint-disable no-descending-specificity */
/* stylelint-disable declaration-block-single-line-max-declarations */
@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';

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
  --surface-card: #141c31;
  --surface-card-hover: #1b2743;
  --glow-main: rgb(122 148 255 / 40%);
  --ring: rgb(129 140 248 / 55%);
  --input-bg: #111a2e;
  --input-border: rgb(148 163 255 / 28%);
  --input-hover: #17233d;
  --card-radius: 12px;
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
  background: linear-gradient(180deg, #1a2440, #141b2f);
  box-shadow:
    0 10px 24px rgb(0 0 0 / 30%),
    0 0 0 1px rgb(109 123 255 / 10%);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.wwidget .images .image:hover {
  border-color: rgb(109 123 255 / 55%);
  box-shadow:
    0 14px 28px rgb(0 0 0 / 38%),
    0 0 0 1px rgb(109 123 255 / 24%);
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
  align-content: center;
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

.wwidget .images .image .image-controls .colors {
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

.wform {
  font-weight: 700;
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
  padding: 9px 10px;
  border: 1px solid var(--input-border);
  border-radius: var(--card-radius);
  background: linear-gradient(180deg, #17233d 0%, var(--input-bg) 100%);
  color: var(--text);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 4%),
    0 1px 0 rgb(7 11 22 / 35%);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    filter 0.2s ease;
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
  border-color: rgb(129 140 248 / 66%);
  background: linear-gradient(180deg, #1a2947 0%, var(--input-hover) 100%);
  box-shadow: 0 8px 18px rgb(0 0 0 / 20%);
  filter: saturate(1.08);
  transform: translateY(-1px);
}

.wform button:focus-visible,
.wform input:focus-visible,
.wform select:focus-visible {
  border-color: rgb(165 180 252 / 85%);
  box-shadow:
    0 0 0 3px var(--ring),
    0 10px 22px rgb(0 0 0 / 26%);
  outline: none;
}

.wform input::placeholder {
  color: #9ba9d8;
}

.wform select {
  padding-right: 34px;
  background-image:
    linear-gradient(45deg, transparent 50%, #c7d2fe 50%),
    linear-gradient(135deg, #c7d2fe 50%, transparent 50%),
    linear-gradient(180deg, #1a2948 0%, #131d34 100%);
  background-position:
    calc(100% - 17px) 50%,
    calc(100% - 12px) 50%,
    0 0;
  background-size:
    5px 5px,
    5px 5px,
    100% 100%;
  background-repeat: no-repeat;
  appearance: none;
  color-scheme: dark;
}

.wform select option {
  background: #141f36;
  color: #edf2ff;
  font-weight: 700;
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
  overflow: hidden;
  width: 100%;
  height: 34px;
  margin: 0;
  border: 1px solid rgb(129 140 248 / 28%);
  border-radius: 12px;
  background: linear-gradient(180deg, #111a2e, #0e1628);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 5%),
    inset 0 -1px 0 rgb(0 0 0 / 35%);
}

.wform .wprogress div {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background:
    linear-gradient(90deg, rgb(99 102 241 / 95%), rgb(56 189 248 / 88%)),
    linear-gradient(180deg, rgb(255 255 255 / 18%), transparent);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 24%),
    0 0 18px rgb(99 102 241 / 35%);
  transition: transform 0.28s ease-out;
  transform-origin: left;
}

.wform .wprogress div::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgb(255 255 255 / 10%) 35%,
    rgb(255 255 255 / 28%) 50%,
    rgb(255 255 255 / 10%) 65%,
    transparent 100%
  );
  animation: progress-shimmer 1.8s linear infinite;
}

.wform .wprogress span {
  position: relative;
  z-index: 1;
  color: #e9eeff;
  font-weight: 600;
  font-size: 11px;
  text-shadow: 0 1px 6px rgb(3 8 18 / 60%);
  mix-blend-mode: normal;
}

@keyframes progress-shimmer {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}

.kgm-modal {
  margin: auto;
  border: 1px solid rgb(130 150 255 / 35%);
  border-radius: 14px;
  background: linear-gradient(180deg, #131c34 0%, #0e1526 100%);
  color: var(--text);
  box-shadow:
    0 24px 46px rgb(2 6 23 / 62%),
    0 0 0 1px rgb(143 162 255 / 22%);
}

.kgm-modal::backdrop {
  background:
    radial-gradient(circle at 50% 20%, rgb(90 122 255 / 20%), transparent 55%),
    rgb(4 8 16 / 72%);
  backdrop-filter: blur(5px) saturate(1.15);
}

.kgm-modal-head {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 2px 0 8px;
  background: linear-gradient(180deg, rgb(19 28 52 / 98%), rgb(19 28 52 / 72%));
  backdrop-filter: blur(4px);
}

.wimage .colors-dialog {
  overflow: auto;
  width: min(560px, 92vw);
  min-width: min(320px, 92vw);
  min-height: 420px;
  max-height: min(85dvh, 680px);
  padding: 12px;
  resize: both;
}

.wimage .colors-dialog-head {
  cursor: move;
  user-select: none;
}

.wimage .close-colors {
  min-width: 34px;
}

.wimage .modal-close {
  display: grid;
  place-items: center;
  width: 34px;
  min-width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid #6c79ad;
  border-radius: 999px;
  background: linear-gradient(180deg, #2a3963, #1f2c4d);
  color: #f0f4ff;
  box-shadow: 0 10px 20px rgb(7 12 24 / 30%);
  font-weight: 600;
}

.wimage .modal-close .icon {
  font-size: 14px;
  line-height: 1;
}

.wimage .modal-close:hover {
  border-color: #9fb0ff;
  box-shadow:
    0 10px 22px rgb(7 12 24 / 40%),
    0 0 0 1px rgb(159 176 255 / 35%);
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
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 12px;
  overflow: auto;
  max-height: min(70dvh, 600px);
  padding-right: 2px;
}

.wimage .preview-card {
  display: grid;
  gap: 8px;
  padding: 10px;
  border: 1px solid rgb(143 162 255 / 22%);
  border-radius: 12px;
  background: linear-gradient(180deg, #1a2542, #131d34);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 4%);
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}

.wimage .preview-card:hover {
  border-color: rgb(143 162 255 / 48%);
  box-shadow:
    0 12px 24px rgb(0 0 0 / 24%),
    inset 0 1px 0 rgb(255 255 255 / 5%);
  transform: translateY(-1px);
}

.wimage .preview-card strong {
  color: #dce6ff;
  font-size: 13px;
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
  grid-template-columns: auto 18px 18px 1fr auto auto;
  gap: 6px;
  align-items: center;
  width: 100%;
  padding: 6px;
  border: 1px solid rgb(143 162 255 / 20%);
  border-radius: 8px;
  background: linear-gradient(180deg, #1a2540, #151d31);
  color: var(--text);
  font-size: 11px;
  transition:
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    transform 0.22s ease;
}

.wimage .color-chip:hover {
  border-color: rgb(143 162 255 / 52%);
  box-shadow: 0 10px 18px rgb(0 0 0 / 25%);
  transform: translateY(-1px);
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

.wimage .color-chip .meta .hex {
  padding: 1px 6px;
  border: 1px solid rgb(143 162 255 / 30%);
  border-radius: 999px;
  background: rgb(17 25 43 / 75%);
  color: #e6ecff;
  font-size: 10px;
  letter-spacing: 0.2px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 36px;
  border: 1px solid rgb(125 146 255 / 34%);
  background: linear-gradient(180deg, #202d50, #19223d);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 8%);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    filter 0.2s ease;
}

.wtopbar button:hover {
  background: linear-gradient(180deg, #2b3960, #1f2c4b);
  box-shadow: 0 8px 18px rgb(0 0 0 / 30%);
  filter: saturate(1.12);
  transform: translateY(-1px);
}

.wtopbar button .icon {
  font-size: 15px;
  line-height: 1;
}

.wtopbar button .fa-solid {
  width: 16px;
  text-align: center;
}

.wtopbar .lock .icon-lock-closed {
  display: none;
}

.wtopbar .lock.locked .icon-lock-open {
  display: none;
}

.wtopbar .lock.locked .icon-lock-closed {
  display: inline;
}

.wtopbar button.delete {
  color: #ff6b8e;
  text-shadow: 0 0 12px rgb(255 107 142 / 35%);
}

.wtopbar button.open-colors {
  color: #88d8ff;
  text-shadow: 0 0 12px rgb(136 216 255 / 35%);
}

.wtopbar button.
.wtopbar button.lock.locked {
  color: #ffd166;
  text-shadow: 0 0 12px rgb(255 209 102 / 40%);
}

.wwidget .images .image .image-controls .colors,
.wwidget .images .image .image-controls .download,
.wwidget .images .image .image-controls .delete,
.wwidget .images .image .image-controls .preview-strategy {
  display: grid;
  place-items: center;
}

.wwidget .images .image .image-controls button i {
  font-size: 14px;
  line-height: 1;
}

.wwidget .images .image .image-controls .delete {
  color: #ff8ca8;
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

.kgm-access-locked .wwidget,
.kgm-access-locked .wimage,
.kgm-access-locked .wopen-button {
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

  .wwidget .images .image {
    grid-template-columns: 1fr;
  }

  .wwidget .images .image .image-controls {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
`;class i extends Error{name="KGlacerMacroError";constructor(o,p){super(o);p.widget.status=o}}class f0 extends i{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var D={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0}};function Y(o,p){return o.key.toLowerCase()===p.key&&o.shiftKey===Boolean(p.shift)&&o.ctrlKey===Boolean(p.ctrl)&&o.altKey===Boolean(p.alt)}function N0(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let p=o.tagName.toLowerCase();return p==="input"||p==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var D0=`<button class="wopen-button" aria-label="Toggle widget">
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
`;var Y0="kglacer-macro:overlay-hidden",k0="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class g0 extends T{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$shortcuts;$locale;$topbar;$draw;$addImage;$toggleOverlay;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=D0,B(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$shortcuts:".shortcuts",$locale:".locale",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$toggleOverlay:".toggle-overlay",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=k0,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=_(),this.$locale.addEventListener("change",()=>{v(this.$locale.value),B(this.element);for(let p=0;p<this.bot.images.length;p++)this.bot.images[p].applyLocale();this.refreshOverlayToggleText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run("Adding image",async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${S}`,o.click(),await q(o,["change"],["cancel","error"]);let p=o.files?.[0];if(!p)throw new f0(this.bot);console.log("[KGM][Widget] File selected",{name:p.name,size:p.size,type:p.type});let l;if(p.name.endsWith(`.${S}`))l=await V.fromJSON(this.bot,JSON.parse(await p.text()));else{let f=new FileReader;f.readAsDataURL(p),await q(f,["load"],["error"]);let g=await this.compressImageBeforeLoad(f.result),w=new Image;w.src=g,await q(w,["load"],["error"]),l=new V(this.bot,U.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new P(this.bot,w))}this.bot.images.push(l),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),l.updateTasks(),m(this.bot,!0),console.log("[KGM][Widget] Image persisted, reloading page"),document.location.reload()},()=>{this.setDisabled("add-image",!1)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let p=new Image;if(p.src=o,await q(p,["load"],["error"]),!(p.naturalWidth*p.naturalHeight>3000000||o.length>3000000))return o;let f=document.createElement("canvas");f.width=p.naturalWidth,f.height=p.naturalHeight;let g=f.getContext("2d");if(!g)return o;return g.drawImage(p,0,0),f.toDataURL("image/png")}update(){this.$strategy.value=this.bot.strategy;let o=0,p=0;for(let w=0;w<this.bot.images.length;w++){let a=this.bot.images[w];o+=a.pixels.pixels.length*a.pixels.pixels[0].length,p+=a.tasks.length}let l=Math.max(0,o-p),f=o>0?l/o*100|0:0;this.$progressText.textContent=`${l}/${o} ${f}% ETA: ${p/120|0}h`,this.$progressLine.style.transform=`scaleX(${f/100})`,this.$images.innerHTML="";let g=document.createDocumentFragment();for(let w=0;w<this.bot.images.length;w++){let a=this.bot.images[w],b=document.createElement("div");g.append(b),b.className="image",b.innerHTML=`<button class="preview" title="View preview">
  <img src="${a.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${w===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${w===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,b.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=w,a.openPreviewPanel()}),b.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=w,a.openColorPanel()}),b.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=w,a.openPreviewPanel()}),b.querySelector(".download").addEventListener("click",()=>{a.exportImage()}),b.querySelector(".delete").addEventListener("click",()=>{a.destroy()}),b.querySelector(".up").addEventListener("click",()=>{o0(this.bot.images,w,w-1),this.update(),m(this.bot)}),b.querySelector(".down").addEventListener("click",()=>{o0(this.bot.images,w,w+1),this.update(),m(this.bot)})}this.$images.append(g)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Y0)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let p=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",p),localStorage.setItem(Y0,String(p)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${H("toggleOverlay")} (${H("disabled")})`:`${H("toggleOverlay")} (${H("enabled")})`}setDisabled(o,p){this.element.querySelector("."+o).disabled=p}async run(o,p,l,f="..."){console.log("[KGM][Widget] Task started",{status:o});let g=this.status;this.status=`${f} ${o}`;try{let w=await p();return this.status=g,console.log("[KGM][Widget] Task completed",{status:o}),w}catch(w){if(!(w instanceof i))console.error(w),this.status=`Error: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:w}),w}finally{await l?.()}}handleKeyboard(o){if(N0(o.target))return;if(Y(o,D.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(Y(o,D.showShortcuts)){o.preventDefault(),this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(Y(o,D.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(Y(o,D.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(Y(o,D.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(Y(o,D.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(Y(o,D.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(Y(o,D.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(Y(o,D.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),m(this.bot)}}var $0=2,j0="[KGM]",B0="kglacer-macro:access-ok",w0="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Z0="kgm-access-locked";class P0{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,p){if(p===void 0)console.log(`${j0} ${o}`);else console.log(`${j0} ${o}`,p)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Z0);let o=K0();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let l=0;l<o.images.length;l++){let f=o.images[l];O({x:f.position[0]-1000,y:f.position[1]-1000}),O({x:f.position[0]+1000,y:f.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let p=document.createElement("style");p.textContent=U0.replace("FAKE_FAVORITE_LOCATIONS",E.length.toString()),document.head.append(p),this.log("Styles injected",{fakeFavoriteLocations:E.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Z0),this._widget=new g0(this),await this.widget.run("Initializing",async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let l=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((f)=>{for(let g=0;g<f.length;g++)if(f[g].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(l,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await j(500),await this.updateColors(),o)for(let f=0;f<o.images.length;f++){let g=await V.fromJSON(this,o.images[f]);this.images.push(g),g.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(B0)===w0)return;await new Promise((o)=>{let p=document.createElement("dialog");p.className="kgm-modal access-dialog",p.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(p),B(p);let l=p.querySelector(".access-input"),f=p.querySelector(".access-error"),g=p.querySelector(".access-locale");g.innerHTML=H0().map((w)=>`<option value="${w}" ${w===_()?"selected":""}>${w.toUpperCase()}</option>`).join(""),g.addEventListener("change",()=>{v(g.value),B(p)}),p.addEventListener("cancel",(w)=>{w.preventDefault()}),p.querySelector("form").addEventListener("submit",(w)=>{w.preventDefault();let a=atob(w0);if(l.value.trim()!==a){f.textContent=H("invalidAccessKey");return}localStorage.setItem(B0,w0),p.close(),p.remove(),o()}),p.showModal(),l.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),p=(l)=>{if(!l.shiftKey)l.stopPropagation()};return this.widget.run("Drawing",async()=>{await this.widget.run("Initializing draw",()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",p,!0),o.addEventListener("wheel",p,!0),this.updateTasks();let l=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((w)=>w.json()),f=Math.floor(l.charges.count);this.log("Charges fetched",{charges:f});let g=0;for(let w=0;w<this.images.length;w++)g+=this.images[w].tasks.length;switch(this.log("Tasks prepared",{tasks:g}),this.strategy){case"ALL":{while(f>0){let w=!0;for(let a=0;a<this.images.length;a++){let b=this.images[a].tasks.shift();if(!b)continue;this.drawTask(b),f--,await j(1),w=!1}if(w)break}break}case"PERCENTAGE":{for(let w=0;w<g&&f>0;w++){let a=1,b;for(let c=0;c<this.images.length;c++){let r=this.images[c],u=1-r.tasks.length/(r.pixels.pixels.length*r.pixels.pixels[0].length);if(u<a)a=u,b=r}this.drawTask(b.tasks.shift()),f--,await j(1)}break}case"SEQUENTIAL":for(let w=0;w<this.images.length;w++){let a=this.images[w];for(let b=a.tasks.shift();b&&f>0;b=a.tasks.shift())this.drawTask(b),f--,await j(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:f})},()=>{globalThis.removeEventListener("mousemove",p,!0),o.removeEventListener("wheel",p,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:$0,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let p=document.querySelector(".maplibregl-canvas"),l=window.innerWidth/2,f=window.innerHeight/2,g=l-o.x,w=f-o.y;function a(b,c,r){p.dispatchEvent(new MouseEvent(b,{bubbles:!0,cancelable:!0,clientX:c,clientY:r,buttons:1}))}a("mousedown",l,f),a("mousemove",g,w),a("mouseup",g,w)}readMap(){this.mapsCache.clear();let o=new Set;for(let l=0;l<this.images.length;l++){let f=this.images[l],{tileX:g,tileY:w}=new U(this,f.position.globalX+f.pixels.pixels[0].length,f.position.globalY+f.pixels.pixels.length);for(let a=f.position.tileX;a<=g;a++)for(let b=f.position.tileY;b<=w;b++)o.add(`${a}/${b}`)}let p=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`Reading map [0/${o.size}]`,()=>Promise.all([...o].map(async(l)=>{this.mapsCache.set(l,await P.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${l}.png`,exactColor:!0})),this.widget.status=`⌛ Reading map [${++p}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let p=0,l=1,f=1/0,g=1/0;for(let b=0;b<this.$stars.length;b++){let{x:c,y:r}=X(this.$stars[b]);if(c<o.x&&r<o.y){let u=o.x-c+(o.y-r);if(u<f)f=u,p=b}else if(c>o.x&&r>o.y){let u=c-o.x+(r-o.y);if(u<g)g=u,l=b}}let w=X(this.$stars[p]),a=Z[p];return{anchorScreenPosition:w,anchorWorldPosition:a,pixelSize:(X(this.$stars[l]).x-w.x)/(Z[l].x-a.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await j(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await j(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await j(1)}drawTask(o){if(this.lastColor!==o.color)document.getElementById("color-"+o.color).click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color});let p=o.position.pixelSize/2,l=o.position.toScreenPosition();document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:l.x+p,clientY:l.y+p,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let o=globalThis.fetch,p=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(l,f)=>{let g=await o(l,f),w=g.clone(),a="";if(typeof l=="string")a=l;else if(l instanceof Request)a=l.url;else if(l instanceof URL)a=l.href;if(g.url==="https://backend.wplace.live/me")this.me=await w.json(),this.me.favoriteLocations.unshift(...E),this.me.maxFavoriteLocations=1/0,g.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let b=p.exec(a);if(b){for(let c=0;c<this.markerPixelPositionResolvers.length;c++)this.markerPixelPositionResolvers[c](new U(this,+b[1],+b[2],+b[3],+b[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return g}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await j(1)}waitForElement(o,p){return this.log("Waiting for element",{name:o,selector:p}),this.widget.run(`Waiting for ${o}`,()=>{return new Promise((l)=>{let f=document.querySelector(p);if(f){l(f);return}let g=new MutationObserver(()=>{let w=document.querySelector(p);if(w)g.disconnect(),l(w)});g.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,E.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new P0;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;

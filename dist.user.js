// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      2.1.4
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
function lo(o,p,l){let f=o[l];return o[l]=o[p],o[p]=f,o}function po(o,p){let l=o.indexOf(p);if(l!==-1)o.splice(l,1);return l}var f0=Math.floor(Math.random()*65536),g0=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function Z(o){return new Promise((p)=>setTimeout(p,o))}function V(o,p,l=["error"],f="addEventListener"){return new Promise((g,w)=>{for(let c=0;c<p.length;c++)o[f]?.(p[c],g);for(let c=0;c<l.length;c++)o[f]?.(l[c],w)})}class Lo{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,p=15000){this.size=o,this.historyTime=p}push(o){if(o<0)throw new Error("Negative chunk size");let{time:p,historyTime:l}=this.getTime();if(this.history.push({time:p,chunk:o}),this.history[0]&&this.history[0].time+l<p)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((p,l)=>p+l.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),p=o-this.startTime,l=Math.min(p,this.historyTime);return{time:o,historyTime:l}}}var uo=["kglacermacro:locale"],y={en:{widgetTitle:"KGlacerMacro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",random:"Random",humanized:"Humanized",humanSoftDither:"Human soft dither",humanPatchy:"Human patchy",humanSweepArcs:"Human sweep arcs",humanMicroCorrections:"Human micro corrections",humanJitterFill:"Human jitter fill",humanCornerBias:"Human corner bias",humanLongStrokes:"Human long strokes",humanTapClusters:"Human tap clusters",humanMessySpiral:"Human messy spiral",humanDrunkWalk:"Human drunk walk",humanNoiseCloud:"Human noise cloud",humanPatchJump:"Human patch jump",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of all paint modes using the KGlacer logo as the base preview image.",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again."},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",random:"Aleatorio",humanized:"Humanizado",humanSoftDither:"Difuminado humano suave",humanPatchy:"Parches humanos",humanSweepArcs:"Barridos humanos en arco",humanMicroCorrections:"Micro correcciones humanas",humanJitterFill:"Relleno humano con jitter",humanCornerBias:"Sesgo humano por esquina",humanLongStrokes:"Trazos humanos largos",humanTapClusters:"Toques humanos por grupos",humanMessySpiral:"Espiral humana irregular",humanDrunkWalk:"Caminata humana errática",humanNoiseCloud:"Nube humana de ruido",humanPatchJump:"Saltos humanos por parches",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada de todos los modos de pintado usando el logo de KGlacer como imagen base.",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Overlay",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo."}};function Ro(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function h(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in y)return o;for(let p=0;p<uo.length;p++){let l=localStorage.getItem(uo[p]);if(!l||!(l in y))continue;return localStorage.setItem("kglacer-macro:locale",l),l}return Ro()}function t(o){localStorage.setItem("kglacer-macro:locale",o)}function zo(){return Object.keys(y)}function z(o){let p=h();return y[p][o]}function B(o){for(let p of o.querySelectorAll("[data-i18n]"))p.textContent=z(p.dataset.i18n);for(let p of o.querySelectorAll("[data-i18n-title]"))p.setAttribute("title",z(p.dataset.i18nTitle));for(let p of o.querySelectorAll("[data-i18n-aria-label]"))p.setAttribute("aria-label",z(p.dataset.i18nAriaLabel));for(let p of o.querySelectorAll("[data-i18n-placeholder]"))p.setAttribute("placeholder",z(p.dataset.i18nPlaceholder))}class I{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,p){for(let l in p)this[l]=o.querySelector(p[l])}registerEvent(o,p,l,f={}){f.passive??=!0,o.addEventListener(p,l,f),this.runOnDestroy.push(()=>{o.removeEventListener(p,l)})}}function fo(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function Ho(o,p,l){let f=fo(o/255),g=fo(p/255),w=fo(l/255),c=Math.cbrt(0.4122214708*f+0.5363325363*g+0.0514459929*w),a=Math.cbrt(0.2119034982*f+0.6806995451*g+0.1073969566*w),b=Math.cbrt(0.0883024619*f+0.2817188376*g+0.6299787005*w),r=0.2104542553*c+0.793617785*a-0.0040720468*b,s=1.9779984951*c-2.428592205*a+0.4505937099*b,u=0.0259040371*c+0.7827717662*a-0.808675766*b;return[r,s,u]}function Mo(o,p,l){let[f,g,w]=o,[c,a,b]=p,r=(oo)=>oo*180/Math.PI,s=(oo)=>oo*Math.PI/180,u=1,H=1,A=1,J=Math.sqrt(g**2+w**2),Q=Math.sqrt(a**2+b**2),m=(J+Q)/2,G=0.5*(1-Math.sqrt(m**7/(m**7+6103515625))),Y=g*(1+G),j=a*(1+G),E=Math.sqrt(Y**2+w**2),W=Math.sqrt(j**2+b**2),$=w===0&&Y===0?0:r(Math.atan2(w,Y))%360,F=b===0&&j===0?0:r(Math.atan2(b,j))%360,i=c-f,ao=W-E,_=0;if(E*W!==0){if(_=F-$,_>180)_-=360;else if(_<-180)_+=360}let bo=2*Math.sqrt(E*W)*Math.sin(s(_)/2),ro=(f+c)/2,x=(E+W)/2,S=($+F)/2;if(Math.abs($-F)>180)S+=180;let qo=1-0.17*Math.cos(s(S-30))+0.24*Math.cos(s(2*S))+0.32*Math.cos(s(3*S+6))-0.2*Math.cos(s(4*S-63)),Wo=1+0.015*(ro-50)**2/Math.sqrt(20+(ro-50)**2),M=1+0.045*x,so=1+0.015*x*qo,Fo=30*Math.exp((-((S-275)/25))**2),Xo=-(2*Math.sqrt(x**7/(x**7+6103515625)))*Math.sin(s(2*Fo));return Math.sqrt((i/(1*Wo))**2+(ao/(1*M))**2+(bo/(1*so))**2+Xo*(ao/(1*M))*(bo/(1*so)))-i*l}var L=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],X=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function Ao(o){if(o===0)return"transparent";let p=L[o],l=`oklab(${p[0]*100}% ${p[1]} ${p[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",l))return l;let[f=0,g=0,w=0]=(X[o]??"0,0,0").split(",").map((c)=>Number.parseInt(c,10));return`rgb(${f} ${g} ${w})`}var Jo=`<div class="wtopbar">
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
`;class d{bot;image;width;brightness;exactColor;static async fromJSON(o,p){let l=new Image;return l.src=p.url.startsWith("http")?await fetch(p.url,{cache:"no-store"}).then((f)=>f.blob()).then((f)=>URL.createObjectURL(f)):p.url,await V(l,["load"],["error"]),new d(o,l,p.width,p.brightness,p.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,p,l=p.naturalWidth,f=0,g=!1){this.bot=o;this.image=p;this.width=l;this.brightness=f;this.exactColor=g;if(g)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let l=1;l<64;l++)if(this.exactColor||!this.bot.unavailableColors.has(l))o.set(X[l],[l,l]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let p=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let l=0;l<this.canvas.height;l++)for(let f=0;f<this.canvas.width;f++){let g=(l*this.canvas.width+f)*4,w=p[g],c=p[g+1],a=p[g+2],b=p[g+3],r=`${w},${c},${a}`;if(this.exactColor){this.pixels[l][f]=b<100?0:X.indexOf(r);continue}let s,u;if(b<100)s=u=0;else if(o.has(r))[s,u]=o.get(r);else{let A=1/0,J=1/0;for(let Q=0;Q<L.length;Q++){let m=L[Q],G=Mo(Ho(w,c,a),m,this.brightness);if(!this.bot.unavailableColors.has(Q)&&G<A)A=G,s=Q;if(G<J)J=G,u=Q}o.set(r,[s,u])}if(s!==0)this.context.fillStyle=`oklab(${L[s][0]*100}% ${L[s][1]} ${L[s][2]})`,this.context.fillRect(f,l,1,1);this.pixels[l][f]=s;let H=this.colors.get(u);if(H)H.amount++;else this.colors.set(u,{color:s,amount:1,realColor:u})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor}}}var T="kglacer-macro-settings",Go=["kglacermacro","wbot"],v="kgm";function Eo(){let o=[T,...Go];for(let p=0;p<o.length;p++){let l=o[p],f=localStorage.getItem(l);if(!f)continue;return{json:f,key:l}}return}function mo(){let o=Eo();if(!o)return;let p;try{if(p=JSON.parse(o.json),typeof p!=="object")throw new Error("NOT VALID SAVE");if(p.version===1){let l=p;p.images=l.widget.images,p.strategy=l.widget.strategy,delete l.widget}if(o.key!==T)localStorage.setItem(T,o.json)}catch{localStorage.removeItem(o.key),p=void 0}return p}var Ko;function K(o,p=!1){if(clearTimeout(Ko),p)localStorage.setItem(T,JSON.stringify(o));else Ko=setTimeout(()=>{localStorage.setItem(T,JSON.stringify(o))},600)}var U=1000,_o=2048,O=U*_o,q=[],k=[],So=Date.now();function n(o){q.push(o),k.push({id:So++,latitude:(2*Math.atan(Math.exp(-(o.y/O*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/O*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}n({x:O/3|0,y:O/3|0});n({x:O/3*2|0,y:O/3*2|0});function R(o){let[p,l]=o.style.transform.slice(32,-31).split(", ").map((f)=>Number.parseFloat(f));return{x:p,y:l}}class N{bot;static fromJSON(o,p){return new N(o,...p)}static fromScreenPosition(o,p){let{anchorScreenPosition:l,pixelSize:f,anchorWorldPosition:g}=o.findAnchorsForScreen(p);return new N(o,g.x+(p.x-l.x)/f|0,g.y+(p.y-l.y)/f|0)}globalX=0;globalY=0;get tileX(){return this.globalX/U|0}set tileX(o){this.globalX=o*U+this.x}get tileY(){return this.globalY/U|0}set tileY(o){this.globalY=o*U+this.y}get x(){return this.globalX%U}set x(o){this.globalX=this.tileX*U+o}get y(){return this.globalY%U}set y(o){this.globalY=this.tileY*U+o}anchor1Index;anchor2Index;get pixelSize(){return(R(this.bot.$stars[this.anchor2Index]).x-R(this.bot.$stars[this.anchor1Index]).x)/(q[this.anchor2Index].x-q[this.anchor1Index].x)}constructor(o,p,l,f,g){this.bot=o;if(f===void 0||g===void 0)this.globalX=p,this.globalY=l;else this.globalX=p*U+f,this.globalY=l*U+g;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,p=1/0;for(let l=0;l<q.length;l++){let{x:f,y:g}=q[l];if(f<this.globalX&&g<this.globalY){let w=this.globalX-f+(this.globalY-g);if(w<o)o=w,this.anchor1Index=l}else if(f>this.globalX&&g>this.globalY){let w=f-this.globalX+(g-this.globalY);if(w<p)p=w,this.anchor2Index=l}}}toScreenPosition(){let o=q[this.anchor1Index],p=R(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+p.x,y:(this.globalY-o.y)*this.pixelSize+p.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:p}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:p-window.innerHeight/3})}clone(){return new N(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}var To="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg",Qo;((M)=>{M.RANDOM="RANDOM";M.HUMANIZED="HUMANIZED";M.HUMAN_SOFT_DITHER="HUMAN_SOFT_DITHER";M.HUMAN_PATCHY="HUMAN_PATCHY";M.HUMAN_SWEEP_ARCS="HUMAN_SWEEP_ARCS";M.HUMAN_MICRO_CORRECTIONS="HUMAN_MICRO_CORRECTIONS";M.HUMAN_JITTER_FILL="HUMAN_JITTER_FILL";M.HUMAN_CORNER_BIAS="HUMAN_CORNER_BIAS";M.HUMAN_LONG_STROKES="HUMAN_LONG_STROKES";M.HUMAN_TAP_CLUSTERS="HUMAN_TAP_CLUSTERS";M.HUMAN_MESSY_SPIRAL="HUMAN_MESSY_SPIRAL";M.HUMAN_DRUNK_WALK="HUMAN_DRUNK_WALK";M.HUMAN_NOISE_CLOUD="HUMAN_NOISE_CLOUD";M.HUMAN_PATCH_JUMP="HUMAN_PATCH_JUMP";M.ZIGZAG="ZIGZAG";M.BRUSH_STROKES="BRUSH_STROKES";M.DIAGONAL_BRUSH="DIAGONAL_BRUSH";M.DOWN="DOWN";M.UP="UP";M.LEFT="LEFT";M.RIGHT="RIGHT";M.SPIRAL_FROM_CENTER="SPIRAL_FROM_CENTER";M.SPIRAL_TO_CENTER="SPIRAL_TO_CENTER";M.SCRIBBLE="SCRIBBLE";M.CROSSHATCH="CROSSHATCH";M.WAVE_SWEEP="WAVE_SWEEP";M.SCATTERED_LINES="SCATTERED_LINES";M.CONTOUR_JITTER="CONTOUR_JITTER";M.SPIRAL_WOBBLE="SPIRAL_WOBBLE";M.CLUSTER_BURSTS="CLUSTER_BURSTS";M.ORBITAL="ORBITAL";M.FLOW_FIELD="FLOW_FIELD";M.EDGE_IN="EDGE_IN"})(Qo||={});class C extends I{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(o,p){return new C(o,N.fromJSON(o,p.position),await d.fromJSON(o,p.pixels),p.strategy,p.opacity,p.drawTransparentPixels,p.drawColorsInOrder,p.colors,p.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;logoPreviewMask;logoPreviewImage;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,p,l,f="SPIRAL_FROM_CENTER",g=50,w=!1,c=!1,a=[],b=!1){super();this.bot=o;this.position=p;this.pixels=l;this.strategy=f;this.opacity=g;this.drawTransparentPixels=w;this.drawColorsInOrder=c;this.colors=a;this.lock=b;this.element.innerHTML=Jo,this.element.classList.add("wimage"),B(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,K(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),K(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let r;this.registerEvent(this.$brightness,"change",()=>{clearTimeout(r),r=setTimeout(()=>{this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),K(this.bot)},1000)}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),K(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,K(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,K(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),K(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(s)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(s.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(s)=>{if(s.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let s of this.element.querySelectorAll(".resize"))this.registerEvent(s,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),p=new Set,l=new Map;for(let f=0;f<this.colors.length;f++){let g=this.colors[f];if(g.disabled)p.add(g.realColor);l.set(g.realColor,f)}for(let{x:f,y:g}of this.strategyPositionIterator()){let w=this.pixels.pixels[g][f];if(p.has(w))continue;o.globalX=this.position.globalX+f,o.globalY=this.position.globalY+g;let c=o.getMapColor();if(w!==c&&(this.drawTransparentPixels||w!==0))this.tasks.push({position:o.clone(),color:w})}if(this.drawColorsInOrder)this.tasks.sort((f,g)=>(l.get(f.color)??0)-(l.get(g.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:p}=this.position.toScreenPosition(),l=Math.round(this.position.pixelSize*this.pixels.width),f=Math.round(this.position.pixelSize*this.pixels.height);this.element.style.transform=`translate3d(${Math.round(o)}px, ${Math.round(p)}px, 0)`,this.element.style.width=`${l}px`,this.element.style.height=`${f}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let g=this.pixels.pixels.length*this.pixels.pixels[0].length,w=Math.max(0,g-this.tasks.length),c=g>0?w/g*100|0:0;this.$progressText.textContent=`${w}/${g} ${c}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${c/100})`,this.$wrapper.classList[this.lock?"add":"remove"]("no-pointer-events"),this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),po(this.bot.images,this),this.bot.widget.update(),K(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let l=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-l.left,offsetY:o.clientY-l.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let p=this.$colorsDialog.getBoundingClientRect(),l=Math.max(8,window.innerWidth-p.width-8),f=Math.max(8,window.innerHeight-p.height-8),g=Math.min(l,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),w=Math.min(f,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(g)}px`,this.$colorsDialog.style.top=`${Math.round(w)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations();let o=this.$strategy.value,p=Object.values(Qo).sort((f,g)=>{if(f===o)return-1;if(g===o)return 1;return 0});this.$previewDialogList.innerHTML="";let l=document.createDocumentFragment();for(let f=0;f<p.length;f++){let g=p[f],w=document.createElement("article");w.className="preview-card";let c=document.createElement("strong");c.textContent=this.getStrategyLabel(g);let a=document.createElement("canvas");a.className="preview-canvas",a.width=156,a.height=156,this.paintStrategyPreview(a,g),w.append(c,a),l.append(w)}this.$previewDialogList.append(l)}getStrategyLabel(o){switch(o){case"RANDOM":return z("random");case"HUMANIZED":return z("humanized");case"HUMAN_SOFT_DITHER":return z("humanSoftDither");case"HUMAN_PATCHY":return z("humanPatchy");case"HUMAN_SWEEP_ARCS":return z("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return z("humanMicroCorrections");case"HUMAN_JITTER_FILL":return z("humanJitterFill");case"HUMAN_CORNER_BIAS":return z("humanCornerBias");case"HUMAN_LONG_STROKES":return z("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return z("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return z("humanMessySpiral");case"HUMAN_DRUNK_WALK":return z("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return z("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return z("humanPatchJump");case"ZIGZAG":return z("zigzag");case"BRUSH_STROKES":return z("brushStrokes");case"DIAGONAL_BRUSH":return z("diagonalBrush");case"DOWN":return z("down");case"UP":return z("up");case"LEFT":return z("left");case"RIGHT":return z("right");case"SPIRAL_FROM_CENTER":return z("spiralOut");case"SPIRAL_TO_CENTER":return z("spiralIn");case"SCRIBBLE":return z("scribble");case"CROSSHATCH":return z("crosshatch");case"WAVE_SWEEP":return z("waveSweep");case"SCATTERED_LINES":return z("scatteredLines");case"CONTOUR_JITTER":return z("contourJitter");case"SPIRAL_WOBBLE":return z("spiralWobble");case"CLUSTER_BURSTS":return z("clusterBursts");case"ORBITAL":return z("orbital");case"FLOW_FIELD":return z("flowField");case"EDGE_IN":return z("edgeIn");default:return o}}paintStrategyPreview(o,p){let l=o.getContext("2d");if(!l)return;l.fillStyle="#0f1526",l.fillRect(0,0,o.width,o.height);let f=this.getLogoPreviewMask(),g=this.strategy;this.strategy=p;let w=[...this.strategyPositionIterator()];this.strategy=g;let c=new Set(f.map(({x:m,y:G})=>`${m}:${G}`)),a=w.filter(({x:m,y:G})=>c.has(`${m}:${G}`)),b=o.width/this.pixels.width,r=this.previewAnimations.get(o);if(r)cancelAnimationFrame(r),this.previewAnimationHandles.delete(r);let s=(m)=>{let G=requestAnimationFrame((Y)=>{this.previewAnimationHandles.delete(G),m(Y)});return this.previewAnimationHandles.add(G),G},u=(m)=>{l.fillStyle="#0f1526",l.fillRect(0,0,o.width,o.height),this.paintLogoGhost(l,b,f);for(let G=0;G<Math.min(m,a.length);G++){let Y=a[G],j=G/Math.max(1,a.length-1);l.fillStyle=`hsl(${220-j*110} 90% ${43+j*18}%)`,l.fillRect(Y.x*b,Y.y*b,Math.max(1,b),Math.max(1,b))}},H=Math.min(5200,Math.max(1800,a.length*14)),A=520,J=(m,G)=>{if(!this.$previewDialog.open)return;let Y=G-m,j=Math.min(1,Y/H);u(Math.floor(a.length*j));let E=j>=1?s((W)=>{if(W-G<A){let F=s((i)=>{J(m,i)});this.previewAnimations.set(o,F);return}let $=s((F)=>{J(F,F)});this.previewAnimations.set(o,$)}):s((W)=>{J(m,W)});this.previewAnimations.set(o,E)},Q=performance.now();J(Q,Q)}paintLogoGhost(o,p,l){if(this.logoPreviewImage){o.save(),o.globalAlpha=0.22,o.drawImage(this.logoPreviewImage,0,0,this.pixels.width*p,this.pixels.height*p),o.restore();return}o.fillStyle="rgb(115 132 190 / 28%)";for(let f=0;f<l.length;f++){let g=l[f];o.fillRect(g.x*p,g.y*p,Math.max(1,p),Math.max(1,p))}}getLogoPreviewMask(){if(this.logoPreviewMask)return this.logoPreviewMask;this.logoPreviewMask=this.fallbackPreviewMask();let o=new Image;return o.src=To,o.decode().then(()=>{this.logoPreviewImage=o;let p=document.createElement("canvas");p.width=this.pixels.width,p.height=this.pixels.height;let l=p.getContext("2d");if(!l)return;if(l.clearRect(0,0,p.width,p.height),l.drawImage(o,0,0,p.width,p.height),this.logoPreviewMask=this.alphaMaskFromCanvas(l,p.width,p.height),this.$previewDialog.open)this.renderStrategyPreviewSamples()}).catch(()=>{return}),this.logoPreviewMask}alphaMaskFromCanvas(o,p,l){let f=o.getImageData(0,0,p,l).data,g=[];for(let w=0;w<l;w++)for(let c=0;c<p;c++)if((f[(w*p+c)*4+3]??0)>24)g.push({x:c,y:w});return g.length?g:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],p=this.pixels.width/2,l=this.pixels.height/2,f=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let g=0;g<this.pixels.height;g++)for(let w=0;w<this.pixels.width;w++)if((w-p)**2+(g-l)**2<=f**2)o.push({x:w,y:g});return o}applyLocale(){if(B(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let p=X[o]??"0,0,0",[l=0,f=0,g=0]=p.split(",").map((w)=>Number.parseInt(w,10));return`#${[l,f,g].map((w)=>w.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let p=X[o]??"0,0,0",[l=0,f=0,g=0]=p.split(",").map((b)=>Number.parseInt(b,10)),w=Math.max(l,f,g),c=Math.min(l,f,g);if(w-c<15)return["gray","grey","gris","neutral","neutro"];if(l>f+30&&l>g+30)return["red","rojo"];if(f>l+30&&f>g+30)return["green","verde"];if(g>l+30&&g>f+30)return["blue","azul"];if(l>170&&f>120&&g<130)return["orange","naranja"];if(l>170&&f>110&&g>140)return["pink","rosa"];if(l>120&&f<100&&g>120)return["purple","violet","morado"];if(l>130&&f>130&&g<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",z("colorPanelResults"));let p=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((l)=>!this.pixels.colors.has(l.realColor)))this.colors=this.pixels.colors.values().toArray().sort((l,f)=>f.amount-l.amount).map((l)=>({realColor:l.realColor,disabled:!1})),K(this.bot);for(let l=0;l<this.colors.length;l++){let f=this.colors[l],g=this.pixels.colors.get(f.realColor),w=!1,c=g.realColor!==g.color,a=g.amount/o*100,b=this.colorHex(g.realColor),r=this.colorKeywords(g.realColor),s=()=>{f.disabled=f.disabled?void 0:!0,u.classList.toggle("disabled",Boolean(f.disabled));let A=u.querySelector(".state");if(A)A.textContent=f.disabled?z("disabled"):z("enabled");K(this.bot)},u=document.createElement("button");if(u.className=`color-chip ${f.disabled?"disabled":""}`,u.draggable=!0,u.setAttribute("aria-label",`${z("overlayColors")} #${l+1}: ${b.toUpperCase()}`),u.innerHTML=`<span class="order-index">#${l+1}</span>
<span class="drag" title="${z("up")} / ${z("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${a.toFixed(1)}%</span>
  <span class="hex">${b.toUpperCase()}</span>
  <span class="state">${f.disabled?z("disabled"):z("enabled")}</span>
</span>
<span class="premium ${c?"on":""}">${c?z("premium"):""}</span>`,u.querySelector(".swatch").style.setProperty("--swatch-color",Ao(g.realColor)),u.addEventListener("click",()=>{if(w){w=!1;return}s()}),u.addEventListener("dragstart",(A)=>{w=!0,u.classList.add("dragging"),A.dataTransfer?.setData("text/plain",String(l)),A.dataTransfer.effectAllowed="move"}),u.addEventListener("dragend",()=>{u.classList.remove("dragging")}),u.addEventListener("dragover",(A)=>{A.preventDefault(),u.classList.add("drag-target")}),u.addEventListener("dragleave",()=>{u.classList.remove("drag-target")}),u.addEventListener("drop",(A)=>{A.preventDefault(),u.classList.remove("drag-target");let J=Number.parseInt(A.dataTransfer?.getData("text/plain")??"-1",10);if(J<0||J===l||J>=this.colors.length)return;this.colors.splice(l,0,...this.colors.splice(J,1)),K(this.bot),this.updateColors()}),c){let A=document.createElement("button");A.textContent=z("buy"),A.className="buy-chip",A.addEventListener("click",(J)=>{J.stopPropagation(),document.getElementById("color-"+g.realColor)?.click()}),u.append(A)}let H=`${b} ${r.join(" ")} ${g.realColor} ${X[g.realColor]}`;if(!p||H.toLowerCase().includes(p))this.$colorsDialogList.append(u)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,p=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let l=0;l<p;l++)for(let f=0;f<o;f++)yield{x:f,y:l};break}case"UP":{for(let l=p-1;l>=0;l--)for(let f=0;f<o;f++)yield{x:f,y:l};break}case"LEFT":{for(let l=0;l<o;l++)for(let f=0;f<p;f++)yield{x:l,y:f};break}case"RIGHT":{for(let l=o-1;l>=0;l--)for(let f=0;f<p;f++)yield{x:l,y:f};break}case"RANDOM":{let l=[];for(let f=0;f<p;f++)for(let g=0;g<o;g++)l.push({x:g,y:f});for(let f=l.length-1;f>=0;f--){let g=Math.floor(Math.random()*(f+1)),w=l[f];l[f]=l[g],l[g]=w}yield*l;break}case"ZIGZAG":{for(let l=0;l<p;l++)if(l%2===0)for(let f=0;f<o;f++)yield{x:f,y:l};else for(let f=o-1;f>=0;f--)yield{x:f,y:l};break}case"HUMANIZED":{let l=Math.max(4,Math.floor(Math.min(o,p)/10)),f=[];for(let g=0;g<p;g+=l)for(let w=0;w<o;w+=l)f.push({x:w,y:g});for(let g=f.length-1;g>=0;g--){let w=Math.floor(Math.random()*(g+1)),c=f[g];f[g]=f[w],f[w]=c}for(let g=0;g<f.length;g++){let w=f[g],c=Math.min(p,w.y+l),a=Math.min(o,w.x+l);for(let b=w.y;b<c;b++)if(Math.random()>0.35)for(let s=w.x;s<a;s++)yield{x:s,y:b};else for(let s=a-1;s>=w.x;s--)yield{x:s,y:b}}break}case"HUMAN_SOFT_DITHER":{let l=new Set;for(let f=0;f<p;f++){let g=Math.floor(Math.random()*3)-1;if((f+g)%2===0)for(let c=0;c<o;c+=2)l.add(`${c},${f}`),yield{x:c,y:f};else for(let c=1;c<o;c+=2)l.add(`${c},${f}`),yield{x:c,y:f}}for(let f=0;f<p;f++)for(let g=0;g<o;g++){let w=`${g},${f}`;if(l.has(w))continue;yield{x:g,y:f}}break}case"HUMAN_PATCHY":{let l=new Set,f=o*p;while(l.size<f){let g=Math.floor(Math.random()*o),w=Math.floor(Math.random()*p),c=1+Math.floor(Math.random()*5);for(let a=w-c;a<=w+c;a++)for(let b=g-c;b<=g+c;b++){if(b<0||b>=o||a<0||a>=p)continue;if(Math.hypot(b-g,a-w)>c+Math.random()*1.2)continue;let r=`${b},${a}`;if(l.has(r))continue;l.add(r),yield{x:b,y:a}}}break}case"HUMAN_SWEEP_ARCS":{let l=new Set,f=(o-1)/2,g=(p-1)/2,w=Math.hypot(f,g);for(let c=0;c<4;c++){let a=Math.random()*Math.PI*2;for(let b=0;b<=w;b+=0.35){let r=Math.PI/2+Math.random()*(Math.PI/1.5),s=Math.max(10,Math.floor(b*8));for(let u=0;u<s;u++){let H=a+r*u/s+Math.sin(b)*0.08,A=Math.round(f+Math.cos(H)*b),J=Math.round(g+Math.sin(H)*b);if(A<0||A>=o||J<0||J>=p)continue;let Q=`${A},${J}`;if(l.has(Q))continue;l.add(Q),yield{x:A,y:J}}}}for(let c=0;c<p;c++)for(let a=0;a<o;a++){let b=`${a},${c}`;if(l.has(b))continue;yield{x:a,y:c}}break}case"HUMAN_MICRO_CORRECTIONS":{let l=new Set;for(let f=0;f<p;f++){let g=f%2===0?1:-1,w=g>0?0:o-1;for(let c=0;c<o;c++){let a=w+(Math.random()>0.82?g:0),b=f+(Math.random()>0.9?1:0);for(let r of[{x:w,y:f},{x:a,y:f},{x:w,y:b}]){if(r.x<0||r.x>=o||r.y<0||r.y>=p)continue;let s=`${r.x},${r.y}`;if(l.has(s))continue;l.add(s),yield r}w+=g}}for(let f=0;f<p;f++)for(let g=0;g<o;g++){let w=`${g},${f}`;if(l.has(w))continue;yield{x:g,y:f}}break}case"HUMAN_JITTER_FILL":{let l=[];for(let f=0;f<p;f++)for(let g=0;g<o;g++)l.push({x:g,y:f});l.sort((f,g)=>{let w=f.y+(Math.random()-0.5)*1.8,c=g.y+(Math.random()-0.5)*1.8;if(w!==c)return w-c;return f.x+(Math.random()-0.5)*2-(g.x+(Math.random()-0.5)*2)}),yield*l;break}case"HUMAN_CORNER_BIAS":{let l=[{x:0,y:0},{x:o-1,y:0},{x:0,y:p-1},{x:o-1,y:p-1}],f=l[Math.floor(Math.random()*l.length)],g=[];for(let w=0;w<p;w++)for(let c=0;c<o;c++){let b=Math.hypot(c-f.x,w-f.y)+Math.random()*3.5;g.push({point:{x:c,y:w},score:b})}g.sort((w,c)=>w.score-c.score);for(let w of g)yield w.point;break}case"HUMAN_LONG_STROKES":{let l=new Set,f=o*p;while(l.size<f){let g=Math.floor(Math.random()*o),w=Math.floor(Math.random()*p),c=Math.random()*Math.PI*2,a=Math.sign(Math.cos(c)),b=Math.sign(Math.sin(c)),r=10+Math.floor(Math.random()*40);for(let s=0;s<r;s++){if(g<0||g>=o||w<0||w>=p)break;let u=`${g},${w}`;if(!l.has(u))l.add(u),yield{x:g,y:w};if(Math.random()>0.78)g+=b,w+=a;else g+=a,w+=b}}break}case"HUMAN_TAP_CLUSTERS":{let l=new Set,f=o*p;while(l.size<f){let g=Math.floor(Math.random()*o),w=Math.floor(Math.random()*p),c=3+Math.floor(Math.random()*10);for(let a=0;a<c;a++){let b=Math.round(g+(Math.random()-0.5)*6),r=Math.round(w+(Math.random()-0.5)*6);if(b<0||b>=o||r<0||r>=p)continue;let s=`${b},${r}`;if(l.has(s))continue;l.add(s),yield{x:b,y:r}}}break}case"HUMAN_MESSY_SPIRAL":{let l=new Set,f=(o-1)/2,g=(p-1)/2,w=Math.hypot(f,g)+2;for(let c=0;l.size<o*p;c++){let a=c/3,b=Math.min(w,a*0.18),r=a*0.29+Math.sin(a*0.13)*0.8,s=Math.round(f+Math.cos(r)*b+Math.sin(a)*0.7),u=Math.round(g+Math.sin(r)*b+Math.cos(a)*0.7);if(s<0||s>=o||u<0||u>=p){if(c>o*p*18)break;continue}let H=`${s},${u}`;if(l.has(H)){if(Math.random()>0.9)continue}else l.add(H),yield{x:s,y:u};if(c>o*p*18)break}for(let c=0;c<p;c++)for(let a=0;a<o;a++){let b=`${a},${c}`;if(l.has(b))continue;yield{x:a,y:c}}break}case"HUMAN_DRUNK_WALK":{let l=new Set,f=Math.floor(Math.random()*o),g=Math.floor(Math.random()*p),w=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(l.size<o*p){let c=`${f},${g}`;if(!l.has(c))l.add(c),yield{x:f,y:g};let a=[];for(let s of w){let u=f+s.x,H=g+s.y;if(u<0||u>=o||H<0||H>=p)continue;a.push({x:u,y:H})}if(!a.length)break;let b=a.filter((s)=>{return!l.has(`${s.x},${s.y}`)});if(b.length&&Math.random()>0.2){let s=b[Math.floor(Math.random()*b.length)];f=s.x,g=s.y;continue}let r=a[Math.floor(Math.random()*a.length)];f=r.x,g=r.y}for(let c=0;c<p;c++)for(let a=0;a<o;a++){let b=`${a},${c}`;if(l.has(b))continue;yield{x:a,y:c}}break}case"HUMAN_NOISE_CLOUD":{let l=[];for(let f=0;f<p;f++)for(let g=0;g<o;g++){let w=Math.sin((g+1)*0.93+Math.random()*0.8)+Math.cos((f+1)*1.17+Math.random()*0.8),c=(Math.random()-0.5)*2.6,a=Math.hypot(g-o/2,f-p/2)*0.08;l.push({point:{x:g,y:f},score:w+c+a})}l.sort((f,g)=>f.score-g.score);for(let f of l)yield f.point;break}case"HUMAN_PATCH_JUMP":{let l=new Set,f=[];for(let g=0;g<Math.max(6,o*p/18);g++)f.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});while(l.size<o*p){let g=f[Math.floor(Math.random()*f.length)],w=1+Math.floor(Math.random()*3),c=1+Math.floor(Math.random()*3);for(let a=g.y-c;a<=g.y+c;a++)for(let b=g.x-w;b<=g.x+w;b++){if(b<0||b>=o||a<0||a>=p)continue;if(Math.random()>0.86)continue;let r=`${b},${a}`;if(l.has(r))continue;l.add(r),yield{x:b,y:a}}if(Math.random()>0.72&&f.length<o*p/2)f.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});if(l.size>o*p*0.92)break}for(let g=0;g<p;g++)for(let w=0;w<o;w++){let c=`${w},${g}`;if(l.has(c))continue;yield{x:w,y:g}}break}case"DIAGONAL_BRUSH":{for(let l=0;l<o+p-1;l++){let f=l%2===0,g=[],w=Math.max(0,l-o+1),c=Math.min(p-1,l);for(let a=w;a<=c;a++){let b=l-a;if(b>=0&&b<o)g.push({x:b,y:a})}if(Math.random()>0.55)g.reverse();if(f)for(let a=g.length-1;a>=0;a--)yield g[a];else yield*g}break}case"BRUSH_STROKES":{let l=Array.from({length:p},()=>Array(o).fill(!1)),f=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],g=(a,b)=>a>=0&&a<o&&b>=0&&b<p,w=0,c=o*p;for(let a=0;a<c*6&&w<c;a++){let b=Math.floor(Math.random()*o),r=Math.floor(Math.random()*p),s=f[Math.floor(Math.random()*f.length)],u=3+Math.floor(Math.random()*16);for(let H=0;H<u;H++){if(!g(b,r))break;if(!l[r][b])l[r][b]=!0,w++,yield{x:b,y:r};if(Math.random()>0.72)s=f[Math.floor(Math.random()*f.length)];b+=s.x,r+=s.y}}for(let a=0;a<p;a++)for(let b=0;b<o;b++)if(!l[a][b])yield{x:b,y:a};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let l=new Set,f=o*p,g=Math.floor(o/2),w=Math.floor(p/2),c=[[1,0],[0,1],[-1,0],[0,-1]],a=0,b=1,r=(u,H)=>u>=0&&u<o&&H>=0&&H<p,s=function*(){let u=0;while(u<f){for(let H=0;H<2;H++){for(let A=0;A<b;A++){if(r(g,w)){let J=`${g},${w}`;if(!l.has(J)){if(l.add(J),yield{x:g,y:w},u++,u>=f)return}}g+=c[a][0],w+=c[a][1]}a=(a+1)%4}b++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*s();else{let u=[...s()];for(let H=u.length-1;H>=0;H--)yield u[H]}break}case"SCRIBBLE":{let l=new Set,f=o*p,g=Math.floor(o/2),w=Math.floor(p/2);for(let c=0;l.size<f&&c<f*24;c++){let a=`${g},${w}`;if(!l.has(a))l.add(a),yield{x:g,y:w};if(g+=Math.floor(Math.random()*3)-1,w+=Math.floor(Math.random()*3)-1,g<0||g>=o||w<0||w>=p)g=Math.floor(Math.random()*o),w=Math.floor(Math.random()*p)}for(let c=0;c<p;c++)for(let a=0;a<o;a++){let b=`${a},${c}`;if(l.has(b))continue;l.add(b),yield{x:a,y:c}}break}case"CROSSHATCH":{let l=[];for(let w=0;w<o+p-1;w++)for(let c=Math.max(0,w-o+1);c<=Math.min(p-1,w);c++){let a=w-c;l.push({x:a,y:c})}let f=[];for(let w=-p+1;w<o;w++)for(let c=0;c<p;c++){let a=c+w;if(a>=0&&a<o)f.push({x:a,y:c})}let g=new Set;for(let w of[...l,...f]){let c=`${w.x},${w.y}`;if(g.has(c))continue;g.add(c),yield w}break}case"WAVE_SWEEP":{let l=new Set;for(let f=0;f<o;f++){let w=(Math.sin(f/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(p-1)|0;for(let c=0;c<p;c++){let a=w+c,b=w-c;for(let r of[a,b]){if(r<0||r>=p)continue;let s=`${f},${r}`;if(l.has(s))continue;l.add(s),yield{x:f,y:r}}}}break}case"SCATTERED_LINES":{let l=new Set,f=o*p;for(let g=0;l.size<f&&g<f*14;g++){let w=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),a=Math.random()*Math.PI*2,b=Math.round(Math.cos(a)),r=Math.round(Math.sin(a)),s=6+Math.floor(Math.random()*28);for(let u=0;u<s;u++){if(w<0||w>=o||c<0||c>=p)break;let H=`${w},${c}`;if(!l.has(H))l.add(H),yield{x:w,y:c};w+=b,c+=r}}for(let g=0;g<p;g++)for(let w=0;w<o;w++){let c=`${w},${g}`;if(l.has(c))continue;l.add(c),yield{x:w,y:g}}break}case"CONTOUR_JITTER":{let l=new Set;for(let f=0;f<Math.ceil(Math.min(o,p)/2);f++){let g=[],w=f,c=f,a=o-f-1,b=p-f-1;for(let r=w;r<=a;r++)g.push({x:r,y:c});for(let r=c+1;r<=b;r++)g.push({x:a,y:r});for(let r=a-1;r>=w;r--)g.push({x:r,y:b});for(let r=b-1;r>c;r--)g.push({x:w,y:r});for(let r=g.length-1;r>0;r--){let s=Math.floor(Math.random()*(r+1)),u=g[r];g[r]=g[s],g[s]=u}for(let r of g){let s=`${r.x},${r.y}`;if(l.has(s))continue;l.add(s),yield r}}break}case"SPIRAL_WOBBLE":{let l=new Set,f=o/2,g=p/2,w=Math.hypot(f,g);for(let c=0;l.size<o*p&&c<o*p*9;c++){let a=c/(o*p*9)*w,b=c*0.31+Math.sin(c*0.07)*0.7,r=Math.round(f+Math.cos(b)*a),s=Math.round(g+Math.sin(b)*a);if(r<0||r>=o||s<0||s>=p)continue;let u=`${r},${s}`;if(l.has(u))continue;l.add(u),yield{x:r,y:s}}for(let c=0;c<p;c++)for(let a=0;a<o;a++){let b=`${a},${c}`;if(l.has(b))continue;yield{x:a,y:c}}break}case"CLUSTER_BURSTS":{let l=new Set,f=o*p;for(let g=0;l.size<f&&g<f*12;g++){let w=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),a=2+Math.floor(Math.random()*10);for(let b=c-a;b<=c+a;b++)for(let r=w-a;r<=w+a;r++){if(r<0||r>=o||b<0||b>=p)continue;if(Math.hypot(r-w,b-c)>a)continue;let s=`${r},${b}`;if(l.has(s))continue;l.add(s),yield{x:r,y:b}}}for(let g=0;g<p;g++)for(let w=0;w<o;w++){let c=`${w},${g}`;if(l.has(c))continue;l.add(c),yield{x:w,y:g}}break}case"ORBITAL":{let l=new Set,f=(o-1)/2,g=(p-1)/2,w=Math.ceil(Math.max(f,g));for(let c=0;c<=w;c++){let a=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,c)*2));for(let b=0;b<a;b++){let r=b/a*Math.PI*2+(c%2?0.3:-0.3),s=Math.round(f+Math.cos(r)*c),u=Math.round(g+Math.sin(r)*c);if(s<0||s>=o||u<0||u>=p)continue;let H=`${s},${u}`;if(l.has(H))continue;l.add(H),yield{x:s,y:u}}}for(let c=0;c<p;c++)for(let a=0;a<o;a++){let b=`${a},${c}`;if(l.has(b))continue;yield{x:a,y:c}}break}case"FLOW_FIELD":{let l=new Set,f=o*p;for(let g=0;l.size<f&&g<f*18;g++){let w=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p);for(let a=0;a<120;a++){if(w<0||w>=o||c<0||c>=p)break;let b=`${w},${c}`;if(!l.has(b))l.add(b),yield{x:w,y:c};let r=Math.sin(w*0.09)*1.8+Math.cos(c*0.08)*1.6+Math.sin((w+c)*0.05);w+=Math.round(Math.cos(r)),c+=Math.round(Math.sin(r))}}for(let g=0;g<p;g++)for(let w=0;w<o;w++){let c=`${w},${g}`;if(l.has(c))continue;l.add(c),yield{x:w,y:g}}break}case"EDGE_IN":{let l=new Set,f=Math.ceil(Math.min(o,p)/2);for(let g=0;g<f;g++){let w=g,c=o-1-g,a=g,b=p-1-g;for(let r=w;r<=c;r++)for(let s of[a,b]){let u=`${r},${s}`;if(l.has(u))continue;l.add(u),yield{x:r,y:s}}for(let r=a+1;r<=b-1;r++)for(let s of[w,c]){let u=`${s},${r}`;if(l.has(u))continue;l.add(u),yield{x:s,y:r}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),K(this.bot)}move(o){if(!this.moveInfo)return;let p=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),l=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=p+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-p)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,p+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=l+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-l)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,l+this.moveInfo.height);this.update(),K(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let p=o.target;if(p.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(p.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(p.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(p.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${v}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var Uo=`/* stylelint-disable declaration-no-important */
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
  display: grid;
  place-items: center;
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
  color: #86d7ff;
}

.wwidget .images .image .image-controls .preview-strategy {
  color: #d8b4ff;
}

.wwidget .images .image .image-controls .download {
  color: #7cf5c1;
}

.wwidget .images .image .image-controls .up,
.wwidget .images .image .image-controls .down {
  color: #b7c4f8;
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
  color: #edf2ff;
  appearance: none;
}

.wform select option {
  background: #eef2ff;
  color: #0f172a;
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
  position: relative;
  top: 0;
  z-index: 2;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 2px 42px 8px 0;
  background: linear-gradient(180deg, rgb(19 28 52 / 98%), rgb(19 28 52 / 72%));
  backdrop-filter: blur(4px);
}

.colors-dialog {
  overflow: auto;
  width: min(560px, 92vw);
  min-width: min(320px, 92vw);
  min-height: 420px;
  max-height: min(85dvh, 680px);
  padding: 12px;
  resize: both;
}

.colors-dialog-head {
  cursor: move;
  user-select: none;
}

.close-colors {
  min-width: 34px;
}

.kgm-modal .modal-close {
  position: absolute;
  top: 0;
  right: 0;
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

.kgm-modal .modal-close .icon {
  font-size: 14px;
  line-height: 1;
}

.kgm-modal .modal-close:hover {
  border-color: #9fb0ff;
  box-shadow:
    0 10px 22px rgb(7 12 24 / 40%),
    0 0 0 1px rgb(159 176 255 / 35%);
}

.preview-dialog {
  overflow: auto;
  width: min(760px, 94vw);
  min-width: min(330px, 92vw);
  max-height: min(86dvh, 720px);
  padding: 12px;
}

.preview-dialog-help {
  margin: 0 0 10px;
  color: #b4bfdc;
  font-size: 12px;
}

.preview-dialog-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  align-items: start;
  overflow: auto;
  max-height: min(70dvh, 600px);
  padding-right: 2px;
}

.preview-card {
  display: grid;
  gap: 8px;
  align-content: start;
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

.preview-card:hover {
  border-color: rgb(143 162 255 / 48%);
  box-shadow:
    0 12px 24px rgb(0 0 0 / 24%),
    inset 0 1px 0 rgb(255 255 255 / 5%);
  transform: translateY(-1px);
}

.preview-card strong {
  color: #dce6ff;
  font-size: 13px;
  line-height: 1.25;
}

.preview-canvas {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 8px;
  background: #0d1324;
  image-rendering: pixelated;
}

.colors-dialog-help {
  margin: 0 0 8px;
  color: #b4bfdc;
  font-size: 12px;
  line-height: 1.35;
}

.colors-dialog-help.order {
  color: #d6defa;
  font-weight: 600;
}

.color-search {
  width: 100%;
  margin-bottom: 10px;
}

.colors-dialog-list {
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

.colors-dialog .color-chip {
  display: grid !important;
  grid-template-columns: auto 18px 18px minmax(0, 1fr) auto auto;
  gap: 6px;
  align-items: center;
  width: 100%;
  padding: 6px;
  border: 1px solid rgb(143 162 255 / 20%) !important;
  border-radius: 8px;
  background: linear-gradient(180deg, #1a2540, #151d31) !important;
  color: var(--text) !important;
  font-size: 11px;
  text-align: left;
  white-space: normal;
  transition:
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    transform 0.22s ease;
}

.colors-dialog .color-chip:hover {
  border-color: rgb(143 162 255 / 52%);
  box-shadow: 0 10px 18px rgb(0 0 0 / 25%);
  transform: translateY(-1px);
}

.colors-dialog .color-chip .order-index {
  padding: 2px 6px;
  border-radius: 999px;
  background: #202a43;
  color: #b8c8ff;
  font-weight: 700;
  font-size: 10px;
}

.colors-dialog .color-chip.disabled {
  opacity: 0.65;
}

.colors-dialog .color-chip .swatch {
  width: 14px;
  height: 14px;
  border: 1px solid rgb(255 255 255 / 15%);
  border-radius: 4px;
  background: var(--swatch-color) !important;
}

.colors-dialog .color-chip .meta {
  display: grid;
  gap: 2px;
  justify-items: start;
  min-width: 0;
}

.colors-dialog .color-chip .meta .hex {
  padding: 1px 6px;
  border: 1px solid rgb(143 162 255 / 30%);
  border-radius: 999px;
  background: rgb(17 25 43 / 75%);
  color: #e6ecff;
  font-size: 10px;
  letter-spacing: 0.2px;
}

.colors-dialog .color-chip .premium.on {
  color: #ffd166;
}

.colors-dialog .color-chip .buy-chip {
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

.colors-dialog .color-chip .drag {
  color: #8da1e5;
  font-size: 12px;
  cursor: grab;
  user-select: none;
}

.colors-dialog .color-chip.dragging {
  border-style: dashed;
  opacity: 0.45;
}

.colors-dialog .color-chip.drag-target {
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

  .colors-dialog-list {
    grid-template-columns: 1fr;
  }

  .preview-dialog-list {
    grid-template-columns: 1fr;
  }

  .wwidget .images .image {
    grid-template-columns: 1fr;
  }

  .wwidget .images .image .image-controls {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
`;class e extends Error{name="KGlacerMacroError";constructor(o,p){super(o);p.widget.status=o}}class go extends e{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var D={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0}};function P(o,p){let l=p.key.toLowerCase(),f=o.key.toLowerCase(),w=l==="/"&&(f==="/"||f==="?"||o.code==="Slash")||f===l,c=p.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,a=p.ctrl===!0?!0:p.meta===!0?o.metaKey:!o.metaKey;return w&&o.shiftKey===Boolean(p.shift)&&c&&a&&o.altKey===Boolean(p.alt)}function No(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let p=o.tagName.toLowerCase();return p==="input"||p==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var Yo=`<button class="wopen-button" aria-label="Toggle widget">
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
`;var Do="kglacer-macro:overlay-hidden",$o="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class wo extends I{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$shortcuts;$locale;$topbar;$draw;$addImage;$toggleOverlay;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=Yo,B(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$shortcuts:".shortcuts",$locale:".locale",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$toggleOverlay:".toggle-overlay",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=$o,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=h(),this.$locale.addEventListener("change",()=>{t(this.$locale.value),B(this.element);for(let p=0;p<this.bot.images.length;p++)this.bot.images[p].applyLocale();this.refreshOverlayToggleText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run("Adding image",async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${v}`,o.click(),await V(o,["change"],["cancel","error"]);let p=o.files?.[0];if(!p)throw new go(this.bot);console.log("[KGM][Widget] File selected",{name:p.name,size:p.size,type:p.type});let l;if(p.name.endsWith(`.${v}`))l=await C.fromJSON(this.bot,JSON.parse(await p.text()));else{let f=new FileReader;f.readAsDataURL(p),await V(f,["load"],["error"]);let g=await this.compressImageBeforeLoad(f.result),w=new Image;w.src=g,await V(w,["load"],["error"]),l=new C(this.bot,N.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new d(this.bot,w))}this.bot.images.push(l),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),l.updateTasks(),K(this.bot,!0),console.log("[KGM][Widget] Image persisted, reloading page"),document.location.reload()},()=>{this.setDisabled("add-image",!1)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let p=new Image;if(p.src=o,await V(p,["load"],["error"]),!(p.naturalWidth*p.naturalHeight>3000000||o.length>3000000))return o;let f=document.createElement("canvas");f.width=p.naturalWidth,f.height=p.naturalHeight;let g=f.getContext("2d");if(!g)return o;return g.drawImage(p,0,0),f.toDataURL("image/png")}update(){this.$strategy.value=this.bot.strategy;let o=0,p=0;for(let w=0;w<this.bot.images.length;w++){let c=this.bot.images[w];o+=c.pixels.pixels.length*c.pixels.pixels[0].length,p+=c.tasks.length}let l=Math.max(0,o-p),f=o>0?l/o*100|0:0;this.$progressText.textContent=`${l}/${o} ${f}% ETA: ${p/120|0}h`,this.$progressLine.style.transform=`scaleX(${f/100})`,this.$images.innerHTML="";let g=document.createDocumentFragment();for(let w=0;w<this.bot.images.length;w++){let c=this.bot.images[w],a=document.createElement("div");g.append(a),a.className="image",a.innerHTML=`<button class="preview" title="View preview">
  <img src="${c.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${w===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${w===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,a.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=w,c.openPreviewPanel()}),a.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=w,c.openColorPanel()}),a.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=w,c.openPreviewPanel()}),a.querySelector(".download").addEventListener("click",()=>{c.exportImage()}),a.querySelector(".delete").addEventListener("click",()=>{c.destroy()}),a.querySelector(".up").addEventListener("click",()=>{lo(this.bot.images,w,w-1),this.update(),K(this.bot)}),a.querySelector(".down").addEventListener("click",()=>{lo(this.bot.images,w,w+1),this.update(),K(this.bot)})}this.$images.append(g)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Do)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let p=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",p),localStorage.setItem(Do,String(p)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${z("toggleOverlay")} (${z("disabled")})`:`${z("toggleOverlay")} (${z("enabled")})`}setDisabled(o,p){this.element.querySelector("."+o).disabled=p}async run(o,p,l,f="..."){console.log("[KGM][Widget] Task started",{status:o});let g=this.status;this.status=`${f} ${o}`;try{let w=await p();return this.status=g,console.log("[KGM][Widget] Task completed",{status:o}),w}catch(w){if(!(w instanceof e))console.error(w),this.status=`Error: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:w}),w}finally{await l?.()}}handleKeyboard(o){if(No(o.target))return;if(P(o,D.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(P(o,D.showShortcuts)){o.preventDefault(),this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(P(o,D.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(P(o,D.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(P(o,D.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(P(o,D.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(P(o,D.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(P(o,D.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(P(o,D.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),K(this.bot)}}var ho=2,Po="[KGM]",jo="kglacer-macro:access-ok",co="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Zo="kgm-access-locked";class Bo{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,p){if(p===void 0)console.log(`${Po} ${o}`);else console.log(`${Po} ${o}`,p)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Zo);let o=mo();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let l=0;l<o.images.length;l++){let f=o.images[l];n({x:f.position[0]-1000,y:f.position[1]-1000}),n({x:f.position[0]+1000,y:f.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let p=document.createElement("style");p.textContent=Uo.replace("FAKE_FAVORITE_LOCATIONS",k.length.toString()),document.head.append(p),this.log("Styles injected",{fakeFavoriteLocations:k.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Zo),this._widget=new wo(this),await this.widget.run("Initializing",async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let l=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((f)=>{for(let g=0;g<f.length;g++)if(f[g].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(l,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await Z(500),await this.updateColors(),o)for(let f=0;f<o.images.length;f++){let g=await C.fromJSON(this,o.images[f]);this.images.push(g),g.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(jo)===co)return;await new Promise((o)=>{let p=document.createElement("dialog");p.className="kgm-modal access-dialog",p.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(p),B(p);let l=p.querySelector(".access-input"),f=p.querySelector(".access-error"),g=p.querySelector(".access-locale");g.innerHTML=zo().map((w)=>`<option value="${w}" ${w===h()?"selected":""}>${w.toUpperCase()}</option>`).join(""),g.addEventListener("change",()=>{t(g.value),B(p)}),p.addEventListener("cancel",(w)=>{w.preventDefault()}),p.querySelector("form").addEventListener("submit",(w)=>{w.preventDefault();let c=atob(co);if(l.value.trim()!==c){f.textContent=z("invalidAccessKey");return}localStorage.setItem(jo,co),p.close(),p.remove(),o()}),p.showModal(),l.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),p=(l)=>{if(!l.shiftKey)l.stopPropagation()};return this.widget.run("Drawing",async()=>{await this.widget.run("Initializing draw",()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",p,!0),o.addEventListener("wheel",p,!0),this.updateTasks();let l=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((w)=>w.json()),f=Math.floor(l.charges.count);this.log("Charges fetched",{charges:f});let g=0;for(let w=0;w<this.images.length;w++)g+=this.images[w].tasks.length;switch(this.log("Tasks prepared",{tasks:g}),this.strategy){case"ALL":{while(f>0){let w=!0;for(let c=0;c<this.images.length;c++){let a=this.images[c].tasks.shift();if(!a)continue;this.drawTask(a),f--,await Z(1),w=!1}if(w)break}break}case"PERCENTAGE":{for(let w=0;w<g&&f>0;w++){let c=1,a;for(let b=0;b<this.images.length;b++){let r=this.images[b],s=1-r.tasks.length/(r.pixels.pixels.length*r.pixels.pixels[0].length);if(s<c)c=s,a=r}this.drawTask(a.tasks.shift()),f--,await Z(1)}break}case"SEQUENTIAL":for(let w=0;w<this.images.length;w++){let c=this.images[w];for(let a=c.tasks.shift();a&&f>0;a=c.tasks.shift())this.drawTask(a),f--,await Z(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:f})},()=>{globalThis.removeEventListener("mousemove",p,!0),o.removeEventListener("wheel",p,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:ho,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let p=document.querySelector(".maplibregl-canvas"),l=window.innerWidth/2,f=window.innerHeight/2,g=l-o.x,w=f-o.y;function c(a,b,r){p.dispatchEvent(new MouseEvent(a,{bubbles:!0,cancelable:!0,clientX:b,clientY:r,buttons:1}))}c("mousedown",l,f),c("mousemove",g,w),c("mouseup",g,w)}readMap(){this.mapsCache.clear();let o=new Set;for(let l=0;l<this.images.length;l++){let f=this.images[l],{tileX:g,tileY:w}=new N(this,f.position.globalX+f.pixels.pixels[0].length,f.position.globalY+f.pixels.pixels.length);for(let c=f.position.tileX;c<=g;c++)for(let a=f.position.tileY;a<=w;a++)o.add(`${c}/${a}`)}let p=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`Reading map [0/${o.size}]`,()=>Promise.all([...o].map(async(l)=>{this.mapsCache.set(l,await d.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${l}.png`,exactColor:!0})),this.widget.status=`⌛ Reading map [${++p}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let p=0,l=1,f=1/0,g=1/0;for(let a=0;a<this.$stars.length;a++){let{x:b,y:r}=R(this.$stars[a]);if(b<o.x&&r<o.y){let s=o.x-b+(o.y-r);if(s<f)f=s,p=a}else if(b>o.x&&r>o.y){let s=b-o.x+(r-o.y);if(s<g)g=s,l=a}}let w=R(this.$stars[p]),c=q[p];return{anchorScreenPosition:w,anchorWorldPosition:c,pixelSize:(R(this.$stars[l]).x-w.x)/(q[l].x-c.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await Z(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await Z(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await Z(1)}drawTask(o){if(this.lastColor!==o.color)document.getElementById("color-"+o.color).click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color});let p=o.position.pixelSize/2,l=o.position.toScreenPosition();document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:l.x+p,clientY:l.y+p,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let o=globalThis.fetch,p=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(l,f)=>{let g=await o(l,f),w=g.clone(),c="";if(typeof l=="string")c=l;else if(l instanceof Request)c=l.url;else if(l instanceof URL)c=l.href;if(g.url==="https://backend.wplace.live/me")this.me=await w.json(),this.me.favoriteLocations.unshift(...k),this.me.maxFavoriteLocations=1/0,g.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let a=p.exec(c);if(a){for(let b=0;b<this.markerPixelPositionResolvers.length;b++)this.markerPixelPositionResolvers[b](new N(this,+a[1],+a[2],+a[3],+a[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return g}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await Z(1)}waitForElement(o,p){return this.log("Waiting for element",{name:o,selector:p}),this.widget.run(`Waiting for ${o}`,()=>{return new Promise((l)=>{let f=document.querySelector(p);if(f){l(f);return}let g=new MutationObserver(()=>{let w=document.querySelector(p);if(w)g.disconnect(),l(w)});g.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,k.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new Bo;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;

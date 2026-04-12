// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      1.1.1
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
function e(C,a,l){let r=C[l];return C[l]=C[a],C[a]=r,C}function C1(C,a){let l=C.indexOf(a);if(l!==-1)C.splice(l,1);return l}var x1=Math.floor(Math.random()*65536),y1=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function J(C){return new Promise((a)=>setTimeout(a,C))}function Q(C,a,l=["error"],r="addEventListener"){return new Promise((f,t)=>{for(let s=0;s<a.length;s++)C[r]?.(a[s],f);for(let s=0;s<l.length;s++)C[r]?.(l[s],t)})}class Q1{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(C,a=15000){this.size=C,this.historyTime=a}push(C){if(C<0)throw new Error("Negative chunk size");let{time:a,historyTime:l}=this.getTime();if(this.history.push({time:a,chunk:C}),this.history[0]&&this.history[0].time+l<a)this.history.shift();this.sum+=C,delete this.statsCached}get stats(){if(!this.statsCached){let C=this.history.reduce((a,l)=>a+l.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:C}:{speed:C,percent:this.sum/this.size,eta:~~((this.size-this.sum)/C)*1000}}return this.statsCached}getTime(){let C=Date.now(),a=C-this.startTime,l=Math.min(a,this.historyTime);return{time:C,historyTime:l}}}class k{runOnDestroy=[];destroy(){for(let C=0;C<this.runOnDestroy.length;C++)this.runOnDestroy[C]()}populateElementsWithSelector(C,a){for(let l in a)this[l]=C.querySelector(a[l])}registerEvent(C,a,l,r={}){r.passive??=!0,C.addEventListener(a,l,r),this.runOnDestroy.push(()=>{C.removeEventListener(a,l)})}}function a1(C){return C>0.04045?((C+0.055)/1.055)**2.4:C/12.92}function n1(C,a,l){let r=a1(C/255),f=a1(a/255),t=a1(l/255),s=Math.cbrt(0.4122214708*r+0.5363325363*f+0.0514459929*t),o=Math.cbrt(0.2119034982*r+0.6806995451*f+0.1073969566*t),p=Math.cbrt(0.0883024619*r+0.2817188376*f+0.6299787005*t),M=0.2104542553*s+0.793617785*o-0.0040720468*p,n=1.9779984951*s-2.428592205*o+0.4505937099*p,Z=0.0259040371*s+0.7827717662*o-0.808675766*p;return[M,n,Z]}function Z1(C,a,l){let[r,f,t]=C,[s,o,p]=a,M=(y)=>y*180/Math.PI,n=(y)=>y*Math.PI/180,Z=1,F=1,w=1,B=Math.sqrt(f**2+t**2),m=Math.sqrt(o**2+p**2),E=(B+m)/2,b=0.5*(1-Math.sqrt(E**7/(E**7+6103515625))),j=f*(1+b),h=o*(1+b),A=Math.sqrt(j**2+t**2),W=Math.sqrt(h**2+p**2),P=t===0&&j===0?0:M(Math.atan2(t,j))%360,O=p===0&&h===0?0:M(Math.atan2(p,h))%360,K=s-r,T=W-A,L=0;if(A*W!==0){if(L=O-P,L>180)L-=360;else if(L<-180)L+=360}let s1=2*Math.sqrt(A*W)*Math.sin(n(L)/2),o1=(r+s)/2,v=(A+W)/2,V=(P+O)/2;if(Math.abs(P-O)>180)V+=180;let b1=1-0.17*Math.cos(n(V-30))+0.24*Math.cos(n(2*V))+0.32*Math.cos(n(3*V+6))-0.2*Math.cos(n(4*V-63)),J1=1+0.015*(o1-50)**2/Math.sqrt(20+(o1-50)**2),p1=1+0.045*v,M1=1+0.015*v*b1,G1=30*Math.exp((-((V-275)/25))**2),U1=-(2*Math.sqrt(v**7/(v**7+6103515625)))*Math.sin(n(2*G1));return Math.sqrt((K/(1*J1))**2+(T/(1*p1))**2+(s1/(1*M1))**2+U1*(T/(1*p1))*(s1/(1*M1)))-K*l}var N=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],u=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function $(C){if(C===0)return"transparent";let a=N[C];return`oklab(${a[0]*100}% ${a[1]} ${a[2]})`}var F1=["kglacermacro:locale"],l1={en:{widgetTitle:"KGlacerMacro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",random:"Random",humanized:"Humanized",humanSoftDither:"Human soft dither",humanPatchy:"Human patchy",humanSweepArcs:"Human sweep arcs",humanMicroCorrections:"Human micro corrections",humanJitterFill:"Human jitter fill",humanCornerBias:"Human corner bias",humanLongStrokes:"Human long strokes",humanTapClusters:"Human tap clusters",humanMessySpiral:"Human messy spiral",humanDrunkWalk:"Human drunk walk",humanNoiseCloud:"Human noise cloud",humanPatchJump:"Human patch jump",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",random:"Aleatorio",humanized:"Humanizado",humanSoftDither:"Difuminado humano suave",humanPatchy:"Parches humanos",humanSweepArcs:"Barridos humanos en arco",humanMicroCorrections:"Micro correcciones humanas",humanJitterFill:"Relleno humano con jitter",humanCornerBias:"Sesgo humano por esquina",humanLongStrokes:"Trazos humanos largos",humanTapClusters:"Toques humanos por grupos",humanMessySpiral:"Espiral humana irregular",humanDrunkWalk:"Caminata humana errática",humanNoiseCloud:"Nube humana de ruido",humanPatchJump:"Saltos humanos por parches",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays"}};function N1(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function r1(){let C=localStorage.getItem("kglacer-macro:locale");if(C&&C in l1)return C;for(let a=0;a<F1.length;a++){let l=localStorage.getItem(F1[a]);if(!l||!(l in l1))continue;return localStorage.setItem("kglacer-macro:locale",l),l}return N1()}function m1(C){localStorage.setItem("kglacer-macro:locale",C)}function d(C){let a=r1();return l1[a][C]}function X(C){for(let a of C.querySelectorAll("[data-i18n]"))a.textContent=d(a.dataset.i18n);for(let a of C.querySelectorAll("[data-i18n-title]"))a.setAttribute("title",d(a.dataset.i18nTitle));for(let a of C.querySelectorAll("[data-i18n-aria-label]"))a.setAttribute("aria-label",d(a.dataset.i18nAriaLabel));for(let a of C.querySelectorAll("[data-i18n-placeholder]"))a.setAttribute("placeholder",d(a.dataset.i18nPlaceholder))}var h1=`<div class="wtopbar">
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
`;class U{bot;image;width;brightness;exactColor;static async fromJSON(C,a){let l=new Image;return l.src=a.url.startsWith("http")?await fetch(a.url,{cache:"no-store"}).then((r)=>r.blob()).then((r)=>URL.createObjectURL(r)):a.url,await Q(l,["load"],["error"]),new U(C,l,a.width,a.brightness,a.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(C){this.width=C*this.resolution|0}constructor(C,a,l=a.naturalWidth,r=0,f=!1){this.bot=C;this.image=a;this.width=l;this.brightness=r;this.exactColor=f;if(f)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let C=new Map;for(let l=1;l<64;l++)if(this.exactColor||!this.bot.unavailableColors.has(l))C.set(u[l],[l,l]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let a=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let l=0;l<this.canvas.height;l++)for(let r=0;r<this.canvas.width;r++){let f=(l*this.canvas.width+r)*4,t=a[f],s=a[f+1],o=a[f+2],p=a[f+3],M=`${t},${s},${o}`;if(this.exactColor){this.pixels[l][r]=p<100?0:u.indexOf(M);continue}let n,Z;if(p<100)n=Z=0;else if(C.has(M))[n,Z]=C.get(M);else{let w=1/0,B=1/0;for(let m=0;m<N.length;m++){let E=N[m],b=Z1(n1(t,s,o),E,this.brightness);if(!this.bot.unavailableColors.has(m)&&b<w)w=b,n=m;if(b<B)B=b,Z=m}C.set(M,[n,Z])}if(n!==0)this.context.fillStyle=`oklab(${N[n][0]*100}% ${N[n][1]} ${N[n][2]})`,this.context.fillRect(r,l,1,1);this.pixels[l][r]=n;let F=this.colors.get(Z);if(F)F.amount++;else this.colors.set(Z,{color:n,amount:1,realColor:Z})}}toJSON(){let C=document.createElement("canvas");return C.width=this.image.naturalWidth,C.height=this.image.naturalHeight,C.getContext("2d").drawImage(this.image,0,0),{url:C.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor}}}var R="kglacer-macro-settings",E1=["kglacermacro","wbot"],i="kgm";function Y1(){let C=[R,...E1];for(let a=0;a<C.length;a++){let l=C[a],r=localStorage.getItem(l);if(!r)continue;return{json:r,key:l}}return}function d1(){let C=Y1();if(!C)return;let a;try{if(a=JSON.parse(C.json),typeof a!=="object")throw new Error("NOT VALID SAVE");if(a.version===1){let l=a;a.images=l.widget.images,a.strategy=l.widget.strategy,delete l.widget}if(C.key!==R)localStorage.setItem(R,C.json)}catch{localStorage.removeItem(C.key),a=void 0}return a}var A1;function D(C,a=!1){if(clearTimeout(A1),a)localStorage.setItem(R,JSON.stringify(C));else A1=setTimeout(()=>{localStorage.setItem(R,JSON.stringify(C))},600)}var g=1000,q1=2048,_=g*q1,G=[],S=[],j1=Date.now();function I(C){G.push(C),S.push({id:j1++,latitude:(2*Math.atan(Math.exp(-(C.y/_*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(C.x/_*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}I({x:_/3|0,y:_/3|0});I({x:_/3*2|0,y:_/3*2|0});function Y(C){let[a,l]=C.style.transform.slice(32,-31).split(", ").map((r)=>Number.parseFloat(r));return{x:a,y:l}}class c{bot;static fromJSON(C,a){return new c(C,...a)}static fromScreenPosition(C,a){let{anchorScreenPosition:l,pixelSize:r,anchorWorldPosition:f}=C.findAnchorsForScreen(a);return new c(C,f.x+(a.x-l.x)/r|0,f.y+(a.y-l.y)/r|0)}globalX=0;globalY=0;get tileX(){return this.globalX/g|0}set tileX(C){this.globalX=C*g+this.x}get tileY(){return this.globalY/g|0}set tileY(C){this.globalY=C*g+this.y}get x(){return this.globalX%g}set x(C){this.globalX=this.tileX*g+C}get y(){return this.globalY%g}set y(C){this.globalY=this.tileY*g+C}anchor1Index;anchor2Index;get pixelSize(){return(Y(this.bot.$stars[this.anchor2Index]).x-Y(this.bot.$stars[this.anchor1Index]).x)/(G[this.anchor2Index].x-G[this.anchor1Index].x)}constructor(C,a,l,r,f){this.bot=C;if(r===void 0||f===void 0)this.globalX=a,this.globalY=l;else this.globalX=a*g+r,this.globalY=l*g+f;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let C=1/0,a=1/0;for(let l=0;l<G.length;l++){let{x:r,y:f}=G[l];if(r<this.globalX&&f<this.globalY){let t=this.globalX-r+(this.globalY-f);if(t<C)C=t,this.anchor1Index=l}else if(r>this.globalX&&f>this.globalY){let t=r-this.globalX+(f-this.globalY);if(t<a)a=t,this.anchor2Index=l}}}toScreenPosition(){let C=G[this.anchor1Index],a=Y(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-C.x)*this.pixelSize+a.x,y:(this.globalY-C.y)*this.pixelSize+a.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:C,y:a}=this.toScreenPosition();this.bot.moveMap({x:C-window.innerWidth/3,y:a-window.innerHeight/3})}clone(){return new c(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class q extends k{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(C,a){return new q(C,c.fromJSON(C,a.position),await U.fromJSON(C,a.pixels),a.strategy,a.opacity,a.drawTransparentPixels,a.drawColorsInOrder,a.colors,a.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colors;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$closeColors;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;constructor(C,a,l,r="SPIRAL_FROM_CENTER",f=50,t=!1,s=!1,o=[],p=!1){super();this.bot=C;this.position=a;this.pixels=l;this.strategy=r;this.opacity=f;this.drawTransparentPixels=t;this.drawColorsInOrder=s;this.colors=o;this.lock=p;this.element.innerHTML=h1,this.element.classList.add("wimage"),X(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colors:".colors",$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$closeColors:".close-colors",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,D(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),D(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let M;this.registerEvent(this.$brightness,"change",()=>{clearTimeout(M),M=setTimeout(()=>{this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),D(this.bot)},1000)}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),D(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,D(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,D(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),D(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.$colorsDialog.close()}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(n)=>{if(n.target===this.$colorsDialog)this.$colorsDialog.close()}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let n of this.element.querySelectorAll(".resize"))this.registerEvent(n,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let C=this.position.clone(),a=new Set,l=new Map;for(let r=0;r<this.colors.length;r++){let f=this.colors[r];if(f.disabled)a.add(f.realColor);l.set(f.realColor,r)}for(let{x:r,y:f}of this.strategyPositionIterator()){let t=this.pixels.pixels[f][r];if(a.has(t))continue;C.globalX=this.position.globalX+r,C.globalY=this.position.globalY+f;let s=C.getMapColor();if(t!==s&&(this.drawTransparentPixels||t!==0))this.tasks.push({position:C.clone(),color:t})}if(this.drawColorsInOrder)this.tasks.sort((r,f)=>(l.get(r.color)??0)-(l.get(f.color)??0));this.update(),this.bot.widget.update()}update(){let{x:C,y:a}=this.position.toScreenPosition(),l=Math.round(this.position.pixelSize*this.pixels.width),r=Math.round(this.position.pixelSize*this.pixels.height);this.element.style.transform=`translate3d(${Math.round(C)}px, ${Math.round(a)}px, 0)`,this.element.style.width=`${l}px`,this.element.style.height=`${r}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let f=this.pixels.pixels.length*this.pixels.pixels[0].length,t=f-this.tasks.length,s=t/f*100|0;this.$progressText.textContent=`${t}/${f} ${s}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${s}%)`,this.$wrapper.classList[this.lock?"add":"remove"]("no-pointer-events"),this.$lock.classList[this.lock?"add":"remove"]("locked")}destroy(){super.destroy(),this.element.remove(),C1(this.bot.images,this),this.bot.widget.update(),D(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}let a=Math.min(560,window.innerWidth-16),l=Math.min(680,window.innerHeight-16),r=Math.max(8,(window.innerWidth-a)/2),f=Math.max(8,(window.innerHeight-l)/2);this.$colorsDialog.style.margin="0",this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left=`${Math.round(r)}px`,this.$colorsDialog.style.top=`${Math.round(f)}px`,this.$colorsDialog.show()}startColorDialogDrag(C){if(C.button!==0)return;if(C.target?.closest("button,input,select,textarea,a,label"))return;let l=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:C.pointerId,offsetX:C.clientX-l.left,offsetY:C.clientY-l.top},C.preventDefault()}moveColorDialog(C){if(!this.colorDialogDragState)return;if(C.pointerId!==this.colorDialogDragState.pointerId)return;let a=this.$colorsDialog.getBoundingClientRect(),l=Math.max(8,window.innerWidth-a.width-8),r=Math.max(8,window.innerHeight-a.height-8),f=Math.min(l,Math.max(8,C.clientX-this.colorDialogDragState.offsetX)),t=Math.min(r,Math.max(8,C.clientY-this.colorDialogDragState.offsetY));this.$colorsDialog.style.left=`${Math.round(f)}px`,this.$colorsDialog.style.top=`${Math.round(t)}px`,C.preventDefault()}stopColorDialogDrag(C){if(!this.colorDialogDragState)return;if(C.pointerId!==this.colorDialogDragState.pointerId)return;this.colorDialogDragState=void 0}applyLocale(){X(this.element),this.updateColors()}colorHex(C){let a=u[C]??"0,0,0",[l=0,r=0,f=0]=a.split(",").map((t)=>Number.parseInt(t,10));return`#${[l,r,f].map((t)=>t.toString(16).padStart(2,"0")).join("")}`}colorKeywords(C){let a=u[C]??"0,0,0",[l=0,r=0,f=0]=a.split(",").map((p)=>Number.parseInt(p,10)),t=Math.max(l,r,f),s=Math.min(l,r,f);if(t-s<15)return["gray","grey","gris","neutral","neutro"];if(l>r+30&&l>f+30)return["red","rojo"];if(r>l+30&&r>f+30)return["green","verde"];if(f>l+30&&f>r+30)return["blue","azul"];if(l>170&&r>120&&f<130)return["orange","naranja"];if(l>170&&r>110&&f>140)return["pink","rosa"];if(l>120&&r<100&&f>120)return["purple","violet","morado"];if(l>130&&r>130&&f<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colors.innerHTML="",this.$colorsDialogList.innerHTML="";let C=this.pixels.pixels.length*this.pixels.pixels[0].length,a=100/this.pixels.colors.size,l=document.createElement("div");l.className="colors-track",l.setAttribute("aria-label",d("overlayColors")),this.$colorsDialogList.setAttribute("aria-label",d("colorPanelResults"));let r=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((t)=>!this.pixels.colors.has(t.realColor)))this.colors=this.pixels.colors.values().toArray().sort((t,s)=>s.amount-t.amount).map((t)=>({realColor:t.realColor,disabled:!1})),D(this.bot);let f=0;for(let t=0;t<this.colors.length;t++){let s=this.colors[t],o=this.pixels.colors.get(s.realColor),p=!1,M=!1,n=o.realColor!==o.color,Z=o.amount/C*100,F=this.colorHex(o.realColor),w=this.colorKeywords(o.realColor),B=()=>{if(p)return;s.disabled=s.disabled?void 0:!0,m.classList.toggle("color-disabled"),E.classList.toggle("disabled",Boolean(s.disabled));let h=E.querySelector(".state");if(h)h.textContent=s.disabled?d("disabled"):d("enabled");D(this.bot)},m=document.createElement("button");if(m.setAttribute("aria-label",`${d("overlayColors")} #${t+1}: ${F.toUpperCase()}`),m.title=`${Z.toFixed(1)}%`,m.innerHTML=`<span class="order-index">#${t+1}</span>`,s.disabled)m.classList.add("color-disabled");if(!n)m.style.background=$(o.realColor);else{m.classList.add("substitution"),m.style.setProperty("--wreal-color",$(o.realColor)),m.style.setProperty("--wsubstitution-color",$(o.color));let h=document.createElement("button"),A=document.createElement("button");h.textContent=d("buy"),A.textContent="✓",h.classList.add("buy"),A.classList.add("disable"),h.addEventListener("click",()=>{document.getElementById("color-"+o.realColor)?.click()}),A.addEventListener("click",B),m.append(h),m.append(A)}m.style.left=f+"%",m.style.width=Z+"%",f+=Z,m.style.setProperty("--wleft",a*t+"%"),m.style.setProperty("--wwidth",a+"%"),l.append(m);let E=document.createElement("button");if(E.className=`color-chip ${s.disabled?"disabled":""}`,E.draggable=!0,E.innerHTML=`<span class="order-index">#${t+1}</span>
<span class="drag" title="${d("up")} / ${d("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${Z.toFixed(1)}% · ${F.toUpperCase()}</span>
  <span class="state">${s.disabled?d("disabled"):d("enabled")}</span>
</span>
<span class="premium ${n?"on":""}">${n?d("premium"):""}</span>`,E.querySelector(".swatch").style.setProperty("--swatch-color",$(o.realColor)),E.addEventListener("click",()=>{if(M){M=!1;return}B()}),E.addEventListener("dragstart",(h)=>{M=!0,E.classList.add("dragging"),h.dataTransfer?.setData("text/plain",String(t)),h.dataTransfer.effectAllowed="move"}),E.addEventListener("dragend",()=>{E.classList.remove("dragging")}),E.addEventListener("dragover",(h)=>{h.preventDefault(),E.classList.add("drag-target")}),E.addEventListener("dragleave",()=>{E.classList.remove("drag-target")}),E.addEventListener("drop",(h)=>{h.preventDefault(),E.classList.remove("drag-target");let A=Number.parseInt(h.dataTransfer?.getData("text/plain")??"-1",10);if(A<0||A===t||A>=this.colors.length)return;this.colors.splice(t,0,...this.colors.splice(A,1)),D(this.bot),this.updateColors()}),n){let h=document.createElement("button");h.textContent=d("buy"),h.className="buy-chip",h.addEventListener("click",(A)=>{A.stopPropagation(),document.getElementById("color-"+o.realColor)?.click()}),E.append(h)}let b=`${F} ${w.join(" ")} ${o.realColor} ${u[o.realColor]}`;if(!r||b.toLowerCase().includes(r))this.$colorsDialogList.append(E);let j=(h)=>{let A=t,W=m.getBoundingClientRect().width,P=(O)=>{if(A=Math.min(this.colors.length-1,Math.max(0,Math.round(t+(O.clientX-h.clientX)/W))),A!==t)p=!0;let K=0;for(let T of l.children){if(T===m)continue;if(K===A)K++;T.style.setProperty("--wleft",a*K+"%"),K++}m.style.setProperty("--wleft",a*A+"%")};document.addEventListener("mousemove",P),document.addEventListener("mouseup",()=>{if(document.removeEventListener("mousemove",P),A!==t)this.colors.splice(A,0,...this.colors.splice(t,1));D(this.bot),m.removeEventListener("mousedown",j),setTimeout(()=>{this.updateColors()},200)},{once:!0})};if(m.addEventListener("mousedown",j),!n)m.addEventListener("click",B)}this.$colors.append(l)}*strategyPositionIterator(){let C=this.pixels.pixels[0].length,a=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let l=0;l<a;l++)for(let r=0;r<C;r++)yield{x:r,y:l};break}case"UP":{for(let l=a-1;l>=0;l--)for(let r=0;r<C;r++)yield{x:r,y:l};break}case"LEFT":{for(let l=0;l<C;l++)for(let r=0;r<a;r++)yield{x:l,y:r};break}case"RIGHT":{for(let l=C-1;l>=0;l--)for(let r=0;r<a;r++)yield{x:l,y:r};break}case"RANDOM":{let l=[];for(let r=0;r<a;r++)for(let f=0;f<C;f++)l.push({x:f,y:r});for(let r=l.length-1;r>=0;r--){let f=Math.floor(Math.random()*(r+1)),t=l[r];l[r]=l[f],l[f]=t}yield*l;break}case"ZIGZAG":{for(let l=0;l<a;l++)if(l%2===0)for(let r=0;r<C;r++)yield{x:r,y:l};else for(let r=C-1;r>=0;r--)yield{x:r,y:l};break}case"HUMANIZED":{let l=Math.max(4,Math.floor(Math.min(C,a)/10)),r=[];for(let f=0;f<a;f+=l)for(let t=0;t<C;t+=l)r.push({x:t,y:f});for(let f=r.length-1;f>=0;f--){let t=Math.floor(Math.random()*(f+1)),s=r[f];r[f]=r[t],r[t]=s}for(let f=0;f<r.length;f++){let t=r[f],s=Math.min(a,t.y+l),o=Math.min(C,t.x+l);for(let p=t.y;p<s;p++)if(Math.random()>0.35)for(let n=t.x;n<o;n++)yield{x:n,y:p};else for(let n=o-1;n>=t.x;n--)yield{x:n,y:p}}break}case"HUMAN_SOFT_DITHER":{let l=new Set;for(let r=0;r<a;r++){let f=Math.floor(Math.random()*3)-1;if((r+f)%2===0)for(let s=0;s<C;s+=2)l.add(`${s},${r}`),yield{x:s,y:r};else for(let s=1;s<C;s+=2)l.add(`${s},${r}`),yield{x:s,y:r}}for(let r=0;r<a;r++)for(let f=0;f<C;f++){let t=`${f},${r}`;if(l.has(t))continue;yield{x:f,y:r}}break}case"HUMAN_PATCHY":{let l=new Set,r=C*a;while(l.size<r){let f=Math.floor(Math.random()*C),t=Math.floor(Math.random()*a),s=1+Math.floor(Math.random()*5);for(let o=t-s;o<=t+s;o++)for(let p=f-s;p<=f+s;p++){if(p<0||p>=C||o<0||o>=a)continue;if(Math.hypot(p-f,o-t)>s+Math.random()*1.2)continue;let M=`${p},${o}`;if(l.has(M))continue;l.add(M),yield{x:p,y:o}}}break}case"HUMAN_SWEEP_ARCS":{let l=new Set,r=(C-1)/2,f=(a-1)/2,t=Math.hypot(r,f);for(let s=0;s<4;s++){let o=Math.random()*Math.PI*2;for(let p=0;p<=t;p+=0.35){let M=Math.PI/2+Math.random()*(Math.PI/1.5),n=Math.max(10,Math.floor(p*8));for(let Z=0;Z<n;Z++){let F=o+M*Z/n+Math.sin(p)*0.08,w=Math.round(r+Math.cos(F)*p),B=Math.round(f+Math.sin(F)*p);if(w<0||w>=C||B<0||B>=a)continue;let m=`${w},${B}`;if(l.has(m))continue;l.add(m),yield{x:w,y:B}}}}for(let s=0;s<a;s++)for(let o=0;o<C;o++){let p=`${o},${s}`;if(l.has(p))continue;yield{x:o,y:s}}break}case"HUMAN_MICRO_CORRECTIONS":{let l=new Set;for(let r=0;r<a;r++){let f=r%2===0?1:-1,t=f>0?0:C-1;for(let s=0;s<C;s++){let o=t+(Math.random()>0.82?f:0),p=r+(Math.random()>0.9?1:0);for(let M of[{x:t,y:r},{x:o,y:r},{x:t,y:p}]){if(M.x<0||M.x>=C||M.y<0||M.y>=a)continue;let n=`${M.x},${M.y}`;if(l.has(n))continue;l.add(n),yield M}t+=f}}for(let r=0;r<a;r++)for(let f=0;f<C;f++){let t=`${f},${r}`;if(l.has(t))continue;yield{x:f,y:r}}break}case"HUMAN_JITTER_FILL":{let l=[];for(let r=0;r<a;r++)for(let f=0;f<C;f++)l.push({x:f,y:r});l.sort((r,f)=>{let t=r.y+(Math.random()-0.5)*1.8,s=f.y+(Math.random()-0.5)*1.8;if(t!==s)return t-s;return r.x+(Math.random()-0.5)*2-(f.x+(Math.random()-0.5)*2)}),yield*l;break}case"HUMAN_CORNER_BIAS":{let l=[{x:0,y:0},{x:C-1,y:0},{x:0,y:a-1},{x:C-1,y:a-1}],r=l[Math.floor(Math.random()*l.length)],f=[];for(let t=0;t<a;t++)for(let s=0;s<C;s++){let p=Math.hypot(s-r.x,t-r.y)+Math.random()*3.5;f.push({point:{x:s,y:t},score:p})}f.sort((t,s)=>t.score-s.score);for(let t of f)yield t.point;break}case"HUMAN_LONG_STROKES":{let l=new Set,r=C*a;while(l.size<r){let f=Math.floor(Math.random()*C),t=Math.floor(Math.random()*a),s=Math.random()*Math.PI*2,o=Math.sign(Math.cos(s)),p=Math.sign(Math.sin(s)),M=10+Math.floor(Math.random()*40);for(let n=0;n<M;n++){if(f<0||f>=C||t<0||t>=a)break;let Z=`${f},${t}`;if(!l.has(Z))l.add(Z),yield{x:f,y:t};if(Math.random()>0.78)f+=p,t+=o;else f+=o,t+=p}}break}case"HUMAN_TAP_CLUSTERS":{let l=new Set,r=C*a;while(l.size<r){let f=Math.floor(Math.random()*C),t=Math.floor(Math.random()*a),s=3+Math.floor(Math.random()*10);for(let o=0;o<s;o++){let p=Math.round(f+(Math.random()-0.5)*6),M=Math.round(t+(Math.random()-0.5)*6);if(p<0||p>=C||M<0||M>=a)continue;let n=`${p},${M}`;if(l.has(n))continue;l.add(n),yield{x:p,y:M}}}break}case"HUMAN_MESSY_SPIRAL":{let l=new Set,r=(C-1)/2,f=(a-1)/2,t=Math.hypot(r,f)+2;for(let s=0;l.size<C*a;s++){let o=s/3,p=Math.min(t,o*0.18),M=o*0.29+Math.sin(o*0.13)*0.8,n=Math.round(r+Math.cos(M)*p+Math.sin(o)*0.7),Z=Math.round(f+Math.sin(M)*p+Math.cos(o)*0.7);if(n<0||n>=C||Z<0||Z>=a){if(s>C*a*18)break;continue}let F=`${n},${Z}`;if(l.has(F)){if(Math.random()>0.9)continue}else l.add(F),yield{x:n,y:Z};if(s>C*a*18)break}for(let s=0;s<a;s++)for(let o=0;o<C;o++){let p=`${o},${s}`;if(l.has(p))continue;yield{x:o,y:s}}break}case"HUMAN_DRUNK_WALK":{let l=new Set,r=Math.floor(Math.random()*C),f=Math.floor(Math.random()*a),t=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(l.size<C*a){let s=`${r},${f}`;if(!l.has(s))l.add(s),yield{x:r,y:f};let o=[];for(let n of t){let Z=r+n.x,F=f+n.y;if(Z<0||Z>=C||F<0||F>=a)continue;o.push({x:Z,y:F})}if(!o.length)break;let p=o.filter((n)=>{return!l.has(`${n.x},${n.y}`)});if(p.length&&Math.random()>0.2){let n=p[Math.floor(Math.random()*p.length)];r=n.x,f=n.y;continue}let M=o[Math.floor(Math.random()*o.length)];r=M.x,f=M.y}for(let s=0;s<a;s++)for(let o=0;o<C;o++){let p=`${o},${s}`;if(l.has(p))continue;yield{x:o,y:s}}break}case"HUMAN_NOISE_CLOUD":{let l=[];for(let r=0;r<a;r++)for(let f=0;f<C;f++){let t=Math.sin((f+1)*0.93+Math.random()*0.8)+Math.cos((r+1)*1.17+Math.random()*0.8),s=(Math.random()-0.5)*2.6,o=Math.hypot(f-C/2,r-a/2)*0.08;l.push({point:{x:f,y:r},score:t+s+o})}l.sort((r,f)=>r.score-f.score);for(let r of l)yield r.point;break}case"HUMAN_PATCH_JUMP":{let l=new Set,r=[];for(let f=0;f<Math.max(6,C*a/18);f++)r.push({x:Math.floor(Math.random()*C),y:Math.floor(Math.random()*a)});while(l.size<C*a){let f=r[Math.floor(Math.random()*r.length)],t=1+Math.floor(Math.random()*3),s=1+Math.floor(Math.random()*3);for(let o=f.y-s;o<=f.y+s;o++)for(let p=f.x-t;p<=f.x+t;p++){if(p<0||p>=C||o<0||o>=a)continue;if(Math.random()>0.86)continue;let M=`${p},${o}`;if(l.has(M))continue;l.add(M),yield{x:p,y:o}}if(Math.random()>0.72&&r.length<C*a/2)r.push({x:Math.floor(Math.random()*C),y:Math.floor(Math.random()*a)});if(l.size>C*a*0.92)break}for(let f=0;f<a;f++)for(let t=0;t<C;t++){let s=`${t},${f}`;if(l.has(s))continue;yield{x:t,y:f}}break}case"DIAGONAL_BRUSH":{for(let l=0;l<C+a-1;l++){let r=l%2===0,f=[],t=Math.max(0,l-C+1),s=Math.min(a-1,l);for(let o=t;o<=s;o++){let p=l-o;if(p>=0&&p<C)f.push({x:p,y:o})}if(Math.random()>0.55)f.reverse();if(r)for(let o=f.length-1;o>=0;o--)yield f[o];else yield*f}break}case"BRUSH_STROKES":{let l=Array.from({length:a},()=>Array(C).fill(!1)),r=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],f=(o,p)=>o>=0&&o<C&&p>=0&&p<a,t=0,s=C*a;for(let o=0;o<s*6&&t<s;o++){let p=Math.floor(Math.random()*C),M=Math.floor(Math.random()*a),n=r[Math.floor(Math.random()*r.length)],Z=3+Math.floor(Math.random()*16);for(let F=0;F<Z;F++){if(!f(p,M))break;if(!l[M][p])l[M][p]=!0,t++,yield{x:p,y:M};if(Math.random()>0.72)n=r[Math.floor(Math.random()*r.length)];p+=n.x,M+=n.y}}for(let o=0;o<a;o++)for(let p=0;p<C;p++)if(!l[o][p])yield{x:p,y:o};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let l=new Set,r=C*a,f=Math.floor(C/2),t=Math.floor(a/2),s=[[1,0],[0,1],[-1,0],[0,-1]],o=0,p=1,M=(Z,F)=>Z>=0&&Z<C&&F>=0&&F<a,n=function*(){let Z=0;while(Z<r){for(let F=0;F<2;F++){for(let w=0;w<p;w++){if(M(f,t)){let B=`${f},${t}`;if(!l.has(B)){if(l.add(B),yield{x:f,y:t},Z++,Z>=r)return}}f+=s[o][0],t+=s[o][1]}o=(o+1)%4}p++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*n();else{let Z=[...n()];for(let F=Z.length-1;F>=0;F--)yield Z[F]}break}case"SCRIBBLE":{let l=new Set,r=C*a,f=Math.floor(C/2),t=Math.floor(a/2);for(let s=0;l.size<r&&s<r*24;s++){let o=`${f},${t}`;if(!l.has(o))l.add(o),yield{x:f,y:t};if(f+=Math.floor(Math.random()*3)-1,t+=Math.floor(Math.random()*3)-1,f<0||f>=C||t<0||t>=a)f=Math.floor(Math.random()*C),t=Math.floor(Math.random()*a)}for(let s=0;s<a;s++)for(let o=0;o<C;o++){let p=`${o},${s}`;if(l.has(p))continue;l.add(p),yield{x:o,y:s}}break}case"CROSSHATCH":{let l=[];for(let t=0;t<C+a-1;t++)for(let s=Math.max(0,t-C+1);s<=Math.min(a-1,t);s++){let o=t-s;l.push({x:o,y:s})}let r=[];for(let t=-a+1;t<C;t++)for(let s=0;s<a;s++){let o=s+t;if(o>=0&&o<C)r.push({x:o,y:s})}let f=new Set;for(let t of[...l,...r]){let s=`${t.x},${t.y}`;if(f.has(s))continue;f.add(s),yield t}break}case"WAVE_SWEEP":{let l=new Set;for(let r=0;r<C;r++){let t=(Math.sin(r/Math.max(1,C-1)*Math.PI*4)+1)*0.5*(a-1)|0;for(let s=0;s<a;s++){let o=t+s,p=t-s;for(let M of[o,p]){if(M<0||M>=a)continue;let n=`${r},${M}`;if(l.has(n))continue;l.add(n),yield{x:r,y:M}}}}break}case"SCATTERED_LINES":{let l=new Set,r=C*a;for(let f=0;l.size<r&&f<r*14;f++){let t=Math.floor(Math.random()*C),s=Math.floor(Math.random()*a),o=Math.random()*Math.PI*2,p=Math.round(Math.cos(o)),M=Math.round(Math.sin(o)),n=6+Math.floor(Math.random()*28);for(let Z=0;Z<n;Z++){if(t<0||t>=C||s<0||s>=a)break;let F=`${t},${s}`;if(!l.has(F))l.add(F),yield{x:t,y:s};t+=p,s+=M}}for(let f=0;f<a;f++)for(let t=0;t<C;t++){let s=`${t},${f}`;if(l.has(s))continue;l.add(s),yield{x:t,y:f}}break}case"CONTOUR_JITTER":{let l=new Set;for(let r=0;r<Math.ceil(Math.min(C,a)/2);r++){let f=[],t=r,s=r,o=C-r-1,p=a-r-1;for(let M=t;M<=o;M++)f.push({x:M,y:s});for(let M=s+1;M<=p;M++)f.push({x:o,y:M});for(let M=o-1;M>=t;M--)f.push({x:M,y:p});for(let M=p-1;M>s;M--)f.push({x:t,y:M});for(let M=f.length-1;M>0;M--){let n=Math.floor(Math.random()*(M+1)),Z=f[M];f[M]=f[n],f[n]=Z}for(let M of f){let n=`${M.x},${M.y}`;if(l.has(n))continue;l.add(n),yield M}}break}case"SPIRAL_WOBBLE":{let l=new Set,r=C/2,f=a/2,t=Math.hypot(r,f);for(let s=0;l.size<C*a&&s<C*a*9;s++){let o=s/(C*a*9)*t,p=s*0.31+Math.sin(s*0.07)*0.7,M=Math.round(r+Math.cos(p)*o),n=Math.round(f+Math.sin(p)*o);if(M<0||M>=C||n<0||n>=a)continue;let Z=`${M},${n}`;if(l.has(Z))continue;l.add(Z),yield{x:M,y:n}}for(let s=0;s<a;s++)for(let o=0;o<C;o++){let p=`${o},${s}`;if(l.has(p))continue;yield{x:o,y:s}}break}case"CLUSTER_BURSTS":{let l=new Set,r=C*a;for(let f=0;l.size<r&&f<r*12;f++){let t=Math.floor(Math.random()*C),s=Math.floor(Math.random()*a),o=2+Math.floor(Math.random()*10);for(let p=s-o;p<=s+o;p++)for(let M=t-o;M<=t+o;M++){if(M<0||M>=C||p<0||p>=a)continue;if(Math.hypot(M-t,p-s)>o)continue;let n=`${M},${p}`;if(l.has(n))continue;l.add(n),yield{x:M,y:p}}}for(let f=0;f<a;f++)for(let t=0;t<C;t++){let s=`${t},${f}`;if(l.has(s))continue;l.add(s),yield{x:t,y:f}}break}case"ORBITAL":{let l=new Set,r=(C-1)/2,f=(a-1)/2,t=Math.ceil(Math.max(r,f));for(let s=0;s<=t;s++){let o=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,s)*2));for(let p=0;p<o;p++){let M=p/o*Math.PI*2+(s%2?0.3:-0.3),n=Math.round(r+Math.cos(M)*s),Z=Math.round(f+Math.sin(M)*s);if(n<0||n>=C||Z<0||Z>=a)continue;let F=`${n},${Z}`;if(l.has(F))continue;l.add(F),yield{x:n,y:Z}}}for(let s=0;s<a;s++)for(let o=0;o<C;o++){let p=`${o},${s}`;if(l.has(p))continue;yield{x:o,y:s}}break}case"FLOW_FIELD":{let l=new Set,r=C*a;for(let f=0;l.size<r&&f<r*18;f++){let t=Math.floor(Math.random()*C),s=Math.floor(Math.random()*a);for(let o=0;o<120;o++){if(t<0||t>=C||s<0||s>=a)break;let p=`${t},${s}`;if(!l.has(p))l.add(p),yield{x:t,y:s};let M=Math.sin(t*0.09)*1.8+Math.cos(s*0.08)*1.6+Math.sin((t+s)*0.05);t+=Math.round(Math.cos(M)),s+=Math.round(Math.sin(M))}}for(let f=0;f<a;f++)for(let t=0;t<C;t++){let s=`${t},${f}`;if(l.has(s))continue;l.add(s),yield{x:t,y:f}}break}case"EDGE_IN":{let l=new Set,r=Math.ceil(Math.min(C,a)/2);for(let f=0;f<r;f++){let t=f,s=C-1-f,o=f,p=a-1-f;for(let M=t;M<=s;M++)for(let n of[o,p]){let Z=`${M},${n}`;if(l.has(Z))continue;l.add(Z),yield{x:M,y:n}}for(let M=o+1;M<=p-1;M++)for(let n of[t,s]){let Z=`${n},${M}`;if(l.has(Z))continue;l.add(Z),yield{x:n,y:M}}}break}}}moveStart(C){if(C.button!==0)return;if(C.preventDefault(),C.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:C.clientX,clientY:C.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),D(this.bot)}move(C){if(!this.moveInfo)return;let a=Math.round((C.clientX-this.moveInfo.clientX)/this.position.pixelSize),l=Math.round((C.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=a+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-a)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,a+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=l+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-l)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,l+this.moveInfo.height);this.update(),D(this.bot)}resizeStart(C){if(this.lock||C.button!==0)return;C.preventDefault(),C.stopPropagation(),this.moveInfo={clientX:C.clientX,clientY:C.clientY};let a=C.target;if(a.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(a.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(a.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(a.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let C=document.createElement("a");document.body.append(C),C.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),C.download=`${this.pixels.width}x${this.pixels.height}.${i}`,C.click(),URL.revokeObjectURL(C.href),C.href=this.pixels.canvas.toDataURL("image/webp",1),C.download=`${this.pixels.width}x${this.pixels.height}.webp`,C.click(),URL.revokeObjectURL(C.href),C.remove()}}var D1=`/* stylelint-disable declaration-no-important */
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
  padding: 14px 12px 14px 66px;
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
  filter:
    drop-shadow(0 8px 14px rgb(0 0 0 / 35%))
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
  min-width: min(320px, 92vw);
  max-height: min(85dvh, 680px);
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #0f1526;
  color: var(--text);
  box-shadow: 0 22px 40px rgb(2 6 23 / 55%);
  resize: both;
  overflow: auto;
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
  cursor: move;
  user-select: none;
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
}
`;class x extends Error{name="KGlacerMacroError";constructor(C,a){super(C);a.widget.status=C}}class f1 extends x{name="NoImageError";constructor(C){super("❌ No image is selected",C)}}var z={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0}};function H(C,a){return C.key.toLowerCase()===a.key&&C.shiftKey===Boolean(a.shift)&&C.ctrlKey===Boolean(a.ctrl)&&C.altKey===Boolean(a.alt)}function B1(C){if(typeof HTMLElement==="undefined")return!1;if(!(C instanceof HTMLElement))return!1;let a=C.tagName.toLowerCase();return a==="input"||a==="textarea"||C.isContentEditable||C.closest('[contenteditable="true"]')!==null}var w1=`<button class="wopen-button" aria-label="Toggle widget">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16"/>
  </svg>
</button>
<div class="title">
  <div class="widget-brand">
    <img class="widget-logo" src="" alt="KGlacer Macro logo" />
    <span class="widget-brand-text">KGlacer</span>
  </div>
  <div class="widget-actions">
    <button class="toggle-overlay" data-i18n="toggleOverlay">Hide/show overlays</button>
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
  <div class="images"></div>
  <button class="add-image" disabled data-i18n="addImage">Add image</button>
</div>
`;var g1="./logo-by009mqy.svg";var c1="kglacer-macro:overlay-hidden";class t1 extends k{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(C){this.$status.innerHTML=C}get open(){return this.element.classList.contains("wopen")}set open(C){if(C)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$shortcuts;$locale;$topbar;$draw;$addImage;$toggleOverlay;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;constructor(C){super();this.bot=C;this.element.classList.add("wwidget"),this.element.innerHTML=w1,X(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$shortcuts:".shortcuts",$locale:".locale",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$toggleOverlay:".toggle-overlay",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=g1,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=r1(),this.$locale.addEventListener("change",()=>{m1(this.$locale.value),X(this.element);for(let a=0;a<this.bot.images.length;a++)this.bot.images[a].applyLocale();this.refreshOverlayToggleText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run("Adding image",async()=>{await this.bot.updateColors();let C=document.createElement("input");C.type="file",C.accept=`image/*,.${i}`,C.click(),await Q(C,["change"],["cancel","error"]);let a=C.files?.[0];if(!a)throw new f1(this.bot);console.log("[KGM][Widget] File selected",{name:a.name,size:a.size,type:a.type});let l;if(a.name.endsWith(`.${i}`))l=await q.fromJSON(this.bot,JSON.parse(await a.text()));else{let r=new FileReader;r.readAsDataURL(a),await Q(r,["load"],["error"]);let f=await this.compressImageBeforeLoad(r.result),t=new Image;t.src=f,await Q(t,["load"],["error"]),l=new q(this.bot,c.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new U(this.bot,t))}this.bot.images.push(l),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),l.updateTasks(),D(this.bot,!0),console.log("[KGM][Widget] Image persisted, reloading page"),document.location.reload()},()=>{this.setDisabled("add-image",!1)})}defaultImageScreenPosition(){let C=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,C),y:32}}async compressImageBeforeLoad(C){let a=new Image;if(a.src=C,await Q(a,["load"],["error"]),!(a.naturalWidth*a.naturalHeight>3000000||C.length>3000000))return C;let r=document.createElement("canvas");r.width=a.naturalWidth,r.height=a.naturalHeight;let f=r.getContext("2d");if(!f)return C;return f.drawImage(a,0,0),r.toDataURL("image/png")}update(){this.$strategy.value=this.bot.strategy;let C=0,a=0;for(let t=0;t<this.bot.images.length;t++){let s=this.bot.images[t];C+=s.pixels.pixels.length*s.pixels.pixels[0].length,a+=s.tasks.length}let l=C-a,r=l/C*100|0;this.$progressText.textContent=`${l}/${C} ${r}% ETA: ${a/120|0}h`,this.$progressLine.style.transform=`scaleX(${r}%)`,this.$images.innerHTML="";let f=document.createDocumentFragment();for(let t=0;t<this.bot.images.length;t++){let s=this.bot.images[t],o=document.createElement("div");f.append(o),o.className="image",o.innerHTML=`<button class="preview" title="Focus image">
  <img src="${s.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="settings" title="Color settings">⚙</button>
    <button class="up" title="Move up" ${t===0?"disabled":""}>▴</button>
    <button class="down" title="Move down" ${t===this.bot.images.length-1?"disabled":""}>▾</button>
  </div>`,o.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=t,s.position.scrollScreenTo()}),o.querySelector(".settings").addEventListener("click",()=>{this.activeImageIndex=t,s.openColorPanel()}),o.querySelector(".up").addEventListener("click",()=>{e(this.bot.images,t,t-1),this.update(),D(this.bot)}),o.querySelector(".down").addEventListener("click",()=>{e(this.bot.images,t,t+1),this.update(),D(this.bot)})}this.$images.append(f)}syncOverlayVisibilityFromStorage(){let C=localStorage.getItem(c1)==="true";document.body.classList.toggle("overlay-hidden",C),this.refreshOverlayToggleText()}toggleOverlay(C){let a=C??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",a),localStorage.setItem(c1,String(a)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${d("toggleOverlay")} (${d("disabled")})`:`${d("toggleOverlay")} (${d("enabled")})`}setDisabled(C,a){this.element.querySelector("."+C).disabled=a}async run(C,a,l,r="..."){console.log("[KGM][Widget] Task started",{status:C});let f=this.status;this.status=`${r} ${C}`;try{let t=await a();return this.status=f,console.log("[KGM][Widget] Task completed",{status:C}),t}catch(t){if(!(t instanceof x))console.error(t),this.status=`Error: ${C}`;throw console.error("[KGM][Widget] Task failed",{status:C,error:t}),t}finally{await l?.()}}handleKeyboard(C){if(B1(C.target))return;if(H(C,z.toggleWidget)){C.preventDefault(),this.open=!this.open;return}if(H(C,z.showShortcuts)){C.preventDefault(),this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(H(C,z.toggleOverlay)){C.preventDefault(),this.toggleOverlay();return}if(H(C,z.focusNextImage)){C.preventDefault(),this.focusImageByStep(1);return}if(H(C,z.focusPreviousImage)){C.preventDefault(),this.focusImageByStep(-1);return}if(H(C,z.openColorPanel)){C.preventDefault(),this.openColorPanelForActiveImage();return}if(H(C,z.toggleImageLock)){C.preventDefault(),this.toggleLockForActiveImage();return}if(H(C,z.addImage)&&!this.$addImage.disabled){C.preventDefault(),this.addImage();return}if(H(C,z.draw)&&!this.$draw.disabled)C.preventDefault(),this.bot.draw()}focusImageByStep(C){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=C>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+C+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let C=this.getActiveImage();if(!C)return;C.openColorPanel()}toggleLockForActiveImage(){let C=this.getActiveImage();if(!C)return;C.lock=!C.lock,C.update(),D(this.bot)}}var V1=2,z1="[KGM]";class H1{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];widget=new t1(this);markerPixelPositionResolvers=[];lastColor;log(C,a){if(a===void 0)console.log(`${z1} ${C}`);else console.log(`${z1} ${C}`,a)}constructor(){this.log("Boot sequence started");let C=d1();if(this.log("Save loaded",{hasSave:Boolean(C),imageCount:C?.images.length??0,strategy:C?.strategy}),C){for(let l=0;l<C.images.length;l++){let r=C.images[l];I({x:r.position[0]-1000,y:r.position[1]-1000}),I({x:r.position[0]+1000,y:r.position[1]+1000})}this.strategy=C.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let a=document.createElement("style");a.textContent=D1.replace("FAKE_FAVORITE_LOCATIONS",S.length.toString()),document.head.append(a),this.log("Styles injected",{fakeFavoriteLocations:S.length}),this.widget.run("Initializing",async()=>{this.log("Widget initialization flow started"),await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let l=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((r)=>{for(let f=0;f<r.length;f++)if(r[f].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(l,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await J(500),await this.updateColors(),C)for(let r=0;r<C.images.length;r++){let f=await q.fromJSON(this,C.images[r]);this.images.push(f),f.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.log("Initialization completed; controls enabled")})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let C=document.querySelector(".maplibregl-canvas"),a=(l)=>{if(!l.shiftKey)l.stopPropagation()};return this.widget.run("Drawing",async()=>{await this.widget.run("Initializing draw",()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",a,!0),C.addEventListener("wheel",a,!0),this.updateTasks();let l=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((t)=>t.json()),r=Math.floor(l.charges.count);this.log("Charges fetched",{charges:r});let f=0;for(let t=0;t<this.images.length;t++)f+=this.images[t].tasks.length;switch(this.log("Tasks prepared",{tasks:f}),this.strategy){case"ALL":{while(r>0){let t=!0;for(let s=0;s<this.images.length;s++){let o=this.images[s].tasks.shift();if(!o)continue;this.drawTask(o),r--,await J(1),t=!1}if(t)break}break}case"PERCENTAGE":{for(let t=0;t<f&&r>0;t++){let s=1,o;for(let p=0;p<this.images.length;p++){let M=this.images[p],n=1-M.tasks.length/(M.pixels.pixels.length*M.pixels.pixels[0].length);if(n<s)s=n,o=M}this.drawTask(o.tasks.shift()),r--,await J(1)}break}case"SEQUENTIAL":for(let t=0;t<this.images.length;t++){let s=this.images[t];for(let o=s.tasks.shift();o&&r>0;o=s.tasks.shift())this.drawTask(o),r--,await J(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:r})},()=>{globalThis.removeEventListener("mousemove",a,!0),C.removeEventListener("wheel",a,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:V1,images:this.images.map((C)=>C.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let C of document.querySelectorAll("button.btn.relative.w-full"))if(C.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(C.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(C){let a=document.querySelector(".maplibregl-canvas"),l=window.innerWidth/2,r=window.innerHeight/2,f=l-C.x,t=r-C.y;function s(o,p,M){a.dispatchEvent(new MouseEvent(o,{bubbles:!0,cancelable:!0,clientX:p,clientY:M,buttons:1}))}s("mousedown",l,r),s("mousemove",f,t),s("mouseup",f,t)}readMap(){this.mapsCache.clear();let C=new Set;for(let l=0;l<this.images.length;l++){let r=this.images[l],{tileX:f,tileY:t}=new c(this,r.position.globalX+r.pixels.pixels[0].length,r.position.globalY+r.pixels.pixels.length);for(let s=r.position.tileX;s<=f;s++)for(let o=r.position.tileY;o<=t;o++)C.add(`${s}/${o}`)}let a=0;return this.log("Reading map tiles",{tileCount:C.size}),this.widget.run(`Reading map [0/${C.size}]`,()=>Promise.all([...C].map(async(l)=>{this.mapsCache.set(l,await U.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${l}.png`,exactColor:!0})),this.widget.status=`⌛ Reading map [${++a}/${C.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((C)=>{if(!document.hasFocus())C();window.addEventListener("blur",()=>{setTimeout(C,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(C){let a=0,l=1,r=1/0,f=1/0;for(let o=0;o<this.$stars.length;o++){let{x:p,y:M}=Y(this.$stars[o]);if(p<C.x&&M<C.y){let n=C.x-p+(C.y-M);if(n<r)r=n,a=o}else if(p>C.x&&M>C.y){let n=p-C.x+(M-C.y);if(n<f)f=n,l=o}}let t=Y(this.$stars[a]),s=G[a];return{anchorScreenPosition:t,anchorWorldPosition:s,pixelSize:(Y(this.$stars[l]).x-t.x)/(G[l].x-s.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await J(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await J(1);let C=document.querySelector("button.bottom-0");if(C?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')C.click(),await J(1)}drawTask(C){if(this.lastColor!==C.color)document.getElementById("color-"+C.color).click(),this.lastColor=C.color,this.log("Color switched for draw task",{color:C.color});let a=C.position.pixelSize/2,l=C.position.toScreenPosition();document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:l.x+a,clientY:l.y+a,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let C=globalThis.fetch,a=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(l,r)=>{let f=await C(l,r),t=f.clone(),s="";if(typeof l=="string")s=l;else if(l instanceof Request)s=l.url;else if(l instanceof URL)s=l.href;if(f.url==="https://backend.wplace.live/me")this.me=await t.json(),this.me.favoriteLocations.unshift(...S),this.me.maxFavoriteLocations=1/0,f.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let o=a.exec(s);if(o){for(let p=0;p<this.markerPixelPositionResolvers.length;p++)this.markerPixelPositionResolvers[p](new c(this,+o[1],+o[2],+o[3],+o[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return f}}async closeAll(){for(let C of document.querySelectorAll("button"))if(C.innerHTML==="✕"||C.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')C.click(),await J(1)}waitForElement(C,a){return this.log("Waiting for element",{name:C,selector:a}),this.widget.run(`Waiting for ${C}`,()=>{return new Promise((l)=>{let r=document.querySelector(a);if(r){l(r);return}let f=new MutationObserver(()=>{let t=document.querySelector(a);if(t)f.disconnect(),l(t)});f.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,S.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let C=0;C<this.images.length;C++)this.images[C].position.updateAnchor(),this.images[C].update()}updateTasks(){for(let C=0;C<this.images.length;C++)this.images[C].updateTasks()}updateImageColors(){for(let C=0;C<this.images.length;C++)this.images[C].updateColors()}}globalThis.kglacerMacro=new H1;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
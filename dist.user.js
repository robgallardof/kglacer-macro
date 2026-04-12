// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      1.0.4
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
function t(w,f,p){let z=w[p];return w[p]=w[f],w[f]=z,w}function e(w,f){let p=w.indexOf(f);if(p!==-1)w.splice(p,1);return p}var y0=Math.floor(Math.random()*65536),a0=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function V(w){return new Promise((f)=>setTimeout(f,w))}function P(w,f,p=["error"],z="addEventListener"){return new Promise((M,A)=>{for(let J=0;J<f.length;J++)w[z]?.(f[J],M);for(let J=0;J<p.length;J++)w[z]?.(p[J],A)})}class L0{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(w,f=15000){this.size=w,this.historyTime=f}push(w){if(w<0)throw new Error("Negative chunk size");let{time:f,historyTime:p}=this.getTime();if(this.history.push({time:f,chunk:w}),this.history[0]&&this.history[0].time+p<f)this.history.shift();this.sum+=w,delete this.statsCached}get stats(){if(!this.statsCached){let w=this.history.reduce((f,p)=>f+p.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:w}:{speed:w,percent:this.sum/this.size,eta:~~((this.size-this.sum)/w)*1000}}return this.statsCached}getTime(){let w=Date.now(),f=w-this.startTime,p=Math.min(f,this.historyTime);return{time:w,historyTime:p}}}class s{runOnDestroy=[];destroy(){for(let w=0;w<this.runOnDestroy.length;w++)this.runOnDestroy[w]()}populateElementsWithSelector(w,f){for(let p in f)this[p]=w.querySelector(f[p])}registerEvent(w,f,p,z={}){z.passive??=!0,w.addEventListener(f,p,z),this.runOnDestroy.push(()=>{w.removeEventListener(f,p)})}}function w0(w){return w>0.04045?((w+0.055)/1.055)**2.4:w/12.92}function H0(w,f,p){let z=w0(w/255),M=w0(f/255),A=w0(p/255),J=Math.cbrt(0.4122214708*z+0.5363325363*M+0.0514459929*A),G=Math.cbrt(0.2119034982*z+0.6806995451*M+0.1073969566*A),H=Math.cbrt(0.0883024619*z+0.2817188376*M+0.6299787005*A),l=0.2104542553*J+0.793617785*G-0.0040720468*H,Q=1.9779984951*J-2.428592205*G+0.4505937099*H,K=0.0259040371*J+0.7827717662*G-0.808675766*H;return[l,Q,K]}function Q0(w,f,p){let[z,M,A]=w,[J,G,H]=f,l=(n)=>n*180/Math.PI,Q=(n)=>n*Math.PI/180,K=1,Y=1,W=1,B=Math.sqrt(M**2+A**2),Z=Math.sqrt(G**2+H**2),T=(B+Z)/2,N=0.5*(1-Math.sqrt(T**7/(T**7+6103515625))),U=M*(1+N),g=G*(1+N),O=Math.sqrt(U**2+A**2),L=Math.sqrt(g**2+H**2),u=A===0&&U===0?0:l(Math.atan2(A,U))%360,b=H===0&&g===0?0:l(Math.atan2(H,g))%360,m=J-z,M0=L-O,$=0;if(O*L!==0){if($=b-u,$>180)$-=360;else if($<-180)$+=360}let A0=2*Math.sqrt(O*L)*Math.sin(Q($)/2),J0=(z+J)/2,r=(O+L)/2,v=(u+b)/2;if(Math.abs(u-b)>180)v+=180;let N0=1-0.17*Math.cos(Q(v-30))+0.24*Math.cos(Q(2*v))+0.32*Math.cos(Q(3*v+6))-0.2*Math.cos(Q(4*v-63)),V0=1+0.015*(J0-50)**2/Math.sqrt(20+(J0-50)**2),G0=1+0.045*r,l0=1+0.015*r*N0,X0=30*Math.exp((-((v-275)/25))**2),b0=-(2*Math.sqrt(r**7/(r**7+6103515625)))*Math.sin(Q(2*X0));return Math.sqrt((m/(1*V0))**2+(M0/(1*G0))**2+(A0/(1*l0))**2+b0*(M0/(1*G0))*(A0/(1*l0)))-m*p}var E=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],_=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function d(w){if(w===0)return"transparent";let f=E[w];return`oklab(${f[0]*100}% ${f[1]} ${f[2]})`}var K0={en:{widgetTitle:"KGlacerMacro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",random:"Random",humanized:"Humanized",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutsHelp:"Shift+B toggle widget · Shift+M hide/show panel · Shift+S show panel · Shift+H hide panel · Shift+Enter draw · Shift+I add image",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",random:"Aleatorio",humanized:"Humanizado",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutsHelp:"Shift+B mostrar widget · Shift+M ocultar/mostrar panel · Shift+S mostrar panel · Shift+H ocultar panel · Shift+Enter dibujar · Shift+I agregar imagen",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color"}};function P0(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function f0(){let w=localStorage.getItem("kglacermacro:locale");if(w&&w in K0)return w;return P0()}function B0(w){localStorage.setItem("kglacermacro:locale",w)}function j(w){let f=f0();return K0[f][w]}function x(w){for(let f of w.querySelectorAll("[data-i18n]"))f.textContent=j(f.dataset.i18n);for(let f of w.querySelectorAll("[data-i18n-placeholder]"))f.setAttribute("placeholder",j(f.dataset.i18nPlaceholder))}var Y0=`<div class="wtopbar">
  <button class="export" title="Export" aria-label="Export image settings">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 15v3h14v-3"/></svg>
  </button>
  <button class="lock" title="Lock" aria-label="Toggle lock">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path class="icon-unlocked" d="M7 10V7a5 5 0 0 1 10 0"/>
      <path d="M6 10h12v10H6z"/>
    </svg>
  </button>
  <button class="delete" title="Delete" aria-label="Delete image">
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
    <button class="open-colors" type="button" data-i18n="openColorPanel">Open color panel</button>
    <label><span data-i18n="opacity">Opacity</span>:&nbsp;<input class="opacity" type="range" min="0" max="100"/></label>
    <label><span data-i18n="brightness">Brightness</span>:&nbsp;<input class="brightness" type="number" step="0.1"/></label>
    <label>
      <span data-i18n="strategy">Strategy</span>:&nbsp;<select class="strategy">
        <option value="RANDOM" selected data-i18n="random">Random</option>
        <option value="HUMANIZED" data-i18n="humanized">Humanized</option>
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
    <input class="color-search" type="search" data-i18n-placeholder="searchColors" placeholder="Search color by hex, English or Spanish"/>
    <div class="colors-dialog-list"></div>
  </dialog>
  <div class="resize n"></div>
  <div class="resize e"></div>
  <div class="resize s"></div>
  <div class="resize w"></div>
</div>
`;class R{bot;image;width;brightness;exactColor;static async fromJSON(w,f){let p=new Image;return p.src=f.url.startsWith("http")?await fetch(f.url,{cache:"no-store"}).then((z)=>z.blob()).then((z)=>URL.createObjectURL(z)):f.url,await P(p,["load"],["error"]),new R(w,p,f.width,f.brightness,f.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(w){this.width=w*this.resolution|0}constructor(w,f,p=f.naturalWidth,z=0,M=!1){this.bot=w;this.image=f;this.width=p;this.brightness=z;this.exactColor=M;if(M)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let w=new Map;for(let p=1;p<64;p++)if(this.exactColor||!this.bot.unavailableColors.has(p))w.set(_[p],[p,p]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let f=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let p=0;p<this.canvas.height;p++)for(let z=0;z<this.canvas.width;z++){let M=(p*this.canvas.width+z)*4,A=f[M],J=f[M+1],G=f[M+2],H=f[M+3],l=`${A},${J},${G}`;if(this.exactColor){this.pixels[p][z]=H<100?0:_.indexOf(l);continue}let Q,K;if(H<100)Q=K=0;else if(w.has(l))[Q,K]=w.get(l);else{let W=1/0,B=1/0;for(let Z=0;Z<E.length;Z++){let T=E[Z],N=Q0(H0(A,J,G),T,this.brightness);if(!this.bot.unavailableColors.has(Z)&&N<W)W=N,Q=Z;if(N<B)B=N,K=Z}w.set(l,[Q,K])}if(Q!==0)this.context.fillStyle=`oklab(${E[Q][0]*100}% ${E[Q][1]} ${E[Q][2]})`,this.context.fillRect(z,p,1,1);this.pixels[p][z]=Q;let Y=this.colors.get(K);if(Y)Y.amount++;else this.colors.set(K,{color:Q,amount:1,realColor:K})}}toJSON(){let w=document.createElement("canvas");return w.width=this.image.naturalWidth,w.height=this.image.naturalHeight,w.getContext("2d").drawImage(this.image,0,0),{url:w.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor}}}var k="kglacermacro",U0=["wbot"],y="kgm";function _0(){let w=[k,...U0];for(let f=0;f<w.length;f++){let p=w[f],z=localStorage.getItem(p);if(!z)continue;return{json:z,key:p}}return}function g0(){let w=_0();if(!w)return;let f;try{if(f=JSON.parse(w.json),typeof f!=="object")throw new Error("NOT VALID SAVE");if(f.version===1){let p=f;f.images=p.widget.images,f.strategy=p.widget.strategy,delete p.widget}if(w.key!==k)localStorage.setItem(k,w.json)}catch{localStorage.removeItem(w.key),f=void 0}return f}var Z0;function D(w,f=!1){if(clearTimeout(Z0),f)localStorage.setItem(k,JSON.stringify(w));else Z0=setTimeout(()=>{localStorage.setItem(k,JSON.stringify(w))},600)}var q=1000,o0=2048,h=q*o0,X=[],I=[],c0=Date.now();function a(w){X.push(w),I.push({id:c0++,latitude:(2*Math.atan(Math.exp(-(w.y/h*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(w.x/h*(2*Math.PI)-Math.PI)*180/Math.PI,name:"WBOT_FAVORITE"})}a({x:h/3|0,y:h/3|0});a({x:h/3*2|0,y:h/3*2|0});function o(w){let f=w.getBoundingClientRect();return{x:f.left+f.width/2,y:f.top+f.height/2}}class F{bot;static fromJSON(w,f){return new F(w,...f)}static fromScreenPosition(w,f){let{anchorScreenPosition:p,pixelSize:z,anchorWorldPosition:M}=w.findAnchorsForScreen(f);return new F(w,M.x+(f.x-p.x)/z|0,M.y+(f.y-p.y)/z|0)}globalX=0;globalY=0;get tileX(){return this.globalX/q|0}set tileX(w){this.globalX=w*q+this.x}get tileY(){return this.globalY/q|0}set tileY(w){this.globalY=w*q+this.y}get x(){return this.globalX%q}set x(w){this.globalX=this.tileX*q+w}get y(){return this.globalY%q}set y(w){this.globalY=this.tileY*q+w}anchor1Index;anchor2Index;get pixelSize(){return(o(this.bot.$stars[this.anchor2Index]).x-o(this.bot.$stars[this.anchor1Index]).x)/(X[this.anchor2Index].x-X[this.anchor1Index].x)}constructor(w,f,p,z,M){this.bot=w;if(z===void 0||M===void 0)this.globalX=f,this.globalY=p;else this.globalX=f*q+z,this.globalY=p*q+M;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let w=1/0,f=1/0;for(let p=0;p<X.length;p++){let{x:z,y:M}=X[p];if(z<this.globalX&&M<this.globalY){let A=this.globalX-z+(this.globalY-M);if(A<w)w=A,this.anchor1Index=p}else if(z>this.globalX&&M>this.globalY){let A=z-this.globalX+(M-this.globalY);if(A<f)f=A,this.anchor2Index=p}}}toScreenPosition(){let w=X[this.anchor1Index],f=o(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-w.x)*this.pixelSize+f.x,y:(this.globalY-w.y)*this.pixelSize+f.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:w,y:f}=this.toScreenPosition();this.bot.moveMap({x:w-window.innerWidth/3,y:f-window.innerHeight/3})}clone(){return new F(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class c extends s{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(w,f){return new c(w,F.fromJSON(w,f.position),await R.fromJSON(w,f.pixels),f.strategy,f.opacity,f.drawTransparentPixels,f.drawColorsInOrder,f.colors,f.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colors;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$closeColors;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;constructor(w,f,p,z="SPIRAL_FROM_CENTER",M=50,A=!1,J=!1,G=[],H=!1){super();this.bot=w;this.position=f;this.pixels=p;this.strategy=z;this.opacity=M;this.drawTransparentPixels=A;this.drawColorsInOrder=J;this.colors=G;this.lock=H;this.element.innerHTML=Y0,this.element.classList.add("wimage"),x(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colors:".colors",$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$closeColors:".close-colors",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,D(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),D(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let l;this.registerEvent(this.$brightness,"change",()=>{clearTimeout(l),l=setTimeout(()=>{this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),D(this.bot)},1000)}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),D(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,D(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,D(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),D(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.$colorsDialog.showModal()}),this.registerEvent(this.$closeColors,"click",()=>{this.$colorsDialog.close()}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let Q of this.element.querySelectorAll(".resize"))this.registerEvent(Q,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let w=this.position.clone(),f=new Set,p=new Map;for(let z=0;z<this.colors.length;z++){let M=this.colors[z];if(M.disabled)f.add(M.realColor);p.set(M.realColor,z)}for(let{x:z,y:M}of this.strategyPositionIterator()){let A=this.pixels.pixels[M][z];if(f.has(A))continue;w.globalX=this.position.globalX+z,w.globalY=this.position.globalY+M;let J=w.getMapColor();if(A!==J&&(this.drawTransparentPixels||A!==0))this.tasks.push({position:w.clone(),color:A})}if(this.drawColorsInOrder)this.tasks.sort((z,M)=>(p.get(z.color)??0)-(p.get(M.color)??0));this.update(),this.bot.widget.update()}update(){let{x:w,y:f}=this.position.toScreenPosition();this.element.style.transform=`translate(${w}px, ${f}px)`,this.element.style.width=`${this.position.pixelSize*this.pixels.width}px`,this.element.style.height=`${this.position.pixelSize*this.pixels.height}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let p=this.pixels.pixels.length*this.pixels.pixels[0].length,z=p-this.tasks.length,M=z/p*100|0;this.$progressText.textContent=`${z}/${p} ${M}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${M}%)`,this.$wrapper.classList[this.lock?"add":"remove"]("no-pointer-events"),this.$lock.classList[this.lock?"add":"remove"]("locked")}destroy(){super.destroy(),this.element.remove(),e(this.bot.images,this),this.bot.widget.update(),D(this.bot)}colorHex(w){let f=_[w]??"0,0,0",[p=0,z=0,M=0]=f.split(",").map((A)=>Number.parseInt(A,10));return`#${[p,z,M].map((A)=>A.toString(16).padStart(2,"0")).join("")}`}colorKeywords(w){let f=_[w]??"0,0,0",[p=0,z=0,M=0]=f.split(",").map((H)=>Number.parseInt(H,10)),A=Math.max(p,z,M),J=Math.min(p,z,M);if(A-J<15)return["gray","grey","gris","neutral","neutro"];if(p>z+30&&p>M+30)return["red","rojo"];if(z>p+30&&z>M+30)return["green","verde"];if(M>p+30&&M>z+30)return["blue","azul"];if(p>170&&z>120&&M<130)return["orange","naranja"];if(p>170&&z>110&&M>140)return["pink","rosa"];if(p>120&&z<100&&M>120)return["purple","violet","morado"];if(p>130&&z>130&&M<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colors.innerHTML="",this.$colorsDialogList.innerHTML="";let w=this.pixels.pixels.length*this.pixels.pixels[0].length,f=100/this.pixels.colors.size,p=document.createElement("div");p.className="colors-track",p.setAttribute("aria-label",j("overlayColors")),this.$colorsDialogList.setAttribute("aria-label",j("colorPanelResults"));let z=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((A)=>!this.pixels.colors.has(A.realColor)))this.colors=this.pixels.colors.values().toArray().sort((A,J)=>J.amount-A.amount).map((A)=>({realColor:A.realColor,disabled:!1})),D(this.bot);let M=0;for(let A=0;A<this.colors.length;A++){let J=this.colors[A],G=this.pixels.colors.get(J.realColor),H=!1,l=G.realColor!==G.color,Q=G.amount/w*100,K=this.colorHex(G.realColor),Y=this.colorKeywords(G.realColor),W=()=>{if(H)return;J.disabled=J.disabled?void 0:!0,B.classList.toggle("color-disabled"),Z.classList.toggle("disabled",Boolean(J.disabled));let U=Z.querySelector(".state");if(U)U.textContent=J.disabled?j("disabled"):j("enabled");D(this.bot)},B=document.createElement("button");if(B.title=`${Q.toFixed(1)}%`,J.disabled)B.classList.add("color-disabled");if(!l)B.style.background=d(G.realColor);else{B.classList.add("substitution"),B.style.setProperty("--wreal-color",d(G.realColor)),B.style.setProperty("--wsubstitution-color",d(G.color));let U=document.createElement("button"),g=document.createElement("button");U.textContent=j("buy"),g.textContent="✓",U.classList.add("buy"),g.classList.add("disable"),U.addEventListener("click",()=>{document.getElementById("color-"+G.realColor)?.click()}),g.addEventListener("click",W),B.append(U),B.append(g)}B.style.left=M+"%",B.style.width=Q+"%",M+=Q,B.style.setProperty("--wleft",f*A+"%"),B.style.setProperty("--wwidth",f+"%"),p.append(B);let Z=document.createElement("button");if(Z.className=`color-chip ${J.disabled?"disabled":""}`,Z.innerHTML=`<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${Q.toFixed(1)}% · ${K.toUpperCase()}</span>
  <span class="state">${J.disabled?j("disabled"):j("enabled")}</span>
</span>
<span class="premium ${l?"on":""}">${l?j("premium"):""}</span>`,Z.querySelector(".swatch").style.setProperty("--swatch-color",d(G.realColor)),Z.addEventListener("click",()=>{W()}),l){let U=document.createElement("button");U.textContent=j("buy"),U.className="buy-chip",U.addEventListener("click",(g)=>{g.stopPropagation(),document.getElementById("color-"+G.realColor)?.click()}),Z.append(U)}let T=`${K} ${Y.join(" ")} ${G.realColor} ${_[G.realColor]}`;if(!z||T.toLowerCase().includes(z))this.$colorsDialogList.append(Z);let N=(U)=>{let g=A,O=B.getBoundingClientRect().width,L=(u)=>{if(g=Math.min(this.colors.length-1,Math.max(0,Math.round(A+(u.clientX-U.clientX)/O))),g!==A)H=!0;let b=0;for(let m of p.children){if(m===B)continue;if(b===g)b++;m.style.setProperty("--wleft",f*b+"%"),b++}B.style.setProperty("--wleft",f*g+"%")};document.addEventListener("mousemove",L),document.addEventListener("mouseup",()=>{if(document.removeEventListener("mousemove",L),g!==A)this.colors.splice(g,0,...this.colors.splice(A,1));D(this.bot),B.removeEventListener("mousedown",N),setTimeout(()=>{this.updateColors()},200)},{once:!0})};if(B.addEventListener("mousedown",N),!l)B.addEventListener("click",W)}this.$colors.append(p)}*strategyPositionIterator(){let w=this.pixels.pixels[0].length,f=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let p=0;p<f;p++)for(let z=0;z<w;z++)yield{x:z,y:p};break}case"UP":{for(let p=f-1;p>=0;p--)for(let z=0;z<w;z++)yield{x:z,y:p};break}case"LEFT":{for(let p=0;p<w;p++)for(let z=0;z<f;z++)yield{x:p,y:z};break}case"RIGHT":{for(let p=w-1;p>=0;p--)for(let z=0;z<f;z++)yield{x:p,y:z};break}case"RANDOM":{let p=[];for(let z=0;z<f;z++)for(let M=0;M<w;M++)p.push({x:M,y:z});for(let z=p.length-1;z>=0;z--){let M=Math.floor(Math.random()*(z+1)),A=p[z];p[z]=p[M],p[M]=A}yield*p;break}case"ZIGZAG":{for(let p=0;p<f;p++)if(p%2===0)for(let z=0;z<w;z++)yield{x:z,y:p};else for(let z=w-1;z>=0;z--)yield{x:z,y:p};break}case"HUMANIZED":{let p=Math.max(4,Math.floor(Math.min(w,f)/10)),z=[];for(let M=0;M<f;M+=p)for(let A=0;A<w;A+=p)z.push({x:A,y:M});for(let M=z.length-1;M>=0;M--){let A=Math.floor(Math.random()*(M+1)),J=z[M];z[M]=z[A],z[A]=J}for(let M=0;M<z.length;M++){let A=z[M],J=Math.min(f,A.y+p),G=Math.min(w,A.x+p);for(let H=A.y;H<J;H++)if(Math.random()>0.35)for(let Q=A.x;Q<G;Q++)yield{x:Q,y:H};else for(let Q=G-1;Q>=A.x;Q--)yield{x:Q,y:H}}break}case"DIAGONAL_BRUSH":{for(let p=0;p<w+f-1;p++){let z=p%2===0,M=[],A=Math.max(0,p-w+1),J=Math.min(f-1,p);for(let G=A;G<=J;G++){let H=p-G;if(H>=0&&H<w)M.push({x:H,y:G})}if(Math.random()>0.55)M.reverse();if(z)for(let G=M.length-1;G>=0;G--)yield M[G];else yield*M}break}case"BRUSH_STROKES":{let p=Array.from({length:f},()=>Array(w).fill(!1)),z=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],M=(G,H)=>G>=0&&G<w&&H>=0&&H<f,A=0,J=w*f;for(let G=0;G<J*6&&A<J;G++){let H=Math.floor(Math.random()*w),l=Math.floor(Math.random()*f),Q=z[Math.floor(Math.random()*z.length)],K=3+Math.floor(Math.random()*16);for(let Y=0;Y<K;Y++){if(!M(H,l))break;if(!p[l][H])p[l][H]=!0,A++,yield{x:H,y:l};if(Math.random()>0.72)Q=z[Math.floor(Math.random()*z.length)];H+=Q.x,l+=Q.y}}for(let G=0;G<f;G++)for(let H=0;H<w;H++)if(!p[G][H])yield{x:H,y:G};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let p=new Set,z=w*f,M=Math.floor(w/2),A=Math.floor(f/2),J=[[1,0],[0,1],[-1,0],[0,-1]],G=0,H=1,l=(K,Y)=>K>=0&&K<w&&Y>=0&&Y<f,Q=function*(){let K=0;while(K<z){for(let Y=0;Y<2;Y++){for(let W=0;W<H;W++){if(l(M,A)){let B=`${M},${A}`;if(!p.has(B)){if(p.add(B),yield{x:M,y:A},K++,K>=z)return}}M+=J[G][0],A+=J[G][1]}G=(G+1)%4}H++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*Q();else{let K=[...Q()];for(let Y=K.length-1;Y>=0;Y--)yield K[Y]}break}case"SCRIBBLE":{let p=new Set,z=w*f,M=Math.floor(w/2),A=Math.floor(f/2);while(p.size<z){let J=`${M},${A}`;if(!p.has(J))p.add(J),yield{x:M,y:A};if(M+=Math.floor(Math.random()*3)-1,A+=Math.floor(Math.random()*3)-1,M<0||M>=w||A<0||A>=f)M=Math.floor(Math.random()*w),A=Math.floor(Math.random()*f)}break}case"CROSSHATCH":{let p=[];for(let A=0;A<w+f-1;A++)for(let J=Math.max(0,A-w+1);J<=Math.min(f-1,A);J++){let G=A-J;p.push({x:G,y:J})}let z=[];for(let A=-f+1;A<w;A++)for(let J=0;J<f;J++){let G=J+A;if(G>=0&&G<w)z.push({x:G,y:J})}let M=new Set;for(let A of[...p,...z]){let J=`${A.x},${A.y}`;if(M.has(J))continue;M.add(J),yield A}break}case"WAVE_SWEEP":{let p=new Set;for(let z=0;z<w;z++){let A=(Math.sin(z/Math.max(1,w-1)*Math.PI*4)+1)*0.5*(f-1)|0;for(let J=0;J<f;J++){let G=A+J,H=A-J;for(let l of[G,H]){if(l<0||l>=f)continue;let Q=`${z},${l}`;if(p.has(Q))continue;p.add(Q),yield{x:z,y:l}}}}break}case"SCATTERED_LINES":{let p=new Set,z=w*f;while(p.size<z){let M=Math.floor(Math.random()*w),A=Math.floor(Math.random()*f),J=Math.random()*Math.PI*2,G=Math.round(Math.cos(J)),H=Math.round(Math.sin(J)),l=6+Math.floor(Math.random()*28);for(let Q=0;Q<l;Q++){if(M<0||M>=w||A<0||A>=f)break;let K=`${M},${A}`;if(!p.has(K))p.add(K),yield{x:M,y:A};M+=G,A+=H}}break}case"CONTOUR_JITTER":{let p=new Set;for(let z=0;z<Math.ceil(Math.min(w,f)/2);z++){let M=[],A=z,J=z,G=w-z-1,H=f-z-1;for(let l=A;l<=G;l++)M.push({x:l,y:J});for(let l=J+1;l<=H;l++)M.push({x:G,y:l});for(let l=G-1;l>=A;l--)M.push({x:l,y:H});for(let l=H-1;l>J;l--)M.push({x:A,y:l});for(let l=M.length-1;l>0;l--){let Q=Math.floor(Math.random()*(l+1)),K=M[l];M[l]=M[Q],M[Q]=K}for(let l of M){let Q=`${l.x},${l.y}`;if(p.has(Q))continue;p.add(Q),yield l}}break}case"SPIRAL_WOBBLE":{let p=new Set,z=w/2,M=f/2,A=Math.hypot(z,M);for(let J=0;p.size<w*f&&J<w*f*9;J++){let G=J/(w*f*9)*A,H=J*0.31+Math.sin(J*0.07)*0.7,l=Math.round(z+Math.cos(H)*G),Q=Math.round(M+Math.sin(H)*G);if(l<0||l>=w||Q<0||Q>=f)continue;let K=`${l},${Q}`;if(p.has(K))continue;p.add(K),yield{x:l,y:Q}}for(let J=0;J<f;J++)for(let G=0;G<w;G++){let H=`${G},${J}`;if(p.has(H))continue;yield{x:G,y:J}}break}case"CLUSTER_BURSTS":{let p=new Set,z=w*f;while(p.size<z){let M=Math.floor(Math.random()*w),A=Math.floor(Math.random()*f),J=2+Math.floor(Math.random()*10);for(let G=A-J;G<=A+J;G++)for(let H=M-J;H<=M+J;H++){if(H<0||H>=w||G<0||G>=f)continue;if(Math.hypot(H-M,G-A)>J)continue;let l=`${H},${G}`;if(p.has(l))continue;p.add(l),yield{x:H,y:G}}}break}case"ORBITAL":{let p=new Set,z=(w-1)/2,M=(f-1)/2,A=Math.ceil(Math.max(z,M));for(let J=0;J<=A;J++){let G=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,J)*2));for(let H=0;H<G;H++){let l=H/G*Math.PI*2+(J%2?0.3:-0.3),Q=Math.round(z+Math.cos(l)*J),K=Math.round(M+Math.sin(l)*J);if(Q<0||Q>=w||K<0||K>=f)continue;let Y=`${Q},${K}`;if(p.has(Y))continue;p.add(Y),yield{x:Q,y:K}}}for(let J=0;J<f;J++)for(let G=0;G<w;G++){let H=`${G},${J}`;if(p.has(H))continue;yield{x:G,y:J}}break}case"FLOW_FIELD":{let p=new Set,z=w*f;while(p.size<z){let M=Math.floor(Math.random()*w),A=Math.floor(Math.random()*f);for(let J=0;J<120;J++){if(M<0||M>=w||A<0||A>=f)break;let G=`${M},${A}`;if(!p.has(G))p.add(G),yield{x:M,y:A};let H=Math.sin(M*0.09)*1.8+Math.cos(A*0.08)*1.6+Math.sin((M+A)*0.05);M+=Math.round(Math.cos(H)),A+=Math.round(Math.sin(H))}}break}case"EDGE_IN":{let p=new Set,z=Math.ceil(Math.min(w,f)/2);for(let M=0;M<z;M++){let A=M,J=w-1-M,G=M,H=f-1-M;for(let l=A;l<=J;l++)for(let Q of[G,H]){let K=`${l},${Q}`;if(p.has(K))continue;p.add(K),yield{x:l,y:Q}}for(let l=G+1;l<=H-1;l++)for(let Q of[A,J]){let K=`${Q},${l}`;if(p.has(K))continue;p.add(K),yield{x:Q,y:l}}}break}}}moveStart(w){if(!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:w.clientX,clientY:w.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors()}move(w){if(!this.moveInfo)return;let f=Math.round((w.clientX-this.moveInfo.clientX)/this.position.pixelSize),p=Math.round((w.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=f+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-f)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,f+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=p+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-p)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,p+this.moveInfo.height);this.update(),D(this.bot)}resizeStart(w){this.moveInfo={clientX:w.clientX,clientY:w.clientY};let f=w.target;if(f.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(f.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(f.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(f.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let w=document.createElement("a");document.body.append(w),w.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),w.download=`${this.pixels.width}x${this.pixels.height}.${y}`,w.click(),URL.revokeObjectURL(w.href),w.href=this.pixels.canvas.toDataURL("image/webp",1),w.download=`${this.pixels.width}x${this.pixels.height}.webp`,w.click(),URL.revokeObjectURL(w.href),w.remove()}}var j0=`/* stylelint-disable declaration-no-important */
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
  overflow-y: auto;
  max-height: 32dvh;
}

.wwidget .images .image {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 6px;
  align-items: center;
  width: 100%;
  min-height: 64px;
}

.wwidget .images .image img {
  max-width: 100%;
  max-height: 56px;
  margin: 0 auto;
  border-radius: 8px;
  cursor: pointer;
}

.wwidget .images .image button {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  font-size: 16px;
}

.wwidget .shortcuts-dialog {
  width: min(380px, 90vw);
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #11182a;
  color: var(--text);
}

.wwidget .shortcuts-dialog::backdrop {
  background: rgb(0 0 0 / 45%);
}

.wwidget .shortcuts {
  display: grid;
  gap: 2px;
  justify-items: start;
  text-align: left;
  white-space: normal;
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
  top: 40px;
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
  stroke-width: 2;
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
  transition: background-color 0.2s;
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
  background-color: var(--background-hover);
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

.wimage .open-colors {
  width: calc(100% - 10px);
}

.wimage .colors-dialog {
  width: min(560px, 92vw);
  max-height: min(85dvh, 680px);
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #0f1526;
  color: var(--text);
}

.wimage .colors-dialog::backdrop {
  background: rgb(0 0 0 / 55%);
}

.wimage .colors-dialog-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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

.wform .colors .color-chip {
  display: grid;
  grid-template-columns: 18px 1fr auto auto;
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

.wform .colors .color-chip.disabled {
  opacity: 0.65;
}

.wform .colors .color-chip .swatch {
  width: 14px;
  height: 14px;
  border: 1px solid rgb(255 255 255 / 15%);
  border-radius: 4px;
  background: var(--swatch-color);
}

.wform .colors .color-chip .meta {
  display: grid;
  gap: 2px;
  justify-items: start;
}

.wform .colors .color-chip .premium.on {
  color: #ffd166;
}

.wform .colors .color-chip .buy-chip {
  padding: 3px 6px;
  border-radius: 6px;
  font-size: 10px;
}

.wtopbar {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  width: 160px;
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
`;class i extends Error{name="KGlacerMacroError";constructor(w,f){super(w);f.widget.status=w}}class p0 extends i{name="NoImageError";constructor(w){super("❌ No image is selected",w)}}var C={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0}};function S(w,f){return w.key.toLowerCase()===f.key&&w.shiftKey===Boolean(f.shift)&&w.ctrlKey===Boolean(f.ctrl)&&w.altKey===Boolean(f.alt)}function D0(w){if(typeof HTMLElement==="undefined")return!1;if(!(w instanceof HTMLElement))return!1;let f=w.tagName.toLowerCase();return f==="input"||f==="textarea"||w.isContentEditable||w.closest('[contenteditable="true"]')!==null}var q0=`<button class="wopen-button" aria-label="Toggle widget">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16"/>
  </svg>
</button>
<div class="title">
  <span data-i18n="widgetTitle">KGlacerMacro</span>
  <div class="widget-actions">
    <button class="show-shortcuts" data-i18n="showShortcuts">Show shortcuts</button>
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
  <label><span data-i18n="strategy">Strategy</span>:&nbsp;<select class="strategy">
    <option value="SEQUENTIAL" selected data-i18n="sequential">Sequential</option>
    <option value="ALL" data-i18n="all">All</option>
    <option value="PERCENTAGE" data-i18n="percentage">Percentage</option>
  </select></label>
  <div class="shortcuts">
    <strong data-i18n="keyboardShortcuts">Shortcuts</strong>
    <span data-i18n="shortcutsHelp"
      >Shift+B toggle widget · Shift+M hide/show panel · Shift+S show panel · Shift+H hide panel · Shift+Enter draw · Shift+I add image</span
    >
  </div>
  <div class="images"></div>
  <button class="add-image" disabled data-i18n="addImage">Add image</button>
</div>
<dialog class="shortcuts-dialog">
  <strong data-i18n="keyboardShortcuts">Shortcuts</strong>
  <p data-i18n="shortcutsHelp">Shift+B toggle widget · Shift+M hide/show panel · Shift+S show panel · Shift+H hide panel · Shift+Enter draw · Shift+I add image</p>
  <button class="close-shortcuts" data-i18n="close">Close</button>
</dialog>
`;class z0 extends s{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(w){this.$status.innerHTML=w}get open(){return this.element.classList.contains("wopen")}set open(w){if(w)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$minimize;$showShortcuts;$closeShortcuts;$shortcutsDialog;$locale;$minimizedBar;$restorePanel;$topbar;$draw;$addImage;$strategy;$progressLine;$progressText;$images;$wopenButton;constructor(w){super();this.bot=w;this.element.classList.add("wwidget"),this.element.innerHTML=q0,x(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$settings:".wform",$status:".wstatus",$minimize:".minimize",$showShortcuts:".show-shortcuts",$closeShortcuts:".close-shortcuts",$shortcutsDialog:".shortcuts-dialog",$locale:".locale",$minimizedBar:".minimized-bar",$restorePanel:".restore-panel",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$minimize.addEventListener("click",()=>{this.minimize()}),this.$restorePanel.addEventListener("click",()=>{this.minimize(!1)}),this.$showShortcuts.addEventListener("click",()=>{this.$shortcutsDialog.showModal()}),this.$closeShortcuts.addEventListener("click",()=>{this.$shortcutsDialog.close()}),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=f0(),this.$locale.addEventListener("change",()=>{B0(this.$locale.value),x(this.element);for(let f=0;f<this.bot.images.length;f++)this.bot.images[f].updateColors()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run("Adding image",async()=>{await this.bot.updateColors();let w=document.createElement("input");w.type="file",w.accept=`image/*,.${y}`,w.click(),await P(w,["change"],["cancel","error"]);let f=w.files?.[0];if(!f)throw new p0(this.bot);console.log("[KGM][Widget] File selected",{name:f.name,size:f.size,type:f.type});let p;if(f.name.endsWith(`.${y}`))p=await c.fromJSON(this.bot,JSON.parse(await f.text()));else{let z=new FileReader;z.readAsDataURL(f),await P(z,["load"],["error"]);let M=await this.compressImageBeforeLoad(z.result),A=new Image;A.src=M,await P(A,["load"],["error"]),p=new c(this.bot,F.fromScreenPosition(this.bot,{x:256,y:32}),new R(this.bot,A))}this.bot.images.push(p),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),p.updateTasks(),D(this.bot,!0),console.log("[KGM][Widget] Image persisted, reloading page"),document.location.reload()},()=>{this.setDisabled("add-image",!1)})}async compressImageBeforeLoad(w){let f=new Image;if(f.src=w,await P(f,["load"],["error"]),!(f.naturalWidth*f.naturalHeight>3000000||w.length>3000000))return w;let z=document.createElement("canvas");z.width=f.naturalWidth,z.height=f.naturalHeight;let M=z.getContext("2d");if(!M)return w;return M.drawImage(f,0,0),z.toDataURL("image/png")}update(){this.$strategy.value=this.bot.strategy,this.$minimize.textContent=this.$settings.classList.contains("hidden")?j("expandPanel"):j("minimize");let w=0,f=0;for(let A=0;A<this.bot.images.length;A++){let J=this.bot.images[A];w+=J.pixels.pixels.length*J.pixels.pixels[0].length,f+=J.tasks.length}let p=w-f,z=p/w*100|0;this.$progressText.textContent=`${p}/${w} ${z}% ETA: ${f/120|0}h`,this.$progressLine.style.transform=`scaleX(${z}%)`,this.$images.innerHTML="";let M=document.createDocumentFragment();for(let A=0;A<this.bot.images.length;A++){let J=this.bot.images[A],G=document.createElement("div");M.append(G),G.className="image",G.innerHTML=`<img src="${J.pixels.image.src}">
  <button class="up" title="Move up" ${A===0?"disabled":""}>▴</button>
  <button class="down" title="Move down" ${A===this.bot.images.length-1?"disabled":""}>▾</button>`,G.querySelector("img").addEventListener("click",()=>{J.position.scrollScreenTo()}),G.querySelector(".up").addEventListener("click",()=>{t(this.bot.images,A,A-1),this.update(),D(this.bot)}),G.querySelector(".down").addEventListener("click",()=>{t(this.bot.images,A,A+1),this.update(),D(this.bot)})}this.$images.append(M)}setDisabled(w,f){this.element.querySelector("."+w).disabled=f}async run(w,f,p,z="..."){console.log("[KGM][Widget] Task started",{status:w});let M=this.status;this.status=`${z} ${w}`;try{let A=await f();return this.status=M,console.log("[KGM][Widget] Task completed",{status:w}),A}catch(A){if(!(A instanceof i))console.error(A),this.status=`Error: ${w}`;throw console.error("[KGM][Widget] Task failed",{status:w,error:A}),A}finally{await p?.()}}minimize(w){let f=w===void 0?!this.$settings.classList.contains("hidden"):!w;this.$settings.classList.toggle("hidden",f),this.$minimizedBar.classList.toggle("hidden",!f),this.$minimize.textContent=f?j("expandPanel"):j("minimize")}handleKeyboard(w){if(D0(w.target))return;if(S(w,C.toggleWidget)){w.preventDefault(),this.open=!this.open;return}if(S(w,C.minimizeWidget)){w.preventDefault(),this.minimize();return}if(S(w,C.showWidgetPanel)){w.preventDefault(),this.minimize(!1);return}if(S(w,C.hideWidgetPanel)){w.preventDefault(),this.minimize(!0);return}if(S(w,C.addImage)&&!this.$addImage.disabled){w.preventDefault(),this.addImage();return}if(S(w,C.draw)&&!this.$draw.disabled)w.preventDefault(),this.bot.draw()}}var T0=2,F0="[KGM]";class W0{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];widget=new z0(this);markerPixelPositionResolvers=[];lastColor;imageSyncFrames=0;imageSyncRequested=!1;log(w,f){if(f===void 0)console.log(`${F0} ${w}`);else console.log(`${F0} ${w}`,f)}constructor(){this.log("Boot sequence started");let w=g0();if(this.log("Save loaded",{hasSave:Boolean(w),imageCount:w?.images.length??0,strategy:w?.strategy}),w){for(let p=0;p<w.images.length;p++){let z=w.images[p];a({x:z.position[0]-1000,y:z.position[1]-1000}),a({x:z.position[0]+1000,y:z.position[1]+1000})}this.strategy=w.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let f=document.createElement("style");f.textContent=j0.replace("FAKE_FAVORITE_LOCATIONS",I.length.toString()),document.head.append(f),this.log("Styles injected",{fakeFavoriteLocations:I.length}),this.widget.run("Initializing",async()=>{this.log("Widget initialization flow started"),await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let p=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((z)=>{for(let M=0;M<z.length;M++)if(z[M].removedNodes.length!==0){this.updateStars();break}this.requestImageSync(2)}).observe(p,{attributes:!0,childList:!0,subtree:!0}),globalThis.addEventListener("resize",()=>{this.requestImageSync(6)},{passive:!0}),document.addEventListener("visibilitychange",()=>{this.requestImageSync(6)},{passive:!0}),this.updateStars(),this.attachRealtimeOverlaySync(p),this.log("Stars updated after boot",{stars:this.$stars.length}),await V(500),await this.updateColors(),w)for(let z=0;z<w.images.length;z++){let M=await c.fromJSON(this,w.images[z]);this.images.push(M),M.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.log("Initialization completed; controls enabled")})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let w=document.querySelector(".maplibregl-canvas"),f=(p)=>{if(!p.shiftKey)p.stopPropagation()};return this.widget.run("Drawing",async()=>{await this.widget.run("Initializing draw",()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",f,!0),w.addEventListener("wheel",f,!0),this.updateTasks();let p=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((A)=>A.json()),z=Math.floor(p.charges.count);this.log("Charges fetched",{charges:z});let M=0;for(let A=0;A<this.images.length;A++)M+=this.images[A].tasks.length;switch(this.log("Tasks prepared",{tasks:M}),this.strategy){case"ALL":{while(z>0){let A=!0;for(let J=0;J<this.images.length;J++){let G=this.images[J].tasks.shift();if(!G)continue;this.drawTask(G),z--,await V(1),A=!1}if(A)break}break}case"PERCENTAGE":{for(let A=0;A<M&&z>0;A++){let J=1,G;for(let H=0;H<this.images.length;H++){let l=this.images[H],Q=1-l.tasks.length/(l.pixels.pixels.length*l.pixels.pixels[0].length);if(Q<J)J=Q,G=l}this.drawTask(G.tasks.shift()),z--,await V(1)}break}case"SEQUENTIAL":for(let A=0;A<this.images.length;A++){let J=this.images[A];for(let G=J.tasks.shift();G&&z>0;G=J.tasks.shift())this.drawTask(G),z--,await V(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:z})},()=>{globalThis.removeEventListener("mousemove",f,!0),w.removeEventListener("wheel",f,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:T0,images:this.images.map((w)=>w.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let w of document.querySelectorAll("button.btn.relative.w-full"))if(w.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(w.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(w){let f=document.querySelector(".maplibregl-canvas"),p=window.innerWidth/2,z=window.innerHeight/2,M=p-w.x,A=z-w.y;function J(G,H,l){f.dispatchEvent(new MouseEvent(G,{bubbles:!0,cancelable:!0,clientX:H,clientY:l,buttons:1}))}J("mousedown",p,z),J("mousemove",M,A),J("mouseup",M,A)}readMap(){this.mapsCache.clear();let w=new Set;for(let p=0;p<this.images.length;p++){let z=this.images[p],{tileX:M,tileY:A}=new F(this,z.position.globalX+z.pixels.pixels[0].length,z.position.globalY+z.pixels.pixels.length);for(let J=z.position.tileX;J<=M;J++)for(let G=z.position.tileY;G<=A;G++)w.add(`${J}/${G}`)}let f=0;return this.log("Reading map tiles",{tileCount:w.size}),this.widget.run(`Reading map [0/${w.size}]`,()=>Promise.all([...w].map(async(p)=>{this.mapsCache.set(p,await R.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${p}.png`,exactColor:!0})),this.widget.status=`⌛ Reading map [${++f}/${w.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((w)=>{if(!document.hasFocus())w();window.addEventListener("blur",()=>{setTimeout(w,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(w){let f=0,p=1,z=1/0,M=1/0;for(let G=0;G<this.$stars.length;G++){let{x:H,y:l}=o(this.$stars[G]);if(H<w.x&&l<w.y){let Q=w.x-H+(w.y-l);if(Q<z)z=Q,f=G}else if(H>w.x&&l>w.y){let Q=H-w.x+(l-w.y);if(Q<M)M=Q,p=G}}let A=o(this.$stars[f]),J=X[f];return{anchorScreenPosition:A,anchorWorldPosition:J,pixelSize:(o(this.$stars[p]).x-A.x)/(X[p].x-J.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await V(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await V(1);let w=document.querySelector("button.bottom-0");if(w?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')w.click(),await V(1)}drawTask(w){if(this.lastColor!==w.color)document.getElementById("color-"+w.color).click(),this.lastColor=w.color,this.log("Color switched for draw task",{color:w.color});let f=w.position.pixelSize/2,p=w.position.toScreenPosition();document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:p.x+f,clientY:p.y+f,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let w=globalThis.fetch,f=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(p,z)=>{let M=await w(p,z),A=M.clone(),J="";if(typeof p=="string")J=p;else if(p instanceof Request)J=p.url;else if(p instanceof URL)J=p.href;if(M.url==="https://backend.wplace.live/me")this.me=await A.json(),this.me.favoriteLocations.unshift(...I),this.me.maxFavoriteLocations=1/0,M.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let G=f.exec(J);if(G){for(let H=0;H<this.markerPixelPositionResolvers.length;H++)this.markerPixelPositionResolvers[H](new F(this,+G[1],+G[2],+G[3],+G[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return M}}async closeAll(){for(let w of document.querySelectorAll("button"))if(w.innerHTML==="✕"||w.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')w.click(),await V(1)}waitForElement(w,f){return this.log("Waiting for element",{name:w,selector:f}),this.widget.run(`Waiting for ${w}`,()=>{return new Promise((p)=>{let z=document.querySelector(f);if(z){p(z);return}let M=new MutationObserver(()=>{let A=document.querySelector(f);if(A)M.disconnect(),p(A)});M.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,I.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let w=0;w<this.images.length;w++)this.images[w].position.updateAnchor(),this.images[w].update()}attachRealtimeOverlaySync(w){let f=()=>{this.requestImageSync(20)},p=()=>{this.requestImageSync(2)};w.addEventListener("wheel",f,{passive:!0}),w.addEventListener("mousemove",p,{passive:!0}),w.addEventListener("touchmove",f,{passive:!0}),globalThis.addEventListener("scroll",f,{passive:!0})}requestImageSync(w){if(this.imageSyncFrames=Math.max(this.imageSyncFrames,w),this.imageSyncRequested)return;this.imageSyncRequested=!0;let f=()=>{if(this.updateImages(),this.imageSyncFrames--,this.imageSyncFrames>0){requestAnimationFrame(f);return}this.imageSyncRequested=!1};requestAnimationFrame(f)}updateTasks(){for(let w=0;w<this.images.length;w++)this.images[w].updateTasks()}updateImageColors(){for(let w=0;w<this.images.length;w++)this.images[w].updateColors()}}globalThis.kgm=new W0;globalThis.wbot=globalThis.kgm;
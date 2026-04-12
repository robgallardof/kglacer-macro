// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      1.0.3
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
function n(f,w,z){let M=f[z];return f[z]=f[w],f[w]=M,f}function i(f,w){let z=f.indexOf(w);if(z!==-1)f.splice(z,1);return z}var y0=Math.floor(Math.random()*65536),a0=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function R(f){return new Promise((w)=>setTimeout(w,f))}function S(f,w,z=["error"],M="addEventListener"){return new Promise((J,A)=>{for(let G=0;G<w.length;G++)f[M]?.(w[G],J);for(let G=0;G<z.length;G++)f[M]?.(z[G],A)})}class g0{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(f,w=15000){this.size=f,this.historyTime=w}push(f){if(f<0)throw new Error("Negative chunk size");let{time:w,historyTime:z}=this.getTime();if(this.history.push({time:w,chunk:f}),this.history[0]&&this.history[0].time+z<w)this.history.shift();this.sum+=f,delete this.statsCached}get stats(){if(!this.statsCached){let f=this.history.reduce((w,z)=>w+z.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:f}:{speed:f,percent:this.sum/this.size,eta:~~((this.size-this.sum)/f)*1000}}return this.statsCached}getTime(){let f=Date.now(),w=f-this.startTime,z=Math.min(w,this.historyTime);return{time:f,historyTime:z}}}class k{runOnDestroy=[];destroy(){for(let f=0;f<this.runOnDestroy.length;f++)this.runOnDestroy[f]()}populateElementsWithSelector(f,w){for(let z in w)this[z]=f.querySelector(w[z])}registerEvent(f,w,z,M={}){M.passive??=!0,f.addEventListener(w,z,M),this.runOnDestroy.push(()=>{f.removeEventListener(w,z)})}}function t(f){return f>0.04045?((f+0.055)/1.055)**2.4:f/12.92}function B0(f,w,z){let M=t(f/255),J=t(w/255),A=t(z/255),G=Math.cbrt(0.4122214708*M+0.5363325363*J+0.0514459929*A),U=Math.cbrt(0.2119034982*M+0.6806995451*J+0.1073969566*A),B=Math.cbrt(0.0883024619*M+0.2817188376*J+0.6299787005*A),Q=0.2104542553*G+0.793617785*U-0.0040720468*B,H=1.9779984951*G-2.428592205*U+0.4505937099*B,K=0.0259040371*G+0.7827717662*U-0.808675766*B;return[Q,H,K]}function H0(f,w,z){let[M,J,A]=f,[G,U,B]=w,Q=(r)=>r*180/Math.PI,H=(r)=>r*Math.PI/180,K=1,Y=1,D=1,V=Math.sqrt(J**2+A**2),p=Math.sqrt(U**2+B**2),Z=(V+p)/2,X=0.5*(1-Math.sqrt(Z**7/(Z**7+6103515625))),P=J*(1+X),l=U*(1+X),W=Math.sqrt(P**2+A**2),_=Math.sqrt(l**2+B**2),y=A===0&&P===0?0:Q(Math.atan2(A,P))%360,a=B===0&&l===0?0:Q(Math.atan2(B,l))%360,M0=G-M,A0=_-W,T=0;if(W*_!==0){if(T=a-y,T>180)T-=360;else if(T<-180)T+=360}let J0=2*Math.sqrt(W*_)*Math.sin(H(T)/2),G0=(M+G)/2,m=(W+_)/2,O=(y+a)/2;if(Math.abs(y-a)>180)O+=180;let W0=1-0.17*Math.cos(H(O-30))+0.24*Math.cos(H(2*O))+0.32*Math.cos(H(3*O+6))-0.2*Math.cos(H(4*O-63)),R0=1+0.015*(G0-50)**2/Math.sqrt(20+(G0-50)**2),U0=1+0.045*m,Q0=1+0.015*m*W0,L0=30*Math.exp((-((O-275)/25))**2),b0=-(2*Math.sqrt(m**7/(m**7+6103515625)))*Math.sin(H(2*L0));return Math.sqrt((M0/(1*R0))**2+(A0/(1*U0))**2+(J0/(1*Q0))**2+b0*(A0/(1*U0))*(J0/(1*Q0)))-M0*z}var g=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],e=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function I(f){if(f===0)return"transparent";let w=g[f];return`oklab(${w[0]*100}% ${w[1]} ${w[2]})`}var K0={en:{widgetTitle:"KGlacerMacro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",random:"Random",humanized:"Humanized",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutsHelp:"Shift+B toggle · Shift+Enter draw · Shift+I add image",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",random:"Aleatorio",humanized:"Humanizado",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutsHelp:"Shift+B mostrar/ocultar · Shift+Enter dibujar · Shift+I agregar imagen",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar"}};function C0(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function f0(){let f=localStorage.getItem("kglacermacro:locale");if(f&&f in K0)return f;return C0()}function Y0(f){localStorage.setItem("kglacermacro:locale",f)}function N(f){let w=f0();return K0[w][f]}function u(f){for(let w of f.querySelectorAll("[data-i18n]"))w.textContent=N(w.dataset.i18n)}var p0=`<div class="wtopbar">
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
  <div class="resize n"></div>
  <div class="resize e"></div>
  <div class="resize s"></div>
  <div class="resize w"></div>
</div>
`;class b{bot;image;width;brightness;exactColor;static async fromJSON(f,w){let z=new Image;return z.src=w.url.startsWith("http")?await fetch(w.url,{cache:"no-store"}).then((M)=>M.blob()).then((M)=>URL.createObjectURL(M)):w.url,await S(z,["load"],["error"]),new b(f,z,w.width,w.brightness,w.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(f){this.width=f*this.resolution|0}constructor(f,w,z=w.naturalWidth,M=0,J=!1){this.bot=f;this.image=w;this.width=z;this.brightness=M;this.exactColor=J;if(J)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let f=new Map;for(let z=1;z<64;z++)if(this.exactColor||!this.bot.unavailableColors.has(z))f.set(e[z],[z,z]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let w=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let z=0;z<this.canvas.height;z++)for(let M=0;M<this.canvas.width;M++){let J=(z*this.canvas.width+M)*4,A=w[J],G=w[J+1],U=w[J+2],B=w[J+3],Q=`${A},${G},${U}`;if(this.exactColor){this.pixels[z][M]=B<100?0:e.indexOf(Q);continue}let H,K;if(B<100)H=K=0;else if(f.has(Q))[H,K]=f.get(Q);else{let D=1/0,V=1/0;for(let p=0;p<g.length;p++){let Z=g[p],X=H0(B0(A,G,U),Z,this.brightness);if(!this.bot.unavailableColors.has(p)&&X<D)D=X,H=p;if(X<V)V=X,K=p}f.set(Q,[H,K])}if(H!==0)this.context.fillStyle=`oklab(${g[H][0]*100}% ${g[H][1]} ${g[H][2]})`,this.context.fillRect(M,z,1,1);this.pixels[z][M]=H;let Y=this.colors.get(K);if(Y)Y.amount++;else this.colors.set(K,{color:H,amount:1,realColor:K})}}toJSON(){let f=document.createElement("canvas");return f.width=this.image.naturalWidth,f.height=this.image.naturalHeight,f.getContext("2d").drawImage(this.image,0,0),{url:f.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor}}}var $="kglacermacro",Z0=["wbot"],h="kgm";function P0(){let f=[$,...Z0];for(let w=0;w<f.length;w++){let z=f[w],M=localStorage.getItem(z);if(!M)continue;return{json:M,key:z}}return}function D0(){let f=P0();if(!f)return;let w;try{if(w=JSON.parse(f.json),typeof w!=="object")throw new Error("NOT VALID SAVE");if(w.version===1){let z=w;w.images=z.widget.images,w.strategy=z.widget.strategy,delete z.widget}if(f.key!==$)localStorage.setItem($,f.json)}catch{localStorage.removeItem(f.key),w=void 0}return w}var j0;function j(f,w=!1){if(clearTimeout(j0),w)localStorage.setItem($,JSON.stringify(f));else j0=setTimeout(()=>{localStorage.setItem($,JSON.stringify(f))},600)}var q=1000,T0=2048,v=q*T0,L=[],c=[],O0=Date.now();function o(f){L.push(f),c.push({id:O0++,latitude:(2*Math.atan(Math.exp(-(f.y/v*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(f.x/v*(2*Math.PI)-Math.PI)*180/Math.PI,name:"WBOT_FAVORITE"})}o({x:v/3|0,y:v/3|0});o({x:v/3*2|0,y:v/3*2|0});function C(f){let[w,z]=f.style.transform.slice(32,-31).split(", ").map((M)=>Number.parseFloat(M));return{x:w,y:z}}class F{bot;static fromJSON(f,w){return new F(f,...w)}static fromScreenPosition(f,w){let{anchorScreenPosition:z,pixelSize:M,anchorWorldPosition:J}=f.findAnchorsForScreen(w);return new F(f,J.x+(w.x-z.x)/M|0,J.y+(w.y-z.y)/M|0)}globalX=0;globalY=0;get tileX(){return this.globalX/q|0}set tileX(f){this.globalX=f*q+this.x}get tileY(){return this.globalY/q|0}set tileY(f){this.globalY=f*q+this.y}get x(){return this.globalX%q}set x(f){this.globalX=this.tileX*q+f}get y(){return this.globalY%q}set y(f){this.globalY=this.tileY*q+f}anchor1Index;anchor2Index;get pixelSize(){return(C(this.bot.$stars[this.anchor2Index]).x-C(this.bot.$stars[this.anchor1Index]).x)/(L[this.anchor2Index].x-L[this.anchor1Index].x)}constructor(f,w,z,M,J){this.bot=f;if(M===void 0||J===void 0)this.globalX=w,this.globalY=z;else this.globalX=w*q+M,this.globalY=z*q+J;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let f=1/0,w=1/0;for(let z=0;z<L.length;z++){let{x:M,y:J}=L[z];if(M<this.globalX&&J<this.globalY){let A=this.globalX-M+(this.globalY-J);if(A<f)f=A,this.anchor1Index=z}else if(M>this.globalX&&J>this.globalY){let A=M-this.globalX+(J-this.globalY);if(A<w)w=A,this.anchor2Index=z}}}toScreenPosition(){let f=L[this.anchor1Index],w=C(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-f.x)*this.pixelSize+w.x,y:(this.globalY-f.y)*this.pixelSize+w.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:f,y:w}=this.toScreenPosition();this.bot.moveMap({x:f-window.innerWidth/3,y:w-window.innerHeight/3})}clone(){return new F(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class E extends k{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(f,w){return new E(f,F.fromJSON(f,w.position),await b.fromJSON(f,w.pixels),w.strategy,w.opacity,w.drawTransparentPixels,w.drawColorsInOrder,w.colors,w.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colors;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;constructor(f,w,z,M="SPIRAL_FROM_CENTER",J=50,A=!1,G=!1,U=[],B=!1){super();this.bot=f;this.position=w;this.pixels=z;this.strategy=M;this.opacity=J;this.drawTransparentPixels=A;this.drawColorsInOrder=G;this.colors=U;this.lock=B;this.element.innerHTML=p0,this.element.classList.add("wimage"),u(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colors:".colors",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,j(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),j(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let Q;this.registerEvent(this.$brightness,"change",()=>{clearTimeout(Q),Q=setTimeout(()=>{this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),j(this.bot)},1000)}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),j(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,j(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,j(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),j(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let H of this.element.querySelectorAll(".resize"))this.registerEvent(H,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let f=this.position.clone(),w=new Set,z=new Map;for(let M=0;M<this.colors.length;M++){let J=this.colors[M];if(J.disabled)w.add(J.realColor);z.set(J.realColor,M)}for(let{x:M,y:J}of this.strategyPositionIterator()){let A=this.pixels.pixels[J][M];if(w.has(A))continue;f.globalX=this.position.globalX+M,f.globalY=this.position.globalY+J;let G=f.getMapColor();if(A!==G&&(this.drawTransparentPixels||A!==0))this.tasks.push({position:f.clone(),color:A})}if(this.drawColorsInOrder)this.tasks.sort((M,J)=>(z.get(M.color)??0)-(z.get(J.color)??0));this.update(),this.bot.widget.update()}update(){let{x:f,y:w}=this.position.toScreenPosition();this.element.style.transform=`translate(${f}px, ${w}px)`,this.element.style.width=`${this.position.pixelSize*this.pixels.width}px`,this.element.style.height=`${this.position.pixelSize*this.pixels.height}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let z=this.pixels.pixels.length*this.pixels.pixels[0].length,M=z-this.tasks.length,J=M/z*100|0;this.$progressText.textContent=`${M}/${z} ${J}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${J}%)`,this.$wrapper.classList[this.lock?"add":"remove"]("no-pointer-events"),this.$lock.classList[this.lock?"add":"remove"]("locked")}destroy(){super.destroy(),this.element.remove(),i(this.bot.images,this),this.bot.widget.update(),j(this.bot)}updateColors(){this.$colors.innerHTML="";let f=this.pixels.pixels.length*this.pixels.pixels[0].length,w=100/this.pixels.colors.size,z=document.createElement("div");z.className="colors-track",z.setAttribute("aria-label",N("overlayColors"));let M=document.createElement("div");if(M.className="colors-legend",this.colors.length!==this.pixels.colors.size||this.colors.some((A)=>!this.pixels.colors.has(A.realColor)))this.colors=this.pixels.colors.values().toArray().sort((A,G)=>G.amount-A.amount).map((A)=>({realColor:A.realColor,disabled:!1})),j(this.bot);let J=0;for(let A=0;A<this.colors.length;A++){let G=this.colors[A],U=this.pixels.colors.get(G.realColor),B=!1,Q=U.realColor!==U.color,H=U.amount/f*100,K=()=>{if(B)return;G.disabled=G.disabled?void 0:!0,Y.classList.toggle("color-disabled"),D.classList.toggle("disabled",Boolean(G.disabled));let p=D.querySelector(".state");if(p)p.textContent=G.disabled?N("disabled"):N("enabled");j(this.bot)},Y=document.createElement("button");if(Y.title=`${H.toFixed(1)}%`,G.disabled)Y.classList.add("color-disabled");if(!Q)Y.style.background=I(U.realColor);else{Y.classList.add("substitution"),Y.style.setProperty("--wreal-color",I(U.realColor)),Y.style.setProperty("--wsubstitution-color",I(U.color));let p=document.createElement("button"),Z=document.createElement("button");p.textContent=N("buy"),Z.textContent="✓",p.classList.add("buy"),Z.classList.add("disable"),p.addEventListener("click",()=>{document.getElementById("color-"+U.realColor)?.click()}),Z.addEventListener("click",K),Y.append(p),Y.append(Z)}Y.style.left=J+"%",Y.style.width=H+"%",J+=H,Y.style.setProperty("--wleft",w*A+"%"),Y.style.setProperty("--wwidth",w+"%"),z.append(Y);let D=document.createElement("button");if(D.className=`color-chip ${G.disabled?"disabled":""}`,D.innerHTML=`<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${H.toFixed(1)}%</span>
  <span class="state">${G.disabled?N("disabled"):N("enabled")}</span>
</span>
<span class="premium ${Q?"on":""}">${Q?N("premium"):""}</span>`,D.querySelector(".swatch").style.setProperty("--swatch-color",I(U.realColor)),D.addEventListener("click",()=>{K()}),Q){let p=document.createElement("button");p.textContent=N("buy"),p.className="buy-chip",p.addEventListener("click",(Z)=>{Z.stopPropagation(),document.getElementById("color-"+U.realColor)?.click()}),D.append(p)}M.append(D);let V=(p)=>{let Z=A,X=Y.getBoundingClientRect().width,P=(l)=>{if(Z=Math.min(this.colors.length-1,Math.max(0,Math.round(A+(l.clientX-p.clientX)/X))),Z!==A)B=!0;let W=0;for(let _ of z.children){if(_===Y)continue;if(W===Z)W++;_.style.setProperty("--wleft",w*W+"%"),W++}Y.style.setProperty("--wleft",w*Z+"%")};document.addEventListener("mousemove",P),document.addEventListener("mouseup",()=>{if(document.removeEventListener("mousemove",P),Z!==A)this.colors.splice(Z,0,...this.colors.splice(A,1));j(this.bot),Y.removeEventListener("mousedown",V),setTimeout(()=>{this.updateColors()},200)},{once:!0})};if(Y.addEventListener("mousedown",V),!Q)Y.addEventListener("click",K)}this.$colors.append(z,M)}*strategyPositionIterator(){let f=this.pixels.pixels[0].length,w=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let z=0;z<w;z++)for(let M=0;M<f;M++)yield{x:M,y:z};break}case"UP":{for(let z=w-1;z>=0;z--)for(let M=0;M<f;M++)yield{x:M,y:z};break}case"LEFT":{for(let z=0;z<f;z++)for(let M=0;M<w;M++)yield{x:z,y:M};break}case"RIGHT":{for(let z=f-1;z>=0;z--)for(let M=0;M<w;M++)yield{x:z,y:M};break}case"RANDOM":{let z=[];for(let M=0;M<w;M++)for(let J=0;J<f;J++)z.push({x:J,y:M});for(let M=z.length-1;M>=0;M--){let J=Math.floor(Math.random()*(M+1)),A=z[M];z[M]=z[J],z[J]=A}yield*z;break}case"ZIGZAG":{for(let z=0;z<w;z++)if(z%2===0)for(let M=0;M<f;M++)yield{x:M,y:z};else for(let M=f-1;M>=0;M--)yield{x:M,y:z};break}case"HUMANIZED":{let z=Math.max(4,Math.floor(Math.min(f,w)/10)),M=[];for(let J=0;J<w;J+=z)for(let A=0;A<f;A+=z)M.push({x:A,y:J});for(let J=M.length-1;J>=0;J--){let A=Math.floor(Math.random()*(J+1)),G=M[J];M[J]=M[A],M[A]=G}for(let J=0;J<M.length;J++){let A=M[J],G=Math.min(w,A.y+z),U=Math.min(f,A.x+z);for(let B=A.y;B<G;B++)if(Math.random()>0.35)for(let H=A.x;H<U;H++)yield{x:H,y:B};else for(let H=U-1;H>=A.x;H--)yield{x:H,y:B}}break}case"DIAGONAL_BRUSH":{for(let z=0;z<f+w-1;z++){let M=z%2===0,J=[],A=Math.max(0,z-f+1),G=Math.min(w-1,z);for(let U=A;U<=G;U++){let B=z-U;if(B>=0&&B<f)J.push({x:B,y:U})}if(Math.random()>0.55)J.reverse();if(M)for(let U=J.length-1;U>=0;U--)yield J[U];else yield*J}break}case"BRUSH_STROKES":{let z=Array.from({length:w},()=>Array(f).fill(!1)),M=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],J=(U,B)=>U>=0&&U<f&&B>=0&&B<w,A=0,G=f*w;for(let U=0;U<G*6&&A<G;U++){let B=Math.floor(Math.random()*f),Q=Math.floor(Math.random()*w),H=M[Math.floor(Math.random()*M.length)],K=3+Math.floor(Math.random()*16);for(let Y=0;Y<K;Y++){if(!J(B,Q))break;if(!z[Q][B])z[Q][B]=!0,A++,yield{x:B,y:Q};if(Math.random()>0.72)H=M[Math.floor(Math.random()*M.length)];B+=H.x,Q+=H.y}}for(let U=0;U<w;U++)for(let B=0;B<f;B++)if(!z[U][B])yield{x:B,y:U};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let z=new Set,M=f*w,J=Math.floor(f/2),A=Math.floor(w/2),G=[[1,0],[0,1],[-1,0],[0,-1]],U=0,B=1,Q=(K,Y)=>K>=0&&K<f&&Y>=0&&Y<w,H=function*(){let K=0;while(K<M){for(let Y=0;Y<2;Y++){for(let D=0;D<B;D++){if(Q(J,A)){let V=`${J},${A}`;if(!z.has(V)){if(z.add(V),yield{x:J,y:A},K++,K>=M)return}}J+=G[U][0],A+=G[U][1]}U=(U+1)%4}B++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*H();else{let K=[...H()];for(let Y=K.length-1;Y>=0;Y--)yield K[Y]}break}case"SCRIBBLE":{let z=new Set,M=f*w,J=Math.floor(f/2),A=Math.floor(w/2);while(z.size<M){let G=`${J},${A}`;if(!z.has(G))z.add(G),yield{x:J,y:A};if(J+=Math.floor(Math.random()*3)-1,A+=Math.floor(Math.random()*3)-1,J<0||J>=f||A<0||A>=w)J=Math.floor(Math.random()*f),A=Math.floor(Math.random()*w)}break}case"CROSSHATCH":{let z=[];for(let A=0;A<f+w-1;A++)for(let G=Math.max(0,A-f+1);G<=Math.min(w-1,A);G++){let U=A-G;z.push({x:U,y:G})}let M=[];for(let A=-w+1;A<f;A++)for(let G=0;G<w;G++){let U=G+A;if(U>=0&&U<f)M.push({x:U,y:G})}let J=new Set;for(let A of[...z,...M]){let G=`${A.x},${A.y}`;if(J.has(G))continue;J.add(G),yield A}break}case"WAVE_SWEEP":{let z=new Set;for(let M=0;M<f;M++){let A=(Math.sin(M/Math.max(1,f-1)*Math.PI*4)+1)*0.5*(w-1)|0;for(let G=0;G<w;G++){let U=A+G,B=A-G;for(let Q of[U,B]){if(Q<0||Q>=w)continue;let H=`${M},${Q}`;if(z.has(H))continue;z.add(H),yield{x:M,y:Q}}}}break}case"SCATTERED_LINES":{let z=new Set,M=f*w;while(z.size<M){let J=Math.floor(Math.random()*f),A=Math.floor(Math.random()*w),G=Math.random()*Math.PI*2,U=Math.round(Math.cos(G)),B=Math.round(Math.sin(G)),Q=6+Math.floor(Math.random()*28);for(let H=0;H<Q;H++){if(J<0||J>=f||A<0||A>=w)break;let K=`${J},${A}`;if(!z.has(K))z.add(K),yield{x:J,y:A};J+=U,A+=B}}break}case"CONTOUR_JITTER":{let z=new Set;for(let M=0;M<Math.ceil(Math.min(f,w)/2);M++){let J=[],A=M,G=M,U=f-M-1,B=w-M-1;for(let Q=A;Q<=U;Q++)J.push({x:Q,y:G});for(let Q=G+1;Q<=B;Q++)J.push({x:U,y:Q});for(let Q=U-1;Q>=A;Q--)J.push({x:Q,y:B});for(let Q=B-1;Q>G;Q--)J.push({x:A,y:Q});for(let Q=J.length-1;Q>0;Q--){let H=Math.floor(Math.random()*(Q+1)),K=J[Q];J[Q]=J[H],J[H]=K}for(let Q of J){let H=`${Q.x},${Q.y}`;if(z.has(H))continue;z.add(H),yield Q}}break}case"SPIRAL_WOBBLE":{let z=new Set,M=f/2,J=w/2,A=Math.hypot(M,J);for(let G=0;z.size<f*w&&G<f*w*9;G++){let U=G/(f*w*9)*A,B=G*0.31+Math.sin(G*0.07)*0.7,Q=Math.round(M+Math.cos(B)*U),H=Math.round(J+Math.sin(B)*U);if(Q<0||Q>=f||H<0||H>=w)continue;let K=`${Q},${H}`;if(z.has(K))continue;z.add(K),yield{x:Q,y:H}}for(let G=0;G<w;G++)for(let U=0;U<f;U++){let B=`${U},${G}`;if(z.has(B))continue;yield{x:U,y:G}}break}case"CLUSTER_BURSTS":{let z=new Set,M=f*w;while(z.size<M){let J=Math.floor(Math.random()*f),A=Math.floor(Math.random()*w),G=2+Math.floor(Math.random()*10);for(let U=A-G;U<=A+G;U++)for(let B=J-G;B<=J+G;B++){if(B<0||B>=f||U<0||U>=w)continue;if(Math.hypot(B-J,U-A)>G)continue;let Q=`${B},${U}`;if(z.has(Q))continue;z.add(Q),yield{x:B,y:U}}}break}case"ORBITAL":{let z=new Set,M=(f-1)/2,J=(w-1)/2,A=Math.ceil(Math.max(M,J));for(let G=0;G<=A;G++){let U=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,G)*2));for(let B=0;B<U;B++){let Q=B/U*Math.PI*2+(G%2?0.3:-0.3),H=Math.round(M+Math.cos(Q)*G),K=Math.round(J+Math.sin(Q)*G);if(H<0||H>=f||K<0||K>=w)continue;let Y=`${H},${K}`;if(z.has(Y))continue;z.add(Y),yield{x:H,y:K}}}for(let G=0;G<w;G++)for(let U=0;U<f;U++){let B=`${U},${G}`;if(z.has(B))continue;yield{x:U,y:G}}break}case"FLOW_FIELD":{let z=new Set,M=f*w;while(z.size<M){let J=Math.floor(Math.random()*f),A=Math.floor(Math.random()*w);for(let G=0;G<120;G++){if(J<0||J>=f||A<0||A>=w)break;let U=`${J},${A}`;if(!z.has(U))z.add(U),yield{x:J,y:A};let B=Math.sin(J*0.09)*1.8+Math.cos(A*0.08)*1.6+Math.sin((J+A)*0.05);J+=Math.round(Math.cos(B)),A+=Math.round(Math.sin(B))}}break}case"EDGE_IN":{let z=new Set,M=Math.ceil(Math.min(f,w)/2);for(let J=0;J<M;J++){let A=J,G=f-1-J,U=J,B=w-1-J;for(let Q=A;Q<=G;Q++)for(let H of[U,B]){let K=`${Q},${H}`;if(z.has(K))continue;z.add(K),yield{x:Q,y:H}}for(let Q=U+1;Q<=B-1;Q++)for(let H of[A,G]){let K=`${H},${Q}`;if(z.has(K))continue;z.add(K),yield{x:H,y:Q}}}break}}}moveStart(f){if(!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:f.clientX,clientY:f.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors()}move(f){if(!this.moveInfo)return;let w=Math.round((f.clientX-this.moveInfo.clientX)/this.position.pixelSize),z=Math.round((f.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=w+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-w)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,w+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=z+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-z)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,z+this.moveInfo.height);this.update(),j(this.bot)}resizeStart(f){this.moveInfo={clientX:f.clientX,clientY:f.clientY};let w=f.target;if(w.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(w.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(w.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(w.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let f=document.createElement("a");document.body.append(f),f.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),f.download=`${this.pixels.width}x${this.pixels.height}.${h}`,f.click(),URL.revokeObjectURL(f.href),f.href=this.pixels.canvas.toDataURL("image/webp",1),f.download=`${this.pixels.width}x${this.pixels.height}.webp`,f.click(),URL.revokeObjectURL(f.href),f.remove()}}var q0=`/* stylelint-disable declaration-no-important */
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
  display: none;
  width: 100%;
  min-width: 240px;
  border: var(--border) 1px solid;
  border-radius: 10px;
  background-color: #151c2d;
  color: var(--text);
  box-shadow: 0 18px 36px rgb(2 6 23 / 45%);
}

.wimage:hover .wrapper .wform {
  display: block;
}

.wtopbar button svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentcolor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.2s ease;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-bottom: 4px;
}

.wtopbar button {
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
}
`;class s extends Error{name="KGlacerMacroError";constructor(f,w){super(f);w.widget.status=f}}class w0 extends s{name="NoImageError";constructor(f){super("❌ No image is selected",f)}}var x={toggleWidget:{key:"b",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0}};function d(f,w){return f.key.toLowerCase()===w.key&&f.shiftKey===Boolean(w.shift)&&f.ctrlKey===Boolean(w.ctrl)&&f.altKey===Boolean(w.alt)}function F0(f){if(typeof HTMLElement==="undefined")return!1;if(!(f instanceof HTMLElement))return!1;let w=f.tagName.toLowerCase();return w==="input"||w==="textarea"||f.isContentEditable||f.closest('[contenteditable="true"]')!==null}var V0=`<button class="wopen-button" aria-label="Toggle widget">
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
      >Shift+B toggle · Shift+Enter draw · Shift+I add image</span
    >
  </div>
  <div class="images"></div>
  <button class="add-image" disabled data-i18n="addImage">Add image</button>
  <div class="minimized-help hidden" data-i18n="reopenHelp">
    Use Shift+B or floating button to reopen
  </div>
</div>
<dialog class="shortcuts-dialog">
  <strong data-i18n="keyboardShortcuts">Shortcuts</strong>
  <p data-i18n="shortcutsHelp">Shift+B toggle · Shift+Enter draw · Shift+I add image</p>
  <button class="close-shortcuts" data-i18n="close">Close</button>
</dialog>
`;class z0 extends k{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(f){this.$status.innerHTML=f}get open(){return this.element.classList.contains("wopen")}set open(f){if(f)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$minimize;$showShortcuts;$closeShortcuts;$shortcutsDialog;$locale;$minimizedHelp;$topbar;$draw;$addImage;$strategy;$progressLine;$progressText;$images;$wopenButton;constructor(f){super();this.bot=f;this.element.classList.add("wwidget"),this.element.innerHTML=V0,u(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$settings:".wform",$status:".wstatus",$minimize:".minimize",$showShortcuts:".show-shortcuts",$closeShortcuts:".close-shortcuts",$shortcutsDialog:".shortcuts-dialog",$locale:".locale",$minimizedHelp:".minimized-help",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$minimize.addEventListener("click",()=>{this.minimize()}),this.$showShortcuts.addEventListener("click",()=>{this.$shortcutsDialog.showModal()}),this.$closeShortcuts.addEventListener("click",()=>{this.$shortcutsDialog.close()}),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=f0(),this.$locale.addEventListener("change",()=>{Y0(this.$locale.value),u(this.element);for(let w=0;w<this.bot.images.length;w++)this.bot.images[w].updateColors()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run("Adding image",async()=>{await this.bot.updateColors();let f=document.createElement("input");f.type="file",f.accept=`image/*,.${h}`,f.click(),await S(f,["change"],["cancel","error"]);let w=f.files?.[0];if(!w)throw new w0(this.bot);console.log("[KGM][Widget] File selected",{name:w.name,size:w.size,type:w.type});let z;if(w.name.endsWith(`.${h}`))z=await E.fromJSON(this.bot,JSON.parse(await w.text()));else{let M=new FileReader;M.readAsDataURL(w),await S(M,["load"],["error"]);let J=new Image;J.src=M.result,await S(J,["load"],["error"]),z=new E(this.bot,F.fromScreenPosition(this.bot,{x:256,y:32}),new b(this.bot,J))}this.bot.images.push(z),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),z.updateTasks(),j(this.bot,!0),console.log("[KGM][Widget] Image persisted, reloading page"),document.location.reload()},()=>{this.setDisabled("add-image",!1)})}update(){this.$strategy.value=this.bot.strategy;let f=0,w=0;for(let A=0;A<this.bot.images.length;A++){let G=this.bot.images[A];f+=G.pixels.pixels.length*G.pixels.pixels[0].length,w+=G.tasks.length}let z=f-w,M=z/f*100|0;this.$progressText.textContent=`${z}/${f} ${M}% ETA: ${w/120|0}h`,this.$progressLine.style.transform=`scaleX(${M}%)`,this.$images.innerHTML="";let J=document.createDocumentFragment();for(let A=0;A<this.bot.images.length;A++){let G=this.bot.images[A],U=document.createElement("div");J.append(U),U.className="image",U.innerHTML=`<img src="${G.pixels.image.src}">
  <button class="up" title="Move up" ${A===0?"disabled":""}>▴</button>
  <button class="down" title="Move down" ${A===this.bot.images.length-1?"disabled":""}>▾</button>`,U.querySelector("img").addEventListener("click",()=>{G.position.scrollScreenTo()}),U.querySelector(".up").addEventListener("click",()=>{n(this.bot.images,A,A-1),this.update(),j(this.bot)}),U.querySelector(".down").addEventListener("click",()=>{n(this.bot.images,A,A+1),this.update(),j(this.bot)})}this.$images.append(J)}setDisabled(f,w){this.element.querySelector("."+f).disabled=w}async run(f,w,z,M="..."){console.log("[KGM][Widget] Task started",{status:f});let J=this.status;this.status=`${M} ${f}`;try{let A=await w();return this.status=J,console.log("[KGM][Widget] Task completed",{status:f}),A}catch(A){if(!(A instanceof s))console.error(A),this.status=`Error: ${f}`;throw console.error("[KGM][Widget] Task failed",{status:f,error:A}),A}finally{await z?.()}}minimize(){let f=this.$settings.classList.toggle("hidden");this.$minimizedHelp.classList[f?"remove":"add"]("hidden")}handleKeyboard(f){if(F0(f.target))return;if(d(f,x.toggleWidget)){f.preventDefault(),this.open=!this.open;return}if(d(f,x.addImage)&&!this.$addImage.disabled){f.preventDefault(),this.addImage();return}if(d(f,x.draw)&&!this.$draw.disabled)f.preventDefault(),this.bot.draw()}}var v0=2,N0="[KGM]";class X0{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];widget=new z0(this);markerPixelPositionResolvers=[];lastColor;log(f,w){if(w===void 0)console.log(`${N0} ${f}`);else console.log(`${N0} ${f}`,w)}constructor(){this.log("Boot sequence started");let f=D0();if(this.log("Save loaded",{hasSave:Boolean(f),imageCount:f?.images.length??0,strategy:f?.strategy}),f){for(let z=0;z<f.images.length;z++){let M=f.images[z];o({x:M.position[0]-1000,y:M.position[1]-1000}),o({x:M.position[0]+1000,y:M.position[1]+1000})}this.strategy=f.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let w=document.createElement("style");w.textContent=q0.replace("FAKE_FAVORITE_LOCATIONS",c.length.toString()),document.head.append(w),this.log("Styles injected",{fakeFavoriteLocations:c.length}),this.widget.run("Initializing",async()=>{this.log("Widget initialization flow started"),await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let z=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((M)=>{for(let J=0;J<M.length;J++)if(M[J].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(z,{attributes:!0,childList:!0,subtree:!0}),globalThis.addEventListener("resize",()=>{this.updateImages()},{passive:!0}),document.addEventListener("visibilitychange",()=>{this.updateImages()},{passive:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await R(500),await this.updateColors(),f)for(let M=0;M<f.images.length;M++){let J=await E.fromJSON(this,f.images[M]);this.images.push(J),J.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.log("Initialization completed; controls enabled")})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let f=document.querySelector(".maplibregl-canvas"),w=(z)=>{if(!z.shiftKey)z.stopPropagation()};return this.widget.run("Drawing",async()=>{await this.widget.run("Initializing draw",()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",w,!0),f.addEventListener("wheel",w,!0),this.updateTasks();let z=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((A)=>A.json()),M=Math.floor(z.charges.count);this.log("Charges fetched",{charges:M});let J=0;for(let A=0;A<this.images.length;A++)J+=this.images[A].tasks.length;switch(this.log("Tasks prepared",{tasks:J}),this.strategy){case"ALL":{while(M>0){let A=!0;for(let G=0;G<this.images.length;G++){let U=this.images[G].tasks.shift();if(!U)continue;this.drawTask(U),M--,await R(1),A=!1}if(A)break}break}case"PERCENTAGE":{for(let A=0;A<J&&M>0;A++){let G=1,U;for(let B=0;B<this.images.length;B++){let Q=this.images[B],H=1-Q.tasks.length/(Q.pixels.pixels.length*Q.pixels.pixels[0].length);if(H<G)G=H,U=Q}this.drawTask(U.tasks.shift()),M--,await R(1)}break}case"SEQUENTIAL":for(let A=0;A<this.images.length;A++){let G=this.images[A];for(let U=G.tasks.shift();U&&M>0;U=G.tasks.shift())this.drawTask(U),M--,await R(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:M})},()=>{globalThis.removeEventListener("mousemove",w,!0),f.removeEventListener("wheel",w,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:v0,images:this.images.map((f)=>f.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let f of document.querySelectorAll("button.btn.relative.w-full"))if(f.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(f.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(f){let w=document.querySelector(".maplibregl-canvas"),z=window.innerWidth/2,M=window.innerHeight/2,J=z-f.x,A=M-f.y;function G(U,B,Q){w.dispatchEvent(new MouseEvent(U,{bubbles:!0,cancelable:!0,clientX:B,clientY:Q,buttons:1}))}G("mousedown",z,M),G("mousemove",J,A),G("mouseup",J,A)}readMap(){this.mapsCache.clear();let f=new Set;for(let z=0;z<this.images.length;z++){let M=this.images[z],{tileX:J,tileY:A}=new F(this,M.position.globalX+M.pixels.pixels[0].length,M.position.globalY+M.pixels.pixels.length);for(let G=M.position.tileX;G<=J;G++)for(let U=M.position.tileY;U<=A;U++)f.add(`${G}/${U}`)}let w=0;return this.log("Reading map tiles",{tileCount:f.size}),this.widget.run(`Reading map [0/${f.size}]`,()=>Promise.all([...f].map(async(z)=>{this.mapsCache.set(z,await b.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${z}.png`,exactColor:!0})),this.widget.status=`⌛ Reading map [${++w}/${f.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((f)=>{if(!document.hasFocus())f();window.addEventListener("blur",()=>{setTimeout(f,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(f){let w=0,z=1,M=1/0,J=1/0;for(let U=0;U<this.$stars.length;U++){let{x:B,y:Q}=C(this.$stars[U]);if(B<f.x&&Q<f.y){let H=f.x-B+(f.y-Q);if(H<M)M=H,w=U}else if(B>f.x&&Q>f.y){let H=B-f.x+(Q-f.y);if(H<J)J=H,z=U}}let A=C(this.$stars[w]),G=L[w];return{anchorScreenPosition:A,anchorWorldPosition:G,pixelSize:(C(this.$stars[z]).x-A.x)/(L[z].x-G.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await R(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await R(1);let f=document.querySelector("button.bottom-0");if(f?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')f.click(),await R(1)}drawTask(f){if(this.lastColor!==f.color)document.getElementById("color-"+f.color).click(),this.lastColor=f.color,this.log("Color switched for draw task",{color:f.color});let w=f.position.pixelSize/2,z=f.position.toScreenPosition();document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:z.x+w,clientY:z.y+w,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let f=globalThis.fetch,w=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(z,M)=>{let J=await f(z,M),A=J.clone(),G="";if(typeof z=="string")G=z;else if(z instanceof Request)G=z.url;else if(z instanceof URL)G=z.href;if(J.url==="https://backend.wplace.live/me")this.me=await A.json(),this.me.favoriteLocations.unshift(...c),this.me.maxFavoriteLocations=1/0,J.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let U=w.exec(G);if(U){for(let B=0;B<this.markerPixelPositionResolvers.length;B++)this.markerPixelPositionResolvers[B](new F(this,+U[1],+U[2],+U[3],+U[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return J}}async closeAll(){for(let f of document.querySelectorAll("button"))if(f.innerHTML==="✕"||f.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')f.click(),await R(1)}waitForElement(f,w){return this.log("Waiting for element",{name:f,selector:w}),this.widget.run(`Waiting for ${f}`,()=>{return new Promise((z)=>{let M=document.querySelector(w);if(M){z(M);return}let J=new MutationObserver(()=>{let A=document.querySelector(w);if(A)J.disconnect(),z(A)});J.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,c.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let f=0;f<this.images.length;f++)this.images[f].position.updateAnchor(),this.images[f].update()}updateTasks(){for(let f=0;f<this.images.length;f++)this.images[f].updateTasks()}updateImageColors(){for(let f=0;f<this.images.length;f++)this.images[f].updateColors()}}globalThis.kgm=new X0;globalThis.wbot=globalThis.kgm;
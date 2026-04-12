// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      1.0.2
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
function a(w,f,z){let M=w[z];return w[z]=w[f],w[f]=M,w}function n(w,f){let z=w.indexOf(f);if(z!==-1)w.splice(z,1);return z}var d0=Math.floor(Math.random()*65536),s0=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function N(w){return new Promise((f)=>setTimeout(f,w))}function C(w,f,z=["error"],M="addEventListener"){return new Promise((J,Q)=>{for(let U=0;U<f.length;U++)w[M]?.(f[U],J);for(let U=0;U<z.length;U++)w[M]?.(z[U],Q)})}class P0{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(w,f=15000){this.size=w,this.historyTime=f}push(w){if(w<0)throw new Error("Negative chunk size");let{time:f,historyTime:z}=this.getTime();if(this.history.push({time:f,chunk:w}),this.history[0]&&this.history[0].time+z<f)this.history.shift();this.sum+=w,delete this.statsCached}get stats(){if(!this.statsCached){let w=this.history.reduce((f,z)=>f+z.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:w}:{speed:w,percent:this.sum/this.size,eta:~~((this.size-this.sum)/w)*1000}}return this.statsCached}getTime(){let w=Date.now(),f=w-this.startTime,z=Math.min(f,this.historyTime);return{time:w,historyTime:z}}}class S{runOnDestroy=[];destroy(){for(let w=0;w<this.runOnDestroy.length;w++)this.runOnDestroy[w]()}populateElementsWithSelector(w,f){for(let z in f)this[z]=w.querySelector(f[z])}registerEvent(w,f,z,M={}){M.passive??=!0,w.addEventListener(f,z,M),this.runOnDestroy.push(()=>{w.removeEventListener(f,z)})}}function r(w){return w>0.04045?((w+0.055)/1.055)**2.4:w/12.92}function G0(w,f,z){let M=r(w/255),J=r(f/255),Q=r(z/255),U=Math.cbrt(0.4122214708*M+0.5363325363*J+0.0514459929*Q),A=Math.cbrt(0.2119034982*M+0.6806995451*J+0.1073969566*Q),G=Math.cbrt(0.0883024619*M+0.2817188376*J+0.6299787005*Q),K=0.2104542553*U+0.793617785*A-0.0040720468*G,H=1.9779984951*U-2.428592205*A+0.4505937099*G,Y=0.0259040371*U+0.7827717662*A-0.808675766*G;return[K,H,Y]}function U0(w,f,z){let[M,J,Q]=w,[U,A,G]=f,K=(i)=>i*180/Math.PI,H=(i)=>i*Math.PI/180,Y=1,Z=1,R=1,q=Math.sqrt(J**2+Q**2),V=Math.sqrt(A**2+G**2),F=(q+V)/2,X=0.5*(1-Math.sqrt(F**7/(F**7+6103515625))),x=J*(1+X),d=A*(1+X),h=Math.sqrt(x**2+Q**2),I=Math.sqrt(d**2+G**2),s=Q===0&&x===0?0:K(Math.atan2(Q,x))%360,o=G===0&&d===0?0:K(Math.atan2(G,d))%360,f0=U-M,z0=I-h,g=0;if(h*I!==0){if(g=o-s,g>180)g-=360;else if(g<-180)g+=360}let M0=2*Math.sqrt(h*I)*Math.sin(H(g)/2),J0=(M+U)/2,b=(h+I)/2,T=(s+o)/2;if(Math.abs(s-o)>180)T+=180;let X0=1-0.17*Math.cos(H(T-30))+0.24*Math.cos(H(2*T))+0.32*Math.cos(H(3*T+6))-0.2*Math.cos(H(4*T-63)),F0=1+0.015*(J0-50)**2/Math.sqrt(20+(J0-50)**2),Q0=1+0.045*b,A0=1+0.015*b*X0,N0=30*Math.exp((-((T-275)/25))**2),W0=-(2*Math.sqrt(b**7/(b**7+6103515625)))*Math.sin(H(2*N0));return Math.sqrt((f0/(1*F0))**2+(z0/(1*Q0))**2+(M0/(1*A0))**2+W0*(z0/(1*Q0))*(M0/(1*A0)))-f0*z}var $=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],t=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function c(w){if(w===0)return"transparent";let f=$[w];return`oklab(${f[0]*100}% ${f[1]} ${f[2]})`}var $0={en:{widgetTitle:"KG Lacer Macro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",random:"Random",humanized:"Humanized",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutsHelp:"Shift+B toggle · Shift+Enter draw · Shift+I add image"},es:{widgetTitle:"KG Lacer Macro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",random:"Aleatorio",humanized:"Humanizado",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutsHelp:"Shift+B mostrar/ocultar · Shift+Enter dibujar · Shift+I agregar imagen"}};function L0(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function _0(w){let f=L0();return $0[f][w]}function u(w){for(let f of w.querySelectorAll("[data-i18n]"))f.textContent=_0(f.dataset.i18n)}var H0=`<div class="wtopbar">
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
`;class P{bot;image;width;brightness;exactColor;static async fromJSON(w,f){let z=new Image;return z.src=f.url.startsWith("http")?await fetch(f.url,{cache:"no-store"}).then((M)=>M.blob()).then((M)=>URL.createObjectURL(M)):f.url,await C(z,["load"],["error"]),new P(w,z,f.width,f.brightness,f.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(w){this.width=w*this.resolution|0}constructor(w,f,z=f.naturalWidth,M=0,J=!1){this.bot=w;this.image=f;this.width=z;this.brightness=M;this.exactColor=J;if(J)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let w=new Map;for(let z=1;z<64;z++)if(this.exactColor||!this.bot.unavailableColors.has(z))w.set(t[z],[z,z]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let f=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let z=0;z<this.canvas.height;z++)for(let M=0;M<this.canvas.width;M++){let J=(z*this.canvas.width+M)*4,Q=f[J],U=f[J+1],A=f[J+2],G=f[J+3],K=`${Q},${U},${A}`;if(this.exactColor){this.pixels[z][M]=G<100?0:t.indexOf(K);continue}let H,Y;if(G<100)H=Y=0;else if(w.has(K))[H,Y]=w.get(K);else{let R=1/0,q=1/0;for(let V=0;V<$.length;V++){let F=$[V],X=U0(G0(Q,U,A),F,this.brightness);if(!this.bot.unavailableColors.has(V)&&X<R)R=X,H=V;if(X<q)q=X,Y=V}w.set(K,[H,Y])}if(H!==0)this.context.fillStyle=`oklab(${$[H][0]*100}% ${$[H][1]} ${$[H][2]})`,this.context.fillRect(M,z,1,1);this.pixels[z][M]=H;let Z=this.colors.get(Y);if(Z)Z.amount++;else this.colors.set(Y,{color:H,amount:1,realColor:Y})}}toJSON(){let w=document.createElement("canvas");return w.width=this.image.naturalWidth,w.height=this.image.naturalHeight,w.getContext("2d").drawImage(this.image,0,0),{url:w.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor}}}var O="kglacermacro",K0=["wbot"],v="kgm";function T0(){let w=[O,...K0];for(let f=0;f<w.length;f++){let z=w[f],M=localStorage.getItem(z);if(!M)continue;return{json:M,key:z}}return}function Z0(){let w=T0();if(!w)return;let f;try{if(f=JSON.parse(w.json),typeof f!=="object")throw new Error("NOT VALID SAVE");if(f.version===1){let z=f;f.images=z.widget.images,f.strategy=z.widget.strategy,delete z.widget}if(w.key!==O)localStorage.setItem(O,w.json)}catch{localStorage.removeItem(w.key),f=void 0}return f}var Y0;function B(w,f=!1){if(clearTimeout(Y0),f)localStorage.setItem(O,JSON.stringify(w));else Y0=setTimeout(()=>{localStorage.setItem(O,JSON.stringify(w))},600)}var j=1000,C0=2048,E=j*C0,W=[],k=[],O0=Date.now();function p(w){W.push(w),k.push({id:O0++,latitude:(2*Math.atan(Math.exp(-(w.y/E*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(w.x/E*(2*Math.PI)-Math.PI)*180/Math.PI,name:"WBOT_FAVORITE"})}p({x:E/3|0,y:E/3|0});p({x:E/3*2|0,y:E/3*2|0});function L(w){let[f,z]=w.style.transform.slice(32,-31).split(", ").map((M)=>Number.parseFloat(M));return{x:f,y:z}}class D{bot;static fromJSON(w,f){return new D(w,...f)}static fromScreenPosition(w,f){let{anchorScreenPosition:z,pixelSize:M,anchorWorldPosition:J}=w.findAnchorsForScreen(f);return new D(w,J.x+(f.x-z.x)/M|0,J.y+(f.y-z.y)/M|0)}globalX=0;globalY=0;get tileX(){return this.globalX/j|0}set tileX(w){this.globalX=w*j+this.x}get tileY(){return this.globalY/j|0}set tileY(w){this.globalY=w*j+this.y}get x(){return this.globalX%j}set x(w){this.globalX=this.tileX*j+w}get y(){return this.globalY%j}set y(w){this.globalY=this.tileY*j+w}anchor1Index;anchor2Index;get pixelSize(){return(L(this.bot.$stars[this.anchor2Index]).x-L(this.bot.$stars[this.anchor1Index]).x)/(W[this.anchor2Index].x-W[this.anchor1Index].x)}constructor(w,f,z,M,J){this.bot=w;if(M===void 0||J===void 0)this.globalX=f,this.globalY=z;else this.globalX=f*j+M,this.globalY=z*j+J;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let w=1/0,f=1/0;for(let z=0;z<W.length;z++){let{x:M,y:J}=W[z];if(M<this.globalX&&J<this.globalY){let Q=this.globalX-M+(this.globalY-J);if(Q<w)w=Q,this.anchor1Index=z}else if(M>this.globalX&&J>this.globalY){let Q=M-this.globalX+(J-this.globalY);if(Q<f)f=Q,this.anchor2Index=z}}}toScreenPosition(){let w=W[this.anchor1Index],f=L(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-w.x)*this.pixelSize+f.x,y:(this.globalY-w.y)*this.pixelSize+f.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:w,y:f}=this.toScreenPosition();this.bot.moveMap({x:w-window.innerWidth/3,y:f-window.innerHeight/3})}clone(){return new D(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class _ extends S{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(w,f){return new _(w,D.fromJSON(w,f.position),await P.fromJSON(w,f.pixels),f.strategy,f.opacity,f.drawTransparentPixels,f.drawColorsInOrder,f.colors,f.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colors;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;constructor(w,f,z,M="SPIRAL_FROM_CENTER",J=50,Q=!1,U=!1,A=[],G=!1){super();this.bot=w;this.position=f;this.pixels=z;this.strategy=M;this.opacity=J;this.drawTransparentPixels=Q;this.drawColorsInOrder=U;this.colors=A;this.lock=G;this.element.innerHTML=H0,this.element.classList.add("wimage"),u(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colors:".colors",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,B(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),B(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let K;this.registerEvent(this.$brightness,"change",()=>{clearTimeout(K),K=setTimeout(()=>{this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),B(this.bot)},1000)}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),B(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,B(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,B(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),B(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let H of this.element.querySelectorAll(".resize"))this.registerEvent(H,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let w=this.position.clone(),f=new Set,z=new Map;for(let M=0;M<this.colors.length;M++){let J=this.colors[M];if(J.disabled)f.add(J.realColor);z.set(J.realColor,M)}for(let{x:M,y:J}of this.strategyPositionIterator()){let Q=this.pixels.pixels[J][M];if(f.has(Q))continue;w.globalX=this.position.globalX+M,w.globalY=this.position.globalY+J;let U=w.getMapColor();if(Q!==U&&(this.drawTransparentPixels||Q!==0))this.tasks.push({position:w.clone(),color:Q})}if(this.drawColorsInOrder)this.tasks.sort((M,J)=>(z.get(M.color)??0)-(z.get(J.color)??0));this.update(),this.bot.widget.update()}update(){let{x:w,y:f}=this.position.toScreenPosition();this.element.style.transform=`translate(${w}px, ${f}px)`,this.element.style.width=`${this.position.pixelSize*this.pixels.width}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let z=this.pixels.pixels.length*this.pixels.pixels[0].length,M=z-this.tasks.length,J=M/z*100|0;this.$progressText.textContent=`${M}/${z} ${J}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${J}%)`,this.$wrapper.classList[this.lock?"add":"remove"]("no-pointer-events"),this.$lock.classList[this.lock?"add":"remove"]("locked")}destroy(){super.destroy(),this.element.remove(),n(this.bot.images,this),this.bot.widget.update(),B(this.bot)}updateColors(){this.$colors.innerHTML="";let w=this.pixels.pixels.length*this.pixels.pixels[0].length,f=100/this.pixels.colors.size;if(this.colors.length!==this.pixels.colors.size||this.colors.some((M)=>!this.pixels.colors.has(M.realColor)))this.colors=this.pixels.colors.values().toArray().sort((M,J)=>J.amount-M.amount).map((M)=>({realColor:M.realColor,disabled:!1})),B(this.bot);let z=0;for(let M=0;M<this.colors.length;M++){let J=this.colors[M],Q=this.pixels.colors.get(J.realColor),U=!1,A=()=>{if(U)return;J.disabled=J.disabled?void 0:!0,G.classList.toggle("color-disabled"),B(this.bot)},G=document.createElement("button");if(J.disabled)G.classList.add("color-disabled");if(Q.realColor===Q.color)G.style.background=c(Q.realColor);else{G.classList.add("substitution"),G.style.setProperty("--wreal-color",c(Q.realColor)),G.style.setProperty("--wsubstitution-color",c(Q.color));let Y=document.createElement("button"),Z=document.createElement("button");Y.textContent="$",Z.textContent="✓",Y.addEventListener("click",()=>{document.getElementById("color-"+Q.realColor)?.click()}),Z.addEventListener("click",A),G.append(Y),G.append(Z)}G.style.left=z+"%";let K=Q.amount/w*100;G.style.width=K+"%",z+=K,G.style.setProperty("--wleft",f*M+"%"),G.style.setProperty("--wwidth",f+"%"),this.$colors.append(G);let H=(Y)=>{let Z=M,R=G.getBoundingClientRect().width,q=(V)=>{if(Z=Math.min(this.colors.length-1,Math.max(0,Math.round(M+(V.clientX-Y.clientX)/R))),Z!==M)U=!0;let F=0;for(let X of this.$colors.children){if(X===G)continue;if(F===Z)F++;X.style.setProperty("--wleft",f*F+"%"),F++}G.style.setProperty("--wleft",f*Z+"%")};document.addEventListener("mousemove",q),document.addEventListener("mouseup",()=>{if(document.removeEventListener("mousemove",q),Z!==M)this.colors.splice(Z,0,...this.colors.splice(M,1));B(this.bot),G.removeEventListener("mousedown",H),setTimeout(()=>{this.updateColors()},200)},{once:!0})};if(G.addEventListener("mousedown",H),Q.realColor===Q.color)G.addEventListener("click",A)}}*strategyPositionIterator(){let w=this.pixels.pixels[0].length,f=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let z=0;z<f;z++)for(let M=0;M<w;M++)yield{x:M,y:z};break}case"UP":{for(let z=f-1;z>=0;z--)for(let M=0;M<w;M++)yield{x:M,y:z};break}case"LEFT":{for(let z=0;z<w;z++)for(let M=0;M<f;M++)yield{x:z,y:M};break}case"RIGHT":{for(let z=w-1;z>=0;z--)for(let M=0;M<f;M++)yield{x:z,y:M};break}case"RANDOM":{let z=[];for(let M=0;M<f;M++)for(let J=0;J<w;J++)z.push({x:J,y:M});for(let M=z.length-1;M>=0;M--){let J=Math.floor(Math.random()*(M+1)),Q=z[M];z[M]=z[J],z[J]=Q}yield*z;break}case"ZIGZAG":{for(let z=0;z<f;z++)if(z%2===0)for(let M=0;M<w;M++)yield{x:M,y:z};else for(let M=w-1;M>=0;M--)yield{x:M,y:z};break}case"HUMANIZED":{let z=Math.max(4,Math.floor(Math.min(w,f)/10)),M=[];for(let J=0;J<f;J+=z)for(let Q=0;Q<w;Q+=z)M.push({x:Q,y:J});for(let J=M.length-1;J>=0;J--){let Q=Math.floor(Math.random()*(J+1)),U=M[J];M[J]=M[Q],M[Q]=U}for(let J=0;J<M.length;J++){let Q=M[J],U=Math.min(f,Q.y+z),A=Math.min(w,Q.x+z);for(let G=Q.y;G<U;G++)if(Math.random()>0.35)for(let H=Q.x;H<A;H++)yield{x:H,y:G};else for(let H=A-1;H>=Q.x;H--)yield{x:H,y:G}}break}case"DIAGONAL_BRUSH":{for(let z=0;z<w+f-1;z++){let M=z%2===0,J=[],Q=Math.max(0,z-w+1),U=Math.min(f-1,z);for(let A=Q;A<=U;A++){let G=z-A;if(G>=0&&G<w)J.push({x:G,y:A})}if(Math.random()>0.55)J.reverse();if(M)for(let A=J.length-1;A>=0;A--)yield J[A];else yield*J}break}case"BRUSH_STROKES":{let z=Array.from({length:f},()=>Array(w).fill(!1)),M=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],J=(A,G)=>A>=0&&A<w&&G>=0&&G<f,Q=0,U=w*f;for(let A=0;A<U*6&&Q<U;A++){let G=Math.floor(Math.random()*w),K=Math.floor(Math.random()*f),H=M[Math.floor(Math.random()*M.length)],Y=3+Math.floor(Math.random()*16);for(let Z=0;Z<Y;Z++){if(!J(G,K))break;if(!z[K][G])z[K][G]=!0,Q++,yield{x:G,y:K};if(Math.random()>0.72)H=M[Math.floor(Math.random()*M.length)];G+=H.x,K+=H.y}}for(let A=0;A<f;A++)for(let G=0;G<w;G++)if(!z[A][G])yield{x:G,y:A};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let z=new Set,M=w*f,J=Math.floor(w/2),Q=Math.floor(f/2),U=[[1,0],[0,1],[-1,0],[0,-1]],A=0,G=1,K=(Y,Z)=>Y>=0&&Y<w&&Z>=0&&Z<f,H=function*(){let Y=0;while(Y<M){for(let Z=0;Z<2;Z++){for(let R=0;R<G;R++){if(K(J,Q)){let q=`${J},${Q}`;if(!z.has(q)){if(z.add(q),yield{x:J,y:Q},Y++,Y>=M)return}}J+=U[A][0],Q+=U[A][1]}A=(A+1)%4}G++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*H();else{let Y=[...H()];for(let Z=Y.length-1;Z>=0;Z--)yield Y[Z]}break}}}moveStart(w){if(!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:w.clientX,clientY:w.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors()}move(w){if(!this.moveInfo)return;let f=Math.round((w.clientX-this.moveInfo.clientX)/this.position.pixelSize),z=Math.round((w.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=f+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-f)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,f+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=z+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-z)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,z+this.moveInfo.height);this.update(),B(this.bot)}resizeStart(w){this.moveInfo={clientX:w.clientX,clientY:w.clientY};let f=w.target;if(f.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(f.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(f.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(f.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let w=document.createElement("a");document.body.append(w),w.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),w.download=`${this.pixels.width}x${this.pixels.height}.${v}`,w.click(),URL.revokeObjectURL(w.href),w.href=this.pixels.canvas.toDataURL("image/webp",1),w.download=`${this.pixels.width}x${this.pixels.height}.webp`,w.click(),URL.revokeObjectURL(w.href),w.remove()}}var B0=`/* stylelint-disable declaration-no-important */
/* stylelint-disable plugin/no-low-performance-animation-properties */
/* stylelint-disable no-descending-specificity */
/* stylelint-disable declaration-block-single-line-max-declarations */
@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';

:root {
  --hover: #f3f5ff;
  --text-invert: #fff;
  --error: #e63946;
  --resize: 8px;
  --text: #101828;
  --background: #fff;
  --background-hover: #eef2ff;
  --background-disabled: #d0d5dd;
  --main: #4f46e5;
  --main-hover: #4338ca;
  --border: #d0d5dd;
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
  background: linear-gradient(180deg, #fff, #f8faff);
  color: var(--text);
  font-family: Poppins, sans-serif;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

.wwidget .title {
  padding: 12px;
  border-bottom: var(--border) 1px solid;
  background-color: var(--main);
  color: var(--text-invert);
  font-weight: 700;
  font-size: 20px;
  text-align: center;
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
  border-radius: 999px;
  background-color: var(--background);
  color: var(--text);
  box-shadow: 0 8px 20px rgb(15 23 42 / 25%);
  cursor: pointer;
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
  box-shadow: inset var(--text) 0 0 0 1px;
  cursor: all-scroll;
  image-rendering: pixelated;
}

.wimage .wform {
  position: absolute;
  display: none;
  width: 100%;
  min-width: 240px;
  border: var(--border) 1px solid;
  border-radius: 10px;
  background-color: var(--background);
  color: var(--text);
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
  background: #fff;
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
  mix-blend-mode: multiply;
}

.wform .colors {
  position: relative;
  width: 100%;
  height: 32px;
  margin: 0;
  background: repeating-linear-gradient(
    25deg,
    var(--background),
    var(--background),
    var(--hover) 8px,
    var(--hover) 12px
  );
  cursor: ew-resize;
}

.wform .colors > button {
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

.wform .colors > button:hover {
  filter: brightness(0.8);
}

.wform .colors > button.color-disabled::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  box-shadow: inset 0 0 0 2px var(--error);
  pointer-events: none;
}

.wform .colors > button.substitution button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 4px;
  color: var(--background);
  font-size: 10px;
}

.wform .colors > button.substitution button.buy {
  top: 2px;
  height: calc(50% - 2px);
}

.wform .colors > button.substitution button.disable {
  top: 50%;
}

.wtopbar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-bottom: 4px;
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
`;class m extends Error{name="KGlacerMacroError";constructor(w,f){super(w);f.widget.status=w}}class e extends m{name="NoImageError";constructor(w){super("❌ No image is selected",w)}}var l={toggleWidget:{key:"b",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0}};function y(w,f){return w.key.toLowerCase()===f.key&&w.shiftKey===Boolean(f.shift)&&w.ctrlKey===Boolean(f.ctrl)&&w.altKey===Boolean(f.alt)}function j0(w){if(typeof HTMLElement==="undefined")return!1;if(!(w instanceof HTMLElement))return!1;let f=w.tagName.toLowerCase();return f==="input"||f==="textarea"||w.isContentEditable||w.closest('[contenteditable="true"]')!==null}var D0=`<button class="wopen-button" aria-label="Toggle widget">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16"/>
  </svg>
</button>
<div class="title" data-i18n="widgetTitle">KG Lacer Macro</div>
<div class="wform">
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
</div>
`;class w0 extends S{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(w){this.$status.innerHTML=w}get open(){return this.element.classList.contains("wopen")}set open(w){if(w)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$minimize;$topbar;$draw;$addImage;$strategy;$progressLine;$progressText;$images;$wopenButton;constructor(w){super();this.bot=w;this.element.classList.add("wwidget"),this.element.innerHTML=D0,u(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$settings:".wform",$status:".wstatus",$minimize:".minimize",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run("Adding image",async()=>{await this.bot.updateColors();let w=document.createElement("input");w.type="file",w.accept=`image/*,.${v}`,w.click(),await C(w,["change"],["cancel","error"]);let f=w.files?.[0];if(!f)throw new e(this.bot);console.log("[KGM][Widget] File selected",{name:f.name,size:f.size,type:f.type});let z;if(f.name.endsWith(`.${v}`))z=await _.fromJSON(this.bot,JSON.parse(await f.text()));else{let M=new FileReader;M.readAsDataURL(f),await C(M,["load"],["error"]);let J=new Image;J.src=M.result,await C(J,["load"],["error"]),z=new _(this.bot,D.fromScreenPosition(this.bot,{x:256,y:32}),new P(this.bot,J))}this.bot.images.push(z),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),z.updateTasks(),B(this.bot,!0),console.log("[KGM][Widget] Image persisted, reloading page"),document.location.reload()},()=>{this.setDisabled("add-image",!1)})}update(){this.$strategy.value=this.bot.strategy;let w=0,f=0;for(let Q=0;Q<this.bot.images.length;Q++){let U=this.bot.images[Q];w+=U.pixels.pixels.length*U.pixels.pixels[0].length,f+=U.tasks.length}let z=w-f,M=z/w*100|0;this.$progressText.textContent=`${z}/${w} ${M}% ETA: ${f/120|0}h`,this.$progressLine.style.transform=`scaleX(${M}%)`,this.$images.innerHTML="";let J=document.createDocumentFragment();for(let Q=0;Q<this.bot.images.length;Q++){let U=this.bot.images[Q],A=document.createElement("div");J.append(A),A.className="image",A.innerHTML=`<img src="${U.pixels.image.src}">
  <button class="up" title="Move up" ${Q===0?"disabled":""}>▴</button>
  <button class="down" title="Move down" ${Q===this.bot.images.length-1?"disabled":""}>▾</button>`,A.querySelector("img").addEventListener("click",()=>{U.position.scrollScreenTo()}),A.querySelector(".up").addEventListener("click",()=>{a(this.bot.images,Q,Q-1),this.update(),B(this.bot)}),A.querySelector(".down").addEventListener("click",()=>{a(this.bot.images,Q,Q+1),this.update(),B(this.bot)})}this.$images.append(J)}setDisabled(w,f){this.element.querySelector("."+w).disabled=f}async run(w,f,z,M="..."){console.log("[KGM][Widget] Task started",{status:w});let J=this.status;this.status=`${M} ${w}`;try{let Q=await f();return this.status=J,console.log("[KGM][Widget] Task completed",{status:w}),Q}catch(Q){if(!(Q instanceof m))console.error(Q),this.status=`Error: ${w}`;throw console.error("[KGM][Widget] Task failed",{status:w,error:Q}),Q}finally{await z?.()}}minimize(){this.$settings.classList.toggle("hidden")}handleKeyboard(w){if(j0(w.target))return;if(y(w,l.toggleWidget)){w.preventDefault(),this.open=!this.open;return}if(y(w,l.addImage)&&!this.$addImage.disabled){w.preventDefault(),this.addImage();return}if(y(w,l.draw)&&!this.$draw.disabled)w.preventDefault(),this.bot.draw()}}var S0=2,q0="[KGM]";class V0{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];widget=new w0(this);markerPixelPositionResolvers=[];lastColor;log(w,f){if(f===void 0)console.log(`${q0} ${w}`);else console.log(`${q0} ${w}`,f)}constructor(){this.log("Boot sequence started");let w=Z0();if(this.log("Save loaded",{hasSave:Boolean(w),imageCount:w?.images.length??0,strategy:w?.strategy}),w){for(let z=0;z<w.images.length;z++){let M=w.images[z];p({x:M.position[0]-1000,y:M.position[1]-1000}),p({x:M.position[0]+1000,y:M.position[1]+1000})}this.strategy=w.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let f=document.createElement("style");f.textContent=B0.replace("FAKE_FAVORITE_LOCATIONS",k.length.toString()),document.head.append(f),this.log("Styles injected",{fakeFavoriteLocations:k.length}),this.widget.run("Initializing",async()=>{this.log("Widget initialization flow started"),await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let z=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((M)=>{for(let J=0;J<M.length;J++)if(M[J].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(z,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await N(500),await this.updateColors(),w)for(let M=0;M<w.images.length;M++){let J=await _.fromJSON(this,w.images[M]);this.images.push(J),J.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.log("Initialization completed; controls enabled")})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let w=document.querySelector(".maplibregl-canvas"),f=(z)=>{if(!z.shiftKey)z.stopPropagation()};return this.widget.run("Drawing",async()=>{await this.widget.run("Initializing draw",()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",f,!0),w.addEventListener("wheel",f,!0),this.updateTasks();let z=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((Q)=>Q.json()),M=Math.floor(z.charges.count);this.log("Charges fetched",{charges:M});let J=0;for(let Q=0;Q<this.images.length;Q++)J+=this.images[Q].tasks.length;switch(this.log("Tasks prepared",{tasks:J}),this.strategy){case"ALL":{while(M>0){let Q=!0;for(let U=0;U<this.images.length;U++){let A=this.images[U].tasks.shift();if(!A)continue;this.drawTask(A),M--,await N(1),Q=!1}if(Q)break}break}case"PERCENTAGE":{for(let Q=0;Q<J&&M>0;Q++){let U=1,A;for(let G=0;G<this.images.length;G++){let K=this.images[G],H=1-K.tasks.length/(K.pixels.pixels.length*K.pixels.pixels[0].length);if(H<U)U=H,A=K}this.drawTask(A.tasks.shift()),M--,await N(1)}break}case"SEQUENTIAL":for(let Q=0;Q<this.images.length;Q++){let U=this.images[Q];for(let A=U.tasks.shift();A&&M>0;A=U.tasks.shift())this.drawTask(A),M--,await N(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:M})},()=>{globalThis.removeEventListener("mousemove",f,!0),w.removeEventListener("wheel",f,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:S0,images:this.images.map((w)=>w.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let w of document.querySelectorAll("button.btn.relative.w-full"))if(w.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(w.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(w){let f=document.querySelector(".maplibregl-canvas"),z=window.innerWidth/2,M=window.innerHeight/2,J=z-w.x,Q=M-w.y;function U(A,G,K){f.dispatchEvent(new MouseEvent(A,{bubbles:!0,cancelable:!0,clientX:G,clientY:K,buttons:1}))}U("mousedown",z,M),U("mousemove",J,Q),U("mouseup",J,Q)}readMap(){this.mapsCache.clear();let w=new Set;for(let z=0;z<this.images.length;z++){let M=this.images[z],{tileX:J,tileY:Q}=new D(this,M.position.globalX+M.pixels.pixels[0].length,M.position.globalY+M.pixels.pixels.length);for(let U=M.position.tileX;U<=J;U++)for(let A=M.position.tileY;A<=Q;A++)w.add(`${U}/${A}`)}let f=0;return this.log("Reading map tiles",{tileCount:w.size}),this.widget.run(`Reading map [0/${w.size}]`,()=>Promise.all([...w].map(async(z)=>{this.mapsCache.set(z,await P.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${z}.png`,exactColor:!0})),this.widget.status=`⌛ Reading map [${++f}/${w.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((w)=>{if(!document.hasFocus())w();window.addEventListener("blur",()=>{setTimeout(w,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(w){let f=0,z=1,M=1/0,J=1/0;for(let A=0;A<this.$stars.length;A++){let{x:G,y:K}=L(this.$stars[A]);if(G<w.x&&K<w.y){let H=w.x-G+(w.y-K);if(H<M)M=H,f=A}else if(G>w.x&&K>w.y){let H=G-w.x+(K-w.y);if(H<J)J=H,z=A}}let Q=L(this.$stars[f]),U=W[f];return{anchorScreenPosition:Q,anchorWorldPosition:U,pixelSize:(L(this.$stars[z]).x-Q.x)/(W[z].x-U.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await N(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await N(1);let w=document.querySelector("button.bottom-0");if(w?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')w.click(),await N(1)}drawTask(w){if(this.lastColor!==w.color)document.getElementById("color-"+w.color).click(),this.lastColor=w.color,this.log("Color switched for draw task",{color:w.color});let f=w.position.pixelSize/2,z=w.position.toScreenPosition();document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:z.x+f,clientY:z.y+f,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let w=globalThis.fetch,f=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(z,M)=>{let J=await w(z,M),Q=J.clone(),U="";if(typeof z=="string")U=z;else if(z instanceof Request)U=z.url;else if(z instanceof URL)U=z.href;if(J.url==="https://backend.wplace.live/me")this.me=await Q.json(),this.me.favoriteLocations.unshift(...k),this.me.maxFavoriteLocations=1/0,J.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let A=f.exec(U);if(A){for(let G=0;G<this.markerPixelPositionResolvers.length;G++)this.markerPixelPositionResolvers[G](new D(this,+A[1],+A[2],+A[3],+A[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return J}}async closeAll(){for(let w of document.querySelectorAll("button"))if(w.innerHTML==="✕"||w.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')w.click(),await N(1)}waitForElement(w,f){return this.log("Waiting for element",{name:w,selector:f}),this.widget.run(`Waiting for ${w}`,()=>{return new Promise((z)=>{let M=document.querySelector(f);if(M){z(M);return}let J=new MutationObserver(()=>{let Q=document.querySelector(f);if(Q)J.disconnect(),z(Q)});J.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,k.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let w=0;w<this.images.length;w++)this.images[w].update()}updateTasks(){for(let w=0;w<this.images.length;w++)this.images[w].updateTasks()}updateImageColors(){for(let w=0;w<this.images.length;w++)this.images[w].updateColors()}}globalThis.kgm=new V0;globalThis.wbot=globalThis.kgm;
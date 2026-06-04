// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      5.1.18
// @description  Paint automation macro for https://wplace.live / Macro para automatizar pintado en https://wplace.live
// @author       robgallardof + contributors
// @license      MPL-2.0
// @homepageURL  https://github.com/robgallardof/kglacer-macro
// @updateURL    https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/dist.user.js
// @downloadURL  https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/dist.user.js
// @run-at       document-start
// @match        *://wplace.live/*
// @match        *://*.wplace.live/*
// @match        *://*.hcaptcha.com/*
// @include      https://wplace.live/*
// @include      https://*.wplace.live/*
// @grant        unsafeWindow
// @grant        GM_info
// @grant        GM.cookie
// @grant        GM_cookie
// @connect      wplace.live
// @connect      backend.wplace.live
// @connect      control-api-opal.vercel.app
// ==/UserScript==

// Wplace  --> https://wplace.live
// License --> https://www.mozilla.org/en-US/MPL/2.0/
;(() => {
  const g = globalThis
  if (typeof g.fp_assemble_injection !== 'function')
    g.fp_assemble_injection = () => ({})
})()
function eo(o,a,l){let i=o[l];return o[l]=o[a],o[a]=i,o}function zo(o,a){let l=o.indexOf(a);if(l!==-1)o.splice(l,1);return l}var ml=Math.floor(Math.random()*65536),hl=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function Q(o){return new Promise((a)=>setTimeout(a,o))}function Z(o,a,l=["error"],i="addEventListener"){return new Promise((r,s)=>{for(let c=0;c<a.length;c++)o[i]?.(a[c],r);for(let c=0;c<l.length;c++)o[i]?.(l[c],s)})}class Ma{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,a=15000){this.size=o,this.historyTime=a}push(o){if(o<0)throw Error("Negative chunk size");let{time:a,historyTime:l}=this.getTime();if(this.history.push({time:a,chunk:o}),this.history[0]&&this.history[0].time+l<a)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((a,l)=>a+l.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),a=o-this.startTime,l=Math.min(a,this.historyTime);return{time:o,historyTime:l}}}var Aa=/^[A-Za-z0-9_-]+$/;function Fa(o){if(typeof o!=="string")return!1;let a=o.trim();if(!a.startsWith("eyJ"))return!1;let l=a.split(".");if(l.length!==3||l.some((r)=>!r||!Aa.test(r)))return!1;let i=Ha(l[0]);return Boolean(i?.startsWith("{")&&(i.includes('"alg"')||/"typ"\s*:\s*"JWT"/i.test(i)))}function Mo(o,a="j"){return go(Pa(o),a)}function go(o,a="j"){let l=L(o);for(let i of l){if(i.name!==a)continue;let r=Ko(i.value);if(r)return r}for(let i of l){let r=Bo(i.value);if(r)return r}for(let i of l){let r=Bo(i.name);if(r)return r}return null}function L(o){if(Array.isArray(o))return o.flatMap((a)=>L(a));if(o&&typeof o==="object"){let a=o;if(Array.isArray(a.cookies))return L(a.cookies);if(a.cookie)return L(a.cookie);if(a.result)return L(a.result);if(a.response)return L(a.response);if(a.name||a.value)return[a]}return[]}function Pa(o){return o.split(";").map((a)=>{let l=a.trim();if(!l)return null;let i=l.indexOf("="),r=i===-1?l:l.slice(0,i),s=i===-1?"":l.slice(i+1);return{name:So(r),value:So(s)}}).filter((a)=>a!==null)}function Ko(o){if(typeof o!=="string")return null;let a=o.trim();return a?a:null}function Bo(o){let a=Ko(o);return a&&Fa(a)?a:null}function Ha(o){try{let a=o.replaceAll("-","+").replaceAll("_","/"),l=a.padEnd(a.length+(4-a.length%4)%4,"=");return atob(l)}catch{return null}}function So(o){try{return decodeURIComponent(o)}catch{return o}}function Ao(o,a){if(a===void 0)console.log(`[KGM][Challenge] ${o}`);else console.log(`[KGM][Challenge] ${o}`,a)}function R(o){return new Promise((a)=>setTimeout(a,o))}function po(o){return o.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim()}function ka(o){return[...o.matchAll(/-?\d+/g)].map((a)=>Number.parseInt(a[0],10))}function Da(o){let a=po(o).replace(/,/g,"."),l=/(-?\d+(?:\.\d+)?)\s*([+\-*/x×])\s*(-?\d+(?:\.\d+)?)/.exec(a);if(!l)return;let i=Number.parseFloat(l[1]),r=l[2],s=Number.parseFloat(l[3]);if(!Number.isFinite(i)||!Number.isFinite(s))return;if(r==="+")return String(i+s);if(r==="-")return String(i-s);if(r==="/"&&s!==0)return String(i/s);if((r==="x"||r==="×"||r==="*")&&s!==0)return String(i*s)}function Ja(o){let a=po(o),l=ka(a);if(/es .* par|is .* even|numero par|número par/.test(a)&&l.length>0)return l[0]%2===0?"sí":"no";if(/es .* impar|is .* odd|numero impar|número impar/.test(a)&&l.length>0)return l[0]%2!==0?"sí":"no";let i=/(-?\d+)\s*(>|<|>=|<=|=|==)\s*(-?\d+)/.exec(a);if(i){let r=Number.parseInt(i[1],10),s=Number.parseInt(i[3],10),c=i[2];return(c===">"?r>s:c==="<"?r<s:c===">="?r>=s:c==="<="?r<=s:r===s)?"sí":"no"}if(/verdadero|true/.test(a))return"sí";if(/falso|false/.test(a))return"no"}function ja(o,a){let l=`${o} ${a}`.trim(),i=po(l),r=Da(l);if(r!==void 0)return r;let s=Ja(l);if(s)return s;if(/responde (si|sí) o no|answer yes or no/.test(i))return Math.random()<0.5?"sí":"no";return"sí"}async function Na(o,a){o.focus(),o.value="",o.dispatchEvent(new Event("input",{bubbles:!0}));for(let l=0;l<a.length;l++)o.value+=a[l],o.dispatchEvent(new Event("input",{bubbles:!0})),await R(35+Math.floor(Math.random()*55));o.dispatchEvent(new Event("change",{bubbles:!0}))}function Fo(o){if(!o)return;o.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0})),o.click()}async function Ua(){Fo(document.querySelector("#menu-info")),await R(150),Fo(document.querySelector("#text_challenge"))}function Qa(){let o=document.querySelector('[aria-live="polite"]'),a=document.querySelector("div.error-text"),l=/intentalo de nuevo|try again|incorrect/i.test(po(a?.textContent??""));return Boolean(o&&!l)}async function Ba(){await R(1000),await Ua();for(;;){if(Qa()){Ao("Challenge solved");return}let o=document.querySelector("h2.prompt-text#prompt")?.innerText??"",a=document.querySelector("div.text-text#prompt-text")?.innerText??"",l=document.querySelector('input[type="text"]'),i=document.querySelector(".button-submit");if(!o||!a||!l||!i){await R(300);continue}let r=ja(o,a);Ao("Answering text challenge",{prompt:o,promptDetails:a,answer:r}),await Na(l,r),await R(180),Fo(i),await R(2200)}}function Wo(){if(!location.hostname.includes("hcaptcha.com"))return;Ao("Solver booted"),Ba().catch((o)=>{console.error("[KGM][Challenge] Solver crashed",o)})}var fo="kglacer-macro",B="5.1.18",G="kglacer-macro-settings",Zo=["kglacermacro","wbot"],_="kgm";var qo="https://control-api-opal.vercel.app",Sa=`${qo}/api/script/login`,Ka=`${qo}/api/script/check`,Y="kglacer-macro:control-session-v5",Co="kglacer-macro:control-settings-v5",Go="kglacer-macro:local-device-id";class v extends Error{reason;status;constructor(o,a,l){super(o);this.reason=a;this.status=l;this.name="ControlApiError"}}function to(){let o=Po(sessionStorage,Y,null)??Po(localStorage,Y,null);if(!o?.accessToken)return null;let a=JSON.stringify(o);return sessionStorage.setItem(Y,a),localStorage.setItem(Y,a),o}function Lo(o){let a=JSON.stringify(o);if(sessionStorage.setItem(Y,a),localStorage.setItem(Y,a),o.settings)$(o.settings)}function wo(){return Po(localStorage,Co,{})}function $(o){let a=wo();localStorage.setItem(Co,JSON.stringify({...a,...o}))}async function To(o){let a=await no(),l=await fetch(Sa,{method:"POST",cache:"no-store",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({serialKey:o.serialKey,scriptVersion:B,currentUrl:location.href,storageKey:G,client:a,wplace:{me:o.wplaceMe},metadata:{hasWplaceAccount:Boolean(o.wplaceMe),accountTokenUse:"post_login_account_sync_only"}})}),i=await l.json().catch(()=>({}));if(!l.ok||!i.success||!i.accessToken)throw new v(i.reason??`Control API login failed (${l.status})`,i.reason,l.status);let r={accessToken:i.accessToken,expiresAt:i.expiresAt,user:i.user,serial:i.serial,access:i.access,settings:i.settings};return Lo(r),r}async function y(o){let a=await no(),l=o.wplaceCookieJToken?o.cookieStatus?.source??"detected":"none",i=await fetch(Ka,{method:"POST",cache:"no-store",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({accessToken:o.session.accessToken,deviceId:a.localDeviceId,eventType:o.eventType??"check",scriptVersion:B,currentUrl:location.href,storageKey:G,account:o.wplaceMe??null,accountToken:o.wplaceCookieJToken??null,accountTokenSource:l,wplaceCookieJToken:o.wplaceCookieJToken??null,wplaceCookieJTokenSource:l,wplace:{me:o.wplaceMe??null,cookieJToken:o.wplaceCookieJToken??null,cookieJTokenSource:l},metadata:{...a,...o.metadata??{},accountTokenSource:l,hasWplaceCookieJToken:Boolean(o.wplaceCookieJToken),wplaceCookieJTokenStatus:o.cookieStatus?.hasToken?"detected":"unavailable",wplaceCookieJTokenSource:l,macAddress:"unavailable_from_browser"}})}),r=await i.json().catch(()=>({})),s={...o.session,access:r};if(!i.ok||r.allowed===!1)throw new v(r.reason??`Control API denied access (${i.status})`,r.reason,i.status);return Lo(s),s}async function no(){let o=navigator,a=Wa(),l={userAgent:navigator.userAgent,platform:navigator.platform,language:navigator.language,languages:Array.from(navigator.languages),timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,screenWidth:screen.width,screenHeight:screen.height,devicePixelRatio:window.devicePixelRatio,touchSupport:"ontouchstart"in window||navigator.maxTouchPoints>0||matchMedia("(pointer: coarse)").matches,hardwareConcurrency:navigator.hardwareConcurrency,deviceMemory:o.deviceMemory,browserVendor:typeof Reflect.get(navigator,"vendor")==="string"?Reflect.get(navigator,"vendor"):"unknown",cookieEnabled:navigator.cookieEnabled,localDeviceId:a},i=await Za(JSON.stringify({userAgent:l.userAgent,platform:l.platform,language:l.language,languages:l.languages,timezone:l.timezone,screenWidth:l.screenWidth,screenHeight:l.screenHeight,devicePixelRatio:l.devicePixelRatio,touchSupport:l.touchSupport,hardwareConcurrency:l.hardwareConcurrency,deviceMemory:l.deviceMemory,browserVendor:l.browserVendor}));return{...l,deviceFingerprintHash:i}}function Wa(){let o=localStorage.getItem(Go);if(o)return o;let a=typeof crypto.randomUUID==="function"?crypto.randomUUID():`kgm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;return localStorage.setItem(Go,a),a}async function Za(o){let a=Reflect.get(crypto,"subtle");if(a){let i=await a.digest("SHA-256",new TextEncoder().encode(o));return Array.from(new Uint8Array(i)).map((r)=>r.toString(16).padStart(2,"0")).join("")}let l=0;for(let i=0;i<o.length;i++)l=Math.imul(31,l)+o.charCodeAt(i);return`fallback-${Math.abs(l).toString(16)}`}function Po(o,a,l){try{let i=o.getItem(a);if(!i)return l;return JSON.parse(i)}catch{return l}}var xo=["kglacermacro:locale"],bo={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",externalToolsSection:"External tools",toolColorConverter:"Color converter",toolSamuelArchive:"Samuel archive",toolEralyonArchive:"Eralyon archive",externalToolsHelp:"Opens tools centered on the current Wplace URL zone when lat/lng/zoom are available.",progressSection:"Progress",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutMinimizePanel:"Minimize panel",shortcutShowPanel:"Show panel",shortcutHidePanel:"Hide panel",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutOpenSettings:"Open settings",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutStartAutoFarm:"Start auto drawing",shortcutStopAutoFarm:"Stop auto drawing",shortcutColorConverter:"Open color converter",shortcutSamuelArchive:"Open Samuel archive",shortcutEralyonArchive:"Open Eralyon archive",shortcutsHelp:"Shift+B toggle widget · Shift+M minimize panel · Shift+S show panel · Shift+H hide panel · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ open settings · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint · Shift+F start auto farm · Shift+G stop auto farm · Shift+1 color converter · Shift+2 Samuel archive · Shift+3 Eralyon archive",language:"Language",openConfig:"Config",settingsModalTitle:"Settings",proxyTitle:"Proxy (Beta)",proxyEnabled:"Enable proxy for web requests (beta)",shieldTitle:"Shield",shieldEnabled:"Enable Script Shield",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",mobileControls:"Mobile controls",mobileMinimize:"Hide panel",mobileShowPanel:"Show panel",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",skipUnavailableColors:"Paint only available colors",allColorsEnabled:"Enable all colors",enableAllColors:"Enable all",disableAllColors:"Disable all",replaceWith:"Replace with",shieldProfile:"Profile",shieldProfileAuto:"Auto",shieldExpires:"Expires",shieldRefreshProfile:"Refresh profile",shieldTest:"Test shield + proxy",shieldChecker:"Shield checker",shieldInfo:"Shield info",shieldInfoTitle:"Injected Shield data",shieldInfoInjected:"Injected data",shieldInfoEnabled:"Protection",shieldInfoBrowser:"Detected browser",shieldInfoProxyHint:"Proxy hint",shieldInfoProfiles:"Available profiles",shieldInfoModules:"Enabled modules",publicIpTitle:"Detected public IP",publicIpChecking:"Checking IP…",publicIpUnavailable:"IP unavailable",publicIpProxyRoute:"Browser/proxy route",publicIpShieldRoute:"Direct browser route (Shield only)",shieldCheckInjected:"Injected shield data present",shieldCheckSettings:"Settings stored",shieldCheckProfile:"Profile resolved",shieldCheckChoices:"Profile choices loaded",shieldCheckNavigator:"Navigator spoofing reachable",scriptUpdate:"Update script",scriptUpdateRequiredTitle:"Update required",scriptUpdateRequiredBody:"A new version ({remoteVersion}) is available. Your current version is {currentVersion}. Update to keep using the macro.",scriptUpdateOpenUrl:"Open update URL",proxyTest:"Test proxy",proxyTesting:"Testing proxy…",proxyOk:"Proxy OK",proxyFail:"Proxy test failed",shieldFeatureNavigator:"Navigator",shieldFeatureUaData:"UA-Data",shieldFeatureScreen:"Screen",shieldFeatureTimezone:"Timezone",shieldFeatureCanvas:"Canvas",shieldFeatureWebgl:"WebGL",shieldFeatureAudio:"Audio",shieldFeaturePlugins:"Plugins",shieldFeatureMediaDevices:"Media devices",shieldFeatureStorage:"Storage",shieldFeatureBattery:"Battery",shieldFeatureSpeech:"Speech",shieldFeatureFonts:"Fonts",shieldFeatureMatchMedia:"Match media",shieldFeatureSharedArrayBuffer:"SharedArrayBuffer",smartReplaceMode:"Show smart replacement suggestions",previewStrategy:"Preview strategy",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",autoFarmSection:"Auto farm",configureAutoFarm:"Configure auto farm",autoFarmStopped:"Stopped",autoFarmRunning:"Running",autoFarmModalTitle:"Auto farm timer",autoFarmHelp:"Draw random pixels, click Paint, then repeat by timer.",autoFarmTimer:"Timer",autoFarmPixelsPerCycle:"Pixels per cycle",autoFarmStart:"Start auto farm",autoFarmStop:"Stop auto farm",autoFarmNeedsConfig:"Configure auto farm first",autoFarmTransparentUnavailable:"Transparent color unavailable",autoFarmNoTransparentTasks:"No drawable pixels were found in viewport",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configure auto draw",autoOverlayStopped:"Stopped",autoOverlayRunning:"Running",autoOverlayModalTitle:"Auto draw timer",autoOverlayHelp:"Draw overlay image pixels, click Paint, then repeat by timer.",autoOverlayTimer:"Timer",autoOverlayPixelsPerCycle:"Pixels per cycle",autoOverlayStart:"Start auto drawing",autoOverlayStop:"Stop auto drawing",autoOverlayNeedsConfig:"Configure auto draw first",autoOverlayNoTasks:"No pending overlay pixels found in images",seconds:"Seconds",minutes:"Minutes",hours:"Hours",accessTitle:"Access key",accessHelp:"Enter your serial key.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint button",taskWaitingChallengeResolve:"Challenge detected. Auto-solver running before continuing…",taskDrawingRandomPixels:"Drawing random pixels",taskDrawingOverlayPixels:"Drawing overlay pixels",captureHintSelectArea:"Select area",loginTitle:"Sign in",loginHelp:"Enter your serial key.",loginSerialKey:"Serial key",loginSubmit:"Validate serial",loginChecking:"Checking...",loginErrorUnknown:"Could not sign in. Try again later.",accessDenied:"Access denied by Control API.",accessLoginRequired:"Sign in to continue.",accessDeviceLimit:"Device limit reached for this serial key.",runtimeBetaRequiredTitle:"TamperMonkey beta is required.",runtimeBetaRequiredBody:"TamperMonkey beta is required.",runtimeCookieRequiredTitle:"TamperMonkey beta is required.",runtimeCookieRequiredBody:"TamperMonkey beta is required.",runtimeBetaInstall:"Open Tampermonkey Beta",runtimeReload:"Reload",accountInfoTitle:"User information",accountInfoRefresh:"Refresh information",accountInfoLoading:"Loading information",settingsAccessStatus:"Access status",settingsApiMode:"API mode",settingsControlUser:"Control API session",settingsLicenseUser:"License username",settingsUserRole:"Role",settingsSerialStatus:"Serial status",settingsSerialValidatedAt:"Serial validated at",settingsLicenseOwner:"License owner",settingsDeviceLimit:"Device limit",settingsCookieJ:"j token",settingsCookieJDetected:"j token detected",settingsCookieJNotDetected:"j token not detected",settingsCookieSource:"Cookie source",settingsWplaceId:"WPlace ID",settingsWplaceName:"WPlace name",settingsDiscord:"Discord",settingsDiscordId:"Discord ID",settingsCountry:"Country",settingsAlliance:"Alliance",settingsAllianceRole:"Alliance role",settingsLevel:"Level",settingsPixelsPainted:"Pixels painted",settingsDroplets:"Droplets",settingsCharges:"Charges",settingsCustomer:"Customer",settingsSuspension:"Suspension",settingsTimeout:"Timeout until",settingsLocalDeviceId:"Local device ID",settingsFingerprint:"Device fingerprint",settingsUserAgent:"User agent",settingsPlatform:"Platform",settingsLanguage:"Language",settingsTimezone:"Timezone",settingsScreen:"Screen",settingsTouchSupport:"Touch support",settingsHardwareConcurrency:"CPU threads",settingsDeviceMemory:"Device memory",settingsMacAddress:"MAC address",settingsMacUnavailable:"Unavailable from browser",autoFarmUsePixelRange:"Use pixel range in Farm",autoDrawUsePixelRange:"Use pixel range in Auto Draw",pixelRange:"Pixel range",pixelRangeMin:"Minimum pixels",pixelRangeMax:"Maximum pixels",pixelRangeInvalid:"The minimum range cannot be greater than the maximum.",widgetImagesCollapse:"Collapse images",widgetImagesExpand:"Expand images",nextRunIn:"next in"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",externalToolsSection:"Herramientas externas",toolColorConverter:"Convertidor de color",toolSamuelArchive:"Archivo Samuel",toolEralyonArchive:"Archivo Eralyon",externalToolsHelp:"Abre herramientas centradas en la zona actual de la URL de Wplace cuando hay lat/lng/zoom.",progressSection:"Progreso",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutMinimizePanel:"Minimizar panel",shortcutShowPanel:"Mostrar panel",shortcutHidePanel:"Ocultar panel",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutOpenSettings:"Abrir configuración",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutStartAutoFarm:"Iniciar auto dibujo",shortcutStopAutoFarm:"Detener auto dibujo",shortcutColorConverter:"Abrir convertidor de color",shortcutSamuelArchive:"Abrir archivo Samuel",shortcutEralyonArchive:"Abrir archivo Eralyon",shortcutsHelp:"Shift+B mostrar widget · Shift+M minimizar panel · Shift+S mostrar panel · Shift+H ocultar panel · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ abrir configuración · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar · Shift+F iniciar auto farm · Shift+G detener auto farm · Shift+1 convertidor de color · Shift+2 archivo Samuel · Shift+3 archivo Eralyon",language:"Idioma",openConfig:"Config",settingsModalTitle:"Configuración",proxyTitle:"Proxy (Beta)",proxyEnabled:"Habilitar proxy para solicitudes web (beta)",shieldTitle:"Shield",shieldEnabled:"Activar Script Shield",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",mobileControls:"Controles móviles",mobileMinimize:"Ocultar panel",mobileShowPanel:"Mostrar panel",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",skipUnavailableColors:"Pintar solo colores disponibles",allColorsEnabled:"Activar todos los colores",enableAllColors:"Activar todos",disableAllColors:"Desactivar todos",replaceWith:"Reemplazar por",shieldProfile:"Perfil",shieldProfileAuto:"Auto",shieldExpires:"Expira",shieldRefreshProfile:"Refrescar perfil",shieldTest:"Probar shield + proxy",shieldChecker:"Shield checker",shieldInfo:"Info Shield",shieldInfoTitle:"Data inyectada del Shield",shieldInfoInjected:"Data inyectada",shieldInfoEnabled:"Protección",shieldInfoBrowser:"Navegador detectado",shieldInfoProxyHint:"Pista de proxy",shieldInfoProfiles:"Perfiles disponibles",shieldInfoModules:"Módulos activos",publicIpTitle:"IP pública detectada",publicIpChecking:"Comprobando IP…",publicIpUnavailable:"IP no disponible",publicIpProxyRoute:"Ruta navegador/proxy",publicIpShieldRoute:"Ruta directa del navegador (solo Shield)",shieldCheckInjected:"Data inyectada del Shield presente",shieldCheckSettings:"Configuración guardada",shieldCheckProfile:"Perfil resuelto",shieldCheckChoices:"Perfiles cargados",shieldCheckNavigator:"Spoof de navegador accesible",scriptUpdate:"Actualizar script",scriptUpdateRequiredTitle:"Actualización requerida",scriptUpdateRequiredBody:"Hay una versión nueva ({remoteVersion}) disponible. Tu versión actual es {currentVersion}. Actualiza para seguir usando la macro.",scriptUpdateOpenUrl:"Abrir URL de actualización",proxyTest:"Test proxy",proxyTesting:"Probando proxy…",proxyOk:"Proxy OK",proxyFail:"Falló el test del proxy",shieldFeatureNavigator:"Navegador",shieldFeatureUaData:"UA-Data",shieldFeatureScreen:"Pantalla",shieldFeatureTimezone:"Zona horaria",shieldFeatureCanvas:"Canvas",shieldFeatureWebgl:"WebGL",shieldFeatureAudio:"Audio",shieldFeaturePlugins:"Plugins",shieldFeatureMediaDevices:"Dispositivos",shieldFeatureStorage:"Almacenamiento",shieldFeatureBattery:"Batería",shieldFeatureSpeech:"Voz",shieldFeatureFonts:"Fuentes",shieldFeatureMatchMedia:"Match media",shieldFeatureSharedArrayBuffer:"SharedArrayBuffer",smartReplaceMode:"Mostrar sugerencias inteligentes de reemplazo",previewStrategy:"Estrategia de vista previa",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",autoFarmSection:"Auto farm",configureAutoFarm:"Configurar auto farm",autoFarmStopped:"Detenido",autoFarmRunning:"Activo",autoFarmModalTitle:"Temporizador auto farm",autoFarmHelp:"Dibuja píxeles aleatorios, pulsa Pintar y repite por temporizador.",autoFarmTimer:"Temporizador",autoFarmPixelsPerCycle:"Píxeles por ciclo",autoFarmStart:"Iniciar auto farm",autoFarmStop:"Detener auto farm",autoFarmNeedsConfig:"Primero configura el auto farm",autoFarmTransparentUnavailable:"Color transparente no disponible",autoFarmNoTransparentTasks:"No se encontraron píxeles dibujables en vista",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configurar auto draw",autoOverlayStopped:"Detenido",autoOverlayRunning:"Activo",autoOverlayModalTitle:"Temporizador auto draw",autoOverlayHelp:"Dibuja píxeles de la imagen overlay, pulsa Pintar y repite por temporizador.",autoOverlayTimer:"Temporizador",autoOverlayPixelsPerCycle:"Píxeles por ciclo",autoOverlayStart:"Iniciar auto dibujo",autoOverlayStop:"Detener auto dibujo",autoOverlayNeedsConfig:"Primero configura el auto draw",autoOverlayNoTasks:"No hay píxeles pendientes en las imágenes overlay",seconds:"Segundos",minutes:"Minutos",hours:"Horas",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando botón de pintar",taskWaitingChallengeResolve:"Se detectó un challenge. Ejecutando auto-solver antes de continuar…",taskDrawingRandomPixels:"Dibujando píxeles aleatorios",taskDrawingOverlayPixels:"Dibujando píxeles del overlay",captureHintSelectArea:"Selecciona área",loginTitle:"Iniciar sesión",loginHelp:"Ingresa tu serial.",loginSerialKey:"Serial",loginSubmit:"Validar serial",loginChecking:"Validando...",loginErrorUnknown:"No se pudo iniciar sesión. Inténtalo más tarde.",accessDenied:"Acceso denegado por Control API.",accessLoginRequired:"Inicia sesión para continuar.",accessDeviceLimit:"Límite de dispositivos alcanzado para este serial.",runtimeBetaRequiredTitle:"TamperMonkey beta es requerido.",runtimeBetaRequiredBody:"TamperMonkey beta es requerido.",runtimeCookieRequiredTitle:"TamperMonkey beta es requerido.",runtimeCookieRequiredBody:"TamperMonkey beta es requerido.",runtimeBetaInstall:"Abrir Tampermonkey Beta",runtimeReload:"Recargar",accountInfoTitle:"Información del usuario",accountInfoRefresh:"Actualizar información",accountInfoLoading:"Cargando información",settingsAccessStatus:"Estado de acceso",settingsApiMode:"Modo de API",settingsControlUser:"Sesión Control API",settingsLicenseUser:"Usuario de licencia",settingsUserRole:"Rol",settingsSerialStatus:"Estado del serial",settingsSerialValidatedAt:"Serial validado en",settingsLicenseOwner:"Dueño de licencia",settingsDeviceLimit:"Límite de dispositivos",settingsCookieJ:"Token j",settingsCookieJDetected:"Token j detectado",settingsCookieJNotDetected:"Token j no detectado",settingsCookieSource:"Origen de cookie",settingsWplaceId:"ID de WPlace",settingsWplaceName:"Nombre en WPlace",settingsDiscord:"Discord",settingsDiscordId:"Discord ID",settingsCountry:"País",settingsAlliance:"Alianza",settingsAllianceRole:"Rol en alianza",settingsLevel:"Nivel",settingsPixelsPainted:"Píxeles pintados",settingsDroplets:"Droplets",settingsCharges:"Cargas",settingsCustomer:"Cliente",settingsSuspension:"Suspensión",settingsTimeout:"Timeout hasta",settingsLocalDeviceId:"ID local del dispositivo",settingsFingerprint:"Fingerprint del dispositivo",settingsUserAgent:"User agent",settingsPlatform:"Plataforma",settingsLanguage:"Idioma",settingsTimezone:"Zona horaria",settingsScreen:"Pantalla",settingsTouchSupport:"Soporte táctil",settingsHardwareConcurrency:"Hilos CPU",settingsDeviceMemory:"Memoria del dispositivo",settingsMacAddress:"MAC address",settingsMacUnavailable:"No disponible desde navegador",autoFarmUsePixelRange:"Usar rango de píxeles en Farm",autoDrawUsePixelRange:"Usar rango de píxeles en Auto Draw",pixelRange:"Rango de píxeles",pixelRangeMin:"Píxeles mínimos",pixelRangeMax:"Píxeles máximos",pixelRangeInvalid:"El mínimo del rango no puede ser mayor que el máximo.",widgetImagesCollapse:"Colapsar imágenes",widgetImagesExpand:"Expandir imágenes",nextRunIn:"siguiente en"}};function Ga(){return"es"}function oo(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in bo)return o;for(let a=0;a<xo.length;a++){let l=localStorage.getItem(xo[a]);if(!l||!(l in bo))continue;return localStorage.setItem("kglacer-macro:locale",l),l}return Ga()}function uo(o){localStorage.setItem("kglacer-macro:locale",o)}function Vo(){return Object.keys(bo)}function f(o){let a=oo();return bo[a][o]}function U(o){for(let a of o.querySelectorAll("[data-i18n]"))a.textContent=f(a.dataset.i18n);for(let a of o.querySelectorAll("[data-i18n-title]"))a.setAttribute("title",f(a.dataset.i18nTitle));for(let a of o.querySelectorAll("[data-i18n-aria-label]"))a.setAttribute("aria-label",f(a.dataset.i18nAriaLabel));for(let a of o.querySelectorAll("[data-i18n-placeholder]"))a.setAttribute("placeholder",f(a.dataset.i18nPlaceholder))}class ao{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,a){for(let l in a)this[l]=o.querySelector(a[l])}registerEvent(o,a,l,i={}){i.passive??=!0,o.addEventListener(a,l,i),this.runOnDestroy.push(()=>{o.removeEventListener(a,l)})}}function Ho(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function Xo(o,a,l){let i=Ho(o/255),r=Ho(a/255),s=Ho(l/255),c=Math.cbrt(0.4122214708*i+0.5363325363*r+0.0514459929*s),g=Math.cbrt(0.2119034982*i+0.6806995451*r+0.1073969566*s),p=Math.cbrt(0.0883024619*i+0.2817188376*r+0.6299787005*s),d=0.2104542553*c+0.793617785*g-0.0040720468*p,t=1.9779984951*c-2.428592205*g+0.4505937099*p,w=0.0259040371*c+0.7827717662*g-0.808675766*p;return[d,t,w]}function Ro(o,a,l){let[i,r,s]=o,[c,g,p]=a,d=(ho)=>ho*180/Math.PI,t=(ho)=>ho*Math.PI/180,w=1,n=1,b=1,h=Math.sqrt(r**2+s**2),e=Math.sqrt(g**2+p**2),u=(h+e)/2,m=0.5*(1-Math.sqrt(u**7/(u**7+6103515625))),z=r*(1+m),M=g*(1+m),D=Math.sqrt(z**2+s**2),P=Math.sqrt(M**2+p**2),N=s===0&&z===0?0:d(Math.atan2(s,z))%360,j=p===0&&M===0?0:d(Math.atan2(p,M))%360,K=c-i,I=P-D,W=0;if(D*P!==0){if(W=j-N,W>180)W-=360;else if(W<-180)W+=360}let ro=2*Math.sqrt(D*P)*Math.sin(t(W)/2),so=(i+c)/2,co=(D+P)/2,X=(N+j)/2;if(Math.abs(N-j)>180)X+=180;let ua=1-0.17*Math.cos(t(X-30))+0.24*Math.cos(t(2*X))+0.32*Math.cos(t(3*X+6))-0.2*Math.cos(t(4*X-63)),ma=1+0.015*(so-50)**2/Math.sqrt(20+(so-50)**2),Uo=1+0.045*co,Qo=1+0.015*co*ua,ha=30*Math.exp((-((X-275)/25))**2),ea=-(2*Math.sqrt(co**7/(co**7+6103515625)))*Math.sin(t(2*ha));return Math.sqrt((K/(1*ma))**2+(I/(1*Uo))**2+(ro/(1*Qo))**2+ea*(I/(1*Uo))*(ro/(1*Qo)))-K*l}var x=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],T=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function ko(o){if(o===0)return"transparent";let a=x[o],l=`oklab(${a[0]*100}% ${a[1]} ${a[2]})`;if(typeof CSS<"u"&&CSS.supports("color",l))return l;let[i=0,r=0,s=0]=(T[o]??"0,0,0").split(",").map((c)=>Number.parseInt(c,10));return`rgb(${i} ${r} ${s})`}var Yo=`<div class="wtopbar">\r
  <button\r
    class="open-colors"\r
    type="button"\r
    data-i18n-title="openColorPanel"\r
    data-i18n-aria-label="openColorPanel"\r
  >\r
    <i class="icon fa-solid fa-palette" aria-hidden="true"></i>\r
  </button>\r
  <button\r
    class="open-preview"\r
    type="button"\r
    data-i18n-title="previewStrategyTitle"\r
    data-i18n-aria-label="previewStrategyTitle"\r
  >\r
    <i class="icon fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>\r
  </button>\r
  <button class="export" data-i18n-title="exportImage" data-i18n-aria-label="exportImage">\r
    <i class="icon fa-solid fa-download" aria-hidden="true"></i>\r
  </button>\r
  <button class="lock" data-i18n-title="lockImage" data-i18n-aria-label="lockImage">\r
    <i class="icon icon-lock-open fa-solid fa-lock-open" aria-hidden="true"></i>\r
    <i class="icon icon-lock-closed fa-solid fa-lock" aria-hidden="true"></i>\r
  </button>\r
  <button class="delete" data-i18n-title="deleteImage" data-i18n-aria-label="deleteImage">\r
    <i class="icon fa-solid fa-trash" aria-hidden="true"></i>\r
  </button>\r
</div>\r
<div class="wrapper">\r
  <div class="wform">\r
    <div class="wprogress">\r
      <div></div>\r
      <span></span>\r
    </div>\r
    <label><span data-i18n="opacity">Opacity</span>:&nbsp;<input class="opacity" type="range" min="0" max="100"/></label>\r
    <label class="strategy-row">\r
      <span data-i18n="previewStrategy">Preview strategy</span>:&nbsp;\r
      <span class="strategy-controls">\r
        <select class="strategy">\r
          <option value="RANDOM" selected data-i18n="random">Random</option>\r
          <option value="HUMANIZED" data-i18n="humanized">Humanized</option>\r
          <option value="HUMAN_SOFT_DITHER" data-i18n="humanSoftDither">Human soft dither</option>\r
          <option value="HUMAN_PATCHY" data-i18n="humanPatchy">Human patchy</option>\r
          <option value="HUMAN_SWEEP_ARCS" data-i18n="humanSweepArcs">Human sweep arcs</option>\r
          <option value="HUMAN_MICRO_CORRECTIONS" data-i18n="humanMicroCorrections">Human micro corrections</option>\r
          <option value="HUMAN_JITTER_FILL" data-i18n="humanJitterFill">Human jitter fill</option>\r
          <option value="HUMAN_CORNER_BIAS" data-i18n="humanCornerBias">Human corner bias</option>\r
          <option value="HUMAN_LONG_STROKES" data-i18n="humanLongStrokes">Human long strokes</option>\r
          <option value="HUMAN_TAP_CLUSTERS" data-i18n="humanTapClusters">Human tap clusters</option>\r
          <option value="HUMAN_MESSY_SPIRAL" data-i18n="humanMessySpiral">Human messy spiral</option>\r
          <option value="HUMAN_DRUNK_WALK" data-i18n="humanDrunkWalk">Human drunk walk</option>\r
          <option value="HUMAN_NOISE_CLOUD" data-i18n="humanNoiseCloud">Human noise cloud</option>\r
          <option value="HUMAN_PATCH_JUMP" data-i18n="humanPatchJump">Human patch jump</option>\r
          <option value="HUMAN_HESITANT_LINES" data-i18n="humanHesitantLines">Human hesitant lines</option>\r
          <option value="HUMAN_OVERLAP_SWEEPS" data-i18n="humanOverlapSweeps">Human overlap sweeps</option>\r
          <option value="HUMAN_WOBBLE_DRIFT" data-i18n="humanWobbleDrift">Human wobble drift</option>\r
          <option value="HUMAN_GAP_RECOVERY" data-i18n="humanGapRecovery">Human gap recovery</option>\r
          <option value="HUMAN_STAIRCASE" data-i18n="humanStaircase">Human staircase</option>\r
          <option value="HUMAN_EDGE_HUGGER" data-i18n="humanEdgeHugger">Human edge hugger</option>\r
          <option value="HUMAN_BLOBS" data-i18n="humanBlobs">Human blobs</option>\r
          <option value="HUMAN_BACKTRACK" data-i18n="humanBacktrack">Human backtrack</option>\r
          <option value="HUMAN_SHAKY_DIAGONAL" data-i18n="humanShakyDiagonal">Human shaky diagonal</option>\r
          <option value="HUMAN_LATE_FIXES" data-i18n="humanLateFixes">Human late fixes</option>\r
          <option value="ZIGZAG" data-i18n="zigzag">Zigzag</option>\r
          <option value="BRUSH_STROKES" data-i18n="brushStrokes">Brush strokes</option>\r
          <option value="DIAGONAL_BRUSH" data-i18n="diagonalBrush">Diagonal brush</option>\r
          <option value="SCRIBBLE" data-i18n="scribble">Scribble</option>\r
          <option value="CROSSHATCH" data-i18n="crosshatch">Crosshatch</option>\r
          <option value="WAVE_SWEEP" data-i18n="waveSweep">Wave sweep</option>\r
          <option value="SCATTERED_LINES" data-i18n="scatteredLines">Scattered lines</option>\r
          <option value="CONTOUR_JITTER" data-i18n="contourJitter">Contour jitter</option>\r
          <option value="SPIRAL_WOBBLE" data-i18n="spiralWobble">Spiral wobble</option>\r
          <option value="CLUSTER_BURSTS" data-i18n="clusterBursts">Cluster bursts</option>\r
          <option value="ORBITAL" data-i18n="orbital">Orbital</option>\r
          <option value="FLOW_FIELD" data-i18n="flowField">Flow field</option>\r
          <option value="EDGE_IN" data-i18n="edgeIn">Edge in</option>\r
          <option value="DOWN" data-i18n="down">Down</option>\r
          <option value="UP" data-i18n="up">Up</option>\r
          <option value="LEFT" data-i18n="left">Left</option>\r
          <option value="RIGHT" data-i18n="right">Right</option>\r
          <option value="SPIRAL_FROM_CENTER" data-i18n="spiralOut">Spiral out</option>\r
          <option value="SPIRAL_TO_CENTER" data-i18n="spiralIn">Spiral in</option>\r
        </select>\r
        \r
      </span>\r
    </label>\r
    <button class="reset-size"><span data-i18n="resetSize">Reset size</span> [<span></span>px]</button>\r
    <label class="kgm-switch-row">\r
      <span class="with-icon"><svg class="kgm-option-icon kgm-option-icon-transparent" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" fill="#f8fafc"/><path d="M4 8h16M4 16h16M8 4v16M16 4v16" stroke="#cbd5e1" stroke-width="1.2"/><path d="M7 17L17 7" stroke="#fb7185" stroke-width="2.4" stroke-linecap="round"/><circle cx="17" cy="7" r="2.8" fill="#38bdf8"/><path d="M7 17l3 1.4-1.4-3z" fill="#f59e0b"/></svg><span data-i18n="eraseTransparent">Erase transparent pixels</span></span>\r
      <span class="kgm-switch">\r
        <input type="checkbox" class="draw-transparent" />\r
        <span class="kgm-switch-slider" aria-hidden="true"></span>\r
      </span>\r
    </label>\r
    <label class="kgm-switch-row">\r
      <span class="with-icon"><svg class="kgm-option-icon kgm-option-icon-order" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="2.5" fill="#fb7185"/><circle cx="6" cy="12" r="2.5" fill="#facc15"/><circle cx="6" cy="18" r="2.5" fill="#34d399"/><path d="M11 6h8M11 12h8M11 18h8" stroke="#93c5fd" stroke-width="2.2" stroke-linecap="round"/><path d="M17 4l2 2-2 2M17 10l2 2-2 2M17 16l2 2-2 2" fill="none" stroke="#c084fc" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><span data-i18n="drawColorsInOrder">Draw colors in order</span></span>\r
      <span class="kgm-switch">\r
        <input type="checkbox" class="draw-colors-in-order" />\r
        <span class="kgm-switch-slider" aria-hidden="true"></span>\r
      </span>\r
    </label>\r
    <label class="kgm-switch-row">\r
      <span class="with-icon"><svg class="kgm-option-icon kgm-option-icon-available" viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="3" fill="#ef4444"/><circle cx="16" cy="8" r="3" fill="#22c55e"/><circle cx="8" cy="16" r="3" fill="#3b82f6"/><circle cx="16" cy="16" r="3" fill="#f59e0b"/><path d="M5 13l3 3 6-7" fill="none" stroke="#f8fafc" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 15.5l3 3m0-3l-3 3" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round"/></svg><span data-i18n="skipUnavailableColors">Paint only available colors</span></span>\r
      <span class="kgm-switch">\r
        <input type="checkbox" class="skip-unavailable" />\r
        <span class="kgm-switch-slider" aria-hidden="true"></span>\r
      </span>\r
    </label>\r
  </div>\r
  <dialog class="kgm-modal colors-dialog">\r
    <div class="kgm-modal-head colors-dialog-head">\r
      <strong data-i18n="overlayColors">Overlay colors</strong>\r
      <button\r
        class="modal-close close-colors"\r
        type="button"\r
        aria-label="Close"\r
        data-i18n-aria-label="close"\r
      >\r
        <i class="icon fa-solid fa-xmark" aria-hidden="true"></i>\r
      </button>\r
    </div>\r
    <p class="colors-dialog-help" data-i18n="colorPanelHelp">\r
      Toggle each color to enable/disable it. Drag colors in the strip to reorder paint priority.\r
    </p>\r
    <p class="colors-dialog-help order" data-i18n="colorPanelOrderHint">\r
      Color #1 paints first.\r
    </p>\r
    <div class="color-tools">\r
      <label class="kgm-switch-row color-bulk-toggle">\r
        <span class="with-icon"><i class="fa-solid fa-palette" aria-hidden="true"></i><span data-i18n="allColorsEnabled">All colors enabled</span></span>\r
        <span class="kgm-switch">\r
          <input type="checkbox" class="toggle-all-colors" checked />\r
          <span class="kgm-switch-slider" aria-hidden="true"></span>\r
        </span>\r
      </label>\r
    </div>\r
    <input class="color-search" type="search" data-i18n-placeholder="searchColors" placeholder="Search color by hex, English or Spanish"/>\r
    <div class="colors-dialog-list"></div>\r
  </dialog>\r
  <dialog class="kgm-modal preview-dialog">\r
    <div class="kgm-modal-head preview-dialog-head">\r
      <strong data-i18n="previewStrategyTitle">Paint preview</strong>\r
      <button\r
        class="modal-close close-preview"\r
        type="button"\r
        aria-label="Close"\r
        data-i18n-aria-label="close"\r
      >\r
        <i class="icon fa-solid fa-xmark" aria-hidden="true"></i>\r
      </button>\r
    </div>\r
    <p class="preview-dialog-help" data-i18n="previewStrategyHelp">\r
      Simple visual reference using the KGlacer logo.\r
    </p>\r
    <label class="strategy-row preview-strategy-row">\r
      <span data-i18n="previewStrategy">Preview strategy</span>:&nbsp;\r
      <span class="strategy-controls">\r
        <select class="preview-strategy-select kgm-select" data-i18n-aria-label="previewStrategy" aria-label="Preview strategy"></select>\r
      </span>\r
    </label>\r
    <div class="preview-dialog-list"></div>\r
  </dialog>\r
  <div class="resize n"></div>\r
  <div class="resize e"></div>\r
  <div class="resize s"></div>\r
  <div class="resize w"></div>\r
</div>\r
`;class q{bot;image;width;exactColor;static async fromJSON(o,a){let l=new Image;return l.src=a.url.startsWith("http")?await fetch(a.url,{cache:"no-store"}).then((i)=>i.blob()).then((i)=>URL.createObjectURL(i)):a.url,await Z(l,["load"],["error"]),new q(o,l,a.width,a.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,a,l=a.naturalWidth,i=!1){this.bot=o;this.image=a;this.width=l;this.exactColor=i;if(i)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let l=1;l<64;l++)o.set(T[l],[l,l]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>Array(this.canvas.width));let a=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let l=0;l<this.canvas.height;l++)for(let i=0;i<this.canvas.width;i++){let r=(l*this.canvas.width+i)*4,s=a[r],c=a[r+1],g=a[r+2],p=a[r+3],d=s,t=c,w=g,n=`${d},${t},${w}`;if(this.exactColor){this.pixels[l][i]=p<100?0:T.indexOf(n);continue}let b,h;if(p<100)b=h=0;else if(o.has(n))[b,h]=o.get(n);else{let u=1/0,m=1/0;for(let z=0;z<x.length;z++){let M=x[z],D=Ro(Xo(d,t,w),M,0);if(D<u)u=D,b=z;if(D<m)m=D,h=z}o.set(n,[b,h])}if(b!==0)this.context.fillStyle=`oklab(${x[b][0]*100}% ${x[b][1]} ${x[b][2]})`,this.context.fillRect(i,l,1,1);this.pixels[l][i]=b;let e=this.colors.get(h);if(e)e.amount++;else this.colors.set(h,{color:h,amount:1,realColor:h})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}function Ca(){let o=[G,...Zo];for(let a=0;a<o.length;a++){let l=o[a],i=localStorage.getItem(l);if(!i)continue;return{json:i,key:l}}return}function Oo(){let o=Ca();if(!o)return;let a;try{if(a=JSON.parse(o.json),typeof a!=="object")throw Error("NOT VALID SAVE");if(a.version===1){let l=a.widget;if(l)a.images=l.images,a.strategy=l.strategy,delete a.widget}if(o.key!==G)localStorage.setItem(G,o.json)}catch{localStorage.removeItem(o.key),a=void 0}return a}var Eo;function H(o,a=!1){if(clearTimeout(Eo),a)localStorage.setItem(G,JSON.stringify(o));else Eo=setTimeout(()=>{localStorage.setItem(G,JSON.stringify(o))},600)}var k=1000,La=2048,E=k*La,C=[],O=[],Ta=Date.now();function lo(o){C.push(o),O.push({id:Ta++,latitude:(2*Math.atan(Math.exp(-(o.y/E*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/E*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}lo({x:E/3|0,y:E/3|0});lo({x:E/3*2|0,y:E/3*2|0});function V(o){let[a,l]=o.style.transform.slice(32,-31).split(", ").map((i)=>Number.parseFloat(i));return{x:a,y:l}}class J{bot;static fromJSON(o,a){return new J(o,...a)}static fromScreenPosition(o,a){let{anchorScreenPosition:l,pixelSize:i,anchorWorldPosition:r}=o.findAnchorsForScreen(a);return new J(o,r.x+(a.x-l.x)/i|0,r.y+(a.y-l.y)/i|0)}globalX=0;globalY=0;get tileX(){return this.globalX/k|0}set tileX(o){this.globalX=o*k+this.x}get tileY(){return this.globalY/k|0}set tileY(o){this.globalY=o*k+this.y}get x(){return this.globalX%k}set x(o){this.globalX=this.tileX*k+o}get y(){return this.globalY%k}set y(o){this.globalY=this.tileY*k+o}anchor1Index;anchor2Index;get pixelSize(){return(V(this.bot.$stars[this.anchor2Index]).x-V(this.bot.$stars[this.anchor1Index]).x)/(C[this.anchor2Index].x-C[this.anchor1Index].x)}constructor(o,a,l,i,r){this.bot=o;if(i===void 0||r===void 0)this.globalX=a,this.globalY=l;else this.globalX=a*k+i,this.globalY=l*k+r;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,a=1/0;for(let l=0;l<C.length;l++){let{x:i,y:r}=C[l];if(i<this.globalX&&r<this.globalY){let s=this.globalX-i+(this.globalY-r);if(s<o)o=s,this.anchor1Index=l}else if(i>this.globalX&&r>this.globalY){let s=i-this.globalX+(r-this.globalY);if(s<a)a=s,this.anchor2Index=l}}}toScreenPosition(){let o=C[this.anchor1Index],a=V(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+a.x,y:(this.globalY-o.y)*this.pixelSize+a.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}setMapColor(o){let a=this.bot.mapsCache.get(this.tileX+"/"+this.tileY);if(!a)return;let l=a.pixels[this.y];if(!l)return;l[this.x]=o}scrollScreenTo(){let{x:o,y:a}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:a-window.innerHeight/3})}clone(){return new J(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}function xa(o){let a=[];for(let{x:l,y:i}of o.iterate){let r=o.pixels[i]?.[l]??0;if(o.disabledColors.has(r))continue;let s=o.readMapColor(l,i);if(r!==s&&(o.drawTransparentPixels||r!==0))a.push({x:l,y:i,color:r})}return a}class S extends ao{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;skipUnavailableColors;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(o,a){return new S(o,J.fromJSON(o,a.position),await q.fromJSON(o,a.pixels),a.strategy,a.opacity,a.drawTransparentPixels,a.drawColorsInOrder,a.skipUnavailableColors,a.colors,a.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$toggleAllColors;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$skipUnavailable;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$previewStrategySelect;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,a,l,i="SPIRAL_FROM_CENTER",r=50,s=!1,c=!1,g=!0,p=[],d=!1){super();this.bot=o;this.position=a;this.pixels=l;this.strategy=i;this.opacity=r;this.drawTransparentPixels=s;this.drawColorsInOrder=c;this.skipUnavailableColors=g;this.colors=p;this.lock=d;this.element.innerHTML=Yo,this.element.classList.add("wimage"),U(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$toggleAllColors:".toggle-all-colors",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$skipUnavailable:".skip-unavailable",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$previewStrategySelect:".preview-strategy-select",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,this.$previewStrategySelect.value=this.strategy,H(this.bot),this.trackAction("image_strategy_changed",{strategy:this.strategy})}),this.registerEvent(this.$previewStrategySelect,"change",()=>{this.$strategy.value=this.$previewStrategySelect.value,this.$strategy.dispatchEvent(new Event("change")),this.renderStrategyPreviewSamples(),this.trackAction("image_preview_strategy_changed",{strategy:this.$previewStrategySelect.value})}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),H(this.bot)}),this.registerEvent(this.$opacity,"change",()=>{this.trackAction("image_opacity_changed",{opacity:this.opacity})}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),H(this.bot),this.trackAction("image_size_reset",{width:this.pixels.width,height:this.pixels.height})}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,H(this.bot),this.trackAction("image_draw_transparent_changed",{enabled:this.drawTransparentPixels})}),this.registerEvent(this.$skipUnavailable,"click",()=>{this.skipUnavailableColors=this.$skipUnavailable.checked,this.updateTasks(),H(this.bot),this.trackAction("image_skip_unavailable_changed",{enabled:this.skipUnavailableColors})}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,H(this.bot),this.trackAction("image_draw_colors_in_order_changed",{enabled:this.drawColorsInOrder})}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),H(this.bot),this.trackAction("image_lock_changed",{locked:this.lock})}),this.registerEvent(this.$delete,"click",()=>{this.trackAction("image_deleted",{source:"image_panel"}),this.destroy()}),this.registerEvent(this.$openColors,"click",()=>{this.trackAction("image_colors_opened",{source:"image_panel"}),this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.trackAction("image_preview_opened",{source:"image_panel"}),this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.trackAction("image_colors_closed",{source:"image_panel"}),this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.trackAction("image_preview_closed",{source:"image_panel"}),this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(t)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(t.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(t)=>{if(t.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors(),this.trackAction("image_color_search_changed",{source:"image_panel",queryLength:this.$colorSearch.value.length})}),this.registerEvent(this.$toggleAllColors,"change",()=>{let t=!this.$toggleAllColors.checked;for(let w of this.colors)w.disabled=t||void 0;this.syncColorBulkToggle(),this.updateTasks(),this.updateColors(),H(this.bot),this.trackAction("image_all_colors_toggled",{source:"image_panel",enabled:!t})}),this.registerEvent(this.$export,"click",()=>{this.trackAction("image_exported",{source:"image_panel"}),this.export()}),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let t of this.element.querySelectorAll(".resize"))this.registerEvent(t,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}trackAction(o,a={}){this.bot.trackAction(o,{source:"image_panel",image:this.bot.summarizeImageForTelemetry(this),...a})}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,skipUnavailableColors:this.skipUnavailableColors,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),a=new Set,l=new Map;for(let r=0;r<this.colors.length;r++){let s=this.colors[r];if(s.disabled||this.skipUnavailableColors&&this.bot.unavailableColors.has(s.realColor))a.add(s.realColor);l.set(s.realColor,r)}let i=xa({pixels:this.pixels.pixels,drawTransparentPixels:this.drawTransparentPixels,disabledColors:a,iterate:this.strategyPositionIterator(),readMapColor:(r,s)=>{return o.globalX=this.position.globalX+r,o.globalY=this.position.globalY+s,o.getMapColor()}});for(let r=0;r<i.length;r++){let s=i[r];o.globalX=this.position.globalX+s.x,o.globalY=this.position.globalY+s.y,this.tasks.push({position:o.clone(),color:s.color})}if(this.drawColorsInOrder)this.tasks.sort((r,s)=>(l.get(r.color)??0)-(l.get(s.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:a}=this.position.toScreenPosition(),l=this.position.pixelSize*this.pixels.width,i=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${a.toFixed(3)}px, 0)`,this.element.style.width=`${l}px`,this.element.style.height=`${i}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder,this.$skipUnavailable.checked=this.skipUnavailableColors;let r=this.pixels.pixels.length*this.pixels.pixels[0].length,s=Math.max(0,r-this.tasks.length),c=r>0?s/r*100|0:0;this.$progressText.textContent=`${s}/${r} ${c}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${c/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let g of this.element.querySelectorAll(".resize"))g.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),zo(this.bot.images,this),this.bot.widget.update(),H(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.syncPreviewStrategySelect(),this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}syncPreviewStrategySelect(){if(!this.$previewStrategySelect.childElementCount){let o=document.createDocumentFragment();for(let a of this.$strategy.options){let l=document.createElement("option");l.value=a.value,l.textContent=a.textContent,o.append(l)}this.$previewStrategySelect.append(o)}this.$previewStrategySelect.value=this.strategy}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let l=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-l.left,offsetY:o.clientY-l.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let a=this.$colorsDialog.getBoundingClientRect(),l=Math.max(8,window.innerWidth-a.width-8),i=Math.max(8,window.innerHeight-a.height-8),r=Math.min(l,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),s=Math.min(i,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(r)}px`,this.$colorsDialog.style.top=`${Math.round(s)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let a=document.createDocumentFragment(),l=document.createElement("article");l.className="preview-card";let i=document.createElement("strong");i.textContent=this.getStrategyLabel(o);let r=document.createElement("canvas");r.className="preview-canvas",r.width=156,r.height=156,this.paintStrategyPreview(r,o),l.append(i,r),a.append(l),this.$previewDialogList.append(a)}invalidatePreviewCacheIfNeeded(){let o=this.colors.map((l,i)=>`${i}:${l.realColor}:${l.disabled?1:0}`).join("|"),a=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${o}`;if(this.previewCacheSignature===a)return;this.previewCacheSignature=a,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return f("random");case"HUMANIZED":return f("humanized");case"HUMAN_SOFT_DITHER":return f("humanSoftDither");case"HUMAN_PATCHY":return f("humanPatchy");case"HUMAN_SWEEP_ARCS":return f("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return f("humanMicroCorrections");case"HUMAN_JITTER_FILL":return f("humanJitterFill");case"HUMAN_CORNER_BIAS":return f("humanCornerBias");case"HUMAN_LONG_STROKES":return f("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return f("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return f("humanMessySpiral");case"HUMAN_DRUNK_WALK":return f("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return f("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return f("humanPatchJump");case"HUMAN_HESITANT_LINES":return f("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return f("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return f("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return f("humanGapRecovery");case"HUMAN_STAIRCASE":return f("humanStaircase");case"HUMAN_EDGE_HUGGER":return f("humanEdgeHugger");case"HUMAN_BLOBS":return f("humanBlobs");case"HUMAN_BACKTRACK":return f("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return f("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return f("humanLateFixes");case"ZIGZAG":return f("zigzag");case"BRUSH_STROKES":return f("brushStrokes");case"DIAGONAL_BRUSH":return f("diagonalBrush");case"DOWN":return f("down");case"UP":return f("up");case"LEFT":return f("left");case"RIGHT":return f("right");case"SPIRAL_FROM_CENTER":return f("spiralOut");case"SPIRAL_TO_CENTER":return f("spiralIn");case"SCRIBBLE":return f("scribble");case"CROSSHATCH":return f("crosshatch");case"WAVE_SWEEP":return f("waveSweep");case"SCATTERED_LINES":return f("scatteredLines");case"CONTOUR_JITTER":return f("contourJitter");case"SPIRAL_WOBBLE":return f("spiralWobble");case"CLUSTER_BURSTS":return f("clusterBursts");case"ORBITAL":return f("orbital");case"FLOW_FIELD":return f("flowField");case"EDGE_IN":return f("edgeIn");default:return o}}paintStrategyPreview(o,a){let l=o.getContext("2d");if(!l)return;l.fillStyle="#0f1526",l.fillRect(0,0,o.width,o.height);let i=this.getSampledImagePreviewData(),r=this.getCachedPreviewSequence(a,i.mask,i.width,i.height),s=Math.min(o.width/i.width,o.height/i.height),c=(o.width-i.width*s)/2,g=(o.height-i.height*s)/2,p=this.previewAnimations.get(o);if(p)cancelAnimationFrame(p),this.previewAnimationHandles.delete(p);let d=(u)=>{let m=requestAnimationFrame((z)=>{this.previewAnimationHandles.delete(m),u(z)});return this.previewAnimationHandles.add(m),m},t=(u)=>{l.fillStyle="#0f1526",l.fillRect(0,0,o.width,o.height);for(let m=0;m<Math.min(u,r.length);m++){let z=r[m],M=i.colors.get(`${z.x}:${z.y}`)??0;if(!M)continue;l.fillStyle=ko(M),l.fillRect(c+z.x*s,g+z.y*s,Math.max(1,s),Math.max(1,s))}},w=Math.min(3400,Math.max(900,r.length*8)),b=w+220,h=(u,m)=>{if(!this.$previewDialog.open)return;let z=(m-u)%b,M=Math.min(1,z/w),D=M*M*(3-2*M);t(Math.floor(r.length*D));let P=d((N)=>{h(u,N)});this.previewAnimations.set(o,P)},e=performance.now();h(e,e)}getCachedPreviewSequence(o,a,l=this.pixels.width,i=this.pixels.height){let r=this.colors.map((p,d)=>`${d}:${p.realColor}:${p.disabled?1:0}`).join("|"),s=`${o}:${l}x${i}:${a.length}:${this.drawColorsInOrder?1:0}:${r}`,c=this.previewSequenceCache.get(s);if(c)return c;let g=l===this.pixels.width&&i===this.pixels.height?this.getExactPreviewSequence(o,a):this.getApproxPreviewSequence(o,a,l);if(this.drawColorsInOrder){let p=new Map;for(let d=0;d<this.colors.length;d++)p.set(this.colors[d].realColor,d);g.sort((d,t)=>(p.get(this.pixels.pixels[d.y]?.[d.x]??0)??0)-(p.get(this.pixels.pixels[t.y]?.[t.x]??0)??0))}return this.previewSequenceCache.set(s,g),g}getExactPreviewSequence(o,a){let l=this.strategy;this.strategy=o;let i=[...this.strategyPositionIterator()];this.strategy=l;let r=new Set(a.map(({x:s,y:c})=>`${s}:${c}`));return i.filter(({x:s,y:c})=>r.has(`${s}:${c}`))}getApproxPreviewSequence(o,a,l){let i=[...a],r=(g,p,d)=>{return(g*73856093+p*19349663+d*83492791>>>0)/4294967296},s=(g,p)=>i.sort((d,t)=>d.x*g+d.y*p-(t.x*g+t.y*p)||d.y-t.y||d.x-t.x),c=i.sort((g,p)=>{if(g.y!==p.y)return g.y-p.y;let d=g.y%2===0?g.x:l-g.x,t=p.y%2===0?p.x:l-p.x;return d-t});switch(o){case"UP":return s(0,-1);case"LEFT":return s(-1,0);case"RIGHT":return s(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let g=l/2,p=Math.max(1,Math.round(i.reduce((d,t)=>d+t.y,0)/Math.max(1,i.length)));return i.sort((d,t)=>{let w=(d.x-g)**2+(d.y-p)**2,n=(t.x-g)**2+(t.y-p)**2;return o==="SPIRAL_FROM_CENTER"?w-n:n-w}),i}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return i.sort((g,p)=>r(g.x,g.y,o.length)-r(p.x,p.y,o.length));default:return c}}getSampledImagePreviewData(){let o=this.pixels.width,a=this.pixels.height,l=S.PREVIEW_MASK_BASE_WIDTH,i=S.PREVIEW_MASK_BASE_HEIGHT,r=Math.min(1,l/Math.max(1,o),i/Math.max(1,a)),s=Math.max(1,Math.round(o*r)),c=Math.max(1,Math.round(a*r)),g=new Set;for(let w=0;w<this.colors.length;w++){let n=this.colors[w];if(n.disabled)g.add(n.realColor)}let p=new Map,d=new Map;for(let w=0;w<a;w++)for(let n=0;n<o;n++){let b=this.pixels.pixels[w]?.[n]??0;if(!b||g.has(b))continue;let h=Math.min(s-1,Math.floor(n/o*s)),e=Math.min(c-1,Math.floor(w/a*c)),u=`${h}:${e}`;if(!p.has(u))p.set(u,{x:h,y:e});if(!d.has(u))d.set(u,b)}let t=[...p.values()];if(!t.length){let w=this.fallbackPreviewMask();return{width:o,height:a,mask:w,colors:new Map(w.map((n)=>[`${n.x}:${n.y}`,this.pixels.pixels[n.y]?.[n.x]??0]))}}return{width:s,height:c,mask:t,colors:d}}getImagePreviewMask(){let o=this.pixels.width,a=this.pixels.height,l=new Set;for(let r=0;r<this.colors.length;r++){let s=this.colors[r];if(s.disabled)l.add(s.realColor)}let i=[];for(let r=0;r<a;r++)for(let s=0;s<o;s++){let c=this.pixels.pixels[r]?.[s]??0;if(c!==0&&!l.has(c))i.push({x:s,y:r})}return i.length?i:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],a=this.pixels.width/2,l=this.pixels.height/2,i=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let r=0;r<this.pixels.height;r++)for(let s=0;s<this.pixels.width;s++)if((s-a)**2+(r-l)**2<=i**2)o.push({x:s,y:r});return o}applyLocale(){if(U(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let a=T[o]??"0,0,0",[l=0,i=0,r=0]=a.split(",").map((s)=>Number.parseInt(s,10));return`#${[l,i,r].map((s)=>s.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let a=T[o]??"0,0,0",[l=0,i=0,r=0]=a.split(",").map((p)=>Number.parseInt(p,10)),s=Math.max(l,i,r),c=Math.min(l,i,r);if(s-c<15)return["gray","grey","gris","neutral","neutro"];if(l>i+30&&l>r+30)return["red","rojo"];if(i>l+30&&i>r+30)return["green","verde"];if(r>l+30&&r>i+30)return["blue","azul"];if(l>170&&i>120&&r<130)return["orange","naranja"];if(l>170&&i>110&&r>140)return["pink","rosa"];if(l>120&&i<100&&r>120)return["purple","violet","morado"];if(l>130&&i>130&&r<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",f("colorPanelResults"));let a=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((l)=>!this.pixels.colors.has(l.realColor))){let l=new Map(this.colors.map((i)=>[i.realColor,i]));this.colors=this.pixels.colors.values().toArray().sort((i,r)=>r.amount-i.amount).map((i)=>({realColor:i.realColor,disabled:l.get(i.realColor)?.disabled})),H(this.bot)}this.syncColorBulkToggle();for(let l=0;l<this.colors.length;l++){let i=this.colors[l],r=this.pixels.colors.get(i.realColor),s=!1,c=r.amount/o*100,g=this.colorHex(r.realColor),p=this.colorKeywords(r.realColor),d=this.bot.unavailableColors.has(i.realColor),t=Boolean(i.disabled)||this.skipUnavailableColors&&d,w=()=>{if(this.skipUnavailableColors&&d)return;i.disabled=i.disabled?void 0:!0,n.classList.toggle("disabled",Boolean(i.disabled));let e=n.querySelector(".state");if(e)e.textContent=i.disabled||this.skipUnavailableColors&&d?f("disabled"):f("enabled");this.syncColorBulkToggle(),H(this.bot),this.trackAction("image_color_toggled",{source:"image_panel",color:i.realColor,disabled:Boolean(i.disabled),unavailable:d})},n=document.createElement("button");n.className=`color-chip ${t?"disabled":""}`,n.draggable=!0,n.setAttribute("aria-label",`${f("overlayColors")} #${l+1}: ${g.toUpperCase()}`),n.innerHTML=`<span class="order-index">#${l+1}</span>
<span class="drag" title="${f("up")} / ${f("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${c.toFixed(1)}%</span>
  <span class="hex">${g.toUpperCase()}</span>
  <span class="state">${t?f("disabled"):f("enabled")}</span>
</span>
<span class="premium"></span>`,n.querySelector(".swatch").style.setProperty("--swatch-color",ko(r.realColor)),n.addEventListener("click",()=>{if(s){s=!1;return}w(),this.updateTasks()}),n.addEventListener("dragstart",(e)=>{s=!0,n.classList.add("dragging"),e.dataTransfer?.setData("text/plain",String(l)),e.dataTransfer.effectAllowed="move"}),n.addEventListener("dragend",()=>{n.classList.remove("dragging")}),n.addEventListener("dragover",(e)=>{e.preventDefault(),n.classList.add("drag-target")}),n.addEventListener("dragleave",()=>{n.classList.remove("drag-target")}),n.addEventListener("drop",(e)=>{e.preventDefault(),n.classList.remove("drag-target");let u=Number.parseInt(e.dataTransfer?.getData("text/plain")??"-1",10);if(u<0||u===l||u>=this.colors.length)return;this.colors.splice(l,0,...this.colors.splice(u,1)),H(this.bot),this.trackAction("image_color_reordered",{source:"image_panel",fromIndex:u,toIndex:l,color:i.realColor}),this.updateColors()});let b=document.createElement("button");b.textContent=f("buy"),b.className="buy-chip",b.addEventListener("click",(e)=>{e.stopPropagation(),this.trackAction("image_color_buy_clicked",{source:"image_panel",color:r.realColor}),document.getElementById("color-"+r.realColor)?.click()}),n.append(b);let h=`${g} ${p.join(" ")} ${r.realColor} ${T[r.realColor]}`;if(!a||h.toLowerCase().includes(a))this.$colorsDialogList.append(n)}}syncColorBulkToggle(){let o=this.colors.filter((l)=>!l.disabled).length,a=o===this.colors.length;this.$toggleAllColors.checked=a,this.$toggleAllColors.indeterminate=o>0&&!a}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,a=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let l=0;l<a;l++)for(let i=0;i<o;i++)yield{x:i,y:l};break}case"UP":{for(let l=a-1;l>=0;l--)for(let i=0;i<o;i++)yield{x:i,y:l};break}case"LEFT":{for(let l=0;l<o;l++)for(let i=0;i<a;i++)yield{x:l,y:i};break}case"RIGHT":{for(let l=o-1;l>=0;l--)for(let i=0;i<a;i++)yield{x:l,y:i};break}case"RANDOM":{let l=[];for(let i=0;i<a;i++)for(let r=0;r<o;r++)l.push({x:r,y:i});for(let i=l.length-1;i>=0;i--){let r=Math.floor(Math.random()*(i+1)),s=l[i];l[i]=l[r],l[r]=s}yield*l;break}case"ZIGZAG":{for(let l=0;l<a;l++)if(l%2===0)for(let i=0;i<o;i++)yield{x:i,y:l};else for(let i=o-1;i>=0;i--)yield{x:i,y:l};break}case"HUMANIZED":{let l=Math.max(4,Math.floor(Math.min(o,a)/10)),i=[];for(let r=0;r<a;r+=l)for(let s=0;s<o;s+=l)i.push({x:s,y:r});for(let r=i.length-1;r>=0;r--){let s=Math.floor(Math.random()*(r+1)),c=i[r];i[r]=i[s],i[s]=c}for(let r=0;r<i.length;r++){let s=i[r],c=Math.min(a,s.y+l),g=Math.min(o,s.x+l);for(let p=s.y;p<c;p++)if(Math.random()>0.35)for(let t=s.x;t<g;t++)yield{x:t,y:p};else for(let t=g-1;t>=s.x;t--)yield{x:t,y:p}}break}case"HUMAN_SOFT_DITHER":{let l=new Set;for(let i=0;i<a;i++){let r=Math.floor(Math.random()*3)-1;if((i+r)%2===0)for(let c=0;c<o;c+=2)l.add(`${c},${i}`),yield{x:c,y:i};else for(let c=1;c<o;c+=2)l.add(`${c},${i}`),yield{x:c,y:i}}for(let i=0;i<a;i++)for(let r=0;r<o;r++){let s=`${r},${i}`;if(l.has(s))continue;yield{x:r,y:i}}break}case"HUMAN_PATCHY":{let l=new Set,i=o*a;while(l.size<i){let r=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a),c=1+Math.floor(Math.random()*5);for(let g=s-c;g<=s+c;g++)for(let p=r-c;p<=r+c;p++){if(p<0||p>=o||g<0||g>=a)continue;if(Math.hypot(p-r,g-s)>c+Math.random()*1.2)continue;let d=`${p},${g}`;if(l.has(d))continue;l.add(d),yield{x:p,y:g}}}break}case"HUMAN_SWEEP_ARCS":{let l=new Set,i=(o-1)/2,r=(a-1)/2,s=Math.hypot(i,r);for(let c=0;c<4;c++){let g=Math.random()*Math.PI*2;for(let p=0;p<=s;p+=0.35){let d=Math.PI/2+Math.random()*(Math.PI/1.5),t=Math.max(10,Math.floor(p*8));for(let w=0;w<t;w++){let n=g+d*w/t+Math.sin(p)*0.08,b=Math.round(i+Math.cos(n)*p),h=Math.round(r+Math.sin(n)*p);if(b<0||b>=o||h<0||h>=a)continue;let e=`${b},${h}`;if(l.has(e))continue;l.add(e),yield{x:b,y:h}}}}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let p=`${g},${c}`;if(l.has(p))continue;yield{x:g,y:c}}break}case"HUMAN_MICRO_CORRECTIONS":{let l=new Set;for(let i=0;i<a;i++){let r=i%2===0?1:-1,s=r>0?0:o-1;for(let c=0;c<o;c++){let g=s+(Math.random()>0.82?r:0),p=i+(Math.random()>0.9?1:0);for(let d of[{x:s,y:i},{x:g,y:i},{x:s,y:p}]){if(d.x<0||d.x>=o||d.y<0||d.y>=a)continue;let t=`${d.x},${d.y}`;if(l.has(t))continue;l.add(t),yield d}s+=r}}for(let i=0;i<a;i++)for(let r=0;r<o;r++){let s=`${r},${i}`;if(l.has(s))continue;yield{x:r,y:i}}break}case"HUMAN_JITTER_FILL":{let l=[];for(let i=0;i<a;i++)for(let r=0;r<o;r++)l.push({x:r,y:i});l.sort((i,r)=>{let s=i.y+(Math.random()-0.5)*1.8,c=r.y+(Math.random()-0.5)*1.8;if(s!==c)return s-c;return i.x+(Math.random()-0.5)*2-(r.x+(Math.random()-0.5)*2)}),yield*l;break}case"HUMAN_CORNER_BIAS":{let l=[{x:0,y:0},{x:o-1,y:0},{x:0,y:a-1},{x:o-1,y:a-1}],i=l[Math.floor(Math.random()*l.length)],r=[];for(let s=0;s<a;s++)for(let c=0;c<o;c++){let p=Math.hypot(c-i.x,s-i.y)+Math.random()*3.5;r.push({point:{x:c,y:s},score:p})}r.sort((s,c)=>s.score-c.score);for(let s of r)yield s.point;break}case"HUMAN_LONG_STROKES":{let l=new Set,i=o*a;while(l.size<i){let r=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a),c=Math.random()*Math.PI*2,g=Math.sign(Math.cos(c)),p=Math.sign(Math.sin(c)),d=10+Math.floor(Math.random()*40);for(let t=0;t<d;t++){if(r<0||r>=o||s<0||s>=a)break;let w=`${r},${s}`;if(!l.has(w))l.add(w),yield{x:r,y:s};if(Math.random()>0.78)r+=p,s+=g;else r+=g,s+=p}}break}case"HUMAN_TAP_CLUSTERS":{let l=new Set,i=o*a;while(l.size<i){let r=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a),c=3+Math.floor(Math.random()*10);for(let g=0;g<c;g++){let p=Math.round(r+(Math.random()-0.5)*6),d=Math.round(s+(Math.random()-0.5)*6);if(p<0||p>=o||d<0||d>=a)continue;let t=`${p},${d}`;if(l.has(t))continue;l.add(t),yield{x:p,y:d}}}break}case"HUMAN_MESSY_SPIRAL":{let l=new Set,i=(o-1)/2,r=(a-1)/2,s=Math.hypot(i,r)+2;for(let c=0;l.size<o*a;c++){let g=c/3,p=Math.min(s,g*0.18),d=g*0.29+Math.sin(g*0.13)*0.8,t=Math.round(i+Math.cos(d)*p+Math.sin(g)*0.7),w=Math.round(r+Math.sin(d)*p+Math.cos(g)*0.7);if(t<0||t>=o||w<0||w>=a){if(c>o*a*18)break;continue}let n=`${t},${w}`;if(l.has(n)){if(Math.random()>0.9)continue}else l.add(n),yield{x:t,y:w};if(c>o*a*18)break}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let p=`${g},${c}`;if(l.has(p))continue;yield{x:g,y:c}}break}case"HUMAN_DRUNK_WALK":{let l=new Set,i=Math.floor(Math.random()*o),r=Math.floor(Math.random()*a),s=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(l.size<o*a){let c=`${i},${r}`;if(!l.has(c))l.add(c),yield{x:i,y:r};let g=[];for(let t of s){let w=i+t.x,n=r+t.y;if(w<0||w>=o||n<0||n>=a)continue;g.push({x:w,y:n})}if(!g.length)break;let p=g.filter((t)=>{return!l.has(`${t.x},${t.y}`)});if(p.length&&Math.random()>0.2){let t=p[Math.floor(Math.random()*p.length)];i=t.x,r=t.y;continue}let d=g[Math.floor(Math.random()*g.length)];i=d.x,r=d.y}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let p=`${g},${c}`;if(l.has(p))continue;yield{x:g,y:c}}break}case"HUMAN_NOISE_CLOUD":{let l=[];for(let i=0;i<a;i++)for(let r=0;r<o;r++){let s=Math.sin((r+1)*0.93+Math.random()*0.8)+Math.cos((i+1)*1.17+Math.random()*0.8),c=(Math.random()-0.5)*2.6,g=Math.hypot(r-o/2,i-a/2)*0.08;l.push({point:{x:r,y:i},score:s+c+g})}l.sort((i,r)=>i.score-r.score);for(let i of l)yield i.point;break}case"HUMAN_PATCH_JUMP":{let l=new Set,i=[];for(let r=0;r<Math.max(6,o*a/18);r++)i.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*a)});while(l.size<o*a){let r=i[Math.floor(Math.random()*i.length)],s=1+Math.floor(Math.random()*3),c=1+Math.floor(Math.random()*3);for(let g=r.y-c;g<=r.y+c;g++)for(let p=r.x-s;p<=r.x+s;p++){if(p<0||p>=o||g<0||g>=a)continue;if(Math.random()>0.86)continue;let d=`${p},${g}`;if(l.has(d))continue;l.add(d),yield{x:p,y:g}}if(Math.random()>0.72&&i.length<o*a/2)i.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*a)});if(l.size>o*a*0.92)break}for(let r=0;r<a;r++)for(let s=0;s<o;s++){let c=`${s},${r}`;if(l.has(c))continue;yield{x:s,y:r}}break}case"HUMAN_HESITANT_LINES":{let l=new Set;for(let i=0;i<a;i++){let r=i%2===0;for(let s=0;s<o;s++){let c=r?s:o-1-s,g=`${c},${i}`;if(!l.has(g))l.add(g),yield{x:c,y:i};if(Math.random()>0.7){let p=Math.max(0,Math.min(o-1,c+(Math.random()>0.5?1:-1))),d=Math.max(0,Math.min(a-1,i+(Math.random()>0.65?1:0))),t=`${p},${d}`;if(!l.has(t))l.add(t),yield{x:p,y:d}}}}for(let i=0;i<a;i++)for(let r=0;r<o;r++){let s=`${r},${i}`;if(l.has(s))continue;yield{x:r,y:i}}break}case"HUMAN_OVERLAP_SWEEPS":{let l=[],i=Math.random()*Math.PI*2;for(let r=0;r<a;r++)for(let s=0;s<o;s++){let c=Math.sin((s+r)*0.42+i)*2.2,g=Math.cos((s-r)*0.3+i)*1.4;l.push({point:{x:s,y:r},score:r+c+g+(Math.random()-0.5)*3.4})}l.sort((r,s)=>r.score-s.score);for(let r of l)yield r.point;break}case"HUMAN_WOBBLE_DRIFT":{let l=[],i=o/2,r=a/2;for(let s=0;s<a;s++)for(let c=0;c<o;c++){let g=Math.hypot(c-i,s-r)*0.25,p=Math.sin((c+1)*0.9)*1.8+Math.cos((s+1)*1.1)*1.8+Math.sin((c+s)*0.35)*1.4;l.push({point:{x:c,y:s},score:g+p+(Math.random()-0.5)*2.8})}l.sort((s,c)=>s.score-c.score);for(let s of l)yield s.point;break}case"HUMAN_GAP_RECOVERY":{let l=new Set,i=[];for(let r=0;r<a;r++)for(let s=0;s<o;s++){if(Math.random()>0.87){i.push({x:s,y:r});continue}l.add(`${s},${r}`),yield{x:s,y:r}}i.sort((r,s)=>Math.hypot(r.x-o/2,r.y-a/2)-Math.hypot(s.x-o/2,s.y-a/2));for(let r of i){let s=`${r.x},${r.y}`;if(l.has(s))continue;l.add(s),yield r}break}case"HUMAN_STAIRCASE":{let l=new Set,i=o+a-1;for(let r=0;r<i;r++){let s=Math.max(0,r-o+1),c=Math.min(a-1,r);for(let g=s;g<=c;g++){let p=r-g,d=[{x:p,y:g},{x:p+(Math.random()>0.5?1:-1),y:g},{x:p,y:g+(Math.random()>0.5?1:-1)}];for(let t of d){if(t.x<0||t.x>=o||t.y<0||t.y>=a)continue;let w=`${t.x},${t.y}`;if(l.has(w))continue;l.add(w),yield t}}}for(let r=0;r<a;r++)for(let s=0;s<o;s++){let c=`${s},${r}`;if(l.has(c))continue;yield{x:s,y:r}}break}case"HUMAN_EDGE_HUGGER":{let l=[];for(let i=0;i<a;i++)for(let r=0;r<o;r++){let s=Math.min(r,i,o-1-r,a-1-i);l.push({point:{x:r,y:i},score:s*3.5+(Math.random()-0.5)*5.5})}l.sort((i,r)=>i.score-r.score);for(let i of l)yield i.point;break}case"HUMAN_BLOBS":{let l=new Set,i=o*a;while(l.size<i){let r=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a),c=1+Math.floor(Math.random()*4);for(let g=s-c;g<=s+c;g++)for(let p=r-c;p<=r+c;p++){if(p<0||p>=o||g<0||g>=a)continue;let d=Math.atan2(g-s,p-r),t=c+Math.sin(d*3+Math.random())*0.8;if(Math.hypot(p-r,g-s)>t)continue;let w=`${p},${g}`;if(l.has(w))continue;l.add(w),yield{x:p,y:g}}}break}case"HUMAN_BACKTRACK":{let l=new Set,i=[];for(let r=0;r<a;r++)for(let s=0;s<o;s++)i.push({x:s,y:r});i.sort((r,s)=>r.y-s.y+(Math.random()-0.5)*2.2+(r.x-s.x)*0.04);for(let r=0;r<i.length;r++){let s=i[r],c=`${s.x},${s.y}`;if(l.has(c))continue;if(l.add(c),yield s,r>1&&Math.random()>0.74){let g=i[r-1],p=`${g.x},${g.y}`;if(!l.has(p))l.add(p),yield g}}for(let r=0;r<a;r++)for(let s=0;s<o;s++){let c=`${s},${r}`;if(l.has(c))continue;yield{x:s,y:r}}break}case"HUMAN_SHAKY_DIAGONAL":{let l=[];for(let i=0;i<a;i++)for(let r=0;r<o;r++){let s=Math.abs(r-i)*0.6,c=Math.sin(r*1.4+i*0.8)*1.8+Math.cos(i*1.1+r*0.5)*1.5;l.push({point:{x:r,y:i},score:s+c+(Math.random()-0.5)*3.2})}l.sort((i,r)=>i.score-r.score);for(let i of l)yield i.point;break}case"HUMAN_LATE_FIXES":{let l=[],i=[];for(let r=0;r<a;r++)for(let s=0;s<o;s++)if(Math.random()>0.9)i.push({x:s,y:r});else l.push({x:s,y:r});l.sort((r,s)=>r.y-s.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?r.x-s.x:0)),i.sort((r,s)=>Math.hypot(s.x-o/2,s.y-a/2)-Math.hypot(r.x-o/2,r.y-a/2)),yield*l,yield*i;break}case"DIAGONAL_BRUSH":{for(let l=0;l<o+a-1;l++){let i=l%2===0,r=[],s=Math.max(0,l-o+1),c=Math.min(a-1,l);for(let g=s;g<=c;g++){let p=l-g;if(p>=0&&p<o)r.push({x:p,y:g})}if(Math.random()>0.55)r.reverse();if(i)for(let g=r.length-1;g>=0;g--)yield r[g];else yield*r}break}case"BRUSH_STROKES":{let l=Array.from({length:a},()=>Array(o).fill(!1)),i=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],r=(g,p)=>g>=0&&g<o&&p>=0&&p<a,s=0,c=o*a;for(let g=0;g<c*6&&s<c;g++){let p=Math.floor(Math.random()*o),d=Math.floor(Math.random()*a),t=i[Math.floor(Math.random()*i.length)],w=3+Math.floor(Math.random()*16);for(let n=0;n<w;n++){if(!r(p,d))break;if(!l[d][p])l[d][p]=!0,s++,yield{x:p,y:d};if(Math.random()>0.72)t=i[Math.floor(Math.random()*i.length)];p+=t.x,d+=t.y}}for(let g=0;g<a;g++)for(let p=0;p<o;p++)if(!l[g][p])yield{x:p,y:g};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let l=new Set,i=o*a,r=Math.floor(o/2),s=Math.floor(a/2),c=[[1,0],[0,1],[-1,0],[0,-1]],g=0,p=1,d=(w,n)=>w>=0&&w<o&&n>=0&&n<a,t=function*(){let w=0;while(w<i){for(let n=0;n<2;n++){for(let b=0;b<p;b++){if(d(r,s)){let h=`${r},${s}`;if(!l.has(h)){if(l.add(h),yield{x:r,y:s},w++,w>=i)return}}r+=c[g][0],s+=c[g][1]}g=(g+1)%4}p++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*t();else{let w=[...t()];for(let n=w.length-1;n>=0;n--)yield w[n]}break}case"SCRIBBLE":{let l=new Set,i=o*a,r=Math.floor(o/2),s=Math.floor(a/2);for(let c=0;l.size<i&&c<i*24;c++){let g=`${r},${s}`;if(!l.has(g))l.add(g),yield{x:r,y:s};if(r+=Math.floor(Math.random()*3)-1,s+=Math.floor(Math.random()*3)-1,r<0||r>=o||s<0||s>=a)r=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a)}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let p=`${g},${c}`;if(l.has(p))continue;l.add(p),yield{x:g,y:c}}break}case"CROSSHATCH":{let l=[];for(let s=0;s<o+a-1;s++)for(let c=Math.max(0,s-o+1);c<=Math.min(a-1,s);c++){let g=s-c;l.push({x:g,y:c})}let i=[];for(let s=-a+1;s<o;s++)for(let c=0;c<a;c++){let g=c+s;if(g>=0&&g<o)i.push({x:g,y:c})}let r=new Set;for(let s of[...l,...i]){let c=`${s.x},${s.y}`;if(r.has(c))continue;r.add(c),yield s}break}case"WAVE_SWEEP":{let l=new Set;for(let i=0;i<o;i++){let s=(Math.sin(i/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(a-1)|0;for(let c=0;c<a;c++){let g=s+c,p=s-c;for(let d of[g,p]){if(d<0||d>=a)continue;let t=`${i},${d}`;if(l.has(t))continue;l.add(t),yield{x:i,y:d}}}}break}case"SCATTERED_LINES":{let l=new Set,i=o*a;for(let r=0;l.size<i&&r<i*14;r++){let s=Math.floor(Math.random()*o),c=Math.floor(Math.random()*a),g=Math.random()*Math.PI*2,p=Math.round(Math.cos(g)),d=Math.round(Math.sin(g)),t=6+Math.floor(Math.random()*28);for(let w=0;w<t;w++){if(s<0||s>=o||c<0||c>=a)break;let n=`${s},${c}`;if(!l.has(n))l.add(n),yield{x:s,y:c};s+=p,c+=d}}for(let r=0;r<a;r++)for(let s=0;s<o;s++){let c=`${s},${r}`;if(l.has(c))continue;l.add(c),yield{x:s,y:r}}break}case"CONTOUR_JITTER":{let l=new Set;for(let i=0;i<Math.ceil(Math.min(o,a)/2);i++){let r=[],s=i,c=i,g=o-i-1,p=a-i-1;for(let d=s;d<=g;d++)r.push({x:d,y:c});for(let d=c+1;d<=p;d++)r.push({x:g,y:d});for(let d=g-1;d>=s;d--)r.push({x:d,y:p});for(let d=p-1;d>c;d--)r.push({x:s,y:d});for(let d=r.length-1;d>0;d--){let t=Math.floor(Math.random()*(d+1)),w=r[d];r[d]=r[t],r[t]=w}for(let d of r){let t=`${d.x},${d.y}`;if(l.has(t))continue;l.add(t),yield d}}break}case"SPIRAL_WOBBLE":{let l=new Set,i=o/2,r=a/2,s=Math.hypot(i,r);for(let c=0;l.size<o*a&&c<o*a*9;c++){let g=c/(o*a*9)*s,p=c*0.31+Math.sin(c*0.07)*0.7,d=Math.round(i+Math.cos(p)*g),t=Math.round(r+Math.sin(p)*g);if(d<0||d>=o||t<0||t>=a)continue;let w=`${d},${t}`;if(l.has(w))continue;l.add(w),yield{x:d,y:t}}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let p=`${g},${c}`;if(l.has(p))continue;yield{x:g,y:c}}break}case"CLUSTER_BURSTS":{let l=new Set,i=o*a;for(let r=0;l.size<i&&r<i*12;r++){let s=Math.floor(Math.random()*o),c=Math.floor(Math.random()*a),g=2+Math.floor(Math.random()*10);for(let p=c-g;p<=c+g;p++)for(let d=s-g;d<=s+g;d++){if(d<0||d>=o||p<0||p>=a)continue;if(Math.hypot(d-s,p-c)>g)continue;let t=`${d},${p}`;if(l.has(t))continue;l.add(t),yield{x:d,y:p}}}for(let r=0;r<a;r++)for(let s=0;s<o;s++){let c=`${s},${r}`;if(l.has(c))continue;l.add(c),yield{x:s,y:r}}break}case"ORBITAL":{let l=new Set,i=(o-1)/2,r=(a-1)/2,s=Math.ceil(Math.max(i,r));for(let c=0;c<=s;c++){let g=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,c)*2));for(let p=0;p<g;p++){let d=p/g*Math.PI*2+(c%2?0.3:-0.3),t=Math.round(i+Math.cos(d)*c),w=Math.round(r+Math.sin(d)*c);if(t<0||t>=o||w<0||w>=a)continue;let n=`${t},${w}`;if(l.has(n))continue;l.add(n),yield{x:t,y:w}}}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let p=`${g},${c}`;if(l.has(p))continue;yield{x:g,y:c}}break}case"FLOW_FIELD":{let l=new Set,i=o*a;for(let r=0;l.size<i&&r<i*18;r++){let s=Math.floor(Math.random()*o),c=Math.floor(Math.random()*a);for(let g=0;g<120;g++){if(s<0||s>=o||c<0||c>=a)break;let p=`${s},${c}`;if(!l.has(p))l.add(p),yield{x:s,y:c};let d=Math.sin(s*0.09)*1.8+Math.cos(c*0.08)*1.6+Math.sin((s+c)*0.05);s+=Math.round(Math.cos(d)),c+=Math.round(Math.sin(d))}}for(let r=0;r<a;r++)for(let s=0;s<o;s++){let c=`${s},${r}`;if(l.has(c))continue;l.add(c),yield{x:s,y:r}}break}case"EDGE_IN":{let l=new Set,i=Math.ceil(Math.min(o,a)/2);for(let r=0;r<i;r++){let s=r,c=o-1-r,g=r,p=a-1-r;for(let d=s;d<=c;d++)for(let t of[g,p]){let w=`${d},${t}`;if(l.has(w))continue;l.add(w),yield{x:d,y:t}}for(let d=g+1;d<=p-1;d++)for(let t of[s,c]){let w=`${t},${d}`;if(l.has(w))continue;l.add(w),yield{x:t,y:d}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY},this.trackAction("image_move_started",{source:"image_panel",screenPosition:{x:o.clientX,y:o.clientY}})}moveStop(){if(this.moveInfo){let o=this.moveInfo,a=o.width!==void 0||o.height!==void 0?"resize":"move";this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),H(this.bot),this.trackAction(a==="resize"?"image_resized":"image_moved",{source:"image_panel",mode:a,previous:{globalX:o.globalX,globalY:o.globalY,width:o.width,height:o.height}})}}move(o){if(!this.moveInfo)return;let a=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),l=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=a+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-a)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,a+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=l+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-l)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,l+this.moveInfo.height);this.update(),H(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let a=o.target;if(a.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(a.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(a.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(a.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX;this.trackAction("image_resize_started",{source:"image_panel",handles:Array.from(a.classList).filter((l)=>["n","e","s","w"].includes(l)),width:this.pixels.width,height:this.pixels.height,screenPosition:{x:o.clientX,y:o.clientY}})}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${_}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}function Do(){let o=localStorage.getItem("kglacer-macro:shield-config");if(!o)return!1;try{return JSON.parse(o).enabled!==!1}catch{return!1}}function Io(o){localStorage.setItem("kglacer-macro:shield-config",JSON.stringify({enabled:o}))}function Va(o){let a=`${o?.host??""} ${o?.username??""}`.toLowerCase(),l=/(mx|mex|mexico)/.test(a)?"MX":"AUTO";localStorage.setItem("__afm_proxy_hint",l)}function _o(o){if(!Do())return;if(document.getElementById("kgm-shield-full"))return;Va(o);let a=document.createElement("script");a.id="kgm-shield-full",a.textContent=`// ==UserScript==
// @name         Anti-Fingerprint Merged Shield
// @namespace    https://chatgpt.local/anti-fingerprint-merged-shield
// @version      1.1.0
// @description  Combined anti-fingerprinting userscript with stable realistic profiles, safer API spoofing, Canvas/WebGL/Audio noise, modern UI, and English JSDoc comments.
// @author       Combined from Anti-Fingerprinting Shield Plus + No Fingerprint
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @noframes     false
// @license      MIT OR Unlicense
// ==/UserScript==

/**
 * Injects the anti-fingerprinting shield into the page context so patched Web APIs are visible
 * to page scripts instead of only to the userscript sandbox.
 *
 * @returns {void}
 */
(function injectAntiFingerprintMergedShield() {
    "use strict";

    const pageScript = document.createElement("script");

    pageScript.textContent = "(" + function antiFingerprintMergedShieldPageContext() {
        "use strict";

        /**
         * Describes a realistic browser fingerprint profile used as a consistent spoofing target.
         *
         * @typedef {Object} BrowserProfile
         * @property {string} id Human-readable profile identifier shown in the UI.
         * @property {"chromium"|"firefox"|"safari"} family Browser family this profile belongs to.
         * @property {string} userAgent Spoofed navigator.userAgent value.
         * @property {string} platform Spoofed navigator.platform value.
         * @property {string} language Primary navigator.language value.
         * @property {string[]} languages Ordered navigator.languages values.
         * @property {number} screenWidth Spoofed screen width in CSS pixels.
         * @property {number} screenHeight Spoofed screen height in CSS pixels.
         * @property {number} availOffsetY Vertical space reserved by the operating system UI.
         * @property {number} colorDepth Spoofed screen color depth.
         * @property {number} pixelDepth Spoofed screen pixel depth.
         * @property {number} devicePixelRatio Spoofed device pixel ratio.
         * @property {number} cores Spoofed logical CPU core count.
         * @property {number} memory Spoofed device memory in GB when supported.
         * @property {string} timezone IANA timezone identifier used by Date and Intl patches.
         * @property {string} vendor Spoofed navigator.vendor value.
         * @property {string} productSub Spoofed navigator.productSub value.
         * @property {string} appName Spoofed navigator.appName value.
         * @property {string|null} doNotTrack Spoofed navigator.doNotTrack value.
         * @property {number} maxTouchPoints Spoofed navigator.maxTouchPoints value.
         * @property {string=} oscpu Firefox-specific navigator.oscpu value.
         * @property {string=} buildID Firefox-specific navigator.buildID value.
         * @property {string} webglVendor Spoofed unmasked WebGL vendor value.
         * @property {string} webglRenderer Spoofed unmasked WebGL renderer value.
         * @property {Object=} connection Spoofed navigator.connection-like object.
         * @property {Array<Object>} plugins Plugin descriptors used to create a lightweight PluginArray replacement.
         * @property {Array<Object>} mimeTypes MIME type descriptors used to create a lightweight MimeTypeArray replacement.
         */

        /**
         * Stores user-configurable feature flags for each spoofing group.
         *
         * @typedef {Object} SpoofSettings
         * @property {boolean} navigator Enables navigator identity spoofing.
         * @property {boolean} userAgentData Enables Chromium navigator.userAgentData spoofing.
         * @property {boolean} screen Enables screen and window dimension spoofing.
         * @property {boolean} timezone Enables Intl and Date timezone spoofing.
         * @property {boolean} canvas Enables Canvas fingerprint noise.
         * @property {boolean} webgl Enables WebGL vendor, renderer, limits, and readPixels spoofing.
         * @property {boolean} audio Enables audio fingerprint noise.
         * @property {boolean} plugins Enables plugin and MIME type spoofing.
         * @property {boolean} mediaDevices Enables media device enumeration protection.
         * @property {boolean} storageEstimate Enables storage estimate spoofing.
         * @property {boolean} battery Enables Battery API spoofing.
         * @property {boolean} speechSynthesis Enables speech synthesis voice spoofing.
         * @property {boolean} fonts Enables conservative font probing protection.
         * @property {boolean} matchMedia Enables selected media query spoofing.
         * @property {boolean} sharedArrayBuffer Hides SharedArrayBuffer when possible.
         */

        const DEBUG = false;
        const PREFIX = "__afm_";
        const PROFILE_DURATION_MS = 24 * 60 * 60 * 1000;

        const SETTINGS_KEY = PREFIX + "settings";
        const PROFILE_KEY = PREFIX + "profile";
        const PROFILE_EXPIRY_KEY = PREFIX + "profile_expiry";
        const PROFILE_CHOICES_KEY = PREFIX + "profile_choices";
        const ENABLED_KEY = PREFIX + "enabled";
        const UI_POSITION_KEY = PREFIX + "ui_position";
        const UI_VISIBLE_KEY = PREFIX + "ui_visible";

        const real = {
            userAgent: String(navigator.userAgent || ""),
            platform: String(navigator.platform || ""),
            language: String(navigator.language || "en-US"),
            languages: Array.isArray(navigator.languages) ? Array.from(navigator.languages) : [],
            matchMedia: typeof window.matchMedia === "function" ? window.matchMedia.bind(window) : null,
            dateResolvedOptions: typeof Intl !== "undefined" && Intl.DateTimeFormat
                ? Intl.DateTimeFormat.prototype.resolvedOptions
                : null,
            dateGetTimezoneOffset: Date.prototype.getTimezoneOffset
        };

        /** @type {BrowserProfile[]} */
        const browserProfiles = [
            {
                id: "Chrome Windows 1080p",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                platform: "Win32",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 1920,
                screenHeight: 1080,
                availOffsetY: 40,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1,
                cores: 8,
                memory: 16,
                timezone: "America/New_York",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: null,
                maxTouchPoints: 0,
                webglVendor: "NVIDIA Corporation",
                webglRenderer: "NVIDIA GeForce RTX 3060/PCIe/SSE2",
                connection: { downlink: 10, effectiveType: "4g", rtt: 50, saveData: false },
                plugins: [
                    { name: "PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" },
                    { name: "Chrome PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" },
                    { name: "Chromium PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }
                ],
                mimeTypes: [
                    { type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }
                ]
            },
            {
                id: "Chrome macOS Retina",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                platform: "MacIntel",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 2560,
                screenHeight: 1440,
                availOffsetY: 25,
                colorDepth: 30,
                pixelDepth: 30,
                devicePixelRatio: 2,
                cores: 8,
                memory: 16,
                timezone: "America/Los_Angeles",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "Apple GPU",
                webglRenderer: "Apple M1",
                connection: { downlink: 10, effectiveType: "4g", rtt: 50, saveData: false },
                plugins: [
                    { name: "PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }
                ],
                mimeTypes: [
                    { type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }
                ]
            },
            {
                id: "Edge Windows 1440p",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
                platform: "Win32",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 2560,
                screenHeight: 1440,
                availOffsetY: 40,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1.25,
                cores: 12,
                memory: 32,
                timezone: "America/Chicago",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "AMD",
                webglRenderer: "AMD Radeon RX 6800 XT",
                connection: { downlink: 10, effectiveType: "4g", rtt: 50, saveData: false },
                plugins: [
                    { name: "Microsoft Edge PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }
                ],
                mimeTypes: [
                    { type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }
                ]
            },
            {
                id: "Firefox Linux 1080p",
                family: "firefox",
                userAgent: "Mozilla/5.0 (X11; Linux x86_64; rv:115.0) Gecko/20100101 Firefox/115.0",
                platform: "Linux x86_64",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 1920,
                screenHeight: 1080,
                availOffsetY: 32,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1,
                cores: 6,
                memory: 16,
                timezone: "Europe/London",
                vendor: "",
                productSub: "20100101",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                oscpu: "Linux x86_64",
                buildID: "20240101000000",
                webglVendor: "Intel Inc.",
                webglRenderer: "Intel(R) UHD Graphics 630",
                connection: undefined,
                plugins: [],
                mimeTypes: []
            },
            {
                id: "Firefox Linux 1440p NVIDIA",
                family: "firefox",
                userAgent: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:115.0) Gecko/20100101 Firefox/115.0",
                platform: "Linux x86_64",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 2560,
                screenHeight: 1440,
                availOffsetY: 32,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1,
                cores: 8,
                memory: 32,
                timezone: "Europe/Paris",
                vendor: "",
                productSub: "20100101",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                oscpu: "Linux x86_64",
                buildID: "20240101000000",
                webglVendor: "NVIDIA Corporation",
                webglRenderer: "NVIDIA GeForce GTX 1660 Ti/PCIe/SSE2",
                connection: undefined,
                plugins: [],
                mimeTypes: []
            },
            {
                id: "Safari macOS Retina",
                family: "safari",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15",
                platform: "MacIntel",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 2560,
                screenHeight: 1440,
                availOffsetY: 25,
                colorDepth: 30,
                pixelDepth: 30,
                devicePixelRatio: 2,
                cores: 8,
                memory: 16,
                timezone: "America/New_York",
                vendor: "",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "Apple GPU",
                webglRenderer: "Apple M1 Pro",
                connection: undefined,
                plugins: [],
                mimeTypes: []
            },
            {
                id: "Safari macOS Sonoma",
                family: "safari",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
                platform: "MacIntel",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 2560,
                screenHeight: 1600,
                availOffsetY: 25,
                colorDepth: 30,
                pixelDepth: 30,
                devicePixelRatio: 2,
                cores: 8,
                memory: 16,
                timezone: "America/Los_Angeles",
                vendor: "Apple Computer, Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 5,
                webglVendor: "Apple Inc.",
                webglRenderer: "Apple GPU",
                connection: { downlink: 10, effectiveType: "4g", rtt: 45, saveData: false },
                plugins: [],
                mimeTypes: []
            },
            {
                id: "Chrome Windows 11 4K",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                platform: "Win32",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 3840,
                screenHeight: 2160,
                availOffsetY: 40,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1.5,
                cores: 16,
                memory: 32,
                timezone: "America/New_York",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "NVIDIA Corporation",
                webglRenderer: "NVIDIA GeForce RTX 4070/PCIe/SSE2",
                connection: { downlink: 10, effectiveType: "4g", rtt: 40, saveData: false },
                plugins: [{ name: "Chrome PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }],
                mimeTypes: [{ type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }]
            },
            {
                id: "Edge Windows 11 Workstation",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
                platform: "Win32",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 3440,
                screenHeight: 1440,
                availOffsetY: 40,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1.25,
                cores: 20,
                memory: 64,
                timezone: "America/Chicago",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "AMD",
                webglRenderer: "AMD Radeon RX 7900 XT",
                connection: { downlink: 10, effectiveType: "4g", rtt: 38, saveData: false },
                plugins: [{ name: "Microsoft Edge PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }],
                mimeTypes: [{ type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }]
            },
            {
                id: "Chrome Windows 10 Office",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                platform: "Win32",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 1920,
                screenHeight: 1200,
                availOffsetY: 40,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1,
                cores: 8,
                memory: 16,
                timezone: "America/Denver",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: null,
                maxTouchPoints: 0,
                webglVendor: "Intel Inc.",
                webglRenderer: "Intel(R) Iris(R) Xe Graphics",
                connection: { downlink: 10, effectiveType: "4g", rtt: 48, saveData: false },
                plugins: [{ name: "PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }],
                mimeTypes: [{ type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }]
            },
            {
                id: "Safari macOS ProMotion",
                family: "safari",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
                platform: "MacIntel",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 3024,
                screenHeight: 1964,
                availOffsetY: 25,
                colorDepth: 30,
                pixelDepth: 30,
                devicePixelRatio: 2,
                cores: 10,
                memory: 32,
                timezone: "America/Los_Angeles",
                vendor: "Apple Computer, Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "Apple Inc.",
                webglRenderer: "Apple M2 Pro",
                connection: undefined,
                plugins: [],
                mimeTypes: []
            },
            {
                id: "Chrome macOS Ventura Studio",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                platform: "MacIntel",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 2880,
                screenHeight: 1800,
                availOffsetY: 25,
                colorDepth: 30,
                pixelDepth: 30,
                devicePixelRatio: 2,
                cores: 12,
                memory: 32,
                timezone: "America/Los_Angeles",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "Apple Inc.",
                webglRenderer: "Apple M2 Max",
                connection: { downlink: 10, effectiveType: "4g", rtt: 42, saveData: false },
                plugins: [{ name: "Chrome PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }],
                mimeTypes: [{ type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }]
            }
        ];

        /** @type {SpoofSettings} */
        const defaultSettings = {
            navigator: true,
            userAgentData: true,
            screen: true,
            timezone: true,
            canvas: false,
            webgl: true,
            audio: true,
            plugins: true,
            mediaDevices: true,
            storageEstimate: true,
            battery: true,
            speechSynthesis: true,
            fonts: true,
            matchMedia: true,
            sharedArrayBuffer: true
        };

        /**
         * Writes a debug message when debug mode is enabled.
         *
         * @param {...unknown} args Values to write to the console.
         * @returns {void}
         */
        function log(...args) {
            if (DEBUG) {
                console.log("[AFM]", ...args);
            }
        }

        /**
         * Reads a value from localStorage safely.
         *
         * @param {string} key Storage key.
         * @returns {string|null} Stored value or null.
         */
        function storageGet(key) {
            try {
                return localStorage.getItem(key);
            } catch (_) {
                return null;
            }
        }

        /**
         * Writes a value to localStorage safely.
         *
         * @param {string} key Storage key.
         * @param {string} value Storage value.
         * @returns {void}
         */
        function storageSet(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (_) {
                // Ignore storage errors.
            }
        }

        /**
         * Removes a value from localStorage safely.
         *
         * @param {string} key Storage key.
         * @returns {void}
         */
        function storageRemove(key) {
            try {
                localStorage.removeItem(key);
            } catch (_) {
                // Ignore storage errors.
            }
        }

        /**
         * Parses JSON using a fallback when the input is malformed.
         *
         * @param {string|null} value JSON text to parse.
         * @param {unknown} fallback Fallback value returned on parse failure.
         * @returns {unknown} Parsed value or fallback.
         */
        function safeJson(value, fallback) {
            if (!value) {
                return fallback;
            }

            try {
                return JSON.parse(value);
            } catch (_) {
                return fallback;
            }
        }

        /**
         * Loads persisted spoofing settings and merges them with defaults.
         *
         * @returns {SpoofSettings} Active spoofing settings.
         */
        function loadSettings() {
            const saved = safeJson(storageGet(SETTINGS_KEY), {});
            const settings = Object.assign({}, defaultSettings, saved);

            // Persist merged defaults so the UI checker can confirm settings storage even
            // before the user toggles an individual Shield module.
            storageSet(SETTINGS_KEY, JSON.stringify(settings));

            return settings;
        }

        /**
         * Persists spoofing settings.
         *
         * @param {SpoofSettings} settings Settings to persist.
         * @returns {void}
         */
        function saveSettings(settings) {
            storageSet(SETTINGS_KEY, JSON.stringify(settings));
        }

        /**
         * Detects the real browser family from the original user agent.
         *
         * @returns {"chromium"|"firefox"|"safari"} Detected browser family.
         */
        function detectFamily() {
            const ua = real.userAgent.toLowerCase();

            if (ua.includes("firefox")) {
                return "firefox";
            }

            if (ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium") && !ua.includes("edg")) {
                return "safari";
            }

            return "chromium";
        }

        /**
         * Gets profiles compatible with the real browser family.
         *
         * @returns {BrowserProfile[]} Compatible profiles.
         */
        function getCompatibleProfiles() {
            const family = detectFamily();
            const compatible = browserProfiles.filter(profile => profile.family === family);
            return compatible.length > 0 ? compatible : browserProfiles;
        }

        /**
         * Gets the active profile, rotating it after the configured duration.
         *
         * @returns {BrowserProfile} Active browser profile.
         */
        function getCurrentProfile() {
            const now = Date.now();
            const expiry = Number(storageGet(PROFILE_EXPIRY_KEY) || "0");
            const savedProfile = safeJson(storageGet(PROFILE_KEY), null);
            const profiles = getCompatibleProfiles();

            storageSet(PROFILE_CHOICES_KEY, JSON.stringify(profiles));

            if (savedProfile && now <= expiry) {
                if (savedProfile.id && !savedProfile.userAgent) {
                    const selected = browserProfiles.find(item => item.id === savedProfile.id) || profiles.find(item => item.id === savedProfile.id);

                    if (selected) {
                        storageSet(PROFILE_KEY, JSON.stringify(selected));
                        return selected;
                    }
                }

                if (savedProfile.id && savedProfile.userAgent) {
                    return savedProfile;
                }
            }

            const profile = profiles[Math.floor(Math.random() * profiles.length)];

            storageSet(PROFILE_KEY, JSON.stringify(profile));
            storageSet(PROFILE_EXPIRY_KEY, String(now + PROFILE_DURATION_MS));

            return profile;
        }

        /**
         * Publishes shield diagnostics for the KGlacer Macro settings modal.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function publishShieldInfo(profile, settings) {
            const enabled = storageGet(ENABLED_KEY) !== "false";
            const info = {
                injected: true,
                enabled,
                profile,
                profileId: profile.id,
                expiresAt: Number(storageGet(PROFILE_EXPIRY_KEY) || "0"),
                detectedBrowser: detectFamily(),
                proxyHint: storageGet(PREFIX + "proxy_hint") || "AUTO",
                compatibleProfiles: getCompatibleProfiles().map(item => item.id),
                settings
            };

            storageSet(PROFILE_CHOICES_KEY, JSON.stringify(getCompatibleProfiles()));

            try {
                Object.defineProperty(window, "__kgmShieldInfo", {
                    configurable: true,
                    enumerable: false,
                    value: info,
                    writable: true
                });
            } catch (_) {
                window.__kgmShieldInfo = info;
            }
        }

        /**
         * Creates a deterministic numeric seed from a string.
         *
         * @param {string} input Input text.
         * @returns {number} Deterministic 32-bit seed.
         */
        function hashString(input) {
            let hash = 2166136261;

            for (let i = 0; i < input.length; i++) {
                hash ^= input.charCodeAt(i);
                hash = Math.imul(hash, 16777619);
            }

            return hash >>> 0;
        }

        /**
         * Creates a deterministic pseudo-random function.
         *
         * @param {number} seed Initial seed.
         * @returns {() => number} Function returning a number between 0 and 1.
         */
        function seededRandom(seed) {
            let state = seed >>> 0;

            return function nextRandom() {
                state += 0x6D2B79F5;
                let t = state;
                t = Math.imul(t ^ (t >>> 15), t | 1);
                t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
                return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
            };
        }

        /**
         * Returns a small deterministic noise value.
         *
         * @param {number} seed Numeric seed.
         * @param {number} amplitude Maximum absolute noise amplitude.
         * @returns {number} Noise value.
         */
        function stableNoise(seed, amplitude) {
            const random = seededRandom(seed);
            return (random() - 0.5) * amplitude * 2;
        }

        /**
         * Defines a getter on an object while preserving configurability.
         *
         * @param {object} target Target object.
         * @param {string} property Property name.
         * @param {() => unknown} getter Getter function.
         * @returns {void}
         */
        function defineGetter(target, property, getter) {
            if (!target) {
                return;
            }

            try {
                Object.defineProperty(target, property, {
                    get: getter,
                    configurable: true
                });
            } catch (error) {
                log("defineGetter failed", property, error);
            }
        }

        /**
         * Defines a fixed value on an object while preserving configurability.
         *
         * @param {object} target Target object.
         * @param {string} property Property name.
         * @param {unknown} value Property value.
         * @returns {void}
         */
        function defineValue(target, property, value) {
            if (!target) {
                return;
            }

            try {
                Object.defineProperty(target, property, {
                    value,
                    configurable: true,
                    writable: false
                });
            } catch (error) {
                log("defineValue failed", property, error);
            }
        }

        /**
         * Patches a prototype method safely.
         *
         * @param {object} prototype Prototype object.
         * @param {string} methodName Method name.
         * @param {(original: Function) => Function} factory Function that receives the original method and returns a replacement.
         * @returns {void}
         */
        function patchMethod(prototype, methodName, factory) {
            if (!prototype || typeof prototype[methodName] !== "function") {
                return;
            }

            try {
                const original = prototype[methodName];
                defineValue(prototype, methodName, factory(original));
            } catch (error) {
                log("patchMethod failed", methodName, error);
            }
        }

        /**
         * Creates a lightweight array-like object for plugins or MIME types.
         *
         * @param {Array<Object>} items Source descriptors.
         * @returns {Array<Object>} Array-like object.
         */
        function createArrayLike(items) {
            const array = Array.from(items || []);

            array.item = function item(index) {
                return array[index] || null;
            };

            array.namedItem = function namedItem(name) {
                return array.find(item => item.name === name || item.type === name) || null;
            };

            array.refresh = function refresh() {
                return undefined;
            };

            return array;
        }

        /**
         * Applies navigator identity spoofing.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchNavigator(profile, settings) {
            if (!settings.navigator) {
                return;
            }

            defineGetter(Navigator.prototype, "userAgent", () => profile.userAgent);
            defineGetter(Navigator.prototype, "platform", () => profile.platform);
            defineGetter(Navigator.prototype, "language", () => profile.language);
            defineGetter(Navigator.prototype, "languages", () => profile.languages.slice());
            defineGetter(Navigator.prototype, "hardwareConcurrency", () => profile.cores);
            defineGetter(Navigator.prototype, "vendor", () => profile.vendor);
            defineGetter(Navigator.prototype, "productSub", () => profile.productSub);
            defineGetter(Navigator.prototype, "appName", () => profile.appName);
            defineGetter(Navigator.prototype, "doNotTrack", () => profile.doNotTrack);
            defineGetter(Navigator.prototype, "maxTouchPoints", () => profile.maxTouchPoints);

            if ("deviceMemory" in navigator) {
                defineGetter(Navigator.prototype, "deviceMemory", () => profile.memory);
            }

            if ("oscpu" in navigator && profile.oscpu) {
                defineGetter(Navigator.prototype, "oscpu", () => profile.oscpu);
            }

            if ("buildID" in navigator && profile.buildID) {
                defineGetter(Navigator.prototype, "buildID", () => profile.buildID);
            }

            if ("connection" in navigator && profile.connection) {
                defineGetter(Navigator.prototype, "connection", () => Object.assign({}, profile.connection));
            }
        }

        /**
         * Applies Chromium navigator.userAgentData spoofing when available.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchUserAgentData(profile, settings) {
            if (!settings.userAgentData || !("userAgentData" in navigator)) {
                return;
            }

            const isEdge = profile.userAgent.includes("Edg/");
            const brands = isEdge
                ? [
                    { brand: "Microsoft Edge", version: "120" },
                    { brand: "Chromium", version: "120" },
                    { brand: "Not A(Brand", version: "99" }
                ]
                : [
                    { brand: "Google Chrome", version: "120" },
                    { brand: "Chromium", version: "120" },
                    { brand: "Not A(Brand", version: "99" }
                ];

            const platform = profile.platform.includes("Win")
                ? "Windows"
                : profile.platform.includes("Mac")
                    ? "macOS"
                    : "Linux";

            const userAgentData = {
                brands,
                mobile: false,
                platform,
                getHighEntropyValues: function getHighEntropyValues(hints) {
                    const values = {
                        brands,
                        mobile: false,
                        platform,
                        architecture: "x86",
                        bitness: "64",
                        model: "",
                        platformVersion: platform === "Windows" ? "10.0.0" : "13.0.0",
                        uaFullVersion: "120.0.0.0",
                        fullVersionList: brands.map(brand => ({
                            brand: brand.brand,
                            version: brand.version + ".0.0.0"
                        }))
                    };

                    const result = {};

                    for (const hint of hints || []) {
                        if (Object.prototype.hasOwnProperty.call(values, hint)) {
                            result[hint] = values[hint];
                        }
                    }

                    result.brands = brands;
                    result.mobile = false;
                    result.platform = platform;

                    return Promise.resolve(result);
                },
                toJSON: function toJSON() {
                    return {
                        brands,
                        mobile: false,
                        platform
                    };
                }
            };

            defineGetter(Navigator.prototype, "userAgentData", () => userAgentData);
        }

        /**
         * Applies screen and viewport spoofing.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchScreen(profile, settings) {
            if (!settings.screen || !window.screen) {
                return;
            }

            defineGetter(Screen.prototype, "width", () => profile.screenWidth);
            defineGetter(Screen.prototype, "height", () => profile.screenHeight);
            defineGetter(Screen.prototype, "availWidth", () => profile.screenWidth);
            defineGetter(Screen.prototype, "availHeight", () => Math.max(0, profile.screenHeight - profile.availOffsetY));
            defineGetter(Screen.prototype, "colorDepth", () => profile.colorDepth);
            defineGetter(Screen.prototype, "pixelDepth", () => profile.pixelDepth);

            defineGetter(window, "devicePixelRatio", () => profile.devicePixelRatio);
            defineGetter(window, "outerWidth", () => profile.screenWidth);
            defineGetter(window, "outerHeight", () => profile.screenHeight);
        }

        /**
         * Applies conservative timezone spoofing through Intl and Date.getTimezoneOffset.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchTimezone(profile, settings) {
            if (!settings.timezone) {
                return;
            }

            if (typeof Intl !== "undefined" && Intl.DateTimeFormat && real.dateResolvedOptions) {
                patchMethod(Intl.DateTimeFormat.prototype, "resolvedOptions", original => function resolvedOptions() {
                    const options = original.call(this);
                    options.timeZone = profile.timezone;
                    return options;
                });
            }

            patchMethod(Date.prototype, "getTimezoneOffset", () => function getTimezoneOffset() {
                return timezoneOffsetFor(profile.timezone);
            });
        }

        /**
         * Returns a practical timezone offset approximation in minutes.
         *
         * @param {string} timezone IANA timezone name.
         * @returns {number} Timezone offset in minutes.
         */
        function timezoneOffsetFor(timezone) {
            const offsets = {
                "America/New_York": 300,
                "America/Chicago": 360,
                "America/Denver": 420,
                "America/Los_Angeles": 480,
                "Europe/London": 0,
                "Europe/Paris": -60,
                "Europe/Berlin": -60
            };

            return Object.prototype.hasOwnProperty.call(offsets, timezone)
                ? offsets[timezone]
                : real.dateGetTimezoneOffset.call(new Date());
        }

        /**
         * Applies plugin and MIME type spoofing.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchPlugins(profile, settings) {
            if (!settings.plugins) {
                return;
            }

            defineGetter(Navigator.prototype, "plugins", () => createArrayLike(profile.plugins));
            defineGetter(Navigator.prototype, "mimeTypes", () => createArrayLike(profile.mimeTypes));
        }

        /**
         * Applies Canvas 2D noise using deterministic, low-amplitude changes.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchCanvas(profile, settings) {
            if (!settings.canvas) {
                return;
            }

            const baseSeed = hashString(location.hostname + profile.id + "canvas");
            patchMethod(HTMLCanvasElement && HTMLCanvasElement.prototype, "toDataURL", original => function toDataURL() {
                const source = this;
                const noisyCanvas = buildNoisyCanvasCopy(source, baseSeed);
                return original.apply(noisyCanvas || source, arguments);
            });

            patchMethod(HTMLCanvasElement && HTMLCanvasElement.prototype, "toBlob", original => function toBlob() {
                const source = this;
                const noisyCanvas = buildNoisyCanvasCopy(source, baseSeed);
                return original.apply(noisyCanvas || source, arguments);
            });
        }

        /**
         * Creates a detached canvas copy with deterministic, low-amplitude pixel noise.
         *
         * @param {HTMLCanvasElement} canvas Source canvas.
         * @param {number} seed Base noise seed.
         * @returns {HTMLCanvasElement|null} Noisy clone or null when unavailable.
         */
        function buildNoisyCanvasCopy(canvas, seed) {
            try {
                if (!canvas.width || !canvas.height) {
                    return null;
                }

                const clone = document.createElement("canvas");
                clone.width = canvas.width;
                clone.height = canvas.height;
                const cloneContext = clone.getContext("2d");

                if (!cloneContext) {
                    return null;
                }

                cloneContext.drawImage(canvas, 0, 0);
                const width = Math.min(canvas.width, 16);
                const height = Math.min(canvas.height, 16);
                const imageData = cloneContext.getImageData(0, 0, width, height);

                for (let i = 0; i < imageData.data.length; i += 4) {
                    const noise = Math.round(stableNoise(seed + i, 1));
                    imageData.data[i] = clampByte(imageData.data[i] + noise);
                    imageData.data[i + 1] = clampByte(imageData.data[i + 1] + noise);
                    imageData.data[i + 2] = clampByte(imageData.data[i + 2] + noise);
                }

                cloneContext.putImageData(imageData, 0, 0);
                return clone;
            } catch (_) {
                // Ignore tainted canvas errors.
                return null;
            }
        }

        /**
         * Keeps a number inside the unsigned byte range.
         *
         * @param {number} value Input value.
         * @returns {number} Clamped value.
         */
        function clampByte(value) {
            return Math.max(0, Math.min(255, value));
        }

        /**
         * Applies WebGL spoofing for common fingerprint vectors.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchWebGL(profile, settings) {
            if (!settings.webgl) {
                return;
            }

            const contexts = [];

            if (typeof WebGLRenderingContext !== "undefined") {
                contexts.push(WebGLRenderingContext.prototype);
            }

            if (typeof WebGL2RenderingContext !== "undefined") {
                contexts.push(WebGL2RenderingContext.prototype);
            }

            for (const prototype of contexts) {
                patchMethod(prototype, "getParameter", original => function getParameter(parameter) {
                    const values = {
                        37445: profile.webglVendor,
                        37446: profile.webglRenderer,
                        3379: 16384,
                        3386: new Int32Array([16384, 16384]),
                        3410: 8,
                        3411: 8,
                        3412: 8,
                        3413: 8,
                        34047: 16,
                        34921: 16,
                        35660: 16,
                        35661: 16,
                        36347: 4096,
                        36348: 30,
                        36349: 1024
                    };

                    if (Object.prototype.hasOwnProperty.call(values, parameter)) {
                        return values[parameter];
                    }

                    return original.call(this, parameter);
                });

                patchMethod(prototype, "getSupportedExtensions", original => function getSupportedExtensions() {
                    const extensions = original.call(this) || [];
                    const stable = extensions.filter(extension => extension !== "WEBGL_debug_renderer_info");
                    return stable.includes("OES_texture_float") ? stable : stable.concat(["OES_texture_float"]);
                });

                patchMethod(prototype, "readPixels", original => function readPixels(x, y, width, height, format, type, pixels) {
                    const result = original.apply(this, arguments);

                    if (pixels && pixels.length) {
                        const seed = hashString(location.hostname + profile.id + "webgl");

                        for (let i = 0; i < pixels.length; i += 16) {
                            pixels[i] = clampByte(pixels[i] + Math.round(stableNoise(seed + i, 1)));
                        }
                    }

                    return result;
                });
            }
        }

        /**
         * Applies Audio API noise to reduce audio fingerprint stability.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchAudio(profile, settings) {
            if (!settings.audio) {
                return;
            }

            const seed = hashString(location.hostname + profile.id + "audio");

            if (typeof AudioBuffer !== "undefined") {
                patchMethod(AudioBuffer.prototype, "getChannelData", original => function getChannelData(channel) {
                    const data = original.call(this, channel);

                    for (let i = 0; i < data.length; i += 100) {
                        data[i] += stableNoise(seed + i, 0.0000001);
                    }

                    return data;
                });
            }

            if (typeof AnalyserNode !== "undefined") {
                patchMethod(AnalyserNode.prototype, "getFloatFrequencyData", original => function getFloatFrequencyData(array) {
                    original.call(this, array);

                    for (let i = 0; i < array.length; i++) {
                        array[i] += stableNoise(seed + i, 0.01);
                    }
                });
            }
        }

        /**
         * Applies media device enumeration protection.
         *
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchMediaDevices(settings) {
            if (!settings.mediaDevices) {
                return;
            }

            if (!navigator.mediaDevices) {
                defineGetter(Navigator.prototype, "mediaDevices", () => ({
                    enumerateDevices: () => Promise.resolve([])
                }));
                return;
            }

            patchMethod(Object.getPrototypeOf(navigator.mediaDevices), "enumerateDevices", () => function enumerateDevices() {
                return Promise.resolve([]);
            });
        }

        /**
         * Applies storage estimate spoofing.
         *
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchStorageEstimate(settings) {
            if (!settings.storageEstimate || !navigator.storage || typeof navigator.storage.estimate !== "function") {
                return;
            }

            patchMethod(Object.getPrototypeOf(navigator.storage), "estimate", () => function estimate() {
                return Promise.resolve({
                    usage: 5242880,
                    quota: 1073741824
                });
            });
        }

        /**
         * Applies Battery API spoofing.
         *
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchBattery(settings) {
            if (!settings.battery || !("getBattery" in navigator)) {
                return;
            }

            defineValue(navigator, "getBattery", function getBattery() {
                return Promise.resolve({
                    charging: true,
                    chargingTime: 0,
                    dischargingTime: Infinity,
                    level: 1,
                    onchargingchange: null,
                    onchargingtimechange: null,
                    ondischargingtimechange: null,
                    onlevelchange: null,
                    addEventListener: function addEventListener() {},
                    removeEventListener: function removeEventListener() {},
                    dispatchEvent: function dispatchEvent() {
                        return true;
                    }
                });
            });
        }

        /**
         * Applies SpeechSynthesis voice list normalization.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchSpeechSynthesis(profile, settings) {
            if (!settings.speechSynthesis || !("speechSynthesis" in window)) {
                return;
            }

            const voices = [
                {
                    voiceURI: profile.family === "safari" ? "com.apple.speech.synthesis.voice.Alex" : "Google US English",
                    name: profile.family === "safari" ? "Alex" : "Google US English",
                    lang: profile.language,
                    localService: true,
                    default: true
                }
            ];

            defineValue(window.speechSynthesis, "getVoices", function getVoices() {
                return voices.slice();
            });
        }

        /**
         * Applies conservative font probing protection.
         *
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchFonts(settings) {
            if (!settings.fonts || !document.fonts) {
                return;
            }

            try {
                defineValue(document.fonts, "check", function check() {
                    return true;
                });
            } catch (_) {
                // Ignore font patching errors.
            }
        }

        /**
         * Applies selected media query spoofing without breaking color-scheme UI detection.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchMatchMedia(profile, settings) {
            if (!settings.matchMedia || !real.matchMedia) {
                return;
            }

            defineValue(window, "matchMedia", function matchMedia(query) {
                const normalized = String(query || "").toLowerCase();

                if (normalized.includes("prefers-reduced-motion")) {
                    return createMediaQueryList(query, false);
                }

                if (normalized.includes("forced-colors")) {
                    return createMediaQueryList(query, false);
                }

                if (normalized.includes("dynamic-range")) {
                    return createMediaQueryList(query, profile.family === "safari");
                }

                return real.matchMedia(query);
            });
        }

        /**
         * Creates a minimal MediaQueryList-compatible object.
         *
         * @param {string} query Original media query.
         * @param {boolean} matches Whether the query matches.
         * @returns {MediaQueryList} Media query list object.
         */
        function createMediaQueryList(query, matches) {
            return {
                matches,
                media: query,
                onchange: null,
                addListener: function addListener() {},
                removeListener: function removeListener() {},
                addEventListener: function addEventListener() {},
                removeEventListener: function removeEventListener() {},
                dispatchEvent: function dispatchEvent() {
                    return true;
                }
            };
        }

        /**
         * Hides SharedArrayBuffer where possible.
         *
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchSharedArrayBuffer(settings) {
            if (!settings.sharedArrayBuffer || !("SharedArrayBuffer" in window)) {
                return;
            }

            defineGetter(window, "SharedArrayBuffer", () => undefined);
        }

        /**
         * Applies all active protection modules.
         *
         * @returns {void}
         */
        function applyProtections() {
            const enabled = storageGet(ENABLED_KEY) !== "false";
            const settings = loadSettings();
            const profile = getCurrentProfile();

            publishShieldInfo(profile, settings);

            if (!enabled) {
                return;
            }

            patchNavigator(profile, settings);
            patchUserAgentData(profile, settings);
            patchScreen(profile, settings);
            patchTimezone(profile, settings);
            patchPlugins(profile, settings);
            patchCanvas(profile, settings);
            patchWebGL(profile, settings);
            patchAudio(profile, settings);
            patchMediaDevices(settings);
            patchStorageEstimate(settings);
            patchBattery(settings);
            patchSpeechSynthesis(profile, settings);
            patchFonts(settings);
            patchMatchMedia(profile, settings);
            patchSharedArrayBuffer(settings);
        }

        /**
         * Creates the floating configuration UI.
         *
         * @returns {void}
         */
        function createUI() {
            if (storageGet(UI_VISIBLE_KEY) === "false") {
                return;
            }

            const add = function addWhenReady() {
                if (!document.body) {
                    setTimeout(addWhenReady, 50);
                    return;
                }

                const existing = document.getElementById(PREFIX + "ui");

                if (existing) {
                    existing.remove();
                }

                document.body.appendChild(buildUI());
            };

            add();
        }

        /**
         * Builds the floating UI container.
         *
         * @returns {HTMLDivElement} UI container.
         */
        function buildUI() {
            const enabled = storageGet(ENABLED_KEY) !== "false";
            const settings = loadSettings();
            const profile = getCurrentProfile();
            const isDark = real.matchMedia ? real.matchMedia("(prefers-color-scheme: dark)").matches : false;
            const colors = getUiColors(isDark);
            const savedPosition = safeJson(storageGet(UI_POSITION_KEY), { top: 10, left: 10 });

            const container = document.createElement("div");
            container.id = PREFIX + "ui";
            container.style.cssText = [
                "position:fixed",
                "top:" + Number(savedPosition.top || 10) + "px",
                "left:" + Number(savedPosition.left || 10) + "px",
                "z-index:2147483647",
                "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif",
                "font-size:13px",
                "color:" + colors.text
            ].join(";");

            const button = document.createElement("button");
            button.type = "button";
            button.textContent = "\uD83D\uDEE1";
            button.title = "Anti-Fingerprint Merged Shield";
            button.style.cssText = [
                "width:42px",
                "height:42px",
                "border-radius:50%",
                "border:1px solid " + colors.border,
                "background:" + colors.panel,
                "color:" + colors.text,
                "box-shadow:0 4px 14px rgba(0,0,0,.22)",
                "cursor:move",
                "font-size:20px",
                "line-height:1"
            ].join(";");

            const panel = document.createElement("div");
            panel.style.cssText = [
                "display:none",
                "position:absolute",
                "top:50px",
                "left:0",
                "width:315px",
                "background:" + colors.panel,
                "border:1px solid " + colors.border,
                "border-radius:14px",
                "box-shadow:0 10px 30px rgba(0,0,0,.28)",
                "padding:14px",
                "box-sizing:border-box",
                "color:" + colors.text
            ].join(";");

            panel.appendChild(titleRow("Anti-Fingerprint Shield", enabled ? "Active" : "Disabled", enabled ? colors.ok : colors.danger));
            panel.appendChild(textBlock("Current profile", profile.id));
            panel.appendChild(textBlock("Expires", formatDate(Number(storageGet(PROFILE_EXPIRY_KEY) || "0"))));
            panel.appendChild(textBlock("Detected browser", detectFamily()));

            const profileSelect = document.createElement("select");
            profileSelect.style.cssText = inputCss(colors);

            for (const item of getCompatibleProfiles()) {
                const option = document.createElement("option");
                option.value = item.id;
                option.textContent = item.id;
                option.selected = item.id === profile.id;
                profileSelect.appendChild(option);
            }

            profileSelect.addEventListener("change", () => {
                const selected = browserProfiles.find(item => item.id === profileSelect.value);

                if (!selected) {
                    return;
                }

                storageSet(PROFILE_KEY, JSON.stringify(selected));
                storageSet(PROFILE_EXPIRY_KEY, String(Date.now() + PROFILE_DURATION_MS));
                location.reload();
            });

            panel.appendChild(profileSelect);

            panel.appendChild(createButton(enabled ? "Disable protection" : "Enable protection", enabled ? colors.danger : colors.ok, () => {
                storageSet(ENABLED_KEY, enabled ? "false" : "true");
                location.reload();
            }));

            panel.appendChild(createButton("Refresh profile", colors.primary, () => {
                storageRemove(PROFILE_EXPIRY_KEY);
                location.reload();
            }));

            const details = document.createElement("details");
            details.open = true;
            details.style.cssText = "margin-top:10px";

            const summary = document.createElement("summary");
            summary.textContent = "Modules";
            summary.style.cssText = "cursor:pointer;color:" + colors.muted;
            details.appendChild(summary);

            for (const key of Object.keys(defaultSettings)) {
                details.appendChild(createCheckbox(key, !!settings[key], colors, checked => {
                    const next = Object.assign({}, settings, { [key]: checked });
                    saveSettings(next);
                    location.reload();
                }));
            }

            panel.appendChild(details);

            panel.appendChild(createButton("Hide icon", colors.muted, () => {
                storageSet(UI_VISIBLE_KEY, "false");
                container.remove();
                console.info("[AFM] Icon hidden. Run localStorage.setItem('" + UI_VISIBLE_KEY + "','true') and reload to show it again.");
            }));

            const dragState = {
                dragging: false,
                moved: false,
                offsetX: 0,
                offsetY: 0
            };

            button.addEventListener("click", event => {
                if (dragState.moved) {
                    return;
                }

                event.stopPropagation();
                panel.style.display = panel.style.display === "none" ? "block" : "none";
            });

            button.addEventListener("mousedown", event => {
                dragState.dragging = true;
                dragState.moved = false;
                dragState.offsetX = event.clientX - container.offsetLeft;
                dragState.offsetY = event.clientY - container.offsetTop;
                event.preventDefault();
            });

            document.addEventListener("mousemove", event => {
                if (!dragState.dragging) {
                    return;
                }

                dragState.moved = true;
                container.style.left = Math.max(0, event.clientX - dragState.offsetX) + "px";
                container.style.top = Math.max(0, event.clientY - dragState.offsetY) + "px";
            });

            document.addEventListener("mouseup", () => {
                if (!dragState.dragging) {
                    return;
                }

                dragState.dragging = false;

                storageSet(UI_POSITION_KEY, JSON.stringify({
                    top: container.offsetTop,
                    left: container.offsetLeft
                }));

                setTimeout(() => {
                    dragState.moved = false;
                }, 0);
            });

            document.addEventListener("click", event => {
                if (!container.contains(event.target)) {
                    panel.style.display = "none";
                }
            });

            document.addEventListener("keydown", event => {
                if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "f") {
                    event.preventDefault();
                    panel.style.display = panel.style.display === "none" ? "block" : "none";
                }
            });

            container.appendChild(button);
            container.appendChild(panel);

            return container;
        }

        /**
         * Returns the active UI color palette.
         *
         * @param {boolean} isDark Whether dark mode is active.
         * @returns {{panel: string, bg: string, text: string, muted: string, border: string, ok: string, danger: string, primary: string}} UI color palette.
         */
        function getUiColors(isDark) {
            return isDark
                ? {
                    panel: "#23272f",
                    bg: "#181b20",
                    text: "#f3f3f3",
                    muted: "#bfc4cc",
                    border: "#444",
                    ok: "#34c759",
                    danger: "#ff453a",
                    primary: "#0a84ff"
                }
                : {
                    panel: "#ffffff",
                    bg: "#f8f9fa",
                    text: "#222222",
                    muted: "#666666",
                    border: "#dddddd",
                    ok: "#28a745",
                    danger: "#dc3545",
                    primary: "#007aff"
                };
        }

        /**
         * Creates a title row used by the floating settings panel.
         *
         * @param {string} title Section title.
         * @param {string} status Status text.
         * @param {string} statusColor CSS color used for the status text.
         * @returns {HTMLDivElement} Rendered title row.
         */
        function titleRow(title, status, statusColor) {
            const row = document.createElement("div");
            row.style.cssText = "display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;font-weight:700;font-size:15px";

            const left = document.createElement("span");
            left.textContent = title;

            const right = document.createElement("span");
            right.textContent = status;
            right.style.color = statusColor;

            row.appendChild(left);
            row.appendChild(right);

            return row;
        }

        /**
         * Creates a compact label/value text block.
         *
         * @param {string} label Label shown above the value.
         * @param {string} value Value text.
         * @returns {HTMLDivElement} Rendered text block.
         */
        function textBlock(label, value) {
            const block = document.createElement("div");
            block.style.cssText = "margin:8px 0;white-space:pre-line";

            const labelElement = document.createElement("div");
            labelElement.textContent = label;
            labelElement.style.cssText = "font-size:11px;text-transform:uppercase;letter-spacing:.04em;opacity:.7;margin-bottom:2px";

            const valueElement = document.createElement("div");
            valueElement.textContent = value;

            block.appendChild(labelElement);
            block.appendChild(valueElement);

            return block;
        }

        /**
         * Builds shared CSS for inputs and select elements in the floating UI.
         *
         * @param {{bg: string, text: string, border: string}} colors Active UI color palette.
         * @returns {string} CSS text.
         */
        function inputCss(colors) {
            return [
                "width:100%",
                "margin:8px 0",
                "padding:8px",
                "border-radius:8px",
                "border:1px solid " + colors.border,
                "background:" + colors.bg,
                "color:" + colors.text,
                "box-sizing:border-box"
            ].join(";");
        }

        /**
         * Creates a styled button for the floating UI.
         *
         * @param {string} text Button label.
         * @param {string} color Button background color.
         * @param {Function} onClick Click handler.
         * @returns {HTMLButtonElement} Rendered button.
         */
        function createButton(text, color, onClick) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = text;
            button.style.cssText = [
                "width:100%",
                "margin:6px 0",
                "padding:8px 10px",
                "border:0",
                "border-radius:8px",
                "background:" + color,
                "color:#fff",
                "cursor:pointer",
                "font-weight:600"
            ].join(";");

            button.addEventListener("click", event => {
                event.stopPropagation();
                onClick();
            });

            return button;
        }

        /**
         * Creates a labeled checkbox row for a spoofing setting.
         *
         * @param {string} label Checkbox label.
         * @param {boolean} checked Initial checked state.
         * @param {{text: string}} colors Active UI color palette.
         * @param {(checked: boolean) => void} onChange Handler invoked after the checkbox changes.
         * @returns {HTMLLabelElement} Rendered checkbox row.
         */
        function createCheckbox(label, checked, colors, onChange) {
            const row = document.createElement("label");
            row.style.cssText = "display:flex;align-items:center;gap:8px;margin:8px 0;cursor:pointer;color:" + colors.text;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = checked;
            checkbox.addEventListener("change", () => onChange(checkbox.checked));

            const text = document.createElement("span");
            text.textContent = label;

            row.appendChild(checkbox);
            row.appendChild(text);

            return row;
        }

        /**
         * Formats a timestamp for display in the current page locale.
         *
         * @param {number|string} timestamp Timestamp in milliseconds.
         * @returns {string} Formatted date or fallback text.
         */
        function formatDate(timestamp) {
            if (!timestamp) {
                return "unknown";
            }

            try {
                return new Date(Number(timestamp)).toLocaleString();
            } catch (_) {
                return String(timestamp);
            }
        }

        try {
            applyProtections();
        } catch (error) {
            console.warn("[AFM] failed to initialize", error);
        }
    } + ")();";

    (document.documentElement || document.head || document).prepend(pageScript);
    pageScript.remove();
})();`,document.documentElement.append(a),a.remove()}var vo=`/* stylelint-disable declaration-no-important */
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
  --action-download: #55d977;
  --action-lock: #ffd166;
  --action-delete: #ff6b6b;
  --action-palette: #ff9f43;
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
  width: min(380px, 100vw);
  height: 100dvh;
  color: var(--text);
  font-family: Poppins, sans-serif;
  pointer-events: none;
  container-type: inline-size;
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
  pointer-events: auto;
  transition: transform 0.26s ease;
  transform: translateX(-100%);
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

.wwidget .wform,
.wwidget .widget-section,
.wwidget .images,
.wimage .wform,
.kgm-modal,
.preview-dialog-list,
.colors-dialog-list,
.replacement-grid {
  scrollbar-width: thin;
  scrollbar-color: rgb(141 160 255 / 62%) rgb(16 24 43 / 72%);
}

.wwidget .wform::-webkit-scrollbar,
.wwidget .widget-section::-webkit-scrollbar,
.wwidget .images::-webkit-scrollbar,
.wimage .wform::-webkit-scrollbar,
.kgm-modal::-webkit-scrollbar,
.preview-dialog-list::-webkit-scrollbar,
.colors-dialog-list::-webkit-scrollbar,
.replacement-grid::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.wwidget .wform::-webkit-scrollbar-track,
.wwidget .widget-section::-webkit-scrollbar-track,
.wwidget .images::-webkit-scrollbar-track,
.wimage .wform::-webkit-scrollbar-track,
.kgm-modal::-webkit-scrollbar-track,
.preview-dialog-list::-webkit-scrollbar-track,
.colors-dialog-list::-webkit-scrollbar-track,
.replacement-grid::-webkit-scrollbar-track {
  border-radius: 999px;
  background: rgb(16 24 43 / 72%);
}

.wwidget .wform::-webkit-scrollbar-thumb,
.wwidget .widget-section::-webkit-scrollbar-thumb,
.wwidget .images::-webkit-scrollbar-thumb,
.wimage .wform::-webkit-scrollbar-thumb,
.kgm-modal::-webkit-scrollbar-thumb,
.preview-dialog-list::-webkit-scrollbar-thumb,
.colors-dialog-list::-webkit-scrollbar-thumb,
.replacement-grid::-webkit-scrollbar-thumb {
  border: 2px solid rgb(16 24 43 / 72%);
  border-radius: 999px;
  background: linear-gradient(180deg, #6d7bff, #8ea4ee);
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.wwidget .widget-section-autofarm .widget-actions,
.wwidget .widget-section-tools .widget-actions {
  margin-top: 8px;
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
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
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

.wwidget .widget-section-head {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.wwidget .actions-inline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(128px, 100%), 1fr));
  gap: 8px;
}

.wwidget .actions-inline button {
  flex-direction: column;
  gap: 4px;
  min-height: 50px;
  padding: 8px 6px;
  line-height: 1.2;
  text-align: center;
  white-space: normal;
}

.wwidget .actions-inline button i {
  font-size: 14px;
}

.wwidget .open-config-toggle {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  width: auto;
  min-height: 32px;
  border-radius: 999px;
  background: linear-gradient(90deg, #253864, #1b2848);
  color: #dce6ff;
}

.wwidget .open-config-toggle i {
  color: #8fd8ff;
}

.wwidget .widget-actions button:hover {
  background: #24304d;
  box-shadow: 0 6px 14px rgb(0 0 0 / 30%);
  transform: translateY(-1px);
}

.wwidget .capture-template {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.wwidget .widget-section-actions button {
  display: inline-flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.wwidget .widget-section-summary {
  position: sticky;
  top: -12px;
  z-index: 1;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  min-width: 0;
  margin: -12px -12px 0;
  padding: 12px;
  border-radius: 12px 12px 0 0;
  background: linear-gradient(180deg, rgb(20 30 52 / 98%), rgb(16 25 45 / 94%));
  list-style: none;
  cursor: pointer;
}

.wwidget .widget-section-summary .widget-section-title {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  white-space: normal;
  overflow-wrap: anywhere;
}

.wwidget .widget-section-summary::-webkit-details-marker {
  display: none;
}

.wwidget .widget-section-summary i {
  flex: 0 0 auto;
  color: #95abf9;
  transition: transform 0.2s ease;
}

.wwidget details[open] > .widget-section-summary i {
  transform: rotate(180deg);
}

.wwidget .widget-image-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
}

.wwidget .widget-image-actions .strategy-row {
  grid-column: 1 / -1;
  justify-self: stretch;
}

.wwidget.wopen {
  pointer-events: none;
}

.wwidget.wopen .title,
.wwidget.wopen .wform {
  box-shadow: 0 12px 30px rgb(15 23 42 / 30%);
  transform: translateX(0);
}

.wwidget .wopen-button svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentcolor;
  stroke-width: 2.5;
  stroke-linecap: round;
}

.wwidget .wopen-button {
  position: fixed;
  top: 14px;
  left: 16px;
  z-index: 1002;
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
  pointer-events: auto;
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
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
}

.wwidget .images .image {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
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
  min-height: 88px;
  margin: 0;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 14px;
  background: #0f1321;
}

.wwidget .images .image img {
  object-fit: contain;
  max-width: 100%;
  max-height: 84px;
  margin: 0 auto;
  border-radius: 12px;
  cursor: pointer;
}

.wwidget .images .image .image-controls {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  align-content: center;
}

.wwidget .images .image .image-controls button {
  display: grid;
  place-items: center;
  width: 100%;
  height: 30px;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 8px;
  background: linear-gradient(180deg, #212b45, #1a2238);
  color: #d9e3ff;
  font-size: 14px;
  line-height: 1;
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
  color: var(--action-palette);
}

.wwidget .images .image .image-controls .focus-map {
  color: #60a5fa;
}

.wwidget .images .image .image-controls .preview-strategy {
  color: #d8b4ff;
}

.wwidget .images .image .image-controls .download {
  color: var(--action-download);
}

.wwidget .images .image .image-controls .up,
.wwidget .images .image .image-controls .down {
  color: #b7c4f8;
}

.kgm-modal .shortcuts {
  display: grid;
  gap: 8px;
  overflow: hidden;
  width: calc(100% - 10px);
  margin: 4px 5px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #151d30;
  text-align: left;
  white-space: normal;
}

.kgm-modal .shortcuts .shortcuts-summary {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  color: #d7e1ff;
  list-style: none;
  font-size: 11px;
  cursor: pointer;
}

.kgm-modal .shortcuts .shortcuts-summary:hover {
  background: rgb(129 151 240 / 10%);
}

.kgm-modal .shortcuts .shortcuts-summary::-webkit-details-marker {
  display: none;
}

.kgm-modal .shortcuts .shortcuts-summary-title {
  display: inline-flex;
  gap: 7px;
  align-items: center;
}

.kgm-modal .shortcuts .shortcuts-summary-title i {
  color: #9db3ff;
  font-size: 12px;
}

.kgm-modal .shortcuts .shortcuts-chevron {
  color: #8ea4ee;
  font-size: 10px;
  transition: transform 0.2s ease;
}

.kgm-modal .shortcuts[open] .shortcuts-chevron {
  transform: rotate(180deg);
}

.kgm-modal .shortcuts .shortcut-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  overflow-y: auto;
  width: 100%;
  max-height: 220px;
  margin: 0;
  padding: 0 10px 10px;
  list-style: none;
  text-align: left;
  scrollbar-width: thin;
  scrollbar-color: rgb(141 160 255 / 60%) rgb(16 24 43 / 75%);
}

.kgm-modal .shortcuts .shortcut-list::-webkit-scrollbar {
  width: 7px;
}

.kgm-modal .shortcuts .shortcut-list::-webkit-scrollbar-track {
  border-radius: 999px;
  background: rgb(16 24 43 / 75%);
}

.kgm-modal .shortcuts .shortcut-list::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: linear-gradient(180deg, #6d7bff, #8ea4ee);
}

.kgm-modal .shortcuts .shortcut-item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  align-items: start;
  padding: 7px;
  border: 1px solid rgb(140 159 255 / 22%);
  border-radius: 10px;
  background: linear-gradient(180deg, rgb(18 27 46 / 92%), rgb(11 19 33 / 92%));
  text-align: left;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.kgm-modal .shortcuts .shortcut-item:hover {
  border-color: rgb(129 151 240 / 55%);
  box-shadow: 0 10px 20px rgb(0 0 0 / 25%);
  transform: translateY(-1px);
}

.kgm-modal .shortcuts .shortcut-label {
  display: inline-flex;
  gap: 6px;
  justify-content: flex-start;
  align-items: center;
  min-width: 0;
  color: #cfdbff;
  font-weight: 600;
  font-size: 11px;
  text-align: left;
}

.kgm-modal .shortcuts .shortcut-label span {
  line-height: 1.25;
  white-space: normal;
  overflow-wrap: anywhere;
}

.kgm-modal .shortcuts .shortcut-label i {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(180deg, #2f5287, #22385f);
  color: #eff5ff;
  box-shadow: 0 3px 8px rgb(0 0 0 / 25%);
  font-size: 12px;
}

.kgm-modal .shortcuts .shortcut-item-color-panel .shortcut-label i {
  color: var(--action-palette);
}

.kgm-modal .shortcuts .shortcut-item-lock-image .shortcut-label i {
  color: var(--action-lock);
}

.kgm-modal .shortcuts .shortcut-keys {
  display: inline-flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: flex-start;
  align-items: center;
  place-self: end start;
}

.kgm-modal .shortcuts .shortcut-item:nth-child(3n + 1) .shortcut-label i {
  background: linear-gradient(180deg, #3f7cff, #2552d3);
}

.kgm-modal .shortcuts .shortcut-item:nth-child(3n + 2) .shortcut-label i {
  background: linear-gradient(180deg, #17b26a, #14804e);
}

.kgm-modal .shortcuts .shortcut-item:nth-child(3n) .shortcut-label i {
  background: linear-gradient(180deg, #f97316, #d9480f);
}

.kgm-modal .shortcuts kbd {
  min-width: 28px;
  padding: 3px 8px;
  border: 1px solid rgb(173 191 255 / 62%);
  border-bottom-width: 3px;
  border-radius: 6px;
  background: linear-gradient(180deg, #3a4b77 0%, #273a63 45%, #1a2641 100%);
  color: #ebf1ff;
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 24%),
    inset 0 -1px 0 rgb(6 10 20 / 55%),
    0 1px 2px rgb(3 7 15 / 45%);
  font-weight: 700;
  font-size: 11px;
  font-family: Poppins, sans-serif;
  letter-spacing: 0.3px;
  text-align: center;
  text-transform: uppercase;
}

.kgm-modal .shortcuts .shortcut-keys kbd + kbd {
  position: relative;
  margin-left: 9px;
}

.kgm-modal .shortcuts .shortcut-keys kbd + kbd::before {
  content: '+';
  position: absolute;
  top: 50%;
  left: -9px;
  color: #9cb2f8;
  font-weight: 700;
  font-size: 11px;
  transform: translateY(-50%);
}

.kgm-modal .shortcuts.shortcut-pulse {
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
  gap: 8px;
  overflow-y: auto;
  max-height: calc(100dvh - 92px);
  padding: 0 8px max(14px, env(safe-area-inset-bottom));
  border-right: var(--border) 1px solid;
  background: linear-gradient(180deg, #101526, #0b0e18);
  pointer-events: auto;
  transition: transform 0.26s ease;
  transform: translateX(-100%);
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
}

.wwidget .wform > * {
  margin: 4px;
}

.wwidget .wform > .widget-section {
  display: grid;
  gap: 8px;
  overflow: hidden;
  width: auto;
  min-height: 0;
  margin: 0;
  padding: 12px;
  border: 1px solid rgb(129 140 248 / 24%);
  border-radius: 12px;
  background: linear-gradient(180deg, rgb(20 30 52 / 86%), rgb(14 22 40 / 88%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 4%),
    0 8px 18px rgb(0 0 0 / 18%);
}

.wwidget .wform > details.widget-section[open],
.wwidget .wform > .widget-section-actions {
  overflow-y: auto;
  max-height: min(430px, 48dvh);
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
}

.wwidget .wform > .widget-section-images[open] {
  max-height: min(520px, 54dvh);
}

.wwidget .widget-section-title {
  display: inline-flex;
  gap: 7px;
  align-items: center;
  min-width: 0;
  color: #dbe5ff;
  font-weight: 700;
  font-size: 11px;
  line-height: 1.25;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.wwidget .widget-section-images .images {
  max-height: min(30dvh, 320px);
  padding: 4px 0;
}

.wwidget .wform button,
.wwidget .wform input,
.wwidget .wform select,
.wwidget .wform textarea,
.wwidget .wform label:has(input[type='checkbox']) {
  padding: 10px 12px;
}

.wwidget .widget-section-actions > button,
.wwidget .widget-image-actions button {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
}

.wwidget .widget-section-actions > button i,
.wwidget .widget-image-actions button i {
  color: #8fd8ff;
}

.wwidget .widget-actions button i {
  color: #8fd8ff;
}

.wwidget .mobile-controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
}

.wwidget .mobile-controls button {
  display: inline-flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  padding: 8px 6px;
  line-height: 1.15;
  text-align: center;
  white-space: normal;
}

.wwidget .mobile-controls button i {
  color: #8fd8ff;
  font-size: 14px;
}

.wwidget .autooverlay-start i,
.wwidget .autofarm-start i {
  color: #5fe39a;
}

.wwidget .autooverlay-stop i,
.wwidget .autofarm-stop i {
  color: #ff7b8f;
}

.wwidget .autooverlay-config i,
.wwidget .autofarm-config i {
  color: #ffcf66;
}

.wwidget .external-tools-actions button {
  justify-content: center;
  width: 100%;
  min-height: 44px;
  text-align: center;
  white-space: normal;
}

.wwidget .external-tools-actions button span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.wwidget .tool-color-converter i {
  color: #ff8bd1;
}

.wwidget .tool-samuel-archive i {
  color: #a7f3d0;
}

.wwidget .tool-eralyon-archive i {
  color: #93c5fd;
}

.wwidget .external-tools-help {
  margin-top: 8px;
  color: #aebcf1;
  font-size: 11px;
  line-height: 1.35;
  white-space: normal;
  overflow-wrap: anywhere;
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
  padding-right: 12px;
  background-image: linear-gradient(180deg, #1a2948 0%, #131d34 100%);
  background-position: 0 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #edf2ff;
  font-weight: 700;
  font-size: 12px;
  appearance: none;
  color-scheme: dark;
}

.wform select option {
  background: #111a2f;
  color: #ecf2ff;
  font-weight: 700;
  font-size: 12px;
}

.wform select option:checked {
  background: #265fc2;
  color: #fff;
}

.wform select option:hover {
  background: #1a315d;
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
  grid-template-columns: minmax(0, 1fr);
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

.wwidget .preview-dialog .preview-strategy-row {
  margin: 0 0 10px;
}

.wwidget .preview-dialog .preview-strategy-row .strategy-controls {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}

.kgm-modal .kgm-select {
  width: 100%;
  min-height: 38px;
  padding: 9px 34px 9px 12px;
  border: 1px solid var(--input-border);
  border-radius: 10px;
  background: linear-gradient(180deg, #1a2948 0%, #131d34 100%);
  color: #edf2ff;
  font-weight: 700;
  font-size: 12px;
  appearance: none;
  color-scheme: dark;
}

.kgm-modal .kgm-select option {
  background: #111a2f;
  color: #ecf2ff;
}

.kgm-button-grid {
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(180px, 100%), 1fr)
  ) !important;
  gap: 10px !important;
  align-items: stretch;
}

.kgm-button-grid .shield-checker i {
  color: #22c55e;
}

.kgm-button-grid .shield-info i {
  color: #60a5fa;
}

.kgm-button-grid .shield-refresh-profile i {
  color: #fbbf24;
}

.kgm-capture-overlay {
  position: fixed;
  inset: 0;
  z-index: 999999;
  background: rgb(7 12 24 / 18%);
  cursor: crosshair;
}

.kgm-capture-hint {
  position: fixed;
  top: 16px;
  left: 50%;
  padding: 6px 10px;
  border: 1px solid rgb(129 140 248 / 45%);
  border-radius: 8px;
  background: rgb(12 18 34 / 88%);
  color: #e8eeff;
  font-weight: 700;
  font-size: 12px;
  pointer-events: none;
  transform: translateX(-50%);
}

.kgm-capture-box {
  position: fixed;
  border: 1px solid #7ea4ff;
  background: rgb(126 164 255 / 24%);
  box-shadow:
    0 0 0 1px rgb(5 8 16 / 45%),
    inset 0 0 0 1px rgb(211 224 255 / 28%);
  pointer-events: none;
}

.wform .wprogress {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  width: 100%;
  height: 48px;
  margin: 0;
  border: 1px solid rgb(129 140 248 / 28%);
  border-radius: 14px;
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
  border-radius: 12px;
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
  font-size: 12px;
  letter-spacing: 0.2px;
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
  overflow: auto;
  box-sizing: border-box;
  width: min(100% - 16px, var(--kgm-modal-width, 560px));
  max-width: calc(100vw - 16px);
  max-height: calc(100dvh - 16px);
  margin: auto;
  border: 1px solid rgb(130 150 255 / 35%);
  border-radius: 14px;
  background: linear-gradient(180deg, #131c34 0%, #0e1526 100%);
  color: var(--text);
  box-shadow:
    0 24px 46px rgb(2 6 23 / 62%),
    0 0 0 1px rgb(143 162 255 / 22%);
  container-type: inline-size;
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
  flex-wrap: wrap;
  gap: 8px 12px;
  justify-content: space-between;
  align-items: center;
  min-width: 0;
  margin: -2px -2px 10px;
  padding: 4px 44px 10px 2px;
  background: linear-gradient(180deg, rgb(19 28 52 / 98%), rgb(19 28 52 / 72%));
  backdrop-filter: blur(4px);
}

.kgm-modal-head strong {
  min-width: 0;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.colors-dialog {
  --kgm-modal-width: 560px;

  min-width: min(320px, calc(100vw - 16px));
  min-height: min(420px, calc(100dvh - 16px));
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
  --kgm-modal-width: 760px;

  min-width: min(330px, calc(100vw - 16px));
  max-height: min(86dvh, 720px);
  padding: 12px;
}

.preview-dialog-help {
  margin: 0 0 10px;
  color: #b4bfdc;
  font-size: 12px;
}

.autofarm-dialog {
  --kgm-modal-width: 520px;

  max-height: min(88dvh, 760px);
  padding: 14px;
}

.update-required-dialog {
  --kgm-modal-width: 460px;

  padding: 14px;
}

.update-required-dialog .kgm-modal-head {
  padding-right: 2px;
}

.update-required-text {
  margin: 0 0 14px;
  color: #c8d3ee;
  font-size: 13px;
  line-height: 1.5;
}

.autofarm-form {
  display: grid;
  gap: 12px;
}

.autofarm-help {
  margin: 0;
  color: #b8c4e6;
  font-size: 12px;
}

.autofarm-label {
  display: grid;
  gap: 6px;
}

.kgm-switch-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  overflow: visible;
  box-sizing: border-box;
  min-height: 48px;
  padding: 10px 12px;
  border: 1px solid rgb(143 162 255 / 24%);
  border-radius: 10px;
  background: linear-gradient(180deg, rgb(22 34 60 / 96%), rgb(17 26 46 / 96%));
  text-align: left;
  white-space: normal;
}

.kgm-switch-row .with-icon {
  display: inline-flex;
  gap: 9px;
  justify-content: flex-start;
  align-items: center;
  min-width: 0;
  line-height: 1.25;
}

.kgm-switch-row .with-icon span {
  min-width: 0;
}

.kgm-switch-row .with-icon svg {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
}

.kgm-switch-row .kgm-option-icon {
  overflow: visible;
  filter: drop-shadow(0 0 6px rgb(125 211 252 / 22%));
}

.kgm-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 44px;
  height: 26px;
}

.kgm-switch input {
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
}

.kgm-switch-slider {
  position: relative;
  width: 44px;
  height: 26px;
  border: 1px solid rgb(141 160 255 / 45%);
  border-radius: 999px;
  background: #233357;
  box-shadow: inset 0 2px 4px rgb(3 8 18 / 38%);
  transition:
    background 0.22s ease,
    border-color 0.22s ease;
}

.kgm-switch-slider::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(180deg, #f2f6ff, #d4deff);
  box-shadow: 0 3px 10px rgb(1 6 15 / 35%);
  transition: transform 0.22s ease;
}

.kgm-switch input:checked + .kgm-switch-slider {
  border-color: rgb(80 209 150 / 76%);
  background: linear-gradient(180deg, #1f7c5f, #1b5d4a);
}

.kgm-switch input:checked + .kgm-switch-slider::after {
  transform: translateX(18px);
}

.kgm-switch input:focus-visible + .kgm-switch-slider {
  box-shadow:
    0 0 0 3px rgb(129 140 248 / 35%),
    inset 0 2px 4px rgb(3 8 18 / 38%);
}

.autofarm-fields {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}

.autofarm-value,
.autofarm-unit {
  min-height: 34px;
  border: 1px solid var(--input-border);
  border-radius: 8px;
  background: var(--input-bg);
  color: var(--text);
}

.autofarm-value {
  padding: 0 10px;
}

.autofarm-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.autofarm-actions button {
  min-height: 34px;
  border: 1px solid rgb(141 160 255 / 34%);
  border-radius: 8px;
  background: linear-gradient(180deg, #273559, #1b2743);
  color: #ebf1ff;
  font-weight: 600;
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

.color-tools {
  display: grid;
  gap: 6px;
  margin-bottom: 10px;
}

.color-tools .kgm-switch-row {
  margin: 0;
}

.color-tools .with-icon i {
  color: #8fd8ff;
  font-size: 17px;
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
  --kgm-modal-width: 440px;

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
.access-serial,
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

.account-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 8px;
  margin-top: 10px;
}

.account-info-card {
  display: grid;
  gap: 4px;
  min-width: 0;
  padding: 8px;
  border: 1px solid rgb(143 162 255 / 18%);
  border-radius: 8px;
  background: #10182b;
}

.account-info-card span {
  color: #aab7df;
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
}

.account-info-card strong {
  color: #edf2ff;
  font-size: 11px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.images-collapse-state {
  margin-left: auto;
  color: #aab7df;
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
}

.autofarm-range-row[hidden] {
  display: none;
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

.replacement-dialog {
  --kgm-modal-width: 760px;
}

.replacement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
  overflow: auto;
  max-height: 62dvh;
  padding: 6px 4px 2px;
}

.replacement-option {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  min-height: 44px;
  border: 1px solid rgb(143 162 255 / 24%);
  border-radius: 8px;
  background: #17233f;
  color: #ebf1ff;
}

.replacement-option .dot {
  width: 14px;
  height: 14px;
  border: 1px solid rgb(255 255 255 / 25%);
  border-radius: 4px;
  background: var(--option-color);
}

.replacement-option.active {
  border-color: rgb(95 227 154 / 70%);
  box-shadow: 0 0 0 1px rgb(95 227 154 / 45%) inset;
}

.wtopbar {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(44px, 1fr));
  gap: 6px;
  width: min(268px, calc(100vw - 20px));
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
  color: #b9c8ff;
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
  color: var(--action-delete);
  text-shadow: 0 0 12px rgb(255 107 107 / 35%);
}

.wtopbar button.open-colors {
  color: var(--action-palette);
  text-shadow: 0 0 12px rgb(255 159 67 / 35%);
}

.wtopbar button.export {
  color: var(--action-download);
  text-shadow: 0 0 12px rgb(85 217 119 / 32%);
}

.wtopbar button.lock.locked {
  color: var(--action-lock);
  text-shadow: 0 0 12px rgb(255 209 102 / 40%);
}

.wtopbar button.lock {
  color: var(--action-lock);
  text-shadow: 0 0 10px rgb(255 209 102 / 25%);
}

.wwidget .images .image .image-controls .colors,
.wwidget .images .image .image-controls .download,
.wwidget .images .image .image-controls .delete,
.wwidget .images .image .image-controls .preview-strategy {
  display: grid;
  place-items: center;
}

.wwidget .images .image .image-controls button i {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  font-size: 14px;
  line-height: 1;
}

.kgm-modal .shield-config-open i {
  color: #8fd8ff;
}

.shield-control-grid {
  display: grid;
  gap: 6px;
  margin-top: 8px;
}

.shield-controls .wp {
  margin-bottom: 6px;
}

.wwidget .images .image .image-controls .delete {
  color: var(--action-delete);
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

@container (width <= 320px) {
  .wwidget .actions-inline {
    grid-template-columns: 1fr;
  }

  .wwidget .actions-inline button {
    min-height: 42px;
  }
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
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (width <= 480px) {
  .wwidget .title {
    padding: 12px 10px 10px 58px;
    font-size: 16px;
  }

  .wwidget .widget-logo {
    width: 42px;
  }

  .wwidget .widget-brand-text {
    font-size: 17px;
  }

  .wwidget .wopen-button {
    top: 10px;
    left: 10px;
    width: 38px;
    height: 38px;
  }

  .wform {
    font-size: 12px;
  }

  .wform > * {
    width: calc(100% - 8px);
    margin: 4px;
    white-space: normal;
  }

  .wwidget .wform button,
  .wwidget .wform input,
  .wwidget .wform select,
  .wwidget .wform textarea,
  .wwidget .wform label:has(input[type='checkbox']) {
    padding: 10px 11px;
  }

  .wwidget .images {
    max-height: 22dvh;
    padding: 4px 6px;
  }

  .kgm-modal .shortcuts .shortcut-item {
    grid-template-columns: minmax(0, 1fr);
    padding: 6px 7px;
  }

  .kgm-modal .shortcuts .shortcut-label,
  .kgm-modal .shortcuts kbd {
    font-size: 10px;
  }

  .kgm-modal .shortcuts .shortcut-keys {
    justify-self: start;
  }

  .kgm-modal .shortcuts .shortcut-list {
    grid-template-columns: 1fr;
  }

  .kgm-switch-row {
    grid-template-columns: 1fr;
    gap: 8px;
    align-items: start;
  }

  .kgm-switch {
    justify-self: end;
  }
}

@media (width <= 360px) {
  .wwidget .title {
    padding-left: 52px;
  }

  .wwidget .widget-brand {
    gap: 8px;
  }

  .wwidget .widget-brand-text {
    font-size: 15px;
  }

  .wwidget .widget-brand-text::after {
    width: 34px;
  }

  .wform .wprogress span {
    font-size: 10px;
  }

  .wwidget .images .image .image-controls {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .wwidget .images .image .image-controls button {
    width: 100%;
    height: 28px;
  }
}

.wwidget .widget-section-progress {
  gap: 10px;
  padding: 14px;
  border-color: rgb(103 205 255 / 30%);
  background:
    radial-gradient(circle at 90% 20%, rgb(56 189 248 / 18%), transparent 52%),
    linear-gradient(180deg, rgb(21 35 61 / 92%), rgb(13 24 43 / 92%));
}

.wwidget .widget-section-progress .widget-section-head {
  justify-content: flex-start;
}

.wwidget .widget-section-progress .widget-section-title i {
  color: #67d0ff;
}

.shield-profile-row {
  display: grid;
  gap: 6px;
  margin: 8px 0;
}

.shield-profile-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #334;
  border-radius: 8px;
  background: #111a2e;
  color: #fff;
}

.shield-refresh-profile i,
.shield-checker i {
  margin-right: 6px;
  color: #8fd8ff;
}

.shield-ip-card {
  display: grid;
  gap: 5px;
  margin: 8px 0 10px;
  padding: 10px 12px;
  border: 1px solid rgb(143 162 255 / 26%);
  border-radius: 12px;
  background:
    radial-gradient(circle at 92% 20%, rgb(143 216 255 / 12%), transparent 45%),
    linear-gradient(180deg, rgb(19 30 53 / 96%), rgb(13 22 40 / 96%));
}

.shield-ip-card span {
  color: #9eb1ee;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.45px;
  text-transform: uppercase;
}

.shield-ip-card strong {
  color: #eef6ff;
  font-size: 15px;
  letter-spacing: 0.2px;
}

.shield-ip-card small {
  color: #b7c7f5;
  font-size: 11px;
  line-height: 1.35;
}

.shield-checker-output {
  display: grid;
  gap: 6px;
  margin-bottom: 10px;
  color: #dce8ff;
  font-size: 12px;
}

.shield-checker-output .ok {
  color: #9bf2c5;
}

.shield-checker-output .fail {
  color: #ffb4bc;
}

.kgm-modal .challenge-button,
.wwidget .challenge-button {
  position: relative;
  display: inline-flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border-color: rgb(126 146 255 / 42%);
  border-radius: 12px;
  background: linear-gradient(180deg, #14203a 0%, #111a30 100%);
  color: #e6eeff;
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 5%),
    0 1px 0 rgb(7 11 22 / 35%);
  line-height: 1.2;
  text-align: center;
  white-space: normal;
}

.kgm-modal .challenge-button i,
.kgm-modal .challenge-button span,
.wwidget .challenge-button i,
.wwidget .challenge-button span {
  position: relative;
  z-index: 1;
}

.kgm-modal .challenge-button i,
.wwidget .challenge-button i {
  display: inline-grid;
  flex: 0 0 20px;
  place-items: center;
  width: 20px;
  height: 20px;
  margin: 0;
  font-size: 15px;
  line-height: 1;
}

.kgm-modal .challenge-button span,
.wwidget .challenge-button span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.kgm-modal .challenge-button::before,
.wwidget .challenge-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgb(143 216 255 / 18%) 45%,
    transparent 72%
  );
  opacity: 0;
  transform: translateX(-120%);
}

.kgm-modal .challenge-button:hover,
.wwidget .challenge-button:hover {
  border-color: rgb(143 216 255 / 64%);
  background: linear-gradient(180deg, #172845 0%, #13213a 100%);
  box-shadow:
    0 10px 22px rgb(3 8 18 / 30%),
    0 0 0 1px rgb(143 216 255 / 20%);
}

.kgm-modal .challenge-button:hover::before,
.wwidget .challenge-button:hover::before {
  opacity: 1;
  animation: button-shine 0.82s ease forwards;
}

.kgm-modal .challenge-button:disabled,
.wwidget .challenge-button:disabled {
  opacity: 0.72;
  filter: grayscale(0.25);
  cursor: wait;
}

.script-update i,
.proxy-test i,
.shield-refresh-profile i,
.shield-checker i,
.shield-info i {
  color: #8fd8ff;
  filter: drop-shadow(0 0 8px rgb(143 216 255 / 34%));
}

.shield-info-dialog {
  --kgm-modal-width: 680px;

  max-height: min(88dvh, 760px);
  padding: 14px;
}

.shield-info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.shield-info-card {
  display: grid;
  gap: 6px;
  min-width: 0;
  padding: 10px;
  border: 1px solid rgb(143 162 255 / 24%);
  border-radius: 12px;
  background: linear-gradient(180deg, rgb(24 36 64 / 96%), rgb(15 24 43 / 96%));
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 7%);
  animation: card-rise 0.28s ease both;
}

.shield-info-card span,
.shield-info-modules span {
  color: #9eb1ee;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.shield-info-card strong {
  overflow: hidden;
  color: #eef4ff;
  font-size: 12px;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.shield-info-modules {
  display: grid;
  gap: 6px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid rgb(143 162 255 / 20%);
  border-radius: 12px;
  background: rgb(15 23 42 / 68%);
}

.shield-info-modules p {
  margin: 0;
  color: #dce8ff;
  font-size: 12px;
  line-height: 1.5;
}

.shield-checker-output .pending {
  color: #b8c7ff;
}

@keyframes button-shine {
  from {
    transform: translateX(-120%);
  }

  to {
    transform: translateX(120%);
  }
}

@keyframes card-rise {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (width <= 700px) {
  .shield-info-grid {
    grid-template-columns: 1fr;
  }
}
`;class mo extends Error{name="KGlacerMacroError";constructor(o,a){super(o);a.widget.status=o}}class Jo extends mo{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var A={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0},startAutoFarm:{key:"f",shift:!0},stopAutoFarm:{key:"g",shift:!0},openColorConverterTool:{key:"1",shift:!0},openSamuelArchiveTool:{key:"2",shift:!0},openEralyonArchiveTool:{key:"3",shift:!0},openReceiveSmssTool:{key:"4",shift:!0},openEsimplusTool:{key:"5",shift:!0},openReceiveSmsFreeTool:{key:"6",shift:!0},openQuackrTool:{key:"7",shift:!0},openTextverifiedTool:{key:"8",shift:!0}};function F(o,a){let l=a.key.toLowerCase(),i=o.key.toLowerCase(),r=(o.code??"").toLowerCase(),s=l==="/"&&(i==="/"||i==="?"||r==="slash"),c=a.shift===!0&&/^\d$/.test(l)&&(r===`digit${l}`||r===`numpad${l}`),g=s||c||i===l,p=a.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,d=a.ctrl===!0?!0:a.meta===!0?o.metaKey:!o.metaKey;return g&&o.shiftKey===Boolean(a.shift)&&p&&d&&o.altKey===Boolean(a.alt)}function $o(o){if(typeof HTMLElement>"u")return!1;if(!(o instanceof HTMLElement))return!1;let a=o.tagName.toLowerCase();return a==="input"||a==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var yo=`<button class="wopen-button" aria-label="Toggle widget">\r
  <svg viewBox="0 0 24 24" aria-hidden="true">\r
    <path d="M4 7h16M4 12h16M4 17h16"/>\r
  </svg>\r
</button>\r
<div class="title">\r
  <div class="widget-brand">\r
    <img class="widget-logo" src="" alt="KGlacer Macro logo" />\r
    <span class="widget-brand-text">KGlacerMacro</span>\r
  </div>\r
</div>\r
<div class="wform">\r
  <section class="widget-section widget-section-general">\r
    <div class="widget-section-head">
      <strong class="widget-section-title" data-i18n="generalSection">General</strong>
      <button class="open-config open-config-toggle" title="Open settings">
        <i class="fa-solid fa-sliders"></i>
        <span data-i18n="openConfig">Config</span>
      </button>
    </div>
    <div class="mobile-controls" aria-label="Mobile controls">
      <button class="mobile-minimize" type="button">
        <i class="fa-solid fa-compress" aria-hidden="true"></i>
        <span data-i18n="mobileMinimize">Hide panel</span>
      </button>
      <button class="mobile-settings" type="button">
        <i class="fa-solid fa-sliders" aria-hidden="true"></i>
        <span data-i18n="openConfig">Config</span>
      </button>
      <button class="mobile-scroll-images" type="button">
        <i class="fa-solid fa-images" aria-hidden="true"></i>
        <span data-i18n="imagesSection">Images</span>
      </button>
    </div>
    <div class="wp wstatus"></div>
  </section>
\r
  <details class="widget-section widget-section-actions" open>\r
    <summary class="widget-section-summary">\r
      <strong class="widget-section-title" data-i18n="actionsSection">Actions</strong>\r
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>\r
    </summary>\r
    <button class="draw" disabled><i class="fa-solid fa-pen-nib"></i><span data-i18n="draw">Draw</span></button>\r
    <button class="draw-and-paint" disabled><i class="fa-solid fa-wand-magic-sparkles"></i><span data-i18n="drawAndPaint">Draw + Paint</span></button>\r
    <button class="capture-template" disabled>\r
      <i class="fa-solid fa-camera" aria-hidden="true"></i>\r
      <span data-i18n="captureTemplate">Capture template</span>\r
    </button>\r
    <button class="toggle-overlay"><i class="fa-solid fa-layer-group"></i><span data-i18n="toggleOverlay">Hide/show overlays</span></button>\r
    <button class="autooverlay-config"><i class="fa-solid fa-clock-rotate-left"></i><span data-i18n="configureAutoOverlay">Configure auto draw</span></button>\r
    <div class="wp autooverlay-status" data-i18n="autoOverlayStopped">Stopped</div>\r
    <div class="actions-inline">\r
      <button class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start Auto Drawing</span></button>\r
      <button class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop Auto Drawing</span></button>\r
    </div>\r
  </details>\r
\r
  <details class="widget-section widget-section-autofarm">\r
    <summary class="widget-section-summary">\r
      <strong class="widget-section-title" data-i18n="autoFarmSection">Auto farm</strong>\r
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>\r
    </summary>\r
    <div class="widget-actions">\r
      <button class="autofarm-config"><i class="fa-solid fa-screwdriver-wrench"></i><span data-i18n="configureAutoFarm">Configure auto farm</span></button>\r
      <div class="actions-inline">\r
        <button class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start Auto Farm</span></button>\r
        <button class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop Auto Farm</span></button>\r
      </div>\r
      <div class="wp autofarm-status" data-i18n="autoFarmStopped">Stopped</div>\r
    </div>\r
  </details>\r
\r
  <details class="widget-section widget-section-tools">\r
    <summary class="widget-section-summary">\r
      <strong class="widget-section-title" data-i18n="externalToolsSection">External tools</strong>\r
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>\r
    </summary>\r
    <div class="widget-actions external-tools-actions">\r
      <button class="tool-color-converter" type="button"><i class="fa-solid fa-droplet"></i><span data-i18n="toolColorConverter">Color converter</span></button>\r
      <button class="tool-samuel-archive" type="button"><i class="fa-solid fa-clock-rotate-left"></i><span data-i18n="toolSamuelArchive">Samuel archive</span></button>\r
      <button class="tool-eralyon-archive" type="button"><i class="fa-solid fa-map-location-dot"></i><span data-i18n="toolEralyonArchive">Eralyon archive</span></button>\r
      <button class="tool-receive-smss" type="button"><i class="fa-solid fa-sim-card"></i><span>receive-smss</span></button>\r
      <button class="tool-esimplus" type="button"><i class="fa-solid fa-mobile-screen-button"></i><span>esimplus</span></button>\r
      <button class="tool-receive-sms-free" type="button"><i class="fa-solid fa-comment-sms"></i><span>receive-sms-free</span></button>\r
      <button class="tool-quackr" type="button"><i class="fa-solid fa-feather-pointed"></i><span>quackr</span></button>\r
      <button class="tool-textverified" type="button"><i class="fa-solid fa-shield-halved"></i><span>textverified</span></button>\r
    </div>\r
    <div class="wp external-tools-help" data-i18n="externalToolsHelp">Opens tools centered on the current Wplace URL zone when lat/lng/zoom are available.</div>\r
  </details>\r
\r
  <section class="widget-section widget-section-progress">\r
    <div class="widget-section-head">\r
      <strong class="widget-section-title"><i class="fa-solid fa-chart-line"></i><span data-i18n="progressSection">Progress</span></strong>\r
    </div>\r
    <div class="wprogress"><div></div><span></span></div>\r
  </section>\r
\r
  <details class="widget-section widget-section-images" open>
    <summary class="widget-section-summary">
      <strong class="widget-section-title" data-i18n="imagesSection">Images</strong>
      <span class="images-collapse-state" data-i18n="widgetImagesCollapse">Collapse images</span>
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
    </summary>
    <div class="widget-image-actions">\r
      <button class="add-image" disabled><i class="fa-solid fa-image"></i><span data-i18n="addImage">Add image</span></button>\r
      <label class="strategy-row">\r
        <span data-i18n="strategy">Strategy</span>:&nbsp;\r
        <span class="strategy-controls">\r
          <select class="strategy">\r
            <option value="SEQUENTIAL" selected data-i18n="sequential">Sequential</option>\r
            <option value="ALL" data-i18n="all">All</option>\r
            <option value="PERCENTAGE" data-i18n="percentage">Percentage</option>\r
          </select>\r
        </span>\r
      </label>\r
    </div>\r
    <div class="images"></div>\r
  </details>\r
</div>\r
`;var oa="kglacer-macro:overlay-hidden",aa="kglacer-macro:images-collapsed",la="kglacer-macro:auto-farm-config",ia="kglacer-macro:auto-overlay-config",ra="kglacer-macro:proxy-config",sa="__afm_proxy_hint",Ya=["https://api.ipify.org?format=json","https://icanhazip.com"],Ea="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg",Oa="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/version.ts",ca="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/dist.user.js",Ia="https://pepoafonso.github.io/color_converter_wplace/es/index.html",ga="https://wplace.samuelscheit.com/",pa="https://wplace.eralyon.net/",da="v69.051",_a="https://receive-smss.com/",va="https://esimplus.me/temporary-numbers",$a="https://receive-sms-free.cc/",ya="https://quackr.io/?srsltid=AfmBOoqu2h3Pt6-h3HtJ_tixaj5WGtA7ZaI9sLQiQnPTnisDxe0MXbje",ol="https://www.textverified.com/free";class jo extends ao{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen");let a=this.element.querySelector(".wopen-button");if(!a)return;a.setAttribute("aria-expanded",String(o)),a.setAttribute("aria-label",o?f("mobileMinimize"):f("mobileShowPanel")),a.title=o?f("mobileMinimize"):f("mobileShowPanel")}$settings;$status;$openConfig;$mobileMinimize;$mobileSettings;$mobileScrollImages;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toolColorConverter;$toolSamuelArchive;$toolEralyonArchive;$toolReceiveSmss;$toolEsimplus;$toolReceiveSmsFree;$toolQuackr;$toolTextverified;$toggleOverlay;$autofarmConfig;$autofarmStart;$autofarmStop;$autofarmStatus;$autoOverlayConfig;$autoOverlayStart;$autoOverlayStop;$autoOverlayStatus;$strategy;$progressLine;$progressText;$images;$imagesSection;$imagesCollapseState;$wopenButton;$widgetLogo;activeImageIndex=-1;autoFarmIntervalId;autoFarmConfig;autoFarmTickRunning=!1;autoFarmPendingTick=!1;autoFarmNextTickAt;autoOverlayIntervalId;autoOverlayConfig;autoOverlayTickRunning=!1;autoOverlayPendingTick=!1;autoOverlayNextTickAt;statusRefreshIntervalId;challengeWatcherObserver;challengeWatcherRunning=!1;imagesListDirty=!0;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=yo,U(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$openConfig:".open-config",$mobileMinimize:".mobile-minimize",$mobileSettings:".mobile-settings",$mobileScrollImages:".mobile-scroll-images",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toolColorConverter:".tool-color-converter",$toolSamuelArchive:".tool-samuel-archive",$toolEralyonArchive:".tool-eralyon-archive",$toolReceiveSmss:".tool-receive-smss",$toolEsimplus:".tool-esimplus",$toolReceiveSmsFree:".tool-receive-sms-free",$toolQuackr:".tool-quackr",$toolTextverified:".tool-textverified",$toggleOverlay:".toggle-overlay",$autofarmConfig:".autofarm-config",$autofarmStart:".autofarm-start",$autofarmStop:".autofarm-stop",$autofarmStatus:".autofarm-status",$autoOverlayConfig:".autooverlay-config",$autoOverlayStart:".autooverlay-start",$autoOverlayStop:".autooverlay-stop",$autoOverlayStatus:".autooverlay-status",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images",$imagesSection:".widget-section-images",$imagesCollapseState:".images-collapse-state"}),this.$widgetLogo.src=Ea,this.$wopenButton.addEventListener("click",()=>{this.open=!this.open,this.trackAction("widget_panel_toggled",{source:"widget_button",open:this.open})}),this.$draw.addEventListener("click",()=>{this.trackAction("draw_button_clicked",{source:"widget_button"}),this.bot.draw()}),this.$drawAndPaint.addEventListener("click",()=>{this.trackAction("draw_and_paint_button_clicked",{source:"widget_button"}),this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>{this.trackAction("add_image_button_clicked",{source:"widget_button"}),this.addImage()}),this.$openConfig.addEventListener("click",()=>{this.trackAction("settings_opened",{source:"widget_button"}),this.openSettingsModal()}),this.$mobileMinimize.addEventListener("click",()=>{this.open=!1,this.trackAction("widget_panel_minimized",{source:"mobile_button"})}),this.$mobileSettings.addEventListener("click",()=>{this.trackAction("settings_opened",{source:"mobile_button"}),this.openSettingsModal()}),this.$mobileScrollImages.addEventListener("click",()=>{this.open=!0,this.$imagesSection.open=!0,this.$imagesSection.scrollIntoView({behavior:"smooth",block:"start"}),this.trackAction("mobile_scroll_images_clicked",{source:"mobile_button"})}),this.$captureTemplate.addEventListener("click",()=>{this.trackAction("capture_template_button_clicked",{source:"widget_button"}),this.captureTemplate()}),this.$toolColorConverter.addEventListener("click",()=>{this.openExternalTool("colorConverter")}),this.$toolSamuelArchive.addEventListener("click",()=>{this.openExternalTool("samuelArchive")}),this.$toolEralyonArchive.addEventListener("click",()=>{this.openExternalTool("eralyonArchive")}),this.$toolReceiveSmss.addEventListener("click",()=>{this.openExternalTool("receiveSmss")}),this.$toolEsimplus.addEventListener("click",()=>{this.openExternalTool("esimplus")}),this.$toolReceiveSmsFree.addEventListener("click",()=>{this.openExternalTool("receiveSmsFree")}),this.$toolQuackr.addEventListener("click",()=>{this.openExternalTool("quackr")}),this.$toolTextverified.addEventListener("click",()=>{this.openExternalTool("textverified")}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$autofarmConfig.addEventListener("click",()=>{this.trackAction("auto_farm_config_opened",{source:"widget_button"}),this.openAutoFarmModal()}),this.$autofarmStart.addEventListener("click",()=>{this.trackAction("auto_farm_start_clicked",{source:"widget_button"}),this.startAutoFarm()}),this.$autofarmStop.addEventListener("click",()=>{this.trackAction("auto_farm_stop_clicked",{source:"widget_button"}),this.stopAutoFarm()}),this.$autoOverlayConfig.addEventListener("click",()=>{this.trackAction("auto_draw_config_opened",{source:"widget_button"}),this.openAutoOverlayModal()}),this.$autoOverlayStart.addEventListener("click",()=>{this.trackAction("auto_draw_start_clicked",{source:"widget_button"}),this.startAutoOverlay()}),this.$autoOverlayStop.addEventListener("click",()=>{this.trackAction("auto_draw_stop_clicked",{source:"widget_button"}),this.stopAutoOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value,this.trackAction("bot_strategy_changed",{source:"widget_select",strategy:this.bot.strategy})}),this.applyImagesCollapsedPreference(),this.$imagesSection.addEventListener("toggle",()=>{if(this.persistImagesCollapsedPreference(!this.$imagesSection.open),this.refreshImagesCollapseText(),this.trackAction("widget_images_section_toggled",{source:"widget_details",open:this.$imagesSection.open,collapsed:!this.$imagesSection.open,images:this.bot.images.length}),!this.$imagesSection.open||!this.imagesListDirty)return;this.renderImagesList(),this.imagesListDirty=!1}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.loadAutoFarmConfigFromStorage(),this.loadAutoOverlayConfigFromStorage(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.statusRefreshIntervalId=window.setInterval(()=>{this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.refreshProgress()},1000),this.open=!0,window.setTimeout(()=>{this.recommendUpdateIfOutdated()},2500),console.log("[KGM][Widget] Widget mounted and opened")}trackAction(o,a={}){this.bot.trackAction(o,{source:"widget",...a})}imageTelemetry(o){let a=this.bot.images[o];if(!a)return{index:o,missing:!0};return this.bot.summarizeImageForTelemetry(a,o)}fileTelemetry(o){return{name:o.name,size:o.size,type:o.type,lastModified:o.lastModified,extension:o.name.includes(".")?o.name.split(".").pop()?.toLowerCase():""}}startChallengeWatcher(){let o=()=>{if(!this.isChallengeBlockingPaint())return;if(this.challengeWatcherRunning)return;this.challengeWatcherRunning=!0,this.status=`⌛ ${f("taskWaitingChallengeResolve")}`,this.waitForChallengeToResolve().finally(()=>{this.challengeWatcherRunning=!1})};this.challengeWatcherObserver=new MutationObserver(()=>{o()}),this.challengeWatcherObserver.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["open","style","class","value","aria-hidden"]});let a=window.setInterval(o,750);this.runOnDestroy.push(()=>{this.challengeWatcherObserver?.disconnect(),clearInterval(a)}),o()}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.trackAction("image_add_started",{source:"widget"}),this.setDisabled("add-image",!0),this.run(f("taskAddingImage"),async()=>{let o;try{await this.bot.updateColors();let a=document.createElement("input");a.type="file",a.accept=`image/*,.${_},.wplace`,a.click(),await Z(a,["change"],["cancel","error"]);let l=a.files?.[0];if(!l)throw new Jo(this.bot);o=this.fileTelemetry(l),this.trackAction("image_file_selected",{source:"file_picker",file:o}),console.log("[KGM][Widget] File selected",{name:l.name,size:l.size,type:l.type});let i;if(l.name.endsWith(`.${_}`))i=await S.fromJSON(this.bot,JSON.parse(await l.text()));else if(l.name.endsWith(".wplace")){let s=JSON.parse(await l.text());if(!s.image?.dataUrl)throw Error("Invalid .wplace file: image.dataUrl missing");let c=new Image;if(c.src=s.image.dataUrl,await Z(c,["load"],["error"]),await this.waitForStableViewportProjection(),i=new S(this.bot,J.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new q(this.bot,c)),typeof s.opacity==="number")i.opacity=Math.max(0,Math.min(1,s.opacity))}else{let s=new FileReader;s.readAsDataURL(l),await Z(s,["load"],["error"]);let c=await this.compressImageBeforeLoad(s.result),g=new Image;g.src=c,await Z(g,["load"],["error"]),await this.waitForStableViewportProjection(),i=new S(this.bot,J.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new q(this.bot,g))}this.bot.images.push(i);let r=this.bot.images.length-1;console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),this.trackAction("image_loaded",{source:"file_picker",file:o,image:this.imageTelemetry(r),images:this.bot.images.length}),await this.bot.readMap(),i.updateTasks(),H(this.bot,!0),this.bot.updateTasks(),this.update(),window.setTimeout(()=>{globalThis.location.reload()},120)}catch(a){throw this.trackAction("image_load_failed",{source:"file_picker",file:o??null,reason:a instanceof Error?a.message:"unknown"}),a}},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.trackAction("capture_template_started",{source:"widget"}),this.run(f("taskCapturingMapImage"),async()=>{try{let o=await this.resolveCaptureBounds(),{minGlobalX:a,minGlobalY:l,maxGlobalX:i,maxGlobalY:r}=o;this.trackAction("capture_template_area_selected",{source:"widget",selection:o,width:i-a+1,height:r-l+1});let s=document.createElement("canvas");s.width=Math.max(1,i-a+1),s.height=Math.max(1,r-l+1);let c=s.getContext("2d");if(!c)throw Error("Capture context unavailable");c.imageSmoothingEnabled=!1;let g=Math.floor(a/k),p=Math.floor(l/k),d=Math.floor(i/k),t=Math.floor(r/k),w=(d-g+1)*(t-p+1),n=0;for(let h=g;h<=d;h++)for(let e=p;e<=t;e++){this.status=`⌛ ${f("taskReadingTiles")} [${++n}/${w}]`;let u=await this.loadTileImage(h,e),m=h*k,z=e*k,M=Math.max(a,m),D=Math.min(i,m+k-1),P=Math.max(l,z),N=Math.min(r,z+k-1),j=M-m,K=P-z,I=D-M+1,W=N-P+1,ro=M-a,so=P-l;c.drawImage(u,j,K,I,W,ro,so,I,W)}let b=Date.now();await this.downloadCapture(s,"png",b),this.trackAction("capture_template_completed",{source:"widget",selection:o,width:s.width,height:s.height,totalTiles:w,format:"png"})}catch(o){throw this.trackAction("capture_template_failed",{source:"widget",reason:o instanceof Error?o.message:"unknown"}),o}},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,a,l){let i=a==="webp"?"image/webp":"image/png",r=await new Promise((g,p)=>{o.toBlob((d)=>{if(!d){p(Error(`Failed to create ${a.toUpperCase()} capture file`));return}g(d)},i)}),s=URL.createObjectURL(r),c=document.createElement("a");c.href=s,c.download=`wplace-capture-${l}.${a}`,c.click(),URL.revokeObjectURL(s)}async loadTileImage(o,a){let l;for(let i=1;i<=3;i++)try{let r=new Image;return r.crossOrigin="anonymous",r.referrerPolicy="no-referrer",r.src=`https://backend.wplace.live/files/s0/tiles/${o}/${a}.png?ts=${Date.now()}-${i}`,await Z(r,["load"],["error"]),r}catch(r){if(l=r,i<3)await new Promise((s)=>setTimeout(s,i*200))}throw l instanceof Error?l:Error(`Tile fetch failed (${o}/${a})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((o,a)=>{let l=document.createElement("div");l.className="kgm-capture-overlay",l.innerHTML=`<div class="kgm-capture-hint">${f("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let i=l.querySelector(".kgm-capture-box");document.body.append(l);let r,s,c=()=>{window.removeEventListener("keydown",w,!0),l.removeEventListener("pointermove",d),l.removeEventListener("pointerdown",t),l.remove()},g=(n)=>{let b=Math.min(r.x,n.x),h=Math.min(r.y,n.y),e=Math.abs(r.x-n.x)+1,u=Math.abs(r.y-n.y)+1;return{left:b,top:h,width:e,height:u}},p=(n)=>{let{left:b,top:h,width:e,height:u}=g(n);i.style.left=`${b}px`,i.style.top=`${h}px`,i.style.width=`${e}px`,i.style.height=`${u}px`},d=(n)=>{if(!r)return;p({x:n.clientX,y:n.clientY})},t=(n)=>{if(n.preventDefault(),!r){r={x:n.clientX,y:n.clientY};let M=J.fromScreenPosition(this.bot,r);s={x:M.globalX,y:M.globalY},p(r);return}let b={x:n.clientX,y:n.clientY},h=J.fromScreenPosition(this.bot,b);if(c(),!s){a(Error("Capture anchor point unavailable"));return}let e=Math.min(s.x,h.globalX),u=Math.min(s.y,h.globalY),m=Math.max(s.x,h.globalX),z=Math.max(s.y,h.globalY);if(m-e<1||z-u<1){a(Error("Capture area too small"));return}o({minGlobalX:e,minGlobalY:u,maxGlobalX:m,maxGlobalY:z})},w=(n)=>{if(n.key!=="Escape")return;c(),a(Error("Capture cancelled"))};window.addEventListener("keydown",w,!0),l.addEventListener("pointermove",d),l.addEventListener("pointerdown",t)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let a=new Image;if(a.src=o,await Z(a,["load"],["error"]),!(a.naturalWidth*a.naturalHeight>3000000||o.length>3000000))return o;let i=document.createElement("canvas");i.width=a.naturalWidth,i.height=a.naturalHeight;let r=i.getContext("2d");if(!r)return o;return r.drawImage(a,0,0),i.toDataURL("image/png")}async waitForStableViewportProjection(){let o=this.defaultImageScreenPosition(),a=0,l;for(let i=0;i<45;i++){await new Promise((d)=>requestAnimationFrame(()=>{d()}));let{anchorScreenPosition:{x:r,y:s},pixelSize:c}=this.bot.findAnchorsForScreen(o);if(!Number.isFinite(c)||c<=0){a=0;continue}let g={anchorX:r,anchorY:s,pixelSize:c};if(!l){l=g,a=1;continue}if(Math.abs(g.anchorX-l.anchorX)+Math.abs(g.anchorY-l.anchorY)+Math.abs(g.pixelSize-l.pixelSize)<0.0012)a++;else a=0;if(l=g,a>=3)return}}update(){if(this.$strategy.value=this.bot.strategy,this.refreshProgress(),this.imagesListDirty=!0,!this.$imagesSection.open)return;this.renderImagesList(),this.imagesListDirty=!1}renderImagesList(){this.$images.innerHTML="";let o=document.createDocumentFragment();for(let a=0;a<this.bot.images.length;a++){let l=this.bot.images[a],i=document.createElement("div");o.append(i),i.className="image",i.innerHTML=`<button class="preview" title="View preview">
  <img src="${l.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="focus-map" title="Go to image position"><i class="fa-solid fa-location-crosshairs" aria-hidden="true"></i></button>
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="strategy-modal" title="Strategy modal"><i class="fa-solid fa-sliders" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${a===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${a===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,i.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=a,this.trackAction("image_preview_opened",{source:"image_controls",image:this.imageTelemetry(a)}),l.openPreviewPanel()}),i.querySelector(".focus-map").addEventListener("click",()=>{this.activeImageIndex=a,this.trackAction("image_focus_requested",{source:"image_controls",image:this.imageTelemetry(a)}),l.position.scrollScreenTo()}),i.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=a,this.trackAction("image_colors_opened",{source:"image_controls",image:this.imageTelemetry(a)}),l.openColorPanel()}),i.querySelector(".strategy-modal").addEventListener("click",()=>{this.activeImageIndex=a,this.trackAction("image_strategy_modal_opened",{source:"image_controls",image:this.imageTelemetry(a)}),l.openPreviewPanel()}),i.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=a,this.trackAction("image_strategy_preview_opened",{source:"image_controls",image:this.imageTelemetry(a)}),l.openPreviewPanel()}),i.querySelector(".download").addEventListener("click",()=>{this.trackAction("image_settings_downloaded",{source:"image_controls",image:this.imageTelemetry(a)}),l.exportImage()}),i.querySelector(".delete").addEventListener("click",()=>{this.trackAction("image_deleted",{source:"image_controls",image:this.imageTelemetry(a)}),l.destroy()}),i.querySelector(".up").addEventListener("click",()=>{this.trackAction("image_reordered",{source:"image_controls",direction:"up",fromIndex:a,toIndex:a-1,image:this.imageTelemetry(a)}),eo(this.bot.images,a,a-1),this.update(),H(this.bot)}),i.querySelector(".down").addEventListener("click",()=>{this.trackAction("image_reordered",{source:"image_controls",direction:"down",fromIndex:a,toIndex:a+1,image:this.imageTelemetry(a)}),eo(this.bot.images,a,a+1),this.update(),H(this.bot)})}this.$images.append(o)}refreshProgress(){let o=0,a=0;for(let r=0;r<this.bot.images.length;r++){let s=this.bot.images[r];o+=s.pixels.pixels.length*s.pixels.pixels[0].length,a+=s.tasks.length}let l=Math.max(0,o-a),i=o>0?l/o*100|0:0;this.$progressText.textContent=`${l}/${o} ${i}% ETA: ${a/120|0}h`,this.$progressLine.style.transform=`scaleX(${i/100})`}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(oa)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let a=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",a),localStorage.setItem(oa,String(a)),this.refreshOverlayToggleText(),this.trackAction("overlay_visibility_changed",{source:"widget",hidden:a})}refreshOverlayToggleText(){let o=document.body.classList.contains("overlay-hidden"),a=o?f("disabled"):f("enabled"),l=o?'<i class="fa-solid fa-circle-xmark" aria-hidden="true"></i>':'<i class="fa-solid fa-circle-check" aria-hidden="true"></i>';this.$toggleOverlay.innerHTML=`<i class="fa-solid fa-layer-group"></i><span>${f("toggleOverlay")} (${a})</span>${l}`}applyLocaleToUI(o){uo(o),U(this.element);for(let a=0;a<this.bot.images.length;a++)this.bot.images[a].applyLocale();this.refreshOverlayToggleText(),this.refreshImagesCollapseText(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText()}applyImagesCollapsedPreference(){let o=this.readImagesCollapsedPreference();if(this.$imagesSection.open=!o,this.refreshImagesCollapseText(),this.$imagesSection.open&&this.imagesListDirty)this.renderImagesList(),this.imagesListDirty=!1}readImagesCollapsedPreference(){let o=localStorage.getItem(aa);if(o==="true")return!0;if(o==="false")return!1;return wo().imagesCollapsed??!1}persistImagesCollapsedPreference(o){localStorage.setItem(aa,String(o)),$({imagesCollapsed:o})}refreshImagesCollapseText(){this.$imagesCollapseState.textContent=this.$imagesSection.open?f("widgetImagesCollapse"):f("widgetImagesExpand")}openSettingsModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog",o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="settingsModalTitle">Settings</strong>
    <button type="button" class="modal-close" aria-label="${f("close")}"><span class="icon">×</span></button>
  </div>
  <label class="autofarm-label">
    <span data-i18n="language">Language</span>
    <div class="autofarm-fields">
      <select class="settings-locale autofarm-unit">
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  </label>
  <div class="widget-actions">
    <button type="button" class="challenge-button script-update"><i class="fa-solid fa-rotate"></i><span data-i18n="scriptUpdate">Update script</span></button>
  </div>
  <details class="shortcuts account-settings" open>
    <summary class="shortcuts-summary">
      <strong class="shortcuts-summary-title"><i class="fa-solid fa-user-shield"></i> <span data-i18n="accountInfoTitle">Account info</span></strong>
      <i class="fa-solid fa-chevron-down shortcuts-chevron" aria-hidden="true"></i>
    </summary>
    <div class="widget-actions kgm-button-grid">
      <button type="button" class="challenge-button account-info-refresh"><i class="fa-solid fa-id-card"></i><span data-i18n="accountInfoRefresh">Refresh account</span></button>
    </div>
    <div class="account-info-output shield-checker-output" aria-live="polite"></div>
  </details>
  <label class="kgm-switch-row">
    <span data-i18n="proxyEnabled">Enable proxy for web requests (beta)</span>
    <span class="kgm-switch">
      <input class="proxy-enabled" type="checkbox" />
      <span class="kgm-switch-slider" aria-hidden="true"></span>
    </span>
  </label>
  <label class="kgm-switch-row">
    <span data-i18n="shieldEnabled">Enable Script Shield</span>
    <span class="kgm-switch">
      <input class="shield-enabled" type="checkbox" />
      <span class="kgm-switch-slider" aria-hidden="true"></span>
    </span>
  </label>
  <details class="shortcuts proxy-settings">
    <summary class="shortcuts-summary">
      <strong class="shortcuts-summary-title"><i class="fa-solid fa-network-wired"></i> <span data-i18n="proxyTitle">Proxy (Beta)</span></strong>
      <i class="fa-solid fa-chevron-down shortcuts-chevron" aria-hidden="true"></i>
    </summary>
    <label class="autofarm-label"><span>Host</span><input class="proxy-host" type="text" placeholder="127.0.0.1" /></label>
    <label class="autofarm-label"><span>Port</span><input class="proxy-port" type="number" min="1" max="65535" placeholder="8080" /></label>
    <label class="autofarm-label"><span>User</span><input class="proxy-user" type="text" placeholder="optional" /></label>
    <label class="autofarm-label"><span>Pass</span><input class="proxy-pass" type="password" placeholder="optional" /></label>
    <div class="shield-ip-card">
      <span data-i18n="publicIpTitle">Public IP</span>
      <strong class="public-ip-value">—</strong>
      <small class="public-ip-route">—</small>
    </div>
    <div class="widget-actions kgm-button-grid">
      <button type="button" class="challenge-button proxy-test"><i class="fa-solid fa-plug-circle-check"></i><span data-i18n="proxyTest">Test proxy</span></button>
    </div>
    <div class="shield-checker-output proxy-test-output" aria-live="polite"></div>
  </details>
  <details class="shortcuts shield-settings">
    <summary class="shortcuts-summary">
      <strong class="shortcuts-summary-title"><i class="fa-solid fa-shield-halved"></i> <span data-i18n="shieldTitle">Shield</span></strong>
      <i class="fa-solid fa-chevron-down shortcuts-chevron" aria-hidden="true"></i>
    </summary>
    <div class="shield-controls"></div>
  </details>
  <details class="shortcuts" open>
    <summary class="shortcuts-summary">
      <strong class="shortcuts-summary-title"><i class="fa-solid fa-keyboard"></i> <span data-i18n="keyboardShortcuts">Shortcuts</span></strong>
      <i class="fa-solid fa-chevron-down shortcuts-chevron" aria-hidden="true"></i>
    </summary>
    <ul class="shortcut-list">
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-table-cells-large"></i><span data-i18n="shortcutToggleWidget">Toggle widget</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>B</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-compress"></i><span data-i18n="shortcutMinimizePanel">Minimize panel</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>M</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-eye"></i><span data-i18n="shortcutShowPanel">Show panel</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>S</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-eye-slash"></i><span data-i18n="shortcutHidePanel">Hide panel</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>H</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-layer-group"></i><span data-i18n="shortcutToggleOverlay">Toggle overlays</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>V</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-pen-nib"></i><span data-i18n="shortcutDraw">Draw</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>Enter</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-image"></i><span data-i18n="shortcutAddImage">Add image</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>I</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-sliders"></i><span data-i18n="shortcutOpenSettings">Open settings</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>/</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-forward"></i><span data-i18n="shortcutNextImage">Next image</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>N</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-backward"></i><span data-i18n="shortcutPreviousImage">Previous image</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>P</kbd></span></li>
      <li class="shortcut-item shortcut-item-color-panel"><span class="shortcut-label"><i class="fa-solid fa-palette"></i><span data-i18n="shortcutColorPanel">Color panel</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>O</kbd></span></li>
      <li class="shortcut-item shortcut-item-lock-image"><span class="shortcut-label"><i class="fa-solid fa-lock"></i><span data-i18n="shortcutLockImage">Lock image</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>L</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-hourglass-half"></i><span data-i18n="shortcutClickPaintWhenReady">Wait + click Paint</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>R</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-play"></i><span data-i18n="shortcutStartAutoFarm">Start auto farm</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>F</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-stop"></i><span data-i18n="shortcutStopAutoFarm">Stop auto farm</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>G</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-droplet"></i><span data-i18n="shortcutColorConverter">Color converter</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>1</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-clock-rotate-left"></i><span data-i18n="shortcutSamuelArchive">Samuel archive</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>2</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-map-location-dot"></i><span data-i18n="shortcutEralyonArchive">Eralyon archive</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>3</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-sim-card"></i><span>receive-smss</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>4</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-mobile-screen-button"></i><span>esimplus</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>5</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-comment-sms"></i><span>receive-sms-free</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>6</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-feather-pointed"></i><span>quackr</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>7</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-shield-halved"></i><span>textverified</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>8</kbd></span></li>
    </ul>
  </details>
</form>`,document.body.append(o),U(o);let a=o.querySelector(".settings-locale");a.value=oo(),o.querySelector(".script-update").addEventListener("click",()=>{this.openScriptUpdateUrl("settings_modal")}),a.addEventListener("change",()=>{this.applyLocaleToUI(a.value),U(o),this.trackAction("settings_locale_changed",{source:"settings_modal",locale:a.value})});let l=JSON.parse(localStorage.getItem(ra)??"{}"),i=o.querySelector(".proxy-enabled"),r=o.querySelector(".proxy-host"),s=o.querySelector(".proxy-port"),c=o.querySelector(".proxy-user"),g=o.querySelector(".proxy-pass"),p=o.querySelector(".shield-enabled"),d=o.querySelector(".proxy-settings"),t=o.querySelector(".shield-settings"),w=o.querySelector(".shield-controls"),n=o.querySelector(".proxy-test"),b=o.querySelector(".proxy-test-output"),h=o.querySelector(".public-ip-value"),e=o.querySelector(".public-ip-route"),u=o.querySelector(".account-info-refresh"),m=o.querySelector(".account-info-output"),z=async()=>{u.disabled=!0,await this.renderAccountInfoOutput(m),u.disabled=!1};u.addEventListener("click",async()=>{this.trackAction("settings_account_refresh_clicked",{source:"settings_modal"}),await this.bot.refreshControlAccess("settings").catch(()=>null),await z()}),z(),i.checked=Boolean(l.enabled),p.checked=Do(),d.open=i.checked,t.open=p.checked,this.renderShieldControls(w),r.value=l.host??"",s.value=l.port??"",c.value=l.username??"",g.value=l.password??"";let M=(P=!0)=>{let N=i.checked,j=r.value.trim(),K=s.value.trim();if(localStorage.setItem(ra,JSON.stringify({enabled:N,host:j,port:K,username:c.value.trim(),password:g.value})),localStorage.setItem(sa,N&&j&&K?`${j}:${K}`:"DIRECT/SHIELD"),P)this.trackAction("proxy_settings_changed",{source:"settings_modal",enabled:N,host:j,port:K,hasUsername:Boolean(c.value.trim()),hasPassword:Boolean(g.value)})},D=async()=>{if(h)h.textContent=f("publicIpChecking");if(e)e.textContent=this.getPublicIpRouteLabel({enabled:i.checked,host:r.value.trim(),port:s.value.trim()});let P=await this.fetchPublicIp();if(h)h.textContent=P??f("publicIpUnavailable")};for(let P of[i,r,s,c,g])P.addEventListener("change",()=>{M(),D()});i.addEventListener("change",()=>{d.open=i.checked}),M(!1),D(),n.addEventListener("click",async()=>{M();let P=r.value.trim(),N=s.value.trim();if(this.trackAction("proxy_test_started",{source:"settings_modal",host:P,port:N}),n.disabled=!0,b)b.innerHTML=`<div class="pending">⏳ ${f("proxyTesting")}</div>`;let j=await this.testProxyConnection(P,N);if(await D(),b)b.innerHTML=`<div class="${j?"ok":"fail"}">${j?"✅":"❌"} ${j?f("proxyOk"):f("proxyFail")}</div>`;else alert(j?f("proxyOk"):f("proxyFail"));this.trackAction("proxy_test_completed",{source:"settings_modal",host:P,port:N,ok:j}),n.disabled=!1}),p.addEventListener("change",()=>{t.open=p.checked,this.renderShieldControls(w),Io(p.checked),this.trackAction("shield_enabled_changed",{source:"settings_modal",enabled:p.checked}),window.setTimeout(()=>{location.reload()},120)}),o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}async renderAccountInfoOutput(o){o.innerHTML=`<div class="pending">⌛ ${f("accountInfoLoading")}</div>`;let a=this.bot.getControlSession(),[l,i,r]=await Promise.all([this.bot.fetchAccountInfo(!0).catch(()=>null),this.bot.getAccountCookieStatus({force:!0,exhaustive:!0,timeoutMs:3000}).catch(()=>({hasToken:!1,source:"none",token:null})),no().catch(()=>null)]),s=a?.access,c=a?.serial,g=[[f("settingsAccessStatus"),s?.allowed===!1?f("disabled"):f("enabled")],[f("settingsApiMode"),s?.mode??"—"],[f("settingsControlUser"),a?f("enabled"):f("disabled")],[f("settingsLicenseUser"),c?.username??s?.username??"—"],[f("settingsSerialStatus"),c?.status??(c?.valid?"active":"—")],[f("settingsSerialValidatedAt"),c?.validatedAt??"—"],[f("settingsLicenseOwner"),c?.ownerName??"—"],[f("settingsDeviceLimit"),this.formatDeviceLimit(s,c)],[f("settingsCookieJ"),i.hasToken?`${f("settingsCookieJDetected")} · ${i.token??"—"}`:f("settingsCookieJNotDetected")],[f("settingsCookieSource"),i.source],[f("settingsWplaceId"),l?.id??"—"],[f("settingsWplaceName"),l?.name??"—"],[f("settingsDiscord"),l?.discord??"—"],[f("settingsDiscordId"),l?.discordId??"—"],[f("settingsCountry"),l?.country??"—"],[f("settingsAlliance"),l?.allianceName??"—"],[f("settingsAllianceRole"),l?.allianceRole??"—"],[f("settingsLevel"),l?.level??"—"],[f("settingsPixelsPainted"),l?.pixelsPainted??"—"],[f("settingsDroplets"),l?.droplets??"—"],[f("settingsCharges"),this.formatCharges(l?.charges)],[f("settingsCustomer"),l?.isCustomer===void 0?"—":l.isCustomer?f("enabled"):f("disabled")],[f("settingsSuspension"),l?.suspensionReason??"—"],[f("settingsTimeout"),l?.timeoutUntil??"—"],[f("settingsLocalDeviceId"),r?.localDeviceId??"—"],[f("settingsFingerprint"),r?.deviceFingerprintHash??"—"],[f("settingsUserAgent"),r?.userAgent??navigator.userAgent],[f("settingsPlatform"),r?.platform??navigator.platform],[f("settingsLanguage"),r?.language??navigator.language],[f("settingsTimezone"),r?.timezone??"—"],[f("settingsScreen"),r?`${r.screenWidth}×${r.screenHeight} @${r.devicePixelRatio}`:"—"],[f("settingsTouchSupport"),r?.touchSupport?f("enabled"):f("disabled")],[f("settingsHardwareConcurrency"),r?.hardwareConcurrency??"—"],[f("settingsDeviceMemory"),r?.deviceMemory??"—"],[f("settingsMacAddress"),f("settingsMacUnavailable")]];o.innerHTML=`<div class="account-info-grid">${g.map(([p,d])=>`<div class="account-info-card"><span>${this.escapeHtml(p)}</span><strong>${this.escapeHtml(this.stringifyShieldValue(d))}</strong></div>`).join("")}</div>`}formatDeviceLimit(o,a){let l=o?.registeredDevices,i=o?.maxDevices??a?.maxDevices;if(l===void 0&&i===void 0)return"—";return`${l??"—"} / ${i??"—"}`}formatCharges(o){if(!o||typeof o!=="object")return"—";let a=o,l=typeof a.count==="number"?Math.floor(a.count):a.count;return`${this.formatUnknownValue(l)} / ${this.formatUnknownValue(a.max)} (${this.formatUnknownValue(a.cooldownMs)} ms)`}formatUnknownValue(o){if(typeof o==="string"||typeof o==="number"||typeof o==="boolean")return String(o);return"—"}renderShieldControls(o){let r={navigator:f("shieldFeatureNavigator"),userAgentData:f("shieldFeatureUaData"),screen:f("shieldFeatureScreen"),timezone:f("shieldFeatureTimezone"),canvas:f("shieldFeatureCanvas"),webgl:f("shieldFeatureWebgl"),audio:f("shieldFeatureAudio"),plugins:f("shieldFeaturePlugins"),mediaDevices:f("shieldFeatureMediaDevices"),storageEstimate:f("shieldFeatureStorage"),battery:f("shieldFeatureBattery"),speechSynthesis:f("shieldFeatureSpeech"),fonts:f("shieldFeatureFonts"),matchMedia:f("shieldFeatureMatchMedia"),sharedArrayBuffer:f("shieldFeatureSharedArrayBuffer")},s=this.readStorageJson("__afm_profile",null),c="__afm_profile_choices",g=Number(localStorage.getItem("__afm_profile_expiry")??"0"),p=this.readStorageJson("__afm_settings",{}),d=this.readStorageJson("__afm_profile_choices",[]),w={...Object.fromEntries(Object.keys(r).map((u)=>[u,!0])),...p},n=g>0?new Date(g).toLocaleString():"—",b=s?.id??"Auto",h=d.map((u)=>`<option value="${u.id}" ${u.id===b?"selected":""}>${u.id}</option>`).join(""),e=Object.entries(r).map(([u,m])=>`<label class="kgm-switch-row"><span>${m}</span><span class="kgm-switch"><input type="checkbox" data-shield-key="${u}" ${w[u]?"checked":""}/><span class="kgm-switch-slider" aria-hidden="true"></span></span></label>`).join("");o.innerHTML=`<div class="shield-profile-row"><label>${f("shieldProfile")}</label><select class="shield-profile-select"><option value="">${f("shieldProfileAuto")}</option>${h}</select></div><div class="wp shield-expiry-line">${f("shieldExpires")}: <strong>${n}</strong></div><div class="widget-actions kgm-button-grid"><button type="button" class="challenge-button shield-refresh-profile"><i class="fa-solid fa-rotate"></i><span>${f("shieldRefreshProfile")}</span></button><button type="button" class="challenge-button shield-checker"><i class="fa-solid fa-shield-check"></i><span>${f("shieldChecker")}</span></button><button type="button" class="challenge-button shield-info"><i class="fa-solid fa-circle-info"></i><span>${f("shieldInfo")}</span></button></div><div class="shield-checker-output" aria-live="polite"></div><div class="shield-control-grid">${e}</div>`,o.querySelectorAll("input[data-shield-key]").forEach((u)=>{u.addEventListener("change",()=>{let m=u.dataset.shieldKey;w[m]=u.checked,localStorage.setItem("__afm_settings",JSON.stringify(w)),this.trackAction("shield_module_changed",{source:"shield_settings",key:m,enabled:u.checked}),window.setTimeout(()=>{location.reload()},120)})}),o.querySelector(".shield-profile-select")?.addEventListener("change",(u)=>{let m=u.currentTarget.value;if(!m)localStorage.removeItem("__afm_profile");else{let z=d.find((M)=>M.id===m);localStorage.setItem("__afm_profile",JSON.stringify(z??{id:m}))}this.trackAction("shield_profile_changed",{source:"shield_settings",profileId:m||"auto"}),location.reload()}),o.querySelector(".shield-checker")?.addEventListener("click",()=>{let u=o.querySelector(".shield-checker-output");if(!u)return;let m=this.runShieldChecker();this.trackAction("shield_checker_run",{source:"shield_settings",checks:m}),u.innerHTML=m.map((z)=>`<div class="${z.ok?"ok":"fail"}">${z.ok?"✅":"❌"} ${z.label}</div>`).join("")}),o.querySelector(".shield-info")?.addEventListener("click",()=>{this.trackAction("shield_info_opened",{source:"shield_settings"}),this.openShieldInfoModal()}),o.querySelector(".shield-refresh-profile")?.addEventListener("click",()=>{this.trackAction("shield_profile_refreshed",{source:"shield_settings"}),localStorage.removeItem("__afm_profile"),localStorage.removeItem("__afm_profile_expiry"),location.reload()})}getShieldInfo(){let o=this.readStorageJson("__afm_profile",null),a=this.readStorageJson("__afm_settings",{}),l=this.readStorageJson("__afm_profile_choices",[]);return{injectedInfo:globalThis.__kgmShieldInfo,profile:o,settings:a,choices:l,expiry:Number(localStorage.getItem("__afm_profile_expiry")??"0"),enabled:localStorage.getItem("__afm_enabled")!=="false",proxyHint:localStorage.getItem(sa)??"AUTO"}}readStorageJson(o,a){try{let l=localStorage.getItem(o);if(!l)return a;return JSON.parse(l)}catch{return a}}getPublicIpRouteLabel(o){if(o.enabled&&o.host&&o.port)return`${f("publicIpProxyRoute")} (${o.host}:${o.port})`;return f("publicIpShieldRoute")}async fetchPublicIp(){for(let o of Ya)try{let a=await fetch(o,{cache:"no-store"});if(!a.ok)continue;if((a.headers.get("content-type")??"").includes("application/json")){let i=await a.json();if(typeof i.ip==="string"&&i.ip.trim())return i.ip.trim()}else{let i=(await a.text()).trim();if(i)return i}}catch{}return}openShieldInfoModal(){let o=this.getShieldInfo(),a=o.injectedInfo?.profile,l=typeof a==="object"&&a!==null?a:o.profile,i=o.injectedInfo?.settings??o.settings,r=Number(o.injectedInfo?.expiresAt??o.expiry),s=(w,n="—")=>this.stringifyShieldValue(l?.[w],n),c=l?`${s("screenWidth")}×${s("screenHeight")} @${s("devicePixelRatio")}`:"—",g=l?`${s("webglVendor")} / ${s("webglRenderer")}`:"—",p=[[f("shieldInfoInjected"),o.injectedInfo?f("enabled"):f("disabled")],[f("shieldInfoEnabled"),o.enabled?f("enabled"):f("disabled")],[f("shieldProfile"),s("id")],[f("shieldExpires"),r>0?new Date(r).toLocaleString():"—"],[f("shieldInfoBrowser"),this.stringifyShieldValue(o.injectedInfo?.detectedBrowser)],[f("shieldInfoProxyHint"),this.stringifyShieldValue(o.injectedInfo?.proxyHint,o.proxyHint)],[f("publicIpTitle"),f("publicIpChecking")],[f("shieldInfoProfiles"),o.choices.length>0?String(o.choices.length):"—"],["User-Agent",s("userAgent",navigator.userAgent)],["Platform",s("platform",navigator.platform)],["Language",s("language",navigator.language)],["Screen",c],["WebGL",g]],d=Object.entries(i).filter(([,w])=>w).map(([w])=>w).join(", "),t=document.createElement("dialog");t.className="kgm-modal shield-info-dialog",t.innerHTML=`<div class="kgm-modal-head"><strong>${f("shieldInfoTitle")}</strong><button type="button" class="modal-close" aria-label="${f("close")}"><span class="icon">×</span></button></div><div class="shield-info-grid">${p.map(([w,n])=>`<div class="shield-info-card"><span>${this.escapeHtml(w)}</span><strong${w===f("publicIpTitle")?' class="shield-info-public-ip"':""}>${this.escapeHtml(n)}</strong></div>`).join("")}</div><div class="shield-info-modules"><span>${f("shieldInfoModules")}</span><p>${this.escapeHtml(d.length>0?d:"—")}</p></div>`,document.body.append(t),this.fetchPublicIp().then((w)=>{let n=t.querySelector(".shield-info-public-ip");if(n)n.textContent=w??f("publicIpUnavailable")}),t.querySelector(".modal-close").onclick=()=>{t.close(),t.remove()},t.addEventListener("close",()=>{t.remove()}),t.showModal()}stringifyShieldValue(o,a="—"){if(o===void 0||o===null||o==="")return a;if(typeof o==="string"||typeof o==="number"||typeof o==="boolean")return String(o);return JSON.stringify(o)}escapeHtml(o){return String(o).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}async testProxyConnection(o,a){if(!o||!a)return!1;try{return await fetch(`http://${o}:${a}`,{method:"HEAD",mode:"no-cors"}),!0}catch{return!1}}runShieldChecker(){let o=this.getShieldInfo(),a=o.profile,l=o.injectedInfo?.settings,i=typeof l==="object"&&l!==null?l:o.settings,r=Boolean(o.injectedInfo??a);return[{label:f("shieldCheckInjected"),ok:r},{label:f("shieldCheckSettings"),ok:Object.keys(i).length>0},{label:f("shieldCheckProfile"),ok:Boolean(a?.id??o.injectedInfo?.profileId)},{label:f("shieldCheckChoices"),ok:o.choices.length>0},{label:f("shieldCheckNavigator"),ok:navigator.hardwareConcurrency!==0&&typeof navigator.platform==="string"}]}refreshAutoFarmStatusText(){if(!this.autoFarmConfig){this.$autofarmStatus.textContent=f("autoFarmNeedsConfig");return}this.$autofarmStatus.textContent=this.autoFarmIntervalId?`${f("autoFarmRunning")} (${this.formatAutoFarmDelay(this.autoFarmConfig.timerMs)}) · ${this.formatCountdown(this.autoFarmNextTickAt)}`:f("autoFarmStopped")}refreshAutoOverlayStatusText(){if(!this.autoOverlayConfig){this.$autoOverlayStatus.textContent=f("autoOverlayNeedsConfig");return}this.$autoOverlayStatus.textContent=this.autoOverlayIntervalId?`${f("autoOverlayRunning")} (${this.formatAutoFarmDelay(this.autoOverlayConfig.timerMs)}) · ${this.formatCountdown(this.autoOverlayNextTickAt)}`:f("autoOverlayStopped")}formatCountdown(o){if(!o)return"00:00";let a=Math.max(0,o-Date.now()),l=Math.ceil(a/1000),i=Math.floor(l/60),r=l%60;return`${f("nextRunIn")} ${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}`}formatAutoFarmDelay(o){if(o%3600000===0)return`${o/3600000}h`;if(o%60000===0)return`${o/60000}m`;return`${o/1000}s`}stopAutoFarm(){if(!this.autoFarmIntervalId)return;clearInterval(this.autoFarmIntervalId),this.autoFarmIntervalId=void 0,this.autoFarmNextTickAt=void 0,this.autoFarmPendingTick=!1,this.refreshAutoFarmStatusText(),this.trackAction("auto_farm_stopped",{source:"widget",config:this.autoFarmConfig??null})}stopAutoOverlay(){if(!this.autoOverlayIntervalId)return;clearInterval(this.autoOverlayIntervalId),this.autoOverlayIntervalId=void 0,this.autoOverlayNextTickAt=void 0,this.autoOverlayPendingTick=!1,this.refreshAutoOverlayStatusText(),this.trackAction("auto_draw_stopped",{source:"widget",config:this.autoOverlayConfig??null})}startAutoFarm(){if(!this.autoFarmConfig){this.status=`⚠️ ${f("autoFarmNeedsConfig")}`,this.refreshAutoFarmStatusText(),this.trackAction("auto_farm_start_failed",{source:"widget",reason:"missing_config"});return}this.stopAutoFarm(),this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.autoFarmIntervalId=window.setInterval(()=>{if(this.autoFarmTickRunning){this.autoFarmPendingTick=!0;return}this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.runAutoFarmCycle()},this.autoFarmConfig.timerMs),this.runAutoFarmCycle(),this.refreshAutoFarmStatusText(),this.trackAction("auto_farm_started",{source:"widget",config:this.autoFarmConfig,nextTickAt:this.autoFarmNextTickAt})}startAutoOverlay(){if(!this.autoOverlayConfig){this.status=`⚠️ ${f("autoOverlayNeedsConfig")}`,this.refreshAutoOverlayStatusText(),this.trackAction("auto_draw_start_failed",{source:"widget",reason:"missing_config"});return}this.stopAutoOverlay(),this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.autoOverlayIntervalId=window.setInterval(()=>{if(this.autoOverlayTickRunning){this.autoOverlayPendingTick=!0;return}this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.runAutoOverlayCycle()},this.autoOverlayConfig.timerMs),this.runAutoOverlayCycle(),this.refreshAutoOverlayStatusText(),this.trackAction("auto_draw_started",{source:"widget",config:this.autoOverlayConfig,nextTickAt:this.autoOverlayNextTickAt})}async runAutoFarmCycle(){if(!this.autoFarmConfig||this.autoFarmTickRunning)return;this.autoFarmTickRunning=!0;let o=this.resolveCyclePixelCount(this.autoFarmConfig);this.trackAction("auto_farm_cycle_started",{source:"widget",config:this.autoFarmConfig,pixels:o});try{let a=await this.bot.drawRandomPixelsBatch(o,0);if(!a){this.status=`⚠️ ${f("autoFarmStopped")}: ${f("autoFarmTransparentUnavailable")}`,this.trackAction("auto_farm_cycle_stopped_no_pixels",{source:"widget",pixels:o}),this.stopAutoFarm();return}await this.waitAndClickPaintButton(),this.trackAction("auto_farm_cycle_completed",{source:"widget",pixels:o,painted:a})}catch(a){throw this.trackAction("auto_farm_cycle_failed",{source:"widget",pixels:o,reason:a instanceof Error?a.message:"unknown"}),a}finally{if(this.autoFarmTickRunning=!1,this.autoFarmPendingTick&&this.autoFarmIntervalId)this.autoFarmPendingTick=!1,this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.refreshAutoFarmStatusText(),this.runAutoFarmCycle()}}async runAutoOverlayCycle(){if(!this.autoOverlayConfig||this.autoOverlayTickRunning)return;this.autoOverlayTickRunning=!0;let o=this.resolveCyclePixelCount(this.autoOverlayConfig);this.trackAction("auto_draw_cycle_started",{source:"widget",config:this.autoOverlayConfig,pixels:o});try{let a=await this.bot.drawOverlayPixelsBatch(o);if(!a){this.status=`⚠️ ${f("autoOverlayStopped")}: ${f("autoOverlayNoTasks")}`,this.trackAction("auto_draw_cycle_stopped_no_tasks",{source:"widget",pixels:o}),this.stopAutoOverlay();return}await this.waitAndClickPaintButton(),this.trackAction("auto_draw_cycle_completed",{source:"widget",pixels:o,painted:a})}catch(a){throw this.trackAction("auto_draw_cycle_failed",{source:"widget",pixels:o,reason:a instanceof Error?a.message:"unknown"}),a}finally{if(this.autoOverlayTickRunning=!1,this.autoOverlayPendingTick&&this.autoOverlayIntervalId)this.autoOverlayPendingTick=!1,this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.refreshAutoOverlayStatusText(),this.runAutoOverlayCycle()}}saveAutoFarmConfig(o){this.autoFarmConfig=o,localStorage.setItem(la,JSON.stringify(o)),$({farm:this.toControlPixelSettings(o)}),this.trackAction("auto_farm_config_saved",{source:"widget",config:o})}saveAutoOverlayConfig(o){this.autoOverlayConfig=o,localStorage.setItem(ia,JSON.stringify(o)),$({autoDraw:this.toControlPixelSettings(o)}),this.trackAction("auto_draw_config_saved",{source:"widget",config:o})}resolveCyclePixelCount(o){if(!o.usePixelRange)return Math.max(1,Math.floor(o.pixels));let a=Math.max(1,Math.floor(o.pixelRange.min)),l=Math.max(a,Math.floor(o.pixelRange.max));return a+Math.floor(Math.random()*(l-a+1))}toControlPixelSettings(o){return{usePixelRange:o.usePixelRange,pixel:Math.max(1,Math.floor(o.pixels)),pixelRange:{min:Math.max(1,Math.floor(o.pixelRange.min)),max:Math.max(1,Math.floor(o.pixelRange.max))}}}getRemotePixelSettings(o){return wo()[o]}loadAutoFarmConfigFromStorage(){let o=this.getRemotePixelSettings("farm"),a=localStorage.getItem(la);if(!a&&o){this.autoFarmConfig=this.createDefaultAutoConfig(o);return}if(!a)return;try{let l=JSON.parse(a);if(typeof l.value!=="number"||!Number.isFinite(l.value)||l.value<1)return;let i=typeof l.pixels==="number"&&Number.isFinite(l.pixels)&&l.pixels>=1?Math.floor(l.pixels):Math.max(1,Math.floor(o?.pixel??60)),r=this.normalizePixelRange(l.pixelRange,o),s=l.unit==="hours"||l.unit==="minutes"||l.unit==="seconds"?l.unit:"minutes",c=typeof l.timerMs==="number"&&l.timerMs>0?l.timerMs:s==="hours"?l.value*3600000:s==="minutes"?l.value*60000:l.value*1000;this.autoFarmConfig={value:Math.max(1,Math.floor(l.value)),pixels:i,usePixelRange:l.usePixelRange??o?.usePixelRange??!1,pixelRange:r,unit:s,timerMs:c}}catch{return}}loadAutoOverlayConfigFromStorage(){let o=this.getRemotePixelSettings("autoDraw"),a=localStorage.getItem(ia);if(!a&&o){this.autoOverlayConfig=this.createDefaultAutoConfig(o);return}if(!a)return;try{let l=JSON.parse(a);if(typeof l.value!=="number"||!Number.isFinite(l.value)||l.value<1)return;let i=typeof l.pixels==="number"&&Number.isFinite(l.pixels)&&l.pixels>=1?Math.floor(l.pixels):Math.max(1,Math.floor(o?.pixel??60)),r=this.normalizePixelRange(l.pixelRange,o),s=l.unit==="hours"||l.unit==="minutes"||l.unit==="seconds"?l.unit:"minutes",c=typeof l.timerMs==="number"&&l.timerMs>0?l.timerMs:s==="hours"?l.value*3600000:s==="minutes"?l.value*60000:l.value*1000;this.autoOverlayConfig={value:Math.max(1,Math.floor(l.value)),pixels:i,usePixelRange:l.usePixelRange??o?.usePixelRange??!1,pixelRange:r,unit:s,timerMs:c}}catch{return}}createDefaultAutoConfig(o){return{value:1,unit:"minutes",pixels:Math.max(1,Math.floor(o.pixel??60)),usePixelRange:o.usePixelRange??!1,pixelRange:this.normalizePixelRange(o.pixelRange,o),timerMs:60000}}normalizePixelRange(o,a){let l=o&&typeof o==="object"?o:a?.pixelRange,i=typeof l?.min==="number"&&Number.isFinite(l.min)?Math.max(1,Math.floor(l.min)):1,r=typeof l?.max==="number"&&Number.isFinite(l.max)?Math.max(i,Math.floor(l.max)):Math.max(i,5);return{min:i,max:r}}openAutoFarmModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let a=this.autoFarmConfig?.unit??"minutes",l=this.autoFarmConfig?.value??1,i=this.autoFarmConfig?.pixels??60,r=this.autoFarmConfig?.usePixelRange??!1,s=this.autoFarmConfig?.pixelRange??{min:1,max:5};o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoFarmModalTitle">Auto farm</strong>
    <button type="button" class="modal-close" aria-label="${f("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoFarmHelp">Paint a random pixel each timer cycle.</p>
  <label class="autofarm-label">
    <span data-i18n="autoFarmTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${l}" />
      <select class="autofarm-unit">
        <option value="seconds" data-i18n="seconds">Seconds</option>
        <option value="minutes" selected data-i18n="minutes">Minutes</option>
        <option value="hours" data-i18n="hours">Hours</option>
      </select>
    </div>
  </label>
  <label class="autofarm-label">
    <span data-i18n="autoFarmPixelsPerCycle">Pixels per cycle</span>
    <div class="autofarm-fields">
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${i}" />
    </div>
  </label>
  <label class="kgm-switch-row autofarm-range-toggle-row">
    <span data-i18n="autoFarmUsePixelRange">Use pixel range in Auto Farm</span>
    <span class="kgm-switch">
      <input class="autofarm-use-range" type="checkbox" ${r?"checked":""} />
      <span class="kgm-switch-slider" aria-hidden="true"></span>
    </span>
  </label>
  <label class="autofarm-label autofarm-range-row">
    <span data-i18n="pixelRange">Pixel range</span>
    <div class="autofarm-fields">
      <input class="autofarm-range-min" type="number" min="1" step="1" value="${s.min}" data-i18n-title="pixelRangeMin" />
      <input class="autofarm-range-max" type="number" min="1" step="1" value="${s.max}" data-i18n-title="pixelRangeMax" />
    </div>
  </label>
  <small class="access-error pixel-range-error" role="alert" aria-live="assertive"></small>
  <div class="autofarm-actions">
    <button type="button" class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start</span></button>
    <button type="button" class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),U(o);let c=o.querySelector(".autofarm-unit");c.value=a;let g=o.querySelector(".autofarm-value"),p=o.querySelector(".autofarm-pixels"),d=o.querySelector(".autofarm-use-range"),t=o.querySelector(".autofarm-range-row"),w=o.querySelector(".autofarm-range-min"),n=o.querySelector(".autofarm-range-max"),b=o.querySelector(".pixel-range-error"),h=()=>{t.hidden=!d.checked,p.disabled=d.checked};d.addEventListener("change",h),h();let e=()=>{let m=Math.max(1,Number.parseInt(g.value||"1",10));if(c.value==="hours")return m*3600000;if(c.value==="minutes")return m*60000;return m*1000},u=()=>{let m=Math.max(1,Number.parseInt(w.value||"1",10)),z=Math.max(1,Number.parseInt(n.value||"1",10));if(m>z)return b.textContent=f("pixelRangeInvalid"),null;return b.textContent="",{min:m,max:z}};o.querySelector(".autofarm-start").onclick=()=>{let m=u();if(!m)return;this.saveAutoFarmConfig({value:Math.max(1,Number.parseInt(g.value||"1",10)),pixels:Math.max(1,Number.parseInt(p.value||"60",10)),usePixelRange:d.checked,pixelRange:m,unit:c.value,timerMs:e()}),this.startAutoFarm(),o.close(),o.remove()},o.querySelector(".autofarm-stop").onclick=()=>{this.stopAutoFarm(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}openAutoOverlayModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let a=this.autoOverlayConfig?.unit??"minutes",l=this.autoOverlayConfig?.value??1,i=this.autoOverlayConfig?.pixels??60,r=this.autoOverlayConfig?.usePixelRange??!1,s=this.autoOverlayConfig?.pixelRange??{min:1,max:5};o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoOverlayModalTitle">Auto overlay timer</strong>
    <button type="button" class="modal-close" aria-label="${f("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoOverlayHelp">Paint overlay image pixels, click Paint, then repeat by timer.</p>
  <label class="autofarm-label">
    <span data-i18n="autoOverlayTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${l}" />
      <select class="autofarm-unit">
        <option value="seconds" data-i18n="seconds">Seconds</option>
        <option value="minutes" selected data-i18n="minutes">Minutes</option>
        <option value="hours" data-i18n="hours">Hours</option>
      </select>
    </div>
  </label>
  <label class="autofarm-label">
    <span data-i18n="autoOverlayPixelsPerCycle">Pixels per cycle</span>
    <div class="autofarm-fields">
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${i}" />
    </div>
  </label>
  <label class="kgm-switch-row autofarm-range-toggle-row">
    <span data-i18n="autoDrawUsePixelRange">Use pixel range in Auto Draw</span>
    <span class="kgm-switch">
      <input class="autofarm-use-range" type="checkbox" ${r?"checked":""} />
      <span class="kgm-switch-slider" aria-hidden="true"></span>
    </span>
  </label>
  <label class="autofarm-label autofarm-range-row">
    <span data-i18n="pixelRange">Pixel range</span>
    <div class="autofarm-fields">
      <input class="autofarm-range-min" type="number" min="1" step="1" value="${s.min}" data-i18n-title="pixelRangeMin" />
      <input class="autofarm-range-max" type="number" min="1" step="1" value="${s.max}" data-i18n-title="pixelRangeMax" />
    </div>
  </label>
  <small class="access-error pixel-range-error" role="alert" aria-live="assertive"></small>
  <div class="autofarm-actions">
    <button type="button" class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start</span></button>
    <button type="button" class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),U(o);let c=o.querySelector(".autofarm-unit");c.value=a;let g=o.querySelector(".autofarm-value"),p=o.querySelector(".autofarm-pixels"),d=o.querySelector(".autofarm-use-range"),t=o.querySelector(".autofarm-range-row"),w=o.querySelector(".autofarm-range-min"),n=o.querySelector(".autofarm-range-max"),b=o.querySelector(".pixel-range-error"),h=()=>{t.hidden=!d.checked,p.disabled=d.checked};d.addEventListener("change",h),h();let e=()=>{let m=Math.max(1,Number.parseInt(g.value||"1",10));if(c.value==="hours")return m*3600000;if(c.value==="minutes")return m*60000;return m*1000},u=()=>{let m=Math.max(1,Number.parseInt(w.value||"1",10)),z=Math.max(1,Number.parseInt(n.value||"1",10));if(m>z)return b.textContent=f("pixelRangeInvalid"),null;return b.textContent="",{min:m,max:z}};o.querySelector(".autooverlay-start").onclick=()=>{let m=u();if(!m)return;this.saveAutoOverlayConfig({value:Math.max(1,Number.parseInt(g.value||"1",10)),pixels:Math.max(1,Number.parseInt(p.value||"60",10)),usePixelRange:d.checked,pixelRange:m,unit:c.value,timerMs:e()}),this.startAutoOverlay(),o.close(),o.remove()},o.querySelector(".autooverlay-stop").onclick=()=>{this.stopAutoOverlay(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}getCurrentWplaceLocation(){let o=(w)=>{let n=new URLSearchParams(w.replace(/^#/,"").replace(/^\?/,"")),b=Number.parseFloat(n.get("lat")??""),h=Number.parseFloat(n.get("lng")??""),e=Number.parseFloat(n.get("zoom")??"");if(Number.isFinite(b)&&Number.isFinite(h)&&Number.isFinite(e))return{lat:b,lng:h,zoom:e}},a=globalThis.location.hash,l=a.includes("?")?a.slice(a.indexOf("?")+1):"",i=[globalThis.location.search,a,l].filter(Boolean);for(let w of i){let n=o(w);if(n)return n}let r=/#?\/?(?<zoom>-?\d+(?:\.\d+)?)\/(?<lat>-?\d+(?:\.\d+)?)\/(?<lng>-?\d+(?:\.\d+)?)/.exec(a);if(!r?.groups)return;let{lat:s,lng:c,zoom:g}=r.groups;if(!s||!c||!g)return;let p=Number.parseFloat(s),d=Number.parseFloat(c),t=Number.parseFloat(g);if(!Number.isFinite(p)||!Number.isFinite(d)||!Number.isFinite(t))return;return{lat:p,lng:d,zoom:t}}buildExternalToolUrl(o){let a=this.getCurrentWplaceLocation();if(o==="colorConverter")return Ia;if(o==="receiveSmss")return _a;if(o==="esimplus")return va;if(o==="receiveSmsFree")return $a;if(o==="quackr")return ya;if(o==="textverified")return ol;if(!a){if(o==="samuelArchive")return ga;let i=new URL(pa);return i.searchParams.set("lat","0.000000"),i.searchParams.set("lng","0.000000"),i.searchParams.set("zoom","2.00"),i.searchParams.set("version",da),i.toString()}if(o==="samuelArchive"){let i=new URL(ga);return i.hash=`${a.zoom.toFixed(2)}/${a.lat.toFixed(6)}/${a.lng.toFixed(6)}`,i.toString()}let l=new URL(pa);return l.searchParams.set("lat",a.lat.toFixed(6)),l.searchParams.set("lng",a.lng.toFixed(6)),l.searchParams.set("zoom",a.zoom.toFixed(2)),l.searchParams.set("version",da),l.toString()}openExternalTool(o){let a=this.buildExternalToolUrl(o);this.trackAction("external_tool_opened",{source:"widget",tool:o,targetUrl:a,wplaceLocation:this.getCurrentWplaceLocation()??null}),this.openUrlInNewTab(a)}openUrlInNewTab(o){let a=globalThis.open(o,"_blank","noopener");if(a){a.opener=null;return}let l=document.createElement("a");l.href=o,l.target="_blank",l.rel="noopener noreferrer",l.style.display="none",document.body.append(l),l.click(),l.remove()}setDisabled(o,a){this.element.querySelector("."+o).disabled=a}async run(o,a,l,i="..."){console.log("[KGM][Widget] Task started",{status:o});let r=this.status;this.status=`${i} ${o}`;try{let s=await a();return this.status=r,console.log("[KGM][Widget] Task completed",{status:o}),s}catch(s){if(!(s instanceof mo))console.error(s),this.status=`${f("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:s}),s}finally{await l?.()}}handleKeyboard(o){if($o(o.target))return;if(F(o,A.toggleWidget)){o.preventDefault(),this.open=!this.open,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"toggleWidget",open:this.open});return}if(F(o,A.minimizeWidget)){o.preventDefault(),this.open=!1,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"minimizeWidget"});return}if(F(o,A.showWidgetPanel)){o.preventDefault(),this.open=!0,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"showWidgetPanel"});return}if(F(o,A.hideWidgetPanel)){o.preventDefault(),this.open=!1,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"hideWidgetPanel"});return}if(F(o,A.showShortcuts)){o.preventDefault(),this.open=!0,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"showShortcuts"}),this.openSettingsModal();return}if(F(o,A.toggleOverlay)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"toggleOverlay"}),this.toggleOverlay();return}if(F(o,A.focusNextImage)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"focusNextImage"}),this.focusImageByStep(1);return}if(F(o,A.focusPreviousImage)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"focusPreviousImage"}),this.focusImageByStep(-1);return}if(F(o,A.openColorPanel)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openColorPanel"}),this.openColorPanelForActiveImage();return}if(F(o,A.toggleImageLock)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"toggleImageLock"}),this.toggleLockForActiveImage();return}if(F(o,A.clickPaintWhenReady)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"clickPaintWhenReady"}),this.drawAndClickPaintWhenReady();return}if(F(o,A.startAutoFarm)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"startAutoFarm"}),this.startAutoFarm();return}if(F(o,A.stopAutoFarm)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"stopAutoFarm"}),this.stopAutoFarm();return}if(F(o,A.openColorConverterTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openColorConverterTool"}),this.openExternalTool("colorConverter");return}if(F(o,A.openSamuelArchiveTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openSamuelArchiveTool"}),this.openExternalTool("samuelArchive");return}if(F(o,A.openEralyonArchiveTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openEralyonArchiveTool"}),this.openExternalTool("eralyonArchive");return}if(F(o,A.openReceiveSmssTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openReceiveSmssTool"}),this.openExternalTool("receiveSmss");return}if(F(o,A.openEsimplusTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openEsimplusTool"}),this.openExternalTool("esimplus");return}if(F(o,A.openReceiveSmsFreeTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openReceiveSmsFreeTool"}),this.openExternalTool("receiveSmsFree");return}if(F(o,A.openQuackrTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openQuackrTool"}),this.openExternalTool("quackr");return}if(F(o,A.openTextverifiedTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openTextverifiedTool"}),this.openExternalTool("textverified");return}if(F(o,A.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"addImage"}),this.addImage();return}if(F(o,A.draw)&&!this.$draw.disabled)o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"draw"}),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.trackAction("active_image_focused",{source:"widget",step:o,image:this.imageTelemetry(this.activeImageIndex)}),this.bot.images[this.activeImageIndex].position.scrollScreenTo()}async recommendUpdateIfOutdated(){let o=new AbortController,a=window.setTimeout(()=>{o.abort()},1800);try{let l=await fetch(Oa,{cache:"no-store",signal:o.signal});if(!l.ok)return;let i=await l.text(),s=/APP_VERSION = '([^']+)'/.exec(i)?.[1];if(!s)return;if(this.compareSemver(s,B)<=0)return;this.showRequiredUpdateDialog(s)}catch{}finally{clearTimeout(a)}}showRequiredUpdateDialog(o){if(document.querySelector(".update-required-dialog"))return;let a=document.createElement("dialog");a.className="kgm-modal update-required-dialog",a.innerHTML=`<div class="kgm-modal-head">
  <strong data-i18n="scriptUpdateRequiredTitle">Update required</strong>
</div>
<p class="update-required-text">${f("scriptUpdateRequiredBody").replace("{remoteVersion}",o).replace("{currentVersion}",B)}</p>
<button type="button" class="challenge-button update-required-button">
  <i class="fa-solid fa-rotate" aria-hidden="true"></i>
  <span data-i18n="scriptUpdateOpenUrl">Open update URL</span>
</button>`,document.body.append(a),U(a),a.addEventListener("cancel",(l)=>{l.preventDefault()}),a.querySelector(".update-required-button").addEventListener("click",()=>{this.openScriptUpdateUrl("required_update_modal",o)}),a.showModal()}openScriptUpdateUrl(o,a){this.trackAction("script_update_link_opened",{source:o,targetUrl:ca,currentVersion:B,remoteVersion:a??null}),this.openUrlInNewTab(ca)}compareSemver(o,a){let l=o.split(".").map((r)=>Number(r)||0),i=a.split(".").map((r)=>Number(r)||0);for(let r=0;r<3;r++){if((l[r]??0)>(i[r]??0))return 1;if((l[r]??0)<(i[r]??0))return-1}return 0}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;this.trackAction("active_image_colors_opened",{source:"widget",image:this.imageTelemetry(this.activeImageIndex)}),o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,this.trackAction("active_image_lock_changed",{source:"widget",locked:o.lock,image:this.imageTelemetry(this.activeImageIndex)}),o.update(),H(this.bot)}async waitAndClickPaintButton(){this.trackAction("paint_button_wait_started",{source:"widget"}),await this.run(f("taskWaitingPaintButton"),async()=>{for(;;){if(this.isChallengeBlockingPaint()){this.trackAction("paint_blocked_by_challenge",{source:"widget"}),await this.waitForChallengeToResolve(),await new Promise((a)=>setTimeout(a,250));continue}let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){await this.triggerNativePaintClickWithChallengeRecovery(o),this.trackAction("paint_button_flow_completed",{source:"widget"});return}await new Promise((a)=>setTimeout(a,150))}})}async drawAndClickPaintWhenReady(){if(this.trackAction("draw_and_paint_started",{source:"widget",drawButtonEnabled:!this.$draw.disabled}),!this.$draw.disabled)await this.bot.draw({refreshMapAfterDraw:!1});await this.waitAndClickPaintButton(),this.bot.refreshMapAfterPaint("draw_and_paint"),this.trackAction("draw_and_paint_completed",{source:"widget"})}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((l)=>Array.from(document.querySelectorAll(l))).find((l)=>/pintar|paint/i.test(l.textContent))}triggerNativePaintClick(o){o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),o.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),o.click()}async triggerNativePaintClickWithChallengeRecovery(o){for(let l=0;l<3;l++){let i=l===0?o:this.findNativePaintButton();if(!i)return;if(i.disabled||i.ariaDisabled==="true")return;this.trackAction("native_paint_clicked",{source:"widget",attempt:l+1,maxAttempts:3,buttonText:i.textContent.trim()}),this.triggerNativePaintClick(i);let r=await this.waitForPaintAttemptOutcome(2500);if(this.trackAction("native_paint_attempt_result",{source:"widget",attempt:l+1,maxAttempts:3,outcome:r}),r==="painted")return;if(r==="challenge"){await this.waitForChallengeToResolve(),await new Promise((s)=>setTimeout(s,350));continue}await new Promise((s)=>setTimeout(s,350))}console.log("[KGM][Widget] Paint click finished without a clear success signal after retries")}async waitForPaintAttemptOutcome(o){return new Promise((a)=>{let l=!1,i=(g)=>{if(l)return;l=!0,globalThis.removeEventListener("kgm:paint-response",r),a(g)},r=(g)=>{if(g.detail.ok)i("painted")};globalThis.addEventListener("kgm:paint-response",r);let s=Date.now();(async()=>{while(Date.now()-s<=o){if(this.isChallengeBlockingPaint()){i("challenge");return}let g=this.findNativePaintButton();if(g&&(g.disabled||g.ariaDisabled==="true")){let p=await this.waitForDelayedChallenge(700);i(p?"challenge":"painted");return}await new Promise((p)=>setTimeout(p,120))}i("unknown")})(),window.setTimeout(()=>{i("unknown")},o+100)})}async waitForDelayedChallenge(o){let a=Date.now();while(Date.now()-a<=o){if(this.isChallengeBlockingPaint())return!0;await new Promise((l)=>setTimeout(l,150))}return!1}async waitForChallengeToResolve(){await this.run(f("taskWaitingChallengeResolve"),async()=>{let o=Date.now(),a=90000;while(this.isChallengeBlockingPaint()&&Date.now()-o<=90000)await new Promise((l)=>setTimeout(l,500))})}isChallengeBlockingPaint(){let l=Array.from(document.querySelectorAll('h-captcha, .h-captcha, iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], [data-hcaptcha-widget-id]')).filter((s)=>{if(s.closest("dialog")?.matches("dialog:not([open])"))return!1;let c=globalThis.getComputedStyle(s);if(c.display==="none"||c.visibility==="hidden")return!1;let g=s.getBoundingClientRect();return g.width>0&&g.height>0});if(!l.length)return!1;let i=document.querySelector("dialog.modal[open], dialog[open]");if(i?.querySelector('h-captcha, .h-captcha, iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], [data-hcaptcha-widget-id]')){if(!i)return!1;if(!Array.from(i.querySelectorAll('textarea[name="h-captcha-response"], textarea[name^="h-captcha-response-"]')).some((c)=>c.value.trim().length>0))return!0}return l.some((s)=>{let c=s.closest("h-captcha")??s.parentElement??document.documentElement,g=Array.from(c.querySelectorAll('textarea[name="h-captcha-response"], textarea[name^="h-captcha-response-"]'));if(!g.length)return!0;return g.every((p)=>p.value.trim().length===0)})}}var al=2;function ll(){let o=globalThis;if(typeof o.fp_assemble_injection!=="function")o.fp_assemble_injection=()=>({});if(!o.__kgmUnhandledRejectionPatched)o.__kgmUnhandledRejectionPatched=!0,o.addEventListener("unhandledrejection",(a)=>{let l=a.reason,i=typeof l==="object"&&l!==null&&"name"in l&&typeof l.name==="string"?l.name:"",r=l instanceof Error?l.message:l;if(i==="NotAllowedError"&&r.includes("play() failed"))a.preventDefault()});if(!o.__kgmMediaPlayPatched&&"HTMLMediaElement"in o){o.__kgmMediaPlayPatched=!0;let a=Reflect.get(o.HTMLMediaElement.prototype,"play");o.HTMLMediaElement.prototype.play=function(){return Reflect.apply(a,this,[]).catch((r)=>{let s=r instanceof Error?r.message:r;if((typeof r==="object"&&r!==null&&"name"in r&&typeof r.name==="string"?r.name:"")==="NotAllowedError"&&s.includes("play() failed"))return;throw r})}}}var fa="[KGM]",ta="kgm-access-locked",wa=1500,il=45000,na=120000,io=3000,No=1800,rl="https://chromewebstore.google.com/detail/gcalenpjmijncebpfijmoaglllgpjagf";class ba{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;accountCookieTokenCache;accountCookieTokenSource="none";accountCookieTokenWarmup;accountCookieWatchIntervalId;accountCookieWatchRunning=!1;accountCookieWatchAttempts=0;lastAccountCookieWatchEventAt=0;lastSyncedAccountCookieToken;lastSyncedAccountCookieTokenAt=0;loggedUserscriptCookieApiAvailability=!1;controlSession=to();controlAccessAllowed=!1;controlAccessHardDenied=!1;lastControlAccessFailureReason;log(o,a){if(a===void 0)console.log(`${fa} ${o}`);else console.log(`${fa} ${o}`,a)}getUserscriptRuntimeStatus(){let o=this.getUserscriptInfo(),a=this.getRuntimeInfoString(o,["scriptHandler","scriptHandlerName","handler"]),l=this.getRuntimeInfoString(o,["version","scriptHandlerVersion"]),i=/tampermonkey/i.test(a),r=this.getUserscriptCookieApis().length>0;return{ok:i&&r,handler:a||"unknown",version:l||"unknown",hasTampermonkey:i,hasCookieApi:r}}isMobileRuntime(){let o=navigator.userAgent.toLowerCase();return/android|iphone|ipad|ipod|mobile/.test(o)||navigator.maxTouchPoints>1&&Math.min(screen.width,screen.height)<=1024}getUserscriptInfo(){let o=this.getPageWindow(),a=globalThis,l=o,i=a.GM_info??l.GM_info;return i&&typeof i==="object"?i:{}}getRuntimeInfoString(o,a){for(let l of a){let i=o[l];if(typeof i==="string"&&i.trim())return i.trim();if(typeof i==="number")return String(i)}return""}getUserscriptCookieApis(){let o=this.getPageWindow(),a=globalThis,l=o;return[a.GM?.cookie,l.GM?.cookie,a.GM_cookie,l.GM_cookie].filter((i)=>i!==void 0&&i!==null)}showRuntimeRequirementNotice(o,a="missing_runtime"){this.injectRuntimeRequirementStyle(),document.querySelector(".kgm-runtime-blocker")?.remove();let l=document.createElement("div");l.className="kgm-runtime-blocker";let i=document.createElement("section");i.className="kgm-runtime-blocker-panel";let r=document.createElement("strong"),s=a==="missing_cookie"?f("runtimeCookieRequiredTitle"):f("runtimeBetaRequiredTitle");r.textContent=s;let c=document.createElement("p"),g=a==="missing_cookie"?f("runtimeCookieRequiredBody"):f("runtimeBetaRequiredBody");c.textContent=g;let p=document.createElement("div");p.className="kgm-runtime-blocker-actions";let d=document.createElement("button");d.type="button",d.textContent=f("runtimeBetaInstall"),d.addEventListener("click",()=>{window.open(rl,"_blank","noopener,noreferrer")});let t=document.createElement("button");if(t.type="button",t.textContent=f("runtimeReload"),t.addEventListener("click",()=>{location.reload()}),p.append(d,t),i.append(r),g!==s)i.append(c);i.append(p),l.append(i),document.documentElement.append(l)}injectRuntimeRequirementStyle(){if(document.getElementById("kgm-runtime-requirement-style"))return;let o=document.createElement("style");o.id="kgm-runtime-requirement-style",o.textContent=`
.kgm-runtime-blocker {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(9 12 18 / 88%);
  color: #f7fafc;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.kgm-runtime-blocker-panel {
  width: min(460px, 100%);
  display: grid;
  gap: 14px;
  padding: 18px;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 8px;
  background: #151923;
  box-shadow: 0 24px 80px rgb(0 0 0 / 45%);
}

.kgm-runtime-blocker-panel strong {
  font-size: 18px;
}

.kgm-runtime-blocker-panel p {
  margin: 0;
  color: #d6dde8;
  line-height: 1.45;
}

.kgm-runtime-blocker-panel small {
  color: #9aa7ba;
}

.kgm-runtime-blocker-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.kgm-runtime-blocker-actions button {
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 6px;
  background: #2563eb;
  color: white;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.kgm-runtime-blocker-actions button + button {
  background: transparent;
}
`,document.head.append(o)}constructor(){this.log("Boot sequence started"),document.body.classList.add(ta);let o=this.getUserscriptRuntimeStatus();if(!o.ok&&!this.isMobileRuntime()){this.log("Required userscript runtime missing",o),this.showRuntimeRequirementNotice(o);return}let a=Oo();if(this.log("Save loaded",{hasSave:Boolean(a),imageCount:a?.images.length??0,strategy:a?.strategy}),a){for(let r=0;r<a.images.length;r++){let s=a.images[r];lo({x:s.position[0]-1000,y:s.position[1]-1000}),lo({x:s.position[0]+1000,y:s.position[1]+1000})}this.strategy=a.strategy}let l=JSON.parse(localStorage.getItem("kglacer-macro:proxy-config")??"{}");_o(l),this.registerFetchInterceptor(),this.log("Fetch interceptor registered"),this.primeAccountCookieToken(),this.startAccountCookieWatcher();let i=document.createElement("style");i.textContent=vo.replace("FAKE_FAVORITE_LOCATIONS",O.length.toString()),document.head.append(i),this.log("Styles injected",{fakeFavoriteLocations:O.length}),(async()=>{if(this.log("Widget initialization flow started"),!await this.ensureAccountCookieTokenReadable())return;await this.ensureControlAccess(),document.body.classList.remove(ta),this._widget=new jo(this),await this.widget.run(f("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let s=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((c)=>{for(let g=0;g<c.length;g++)if(c[g].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(s,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await Q(500),await this.updateColors(),a)for(let c=0;c<a.images.length;c++){let g=await S.fromJSON(this,a.images[c]);this.images.push(g),g.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled"),this.trackAction("bot_loaded",{source:"startup",restoredImages:this.images.length,totalTasks:this.getTotalPendingTasks()})})})()}async ensureControlAccess(){let o=to();if(o?.accessToken){this.controlSession=o,this.controlAccessAllowed=this.hasSessionCapableOfControlRefresh(o),this.controlAccessHardDenied=!1,this.refreshControlAccess("startup").catch((a)=>{this.rememberControlAccessFailure(a,"startup")});return}await new Promise((a)=>{let l=document.createElement("dialog");l.className="kgm-modal access-dialog",l.innerHTML=`<form method="dialog" class="access-form">
  <div class="kgm-modal-head">
    <strong data-i18n="loginTitle">Login</strong>
  </div>
  <p data-i18n="loginHelp">Enter your serial key.</p>
  <label class="access-label">
    <span data-i18n="loginSerialKey">Serial key</span>
    <input class="access-serial" type="password" required data-i18n-placeholder="accessInputPlaceholder" placeholder="KGM-********" />
  </label>
  <label class="access-label">
    <span data-i18n="language">Language</span>
    <select class="access-locale"></select>
  </label>
  <button type="submit" class="access-submit" data-i18n="loginSubmit">Continue</button>
  <small class="access-error" role="alert" aria-live="assertive"></small>
</form>`,document.body.append(l),U(l);let i=l.querySelector(".access-serial"),r=l.querySelector(".access-submit"),s=l.querySelector(".access-error"),c=l.querySelector(".access-locale");c.innerHTML=Vo().map((g)=>`<option value="${g}" ${g===oo()?"selected":""}>${g.toUpperCase()}</option>`).join(""),c.addEventListener("change",()=>{uo(c.value),U(l)}),l.addEventListener("cancel",(g)=>{g.preventDefault()}),l.querySelector("form").addEventListener("submit",(g)=>{g.preventDefault(),s.textContent="",r.disabled=!0,r.textContent=f("loginChecking"),(async()=>{try{let p=await this.withTimeout(this.fetchAccountInfo(!0).catch(()=>null),900,null);this.controlSession=await To({serialKey:i.value.trim(),wplaceMe:p}),this.controlAccessAllowed=!0,this.controlAccessHardDenied=!1,this.lastControlAccessFailureReason=void 0,this.trackAction("serial_login_success",{source:"serial_modal",hasWplaceAccount:Boolean(p)}),this.runAccountCookieWatcherTick("after_login"),this.syncAccountInfoWithControl("login_background"),l.close(),l.remove(),a()}catch(p){let d=p instanceof Error?p.message:f("loginErrorUnknown");s.textContent=this.mapControlLoginError(d),r.disabled=!1,r.textContent=f("loginSubmit")}})()}),l.showModal(),i.focus()})}mapControlLoginError(o){if(/invalid_serial|invalid_token|blocked_token|expired_license|inactive_license/i.test(o))return f("invalidAccessKey");if(/device_limit/i.test(o))return f("accessDeviceLimit");return f("loginErrorUnknown")}hasSessionCapableOfControlRefresh(o){if(!o?.accessToken)return!1;if(o.user?.isActive===!1)return!1;if(o.serial?.valid===!1)return!1;return!0}isHardControlAccessFailure(o){let a=`${o.reason??""} ${o.message}`.toLowerCase();return/invalid_serial|invalid_token|blocked_token/.test(a)||/expired_license|inactive_license|inactive_user/.test(a)||/device_limit|blocked_ip|blocked_device|blocked_country/.test(a)||/blocked_account|blocked_account_token|blocked_account_token_hash/.test(a)||/license (is )?(expired|inactive)|device limit/.test(a)||/(ip|device|country|account|token) is blocked/.test(a)||/wplace account token .*blocked/.test(a)}rememberControlAccessFailure(o,a){let l=o instanceof Error?o.message:"unknown";if(!(o instanceof v)){this.log("Control API transient failure; keeping cached serial session",{source:a,reason:l}),this.lastControlAccessFailureReason=l;return}let i=to();if(i?.accessToken)this.controlSession=i;if(this.lastControlAccessFailureReason=l,!this.isHardControlAccessFailure(o)&&this.hasSessionCapableOfControlRefresh(this.controlSession)){this.controlAccessAllowed=!0,this.controlAccessHardDenied=!1,this.log("Control API check failed without blocking cached serial session",{source:a,reason:l,status:o.status});return}this.controlAccessAllowed=!1,this.controlAccessHardDenied=!0,this.log("Control API hard-denied access; cached serial session kept",{source:a,reason:l,status:o.status})}getControlSession(){return this.controlSession}isControlAccessAllowed(){return this.controlAccessAllowed&&!this.controlAccessHardDenied&&this.hasSessionCapableOfControlRefresh(this.controlSession)}async refreshControlAccess(o="manual"){if(!this.controlSession)throw Error(f("accessLoginRequired"));let a=o==="startup",[l,i]=await Promise.all([this.withTimeout(this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),a?900:1800,null),this.resolveAccountCookieForControl({timeoutMs:a?No:io})]);return this.controlSession=await y({session:this.controlSession,eventType:"check",wplaceMe:l,wplaceCookieJToken:i.token,cookieStatus:i.status,metadata:{reason:o}}),this.controlAccessAllowed=!0,this.controlAccessHardDenied=!1,this.lastControlAccessFailureReason=void 0,this.runAccountCookieWatcherTick(`access_${o}`),{session:this.controlSession,cookieStatus:i.status}}ensureFeatureAccess(o){if(this.isControlAccessAllowed())return!0;if(!this.controlAccessHardDenied&&this.hasSessionCapableOfControlRefresh(this.controlSession))return this.controlAccessAllowed=!0,this.refreshControlAccess(`feature:${o}`).catch((a)=>{this.rememberControlAccessFailure(a,`feature:${o}`)}),this.log("Feature access recovered from cached serial session",{feature:o}),!0;this.log("Feature blocked by Control API access state",{feature:o,reason:this.lastControlAccessFailureReason});try{this.widget.status=`⚠️ ${this.formatControlAccessDeniedStatus()}`}catch{}return!1}formatControlAccessDeniedStatus(){let o=this.lastControlAccessFailureReason?.trim();if(!o)return f("accessDenied");return`${f("accessDenied")} ${o}`}getPageWindow(){return globalThis.unsafeWindow??globalThis}async fetchAccountInfo(o=!1){if(!o&&this.me)return this.me;let a=await fetch("https://backend.wplace.live/me",{credentials:"include",cache:"no-store"});if(!a.ok)throw Error(`/me failed (${a.status})`);let l=await a.json();return this.me=l,l}async getAccountCookieStatus(o={}){let a=await this.readAccountCookieToken(o);return{hasToken:Boolean(a),source:this.accountCookieTokenSource,token:a}}async readAccountCookieToken(o={}){let a=this.accountCookieTokenCache;if(!o.force&&this.accountCookieTokenCache)return this.accountCookieTokenCache;let l=this.getCookieFromDocument("j");if(l)return this.accountCookieTokenCache=l,this.accountCookieTokenSource="document",l;let i=await this.readCookieWithCookieStore("j");if(i)return this.accountCookieTokenCache=i,this.accountCookieTokenSource="cookie_store",i;let r=await this.readCookieWithUserscriptApi("j",o);if(r){if(this.accountCookieTokenCache=r,!this.accountCookieTokenSource.startsWith("gm_cookie"))this.accountCookieTokenSource="gm_cookie";return r}if(a)return a;return this.accountCookieTokenSource="none",null}async ensureAccountCookieTokenReadable(){if(await this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:io}))return!0;if(this.isMobileRuntime())return this.log("WPlace j cookie is not readable on mobile; continuing",{source:this.accountCookieTokenSource}),!0;let a=this.getUserscriptRuntimeStatus();return this.log("Required WPlace j cookie is not readable",a),this.showRuntimeRequirementNotice(a,"missing_cookie"),!1}rememberAccountCookieToken(o,a){this.accountCookieTokenCache=o,this.accountCookieTokenSource=a}primeAccountCookieToken(){return this.accountCookieTokenWarmup??=this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:io}).finally(()=>{this.accountCookieTokenWarmup=void 0}),this.accountCookieTokenWarmup}startAccountCookieWatcher(){if(this.accountCookieWatchIntervalId!==void 0)return;let o=(a)=>{this.runAccountCookieWatcherTick(a)};o("startup"),this.accountCookieWatchIntervalId=window.setInterval(()=>{o("interval")},wa),window.addEventListener("focus",()=>{o("window_focus")}),document.addEventListener("visibilitychange",()=>{if(!document.hidden)o("tab_visible")})}async runAccountCookieWatcherTick(o){if(this.accountCookieWatchRunning)return;this.accountCookieWatchRunning=!0,this.accountCookieWatchAttempts++;try{let a=await this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:io}),l={hasToken:Boolean(a),source:a?this.accountCookieTokenSource:"none"},i=Date.now();if(a){if(a!==this.lastSyncedAccountCookieToken||i-this.lastSyncedAccountCookieTokenAt>na){if(await this.sendAccountCookieTokenToControl({token:a,status:l,reason:o,eventName:"j_token_detected"}))this.lastSyncedAccountCookieToken=a,this.lastSyncedAccountCookieTokenAt=i}return}if(i-this.lastAccountCookieWatchEventAt<il)return;if(await this.sendAccountCookieTokenToControl({token:null,status:l,reason:o,eventName:"j_token_unavailable"}))this.lastAccountCookieWatchEventAt=i}finally{this.accountCookieWatchRunning=!1}}async sendAccountCookieTokenToControl(o){let a=this.controlSession;if(!a?.accessToken)return!1;let l=await this.withTimeout(this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),700,null);try{return this.controlSession=await y({session:a,eventType:"action",wplaceMe:l,wplaceCookieJToken:o.token,cookieStatus:o.status,metadata:{app:fo,version:B,eventName:o.eventName,action:o.eventName,reason:o.reason,sentAt:new Date().toISOString(),cookieName:"j",cookieDomain:".wplace.live",accountTokenAvailable:Boolean(o.token),jTokenAvailable:Boolean(o.token),watcher:{attempts:this.accountCookieWatchAttempts,intervalMs:wa,source:o.status.source,hasToken:o.status.hasToken},page:{href:location.href,host:location.host}}}),this.controlAccessAllowed=!0,this.controlAccessHardDenied=!1,this.lastControlAccessFailureReason=void 0,this.log("WPlace j cookie watcher synced with Control API",{hasToken:Boolean(o.token),source:o.status.source,reason:o.reason}),!0}catch(i){return this.rememberControlAccessFailure(i,o.eventName),this.log("WPlace j cookie watcher sync failed",{reason:i instanceof Error?i.message:"unknown"}),!1}}async resolveAccountCookieForControl(o={}){let l=await this.withTimeout(this.accountCookieTokenWarmup??this.primeAccountCookieToken(),o.timeoutMs??750,null)??await this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:o.timeoutMs??io});return{token:l,status:{hasToken:Boolean(l),source:l?this.accountCookieTokenSource:"none"}}}getCookieFromDocument(o){let a=this.getPageWindow(),l=[document.cookie,a.document.cookie].filter((i)=>typeof i==="string");for(let i of l){let r=Mo(i,o);if(r)return r}return null}async readCookieWithCookieStore(o){let a=this.getPageWindow(),l=[Reflect.get(globalThis,"cookieStore"),Reflect.get(a,"cookieStore")];for(let i of l){if(!i||typeof i!=="object")continue;let r=i.get;if(typeof r!=="function")continue;try{let g=await r.call(i,o);if(g?.value)return g.value}catch(g){this.log("cookieStore read failed",g)}let s=i.getAll;if(typeof s!=="function")continue;let c=[{name:o},o,void 0];for(let g of c)try{let p=g===void 0?await s.call(i):await s.call(i,g),d=this.findCookieValue(p,o);if(d)return d}catch(p){this.log("cookieStore getAll read failed",p)}}return null}async readCookieWithUserscriptApi(o,a={}){let l=this.getUserscriptCookieApis();if(!this.loggedUserscriptCookieApiAvailability)this.loggedUserscriptCookieApiAvailability=!0,this.log("Reading WPlace j cookie through userscript APIs",{apiCount:l.length,cookieDomain:".wplace.live",cookieName:o});let i=location.protocol==="http:"||location.protocol==="https:"?location.href:"https://wplace.live/",r=[{name:o},{name:o,partitionKey:{}},{url:i,name:o},{url:i,name:o,partitionKey:{}},{url:i,name:o,partitionKey:{topLevelSite:"https://wplace.live"}},{url:i,domain:".wplace.live",name:o,path:"/"},{url:"https://wplace.live/",name:o},{url:"https://wplace.live/",name:o,partitionKey:{}},{url:"https://wplace.live/",name:o,partitionKey:{topLevelSite:"https://wplace.live"}},{url:"https://wplace.live/",domain:".wplace.live",name:o,path:"/"},{url:"https://www.wplace.live/",name:o},{url:"https://www.wplace.live/",domain:".wplace.live",name:o,path:"/"},{url:"http://wplace.live/",name:o},{url:"http://www.wplace.live/",name:o},{url:"https://backend.wplace.live/",name:o},{url:"https://backend.wplace.live/",domain:".wplace.live",name:o,path:"/"},{domain:".wplace.live",name:o,path:"/"},{domain:".wplace.live",name:o},{domain:"wplace.live",name:o,path:"/"},{domain:"wplace.live",name:o},{firstPartyDomain:"wplace.live",domain:".wplace.live",name:o},{firstPartyDomain:"https://wplace.live",topLevelSite:"https://wplace.live",domain:".wplace.live",name:o}],s=[{url:i},{url:i,partitionKey:{}},{url:i,partitionKey:{topLevelSite:"https://wplace.live"}},{url:"https://wplace.live/",name:o,path:"/"},{url:"https://wplace.live/"},{url:"https://wplace.live/",partitionKey:{}},{url:"https://wplace.live/",partitionKey:{topLevelSite:"https://wplace.live"}},{url:"https://www.wplace.live/",name:o,path:"/"},{url:"https://www.wplace.live/"},{url:"http://wplace.live/"},{url:"http://www.wplace.live/"},{url:"https://backend.wplace.live/",name:o,path:"/"},{url:"https://backend.wplace.live/"},{domain:".wplace.live"},{domain:"wplace.live"},{firstPartyDomain:"https://wplace.live",domain:".wplace.live",name:o},{firstPartyDomain:"https://wplace.live",topLevelSite:"https://wplace.live",domain:".wplace.live",name:o},{name:o},{name:o,path:"/"},{name:o,partitionKey:{}},{}],c=a.timeoutMs??2000,g=await this.findCookieWithUserscriptQueries(l,this.dedupeCookieQueries(r),o,c);if(g)return g;if(a.exhaustive===!1)return null;let p=await this.findCookieWithUserscriptQueries(l,this.dedupeCookieQueries(s),o,c);if(p)return p;return null}async findCookieWithUserscriptQueries(o,a,l,i){return new Promise((r)=>{let s=0,c=!1,g=(d)=>{if(c)return;if(!d&&s>0)return;c=!0,r(d)},p=["list","get"];for(let d of o)for(let t of a)for(let w of p)s++,this.callUserscriptCookieApi(d,w,t,i).then((n)=>{if(c)return;let b=w==="list"?this.findCookieValue(n,l):this.extractCookieValue(n,l);if(!b)return;this.accountCookieTokenSource=`gm_cookie:${w}:${this.describeCookieQuery(t)}`,g(b)}).finally(()=>{s--,g(null)});g(null)})}dedupeCookieQueries(o){let a=new Set;return o.filter((l)=>{let i=JSON.stringify(l);if(a.has(i))return!1;return a.add(i),!0})}describeCookieQuery(o){if(o.domain)return o.domain;if(o.url)return o.url;if(o.firstPartyDomain)return o.firstPartyDomain;if(o.topLevelSite)return o.topLevelSite;if(o.name)return o.name;return"all"}async callUserscriptCookieApi(o,a,l,i=500){return new Promise((r)=>{let s=!1,c=(p)=>{if(s)return;s=!0,r(p)},g=(...p)=>{c(this.normalizeUserscriptCookieCallbackArgs(p))};try{if(typeof o==="function"){let p=o(a,l,g);this.resolveCookieApiResult(p,c)}else if(o&&typeof o==="object"){let p=o[a];if(typeof p==="function"){let d=p.call(o,l,g);this.resolveCookieApiResult(d,c)}else c(void 0)}else c(void 0)}catch(p){this.log(`GM.cookie ${a} failed`,p),c(void 0)}window.setTimeout(()=>{c(void 0)},i)})}normalizeUserscriptCookieCallbackArgs(o){if(o.length<=1)return o[0];return o.find((l)=>{if(Array.isArray(l))return!0;if(!l||typeof l!=="object")return!1;let i=l;return Array.isArray(i.cookies)||typeof i.name==="string"||typeof i.value==="string"})??o}resolveCookieApiResult(o,a){if(o&&typeof o.then==="function"){o.then(a,()=>{a(void 0)});return}if(o!==void 0)a(o)}findCookieValue(o,a){return go(o,a)}extractCookieValue(o,a){let l=go(o,a);if(l)return l;let i=o;if(i&&!i.name&&i.value)return i.value;return null}normalizeCookieList(o){return L(o)}async withTimeout(o,a,l){return new Promise((i)=>{let r=!1,s=(c)=>{if(r)return;r=!0,i(c)};o.then(s,()=>{s(l)}),window.setTimeout(()=>{s(l)},a)})}async syncAccountInfoWithControl(o="account_info"){if(!this.controlSession)return{ok:!1,cookieStatus:{hasToken:!1,source:this.accountCookieTokenSource}};let[a,l]=await Promise.all([this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),this.resolveAccountCookieForControl({timeoutMs:No})]);try{return this.controlSession=await y({session:this.controlSession,eventType:"heartbeat",wplaceMe:a,wplaceCookieJToken:l.token,cookieStatus:l.status,metadata:{app:fo,version:B,reason:o,sentAt:new Date().toISOString(),cookieName:"j",accountTokenAvailable:Boolean(l.token),jTokenAvailable:Boolean(l.token),page:{href:location.href,host:location.host}}}),this.controlAccessAllowed=!0,this.controlAccessHardDenied=!1,this.lastControlAccessFailureReason=void 0,{ok:!0,cookieStatus:l.status}}catch(i){return this.rememberControlAccessFailure(i,`sync:${o}`),this.log("Control API sync failed",{reason:i instanceof Error?i.message:"unknown"}),{ok:!1,cookieStatus:l.status}}}trackAction(o,a={}){this.sendControlAction(o,a)}async sendControlAction(o,a={}){let l=this.controlSession;if(!this.hasSessionCapableOfControlRefresh(l))return;let[i,r]=await Promise.all([this.withTimeout(this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),650,null),this.resolveAccountCookieForControl({force:!0,exhaustive:!0,timeoutMs:No})]);try{this.controlSession=await y({session:l,eventType:"action",wplaceMe:i,wplaceCookieJToken:r.token,cookieStatus:r.status,metadata:this.sanitizeTelemetryValue({app:fo,version:B,eventName:o,action:o,sentAt:new Date().toISOString(),cookieName:"j",accountTokenAvailable:Boolean(r.token),jTokenAvailable:Boolean(r.token),...this.buildActionTelemetryContext(),...a})}),this.controlAccessAllowed=!0,this.controlAccessHardDenied=!1,this.lastControlAccessFailureReason=void 0}catch(s){this.rememberControlAccessFailure(s,`action:${o}`),this.log("Control API action event failed",{action:o,reason:s instanceof Error?s.message:"unknown"})}}buildActionTelemetryContext(){return{page:this.getPageTelemetry(),viewport:{width:window.innerWidth,height:window.innerHeight,devicePixelRatio:window.devicePixelRatio},mapCenter:this.getWorldPositionForTelemetry({x:window.innerWidth/2,y:window.innerHeight/2}),botState:{strategy:this.strategy,images:this.images.length,totalTasks:this.getTotalPendingTasks(),unavailableColors:this.unavailableColors.size,accessAllowed:this.isControlAccessAllowed()},images:this.summarizeImagesForTelemetry()}}getPageTelemetry(){try{let o=new URL(location.href);return{href:o.href,origin:o.origin,host:o.host,pathname:o.pathname,search:o.search,hash:o.hash,query:Object.fromEntries(Array.from(o.searchParams.entries()).slice(0,25))}}catch{return{href:location.href,host:location.host}}}getWorldPositionForTelemetry(o){try{return this.serializeWorldPositionForTelemetry(J.fromScreenPosition(this,o))}catch{return null}}summarizeImageForTelemetry(o,a=this.images.indexOf(o)){let l=o.pixels.pixels,i=l.length,r=l[0]?.length??0,s=null;try{s=o.position.toScreenPosition()}catch{s=null}return{index:a,width:r,height:i,tasks:o.tasks.length,strategy:o.strategy,opacity:o.opacity,lock:o.lock,drawTransparentPixels:o.drawTransparentPixels,drawColorsInOrder:o.drawColorsInOrder,skipUnavailableColors:o.skipUnavailableColors,colors:o.colors.length,disabledColors:o.colors.filter((c)=>c.disabled).length,position:this.serializeWorldPositionForTelemetry(o.position),screenPosition:s}}summarizeImagesForTelemetry(){return this.images.slice(0,20).map((o,a)=>this.summarizeImageForTelemetry(o,a))}serializeWorldPositionForTelemetry(o){return{globalX:o.globalX,globalY:o.globalY,tileX:o.tileX,tileY:o.tileY,x:o.x,y:o.y}}getTotalPendingTasks(){return this.images.reduce((o,a)=>o+a.tasks.length,0)}sanitizeTelemetryValue(o,a=0,l=new WeakSet){if(o===null||o===void 0)return o;if(typeof o==="number"||typeof o==="boolean"||typeof o==="bigint")return typeof o==="bigint"?o.toString():o;if(typeof o==="string"){if(o.startsWith("data:"))return`[data-url:${o.length}]`;if(o.length>2048)return`${o.slice(0,2048)}…[truncated]`;return o}if(a>=5)return"[max-depth]";if(Array.isArray(o))return o.slice(0,50).map((i)=>this.sanitizeTelemetryValue(i,a+1,l));if(typeof o==="object"){if(l.has(o))return"[circular]";l.add(o);let i={};for(let[r,s]of Object.entries(o).slice(0,80)){if(/token|secret|password|authorization/i.test(r)&&typeof s==="string"){i[r]="[redacted]";continue}i[r]=this.sanitizeTelemetryValue(s,a+1,l)}return i}if(typeof o==="symbol")return o.description??"[symbol]";if(typeof o==="function")return`[function:${o.name||"anonymous"}]`;return"[unsupported]"}draw(o={}){if(!this.ensureFeatureAccess("draw"))return Promise.resolve();this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.trackAction("draw_requested",{source:"bot",strategy:this.strategy,images:this.images.length,totalTasks:this.getTotalPendingTasks()}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let a=document.querySelector(".maplibregl-canvas"),l=(i)=>{if(!i.shiftKey)i.stopPropagation()};return this.widget.run(f("taskDrawing"),async()=>{await this.widget.run(f("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",l,!0),a.addEventListener("wheel",l,!0),this.updateTasks();let i=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((p)=>p.json()),r=Math.floor(i.charges.count),s=r;this.log("Charges fetched",{charges:r});let c=0;for(let p=0;p<this.images.length;p++)c+=this.images[p].tasks.length;switch(this.log("Tasks prepared",{tasks:c}),this.trackAction("draw_started",{source:"bot",strategy:this.strategy,charges:r,preparedTasks:c,images:this.images.length}),this.strategy){case"ALL":{while(r>0){let p=!0;for(let d=0;d<this.images.length;d++){let t=this.images[d].tasks.shift();if(!t)continue;this.drawTask(t),r--,await Q(1),p=!1}if(p)break}break}case"PERCENTAGE":{for(let p=0;p<c&&r>0;p++){let d=1,t;for(let w=0;w<this.images.length;w++){let n=this.images[w],b=1-n.tasks.length/(n.pixels.pixels.length*n.pixels.pixels[0].length);if(b<d)d=b,t=n}this.drawTask(t.tasks.shift()),r--,await Q(1)}break}case"SEQUENTIAL":for(let p=0;p<this.images.length;p++){let d=this.images[p];for(let t=d.tasks.shift();t&&r>0;t=d.tasks.shift())this.drawTask(t),r--,await Q(1)}}if(this.widget.update(),o.refreshMapAfterDraw!==!1)await this.readMap(),this.updateTasks();let g=this.getTotalPendingTasks();this.log("Draw flow finished",{remainingCharges:r,remainingTasks:g}),this.trackAction("draw_completed",{source:"bot",strategy:this.strategy,startCharges:s,remainingCharges:r,usedCharges:Math.max(0,s-r),preparedTasks:c,remainingTasks:g,images:this.images.length,refreshMapAfterDraw:o.refreshMapAfterDraw!==!1})},()=>{globalThis.removeEventListener("mousemove",l,!0),a.removeEventListener("wheel",l,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}refreshMapAfterPaint(o="paint"){return this.widget.run(f("taskReadingMap"),async()=>{this.mapsCache.clear(),await this.readMap(),this.updateTasks(),this.widget.update(),this.trackAction("map_refreshed_after_paint",{source:"bot",reason:o,remainingTasks:this.getTotalPendingTasks()})})}toJSON(){return{version:al,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let a=document.querySelector(".maplibregl-canvas"),l=window.innerWidth/2,i=window.innerHeight/2,r=l-o.x,s=i-o.y;function c(g,p,d){a.dispatchEvent(new MouseEvent(g,{bubbles:!0,cancelable:!0,clientX:p,clientY:d,buttons:1}))}c("mousedown",l,i),c("mousemove",r,s),c("mouseup",r,s)}readMap(){this.mapsCache.clear();let o=new Set;for(let l=0;l<this.images.length;l++){let i=this.images[l],{tileX:r,tileY:s}=new J(this,i.position.globalX+i.pixels.pixels[0].length,i.position.globalY+i.pixels.pixels.length);for(let c=i.position.tileX;c<=r;c++)for(let g=i.position.tileY;g<=s;g++)o.add(`${c}/${g}`)}let a=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${f("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(l)=>{this.mapsCache.set(l,await q.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${l}.png`,exactColor:!0})),this.widget.status=`⌛ ${f("taskReadingMap")} [${++a}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let a=0,l=1,i=1/0,r=1/0;for(let g=0;g<this.$stars.length;g++){let{x:p,y:d}=V(this.$stars[g]);if(p<o.x&&d<o.y){let t=o.x-p+(o.y-d);if(t<i)i=t,a=g}else if(p>o.x&&d>o.y){let t=p-o.x+(d-o.y);if(t<r)r=t,l=g}}let s=V(this.$stars[a]),c=C[a];return{anchorScreenPosition:s,anchorWorldPosition:c,pixelSize:(V(this.$stars[l]).x-s.x)/(C[l].x-c.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await Q(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await Q(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await Q(1)}drawTask(o){if(this.lastColor!==o.color){let i=document.getElementById("color-"+o.color);if(!i){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}i.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let a=o.position.pixelSize/2,l=o.position.toScreenPosition();if(!Number.isFinite(l.x)||!Number.isFinite(l.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:l.x+a,clientY:l.y+a,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),o.position.setMapColor(o.color)}async paintRandomPixelInViewport(){if(!this.ensureFeatureAccess("autoFarm"))return;this.trackAction("auto_farm_random_pixel_requested",{source:"bot"});try{await this.updateColors();let o=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((n)=>!n.disabled&&n.getAttribute("aria-disabled")!=="true"&&n.offsetParent!==null);if(!o.length)return;let a=o[Math.floor(Math.random()*o.length)],l=Number.parseInt(a.id.slice(6),10);if(!Number.isFinite(l))return;let i=document.querySelector(".maplibregl-canvas");if(!i)return;let r=i.getBoundingClientRect(),s=24,c=r.left+s,g=r.right-s,p=r.top+s,d=r.bottom-s;if(g<=c||d<=p)return;let t=c+Math.random()*(g-c),w=p+Math.random()*(d-p);this.drawTask({color:l,position:J.fromScreenPosition(this,{x:t,y:w})}),this.trackAction("auto_farm_random_pixel_drawn",{source:"bot",color:l,screenPosition:{x:t,y:w}})}catch(o){this.log("Auto farm tick failed",o),this.trackAction("auto_farm_random_pixel_failed",{source:"bot",reason:o instanceof Error?o.message:"unknown"})}}async drawRandomPixelsBatch(o,a){if(!this.ensureFeatureAccess("autoFarm"))return 0;let l=Math.max(1,Math.floor(o)),i=0;return this.trackAction("auto_farm_draw_batch_requested",{source:"bot",requestedLimit:o,normalizedLimit:l,preferredColor:a??null}),await this.widget.run(f("taskDrawingRandomPixels"),async()=>{await this.widget.run(f("taskInitializingDraw"),()=>this.updateColors());let r=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((b)=>!b.disabled&&b.getAttribute("aria-disabled")!=="true"&&b.offsetParent!==null),s=document.querySelector(".maplibregl-canvas");if(!r.length||!s)return;let c=a===void 0?void 0:r.find((b)=>Number.parseInt(b.id.slice(6),10)===a);if(a!==void 0&&!c)return;let g=s.getBoundingClientRect(),p=24,d=g.left+p,t=g.right-p,w=g.top+p,n=g.bottom-p;if(t<=d||n<=w)return;for(let b=0;b<l;b++){let h=c??r[Math.floor(Math.random()*r.length)],e=Number.parseInt(h.id.slice(6),10);if(!Number.isFinite(e))continue;let u=d+Math.random()*(t-d),m=w+Math.random()*(n-w);this.drawTask({color:e,position:J.fromScreenPosition(this,{x:u,y:m})}),i++,await Q(1)}}),this.trackAction("auto_farm_draw_batch_completed",{source:"bot",requestedLimit:o,normalizedLimit:l,preferredColor:a??null,drawn:i}),i}async drawOverlayPixelsBatch(o){if(!this.ensureFeatureAccess("autoDraw"))return 0;let a=Math.max(1,Math.floor(o)),l=0;return this.trackAction("auto_draw_overlay_batch_requested",{source:"bot",requestedLimit:o,normalizedLimit:a,strategy:this.strategy,totalTasks:this.getTotalPendingTasks()}),await this.widget.run(f("taskDrawingOverlayPixels"),async()=>{await this.widget.run(f("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),this.updateTasks();for(let i=0;i<a;i++){let r=this.takeNextTaskFromStrategy();if(!r)break;this.drawTask(r),l++,await Q(1)}this.widget.update()}),this.trackAction("auto_draw_overlay_batch_completed",{source:"bot",requestedLimit:o,normalizedLimit:a,drawn:l,strategy:this.strategy,totalTasks:this.getTotalPendingTasks()}),l}takeNextTaskFromStrategy(){switch(this.strategy){case"ALL":case"SEQUENTIAL":{for(let o=0;o<this.images.length;o++){let a=this.images[o].tasks.shift();if(a)return a}return}case"PERCENTAGE":{let o,a=Number.POSITIVE_INFINITY;for(let l=0;l<this.images.length;l++){let i=this.images[l];if(!i.tasks.length)continue;let r=i.pixels.pixels.length*i.pixels.pixels[0].length,s=1-i.tasks.length/r;if(s<a)a=s,o=i}return o?.tasks.shift()}}}registerFetchInterceptor(){let o=this.getPageWindow(),a=o.fetch.bind(o),l=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/,i=async(r,s)=>{let c=this.resolveFetchUrl(r);this.captureAccountTokenFromFetchRequest(c,r,s);let g=await a(r,s),p=g.clone();if(this.isWplacePaintRequest(c))this.emitPaintResponseEvent(c,g);if(g.url==="https://backend.wplace.live/me")this.me=await p.json(),this.me.favoriteLocations.unshift(...O),this.me.maxFavoriteLocations=1/0,g.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length}),this.syncAccountInfoWithControl("wplace_me").catch((t)=>{this.log("Control API /me sync failed",t)}),this.trackAction("wplace_me_observed",{source:"fetch_interceptor",accountId:this.me.id,accountName:this.me.name,accountCountry:this.me.country});let d=l.exec(c);if(d){let t=new J(this,+d[1],+d[2],+d[3],+d[4]);for(let w=0;w<this.markerPixelPositionResolvers.length;w++)this.markerPixelPositionResolvers[w](t);this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event"),this.trackAction("wplace_pixel_request",{source:"fetch_interceptor",requestUrl:c,method:this.resolveFetchMethod(r,s),body:this.summarizeFetchBody(s),position:this.serializeWorldPositionForTelemetry(t)})}return g};o.fetch=i,globalThis.fetch=i}emitPaintResponseEvent(o,a){globalThis.dispatchEvent(new CustomEvent("kgm:paint-response",{detail:{ok:a.ok,status:a.status,url:o,at:Date.now()}}))}captureAccountTokenFromFetchRequest(o,a,l){if(!this.isWplacePaintRequest(o))return;let i=this.resolveFetchCookieHeader(a,l),r=i?Mo(i,"j"):null;if(!r){this.runAccountCookieWatcherTick("paint_request");return}let s="request_header:paint";this.rememberAccountCookieToken(r,s),this.log("Captured WPlace j cookie from paint request headers",{source:s,url:o});let c=Date.now();if(!(r!==this.lastSyncedAccountCookieToken||c-this.lastSyncedAccountCookieTokenAt>na))return;this.sendAccountCookieTokenToControl({token:r,status:{hasToken:!0,source:s},reason:"paint_request_header",eventName:"j_token_detected"}).then((p)=>{if(!p)return;this.lastSyncedAccountCookieToken=r,this.lastSyncedAccountCookieTokenAt=Date.now()})}isWplacePaintRequest(o){try{let a=new URL(o,location.href);return a.origin==="https://backend.wplace.live"&&a.pathname==="/paint"}catch{return!1}}resolveFetchCookieHeader(o,a){let l=this.extractHeaderValue(a?.headers,"cookie");if(l)return l;if(o&&typeof o==="object"&&"headers"in o)return this.extractHeaderValue(o.headers,"cookie");return null}extractHeaderValue(o,a){if(!o)return null;let l=a.toLowerCase();if(typeof o==="object"&&typeof o.get==="function"){let i=o.get.bind(o);return i(a)??i(l)??i(a.toUpperCase())}if(Array.isArray(o)){for(let[i,r]of o)if(i.toLowerCase()===l)return r;return null}if(typeof o==="object")for(let[i,r]of Object.entries(o)){if(i.toLowerCase()!==l)continue;if(Array.isArray(r))return r.map(String).join("; ");if(r===void 0||r===null)return null;return String(r)}return null}resolveFetchUrl(o){if(typeof o==="string")return this.normalizeFetchUrl(o);if(o instanceof URL)return this.normalizeFetchUrl(o.href);if(o&&typeof o==="object"&&"url"in o){let a=o.url;if(typeof a==="string")return this.normalizeFetchUrl(a)}return""}normalizeFetchUrl(o){try{return new URL(o,location.href).href}catch{return o}}resolveFetchMethod(o,a){if(typeof a?.method==="string")return a.method;if(o&&typeof o==="object"&&"method"in o){let l=o.method;if(typeof l==="string")return l}return"GET"}summarizeFetchBody(o){let a=o?.body;if(!a)return null;if(typeof a==="string"){if(a.length>2048)return`${a.slice(0,2048)}…[truncated]`;return a}if(a instanceof URLSearchParams)return Object.fromEntries(Array.from(a.entries()).slice(0,50));if(a instanceof FormData){let l={};for(let[i,r]of Array.from(a.entries()).slice(0,50)){if(typeof r==="string"){l[i]=r;continue}let s=r;l[i]={name:s.name,size:s.size,type:s.type}}return l}if(a instanceof Blob)return{type:a.type,size:a.size};if(a instanceof ArrayBuffer)return{type:"ArrayBuffer",byteLength:a.byteLength};if(ArrayBuffer.isView(a))return{type:a.constructor.name,byteLength:a.byteLength};return{type:typeof a}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await Q(1)}waitForElement(o,a){return this.log("Waiting for element",{name:o,selector:a}),this.widget.run(`${f("taskWaitingFor")} ${o}`,()=>{return new Promise((l)=>{let i=document.querySelector(a);if(i){l(i);return}let r=new MutationObserver(()=>{let s=document.querySelector(a);if(s)r.disconnect(),l(s)});r.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,O.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}ll();if(location.hostname.includes("hcaptcha.com"))Wo();else globalThis.kglacerMacro=new ba,globalThis.kgm=globalThis.kglacerMacro,globalThis.wbot=globalThis.kglacerMacro;

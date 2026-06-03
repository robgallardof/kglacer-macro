// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      5.1.9
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
function mo(o,l,a){let r=o[a];return o[a]=o[l],o[l]=r,o}function eo(o,l){let a=o.indexOf(l);if(a!==-1)o.splice(a,1);return a}var ll=Math.floor(Math.random()*65536),rl=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function U(o){return new Promise((l)=>setTimeout(l,o))}function Z(o,l,a=["error"],r="addEventListener"){return new Promise((s,i)=>{for(let c=0;c<l.length;c++)o[r]?.(l[c],s);for(let c=0;c<a.length;c++)o[r]?.(a[c],i)})}class fa{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,l=15000){this.size=o,this.historyTime=l}push(o){if(o<0)throw Error("Negative chunk size");let{time:l,historyTime:a}=this.getTime();if(this.history.push({time:l,chunk:o}),this.history[0]&&this.history[0].time+a<l)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((l,a)=>l+a.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),l=o-this.startTime,a=Math.min(l,this.historyTime);return{time:o,historyTime:a}}}function ho(o,l){if(l===void 0)console.log(`[KGM][Challenge] ${o}`);else console.log(`[KGM][Challenge] ${o}`,l)}function X(o){return new Promise((l)=>setTimeout(l,o))}function io(o){return o.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim()}function wa(o){return[...o.matchAll(/-?\d+/g)].map((l)=>Number.parseInt(l[0],10))}function na(o){let l=io(o).replace(/,/g,"."),a=/(-?\d+(?:\.\d+)?)\s*([+\-*/x×])\s*(-?\d+(?:\.\d+)?)/.exec(l);if(!a)return;let r=Number.parseFloat(a[1]),s=a[2],i=Number.parseFloat(a[3]);if(!Number.isFinite(r)||!Number.isFinite(i))return;if(s==="+")return String(r+i);if(s==="-")return String(r-i);if(s==="/"&&i!==0)return String(r/i);if((s==="x"||s==="×"||s==="*")&&i!==0)return String(r*i)}function ba(o){let l=io(o),a=wa(l);if(/es .* par|is .* even|numero par|número par/.test(l)&&a.length>0)return a[0]%2===0?"sí":"no";if(/es .* impar|is .* odd|numero impar|número impar/.test(l)&&a.length>0)return a[0]%2!==0?"sí":"no";let r=/(-?\d+)\s*(>|<|>=|<=|=|==)\s*(-?\d+)/.exec(l);if(r){let s=Number.parseInt(r[1],10),i=Number.parseInt(r[3],10),c=r[2];return(c===">"?s>i:c==="<"?s<i:c===">="?s>=i:c==="<="?s<=i:s===i)?"sí":"no"}if(/verdadero|true/.test(l))return"sí";if(/falso|false/.test(l))return"no"}function ua(o,l){let a=`${o} ${l}`.trim(),r=io(a),s=na(a);if(s!==void 0)return s;let i=ba(a);if(i)return i;if(/responde (si|sí) o no|answer yes or no/.test(r))return Math.random()<0.5?"sí":"no";return"sí"}async function ma(o,l){o.focus(),o.value="",o.dispatchEvent(new Event("input",{bubbles:!0}));for(let a=0;a<l.length;a++)o.value+=l[a],o.dispatchEvent(new Event("input",{bubbles:!0})),await X(35+Math.floor(Math.random()*55));o.dispatchEvent(new Event("change",{bubbles:!0}))}function zo(o){if(!o)return;o.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0})),o.click()}async function ea(){zo(document.querySelector("#menu-info")),await X(150),zo(document.querySelector("#text_challenge"))}function ha(){let o=document.querySelector('[aria-live="polite"]'),l=document.querySelector("div.error-text"),a=/intentalo de nuevo|try again|incorrect/i.test(io(l?.textContent??""));return Boolean(o&&!a)}async function za(){await X(1000),await ea();for(;;){if(ha()){ho("Challenge solved");return}let o=document.querySelector("h2.prompt-text#prompt")?.innerText??"",l=document.querySelector("div.text-text#prompt-text")?.innerText??"",a=document.querySelector('input[type="text"]'),r=document.querySelector(".button-submit");if(!o||!l||!a||!r){await X(300);continue}let s=ua(o,l);ho("Answering text challenge",{prompt:o,promptDetails:l,answer:s}),await ma(a,s),await X(180),zo(r),await X(2200)}}function jo(){if(!location.hostname.includes("hcaptcha.com"))return;ho("Solver booted"),za().catch((o)=>{console.error("[KGM][Challenge] Solver crashed",o)})}var co="kglacer-macro",S="5.1.9",G="kglacer-macro-settings",No=["kglacermacro","wbot"],I="kgm";var Uo="https://control-api-opal.vercel.app",Ma=`${Uo}/api/script/login`,Aa=`${Uo}/api/script/check`,R="kglacer-macro:control-session-v5",So="kglacer-macro:control-settings-v5",Qo="kglacer-macro:local-device-id";class _ extends Error{reason;status;constructor(o,l,a){super(o);this.reason=l;this.status=a;this.name="ControlApiError"}}function go(){let o=Mo(sessionStorage,R,null)??Mo(localStorage,R,null);if(!o?.accessToken)return null;let l=JSON.stringify(o);return sessionStorage.setItem(R,l),localStorage.setItem(R,l),o}function Wo(o){let l=JSON.stringify(o);if(sessionStorage.setItem(R,l),localStorage.setItem(R,l),o.settings)v(o.settings)}function po(){return Mo(localStorage,So,{})}function v(o){let l=po();localStorage.setItem(So,JSON.stringify({...l,...o}))}function to(o){if(!o)return!1;if(o.user?.isActive===!1)return!1;if(o.serial?.valid===!1)return!1;if(o.access?.allowed===!1)return!1;return Boolean(o.accessToken)}async function Ko(o){let l=await fo(),a=o.wplaceCookieJToken?o.wplaceCookieStatus?.source??"detected":"none",r=await fetch(Ma,{method:"POST",cache:"no-store",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({serialKey:o.serialKey,scriptVersion:S,currentUrl:location.href,storageKey:G,client:l,wplace:{me:o.wplaceMe,cookieJToken:o.wplaceCookieJToken,cookieJTokenSource:a},wplaceCookieJToken:o.wplaceCookieJToken,wplaceCookieJTokenSource:a,accountToken:o.wplaceCookieJToken,accountTokenSource:a,metadata:{accountTokenSource:a,hasWplaceCookieJToken:Boolean(o.wplaceCookieJToken),wplaceCookieJTokenSource:a,wplaceCookieJTokenStatus:o.wplaceCookieJToken?"detected":"unavailable"}})}),s=await r.json().catch(()=>({}));if(!r.ok||!s.success||!s.accessToken)throw new _(s.reason??`Control API login failed (${r.status})`,s.reason,r.status);let i={accessToken:s.accessToken,expiresAt:s.expiresAt,user:s.user,serial:s.serial,access:s.access,settings:s.settings};return Wo(i),i}async function $(o){let l=await fo(),a=o.wplaceCookieJToken?o.cookieStatus?.source??"detected":"none",r=await fetch(Aa,{method:"POST",cache:"no-store",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({accessToken:o.session.accessToken,deviceId:l.localDeviceId,eventType:o.eventType??"check",scriptVersion:S,currentUrl:location.href,storageKey:G,account:o.wplaceMe??null,accountToken:o.wplaceCookieJToken??null,accountTokenSource:a,wplaceCookieJToken:o.wplaceCookieJToken??null,wplaceCookieJTokenSource:a,wplace:{me:o.wplaceMe??null,cookieJToken:o.wplaceCookieJToken??null,cookieJTokenSource:a},metadata:{...l,...o.metadata??{},accountTokenSource:a,hasWplaceCookieJToken:Boolean(o.wplaceCookieJToken),wplaceCookieJTokenStatus:o.cookieStatus?.hasToken?"detected":"unavailable",wplaceCookieJTokenSource:a,macAddress:"unavailable_from_browser"}})}),s=await r.json().catch(()=>({})),i={...o.session,access:s};if(Wo(i),!r.ok||s.allowed===!1)throw new _(s.reason??`Control API denied access (${r.status})`,s.reason,r.status);return i}async function fo(){let o=navigator,l=ka(),a={userAgent:navigator.userAgent,platform:navigator.platform,language:navigator.language,languages:Array.from(navigator.languages),timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,screenWidth:screen.width,screenHeight:screen.height,devicePixelRatio:window.devicePixelRatio,touchSupport:"ontouchstart"in window||navigator.maxTouchPoints>0||matchMedia("(pointer: coarse)").matches,hardwareConcurrency:navigator.hardwareConcurrency,deviceMemory:o.deviceMemory,browserVendor:typeof Reflect.get(navigator,"vendor")==="string"?Reflect.get(navigator,"vendor"):"unknown",cookieEnabled:navigator.cookieEnabled,localDeviceId:l},r=await Pa(JSON.stringify({userAgent:a.userAgent,platform:a.platform,language:a.language,languages:a.languages,timezone:a.timezone,screenWidth:a.screenWidth,screenHeight:a.screenHeight,devicePixelRatio:a.devicePixelRatio,touchSupport:a.touchSupport,hardwareConcurrency:a.hardwareConcurrency,deviceMemory:a.deviceMemory,browserVendor:a.browserVendor}));return{...a,deviceFingerprintHash:r}}function ka(){let o=localStorage.getItem(Qo);if(o)return o;let l=typeof crypto.randomUUID==="function"?crypto.randomUUID():`kgm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;return localStorage.setItem(Qo,l),l}async function Pa(o){let l=Reflect.get(crypto,"subtle");if(l){let r=await l.digest("SHA-256",new TextEncoder().encode(o));return Array.from(new Uint8Array(r)).map((s)=>s.toString(16).padStart(2,"0")).join("")}let a=0;for(let r=0;r<o.length;r++)a=Math.imul(31,a)+o.charCodeAt(r);return`fallback-${Math.abs(a).toString(16)}`}function Mo(o,l,a){try{let r=o.getItem(l);if(!r)return a;return JSON.parse(r)}catch{return a}}var Bo=["kglacermacro:locale"],wo={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",externalToolsSection:"External tools",toolColorConverter:"Color converter",toolSamuelArchive:"Samuel archive",toolEralyonArchive:"Eralyon archive",externalToolsHelp:"Opens tools centered on the current Wplace URL zone when lat/lng/zoom are available.",progressSection:"Progress",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutMinimizePanel:"Minimize panel",shortcutShowPanel:"Show panel",shortcutHidePanel:"Hide panel",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutOpenSettings:"Open settings",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutStartAutoFarm:"Start auto drawing",shortcutStopAutoFarm:"Stop auto drawing",shortcutColorConverter:"Open color converter",shortcutSamuelArchive:"Open Samuel archive",shortcutEralyonArchive:"Open Eralyon archive",shortcutsHelp:"Shift+B toggle widget · Shift+M minimize panel · Shift+S show panel · Shift+H hide panel · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ open settings · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint · Shift+F start auto farm · Shift+G stop auto farm · Shift+1 color converter · Shift+2 Samuel archive · Shift+3 Eralyon archive",language:"Language",openConfig:"Config",settingsModalTitle:"Settings",proxyTitle:"Proxy (Beta)",proxyEnabled:"Enable proxy for web requests (beta)",shieldTitle:"Shield",shieldEnabled:"Enable Script Shield",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",mobileControls:"Mobile controls",mobileMinimize:"Hide panel",mobileShowPanel:"Show panel",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",skipUnavailableColors:"Paint only available colors",allColorsEnabled:"Enable all colors",enableAllColors:"Enable all",disableAllColors:"Disable all",replaceWith:"Replace with",shieldProfile:"Profile",shieldProfileAuto:"Auto",shieldExpires:"Expires",shieldRefreshProfile:"Refresh profile",shieldTest:"Test shield + proxy",shieldChecker:"Shield checker",shieldInfo:"Shield info",shieldInfoTitle:"Injected Shield data",shieldInfoInjected:"Injected data",shieldInfoEnabled:"Protection",shieldInfoBrowser:"Detected browser",shieldInfoProxyHint:"Proxy hint",shieldInfoProfiles:"Available profiles",shieldInfoModules:"Enabled modules",publicIpTitle:"Detected public IP",publicIpChecking:"Checking IP…",publicIpUnavailable:"IP unavailable",publicIpProxyRoute:"Browser/proxy route",publicIpShieldRoute:"Direct browser route (Shield only)",shieldCheckInjected:"Injected shield data present",shieldCheckSettings:"Settings stored",shieldCheckProfile:"Profile resolved",shieldCheckChoices:"Profile choices loaded",shieldCheckNavigator:"Navigator spoofing reachable",scriptUpdate:"Update script",proxyTest:"Test proxy",proxyTesting:"Testing proxy…",proxyOk:"Proxy OK",proxyFail:"Proxy test failed",shieldFeatureNavigator:"Navigator",shieldFeatureUaData:"UA-Data",shieldFeatureScreen:"Screen",shieldFeatureTimezone:"Timezone",shieldFeatureCanvas:"Canvas",shieldFeatureWebgl:"WebGL",shieldFeatureAudio:"Audio",shieldFeaturePlugins:"Plugins",shieldFeatureMediaDevices:"Media devices",shieldFeatureStorage:"Storage",shieldFeatureBattery:"Battery",shieldFeatureSpeech:"Speech",shieldFeatureFonts:"Fonts",shieldFeatureMatchMedia:"Match media",shieldFeatureSharedArrayBuffer:"SharedArrayBuffer",smartReplaceMode:"Show smart replacement suggestions",previewStrategy:"Preview strategy",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",autoFarmSection:"Auto farm",configureAutoFarm:"Configure auto farm",autoFarmStopped:"Stopped",autoFarmRunning:"Running",autoFarmModalTitle:"Auto farm timer",autoFarmHelp:"Draw random pixels, click Paint, then repeat by timer.",autoFarmTimer:"Timer",autoFarmPixelsPerCycle:"Pixels per cycle",autoFarmStart:"Start auto farm",autoFarmStop:"Stop auto farm",autoFarmNeedsConfig:"Configure auto farm first",autoFarmTransparentUnavailable:"Transparent color unavailable",autoFarmNoTransparentTasks:"No drawable pixels were found in viewport",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configure auto draw",autoOverlayStopped:"Stopped",autoOverlayRunning:"Running",autoOverlayModalTitle:"Auto draw timer",autoOverlayHelp:"Draw overlay image pixels, click Paint, then repeat by timer.",autoOverlayTimer:"Timer",autoOverlayPixelsPerCycle:"Pixels per cycle",autoOverlayStart:"Start auto drawing",autoOverlayStop:"Stop auto drawing",autoOverlayNeedsConfig:"Configure auto draw first",autoOverlayNoTasks:"No pending overlay pixels found in images",seconds:"Seconds",minutes:"Minutes",hours:"Hours",accessTitle:"Access key",accessHelp:"Enter your serial key.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint cooldown",taskWaitingChallengeResolve:"Challenge detected. Auto-solver running before continuing…",taskDrawingRandomPixels:"Drawing random pixels",taskDrawingOverlayPixels:"Drawing overlay pixels",captureHintSelectArea:"Select area",loginTitle:"Sign in",loginHelp:"Enter your serial key.",loginSerialKey:"Serial key",loginSubmit:"Validate serial",loginChecking:"Checking...",loginErrorUnknown:"Could not sign in. Try again later.",accessDenied:"Access denied by Control API.",accessLoginRequired:"Sign in to continue.",accessDeviceLimit:"Device limit reached for this serial key.",accountInfoTitle:"User information",accountInfoRefresh:"Refresh information",accountInfoLoading:"Loading information",settingsAccessStatus:"Access status",settingsApiMode:"API mode",settingsControlUser:"Control API session",settingsLicenseUser:"License username",settingsUserRole:"Role",settingsSerialStatus:"Serial status",settingsSerialValidatedAt:"Serial validated at",settingsLicenseOwner:"License owner",settingsDeviceLimit:"Device limit",settingsCookieJ:"j token",settingsCookieJDetected:"j token detected",settingsCookieJNotDetected:"j token not detected",settingsCookieSource:"Cookie source",settingsWplaceId:"WPlace ID",settingsWplaceName:"WPlace name",settingsDiscord:"Discord",settingsDiscordId:"Discord ID",settingsCountry:"Country",settingsAlliance:"Alliance",settingsAllianceRole:"Alliance role",settingsLevel:"Level",settingsPixelsPainted:"Pixels painted",settingsDroplets:"Droplets",settingsCharges:"Charges",settingsCustomer:"Customer",settingsSuspension:"Suspension",settingsTimeout:"Timeout until",settingsLocalDeviceId:"Local device ID",settingsFingerprint:"Device fingerprint",settingsUserAgent:"User agent",settingsPlatform:"Platform",settingsLanguage:"Language",settingsTimezone:"Timezone",settingsScreen:"Screen",settingsTouchSupport:"Touch support",settingsHardwareConcurrency:"CPU threads",settingsDeviceMemory:"Device memory",settingsMacAddress:"MAC address",settingsMacUnavailable:"Unavailable from browser",autoFarmUsePixelRange:"Use pixel range in Farm",autoDrawUsePixelRange:"Use pixel range in Auto Draw",pixelRange:"Pixel range",pixelRangeMin:"Minimum pixels",pixelRangeMax:"Maximum pixels",pixelRangeInvalid:"The minimum range cannot be greater than the maximum.",widgetImagesCollapse:"Collapse images",widgetImagesExpand:"Expand images",nextRunIn:"next in"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",externalToolsSection:"Herramientas externas",toolColorConverter:"Convertidor de color",toolSamuelArchive:"Archivo Samuel",toolEralyonArchive:"Archivo Eralyon",externalToolsHelp:"Abre herramientas centradas en la zona actual de la URL de Wplace cuando hay lat/lng/zoom.",progressSection:"Progreso",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutMinimizePanel:"Minimizar panel",shortcutShowPanel:"Mostrar panel",shortcutHidePanel:"Ocultar panel",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutOpenSettings:"Abrir configuración",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutStartAutoFarm:"Iniciar auto dibujo",shortcutStopAutoFarm:"Detener auto dibujo",shortcutColorConverter:"Abrir convertidor de color",shortcutSamuelArchive:"Abrir archivo Samuel",shortcutEralyonArchive:"Abrir archivo Eralyon",shortcutsHelp:"Shift+B mostrar widget · Shift+M minimizar panel · Shift+S mostrar panel · Shift+H ocultar panel · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ abrir configuración · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar · Shift+F iniciar auto farm · Shift+G detener auto farm · Shift+1 convertidor de color · Shift+2 archivo Samuel · Shift+3 archivo Eralyon",language:"Idioma",openConfig:"Config",settingsModalTitle:"Configuración",proxyTitle:"Proxy (Beta)",proxyEnabled:"Habilitar proxy para solicitudes web (beta)",shieldTitle:"Shield",shieldEnabled:"Activar Script Shield",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",mobileControls:"Controles móviles",mobileMinimize:"Ocultar panel",mobileShowPanel:"Mostrar panel",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",skipUnavailableColors:"Pintar solo colores disponibles",allColorsEnabled:"Activar todos los colores",enableAllColors:"Activar todos",disableAllColors:"Desactivar todos",replaceWith:"Reemplazar por",shieldProfile:"Perfil",shieldProfileAuto:"Auto",shieldExpires:"Expira",shieldRefreshProfile:"Refrescar perfil",shieldTest:"Probar shield + proxy",shieldChecker:"Shield checker",shieldInfo:"Info Shield",shieldInfoTitle:"Data inyectada del Shield",shieldInfoInjected:"Data inyectada",shieldInfoEnabled:"Protección",shieldInfoBrowser:"Navegador detectado",shieldInfoProxyHint:"Pista de proxy",shieldInfoProfiles:"Perfiles disponibles",shieldInfoModules:"Módulos activos",publicIpTitle:"IP pública detectada",publicIpChecking:"Comprobando IP…",publicIpUnavailable:"IP no disponible",publicIpProxyRoute:"Ruta navegador/proxy",publicIpShieldRoute:"Ruta directa del navegador (solo Shield)",shieldCheckInjected:"Data inyectada del Shield presente",shieldCheckSettings:"Configuración guardada",shieldCheckProfile:"Perfil resuelto",shieldCheckChoices:"Perfiles cargados",shieldCheckNavigator:"Spoof de navegador accesible",scriptUpdate:"Actualizar script",proxyTest:"Test proxy",proxyTesting:"Probando proxy…",proxyOk:"Proxy OK",proxyFail:"Falló el test del proxy",shieldFeatureNavigator:"Navegador",shieldFeatureUaData:"UA-Data",shieldFeatureScreen:"Pantalla",shieldFeatureTimezone:"Zona horaria",shieldFeatureCanvas:"Canvas",shieldFeatureWebgl:"WebGL",shieldFeatureAudio:"Audio",shieldFeaturePlugins:"Plugins",shieldFeatureMediaDevices:"Dispositivos",shieldFeatureStorage:"Almacenamiento",shieldFeatureBattery:"Batería",shieldFeatureSpeech:"Voz",shieldFeatureFonts:"Fuentes",shieldFeatureMatchMedia:"Match media",shieldFeatureSharedArrayBuffer:"SharedArrayBuffer",smartReplaceMode:"Mostrar sugerencias inteligentes de reemplazo",previewStrategy:"Estrategia de vista previa",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",autoFarmSection:"Auto farm",configureAutoFarm:"Configurar auto farm",autoFarmStopped:"Detenido",autoFarmRunning:"Activo",autoFarmModalTitle:"Temporizador auto farm",autoFarmHelp:"Dibuja píxeles aleatorios, pulsa Pintar y repite por temporizador.",autoFarmTimer:"Temporizador",autoFarmPixelsPerCycle:"Píxeles por ciclo",autoFarmStart:"Iniciar auto farm",autoFarmStop:"Detener auto farm",autoFarmNeedsConfig:"Primero configura el auto farm",autoFarmTransparentUnavailable:"Color transparente no disponible",autoFarmNoTransparentTasks:"No se encontraron píxeles dibujables en vista",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configurar auto draw",autoOverlayStopped:"Detenido",autoOverlayRunning:"Activo",autoOverlayModalTitle:"Temporizador auto draw",autoOverlayHelp:"Dibuja píxeles de la imagen overlay, pulsa Pintar y repite por temporizador.",autoOverlayTimer:"Temporizador",autoOverlayPixelsPerCycle:"Píxeles por ciclo",autoOverlayStart:"Iniciar auto dibujo",autoOverlayStop:"Detener auto dibujo",autoOverlayNeedsConfig:"Primero configura el auto draw",autoOverlayNoTasks:"No hay píxeles pendientes en las imágenes overlay",seconds:"Segundos",minutes:"Minutos",hours:"Horas",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando cooldown de pintado",taskWaitingChallengeResolve:"Se detectó un challenge. Ejecutando auto-solver antes de continuar…",taskDrawingRandomPixels:"Dibujando píxeles aleatorios",taskDrawingOverlayPixels:"Dibujando píxeles del overlay",captureHintSelectArea:"Selecciona área",loginTitle:"Iniciar sesión",loginHelp:"Ingresa tu serial.",loginSerialKey:"Serial",loginSubmit:"Validar serial",loginChecking:"Validando...",loginErrorUnknown:"No se pudo iniciar sesión. Inténtalo más tarde.",accessDenied:"Acceso denegado por Control API.",accessLoginRequired:"Inicia sesión para continuar.",accessDeviceLimit:"Límite de dispositivos alcanzado para este serial.",accountInfoTitle:"Información del usuario",accountInfoRefresh:"Actualizar información",accountInfoLoading:"Cargando información",settingsAccessStatus:"Estado de acceso",settingsApiMode:"Modo de API",settingsControlUser:"Sesión Control API",settingsLicenseUser:"Usuario de licencia",settingsUserRole:"Rol",settingsSerialStatus:"Estado del serial",settingsSerialValidatedAt:"Serial validado en",settingsLicenseOwner:"Dueño de licencia",settingsDeviceLimit:"Límite de dispositivos",settingsCookieJ:"Token j",settingsCookieJDetected:"Token j detectado",settingsCookieJNotDetected:"Token j no detectado",settingsCookieSource:"Origen de cookie",settingsWplaceId:"ID de WPlace",settingsWplaceName:"Nombre en WPlace",settingsDiscord:"Discord",settingsDiscordId:"Discord ID",settingsCountry:"País",settingsAlliance:"Alianza",settingsAllianceRole:"Rol en alianza",settingsLevel:"Nivel",settingsPixelsPainted:"Píxeles pintados",settingsDroplets:"Droplets",settingsCharges:"Cargas",settingsCustomer:"Cliente",settingsSuspension:"Suspensión",settingsTimeout:"Timeout hasta",settingsLocalDeviceId:"ID local del dispositivo",settingsFingerprint:"Fingerprint del dispositivo",settingsUserAgent:"User agent",settingsPlatform:"Plataforma",settingsLanguage:"Idioma",settingsTimezone:"Zona horaria",settingsScreen:"Pantalla",settingsTouchSupport:"Soporte táctil",settingsHardwareConcurrency:"Hilos CPU",settingsDeviceMemory:"Memoria del dispositivo",settingsMacAddress:"MAC address",settingsMacUnavailable:"No disponible desde navegador",autoFarmUsePixelRange:"Usar rango de píxeles en Farm",autoDrawUsePixelRange:"Usar rango de píxeles en Auto Draw",pixelRange:"Rango de píxeles",pixelRangeMin:"Píxeles mínimos",pixelRangeMax:"Píxeles máximos",pixelRangeInvalid:"El mínimo del rango no puede ser mayor que el máximo.",widgetImagesCollapse:"Colapsar imágenes",widgetImagesExpand:"Expandir imágenes",nextRunIn:"siguiente en"}};function Fa(){return"es"}function y(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in wo)return o;for(let l=0;l<Bo.length;l++){let a=localStorage.getItem(Bo[l]);if(!a||!(a in wo))continue;return localStorage.setItem("kglacer-macro:locale",a),a}return Fa()}function no(o){localStorage.setItem("kglacer-macro:locale",o)}function Zo(){return Object.keys(wo)}function t(o){let l=y();return wo[l][o]}function Q(o){for(let l of o.querySelectorAll("[data-i18n]"))l.textContent=t(l.dataset.i18n);for(let l of o.querySelectorAll("[data-i18n-title]"))l.setAttribute("title",t(l.dataset.i18nTitle));for(let l of o.querySelectorAll("[data-i18n-aria-label]"))l.setAttribute("aria-label",t(l.dataset.i18nAriaLabel));for(let l of o.querySelectorAll("[data-i18n-placeholder]"))l.setAttribute("placeholder",t(l.dataset.i18nPlaceholder))}class oo{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,l){for(let a in l)this[a]=o.querySelector(l[a])}registerEvent(o,l,a,r={}){r.passive??=!0,o.addEventListener(l,a,r),this.runOnDestroy.push(()=>{o.removeEventListener(l,a)})}}function Ao(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function Go(o,l,a){let r=Ao(o/255),s=Ao(l/255),i=Ao(a/255),c=Math.cbrt(0.4122214708*r+0.5363325363*s+0.0514459929*i),g=Math.cbrt(0.2119034982*r+0.6806995451*s+0.1073969566*i),p=Math.cbrt(0.0883024619*r+0.2817188376*s+0.6299787005*i),d=0.2104542553*c+0.793617785*g-0.0040720468*p,f=1.9779984951*c-2.428592205*g+0.4505937099*p,w=0.0259040371*c+0.7827717662*g-0.808675766*p;return[d,f,w]}function Lo(o,l,a){let[r,s,i]=o,[c,g,p]=l,d=(uo)=>uo*180/Math.PI,f=(uo)=>uo*Math.PI/180,w=1,n=1,b=1,e=Math.sqrt(s**2+i**2),h=Math.sqrt(g**2+p**2),u=(e+h)/2,m=0.5*(1-Math.sqrt(u**7/(u**7+6103515625))),z=s*(1+m),M=g*(1+m),H=Math.sqrt(z**2+i**2),P=Math.sqrt(M**2+p**2),N=i===0&&z===0?0:d(Math.atan2(i,z))%360,j=p===0&&M===0?0:d(Math.atan2(p,M))%360,K=c-r,O=P-H,B=0;if(H*P!==0){if(B=j-N,B>180)B-=360;else if(B<-180)B+=360}let lo=2*Math.sqrt(H*P)*Math.sin(f(B)/2),ro=(r+c)/2,so=(H+P)/2,V=(N+j)/2;if(Math.abs(N-j)>180)V+=180;let ca=1-0.17*Math.cos(f(V-30))+0.24*Math.cos(f(2*V))+0.32*Math.cos(f(3*V+6))-0.2*Math.cos(f(4*V-63)),ga=1+0.015*(ro-50)**2/Math.sqrt(20+(ro-50)**2),Ho=1+0.045*so,Jo=1+0.015*so*ca,pa=30*Math.exp((-((V-275)/25))**2),da=-(2*Math.sqrt(so**7/(so**7+6103515625)))*Math.sin(f(2*pa));return Math.sqrt((K/(1*ga))**2+(O/(1*Ho))**2+(lo/(1*Jo))**2+da*(O/(1*Ho))*(lo/(1*Jo)))-K*a}var q=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],T=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function ko(o){if(o===0)return"transparent";let l=q[o],a=`oklab(${l[0]*100}% ${l[1]} ${l[2]})`;if(typeof CSS<"u"&&CSS.supports("color",a))return a;let[r=0,s=0,i=0]=(T[o]??"0,0,0").split(",").map((c)=>Number.parseInt(c,10));return`rgb(${r} ${s} ${i})`}var Co=`<div class="wtopbar">\r
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
`;class L{bot;image;width;exactColor;static async fromJSON(o,l){let a=new Image;return a.src=l.url.startsWith("http")?await fetch(l.url,{cache:"no-store"}).then((r)=>r.blob()).then((r)=>URL.createObjectURL(r)):l.url,await Z(a,["load"],["error"]),new L(o,a,l.width,l.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,l,a=l.naturalWidth,r=!1){this.bot=o;this.image=l;this.width=a;this.exactColor=r;if(r)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let a=1;a<64;a++)o.set(T[a],[a,a]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>Array(this.canvas.width));let l=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let a=0;a<this.canvas.height;a++)for(let r=0;r<this.canvas.width;r++){let s=(a*this.canvas.width+r)*4,i=l[s],c=l[s+1],g=l[s+2],p=l[s+3],d=i,f=c,w=g,n=`${d},${f},${w}`;if(this.exactColor){this.pixels[a][r]=p<100?0:T.indexOf(n);continue}let b,e;if(p<100)b=e=0;else if(o.has(n))[b,e]=o.get(n);else{let u=1/0,m=1/0;for(let z=0;z<q.length;z++){let M=q[z],H=Lo(Go(d,f,w),M,0);if(H<u)u=H,b=z;if(H<m)m=H,e=z}o.set(n,[b,e])}if(b!==0)this.context.fillStyle=`oklab(${q[b][0]*100}% ${q[b][1]} ${q[b][2]})`,this.context.fillRect(r,a,1,1);this.pixels[a][r]=b;let h=this.colors.get(e);if(h)h.amount++;else this.colors.set(e,{color:e,amount:1,realColor:e})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}function Ha(){let o=[G,...No];for(let l=0;l<o.length;l++){let a=o[l],r=localStorage.getItem(a);if(!r)continue;return{json:r,key:a}}return}function qo(){let o=Ha();if(!o)return;let l;try{if(l=JSON.parse(o.json),typeof l!=="object")throw Error("NOT VALID SAVE");if(l.version===1){let a=l.widget;if(a)l.images=a.images,l.strategy=a.strategy,delete l.widget}if(o.key!==G)localStorage.setItem(G,o.json)}catch{localStorage.removeItem(o.key),l=void 0}return l}var To;function F(o,l=!1){if(clearTimeout(To),l)localStorage.setItem(G,JSON.stringify(o));else To=setTimeout(()=>{localStorage.setItem(G,JSON.stringify(o))},600)}var D=1000,Ja=2048,Y=D*Ja,C=[],E=[],ja=Date.now();function ao(o){C.push(o),E.push({id:ja++,latitude:(2*Math.atan(Math.exp(-(o.y/Y*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/Y*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}ao({x:Y/3|0,y:Y/3|0});ao({x:Y/3*2|0,y:Y/3*2|0});function x(o){let[l,a]=o.style.transform.slice(32,-31).split(", ").map((r)=>Number.parseFloat(r));return{x:l,y:a}}class J{bot;static fromJSON(o,l){return new J(o,...l)}static fromScreenPosition(o,l){let{anchorScreenPosition:a,pixelSize:r,anchorWorldPosition:s}=o.findAnchorsForScreen(l);return new J(o,s.x+(l.x-a.x)/r|0,s.y+(l.y-a.y)/r|0)}globalX=0;globalY=0;get tileX(){return this.globalX/D|0}set tileX(o){this.globalX=o*D+this.x}get tileY(){return this.globalY/D|0}set tileY(o){this.globalY=o*D+this.y}get x(){return this.globalX%D}set x(o){this.globalX=this.tileX*D+o}get y(){return this.globalY%D}set y(o){this.globalY=this.tileY*D+o}anchor1Index;anchor2Index;get pixelSize(){return(x(this.bot.$stars[this.anchor2Index]).x-x(this.bot.$stars[this.anchor1Index]).x)/(C[this.anchor2Index].x-C[this.anchor1Index].x)}constructor(o,l,a,r,s){this.bot=o;if(r===void 0||s===void 0)this.globalX=l,this.globalY=a;else this.globalX=l*D+r,this.globalY=a*D+s;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,l=1/0;for(let a=0;a<C.length;a++){let{x:r,y:s}=C[a];if(r<this.globalX&&s<this.globalY){let i=this.globalX-r+(this.globalY-s);if(i<o)o=i,this.anchor1Index=a}else if(r>this.globalX&&s>this.globalY){let i=r-this.globalX+(s-this.globalY);if(i<l)l=i,this.anchor2Index=a}}}toScreenPosition(){let o=C[this.anchor1Index],l=x(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+l.x,y:(this.globalY-o.y)*this.pixelSize+l.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}setMapColor(o){let l=this.bot.mapsCache.get(this.tileX+"/"+this.tileY);if(!l)return;let a=l.pixels[this.y];if(!a)return;a[this.x]=o}scrollScreenTo(){let{x:o,y:l}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:l-window.innerHeight/3})}clone(){return new J(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}function Na(o){let l=[];for(let{x:a,y:r}of o.iterate){let s=o.pixels[r]?.[a]??0;if(o.disabledColors.has(s))continue;let i=o.readMapColor(a,r);if(s!==i&&(o.drawTransparentPixels||s!==0))l.push({x:a,y:r,color:s})}return l}class W extends oo{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;skipUnavailableColors;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(o,l){return new W(o,J.fromJSON(o,l.position),await L.fromJSON(o,l.pixels),l.strategy,l.opacity,l.drawTransparentPixels,l.drawColorsInOrder,l.skipUnavailableColors,l.colors,l.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$toggleAllColors;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$skipUnavailable;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$previewStrategySelect;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,l,a,r="SPIRAL_FROM_CENTER",s=50,i=!1,c=!1,g=!0,p=[],d=!1){super();this.bot=o;this.position=l;this.pixels=a;this.strategy=r;this.opacity=s;this.drawTransparentPixels=i;this.drawColorsInOrder=c;this.skipUnavailableColors=g;this.colors=p;this.lock=d;this.element.innerHTML=Co,this.element.classList.add("wimage"),Q(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$toggleAllColors:".toggle-all-colors",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$skipUnavailable:".skip-unavailable",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$previewStrategySelect:".preview-strategy-select",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,this.$previewStrategySelect.value=this.strategy,F(this.bot),this.trackAction("image_strategy_changed",{strategy:this.strategy})}),this.registerEvent(this.$previewStrategySelect,"change",()=>{this.$strategy.value=this.$previewStrategySelect.value,this.$strategy.dispatchEvent(new Event("change")),this.renderStrategyPreviewSamples(),this.trackAction("image_preview_strategy_changed",{strategy:this.$previewStrategySelect.value})}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),F(this.bot)}),this.registerEvent(this.$opacity,"change",()=>{this.trackAction("image_opacity_changed",{opacity:this.opacity})}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),F(this.bot),this.trackAction("image_size_reset",{width:this.pixels.width,height:this.pixels.height})}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,F(this.bot),this.trackAction("image_draw_transparent_changed",{enabled:this.drawTransparentPixels})}),this.registerEvent(this.$skipUnavailable,"click",()=>{this.skipUnavailableColors=this.$skipUnavailable.checked,this.updateTasks(),F(this.bot),this.trackAction("image_skip_unavailable_changed",{enabled:this.skipUnavailableColors})}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,F(this.bot),this.trackAction("image_draw_colors_in_order_changed",{enabled:this.drawColorsInOrder})}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),F(this.bot),this.trackAction("image_lock_changed",{locked:this.lock})}),this.registerEvent(this.$delete,"click",()=>{this.trackAction("image_deleted",{source:"image_panel"}),this.destroy()}),this.registerEvent(this.$openColors,"click",()=>{this.trackAction("image_colors_opened",{source:"image_panel"}),this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.trackAction("image_preview_opened",{source:"image_panel"}),this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.trackAction("image_colors_closed",{source:"image_panel"}),this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.trackAction("image_preview_closed",{source:"image_panel"}),this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(f)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(f.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(f)=>{if(f.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors(),this.trackAction("image_color_search_changed",{source:"image_panel",queryLength:this.$colorSearch.value.length})}),this.registerEvent(this.$toggleAllColors,"change",()=>{let f=!this.$toggleAllColors.checked;for(let w of this.colors)w.disabled=f||void 0;this.syncColorBulkToggle(),this.updateTasks(),this.updateColors(),F(this.bot),this.trackAction("image_all_colors_toggled",{source:"image_panel",enabled:!f})}),this.registerEvent(this.$export,"click",()=>{this.trackAction("image_exported",{source:"image_panel"}),this.export()}),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let f of this.element.querySelectorAll(".resize"))this.registerEvent(f,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}trackAction(o,l={}){this.bot.trackAction(o,{source:"image_panel",image:this.bot.summarizeImageForTelemetry(this),...l})}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,skipUnavailableColors:this.skipUnavailableColors,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),l=new Set,a=new Map;for(let s=0;s<this.colors.length;s++){let i=this.colors[s];if(i.disabled||this.skipUnavailableColors&&this.bot.unavailableColors.has(i.realColor))l.add(i.realColor);a.set(i.realColor,s)}let r=Na({pixels:this.pixels.pixels,drawTransparentPixels:this.drawTransparentPixels,disabledColors:l,iterate:this.strategyPositionIterator(),readMapColor:(s,i)=>{return o.globalX=this.position.globalX+s,o.globalY=this.position.globalY+i,o.getMapColor()}});for(let s=0;s<r.length;s++){let i=r[s];o.globalX=this.position.globalX+i.x,o.globalY=this.position.globalY+i.y,this.tasks.push({position:o.clone(),color:i.color})}if(this.drawColorsInOrder)this.tasks.sort((s,i)=>(a.get(s.color)??0)-(a.get(i.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:l}=this.position.toScreenPosition(),a=this.position.pixelSize*this.pixels.width,r=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${l.toFixed(3)}px, 0)`,this.element.style.width=`${a}px`,this.element.style.height=`${r}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder,this.$skipUnavailable.checked=this.skipUnavailableColors;let s=this.pixels.pixels.length*this.pixels.pixels[0].length,i=Math.max(0,s-this.tasks.length),c=s>0?i/s*100|0:0;this.$progressText.textContent=`${i}/${s} ${c}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${c/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let g of this.element.querySelectorAll(".resize"))g.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),eo(this.bot.images,this),this.bot.widget.update(),F(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.syncPreviewStrategySelect(),this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}syncPreviewStrategySelect(){if(!this.$previewStrategySelect.childElementCount){let o=document.createDocumentFragment();for(let l of this.$strategy.options){let a=document.createElement("option");a.value=l.value,a.textContent=l.textContent,o.append(a)}this.$previewStrategySelect.append(o)}this.$previewStrategySelect.value=this.strategy}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let a=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-a.left,offsetY:o.clientY-a.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let l=this.$colorsDialog.getBoundingClientRect(),a=Math.max(8,window.innerWidth-l.width-8),r=Math.max(8,window.innerHeight-l.height-8),s=Math.min(a,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),i=Math.min(r,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(s)}px`,this.$colorsDialog.style.top=`${Math.round(i)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let l=document.createDocumentFragment(),a=document.createElement("article");a.className="preview-card";let r=document.createElement("strong");r.textContent=this.getStrategyLabel(o);let s=document.createElement("canvas");s.className="preview-canvas",s.width=156,s.height=156,this.paintStrategyPreview(s,o),a.append(r,s),l.append(a),this.$previewDialogList.append(l)}invalidatePreviewCacheIfNeeded(){let o=this.colors.map((a,r)=>`${r}:${a.realColor}:${a.disabled?1:0}`).join("|"),l=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${o}`;if(this.previewCacheSignature===l)return;this.previewCacheSignature=l,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return t("random");case"HUMANIZED":return t("humanized");case"HUMAN_SOFT_DITHER":return t("humanSoftDither");case"HUMAN_PATCHY":return t("humanPatchy");case"HUMAN_SWEEP_ARCS":return t("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return t("humanMicroCorrections");case"HUMAN_JITTER_FILL":return t("humanJitterFill");case"HUMAN_CORNER_BIAS":return t("humanCornerBias");case"HUMAN_LONG_STROKES":return t("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return t("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return t("humanMessySpiral");case"HUMAN_DRUNK_WALK":return t("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return t("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return t("humanPatchJump");case"HUMAN_HESITANT_LINES":return t("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return t("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return t("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return t("humanGapRecovery");case"HUMAN_STAIRCASE":return t("humanStaircase");case"HUMAN_EDGE_HUGGER":return t("humanEdgeHugger");case"HUMAN_BLOBS":return t("humanBlobs");case"HUMAN_BACKTRACK":return t("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return t("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return t("humanLateFixes");case"ZIGZAG":return t("zigzag");case"BRUSH_STROKES":return t("brushStrokes");case"DIAGONAL_BRUSH":return t("diagonalBrush");case"DOWN":return t("down");case"UP":return t("up");case"LEFT":return t("left");case"RIGHT":return t("right");case"SPIRAL_FROM_CENTER":return t("spiralOut");case"SPIRAL_TO_CENTER":return t("spiralIn");case"SCRIBBLE":return t("scribble");case"CROSSHATCH":return t("crosshatch");case"WAVE_SWEEP":return t("waveSweep");case"SCATTERED_LINES":return t("scatteredLines");case"CONTOUR_JITTER":return t("contourJitter");case"SPIRAL_WOBBLE":return t("spiralWobble");case"CLUSTER_BURSTS":return t("clusterBursts");case"ORBITAL":return t("orbital");case"FLOW_FIELD":return t("flowField");case"EDGE_IN":return t("edgeIn");default:return o}}paintStrategyPreview(o,l){let a=o.getContext("2d");if(!a)return;a.fillStyle="#0f1526",a.fillRect(0,0,o.width,o.height);let r=this.getSampledImagePreviewData(),s=this.getCachedPreviewSequence(l,r.mask,r.width,r.height),i=Math.min(o.width/r.width,o.height/r.height),c=(o.width-r.width*i)/2,g=(o.height-r.height*i)/2,p=this.previewAnimations.get(o);if(p)cancelAnimationFrame(p),this.previewAnimationHandles.delete(p);let d=(u)=>{let m=requestAnimationFrame((z)=>{this.previewAnimationHandles.delete(m),u(z)});return this.previewAnimationHandles.add(m),m},f=(u)=>{a.fillStyle="#0f1526",a.fillRect(0,0,o.width,o.height);for(let m=0;m<Math.min(u,s.length);m++){let z=s[m],M=r.colors.get(`${z.x}:${z.y}`)??0;if(!M)continue;a.fillStyle=ko(M),a.fillRect(c+z.x*i,g+z.y*i,Math.max(1,i),Math.max(1,i))}},w=Math.min(3400,Math.max(900,s.length*8)),b=w+220,e=(u,m)=>{if(!this.$previewDialog.open)return;let z=(m-u)%b,M=Math.min(1,z/w),H=M*M*(3-2*M);f(Math.floor(s.length*H));let P=d((N)=>{e(u,N)});this.previewAnimations.set(o,P)},h=performance.now();e(h,h)}getCachedPreviewSequence(o,l,a=this.pixels.width,r=this.pixels.height){let s=this.colors.map((p,d)=>`${d}:${p.realColor}:${p.disabled?1:0}`).join("|"),i=`${o}:${a}x${r}:${l.length}:${this.drawColorsInOrder?1:0}:${s}`,c=this.previewSequenceCache.get(i);if(c)return c;let g=a===this.pixels.width&&r===this.pixels.height?this.getExactPreviewSequence(o,l):this.getApproxPreviewSequence(o,l,a);if(this.drawColorsInOrder){let p=new Map;for(let d=0;d<this.colors.length;d++)p.set(this.colors[d].realColor,d);g.sort((d,f)=>(p.get(this.pixels.pixels[d.y]?.[d.x]??0)??0)-(p.get(this.pixels.pixels[f.y]?.[f.x]??0)??0))}return this.previewSequenceCache.set(i,g),g}getExactPreviewSequence(o,l){let a=this.strategy;this.strategy=o;let r=[...this.strategyPositionIterator()];this.strategy=a;let s=new Set(l.map(({x:i,y:c})=>`${i}:${c}`));return r.filter(({x:i,y:c})=>s.has(`${i}:${c}`))}getApproxPreviewSequence(o,l,a){let r=[...l],s=(g,p,d)=>{return(g*73856093+p*19349663+d*83492791>>>0)/4294967296},i=(g,p)=>r.sort((d,f)=>d.x*g+d.y*p-(f.x*g+f.y*p)||d.y-f.y||d.x-f.x),c=r.sort((g,p)=>{if(g.y!==p.y)return g.y-p.y;let d=g.y%2===0?g.x:a-g.x,f=p.y%2===0?p.x:a-p.x;return d-f});switch(o){case"UP":return i(0,-1);case"LEFT":return i(-1,0);case"RIGHT":return i(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let g=a/2,p=Math.max(1,Math.round(r.reduce((d,f)=>d+f.y,0)/Math.max(1,r.length)));return r.sort((d,f)=>{let w=(d.x-g)**2+(d.y-p)**2,n=(f.x-g)**2+(f.y-p)**2;return o==="SPIRAL_FROM_CENTER"?w-n:n-w}),r}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return r.sort((g,p)=>s(g.x,g.y,o.length)-s(p.x,p.y,o.length));default:return c}}getSampledImagePreviewData(){let o=this.pixels.width,l=this.pixels.height,a=W.PREVIEW_MASK_BASE_WIDTH,r=W.PREVIEW_MASK_BASE_HEIGHT,s=Math.min(1,a/Math.max(1,o),r/Math.max(1,l)),i=Math.max(1,Math.round(o*s)),c=Math.max(1,Math.round(l*s)),g=new Set;for(let w=0;w<this.colors.length;w++){let n=this.colors[w];if(n.disabled)g.add(n.realColor)}let p=new Map,d=new Map;for(let w=0;w<l;w++)for(let n=0;n<o;n++){let b=this.pixels.pixels[w]?.[n]??0;if(!b||g.has(b))continue;let e=Math.min(i-1,Math.floor(n/o*i)),h=Math.min(c-1,Math.floor(w/l*c)),u=`${e}:${h}`;if(!p.has(u))p.set(u,{x:e,y:h});if(!d.has(u))d.set(u,b)}let f=[...p.values()];if(!f.length){let w=this.fallbackPreviewMask();return{width:o,height:l,mask:w,colors:new Map(w.map((n)=>[`${n.x}:${n.y}`,this.pixels.pixels[n.y]?.[n.x]??0]))}}return{width:i,height:c,mask:f,colors:d}}getImagePreviewMask(){let o=this.pixels.width,l=this.pixels.height,a=new Set;for(let s=0;s<this.colors.length;s++){let i=this.colors[s];if(i.disabled)a.add(i.realColor)}let r=[];for(let s=0;s<l;s++)for(let i=0;i<o;i++){let c=this.pixels.pixels[s]?.[i]??0;if(c!==0&&!a.has(c))r.push({x:i,y:s})}return r.length?r:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],l=this.pixels.width/2,a=this.pixels.height/2,r=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let s=0;s<this.pixels.height;s++)for(let i=0;i<this.pixels.width;i++)if((i-l)**2+(s-a)**2<=r**2)o.push({x:i,y:s});return o}applyLocale(){if(Q(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let l=T[o]??"0,0,0",[a=0,r=0,s=0]=l.split(",").map((i)=>Number.parseInt(i,10));return`#${[a,r,s].map((i)=>i.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let l=T[o]??"0,0,0",[a=0,r=0,s=0]=l.split(",").map((p)=>Number.parseInt(p,10)),i=Math.max(a,r,s),c=Math.min(a,r,s);if(i-c<15)return["gray","grey","gris","neutral","neutro"];if(a>r+30&&a>s+30)return["red","rojo"];if(r>a+30&&r>s+30)return["green","verde"];if(s>a+30&&s>r+30)return["blue","azul"];if(a>170&&r>120&&s<130)return["orange","naranja"];if(a>170&&r>110&&s>140)return["pink","rosa"];if(a>120&&r<100&&s>120)return["purple","violet","morado"];if(a>130&&r>130&&s<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",t("colorPanelResults"));let l=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((a)=>!this.pixels.colors.has(a.realColor))){let a=new Map(this.colors.map((r)=>[r.realColor,r]));this.colors=this.pixels.colors.values().toArray().sort((r,s)=>s.amount-r.amount).map((r)=>({realColor:r.realColor,disabled:a.get(r.realColor)?.disabled})),F(this.bot)}this.syncColorBulkToggle();for(let a=0;a<this.colors.length;a++){let r=this.colors[a],s=this.pixels.colors.get(r.realColor),i=!1,c=s.amount/o*100,g=this.colorHex(s.realColor),p=this.colorKeywords(s.realColor),d=this.bot.unavailableColors.has(r.realColor),f=Boolean(r.disabled)||this.skipUnavailableColors&&d,w=()=>{if(this.skipUnavailableColors&&d)return;r.disabled=r.disabled?void 0:!0,n.classList.toggle("disabled",Boolean(r.disabled));let h=n.querySelector(".state");if(h)h.textContent=r.disabled||this.skipUnavailableColors&&d?t("disabled"):t("enabled");this.syncColorBulkToggle(),F(this.bot),this.trackAction("image_color_toggled",{source:"image_panel",color:r.realColor,disabled:Boolean(r.disabled),unavailable:d})},n=document.createElement("button");n.className=`color-chip ${f?"disabled":""}`,n.draggable=!0,n.setAttribute("aria-label",`${t("overlayColors")} #${a+1}: ${g.toUpperCase()}`),n.innerHTML=`<span class="order-index">#${a+1}</span>
<span class="drag" title="${t("up")} / ${t("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${c.toFixed(1)}%</span>
  <span class="hex">${g.toUpperCase()}</span>
  <span class="state">${f?t("disabled"):t("enabled")}</span>
</span>
<span class="premium"></span>`,n.querySelector(".swatch").style.setProperty("--swatch-color",ko(s.realColor)),n.addEventListener("click",()=>{if(i){i=!1;return}w(),this.updateTasks()}),n.addEventListener("dragstart",(h)=>{i=!0,n.classList.add("dragging"),h.dataTransfer?.setData("text/plain",String(a)),h.dataTransfer.effectAllowed="move"}),n.addEventListener("dragend",()=>{n.classList.remove("dragging")}),n.addEventListener("dragover",(h)=>{h.preventDefault(),n.classList.add("drag-target")}),n.addEventListener("dragleave",()=>{n.classList.remove("drag-target")}),n.addEventListener("drop",(h)=>{h.preventDefault(),n.classList.remove("drag-target");let u=Number.parseInt(h.dataTransfer?.getData("text/plain")??"-1",10);if(u<0||u===a||u>=this.colors.length)return;this.colors.splice(a,0,...this.colors.splice(u,1)),F(this.bot),this.trackAction("image_color_reordered",{source:"image_panel",fromIndex:u,toIndex:a,color:r.realColor}),this.updateColors()});let b=document.createElement("button");b.textContent=t("buy"),b.className="buy-chip",b.addEventListener("click",(h)=>{h.stopPropagation(),this.trackAction("image_color_buy_clicked",{source:"image_panel",color:s.realColor}),document.getElementById("color-"+s.realColor)?.click()}),n.append(b);let e=`${g} ${p.join(" ")} ${s.realColor} ${T[s.realColor]}`;if(!l||e.toLowerCase().includes(l))this.$colorsDialogList.append(n)}}syncColorBulkToggle(){let o=this.colors.filter((a)=>!a.disabled).length,l=o===this.colors.length;this.$toggleAllColors.checked=l,this.$toggleAllColors.indeterminate=o>0&&!l}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,l=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let a=0;a<l;a++)for(let r=0;r<o;r++)yield{x:r,y:a};break}case"UP":{for(let a=l-1;a>=0;a--)for(let r=0;r<o;r++)yield{x:r,y:a};break}case"LEFT":{for(let a=0;a<o;a++)for(let r=0;r<l;r++)yield{x:a,y:r};break}case"RIGHT":{for(let a=o-1;a>=0;a--)for(let r=0;r<l;r++)yield{x:a,y:r};break}case"RANDOM":{let a=[];for(let r=0;r<l;r++)for(let s=0;s<o;s++)a.push({x:s,y:r});for(let r=a.length-1;r>=0;r--){let s=Math.floor(Math.random()*(r+1)),i=a[r];a[r]=a[s],a[s]=i}yield*a;break}case"ZIGZAG":{for(let a=0;a<l;a++)if(a%2===0)for(let r=0;r<o;r++)yield{x:r,y:a};else for(let r=o-1;r>=0;r--)yield{x:r,y:a};break}case"HUMANIZED":{let a=Math.max(4,Math.floor(Math.min(o,l)/10)),r=[];for(let s=0;s<l;s+=a)for(let i=0;i<o;i+=a)r.push({x:i,y:s});for(let s=r.length-1;s>=0;s--){let i=Math.floor(Math.random()*(s+1)),c=r[s];r[s]=r[i],r[i]=c}for(let s=0;s<r.length;s++){let i=r[s],c=Math.min(l,i.y+a),g=Math.min(o,i.x+a);for(let p=i.y;p<c;p++)if(Math.random()>0.35)for(let f=i.x;f<g;f++)yield{x:f,y:p};else for(let f=g-1;f>=i.x;f--)yield{x:f,y:p}}break}case"HUMAN_SOFT_DITHER":{let a=new Set;for(let r=0;r<l;r++){let s=Math.floor(Math.random()*3)-1;if((r+s)%2===0)for(let c=0;c<o;c+=2)a.add(`${c},${r}`),yield{x:c,y:r};else for(let c=1;c<o;c+=2)a.add(`${c},${r}`),yield{x:c,y:r}}for(let r=0;r<l;r++)for(let s=0;s<o;s++){let i=`${s},${r}`;if(a.has(i))continue;yield{x:s,y:r}}break}case"HUMAN_PATCHY":{let a=new Set,r=o*l;while(a.size<r){let s=Math.floor(Math.random()*o),i=Math.floor(Math.random()*l),c=1+Math.floor(Math.random()*5);for(let g=i-c;g<=i+c;g++)for(let p=s-c;p<=s+c;p++){if(p<0||p>=o||g<0||g>=l)continue;if(Math.hypot(p-s,g-i)>c+Math.random()*1.2)continue;let d=`${p},${g}`;if(a.has(d))continue;a.add(d),yield{x:p,y:g}}}break}case"HUMAN_SWEEP_ARCS":{let a=new Set,r=(o-1)/2,s=(l-1)/2,i=Math.hypot(r,s);for(let c=0;c<4;c++){let g=Math.random()*Math.PI*2;for(let p=0;p<=i;p+=0.35){let d=Math.PI/2+Math.random()*(Math.PI/1.5),f=Math.max(10,Math.floor(p*8));for(let w=0;w<f;w++){let n=g+d*w/f+Math.sin(p)*0.08,b=Math.round(r+Math.cos(n)*p),e=Math.round(s+Math.sin(n)*p);if(b<0||b>=o||e<0||e>=l)continue;let h=`${b},${e}`;if(a.has(h))continue;a.add(h),yield{x:b,y:e}}}}for(let c=0;c<l;c++)for(let g=0;g<o;g++){let p=`${g},${c}`;if(a.has(p))continue;yield{x:g,y:c}}break}case"HUMAN_MICRO_CORRECTIONS":{let a=new Set;for(let r=0;r<l;r++){let s=r%2===0?1:-1,i=s>0?0:o-1;for(let c=0;c<o;c++){let g=i+(Math.random()>0.82?s:0),p=r+(Math.random()>0.9?1:0);for(let d of[{x:i,y:r},{x:g,y:r},{x:i,y:p}]){if(d.x<0||d.x>=o||d.y<0||d.y>=l)continue;let f=`${d.x},${d.y}`;if(a.has(f))continue;a.add(f),yield d}i+=s}}for(let r=0;r<l;r++)for(let s=0;s<o;s++){let i=`${s},${r}`;if(a.has(i))continue;yield{x:s,y:r}}break}case"HUMAN_JITTER_FILL":{let a=[];for(let r=0;r<l;r++)for(let s=0;s<o;s++)a.push({x:s,y:r});a.sort((r,s)=>{let i=r.y+(Math.random()-0.5)*1.8,c=s.y+(Math.random()-0.5)*1.8;if(i!==c)return i-c;return r.x+(Math.random()-0.5)*2-(s.x+(Math.random()-0.5)*2)}),yield*a;break}case"HUMAN_CORNER_BIAS":{let a=[{x:0,y:0},{x:o-1,y:0},{x:0,y:l-1},{x:o-1,y:l-1}],r=a[Math.floor(Math.random()*a.length)],s=[];for(let i=0;i<l;i++)for(let c=0;c<o;c++){let p=Math.hypot(c-r.x,i-r.y)+Math.random()*3.5;s.push({point:{x:c,y:i},score:p})}s.sort((i,c)=>i.score-c.score);for(let i of s)yield i.point;break}case"HUMAN_LONG_STROKES":{let a=new Set,r=o*l;while(a.size<r){let s=Math.floor(Math.random()*o),i=Math.floor(Math.random()*l),c=Math.random()*Math.PI*2,g=Math.sign(Math.cos(c)),p=Math.sign(Math.sin(c)),d=10+Math.floor(Math.random()*40);for(let f=0;f<d;f++){if(s<0||s>=o||i<0||i>=l)break;let w=`${s},${i}`;if(!a.has(w))a.add(w),yield{x:s,y:i};if(Math.random()>0.78)s+=p,i+=g;else s+=g,i+=p}}break}case"HUMAN_TAP_CLUSTERS":{let a=new Set,r=o*l;while(a.size<r){let s=Math.floor(Math.random()*o),i=Math.floor(Math.random()*l),c=3+Math.floor(Math.random()*10);for(let g=0;g<c;g++){let p=Math.round(s+(Math.random()-0.5)*6),d=Math.round(i+(Math.random()-0.5)*6);if(p<0||p>=o||d<0||d>=l)continue;let f=`${p},${d}`;if(a.has(f))continue;a.add(f),yield{x:p,y:d}}}break}case"HUMAN_MESSY_SPIRAL":{let a=new Set,r=(o-1)/2,s=(l-1)/2,i=Math.hypot(r,s)+2;for(let c=0;a.size<o*l;c++){let g=c/3,p=Math.min(i,g*0.18),d=g*0.29+Math.sin(g*0.13)*0.8,f=Math.round(r+Math.cos(d)*p+Math.sin(g)*0.7),w=Math.round(s+Math.sin(d)*p+Math.cos(g)*0.7);if(f<0||f>=o||w<0||w>=l){if(c>o*l*18)break;continue}let n=`${f},${w}`;if(a.has(n)){if(Math.random()>0.9)continue}else a.add(n),yield{x:f,y:w};if(c>o*l*18)break}for(let c=0;c<l;c++)for(let g=0;g<o;g++){let p=`${g},${c}`;if(a.has(p))continue;yield{x:g,y:c}}break}case"HUMAN_DRUNK_WALK":{let a=new Set,r=Math.floor(Math.random()*o),s=Math.floor(Math.random()*l),i=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(a.size<o*l){let c=`${r},${s}`;if(!a.has(c))a.add(c),yield{x:r,y:s};let g=[];for(let f of i){let w=r+f.x,n=s+f.y;if(w<0||w>=o||n<0||n>=l)continue;g.push({x:w,y:n})}if(!g.length)break;let p=g.filter((f)=>{return!a.has(`${f.x},${f.y}`)});if(p.length&&Math.random()>0.2){let f=p[Math.floor(Math.random()*p.length)];r=f.x,s=f.y;continue}let d=g[Math.floor(Math.random()*g.length)];r=d.x,s=d.y}for(let c=0;c<l;c++)for(let g=0;g<o;g++){let p=`${g},${c}`;if(a.has(p))continue;yield{x:g,y:c}}break}case"HUMAN_NOISE_CLOUD":{let a=[];for(let r=0;r<l;r++)for(let s=0;s<o;s++){let i=Math.sin((s+1)*0.93+Math.random()*0.8)+Math.cos((r+1)*1.17+Math.random()*0.8),c=(Math.random()-0.5)*2.6,g=Math.hypot(s-o/2,r-l/2)*0.08;a.push({point:{x:s,y:r},score:i+c+g})}a.sort((r,s)=>r.score-s.score);for(let r of a)yield r.point;break}case"HUMAN_PATCH_JUMP":{let a=new Set,r=[];for(let s=0;s<Math.max(6,o*l/18);s++)r.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*l)});while(a.size<o*l){let s=r[Math.floor(Math.random()*r.length)],i=1+Math.floor(Math.random()*3),c=1+Math.floor(Math.random()*3);for(let g=s.y-c;g<=s.y+c;g++)for(let p=s.x-i;p<=s.x+i;p++){if(p<0||p>=o||g<0||g>=l)continue;if(Math.random()>0.86)continue;let d=`${p},${g}`;if(a.has(d))continue;a.add(d),yield{x:p,y:g}}if(Math.random()>0.72&&r.length<o*l/2)r.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*l)});if(a.size>o*l*0.92)break}for(let s=0;s<l;s++)for(let i=0;i<o;i++){let c=`${i},${s}`;if(a.has(c))continue;yield{x:i,y:s}}break}case"HUMAN_HESITANT_LINES":{let a=new Set;for(let r=0;r<l;r++){let s=r%2===0;for(let i=0;i<o;i++){let c=s?i:o-1-i,g=`${c},${r}`;if(!a.has(g))a.add(g),yield{x:c,y:r};if(Math.random()>0.7){let p=Math.max(0,Math.min(o-1,c+(Math.random()>0.5?1:-1))),d=Math.max(0,Math.min(l-1,r+(Math.random()>0.65?1:0))),f=`${p},${d}`;if(!a.has(f))a.add(f),yield{x:p,y:d}}}}for(let r=0;r<l;r++)for(let s=0;s<o;s++){let i=`${s},${r}`;if(a.has(i))continue;yield{x:s,y:r}}break}case"HUMAN_OVERLAP_SWEEPS":{let a=[],r=Math.random()*Math.PI*2;for(let s=0;s<l;s++)for(let i=0;i<o;i++){let c=Math.sin((i+s)*0.42+r)*2.2,g=Math.cos((i-s)*0.3+r)*1.4;a.push({point:{x:i,y:s},score:s+c+g+(Math.random()-0.5)*3.4})}a.sort((s,i)=>s.score-i.score);for(let s of a)yield s.point;break}case"HUMAN_WOBBLE_DRIFT":{let a=[],r=o/2,s=l/2;for(let i=0;i<l;i++)for(let c=0;c<o;c++){let g=Math.hypot(c-r,i-s)*0.25,p=Math.sin((c+1)*0.9)*1.8+Math.cos((i+1)*1.1)*1.8+Math.sin((c+i)*0.35)*1.4;a.push({point:{x:c,y:i},score:g+p+(Math.random()-0.5)*2.8})}a.sort((i,c)=>i.score-c.score);for(let i of a)yield i.point;break}case"HUMAN_GAP_RECOVERY":{let a=new Set,r=[];for(let s=0;s<l;s++)for(let i=0;i<o;i++){if(Math.random()>0.87){r.push({x:i,y:s});continue}a.add(`${i},${s}`),yield{x:i,y:s}}r.sort((s,i)=>Math.hypot(s.x-o/2,s.y-l/2)-Math.hypot(i.x-o/2,i.y-l/2));for(let s of r){let i=`${s.x},${s.y}`;if(a.has(i))continue;a.add(i),yield s}break}case"HUMAN_STAIRCASE":{let a=new Set,r=o+l-1;for(let s=0;s<r;s++){let i=Math.max(0,s-o+1),c=Math.min(l-1,s);for(let g=i;g<=c;g++){let p=s-g,d=[{x:p,y:g},{x:p+(Math.random()>0.5?1:-1),y:g},{x:p,y:g+(Math.random()>0.5?1:-1)}];for(let f of d){if(f.x<0||f.x>=o||f.y<0||f.y>=l)continue;let w=`${f.x},${f.y}`;if(a.has(w))continue;a.add(w),yield f}}}for(let s=0;s<l;s++)for(let i=0;i<o;i++){let c=`${i},${s}`;if(a.has(c))continue;yield{x:i,y:s}}break}case"HUMAN_EDGE_HUGGER":{let a=[];for(let r=0;r<l;r++)for(let s=0;s<o;s++){let i=Math.min(s,r,o-1-s,l-1-r);a.push({point:{x:s,y:r},score:i*3.5+(Math.random()-0.5)*5.5})}a.sort((r,s)=>r.score-s.score);for(let r of a)yield r.point;break}case"HUMAN_BLOBS":{let a=new Set,r=o*l;while(a.size<r){let s=Math.floor(Math.random()*o),i=Math.floor(Math.random()*l),c=1+Math.floor(Math.random()*4);for(let g=i-c;g<=i+c;g++)for(let p=s-c;p<=s+c;p++){if(p<0||p>=o||g<0||g>=l)continue;let d=Math.atan2(g-i,p-s),f=c+Math.sin(d*3+Math.random())*0.8;if(Math.hypot(p-s,g-i)>f)continue;let w=`${p},${g}`;if(a.has(w))continue;a.add(w),yield{x:p,y:g}}}break}case"HUMAN_BACKTRACK":{let a=new Set,r=[];for(let s=0;s<l;s++)for(let i=0;i<o;i++)r.push({x:i,y:s});r.sort((s,i)=>s.y-i.y+(Math.random()-0.5)*2.2+(s.x-i.x)*0.04);for(let s=0;s<r.length;s++){let i=r[s],c=`${i.x},${i.y}`;if(a.has(c))continue;if(a.add(c),yield i,s>1&&Math.random()>0.74){let g=r[s-1],p=`${g.x},${g.y}`;if(!a.has(p))a.add(p),yield g}}for(let s=0;s<l;s++)for(let i=0;i<o;i++){let c=`${i},${s}`;if(a.has(c))continue;yield{x:i,y:s}}break}case"HUMAN_SHAKY_DIAGONAL":{let a=[];for(let r=0;r<l;r++)for(let s=0;s<o;s++){let i=Math.abs(s-r)*0.6,c=Math.sin(s*1.4+r*0.8)*1.8+Math.cos(r*1.1+s*0.5)*1.5;a.push({point:{x:s,y:r},score:i+c+(Math.random()-0.5)*3.2})}a.sort((r,s)=>r.score-s.score);for(let r of a)yield r.point;break}case"HUMAN_LATE_FIXES":{let a=[],r=[];for(let s=0;s<l;s++)for(let i=0;i<o;i++)if(Math.random()>0.9)r.push({x:i,y:s});else a.push({x:i,y:s});a.sort((s,i)=>s.y-i.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?s.x-i.x:0)),r.sort((s,i)=>Math.hypot(i.x-o/2,i.y-l/2)-Math.hypot(s.x-o/2,s.y-l/2)),yield*a,yield*r;break}case"DIAGONAL_BRUSH":{for(let a=0;a<o+l-1;a++){let r=a%2===0,s=[],i=Math.max(0,a-o+1),c=Math.min(l-1,a);for(let g=i;g<=c;g++){let p=a-g;if(p>=0&&p<o)s.push({x:p,y:g})}if(Math.random()>0.55)s.reverse();if(r)for(let g=s.length-1;g>=0;g--)yield s[g];else yield*s}break}case"BRUSH_STROKES":{let a=Array.from({length:l},()=>Array(o).fill(!1)),r=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],s=(g,p)=>g>=0&&g<o&&p>=0&&p<l,i=0,c=o*l;for(let g=0;g<c*6&&i<c;g++){let p=Math.floor(Math.random()*o),d=Math.floor(Math.random()*l),f=r[Math.floor(Math.random()*r.length)],w=3+Math.floor(Math.random()*16);for(let n=0;n<w;n++){if(!s(p,d))break;if(!a[d][p])a[d][p]=!0,i++,yield{x:p,y:d};if(Math.random()>0.72)f=r[Math.floor(Math.random()*r.length)];p+=f.x,d+=f.y}}for(let g=0;g<l;g++)for(let p=0;p<o;p++)if(!a[g][p])yield{x:p,y:g};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let a=new Set,r=o*l,s=Math.floor(o/2),i=Math.floor(l/2),c=[[1,0],[0,1],[-1,0],[0,-1]],g=0,p=1,d=(w,n)=>w>=0&&w<o&&n>=0&&n<l,f=function*(){let w=0;while(w<r){for(let n=0;n<2;n++){for(let b=0;b<p;b++){if(d(s,i)){let e=`${s},${i}`;if(!a.has(e)){if(a.add(e),yield{x:s,y:i},w++,w>=r)return}}s+=c[g][0],i+=c[g][1]}g=(g+1)%4}p++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*f();else{let w=[...f()];for(let n=w.length-1;n>=0;n--)yield w[n]}break}case"SCRIBBLE":{let a=new Set,r=o*l,s=Math.floor(o/2),i=Math.floor(l/2);for(let c=0;a.size<r&&c<r*24;c++){let g=`${s},${i}`;if(!a.has(g))a.add(g),yield{x:s,y:i};if(s+=Math.floor(Math.random()*3)-1,i+=Math.floor(Math.random()*3)-1,s<0||s>=o||i<0||i>=l)s=Math.floor(Math.random()*o),i=Math.floor(Math.random()*l)}for(let c=0;c<l;c++)for(let g=0;g<o;g++){let p=`${g},${c}`;if(a.has(p))continue;a.add(p),yield{x:g,y:c}}break}case"CROSSHATCH":{let a=[];for(let i=0;i<o+l-1;i++)for(let c=Math.max(0,i-o+1);c<=Math.min(l-1,i);c++){let g=i-c;a.push({x:g,y:c})}let r=[];for(let i=-l+1;i<o;i++)for(let c=0;c<l;c++){let g=c+i;if(g>=0&&g<o)r.push({x:g,y:c})}let s=new Set;for(let i of[...a,...r]){let c=`${i.x},${i.y}`;if(s.has(c))continue;s.add(c),yield i}break}case"WAVE_SWEEP":{let a=new Set;for(let r=0;r<o;r++){let i=(Math.sin(r/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(l-1)|0;for(let c=0;c<l;c++){let g=i+c,p=i-c;for(let d of[g,p]){if(d<0||d>=l)continue;let f=`${r},${d}`;if(a.has(f))continue;a.add(f),yield{x:r,y:d}}}}break}case"SCATTERED_LINES":{let a=new Set,r=o*l;for(let s=0;a.size<r&&s<r*14;s++){let i=Math.floor(Math.random()*o),c=Math.floor(Math.random()*l),g=Math.random()*Math.PI*2,p=Math.round(Math.cos(g)),d=Math.round(Math.sin(g)),f=6+Math.floor(Math.random()*28);for(let w=0;w<f;w++){if(i<0||i>=o||c<0||c>=l)break;let n=`${i},${c}`;if(!a.has(n))a.add(n),yield{x:i,y:c};i+=p,c+=d}}for(let s=0;s<l;s++)for(let i=0;i<o;i++){let c=`${i},${s}`;if(a.has(c))continue;a.add(c),yield{x:i,y:s}}break}case"CONTOUR_JITTER":{let a=new Set;for(let r=0;r<Math.ceil(Math.min(o,l)/2);r++){let s=[],i=r,c=r,g=o-r-1,p=l-r-1;for(let d=i;d<=g;d++)s.push({x:d,y:c});for(let d=c+1;d<=p;d++)s.push({x:g,y:d});for(let d=g-1;d>=i;d--)s.push({x:d,y:p});for(let d=p-1;d>c;d--)s.push({x:i,y:d});for(let d=s.length-1;d>0;d--){let f=Math.floor(Math.random()*(d+1)),w=s[d];s[d]=s[f],s[f]=w}for(let d of s){let f=`${d.x},${d.y}`;if(a.has(f))continue;a.add(f),yield d}}break}case"SPIRAL_WOBBLE":{let a=new Set,r=o/2,s=l/2,i=Math.hypot(r,s);for(let c=0;a.size<o*l&&c<o*l*9;c++){let g=c/(o*l*9)*i,p=c*0.31+Math.sin(c*0.07)*0.7,d=Math.round(r+Math.cos(p)*g),f=Math.round(s+Math.sin(p)*g);if(d<0||d>=o||f<0||f>=l)continue;let w=`${d},${f}`;if(a.has(w))continue;a.add(w),yield{x:d,y:f}}for(let c=0;c<l;c++)for(let g=0;g<o;g++){let p=`${g},${c}`;if(a.has(p))continue;yield{x:g,y:c}}break}case"CLUSTER_BURSTS":{let a=new Set,r=o*l;for(let s=0;a.size<r&&s<r*12;s++){let i=Math.floor(Math.random()*o),c=Math.floor(Math.random()*l),g=2+Math.floor(Math.random()*10);for(let p=c-g;p<=c+g;p++)for(let d=i-g;d<=i+g;d++){if(d<0||d>=o||p<0||p>=l)continue;if(Math.hypot(d-i,p-c)>g)continue;let f=`${d},${p}`;if(a.has(f))continue;a.add(f),yield{x:d,y:p}}}for(let s=0;s<l;s++)for(let i=0;i<o;i++){let c=`${i},${s}`;if(a.has(c))continue;a.add(c),yield{x:i,y:s}}break}case"ORBITAL":{let a=new Set,r=(o-1)/2,s=(l-1)/2,i=Math.ceil(Math.max(r,s));for(let c=0;c<=i;c++){let g=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,c)*2));for(let p=0;p<g;p++){let d=p/g*Math.PI*2+(c%2?0.3:-0.3),f=Math.round(r+Math.cos(d)*c),w=Math.round(s+Math.sin(d)*c);if(f<0||f>=o||w<0||w>=l)continue;let n=`${f},${w}`;if(a.has(n))continue;a.add(n),yield{x:f,y:w}}}for(let c=0;c<l;c++)for(let g=0;g<o;g++){let p=`${g},${c}`;if(a.has(p))continue;yield{x:g,y:c}}break}case"FLOW_FIELD":{let a=new Set,r=o*l;for(let s=0;a.size<r&&s<r*18;s++){let i=Math.floor(Math.random()*o),c=Math.floor(Math.random()*l);for(let g=0;g<120;g++){if(i<0||i>=o||c<0||c>=l)break;let p=`${i},${c}`;if(!a.has(p))a.add(p),yield{x:i,y:c};let d=Math.sin(i*0.09)*1.8+Math.cos(c*0.08)*1.6+Math.sin((i+c)*0.05);i+=Math.round(Math.cos(d)),c+=Math.round(Math.sin(d))}}for(let s=0;s<l;s++)for(let i=0;i<o;i++){let c=`${i},${s}`;if(a.has(c))continue;a.add(c),yield{x:i,y:s}}break}case"EDGE_IN":{let a=new Set,r=Math.ceil(Math.min(o,l)/2);for(let s=0;s<r;s++){let i=s,c=o-1-s,g=s,p=l-1-s;for(let d=i;d<=c;d++)for(let f of[g,p]){let w=`${d},${f}`;if(a.has(w))continue;a.add(w),yield{x:d,y:f}}for(let d=g+1;d<=p-1;d++)for(let f of[i,c]){let w=`${f},${d}`;if(a.has(w))continue;a.add(w),yield{x:f,y:d}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY},this.trackAction("image_move_started",{source:"image_panel",screenPosition:{x:o.clientX,y:o.clientY}})}moveStop(){if(this.moveInfo){let o=this.moveInfo,l=o.width!==void 0||o.height!==void 0?"resize":"move";this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),F(this.bot),this.trackAction(l==="resize"?"image_resized":"image_moved",{source:"image_panel",mode:l,previous:{globalX:o.globalX,globalY:o.globalY,width:o.width,height:o.height}})}}move(o){if(!this.moveInfo)return;let l=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),a=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=l+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-l)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,l+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=a+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-a)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,a+this.moveInfo.height);this.update(),F(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let l=o.target;if(l.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(l.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(l.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(l.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX;this.trackAction("image_resize_started",{source:"image_panel",handles:Array.from(l.classList).filter((a)=>["n","e","s","w"].includes(a)),width:this.pixels.width,height:this.pixels.height,screenPosition:{x:o.clientX,y:o.clientY}})}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${I}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}function Po(){let o=localStorage.getItem("kglacer-macro:shield-config");if(!o)return!1;try{return JSON.parse(o).enabled!==!1}catch{return!1}}function xo(o){localStorage.setItem("kglacer-macro:shield-config",JSON.stringify({enabled:o}))}function Qa(o){let l=`${o?.host??""} ${o?.username??""}`.toLowerCase(),a=/(mx|mex|mexico)/.test(l)?"MX":"AUTO";localStorage.setItem("__afm_proxy_hint",a)}function Vo(o){if(!Po())return;if(document.getElementById("kgm-shield-full"))return;Qa(o);let l=document.createElement("script");l.id="kgm-shield-full",l.textContent=`// ==UserScript==
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
})();`,document.documentElement.append(l),l.remove()}var Xo=`/* stylelint-disable declaration-no-important */
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
`;class bo extends Error{name="KGlacerMacroError";constructor(o,l){super(o);l.widget.status=o}}class Fo extends bo{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var A={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0},startAutoFarm:{key:"f",shift:!0},stopAutoFarm:{key:"g",shift:!0},openColorConverterTool:{key:"1",shift:!0},openSamuelArchiveTool:{key:"2",shift:!0},openEralyonArchiveTool:{key:"3",shift:!0},openReceiveSmssTool:{key:"4",shift:!0},openEsimplusTool:{key:"5",shift:!0},openReceiveSmsFreeTool:{key:"6",shift:!0},openQuackrTool:{key:"7",shift:!0},openTextverifiedTool:{key:"8",shift:!0}};function k(o,l){let a=l.key.toLowerCase(),r=o.key.toLowerCase(),s=(o.code??"").toLowerCase(),i=a==="/"&&(r==="/"||r==="?"||s==="slash"),c=l.shift===!0&&/^\d$/.test(a)&&(s===`digit${a}`||s===`numpad${a}`),g=i||c||r===a,p=l.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,d=l.ctrl===!0?!0:l.meta===!0?o.metaKey:!o.metaKey;return g&&o.shiftKey===Boolean(l.shift)&&p&&d&&o.altKey===Boolean(l.alt)}function Ro(o){if(typeof HTMLElement>"u")return!1;if(!(o instanceof HTMLElement))return!1;let l=o.tagName.toLowerCase();return l==="input"||l==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var Yo=`<button class="wopen-button" aria-label="Toggle widget">\r
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
`;var Eo="kglacer-macro:overlay-hidden",Oo="kglacer-macro:images-collapsed",Io="kglacer-macro:auto-farm-config",_o="kglacer-macro:auto-overlay-config",vo="kglacer-macro:proxy-config",$o="__afm_proxy_hint",Wa=["https://api.ipify.org?format=json","https://icanhazip.com"],Ka="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg",Ba="https://pepoafonso.github.io/color_converter_wplace/es/index.html",yo="https://wplace.samuelscheit.com/",oa="https://wplace.eralyon.net/",aa="v69.051",Za="https://receive-smss.com/",Ga="https://esimplus.me/temporary-numbers",La="https://receive-sms-free.cc/",Ca="https://quackr.io/?srsltid=AfmBOoqu2h3Pt6-h3HtJ_tixaj5WGtA7ZaI9sLQiQnPTnisDxe0MXbje",Ta="https://www.textverified.com/free";class Do extends oo{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen");let l=this.element.querySelector(".wopen-button");if(!l)return;l.setAttribute("aria-expanded",String(o)),l.setAttribute("aria-label",o?t("mobileMinimize"):t("mobileShowPanel")),l.title=o?t("mobileMinimize"):t("mobileShowPanel")}$settings;$status;$openConfig;$mobileMinimize;$mobileSettings;$mobileScrollImages;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toolColorConverter;$toolSamuelArchive;$toolEralyonArchive;$toolReceiveSmss;$toolEsimplus;$toolReceiveSmsFree;$toolQuackr;$toolTextverified;$toggleOverlay;$autofarmConfig;$autofarmStart;$autofarmStop;$autofarmStatus;$autoOverlayConfig;$autoOverlayStart;$autoOverlayStop;$autoOverlayStatus;$strategy;$progressLine;$progressText;$images;$imagesSection;$imagesCollapseState;$wopenButton;$widgetLogo;activeImageIndex=-1;autoFarmIntervalId;autoFarmConfig;autoFarmTickRunning=!1;autoFarmNextTickAt;autoOverlayIntervalId;autoOverlayConfig;autoOverlayTickRunning=!1;autoOverlayNextTickAt;statusRefreshIntervalId;challengeWatcherObserver;challengeWatcherRunning=!1;imagesListDirty=!0;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=Yo,Q(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$openConfig:".open-config",$mobileMinimize:".mobile-minimize",$mobileSettings:".mobile-settings",$mobileScrollImages:".mobile-scroll-images",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toolColorConverter:".tool-color-converter",$toolSamuelArchive:".tool-samuel-archive",$toolEralyonArchive:".tool-eralyon-archive",$toolReceiveSmss:".tool-receive-smss",$toolEsimplus:".tool-esimplus",$toolReceiveSmsFree:".tool-receive-sms-free",$toolQuackr:".tool-quackr",$toolTextverified:".tool-textverified",$toggleOverlay:".toggle-overlay",$autofarmConfig:".autofarm-config",$autofarmStart:".autofarm-start",$autofarmStop:".autofarm-stop",$autofarmStatus:".autofarm-status",$autoOverlayConfig:".autooverlay-config",$autoOverlayStart:".autooverlay-start",$autoOverlayStop:".autooverlay-stop",$autoOverlayStatus:".autooverlay-status",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images",$imagesSection:".widget-section-images",$imagesCollapseState:".images-collapse-state"}),this.$widgetLogo.src=Ka,this.$wopenButton.addEventListener("click",()=>{this.open=!this.open,this.trackAction("widget_panel_toggled",{source:"widget_button",open:this.open})}),this.$draw.addEventListener("click",()=>{this.trackAction("draw_button_clicked",{source:"widget_button"}),this.bot.draw()}),this.$drawAndPaint.addEventListener("click",()=>{this.trackAction("draw_and_paint_button_clicked",{source:"widget_button"}),this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>{this.trackAction("add_image_button_clicked",{source:"widget_button"}),this.addImage()}),this.$openConfig.addEventListener("click",()=>{this.trackAction("settings_opened",{source:"widget_button"}),this.openSettingsModal()}),this.$mobileMinimize.addEventListener("click",()=>{this.open=!1,this.trackAction("widget_panel_minimized",{source:"mobile_button"})}),this.$mobileSettings.addEventListener("click",()=>{this.trackAction("settings_opened",{source:"mobile_button"}),this.openSettingsModal()}),this.$mobileScrollImages.addEventListener("click",()=>{this.open=!0,this.$imagesSection.open=!0,this.$imagesSection.scrollIntoView({behavior:"smooth",block:"start"}),this.trackAction("mobile_scroll_images_clicked",{source:"mobile_button"})}),this.$captureTemplate.addEventListener("click",()=>{this.trackAction("capture_template_button_clicked",{source:"widget_button"}),this.captureTemplate()}),this.$toolColorConverter.addEventListener("click",()=>{this.openExternalTool("colorConverter")}),this.$toolSamuelArchive.addEventListener("click",()=>{this.openExternalTool("samuelArchive")}),this.$toolEralyonArchive.addEventListener("click",()=>{this.openExternalTool("eralyonArchive")}),this.$toolReceiveSmss.addEventListener("click",()=>{this.openExternalTool("receiveSmss")}),this.$toolEsimplus.addEventListener("click",()=>{this.openExternalTool("esimplus")}),this.$toolReceiveSmsFree.addEventListener("click",()=>{this.openExternalTool("receiveSmsFree")}),this.$toolQuackr.addEventListener("click",()=>{this.openExternalTool("quackr")}),this.$toolTextverified.addEventListener("click",()=>{this.openExternalTool("textverified")}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$autofarmConfig.addEventListener("click",()=>{this.trackAction("auto_farm_config_opened",{source:"widget_button"}),this.openAutoFarmModal()}),this.$autofarmStart.addEventListener("click",()=>{this.trackAction("auto_farm_start_clicked",{source:"widget_button"}),this.startAutoFarm()}),this.$autofarmStop.addEventListener("click",()=>{this.trackAction("auto_farm_stop_clicked",{source:"widget_button"}),this.stopAutoFarm()}),this.$autoOverlayConfig.addEventListener("click",()=>{this.trackAction("auto_draw_config_opened",{source:"widget_button"}),this.openAutoOverlayModal()}),this.$autoOverlayStart.addEventListener("click",()=>{this.trackAction("auto_draw_start_clicked",{source:"widget_button"}),this.startAutoOverlay()}),this.$autoOverlayStop.addEventListener("click",()=>{this.trackAction("auto_draw_stop_clicked",{source:"widget_button"}),this.stopAutoOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value,this.trackAction("bot_strategy_changed",{source:"widget_select",strategy:this.bot.strategy})}),this.applyImagesCollapsedPreference(),this.$imagesSection.addEventListener("toggle",()=>{if(this.persistImagesCollapsedPreference(!this.$imagesSection.open),this.refreshImagesCollapseText(),this.trackAction("widget_images_section_toggled",{source:"widget_details",open:this.$imagesSection.open,collapsed:!this.$imagesSection.open,images:this.bot.images.length}),!this.$imagesSection.open||!this.imagesListDirty)return;this.renderImagesList(),this.imagesListDirty=!1}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.loadAutoFarmConfigFromStorage(),this.loadAutoOverlayConfigFromStorage(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.statusRefreshIntervalId=window.setInterval(()=>{this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.refreshProgress()},1000),this.open=!0,window.setTimeout(()=>{this.recommendUpdateIfOutdated()},2500),console.log("[KGM][Widget] Widget mounted and opened")}trackAction(o,l={}){this.bot.trackAction(o,{source:"widget",...l})}imageTelemetry(o){let l=this.bot.images[o];if(!l)return{index:o,missing:!0};return this.bot.summarizeImageForTelemetry(l,o)}fileTelemetry(o){return{name:o.name,size:o.size,type:o.type,lastModified:o.lastModified,extension:o.name.includes(".")?o.name.split(".").pop()?.toLowerCase():""}}startChallengeWatcher(){let o=()=>{if(!this.isChallengeBlockingPaint())return;if(this.challengeWatcherRunning)return;this.challengeWatcherRunning=!0,this.status=`⌛ ${t("taskWaitingChallengeResolve")}`,this.waitForChallengeToResolve().finally(()=>{this.challengeWatcherRunning=!1})};this.challengeWatcherObserver=new MutationObserver(()=>{o()}),this.challengeWatcherObserver.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["open","style","class","value","aria-hidden"]});let l=window.setInterval(o,750);this.runOnDestroy.push(()=>{this.challengeWatcherObserver?.disconnect(),clearInterval(l)}),o()}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.trackAction("image_add_started",{source:"widget"}),this.setDisabled("add-image",!0),this.run(t("taskAddingImage"),async()=>{let o;try{await this.bot.updateColors();let l=document.createElement("input");l.type="file",l.accept=`image/*,.${I},.wplace`,l.click(),await Z(l,["change"],["cancel","error"]);let a=l.files?.[0];if(!a)throw new Fo(this.bot);o=this.fileTelemetry(a),this.trackAction("image_file_selected",{source:"file_picker",file:o}),console.log("[KGM][Widget] File selected",{name:a.name,size:a.size,type:a.type});let r;if(a.name.endsWith(`.${I}`))r=await W.fromJSON(this.bot,JSON.parse(await a.text()));else if(a.name.endsWith(".wplace")){let i=JSON.parse(await a.text());if(!i.image?.dataUrl)throw Error("Invalid .wplace file: image.dataUrl missing");let c=new Image;if(c.src=i.image.dataUrl,await Z(c,["load"],["error"]),await this.waitForStableViewportProjection(),r=new W(this.bot,J.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new L(this.bot,c)),typeof i.opacity==="number")r.opacity=Math.max(0,Math.min(1,i.opacity))}else{let i=new FileReader;i.readAsDataURL(a),await Z(i,["load"],["error"]);let c=await this.compressImageBeforeLoad(i.result),g=new Image;g.src=c,await Z(g,["load"],["error"]),await this.waitForStableViewportProjection(),r=new W(this.bot,J.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new L(this.bot,g))}this.bot.images.push(r);let s=this.bot.images.length-1;console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),this.trackAction("image_loaded",{source:"file_picker",file:o,image:this.imageTelemetry(s),images:this.bot.images.length}),await this.bot.readMap(),r.updateTasks(),F(this.bot,!0),this.bot.updateTasks(),this.update(),window.setTimeout(()=>{globalThis.location.reload()},120)}catch(l){throw this.trackAction("image_load_failed",{source:"file_picker",file:o??null,reason:l instanceof Error?l.message:"unknown"}),l}},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.trackAction("capture_template_started",{source:"widget"}),this.run(t("taskCapturingMapImage"),async()=>{try{let o=await this.resolveCaptureBounds(),{minGlobalX:l,minGlobalY:a,maxGlobalX:r,maxGlobalY:s}=o;this.trackAction("capture_template_area_selected",{source:"widget",selection:o,width:r-l+1,height:s-a+1});let i=document.createElement("canvas");i.width=Math.max(1,r-l+1),i.height=Math.max(1,s-a+1);let c=i.getContext("2d");if(!c)throw Error("Capture context unavailable");c.imageSmoothingEnabled=!1;let g=Math.floor(l/D),p=Math.floor(a/D),d=Math.floor(r/D),f=Math.floor(s/D),w=(d-g+1)*(f-p+1),n=0;for(let e=g;e<=d;e++)for(let h=p;h<=f;h++){this.status=`⌛ ${t("taskReadingTiles")} [${++n}/${w}]`;let u=await this.loadTileImage(e,h),m=e*D,z=h*D,M=Math.max(l,m),H=Math.min(r,m+D-1),P=Math.max(a,z),N=Math.min(s,z+D-1),j=M-m,K=P-z,O=H-M+1,B=N-P+1,lo=M-l,ro=P-a;c.drawImage(u,j,K,O,B,lo,ro,O,B)}let b=Date.now();await this.downloadCapture(i,"png",b),this.trackAction("capture_template_completed",{source:"widget",selection:o,width:i.width,height:i.height,totalTiles:w,format:"png"})}catch(o){throw this.trackAction("capture_template_failed",{source:"widget",reason:o instanceof Error?o.message:"unknown"}),o}},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,l,a){let r=l==="webp"?"image/webp":"image/png",s=await new Promise((g,p)=>{o.toBlob((d)=>{if(!d){p(Error(`Failed to create ${l.toUpperCase()} capture file`));return}g(d)},r)}),i=URL.createObjectURL(s),c=document.createElement("a");c.href=i,c.download=`wplace-capture-${a}.${l}`,c.click(),URL.revokeObjectURL(i)}async loadTileImage(o,l){let a;for(let r=1;r<=3;r++)try{let s=new Image;return s.crossOrigin="anonymous",s.referrerPolicy="no-referrer",s.src=`https://backend.wplace.live/files/s0/tiles/${o}/${l}.png?ts=${Date.now()}-${r}`,await Z(s,["load"],["error"]),s}catch(s){if(a=s,r<3)await new Promise((i)=>setTimeout(i,r*200))}throw a instanceof Error?a:Error(`Tile fetch failed (${o}/${l})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((o,l)=>{let a=document.createElement("div");a.className="kgm-capture-overlay",a.innerHTML=`<div class="kgm-capture-hint">${t("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let r=a.querySelector(".kgm-capture-box");document.body.append(a);let s,i,c=()=>{window.removeEventListener("keydown",w,!0),a.removeEventListener("pointermove",d),a.removeEventListener("pointerdown",f),a.remove()},g=(n)=>{let b=Math.min(s.x,n.x),e=Math.min(s.y,n.y),h=Math.abs(s.x-n.x)+1,u=Math.abs(s.y-n.y)+1;return{left:b,top:e,width:h,height:u}},p=(n)=>{let{left:b,top:e,width:h,height:u}=g(n);r.style.left=`${b}px`,r.style.top=`${e}px`,r.style.width=`${h}px`,r.style.height=`${u}px`},d=(n)=>{if(!s)return;p({x:n.clientX,y:n.clientY})},f=(n)=>{if(n.preventDefault(),!s){s={x:n.clientX,y:n.clientY};let M=J.fromScreenPosition(this.bot,s);i={x:M.globalX,y:M.globalY},p(s);return}let b={x:n.clientX,y:n.clientY},e=J.fromScreenPosition(this.bot,b);if(c(),!i){l(Error("Capture anchor point unavailable"));return}let h=Math.min(i.x,e.globalX),u=Math.min(i.y,e.globalY),m=Math.max(i.x,e.globalX),z=Math.max(i.y,e.globalY);if(m-h<1||z-u<1){l(Error("Capture area too small"));return}o({minGlobalX:h,minGlobalY:u,maxGlobalX:m,maxGlobalY:z})},w=(n)=>{if(n.key!=="Escape")return;c(),l(Error("Capture cancelled"))};window.addEventListener("keydown",w,!0),a.addEventListener("pointermove",d),a.addEventListener("pointerdown",f)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let l=new Image;if(l.src=o,await Z(l,["load"],["error"]),!(l.naturalWidth*l.naturalHeight>3000000||o.length>3000000))return o;let r=document.createElement("canvas");r.width=l.naturalWidth,r.height=l.naturalHeight;let s=r.getContext("2d");if(!s)return o;return s.drawImage(l,0,0),r.toDataURL("image/png")}async waitForStableViewportProjection(){let o=this.defaultImageScreenPosition(),l=0,a;for(let r=0;r<45;r++){await new Promise((d)=>requestAnimationFrame(()=>{d()}));let{anchorScreenPosition:{x:s,y:i},pixelSize:c}=this.bot.findAnchorsForScreen(o);if(!Number.isFinite(c)||c<=0){l=0;continue}let g={anchorX:s,anchorY:i,pixelSize:c};if(!a){a=g,l=1;continue}if(Math.abs(g.anchorX-a.anchorX)+Math.abs(g.anchorY-a.anchorY)+Math.abs(g.pixelSize-a.pixelSize)<0.0012)l++;else l=0;if(a=g,l>=3)return}}update(){if(this.$strategy.value=this.bot.strategy,this.refreshProgress(),this.imagesListDirty=!0,!this.$imagesSection.open)return;this.renderImagesList(),this.imagesListDirty=!1}renderImagesList(){this.$images.innerHTML="";let o=document.createDocumentFragment();for(let l=0;l<this.bot.images.length;l++){let a=this.bot.images[l],r=document.createElement("div");o.append(r),r.className="image",r.innerHTML=`<button class="preview" title="View preview">
  <img src="${a.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="focus-map" title="Go to image position"><i class="fa-solid fa-location-crosshairs" aria-hidden="true"></i></button>
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="strategy-modal" title="Strategy modal"><i class="fa-solid fa-sliders" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${l===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${l===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,r.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=l,this.trackAction("image_preview_opened",{source:"image_controls",image:this.imageTelemetry(l)}),a.openPreviewPanel()}),r.querySelector(".focus-map").addEventListener("click",()=>{this.activeImageIndex=l,this.trackAction("image_focus_requested",{source:"image_controls",image:this.imageTelemetry(l)}),a.position.scrollScreenTo()}),r.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=l,this.trackAction("image_colors_opened",{source:"image_controls",image:this.imageTelemetry(l)}),a.openColorPanel()}),r.querySelector(".strategy-modal").addEventListener("click",()=>{this.activeImageIndex=l,this.trackAction("image_strategy_modal_opened",{source:"image_controls",image:this.imageTelemetry(l)}),a.openPreviewPanel()}),r.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=l,this.trackAction("image_strategy_preview_opened",{source:"image_controls",image:this.imageTelemetry(l)}),a.openPreviewPanel()}),r.querySelector(".download").addEventListener("click",()=>{this.trackAction("image_settings_downloaded",{source:"image_controls",image:this.imageTelemetry(l)}),a.exportImage()}),r.querySelector(".delete").addEventListener("click",()=>{this.trackAction("image_deleted",{source:"image_controls",image:this.imageTelemetry(l)}),a.destroy()}),r.querySelector(".up").addEventListener("click",()=>{this.trackAction("image_reordered",{source:"image_controls",direction:"up",fromIndex:l,toIndex:l-1,image:this.imageTelemetry(l)}),mo(this.bot.images,l,l-1),this.update(),F(this.bot)}),r.querySelector(".down").addEventListener("click",()=>{this.trackAction("image_reordered",{source:"image_controls",direction:"down",fromIndex:l,toIndex:l+1,image:this.imageTelemetry(l)}),mo(this.bot.images,l,l+1),this.update(),F(this.bot)})}this.$images.append(o)}refreshProgress(){let o=0,l=0;for(let s=0;s<this.bot.images.length;s++){let i=this.bot.images[s];o+=i.pixels.pixels.length*i.pixels.pixels[0].length,l+=i.tasks.length}let a=Math.max(0,o-l),r=o>0?a/o*100|0:0;this.$progressText.textContent=`${a}/${o} ${r}% ETA: ${l/120|0}h`,this.$progressLine.style.transform=`scaleX(${r/100})`}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Eo)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let l=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",l),localStorage.setItem(Eo,String(l)),this.refreshOverlayToggleText(),this.trackAction("overlay_visibility_changed",{source:"widget",hidden:l})}refreshOverlayToggleText(){let o=document.body.classList.contains("overlay-hidden"),l=o?t("disabled"):t("enabled"),a=o?'<i class="fa-solid fa-circle-xmark" aria-hidden="true"></i>':'<i class="fa-solid fa-circle-check" aria-hidden="true"></i>';this.$toggleOverlay.innerHTML=`<i class="fa-solid fa-layer-group"></i><span>${t("toggleOverlay")} (${l})</span>${a}`}applyLocaleToUI(o){no(o),Q(this.element);for(let l=0;l<this.bot.images.length;l++)this.bot.images[l].applyLocale();this.refreshOverlayToggleText(),this.refreshImagesCollapseText(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText()}applyImagesCollapsedPreference(){let o=this.readImagesCollapsedPreference();if(this.$imagesSection.open=!o,this.refreshImagesCollapseText(),this.$imagesSection.open&&this.imagesListDirty)this.renderImagesList(),this.imagesListDirty=!1}readImagesCollapsedPreference(){let o=localStorage.getItem(Oo);if(o==="true")return!0;if(o==="false")return!1;return po().imagesCollapsed??!1}persistImagesCollapsedPreference(o){localStorage.setItem(Oo,String(o)),v({imagesCollapsed:o})}refreshImagesCollapseText(){this.$imagesCollapseState.textContent=this.$imagesSection.open?t("widgetImagesCollapse"):t("widgetImagesExpand")}openSettingsModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog",o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="settingsModalTitle">Settings</strong>
    <button type="button" class="modal-close" aria-label="${t("close")}"><span class="icon">×</span></button>
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
</form>`,document.body.append(o),Q(o);let l=o.querySelector(".settings-locale");l.value=y(),o.querySelector(".script-update").addEventListener("click",()=>{this.trackAction("script_update_link_opened",{source:"settings_modal",targetUrl:"https://github.com/robgallardof/kglacer-macro/raw/refs/heads/main/dist.user.js"}),globalThis.open("https://github.com/robgallardof/kglacer-macro/raw/refs/heads/main/dist.user.js","_blank","noopener,noreferrer")}),l.addEventListener("change",()=>{this.applyLocaleToUI(l.value),Q(o),this.trackAction("settings_locale_changed",{source:"settings_modal",locale:l.value})});let a=JSON.parse(localStorage.getItem(vo)??"{}"),r=o.querySelector(".proxy-enabled"),s=o.querySelector(".proxy-host"),i=o.querySelector(".proxy-port"),c=o.querySelector(".proxy-user"),g=o.querySelector(".proxy-pass"),p=o.querySelector(".shield-enabled"),d=o.querySelector(".proxy-settings"),f=o.querySelector(".shield-settings"),w=o.querySelector(".shield-controls"),n=o.querySelector(".proxy-test"),b=o.querySelector(".proxy-test-output"),e=o.querySelector(".public-ip-value"),h=o.querySelector(".public-ip-route"),u=o.querySelector(".account-info-refresh"),m=o.querySelector(".account-info-output"),z=async()=>{u.disabled=!0,await this.renderAccountInfoOutput(m),u.disabled=!1};u.addEventListener("click",async()=>{this.trackAction("settings_account_refresh_clicked",{source:"settings_modal"}),await this.bot.refreshControlAccess("settings").catch(()=>null),await z()}),z(),r.checked=Boolean(a.enabled),p.checked=Po(),d.open=r.checked,f.open=p.checked,this.renderShieldControls(w),s.value=a.host??"",i.value=a.port??"",c.value=a.username??"",g.value=a.password??"";let M=(P=!0)=>{let N=r.checked,j=s.value.trim(),K=i.value.trim();if(localStorage.setItem(vo,JSON.stringify({enabled:N,host:j,port:K,username:c.value.trim(),password:g.value})),localStorage.setItem($o,N&&j&&K?`${j}:${K}`:"DIRECT/SHIELD"),P)this.trackAction("proxy_settings_changed",{source:"settings_modal",enabled:N,host:j,port:K,hasUsername:Boolean(c.value.trim()),hasPassword:Boolean(g.value)})},H=async()=>{if(e)e.textContent=t("publicIpChecking");if(h)h.textContent=this.getPublicIpRouteLabel({enabled:r.checked,host:s.value.trim(),port:i.value.trim()});let P=await this.fetchPublicIp();if(e)e.textContent=P??t("publicIpUnavailable")};for(let P of[r,s,i,c,g])P.addEventListener("change",()=>{M(),H()});r.addEventListener("change",()=>{d.open=r.checked}),M(!1),H(),n.addEventListener("click",async()=>{M();let P=s.value.trim(),N=i.value.trim();if(this.trackAction("proxy_test_started",{source:"settings_modal",host:P,port:N}),n.disabled=!0,b)b.innerHTML=`<div class="pending">⏳ ${t("proxyTesting")}</div>`;let j=await this.testProxyConnection(P,N);if(await H(),b)b.innerHTML=`<div class="${j?"ok":"fail"}">${j?"✅":"❌"} ${j?t("proxyOk"):t("proxyFail")}</div>`;else alert(j?t("proxyOk"):t("proxyFail"));this.trackAction("proxy_test_completed",{source:"settings_modal",host:P,port:N,ok:j}),n.disabled=!1}),p.addEventListener("change",()=>{f.open=p.checked,this.renderShieldControls(w),xo(p.checked),this.trackAction("shield_enabled_changed",{source:"settings_modal",enabled:p.checked}),window.setTimeout(()=>{location.reload()},120)}),o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}async renderAccountInfoOutput(o){o.innerHTML=`<div class="pending">⌛ ${t("accountInfoLoading")}</div>`;let l=this.bot.getControlSession(),[a,r,s]=await Promise.all([this.bot.fetchAccountInfo(!0).catch(()=>null),this.bot.getAccountCookieStatus({force:!0,exhaustive:!0,timeoutMs:2000}).catch(()=>({hasToken:!1,source:"none",token:null})),fo().catch(()=>null)]),i=l?.access,c=l?.serial,g=[[t("settingsAccessStatus"),i?.allowed===!1?t("disabled"):t("enabled")],[t("settingsApiMode"),i?.mode??"—"],[t("settingsControlUser"),l?t("enabled"):t("disabled")],[t("settingsLicenseUser"),c?.username??i?.username??"—"],[t("settingsSerialStatus"),c?.status??(c?.valid?"active":"—")],[t("settingsSerialValidatedAt"),c?.validatedAt??"—"],[t("settingsLicenseOwner"),c?.ownerName??"—"],[t("settingsDeviceLimit"),this.formatDeviceLimit(i,c)],[t("settingsCookieJ"),r.hasToken?`${t("settingsCookieJDetected")} · ${r.token??"—"}`:t("settingsCookieJNotDetected")],[t("settingsCookieSource"),r.source],[t("settingsWplaceId"),a?.id??"—"],[t("settingsWplaceName"),a?.name??"—"],[t("settingsDiscord"),a?.discord??"—"],[t("settingsDiscordId"),a?.discordId??"—"],[t("settingsCountry"),a?.country??"—"],[t("settingsAlliance"),a?.allianceName??"—"],[t("settingsAllianceRole"),a?.allianceRole??"—"],[t("settingsLevel"),a?.level??"—"],[t("settingsPixelsPainted"),a?.pixelsPainted??"—"],[t("settingsDroplets"),a?.droplets??"—"],[t("settingsCharges"),this.formatCharges(a?.charges)],[t("settingsCustomer"),a?.isCustomer===void 0?"—":a.isCustomer?t("enabled"):t("disabled")],[t("settingsSuspension"),a?.suspensionReason??"—"],[t("settingsTimeout"),a?.timeoutUntil??"—"],[t("settingsLocalDeviceId"),s?.localDeviceId??"—"],[t("settingsFingerprint"),s?.deviceFingerprintHash??"—"],[t("settingsUserAgent"),s?.userAgent??navigator.userAgent],[t("settingsPlatform"),s?.platform??navigator.platform],[t("settingsLanguage"),s?.language??navigator.language],[t("settingsTimezone"),s?.timezone??"—"],[t("settingsScreen"),s?`${s.screenWidth}×${s.screenHeight} @${s.devicePixelRatio}`:"—"],[t("settingsTouchSupport"),s?.touchSupport?t("enabled"):t("disabled")],[t("settingsHardwareConcurrency"),s?.hardwareConcurrency??"—"],[t("settingsDeviceMemory"),s?.deviceMemory??"—"],[t("settingsMacAddress"),t("settingsMacUnavailable")]];o.innerHTML=`<div class="account-info-grid">${g.map(([p,d])=>`<div class="account-info-card"><span>${this.escapeHtml(p)}</span><strong>${this.escapeHtml(this.stringifyShieldValue(d))}</strong></div>`).join("")}</div>`}formatDeviceLimit(o,l){let a=o?.registeredDevices,r=o?.maxDevices??l?.maxDevices;if(a===void 0&&r===void 0)return"—";return`${a??"—"} / ${r??"—"}`}formatCharges(o){if(!o||typeof o!=="object")return"—";let l=o,a=typeof l.count==="number"?Math.floor(l.count):l.count;return`${this.formatUnknownValue(a)} / ${this.formatUnknownValue(l.max)} (${this.formatUnknownValue(l.cooldownMs)} ms)`}formatUnknownValue(o){if(typeof o==="string"||typeof o==="number"||typeof o==="boolean")return String(o);return"—"}renderShieldControls(o){let s={navigator:t("shieldFeatureNavigator"),userAgentData:t("shieldFeatureUaData"),screen:t("shieldFeatureScreen"),timezone:t("shieldFeatureTimezone"),canvas:t("shieldFeatureCanvas"),webgl:t("shieldFeatureWebgl"),audio:t("shieldFeatureAudio"),plugins:t("shieldFeaturePlugins"),mediaDevices:t("shieldFeatureMediaDevices"),storageEstimate:t("shieldFeatureStorage"),battery:t("shieldFeatureBattery"),speechSynthesis:t("shieldFeatureSpeech"),fonts:t("shieldFeatureFonts"),matchMedia:t("shieldFeatureMatchMedia"),sharedArrayBuffer:t("shieldFeatureSharedArrayBuffer")},i=this.readStorageJson("__afm_profile",null),c="__afm_profile_choices",g=Number(localStorage.getItem("__afm_profile_expiry")??"0"),p=this.readStorageJson("__afm_settings",{}),d=this.readStorageJson("__afm_profile_choices",[]),w={...Object.fromEntries(Object.keys(s).map((u)=>[u,!0])),...p},n=g>0?new Date(g).toLocaleString():"—",b=i?.id??"Auto",e=d.map((u)=>`<option value="${u.id}" ${u.id===b?"selected":""}>${u.id}</option>`).join(""),h=Object.entries(s).map(([u,m])=>`<label class="kgm-switch-row"><span>${m}</span><span class="kgm-switch"><input type="checkbox" data-shield-key="${u}" ${w[u]?"checked":""}/><span class="kgm-switch-slider" aria-hidden="true"></span></span></label>`).join("");o.innerHTML=`<div class="shield-profile-row"><label>${t("shieldProfile")}</label><select class="shield-profile-select"><option value="">${t("shieldProfileAuto")}</option>${e}</select></div><div class="wp shield-expiry-line">${t("shieldExpires")}: <strong>${n}</strong></div><div class="widget-actions kgm-button-grid"><button type="button" class="challenge-button shield-refresh-profile"><i class="fa-solid fa-rotate"></i><span>${t("shieldRefreshProfile")}</span></button><button type="button" class="challenge-button shield-checker"><i class="fa-solid fa-shield-check"></i><span>${t("shieldChecker")}</span></button><button type="button" class="challenge-button shield-info"><i class="fa-solid fa-circle-info"></i><span>${t("shieldInfo")}</span></button></div><div class="shield-checker-output" aria-live="polite"></div><div class="shield-control-grid">${h}</div>`,o.querySelectorAll("input[data-shield-key]").forEach((u)=>{u.addEventListener("change",()=>{let m=u.dataset.shieldKey;w[m]=u.checked,localStorage.setItem("__afm_settings",JSON.stringify(w)),this.trackAction("shield_module_changed",{source:"shield_settings",key:m,enabled:u.checked}),window.setTimeout(()=>{location.reload()},120)})}),o.querySelector(".shield-profile-select")?.addEventListener("change",(u)=>{let m=u.currentTarget.value;if(!m)localStorage.removeItem("__afm_profile");else{let z=d.find((M)=>M.id===m);localStorage.setItem("__afm_profile",JSON.stringify(z??{id:m}))}this.trackAction("shield_profile_changed",{source:"shield_settings",profileId:m||"auto"}),location.reload()}),o.querySelector(".shield-checker")?.addEventListener("click",()=>{let u=o.querySelector(".shield-checker-output");if(!u)return;let m=this.runShieldChecker();this.trackAction("shield_checker_run",{source:"shield_settings",checks:m}),u.innerHTML=m.map((z)=>`<div class="${z.ok?"ok":"fail"}">${z.ok?"✅":"❌"} ${z.label}</div>`).join("")}),o.querySelector(".shield-info")?.addEventListener("click",()=>{this.trackAction("shield_info_opened",{source:"shield_settings"}),this.openShieldInfoModal()}),o.querySelector(".shield-refresh-profile")?.addEventListener("click",()=>{this.trackAction("shield_profile_refreshed",{source:"shield_settings"}),localStorage.removeItem("__afm_profile"),localStorage.removeItem("__afm_profile_expiry"),location.reload()})}getShieldInfo(){let o=this.readStorageJson("__afm_profile",null),l=this.readStorageJson("__afm_settings",{}),a=this.readStorageJson("__afm_profile_choices",[]);return{injectedInfo:globalThis.__kgmShieldInfo,profile:o,settings:l,choices:a,expiry:Number(localStorage.getItem("__afm_profile_expiry")??"0"),enabled:localStorage.getItem("__afm_enabled")!=="false",proxyHint:localStorage.getItem($o)??"AUTO"}}readStorageJson(o,l){try{let a=localStorage.getItem(o);if(!a)return l;return JSON.parse(a)}catch{return l}}getPublicIpRouteLabel(o){if(o.enabled&&o.host&&o.port)return`${t("publicIpProxyRoute")} (${o.host}:${o.port})`;return t("publicIpShieldRoute")}async fetchPublicIp(){for(let o of Wa)try{let l=await fetch(o,{cache:"no-store"});if(!l.ok)continue;if((l.headers.get("content-type")??"").includes("application/json")){let r=await l.json();if(typeof r.ip==="string"&&r.ip.trim())return r.ip.trim()}else{let r=(await l.text()).trim();if(r)return r}}catch{}return}openShieldInfoModal(){let o=this.getShieldInfo(),l=o.injectedInfo?.profile,a=typeof l==="object"&&l!==null?l:o.profile,r=o.injectedInfo?.settings??o.settings,s=Number(o.injectedInfo?.expiresAt??o.expiry),i=(w,n="—")=>this.stringifyShieldValue(a?.[w],n),c=a?`${i("screenWidth")}×${i("screenHeight")} @${i("devicePixelRatio")}`:"—",g=a?`${i("webglVendor")} / ${i("webglRenderer")}`:"—",p=[[t("shieldInfoInjected"),o.injectedInfo?t("enabled"):t("disabled")],[t("shieldInfoEnabled"),o.enabled?t("enabled"):t("disabled")],[t("shieldProfile"),i("id")],[t("shieldExpires"),s>0?new Date(s).toLocaleString():"—"],[t("shieldInfoBrowser"),this.stringifyShieldValue(o.injectedInfo?.detectedBrowser)],[t("shieldInfoProxyHint"),this.stringifyShieldValue(o.injectedInfo?.proxyHint,o.proxyHint)],[t("publicIpTitle"),t("publicIpChecking")],[t("shieldInfoProfiles"),o.choices.length>0?String(o.choices.length):"—"],["User-Agent",i("userAgent",navigator.userAgent)],["Platform",i("platform",navigator.platform)],["Language",i("language",navigator.language)],["Screen",c],["WebGL",g]],d=Object.entries(r).filter(([,w])=>w).map(([w])=>w).join(", "),f=document.createElement("dialog");f.className="kgm-modal shield-info-dialog",f.innerHTML=`<div class="kgm-modal-head"><strong>${t("shieldInfoTitle")}</strong><button type="button" class="modal-close" aria-label="${t("close")}"><span class="icon">×</span></button></div><div class="shield-info-grid">${p.map(([w,n])=>`<div class="shield-info-card"><span>${this.escapeHtml(w)}</span><strong${w===t("publicIpTitle")?' class="shield-info-public-ip"':""}>${this.escapeHtml(n)}</strong></div>`).join("")}</div><div class="shield-info-modules"><span>${t("shieldInfoModules")}</span><p>${this.escapeHtml(d.length>0?d:"—")}</p></div>`,document.body.append(f),this.fetchPublicIp().then((w)=>{let n=f.querySelector(".shield-info-public-ip");if(n)n.textContent=w??t("publicIpUnavailable")}),f.querySelector(".modal-close").onclick=()=>{f.close(),f.remove()},f.addEventListener("close",()=>{f.remove()}),f.showModal()}stringifyShieldValue(o,l="—"){if(o===void 0||o===null||o==="")return l;if(typeof o==="string"||typeof o==="number"||typeof o==="boolean")return String(o);return JSON.stringify(o)}escapeHtml(o){return String(o).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}async testProxyConnection(o,l){if(!o||!l)return!1;try{return await fetch(`http://${o}:${l}`,{method:"HEAD",mode:"no-cors"}),!0}catch{return!1}}runShieldChecker(){let o=this.getShieldInfo(),l=o.profile,a=o.injectedInfo?.settings,r=typeof a==="object"&&a!==null?a:o.settings,s=Boolean(o.injectedInfo??l);return[{label:t("shieldCheckInjected"),ok:s},{label:t("shieldCheckSettings"),ok:Object.keys(r).length>0},{label:t("shieldCheckProfile"),ok:Boolean(l?.id??o.injectedInfo?.profileId)},{label:t("shieldCheckChoices"),ok:o.choices.length>0},{label:t("shieldCheckNavigator"),ok:navigator.hardwareConcurrency!==0&&typeof navigator.platform==="string"}]}refreshAutoFarmStatusText(){if(!this.autoFarmConfig){this.$autofarmStatus.textContent=t("autoFarmNeedsConfig");return}this.$autofarmStatus.textContent=this.autoFarmIntervalId?`${t("autoFarmRunning")} (${this.formatAutoFarmDelay(this.autoFarmConfig.timerMs)}) · ${this.formatCountdown(this.autoFarmNextTickAt)}`:t("autoFarmStopped")}refreshAutoOverlayStatusText(){if(!this.autoOverlayConfig){this.$autoOverlayStatus.textContent=t("autoOverlayNeedsConfig");return}this.$autoOverlayStatus.textContent=this.autoOverlayIntervalId?`${t("autoOverlayRunning")} (${this.formatAutoFarmDelay(this.autoOverlayConfig.timerMs)}) · ${this.formatCountdown(this.autoOverlayNextTickAt)}`:t("autoOverlayStopped")}formatCountdown(o){if(!o)return"00:00";let l=Math.max(0,o-Date.now()),a=Math.ceil(l/1000),r=Math.floor(a/60),s=a%60;return`${t("nextRunIn")} ${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}`}formatAutoFarmDelay(o){if(o%3600000===0)return`${o/3600000}h`;if(o%60000===0)return`${o/60000}m`;return`${o/1000}s`}stopAutoFarm(){if(!this.autoFarmIntervalId)return;clearInterval(this.autoFarmIntervalId),this.autoFarmIntervalId=void 0,this.autoFarmNextTickAt=void 0,this.refreshAutoFarmStatusText(),this.trackAction("auto_farm_stopped",{source:"widget",config:this.autoFarmConfig??null})}stopAutoOverlay(){if(!this.autoOverlayIntervalId)return;clearInterval(this.autoOverlayIntervalId),this.autoOverlayIntervalId=void 0,this.autoOverlayNextTickAt=void 0,this.refreshAutoOverlayStatusText(),this.trackAction("auto_draw_stopped",{source:"widget",config:this.autoOverlayConfig??null})}startAutoFarm(){if(!this.autoFarmConfig){this.status=`⚠️ ${t("autoFarmNeedsConfig")}`,this.refreshAutoFarmStatusText(),this.trackAction("auto_farm_start_failed",{source:"widget",reason:"missing_config"});return}this.stopAutoFarm(),this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.autoFarmIntervalId=window.setInterval(()=>{this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.runAutoFarmCycle()},this.autoFarmConfig.timerMs),this.runAutoFarmCycle(),this.refreshAutoFarmStatusText(),this.trackAction("auto_farm_started",{source:"widget",config:this.autoFarmConfig,nextTickAt:this.autoFarmNextTickAt})}startAutoOverlay(){if(!this.autoOverlayConfig){this.status=`⚠️ ${t("autoOverlayNeedsConfig")}`,this.refreshAutoOverlayStatusText(),this.trackAction("auto_draw_start_failed",{source:"widget",reason:"missing_config"});return}this.stopAutoOverlay(),this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.autoOverlayIntervalId=window.setInterval(()=>{this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.runAutoOverlayCycle()},this.autoOverlayConfig.timerMs),this.runAutoOverlayCycle(),this.refreshAutoOverlayStatusText(),this.trackAction("auto_draw_started",{source:"widget",config:this.autoOverlayConfig,nextTickAt:this.autoOverlayNextTickAt})}async runAutoFarmCycle(){if(!this.autoFarmConfig||this.autoFarmTickRunning)return;this.autoFarmTickRunning=!0;let o=this.resolveCyclePixelCount(this.autoFarmConfig);this.trackAction("auto_farm_cycle_started",{source:"widget",config:this.autoFarmConfig,pixels:o});try{let l=await this.bot.drawRandomPixelsBatch(o,0);if(!l){this.status=`⚠️ ${t("autoFarmStopped")}: ${t("autoFarmTransparentUnavailable")}`,this.trackAction("auto_farm_cycle_stopped_no_pixels",{source:"widget",pixels:o}),this.stopAutoFarm();return}await this.waitAndClickPaintButton(),this.trackAction("auto_farm_cycle_completed",{source:"widget",pixels:o,painted:l})}catch(l){throw this.trackAction("auto_farm_cycle_failed",{source:"widget",pixels:o,reason:l instanceof Error?l.message:"unknown"}),l}finally{this.autoFarmTickRunning=!1}}async runAutoOverlayCycle(){if(!this.autoOverlayConfig||this.autoOverlayTickRunning)return;this.autoOverlayTickRunning=!0;let o=this.resolveCyclePixelCount(this.autoOverlayConfig);this.trackAction("auto_draw_cycle_started",{source:"widget",config:this.autoOverlayConfig,pixels:o});try{let l=await this.bot.drawOverlayPixelsBatch(o);if(!l){this.status=`⚠️ ${t("autoOverlayStopped")}: ${t("autoOverlayNoTasks")}`,this.trackAction("auto_draw_cycle_stopped_no_tasks",{source:"widget",pixels:o}),this.stopAutoOverlay();return}await this.waitAndClickPaintButton(),this.trackAction("auto_draw_cycle_completed",{source:"widget",pixels:o,painted:l})}catch(l){throw this.trackAction("auto_draw_cycle_failed",{source:"widget",pixels:o,reason:l instanceof Error?l.message:"unknown"}),l}finally{this.autoOverlayTickRunning=!1}}saveAutoFarmConfig(o){this.autoFarmConfig=o,localStorage.setItem(Io,JSON.stringify(o)),v({farm:this.toControlPixelSettings(o)}),this.trackAction("auto_farm_config_saved",{source:"widget",config:o})}saveAutoOverlayConfig(o){this.autoOverlayConfig=o,localStorage.setItem(_o,JSON.stringify(o)),v({autoDraw:this.toControlPixelSettings(o)}),this.trackAction("auto_draw_config_saved",{source:"widget",config:o})}resolveCyclePixelCount(o){if(!o.usePixelRange)return Math.max(1,Math.floor(o.pixels));let l=Math.max(1,Math.floor(o.pixelRange.min)),a=Math.max(l,Math.floor(o.pixelRange.max));return l+Math.floor(Math.random()*(a-l+1))}toControlPixelSettings(o){return{usePixelRange:o.usePixelRange,pixel:Math.max(1,Math.floor(o.pixels)),pixelRange:{min:Math.max(1,Math.floor(o.pixelRange.min)),max:Math.max(1,Math.floor(o.pixelRange.max))}}}getRemotePixelSettings(o){return po()[o]}loadAutoFarmConfigFromStorage(){let o=this.getRemotePixelSettings("farm"),l=localStorage.getItem(Io);if(!l&&o){this.autoFarmConfig=this.createDefaultAutoConfig(o);return}if(!l)return;try{let a=JSON.parse(l);if(typeof a.value!=="number"||!Number.isFinite(a.value)||a.value<1)return;let r=typeof a.pixels==="number"&&Number.isFinite(a.pixels)&&a.pixels>=1?Math.floor(a.pixels):Math.max(1,Math.floor(o?.pixel??60)),s=this.normalizePixelRange(a.pixelRange,o),i=a.unit==="hours"||a.unit==="minutes"||a.unit==="seconds"?a.unit:"minutes",c=typeof a.timerMs==="number"&&a.timerMs>0?a.timerMs:i==="hours"?a.value*3600000:i==="minutes"?a.value*60000:a.value*1000;this.autoFarmConfig={value:Math.max(1,Math.floor(a.value)),pixels:r,usePixelRange:a.usePixelRange??o?.usePixelRange??!1,pixelRange:s,unit:i,timerMs:c}}catch{return}}loadAutoOverlayConfigFromStorage(){let o=this.getRemotePixelSettings("autoDraw"),l=localStorage.getItem(_o);if(!l&&o){this.autoOverlayConfig=this.createDefaultAutoConfig(o);return}if(!l)return;try{let a=JSON.parse(l);if(typeof a.value!=="number"||!Number.isFinite(a.value)||a.value<1)return;let r=typeof a.pixels==="number"&&Number.isFinite(a.pixels)&&a.pixels>=1?Math.floor(a.pixels):Math.max(1,Math.floor(o?.pixel??60)),s=this.normalizePixelRange(a.pixelRange,o),i=a.unit==="hours"||a.unit==="minutes"||a.unit==="seconds"?a.unit:"minutes",c=typeof a.timerMs==="number"&&a.timerMs>0?a.timerMs:i==="hours"?a.value*3600000:i==="minutes"?a.value*60000:a.value*1000;this.autoOverlayConfig={value:Math.max(1,Math.floor(a.value)),pixels:r,usePixelRange:a.usePixelRange??o?.usePixelRange??!1,pixelRange:s,unit:i,timerMs:c}}catch{return}}createDefaultAutoConfig(o){return{value:1,unit:"minutes",pixels:Math.max(1,Math.floor(o.pixel??60)),usePixelRange:o.usePixelRange??!1,pixelRange:this.normalizePixelRange(o.pixelRange,o),timerMs:60000}}normalizePixelRange(o,l){let a=o&&typeof o==="object"?o:l?.pixelRange,r=typeof a?.min==="number"&&Number.isFinite(a.min)?Math.max(1,Math.floor(a.min)):1,s=typeof a?.max==="number"&&Number.isFinite(a.max)?Math.max(r,Math.floor(a.max)):Math.max(r,5);return{min:r,max:s}}openAutoFarmModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let l=this.autoFarmConfig?.unit??"minutes",a=this.autoFarmConfig?.value??1,r=this.autoFarmConfig?.pixels??60,s=this.autoFarmConfig?.usePixelRange??!1,i=this.autoFarmConfig?.pixelRange??{min:1,max:5};o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoFarmModalTitle">Auto farm</strong>
    <button type="button" class="modal-close" aria-label="${t("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoFarmHelp">Paint a random pixel each timer cycle.</p>
  <label class="autofarm-label">
    <span data-i18n="autoFarmTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${a}" />
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
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${r}" />
    </div>
  </label>
  <label class="kgm-switch-row autofarm-range-toggle-row">
    <span data-i18n="autoFarmUsePixelRange">Use pixel range in Auto Farm</span>
    <span class="kgm-switch">
      <input class="autofarm-use-range" type="checkbox" ${s?"checked":""} />
      <span class="kgm-switch-slider" aria-hidden="true"></span>
    </span>
  </label>
  <label class="autofarm-label autofarm-range-row">
    <span data-i18n="pixelRange">Pixel range</span>
    <div class="autofarm-fields">
      <input class="autofarm-range-min" type="number" min="1" step="1" value="${i.min}" data-i18n-title="pixelRangeMin" />
      <input class="autofarm-range-max" type="number" min="1" step="1" value="${i.max}" data-i18n-title="pixelRangeMax" />
    </div>
  </label>
  <small class="access-error pixel-range-error" role="alert" aria-live="assertive"></small>
  <div class="autofarm-actions">
    <button type="button" class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start</span></button>
    <button type="button" class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),Q(o);let c=o.querySelector(".autofarm-unit");c.value=l;let g=o.querySelector(".autofarm-value"),p=o.querySelector(".autofarm-pixels"),d=o.querySelector(".autofarm-use-range"),f=o.querySelector(".autofarm-range-row"),w=o.querySelector(".autofarm-range-min"),n=o.querySelector(".autofarm-range-max"),b=o.querySelector(".pixel-range-error"),e=()=>{f.hidden=!d.checked,p.disabled=d.checked};d.addEventListener("change",e),e();let h=()=>{let m=Math.max(1,Number.parseInt(g.value||"1",10));if(c.value==="hours")return m*3600000;if(c.value==="minutes")return m*60000;return m*1000},u=()=>{let m=Math.max(1,Number.parseInt(w.value||"1",10)),z=Math.max(1,Number.parseInt(n.value||"1",10));if(m>z)return b.textContent=t("pixelRangeInvalid"),null;return b.textContent="",{min:m,max:z}};o.querySelector(".autofarm-start").onclick=()=>{let m=u();if(!m)return;this.saveAutoFarmConfig({value:Math.max(1,Number.parseInt(g.value||"1",10)),pixels:Math.max(1,Number.parseInt(p.value||"60",10)),usePixelRange:d.checked,pixelRange:m,unit:c.value,timerMs:h()}),this.startAutoFarm(),o.close(),o.remove()},o.querySelector(".autofarm-stop").onclick=()=>{this.stopAutoFarm(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}openAutoOverlayModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let l=this.autoOverlayConfig?.unit??"minutes",a=this.autoOverlayConfig?.value??1,r=this.autoOverlayConfig?.pixels??60,s=this.autoOverlayConfig?.usePixelRange??!1,i=this.autoOverlayConfig?.pixelRange??{min:1,max:5};o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoOverlayModalTitle">Auto overlay timer</strong>
    <button type="button" class="modal-close" aria-label="${t("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoOverlayHelp">Paint overlay image pixels, click Paint, then repeat by timer.</p>
  <label class="autofarm-label">
    <span data-i18n="autoOverlayTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${a}" />
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
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${r}" />
    </div>
  </label>
  <label class="kgm-switch-row autofarm-range-toggle-row">
    <span data-i18n="autoDrawUsePixelRange">Use pixel range in Auto Draw</span>
    <span class="kgm-switch">
      <input class="autofarm-use-range" type="checkbox" ${s?"checked":""} />
      <span class="kgm-switch-slider" aria-hidden="true"></span>
    </span>
  </label>
  <label class="autofarm-label autofarm-range-row">
    <span data-i18n="pixelRange">Pixel range</span>
    <div class="autofarm-fields">
      <input class="autofarm-range-min" type="number" min="1" step="1" value="${i.min}" data-i18n-title="pixelRangeMin" />
      <input class="autofarm-range-max" type="number" min="1" step="1" value="${i.max}" data-i18n-title="pixelRangeMax" />
    </div>
  </label>
  <small class="access-error pixel-range-error" role="alert" aria-live="assertive"></small>
  <div class="autofarm-actions">
    <button type="button" class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start</span></button>
    <button type="button" class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),Q(o);let c=o.querySelector(".autofarm-unit");c.value=l;let g=o.querySelector(".autofarm-value"),p=o.querySelector(".autofarm-pixels"),d=o.querySelector(".autofarm-use-range"),f=o.querySelector(".autofarm-range-row"),w=o.querySelector(".autofarm-range-min"),n=o.querySelector(".autofarm-range-max"),b=o.querySelector(".pixel-range-error"),e=()=>{f.hidden=!d.checked,p.disabled=d.checked};d.addEventListener("change",e),e();let h=()=>{let m=Math.max(1,Number.parseInt(g.value||"1",10));if(c.value==="hours")return m*3600000;if(c.value==="minutes")return m*60000;return m*1000},u=()=>{let m=Math.max(1,Number.parseInt(w.value||"1",10)),z=Math.max(1,Number.parseInt(n.value||"1",10));if(m>z)return b.textContent=t("pixelRangeInvalid"),null;return b.textContent="",{min:m,max:z}};o.querySelector(".autooverlay-start").onclick=()=>{let m=u();if(!m)return;this.saveAutoOverlayConfig({value:Math.max(1,Number.parseInt(g.value||"1",10)),pixels:Math.max(1,Number.parseInt(p.value||"60",10)),usePixelRange:d.checked,pixelRange:m,unit:c.value,timerMs:h()}),this.startAutoOverlay(),o.close(),o.remove()},o.querySelector(".autooverlay-stop").onclick=()=>{this.stopAutoOverlay(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}getCurrentWplaceLocation(){let o=(w)=>{let n=new URLSearchParams(w.replace(/^#/,"").replace(/^\?/,"")),b=Number.parseFloat(n.get("lat")??""),e=Number.parseFloat(n.get("lng")??""),h=Number.parseFloat(n.get("zoom")??"");if(Number.isFinite(b)&&Number.isFinite(e)&&Number.isFinite(h))return{lat:b,lng:e,zoom:h}},l=globalThis.location.hash,a=l.includes("?")?l.slice(l.indexOf("?")+1):"",r=[globalThis.location.search,l,a].filter(Boolean);for(let w of r){let n=o(w);if(n)return n}let s=/#?\/?(?<zoom>-?\d+(?:\.\d+)?)\/(?<lat>-?\d+(?:\.\d+)?)\/(?<lng>-?\d+(?:\.\d+)?)/.exec(l);if(!s?.groups)return;let{lat:i,lng:c,zoom:g}=s.groups;if(!i||!c||!g)return;let p=Number.parseFloat(i),d=Number.parseFloat(c),f=Number.parseFloat(g);if(!Number.isFinite(p)||!Number.isFinite(d)||!Number.isFinite(f))return;return{lat:p,lng:d,zoom:f}}buildExternalToolUrl(o){let l=this.getCurrentWplaceLocation();if(o==="colorConverter")return Ba;if(o==="receiveSmss")return Za;if(o==="esimplus")return Ga;if(o==="receiveSmsFree")return La;if(o==="quackr")return Ca;if(o==="textverified")return Ta;if(!l){if(o==="samuelArchive")return yo;let r=new URL(oa);return r.searchParams.set("lat","0.000000"),r.searchParams.set("lng","0.000000"),r.searchParams.set("zoom","2.00"),r.searchParams.set("version",aa),r.toString()}if(o==="samuelArchive"){let r=new URL(yo);return r.hash=`${l.zoom.toFixed(2)}/${l.lat.toFixed(6)}/${l.lng.toFixed(6)}`,r.toString()}let a=new URL(oa);return a.searchParams.set("lat",l.lat.toFixed(6)),a.searchParams.set("lng",l.lng.toFixed(6)),a.searchParams.set("zoom",l.zoom.toFixed(2)),a.searchParams.set("version",aa),a.toString()}openExternalTool(o){let l=this.buildExternalToolUrl(o);this.trackAction("external_tool_opened",{source:"widget",tool:o,targetUrl:l,wplaceLocation:this.getCurrentWplaceLocation()??null}),this.openUrlInNewTab(l)}openUrlInNewTab(o){let l=globalThis.open(o,"_blank","noopener");if(l){l.opener=null;return}let a=document.createElement("a");a.href=o,a.target="_blank",a.rel="noopener noreferrer",a.style.display="none",document.body.append(a),a.click(),a.remove()}setDisabled(o,l){this.element.querySelector("."+o).disabled=l}async run(o,l,a,r="..."){console.log("[KGM][Widget] Task started",{status:o});let s=this.status;this.status=`${r} ${o}`;try{let i=await l();return this.status=s,console.log("[KGM][Widget] Task completed",{status:o}),i}catch(i){if(!(i instanceof bo))console.error(i),this.status=`${t("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:i}),i}finally{await a?.()}}handleKeyboard(o){if(Ro(o.target))return;if(k(o,A.toggleWidget)){o.preventDefault(),this.open=!this.open,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"toggleWidget",open:this.open});return}if(k(o,A.minimizeWidget)){o.preventDefault(),this.open=!1,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"minimizeWidget"});return}if(k(o,A.showWidgetPanel)){o.preventDefault(),this.open=!0,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"showWidgetPanel"});return}if(k(o,A.hideWidgetPanel)){o.preventDefault(),this.open=!1,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"hideWidgetPanel"});return}if(k(o,A.showShortcuts)){o.preventDefault(),this.open=!0,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"showShortcuts"}),this.openSettingsModal();return}if(k(o,A.toggleOverlay)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"toggleOverlay"}),this.toggleOverlay();return}if(k(o,A.focusNextImage)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"focusNextImage"}),this.focusImageByStep(1);return}if(k(o,A.focusPreviousImage)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"focusPreviousImage"}),this.focusImageByStep(-1);return}if(k(o,A.openColorPanel)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openColorPanel"}),this.openColorPanelForActiveImage();return}if(k(o,A.toggleImageLock)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"toggleImageLock"}),this.toggleLockForActiveImage();return}if(k(o,A.clickPaintWhenReady)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"clickPaintWhenReady"}),this.drawAndClickPaintWhenReady();return}if(k(o,A.startAutoFarm)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"startAutoFarm"}),this.startAutoFarm();return}if(k(o,A.stopAutoFarm)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"stopAutoFarm"}),this.stopAutoFarm();return}if(k(o,A.openColorConverterTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openColorConverterTool"}),this.openExternalTool("colorConverter");return}if(k(o,A.openSamuelArchiveTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openSamuelArchiveTool"}),this.openExternalTool("samuelArchive");return}if(k(o,A.openEralyonArchiveTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openEralyonArchiveTool"}),this.openExternalTool("eralyonArchive");return}if(k(o,A.openReceiveSmssTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openReceiveSmssTool"}),this.openExternalTool("receiveSmss");return}if(k(o,A.openEsimplusTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openEsimplusTool"}),this.openExternalTool("esimplus");return}if(k(o,A.openReceiveSmsFreeTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openReceiveSmsFreeTool"}),this.openExternalTool("receiveSmsFree");return}if(k(o,A.openQuackrTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openQuackrTool"}),this.openExternalTool("quackr");return}if(k(o,A.openTextverifiedTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openTextverifiedTool"}),this.openExternalTool("textverified");return}if(k(o,A.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"addImage"}),this.addImage();return}if(k(o,A.draw)&&!this.$draw.disabled)o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"draw"}),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.trackAction("active_image_focused",{source:"widget",step:o,image:this.imageTelemetry(this.activeImageIndex)}),this.bot.images[this.activeImageIndex].position.scrollScreenTo()}async recommendUpdateIfOutdated(){let o=new AbortController,l=window.setTimeout(()=>{o.abort()},1800);try{let a=await fetch("https://raw.githubusercontent.com/robgallardof/kglacer-macro/main/src/version.ts",{signal:o.signal});if(!a.ok)return;let r=await a.text(),i=/APP_VERSION = '([^']+)'/.exec(r)?.[1];if(!i)return;if(this.compareSemver(i,S)<=0)return;let c=`kglacer-macro:update-notice:${i}`;if(localStorage.getItem(c)==="dismissed")return;if(confirm(`Hay una versión nueva (${i}) disponible. Tu versión actual es ${S}. ¿Quieres actualizar ahora?`))this.openUrlInNewTab("https://github.com/robgallardof/kglacer-macro/raw/refs/heads/main/dist.user.js");else localStorage.setItem(c,"dismissed")}catch{}finally{clearTimeout(l)}}compareSemver(o,l){let a=o.split(".").map((s)=>Number(s)||0),r=l.split(".").map((s)=>Number(s)||0);for(let s=0;s<3;s++){if((a[s]??0)>(r[s]??0))return 1;if((a[s]??0)<(r[s]??0))return-1}return 0}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;this.trackAction("active_image_colors_opened",{source:"widget",image:this.imageTelemetry(this.activeImageIndex)}),o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,this.trackAction("active_image_lock_changed",{source:"widget",locked:o.lock,image:this.imageTelemetry(this.activeImageIndex)}),o.update(),F(this.bot)}async waitAndClickPaintButton(){this.trackAction("paint_button_wait_started",{source:"widget"}),await this.run(t("taskWaitingPaintButton"),async()=>{for(;;){if(this.isChallengeBlockingPaint()){this.trackAction("paint_blocked_by_challenge",{source:"widget"}),await this.waitForChallengeToResolve(),await new Promise((l)=>setTimeout(l,250));continue}let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){await this.triggerNativePaintClickWithChallengeRecovery(o),this.trackAction("paint_button_flow_completed",{source:"widget"});return}await new Promise((l)=>setTimeout(l,500))}})}async drawAndClickPaintWhenReady(){if(this.trackAction("draw_and_paint_started",{source:"widget",drawButtonEnabled:!this.$draw.disabled}),!this.$draw.disabled)await this.bot.draw();await this.waitAndClickPaintButton(),this.trackAction("draw_and_paint_completed",{source:"widget"})}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((a)=>Array.from(document.querySelectorAll(a))).find((a)=>/pintar|paint/i.test(a.textContent))}triggerNativePaintClick(o){o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),o.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),o.click()}async triggerNativePaintClickWithChallengeRecovery(o){for(let a=0;a<3;a++){let r=a===0?o:this.findNativePaintButton();if(!r)return;if(r.disabled||r.ariaDisabled==="true")return;this.trackAction("native_paint_clicked",{source:"widget",attempt:a+1,maxAttempts:3,buttonText:r.textContent.trim()}),this.triggerNativePaintClick(r);let s=await this.waitForPaintAttemptOutcome(6000);if(this.trackAction("native_paint_attempt_result",{source:"widget",attempt:a+1,maxAttempts:3,outcome:s}),s==="painted")return;if(s==="challenge"){await this.waitForChallengeToResolve(),await new Promise((i)=>setTimeout(i,350));continue}await new Promise((i)=>setTimeout(i,350))}console.log("[KGM][Widget] Paint click finished without a clear success signal after retries")}async waitForPaintAttemptOutcome(o){let l=Date.now();while(Date.now()-l<=o){if(this.isChallengeBlockingPaint())return"challenge";let a=this.findNativePaintButton();if(a&&(a.disabled||a.ariaDisabled==="true"))return await this.waitForDelayedChallenge(1200)?"challenge":"painted";await new Promise((r)=>setTimeout(r,200))}return"unknown"}async waitForDelayedChallenge(o){let l=Date.now();while(Date.now()-l<=o){if(this.isChallengeBlockingPaint())return!0;await new Promise((a)=>setTimeout(a,150))}return!1}async waitForChallengeToResolve(){await this.run(t("taskWaitingChallengeResolve"),async()=>{let o=Date.now(),l=90000;while(this.isChallengeBlockingPaint()&&Date.now()-o<=90000)await new Promise((a)=>setTimeout(a,500))})}isChallengeBlockingPaint(){let a=Array.from(document.querySelectorAll('h-captcha, .h-captcha, iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], [data-hcaptcha-widget-id]')).filter((i)=>{if(i.closest("dialog")?.matches("dialog:not([open])"))return!1;let c=globalThis.getComputedStyle(i);if(c.display==="none"||c.visibility==="hidden")return!1;let g=i.getBoundingClientRect();return g.width>0&&g.height>0});if(!a.length)return!1;let r=document.querySelector("dialog.modal[open], dialog[open]");if(r?.querySelector('h-captcha, .h-captcha, iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], [data-hcaptcha-widget-id]')){if(!r)return!1;if(!Array.from(r.querySelectorAll('textarea[name="h-captcha-response"], textarea[name^="h-captcha-response-"]')).some((c)=>c.value.trim().length>0))return!0}return a.some((i)=>{let c=i.closest("h-captcha")??i.parentElement??document.documentElement,g=Array.from(c.querySelectorAll('textarea[name="h-captcha-response"], textarea[name^="h-captcha-response-"]'));if(!g.length)return!0;return g.every((p)=>p.value.trim().length===0)})}}var qa=2;function xa(){let o=globalThis;if(typeof o.fp_assemble_injection!=="function")o.fp_assemble_injection=()=>({});if(!o.__kgmUnhandledRejectionPatched)o.__kgmUnhandledRejectionPatched=!0,o.addEventListener("unhandledrejection",(l)=>{let a=l.reason,r=typeof a==="object"&&a!==null&&"name"in a&&typeof a.name==="string"?a.name:"",s=a instanceof Error?a.message:a;if(r==="NotAllowedError"&&s.includes("play() failed"))l.preventDefault()});if(!o.__kgmMediaPlayPatched&&"HTMLMediaElement"in o){o.__kgmMediaPlayPatched=!0;let l=Reflect.get(o.HTMLMediaElement.prototype,"play");o.HTMLMediaElement.prototype.play=function(){return Reflect.apply(l,this,[]).catch((s)=>{let i=s instanceof Error?s.message:s;if((typeof s==="object"&&s!==null&&"name"in s&&typeof s.name==="string"?s.name:"")==="NotAllowedError"&&i.includes("play() failed"))return;throw s})}}}var la="[KGM]",ra="kgm-access-locked",sa=1500,Va=45000,Xa=120000;class ia{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;accountCookieTokenCache;accountCookieTokenSource="none";accountCookieTokenWarmup;accountCookieWatchIntervalId;accountCookieWatchRunning=!1;accountCookieWatchAttempts=0;lastAccountCookieWatchEventAt=0;lastSyncedAccountCookieToken;lastSyncedAccountCookieTokenAt=0;loggedUserscriptCookieApiAvailability=!1;controlSession=go();controlAccessAllowed=!1;log(o,l){if(l===void 0)console.log(`${la} ${o}`);else console.log(`${la} ${o}`,l)}constructor(){this.log("Boot sequence started"),document.body.classList.add(ra);let o=qo();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let r=0;r<o.images.length;r++){let s=o.images[r];ao({x:s.position[0]-1000,y:s.position[1]-1000}),ao({x:s.position[0]+1000,y:s.position[1]+1000})}this.strategy=o.strategy}let l=JSON.parse(localStorage.getItem("kglacer-macro:proxy-config")??"{}");Vo(l),this.registerFetchInterceptor(),this.log("Fetch interceptor registered"),this.primeAccountCookieToken(),this.startAccountCookieWatcher();let a=document.createElement("style");a.textContent=Xo.replace("FAKE_FAVORITE_LOCATIONS",E.length.toString()),document.head.append(a),this.log("Styles injected",{fakeFavoriteLocations:E.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureControlAccess(),document.body.classList.remove(ra),this._widget=new Do(this),await this.widget.run(t("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let r=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((s)=>{for(let i=0;i<s.length;i++)if(s[i].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(r,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await U(500),await this.updateColors(),o)for(let s=0;s<o.images.length;s++){let i=await W.fromJSON(this,o.images[s]);this.images.push(i),i.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled"),this.trackAction("bot_loaded",{source:"startup",restoredImages:this.images.length,totalTasks:this.getTotalPendingTasks()})})})()}async ensureControlAccess(){let o=go();if(o?.accessToken){this.controlSession=o,this.controlAccessAllowed=to(o),this.refreshControlAccess("startup").catch((l)=>{this.rememberControlAccessFailure(l,"startup")});return}await new Promise((l)=>{let a=document.createElement("dialog");a.className="kgm-modal access-dialog",a.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(a),Q(a);let r=a.querySelector(".access-serial"),s=a.querySelector(".access-submit"),i=a.querySelector(".access-error"),c=a.querySelector(".access-locale");c.innerHTML=Zo().map((g)=>`<option value="${g}" ${g===y()?"selected":""}>${g.toUpperCase()}</option>`).join(""),c.addEventListener("change",()=>{no(c.value),Q(a)}),a.addEventListener("cancel",(g)=>{g.preventDefault()}),a.querySelector("form").addEventListener("submit",(g)=>{g.preventDefault(),i.textContent="",s.disabled=!0,s.textContent=t("loginChecking"),(async()=>{try{let[p,d]=await Promise.all([this.withTimeout(this.fetchAccountInfo(!0).catch(()=>null),900,null),this.resolveAccountCookieForControl()]);this.controlSession=await Ko({serialKey:r.value.trim(),wplaceMe:p,wplaceCookieJToken:d.token,wplaceCookieStatus:d.status}),this.controlAccessAllowed=!0,this.trackAction("serial_login_success",{source:"serial_modal",hasWplaceAccount:Boolean(p)}),this.runAccountCookieWatcherTick("after_login"),this.syncAccountInfoWithControl("login_background"),a.close(),a.remove(),l()}catch(p){let d=p instanceof Error?p.message:t("loginErrorUnknown");i.textContent=this.mapControlLoginError(d),s.disabled=!1,s.textContent=t("loginSubmit")}})()}),a.showModal(),r.focus()})}mapControlLoginError(o){if(/invalid_serial|invalid_token|blocked_token|expired_license|inactive_license/i.test(o))return t("invalidAccessKey");if(/device_limit/i.test(o))return t("accessDeviceLimit");return t("loginErrorUnknown")}rememberControlAccessFailure(o,l){let a=o instanceof Error?o.message:"unknown";if(!(o instanceof _)){this.log("Control API transient failure; keeping cached serial session",{source:l,reason:a});return}let r=go();if(r?.accessToken)this.controlSession=r;this.controlAccessAllowed=!1,this.log("Control API denied access; cached serial session kept",{source:l,reason:a,status:o.status})}getControlSession(){return this.controlSession}isControlAccessAllowed(){return this.controlAccessAllowed&&to(this.controlSession)}async refreshControlAccess(o="manual"){if(!this.controlSession)throw Error(t("accessLoginRequired"));let l=o==="startup",[a,r]=await Promise.all([this.withTimeout(this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),l?900:1800,null),this.resolveAccountCookieForControl({timeoutMs:l?550:750})]);return this.controlSession=await $({session:this.controlSession,eventType:"check",wplaceMe:a,wplaceCookieJToken:r.token,cookieStatus:r.status,metadata:{reason:o}}),this.controlAccessAllowed=!0,this.runAccountCookieWatcherTick(`access_${o}`),{session:this.controlSession,cookieStatus:r.status}}ensureFeatureAccess(o){if(this.isControlAccessAllowed())return!0;this.log("Feature blocked by Control API access state",{feature:o});try{this.widget.status=`⚠️ ${t("accessDenied")}`}catch{}return!1}getPageWindow(){return globalThis.unsafeWindow??globalThis}async fetchAccountInfo(o=!1){if(!o&&this.me)return this.me;let l=await fetch("https://backend.wplace.live/me",{credentials:"include",cache:"no-store"});if(!l.ok)throw Error(`/me failed (${l.status})`);let a=await l.json();return this.me=a,a}async getAccountCookieStatus(o={}){let l=await this.readAccountCookieToken(o);return{hasToken:Boolean(l),source:this.accountCookieTokenSource,token:l}}async readAccountCookieToken(o={}){let l=this.accountCookieTokenCache;if(!o.force&&this.accountCookieTokenCache)return this.accountCookieTokenCache;let a=this.getCookieFromDocument("j");if(a)return this.accountCookieTokenCache=a,this.accountCookieTokenSource="document",a;let r=await this.readCookieWithCookieStore("j");if(r)return this.accountCookieTokenCache=r,this.accountCookieTokenSource="cookie_store",r;let s=await this.readCookieWithUserscriptApi("j",o);if(s){if(this.accountCookieTokenCache=s,!this.accountCookieTokenSource.startsWith("gm_cookie"))this.accountCookieTokenSource="gm_cookie";return s}if(l)return l;return this.accountCookieTokenSource="none",null}primeAccountCookieToken(){return this.accountCookieTokenWarmup??=this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:2000}).finally(()=>{this.accountCookieTokenWarmup=void 0}),this.accountCookieTokenWarmup}startAccountCookieWatcher(){if(this.accountCookieWatchIntervalId!==void 0)return;let o=(l)=>{this.runAccountCookieWatcherTick(l)};o("startup"),this.accountCookieWatchIntervalId=window.setInterval(()=>{o("interval")},sa),window.addEventListener("focus",()=>{o("window_focus")}),document.addEventListener("visibilitychange",()=>{if(!document.hidden)o("tab_visible")})}async runAccountCookieWatcherTick(o){if(this.accountCookieWatchRunning)return;this.accountCookieWatchRunning=!0,this.accountCookieWatchAttempts++;try{let l=await this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:1200}),a={hasToken:Boolean(l),source:l?this.accountCookieTokenSource:"none"},r=Date.now();if(l){if(l!==this.lastSyncedAccountCookieToken||r-this.lastSyncedAccountCookieTokenAt>Xa){if(await this.sendAccountCookieTokenToControl({token:l,status:a,reason:o,eventName:"j_token_detected"}))this.lastSyncedAccountCookieToken=l,this.lastSyncedAccountCookieTokenAt=r}return}if(r-this.lastAccountCookieWatchEventAt<Va)return;if(await this.sendAccountCookieTokenToControl({token:null,status:a,reason:o,eventName:"j_token_unavailable"}))this.lastAccountCookieWatchEventAt=r}finally{this.accountCookieWatchRunning=!1}}async sendAccountCookieTokenToControl(o){let l=this.controlSession;if(!l?.accessToken)return!1;let a=await this.withTimeout(this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),700,null);try{return this.controlSession=await $({session:l,eventType:"action",wplaceMe:a,wplaceCookieJToken:o.token,cookieStatus:o.status,metadata:{app:co,version:S,eventName:o.eventName,action:o.eventName,reason:o.reason,sentAt:new Date().toISOString(),cookieName:"j",cookieDomain:".wplace.live",accountTokenAvailable:Boolean(o.token),jTokenAvailable:Boolean(o.token),watcher:{attempts:this.accountCookieWatchAttempts,intervalMs:sa,source:o.status.source,hasToken:o.status.hasToken},page:{href:location.href,host:location.host}}}),this.controlAccessAllowed=!0,this.log("WPlace j cookie watcher synced with Control API",{hasToken:Boolean(o.token),source:o.status.source,reason:o.reason}),!0}catch(r){return this.rememberControlAccessFailure(r,o.eventName),this.log("WPlace j cookie watcher sync failed",{reason:r instanceof Error?r.message:"unknown"}),!1}}async resolveAccountCookieForControl(o={}){let a=await this.withTimeout(this.accountCookieTokenWarmup??this.primeAccountCookieToken(),o.timeoutMs??750,null)??await this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:o.timeoutMs??2000});return{token:a,status:{hasToken:Boolean(a),source:a?this.accountCookieTokenSource:"none"}}}getCookieFromDocument(o){let l=this.getPageWindow(),a=[document.cookie,l.document.cookie].filter((r)=>typeof r==="string");for(let r of a){let s=this.parseCookieString(r,o);if(s)return s}return null}parseCookieString(o,l){let a=`${l}=`;for(let r of o.split(";")){let s=r.trim();if(!s.startsWith(a))continue;let i=s.slice(a.length);try{return decodeURIComponent(i)}catch{return i}}return null}async readCookieWithCookieStore(o){let l=this.getPageWindow(),a=[Reflect.get(globalThis,"cookieStore"),Reflect.get(l,"cookieStore")];for(let r of a){if(!r||typeof r!=="object")continue;let s=r.get;if(typeof s!=="function")continue;try{let c=await s.call(r,o);if(c?.value)return c.value}catch(c){this.log("cookieStore read failed",c)}let i=r.getAll;if(typeof i!=="function")continue;try{let c=await i.call(r,{name:o}),g=this.findCookieValue(c,o);if(g)return g}catch{try{let c=await i.call(r,o),g=this.findCookieValue(c,o);if(g)return g}catch(c){this.log("cookieStore getAll read failed",c)}}}return null}async readCookieWithUserscriptApi(o,l={}){let a=this.getPageWindow(),r=globalThis,s=a,i=[r.GM?.cookie,s.GM?.cookie,r.GM_cookie,s.GM_cookie].filter((n)=>n!==void 0&&n!==null);if(!this.loggedUserscriptCookieApiAvailability)this.loggedUserscriptCookieApiAvailability=!0,this.log("Reading WPlace j cookie through userscript APIs",{apiCount:i.length,cookieDomain:".wplace.live",cookieName:o});let c=location.protocol==="http:"||location.protocol==="https:"?location.href:"https://wplace.live/",g=[{name:o},{name:o,partitionKey:{}},{url:c,name:o},{url:c,name:o,partitionKey:{}},{url:c,name:o,partitionKey:{topLevelSite:"https://wplace.live"}},{url:c,domain:".wplace.live",name:o,path:"/"},{url:"https://wplace.live/",name:o},{url:"https://wplace.live/",name:o,partitionKey:{}},{url:"https://wplace.live/",name:o,partitionKey:{topLevelSite:"https://wplace.live"}},{url:"https://wplace.live/",domain:".wplace.live",name:o,path:"/"},{url:"https://www.wplace.live/",name:o},{url:"https://www.wplace.live/",domain:".wplace.live",name:o,path:"/"},{url:"http://wplace.live/",name:o},{url:"http://www.wplace.live/",name:o},{url:"https://backend.wplace.live/",name:o},{url:"https://backend.wplace.live/",domain:".wplace.live",name:o,path:"/"},{domain:".wplace.live",name:o,path:"/"},{domain:".wplace.live",name:o},{domain:"wplace.live",name:o,path:"/"},{domain:"wplace.live",name:o},{firstPartyDomain:"wplace.live",domain:".wplace.live",name:o},{firstPartyDomain:"https://wplace.live",topLevelSite:"https://wplace.live",domain:".wplace.live",name:o}],p=[{url:c},{url:c,partitionKey:{}},{url:c,partitionKey:{topLevelSite:"https://wplace.live"}},{url:"https://wplace.live/",name:o,path:"/"},{url:"https://wplace.live/"},{url:"https://wplace.live/",partitionKey:{}},{url:"https://wplace.live/",partitionKey:{topLevelSite:"https://wplace.live"}},{url:"https://www.wplace.live/",name:o,path:"/"},{url:"https://www.wplace.live/"},{url:"http://wplace.live/"},{url:"http://www.wplace.live/"},{url:"https://backend.wplace.live/",name:o,path:"/"},{url:"https://backend.wplace.live/"},{domain:".wplace.live"},{domain:"wplace.live"},{firstPartyDomain:"https://wplace.live",domain:".wplace.live",name:o},{firstPartyDomain:"https://wplace.live",topLevelSite:"https://wplace.live",domain:".wplace.live",name:o},{name:o},{name:o,path:"/"},{name:o,partitionKey:{}},{}],d=l.timeoutMs??2000,f=await this.findCookieWithUserscriptQueries(i,this.dedupeCookieQueries(g),o,d);if(f)return f;if(l.exhaustive===!1)return null;let w=await this.findCookieWithUserscriptQueries(i,this.dedupeCookieQueries(p),o,d);if(w)return w;return null}async findCookieWithUserscriptQueries(o,l,a,r){return new Promise((s)=>{let i=0,c=!1,g=(d)=>{if(c)return;if(!d&&i>0)return;c=!0,s(d)},p=["list","get"];for(let d of o)for(let f of l)for(let w of p)i++,this.callUserscriptCookieApi(d,w,f,r).then((n)=>{if(c)return;let b=w==="list"?this.findCookieValue(n,a):this.extractCookieValue(n,a);if(!b)return;this.accountCookieTokenSource=`gm_cookie:${w}:${this.describeCookieQuery(f)}`,g(b)}).finally(()=>{i--,g(null)});g(null)})}dedupeCookieQueries(o){let l=new Set;return o.filter((a)=>{let r=JSON.stringify(a);if(l.has(r))return!1;return l.add(r),!0})}describeCookieQuery(o){if(o.domain)return o.domain;if(o.url)return o.url;if(o.firstPartyDomain)return o.firstPartyDomain;if(o.topLevelSite)return o.topLevelSite;if(o.name)return o.name;return"all"}async callUserscriptCookieApi(o,l,a,r=500){return new Promise((s)=>{let i=!1,c=(p)=>{if(i)return;i=!0,s(p)},g=(...p)=>{c(this.normalizeUserscriptCookieCallbackArgs(p))};try{if(typeof o==="function"){let p=o(l,a,g);this.resolveCookieApiResult(p,c)}else if(o&&typeof o==="object"){let p=o[l];if(typeof p==="function"){let d=p.call(o,a,g);this.resolveCookieApiResult(d,c)}else c(void 0)}else c(void 0)}catch(p){this.log(`GM.cookie ${l} failed`,p),c(void 0)}window.setTimeout(()=>{c(void 0)},r)})}normalizeUserscriptCookieCallbackArgs(o){if(o.length<=1)return o[0];return o.find((a)=>{if(Array.isArray(a))return!0;if(!a||typeof a!=="object")return!1;let r=a;return Array.isArray(r.cookies)||typeof r.name==="string"||typeof r.value==="string"})??o}resolveCookieApiResult(o,l){if(o&&typeof o.then==="function"){o.then(l,()=>{l(void 0)});return}if(o!==void 0)l(o)}findCookieValue(o,l){let a=this.normalizeCookieList(o);for(let r of a)if(r.name===l&&r.value)return r.value;return null}extractCookieValue(o,l){let a=o;if(a?.name===l&&a.value)return a.value;if(a&&!a.name&&a.value)return a.value;return this.findCookieValue(o,l)}normalizeCookieList(o){if(Array.isArray(o))return o.flatMap((l)=>this.normalizeCookieList(l));if(o&&typeof o==="object"){let l=o;if(Array.isArray(l.cookies))return this.normalizeCookieList(l.cookies);if(l.cookie)return this.normalizeCookieList(l.cookie);if(l.result)return this.normalizeCookieList(l.result);if(l.response)return this.normalizeCookieList(l.response);if(l.name||l.value)return[l]}return[]}async withTimeout(o,l,a){return new Promise((r)=>{let s=!1,i=(c)=>{if(s)return;s=!0,r(c)};o.then(i,()=>{i(a)}),window.setTimeout(()=>{i(a)},l)})}async syncAccountInfoWithControl(o="account_info"){if(!this.controlSession)return{ok:!1,cookieStatus:{hasToken:!1,source:this.accountCookieTokenSource}};let[l,a]=await Promise.all([this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),this.resolveAccountCookieForControl({timeoutMs:750})]);try{return this.controlSession=await $({session:this.controlSession,eventType:"heartbeat",wplaceMe:l,wplaceCookieJToken:a.token,cookieStatus:a.status,metadata:{app:co,version:S,reason:o,sentAt:new Date().toISOString(),cookieName:"j",accountTokenAvailable:Boolean(a.token),jTokenAvailable:Boolean(a.token),page:{href:location.href,host:location.host}}}),this.controlAccessAllowed=!0,{ok:!0,cookieStatus:a.status}}catch(r){return this.rememberControlAccessFailure(r,`sync:${o}`),this.log("Control API sync failed",{reason:r instanceof Error?r.message:"unknown"}),{ok:!1,cookieStatus:a.status}}}trackAction(o,l={}){this.sendControlAction(o,l)}async sendControlAction(o,l={}){let a=this.controlSession;if(!a||!to(a))return;let[r,s]=await Promise.all([this.withTimeout(this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),650,null),this.resolveAccountCookieForControl({force:!0,exhaustive:!0,timeoutMs:650})]);try{this.controlSession=await $({session:a,eventType:"action",wplaceMe:r,wplaceCookieJToken:s.token,cookieStatus:s.status,metadata:this.sanitizeTelemetryValue({app:co,version:S,eventName:o,action:o,sentAt:new Date().toISOString(),cookieName:"j",accountTokenAvailable:Boolean(s.token),jTokenAvailable:Boolean(s.token),...this.buildActionTelemetryContext(),...l})}),this.controlAccessAllowed=!0}catch(i){this.rememberControlAccessFailure(i,`action:${o}`),this.log("Control API action event failed",{action:o,reason:i instanceof Error?i.message:"unknown"})}}buildActionTelemetryContext(){return{page:this.getPageTelemetry(),viewport:{width:window.innerWidth,height:window.innerHeight,devicePixelRatio:window.devicePixelRatio},mapCenter:this.getWorldPositionForTelemetry({x:window.innerWidth/2,y:window.innerHeight/2}),botState:{strategy:this.strategy,images:this.images.length,totalTasks:this.getTotalPendingTasks(),unavailableColors:this.unavailableColors.size,accessAllowed:this.isControlAccessAllowed()},images:this.summarizeImagesForTelemetry()}}getPageTelemetry(){try{let o=new URL(location.href);return{href:o.href,origin:o.origin,host:o.host,pathname:o.pathname,search:o.search,hash:o.hash,query:Object.fromEntries(Array.from(o.searchParams.entries()).slice(0,25))}}catch{return{href:location.href,host:location.host}}}getWorldPositionForTelemetry(o){try{return this.serializeWorldPositionForTelemetry(J.fromScreenPosition(this,o))}catch{return null}}summarizeImageForTelemetry(o,l=this.images.indexOf(o)){let a=o.pixels.pixels,r=a.length,s=a[0]?.length??0,i=null;try{i=o.position.toScreenPosition()}catch{i=null}return{index:l,width:s,height:r,tasks:o.tasks.length,strategy:o.strategy,opacity:o.opacity,lock:o.lock,drawTransparentPixels:o.drawTransparentPixels,drawColorsInOrder:o.drawColorsInOrder,skipUnavailableColors:o.skipUnavailableColors,colors:o.colors.length,disabledColors:o.colors.filter((c)=>c.disabled).length,position:this.serializeWorldPositionForTelemetry(o.position),screenPosition:i}}summarizeImagesForTelemetry(){return this.images.slice(0,20).map((o,l)=>this.summarizeImageForTelemetry(o,l))}serializeWorldPositionForTelemetry(o){return{globalX:o.globalX,globalY:o.globalY,tileX:o.tileX,tileY:o.tileY,x:o.x,y:o.y}}getTotalPendingTasks(){return this.images.reduce((o,l)=>o+l.tasks.length,0)}sanitizeTelemetryValue(o,l=0,a=new WeakSet){if(o===null||o===void 0)return o;if(typeof o==="number"||typeof o==="boolean"||typeof o==="bigint")return typeof o==="bigint"?o.toString():o;if(typeof o==="string"){if(o.startsWith("data:"))return`[data-url:${o.length}]`;if(o.length>2048)return`${o.slice(0,2048)}…[truncated]`;return o}if(l>=5)return"[max-depth]";if(Array.isArray(o))return o.slice(0,50).map((r)=>this.sanitizeTelemetryValue(r,l+1,a));if(typeof o==="object"){if(a.has(o))return"[circular]";a.add(o);let r={};for(let[s,i]of Object.entries(o).slice(0,80)){if(/token|secret|password|authorization/i.test(s)&&typeof i==="string"){r[s]="[redacted]";continue}r[s]=this.sanitizeTelemetryValue(i,l+1,a)}return r}if(typeof o==="symbol")return o.description??"[symbol]";if(typeof o==="function")return`[function:${o.name||"anonymous"}]`;return"[unsupported]"}draw(){if(!this.ensureFeatureAccess("draw"))return Promise.resolve();this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.trackAction("draw_requested",{source:"bot",strategy:this.strategy,images:this.images.length,totalTasks:this.getTotalPendingTasks()}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),l=(a)=>{if(!a.shiftKey)a.stopPropagation()};return this.widget.run(t("taskDrawing"),async()=>{await this.widget.run(t("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",l,!0),o.addEventListener("wheel",l,!0),this.updateTasks();let a=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((g)=>g.json()),r=Math.floor(a.charges.count),s=r;this.log("Charges fetched",{charges:r});let i=0;for(let g=0;g<this.images.length;g++)i+=this.images[g].tasks.length;switch(this.log("Tasks prepared",{tasks:i}),this.trackAction("draw_started",{source:"bot",strategy:this.strategy,charges:r,preparedTasks:i,images:this.images.length}),this.strategy){case"ALL":{while(r>0){let g=!0;for(let p=0;p<this.images.length;p++){let d=this.images[p].tasks.shift();if(!d)continue;this.drawTask(d),r--,await U(1),g=!1}if(g)break}break}case"PERCENTAGE":{for(let g=0;g<i&&r>0;g++){let p=1,d;for(let f=0;f<this.images.length;f++){let w=this.images[f],n=1-w.tasks.length/(w.pixels.pixels.length*w.pixels.pixels[0].length);if(n<p)p=n,d=w}this.drawTask(d.tasks.shift()),r--,await U(1)}break}case"SEQUENTIAL":for(let g=0;g<this.images.length;g++){let p=this.images[g];for(let d=p.tasks.shift();d&&r>0;d=p.tasks.shift())this.drawTask(d),r--,await U(1)}}this.widget.update(),await this.readMap(),this.updateTasks();let c=this.getTotalPendingTasks();this.log("Draw flow finished",{remainingCharges:r,remainingTasks:c}),this.trackAction("draw_completed",{source:"bot",strategy:this.strategy,startCharges:s,remainingCharges:r,usedCharges:Math.max(0,s-r),preparedTasks:i,remainingTasks:c,images:this.images.length})},()=>{globalThis.removeEventListener("mousemove",l,!0),o.removeEventListener("wheel",l,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}toJSON(){return{version:qa,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let l=document.querySelector(".maplibregl-canvas"),a=window.innerWidth/2,r=window.innerHeight/2,s=a-o.x,i=r-o.y;function c(g,p,d){l.dispatchEvent(new MouseEvent(g,{bubbles:!0,cancelable:!0,clientX:p,clientY:d,buttons:1}))}c("mousedown",a,r),c("mousemove",s,i),c("mouseup",s,i)}readMap(){this.mapsCache.clear();let o=new Set;for(let a=0;a<this.images.length;a++){let r=this.images[a],{tileX:s,tileY:i}=new J(this,r.position.globalX+r.pixels.pixels[0].length,r.position.globalY+r.pixels.pixels.length);for(let c=r.position.tileX;c<=s;c++)for(let g=r.position.tileY;g<=i;g++)o.add(`${c}/${g}`)}let l=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${t("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(a)=>{this.mapsCache.set(a,await L.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${a}.png`,exactColor:!0})),this.widget.status=`⌛ ${t("taskReadingMap")} [${++l}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let l=0,a=1,r=1/0,s=1/0;for(let g=0;g<this.$stars.length;g++){let{x:p,y:d}=x(this.$stars[g]);if(p<o.x&&d<o.y){let f=o.x-p+(o.y-d);if(f<r)r=f,l=g}else if(p>o.x&&d>o.y){let f=p-o.x+(d-o.y);if(f<s)s=f,a=g}}let i=x(this.$stars[l]),c=C[l];return{anchorScreenPosition:i,anchorWorldPosition:c,pixelSize:(x(this.$stars[a]).x-i.x)/(C[a].x-c.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await U(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await U(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await U(1)}drawTask(o){if(this.lastColor!==o.color){let r=document.getElementById("color-"+o.color);if(!r){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}r.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let l=o.position.pixelSize/2,a=o.position.toScreenPosition();if(!Number.isFinite(a.x)||!Number.isFinite(a.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:a.x+l,clientY:a.y+l,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),o.position.setMapColor(o.color)}async paintRandomPixelInViewport(){if(!this.ensureFeatureAccess("autoFarm"))return;this.trackAction("auto_farm_random_pixel_requested",{source:"bot"});try{await this.updateColors();let o=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((n)=>!n.disabled&&n.getAttribute("aria-disabled")!=="true"&&n.offsetParent!==null);if(!o.length)return;let l=o[Math.floor(Math.random()*o.length)],a=Number.parseInt(l.id.slice(6),10);if(!Number.isFinite(a))return;let r=document.querySelector(".maplibregl-canvas");if(!r)return;let s=r.getBoundingClientRect(),i=24,c=s.left+i,g=s.right-i,p=s.top+i,d=s.bottom-i;if(g<=c||d<=p)return;let f=c+Math.random()*(g-c),w=p+Math.random()*(d-p);this.drawTask({color:a,position:J.fromScreenPosition(this,{x:f,y:w})}),this.trackAction("auto_farm_random_pixel_drawn",{source:"bot",color:a,screenPosition:{x:f,y:w}})}catch(o){this.log("Auto farm tick failed",o),this.trackAction("auto_farm_random_pixel_failed",{source:"bot",reason:o instanceof Error?o.message:"unknown"})}}async drawRandomPixelsBatch(o,l){if(!this.ensureFeatureAccess("autoFarm"))return 0;let a=Math.max(1,Math.floor(o)),r=0;return this.trackAction("auto_farm_draw_batch_requested",{source:"bot",requestedLimit:o,normalizedLimit:a,preferredColor:l??null}),await this.widget.run(t("taskDrawingRandomPixels"),async()=>{await this.widget.run(t("taskInitializingDraw"),()=>this.updateColors());let s=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((b)=>!b.disabled&&b.getAttribute("aria-disabled")!=="true"&&b.offsetParent!==null),i=document.querySelector(".maplibregl-canvas");if(!s.length||!i)return;let c=l===void 0?void 0:s.find((b)=>Number.parseInt(b.id.slice(6),10)===l);if(l!==void 0&&!c)return;let g=i.getBoundingClientRect(),p=24,d=g.left+p,f=g.right-p,w=g.top+p,n=g.bottom-p;if(f<=d||n<=w)return;for(let b=0;b<a;b++){let e=c??s[Math.floor(Math.random()*s.length)],h=Number.parseInt(e.id.slice(6),10);if(!Number.isFinite(h))continue;let u=d+Math.random()*(f-d),m=w+Math.random()*(n-w);this.drawTask({color:h,position:J.fromScreenPosition(this,{x:u,y:m})}),r++,await U(1)}}),this.trackAction("auto_farm_draw_batch_completed",{source:"bot",requestedLimit:o,normalizedLimit:a,preferredColor:l??null,drawn:r}),r}async drawOverlayPixelsBatch(o){if(!this.ensureFeatureAccess("autoDraw"))return 0;let l=Math.max(1,Math.floor(o)),a=0;return this.trackAction("auto_draw_overlay_batch_requested",{source:"bot",requestedLimit:o,normalizedLimit:l,strategy:this.strategy,totalTasks:this.getTotalPendingTasks()}),await this.widget.run(t("taskDrawingOverlayPixels"),async()=>{await this.widget.run(t("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),this.updateTasks();for(let r=0;r<l;r++){let s=this.takeNextTaskFromStrategy();if(!s)break;this.drawTask(s),a++,await U(1)}this.widget.update()}),this.trackAction("auto_draw_overlay_batch_completed",{source:"bot",requestedLimit:o,normalizedLimit:l,drawn:a,strategy:this.strategy,totalTasks:this.getTotalPendingTasks()}),a}takeNextTaskFromStrategy(){switch(this.strategy){case"ALL":case"SEQUENTIAL":{for(let o=0;o<this.images.length;o++){let l=this.images[o].tasks.shift();if(l)return l}return}case"PERCENTAGE":{let o,l=Number.POSITIVE_INFINITY;for(let a=0;a<this.images.length;a++){let r=this.images[a];if(!r.tasks.length)continue;let s=r.pixels.pixels.length*r.pixels.pixels[0].length,i=1-r.tasks.length/s;if(i<l)l=i,o=r}return o?.tasks.shift()}}}registerFetchInterceptor(){let o=this.getPageWindow(),l=o.fetch.bind(o),a=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/,r=async(s,i)=>{let c=await l(s,i),g=c.clone(),p=this.resolveFetchUrl(s);if(c.url==="https://backend.wplace.live/me")this.me=await g.json(),this.me.favoriteLocations.unshift(...E),this.me.maxFavoriteLocations=1/0,c.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length}),this.syncAccountInfoWithControl("wplace_me").catch((f)=>{this.log("Control API /me sync failed",f)}),this.trackAction("wplace_me_observed",{source:"fetch_interceptor",accountId:this.me.id,accountName:this.me.name,accountCountry:this.me.country});let d=a.exec(p);if(d){let f=new J(this,+d[1],+d[2],+d[3],+d[4]);for(let w=0;w<this.markerPixelPositionResolvers.length;w++)this.markerPixelPositionResolvers[w](f);this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event"),this.trackAction("wplace_pixel_request",{source:"fetch_interceptor",requestUrl:p,method:this.resolveFetchMethod(s,i),body:this.summarizeFetchBody(i),position:this.serializeWorldPositionForTelemetry(f)})}return c};o.fetch=r,globalThis.fetch=r}resolveFetchUrl(o){if(typeof o==="string")return o;if(o instanceof URL)return o.href;if(o&&typeof o==="object"&&"url"in o){let l=o.url;if(typeof l==="string")return l}return""}resolveFetchMethod(o,l){if(typeof l?.method==="string")return l.method;if(o&&typeof o==="object"&&"method"in o){let a=o.method;if(typeof a==="string")return a}return"GET"}summarizeFetchBody(o){let l=o?.body;if(!l)return null;if(typeof l==="string"){if(l.length>2048)return`${l.slice(0,2048)}…[truncated]`;return l}if(l instanceof URLSearchParams)return Object.fromEntries(Array.from(l.entries()).slice(0,50));if(l instanceof FormData){let a={};for(let[r,s]of Array.from(l.entries()).slice(0,50)){if(typeof s==="string"){a[r]=s;continue}let i=s;a[r]={name:i.name,size:i.size,type:i.type}}return a}if(l instanceof Blob)return{type:l.type,size:l.size};if(l instanceof ArrayBuffer)return{type:"ArrayBuffer",byteLength:l.byteLength};if(ArrayBuffer.isView(l))return{type:l.constructor.name,byteLength:l.byteLength};return{type:typeof l}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await U(1)}waitForElement(o,l){return this.log("Waiting for element",{name:o,selector:l}),this.widget.run(`${t("taskWaitingFor")} ${o}`,()=>{return new Promise((a)=>{let r=document.querySelector(l);if(r){a(r);return}let s=new MutationObserver(()=>{let i=document.querySelector(l);if(i)s.disconnect(),a(i)});s.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,E.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}xa();if(location.hostname.includes("hcaptcha.com"))jo();else globalThis.kglacerMacro=new ia,globalThis.kgm=globalThis.kglacerMacro,globalThis.wbot=globalThis.kglacerMacro;

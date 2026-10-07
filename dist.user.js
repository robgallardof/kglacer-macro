// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      5.1.19
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
function be(e,t,o){let i=e[o];return e[o]=e[t],e[t]=i,e}function ye(e,t){let o=e.indexOf(t);if(o!==-1)e.splice(o,1);return o}var mo=Math.floor(Math.random()*65536),fo=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function _(e){return new Promise((t)=>setTimeout(t,e))}function D(e,t,o=["error"],i="addEventListener"){return new Promise((a,r)=>{for(let n=0;n<t.length;n++)e[i]?.(t[n],a);for(let n=0;n<o.length;n++)e[i]?.(o[n],r)})}var xt=/^[A-Za-z0-9_-]+$/;function vt(e){if(typeof e!=="string")return!1;let t=e.trim();if(!t.startsWith("eyJ"))return!1;let o=t.split(".");if(o.length!==3||o.some((a)=>!a||!xt.test(a)))return!1;let i=St(o[0]);return Boolean(i?.startsWith("{")&&(i.includes('"alg"')||/"typ"\s*:\s*"JWT"/i.test(i)))}function we(e,t="j"){return se(kt(e),t)}function se(e,t="j"){let o=B(e);for(let i of o){if(i.name!==t)continue;let a=Oe(i.value);if(a)return a}for(let i of o){let a=Le(i.value);if(a)return a}for(let i of o){let a=Le(i.name);if(a)return a}return null}function B(e){if(Array.isArray(e))return e.flatMap((t)=>B(t));if(e&&typeof e==="object"){let t=e;if(Array.isArray(t.cookies))return B(t.cookies);if(t.cookie)return B(t.cookie);if(t.result)return B(t.result);if(t.response)return B(t.response);if(t.name||t.value)return[t]}return[]}function kt(e){return e.split(";").map((t)=>{let o=t.trim();if(!o)return null;let i=o.indexOf("="),a=i===-1?o:o.slice(0,i),r=i===-1?"":o.slice(i+1);return{name:Re(a),value:Re(r)}}).filter((t)=>t!==null)}function Oe(e){if(typeof e!=="string")return null;let t=e.trim();return t?t:null}function Le(e){let t=Oe(e);return t&&vt(t)?t:null}function St(e){try{let t=e.replaceAll("-","+").replaceAll("_","/"),o=t.padEnd(t.length+(4-t.length%4)%4,"=");return atob(o)}catch{return null}}function Re(e){try{return decodeURIComponent(e)}catch{return e}}function xe(e,t){if(t===void 0)console.log(`[KGM][Challenge] ${e}`);else console.log(`[KGM][Challenge] ${e}`,t)}function Y(e){return new Promise((t)=>setTimeout(t,e))}function le(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim()}function At(e){return[...e.matchAll(/-?\d+/g)].map((t)=>Number.parseInt(t[0],10))}function Ct(e){let t=le(e).replace(/,/g,"."),o=/(-?\d+(?:\.\d+)?)\s*([+\-*/x×])\s*(-?\d+(?:\.\d+)?)/.exec(t);if(!o)return;let i=Number.parseFloat(o[1]),a=o[2],r=Number.parseFloat(o[3]);if(!Number.isFinite(i)||!Number.isFinite(r))return;if(a==="+")return String(i+r);if(a==="-")return String(i-r);if(a==="/"&&r!==0)return String(i/r);if((a==="x"||a==="×"||a==="*")&&r!==0)return String(i*r)}function Et(e){let t=le(e),o=At(t);if(/es .* par|is .* even|numero par|número par/.test(t)&&o.length>0)return o[0]%2===0?"sí":"no";if(/es .* impar|is .* odd|numero impar|número impar/.test(t)&&o.length>0)return o[0]%2!==0?"sí":"no";let i=/(-?\d+)\s*(>|<|>=|<=|=|==)\s*(-?\d+)/.exec(t);if(i){let a=Number.parseInt(i[1],10),r=Number.parseInt(i[3],10),n=i[2];return(n===">"?a>r:n==="<"?a<r:n===">="?a>=r:n==="<="?a<=r:a===r)?"sí":"no"}if(/verdadero|true/.test(t))return"sí";if(/falso|false/.test(t))return"no"}function Tt(e,t){let o=`${e} ${t}`.trim(),i=le(o),a=Ct(o);if(a!==void 0)return a;let r=Et(o);if(r)return r;if(/responde (si|sí) o no|answer yes or no/.test(i))return Math.random()<0.5?"sí":"no";return"sí"}async function Mt(e,t){e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0}));for(let o=0;o<t.length;o++)e.value+=t[o],e.dispatchEvent(new Event("input",{bubbles:!0})),await Y(35+Math.floor(Math.random()*55));e.dispatchEvent(new Event("change",{bubbles:!0}))}function ve(e){if(!e)return;e.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0})),e.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0})),e.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0})),e.click()}async function It(){ve(document.querySelector("#menu-info")),await Y(150),ve(document.querySelector("#text_challenge"))}function _t(){let e=document.querySelector('[aria-live="polite"]'),t=document.querySelector("div.error-text"),o=/intentalo de nuevo|try again|incorrect/i.test(le(t?.textContent??""));return Boolean(e&&!o)}async function Pt(){await Y(1000),await It();for(;;){if(_t()){xe("Challenge solved");return}let e=document.querySelector("h2.prompt-text#prompt")?.innerText??"",t=document.querySelector("div.text-text#prompt-text")?.innerText??"",o=document.querySelector('input[type="text"]'),i=document.querySelector(".button-submit");if(!e||!t||!o||!i){await Y(300);continue}let a=Tt(e,t);xe("Answering text challenge",{prompt:e,promptDetails:t,answer:a}),await Mt(o,a),await Y(180),ve(i),await Y(2200)}}function De(){if(!location.hostname.includes("hcaptcha.com"))return;xe("Solver booted"),Pt().catch((e)=>{console.error("[KGM][Challenge] Solver crashed",e)})}var ce="kglacer-macro",P="5.1.19",N="kglacer-macro-settings",Ne=["kglacermacro","wbot"],J="kgm";var He="https://control-api-opal.vercel.app",Lt=`${He}/api/script/login`,Rt=`${He}/api/script/check`,q="kglacer-macro:control-session-v5",Fe="kglacer-macro:control-settings-v5",$e="kglacer-macro:local-device-id";class K extends Error{reason;status;constructor(e,t,o){super(e);this.reason=t;this.status=o;this.name="ControlApiError"}}function de(){let e=Se(sessionStorage,q,null)??Se(localStorage,q,null);if(!e?.accessToken)return null;let t=JSON.stringify(e);return sessionStorage.setItem(q,t),localStorage.setItem(q,t),e}function Ue(e){let t=JSON.stringify(e);if(sessionStorage.setItem(q,t),localStorage.setItem(q,t),e.settings)Z(e.settings)}function ue(){return Se(localStorage,Fe,{})}function Z(e){let t=ue();localStorage.setItem(Fe,JSON.stringify({...t,...e}))}async function Be(e){let t=await pe(),o=await fetch(Lt,{method:"POST",cache:"no-store",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({serialKey:e.serialKey,scriptVersion:P,currentUrl:location.href,storageKey:N,client:t,wplace:{me:e.wplaceMe},metadata:{hasWplaceAccount:Boolean(e.wplaceMe),accountTokenUse:"post_login_account_sync_only"}})}),i=await o.json().catch(()=>({}));if(!o.ok||!i.success||!i.accessToken)throw new K(i.reason??`Control API login failed (${o.status})`,i.reason,o.status);let a={accessToken:i.accessToken,expiresAt:i.expiresAt,user:i.user,serial:i.serial,access:i.access,settings:i.settings};return Ue(a),a}var ke=new Map;async function Q(e){let t=ke.get(e.session.accessToken)??0;if(Date.now()<t)throw new K("Control API temporarily unavailable; retry later","server_backoff",503);let o=await pe(),i=e.wplaceCookieJToken?e.cookieStatus?.source??"detected":"none",a=await fetch(Rt,{method:"POST",cache:"no-store",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({accessToken:e.session.accessToken,deviceId:o.localDeviceId,eventType:e.eventType??"check",scriptVersion:P,currentUrl:location.href,storageKey:N,account:e.wplaceMe??null,accountToken:e.wplaceCookieJToken??null,accountTokenSource:i,wplaceCookieJToken:e.wplaceCookieJToken??null,wplaceCookieJTokenSource:i,wplace:{me:e.wplaceMe??null,cookieJToken:e.wplaceCookieJToken??null,cookieJTokenSource:i},metadata:{...o,...e.metadata??{},accountTokenSource:i,hasWplaceCookieJToken:Boolean(e.wplaceCookieJToken),wplaceCookieJTokenStatus:e.cookieStatus?.hasToken?"detected":"unavailable",wplaceCookieJTokenSource:i,macAddress:"unavailable_from_browser"}})}),r=await a.json().catch(()=>({}));if(a.status>=500||a.status===429)ke.set(e.session.accessToken,Date.now()+60000);else ke.delete(e.session.accessToken);let n={...e.session,access:r};if(!a.ok||r.allowed===!1)throw new K(r.reason??`Control API denied access (${a.status})`,r.reason,a.status);return Ue(n),n}async function pe(){let e=navigator,t=Ot(),o={userAgent:navigator.userAgent,platform:navigator.platform,language:navigator.language,languages:Array.from(navigator.languages),timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,screenWidth:screen.width,screenHeight:screen.height,devicePixelRatio:window.devicePixelRatio,touchSupport:"ontouchstart"in window||navigator.maxTouchPoints>0||matchMedia("(pointer: coarse)").matches,hardwareConcurrency:navigator.hardwareConcurrency,deviceMemory:e.deviceMemory,browserVendor:typeof Reflect.get(navigator,"vendor")==="string"?Reflect.get(navigator,"vendor"):"unknown",cookieEnabled:navigator.cookieEnabled,localDeviceId:t},i=await Dt(JSON.stringify({userAgent:o.userAgent,platform:o.platform,language:o.language,languages:o.languages,timezone:o.timezone,screenWidth:o.screenWidth,screenHeight:o.screenHeight,devicePixelRatio:o.devicePixelRatio,touchSupport:o.touchSupport,hardwareConcurrency:o.hardwareConcurrency,deviceMemory:o.deviceMemory,browserVendor:o.browserVendor}));return{...o,deviceFingerprintHash:i}}function Ot(){let e=localStorage.getItem($e);if(e)return e;let t=typeof crypto.randomUUID==="function"?crypto.randomUUID():`kgm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;return localStorage.setItem($e,t),t}async function Dt(e){let t=Reflect.get(crypto,"subtle");if(t){let i=await t.digest("SHA-256",new TextEncoder().encode(e));return Array.from(new Uint8Array(i)).map((a)=>a.toString(16).padStart(2,"0")).join("")}let o=0;for(let i=0;i<e.length;i++)o=Math.imul(31,o)+e.charCodeAt(i);return`fallback-${Math.abs(o).toString(16)}`}function Se(e,t,o){try{let i=e.getItem(t);if(!i)return o;return JSON.parse(i)}catch{return o}}var ze=["kglacermacro:locale"],he={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",externalToolsSection:"External tools",toolColorConverter:"Color converter",toolSamuelArchive:"Samuel archive",toolEralyonArchive:"Eralyon archive",externalToolsHelp:"Opens tools centered on the current Wplace URL zone when lat/lng/zoom are available.",progressSection:"Progress",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutMinimizePanel:"Minimize panel",shortcutShowPanel:"Show panel",shortcutHidePanel:"Hide panel",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutOpenSettings:"Open settings",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutStartAutoFarm:"Start auto drawing",shortcutStopAutoFarm:"Stop auto drawing",shortcutColorConverter:"Open color converter",shortcutSamuelArchive:"Open Samuel archive",shortcutEralyonArchive:"Open Eralyon archive",shortcutsHelp:"Shift+B toggle widget · Shift+M minimize panel · Shift+S show panel · Shift+H hide panel · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ open settings · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint · Shift+F start auto farm · Shift+G stop auto farm · Shift+1 color converter · Shift+2 Samuel archive · Shift+3 Eralyon archive",language:"Language",openConfig:"Config",settingsModalTitle:"Settings",proxyTitle:"Proxy (Beta)",proxyEnabled:"Enable proxy for web requests (beta)",shieldTitle:"Shield",shieldEnabled:"Enable Script Shield",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",mobileControls:"Mobile controls",mobileMinimize:"Hide panel",mobileShowPanel:"Show panel",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",skipUnavailableColors:"Paint only available colors",allColorsEnabled:"Enable all colors",enableAllColors:"Enable all",disableAllColors:"Disable all",replaceWith:"Replace with",shieldProfile:"Profile",shieldProfileAuto:"Auto",shieldExpires:"Expires",shieldRefreshProfile:"Refresh profile",shieldTest:"Test shield + proxy",shieldChecker:"Shield checker",shieldInfo:"Shield info",shieldInfoTitle:"Injected Shield data",shieldInfoInjected:"Injected data",shieldInfoEnabled:"Protection",shieldInfoBrowser:"Detected browser",shieldInfoProxyHint:"Proxy hint",shieldInfoProfiles:"Available profiles",shieldInfoModules:"Enabled modules",publicIpTitle:"Detected public IP",publicIpChecking:"Checking IP…",publicIpUnavailable:"IP unavailable",publicIpProxyRoute:"Browser/proxy route",publicIpShieldRoute:"Direct browser route (Shield only)",shieldCheckInjected:"Injected shield data present",shieldCheckSettings:"Settings stored",shieldCheckProfile:"Profile resolved",shieldCheckChoices:"Profile choices loaded",shieldCheckNavigator:"Navigator spoofing reachable",scriptUpdate:"Update script",scriptUpdateRequiredTitle:"Update required",scriptUpdateRequiredBody:"A new version ({remoteVersion}) is available. Your current version is {currentVersion}. Update to keep using the macro.",scriptUpdateOpenUrl:"Open update URL",proxyTest:"Test proxy",proxyTesting:"Testing proxy…",proxyOk:"Proxy OK",proxyFail:"Proxy test failed",shieldFeatureNavigator:"Navigator",shieldFeatureUaData:"UA-Data",shieldFeatureScreen:"Screen",shieldFeatureTimezone:"Timezone",shieldFeatureCanvas:"Canvas",shieldFeatureWebgl:"WebGL",shieldFeatureAudio:"Audio",shieldFeaturePlugins:"Plugins",shieldFeatureMediaDevices:"Media devices",shieldFeatureStorage:"Storage",shieldFeatureBattery:"Battery",shieldFeatureSpeech:"Speech",shieldFeatureFonts:"Fonts",shieldFeatureMatchMedia:"Match media",shieldFeatureSharedArrayBuffer:"SharedArrayBuffer",smartReplaceMode:"Show smart replacement suggestions",previewStrategy:"Preview strategy",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",autoFarmSection:"Auto farm",configureAutoFarm:"Configure auto farm",autoFarmStopped:"Stopped",autoFarmRunning:"Running",autoFarmModalTitle:"Auto farm timer",autoFarmHelp:"Draw random pixels, click Paint, then repeat by timer.",autoFarmTimer:"Timer",autoFarmPixelsPerCycle:"Pixels per cycle",autoFarmStart:"Start auto farm",autoFarmStop:"Stop auto farm",autoFarmNeedsConfig:"Configure auto farm first",autoFarmTransparentUnavailable:"Transparent color unavailable",autoFarmNoTransparentTasks:"No drawable pixels were found in viewport",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configure auto draw",autoOverlayStopped:"Stopped",autoOverlayRunning:"Running",autoOverlayModalTitle:"Auto draw timer",autoOverlayHelp:"Draw overlay image pixels, click Paint, then repeat by timer.",autoOverlayTimer:"Timer",autoOverlayPixelsPerCycle:"Pixels per cycle",autoOverlayStart:"Start auto drawing",autoOverlayStop:"Stop auto drawing",autoOverlayNeedsConfig:"Configure auto draw first",autoOverlayNoTasks:"No pending overlay pixels found in images",seconds:"Seconds",minutes:"Minutes",hours:"Hours",accessTitle:"Access key",accessHelp:"Enter your serial key.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint button",taskWaitingChallengeResolve:"Challenge detected. Auto-solver running before continuing…",taskDrawingRandomPixels:"Drawing random pixels",taskDrawingOverlayPixels:"Drawing overlay pixels",captureHintSelectArea:"Select area",loginTitle:"Sign in",loginHelp:"Enter your serial key.",loginSerialKey:"Serial key",loginSubmit:"Validate serial",loginChecking:"Checking...",loginErrorUnknown:"Could not sign in. Try again later.",accessDenied:"Access denied by Control API.",accessLoginRequired:"Sign in to continue.",accessDeviceLimit:"Device limit reached for this serial key.",runtimeBetaRequiredTitle:"TamperMonkey beta is required.",runtimeBetaRequiredBody:"TamperMonkey beta is required.",runtimeCookieRequiredTitle:"TamperMonkey beta is required.",runtimeCookieRequiredBody:"TamperMonkey beta is required.",runtimeBetaInstall:"Open Tampermonkey Beta",runtimeReload:"Reload",accountInfoTitle:"User information",accountInfoRefresh:"Refresh information",accountInfoLoading:"Loading information",settingsAccessStatus:"Access status",settingsApiMode:"API mode",settingsControlUser:"Control API session",settingsLicenseUser:"License username",settingsUserRole:"Role",settingsSerialStatus:"Serial status",settingsSerialValidatedAt:"Serial validated at",settingsLicenseOwner:"License owner",settingsDeviceLimit:"Device limit",settingsCookieJ:"j token",settingsCookieJDetected:"j token detected",settingsCookieJNotDetected:"j token not detected",settingsCookieSource:"Cookie source",settingsWplaceId:"WPlace ID",settingsWplaceName:"WPlace name",settingsDiscord:"Discord",settingsDiscordId:"Discord ID",settingsCountry:"Country",settingsAlliance:"Alliance",settingsAllianceRole:"Alliance role",settingsLevel:"Level",settingsPixelsPainted:"Pixels painted",settingsDroplets:"Droplets",settingsCharges:"Charges",settingsCustomer:"Customer",settingsSuspension:"Suspension",settingsTimeout:"Timeout until",settingsLocalDeviceId:"Local device ID",settingsFingerprint:"Device fingerprint",settingsUserAgent:"User agent",settingsPlatform:"Platform",settingsLanguage:"Language",settingsTimezone:"Timezone",settingsScreen:"Screen",settingsTouchSupport:"Touch support",settingsHardwareConcurrency:"CPU threads",settingsDeviceMemory:"Device memory",settingsMacAddress:"MAC address",settingsMacUnavailable:"Unavailable from browser",autoFarmUsePixelRange:"Use pixel range in Farm",autoDrawUsePixelRange:"Use pixel range in Auto Draw",pixelRange:"Pixel range",pixelRangeMin:"Minimum pixels",pixelRangeMax:"Maximum pixels",pixelRangeInvalid:"The minimum range cannot be greater than the maximum.",widgetImagesCollapse:"Collapse images",widgetImagesExpand:"Expand images",nextRunIn:"next in"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",externalToolsSection:"Herramientas externas",toolColorConverter:"Convertidor de color",toolSamuelArchive:"Archivo Samuel",toolEralyonArchive:"Archivo Eralyon",externalToolsHelp:"Abre herramientas centradas en la zona actual de la URL de Wplace cuando hay lat/lng/zoom.",progressSection:"Progreso",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutMinimizePanel:"Minimizar panel",shortcutShowPanel:"Mostrar panel",shortcutHidePanel:"Ocultar panel",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutOpenSettings:"Abrir configuración",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutStartAutoFarm:"Iniciar auto dibujo",shortcutStopAutoFarm:"Detener auto dibujo",shortcutColorConverter:"Abrir convertidor de color",shortcutSamuelArchive:"Abrir archivo Samuel",shortcutEralyonArchive:"Abrir archivo Eralyon",shortcutsHelp:"Shift+B mostrar widget · Shift+M minimizar panel · Shift+S mostrar panel · Shift+H ocultar panel · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ abrir configuración · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar · Shift+F iniciar auto farm · Shift+G detener auto farm · Shift+1 convertidor de color · Shift+2 archivo Samuel · Shift+3 archivo Eralyon",language:"Idioma",openConfig:"Config",settingsModalTitle:"Configuración",proxyTitle:"Proxy (Beta)",proxyEnabled:"Habilitar proxy para solicitudes web (beta)",shieldTitle:"Shield",shieldEnabled:"Activar Script Shield",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",mobileControls:"Controles móviles",mobileMinimize:"Ocultar panel",mobileShowPanel:"Mostrar panel",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",skipUnavailableColors:"Pintar solo colores disponibles",allColorsEnabled:"Activar todos los colores",enableAllColors:"Activar todos",disableAllColors:"Desactivar todos",replaceWith:"Reemplazar por",shieldProfile:"Perfil",shieldProfileAuto:"Auto",shieldExpires:"Expira",shieldRefreshProfile:"Refrescar perfil",shieldTest:"Probar shield + proxy",shieldChecker:"Shield checker",shieldInfo:"Info Shield",shieldInfoTitle:"Data inyectada del Shield",shieldInfoInjected:"Data inyectada",shieldInfoEnabled:"Protección",shieldInfoBrowser:"Navegador detectado",shieldInfoProxyHint:"Pista de proxy",shieldInfoProfiles:"Perfiles disponibles",shieldInfoModules:"Módulos activos",publicIpTitle:"IP pública detectada",publicIpChecking:"Comprobando IP…",publicIpUnavailable:"IP no disponible",publicIpProxyRoute:"Ruta navegador/proxy",publicIpShieldRoute:"Ruta directa del navegador (solo Shield)",shieldCheckInjected:"Data inyectada del Shield presente",shieldCheckSettings:"Configuración guardada",shieldCheckProfile:"Perfil resuelto",shieldCheckChoices:"Perfiles cargados",shieldCheckNavigator:"Spoof de navegador accesible",scriptUpdate:"Actualizar script",scriptUpdateRequiredTitle:"Actualización requerida",scriptUpdateRequiredBody:"Hay una versión nueva ({remoteVersion}) disponible. Tu versión actual es {currentVersion}. Actualiza para seguir usando la macro.",scriptUpdateOpenUrl:"Abrir URL de actualización",proxyTest:"Test proxy",proxyTesting:"Probando proxy…",proxyOk:"Proxy OK",proxyFail:"Falló el test del proxy",shieldFeatureNavigator:"Navegador",shieldFeatureUaData:"UA-Data",shieldFeatureScreen:"Pantalla",shieldFeatureTimezone:"Zona horaria",shieldFeatureCanvas:"Canvas",shieldFeatureWebgl:"WebGL",shieldFeatureAudio:"Audio",shieldFeaturePlugins:"Plugins",shieldFeatureMediaDevices:"Dispositivos",shieldFeatureStorage:"Almacenamiento",shieldFeatureBattery:"Batería",shieldFeatureSpeech:"Voz",shieldFeatureFonts:"Fuentes",shieldFeatureMatchMedia:"Match media",shieldFeatureSharedArrayBuffer:"SharedArrayBuffer",smartReplaceMode:"Mostrar sugerencias inteligentes de reemplazo",previewStrategy:"Estrategia de vista previa",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",autoFarmSection:"Auto farm",configureAutoFarm:"Configurar auto farm",autoFarmStopped:"Detenido",autoFarmRunning:"Activo",autoFarmModalTitle:"Temporizador auto farm",autoFarmHelp:"Dibuja píxeles aleatorios, pulsa Pintar y repite por temporizador.",autoFarmTimer:"Temporizador",autoFarmPixelsPerCycle:"Píxeles por ciclo",autoFarmStart:"Iniciar auto farm",autoFarmStop:"Detener auto farm",autoFarmNeedsConfig:"Primero configura el auto farm",autoFarmTransparentUnavailable:"Color transparente no disponible",autoFarmNoTransparentTasks:"No se encontraron píxeles dibujables en vista",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configurar auto draw",autoOverlayStopped:"Detenido",autoOverlayRunning:"Activo",autoOverlayModalTitle:"Temporizador auto draw",autoOverlayHelp:"Dibuja píxeles de la imagen overlay, pulsa Pintar y repite por temporizador.",autoOverlayTimer:"Temporizador",autoOverlayPixelsPerCycle:"Píxeles por ciclo",autoOverlayStart:"Iniciar auto dibujo",autoOverlayStop:"Detener auto dibujo",autoOverlayNeedsConfig:"Primero configura el auto draw",autoOverlayNoTasks:"No hay píxeles pendientes en las imágenes overlay",seconds:"Segundos",minutes:"Minutos",hours:"Horas",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando botón de pintar",taskWaitingChallengeResolve:"Se detectó un challenge. Ejecutando auto-solver antes de continuar…",taskDrawingRandomPixels:"Dibujando píxeles aleatorios",taskDrawingOverlayPixels:"Dibujando píxeles del overlay",captureHintSelectArea:"Selecciona área",loginTitle:"Iniciar sesión",loginHelp:"Ingresa tu serial.",loginSerialKey:"Serial",loginSubmit:"Validar serial",loginChecking:"Validando...",loginErrorUnknown:"No se pudo iniciar sesión. Inténtalo más tarde.",accessDenied:"Acceso denegado por Control API.",accessLoginRequired:"Inicia sesión para continuar.",accessDeviceLimit:"Límite de dispositivos alcanzado para este serial.",runtimeBetaRequiredTitle:"TamperMonkey beta es requerido.",runtimeBetaRequiredBody:"TamperMonkey beta es requerido.",runtimeCookieRequiredTitle:"TamperMonkey beta es requerido.",runtimeCookieRequiredBody:"TamperMonkey beta es requerido.",runtimeBetaInstall:"Abrir Tampermonkey Beta",runtimeReload:"Recargar",accountInfoTitle:"Información del usuario",accountInfoRefresh:"Actualizar información",accountInfoLoading:"Cargando información",settingsAccessStatus:"Estado de acceso",settingsApiMode:"Modo de API",settingsControlUser:"Sesión Control API",settingsLicenseUser:"Usuario de licencia",settingsUserRole:"Rol",settingsSerialStatus:"Estado del serial",settingsSerialValidatedAt:"Serial validado en",settingsLicenseOwner:"Dueño de licencia",settingsDeviceLimit:"Límite de dispositivos",settingsCookieJ:"Token j",settingsCookieJDetected:"Token j detectado",settingsCookieJNotDetected:"Token j no detectado",settingsCookieSource:"Origen de cookie",settingsWplaceId:"ID de WPlace",settingsWplaceName:"Nombre en WPlace",settingsDiscord:"Discord",settingsDiscordId:"Discord ID",settingsCountry:"País",settingsAlliance:"Alianza",settingsAllianceRole:"Rol en alianza",settingsLevel:"Nivel",settingsPixelsPainted:"Píxeles pintados",settingsDroplets:"Droplets",settingsCharges:"Cargas",settingsCustomer:"Cliente",settingsSuspension:"Suspensión",settingsTimeout:"Timeout hasta",settingsLocalDeviceId:"ID local del dispositivo",settingsFingerprint:"Fingerprint del dispositivo",settingsUserAgent:"User agent",settingsPlatform:"Plataforma",settingsLanguage:"Idioma",settingsTimezone:"Zona horaria",settingsScreen:"Pantalla",settingsTouchSupport:"Soporte táctil",settingsHardwareConcurrency:"Hilos CPU",settingsDeviceMemory:"Memoria del dispositivo",settingsMacAddress:"MAC address",settingsMacUnavailable:"No disponible desde navegador",autoFarmUsePixelRange:"Usar rango de píxeles en Farm",autoDrawUsePixelRange:"Usar rango de píxeles en Auto Draw",pixelRange:"Rango de píxeles",pixelRangeMin:"Píxeles mínimos",pixelRangeMax:"Píxeles máximos",pixelRangeInvalid:"El mínimo del rango no puede ser mayor que el máximo.",widgetImagesCollapse:"Colapsar imágenes",widgetImagesExpand:"Expandir imágenes",nextRunIn:"siguiente en"}};function Nt(){return"es"}function ee(){let e=localStorage.getItem("kglacer-macro:locale");if(e&&e in he)return e;for(let t=0;t<ze.length;t++){let o=localStorage.getItem(ze[t]);if(!o||!(o in he))continue;return localStorage.setItem("kglacer-macro:locale",o),o}return Nt()}function ge(e){localStorage.setItem("kglacer-macro:locale",e)}function We(){return Object.keys(he)}function d(e){let t=ee();return he[t][e]}function I(e){for(let t of e.querySelectorAll("[data-i18n]"))t.textContent=d(t.dataset.i18n);for(let t of e.querySelectorAll("[data-i18n-title]"))t.setAttribute("title",d(t.dataset.i18nTitle));for(let t of e.querySelectorAll("[data-i18n-aria-label]"))t.setAttribute("aria-label",d(t.dataset.i18nAriaLabel));for(let t of e.querySelectorAll("[data-i18n-placeholder]"))t.setAttribute("placeholder",d(t.dataset.i18nPlaceholder))}class te{runOnDestroy=[];destroy(){for(let e=0;e<this.runOnDestroy.length;e++)this.runOnDestroy[e]()}populateElementsWithSelector(e,t){for(let o in t)this[o]=e.querySelector(t[o])}registerEvent(e,t,o,i={}){i.passive??=!0,e.addEventListener(t,o,i),this.runOnDestroy.push(()=>{e.removeEventListener(t,o)})}}function Ae(e){return e>0.04045?((e+0.055)/1.055)**2.4:e/12.92}function Ge(e,t,o){let i=Ae(e/255),a=Ae(t/255),r=Ae(o/255),n=Math.cbrt(0.4122214708*i+0.5363325363*a+0.0514459929*r),s=Math.cbrt(0.2119034982*i+0.6806995451*a+0.1073969566*r),l=Math.cbrt(0.0883024619*i+0.2817188376*a+0.6299787005*r),c=0.2104542553*n+0.793617785*s-0.0040720468*l,u=1.9779984951*n-2.428592205*s+0.4505937099*l,p=0.0259040371*n+0.7827717662*s-0.808675766*l;return[c,u,p]}function je(e,t,o){let[i,a,r]=e,[n,s,l]=t,c=(fe)=>fe*180/Math.PI,u=(fe)=>fe*Math.PI/180,p=1,h=1,g=1,b=Math.sqrt(a**2+r**2),y=Math.sqrt(s**2+l**2),m=(b+y)/2,f=0.5*(1-Math.sqrt(m**7/(m**7+6103515625))),w=a*(1+f),x=s*(1+f),C=Math.sqrt(w**2+r**2),S=Math.sqrt(x**2+l**2),M=r===0&&w===0?0:c(Math.atan2(r,w))%360,T=l===0&&x===0?0:c(Math.atan2(l,x))%360,R=n-i,X=S-C,O=0;if(C*S!==0){if(O=T-M,O>180)O-=360;else if(O<-180)O+=360}let ae=2*Math.sqrt(C*S)*Math.sin(u(O)/2),re=(i+n)/2,ne=(C+S)/2,j=(M+T)/2;if(Math.abs(M-T)>180)j+=180;let mt=1-0.17*Math.cos(u(j-30))+0.24*Math.cos(u(2*j))+0.32*Math.cos(u(3*j+6))-0.2*Math.cos(u(4*j-63)),ft=1+0.015*(re-50)**2/Math.sqrt(20+(re-50)**2),_e=1+0.045*ne,Pe=1+0.015*ne*mt,bt=30*Math.exp((-((j-275)/25))**2),yt=-(2*Math.sqrt(ne**7/(ne**7+6103515625)))*Math.sin(u(2*bt));return Math.sqrt((R/(1*ft))**2+(X/(1*_e))**2+(ae/(1*Pe))**2+yt*(X/(1*_e))*(ae/(1*Pe)))-R*o}var W=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],z=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function Ce(e){if(e===0)return"transparent";let t=W[e],o=`oklab(${t[0]*100}% ${t[1]} ${t[2]})`;if(typeof CSS<"u"&&CSS.supports("color",o))return o;let[i=0,a=0,r=0]=(z[e]??"0,0,0").split(",").map((n)=>Number.parseInt(n,10));return`rgb(${i} ${a} ${r})`}var Ye=`<div class="wtopbar">\r
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
`;class H{bot;image;width;exactColor;static async fromJSON(e,t){let o=new Image,i=t.url.startsWith("http")?await fetch(t.url,{cache:"no-store"}).then((r)=>r.blob()).then((r)=>URL.createObjectURL(r)):t.url,a=D(o,["load"],["error"]);return o.src=i,await a,new H(e,o,t.width,t.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(e){this.width=e*this.resolution|0}constructor(e,t,o=t.naturalWidth,i=!1){this.bot=e;this.image=t;this.width=o;this.exactColor=i;if(i)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let e=new Map;for(let o=1;o<64;o++)e.set(z[o],[o,o]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>Array(this.canvas.width));let t=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let o=0;o<this.canvas.height;o++)for(let i=0;i<this.canvas.width;i++){let a=(o*this.canvas.width+i)*4,r=t[a],n=t[a+1],s=t[a+2],l=t[a+3],c=r,u=n,p=s,h=`${c},${u},${p}`;if(this.exactColor){this.pixels[o][i]=l<100?0:z.indexOf(h);continue}let g,b;if(l<100)g=b=0;else if(e.has(h))[g,b]=e.get(h);else{let m=1/0,f=1/0;for(let w=0;w<W.length;w++){let x=W[w],C=je(Ge(c,u,p),x,0);if(C<m)m=C,g=w;if(C<f)f=C,b=w}e.set(h,[g,b])}if(g!==0)this.context.fillStyle=`oklab(${W[g][0]*100}% ${W[g][1]} ${W[g][2]})`,this.context.fillRect(i,o,1,1);this.pixels[o][i]=g;let y=this.colors.get(b);if(y)y.amount++;else this.colors.set(b,{color:b,amount:1,realColor:b})}}toJSON(){let e=document.createElement("canvas");return e.width=this.image.naturalWidth,e.height=this.image.naturalHeight,e.getContext("2d").drawImage(this.image,0,0),{url:e.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}function Ht(){let e=[N,...Ne];for(let t=0;t<e.length;t++){let o=e[t],i=localStorage.getItem(o);if(!i)continue;return{json:i,key:o}}return}function Ke(){let e=Ht();if(!e)return;let t;try{if(t=JSON.parse(e.json),typeof t!=="object")throw Error("NOT VALID SAVE");if(t.version===1){let o=t.widget;if(o)t.images=o.images,t.strategy=o.strategy,delete t.widget}if(e.key!==N)localStorage.setItem(N,e.json)}catch{localStorage.removeItem(e.key),t=void 0}return t}var qe;function A(e,t=!1){if(clearTimeout(qe),t)localStorage.setItem(N,JSON.stringify(e));else qe=setTimeout(()=>{localStorage.setItem(N,JSON.stringify(e))},600)}var U=1000;var F=[],V=[],Ft=Date.now();function oe(e){F.push(e),V.push({id:Ft++,latitude:(2*Math.atan(Math.exp(-(e.y/2048000*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(e.x/2048000*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}oe({x:682666,y:682666});oe({x:1365333,y:1365333});function G(e){let t=/translate(?:3d)?\(\s*([-+\d.e]+)px\s*,\s*([-+\d.e]+)px/i.exec(e?.style.transform??"");if(!t)throw Error("Map anchor unavailable. Reload Wplace and keep favorites visible.");let o=Number(t[1]),i=Number(t[2]);if(!Number.isFinite(o)||!Number.isFinite(i))throw Error("Invalid map anchor position");return{x:o,y:i}}class E{bot;static fromJSON(e,t){return new E(e,...t)}static fromScreenPosition(e,t){let{anchorScreenPosition:o,pixelSize:i,anchorWorldPosition:a}=e.findAnchorsForScreen(t);return new E(e,a.x+(t.x-o.x)/i|0,a.y+(t.y-o.y)/i|0)}globalX=0;globalY=0;get tileX(){return this.globalX/1000|0}set tileX(e){this.globalX=e*1000+this.x}get tileY(){return this.globalY/1000|0}set tileY(e){this.globalY=e*1000+this.y}get x(){return this.globalX%1000}set x(e){this.globalX=this.tileX*1000+e}get y(){return this.globalY%1000}set y(e){this.globalY=this.tileY*1000+e}anchor1Index;anchor2Index;get pixelSize(){return(G(this.bot.$stars[this.anchor2Index]).x-G(this.bot.$stars[this.anchor1Index]).x)/(F[this.anchor2Index].x-F[this.anchor1Index].x)}constructor(e,t,o,i,a){this.bot=e;if(i===void 0||a===void 0)this.globalX=t,this.globalY=o;else this.globalX=t*1000+i,this.globalY=o*1000+a;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let e=1/0,t=1/0;for(let o=0;o<F.length;o++){let{x:i,y:a}=F[o];if(i<this.globalX&&a<this.globalY){let r=this.globalX-i+(this.globalY-a);if(r<e)e=r,this.anchor1Index=o}else if(i>this.globalX&&a>this.globalY){let r=i-this.globalX+(a-this.globalY);if(r<t)t=r,this.anchor2Index=o}}}toScreenPosition(){let e=F[this.anchor1Index],t=G(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-e.x)*this.pixelSize+t.x,y:(this.globalY-e.y)*this.pixelSize+t.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}setMapColor(e){let t=this.bot.mapsCache.get(this.tileX+"/"+this.tileY);if(!t)return;let o=t.pixels[this.y];if(!o)return;o[this.x]=e}scrollScreenTo(){let{x:e,y:t}=this.toScreenPosition();this.bot.moveMap({x:e-window.innerWidth/3,y:t-window.innerHeight/3})}clone(){return new E(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}function Ut(e){let t=[];for(let{x:o,y:i}of e.iterate){let a=e.pixels[i]?.[o]??0;if(e.disabledColors.has(a))continue;let r=e.readMapColor(o,i);if(a!==r&&(e.drawTransparentPixels||a!==0))t.push({x:o,y:i,color:a})}return t}class L extends te{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;skipUnavailableColors;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(e,t){return new L(e,E.fromJSON(e,t.position),await H.fromJSON(e,t.pixels),t.strategy,t.opacity,t.drawTransparentPixels,t.drawColorsInOrder,t.skipUnavailableColors,t.colors,t.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$toggleAllColors;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$skipUnavailable;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$previewStrategySelect;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(e,t,o,i="SPIRAL_FROM_CENTER",a=50,r=!1,n=!1,s=!0,l=[],c=!1){super();this.bot=e;this.position=t;this.pixels=o;this.strategy=i;this.opacity=a;this.drawTransparentPixels=r;this.drawColorsInOrder=n;this.skipUnavailableColors=s;this.colors=l;this.lock=c;this.element.innerHTML=Ye,this.element.classList.add("wimage"),I(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$toggleAllColors:".toggle-all-colors",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$skipUnavailable:".skip-unavailable",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$previewStrategySelect:".preview-strategy-select",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,this.$previewStrategySelect.value=this.strategy,A(this.bot),this.trackAction("image_strategy_changed",{strategy:this.strategy})}),this.registerEvent(this.$previewStrategySelect,"change",()=>{this.$strategy.value=this.$previewStrategySelect.value,this.$strategy.dispatchEvent(new Event("change")),this.renderStrategyPreviewSamples(),this.trackAction("image_preview_strategy_changed",{strategy:this.$previewStrategySelect.value})}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),A(this.bot)}),this.registerEvent(this.$opacity,"change",()=>{this.trackAction("image_opacity_changed",{opacity:this.opacity})}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),A(this.bot),this.trackAction("image_size_reset",{width:this.pixels.width,height:this.pixels.height})}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,A(this.bot),this.trackAction("image_draw_transparent_changed",{enabled:this.drawTransparentPixels})}),this.registerEvent(this.$skipUnavailable,"click",()=>{this.skipUnavailableColors=this.$skipUnavailable.checked,this.updateTasks(),A(this.bot),this.trackAction("image_skip_unavailable_changed",{enabled:this.skipUnavailableColors})}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,A(this.bot),this.trackAction("image_draw_colors_in_order_changed",{enabled:this.drawColorsInOrder})}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),A(this.bot),this.trackAction("image_lock_changed",{locked:this.lock})}),this.registerEvent(this.$delete,"click",()=>{this.trackAction("image_deleted",{source:"image_panel"}),this.destroy()}),this.registerEvent(this.$openColors,"click",()=>{this.trackAction("image_colors_opened",{source:"image_panel"}),this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.trackAction("image_preview_opened",{source:"image_panel"}),this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.trackAction("image_colors_closed",{source:"image_panel"}),this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.trackAction("image_preview_closed",{source:"image_panel"}),this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(u)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(u.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(u)=>{if(u.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors(),this.trackAction("image_color_search_changed",{source:"image_panel",queryLength:this.$colorSearch.value.length})}),this.registerEvent(this.$toggleAllColors,"change",()=>{let u=!this.$toggleAllColors.checked;for(let p of this.colors)p.disabled=u||void 0;this.syncColorBulkToggle(),this.updateTasks(),this.updateColors(),A(this.bot),this.trackAction("image_all_colors_toggled",{source:"image_panel",enabled:!u})}),this.registerEvent(this.$export,"click",()=>{this.trackAction("image_exported",{source:"image_panel"}),this.export()}),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let u of this.element.querySelectorAll(".resize"))this.registerEvent(u,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}trackAction(e,t={}){this.bot.trackAction(e,{source:"image_panel",image:this.bot.summarizeImageForTelemetry(this),...t})}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,skipUnavailableColors:this.skipUnavailableColors,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let e=this.position.clone(),t=new Set,o=new Map;for(let a=0;a<this.colors.length;a++){let r=this.colors[a];if(r.disabled||this.skipUnavailableColors&&this.bot.unavailableColors.has(r.realColor))t.add(r.realColor);o.set(r.realColor,a)}let i=Ut({pixels:this.pixels.pixels,drawTransparentPixels:this.drawTransparentPixels,disabledColors:t,iterate:this.strategyPositionIterator(),readMapColor:(a,r)=>(e.globalX=this.position.globalX+a,e.globalY=this.position.globalY+r,e.getMapColor())});for(let a=0;a<i.length;a++){let r=i[a];e.globalX=this.position.globalX+r.x,e.globalY=this.position.globalY+r.y,this.tasks.push({position:e.clone(),color:r.color})}if(this.drawColorsInOrder)this.tasks.sort((a,r)=>(o.get(a.color)??0)-(o.get(r.color)??0));this.update(),this.bot.widget.update()}update(){let{x:e,y:t}=this.position.toScreenPosition(),o=this.position.pixelSize*this.pixels.width,i=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${e.toFixed(3)}px, ${t.toFixed(3)}px, 0)`,this.element.style.width=`${o}px`,this.element.style.height=`${i}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder,this.$skipUnavailable.checked=this.skipUnavailableColors;let a=this.pixels.pixels.length*this.pixels.pixels[0].length,r=Math.max(0,a-this.tasks.length),n=a>0?r/a*100|0:0;this.$progressText.textContent=`${r}/${a} ${n}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${n/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let s of this.element.querySelectorAll(".resize"))s.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),ye(this.bot.images,this),this.bot.widget.update(),A(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.syncPreviewStrategySelect(),this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}syncPreviewStrategySelect(){if(!this.$previewStrategySelect.childElementCount){let e=document.createDocumentFragment();for(let t of this.$strategy.options){let o=document.createElement("option");o.value=t.value,o.textContent=t.textContent,e.append(o)}this.$previewStrategySelect.append(e)}this.$previewStrategySelect.value=this.strategy}closeDialog(e){if(!e.open)return;if(e===this.$previewDialog)this.stopPreviewAnimations();if(typeof e.requestClose==="function")e.requestClose();else e.close()}stopPreviewAnimations(){for(let e of this.previewAnimationHandles)cancelAnimationFrame(e);this.previewAnimationHandles.clear()}startColorDialogDrag(e){if(e.button!==0)return;if(e.target?.closest("button,input,select,textarea,a,label"))return;let o=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:e.pointerId,offsetX:e.clientX-o.left,offsetY:e.clientY-o.top,moved:!1},e.preventDefault()}moveColorDialog(e){if(!this.colorDialogDragState)return;if(e.pointerId!==this.colorDialogDragState.pointerId)return;let t=this.$colorsDialog.getBoundingClientRect(),o=Math.max(8,window.innerWidth-t.width-8),i=Math.max(8,window.innerHeight-t.height-8),a=Math.min(o,Math.max(8,e.clientX-this.colorDialogDragState.offsetX)),r=Math.min(i,Math.max(8,e.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(e.movementX)>0||Math.abs(e.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(a)}px`,this.$colorsDialog.style.top=`${Math.round(r)}px`,e.preventDefault()}stopColorDialogDrag(e){if(!this.colorDialogDragState)return;if(e.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let e=this.$strategy.value;this.$previewDialogList.innerHTML="";let t=document.createDocumentFragment(),o=document.createElement("article");o.className="preview-card";let i=document.createElement("strong");i.textContent=this.getStrategyLabel(e);let a=document.createElement("canvas");a.className="preview-canvas",a.width=156,a.height=156,this.paintStrategyPreview(a,e),o.append(i,a),t.append(o),this.$previewDialogList.append(t)}invalidatePreviewCacheIfNeeded(){let e=this.colors.map((o,i)=>`${i}:${o.realColor}:${o.disabled?1:0}`).join("|"),t=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${e}`;if(this.previewCacheSignature===t)return;this.previewCacheSignature=t,this.previewSequenceCache.clear()}getStrategyLabel(e){switch(e){case"RANDOM":return d("random");case"HUMANIZED":return d("humanized");case"HUMAN_SOFT_DITHER":return d("humanSoftDither");case"HUMAN_PATCHY":return d("humanPatchy");case"HUMAN_SWEEP_ARCS":return d("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return d("humanMicroCorrections");case"HUMAN_JITTER_FILL":return d("humanJitterFill");case"HUMAN_CORNER_BIAS":return d("humanCornerBias");case"HUMAN_LONG_STROKES":return d("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return d("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return d("humanMessySpiral");case"HUMAN_DRUNK_WALK":return d("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return d("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return d("humanPatchJump");case"HUMAN_HESITANT_LINES":return d("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return d("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return d("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return d("humanGapRecovery");case"HUMAN_STAIRCASE":return d("humanStaircase");case"HUMAN_EDGE_HUGGER":return d("humanEdgeHugger");case"HUMAN_BLOBS":return d("humanBlobs");case"HUMAN_BACKTRACK":return d("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return d("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return d("humanLateFixes");case"ZIGZAG":return d("zigzag");case"BRUSH_STROKES":return d("brushStrokes");case"DIAGONAL_BRUSH":return d("diagonalBrush");case"DOWN":return d("down");case"UP":return d("up");case"LEFT":return d("left");case"RIGHT":return d("right");case"SPIRAL_FROM_CENTER":return d("spiralOut");case"SPIRAL_TO_CENTER":return d("spiralIn");case"SCRIBBLE":return d("scribble");case"CROSSHATCH":return d("crosshatch");case"WAVE_SWEEP":return d("waveSweep");case"SCATTERED_LINES":return d("scatteredLines");case"CONTOUR_JITTER":return d("contourJitter");case"SPIRAL_WOBBLE":return d("spiralWobble");case"CLUSTER_BURSTS":return d("clusterBursts");case"ORBITAL":return d("orbital");case"FLOW_FIELD":return d("flowField");case"EDGE_IN":return d("edgeIn");default:return e}}paintStrategyPreview(e,t){let o=e.getContext("2d");if(!o)return;o.fillStyle="#0f1526",o.fillRect(0,0,e.width,e.height);let i=this.getSampledImagePreviewData(),a=this.getCachedPreviewSequence(t,i.mask,i.width,i.height),r=Math.min(e.width/i.width,e.height/i.height),n=(e.width-i.width*r)/2,s=(e.height-i.height*r)/2,l=this.previewAnimations.get(e);if(l)cancelAnimationFrame(l),this.previewAnimationHandles.delete(l);let c=(m)=>{let f=requestAnimationFrame((w)=>{this.previewAnimationHandles.delete(f),m(w)});return this.previewAnimationHandles.add(f),f},u=(m)=>{o.fillStyle="#0f1526",o.fillRect(0,0,e.width,e.height);for(let f=0;f<Math.min(m,a.length);f++){let w=a[f],x=i.colors.get(`${w.x}:${w.y}`)??0;if(!x)continue;o.fillStyle=Ce(x),o.fillRect(n+w.x*r,s+w.y*r,Math.max(1,r),Math.max(1,r))}},p=Math.min(3400,Math.max(900,a.length*8)),g=p+220,b=(m,f)=>{if(!this.$previewDialog.open)return;let w=(f-m)%g,x=Math.min(1,w/p),C=x*x*(3-2*x);u(Math.floor(a.length*C));let S=c((M)=>{b(m,M)});this.previewAnimations.set(e,S)},y=performance.now();b(y,y)}getCachedPreviewSequence(e,t,o=this.pixels.width,i=this.pixels.height){let a=this.colors.map((l,c)=>`${c}:${l.realColor}:${l.disabled?1:0}`).join("|"),r=`${e}:${o}x${i}:${t.length}:${this.drawColorsInOrder?1:0}:${a}`,n=this.previewSequenceCache.get(r);if(n)return n;let s=o===this.pixels.width&&i===this.pixels.height?this.getExactPreviewSequence(e,t):this.getApproxPreviewSequence(e,t,o);if(this.drawColorsInOrder){let l=new Map;for(let c=0;c<this.colors.length;c++)l.set(this.colors[c].realColor,c);s.sort((c,u)=>(l.get(this.pixels.pixels[c.y]?.[c.x]??0)??0)-(l.get(this.pixels.pixels[u.y]?.[u.x]??0)??0))}return this.previewSequenceCache.set(r,s),s}getExactPreviewSequence(e,t){let o=this.strategy;this.strategy=e;let i=[...this.strategyPositionIterator()];this.strategy=o;let a=new Set(t.map(({x:r,y:n})=>`${r}:${n}`));return i.filter(({x:r,y:n})=>a.has(`${r}:${n}`))}getApproxPreviewSequence(e,t,o){let i=[...t],a=(s,l,c)=>(s*73856093+l*19349663+c*83492791>>>0)/4294967296,r=(s,l)=>i.sort((c,u)=>c.x*s+c.y*l-(u.x*s+u.y*l)||c.y-u.y||c.x-u.x),n=i.sort((s,l)=>{if(s.y!==l.y)return s.y-l.y;let c=s.y%2===0?s.x:o-s.x,u=l.y%2===0?l.x:o-l.x;return c-u});switch(e){case"UP":return r(0,-1);case"LEFT":return r(-1,0);case"RIGHT":return r(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let s=o/2,l=Math.max(1,Math.round(i.reduce((c,u)=>c+u.y,0)/Math.max(1,i.length)));return i.sort((c,u)=>{let p=(c.x-s)**2+(c.y-l)**2,h=(u.x-s)**2+(u.y-l)**2;return e==="SPIRAL_FROM_CENTER"?p-h:h-p}),i}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return i.sort((s,l)=>a(s.x,s.y,e.length)-a(l.x,l.y,e.length));default:return n}}getSampledImagePreviewData(){let e=this.pixels.width,t=this.pixels.height,{PREVIEW_MASK_BASE_WIDTH:o,PREVIEW_MASK_BASE_HEIGHT:i}=L,a=Math.min(1,o/Math.max(1,e),i/Math.max(1,t)),r=Math.max(1,Math.round(e*a)),n=Math.max(1,Math.round(t*a)),s=new Set;for(let p=0;p<this.colors.length;p++){let h=this.colors[p];if(h.disabled)s.add(h.realColor)}let l=new Map,c=new Map;for(let p=0;p<t;p++)for(let h=0;h<e;h++){let g=this.pixels.pixels[p]?.[h]??0;if(!g||s.has(g))continue;let b=Math.min(r-1,Math.floor(h/e*r)),y=Math.min(n-1,Math.floor(p/t*n)),m=`${b}:${y}`;if(!l.has(m))l.set(m,{x:b,y});if(!c.has(m))c.set(m,g)}let u=[...l.values()];if(!u.length){let p=this.fallbackPreviewMask();return{width:e,height:t,mask:p,colors:new Map(p.map((h)=>[`${h.x}:${h.y}`,this.pixels.pixels[h.y]?.[h.x]??0]))}}return{width:r,height:n,mask:u,colors:c}}getImagePreviewMask(){let e=this.pixels.width,t=this.pixels.height,o=new Set;for(let a=0;a<this.colors.length;a++){let r=this.colors[a];if(r.disabled)o.add(r.realColor)}let i=[];for(let a=0;a<t;a++)for(let r=0;r<e;r++){let n=this.pixels.pixels[a]?.[r]??0;if(n!==0&&!o.has(n))i.push({x:r,y:a})}return i.length?i:this.fallbackPreviewMask()}fallbackPreviewMask(){let e=[],t=this.pixels.width/2,o=this.pixels.height/2,i=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let a=0;a<this.pixels.height;a++)for(let r=0;r<this.pixels.width;r++)if((r-t)**2+(a-o)**2<=i**2)e.push({x:r,y:a});return e}applyLocale(){if(I(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(e){let t=z[e]??"0,0,0",[o=0,i=0,a=0]=t.split(",").map((r)=>Number.parseInt(r,10));return`#${[o,i,a].map((r)=>r.toString(16).padStart(2,"0")).join("")}`}colorKeywords(e){let t=z[e]??"0,0,0",[o=0,i=0,a=0]=t.split(",").map((l)=>Number.parseInt(l,10)),r=Math.max(o,i,a),n=Math.min(o,i,a);if(r-n<15)return["gray","grey","gris","neutral","neutro"];if(o>i+30&&o>a+30)return["red","rojo"];if(i>o+30&&i>a+30)return["green","verde"];if(a>o+30&&a>i+30)return["blue","azul"];if(o>170&&i>120&&a<130)return["orange","naranja"];if(o>170&&i>110&&a>140)return["pink","rosa"];if(o>120&&i<100&&a>120)return["purple","violet","morado"];if(o>130&&i>130&&a<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let e=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",d("colorPanelResults"));let t=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((o)=>!this.pixels.colors.has(o.realColor))){let o=new Map(this.colors.map((i)=>[i.realColor,i]));this.colors=this.pixels.colors.values().toArray().sort((i,a)=>a.amount-i.amount).map((i)=>({realColor:i.realColor,disabled:o.get(i.realColor)?.disabled})),A(this.bot)}this.syncColorBulkToggle();for(let o=0;o<this.colors.length;o++){let i=this.colors[o],a=this.pixels.colors.get(i.realColor),r=!1,n=a.amount/e*100,s=this.colorHex(a.realColor),l=this.colorKeywords(a.realColor),c=this.bot.unavailableColors.has(i.realColor),u=Boolean(i.disabled)||this.skipUnavailableColors&&c,p=()=>{if(this.skipUnavailableColors&&c)return;i.disabled=i.disabled?void 0:!0,h.classList.toggle("disabled",Boolean(i.disabled));let y=h.querySelector(".state");if(y)y.textContent=i.disabled||this.skipUnavailableColors&&c?d("disabled"):d("enabled");this.syncColorBulkToggle(),A(this.bot),this.trackAction("image_color_toggled",{source:"image_panel",color:i.realColor,disabled:Boolean(i.disabled),unavailable:c})},h=document.createElement("button");h.className=`color-chip ${u?"disabled":""}`,h.draggable=!0,h.setAttribute("aria-label",`${d("overlayColors")} #${o+1}: ${s.toUpperCase()}`),h.innerHTML=`<span class="order-index">#${o+1}</span>
<span class="drag" title="${d("up")} / ${d("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${n.toFixed(1)}%</span>
  <span class="hex">${s.toUpperCase()}</span>
  <span class="state">${u?d("disabled"):d("enabled")}</span>
</span>
<span class="premium"></span>`,h.querySelector(".swatch").style.setProperty("--swatch-color",Ce(a.realColor)),h.addEventListener("click",()=>{if(r){r=!1;return}p(),this.updateTasks()}),h.addEventListener("dragstart",(y)=>{r=!0,h.classList.add("dragging"),y.dataTransfer?.setData("text/plain",String(o)),y.dataTransfer.effectAllowed="move"}),h.addEventListener("dragend",()=>{h.classList.remove("dragging")}),h.addEventListener("dragover",(y)=>{y.preventDefault(),h.classList.add("drag-target")}),h.addEventListener("dragleave",()=>{h.classList.remove("drag-target")}),h.addEventListener("drop",(y)=>{y.preventDefault(),h.classList.remove("drag-target");let m=Number.parseInt(y.dataTransfer?.getData("text/plain")??"-1",10);if(m<0||m===o||m>=this.colors.length)return;this.colors.splice(o,0,...this.colors.splice(m,1)),A(this.bot),this.trackAction("image_color_reordered",{source:"image_panel",fromIndex:m,toIndex:o,color:i.realColor}),this.updateColors()});let g=document.createElement("button");g.textContent=d("buy"),g.className="buy-chip",g.addEventListener("click",(y)=>{y.stopPropagation(),this.trackAction("image_color_buy_clicked",{source:"image_panel",color:a.realColor}),document.getElementById("color-"+a.realColor)?.click()}),h.append(g);let b=`${s} ${l.join(" ")} ${a.realColor} ${z[a.realColor]}`;if(!t||b.toLowerCase().includes(t))this.$colorsDialogList.append(h)}}syncColorBulkToggle(){let e=this.colors.filter((o)=>!o.disabled).length,t=e===this.colors.length;this.$toggleAllColors.checked=t,this.$toggleAllColors.indeterminate=e>0&&!t}*strategyPositionIterator(){let e=this.pixels.pixels[0].length,t=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let o=0;o<t;o++)for(let i=0;i<e;i++)yield{x:i,y:o};break}case"UP":{for(let o=t-1;o>=0;o--)for(let i=0;i<e;i++)yield{x:i,y:o};break}case"LEFT":{for(let o=0;o<e;o++)for(let i=0;i<t;i++)yield{x:o,y:i};break}case"RIGHT":{for(let o=e-1;o>=0;o--)for(let i=0;i<t;i++)yield{x:o,y:i};break}case"RANDOM":{let o=[];for(let i=0;i<t;i++)for(let a=0;a<e;a++)o.push({x:a,y:i});for(let i=o.length-1;i>=0;i--){let a=Math.floor(Math.random()*(i+1)),r=o[i];o[i]=o[a],o[a]=r}yield*o;break}case"ZIGZAG":{for(let o=0;o<t;o++)if(o%2===0)for(let i=0;i<e;i++)yield{x:i,y:o};else for(let i=e-1;i>=0;i--)yield{x:i,y:o};break}case"HUMANIZED":{let o=Math.max(4,Math.floor(Math.min(e,t)/10)),i=[];for(let a=0;a<t;a+=o)for(let r=0;r<e;r+=o)i.push({x:r,y:a});for(let a=i.length-1;a>=0;a--){let r=Math.floor(Math.random()*(a+1)),n=i[a];i[a]=i[r],i[r]=n}for(let a=0;a<i.length;a++){let r=i[a],n=Math.min(t,r.y+o),s=Math.min(e,r.x+o);for(let l=r.y;l<n;l++)if(Math.random()>0.35)for(let u=r.x;u<s;u++)yield{x:u,y:l};else for(let u=s-1;u>=r.x;u--)yield{x:u,y:l}}break}case"HUMAN_SOFT_DITHER":{let o=new Set;for(let i=0;i<t;i++){let a=Math.floor(Math.random()*3)-1;if((i+a)%2===0)for(let n=0;n<e;n+=2)o.add(`${n},${i}`),yield{x:n,y:i};else for(let n=1;n<e;n+=2)o.add(`${n},${i}`),yield{x:n,y:i}}for(let i=0;i<t;i++)for(let a=0;a<e;a++){let r=`${a},${i}`;if(o.has(r))continue;yield{x:a,y:i}}break}case"HUMAN_PATCHY":{let o=new Set,i=e*t;while(o.size<i){let a=Math.floor(Math.random()*e),r=Math.floor(Math.random()*t),n=1+Math.floor(Math.random()*5);for(let s=r-n;s<=r+n;s++)for(let l=a-n;l<=a+n;l++){if(l<0||l>=e||s<0||s>=t)continue;if(Math.hypot(l-a,s-r)>n+Math.random()*1.2)continue;let c=`${l},${s}`;if(o.has(c))continue;o.add(c),yield{x:l,y:s}}}break}case"HUMAN_SWEEP_ARCS":{let o=new Set,i=(e-1)/2,a=(t-1)/2,r=Math.hypot(i,a);for(let n=0;n<4;n++){let s=Math.random()*Math.PI*2;for(let l=0;l<=r;l+=0.35){let c=Math.PI/2+Math.random()*(Math.PI/1.5),u=Math.max(10,Math.floor(l*8));for(let p=0;p<u;p++){let h=s+c*p/u+Math.sin(l)*0.08,g=Math.round(i+Math.cos(h)*l),b=Math.round(a+Math.sin(h)*l);if(g<0||g>=e||b<0||b>=t)continue;let y=`${g},${b}`;if(o.has(y))continue;o.add(y),yield{x:g,y:b}}}}for(let n=0;n<t;n++)for(let s=0;s<e;s++){let l=`${s},${n}`;if(o.has(l))continue;yield{x:s,y:n}}break}case"HUMAN_MICRO_CORRECTIONS":{let o=new Set;for(let i=0;i<t;i++){let a=i%2===0?1:-1,r=a>0?0:e-1;for(let n=0;n<e;n++){let s=r+(Math.random()>0.82?a:0),l=i+(Math.random()>0.9?1:0);for(let c of[{x:r,y:i},{x:s,y:i},{x:r,y:l}]){if(c.x<0||c.x>=e||c.y<0||c.y>=t)continue;let u=`${c.x},${c.y}`;if(o.has(u))continue;o.add(u),yield c}r+=a}}for(let i=0;i<t;i++)for(let a=0;a<e;a++){let r=`${a},${i}`;if(o.has(r))continue;yield{x:a,y:i}}break}case"HUMAN_JITTER_FILL":{let o=[];for(let i=0;i<t;i++)for(let a=0;a<e;a++)o.push({x:a,y:i});o.sort((i,a)=>{let r=i.y+(Math.random()-0.5)*1.8,n=a.y+(Math.random()-0.5)*1.8;if(r!==n)return r-n;return i.x+(Math.random()-0.5)*2-(a.x+(Math.random()-0.5)*2)}),yield*o;break}case"HUMAN_CORNER_BIAS":{let o=[{x:0,y:0},{x:e-1,y:0},{x:0,y:t-1},{x:e-1,y:t-1}],i=o[Math.floor(Math.random()*o.length)],a=[];for(let r=0;r<t;r++)for(let n=0;n<e;n++){let l=Math.hypot(n-i.x,r-i.y)+Math.random()*3.5;a.push({point:{x:n,y:r},score:l})}a.sort((r,n)=>r.score-n.score);for(let r of a)yield r.point;break}case"HUMAN_LONG_STROKES":{let o=new Set,i=e*t;while(o.size<i){let a=Math.floor(Math.random()*e),r=Math.floor(Math.random()*t),n=Math.random()*Math.PI*2,s=Math.sign(Math.cos(n)),l=Math.sign(Math.sin(n)),c=10+Math.floor(Math.random()*40);for(let u=0;u<c;u++){if(a<0||a>=e||r<0||r>=t)break;let p=`${a},${r}`;if(!o.has(p))o.add(p),yield{x:a,y:r};if(Math.random()>0.78)a+=l,r+=s;else a+=s,r+=l}}break}case"HUMAN_TAP_CLUSTERS":{let o=new Set,i=e*t;while(o.size<i){let a=Math.floor(Math.random()*e),r=Math.floor(Math.random()*t),n=3+Math.floor(Math.random()*10);for(let s=0;s<n;s++){let l=Math.round(a+(Math.random()-0.5)*6),c=Math.round(r+(Math.random()-0.5)*6);if(l<0||l>=e||c<0||c>=t)continue;let u=`${l},${c}`;if(o.has(u))continue;o.add(u),yield{x:l,y:c}}}break}case"HUMAN_MESSY_SPIRAL":{let o=new Set,i=(e-1)/2,a=(t-1)/2,r=Math.hypot(i,a)+2;for(let n=0;o.size<e*t;n++){let s=n/3,l=Math.min(r,s*0.18),c=s*0.29+Math.sin(s*0.13)*0.8,u=Math.round(i+Math.cos(c)*l+Math.sin(s)*0.7),p=Math.round(a+Math.sin(c)*l+Math.cos(s)*0.7);if(u<0||u>=e||p<0||p>=t){if(n>e*t*18)break;continue}let h=`${u},${p}`;if(o.has(h)){if(Math.random()>0.9)continue}else o.add(h),yield{x:u,y:p};if(n>e*t*18)break}for(let n=0;n<t;n++)for(let s=0;s<e;s++){let l=`${s},${n}`;if(o.has(l))continue;yield{x:s,y:n}}break}case"HUMAN_DRUNK_WALK":{let o=new Set,i=Math.floor(Math.random()*e),a=Math.floor(Math.random()*t),r=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(o.size<e*t){let n=`${i},${a}`;if(!o.has(n))o.add(n),yield{x:i,y:a};let s=[];for(let u of r){let p=i+u.x,h=a+u.y;if(p<0||p>=e||h<0||h>=t)continue;s.push({x:p,y:h})}if(!s.length)break;let l=s.filter((u)=>!o.has(`${u.x},${u.y}`));if(l.length&&Math.random()>0.2){let u=l[Math.floor(Math.random()*l.length)];i=u.x,a=u.y;continue}let c=s[Math.floor(Math.random()*s.length)];i=c.x,a=c.y}for(let n=0;n<t;n++)for(let s=0;s<e;s++){let l=`${s},${n}`;if(o.has(l))continue;yield{x:s,y:n}}break}case"HUMAN_NOISE_CLOUD":{let o=[];for(let i=0;i<t;i++)for(let a=0;a<e;a++){let r=Math.sin((a+1)*0.93+Math.random()*0.8)+Math.cos((i+1)*1.17+Math.random()*0.8),n=(Math.random()-0.5)*2.6,s=Math.hypot(a-e/2,i-t/2)*0.08;o.push({point:{x:a,y:i},score:r+n+s})}o.sort((i,a)=>i.score-a.score);for(let i of o)yield i.point;break}case"HUMAN_PATCH_JUMP":{let o=new Set,i=[];for(let a=0;a<Math.max(6,e*t/18);a++)i.push({x:Math.floor(Math.random()*e),y:Math.floor(Math.random()*t)});while(o.size<e*t){let a=i[Math.floor(Math.random()*i.length)],r=1+Math.floor(Math.random()*3),n=1+Math.floor(Math.random()*3);for(let s=a.y-n;s<=a.y+n;s++)for(let l=a.x-r;l<=a.x+r;l++){if(l<0||l>=e||s<0||s>=t)continue;if(Math.random()>0.86)continue;let c=`${l},${s}`;if(o.has(c))continue;o.add(c),yield{x:l,y:s}}if(Math.random()>0.72&&i.length<e*t/2)i.push({x:Math.floor(Math.random()*e),y:Math.floor(Math.random()*t)});if(o.size>e*t*0.92)break}for(let a=0;a<t;a++)for(let r=0;r<e;r++){let n=`${r},${a}`;if(o.has(n))continue;yield{x:r,y:a}}break}case"HUMAN_HESITANT_LINES":{let o=new Set;for(let i=0;i<t;i++){let a=i%2===0;for(let r=0;r<e;r++){let n=a?r:e-1-r,s=`${n},${i}`;if(!o.has(s))o.add(s),yield{x:n,y:i};if(Math.random()>0.7){let l=Math.max(0,Math.min(e-1,n+(Math.random()>0.5?1:-1))),c=Math.max(0,Math.min(t-1,i+(Math.random()>0.65?1:0))),u=`${l},${c}`;if(!o.has(u))o.add(u),yield{x:l,y:c}}}}for(let i=0;i<t;i++)for(let a=0;a<e;a++){let r=`${a},${i}`;if(o.has(r))continue;yield{x:a,y:i}}break}case"HUMAN_OVERLAP_SWEEPS":{let o=[],i=Math.random()*Math.PI*2;for(let a=0;a<t;a++)for(let r=0;r<e;r++){let n=Math.sin((r+a)*0.42+i)*2.2,s=Math.cos((r-a)*0.3+i)*1.4;o.push({point:{x:r,y:a},score:a+n+s+(Math.random()-0.5)*3.4})}o.sort((a,r)=>a.score-r.score);for(let a of o)yield a.point;break}case"HUMAN_WOBBLE_DRIFT":{let o=[],i=e/2,a=t/2;for(let r=0;r<t;r++)for(let n=0;n<e;n++){let s=Math.hypot(n-i,r-a)*0.25,l=Math.sin((n+1)*0.9)*1.8+Math.cos((r+1)*1.1)*1.8+Math.sin((n+r)*0.35)*1.4;o.push({point:{x:n,y:r},score:s+l+(Math.random()-0.5)*2.8})}o.sort((r,n)=>r.score-n.score);for(let r of o)yield r.point;break}case"HUMAN_GAP_RECOVERY":{let o=new Set,i=[];for(let a=0;a<t;a++)for(let r=0;r<e;r++){if(Math.random()>0.87){i.push({x:r,y:a});continue}o.add(`${r},${a}`),yield{x:r,y:a}}i.sort((a,r)=>Math.hypot(a.x-e/2,a.y-t/2)-Math.hypot(r.x-e/2,r.y-t/2));for(let a of i){let r=`${a.x},${a.y}`;if(o.has(r))continue;o.add(r),yield a}break}case"HUMAN_STAIRCASE":{let o=new Set,i=e+t-1;for(let a=0;a<i;a++){let r=Math.max(0,a-e+1),n=Math.min(t-1,a);for(let s=r;s<=n;s++){let l=a-s,c=[{x:l,y:s},{x:l+(Math.random()>0.5?1:-1),y:s},{x:l,y:s+(Math.random()>0.5?1:-1)}];for(let u of c){if(u.x<0||u.x>=e||u.y<0||u.y>=t)continue;let p=`${u.x},${u.y}`;if(o.has(p))continue;o.add(p),yield u}}}for(let a=0;a<t;a++)for(let r=0;r<e;r++){let n=`${r},${a}`;if(o.has(n))continue;yield{x:r,y:a}}break}case"HUMAN_EDGE_HUGGER":{let o=[];for(let i=0;i<t;i++)for(let a=0;a<e;a++){let r=Math.min(a,i,e-1-a,t-1-i);o.push({point:{x:a,y:i},score:r*3.5+(Math.random()-0.5)*5.5})}o.sort((i,a)=>i.score-a.score);for(let i of o)yield i.point;break}case"HUMAN_BLOBS":{let o=new Set,i=e*t;while(o.size<i){let a=Math.floor(Math.random()*e),r=Math.floor(Math.random()*t),n=1+Math.floor(Math.random()*4);for(let s=r-n;s<=r+n;s++)for(let l=a-n;l<=a+n;l++){if(l<0||l>=e||s<0||s>=t)continue;let c=Math.atan2(s-r,l-a),u=n+Math.sin(c*3+Math.random())*0.8;if(Math.hypot(l-a,s-r)>u)continue;let p=`${l},${s}`;if(o.has(p))continue;o.add(p),yield{x:l,y:s}}}break}case"HUMAN_BACKTRACK":{let o=new Set,i=[];for(let a=0;a<t;a++)for(let r=0;r<e;r++)i.push({x:r,y:a});i.sort((a,r)=>a.y-r.y+(Math.random()-0.5)*2.2+(a.x-r.x)*0.04);for(let a=0;a<i.length;a++){let r=i[a],n=`${r.x},${r.y}`;if(o.has(n))continue;if(o.add(n),yield r,a>1&&Math.random()>0.74){let s=i[a-1],l=`${s.x},${s.y}`;if(!o.has(l))o.add(l),yield s}}for(let a=0;a<t;a++)for(let r=0;r<e;r++){let n=`${r},${a}`;if(o.has(n))continue;yield{x:r,y:a}}break}case"HUMAN_SHAKY_DIAGONAL":{let o=[];for(let i=0;i<t;i++)for(let a=0;a<e;a++){let r=Math.abs(a-i)*0.6,n=Math.sin(a*1.4+i*0.8)*1.8+Math.cos(i*1.1+a*0.5)*1.5;o.push({point:{x:a,y:i},score:r+n+(Math.random()-0.5)*3.2})}o.sort((i,a)=>i.score-a.score);for(let i of o)yield i.point;break}case"HUMAN_LATE_FIXES":{let o=[],i=[];for(let a=0;a<t;a++)for(let r=0;r<e;r++)if(Math.random()>0.9)i.push({x:r,y:a});else o.push({x:r,y:a});o.sort((a,r)=>a.y-r.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?a.x-r.x:0)),i.sort((a,r)=>Math.hypot(r.x-e/2,r.y-t/2)-Math.hypot(a.x-e/2,a.y-t/2)),yield*o,yield*i;break}case"DIAGONAL_BRUSH":{for(let o=0;o<e+t-1;o++){let i=o%2===0,a=[],r=Math.max(0,o-e+1),n=Math.min(t-1,o);for(let s=r;s<=n;s++){let l=o-s;if(l>=0&&l<e)a.push({x:l,y:s})}if(Math.random()>0.55)a.reverse();if(i)for(let s=a.length-1;s>=0;s--)yield a[s];else yield*a}break}case"BRUSH_STROKES":{let o=Array.from({length:t},()=>Array(e).fill(!1)),i=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],a=(s,l)=>s>=0&&s<e&&l>=0&&l<t,r=0,n=e*t;for(let s=0;s<n*6&&r<n;s++){let l=Math.floor(Math.random()*e),c=Math.floor(Math.random()*t),u=i[Math.floor(Math.random()*i.length)],p=3+Math.floor(Math.random()*16);for(let h=0;h<p;h++){if(!a(l,c))break;if(!o[c][l])o[c][l]=!0,r++,yield{x:l,y:c};if(Math.random()>0.72)u=i[Math.floor(Math.random()*i.length)];l+=u.x,c+=u.y}}for(let s=0;s<t;s++)for(let l=0;l<e;l++)if(!o[s][l])yield{x:l,y:s};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let o=new Set,i=e*t,a=Math.floor(e/2),r=Math.floor(t/2),n=[[1,0],[0,1],[-1,0],[0,-1]],s=0,l=1,c=(p,h)=>p>=0&&p<e&&h>=0&&h<t,u=function*(){let p=0;while(p<i){for(let h=0;h<2;h++){for(let g=0;g<l;g++){if(c(a,r)){let b=`${a},${r}`;if(!o.has(b)){if(o.add(b),yield{x:a,y:r},p++,p>=i)return}}a+=n[s][0],r+=n[s][1]}s=(s+1)%4}l++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*u();else{let p=[...u()];for(let h=p.length-1;h>=0;h--)yield p[h]}break}case"SCRIBBLE":{let o=new Set,i=e*t,a=Math.floor(e/2),r=Math.floor(t/2);for(let n=0;o.size<i&&n<i*24;n++){let s=`${a},${r}`;if(!o.has(s))o.add(s),yield{x:a,y:r};if(a+=Math.floor(Math.random()*3)-1,r+=Math.floor(Math.random()*3)-1,a<0||a>=e||r<0||r>=t)a=Math.floor(Math.random()*e),r=Math.floor(Math.random()*t)}for(let n=0;n<t;n++)for(let s=0;s<e;s++){let l=`${s},${n}`;if(o.has(l))continue;o.add(l),yield{x:s,y:n}}break}case"CROSSHATCH":{let o=[];for(let r=0;r<e+t-1;r++)for(let n=Math.max(0,r-e+1);n<=Math.min(t-1,r);n++){let s=r-n;o.push({x:s,y:n})}let i=[];for(let r=-t+1;r<e;r++)for(let n=0;n<t;n++){let s=n+r;if(s>=0&&s<e)i.push({x:s,y:n})}let a=new Set;for(let r of[...o,...i]){let n=`${r.x},${r.y}`;if(a.has(n))continue;a.add(n),yield r}break}case"WAVE_SWEEP":{let o=new Set;for(let i=0;i<e;i++){let r=(Math.sin(i/Math.max(1,e-1)*Math.PI*4)+1)*0.5*(t-1)|0;for(let n=0;n<t;n++){let s=r+n,l=r-n;for(let c of[s,l]){if(c<0||c>=t)continue;let u=`${i},${c}`;if(o.has(u))continue;o.add(u),yield{x:i,y:c}}}}break}case"SCATTERED_LINES":{let o=new Set,i=e*t;for(let a=0;o.size<i&&a<i*14;a++){let r=Math.floor(Math.random()*e),n=Math.floor(Math.random()*t),s=Math.random()*Math.PI*2,l=Math.round(Math.cos(s)),c=Math.round(Math.sin(s)),u=6+Math.floor(Math.random()*28);for(let p=0;p<u;p++){if(r<0||r>=e||n<0||n>=t)break;let h=`${r},${n}`;if(!o.has(h))o.add(h),yield{x:r,y:n};r+=l,n+=c}}for(let a=0;a<t;a++)for(let r=0;r<e;r++){let n=`${r},${a}`;if(o.has(n))continue;o.add(n),yield{x:r,y:a}}break}case"CONTOUR_JITTER":{let o=new Set;for(let i=0;i<Math.ceil(Math.min(e,t)/2);i++){let a=[],r=i,n=i,s=e-i-1,l=t-i-1;for(let c=r;c<=s;c++)a.push({x:c,y:n});for(let c=n+1;c<=l;c++)a.push({x:s,y:c});for(let c=s-1;c>=r;c--)a.push({x:c,y:l});for(let c=l-1;c>n;c--)a.push({x:r,y:c});for(let c=a.length-1;c>0;c--){let u=Math.floor(Math.random()*(c+1)),p=a[c];a[c]=a[u],a[u]=p}for(let c of a){let u=`${c.x},${c.y}`;if(o.has(u))continue;o.add(u),yield c}}break}case"SPIRAL_WOBBLE":{let o=new Set,i=e/2,a=t/2,r=Math.hypot(i,a);for(let n=0;o.size<e*t&&n<e*t*9;n++){let s=n/(e*t*9)*r,l=n*0.31+Math.sin(n*0.07)*0.7,c=Math.round(i+Math.cos(l)*s),u=Math.round(a+Math.sin(l)*s);if(c<0||c>=e||u<0||u>=t)continue;let p=`${c},${u}`;if(o.has(p))continue;o.add(p),yield{x:c,y:u}}for(let n=0;n<t;n++)for(let s=0;s<e;s++){let l=`${s},${n}`;if(o.has(l))continue;yield{x:s,y:n}}break}case"CLUSTER_BURSTS":{let o=new Set,i=e*t;for(let a=0;o.size<i&&a<i*12;a++){let r=Math.floor(Math.random()*e),n=Math.floor(Math.random()*t),s=2+Math.floor(Math.random()*10);for(let l=n-s;l<=n+s;l++)for(let c=r-s;c<=r+s;c++){if(c<0||c>=e||l<0||l>=t)continue;if(Math.hypot(c-r,l-n)>s)continue;let u=`${c},${l}`;if(o.has(u))continue;o.add(u),yield{x:c,y:l}}}for(let a=0;a<t;a++)for(let r=0;r<e;r++){let n=`${r},${a}`;if(o.has(n))continue;o.add(n),yield{x:r,y:a}}break}case"ORBITAL":{let o=new Set,i=(e-1)/2,a=(t-1)/2,r=Math.ceil(Math.max(i,a));for(let n=0;n<=r;n++){let s=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,n)*2));for(let l=0;l<s;l++){let c=l/s*Math.PI*2+(n%2?0.3:-0.3),u=Math.round(i+Math.cos(c)*n),p=Math.round(a+Math.sin(c)*n);if(u<0||u>=e||p<0||p>=t)continue;let h=`${u},${p}`;if(o.has(h))continue;o.add(h),yield{x:u,y:p}}}for(let n=0;n<t;n++)for(let s=0;s<e;s++){let l=`${s},${n}`;if(o.has(l))continue;yield{x:s,y:n}}break}case"FLOW_FIELD":{let o=new Set,i=e*t;for(let a=0;o.size<i&&a<i*18;a++){let r=Math.floor(Math.random()*e),n=Math.floor(Math.random()*t);for(let s=0;s<120;s++){if(r<0||r>=e||n<0||n>=t)break;let l=`${r},${n}`;if(!o.has(l))o.add(l),yield{x:r,y:n};let c=Math.sin(r*0.09)*1.8+Math.cos(n*0.08)*1.6+Math.sin((r+n)*0.05);r+=Math.round(Math.cos(c)),n+=Math.round(Math.sin(c))}}for(let a=0;a<t;a++)for(let r=0;r<e;r++){let n=`${r},${a}`;if(o.has(n))continue;o.add(n),yield{x:r,y:a}}break}case"EDGE_IN":{let o=new Set,i=Math.ceil(Math.min(e,t)/2);for(let a=0;a<i;a++){let r=a,n=e-1-a,s=a,l=t-1-a;for(let c=r;c<=n;c++)for(let u of[s,l]){let p=`${c},${u}`;if(o.has(p))continue;o.add(p),yield{x:c,y:u}}for(let c=s+1;c<=l-1;c++)for(let u of[r,n]){let p=`${u},${c}`;if(o.has(p))continue;o.add(p),yield{x:u,y:c}}}break}}}moveStart(e){if(e.button!==0)return;if(e.preventDefault(),e.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:e.clientX,clientY:e.clientY},this.trackAction("image_move_started",{source:"image_panel",screenPosition:{x:e.clientX,y:e.clientY}})}moveStop(){if(this.moveInfo){let e=this.moveInfo,t=e.width!==void 0||e.height!==void 0?"resize":"move";this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),A(this.bot),this.trackAction(t==="resize"?"image_resized":"image_moved",{source:"image_panel",mode:t,previous:{globalX:e.globalX,globalY:e.globalY,width:e.width,height:e.height}})}}move(e){if(!this.moveInfo)return;let t=Math.round((e.clientX-this.moveInfo.clientX)/this.position.pixelSize),o=Math.round((e.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=t+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-t)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,t+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=o+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-o)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,o+this.moveInfo.height);this.update(),A(this.bot)}resizeStart(e){if(this.lock||e.button!==0)return;e.preventDefault(),e.stopPropagation(),this.moveInfo={clientX:e.clientX,clientY:e.clientY};let t=e.target;if(t.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(t.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(t.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(t.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX;this.trackAction("image_resize_started",{source:"image_panel",handles:Array.from(t.classList).filter((o)=>["n","e","s","w"].includes(o)),width:this.pixels.width,height:this.pixels.height,screenPosition:{x:e.clientX,y:e.clientY}})}export(){let e=document.createElement("a");document.body.append(e),e.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),e.download=`${this.pixels.width}x${this.pixels.height}.${J}`,e.click(),URL.revokeObjectURL(e.href),e.href=this.pixels.canvas.toDataURL("image/webp",1),e.download=`${this.pixels.width}x${this.pixels.height}.webp`,e.click(),URL.revokeObjectURL(e.href),e.remove()}}function Ee(){let e=localStorage.getItem("kglacer-macro:shield-config");if(!e)return!1;try{return JSON.parse(e).enabled!==!1}catch{return!1}}function Ve(e){localStorage.setItem("kglacer-macro:shield-config",JSON.stringify({enabled:e}))}function Bt(e){let t=`${e?.host??""} ${e?.username??""}`.toLowerCase(),o=/(mx|mex|mexico)/.test(t)?"MX":"AUTO";localStorage.setItem("__afm_proxy_hint",o)}function Xe(e){if(!Ee())return;if(document.getElementById("kgm-shield-full"))return;Bt(e);let t=document.createElement("script");t.id="kgm-shield-full",t.textContent=`// ==UserScript==
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
})();`,document.documentElement.append(t),t.remove()}var Je=`/* stylelint-disable declaration-no-important */
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

.maplibregl-marker[title*='KGLACER_MACRO_FAVORITE'],
.maplibregl-marker[aria-label*='KGLACER_MACRO_FAVORITE'] {
  opacity: 0 !important;
  pointer-events: none !important;
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
`;class me extends Error{name="KGlacerMacroError";constructor(e,t){super(e);t.widget.status=e}}class Te extends me{name="NoImageError";constructor(e){super("❌ No image is selected",e)}}var v={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0},startAutoFarm:{key:"f",shift:!0},stopAutoFarm:{key:"g",shift:!0},openColorConverterTool:{key:"1",shift:!0},openSamuelArchiveTool:{key:"2",shift:!0},openEralyonArchiveTool:{key:"3",shift:!0},openReceiveSmssTool:{key:"4",shift:!0},openEsimplusTool:{key:"5",shift:!0},openReceiveSmsFreeTool:{key:"6",shift:!0},openQuackrTool:{key:"7",shift:!0},openTextverifiedTool:{key:"8",shift:!0}};function k(e,t){let o=t.key.toLowerCase(),i=e.key.toLowerCase(),a=(e.code??"").toLowerCase(),r=o==="/"&&(i==="/"||i==="?"||a==="slash"),n=t.shift===!0&&/^\d$/.test(o)&&(a===`digit${o}`||a===`numpad${o}`),s=r||n||i===o,l=t.ctrl===!0?e.ctrlKey||e.metaKey:!e.ctrlKey,c=t.ctrl===!0?!0:t.meta===!0?e.metaKey:!e.metaKey;return s&&e.shiftKey===Boolean(t.shift)&&l&&c&&e.altKey===Boolean(t.alt)}function Ze(e){if(typeof HTMLElement>"u")return!1;if(!(e instanceof HTMLElement))return!1;let t=e.tagName.toLowerCase();return t==="input"||t==="textarea"||e.isContentEditable||e.closest('[contenteditable="true"]')!==null}var Qe=`<button class="wopen-button" aria-label="Toggle widget">\r
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
    <div class="widget-section-head">\r
      <strong class="widget-section-title" data-i18n="generalSection">General</strong>\r
      <button class="open-config open-config-toggle" title="Open settings">\r
        <i class="fa-solid fa-sliders"></i>\r
        <span data-i18n="openConfig">Config</span>\r
      </button>\r
    </div>\r
    <div class="mobile-controls" aria-label="Mobile controls">\r
      <button class="mobile-minimize" type="button">\r
        <i class="fa-solid fa-compress" aria-hidden="true"></i>\r
        <span data-i18n="mobileMinimize">Hide panel</span>\r
      </button>\r
      <button class="mobile-settings" type="button">\r
        <i class="fa-solid fa-sliders" aria-hidden="true"></i>\r
        <span data-i18n="openConfig">Config</span>\r
      </button>\r
      <button class="mobile-scroll-images" type="button">\r
        <i class="fa-solid fa-images" aria-hidden="true"></i>\r
        <span data-i18n="imagesSection">Images</span>\r
      </button>\r
    </div>\r
    <div class="wp wstatus"></div>\r
  </section>\r
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
  <details class="widget-section widget-section-images" open>\r
    <summary class="widget-section-summary">\r
      <strong class="widget-section-title" data-i18n="imagesSection">Images</strong>\r
      <span class="images-collapse-state" data-i18n="widgetImagesCollapse">Collapse images</span>\r
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>\r
    </summary>\r
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
`;var et="kglacer-macro:overlay-hidden",tt="kglacer-macro:images-collapsed",ot="kglacer-macro:auto-farm-config",it="kglacer-macro:auto-overlay-config",at="kglacer-macro:proxy-config",rt="__afm_proxy_hint",Gt=["https://api.ipify.org?format=json","https://icanhazip.com"],jt="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg",Yt="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/version.ts",nt="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/dist.user.js",qt="https://pepoafonso.github.io/color_converter_wplace/es/index.html",st="https://wplace.samuelscheit.com/",lt="https://wplace.eralyon.net/",ct="v69.051",Kt="https://receive-smss.com/",Vt="https://esimplus.me/temporary-numbers",Xt="https://receive-sms-free.cc/",Jt="https://quackr.io/?srsltid=AfmBOoqu2h3Pt6-h3HtJ_tixaj5WGtA7ZaI9sLQiQnPTnisDxe0MXbje",Zt="https://www.textverified.com/free";class Me extends te{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(e){this.$status.innerHTML=e}get open(){return this.element.classList.contains("wopen")}set open(e){if(e)this.element.classList.add("wopen");else this.element.classList.remove("wopen");let t=this.element.querySelector(".wopen-button");if(!t)return;t.setAttribute("aria-expanded",String(e)),t.setAttribute("aria-label",e?d("mobileMinimize"):d("mobileShowPanel")),t.title=e?d("mobileMinimize"):d("mobileShowPanel")}$settings;$status;$openConfig;$mobileMinimize;$mobileSettings;$mobileScrollImages;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toolColorConverter;$toolSamuelArchive;$toolEralyonArchive;$toolReceiveSmss;$toolEsimplus;$toolReceiveSmsFree;$toolQuackr;$toolTextverified;$toggleOverlay;$autofarmConfig;$autofarmStart;$autofarmStop;$autofarmStatus;$autoOverlayConfig;$autoOverlayStart;$autoOverlayStop;$autoOverlayStatus;$strategy;$progressLine;$progressText;$images;$imagesSection;$imagesCollapseState;$wopenButton;$widgetLogo;activeImageIndex=-1;autoFarmIntervalId;autoFarmConfig;autoFarmTickRunning=!1;autoFarmPendingTick=!1;autoFarmNextTickAt;autoOverlayIntervalId;autoOverlayConfig;autoOverlayTickRunning=!1;autoOverlayPendingTick=!1;autoOverlayNextTickAt;statusRefreshIntervalId;challengeWatcherObserver;challengeWatcherRunning=!1;imagesListDirty=!0;constructor(e){super();this.bot=e;this.element.classList.add("wwidget"),this.element.innerHTML=Qe,I(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$openConfig:".open-config",$mobileMinimize:".mobile-minimize",$mobileSettings:".mobile-settings",$mobileScrollImages:".mobile-scroll-images",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toolColorConverter:".tool-color-converter",$toolSamuelArchive:".tool-samuel-archive",$toolEralyonArchive:".tool-eralyon-archive",$toolReceiveSmss:".tool-receive-smss",$toolEsimplus:".tool-esimplus",$toolReceiveSmsFree:".tool-receive-sms-free",$toolQuackr:".tool-quackr",$toolTextverified:".tool-textverified",$toggleOverlay:".toggle-overlay",$autofarmConfig:".autofarm-config",$autofarmStart:".autofarm-start",$autofarmStop:".autofarm-stop",$autofarmStatus:".autofarm-status",$autoOverlayConfig:".autooverlay-config",$autoOverlayStart:".autooverlay-start",$autoOverlayStop:".autooverlay-stop",$autoOverlayStatus:".autooverlay-status",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images",$imagesSection:".widget-section-images",$imagesCollapseState:".images-collapse-state"}),this.$widgetLogo.src=jt,this.$wopenButton.addEventListener("click",()=>{this.open=!this.open,this.trackAction("widget_panel_toggled",{source:"widget_button",open:this.open})}),this.$draw.addEventListener("click",()=>{this.trackAction("draw_button_clicked",{source:"widget_button"}),this.bot.draw()}),this.$drawAndPaint.addEventListener("click",()=>{this.trackAction("draw_and_paint_button_clicked",{source:"widget_button"}),this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>{this.trackAction("add_image_button_clicked",{source:"widget_button"}),this.addImage().catch(()=>{return})}),this.$openConfig.addEventListener("click",()=>{this.trackAction("settings_opened",{source:"widget_button"}),this.openSettingsModal()}),this.$mobileMinimize.addEventListener("click",()=>{this.open=!1,this.trackAction("widget_panel_minimized",{source:"mobile_button"})}),this.$mobileSettings.addEventListener("click",()=>{this.trackAction("settings_opened",{source:"mobile_button"}),this.openSettingsModal()}),this.$mobileScrollImages.addEventListener("click",()=>{this.open=!0,this.$imagesSection.open=!0,this.$imagesSection.scrollIntoView({behavior:"smooth",block:"start"}),this.trackAction("mobile_scroll_images_clicked",{source:"mobile_button"})}),this.$captureTemplate.addEventListener("click",()=>{this.trackAction("capture_template_button_clicked",{source:"widget_button"}),this.captureTemplate()}),this.$toolColorConverter.addEventListener("click",()=>{this.openExternalTool("colorConverter")}),this.$toolSamuelArchive.addEventListener("click",()=>{this.openExternalTool("samuelArchive")}),this.$toolEralyonArchive.addEventListener("click",()=>{this.openExternalTool("eralyonArchive")}),this.$toolReceiveSmss.addEventListener("click",()=>{this.openExternalTool("receiveSmss")}),this.$toolEsimplus.addEventListener("click",()=>{this.openExternalTool("esimplus")}),this.$toolReceiveSmsFree.addEventListener("click",()=>{this.openExternalTool("receiveSmsFree")}),this.$toolQuackr.addEventListener("click",()=>{this.openExternalTool("quackr")}),this.$toolTextverified.addEventListener("click",()=>{this.openExternalTool("textverified")}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$autofarmConfig.addEventListener("click",()=>{this.trackAction("auto_farm_config_opened",{source:"widget_button"}),this.openAutoFarmModal()}),this.$autofarmStart.addEventListener("click",()=>{this.trackAction("auto_farm_start_clicked",{source:"widget_button"}),this.startAutoFarm()}),this.$autofarmStop.addEventListener("click",()=>{this.trackAction("auto_farm_stop_clicked",{source:"widget_button"}),this.stopAutoFarm()}),this.$autoOverlayConfig.addEventListener("click",()=>{this.trackAction("auto_draw_config_opened",{source:"widget_button"}),this.openAutoOverlayModal()}),this.$autoOverlayStart.addEventListener("click",()=>{this.trackAction("auto_draw_start_clicked",{source:"widget_button"}),this.startAutoOverlay()}),this.$autoOverlayStop.addEventListener("click",()=>{this.trackAction("auto_draw_stop_clicked",{source:"widget_button"}),this.stopAutoOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value,this.trackAction("bot_strategy_changed",{source:"widget_select",strategy:this.bot.strategy})}),this.applyImagesCollapsedPreference(),this.$imagesSection.addEventListener("toggle",()=>{if(this.persistImagesCollapsedPreference(!this.$imagesSection.open),this.refreshImagesCollapseText(),this.trackAction("widget_images_section_toggled",{source:"widget_details",open:this.$imagesSection.open,collapsed:!this.$imagesSection.open,images:this.bot.images.length}),!this.$imagesSection.open||!this.imagesListDirty)return;this.renderImagesList(),this.imagesListDirty=!1}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.loadAutoFarmConfigFromStorage(),this.loadAutoOverlayConfigFromStorage(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.statusRefreshIntervalId=window.setInterval(()=>{this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.refreshProgress()},1000),this.open=!0,window.setTimeout(()=>{this.recommendUpdateIfOutdated()},2500),console.log("[KGM][Widget] Widget mounted and opened")}trackAction(e,t={}){this.bot.trackAction(e,{source:"widget",...t})}imageTelemetry(e){let t=this.bot.images[e];if(!t)return{index:e,missing:!0};return this.bot.summarizeImageForTelemetry(t,e)}fileTelemetry(e){return{name:e.name,size:e.size,type:e.type,lastModified:e.lastModified,extension:e.name.includes(".")?e.name.split(".").pop()?.toLowerCase():""}}startChallengeWatcher(){let e=()=>{if(!this.isChallengeBlockingPaint())return;if(this.challengeWatcherRunning)return;this.challengeWatcherRunning=!0,this.status=`⌛ ${d("taskWaitingChallengeResolve")}`,this.waitForChallengeToResolve().finally(()=>{this.challengeWatcherRunning=!1})};this.challengeWatcherObserver=new MutationObserver(()=>{e()}),this.challengeWatcherObserver.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["open","style","class","value","aria-hidden"]});let t=window.setInterval(e,750);this.runOnDestroy.push(()=>{this.challengeWatcherObserver?.disconnect(),clearInterval(t)}),e()}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.trackAction("image_add_started",{source:"widget"}),this.setDisabled("add-image",!0),this.run(d("taskAddingImage"),async()=>{let e;try{let t=document.createElement("input");t.type="file",t.accept=`image/*,.${J},.wplace`;let o=D(t,["change"],["cancel","error"]);t.click(),await o;let i=t.files?.[0];if(!i)throw new Te(this.bot);e=this.fileTelemetry(i),this.trackAction("image_file_selected",{source:"file_picker",file:e}),console.log("[KGM][Widget] File selected",{name:i.name,size:i.size,type:i.type}),await this.bot.updateColors();let a;if(i.name.endsWith(`.${J}`))a=await L.fromJSON(this.bot,JSON.parse(await i.text()));else if(i.name.endsWith(".wplace")){let n=JSON.parse(await i.text());if(!n.image?.dataUrl)throw Error("Invalid .wplace file: image.dataUrl missing");let s=new Image,l=D(s,["load"],["error"]);if(s.src=n.image.dataUrl,await l,await this.waitForStableViewportProjection(),a=new L(this.bot,E.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new H(this.bot,s)),typeof n.opacity==="number")a.opacity=Math.max(0,Math.min(1,n.opacity))*100}else{let n=new FileReader,s=D(n,["load"],["error"]);n.readAsDataURL(i),await s;let l=await this.compressImageBeforeLoad(n.result),c=new Image,u=D(c,["load"],["error"]);c.src=l,await u,await this.waitForStableViewportProjection(),a=new L(this.bot,E.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new H(this.bot,c))}this.bot.images.push(a);let r=this.bot.images.length-1;console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),this.trackAction("image_loaded",{source:"file_picker",file:e,image:this.imageTelemetry(r),images:this.bot.images.length}),await this.bot.readMap(),a.updateTasks(),A(this.bot,!0),this.bot.updateTasks(),this.update(),a.update()}catch(t){throw this.trackAction("image_load_failed",{source:"file_picker",file:e??null,reason:t instanceof Error?t.message:"unknown"}),t}},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.trackAction("capture_template_started",{source:"widget"}),this.run(d("taskCapturingMapImage"),async()=>{try{let e=await this.resolveCaptureBounds(),{minGlobalX:t,minGlobalY:o,maxGlobalX:i,maxGlobalY:a}=e;this.trackAction("capture_template_area_selected",{source:"widget",selection:e,width:i-t+1,height:a-o+1});let r=document.createElement("canvas");r.width=Math.max(1,i-t+1),r.height=Math.max(1,a-o+1);let n=r.getContext("2d");if(!n)throw Error("Capture context unavailable");n.imageSmoothingEnabled=!1;let s=Math.floor(t/U),l=Math.floor(o/U),c=Math.floor(i/U),u=Math.floor(a/U),p=(c-s+1)*(u-l+1),h=0;for(let b=s;b<=c;b++)for(let y=l;y<=u;y++){this.status=`⌛ ${d("taskReadingTiles")} [${++h}/${p}]`;let m=await this.loadTileImage(b,y),f=b*U,w=y*U,x=Math.max(t,f),C=Math.min(i,f+U-1),S=Math.max(o,w),M=Math.min(a,w+U-1),T=x-f,R=S-w,X=C-x+1,O=M-S+1,ae=x-t,re=S-o;n.drawImage(m,T,R,X,O,ae,re,X,O)}let g=Date.now();await this.downloadCapture(r,"png",g),this.trackAction("capture_template_completed",{source:"widget",selection:e,width:r.width,height:r.height,totalTiles:p,format:"png"})}catch(e){throw this.trackAction("capture_template_failed",{source:"widget",reason:e instanceof Error?e.message:"unknown"}),e}},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(e,t,o){let i=t==="webp"?"image/webp":"image/png",a=await new Promise((s,l)=>{e.toBlob((c)=>{if(!c){l(Error(`Failed to create ${t.toUpperCase()} capture file`));return}s(c)},i)}),r=URL.createObjectURL(a),n=document.createElement("a");n.href=r,n.download=`wplace-capture-${o}.${t}`,n.click(),URL.revokeObjectURL(r)}async loadTileImage(e,t){let o;for(let i=1;i<=3;i++)try{let a=new Image;return a.crossOrigin="anonymous",a.referrerPolicy="no-referrer",a.src=`https://backend.wplace.live/files/s0/tiles/${e}/${t}.png?ts=${Date.now()}-${i}`,await D(a,["load"],["error"]),a}catch(a){if(o=a,i<3)await new Promise((r)=>setTimeout(r,i*200))}throw o instanceof Error?o:Error(`Tile fetch failed (${e}/${t})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((e,t)=>{let o=document.createElement("div");o.className="kgm-capture-overlay",o.innerHTML=`<div class="kgm-capture-hint">${d("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let i=o.querySelector(".kgm-capture-box");document.body.append(o);let a,r,n=()=>{window.removeEventListener("keydown",p,!0),o.removeEventListener("pointermove",c),o.removeEventListener("pointerdown",u),o.remove()},s=(h)=>{let g=Math.min(a.x,h.x),b=Math.min(a.y,h.y),y=Math.abs(a.x-h.x)+1,m=Math.abs(a.y-h.y)+1;return{left:g,top:b,width:y,height:m}},l=(h)=>{let{left:g,top:b,width:y,height:m}=s(h);i.style.left=`${g}px`,i.style.top=`${b}px`,i.style.width=`${y}px`,i.style.height=`${m}px`},c=(h)=>{if(!a)return;l({x:h.clientX,y:h.clientY})},u=(h)=>{if(h.preventDefault(),!a){a={x:h.clientX,y:h.clientY};let x=E.fromScreenPosition(this.bot,a);r={x:x.globalX,y:x.globalY},l(a);return}let g={x:h.clientX,y:h.clientY},b=E.fromScreenPosition(this.bot,g);if(n(),!r){t(Error("Capture anchor point unavailable"));return}let y=Math.min(r.x,b.globalX),m=Math.min(r.y,b.globalY),f=Math.max(r.x,b.globalX),w=Math.max(r.y,b.globalY);if(f-y<1||w-m<1){t(Error("Capture area too small"));return}e({minGlobalX:y,minGlobalY:m,maxGlobalX:f,maxGlobalY:w})},p=(h)=>{if(h.key!=="Escape")return;n(),t(Error("Capture cancelled"))};window.addEventListener("keydown",p,!0),o.addEventListener("pointermove",c),o.addEventListener("pointerdown",u)})}defaultImageScreenPosition(){let e=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,e),y:32}}async compressImageBeforeLoad(e){let t=new Image,o=D(t,["load"],["error"]);if(t.src=e,await o,!(t.naturalWidth*t.naturalHeight>3000000||e.length>3000000))return e;let a=document.createElement("canvas");a.width=t.naturalWidth,a.height=t.naturalHeight;let r=a.getContext("2d");if(!r)return e;return r.drawImage(t,0,0),a.toDataURL("image/png")}async waitForStableViewportProjection(){let e=this.defaultImageScreenPosition(),t=0,o;for(let i=0;i<45;i++){await new Promise((c)=>requestAnimationFrame(()=>{c()}));let{anchorScreenPosition:{x:a,y:r},pixelSize:n}=this.bot.findAnchorsForScreen(e);if(!Number.isFinite(n)||n<=0){t=0;continue}let s={anchorX:a,anchorY:r,pixelSize:n};if(!o){o=s,t=1;continue}if(Math.abs(s.anchorX-o.anchorX)+Math.abs(s.anchorY-o.anchorY)+Math.abs(s.pixelSize-o.pixelSize)<0.0012)t++;else t=0;if(o=s,t>=3)return}}update(){if(this.$strategy.value=this.bot.strategy,this.refreshProgress(),this.imagesListDirty=!0,!this.$imagesSection.open)return;this.renderImagesList(),this.imagesListDirty=!1}renderImagesList(){this.$images.innerHTML="";let e=document.createDocumentFragment();for(let t=0;t<this.bot.images.length;t++){let o=this.bot.images[t],i=document.createElement("div");e.append(i),i.className="image",i.innerHTML=`<button class="preview" title="View preview">
  <img src="${o.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="focus-map" title="Go to image position"><i class="fa-solid fa-location-crosshairs" aria-hidden="true"></i></button>
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="strategy-modal" title="Strategy modal"><i class="fa-solid fa-sliders" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${t===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${t===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,i.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=t,this.trackAction("image_preview_opened",{source:"image_controls",image:this.imageTelemetry(t)}),o.openPreviewPanel()}),i.querySelector(".focus-map").addEventListener("click",()=>{this.activeImageIndex=t,this.trackAction("image_focus_requested",{source:"image_controls",image:this.imageTelemetry(t)}),o.position.scrollScreenTo()}),i.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=t,this.trackAction("image_colors_opened",{source:"image_controls",image:this.imageTelemetry(t)}),o.openColorPanel()}),i.querySelector(".strategy-modal").addEventListener("click",()=>{this.activeImageIndex=t,this.trackAction("image_strategy_modal_opened",{source:"image_controls",image:this.imageTelemetry(t)}),o.openPreviewPanel()}),i.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=t,this.trackAction("image_strategy_preview_opened",{source:"image_controls",image:this.imageTelemetry(t)}),o.openPreviewPanel()}),i.querySelector(".download").addEventListener("click",()=>{this.trackAction("image_settings_downloaded",{source:"image_controls",image:this.imageTelemetry(t)}),o.exportImage()}),i.querySelector(".delete").addEventListener("click",()=>{this.trackAction("image_deleted",{source:"image_controls",image:this.imageTelemetry(t)}),o.destroy()}),i.querySelector(".up").addEventListener("click",()=>{this.trackAction("image_reordered",{source:"image_controls",direction:"up",fromIndex:t,toIndex:t-1,image:this.imageTelemetry(t)}),be(this.bot.images,t,t-1),this.update(),A(this.bot)}),i.querySelector(".down").addEventListener("click",()=>{this.trackAction("image_reordered",{source:"image_controls",direction:"down",fromIndex:t,toIndex:t+1,image:this.imageTelemetry(t)}),be(this.bot.images,t,t+1),this.update(),A(this.bot)})}this.$images.append(e)}refreshProgress(){let e=0,t=0;for(let a=0;a<this.bot.images.length;a++){let r=this.bot.images[a];e+=r.pixels.pixels.length*r.pixels.pixels[0].length,t+=r.tasks.length}let o=Math.max(0,e-t),i=e>0?o/e*100|0:0;this.$progressText.textContent=`${o}/${e} ${i}% ETA: ${t/120|0}h`,this.$progressLine.style.transform=`scaleX(${i/100})`}syncOverlayVisibilityFromStorage(){let e=localStorage.getItem(et)==="true";document.body.classList.toggle("overlay-hidden",e),this.refreshOverlayToggleText()}toggleOverlay(e){let t=e??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",t),localStorage.setItem(et,String(t)),this.refreshOverlayToggleText(),this.trackAction("overlay_visibility_changed",{source:"widget",hidden:t})}refreshOverlayToggleText(){let e=document.body.classList.contains("overlay-hidden"),t=e?d("disabled"):d("enabled"),o=e?'<i class="fa-solid fa-circle-xmark" aria-hidden="true"></i>':'<i class="fa-solid fa-circle-check" aria-hidden="true"></i>';this.$toggleOverlay.innerHTML=`<i class="fa-solid fa-layer-group"></i><span>${d("toggleOverlay")} (${t})</span>${o}`}applyLocaleToUI(e){ge(e),I(this.element);for(let t=0;t<this.bot.images.length;t++)this.bot.images[t].applyLocale();this.refreshOverlayToggleText(),this.refreshImagesCollapseText(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText()}applyImagesCollapsedPreference(){let e=this.readImagesCollapsedPreference();if(this.$imagesSection.open=!e,this.refreshImagesCollapseText(),this.$imagesSection.open&&this.imagesListDirty)this.renderImagesList(),this.imagesListDirty=!1}readImagesCollapsedPreference(){let e=localStorage.getItem(tt);if(e==="true")return!0;if(e==="false")return!1;return ue().imagesCollapsed??!1}persistImagesCollapsedPreference(e){localStorage.setItem(tt,String(e)),Z({imagesCollapsed:e})}refreshImagesCollapseText(){this.$imagesCollapseState.textContent=this.$imagesSection.open?d("widgetImagesCollapse"):d("widgetImagesExpand")}openSettingsModal(){let e=document.createElement("dialog");e.className="kgm-modal autofarm-dialog",e.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="settingsModalTitle">Settings</strong>
    <button type="button" class="modal-close" aria-label="${d("close")}"><span class="icon">×</span></button>
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
</form>`,document.body.append(e),I(e);let t=e.querySelector(".settings-locale");t.value=ee(),e.querySelector(".script-update").addEventListener("click",()=>{this.openScriptUpdateUrl("settings_modal")}),t.addEventListener("change",()=>{this.applyLocaleToUI(t.value),I(e),this.trackAction("settings_locale_changed",{source:"settings_modal",locale:t.value})});let o=JSON.parse(localStorage.getItem(at)??"{}"),i=e.querySelector(".proxy-enabled"),a=e.querySelector(".proxy-host"),r=e.querySelector(".proxy-port"),n=e.querySelector(".proxy-user"),s=e.querySelector(".proxy-pass"),l=e.querySelector(".shield-enabled"),c=e.querySelector(".proxy-settings"),u=e.querySelector(".shield-settings"),p=e.querySelector(".shield-controls"),h=e.querySelector(".proxy-test"),g=e.querySelector(".proxy-test-output"),b=e.querySelector(".public-ip-value"),y=e.querySelector(".public-ip-route"),m=e.querySelector(".account-info-refresh"),f=e.querySelector(".account-info-output"),w=async()=>{m.disabled=!0,await this.renderAccountInfoOutput(f),m.disabled=!1};m.addEventListener("click",async()=>{this.trackAction("settings_account_refresh_clicked",{source:"settings_modal"}),await this.bot.refreshControlAccess("settings").catch(()=>null),await w()}),w(),i.checked=Boolean(o.enabled),l.checked=Ee(),c.open=i.checked,u.open=l.checked,this.renderShieldControls(p),a.value=o.host??"",r.value=o.port??"",n.value=o.username??"",s.value=o.password??"";let x=(S=!0)=>{let M=i.checked,T=a.value.trim(),R=r.value.trim();if(localStorage.setItem(at,JSON.stringify({enabled:M,host:T,port:R,username:n.value.trim(),password:s.value})),localStorage.setItem(rt,M&&T&&R?`${T}:${R}`:"DIRECT/SHIELD"),S)this.trackAction("proxy_settings_changed",{source:"settings_modal",enabled:M,host:T,port:R,hasUsername:Boolean(n.value.trim()),hasPassword:Boolean(s.value)})},C=async()=>{if(b)b.textContent=d("publicIpChecking");if(y)y.textContent=this.getPublicIpRouteLabel({enabled:i.checked,host:a.value.trim(),port:r.value.trim()});let S=await this.fetchPublicIp();if(b)b.textContent=S??d("publicIpUnavailable")};for(let S of[i,a,r,n,s])S.addEventListener("change",()=>{x(),C()});i.addEventListener("change",()=>{c.open=i.checked}),x(!1),C(),h.addEventListener("click",async()=>{x();let S=a.value.trim(),M=r.value.trim();if(this.trackAction("proxy_test_started",{source:"settings_modal",host:S,port:M}),h.disabled=!0,g)g.innerHTML=`<div class="pending">⏳ ${d("proxyTesting")}</div>`;let T=await this.testProxyConnection(S,M);if(await C(),g)g.innerHTML=`<div class="${T?"ok":"fail"}">${T?"✅":"❌"} ${T?d("proxyOk"):d("proxyFail")}</div>`;else alert(T?d("proxyOk"):d("proxyFail"));this.trackAction("proxy_test_completed",{source:"settings_modal",host:S,port:M,ok:T}),h.disabled=!1}),l.addEventListener("change",()=>{u.open=l.checked,this.renderShieldControls(p),Ve(l.checked),this.trackAction("shield_enabled_changed",{source:"settings_modal",enabled:l.checked}),window.setTimeout(()=>{location.reload()},120)}),e.querySelector(".modal-close").onclick=()=>{e.close(),e.remove()},e.addEventListener("close",()=>{e.remove()}),e.showModal()}async renderAccountInfoOutput(e){e.innerHTML=`<div class="pending">⌛ ${d("accountInfoLoading")}</div>`;let t=this.bot.getControlSession(),[o,i,a]=await Promise.all([this.bot.fetchAccountInfo(!0).catch(()=>null),this.bot.getAccountCookieStatus({force:!0,exhaustive:!0,timeoutMs:3000}).catch(()=>({hasToken:!1,source:"none",token:null})),pe().catch(()=>null)]),r=t?.access,n=t?.serial,s=[[d("settingsAccessStatus"),r?.allowed===!1?d("disabled"):d("enabled")],[d("settingsApiMode"),r?.mode??"—"],[d("settingsControlUser"),t?d("enabled"):d("disabled")],[d("settingsLicenseUser"),n?.username??r?.username??"—"],[d("settingsSerialStatus"),n?.status??(n?.valid?"active":"—")],[d("settingsSerialValidatedAt"),n?.validatedAt??"—"],[d("settingsLicenseOwner"),n?.ownerName??"—"],[d("settingsDeviceLimit"),this.formatDeviceLimit(r,n)],[d("settingsCookieJ"),i.hasToken?`${d("settingsCookieJDetected")} · ${i.token??"—"}`:d("settingsCookieJNotDetected")],[d("settingsCookieSource"),i.source],[d("settingsWplaceId"),o?.id??"—"],[d("settingsWplaceName"),o?.name??"—"],[d("settingsDiscord"),o?.discord??"—"],[d("settingsDiscordId"),o?.discordId??"—"],[d("settingsCountry"),o?.country??"—"],[d("settingsAlliance"),o?.allianceName??"—"],[d("settingsAllianceRole"),o?.allianceRole??"—"],[d("settingsLevel"),o?.level??"—"],[d("settingsPixelsPainted"),o?.pixelsPainted??"—"],[d("settingsDroplets"),o?.droplets??"—"],[d("settingsCharges"),this.formatCharges(o?.charges)],[d("settingsCustomer"),o?.isCustomer===void 0?"—":o.isCustomer?d("enabled"):d("disabled")],[d("settingsSuspension"),o?.suspensionReason??"—"],[d("settingsTimeout"),o?.timeoutUntil??"—"],[d("settingsLocalDeviceId"),a?.localDeviceId??"—"],[d("settingsFingerprint"),a?.deviceFingerprintHash??"—"],[d("settingsUserAgent"),a?.userAgent??navigator.userAgent],[d("settingsPlatform"),a?.platform??navigator.platform],[d("settingsLanguage"),a?.language??navigator.language],[d("settingsTimezone"),a?.timezone??"—"],[d("settingsScreen"),a?`${a.screenWidth}×${a.screenHeight} @${a.devicePixelRatio}`:"—"],[d("settingsTouchSupport"),a?.touchSupport?d("enabled"):d("disabled")],[d("settingsHardwareConcurrency"),a?.hardwareConcurrency??"—"],[d("settingsDeviceMemory"),a?.deviceMemory??"—"],[d("settingsMacAddress"),d("settingsMacUnavailable")]];e.innerHTML=`<div class="account-info-grid">${s.map(([l,c])=>`<div class="account-info-card"><span>${this.escapeHtml(l)}</span><strong>${this.escapeHtml(this.stringifyShieldValue(c))}</strong></div>`).join("")}</div>`}formatDeviceLimit(e,t){let o=e?.registeredDevices,i=e?.maxDevices??t?.maxDevices;if(o===void 0&&i===void 0)return"—";return`${o??"—"} / ${i??"—"}`}formatCharges(e){if(!e||typeof e!=="object")return"—";let t=e,o=typeof t.count==="number"?Math.floor(t.count):t.count;return`${this.formatUnknownValue(o)} / ${this.formatUnknownValue(t.max)} (${this.formatUnknownValue(t.cooldownMs)} ms)`}formatUnknownValue(e){if(typeof e==="string"||typeof e==="number"||typeof e==="boolean")return String(e);return"—"}renderShieldControls(e){let a={navigator:d("shieldFeatureNavigator"),userAgentData:d("shieldFeatureUaData"),screen:d("shieldFeatureScreen"),timezone:d("shieldFeatureTimezone"),canvas:d("shieldFeatureCanvas"),webgl:d("shieldFeatureWebgl"),audio:d("shieldFeatureAudio"),plugins:d("shieldFeaturePlugins"),mediaDevices:d("shieldFeatureMediaDevices"),storageEstimate:d("shieldFeatureStorage"),battery:d("shieldFeatureBattery"),speechSynthesis:d("shieldFeatureSpeech"),fonts:d("shieldFeatureFonts"),matchMedia:d("shieldFeatureMatchMedia"),sharedArrayBuffer:d("shieldFeatureSharedArrayBuffer")},r=this.readStorageJson("__afm_profile",null),n="__afm_profile_choices",s=Number(localStorage.getItem("__afm_profile_expiry")??"0"),l=this.readStorageJson("__afm_settings",{}),c=this.readStorageJson("__afm_profile_choices",[]),p={...Object.fromEntries(Object.keys(a).map((m)=>[m,!0])),...l},h=s>0?new Date(s).toLocaleString():"—",g=r?.id??"Auto",b=c.map((m)=>`<option value="${m.id}" ${m.id===g?"selected":""}>${m.id}</option>`).join(""),y=Object.entries(a).map(([m,f])=>`<label class="kgm-switch-row"><span>${f}</span><span class="kgm-switch"><input type="checkbox" data-shield-key="${m}" ${p[m]?"checked":""}/><span class="kgm-switch-slider" aria-hidden="true"></span></span></label>`).join("");e.innerHTML=`<div class="shield-profile-row"><label>${d("shieldProfile")}</label><select class="shield-profile-select"><option value="">${d("shieldProfileAuto")}</option>${b}</select></div><div class="wp shield-expiry-line">${d("shieldExpires")}: <strong>${h}</strong></div><div class="widget-actions kgm-button-grid"><button type="button" class="challenge-button shield-refresh-profile"><i class="fa-solid fa-rotate"></i><span>${d("shieldRefreshProfile")}</span></button><button type="button" class="challenge-button shield-checker"><i class="fa-solid fa-shield-check"></i><span>${d("shieldChecker")}</span></button><button type="button" class="challenge-button shield-info"><i class="fa-solid fa-circle-info"></i><span>${d("shieldInfo")}</span></button></div><div class="shield-checker-output" aria-live="polite"></div><div class="shield-control-grid">${y}</div>`,e.querySelectorAll("input[data-shield-key]").forEach((m)=>{m.addEventListener("change",()=>{let f=m.dataset.shieldKey;p[f]=m.checked,localStorage.setItem("__afm_settings",JSON.stringify(p)),this.trackAction("shield_module_changed",{source:"shield_settings",key:f,enabled:m.checked}),window.setTimeout(()=>{location.reload()},120)})}),e.querySelector(".shield-profile-select")?.addEventListener("change",(m)=>{let f=m.currentTarget.value;if(!f)localStorage.removeItem("__afm_profile");else{let w=c.find((x)=>x.id===f);localStorage.setItem("__afm_profile",JSON.stringify(w??{id:f}))}this.trackAction("shield_profile_changed",{source:"shield_settings",profileId:f||"auto"}),location.reload()}),e.querySelector(".shield-checker")?.addEventListener("click",()=>{let m=e.querySelector(".shield-checker-output");if(!m)return;let f=this.runShieldChecker();this.trackAction("shield_checker_run",{source:"shield_settings",checks:f}),m.innerHTML=f.map((w)=>`<div class="${w.ok?"ok":"fail"}">${w.ok?"✅":"❌"} ${w.label}</div>`).join("")}),e.querySelector(".shield-info")?.addEventListener("click",()=>{this.trackAction("shield_info_opened",{source:"shield_settings"}),this.openShieldInfoModal()}),e.querySelector(".shield-refresh-profile")?.addEventListener("click",()=>{this.trackAction("shield_profile_refreshed",{source:"shield_settings"}),localStorage.removeItem("__afm_profile"),localStorage.removeItem("__afm_profile_expiry"),location.reload()})}getShieldInfo(){let e=this.readStorageJson("__afm_profile",null),t=this.readStorageJson("__afm_settings",{}),o=this.readStorageJson("__afm_profile_choices",[]);return{injectedInfo:globalThis.__kgmShieldInfo,profile:e,settings:t,choices:o,expiry:Number(localStorage.getItem("__afm_profile_expiry")??"0"),enabled:localStorage.getItem("__afm_enabled")!=="false",proxyHint:localStorage.getItem(rt)??"AUTO"}}readStorageJson(e,t){try{let o=localStorage.getItem(e);if(!o)return t;return JSON.parse(o)}catch{return t}}getPublicIpRouteLabel(e){if(e.enabled&&e.host&&e.port)return`${d("publicIpProxyRoute")} (${e.host}:${e.port})`;return d("publicIpShieldRoute")}async fetchPublicIp(){for(let e of Gt)try{let t=await fetch(e,{cache:"no-store"});if(!t.ok)continue;if((t.headers.get("content-type")??"").includes("application/json")){let i=await t.json();if(typeof i.ip==="string"&&i.ip.trim())return i.ip.trim()}else{let i=(await t.text()).trim();if(i)return i}}catch{}return}openShieldInfoModal(){let e=this.getShieldInfo(),t=e.injectedInfo?.profile,o=typeof t==="object"&&t!==null?t:e.profile,i=e.injectedInfo?.settings??e.settings,a=Number(e.injectedInfo?.expiresAt??e.expiry),r=(p,h="—")=>this.stringifyShieldValue(o?.[p],h),n=o?`${r("screenWidth")}×${r("screenHeight")} @${r("devicePixelRatio")}`:"—",s=o?`${r("webglVendor")} / ${r("webglRenderer")}`:"—",l=[[d("shieldInfoInjected"),e.injectedInfo?d("enabled"):d("disabled")],[d("shieldInfoEnabled"),e.enabled?d("enabled"):d("disabled")],[d("shieldProfile"),r("id")],[d("shieldExpires"),a>0?new Date(a).toLocaleString():"—"],[d("shieldInfoBrowser"),this.stringifyShieldValue(e.injectedInfo?.detectedBrowser)],[d("shieldInfoProxyHint"),this.stringifyShieldValue(e.injectedInfo?.proxyHint,e.proxyHint)],[d("publicIpTitle"),d("publicIpChecking")],[d("shieldInfoProfiles"),e.choices.length>0?String(e.choices.length):"—"],["User-Agent",r("userAgent",navigator.userAgent)],["Platform",r("platform",navigator.platform)],["Language",r("language",navigator.language)],["Screen",n],["WebGL",s]],c=Object.entries(i).filter(([,p])=>p).map(([p])=>p).join(", "),u=document.createElement("dialog");u.className="kgm-modal shield-info-dialog",u.innerHTML=`<div class="kgm-modal-head"><strong>${d("shieldInfoTitle")}</strong><button type="button" class="modal-close" aria-label="${d("close")}"><span class="icon">×</span></button></div><div class="shield-info-grid">${l.map(([p,h])=>`<div class="shield-info-card"><span>${this.escapeHtml(p)}</span><strong${p===d("publicIpTitle")?' class="shield-info-public-ip"':""}>${this.escapeHtml(h)}</strong></div>`).join("")}</div><div class="shield-info-modules"><span>${d("shieldInfoModules")}</span><p>${this.escapeHtml(c.length>0?c:"—")}</p></div>`,document.body.append(u),this.fetchPublicIp().then((p)=>{let h=u.querySelector(".shield-info-public-ip");if(h)h.textContent=p??d("publicIpUnavailable")}),u.querySelector(".modal-close").onclick=()=>{u.close(),u.remove()},u.addEventListener("close",()=>{u.remove()}),u.showModal()}stringifyShieldValue(e,t="—"){if(e===void 0||e===null||e==="")return t;if(typeof e==="string"||typeof e==="number"||typeof e==="boolean")return String(e);return JSON.stringify(e)}escapeHtml(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}async testProxyConnection(e,t){if(!e||!t)return!1;try{return await fetch(`http://${e}:${t}`,{method:"HEAD",mode:"no-cors"}),!0}catch{return!1}}runShieldChecker(){let e=this.getShieldInfo(),t=e.profile,o=e.injectedInfo?.settings,i=typeof o==="object"&&o!==null?o:e.settings,a=Boolean(e.injectedInfo??t);return[{label:d("shieldCheckInjected"),ok:a},{label:d("shieldCheckSettings"),ok:Object.keys(i).length>0},{label:d("shieldCheckProfile"),ok:Boolean(t?.id??e.injectedInfo?.profileId)},{label:d("shieldCheckChoices"),ok:e.choices.length>0},{label:d("shieldCheckNavigator"),ok:navigator.hardwareConcurrency!==0&&typeof navigator.platform==="string"}]}refreshAutoFarmStatusText(){if(!this.autoFarmConfig){this.$autofarmStatus.textContent=d("autoFarmNeedsConfig");return}this.$autofarmStatus.textContent=this.autoFarmIntervalId?`${d("autoFarmRunning")} (${this.formatAutoFarmDelay(this.autoFarmConfig.timerMs)}) · ${this.formatCountdown(this.autoFarmNextTickAt)}`:d("autoFarmStopped")}refreshAutoOverlayStatusText(){if(!this.autoOverlayConfig){this.$autoOverlayStatus.textContent=d("autoOverlayNeedsConfig");return}this.$autoOverlayStatus.textContent=this.autoOverlayIntervalId?`${d("autoOverlayRunning")} (${this.formatAutoFarmDelay(this.autoOverlayConfig.timerMs)}) · ${this.formatCountdown(this.autoOverlayNextTickAt)}`:d("autoOverlayStopped")}formatCountdown(e){if(!e)return"00:00";let t=Math.max(0,e-Date.now()),o=Math.ceil(t/1000),i=Math.floor(o/60),a=o%60;return`${d("nextRunIn")} ${String(i).padStart(2,"0")}:${String(a).padStart(2,"0")}`}formatAutoFarmDelay(e){if(e%3600000===0)return`${e/3600000}h`;if(e%60000===0)return`${e/60000}m`;return`${e/1000}s`}stopAutoFarm(){if(!this.autoFarmIntervalId)return;clearInterval(this.autoFarmIntervalId),this.autoFarmIntervalId=void 0,this.autoFarmNextTickAt=void 0,this.autoFarmPendingTick=!1,this.refreshAutoFarmStatusText(),this.trackAction("auto_farm_stopped",{source:"widget",config:this.autoFarmConfig??null})}stopAutoOverlay(){if(!this.autoOverlayIntervalId)return;clearInterval(this.autoOverlayIntervalId),this.autoOverlayIntervalId=void 0,this.autoOverlayNextTickAt=void 0,this.autoOverlayPendingTick=!1,this.refreshAutoOverlayStatusText(),this.trackAction("auto_draw_stopped",{source:"widget",config:this.autoOverlayConfig??null})}startAutoFarm(){if(!this.autoFarmConfig){this.status=`⚠️ ${d("autoFarmNeedsConfig")}`,this.refreshAutoFarmStatusText(),this.trackAction("auto_farm_start_failed",{source:"widget",reason:"missing_config"});return}this.stopAutoFarm(),this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.autoFarmIntervalId=window.setInterval(()=>{if(this.autoFarmTickRunning){this.autoFarmPendingTick=!0;return}this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.runAutoFarmCycle()},this.autoFarmConfig.timerMs),this.runAutoFarmCycle(),this.refreshAutoFarmStatusText(),this.trackAction("auto_farm_started",{source:"widget",config:this.autoFarmConfig,nextTickAt:this.autoFarmNextTickAt})}startAutoOverlay(){if(!this.autoOverlayConfig){this.status=`⚠️ ${d("autoOverlayNeedsConfig")}`,this.refreshAutoOverlayStatusText(),this.trackAction("auto_draw_start_failed",{source:"widget",reason:"missing_config"});return}this.stopAutoOverlay(),this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.autoOverlayIntervalId=window.setInterval(()=>{if(this.autoOverlayTickRunning){this.autoOverlayPendingTick=!0;return}this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.runAutoOverlayCycle()},this.autoOverlayConfig.timerMs),this.runAutoOverlayCycle(),this.refreshAutoOverlayStatusText(),this.trackAction("auto_draw_started",{source:"widget",config:this.autoOverlayConfig,nextTickAt:this.autoOverlayNextTickAt})}async runAutoFarmCycle(){if(!this.autoFarmConfig||this.autoFarmTickRunning)return;this.autoFarmTickRunning=!0;let e=this.resolveCyclePixelCount(this.autoFarmConfig);this.trackAction("auto_farm_cycle_started",{source:"widget",config:this.autoFarmConfig,pixels:e});try{let t=await this.bot.drawRandomPixelsBatch(e,0);if(!t){this.status=`⚠️ ${d("autoFarmStopped")}: ${d("autoFarmTransparentUnavailable")}`,this.trackAction("auto_farm_cycle_stopped_no_pixels",{source:"widget",pixels:e}),this.stopAutoFarm();return}await this.waitAndClickPaintButton(),this.trackAction("auto_farm_cycle_completed",{source:"widget",pixels:e,painted:t})}catch(t){throw this.trackAction("auto_farm_cycle_failed",{source:"widget",pixels:e,reason:t instanceof Error?t.message:"unknown"}),t}finally{if(this.autoFarmTickRunning=!1,this.autoFarmPendingTick&&this.autoFarmIntervalId)this.autoFarmPendingTick=!1,this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.refreshAutoFarmStatusText(),this.runAutoFarmCycle()}}async runAutoOverlayCycle(){if(!this.autoOverlayConfig||this.autoOverlayTickRunning)return;this.autoOverlayTickRunning=!0;let e=this.resolveCyclePixelCount(this.autoOverlayConfig);this.trackAction("auto_draw_cycle_started",{source:"widget",config:this.autoOverlayConfig,pixels:e});try{let t=await this.bot.drawOverlayPixelsBatch(e);if(!t){this.status=`⚠️ ${d("autoOverlayStopped")}: ${d("autoOverlayNoTasks")}`,this.trackAction("auto_draw_cycle_stopped_no_tasks",{source:"widget",pixels:e}),this.stopAutoOverlay();return}await this.waitAndClickPaintButton(),this.trackAction("auto_draw_cycle_completed",{source:"widget",pixels:e,painted:t})}catch(t){throw this.trackAction("auto_draw_cycle_failed",{source:"widget",pixels:e,reason:t instanceof Error?t.message:"unknown"}),t}finally{if(this.autoOverlayTickRunning=!1,this.autoOverlayPendingTick&&this.autoOverlayIntervalId)this.autoOverlayPendingTick=!1,this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.refreshAutoOverlayStatusText(),this.runAutoOverlayCycle()}}saveAutoFarmConfig(e){this.autoFarmConfig=e,localStorage.setItem(ot,JSON.stringify(e)),Z({farm:this.toControlPixelSettings(e)}),this.trackAction("auto_farm_config_saved",{source:"widget",config:e})}saveAutoOverlayConfig(e){this.autoOverlayConfig=e,localStorage.setItem(it,JSON.stringify(e)),Z({autoDraw:this.toControlPixelSettings(e)}),this.trackAction("auto_draw_config_saved",{source:"widget",config:e})}resolveCyclePixelCount(e){if(!e.usePixelRange)return Math.max(1,Math.floor(e.pixels));let t=Math.max(1,Math.floor(e.pixelRange.min)),o=Math.max(t,Math.floor(e.pixelRange.max));return t+Math.floor(Math.random()*(o-t+1))}toControlPixelSettings(e){return{usePixelRange:e.usePixelRange,pixel:Math.max(1,Math.floor(e.pixels)),pixelRange:{min:Math.max(1,Math.floor(e.pixelRange.min)),max:Math.max(1,Math.floor(e.pixelRange.max))}}}getRemotePixelSettings(e){return ue()[e]}loadAutoFarmConfigFromStorage(){let e=this.getRemotePixelSettings("farm"),t=localStorage.getItem(ot);if(!t&&e){this.autoFarmConfig=this.createDefaultAutoConfig(e);return}if(!t)return;try{let o=JSON.parse(t);if(typeof o.value!=="number"||!Number.isFinite(o.value)||o.value<1)return;let i=typeof o.pixels==="number"&&Number.isFinite(o.pixels)&&o.pixels>=1?Math.floor(o.pixels):Math.max(1,Math.floor(e?.pixel??60)),a=this.normalizePixelRange(o.pixelRange,e),r=o.unit==="hours"||o.unit==="minutes"||o.unit==="seconds"?o.unit:"minutes",n=typeof o.timerMs==="number"&&o.timerMs>0?o.timerMs:r==="hours"?o.value*3600000:r==="minutes"?o.value*60000:o.value*1000;this.autoFarmConfig={value:Math.max(1,Math.floor(o.value)),pixels:i,usePixelRange:o.usePixelRange??e?.usePixelRange??!1,pixelRange:a,unit:r,timerMs:n}}catch{return}}loadAutoOverlayConfigFromStorage(){let e=this.getRemotePixelSettings("autoDraw"),t=localStorage.getItem(it);if(!t&&e){this.autoOverlayConfig=this.createDefaultAutoConfig(e);return}if(!t)return;try{let o=JSON.parse(t);if(typeof o.value!=="number"||!Number.isFinite(o.value)||o.value<1)return;let i=typeof o.pixels==="number"&&Number.isFinite(o.pixels)&&o.pixels>=1?Math.floor(o.pixels):Math.max(1,Math.floor(e?.pixel??60)),a=this.normalizePixelRange(o.pixelRange,e),r=o.unit==="hours"||o.unit==="minutes"||o.unit==="seconds"?o.unit:"minutes",n=typeof o.timerMs==="number"&&o.timerMs>0?o.timerMs:r==="hours"?o.value*3600000:r==="minutes"?o.value*60000:o.value*1000;this.autoOverlayConfig={value:Math.max(1,Math.floor(o.value)),pixels:i,usePixelRange:o.usePixelRange??e?.usePixelRange??!1,pixelRange:a,unit:r,timerMs:n}}catch{return}}createDefaultAutoConfig(e){return{value:1,unit:"minutes",pixels:Math.max(1,Math.floor(e.pixel??60)),usePixelRange:e.usePixelRange??!1,pixelRange:this.normalizePixelRange(e.pixelRange,e),timerMs:60000}}normalizePixelRange(e,t){let o=e&&typeof e==="object"?e:t?.pixelRange,i=typeof o?.min==="number"&&Number.isFinite(o.min)?Math.max(1,Math.floor(o.min)):1,a=typeof o?.max==="number"&&Number.isFinite(o.max)?Math.max(i,Math.floor(o.max)):Math.max(i,5);return{min:i,max:a}}openAutoFarmModal(){let e=document.createElement("dialog");e.className="kgm-modal autofarm-dialog";let t=this.autoFarmConfig?.unit??"minutes",o=this.autoFarmConfig?.value??1,i=this.autoFarmConfig?.pixels??60,a=this.autoFarmConfig?.usePixelRange??!1,r=this.autoFarmConfig?.pixelRange??{min:1,max:5};e.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoFarmModalTitle">Auto farm</strong>
    <button type="button" class="modal-close" aria-label="${d("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoFarmHelp">Paint a random pixel each timer cycle.</p>
  <label class="autofarm-label">
    <span data-i18n="autoFarmTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${o}" />
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
      <input class="autofarm-use-range" type="checkbox" ${a?"checked":""} />
      <span class="kgm-switch-slider" aria-hidden="true"></span>
    </span>
  </label>
  <label class="autofarm-label autofarm-range-row">
    <span data-i18n="pixelRange">Pixel range</span>
    <div class="autofarm-fields">
      <input class="autofarm-range-min" type="number" min="1" step="1" value="${r.min}" data-i18n-title="pixelRangeMin" />
      <input class="autofarm-range-max" type="number" min="1" step="1" value="${r.max}" data-i18n-title="pixelRangeMax" />
    </div>
  </label>
  <small class="access-error pixel-range-error" role="alert" aria-live="assertive"></small>
  <div class="autofarm-actions">
    <button type="button" class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start</span></button>
    <button type="button" class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop</span></button>
  </div>
</form>`,document.body.append(e),I(e);let n=e.querySelector(".autofarm-unit");n.value=t;let s=e.querySelector(".autofarm-value"),l=e.querySelector(".autofarm-pixels"),c=e.querySelector(".autofarm-use-range"),u=e.querySelector(".autofarm-range-row"),p=e.querySelector(".autofarm-range-min"),h=e.querySelector(".autofarm-range-max"),g=e.querySelector(".pixel-range-error"),b=()=>{u.hidden=!c.checked,l.disabled=c.checked};c.addEventListener("change",b),b();let y=()=>{let f=Math.max(1,Number.parseInt(s.value||"1",10));if(n.value==="hours")return f*3600000;if(n.value==="minutes")return f*60000;return f*1000},m=()=>{let f=Math.max(1,Number.parseInt(p.value||"1",10)),w=Math.max(1,Number.parseInt(h.value||"1",10));if(f>w)return g.textContent=d("pixelRangeInvalid"),null;return g.textContent="",{min:f,max:w}};e.querySelector(".autofarm-start").onclick=()=>{let f=m();if(!f)return;this.saveAutoFarmConfig({value:Math.max(1,Number.parseInt(s.value||"1",10)),pixels:Math.max(1,Number.parseInt(l.value||"60",10)),usePixelRange:c.checked,pixelRange:f,unit:n.value,timerMs:y()}),this.startAutoFarm(),e.close(),e.remove()},e.querySelector(".autofarm-stop").onclick=()=>{this.stopAutoFarm(),e.close(),e.remove()},e.querySelector(".modal-close").onclick=()=>{e.close(),e.remove()},e.addEventListener("close",()=>{e.remove()}),e.showModal()}openAutoOverlayModal(){let e=document.createElement("dialog");e.className="kgm-modal autofarm-dialog";let t=this.autoOverlayConfig?.unit??"minutes",o=this.autoOverlayConfig?.value??1,i=this.autoOverlayConfig?.pixels??60,a=this.autoOverlayConfig?.usePixelRange??!1,r=this.autoOverlayConfig?.pixelRange??{min:1,max:5};e.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoOverlayModalTitle">Auto overlay timer</strong>
    <button type="button" class="modal-close" aria-label="${d("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoOverlayHelp">Paint overlay image pixels, click Paint, then repeat by timer.</p>
  <label class="autofarm-label">
    <span data-i18n="autoOverlayTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${o}" />
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
      <input class="autofarm-use-range" type="checkbox" ${a?"checked":""} />
      <span class="kgm-switch-slider" aria-hidden="true"></span>
    </span>
  </label>
  <label class="autofarm-label autofarm-range-row">
    <span data-i18n="pixelRange">Pixel range</span>
    <div class="autofarm-fields">
      <input class="autofarm-range-min" type="number" min="1" step="1" value="${r.min}" data-i18n-title="pixelRangeMin" />
      <input class="autofarm-range-max" type="number" min="1" step="1" value="${r.max}" data-i18n-title="pixelRangeMax" />
    </div>
  </label>
  <small class="access-error pixel-range-error" role="alert" aria-live="assertive"></small>
  <div class="autofarm-actions">
    <button type="button" class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start</span></button>
    <button type="button" class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop</span></button>
  </div>
</form>`,document.body.append(e),I(e);let n=e.querySelector(".autofarm-unit");n.value=t;let s=e.querySelector(".autofarm-value"),l=e.querySelector(".autofarm-pixels"),c=e.querySelector(".autofarm-use-range"),u=e.querySelector(".autofarm-range-row"),p=e.querySelector(".autofarm-range-min"),h=e.querySelector(".autofarm-range-max"),g=e.querySelector(".pixel-range-error"),b=()=>{u.hidden=!c.checked,l.disabled=c.checked};c.addEventListener("change",b),b();let y=()=>{let f=Math.max(1,Number.parseInt(s.value||"1",10));if(n.value==="hours")return f*3600000;if(n.value==="minutes")return f*60000;return f*1000},m=()=>{let f=Math.max(1,Number.parseInt(p.value||"1",10)),w=Math.max(1,Number.parseInt(h.value||"1",10));if(f>w)return g.textContent=d("pixelRangeInvalid"),null;return g.textContent="",{min:f,max:w}};e.querySelector(".autooverlay-start").onclick=()=>{let f=m();if(!f)return;this.saveAutoOverlayConfig({value:Math.max(1,Number.parseInt(s.value||"1",10)),pixels:Math.max(1,Number.parseInt(l.value||"60",10)),usePixelRange:c.checked,pixelRange:f,unit:n.value,timerMs:y()}),this.startAutoOverlay(),e.close(),e.remove()},e.querySelector(".autooverlay-stop").onclick=()=>{this.stopAutoOverlay(),e.close(),e.remove()},e.querySelector(".modal-close").onclick=()=>{e.close(),e.remove()},e.addEventListener("close",()=>{e.remove()}),e.showModal()}getCurrentWplaceLocation(){let e=(p)=>{let h=new URLSearchParams(p.replace(/^#/,"").replace(/^\?/,"")),g=Number.parseFloat(h.get("lat")??""),b=Number.parseFloat(h.get("lng")??""),y=Number.parseFloat(h.get("zoom")??"");if(Number.isFinite(g)&&Number.isFinite(b)&&Number.isFinite(y))return{lat:g,lng:b,zoom:y}},t=globalThis.location.hash,o=t.includes("?")?t.slice(t.indexOf("?")+1):"",i=[globalThis.location.search,t,o].filter(Boolean);for(let p of i){let h=e(p);if(h)return h}let a=/#?\/?(?<zoom>-?\d+(?:\.\d+)?)\/(?<lat>-?\d+(?:\.\d+)?)\/(?<lng>-?\d+(?:\.\d+)?)/.exec(t);if(!a?.groups)return;let{lat:r,lng:n,zoom:s}=a.groups;if(!r||!n||!s)return;let l=Number.parseFloat(r),c=Number.parseFloat(n),u=Number.parseFloat(s);if(!Number.isFinite(l)||!Number.isFinite(c)||!Number.isFinite(u))return;return{lat:l,lng:c,zoom:u}}buildExternalToolUrl(e){let t=this.getCurrentWplaceLocation();if(e==="colorConverter")return qt;if(e==="receiveSmss")return Kt;if(e==="esimplus")return Vt;if(e==="receiveSmsFree")return Xt;if(e==="quackr")return Jt;if(e==="textverified")return Zt;if(!t){if(e==="samuelArchive")return st;let i=new URL(lt);return i.searchParams.set("lat","0.000000"),i.searchParams.set("lng","0.000000"),i.searchParams.set("zoom","2.00"),i.searchParams.set("version",ct),i.toString()}if(e==="samuelArchive"){let i=new URL(st);return i.hash=`${t.zoom.toFixed(2)}/${t.lat.toFixed(6)}/${t.lng.toFixed(6)}`,i.toString()}let o=new URL(lt);return o.searchParams.set("lat",t.lat.toFixed(6)),o.searchParams.set("lng",t.lng.toFixed(6)),o.searchParams.set("zoom",t.zoom.toFixed(2)),o.searchParams.set("version",ct),o.toString()}openExternalTool(e){let t=this.buildExternalToolUrl(e);this.trackAction("external_tool_opened",{source:"widget",tool:e,targetUrl:t,wplaceLocation:this.getCurrentWplaceLocation()??null}),this.openUrlInNewTab(t)}openUrlInNewTab(e){let t=globalThis.open(e,"_blank","noopener");if(t){t.opener=null;return}let o=document.createElement("a");o.href=e,o.target="_blank",o.rel="noopener noreferrer",o.style.display="none",document.body.append(o),o.click(),o.remove()}setDisabled(e,t){this.element.querySelector("."+e).disabled=t}async run(e,t,o,i="..."){console.log("[KGM][Widget] Task started",{status:e});let a=this.status;this.status=`${i} ${e}`;try{let r=await t();return this.status=a,console.log("[KGM][Widget] Task completed",{status:e}),r}catch(r){if(!(r instanceof me))console.error(r),this.status=`${d("taskErrorPrefix")}: ${e}`;throw console.error("[KGM][Widget] Task failed",{status:e,error:r}),r}finally{await o?.()}}handleKeyboard(e){if(Ze(e.target))return;if(k(e,v.toggleWidget)){e.preventDefault(),this.open=!this.open,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"toggleWidget",open:this.open});return}if(k(e,v.minimizeWidget)){e.preventDefault(),this.open=!1,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"minimizeWidget"});return}if(k(e,v.showWidgetPanel)){e.preventDefault(),this.open=!0,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"showWidgetPanel"});return}if(k(e,v.hideWidgetPanel)){e.preventDefault(),this.open=!1,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"hideWidgetPanel"});return}if(k(e,v.showShortcuts)){e.preventDefault(),this.open=!0,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"showShortcuts"}),this.openSettingsModal();return}if(k(e,v.toggleOverlay)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"toggleOverlay"}),this.toggleOverlay();return}if(k(e,v.focusNextImage)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"focusNextImage"}),this.focusImageByStep(1);return}if(k(e,v.focusPreviousImage)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"focusPreviousImage"}),this.focusImageByStep(-1);return}if(k(e,v.openColorPanel)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openColorPanel"}),this.openColorPanelForActiveImage();return}if(k(e,v.toggleImageLock)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"toggleImageLock"}),this.toggleLockForActiveImage();return}if(k(e,v.clickPaintWhenReady)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"clickPaintWhenReady"}),this.drawAndClickPaintWhenReady();return}if(k(e,v.startAutoFarm)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"startAutoFarm"}),this.startAutoFarm();return}if(k(e,v.stopAutoFarm)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"stopAutoFarm"}),this.stopAutoFarm();return}if(k(e,v.openColorConverterTool)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openColorConverterTool"}),this.openExternalTool("colorConverter");return}if(k(e,v.openSamuelArchiveTool)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openSamuelArchiveTool"}),this.openExternalTool("samuelArchive");return}if(k(e,v.openEralyonArchiveTool)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openEralyonArchiveTool"}),this.openExternalTool("eralyonArchive");return}if(k(e,v.openReceiveSmssTool)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openReceiveSmssTool"}),this.openExternalTool("receiveSmss");return}if(k(e,v.openEsimplusTool)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openEsimplusTool"}),this.openExternalTool("esimplus");return}if(k(e,v.openReceiveSmsFreeTool)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openReceiveSmsFreeTool"}),this.openExternalTool("receiveSmsFree");return}if(k(e,v.openQuackrTool)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openQuackrTool"}),this.openExternalTool("quackr");return}if(k(e,v.openTextverifiedTool)){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openTextverifiedTool"}),this.openExternalTool("textverified");return}if(k(e,v.addImage)&&!this.$addImage.disabled){e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"addImage"}),this.addImage().catch(()=>{return});return}if(k(e,v.draw)&&!this.$draw.disabled)e.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"draw"}),this.bot.draw()}focusImageByStep(e){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=e>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+e+this.bot.images.length)%this.bot.images.length;this.trackAction("active_image_focused",{source:"widget",step:e,image:this.imageTelemetry(this.activeImageIndex)}),this.bot.images[this.activeImageIndex].position.scrollScreenTo()}async recommendUpdateIfOutdated(){let e=new AbortController,t=window.setTimeout(()=>{e.abort()},1800);try{let o=await fetch(Yt,{cache:"no-store",signal:e.signal});if(!o.ok)return;let i=await o.text(),r=/APP_VERSION = '([^']+)'/.exec(i)?.[1];if(!r)return;if(this.compareSemver(r,P)<=0)return;this.showRequiredUpdateDialog(r)}catch{}finally{clearTimeout(t)}}showRequiredUpdateDialog(e){if(document.querySelector(".update-required-dialog"))return;let t=document.createElement("dialog");t.className="kgm-modal update-required-dialog",t.innerHTML=`<div class="kgm-modal-head">
  <strong data-i18n="scriptUpdateRequiredTitle">Update required</strong>
</div>
<p class="update-required-text">${d("scriptUpdateRequiredBody").replace("{remoteVersion}",e).replace("{currentVersion}",P)}</p>
<button type="button" class="challenge-button update-required-button">
  <i class="fa-solid fa-rotate" aria-hidden="true"></i>
  <span data-i18n="scriptUpdateOpenUrl">Open update URL</span>
</button>`,document.body.append(t),I(t),t.addEventListener("cancel",(o)=>{o.preventDefault()}),t.querySelector(".update-required-button").addEventListener("click",()=>{this.openScriptUpdateUrl("required_update_modal",e)}),t.showModal()}openScriptUpdateUrl(e,t){this.trackAction("script_update_link_opened",{source:e,targetUrl:nt,currentVersion:P,remoteVersion:t??null}),this.openUrlInNewTab(nt)}compareSemver(e,t){let o=e.split(".").map((a)=>Number(a)||0),i=t.split(".").map((a)=>Number(a)||0);for(let a=0;a<3;a++){if((o[a]??0)>(i[a]??0))return 1;if((o[a]??0)<(i[a]??0))return-1}return 0}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let e=this.getActiveImage();if(!e)return;this.trackAction("active_image_colors_opened",{source:"widget",image:this.imageTelemetry(this.activeImageIndex)}),e.openColorPanel()}toggleLockForActiveImage(){let e=this.getActiveImage();if(!e)return;e.lock=!e.lock,this.trackAction("active_image_lock_changed",{source:"widget",locked:e.lock,image:this.imageTelemetry(this.activeImageIndex)}),e.update(),A(this.bot)}async waitAndClickPaintButton(){this.trackAction("paint_button_wait_started",{source:"widget"}),await this.run(d("taskWaitingPaintButton"),async()=>{for(;;){if(this.isChallengeBlockingPaint()){this.trackAction("paint_blocked_by_challenge",{source:"widget"}),await this.waitForChallengeToResolve(),await new Promise((t)=>setTimeout(t,250));continue}let e=this.findNativePaintButton();if(e&&!e.disabled&&e.ariaDisabled!=="true"){await this.triggerNativePaintClickWithChallengeRecovery(e),this.trackAction("paint_button_flow_completed",{source:"widget"});return}await new Promise((t)=>setTimeout(t,150))}})}async drawAndClickPaintWhenReady(){if(this.trackAction("draw_and_paint_started",{source:"widget",drawButtonEnabled:!this.$draw.disabled}),!this.$draw.disabled)await this.bot.draw({refreshMapAfterDraw:!1});await this.waitAndClickPaintButton(),this.bot.refreshMapAfterPaint("draw_and_paint"),this.trackAction("draw_and_paint_completed",{source:"widget"})}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((o)=>Array.from(document.querySelectorAll(o))).find((o)=>/pintar|paint/i.test(o.textContent))}triggerNativePaintClick(e){e.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),e.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),e.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),e.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),e.click()}async triggerNativePaintClickWithChallengeRecovery(e){for(let o=0;o<3;o++){let i=o===0?e:this.findNativePaintButton();if(!i)return;if(i.disabled||i.ariaDisabled==="true")return;this.trackAction("native_paint_clicked",{source:"widget",attempt:o+1,maxAttempts:3,buttonText:i.textContent.trim()}),this.triggerNativePaintClick(i);let a=await this.waitForPaintAttemptOutcome(2500);if(this.trackAction("native_paint_attempt_result",{source:"widget",attempt:o+1,maxAttempts:3,outcome:a}),a==="painted")return;if(a==="challenge"){await this.waitForChallengeToResolve(),await new Promise((r)=>setTimeout(r,350));continue}await new Promise((r)=>setTimeout(r,350))}console.log("[KGM][Widget] Paint click finished without a clear success signal after retries")}async waitForPaintAttemptOutcome(e){return new Promise((t)=>{let o=!1,i=(s)=>{if(o)return;o=!0,globalThis.removeEventListener("kgm:paint-response",a),t(s)},a=(s)=>{if(s.detail.ok)i("painted")};globalThis.addEventListener("kgm:paint-response",a);let r=Date.now();(async()=>{while(Date.now()-r<=e){if(this.isChallengeBlockingPaint()){i("challenge");return}let s=this.findNativePaintButton();if(s&&(s.disabled||s.ariaDisabled==="true")){let l=await this.waitForDelayedChallenge(700);i(l?"challenge":"painted");return}await new Promise((l)=>setTimeout(l,120))}i("unknown")})(),window.setTimeout(()=>{i("unknown")},e+100)})}async waitForDelayedChallenge(e){let t=Date.now();while(Date.now()-t<=e){if(this.isChallengeBlockingPaint())return!0;await new Promise((o)=>setTimeout(o,150))}return!1}async waitForChallengeToResolve(){await this.run(d("taskWaitingChallengeResolve"),async()=>{let e=Date.now(),t=90000;while(this.isChallengeBlockingPaint()&&Date.now()-e<=90000)await new Promise((o)=>setTimeout(o,500))})}isChallengeBlockingPaint(){let o=Array.from(document.querySelectorAll('h-captcha, .h-captcha, iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], [data-hcaptcha-widget-id]')).filter((r)=>{if(r.closest("dialog")?.matches("dialog:not([open])"))return!1;let n=globalThis.getComputedStyle(r);if(n.display==="none"||n.visibility==="hidden")return!1;let s=r.getBoundingClientRect();return s.width>0&&s.height>0});if(!o.length)return!1;let i=document.querySelector("dialog.modal[open], dialog[open]");if(i?.querySelector('h-captcha, .h-captcha, iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], [data-hcaptcha-widget-id]')){if(!i)return!1;if(!Array.from(i.querySelectorAll('textarea[name="h-captcha-response"], textarea[name^="h-captcha-response-"]')).some((n)=>n.value.trim().length>0))return!0}return o.some((r)=>{let n=r.closest("h-captcha")??r.parentElement??document.documentElement,s=Array.from(n.querySelectorAll('textarea[name="h-captcha-response"], textarea[name^="h-captcha-response-"]'));if(!s.length)return!0;return s.every((l)=>l.value.trim().length===0)})}}var Qt=2;function eo(){let e=globalThis;if(typeof e.fp_assemble_injection!=="function")e.fp_assemble_injection=()=>({});if(!e.__kgmUnhandledRejectionPatched)e.__kgmUnhandledRejectionPatched=!0,e.addEventListener("unhandledrejection",(t)=>{let o=t.reason,i=typeof o==="object"&&o!==null&&"name"in o&&typeof o.name==="string"?o.name:"",a=o instanceof Error?o.message:o;if(i==="NotAllowedError"&&a.includes("play() failed"))t.preventDefault()});if(!e.__kgmMediaPlayPatched&&"HTMLMediaElement"in e){e.__kgmMediaPlayPatched=!0;let t=Reflect.get(e.HTMLMediaElement.prototype,"play");e.HTMLMediaElement.prototype.play=function(){return Reflect.apply(t,this,[]).catch((a)=>{let r=a instanceof Error?a.message:a;if((typeof a==="object"&&a!==null&&"name"in a&&typeof a.name==="string"?a.name:"")==="NotAllowedError"&&r.includes("play() failed"))return;throw a})}}}var dt="[KGM]",ut="kgm-access-locked",pt=1500,to=45000,ht=120000,ie=3000,Ie=1800,oo="https://chromewebstore.google.com/detail/gcalenpjmijncebpfijmoaglllgpjagf";class gt{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;accountCookieTokenCache;accountCookieTokenSource="none";accountCookieTokenWarmup;accountCookieWatchIntervalId;accountCookieWatchRunning=!1;accountCookieWatchAttempts=0;lastAccountCookieWatchEventAt=0;lastSyncedAccountCookieToken;lastSyncedAccountCookieTokenAt=0;loggedUserscriptCookieApiAvailability=!1;controlSession=de();controlAccessAllowed=!1;controlAccessHardDenied=!1;lastControlAccessFailureReason;log(e,t){if(t===void 0)console.log(`${dt} ${e}`);else console.log(`${dt} ${e}`,t)}getUserscriptRuntimeStatus(){let e=this.getUserscriptInfo(),t=this.getRuntimeInfoString(e,["scriptHandler","scriptHandlerName","handler"]),o=this.getRuntimeInfoString(e,["version","scriptHandlerVersion"]),i=/tampermonkey/i.test(t),a=this.getUserscriptCookieApis().length>0;return{ok:i&&a,handler:t||"unknown",version:o||"unknown",hasTampermonkey:i,hasCookieApi:a}}isMobileRuntime(){let e=navigator.userAgent.toLowerCase();return/android|iphone|ipad|ipod|mobile/.test(e)||navigator.maxTouchPoints>1&&Math.min(screen.width,screen.height)<=1024}getUserscriptInfo(){let e=this.getPageWindow(),t=globalThis,o=e,i=t.GM_info??o.GM_info;return i&&typeof i==="object"?i:{}}getRuntimeInfoString(e,t){for(let o of t){let i=e[o];if(typeof i==="string"&&i.trim())return i.trim();if(typeof i==="number")return String(i)}return""}getUserscriptCookieApis(){let e=this.getPageWindow(),t=globalThis,o=e;return[t.GM?.cookie,o.GM?.cookie,t.GM_cookie,o.GM_cookie].filter((i)=>i!==void 0&&i!==null)}showRuntimeRequirementNotice(e,t="missing_runtime"){this.injectRuntimeRequirementStyle(),document.querySelector(".kgm-runtime-blocker")?.remove();let o=document.createElement("div");o.className="kgm-runtime-blocker";let i=document.createElement("section");i.className="kgm-runtime-blocker-panel";let a=document.createElement("strong"),r=t==="missing_cookie"?d("runtimeCookieRequiredTitle"):d("runtimeBetaRequiredTitle");a.textContent=r;let n=document.createElement("p"),s=t==="missing_cookie"?d("runtimeCookieRequiredBody"):d("runtimeBetaRequiredBody");n.textContent=s;let l=document.createElement("div");l.className="kgm-runtime-blocker-actions";let c=document.createElement("button");c.type="button",c.textContent=d("runtimeBetaInstall"),c.addEventListener("click",()=>{window.open(oo,"_blank","noopener,noreferrer")});let u=document.createElement("button");if(u.type="button",u.textContent=d("runtimeReload"),u.addEventListener("click",()=>{location.reload()}),l.append(c,u),i.append(a),s!==r)i.append(n);i.append(l),o.append(i),document.documentElement.append(o)}injectRuntimeRequirementStyle(){if(document.getElementById("kgm-runtime-requirement-style"))return;let e=document.createElement("style");e.id="kgm-runtime-requirement-style",e.textContent=`
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
`,document.head.append(e)}constructor(){this.log("Boot sequence started"),document.body.classList.add(ut);let e=this.getUserscriptRuntimeStatus();if(!e.ok&&!this.isMobileRuntime()){this.log("Required userscript runtime missing",e),this.showRuntimeRequirementNotice(e);return}let t=Ke();if(this.log("Save loaded",{hasSave:Boolean(t),imageCount:t?.images.length??0,strategy:t?.strategy}),t){for(let a=0;a<t.images.length;a++){let r=t.images[a];oe({x:r.position[0]-1000,y:r.position[1]-1000}),oe({x:r.position[0]+1000,y:r.position[1]+1000})}this.strategy=t.strategy}let o=JSON.parse(localStorage.getItem("kglacer-macro:proxy-config")??"{}");Xe(o),this.registerFetchInterceptor(),this.log("Fetch interceptor registered"),this.primeAccountCookieToken(),this.startAccountCookieWatcher();let i=document.createElement("style");i.textContent=Je.replace("FAKE_FAVORITE_LOCATIONS",V.length.toString()),document.head.append(i),this.log("Styles injected",{fakeFavoriteLocations:V.length}),(async()=>{if(this.log("Widget initialization flow started"),!await this.ensureAccountCookieTokenReadable())return;await this.ensureControlAccess(),document.body.classList.remove(ut),this._widget=new Me(this),await this.widget.run(d("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let r=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((n)=>{for(let s=0;s<n.length;s++)if(n[s].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(r,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await _(500),await this.updateColors(),t)for(let n=0;n<t.images.length;n++){let s=await L.fromJSON(this,t.images[n]);this.images.push(s),s.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled"),this.trackAction("bot_loaded",{source:"startup",restoredImages:this.images.length,totalTasks:this.getTotalPendingTasks()})})})()}async ensureControlAccess(){let e=de();if(e?.accessToken){this.controlSession=e,this.controlAccessAllowed=this.hasSessionCapableOfControlRefresh(e),this.controlAccessHardDenied=!1,this.refreshControlAccess("startup").catch((t)=>{this.rememberControlAccessFailure(t,"startup")});return}await new Promise((t)=>{let o=document.createElement("dialog");o.className="kgm-modal access-dialog",o.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(o),I(o);let i=o.querySelector(".access-serial"),a=o.querySelector(".access-submit"),r=o.querySelector(".access-error"),n=o.querySelector(".access-locale");n.innerHTML=We().map((s)=>`<option value="${s}" ${s===ee()?"selected":""}>${s.toUpperCase()}</option>`).join(""),n.addEventListener("change",()=>{ge(n.value),I(o)}),o.addEventListener("cancel",(s)=>{s.preventDefault()}),o.querySelector("form").addEventListener("submit",(s)=>{s.preventDefault(),r.textContent="",a.disabled=!0,a.textContent=d("loginChecking"),(async()=>{try{let l=await this.withTimeout(this.fetchAccountInfo(!0).catch(()=>null),900,null);this.controlSession=await Be({serialKey:i.value.trim(),wplaceMe:l}),this.controlAccessAllowed=!0,this.controlAccessHardDenied=!1,this.lastControlAccessFailureReason=void 0,this.trackAction("serial_login_success",{source:"serial_modal",hasWplaceAccount:Boolean(l)}),this.runAccountCookieWatcherTick("after_login"),this.syncAccountInfoWithControl("login_background"),o.close(),o.remove(),t()}catch(l){let c=l instanceof Error?l.message:d("loginErrorUnknown");r.textContent=this.mapControlLoginError(c),a.disabled=!1,a.textContent=d("loginSubmit")}})()}),o.showModal(),i.focus()})}mapControlLoginError(e){if(/invalid_serial|invalid_token|blocked_token|expired_license|inactive_license/i.test(e))return d("invalidAccessKey");if(/device_limit/i.test(e))return d("accessDeviceLimit");return d("loginErrorUnknown")}hasSessionCapableOfControlRefresh(e){if(!e?.accessToken)return!1;if(e.user?.isActive===!1)return!1;if(e.serial?.valid===!1)return!1;return!0}isHardControlAccessFailure(e){let t=`${e.reason??""} ${e.message}`.toLowerCase();return/invalid_serial|invalid_token|blocked_token/.test(t)||/expired_license|inactive_license|inactive_user/.test(t)||/device_limit|blocked_ip|blocked_device|blocked_country/.test(t)||/blocked_account|blocked_account_token|blocked_account_token_hash/.test(t)||/license (is )?(expired|inactive)|device limit/.test(t)||/(ip|device|country|account|token) is blocked/.test(t)||/wplace account token .*blocked/.test(t)}rememberControlAccessFailure(e,t){let o=e instanceof Error?e.message:"unknown";if(!(e instanceof K)){this.log("Control API transient failure; keeping cached serial session",{source:t,reason:o}),this.lastControlAccessFailureReason=o;return}let i=de();if(i?.accessToken)this.controlSession=i;if(this.lastControlAccessFailureReason=o,!this.isHardControlAccessFailure(e)&&this.hasSessionCapableOfControlRefresh(this.controlSession)){this.controlAccessAllowed=!0,this.controlAccessHardDenied=!1,this.log("Control API check failed without blocking cached serial session",{source:t,reason:o,status:e.status});return}this.controlAccessAllowed=!1,this.controlAccessHardDenied=!0,this.log("Control API hard-denied access; cached serial session kept",{source:t,reason:o,status:e.status})}getControlSession(){return this.controlSession}isControlAccessAllowed(){return this.controlAccessAllowed&&!this.controlAccessHardDenied&&this.hasSessionCapableOfControlRefresh(this.controlSession)}async refreshControlAccess(e="manual"){if(!this.controlSession)throw Error(d("accessLoginRequired"));let t=e==="startup",[o,i]=await Promise.all([this.withTimeout(this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),t?900:1800,null),this.resolveAccountCookieForControl({timeoutMs:t?Ie:ie})]);return this.controlSession=await Q({session:this.controlSession,eventType:"check",wplaceMe:o,wplaceCookieJToken:i.token,cookieStatus:i.status,metadata:{reason:e}}),this.controlAccessAllowed=!0,this.controlAccessHardDenied=!1,this.lastControlAccessFailureReason=void 0,this.runAccountCookieWatcherTick(`access_${e}`),{session:this.controlSession,cookieStatus:i.status}}ensureFeatureAccess(e){if(this.isControlAccessAllowed())return!0;if(!this.controlAccessHardDenied&&this.hasSessionCapableOfControlRefresh(this.controlSession))return this.controlAccessAllowed=!0,this.refreshControlAccess(`feature:${e}`).catch((t)=>{this.rememberControlAccessFailure(t,`feature:${e}`)}),this.log("Feature access recovered from cached serial session",{feature:e}),!0;this.log("Feature blocked by Control API access state",{feature:e,reason:this.lastControlAccessFailureReason});try{this.widget.status=`⚠️ ${this.formatControlAccessDeniedStatus()}`}catch{}return!1}formatControlAccessDeniedStatus(){let e=this.lastControlAccessFailureReason?.trim();if(!e)return d("accessDenied");return`${d("accessDenied")} ${e}`}getPageWindow(){return globalThis.unsafeWindow??globalThis}async fetchAccountInfo(e=!1){if(!e&&this.me)return this.me;let t=await fetch("https://backend.wplace.live/me",{credentials:"include",cache:"no-store"});if(!t.ok)throw Error(`/me failed (${t.status})`);let o=await t.json();return this.me=o,o}async getAccountCookieStatus(e={}){let t=await this.readAccountCookieToken(e);return{hasToken:Boolean(t),source:this.accountCookieTokenSource,token:t}}async readAccountCookieToken(e={}){let t=this.accountCookieTokenCache;if(!e.force&&this.accountCookieTokenCache)return this.accountCookieTokenCache;let o=this.getCookieFromDocument("j");if(o)return this.accountCookieTokenCache=o,this.accountCookieTokenSource="document",o;let i=await this.readCookieWithCookieStore("j");if(i)return this.accountCookieTokenCache=i,this.accountCookieTokenSource="cookie_store",i;let a=await this.readCookieWithUserscriptApi("j",e);if(a){if(this.accountCookieTokenCache=a,!this.accountCookieTokenSource.startsWith("gm_cookie"))this.accountCookieTokenSource="gm_cookie";return a}if(t)return t;return this.accountCookieTokenSource="none",null}async ensureAccountCookieTokenReadable(){if(await this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:ie}))return!0;if(this.isMobileRuntime())return this.log("WPlace j cookie is not readable on mobile; continuing",{source:this.accountCookieTokenSource}),!0;let t=this.getUserscriptRuntimeStatus();return this.log("Required WPlace j cookie is not readable",t),this.showRuntimeRequirementNotice(t,"missing_cookie"),!1}rememberAccountCookieToken(e,t){this.accountCookieTokenCache=e,this.accountCookieTokenSource=t}primeAccountCookieToken(){return this.accountCookieTokenWarmup??=this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:ie}).finally(()=>{this.accountCookieTokenWarmup=void 0}),this.accountCookieTokenWarmup}startAccountCookieWatcher(){if(this.accountCookieWatchIntervalId!==void 0)return;let e=(t)=>{this.runAccountCookieWatcherTick(t)};e("startup"),this.accountCookieWatchIntervalId=window.setInterval(()=>{e("interval")},pt),window.addEventListener("focus",()=>{e("window_focus")}),document.addEventListener("visibilitychange",()=>{if(!document.hidden)e("tab_visible")})}async runAccountCookieWatcherTick(e){if(this.accountCookieWatchRunning)return;this.accountCookieWatchRunning=!0,this.accountCookieWatchAttempts++;try{let t=await this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:ie}),o={hasToken:Boolean(t),source:t?this.accountCookieTokenSource:"none"},i=Date.now();if(t){if(t!==this.lastSyncedAccountCookieToken||i-this.lastSyncedAccountCookieTokenAt>ht){if(await this.sendAccountCookieTokenToControl({token:t,status:o,reason:e,eventName:"j_token_detected"}))this.lastSyncedAccountCookieToken=t,this.lastSyncedAccountCookieTokenAt=i}return}if(i-this.lastAccountCookieWatchEventAt<to)return;if(await this.sendAccountCookieTokenToControl({token:null,status:o,reason:e,eventName:"j_token_unavailable"}))this.lastAccountCookieWatchEventAt=i}finally{this.accountCookieWatchRunning=!1}}async sendAccountCookieTokenToControl(e){let t=this.controlSession;if(!t?.accessToken)return!1;let o=await this.withTimeout(this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),700,null);try{return this.controlSession=await Q({session:t,eventType:"action",wplaceMe:o,wplaceCookieJToken:e.token,cookieStatus:e.status,metadata:{app:ce,version:P,eventName:e.eventName,action:e.eventName,reason:e.reason,sentAt:new Date().toISOString(),cookieName:"j",cookieDomain:".wplace.live",accountTokenAvailable:Boolean(e.token),jTokenAvailable:Boolean(e.token),watcher:{attempts:this.accountCookieWatchAttempts,intervalMs:pt,source:e.status.source,hasToken:e.status.hasToken},page:{href:location.href,host:location.host}}}),this.controlAccessAllowed=!0,this.controlAccessHardDenied=!1,this.lastControlAccessFailureReason=void 0,this.log("WPlace j cookie watcher synced with Control API",{hasToken:Boolean(e.token),source:e.status.source,reason:e.reason}),!0}catch(i){return this.rememberControlAccessFailure(i,e.eventName),this.log("WPlace j cookie watcher sync failed",{reason:i instanceof Error?i.message:"unknown"}),!1}}async resolveAccountCookieForControl(e={}){let o=await this.withTimeout(this.accountCookieTokenWarmup??this.primeAccountCookieToken(),e.timeoutMs??750,null)??await this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:e.timeoutMs??ie});return{token:o,status:{hasToken:Boolean(o),source:o?this.accountCookieTokenSource:"none"}}}getCookieFromDocument(e){let t=this.getPageWindow(),o=[document.cookie,t.document.cookie].filter((i)=>typeof i==="string");for(let i of o){let a=we(i,e);if(a)return a}return null}async readCookieWithCookieStore(e){let t=this.getPageWindow(),o=[Reflect.get(globalThis,"cookieStore"),Reflect.get(t,"cookieStore")];for(let i of o){if(!i||typeof i!=="object")continue;let a=i.get;if(typeof a!=="function")continue;try{let s=await a.call(i,e);if(s?.value)return s.value}catch(s){this.log("cookieStore read failed",s)}let r=i.getAll;if(typeof r!=="function")continue;let n=[{name:e},e,void 0];for(let s of n)try{let l=s===void 0?await r.call(i):await r.call(i,s),c=this.findCookieValue(l,e);if(c)return c}catch(l){this.log("cookieStore getAll read failed",l)}}return null}async readCookieWithUserscriptApi(e,t={}){let o=this.getUserscriptCookieApis();if(!this.loggedUserscriptCookieApiAvailability)this.loggedUserscriptCookieApiAvailability=!0,this.log("Reading WPlace j cookie through userscript APIs",{apiCount:o.length,cookieDomain:".wplace.live",cookieName:e});let i=location.protocol==="http:"||location.protocol==="https:"?location.href:"https://wplace.live/",a=[{name:e},{name:e,partitionKey:{}},{url:i,name:e},{url:i,name:e,partitionKey:{}},{url:i,name:e,partitionKey:{topLevelSite:"https://wplace.live"}},{url:i,domain:".wplace.live",name:e,path:"/"},{url:"https://wplace.live/",name:e},{url:"https://wplace.live/",name:e,partitionKey:{}},{url:"https://wplace.live/",name:e,partitionKey:{topLevelSite:"https://wplace.live"}},{url:"https://wplace.live/",domain:".wplace.live",name:e,path:"/"},{url:"https://www.wplace.live/",name:e},{url:"https://www.wplace.live/",domain:".wplace.live",name:e,path:"/"},{url:"http://wplace.live/",name:e},{url:"http://www.wplace.live/",name:e},{url:"https://backend.wplace.live/",name:e},{url:"https://backend.wplace.live/",domain:".wplace.live",name:e,path:"/"},{domain:".wplace.live",name:e,path:"/"},{domain:".wplace.live",name:e},{domain:"wplace.live",name:e,path:"/"},{domain:"wplace.live",name:e},{firstPartyDomain:"wplace.live",domain:".wplace.live",name:e},{firstPartyDomain:"https://wplace.live",topLevelSite:"https://wplace.live",domain:".wplace.live",name:e}],r=[{url:i},{url:i,partitionKey:{}},{url:i,partitionKey:{topLevelSite:"https://wplace.live"}},{url:"https://wplace.live/",name:e,path:"/"},{url:"https://wplace.live/"},{url:"https://wplace.live/",partitionKey:{}},{url:"https://wplace.live/",partitionKey:{topLevelSite:"https://wplace.live"}},{url:"https://www.wplace.live/",name:e,path:"/"},{url:"https://www.wplace.live/"},{url:"http://wplace.live/"},{url:"http://www.wplace.live/"},{url:"https://backend.wplace.live/",name:e,path:"/"},{url:"https://backend.wplace.live/"},{domain:".wplace.live"},{domain:"wplace.live"},{firstPartyDomain:"https://wplace.live",domain:".wplace.live",name:e},{firstPartyDomain:"https://wplace.live",topLevelSite:"https://wplace.live",domain:".wplace.live",name:e},{name:e},{name:e,path:"/"},{name:e,partitionKey:{}},{}],n=t.timeoutMs??2000,s=await this.findCookieWithUserscriptQueries(o,this.dedupeCookieQueries(a),e,n);if(s)return s;if(t.exhaustive===!1)return null;let l=await this.findCookieWithUserscriptQueries(o,this.dedupeCookieQueries(r),e,n);if(l)return l;return null}async findCookieWithUserscriptQueries(e,t,o,i){return new Promise((a)=>{let r=0,n=!1,s=(c)=>{if(n)return;if(!c&&r>0)return;n=!0,a(c)},l=["list","get"];for(let c of e)for(let u of t)for(let p of l)r++,this.callUserscriptCookieApi(c,p,u,i).then((h)=>{if(n)return;let g=p==="list"?this.findCookieValue(h,o):this.extractCookieValue(h,o);if(!g)return;this.accountCookieTokenSource=`gm_cookie:${p}:${this.describeCookieQuery(u)}`,s(g)}).finally(()=>{r--,s(null)});s(null)})}dedupeCookieQueries(e){let t=new Set;return e.filter((o)=>{let i=JSON.stringify(o);if(t.has(i))return!1;return t.add(i),!0})}describeCookieQuery(e){if(e.domain)return e.domain;if(e.url)return e.url;if(e.firstPartyDomain)return e.firstPartyDomain;if(e.topLevelSite)return e.topLevelSite;if(e.name)return e.name;return"all"}async callUserscriptCookieApi(e,t,o,i=500){return new Promise((a)=>{let r=!1,n=(l)=>{if(r)return;r=!0,a(l)},s=(...l)=>{n(this.normalizeUserscriptCookieCallbackArgs(l))};try{if(typeof e==="function"){let l=e(t,o,s);this.resolveCookieApiResult(l,n)}else if(e&&typeof e==="object"){let l=e[t];if(typeof l==="function"){let c=l.call(e,o,s);this.resolveCookieApiResult(c,n)}else n(void 0)}else n(void 0)}catch(l){this.log(`GM.cookie ${t} failed`,l),n(void 0)}window.setTimeout(()=>{n(void 0)},i)})}normalizeUserscriptCookieCallbackArgs(e){if(e.length<=1)return e[0];return e.find((o)=>{if(Array.isArray(o))return!0;if(!o||typeof o!=="object")return!1;let i=o;return Array.isArray(i.cookies)||typeof i.name==="string"||typeof i.value==="string"})??e}resolveCookieApiResult(e,t){if(e&&typeof e.then==="function"){e.then(t,()=>{t(void 0)});return}if(e!==void 0)t(e)}findCookieValue(e,t){return se(e,t)}extractCookieValue(e,t){let o=se(e,t);if(o)return o;let i=e;if(i&&!i.name&&i.value)return i.value;return null}normalizeCookieList(e){return B(e)}async withTimeout(e,t,o){return new Promise((i)=>{let a=!1,r=(n)=>{if(a)return;a=!0,i(n)};e.then(r,()=>{r(o)}),window.setTimeout(()=>{r(o)},t)})}async syncAccountInfoWithControl(e="account_info"){if(!this.controlSession)return{ok:!1,cookieStatus:{hasToken:!1,source:this.accountCookieTokenSource}};let[t,o]=await Promise.all([this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),this.resolveAccountCookieForControl({timeoutMs:Ie})]);try{return this.controlSession=await Q({session:this.controlSession,eventType:"heartbeat",wplaceMe:t,wplaceCookieJToken:o.token,cookieStatus:o.status,metadata:{app:ce,version:P,reason:e,sentAt:new Date().toISOString(),cookieName:"j",accountTokenAvailable:Boolean(o.token),jTokenAvailable:Boolean(o.token),page:{href:location.href,host:location.host}}}),this.controlAccessAllowed=!0,this.controlAccessHardDenied=!1,this.lastControlAccessFailureReason=void 0,{ok:!0,cookieStatus:o.status}}catch(i){return this.rememberControlAccessFailure(i,`sync:${e}`),this.log("Control API sync failed",{reason:i instanceof Error?i.message:"unknown"}),{ok:!1,cookieStatus:o.status}}}trackAction(e,t={}){this.sendControlAction(e,t)}async sendControlAction(e,t={}){let o=this.controlSession;if(!this.hasSessionCapableOfControlRefresh(o))return;let[i,a]=await Promise.all([this.withTimeout(this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),650,null),this.resolveAccountCookieForControl({force:!0,exhaustive:!0,timeoutMs:Ie})]);try{this.controlSession=await Q({session:o,eventType:"action",wplaceMe:i,wplaceCookieJToken:a.token,cookieStatus:a.status,metadata:this.sanitizeTelemetryValue({app:ce,version:P,eventName:e,action:e,sentAt:new Date().toISOString(),cookieName:"j",accountTokenAvailable:Boolean(a.token),jTokenAvailable:Boolean(a.token),...this.buildActionTelemetryContext(),...t})}),this.controlAccessAllowed=!0,this.controlAccessHardDenied=!1,this.lastControlAccessFailureReason=void 0}catch(r){this.rememberControlAccessFailure(r,`action:${e}`),this.log("Control API action event failed",{action:e,reason:r instanceof Error?r.message:"unknown"})}}buildActionTelemetryContext(){return{page:this.getPageTelemetry(),viewport:{width:window.innerWidth,height:window.innerHeight,devicePixelRatio:window.devicePixelRatio},mapCenter:this.getWorldPositionForTelemetry({x:window.innerWidth/2,y:window.innerHeight/2}),botState:{strategy:this.strategy,images:this.images.length,totalTasks:this.getTotalPendingTasks(),unavailableColors:this.unavailableColors.size,accessAllowed:this.isControlAccessAllowed()},images:this.summarizeImagesForTelemetry()}}getPageTelemetry(){try{let e=new URL(location.href);return{href:e.href,origin:e.origin,host:e.host,pathname:e.pathname,search:e.search,hash:e.hash,query:Object.fromEntries(Array.from(e.searchParams.entries()).slice(0,25))}}catch{return{href:location.href,host:location.host}}}getWorldPositionForTelemetry(e){try{return this.serializeWorldPositionForTelemetry(E.fromScreenPosition(this,e))}catch{return null}}summarizeImageForTelemetry(e,t=this.images.indexOf(e)){let o=e.pixels.pixels,i=o.length,a=o[0]?.length??0,r=null;try{r=e.position.toScreenPosition()}catch{r=null}return{index:t,width:a,height:i,tasks:e.tasks.length,strategy:e.strategy,opacity:e.opacity,lock:e.lock,drawTransparentPixels:e.drawTransparentPixels,drawColorsInOrder:e.drawColorsInOrder,skipUnavailableColors:e.skipUnavailableColors,colors:e.colors.length,disabledColors:e.colors.filter((n)=>n.disabled).length,position:this.serializeWorldPositionForTelemetry(e.position),screenPosition:r}}summarizeImagesForTelemetry(){return this.images.slice(0,20).map((e,t)=>this.summarizeImageForTelemetry(e,t))}serializeWorldPositionForTelemetry(e){return{globalX:e.globalX,globalY:e.globalY,tileX:e.tileX,tileY:e.tileY,x:e.x,y:e.y}}getTotalPendingTasks(){return this.images.reduce((e,t)=>e+t.tasks.length,0)}sanitizeTelemetryValue(e,t=0,o=new WeakSet){if(e===null||e===void 0)return e;if(typeof e==="number"||typeof e==="boolean"||typeof e==="bigint")return typeof e==="bigint"?e.toString():e;if(typeof e==="string"){if(e.startsWith("data:"))return`[data-url:${e.length}]`;if(e.length>2048)return`${e.slice(0,2048)}…[truncated]`;return e}if(t>=5)return"[max-depth]";if(Array.isArray(e))return e.slice(0,50).map((i)=>this.sanitizeTelemetryValue(i,t+1,o));if(typeof e==="object"){if(o.has(e))return"[circular]";o.add(e);let i={};for(let[a,r]of Object.entries(e).slice(0,80)){if(/token|secret|password|authorization/i.test(a)&&typeof r==="string"){i[a]="[redacted]";continue}i[a]=this.sanitizeTelemetryValue(r,t+1,o)}return i}if(typeof e==="symbol")return e.description??"[symbol]";if(typeof e==="function")return`[function:${e.name||"anonymous"}]`;return"[unsupported]"}draw(e={}){if(!this.ensureFeatureAccess("draw"))return Promise.resolve();this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.trackAction("draw_requested",{source:"bot",strategy:this.strategy,images:this.images.length,totalTasks:this.getTotalPendingTasks()}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let t=document.querySelector(".maplibregl-canvas"),o=(i)=>{if(!i.shiftKey)i.stopPropagation()};return this.widget.run(d("taskDrawing"),async()=>{await this.widget.run(d("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",o,!0),t.addEventListener("wheel",o,!0),this.updateTasks();let i=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((l)=>l.json()),a=Math.floor(i.charges.count),r=a;this.log("Charges fetched",{charges:a});let n=0;for(let l=0;l<this.images.length;l++)n+=this.images[l].tasks.length;switch(this.log("Tasks prepared",{tasks:n}),this.trackAction("draw_started",{source:"bot",strategy:this.strategy,charges:a,preparedTasks:n,images:this.images.length}),this.strategy){case"ALL":{while(a>0){let l=!0;for(let c=0;c<this.images.length;c++){let u=this.images[c].tasks.shift();if(!u)continue;this.drawTask(u),a--,await _(1),l=!1}if(l)break}break}case"PERCENTAGE":{for(let l=0;l<n&&a>0;l++){let c=1,u;for(let p=0;p<this.images.length;p++){let h=this.images[p],g=1-h.tasks.length/(h.pixels.pixels.length*h.pixels.pixels[0].length);if(g<c)c=g,u=h}this.drawTask(u.tasks.shift()),a--,await _(1)}break}case"SEQUENTIAL":for(let l=0;l<this.images.length;l++){let c=this.images[l];for(let u=c.tasks.shift();u&&a>0;u=c.tasks.shift())this.drawTask(u),a--,await _(1)}}if(this.widget.update(),e.refreshMapAfterDraw!==!1)await this.readMap(),this.updateTasks();let s=this.getTotalPendingTasks();this.log("Draw flow finished",{remainingCharges:a,remainingTasks:s}),this.trackAction("draw_completed",{source:"bot",strategy:this.strategy,startCharges:r,remainingCharges:a,usedCharges:Math.max(0,r-a),preparedTasks:n,remainingTasks:s,images:this.images.length,refreshMapAfterDraw:e.refreshMapAfterDraw!==!1})},()=>{globalThis.removeEventListener("mousemove",o,!0),t.removeEventListener("wheel",o,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}refreshMapAfterPaint(e="paint"){return this.widget.run(d("taskReadingMap"),async()=>{this.mapsCache.clear(),await this.readMap(),this.updateTasks(),this.widget.update(),this.trackAction("map_refreshed_after_paint",{source:"bot",reason:e,remainingTasks:this.getTotalPendingTasks()})})}toJSON(){return{version:Qt,images:this.images.map((e)=>e.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let e of document.querySelectorAll("button.btn.relative.w-full"))if(e.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(e.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(e){let t=document.querySelector(".maplibregl-canvas"),o=window.innerWidth/2,i=window.innerHeight/2,a=o-e.x,r=i-e.y;function n(s,l,c){t.dispatchEvent(new MouseEvent(s,{bubbles:!0,cancelable:!0,clientX:l,clientY:c,buttons:1}))}n("mousedown",o,i),n("mousemove",a,r),n("mouseup",a,r)}readMap(){this.mapsCache.clear();let e=new Set;for(let o=0;o<this.images.length;o++){let i=this.images[o],{tileX:a,tileY:r}=new E(this,i.position.globalX+i.pixels.pixels[0].length,i.position.globalY+i.pixels.pixels.length);for(let n=i.position.tileX;n<=a;n++)for(let s=i.position.tileY;s<=r;s++)e.add(`${n}/${s}`)}let t=0;return this.log("Reading map tiles",{tileCount:e.size}),this.widget.run(`${d("taskReadingMap")} [0/${e.size}]`,()=>Promise.all([...e].map(async(o)=>{this.mapsCache.set(o,await H.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${o}.png`,exactColor:!0})),this.widget.status=`⌛ ${d("taskReadingMap")} [${++t}/${e.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((e)=>{if(!document.hasFocus())e();window.addEventListener("blur",()=>{setTimeout(e,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(e){if(this.updateStars(),this.$stars.length<2)throw Error("No se encontraron los marcadores del mapa. Recarga Wplace y activa los favoritos.");let t=0,o=1,i=1/0,a=1/0;for(let s=0;s<this.$stars.length;s++){let{x:l,y:c}=G(this.$stars[s]);if(l<e.x&&c<e.y){let u=e.x-l+(e.y-c);if(u<i)i=u,t=s}else if(l>e.x&&c>e.y){let u=l-e.x+(c-e.y);if(u<a)a=u,o=s}}let r=G(this.$stars[t]),n=F[t];return{anchorScreenPosition:r,anchorWorldPosition:n,pixelSize:(G(this.$stars[o]).x-r.x)/(F[o].x-n.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await _(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await _(1);let e=document.querySelector("button.bottom-0");if(e?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')e.click(),await _(1)}drawTask(e){if(this.lastColor!==e.color){let i=document.getElementById("color-"+e.color);if(!i){this.log("Skipped draw task: color button not found",{color:e.color,tileX:e.position.tileX,tileY:e.position.tileY,x:e.position.x,y:e.position.y});return}i.click(),this.lastColor=e.color,this.log("Color switched for draw task",{color:e.color})}let t=e.position.pixelSize/2,o=e.position.toScreenPosition();if(!Number.isFinite(o.x)||!Number.isFinite(o.y)){this.log("Skipped draw task: invalid screen position",{color:e.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:o.x+t,clientY:o.y+t,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),e.position.setMapColor(e.color)}async paintRandomPixelInViewport(){if(!this.ensureFeatureAccess("autoFarm"))return;this.trackAction("auto_farm_random_pixel_requested",{source:"bot"});try{await this.updateColors();let e=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((h)=>!h.disabled&&h.getAttribute("aria-disabled")!=="true"&&h.offsetParent!==null);if(!e.length)return;let t=e[Math.floor(Math.random()*e.length)],o=Number.parseInt(t.id.slice(6),10);if(!Number.isFinite(o))return;let i=document.querySelector(".maplibregl-canvas");if(!i)return;let a=i.getBoundingClientRect(),r=24,n=a.left+r,s=a.right-r,l=a.top+r,c=a.bottom-r;if(s<=n||c<=l)return;let u=n+Math.random()*(s-n),p=l+Math.random()*(c-l);this.drawTask({color:o,position:E.fromScreenPosition(this,{x:u,y:p})}),this.trackAction("auto_farm_random_pixel_drawn",{source:"bot",color:o,screenPosition:{x:u,y:p}})}catch(e){this.log("Auto farm tick failed",e),this.trackAction("auto_farm_random_pixel_failed",{source:"bot",reason:e instanceof Error?e.message:"unknown"})}}async drawRandomPixelsBatch(e,t){if(!this.ensureFeatureAccess("autoFarm"))return 0;let o=Math.max(1,Math.floor(e)),i=0;return this.trackAction("auto_farm_draw_batch_requested",{source:"bot",requestedLimit:e,normalizedLimit:o,preferredColor:t??null}),await this.widget.run(d("taskDrawingRandomPixels"),async()=>{await this.widget.run(d("taskInitializingDraw"),()=>this.updateColors());let a=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((g)=>!g.disabled&&g.getAttribute("aria-disabled")!=="true"&&g.offsetParent!==null),r=document.querySelector(".maplibregl-canvas");if(!a.length||!r)return;let n=t===void 0?void 0:a.find((g)=>Number.parseInt(g.id.slice(6),10)===t);if(t!==void 0&&!n)return;let s=r.getBoundingClientRect(),l=24,c=s.left+l,u=s.right-l,p=s.top+l,h=s.bottom-l;if(u<=c||h<=p)return;for(let g=0;g<o;g++){let b=n??a[Math.floor(Math.random()*a.length)],y=Number.parseInt(b.id.slice(6),10);if(!Number.isFinite(y))continue;let m=c+Math.random()*(u-c),f=p+Math.random()*(h-p);this.drawTask({color:y,position:E.fromScreenPosition(this,{x:m,y:f})}),i++,await _(1)}}),this.trackAction("auto_farm_draw_batch_completed",{source:"bot",requestedLimit:e,normalizedLimit:o,preferredColor:t??null,drawn:i}),i}async drawOverlayPixelsBatch(e){if(!this.ensureFeatureAccess("autoDraw"))return 0;let t=Math.max(1,Math.floor(e)),o=0;return this.trackAction("auto_draw_overlay_batch_requested",{source:"bot",requestedLimit:e,normalizedLimit:t,strategy:this.strategy,totalTasks:this.getTotalPendingTasks()}),await this.widget.run(d("taskDrawingOverlayPixels"),async()=>{await this.widget.run(d("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),this.updateTasks();for(let i=0;i<t;i++){let a=this.takeNextTaskFromStrategy();if(!a)break;this.drawTask(a),o++,await _(1)}this.widget.update()}),this.trackAction("auto_draw_overlay_batch_completed",{source:"bot",requestedLimit:e,normalizedLimit:t,drawn:o,strategy:this.strategy,totalTasks:this.getTotalPendingTasks()}),o}takeNextTaskFromStrategy(){switch(this.strategy){case"ALL":case"SEQUENTIAL":{for(let e=0;e<this.images.length;e++){let t=this.images[e].tasks.shift();if(t)return t}return}case"PERCENTAGE":{let e,t=Number.POSITIVE_INFINITY;for(let o=0;o<this.images.length;o++){let i=this.images[o];if(!i.tasks.length)continue;let a=i.pixels.pixels.length*i.pixels.pixels[0].length,r=1-i.tasks.length/a;if(r<t)t=r,e=i}return e?.tasks.shift()}}}registerFetchInterceptor(){let e=this.getPageWindow(),t=e.fetch.bind(e),o=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/,i=async(a,r)=>{let n=this.resolveFetchUrl(a);this.captureAccountTokenFromFetchRequest(n,a,r);let s=await t(a,r),l=s.clone();if(this.isWplacePaintRequest(n))this.emitPaintResponseEvent(n,s);if(s.url==="https://backend.wplace.live/me")this.me=await l.json(),this.me.favoriteLocations.unshift(...V),this.me.maxFavoriteLocations=1/0,s.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length}),this.syncAccountInfoWithControl("wplace_me").catch((u)=>{this.log("Control API /me sync failed",u)}),this.trackAction("wplace_me_observed",{source:"fetch_interceptor",accountId:this.me.id,accountName:this.me.name,accountCountry:this.me.country});let c=o.exec(n);if(c){let u=new E(this,+c[1],+c[2],+c[3],+c[4]);for(let p=0;p<this.markerPixelPositionResolvers.length;p++)this.markerPixelPositionResolvers[p](u);this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event"),this.trackAction("wplace_pixel_request",{source:"fetch_interceptor",requestUrl:n,method:this.resolveFetchMethod(a,r),body:this.summarizeFetchBody(r),position:this.serializeWorldPositionForTelemetry(u)})}return s};e.fetch=i,globalThis.fetch=i}emitPaintResponseEvent(e,t){globalThis.dispatchEvent(new CustomEvent("kgm:paint-response",{detail:{ok:t.ok,status:t.status,url:e,at:Date.now()}}))}captureAccountTokenFromFetchRequest(e,t,o){if(!this.isWplacePaintRequest(e))return;let i=this.resolveFetchCookieHeader(t,o),a=i?we(i,"j"):null;if(!a){this.runAccountCookieWatcherTick("paint_request");return}let r="request_header:paint";this.rememberAccountCookieToken(a,r),this.log("Captured WPlace j cookie from paint request headers",{source:r,url:e});let n=Date.now();if(!(a!==this.lastSyncedAccountCookieToken||n-this.lastSyncedAccountCookieTokenAt>ht))return;this.sendAccountCookieTokenToControl({token:a,status:{hasToken:!0,source:r},reason:"paint_request_header",eventName:"j_token_detected"}).then((l)=>{if(!l)return;this.lastSyncedAccountCookieToken=a,this.lastSyncedAccountCookieTokenAt=Date.now()})}isWplacePaintRequest(e){try{let t=new URL(e,location.href);return t.origin==="https://backend.wplace.live"&&t.pathname==="/paint"}catch{return!1}}resolveFetchCookieHeader(e,t){let o=this.extractHeaderValue(t?.headers,"cookie");if(o)return o;if(e&&typeof e==="object"&&"headers"in e)return this.extractHeaderValue(e.headers,"cookie");return null}extractHeaderValue(e,t){if(!e)return null;let o=t.toLowerCase();if(typeof e==="object"&&typeof e.get==="function"){let i=e.get.bind(e);return i(t)??i(o)??i(t.toUpperCase())}if(Array.isArray(e)){for(let[i,a]of e)if(i.toLowerCase()===o)return a;return null}if(typeof e==="object")for(let[i,a]of Object.entries(e)){if(i.toLowerCase()!==o)continue;if(Array.isArray(a))return a.map(String).join("; ");if(a===void 0||a===null)return null;return String(a)}return null}resolveFetchUrl(e){if(typeof e==="string")return this.normalizeFetchUrl(e);if(e instanceof URL)return this.normalizeFetchUrl(e.href);if(e&&typeof e==="object"&&"url"in e){let t=e.url;if(typeof t==="string")return this.normalizeFetchUrl(t)}return""}normalizeFetchUrl(e){try{return new URL(e,location.href).href}catch{return e}}resolveFetchMethod(e,t){if(typeof t?.method==="string")return t.method;if(e&&typeof e==="object"&&"method"in e){let o=e.method;if(typeof o==="string")return o}return"GET"}summarizeFetchBody(e){let t=e?.body;if(!t)return null;if(typeof t==="string"){if(t.length>2048)return`${t.slice(0,2048)}…[truncated]`;return t}if(t instanceof URLSearchParams)return Object.fromEntries(Array.from(t.entries()).slice(0,50));if(t instanceof FormData){let o={};for(let[i,a]of Array.from(t.entries()).slice(0,50)){if(typeof a==="string"){o[i]=a;continue}let r=a;o[i]={name:r.name,size:r.size,type:r.type}}return o}if(t instanceof Blob)return{type:t.type,size:t.size};if(t instanceof ArrayBuffer)return{type:"ArrayBuffer",byteLength:t.byteLength};if(ArrayBuffer.isView(t))return{type:t.constructor.name,byteLength:t.byteLength};return{type:typeof t}}async closeAll(){for(let e of document.querySelectorAll("button"))if(e.innerHTML==="✕"||e.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')e.click(),await _(1)}waitForElement(e,t){return this.log("Waiting for element",{name:e,selector:t}),this.widget.run(`${d("taskWaitingFor")} ${e}`,()=>new Promise((o)=>{let i=document.querySelector(t);if(i){o(i);return}let a=new MutationObserver(()=>{let r=document.querySelector(t);if(r)a.disconnect(),o(r)});a.observe(document.documentElement,{childList:!0,subtree:!0})}))}updateStars(){this.$stars=[...document.querySelectorAll('.maplibregl-marker[title*="KGLACER_MACRO_FAVORITE"], .maplibregl-marker[aria-label*="KGLACER_MACRO_FAVORITE"]')].slice(0,V.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let e=0;e<this.images.length;e++)this.images[e].position.updateAnchor(),this.images[e].update()}updateTasks(){for(let e=0;e<this.images.length;e++)this.images[e].updateTasks()}updateImageColors(){for(let e=0;e<this.images.length;e++)this.images[e].updateColors()}}eo();if(location.hostname.includes("hcaptcha.com"))De();else globalThis.kglacerMacro=new gt,globalThis.kgm=globalThis.kglacerMacro,globalThis.wbot=globalThis.kglacerMacro;

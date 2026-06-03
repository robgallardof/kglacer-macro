// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      5.1.7
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
function uo(o,s,a){let r=o[a];return o[a]=o[s],o[s]=r,o}function bo(o,s){let a=o.indexOf(s);if(a!==-1)o.splice(a,1);return a}var os=Math.floor(Math.random()*65536),as=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function T(o){return new Promise((s)=>setTimeout(s,o))}function Q(o,s,a=["error"],r="addEventListener"){return new Promise((i,l)=>{for(let t=0;t<s.length;t++)o[r]?.(s[t],i);for(let t=0;t<a.length;t++)o[r]?.(a[t],l)})}class pa{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,s=15000){this.size=o,this.historyTime=s}push(o){if(o<0)throw Error("Negative chunk size");let{time:s,historyTime:a}=this.getTime();if(this.history.push({time:s,chunk:o}),this.history[0]&&this.history[0].time+a<s)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((s,a)=>s+a.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),s=o-this.startTime,a=Math.min(s,this.historyTime);return{time:o,historyTime:a}}}function mo(o,s){if(s===void 0)console.log(`[KGM][Challenge] ${o}`);else console.log(`[KGM][Challenge] ${o}`,s)}function O(o){return new Promise((s)=>setTimeout(s,o))}function lo(o){return o.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim()}function da(o){return[...o.matchAll(/-?\d+/g)].map((s)=>Number.parseInt(s[0],10))}function fa(o){let s=lo(o).replace(/,/g,"."),a=/(-?\d+(?:\.\d+)?)\s*([+\-*/x×])\s*(-?\d+(?:\.\d+)?)/.exec(s);if(!a)return;let r=Number.parseFloat(a[1]),i=a[2],l=Number.parseFloat(a[3]);if(!Number.isFinite(r)||!Number.isFinite(l))return;if(i==="+")return String(r+l);if(i==="-")return String(r-l);if(i==="/"&&l!==0)return String(r/l);if((i==="x"||i==="×"||i==="*")&&l!==0)return String(r*l)}function wa(o){let s=lo(o),a=da(s);if(/es .* par|is .* even|numero par|número par/.test(s)&&a.length>0)return a[0]%2===0?"sí":"no";if(/es .* impar|is .* odd|numero impar|número impar/.test(s)&&a.length>0)return a[0]%2!==0?"sí":"no";let r=/(-?\d+)\s*(>|<|>=|<=|=|==)\s*(-?\d+)/.exec(s);if(r){let i=Number.parseInt(r[1],10),l=Number.parseInt(r[3],10),t=r[2];return(t===">"?i>l:t==="<"?i<l:t===">="?i>=l:t==="<="?i<=l:i===l)?"sí":"no"}if(/verdadero|true/.test(s))return"sí";if(/falso|false/.test(s))return"no"}function ua(o,s){let a=`${o} ${s}`.trim(),r=lo(a),i=fa(a);if(i!==void 0)return i;let l=wa(a);if(l)return l;if(/responde (si|sí) o no|answer yes or no/.test(r))return Math.random()<0.5?"sí":"no";return"sí"}async function ba(o,s){o.focus(),o.value="",o.dispatchEvent(new Event("input",{bubbles:!0}));for(let a=0;a<s.length;a++)o.value+=s[a],o.dispatchEvent(new Event("input",{bubbles:!0})),await O(35+Math.floor(Math.random()*55));o.dispatchEvent(new Event("change",{bubbles:!0}))}function ho(o){if(!o)return;o.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0})),o.click()}async function ma(){ho(document.querySelector("#menu-info")),await O(150),ho(document.querySelector("#text_challenge"))}function ha(){let o=document.querySelector('[aria-live="polite"]'),s=document.querySelector("div.error-text"),a=/intentalo de nuevo|try again|incorrect/i.test(lo(s?.textContent??""));return Boolean(o&&!a)}async function ka(){await O(1000),await ma();for(;;){if(ha()){mo("Challenge solved");return}let o=document.querySelector("h2.prompt-text#prompt")?.innerText??"",s=document.querySelector("div.text-text#prompt-text")?.innerText??"",a=document.querySelector('input[type="text"]'),r=document.querySelector(".button-submit");if(!o||!s||!a||!r){await O(300);continue}let i=ua(o,s);mo("Answering text challenge",{prompt:o,promptDetails:s,answer:i}),await ba(a,i),await O(180),ho(r),await O(2200)}}function Jo(){if(!location.hostname.includes("hcaptcha.com"))return;mo("Solver booted"),ka().catch((o)=>{console.error("[KGM][Challenge] Solver crashed",o)})}var ko="kglacer-macro",L="5.1.7",G="kglacer-macro-settings",No=["kglacermacro","wbot"],X="kgm";var jo="https://control-api-opal.vercel.app",za=`${jo}/api/script/login`,Aa=`${jo}/api/script/check`,B="kglacer-macro:control-session-v5",Uo="kglacer-macro:control-settings-v5",To="kglacer-macro:local-device-id";class I extends Error{reason;status;constructor(o,s,a){super(o);this.reason=s;this.status=a;this.name="ControlApiError"}}function Ao(){let o=zo(sessionStorage,B,null)??zo(localStorage,B,null);if(!o?.accessToken)return null;if(o.expiresAt&&new Date(o.expiresAt).getTime()<=Date.now())return v(),null;let s=JSON.stringify(o);return sessionStorage.setItem(B,s),localStorage.setItem(B,s),o}function Ko(o){let s=JSON.stringify(o);if(sessionStorage.setItem(B,s),localStorage.setItem(B,s),o.settings)$(o.settings)}function v(){sessionStorage.removeItem(B),localStorage.removeItem(B)}function to(){return zo(localStorage,Uo,{})}function $(o){let s=to();localStorage.setItem(Uo,JSON.stringify({...s,...o}))}function co(o){if(!o)return!1;if(o.user?.isActive===!1)return!1;if(o.serial?.valid===!1)return!1;if(o.access?.allowed===!1)return!1;return Boolean(o.accessToken)}async function Qo(o){let s=await eo(),a=o.wplaceCookieJToken?o.wplaceCookieStatus?.source??"detected":"none",r=await fetch(za,{method:"POST",cache:"no-store",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({serialKey:o.serialKey,scriptVersion:L,currentUrl:location.href,storageKey:G,client:s,wplace:{me:o.wplaceMe,cookieJToken:o.wplaceCookieJToken,cookieJTokenSource:a},wplaceCookieJToken:o.wplaceCookieJToken,wplaceCookieJTokenSource:a,accountToken:o.wplaceCookieJToken,accountTokenSource:a,metadata:{accountTokenSource:a,hasWplaceCookieJToken:Boolean(o.wplaceCookieJToken),wplaceCookieJTokenSource:a,wplaceCookieJTokenStatus:o.wplaceCookieJToken?"detected":"unavailable"}})}),i=await r.json().catch(()=>({}));if(!r.ok||!i.success||!i.accessToken)throw new I(i.reason??`Control API login failed (${r.status})`,i.reason,r.status);let l={accessToken:i.accessToken,expiresAt:i.expiresAt,user:i.user,serial:i.serial,access:i.access,settings:i.settings};return Ko(l),l}async function no(o){let s=await eo(),a=o.wplaceCookieJToken?o.cookieStatus?.source??"detected":"none",r=await fetch(Aa,{method:"POST",cache:"no-store",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({accessToken:o.session.accessToken,deviceId:s.localDeviceId,eventType:o.eventType??"check",scriptVersion:L,currentUrl:location.href,storageKey:G,account:o.wplaceMe??null,accountToken:o.wplaceCookieJToken??null,accountTokenSource:a,wplaceCookieJToken:o.wplaceCookieJToken??null,wplaceCookieJTokenSource:a,wplace:{me:o.wplaceMe??null,cookieJToken:o.wplaceCookieJToken??null,cookieJTokenSource:a},metadata:{...s,...o.metadata??{},accountTokenSource:a,hasWplaceCookieJToken:Boolean(o.wplaceCookieJToken),wplaceCookieJTokenStatus:o.cookieStatus?.hasToken?"detected":"unavailable",wplaceCookieJTokenSource:a,macAddress:"unavailable_from_browser"}})}),i=await r.json().catch(()=>({})),l={...o.session,access:i};if(Ko(l),!r.ok||i.allowed===!1)throw new I(i.reason??`Control API denied access (${r.status})`,i.reason,r.status);return l}async function eo(){let o=navigator,s=Sa(),a={userAgent:navigator.userAgent,platform:navigator.platform,language:navigator.language,languages:Array.from(navigator.languages),timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,screenWidth:screen.width,screenHeight:screen.height,devicePixelRatio:window.devicePixelRatio,touchSupport:"ontouchstart"in window||navigator.maxTouchPoints>0||matchMedia("(pointer: coarse)").matches,hardwareConcurrency:navigator.hardwareConcurrency,deviceMemory:o.deviceMemory,browserVendor:typeof Reflect.get(navigator,"vendor")==="string"?Reflect.get(navigator,"vendor"):"unknown",cookieEnabled:navigator.cookieEnabled,localDeviceId:s},r=await Ma(JSON.stringify({userAgent:a.userAgent,platform:a.platform,language:a.language,languages:a.languages,timezone:a.timezone,screenWidth:a.screenWidth,screenHeight:a.screenHeight,devicePixelRatio:a.devicePixelRatio,touchSupport:a.touchSupport,hardwareConcurrency:a.hardwareConcurrency,deviceMemory:a.deviceMemory,browserVendor:a.browserVendor}));return{...a,deviceFingerprintHash:r}}function Sa(){let o=localStorage.getItem(To);if(o)return o;let s=typeof crypto.randomUUID==="function"?crypto.randomUUID():`kgm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;return localStorage.setItem(To,s),s}async function Ma(o){let s=Reflect.get(crypto,"subtle");if(s){let r=await s.digest("SHA-256",new TextEncoder().encode(o));return Array.from(new Uint8Array(r)).map((i)=>i.toString(16).padStart(2,"0")).join("")}let a=0;for(let r=0;r<o.length;r++)a=Math.imul(31,a)+o.charCodeAt(r);return`fallback-${Math.abs(a).toString(16)}`}function zo(o,s,a){try{let r=o.getItem(s);if(!r)return a;return JSON.parse(r)}catch{return a}}var Lo=["kglacermacro:locale"],go={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",externalToolsSection:"External tools",toolColorConverter:"Color converter",toolSamuelArchive:"Samuel archive",toolEralyonArchive:"Eralyon archive",externalToolsHelp:"Opens tools centered on the current Wplace URL zone when lat/lng/zoom are available.",progressSection:"Progress",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutMinimizePanel:"Minimize panel",shortcutShowPanel:"Show panel",shortcutHidePanel:"Hide panel",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutOpenSettings:"Open settings",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutStartAutoFarm:"Start auto drawing",shortcutStopAutoFarm:"Stop auto drawing",shortcutColorConverter:"Open color converter",shortcutSamuelArchive:"Open Samuel archive",shortcutEralyonArchive:"Open Eralyon archive",shortcutsHelp:"Shift+B toggle widget · Shift+M minimize panel · Shift+S show panel · Shift+H hide panel · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ open settings · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint · Shift+F start auto farm · Shift+G stop auto farm · Shift+1 color converter · Shift+2 Samuel archive · Shift+3 Eralyon archive",language:"Language",openConfig:"Config",settingsModalTitle:"Settings",proxyTitle:"Proxy (Beta)",proxyEnabled:"Enable proxy for web requests (beta)",shieldTitle:"Shield",shieldEnabled:"Enable Script Shield",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",mobileControls:"Mobile controls",mobileMinimize:"Hide panel",mobileShowPanel:"Show panel",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",skipUnavailableColors:"Paint only available colors",allColorsEnabled:"Enable all colors",enableAllColors:"Enable all",disableAllColors:"Disable all",replaceWith:"Replace with",shieldProfile:"Profile",shieldProfileAuto:"Auto",shieldExpires:"Expires",shieldRefreshProfile:"Refresh profile",shieldTest:"Test shield + proxy",shieldChecker:"Shield checker",shieldInfo:"Shield info",shieldInfoTitle:"Injected Shield data",shieldInfoInjected:"Injected data",shieldInfoEnabled:"Protection",shieldInfoBrowser:"Detected browser",shieldInfoProxyHint:"Proxy hint",shieldInfoProfiles:"Available profiles",shieldInfoModules:"Enabled modules",publicIpTitle:"Detected public IP",publicIpChecking:"Checking IP…",publicIpUnavailable:"IP unavailable",publicIpProxyRoute:"Browser/proxy route",publicIpShieldRoute:"Direct browser route (Shield only)",shieldCheckInjected:"Injected shield data present",shieldCheckSettings:"Settings stored",shieldCheckProfile:"Profile resolved",shieldCheckChoices:"Profile choices loaded",shieldCheckNavigator:"Navigator spoofing reachable",scriptUpdate:"Update script",proxyTest:"Test proxy",proxyTesting:"Testing proxy…",proxyOk:"Proxy OK",proxyFail:"Proxy test failed",shieldFeatureNavigator:"Navigator",shieldFeatureUaData:"UA-Data",shieldFeatureScreen:"Screen",shieldFeatureTimezone:"Timezone",shieldFeatureCanvas:"Canvas",shieldFeatureWebgl:"WebGL",shieldFeatureAudio:"Audio",shieldFeaturePlugins:"Plugins",shieldFeatureMediaDevices:"Media devices",shieldFeatureStorage:"Storage",shieldFeatureBattery:"Battery",shieldFeatureSpeech:"Speech",shieldFeatureFonts:"Fonts",shieldFeatureMatchMedia:"Match media",shieldFeatureSharedArrayBuffer:"SharedArrayBuffer",smartReplaceMode:"Show smart replacement suggestions",previewStrategy:"Preview strategy",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",autoFarmSection:"Auto farm",configureAutoFarm:"Configure auto farm",autoFarmStopped:"Stopped",autoFarmRunning:"Running",autoFarmModalTitle:"Auto farm timer",autoFarmHelp:"Draw random pixels, click Paint, then repeat by timer.",autoFarmTimer:"Timer",autoFarmPixelsPerCycle:"Pixels per cycle",autoFarmStart:"Start auto farm",autoFarmStop:"Stop auto farm",autoFarmNeedsConfig:"Configure auto farm first",autoFarmTransparentUnavailable:"Transparent color unavailable",autoFarmNoTransparentTasks:"No drawable pixels were found in viewport",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configure auto draw",autoOverlayStopped:"Stopped",autoOverlayRunning:"Running",autoOverlayModalTitle:"Auto draw timer",autoOverlayHelp:"Draw overlay image pixels, click Paint, then repeat by timer.",autoOverlayTimer:"Timer",autoOverlayPixelsPerCycle:"Pixels per cycle",autoOverlayStart:"Start auto drawing",autoOverlayStop:"Stop auto drawing",autoOverlayNeedsConfig:"Configure auto draw first",autoOverlayNoTasks:"No pending overlay pixels found in images",seconds:"Seconds",minutes:"Minutes",hours:"Hours",accessTitle:"Access key",accessHelp:"Enter your serial key.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint cooldown",taskWaitingChallengeResolve:"Challenge detected. Auto-solver running before continuing…",taskDrawingRandomPixels:"Drawing random pixels",taskDrawingOverlayPixels:"Drawing overlay pixels",captureHintSelectArea:"Select area",loginTitle:"Sign in",loginHelp:"Enter your serial key.",loginSerialKey:"Serial key",loginSubmit:"Validate serial",loginChecking:"Checking...",loginErrorUnknown:"Could not sign in. Try again later.",accessDenied:"Access denied by Control API.",accessLoginRequired:"Sign in to continue.",accessDeviceLimit:"Device limit reached for this serial key.",accountInfoTitle:"User information",accountInfoRefresh:"Refresh information",accountInfoLoading:"Loading information",settingsAccessStatus:"Access status",settingsApiMode:"API mode",settingsControlUser:"Control API session",settingsLicenseUser:"License username",settingsUserRole:"Role",settingsSerialStatus:"Serial status",settingsSerialValidatedAt:"Serial validated at",settingsLicenseOwner:"License owner",settingsDeviceLimit:"Device limit",settingsCookieJ:"j token",settingsCookieJDetected:"j token detected",settingsCookieJNotDetected:"j token not detected",settingsCookieSource:"Cookie source",settingsWplaceId:"WPlace ID",settingsWplaceName:"WPlace name",settingsDiscord:"Discord",settingsDiscordId:"Discord ID",settingsCountry:"Country",settingsAlliance:"Alliance",settingsAllianceRole:"Alliance role",settingsLevel:"Level",settingsPixelsPainted:"Pixels painted",settingsDroplets:"Droplets",settingsCharges:"Charges",settingsCustomer:"Customer",settingsSuspension:"Suspension",settingsTimeout:"Timeout until",settingsLocalDeviceId:"Local device ID",settingsFingerprint:"Device fingerprint",settingsUserAgent:"User agent",settingsPlatform:"Platform",settingsLanguage:"Language",settingsTimezone:"Timezone",settingsScreen:"Screen",settingsTouchSupport:"Touch support",settingsHardwareConcurrency:"CPU threads",settingsDeviceMemory:"Device memory",settingsMacAddress:"MAC address",settingsMacUnavailable:"Unavailable from browser",autoFarmUsePixelRange:"Use pixel range in Farm",autoDrawUsePixelRange:"Use pixel range in Auto Draw",pixelRange:"Pixel range",pixelRangeMin:"Minimum pixels",pixelRangeMax:"Maximum pixels",pixelRangeInvalid:"The minimum range cannot be greater than the maximum.",widgetImagesCollapse:"Collapse images",widgetImagesExpand:"Expand images",nextRunIn:"next in"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",externalToolsSection:"Herramientas externas",toolColorConverter:"Convertidor de color",toolSamuelArchive:"Archivo Samuel",toolEralyonArchive:"Archivo Eralyon",externalToolsHelp:"Abre herramientas centradas en la zona actual de la URL de Wplace cuando hay lat/lng/zoom.",progressSection:"Progreso",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutMinimizePanel:"Minimizar panel",shortcutShowPanel:"Mostrar panel",shortcutHidePanel:"Ocultar panel",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutOpenSettings:"Abrir configuración",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutStartAutoFarm:"Iniciar auto dibujo",shortcutStopAutoFarm:"Detener auto dibujo",shortcutColorConverter:"Abrir convertidor de color",shortcutSamuelArchive:"Abrir archivo Samuel",shortcutEralyonArchive:"Abrir archivo Eralyon",shortcutsHelp:"Shift+B mostrar widget · Shift+M minimizar panel · Shift+S mostrar panel · Shift+H ocultar panel · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ abrir configuración · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar · Shift+F iniciar auto farm · Shift+G detener auto farm · Shift+1 convertidor de color · Shift+2 archivo Samuel · Shift+3 archivo Eralyon",language:"Idioma",openConfig:"Config",settingsModalTitle:"Configuración",proxyTitle:"Proxy (Beta)",proxyEnabled:"Habilitar proxy para solicitudes web (beta)",shieldTitle:"Shield",shieldEnabled:"Activar Script Shield",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",mobileControls:"Controles móviles",mobileMinimize:"Ocultar panel",mobileShowPanel:"Mostrar panel",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",skipUnavailableColors:"Pintar solo colores disponibles",allColorsEnabled:"Activar todos los colores",enableAllColors:"Activar todos",disableAllColors:"Desactivar todos",replaceWith:"Reemplazar por",shieldProfile:"Perfil",shieldProfileAuto:"Auto",shieldExpires:"Expira",shieldRefreshProfile:"Refrescar perfil",shieldTest:"Probar shield + proxy",shieldChecker:"Shield checker",shieldInfo:"Info Shield",shieldInfoTitle:"Data inyectada del Shield",shieldInfoInjected:"Data inyectada",shieldInfoEnabled:"Protección",shieldInfoBrowser:"Navegador detectado",shieldInfoProxyHint:"Pista de proxy",shieldInfoProfiles:"Perfiles disponibles",shieldInfoModules:"Módulos activos",publicIpTitle:"IP pública detectada",publicIpChecking:"Comprobando IP…",publicIpUnavailable:"IP no disponible",publicIpProxyRoute:"Ruta navegador/proxy",publicIpShieldRoute:"Ruta directa del navegador (solo Shield)",shieldCheckInjected:"Data inyectada del Shield presente",shieldCheckSettings:"Configuración guardada",shieldCheckProfile:"Perfil resuelto",shieldCheckChoices:"Perfiles cargados",shieldCheckNavigator:"Spoof de navegador accesible",scriptUpdate:"Actualizar script",proxyTest:"Test proxy",proxyTesting:"Probando proxy…",proxyOk:"Proxy OK",proxyFail:"Falló el test del proxy",shieldFeatureNavigator:"Navegador",shieldFeatureUaData:"UA-Data",shieldFeatureScreen:"Pantalla",shieldFeatureTimezone:"Zona horaria",shieldFeatureCanvas:"Canvas",shieldFeatureWebgl:"WebGL",shieldFeatureAudio:"Audio",shieldFeaturePlugins:"Plugins",shieldFeatureMediaDevices:"Dispositivos",shieldFeatureStorage:"Almacenamiento",shieldFeatureBattery:"Batería",shieldFeatureSpeech:"Voz",shieldFeatureFonts:"Fuentes",shieldFeatureMatchMedia:"Match media",shieldFeatureSharedArrayBuffer:"SharedArrayBuffer",smartReplaceMode:"Mostrar sugerencias inteligentes de reemplazo",previewStrategy:"Estrategia de vista previa",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",autoFarmSection:"Auto farm",configureAutoFarm:"Configurar auto farm",autoFarmStopped:"Detenido",autoFarmRunning:"Activo",autoFarmModalTitle:"Temporizador auto farm",autoFarmHelp:"Dibuja píxeles aleatorios, pulsa Pintar y repite por temporizador.",autoFarmTimer:"Temporizador",autoFarmPixelsPerCycle:"Píxeles por ciclo",autoFarmStart:"Iniciar auto farm",autoFarmStop:"Detener auto farm",autoFarmNeedsConfig:"Primero configura el auto farm",autoFarmTransparentUnavailable:"Color transparente no disponible",autoFarmNoTransparentTasks:"No se encontraron píxeles dibujables en vista",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configurar auto draw",autoOverlayStopped:"Detenido",autoOverlayRunning:"Activo",autoOverlayModalTitle:"Temporizador auto draw",autoOverlayHelp:"Dibuja píxeles de la imagen overlay, pulsa Pintar y repite por temporizador.",autoOverlayTimer:"Temporizador",autoOverlayPixelsPerCycle:"Píxeles por ciclo",autoOverlayStart:"Iniciar auto dibujo",autoOverlayStop:"Detener auto dibujo",autoOverlayNeedsConfig:"Primero configura el auto draw",autoOverlayNoTasks:"No hay píxeles pendientes en las imágenes overlay",seconds:"Segundos",minutes:"Minutos",hours:"Horas",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando cooldown de pintado",taskWaitingChallengeResolve:"Se detectó un challenge. Ejecutando auto-solver antes de continuar…",taskDrawingRandomPixels:"Dibujando píxeles aleatorios",taskDrawingOverlayPixels:"Dibujando píxeles del overlay",captureHintSelectArea:"Selecciona área",loginTitle:"Iniciar sesión",loginHelp:"Ingresa tu serial.",loginSerialKey:"Serial",loginSubmit:"Validar serial",loginChecking:"Validando...",loginErrorUnknown:"No se pudo iniciar sesión. Inténtalo más tarde.",accessDenied:"Acceso denegado por Control API.",accessLoginRequired:"Inicia sesión para continuar.",accessDeviceLimit:"Límite de dispositivos alcanzado para este serial.",accountInfoTitle:"Información del usuario",accountInfoRefresh:"Actualizar información",accountInfoLoading:"Cargando información",settingsAccessStatus:"Estado de acceso",settingsApiMode:"Modo de API",settingsControlUser:"Sesión Control API",settingsLicenseUser:"Usuario de licencia",settingsUserRole:"Rol",settingsSerialStatus:"Estado del serial",settingsSerialValidatedAt:"Serial validado en",settingsLicenseOwner:"Dueño de licencia",settingsDeviceLimit:"Límite de dispositivos",settingsCookieJ:"Token j",settingsCookieJDetected:"Token j detectado",settingsCookieJNotDetected:"Token j no detectado",settingsCookieSource:"Origen de cookie",settingsWplaceId:"ID de WPlace",settingsWplaceName:"Nombre en WPlace",settingsDiscord:"Discord",settingsDiscordId:"Discord ID",settingsCountry:"País",settingsAlliance:"Alianza",settingsAllianceRole:"Rol en alianza",settingsLevel:"Nivel",settingsPixelsPainted:"Píxeles pintados",settingsDroplets:"Droplets",settingsCharges:"Cargas",settingsCustomer:"Cliente",settingsSuspension:"Suspensión",settingsTimeout:"Timeout hasta",settingsLocalDeviceId:"ID local del dispositivo",settingsFingerprint:"Fingerprint del dispositivo",settingsUserAgent:"User agent",settingsPlatform:"Plataforma",settingsLanguage:"Idioma",settingsTimezone:"Zona horaria",settingsScreen:"Pantalla",settingsTouchSupport:"Soporte táctil",settingsHardwareConcurrency:"Hilos CPU",settingsDeviceMemory:"Memoria del dispositivo",settingsMacAddress:"MAC address",settingsMacUnavailable:"No disponible desde navegador",autoFarmUsePixelRange:"Usar rango de píxeles en Farm",autoDrawUsePixelRange:"Usar rango de píxeles en Auto Draw",pixelRange:"Rango de píxeles",pixelRangeMin:"Píxeles mínimos",pixelRangeMax:"Píxeles máximos",pixelRangeInvalid:"El mínimo del rango no puede ser mayor que el máximo.",widgetImagesCollapse:"Colapsar imágenes",widgetImagesExpand:"Expandir imágenes",nextRunIn:"siguiente en"}};function Pa(){return"es"}function y(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in go)return o;for(let s=0;s<Lo.length;s++){let a=localStorage.getItem(Lo[s]);if(!a||!(a in go))continue;return localStorage.setItem("kglacer-macro:locale",a),a}return Pa()}function po(o){localStorage.setItem("kglacer-macro:locale",o)}function Go(){return Object.keys(go)}function g(o){let s=y();return go[s][o]}function N(o){for(let s of o.querySelectorAll("[data-i18n]"))s.textContent=g(s.dataset.i18n);for(let s of o.querySelectorAll("[data-i18n-title]"))s.setAttribute("title",g(s.dataset.i18nTitle));for(let s of o.querySelectorAll("[data-i18n-aria-label]"))s.setAttribute("aria-label",g(s.dataset.i18nAriaLabel));for(let s of o.querySelectorAll("[data-i18n-placeholder]"))s.setAttribute("placeholder",g(s.dataset.i18nPlaceholder))}class oo{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,s){for(let a in s)this[a]=o.querySelector(s[a])}registerEvent(o,s,a,r={}){r.passive??=!0,o.addEventListener(s,a,r),this.runOnDestroy.push(()=>{o.removeEventListener(s,a)})}}function So(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function xo(o,s,a){let r=So(o/255),i=So(s/255),l=So(a/255),t=Math.cbrt(0.4122214708*r+0.5363325363*i+0.0514459929*l),c=Math.cbrt(0.2119034982*r+0.6806995451*i+0.1073969566*l),n=Math.cbrt(0.0883024619*r+0.2817188376*i+0.6299787005*l),e=0.2104542553*t+0.793617785*c-0.0040720468*n,p=1.9779984951*t-2.428592205*c+0.4505937099*n,d=0.0259040371*t+0.7827717662*c-0.808675766*n;return[e,p,d]}function Wo(o,s,a){let[r,i,l]=o,[t,c,n]=s,e=(wo)=>wo*180/Math.PI,p=(wo)=>wo*Math.PI/180,d=1,f=1,w=1,m=Math.sqrt(i**2+l**2),h=Math.sqrt(c**2+n**2),u=(m+h)/2,b=0.5*(1-Math.sqrt(u**7/(u**7+6103515625))),k=i*(1+b),z=c*(1+b),C=Math.sqrt(k**2+l**2),M=Math.sqrt(z**2+n**2),J=l===0&&k===0?0:e(Math.atan2(l,k))%360,F=n===0&&z===0?0:e(Math.atan2(n,z))%360,U=t-r,_=M-C,K=0;if(C*M!==0){if(K=F-J,K>180)K-=360;else if(K<-180)K+=360}let so=2*Math.sqrt(C*M)*Math.sin(p(K)/2),ro=(r+t)/2,io=(C+M)/2,q=(J+F)/2;if(Math.abs(J-F)>180)q+=180;let ta=1-0.17*Math.cos(p(q-30))+0.24*Math.cos(p(2*q))+0.32*Math.cos(p(3*q+6))-0.2*Math.cos(p(4*q-63)),ca=1+0.015*(ro-50)**2/Math.sqrt(20+(ro-50)**2),Ho=1+0.045*io,Fo=1+0.015*io*ta,na=30*Math.exp((-((q-275)/25))**2),ea=-(2*Math.sqrt(io**7/(io**7+6103515625)))*Math.sin(p(2*na));return Math.sqrt((U/(1*ca))**2+(_/(1*Ho))**2+(so/(1*Fo))**2+ea*(_/(1*Ho))*(so/(1*Fo)))-U*a}var E=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],Z=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function Mo(o){if(o===0)return"transparent";let s=E[o],a=`oklab(${s[0]*100}% ${s[1]} ${s[2]})`;if(typeof CSS<"u"&&CSS.supports("color",a))return a;let[r=0,i=0,l=0]=(Z[o]??"0,0,0").split(",").map((t)=>Number.parseInt(t,10));return`rgb(${r} ${i} ${l})`}var Bo=`<div class="wtopbar">\r
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
`;class x{bot;image;width;exactColor;static async fromJSON(o,s){let a=new Image;return a.src=s.url.startsWith("http")?await fetch(s.url,{cache:"no-store"}).then((r)=>r.blob()).then((r)=>URL.createObjectURL(r)):s.url,await Q(a,["load"],["error"]),new x(o,a,s.width,s.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,s,a=s.naturalWidth,r=!1){this.bot=o;this.image=s;this.width=a;this.exactColor=r;if(r)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let a=1;a<64;a++)o.set(Z[a],[a,a]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>Array(this.canvas.width));let s=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let a=0;a<this.canvas.height;a++)for(let r=0;r<this.canvas.width;r++){let i=(a*this.canvas.width+r)*4,l=s[i],t=s[i+1],c=s[i+2],n=s[i+3],e=l,p=t,d=c,f=`${e},${p},${d}`;if(this.exactColor){this.pixels[a][r]=n<100?0:Z.indexOf(f);continue}let w,m;if(n<100)w=m=0;else if(o.has(f))[w,m]=o.get(f);else{let u=1/0,b=1/0;for(let k=0;k<E.length;k++){let z=E[k],C=Wo(xo(e,p,d),z,0);if(C<u)u=C,w=k;if(C<b)b=C,m=k}o.set(f,[w,m])}if(w!==0)this.context.fillStyle=`oklab(${E[w][0]*100}% ${E[w][1]} ${E[w][2]})`,this.context.fillRect(r,a,1,1);this.pixels[a][r]=w;let h=this.colors.get(m);if(h)h.amount++;else this.colors.set(m,{color:m,amount:1,realColor:m})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}function Ca(){let o=[G,...No];for(let s=0;s<o.length;s++){let a=o[s],r=localStorage.getItem(a);if(!r)continue;return{json:r,key:a}}return}function Eo(){let o=Ca();if(!o)return;let s;try{if(s=JSON.parse(o.json),typeof s!=="object")throw Error("NOT VALID SAVE");if(s.version===1){let a=s.widget;if(a)s.images=a.images,s.strategy=a.strategy,delete s.widget}if(o.key!==G)localStorage.setItem(G,o.json)}catch{localStorage.removeItem(o.key),s=void 0}return s}var Zo;function P(o,s=!1){if(clearTimeout(Zo),s)localStorage.setItem(G,JSON.stringify(o));else Zo=setTimeout(()=>{localStorage.setItem(G,JSON.stringify(o))},600)}var D=1000,Ha=2048,V=D*Ha,W=[],Y=[],Fa=Date.now();function ao(o){W.push(o),Y.push({id:Fa++,latitude:(2*Math.atan(Math.exp(-(o.y/V*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/V*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}ao({x:V/3|0,y:V/3|0});ao({x:V/3*2|0,y:V/3*2|0});function R(o){let[s,a]=o.style.transform.slice(32,-31).split(", ").map((r)=>Number.parseFloat(r));return{x:s,y:a}}class H{bot;static fromJSON(o,s){return new H(o,...s)}static fromScreenPosition(o,s){let{anchorScreenPosition:a,pixelSize:r,anchorWorldPosition:i}=o.findAnchorsForScreen(s);return new H(o,i.x+(s.x-a.x)/r|0,i.y+(s.y-a.y)/r|0)}globalX=0;globalY=0;get tileX(){return this.globalX/D|0}set tileX(o){this.globalX=o*D+this.x}get tileY(){return this.globalY/D|0}set tileY(o){this.globalY=o*D+this.y}get x(){return this.globalX%D}set x(o){this.globalX=this.tileX*D+o}get y(){return this.globalY%D}set y(o){this.globalY=this.tileY*D+o}anchor1Index;anchor2Index;get pixelSize(){return(R(this.bot.$stars[this.anchor2Index]).x-R(this.bot.$stars[this.anchor1Index]).x)/(W[this.anchor2Index].x-W[this.anchor1Index].x)}constructor(o,s,a,r,i){this.bot=o;if(r===void 0||i===void 0)this.globalX=s,this.globalY=a;else this.globalX=s*D+r,this.globalY=a*D+i;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,s=1/0;for(let a=0;a<W.length;a++){let{x:r,y:i}=W[a];if(r<this.globalX&&i<this.globalY){let l=this.globalX-r+(this.globalY-i);if(l<o)o=l,this.anchor1Index=a}else if(r>this.globalX&&i>this.globalY){let l=r-this.globalX+(i-this.globalY);if(l<s)s=l,this.anchor2Index=a}}}toScreenPosition(){let o=W[this.anchor1Index],s=R(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+s.x,y:(this.globalY-o.y)*this.pixelSize+s.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}setMapColor(o){let s=this.bot.mapsCache.get(this.tileX+"/"+this.tileY);if(!s)return;let a=s.pixels[this.y];if(!a)return;a[this.x]=o}scrollScreenTo(){let{x:o,y:s}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:s-window.innerHeight/3})}clone(){return new H(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}function Ja(o){let s=[];for(let{x:a,y:r}of o.iterate){let i=o.pixels[r]?.[a]??0;if(o.disabledColors.has(i))continue;let l=o.readMapColor(a,r);if(i!==l&&(o.drawTransparentPixels||i!==0))s.push({x:a,y:r,color:i})}return s}class j extends oo{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;skipUnavailableColors;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(o,s){return new j(o,H.fromJSON(o,s.position),await x.fromJSON(o,s.pixels),s.strategy,s.opacity,s.drawTransparentPixels,s.drawColorsInOrder,s.skipUnavailableColors,s.colors,s.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$toggleAllColors;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$skipUnavailable;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$previewStrategySelect;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,s,a,r="SPIRAL_FROM_CENTER",i=50,l=!1,t=!1,c=!0,n=[],e=!1){super();this.bot=o;this.position=s;this.pixels=a;this.strategy=r;this.opacity=i;this.drawTransparentPixels=l;this.drawColorsInOrder=t;this.skipUnavailableColors=c;this.colors=n;this.lock=e;this.element.innerHTML=Bo,this.element.classList.add("wimage"),N(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$toggleAllColors:".toggle-all-colors",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$skipUnavailable:".skip-unavailable",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$previewStrategySelect:".preview-strategy-select",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,this.$previewStrategySelect.value=this.strategy,P(this.bot),this.trackAction("image_strategy_changed",{strategy:this.strategy})}),this.registerEvent(this.$previewStrategySelect,"change",()=>{this.$strategy.value=this.$previewStrategySelect.value,this.$strategy.dispatchEvent(new Event("change")),this.renderStrategyPreviewSamples(),this.trackAction("image_preview_strategy_changed",{strategy:this.$previewStrategySelect.value})}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),P(this.bot)}),this.registerEvent(this.$opacity,"change",()=>{this.trackAction("image_opacity_changed",{opacity:this.opacity})}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),P(this.bot),this.trackAction("image_size_reset",{width:this.pixels.width,height:this.pixels.height})}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,P(this.bot),this.trackAction("image_draw_transparent_changed",{enabled:this.drawTransparentPixels})}),this.registerEvent(this.$skipUnavailable,"click",()=>{this.skipUnavailableColors=this.$skipUnavailable.checked,this.updateTasks(),P(this.bot),this.trackAction("image_skip_unavailable_changed",{enabled:this.skipUnavailableColors})}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,P(this.bot),this.trackAction("image_draw_colors_in_order_changed",{enabled:this.drawColorsInOrder})}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),P(this.bot),this.trackAction("image_lock_changed",{locked:this.lock})}),this.registerEvent(this.$delete,"click",()=>{this.trackAction("image_deleted",{source:"image_panel"}),this.destroy()}),this.registerEvent(this.$openColors,"click",()=>{this.trackAction("image_colors_opened",{source:"image_panel"}),this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.trackAction("image_preview_opened",{source:"image_panel"}),this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.trackAction("image_colors_closed",{source:"image_panel"}),this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.trackAction("image_preview_closed",{source:"image_panel"}),this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(p)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(p.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(p)=>{if(p.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors(),this.trackAction("image_color_search_changed",{source:"image_panel",queryLength:this.$colorSearch.value.length})}),this.registerEvent(this.$toggleAllColors,"change",()=>{let p=!this.$toggleAllColors.checked;for(let d of this.colors)d.disabled=p||void 0;this.syncColorBulkToggle(),this.updateTasks(),this.updateColors(),P(this.bot),this.trackAction("image_all_colors_toggled",{source:"image_panel",enabled:!p})}),this.registerEvent(this.$export,"click",()=>{this.trackAction("image_exported",{source:"image_panel"}),this.export()}),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let p of this.element.querySelectorAll(".resize"))this.registerEvent(p,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}trackAction(o,s={}){this.bot.trackAction(o,{source:"image_panel",image:this.bot.summarizeImageForTelemetry(this),...s})}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,skipUnavailableColors:this.skipUnavailableColors,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),s=new Set,a=new Map;for(let i=0;i<this.colors.length;i++){let l=this.colors[i];if(l.disabled||this.skipUnavailableColors&&this.bot.unavailableColors.has(l.realColor))s.add(l.realColor);a.set(l.realColor,i)}let r=Ja({pixels:this.pixels.pixels,drawTransparentPixels:this.drawTransparentPixels,disabledColors:s,iterate:this.strategyPositionIterator(),readMapColor:(i,l)=>{return o.globalX=this.position.globalX+i,o.globalY=this.position.globalY+l,o.getMapColor()}});for(let i=0;i<r.length;i++){let l=r[i];o.globalX=this.position.globalX+l.x,o.globalY=this.position.globalY+l.y,this.tasks.push({position:o.clone(),color:l.color})}if(this.drawColorsInOrder)this.tasks.sort((i,l)=>(a.get(i.color)??0)-(a.get(l.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:s}=this.position.toScreenPosition(),a=this.position.pixelSize*this.pixels.width,r=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${s.toFixed(3)}px, 0)`,this.element.style.width=`${a}px`,this.element.style.height=`${r}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder,this.$skipUnavailable.checked=this.skipUnavailableColors;let i=this.pixels.pixels.length*this.pixels.pixels[0].length,l=Math.max(0,i-this.tasks.length),t=i>0?l/i*100|0:0;this.$progressText.textContent=`${l}/${i} ${t}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${t/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let c of this.element.querySelectorAll(".resize"))c.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),bo(this.bot.images,this),this.bot.widget.update(),P(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.syncPreviewStrategySelect(),this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}syncPreviewStrategySelect(){if(!this.$previewStrategySelect.childElementCount){let o=document.createDocumentFragment();for(let s of this.$strategy.options){let a=document.createElement("option");a.value=s.value,a.textContent=s.textContent,o.append(a)}this.$previewStrategySelect.append(o)}this.$previewStrategySelect.value=this.strategy}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let a=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-a.left,offsetY:o.clientY-a.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let s=this.$colorsDialog.getBoundingClientRect(),a=Math.max(8,window.innerWidth-s.width-8),r=Math.max(8,window.innerHeight-s.height-8),i=Math.min(a,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),l=Math.min(r,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(i)}px`,this.$colorsDialog.style.top=`${Math.round(l)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let s=document.createDocumentFragment(),a=document.createElement("article");a.className="preview-card";let r=document.createElement("strong");r.textContent=this.getStrategyLabel(o);let i=document.createElement("canvas");i.className="preview-canvas",i.width=156,i.height=156,this.paintStrategyPreview(i,o),a.append(r,i),s.append(a),this.$previewDialogList.append(s)}invalidatePreviewCacheIfNeeded(){let o=this.colors.map((a,r)=>`${r}:${a.realColor}:${a.disabled?1:0}`).join("|"),s=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${o}`;if(this.previewCacheSignature===s)return;this.previewCacheSignature=s,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return g("random");case"HUMANIZED":return g("humanized");case"HUMAN_SOFT_DITHER":return g("humanSoftDither");case"HUMAN_PATCHY":return g("humanPatchy");case"HUMAN_SWEEP_ARCS":return g("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return g("humanMicroCorrections");case"HUMAN_JITTER_FILL":return g("humanJitterFill");case"HUMAN_CORNER_BIAS":return g("humanCornerBias");case"HUMAN_LONG_STROKES":return g("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return g("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return g("humanMessySpiral");case"HUMAN_DRUNK_WALK":return g("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return g("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return g("humanPatchJump");case"HUMAN_HESITANT_LINES":return g("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return g("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return g("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return g("humanGapRecovery");case"HUMAN_STAIRCASE":return g("humanStaircase");case"HUMAN_EDGE_HUGGER":return g("humanEdgeHugger");case"HUMAN_BLOBS":return g("humanBlobs");case"HUMAN_BACKTRACK":return g("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return g("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return g("humanLateFixes");case"ZIGZAG":return g("zigzag");case"BRUSH_STROKES":return g("brushStrokes");case"DIAGONAL_BRUSH":return g("diagonalBrush");case"DOWN":return g("down");case"UP":return g("up");case"LEFT":return g("left");case"RIGHT":return g("right");case"SPIRAL_FROM_CENTER":return g("spiralOut");case"SPIRAL_TO_CENTER":return g("spiralIn");case"SCRIBBLE":return g("scribble");case"CROSSHATCH":return g("crosshatch");case"WAVE_SWEEP":return g("waveSweep");case"SCATTERED_LINES":return g("scatteredLines");case"CONTOUR_JITTER":return g("contourJitter");case"SPIRAL_WOBBLE":return g("spiralWobble");case"CLUSTER_BURSTS":return g("clusterBursts");case"ORBITAL":return g("orbital");case"FLOW_FIELD":return g("flowField");case"EDGE_IN":return g("edgeIn");default:return o}}paintStrategyPreview(o,s){let a=o.getContext("2d");if(!a)return;a.fillStyle="#0f1526",a.fillRect(0,0,o.width,o.height);let r=this.getSampledImagePreviewData(),i=this.getCachedPreviewSequence(s,r.mask,r.width,r.height),l=Math.min(o.width/r.width,o.height/r.height),t=(o.width-r.width*l)/2,c=(o.height-r.height*l)/2,n=this.previewAnimations.get(o);if(n)cancelAnimationFrame(n),this.previewAnimationHandles.delete(n);let e=(u)=>{let b=requestAnimationFrame((k)=>{this.previewAnimationHandles.delete(b),u(k)});return this.previewAnimationHandles.add(b),b},p=(u)=>{a.fillStyle="#0f1526",a.fillRect(0,0,o.width,o.height);for(let b=0;b<Math.min(u,i.length);b++){let k=i[b],z=r.colors.get(`${k.x}:${k.y}`)??0;if(!z)continue;a.fillStyle=Mo(z),a.fillRect(t+k.x*l,c+k.y*l,Math.max(1,l),Math.max(1,l))}},d=Math.min(3400,Math.max(900,i.length*8)),w=d+220,m=(u,b)=>{if(!this.$previewDialog.open)return;let k=(b-u)%w,z=Math.min(1,k/d),C=z*z*(3-2*z);p(Math.floor(i.length*C));let M=e((J)=>{m(u,J)});this.previewAnimations.set(o,M)},h=performance.now();m(h,h)}getCachedPreviewSequence(o,s,a=this.pixels.width,r=this.pixels.height){let i=this.colors.map((n,e)=>`${e}:${n.realColor}:${n.disabled?1:0}`).join("|"),l=`${o}:${a}x${r}:${s.length}:${this.drawColorsInOrder?1:0}:${i}`,t=this.previewSequenceCache.get(l);if(t)return t;let c=a===this.pixels.width&&r===this.pixels.height?this.getExactPreviewSequence(o,s):this.getApproxPreviewSequence(o,s,a);if(this.drawColorsInOrder){let n=new Map;for(let e=0;e<this.colors.length;e++)n.set(this.colors[e].realColor,e);c.sort((e,p)=>(n.get(this.pixels.pixels[e.y]?.[e.x]??0)??0)-(n.get(this.pixels.pixels[p.y]?.[p.x]??0)??0))}return this.previewSequenceCache.set(l,c),c}getExactPreviewSequence(o,s){let a=this.strategy;this.strategy=o;let r=[...this.strategyPositionIterator()];this.strategy=a;let i=new Set(s.map(({x:l,y:t})=>`${l}:${t}`));return r.filter(({x:l,y:t})=>i.has(`${l}:${t}`))}getApproxPreviewSequence(o,s,a){let r=[...s],i=(c,n,e)=>{return(c*73856093+n*19349663+e*83492791>>>0)/4294967296},l=(c,n)=>r.sort((e,p)=>e.x*c+e.y*n-(p.x*c+p.y*n)||e.y-p.y||e.x-p.x),t=r.sort((c,n)=>{if(c.y!==n.y)return c.y-n.y;let e=c.y%2===0?c.x:a-c.x,p=n.y%2===0?n.x:a-n.x;return e-p});switch(o){case"UP":return l(0,-1);case"LEFT":return l(-1,0);case"RIGHT":return l(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let c=a/2,n=Math.max(1,Math.round(r.reduce((e,p)=>e+p.y,0)/Math.max(1,r.length)));return r.sort((e,p)=>{let d=(e.x-c)**2+(e.y-n)**2,f=(p.x-c)**2+(p.y-n)**2;return o==="SPIRAL_FROM_CENTER"?d-f:f-d}),r}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return r.sort((c,n)=>i(c.x,c.y,o.length)-i(n.x,n.y,o.length));default:return t}}getSampledImagePreviewData(){let o=this.pixels.width,s=this.pixels.height,a=j.PREVIEW_MASK_BASE_WIDTH,r=j.PREVIEW_MASK_BASE_HEIGHT,i=Math.min(1,a/Math.max(1,o),r/Math.max(1,s)),l=Math.max(1,Math.round(o*i)),t=Math.max(1,Math.round(s*i)),c=new Set;for(let d=0;d<this.colors.length;d++){let f=this.colors[d];if(f.disabled)c.add(f.realColor)}let n=new Map,e=new Map;for(let d=0;d<s;d++)for(let f=0;f<o;f++){let w=this.pixels.pixels[d]?.[f]??0;if(!w||c.has(w))continue;let m=Math.min(l-1,Math.floor(f/o*l)),h=Math.min(t-1,Math.floor(d/s*t)),u=`${m}:${h}`;if(!n.has(u))n.set(u,{x:m,y:h});if(!e.has(u))e.set(u,w)}let p=[...n.values()];if(!p.length){let d=this.fallbackPreviewMask();return{width:o,height:s,mask:d,colors:new Map(d.map((f)=>[`${f.x}:${f.y}`,this.pixels.pixels[f.y]?.[f.x]??0]))}}return{width:l,height:t,mask:p,colors:e}}getImagePreviewMask(){let o=this.pixels.width,s=this.pixels.height,a=new Set;for(let i=0;i<this.colors.length;i++){let l=this.colors[i];if(l.disabled)a.add(l.realColor)}let r=[];for(let i=0;i<s;i++)for(let l=0;l<o;l++){let t=this.pixels.pixels[i]?.[l]??0;if(t!==0&&!a.has(t))r.push({x:l,y:i})}return r.length?r:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],s=this.pixels.width/2,a=this.pixels.height/2,r=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let i=0;i<this.pixels.height;i++)for(let l=0;l<this.pixels.width;l++)if((l-s)**2+(i-a)**2<=r**2)o.push({x:l,y:i});return o}applyLocale(){if(N(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let s=Z[o]??"0,0,0",[a=0,r=0,i=0]=s.split(",").map((l)=>Number.parseInt(l,10));return`#${[a,r,i].map((l)=>l.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let s=Z[o]??"0,0,0",[a=0,r=0,i=0]=s.split(",").map((n)=>Number.parseInt(n,10)),l=Math.max(a,r,i),t=Math.min(a,r,i);if(l-t<15)return["gray","grey","gris","neutral","neutro"];if(a>r+30&&a>i+30)return["red","rojo"];if(r>a+30&&r>i+30)return["green","verde"];if(i>a+30&&i>r+30)return["blue","azul"];if(a>170&&r>120&&i<130)return["orange","naranja"];if(a>170&&r>110&&i>140)return["pink","rosa"];if(a>120&&r<100&&i>120)return["purple","violet","morado"];if(a>130&&r>130&&i<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",g("colorPanelResults"));let s=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((a)=>!this.pixels.colors.has(a.realColor))){let a=new Map(this.colors.map((r)=>[r.realColor,r]));this.colors=this.pixels.colors.values().toArray().sort((r,i)=>i.amount-r.amount).map((r)=>({realColor:r.realColor,disabled:a.get(r.realColor)?.disabled})),P(this.bot)}this.syncColorBulkToggle();for(let a=0;a<this.colors.length;a++){let r=this.colors[a],i=this.pixels.colors.get(r.realColor),l=!1,t=i.amount/o*100,c=this.colorHex(i.realColor),n=this.colorKeywords(i.realColor),e=this.bot.unavailableColors.has(r.realColor),p=Boolean(r.disabled)||this.skipUnavailableColors&&e,d=()=>{if(this.skipUnavailableColors&&e)return;r.disabled=r.disabled?void 0:!0,f.classList.toggle("disabled",Boolean(r.disabled));let h=f.querySelector(".state");if(h)h.textContent=r.disabled||this.skipUnavailableColors&&e?g("disabled"):g("enabled");this.syncColorBulkToggle(),P(this.bot),this.trackAction("image_color_toggled",{source:"image_panel",color:r.realColor,disabled:Boolean(r.disabled),unavailable:e})},f=document.createElement("button");f.className=`color-chip ${p?"disabled":""}`,f.draggable=!0,f.setAttribute("aria-label",`${g("overlayColors")} #${a+1}: ${c.toUpperCase()}`),f.innerHTML=`<span class="order-index">#${a+1}</span>
<span class="drag" title="${g("up")} / ${g("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${t.toFixed(1)}%</span>
  <span class="hex">${c.toUpperCase()}</span>
  <span class="state">${p?g("disabled"):g("enabled")}</span>
</span>
<span class="premium"></span>`,f.querySelector(".swatch").style.setProperty("--swatch-color",Mo(i.realColor)),f.addEventListener("click",()=>{if(l){l=!1;return}d(),this.updateTasks()}),f.addEventListener("dragstart",(h)=>{l=!0,f.classList.add("dragging"),h.dataTransfer?.setData("text/plain",String(a)),h.dataTransfer.effectAllowed="move"}),f.addEventListener("dragend",()=>{f.classList.remove("dragging")}),f.addEventListener("dragover",(h)=>{h.preventDefault(),f.classList.add("drag-target")}),f.addEventListener("dragleave",()=>{f.classList.remove("drag-target")}),f.addEventListener("drop",(h)=>{h.preventDefault(),f.classList.remove("drag-target");let u=Number.parseInt(h.dataTransfer?.getData("text/plain")??"-1",10);if(u<0||u===a||u>=this.colors.length)return;this.colors.splice(a,0,...this.colors.splice(u,1)),P(this.bot),this.trackAction("image_color_reordered",{source:"image_panel",fromIndex:u,toIndex:a,color:r.realColor}),this.updateColors()});let w=document.createElement("button");w.textContent=g("buy"),w.className="buy-chip",w.addEventListener("click",(h)=>{h.stopPropagation(),this.trackAction("image_color_buy_clicked",{source:"image_panel",color:i.realColor}),document.getElementById("color-"+i.realColor)?.click()}),f.append(w);let m=`${c} ${n.join(" ")} ${i.realColor} ${Z[i.realColor]}`;if(!s||m.toLowerCase().includes(s))this.$colorsDialogList.append(f)}}syncColorBulkToggle(){let o=this.colors.filter((a)=>!a.disabled).length,s=o===this.colors.length;this.$toggleAllColors.checked=s,this.$toggleAllColors.indeterminate=o>0&&!s}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,s=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let a=0;a<s;a++)for(let r=0;r<o;r++)yield{x:r,y:a};break}case"UP":{for(let a=s-1;a>=0;a--)for(let r=0;r<o;r++)yield{x:r,y:a};break}case"LEFT":{for(let a=0;a<o;a++)for(let r=0;r<s;r++)yield{x:a,y:r};break}case"RIGHT":{for(let a=o-1;a>=0;a--)for(let r=0;r<s;r++)yield{x:a,y:r};break}case"RANDOM":{let a=[];for(let r=0;r<s;r++)for(let i=0;i<o;i++)a.push({x:i,y:r});for(let r=a.length-1;r>=0;r--){let i=Math.floor(Math.random()*(r+1)),l=a[r];a[r]=a[i],a[i]=l}yield*a;break}case"ZIGZAG":{for(let a=0;a<s;a++)if(a%2===0)for(let r=0;r<o;r++)yield{x:r,y:a};else for(let r=o-1;r>=0;r--)yield{x:r,y:a};break}case"HUMANIZED":{let a=Math.max(4,Math.floor(Math.min(o,s)/10)),r=[];for(let i=0;i<s;i+=a)for(let l=0;l<o;l+=a)r.push({x:l,y:i});for(let i=r.length-1;i>=0;i--){let l=Math.floor(Math.random()*(i+1)),t=r[i];r[i]=r[l],r[l]=t}for(let i=0;i<r.length;i++){let l=r[i],t=Math.min(s,l.y+a),c=Math.min(o,l.x+a);for(let n=l.y;n<t;n++)if(Math.random()>0.35)for(let p=l.x;p<c;p++)yield{x:p,y:n};else for(let p=c-1;p>=l.x;p--)yield{x:p,y:n}}break}case"HUMAN_SOFT_DITHER":{let a=new Set;for(let r=0;r<s;r++){let i=Math.floor(Math.random()*3)-1;if((r+i)%2===0)for(let t=0;t<o;t+=2)a.add(`${t},${r}`),yield{x:t,y:r};else for(let t=1;t<o;t+=2)a.add(`${t},${r}`),yield{x:t,y:r}}for(let r=0;r<s;r++)for(let i=0;i<o;i++){let l=`${i},${r}`;if(a.has(l))continue;yield{x:i,y:r}}break}case"HUMAN_PATCHY":{let a=new Set,r=o*s;while(a.size<r){let i=Math.floor(Math.random()*o),l=Math.floor(Math.random()*s),t=1+Math.floor(Math.random()*5);for(let c=l-t;c<=l+t;c++)for(let n=i-t;n<=i+t;n++){if(n<0||n>=o||c<0||c>=s)continue;if(Math.hypot(n-i,c-l)>t+Math.random()*1.2)continue;let e=`${n},${c}`;if(a.has(e))continue;a.add(e),yield{x:n,y:c}}}break}case"HUMAN_SWEEP_ARCS":{let a=new Set,r=(o-1)/2,i=(s-1)/2,l=Math.hypot(r,i);for(let t=0;t<4;t++){let c=Math.random()*Math.PI*2;for(let n=0;n<=l;n+=0.35){let e=Math.PI/2+Math.random()*(Math.PI/1.5),p=Math.max(10,Math.floor(n*8));for(let d=0;d<p;d++){let f=c+e*d/p+Math.sin(n)*0.08,w=Math.round(r+Math.cos(f)*n),m=Math.round(i+Math.sin(f)*n);if(w<0||w>=o||m<0||m>=s)continue;let h=`${w},${m}`;if(a.has(h))continue;a.add(h),yield{x:w,y:m}}}}for(let t=0;t<s;t++)for(let c=0;c<o;c++){let n=`${c},${t}`;if(a.has(n))continue;yield{x:c,y:t}}break}case"HUMAN_MICRO_CORRECTIONS":{let a=new Set;for(let r=0;r<s;r++){let i=r%2===0?1:-1,l=i>0?0:o-1;for(let t=0;t<o;t++){let c=l+(Math.random()>0.82?i:0),n=r+(Math.random()>0.9?1:0);for(let e of[{x:l,y:r},{x:c,y:r},{x:l,y:n}]){if(e.x<0||e.x>=o||e.y<0||e.y>=s)continue;let p=`${e.x},${e.y}`;if(a.has(p))continue;a.add(p),yield e}l+=i}}for(let r=0;r<s;r++)for(let i=0;i<o;i++){let l=`${i},${r}`;if(a.has(l))continue;yield{x:i,y:r}}break}case"HUMAN_JITTER_FILL":{let a=[];for(let r=0;r<s;r++)for(let i=0;i<o;i++)a.push({x:i,y:r});a.sort((r,i)=>{let l=r.y+(Math.random()-0.5)*1.8,t=i.y+(Math.random()-0.5)*1.8;if(l!==t)return l-t;return r.x+(Math.random()-0.5)*2-(i.x+(Math.random()-0.5)*2)}),yield*a;break}case"HUMAN_CORNER_BIAS":{let a=[{x:0,y:0},{x:o-1,y:0},{x:0,y:s-1},{x:o-1,y:s-1}],r=a[Math.floor(Math.random()*a.length)],i=[];for(let l=0;l<s;l++)for(let t=0;t<o;t++){let n=Math.hypot(t-r.x,l-r.y)+Math.random()*3.5;i.push({point:{x:t,y:l},score:n})}i.sort((l,t)=>l.score-t.score);for(let l of i)yield l.point;break}case"HUMAN_LONG_STROKES":{let a=new Set,r=o*s;while(a.size<r){let i=Math.floor(Math.random()*o),l=Math.floor(Math.random()*s),t=Math.random()*Math.PI*2,c=Math.sign(Math.cos(t)),n=Math.sign(Math.sin(t)),e=10+Math.floor(Math.random()*40);for(let p=0;p<e;p++){if(i<0||i>=o||l<0||l>=s)break;let d=`${i},${l}`;if(!a.has(d))a.add(d),yield{x:i,y:l};if(Math.random()>0.78)i+=n,l+=c;else i+=c,l+=n}}break}case"HUMAN_TAP_CLUSTERS":{let a=new Set,r=o*s;while(a.size<r){let i=Math.floor(Math.random()*o),l=Math.floor(Math.random()*s),t=3+Math.floor(Math.random()*10);for(let c=0;c<t;c++){let n=Math.round(i+(Math.random()-0.5)*6),e=Math.round(l+(Math.random()-0.5)*6);if(n<0||n>=o||e<0||e>=s)continue;let p=`${n},${e}`;if(a.has(p))continue;a.add(p),yield{x:n,y:e}}}break}case"HUMAN_MESSY_SPIRAL":{let a=new Set,r=(o-1)/2,i=(s-1)/2,l=Math.hypot(r,i)+2;for(let t=0;a.size<o*s;t++){let c=t/3,n=Math.min(l,c*0.18),e=c*0.29+Math.sin(c*0.13)*0.8,p=Math.round(r+Math.cos(e)*n+Math.sin(c)*0.7),d=Math.round(i+Math.sin(e)*n+Math.cos(c)*0.7);if(p<0||p>=o||d<0||d>=s){if(t>o*s*18)break;continue}let f=`${p},${d}`;if(a.has(f)){if(Math.random()>0.9)continue}else a.add(f),yield{x:p,y:d};if(t>o*s*18)break}for(let t=0;t<s;t++)for(let c=0;c<o;c++){let n=`${c},${t}`;if(a.has(n))continue;yield{x:c,y:t}}break}case"HUMAN_DRUNK_WALK":{let a=new Set,r=Math.floor(Math.random()*o),i=Math.floor(Math.random()*s),l=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(a.size<o*s){let t=`${r},${i}`;if(!a.has(t))a.add(t),yield{x:r,y:i};let c=[];for(let p of l){let d=r+p.x,f=i+p.y;if(d<0||d>=o||f<0||f>=s)continue;c.push({x:d,y:f})}if(!c.length)break;let n=c.filter((p)=>{return!a.has(`${p.x},${p.y}`)});if(n.length&&Math.random()>0.2){let p=n[Math.floor(Math.random()*n.length)];r=p.x,i=p.y;continue}let e=c[Math.floor(Math.random()*c.length)];r=e.x,i=e.y}for(let t=0;t<s;t++)for(let c=0;c<o;c++){let n=`${c},${t}`;if(a.has(n))continue;yield{x:c,y:t}}break}case"HUMAN_NOISE_CLOUD":{let a=[];for(let r=0;r<s;r++)for(let i=0;i<o;i++){let l=Math.sin((i+1)*0.93+Math.random()*0.8)+Math.cos((r+1)*1.17+Math.random()*0.8),t=(Math.random()-0.5)*2.6,c=Math.hypot(i-o/2,r-s/2)*0.08;a.push({point:{x:i,y:r},score:l+t+c})}a.sort((r,i)=>r.score-i.score);for(let r of a)yield r.point;break}case"HUMAN_PATCH_JUMP":{let a=new Set,r=[];for(let i=0;i<Math.max(6,o*s/18);i++)r.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*s)});while(a.size<o*s){let i=r[Math.floor(Math.random()*r.length)],l=1+Math.floor(Math.random()*3),t=1+Math.floor(Math.random()*3);for(let c=i.y-t;c<=i.y+t;c++)for(let n=i.x-l;n<=i.x+l;n++){if(n<0||n>=o||c<0||c>=s)continue;if(Math.random()>0.86)continue;let e=`${n},${c}`;if(a.has(e))continue;a.add(e),yield{x:n,y:c}}if(Math.random()>0.72&&r.length<o*s/2)r.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*s)});if(a.size>o*s*0.92)break}for(let i=0;i<s;i++)for(let l=0;l<o;l++){let t=`${l},${i}`;if(a.has(t))continue;yield{x:l,y:i}}break}case"HUMAN_HESITANT_LINES":{let a=new Set;for(let r=0;r<s;r++){let i=r%2===0;for(let l=0;l<o;l++){let t=i?l:o-1-l,c=`${t},${r}`;if(!a.has(c))a.add(c),yield{x:t,y:r};if(Math.random()>0.7){let n=Math.max(0,Math.min(o-1,t+(Math.random()>0.5?1:-1))),e=Math.max(0,Math.min(s-1,r+(Math.random()>0.65?1:0))),p=`${n},${e}`;if(!a.has(p))a.add(p),yield{x:n,y:e}}}}for(let r=0;r<s;r++)for(let i=0;i<o;i++){let l=`${i},${r}`;if(a.has(l))continue;yield{x:i,y:r}}break}case"HUMAN_OVERLAP_SWEEPS":{let a=[],r=Math.random()*Math.PI*2;for(let i=0;i<s;i++)for(let l=0;l<o;l++){let t=Math.sin((l+i)*0.42+r)*2.2,c=Math.cos((l-i)*0.3+r)*1.4;a.push({point:{x:l,y:i},score:i+t+c+(Math.random()-0.5)*3.4})}a.sort((i,l)=>i.score-l.score);for(let i of a)yield i.point;break}case"HUMAN_WOBBLE_DRIFT":{let a=[],r=o/2,i=s/2;for(let l=0;l<s;l++)for(let t=0;t<o;t++){let c=Math.hypot(t-r,l-i)*0.25,n=Math.sin((t+1)*0.9)*1.8+Math.cos((l+1)*1.1)*1.8+Math.sin((t+l)*0.35)*1.4;a.push({point:{x:t,y:l},score:c+n+(Math.random()-0.5)*2.8})}a.sort((l,t)=>l.score-t.score);for(let l of a)yield l.point;break}case"HUMAN_GAP_RECOVERY":{let a=new Set,r=[];for(let i=0;i<s;i++)for(let l=0;l<o;l++){if(Math.random()>0.87){r.push({x:l,y:i});continue}a.add(`${l},${i}`),yield{x:l,y:i}}r.sort((i,l)=>Math.hypot(i.x-o/2,i.y-s/2)-Math.hypot(l.x-o/2,l.y-s/2));for(let i of r){let l=`${i.x},${i.y}`;if(a.has(l))continue;a.add(l),yield i}break}case"HUMAN_STAIRCASE":{let a=new Set,r=o+s-1;for(let i=0;i<r;i++){let l=Math.max(0,i-o+1),t=Math.min(s-1,i);for(let c=l;c<=t;c++){let n=i-c,e=[{x:n,y:c},{x:n+(Math.random()>0.5?1:-1),y:c},{x:n,y:c+(Math.random()>0.5?1:-1)}];for(let p of e){if(p.x<0||p.x>=o||p.y<0||p.y>=s)continue;let d=`${p.x},${p.y}`;if(a.has(d))continue;a.add(d),yield p}}}for(let i=0;i<s;i++)for(let l=0;l<o;l++){let t=`${l},${i}`;if(a.has(t))continue;yield{x:l,y:i}}break}case"HUMAN_EDGE_HUGGER":{let a=[];for(let r=0;r<s;r++)for(let i=0;i<o;i++){let l=Math.min(i,r,o-1-i,s-1-r);a.push({point:{x:i,y:r},score:l*3.5+(Math.random()-0.5)*5.5})}a.sort((r,i)=>r.score-i.score);for(let r of a)yield r.point;break}case"HUMAN_BLOBS":{let a=new Set,r=o*s;while(a.size<r){let i=Math.floor(Math.random()*o),l=Math.floor(Math.random()*s),t=1+Math.floor(Math.random()*4);for(let c=l-t;c<=l+t;c++)for(let n=i-t;n<=i+t;n++){if(n<0||n>=o||c<0||c>=s)continue;let e=Math.atan2(c-l,n-i),p=t+Math.sin(e*3+Math.random())*0.8;if(Math.hypot(n-i,c-l)>p)continue;let d=`${n},${c}`;if(a.has(d))continue;a.add(d),yield{x:n,y:c}}}break}case"HUMAN_BACKTRACK":{let a=new Set,r=[];for(let i=0;i<s;i++)for(let l=0;l<o;l++)r.push({x:l,y:i});r.sort((i,l)=>i.y-l.y+(Math.random()-0.5)*2.2+(i.x-l.x)*0.04);for(let i=0;i<r.length;i++){let l=r[i],t=`${l.x},${l.y}`;if(a.has(t))continue;if(a.add(t),yield l,i>1&&Math.random()>0.74){let c=r[i-1],n=`${c.x},${c.y}`;if(!a.has(n))a.add(n),yield c}}for(let i=0;i<s;i++)for(let l=0;l<o;l++){let t=`${l},${i}`;if(a.has(t))continue;yield{x:l,y:i}}break}case"HUMAN_SHAKY_DIAGONAL":{let a=[];for(let r=0;r<s;r++)for(let i=0;i<o;i++){let l=Math.abs(i-r)*0.6,t=Math.sin(i*1.4+r*0.8)*1.8+Math.cos(r*1.1+i*0.5)*1.5;a.push({point:{x:i,y:r},score:l+t+(Math.random()-0.5)*3.2})}a.sort((r,i)=>r.score-i.score);for(let r of a)yield r.point;break}case"HUMAN_LATE_FIXES":{let a=[],r=[];for(let i=0;i<s;i++)for(let l=0;l<o;l++)if(Math.random()>0.9)r.push({x:l,y:i});else a.push({x:l,y:i});a.sort((i,l)=>i.y-l.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?i.x-l.x:0)),r.sort((i,l)=>Math.hypot(l.x-o/2,l.y-s/2)-Math.hypot(i.x-o/2,i.y-s/2)),yield*a,yield*r;break}case"DIAGONAL_BRUSH":{for(let a=0;a<o+s-1;a++){let r=a%2===0,i=[],l=Math.max(0,a-o+1),t=Math.min(s-1,a);for(let c=l;c<=t;c++){let n=a-c;if(n>=0&&n<o)i.push({x:n,y:c})}if(Math.random()>0.55)i.reverse();if(r)for(let c=i.length-1;c>=0;c--)yield i[c];else yield*i}break}case"BRUSH_STROKES":{let a=Array.from({length:s},()=>Array(o).fill(!1)),r=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],i=(c,n)=>c>=0&&c<o&&n>=0&&n<s,l=0,t=o*s;for(let c=0;c<t*6&&l<t;c++){let n=Math.floor(Math.random()*o),e=Math.floor(Math.random()*s),p=r[Math.floor(Math.random()*r.length)],d=3+Math.floor(Math.random()*16);for(let f=0;f<d;f++){if(!i(n,e))break;if(!a[e][n])a[e][n]=!0,l++,yield{x:n,y:e};if(Math.random()>0.72)p=r[Math.floor(Math.random()*r.length)];n+=p.x,e+=p.y}}for(let c=0;c<s;c++)for(let n=0;n<o;n++)if(!a[c][n])yield{x:n,y:c};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let a=new Set,r=o*s,i=Math.floor(o/2),l=Math.floor(s/2),t=[[1,0],[0,1],[-1,0],[0,-1]],c=0,n=1,e=(d,f)=>d>=0&&d<o&&f>=0&&f<s,p=function*(){let d=0;while(d<r){for(let f=0;f<2;f++){for(let w=0;w<n;w++){if(e(i,l)){let m=`${i},${l}`;if(!a.has(m)){if(a.add(m),yield{x:i,y:l},d++,d>=r)return}}i+=t[c][0],l+=t[c][1]}c=(c+1)%4}n++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*p();else{let d=[...p()];for(let f=d.length-1;f>=0;f--)yield d[f]}break}case"SCRIBBLE":{let a=new Set,r=o*s,i=Math.floor(o/2),l=Math.floor(s/2);for(let t=0;a.size<r&&t<r*24;t++){let c=`${i},${l}`;if(!a.has(c))a.add(c),yield{x:i,y:l};if(i+=Math.floor(Math.random()*3)-1,l+=Math.floor(Math.random()*3)-1,i<0||i>=o||l<0||l>=s)i=Math.floor(Math.random()*o),l=Math.floor(Math.random()*s)}for(let t=0;t<s;t++)for(let c=0;c<o;c++){let n=`${c},${t}`;if(a.has(n))continue;a.add(n),yield{x:c,y:t}}break}case"CROSSHATCH":{let a=[];for(let l=0;l<o+s-1;l++)for(let t=Math.max(0,l-o+1);t<=Math.min(s-1,l);t++){let c=l-t;a.push({x:c,y:t})}let r=[];for(let l=-s+1;l<o;l++)for(let t=0;t<s;t++){let c=t+l;if(c>=0&&c<o)r.push({x:c,y:t})}let i=new Set;for(let l of[...a,...r]){let t=`${l.x},${l.y}`;if(i.has(t))continue;i.add(t),yield l}break}case"WAVE_SWEEP":{let a=new Set;for(let r=0;r<o;r++){let l=(Math.sin(r/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(s-1)|0;for(let t=0;t<s;t++){let c=l+t,n=l-t;for(let e of[c,n]){if(e<0||e>=s)continue;let p=`${r},${e}`;if(a.has(p))continue;a.add(p),yield{x:r,y:e}}}}break}case"SCATTERED_LINES":{let a=new Set,r=o*s;for(let i=0;a.size<r&&i<r*14;i++){let l=Math.floor(Math.random()*o),t=Math.floor(Math.random()*s),c=Math.random()*Math.PI*2,n=Math.round(Math.cos(c)),e=Math.round(Math.sin(c)),p=6+Math.floor(Math.random()*28);for(let d=0;d<p;d++){if(l<0||l>=o||t<0||t>=s)break;let f=`${l},${t}`;if(!a.has(f))a.add(f),yield{x:l,y:t};l+=n,t+=e}}for(let i=0;i<s;i++)for(let l=0;l<o;l++){let t=`${l},${i}`;if(a.has(t))continue;a.add(t),yield{x:l,y:i}}break}case"CONTOUR_JITTER":{let a=new Set;for(let r=0;r<Math.ceil(Math.min(o,s)/2);r++){let i=[],l=r,t=r,c=o-r-1,n=s-r-1;for(let e=l;e<=c;e++)i.push({x:e,y:t});for(let e=t+1;e<=n;e++)i.push({x:c,y:e});for(let e=c-1;e>=l;e--)i.push({x:e,y:n});for(let e=n-1;e>t;e--)i.push({x:l,y:e});for(let e=i.length-1;e>0;e--){let p=Math.floor(Math.random()*(e+1)),d=i[e];i[e]=i[p],i[p]=d}for(let e of i){let p=`${e.x},${e.y}`;if(a.has(p))continue;a.add(p),yield e}}break}case"SPIRAL_WOBBLE":{let a=new Set,r=o/2,i=s/2,l=Math.hypot(r,i);for(let t=0;a.size<o*s&&t<o*s*9;t++){let c=t/(o*s*9)*l,n=t*0.31+Math.sin(t*0.07)*0.7,e=Math.round(r+Math.cos(n)*c),p=Math.round(i+Math.sin(n)*c);if(e<0||e>=o||p<0||p>=s)continue;let d=`${e},${p}`;if(a.has(d))continue;a.add(d),yield{x:e,y:p}}for(let t=0;t<s;t++)for(let c=0;c<o;c++){let n=`${c},${t}`;if(a.has(n))continue;yield{x:c,y:t}}break}case"CLUSTER_BURSTS":{let a=new Set,r=o*s;for(let i=0;a.size<r&&i<r*12;i++){let l=Math.floor(Math.random()*o),t=Math.floor(Math.random()*s),c=2+Math.floor(Math.random()*10);for(let n=t-c;n<=t+c;n++)for(let e=l-c;e<=l+c;e++){if(e<0||e>=o||n<0||n>=s)continue;if(Math.hypot(e-l,n-t)>c)continue;let p=`${e},${n}`;if(a.has(p))continue;a.add(p),yield{x:e,y:n}}}for(let i=0;i<s;i++)for(let l=0;l<o;l++){let t=`${l},${i}`;if(a.has(t))continue;a.add(t),yield{x:l,y:i}}break}case"ORBITAL":{let a=new Set,r=(o-1)/2,i=(s-1)/2,l=Math.ceil(Math.max(r,i));for(let t=0;t<=l;t++){let c=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,t)*2));for(let n=0;n<c;n++){let e=n/c*Math.PI*2+(t%2?0.3:-0.3),p=Math.round(r+Math.cos(e)*t),d=Math.round(i+Math.sin(e)*t);if(p<0||p>=o||d<0||d>=s)continue;let f=`${p},${d}`;if(a.has(f))continue;a.add(f),yield{x:p,y:d}}}for(let t=0;t<s;t++)for(let c=0;c<o;c++){let n=`${c},${t}`;if(a.has(n))continue;yield{x:c,y:t}}break}case"FLOW_FIELD":{let a=new Set,r=o*s;for(let i=0;a.size<r&&i<r*18;i++){let l=Math.floor(Math.random()*o),t=Math.floor(Math.random()*s);for(let c=0;c<120;c++){if(l<0||l>=o||t<0||t>=s)break;let n=`${l},${t}`;if(!a.has(n))a.add(n),yield{x:l,y:t};let e=Math.sin(l*0.09)*1.8+Math.cos(t*0.08)*1.6+Math.sin((l+t)*0.05);l+=Math.round(Math.cos(e)),t+=Math.round(Math.sin(e))}}for(let i=0;i<s;i++)for(let l=0;l<o;l++){let t=`${l},${i}`;if(a.has(t))continue;a.add(t),yield{x:l,y:i}}break}case"EDGE_IN":{let a=new Set,r=Math.ceil(Math.min(o,s)/2);for(let i=0;i<r;i++){let l=i,t=o-1-i,c=i,n=s-1-i;for(let e=l;e<=t;e++)for(let p of[c,n]){let d=`${e},${p}`;if(a.has(d))continue;a.add(d),yield{x:e,y:p}}for(let e=c+1;e<=n-1;e++)for(let p of[l,t]){let d=`${p},${e}`;if(a.has(d))continue;a.add(d),yield{x:p,y:e}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY},this.trackAction("image_move_started",{source:"image_panel",screenPosition:{x:o.clientX,y:o.clientY}})}moveStop(){if(this.moveInfo){let o=this.moveInfo,s=o.width!==void 0||o.height!==void 0?"resize":"move";this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),P(this.bot),this.trackAction(s==="resize"?"image_resized":"image_moved",{source:"image_panel",mode:s,previous:{globalX:o.globalX,globalY:o.globalY,width:o.width,height:o.height}})}}move(o){if(!this.moveInfo)return;let s=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),a=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=s+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-s)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,s+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=a+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-a)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,a+this.moveInfo.height);this.update(),P(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let s=o.target;if(s.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(s.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(s.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(s.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX;this.trackAction("image_resize_started",{source:"image_panel",handles:Array.from(s.classList).filter((a)=>["n","e","s","w"].includes(a)),width:this.pixels.width,height:this.pixels.height,screenPosition:{x:o.clientX,y:o.clientY}})}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${X}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}function Po(){let o=localStorage.getItem("kglacer-macro:shield-config");if(!o)return!1;try{return JSON.parse(o).enabled!==!1}catch{return!1}}function Ro(o){localStorage.setItem("kglacer-macro:shield-config",JSON.stringify({enabled:o}))}function Na(o){let s=`${o?.host??""} ${o?.username??""}`.toLowerCase(),a=/(mx|mex|mexico)/.test(s)?"MX":"AUTO";localStorage.setItem("__afm_proxy_hint",a)}function qo(o){if(!Po())return;if(document.getElementById("kgm-shield-full"))return;Na(o);let s=document.createElement("script");s.id="kgm-shield-full",s.textContent=`// ==UserScript==
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
})();`,document.documentElement.append(s),s.remove()}var Oo=`/* stylelint-disable declaration-no-important */
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
`;class fo extends Error{name="KGlacerMacroError";constructor(o,s){super(o);s.widget.status=o}}class Do extends fo{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var A={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0},startAutoFarm:{key:"f",shift:!0},stopAutoFarm:{key:"g",shift:!0},openColorConverterTool:{key:"1",shift:!0},openSamuelArchiveTool:{key:"2",shift:!0},openEralyonArchiveTool:{key:"3",shift:!0},openReceiveSmssTool:{key:"4",shift:!0},openEsimplusTool:{key:"5",shift:!0},openReceiveSmsFreeTool:{key:"6",shift:!0},openQuackrTool:{key:"7",shift:!0},openTextverifiedTool:{key:"8",shift:!0}};function S(o,s){let a=s.key.toLowerCase(),r=o.key.toLowerCase(),i=(o.code??"").toLowerCase(),l=a==="/"&&(r==="/"||r==="?"||i==="slash"),t=s.shift===!0&&/^\d$/.test(a)&&(i===`digit${a}`||i===`numpad${a}`),c=l||t||r===a,n=s.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,e=s.ctrl===!0?!0:s.meta===!0?o.metaKey:!o.metaKey;return c&&o.shiftKey===Boolean(s.shift)&&n&&e&&o.altKey===Boolean(s.alt)}function Vo(o){if(typeof HTMLElement>"u")return!1;if(!(o instanceof HTMLElement))return!1;let s=o.tagName.toLowerCase();return s==="input"||s==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var Yo=`<button class="wopen-button" aria-label="Toggle widget">\r
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
`;var _o="kglacer-macro:overlay-hidden",Xo="kglacer-macro:images-collapsed",Io="kglacer-macro:auto-farm-config",vo="kglacer-macro:auto-overlay-config",$o="kglacer-macro:proxy-config",yo="__afm_proxy_hint",Ua=["https://api.ipify.org?format=json","https://icanhazip.com"],Ka="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg",Qa="https://pepoafonso.github.io/color_converter_wplace/es/index.html",oa="https://wplace.samuelscheit.com/",aa="https://wplace.eralyon.net/",sa="v69.051",La="https://receive-smss.com/",Ga="https://esimplus.me/temporary-numbers",xa="https://receive-sms-free.cc/",Wa="https://quackr.io/?srsltid=AfmBOoqu2h3Pt6-h3HtJ_tixaj5WGtA7ZaI9sLQiQnPTnisDxe0MXbje",Ba="https://www.textverified.com/free";class Co extends oo{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen");let s=this.element.querySelector(".wopen-button");if(!s)return;s.setAttribute("aria-expanded",String(o)),s.setAttribute("aria-label",o?g("mobileMinimize"):g("mobileShowPanel")),s.title=o?g("mobileMinimize"):g("mobileShowPanel")}$settings;$status;$openConfig;$mobileMinimize;$mobileSettings;$mobileScrollImages;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toolColorConverter;$toolSamuelArchive;$toolEralyonArchive;$toolReceiveSmss;$toolEsimplus;$toolReceiveSmsFree;$toolQuackr;$toolTextverified;$toggleOverlay;$autofarmConfig;$autofarmStart;$autofarmStop;$autofarmStatus;$autoOverlayConfig;$autoOverlayStart;$autoOverlayStop;$autoOverlayStatus;$strategy;$progressLine;$progressText;$images;$imagesSection;$imagesCollapseState;$wopenButton;$widgetLogo;activeImageIndex=-1;autoFarmIntervalId;autoFarmConfig;autoFarmTickRunning=!1;autoFarmNextTickAt;autoOverlayIntervalId;autoOverlayConfig;autoOverlayTickRunning=!1;autoOverlayNextTickAt;statusRefreshIntervalId;challengeWatcherObserver;challengeWatcherRunning=!1;imagesListDirty=!0;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=Yo,N(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$openConfig:".open-config",$mobileMinimize:".mobile-minimize",$mobileSettings:".mobile-settings",$mobileScrollImages:".mobile-scroll-images",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toolColorConverter:".tool-color-converter",$toolSamuelArchive:".tool-samuel-archive",$toolEralyonArchive:".tool-eralyon-archive",$toolReceiveSmss:".tool-receive-smss",$toolEsimplus:".tool-esimplus",$toolReceiveSmsFree:".tool-receive-sms-free",$toolQuackr:".tool-quackr",$toolTextverified:".tool-textverified",$toggleOverlay:".toggle-overlay",$autofarmConfig:".autofarm-config",$autofarmStart:".autofarm-start",$autofarmStop:".autofarm-stop",$autofarmStatus:".autofarm-status",$autoOverlayConfig:".autooverlay-config",$autoOverlayStart:".autooverlay-start",$autoOverlayStop:".autooverlay-stop",$autoOverlayStatus:".autooverlay-status",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images",$imagesSection:".widget-section-images",$imagesCollapseState:".images-collapse-state"}),this.$widgetLogo.src=Ka,this.$wopenButton.addEventListener("click",()=>{this.open=!this.open,this.trackAction("widget_panel_toggled",{source:"widget_button",open:this.open})}),this.$draw.addEventListener("click",()=>{this.trackAction("draw_button_clicked",{source:"widget_button"}),this.bot.draw()}),this.$drawAndPaint.addEventListener("click",()=>{this.trackAction("draw_and_paint_button_clicked",{source:"widget_button"}),this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>{this.trackAction("add_image_button_clicked",{source:"widget_button"}),this.addImage()}),this.$openConfig.addEventListener("click",()=>{this.trackAction("settings_opened",{source:"widget_button"}),this.openSettingsModal()}),this.$mobileMinimize.addEventListener("click",()=>{this.open=!1,this.trackAction("widget_panel_minimized",{source:"mobile_button"})}),this.$mobileSettings.addEventListener("click",()=>{this.trackAction("settings_opened",{source:"mobile_button"}),this.openSettingsModal()}),this.$mobileScrollImages.addEventListener("click",()=>{this.open=!0,this.$imagesSection.open=!0,this.$imagesSection.scrollIntoView({behavior:"smooth",block:"start"}),this.trackAction("mobile_scroll_images_clicked",{source:"mobile_button"})}),this.$captureTemplate.addEventListener("click",()=>{this.trackAction("capture_template_button_clicked",{source:"widget_button"}),this.captureTemplate()}),this.$toolColorConverter.addEventListener("click",()=>{this.openExternalTool("colorConverter")}),this.$toolSamuelArchive.addEventListener("click",()=>{this.openExternalTool("samuelArchive")}),this.$toolEralyonArchive.addEventListener("click",()=>{this.openExternalTool("eralyonArchive")}),this.$toolReceiveSmss.addEventListener("click",()=>{this.openExternalTool("receiveSmss")}),this.$toolEsimplus.addEventListener("click",()=>{this.openExternalTool("esimplus")}),this.$toolReceiveSmsFree.addEventListener("click",()=>{this.openExternalTool("receiveSmsFree")}),this.$toolQuackr.addEventListener("click",()=>{this.openExternalTool("quackr")}),this.$toolTextverified.addEventListener("click",()=>{this.openExternalTool("textverified")}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$autofarmConfig.addEventListener("click",()=>{this.trackAction("auto_farm_config_opened",{source:"widget_button"}),this.openAutoFarmModal()}),this.$autofarmStart.addEventListener("click",()=>{this.trackAction("auto_farm_start_clicked",{source:"widget_button"}),this.startAutoFarm()}),this.$autofarmStop.addEventListener("click",()=>{this.trackAction("auto_farm_stop_clicked",{source:"widget_button"}),this.stopAutoFarm()}),this.$autoOverlayConfig.addEventListener("click",()=>{this.trackAction("auto_draw_config_opened",{source:"widget_button"}),this.openAutoOverlayModal()}),this.$autoOverlayStart.addEventListener("click",()=>{this.trackAction("auto_draw_start_clicked",{source:"widget_button"}),this.startAutoOverlay()}),this.$autoOverlayStop.addEventListener("click",()=>{this.trackAction("auto_draw_stop_clicked",{source:"widget_button"}),this.stopAutoOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value,this.trackAction("bot_strategy_changed",{source:"widget_select",strategy:this.bot.strategy})}),this.applyImagesCollapsedPreference(),this.$imagesSection.addEventListener("toggle",()=>{if(this.persistImagesCollapsedPreference(!this.$imagesSection.open),this.refreshImagesCollapseText(),this.trackAction("widget_images_section_toggled",{source:"widget_details",open:this.$imagesSection.open,collapsed:!this.$imagesSection.open,images:this.bot.images.length}),!this.$imagesSection.open||!this.imagesListDirty)return;this.renderImagesList(),this.imagesListDirty=!1}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.loadAutoFarmConfigFromStorage(),this.loadAutoOverlayConfigFromStorage(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.statusRefreshIntervalId=window.setInterval(()=>{this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.refreshProgress()},1000),this.open=!0,window.setTimeout(()=>{this.recommendUpdateIfOutdated()},2500),console.log("[KGM][Widget] Widget mounted and opened")}trackAction(o,s={}){this.bot.trackAction(o,{source:"widget",...s})}imageTelemetry(o){let s=this.bot.images[o];if(!s)return{index:o,missing:!0};return this.bot.summarizeImageForTelemetry(s,o)}fileTelemetry(o){return{name:o.name,size:o.size,type:o.type,lastModified:o.lastModified,extension:o.name.includes(".")?o.name.split(".").pop()?.toLowerCase():""}}startChallengeWatcher(){let o=()=>{if(!this.isChallengeBlockingPaint())return;if(this.challengeWatcherRunning)return;this.challengeWatcherRunning=!0,this.status=`⌛ ${g("taskWaitingChallengeResolve")}`,this.waitForChallengeToResolve().finally(()=>{this.challengeWatcherRunning=!1})};this.challengeWatcherObserver=new MutationObserver(()=>{o()}),this.challengeWatcherObserver.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["open","style","class","value","aria-hidden"]});let s=window.setInterval(o,750);this.runOnDestroy.push(()=>{this.challengeWatcherObserver?.disconnect(),clearInterval(s)}),o()}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.trackAction("image_add_started",{source:"widget"}),this.setDisabled("add-image",!0),this.run(g("taskAddingImage"),async()=>{let o;try{await this.bot.updateColors();let s=document.createElement("input");s.type="file",s.accept=`image/*,.${X},.wplace`,s.click(),await Q(s,["change"],["cancel","error"]);let a=s.files?.[0];if(!a)throw new Do(this.bot);o=this.fileTelemetry(a),this.trackAction("image_file_selected",{source:"file_picker",file:o}),console.log("[KGM][Widget] File selected",{name:a.name,size:a.size,type:a.type});let r;if(a.name.endsWith(`.${X}`))r=await j.fromJSON(this.bot,JSON.parse(await a.text()));else if(a.name.endsWith(".wplace")){let l=JSON.parse(await a.text());if(!l.image?.dataUrl)throw Error("Invalid .wplace file: image.dataUrl missing");let t=new Image;if(t.src=l.image.dataUrl,await Q(t,["load"],["error"]),await this.waitForStableViewportProjection(),r=new j(this.bot,H.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new x(this.bot,t)),typeof l.opacity==="number")r.opacity=Math.max(0,Math.min(1,l.opacity))}else{let l=new FileReader;l.readAsDataURL(a),await Q(l,["load"],["error"]);let t=await this.compressImageBeforeLoad(l.result),c=new Image;c.src=t,await Q(c,["load"],["error"]),await this.waitForStableViewportProjection(),r=new j(this.bot,H.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new x(this.bot,c))}this.bot.images.push(r);let i=this.bot.images.length-1;console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),this.trackAction("image_loaded",{source:"file_picker",file:o,image:this.imageTelemetry(i),images:this.bot.images.length}),await this.bot.readMap(),r.updateTasks(),P(this.bot,!0),this.bot.updateTasks(),this.update(),window.setTimeout(()=>{globalThis.location.reload()},120)}catch(s){throw this.trackAction("image_load_failed",{source:"file_picker",file:o??null,reason:s instanceof Error?s.message:"unknown"}),s}},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.trackAction("capture_template_started",{source:"widget"}),this.run(g("taskCapturingMapImage"),async()=>{try{let o=await this.resolveCaptureBounds(),{minGlobalX:s,minGlobalY:a,maxGlobalX:r,maxGlobalY:i}=o;this.trackAction("capture_template_area_selected",{source:"widget",selection:o,width:r-s+1,height:i-a+1});let l=document.createElement("canvas");l.width=Math.max(1,r-s+1),l.height=Math.max(1,i-a+1);let t=l.getContext("2d");if(!t)throw Error("Capture context unavailable");t.imageSmoothingEnabled=!1;let c=Math.floor(s/D),n=Math.floor(a/D),e=Math.floor(r/D),p=Math.floor(i/D),d=(e-c+1)*(p-n+1),f=0;for(let m=c;m<=e;m++)for(let h=n;h<=p;h++){this.status=`⌛ ${g("taskReadingTiles")} [${++f}/${d}]`;let u=await this.loadTileImage(m,h),b=m*D,k=h*D,z=Math.max(s,b),C=Math.min(r,b+D-1),M=Math.max(a,k),J=Math.min(i,k+D-1),F=z-b,U=M-k,_=C-z+1,K=J-M+1,so=z-s,ro=M-a;t.drawImage(u,F,U,_,K,so,ro,_,K)}let w=Date.now();await this.downloadCapture(l,"png",w),this.trackAction("capture_template_completed",{source:"widget",selection:o,width:l.width,height:l.height,totalTiles:d,format:"png"})}catch(o){throw this.trackAction("capture_template_failed",{source:"widget",reason:o instanceof Error?o.message:"unknown"}),o}},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,s,a){let r=s==="webp"?"image/webp":"image/png",i=await new Promise((c,n)=>{o.toBlob((e)=>{if(!e){n(Error(`Failed to create ${s.toUpperCase()} capture file`));return}c(e)},r)}),l=URL.createObjectURL(i),t=document.createElement("a");t.href=l,t.download=`wplace-capture-${a}.${s}`,t.click(),URL.revokeObjectURL(l)}async loadTileImage(o,s){let a;for(let r=1;r<=3;r++)try{let i=new Image;return i.crossOrigin="anonymous",i.referrerPolicy="no-referrer",i.src=`https://backend.wplace.live/files/s0/tiles/${o}/${s}.png?ts=${Date.now()}-${r}`,await Q(i,["load"],["error"]),i}catch(i){if(a=i,r<3)await new Promise((l)=>setTimeout(l,r*200))}throw a instanceof Error?a:Error(`Tile fetch failed (${o}/${s})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((o,s)=>{let a=document.createElement("div");a.className="kgm-capture-overlay",a.innerHTML=`<div class="kgm-capture-hint">${g("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let r=a.querySelector(".kgm-capture-box");document.body.append(a);let i,l,t=()=>{window.removeEventListener("keydown",d,!0),a.removeEventListener("pointermove",e),a.removeEventListener("pointerdown",p),a.remove()},c=(f)=>{let w=Math.min(i.x,f.x),m=Math.min(i.y,f.y),h=Math.abs(i.x-f.x)+1,u=Math.abs(i.y-f.y)+1;return{left:w,top:m,width:h,height:u}},n=(f)=>{let{left:w,top:m,width:h,height:u}=c(f);r.style.left=`${w}px`,r.style.top=`${m}px`,r.style.width=`${h}px`,r.style.height=`${u}px`},e=(f)=>{if(!i)return;n({x:f.clientX,y:f.clientY})},p=(f)=>{if(f.preventDefault(),!i){i={x:f.clientX,y:f.clientY};let z=H.fromScreenPosition(this.bot,i);l={x:z.globalX,y:z.globalY},n(i);return}let w={x:f.clientX,y:f.clientY},m=H.fromScreenPosition(this.bot,w);if(t(),!l){s(Error("Capture anchor point unavailable"));return}let h=Math.min(l.x,m.globalX),u=Math.min(l.y,m.globalY),b=Math.max(l.x,m.globalX),k=Math.max(l.y,m.globalY);if(b-h<1||k-u<1){s(Error("Capture area too small"));return}o({minGlobalX:h,minGlobalY:u,maxGlobalX:b,maxGlobalY:k})},d=(f)=>{if(f.key!=="Escape")return;t(),s(Error("Capture cancelled"))};window.addEventListener("keydown",d,!0),a.addEventListener("pointermove",e),a.addEventListener("pointerdown",p)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let s=new Image;if(s.src=o,await Q(s,["load"],["error"]),!(s.naturalWidth*s.naturalHeight>3000000||o.length>3000000))return o;let r=document.createElement("canvas");r.width=s.naturalWidth,r.height=s.naturalHeight;let i=r.getContext("2d");if(!i)return o;return i.drawImage(s,0,0),r.toDataURL("image/png")}async waitForStableViewportProjection(){let o=this.defaultImageScreenPosition(),s=0,a;for(let r=0;r<45;r++){await new Promise((e)=>requestAnimationFrame(()=>{e()}));let{anchorScreenPosition:{x:i,y:l},pixelSize:t}=this.bot.findAnchorsForScreen(o);if(!Number.isFinite(t)||t<=0){s=0;continue}let c={anchorX:i,anchorY:l,pixelSize:t};if(!a){a=c,s=1;continue}if(Math.abs(c.anchorX-a.anchorX)+Math.abs(c.anchorY-a.anchorY)+Math.abs(c.pixelSize-a.pixelSize)<0.0012)s++;else s=0;if(a=c,s>=3)return}}update(){if(this.$strategy.value=this.bot.strategy,this.refreshProgress(),this.imagesListDirty=!0,!this.$imagesSection.open)return;this.renderImagesList(),this.imagesListDirty=!1}renderImagesList(){this.$images.innerHTML="";let o=document.createDocumentFragment();for(let s=0;s<this.bot.images.length;s++){let a=this.bot.images[s],r=document.createElement("div");o.append(r),r.className="image",r.innerHTML=`<button class="preview" title="View preview">
  <img src="${a.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="focus-map" title="Go to image position"><i class="fa-solid fa-location-crosshairs" aria-hidden="true"></i></button>
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="strategy-modal" title="Strategy modal"><i class="fa-solid fa-sliders" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${s===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${s===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,r.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=s,this.trackAction("image_preview_opened",{source:"image_controls",image:this.imageTelemetry(s)}),a.openPreviewPanel()}),r.querySelector(".focus-map").addEventListener("click",()=>{this.activeImageIndex=s,this.trackAction("image_focus_requested",{source:"image_controls",image:this.imageTelemetry(s)}),a.position.scrollScreenTo()}),r.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=s,this.trackAction("image_colors_opened",{source:"image_controls",image:this.imageTelemetry(s)}),a.openColorPanel()}),r.querySelector(".strategy-modal").addEventListener("click",()=>{this.activeImageIndex=s,this.trackAction("image_strategy_modal_opened",{source:"image_controls",image:this.imageTelemetry(s)}),a.openPreviewPanel()}),r.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=s,this.trackAction("image_strategy_preview_opened",{source:"image_controls",image:this.imageTelemetry(s)}),a.openPreviewPanel()}),r.querySelector(".download").addEventListener("click",()=>{this.trackAction("image_settings_downloaded",{source:"image_controls",image:this.imageTelemetry(s)}),a.exportImage()}),r.querySelector(".delete").addEventListener("click",()=>{this.trackAction("image_deleted",{source:"image_controls",image:this.imageTelemetry(s)}),a.destroy()}),r.querySelector(".up").addEventListener("click",()=>{this.trackAction("image_reordered",{source:"image_controls",direction:"up",fromIndex:s,toIndex:s-1,image:this.imageTelemetry(s)}),uo(this.bot.images,s,s-1),this.update(),P(this.bot)}),r.querySelector(".down").addEventListener("click",()=>{this.trackAction("image_reordered",{source:"image_controls",direction:"down",fromIndex:s,toIndex:s+1,image:this.imageTelemetry(s)}),uo(this.bot.images,s,s+1),this.update(),P(this.bot)})}this.$images.append(o)}refreshProgress(){let o=0,s=0;for(let i=0;i<this.bot.images.length;i++){let l=this.bot.images[i];o+=l.pixels.pixels.length*l.pixels.pixels[0].length,s+=l.tasks.length}let a=Math.max(0,o-s),r=o>0?a/o*100|0:0;this.$progressText.textContent=`${a}/${o} ${r}% ETA: ${s/120|0}h`,this.$progressLine.style.transform=`scaleX(${r/100})`}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(_o)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let s=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",s),localStorage.setItem(_o,String(s)),this.refreshOverlayToggleText(),this.trackAction("overlay_visibility_changed",{source:"widget",hidden:s})}refreshOverlayToggleText(){let o=document.body.classList.contains("overlay-hidden"),s=o?g("disabled"):g("enabled"),a=o?'<i class="fa-solid fa-circle-xmark" aria-hidden="true"></i>':'<i class="fa-solid fa-circle-check" aria-hidden="true"></i>';this.$toggleOverlay.innerHTML=`<i class="fa-solid fa-layer-group"></i><span>${g("toggleOverlay")} (${s})</span>${a}`}applyLocaleToUI(o){po(o),N(this.element);for(let s=0;s<this.bot.images.length;s++)this.bot.images[s].applyLocale();this.refreshOverlayToggleText(),this.refreshImagesCollapseText(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText()}applyImagesCollapsedPreference(){let o=this.readImagesCollapsedPreference();if(this.$imagesSection.open=!o,this.refreshImagesCollapseText(),this.$imagesSection.open&&this.imagesListDirty)this.renderImagesList(),this.imagesListDirty=!1}readImagesCollapsedPreference(){let o=localStorage.getItem(Xo);if(o==="true")return!0;if(o==="false")return!1;return to().imagesCollapsed??!1}persistImagesCollapsedPreference(o){localStorage.setItem(Xo,String(o)),$({imagesCollapsed:o})}refreshImagesCollapseText(){this.$imagesCollapseState.textContent=this.$imagesSection.open?g("widgetImagesCollapse"):g("widgetImagesExpand")}openSettingsModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog",o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="settingsModalTitle">Settings</strong>
    <button type="button" class="modal-close" aria-label="${g("close")}"><span class="icon">×</span></button>
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
</form>`,document.body.append(o),N(o);let s=o.querySelector(".settings-locale");s.value=y(),o.querySelector(".script-update").addEventListener("click",()=>{this.trackAction("script_update_link_opened",{source:"settings_modal",targetUrl:"https://github.com/robgallardof/kglacer-macro/raw/refs/heads/main/dist.user.js"}),globalThis.open("https://github.com/robgallardof/kglacer-macro/raw/refs/heads/main/dist.user.js","_blank","noopener,noreferrer")}),s.addEventListener("change",()=>{this.applyLocaleToUI(s.value),N(o),this.trackAction("settings_locale_changed",{source:"settings_modal",locale:s.value})});let a=JSON.parse(localStorage.getItem($o)??"{}"),r=o.querySelector(".proxy-enabled"),i=o.querySelector(".proxy-host"),l=o.querySelector(".proxy-port"),t=o.querySelector(".proxy-user"),c=o.querySelector(".proxy-pass"),n=o.querySelector(".shield-enabled"),e=o.querySelector(".proxy-settings"),p=o.querySelector(".shield-settings"),d=o.querySelector(".shield-controls"),f=o.querySelector(".proxy-test"),w=o.querySelector(".proxy-test-output"),m=o.querySelector(".public-ip-value"),h=o.querySelector(".public-ip-route"),u=o.querySelector(".account-info-refresh"),b=o.querySelector(".account-info-output"),k=async()=>{u.disabled=!0,await this.renderAccountInfoOutput(b),u.disabled=!1};u.addEventListener("click",async()=>{this.trackAction("settings_account_refresh_clicked",{source:"settings_modal"}),await this.bot.refreshControlAccess("settings").catch(()=>null),await k()}),k(),r.checked=Boolean(a.enabled),n.checked=Po(),e.open=r.checked,p.open=n.checked,this.renderShieldControls(d),i.value=a.host??"",l.value=a.port??"",t.value=a.username??"",c.value=a.password??"";let z=(M=!0)=>{let J=r.checked,F=i.value.trim(),U=l.value.trim();if(localStorage.setItem($o,JSON.stringify({enabled:J,host:F,port:U,username:t.value.trim(),password:c.value})),localStorage.setItem(yo,J&&F&&U?`${F}:${U}`:"DIRECT/SHIELD"),M)this.trackAction("proxy_settings_changed",{source:"settings_modal",enabled:J,host:F,port:U,hasUsername:Boolean(t.value.trim()),hasPassword:Boolean(c.value)})},C=async()=>{if(m)m.textContent=g("publicIpChecking");if(h)h.textContent=this.getPublicIpRouteLabel({enabled:r.checked,host:i.value.trim(),port:l.value.trim()});let M=await this.fetchPublicIp();if(m)m.textContent=M??g("publicIpUnavailable")};for(let M of[r,i,l,t,c])M.addEventListener("change",()=>{z(),C()});r.addEventListener("change",()=>{e.open=r.checked}),z(!1),C(),f.addEventListener("click",async()=>{z();let M=i.value.trim(),J=l.value.trim();if(this.trackAction("proxy_test_started",{source:"settings_modal",host:M,port:J}),f.disabled=!0,w)w.innerHTML=`<div class="pending">⏳ ${g("proxyTesting")}</div>`;let F=await this.testProxyConnection(M,J);if(await C(),w)w.innerHTML=`<div class="${F?"ok":"fail"}">${F?"✅":"❌"} ${F?g("proxyOk"):g("proxyFail")}</div>`;else alert(F?g("proxyOk"):g("proxyFail"));this.trackAction("proxy_test_completed",{source:"settings_modal",host:M,port:J,ok:F}),f.disabled=!1}),n.addEventListener("change",()=>{p.open=n.checked,this.renderShieldControls(d),Ro(n.checked),this.trackAction("shield_enabled_changed",{source:"settings_modal",enabled:n.checked}),window.setTimeout(()=>{location.reload()},120)}),o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}async renderAccountInfoOutput(o){o.innerHTML=`<div class="pending">⌛ ${g("accountInfoLoading")}</div>`;let s=this.bot.getControlSession(),[a,r,i]=await Promise.all([this.bot.fetchAccountInfo(!0).catch(()=>null),this.bot.getAccountCookieStatus({force:!0,exhaustive:!0,timeoutMs:2000}).catch(()=>({hasToken:!1,source:"none",token:null})),eo().catch(()=>null)]),l=s?.access,t=s?.serial,c=[[g("settingsAccessStatus"),l?.allowed===!1?g("disabled"):g("enabled")],[g("settingsApiMode"),l?.mode??"—"],[g("settingsControlUser"),s?g("enabled"):g("disabled")],[g("settingsLicenseUser"),t?.username??l?.username??"—"],[g("settingsSerialStatus"),t?.status??(t?.valid?"active":"—")],[g("settingsSerialValidatedAt"),t?.validatedAt??"—"],[g("settingsLicenseOwner"),t?.ownerName??"—"],[g("settingsDeviceLimit"),this.formatDeviceLimit(l,t)],[g("settingsCookieJ"),r.hasToken?`${g("settingsCookieJDetected")} · ${r.token??"—"}`:g("settingsCookieJNotDetected")],[g("settingsCookieSource"),r.source],[g("settingsWplaceId"),a?.id??"—"],[g("settingsWplaceName"),a?.name??"—"],[g("settingsDiscord"),a?.discord??"—"],[g("settingsDiscordId"),a?.discordId??"—"],[g("settingsCountry"),a?.country??"—"],[g("settingsAlliance"),a?.allianceName??"—"],[g("settingsAllianceRole"),a?.allianceRole??"—"],[g("settingsLevel"),a?.level??"—"],[g("settingsPixelsPainted"),a?.pixelsPainted??"—"],[g("settingsDroplets"),a?.droplets??"—"],[g("settingsCharges"),this.formatCharges(a?.charges)],[g("settingsCustomer"),a?.isCustomer===void 0?"—":a.isCustomer?g("enabled"):g("disabled")],[g("settingsSuspension"),a?.suspensionReason??"—"],[g("settingsTimeout"),a?.timeoutUntil??"—"],[g("settingsLocalDeviceId"),i?.localDeviceId??"—"],[g("settingsFingerprint"),i?.deviceFingerprintHash??"—"],[g("settingsUserAgent"),i?.userAgent??navigator.userAgent],[g("settingsPlatform"),i?.platform??navigator.platform],[g("settingsLanguage"),i?.language??navigator.language],[g("settingsTimezone"),i?.timezone??"—"],[g("settingsScreen"),i?`${i.screenWidth}×${i.screenHeight} @${i.devicePixelRatio}`:"—"],[g("settingsTouchSupport"),i?.touchSupport?g("enabled"):g("disabled")],[g("settingsHardwareConcurrency"),i?.hardwareConcurrency??"—"],[g("settingsDeviceMemory"),i?.deviceMemory??"—"],[g("settingsMacAddress"),g("settingsMacUnavailable")]];o.innerHTML=`<div class="account-info-grid">${c.map(([n,e])=>`<div class="account-info-card"><span>${this.escapeHtml(n)}</span><strong>${this.escapeHtml(this.stringifyShieldValue(e))}</strong></div>`).join("")}</div>`}formatDeviceLimit(o,s){let a=o?.registeredDevices,r=o?.maxDevices??s?.maxDevices;if(a===void 0&&r===void 0)return"—";return`${a??"—"} / ${r??"—"}`}formatCharges(o){if(!o||typeof o!=="object")return"—";let s=o,a=typeof s.count==="number"?Math.floor(s.count):s.count;return`${this.formatUnknownValue(a)} / ${this.formatUnknownValue(s.max)} (${this.formatUnknownValue(s.cooldownMs)} ms)`}formatUnknownValue(o){if(typeof o==="string"||typeof o==="number"||typeof o==="boolean")return String(o);return"—"}renderShieldControls(o){let i={navigator:g("shieldFeatureNavigator"),userAgentData:g("shieldFeatureUaData"),screen:g("shieldFeatureScreen"),timezone:g("shieldFeatureTimezone"),canvas:g("shieldFeatureCanvas"),webgl:g("shieldFeatureWebgl"),audio:g("shieldFeatureAudio"),plugins:g("shieldFeaturePlugins"),mediaDevices:g("shieldFeatureMediaDevices"),storageEstimate:g("shieldFeatureStorage"),battery:g("shieldFeatureBattery"),speechSynthesis:g("shieldFeatureSpeech"),fonts:g("shieldFeatureFonts"),matchMedia:g("shieldFeatureMatchMedia"),sharedArrayBuffer:g("shieldFeatureSharedArrayBuffer")},l=this.readStorageJson("__afm_profile",null),t="__afm_profile_choices",c=Number(localStorage.getItem("__afm_profile_expiry")??"0"),n=this.readStorageJson("__afm_settings",{}),e=this.readStorageJson("__afm_profile_choices",[]),d={...Object.fromEntries(Object.keys(i).map((u)=>[u,!0])),...n},f=c>0?new Date(c).toLocaleString():"—",w=l?.id??"Auto",m=e.map((u)=>`<option value="${u.id}" ${u.id===w?"selected":""}>${u.id}</option>`).join(""),h=Object.entries(i).map(([u,b])=>`<label class="kgm-switch-row"><span>${b}</span><span class="kgm-switch"><input type="checkbox" data-shield-key="${u}" ${d[u]?"checked":""}/><span class="kgm-switch-slider" aria-hidden="true"></span></span></label>`).join("");o.innerHTML=`<div class="shield-profile-row"><label>${g("shieldProfile")}</label><select class="shield-profile-select"><option value="">${g("shieldProfileAuto")}</option>${m}</select></div><div class="wp shield-expiry-line">${g("shieldExpires")}: <strong>${f}</strong></div><div class="widget-actions kgm-button-grid"><button type="button" class="challenge-button shield-refresh-profile"><i class="fa-solid fa-rotate"></i><span>${g("shieldRefreshProfile")}</span></button><button type="button" class="challenge-button shield-checker"><i class="fa-solid fa-shield-check"></i><span>${g("shieldChecker")}</span></button><button type="button" class="challenge-button shield-info"><i class="fa-solid fa-circle-info"></i><span>${g("shieldInfo")}</span></button></div><div class="shield-checker-output" aria-live="polite"></div><div class="shield-control-grid">${h}</div>`,o.querySelectorAll("input[data-shield-key]").forEach((u)=>{u.addEventListener("change",()=>{let b=u.dataset.shieldKey;d[b]=u.checked,localStorage.setItem("__afm_settings",JSON.stringify(d)),this.trackAction("shield_module_changed",{source:"shield_settings",key:b,enabled:u.checked}),window.setTimeout(()=>{location.reload()},120)})}),o.querySelector(".shield-profile-select")?.addEventListener("change",(u)=>{let b=u.currentTarget.value;if(!b)localStorage.removeItem("__afm_profile");else{let k=e.find((z)=>z.id===b);localStorage.setItem("__afm_profile",JSON.stringify(k??{id:b}))}this.trackAction("shield_profile_changed",{source:"shield_settings",profileId:b||"auto"}),location.reload()}),o.querySelector(".shield-checker")?.addEventListener("click",()=>{let u=o.querySelector(".shield-checker-output");if(!u)return;let b=this.runShieldChecker();this.trackAction("shield_checker_run",{source:"shield_settings",checks:b}),u.innerHTML=b.map((k)=>`<div class="${k.ok?"ok":"fail"}">${k.ok?"✅":"❌"} ${k.label}</div>`).join("")}),o.querySelector(".shield-info")?.addEventListener("click",()=>{this.trackAction("shield_info_opened",{source:"shield_settings"}),this.openShieldInfoModal()}),o.querySelector(".shield-refresh-profile")?.addEventListener("click",()=>{this.trackAction("shield_profile_refreshed",{source:"shield_settings"}),localStorage.removeItem("__afm_profile"),localStorage.removeItem("__afm_profile_expiry"),location.reload()})}getShieldInfo(){let o=this.readStorageJson("__afm_profile",null),s=this.readStorageJson("__afm_settings",{}),a=this.readStorageJson("__afm_profile_choices",[]);return{injectedInfo:globalThis.__kgmShieldInfo,profile:o,settings:s,choices:a,expiry:Number(localStorage.getItem("__afm_profile_expiry")??"0"),enabled:localStorage.getItem("__afm_enabled")!=="false",proxyHint:localStorage.getItem(yo)??"AUTO"}}readStorageJson(o,s){try{let a=localStorage.getItem(o);if(!a)return s;return JSON.parse(a)}catch{return s}}getPublicIpRouteLabel(o){if(o.enabled&&o.host&&o.port)return`${g("publicIpProxyRoute")} (${o.host}:${o.port})`;return g("publicIpShieldRoute")}async fetchPublicIp(){for(let o of Ua)try{let s=await fetch(o,{cache:"no-store"});if(!s.ok)continue;if((s.headers.get("content-type")??"").includes("application/json")){let r=await s.json();if(typeof r.ip==="string"&&r.ip.trim())return r.ip.trim()}else{let r=(await s.text()).trim();if(r)return r}}catch{}return}openShieldInfoModal(){let o=this.getShieldInfo(),s=o.injectedInfo?.profile,a=typeof s==="object"&&s!==null?s:o.profile,r=o.injectedInfo?.settings??o.settings,i=Number(o.injectedInfo?.expiresAt??o.expiry),l=(d,f="—")=>this.stringifyShieldValue(a?.[d],f),t=a?`${l("screenWidth")}×${l("screenHeight")} @${l("devicePixelRatio")}`:"—",c=a?`${l("webglVendor")} / ${l("webglRenderer")}`:"—",n=[[g("shieldInfoInjected"),o.injectedInfo?g("enabled"):g("disabled")],[g("shieldInfoEnabled"),o.enabled?g("enabled"):g("disabled")],[g("shieldProfile"),l("id")],[g("shieldExpires"),i>0?new Date(i).toLocaleString():"—"],[g("shieldInfoBrowser"),this.stringifyShieldValue(o.injectedInfo?.detectedBrowser)],[g("shieldInfoProxyHint"),this.stringifyShieldValue(o.injectedInfo?.proxyHint,o.proxyHint)],[g("publicIpTitle"),g("publicIpChecking")],[g("shieldInfoProfiles"),o.choices.length>0?String(o.choices.length):"—"],["User-Agent",l("userAgent",navigator.userAgent)],["Platform",l("platform",navigator.platform)],["Language",l("language",navigator.language)],["Screen",t],["WebGL",c]],e=Object.entries(r).filter(([,d])=>d).map(([d])=>d).join(", "),p=document.createElement("dialog");p.className="kgm-modal shield-info-dialog",p.innerHTML=`<div class="kgm-modal-head"><strong>${g("shieldInfoTitle")}</strong><button type="button" class="modal-close" aria-label="${g("close")}"><span class="icon">×</span></button></div><div class="shield-info-grid">${n.map(([d,f])=>`<div class="shield-info-card"><span>${this.escapeHtml(d)}</span><strong${d===g("publicIpTitle")?' class="shield-info-public-ip"':""}>${this.escapeHtml(f)}</strong></div>`).join("")}</div><div class="shield-info-modules"><span>${g("shieldInfoModules")}</span><p>${this.escapeHtml(e.length>0?e:"—")}</p></div>`,document.body.append(p),this.fetchPublicIp().then((d)=>{let f=p.querySelector(".shield-info-public-ip");if(f)f.textContent=d??g("publicIpUnavailable")}),p.querySelector(".modal-close").onclick=()=>{p.close(),p.remove()},p.addEventListener("close",()=>{p.remove()}),p.showModal()}stringifyShieldValue(o,s="—"){if(o===void 0||o===null||o==="")return s;if(typeof o==="string"||typeof o==="number"||typeof o==="boolean")return String(o);return JSON.stringify(o)}escapeHtml(o){return String(o).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}async testProxyConnection(o,s){if(!o||!s)return!1;try{return await fetch(`http://${o}:${s}`,{method:"HEAD",mode:"no-cors"}),!0}catch{return!1}}runShieldChecker(){let o=this.getShieldInfo(),s=o.profile,a=o.injectedInfo?.settings,r=typeof a==="object"&&a!==null?a:o.settings,i=Boolean(o.injectedInfo??s);return[{label:g("shieldCheckInjected"),ok:i},{label:g("shieldCheckSettings"),ok:Object.keys(r).length>0},{label:g("shieldCheckProfile"),ok:Boolean(s?.id??o.injectedInfo?.profileId)},{label:g("shieldCheckChoices"),ok:o.choices.length>0},{label:g("shieldCheckNavigator"),ok:navigator.hardwareConcurrency!==0&&typeof navigator.platform==="string"}]}refreshAutoFarmStatusText(){if(!this.autoFarmConfig){this.$autofarmStatus.textContent=g("autoFarmNeedsConfig");return}this.$autofarmStatus.textContent=this.autoFarmIntervalId?`${g("autoFarmRunning")} (${this.formatAutoFarmDelay(this.autoFarmConfig.timerMs)}) · ${this.formatCountdown(this.autoFarmNextTickAt)}`:g("autoFarmStopped")}refreshAutoOverlayStatusText(){if(!this.autoOverlayConfig){this.$autoOverlayStatus.textContent=g("autoOverlayNeedsConfig");return}this.$autoOverlayStatus.textContent=this.autoOverlayIntervalId?`${g("autoOverlayRunning")} (${this.formatAutoFarmDelay(this.autoOverlayConfig.timerMs)}) · ${this.formatCountdown(this.autoOverlayNextTickAt)}`:g("autoOverlayStopped")}formatCountdown(o){if(!o)return"00:00";let s=Math.max(0,o-Date.now()),a=Math.ceil(s/1000),r=Math.floor(a/60),i=a%60;return`${g("nextRunIn")} ${String(r).padStart(2,"0")}:${String(i).padStart(2,"0")}`}formatAutoFarmDelay(o){if(o%3600000===0)return`${o/3600000}h`;if(o%60000===0)return`${o/60000}m`;return`${o/1000}s`}stopAutoFarm(){if(!this.autoFarmIntervalId)return;clearInterval(this.autoFarmIntervalId),this.autoFarmIntervalId=void 0,this.autoFarmNextTickAt=void 0,this.refreshAutoFarmStatusText(),this.trackAction("auto_farm_stopped",{source:"widget",config:this.autoFarmConfig??null})}stopAutoOverlay(){if(!this.autoOverlayIntervalId)return;clearInterval(this.autoOverlayIntervalId),this.autoOverlayIntervalId=void 0,this.autoOverlayNextTickAt=void 0,this.refreshAutoOverlayStatusText(),this.trackAction("auto_draw_stopped",{source:"widget",config:this.autoOverlayConfig??null})}startAutoFarm(){if(!this.autoFarmConfig){this.status=`⚠️ ${g("autoFarmNeedsConfig")}`,this.refreshAutoFarmStatusText(),this.trackAction("auto_farm_start_failed",{source:"widget",reason:"missing_config"});return}this.stopAutoFarm(),this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.autoFarmIntervalId=window.setInterval(()=>{this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.runAutoFarmCycle()},this.autoFarmConfig.timerMs),this.runAutoFarmCycle(),this.refreshAutoFarmStatusText(),this.trackAction("auto_farm_started",{source:"widget",config:this.autoFarmConfig,nextTickAt:this.autoFarmNextTickAt})}startAutoOverlay(){if(!this.autoOverlayConfig){this.status=`⚠️ ${g("autoOverlayNeedsConfig")}`,this.refreshAutoOverlayStatusText(),this.trackAction("auto_draw_start_failed",{source:"widget",reason:"missing_config"});return}this.stopAutoOverlay(),this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.autoOverlayIntervalId=window.setInterval(()=>{this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.runAutoOverlayCycle()},this.autoOverlayConfig.timerMs),this.runAutoOverlayCycle(),this.refreshAutoOverlayStatusText(),this.trackAction("auto_draw_started",{source:"widget",config:this.autoOverlayConfig,nextTickAt:this.autoOverlayNextTickAt})}async runAutoFarmCycle(){if(!this.autoFarmConfig||this.autoFarmTickRunning)return;this.autoFarmTickRunning=!0;let o=this.resolveCyclePixelCount(this.autoFarmConfig);this.trackAction("auto_farm_cycle_started",{source:"widget",config:this.autoFarmConfig,pixels:o});try{let s=await this.bot.drawRandomPixelsBatch(o,0);if(!s){this.status=`⚠️ ${g("autoFarmStopped")}: ${g("autoFarmTransparentUnavailable")}`,this.trackAction("auto_farm_cycle_stopped_no_pixels",{source:"widget",pixels:o}),this.stopAutoFarm();return}await this.waitAndClickPaintButton(),this.trackAction("auto_farm_cycle_completed",{source:"widget",pixels:o,painted:s})}catch(s){throw this.trackAction("auto_farm_cycle_failed",{source:"widget",pixels:o,reason:s instanceof Error?s.message:"unknown"}),s}finally{this.autoFarmTickRunning=!1}}async runAutoOverlayCycle(){if(!this.autoOverlayConfig||this.autoOverlayTickRunning)return;this.autoOverlayTickRunning=!0;let o=this.resolveCyclePixelCount(this.autoOverlayConfig);this.trackAction("auto_draw_cycle_started",{source:"widget",config:this.autoOverlayConfig,pixels:o});try{let s=await this.bot.drawOverlayPixelsBatch(o);if(!s){this.status=`⚠️ ${g("autoOverlayStopped")}: ${g("autoOverlayNoTasks")}`,this.trackAction("auto_draw_cycle_stopped_no_tasks",{source:"widget",pixels:o}),this.stopAutoOverlay();return}await this.waitAndClickPaintButton(),this.trackAction("auto_draw_cycle_completed",{source:"widget",pixels:o,painted:s})}catch(s){throw this.trackAction("auto_draw_cycle_failed",{source:"widget",pixels:o,reason:s instanceof Error?s.message:"unknown"}),s}finally{this.autoOverlayTickRunning=!1}}saveAutoFarmConfig(o){this.autoFarmConfig=o,localStorage.setItem(Io,JSON.stringify(o)),$({farm:this.toControlPixelSettings(o)}),this.trackAction("auto_farm_config_saved",{source:"widget",config:o})}saveAutoOverlayConfig(o){this.autoOverlayConfig=o,localStorage.setItem(vo,JSON.stringify(o)),$({autoDraw:this.toControlPixelSettings(o)}),this.trackAction("auto_draw_config_saved",{source:"widget",config:o})}resolveCyclePixelCount(o){if(!o.usePixelRange)return Math.max(1,Math.floor(o.pixels));let s=Math.max(1,Math.floor(o.pixelRange.min)),a=Math.max(s,Math.floor(o.pixelRange.max));return s+Math.floor(Math.random()*(a-s+1))}toControlPixelSettings(o){return{usePixelRange:o.usePixelRange,pixel:Math.max(1,Math.floor(o.pixels)),pixelRange:{min:Math.max(1,Math.floor(o.pixelRange.min)),max:Math.max(1,Math.floor(o.pixelRange.max))}}}getRemotePixelSettings(o){return to()[o]}loadAutoFarmConfigFromStorage(){let o=this.getRemotePixelSettings("farm"),s=localStorage.getItem(Io);if(!s&&o){this.autoFarmConfig=this.createDefaultAutoConfig(o);return}if(!s)return;try{let a=JSON.parse(s);if(typeof a.value!=="number"||!Number.isFinite(a.value)||a.value<1)return;let r=typeof a.pixels==="number"&&Number.isFinite(a.pixels)&&a.pixels>=1?Math.floor(a.pixels):Math.max(1,Math.floor(o?.pixel??60)),i=this.normalizePixelRange(a.pixelRange,o),l=a.unit==="hours"||a.unit==="minutes"||a.unit==="seconds"?a.unit:"minutes",t=typeof a.timerMs==="number"&&a.timerMs>0?a.timerMs:l==="hours"?a.value*3600000:l==="minutes"?a.value*60000:a.value*1000;this.autoFarmConfig={value:Math.max(1,Math.floor(a.value)),pixels:r,usePixelRange:a.usePixelRange??o?.usePixelRange??!1,pixelRange:i,unit:l,timerMs:t}}catch{return}}loadAutoOverlayConfigFromStorage(){let o=this.getRemotePixelSettings("autoDraw"),s=localStorage.getItem(vo);if(!s&&o){this.autoOverlayConfig=this.createDefaultAutoConfig(o);return}if(!s)return;try{let a=JSON.parse(s);if(typeof a.value!=="number"||!Number.isFinite(a.value)||a.value<1)return;let r=typeof a.pixels==="number"&&Number.isFinite(a.pixels)&&a.pixels>=1?Math.floor(a.pixels):Math.max(1,Math.floor(o?.pixel??60)),i=this.normalizePixelRange(a.pixelRange,o),l=a.unit==="hours"||a.unit==="minutes"||a.unit==="seconds"?a.unit:"minutes",t=typeof a.timerMs==="number"&&a.timerMs>0?a.timerMs:l==="hours"?a.value*3600000:l==="minutes"?a.value*60000:a.value*1000;this.autoOverlayConfig={value:Math.max(1,Math.floor(a.value)),pixels:r,usePixelRange:a.usePixelRange??o?.usePixelRange??!1,pixelRange:i,unit:l,timerMs:t}}catch{return}}createDefaultAutoConfig(o){return{value:1,unit:"minutes",pixels:Math.max(1,Math.floor(o.pixel??60)),usePixelRange:o.usePixelRange??!1,pixelRange:this.normalizePixelRange(o.pixelRange,o),timerMs:60000}}normalizePixelRange(o,s){let a=o&&typeof o==="object"?o:s?.pixelRange,r=typeof a?.min==="number"&&Number.isFinite(a.min)?Math.max(1,Math.floor(a.min)):1,i=typeof a?.max==="number"&&Number.isFinite(a.max)?Math.max(r,Math.floor(a.max)):Math.max(r,5);return{min:r,max:i}}openAutoFarmModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let s=this.autoFarmConfig?.unit??"minutes",a=this.autoFarmConfig?.value??1,r=this.autoFarmConfig?.pixels??60,i=this.autoFarmConfig?.usePixelRange??!1,l=this.autoFarmConfig?.pixelRange??{min:1,max:5};o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoFarmModalTitle">Auto farm</strong>
    <button type="button" class="modal-close" aria-label="${g("close")}"><span class="icon">×</span></button>
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
      <input class="autofarm-use-range" type="checkbox" ${i?"checked":""} />
      <span class="kgm-switch-slider" aria-hidden="true"></span>
    </span>
  </label>
  <label class="autofarm-label autofarm-range-row">
    <span data-i18n="pixelRange">Pixel range</span>
    <div class="autofarm-fields">
      <input class="autofarm-range-min" type="number" min="1" step="1" value="${l.min}" data-i18n-title="pixelRangeMin" />
      <input class="autofarm-range-max" type="number" min="1" step="1" value="${l.max}" data-i18n-title="pixelRangeMax" />
    </div>
  </label>
  <small class="access-error pixel-range-error" role="alert" aria-live="assertive"></small>
  <div class="autofarm-actions">
    <button type="button" class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start</span></button>
    <button type="button" class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),N(o);let t=o.querySelector(".autofarm-unit");t.value=s;let c=o.querySelector(".autofarm-value"),n=o.querySelector(".autofarm-pixels"),e=o.querySelector(".autofarm-use-range"),p=o.querySelector(".autofarm-range-row"),d=o.querySelector(".autofarm-range-min"),f=o.querySelector(".autofarm-range-max"),w=o.querySelector(".pixel-range-error"),m=()=>{p.hidden=!e.checked,n.disabled=e.checked};e.addEventListener("change",m),m();let h=()=>{let b=Math.max(1,Number.parseInt(c.value||"1",10));if(t.value==="hours")return b*3600000;if(t.value==="minutes")return b*60000;return b*1000},u=()=>{let b=Math.max(1,Number.parseInt(d.value||"1",10)),k=Math.max(1,Number.parseInt(f.value||"1",10));if(b>k)return w.textContent=g("pixelRangeInvalid"),null;return w.textContent="",{min:b,max:k}};o.querySelector(".autofarm-start").onclick=()=>{let b=u();if(!b)return;this.saveAutoFarmConfig({value:Math.max(1,Number.parseInt(c.value||"1",10)),pixels:Math.max(1,Number.parseInt(n.value||"60",10)),usePixelRange:e.checked,pixelRange:b,unit:t.value,timerMs:h()}),this.startAutoFarm(),o.close(),o.remove()},o.querySelector(".autofarm-stop").onclick=()=>{this.stopAutoFarm(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}openAutoOverlayModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let s=this.autoOverlayConfig?.unit??"minutes",a=this.autoOverlayConfig?.value??1,r=this.autoOverlayConfig?.pixels??60,i=this.autoOverlayConfig?.usePixelRange??!1,l=this.autoOverlayConfig?.pixelRange??{min:1,max:5};o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoOverlayModalTitle">Auto overlay timer</strong>
    <button type="button" class="modal-close" aria-label="${g("close")}"><span class="icon">×</span></button>
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
      <input class="autofarm-use-range" type="checkbox" ${i?"checked":""} />
      <span class="kgm-switch-slider" aria-hidden="true"></span>
    </span>
  </label>
  <label class="autofarm-label autofarm-range-row">
    <span data-i18n="pixelRange">Pixel range</span>
    <div class="autofarm-fields">
      <input class="autofarm-range-min" type="number" min="1" step="1" value="${l.min}" data-i18n-title="pixelRangeMin" />
      <input class="autofarm-range-max" type="number" min="1" step="1" value="${l.max}" data-i18n-title="pixelRangeMax" />
    </div>
  </label>
  <small class="access-error pixel-range-error" role="alert" aria-live="assertive"></small>
  <div class="autofarm-actions">
    <button type="button" class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start</span></button>
    <button type="button" class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),N(o);let t=o.querySelector(".autofarm-unit");t.value=s;let c=o.querySelector(".autofarm-value"),n=o.querySelector(".autofarm-pixels"),e=o.querySelector(".autofarm-use-range"),p=o.querySelector(".autofarm-range-row"),d=o.querySelector(".autofarm-range-min"),f=o.querySelector(".autofarm-range-max"),w=o.querySelector(".pixel-range-error"),m=()=>{p.hidden=!e.checked,n.disabled=e.checked};e.addEventListener("change",m),m();let h=()=>{let b=Math.max(1,Number.parseInt(c.value||"1",10));if(t.value==="hours")return b*3600000;if(t.value==="minutes")return b*60000;return b*1000},u=()=>{let b=Math.max(1,Number.parseInt(d.value||"1",10)),k=Math.max(1,Number.parseInt(f.value||"1",10));if(b>k)return w.textContent=g("pixelRangeInvalid"),null;return w.textContent="",{min:b,max:k}};o.querySelector(".autooverlay-start").onclick=()=>{let b=u();if(!b)return;this.saveAutoOverlayConfig({value:Math.max(1,Number.parseInt(c.value||"1",10)),pixels:Math.max(1,Number.parseInt(n.value||"60",10)),usePixelRange:e.checked,pixelRange:b,unit:t.value,timerMs:h()}),this.startAutoOverlay(),o.close(),o.remove()},o.querySelector(".autooverlay-stop").onclick=()=>{this.stopAutoOverlay(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}getCurrentWplaceLocation(){let o=(d)=>{let f=new URLSearchParams(d.replace(/^#/,"").replace(/^\?/,"")),w=Number.parseFloat(f.get("lat")??""),m=Number.parseFloat(f.get("lng")??""),h=Number.parseFloat(f.get("zoom")??"");if(Number.isFinite(w)&&Number.isFinite(m)&&Number.isFinite(h))return{lat:w,lng:m,zoom:h}},s=globalThis.location.hash,a=s.includes("?")?s.slice(s.indexOf("?")+1):"",r=[globalThis.location.search,s,a].filter(Boolean);for(let d of r){let f=o(d);if(f)return f}let i=/#?\/?(?<zoom>-?\d+(?:\.\d+)?)\/(?<lat>-?\d+(?:\.\d+)?)\/(?<lng>-?\d+(?:\.\d+)?)/.exec(s);if(!i?.groups)return;let{lat:l,lng:t,zoom:c}=i.groups;if(!l||!t||!c)return;let n=Number.parseFloat(l),e=Number.parseFloat(t),p=Number.parseFloat(c);if(!Number.isFinite(n)||!Number.isFinite(e)||!Number.isFinite(p))return;return{lat:n,lng:e,zoom:p}}buildExternalToolUrl(o){let s=this.getCurrentWplaceLocation();if(o==="colorConverter")return Qa;if(o==="receiveSmss")return La;if(o==="esimplus")return Ga;if(o==="receiveSmsFree")return xa;if(o==="quackr")return Wa;if(o==="textverified")return Ba;if(!s){if(o==="samuelArchive")return oa;let r=new URL(aa);return r.searchParams.set("lat","0.000000"),r.searchParams.set("lng","0.000000"),r.searchParams.set("zoom","2.00"),r.searchParams.set("version",sa),r.toString()}if(o==="samuelArchive"){let r=new URL(oa);return r.hash=`${s.zoom.toFixed(2)}/${s.lat.toFixed(6)}/${s.lng.toFixed(6)}`,r.toString()}let a=new URL(aa);return a.searchParams.set("lat",s.lat.toFixed(6)),a.searchParams.set("lng",s.lng.toFixed(6)),a.searchParams.set("zoom",s.zoom.toFixed(2)),a.searchParams.set("version",sa),a.toString()}openExternalTool(o){let s=this.buildExternalToolUrl(o);this.trackAction("external_tool_opened",{source:"widget",tool:o,targetUrl:s,wplaceLocation:this.getCurrentWplaceLocation()??null}),this.openUrlInNewTab(s)}openUrlInNewTab(o){let s=globalThis.open(o,"_blank","noopener");if(s){s.opener=null;return}let a=document.createElement("a");a.href=o,a.target="_blank",a.rel="noopener noreferrer",a.style.display="none",document.body.append(a),a.click(),a.remove()}setDisabled(o,s){this.element.querySelector("."+o).disabled=s}async run(o,s,a,r="..."){console.log("[KGM][Widget] Task started",{status:o});let i=this.status;this.status=`${r} ${o}`;try{let l=await s();return this.status=i,console.log("[KGM][Widget] Task completed",{status:o}),l}catch(l){if(!(l instanceof fo))console.error(l),this.status=`${g("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:l}),l}finally{await a?.()}}handleKeyboard(o){if(Vo(o.target))return;if(S(o,A.toggleWidget)){o.preventDefault(),this.open=!this.open,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"toggleWidget",open:this.open});return}if(S(o,A.minimizeWidget)){o.preventDefault(),this.open=!1,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"minimizeWidget"});return}if(S(o,A.showWidgetPanel)){o.preventDefault(),this.open=!0,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"showWidgetPanel"});return}if(S(o,A.hideWidgetPanel)){o.preventDefault(),this.open=!1,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"hideWidgetPanel"});return}if(S(o,A.showShortcuts)){o.preventDefault(),this.open=!0,this.trackAction("shortcut_used",{source:"keyboard",shortcut:"showShortcuts"}),this.openSettingsModal();return}if(S(o,A.toggleOverlay)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"toggleOverlay"}),this.toggleOverlay();return}if(S(o,A.focusNextImage)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"focusNextImage"}),this.focusImageByStep(1);return}if(S(o,A.focusPreviousImage)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"focusPreviousImage"}),this.focusImageByStep(-1);return}if(S(o,A.openColorPanel)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openColorPanel"}),this.openColorPanelForActiveImage();return}if(S(o,A.toggleImageLock)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"toggleImageLock"}),this.toggleLockForActiveImage();return}if(S(o,A.clickPaintWhenReady)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"clickPaintWhenReady"}),this.drawAndClickPaintWhenReady();return}if(S(o,A.startAutoFarm)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"startAutoFarm"}),this.startAutoFarm();return}if(S(o,A.stopAutoFarm)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"stopAutoFarm"}),this.stopAutoFarm();return}if(S(o,A.openColorConverterTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openColorConverterTool"}),this.openExternalTool("colorConverter");return}if(S(o,A.openSamuelArchiveTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openSamuelArchiveTool"}),this.openExternalTool("samuelArchive");return}if(S(o,A.openEralyonArchiveTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openEralyonArchiveTool"}),this.openExternalTool("eralyonArchive");return}if(S(o,A.openReceiveSmssTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openReceiveSmssTool"}),this.openExternalTool("receiveSmss");return}if(S(o,A.openEsimplusTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openEsimplusTool"}),this.openExternalTool("esimplus");return}if(S(o,A.openReceiveSmsFreeTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openReceiveSmsFreeTool"}),this.openExternalTool("receiveSmsFree");return}if(S(o,A.openQuackrTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openQuackrTool"}),this.openExternalTool("quackr");return}if(S(o,A.openTextverifiedTool)){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"openTextverifiedTool"}),this.openExternalTool("textverified");return}if(S(o,A.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"addImage"}),this.addImage();return}if(S(o,A.draw)&&!this.$draw.disabled)o.preventDefault(),this.trackAction("shortcut_used",{source:"keyboard",shortcut:"draw"}),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.trackAction("active_image_focused",{source:"widget",step:o,image:this.imageTelemetry(this.activeImageIndex)}),this.bot.images[this.activeImageIndex].position.scrollScreenTo()}async recommendUpdateIfOutdated(){let o=new AbortController,s=window.setTimeout(()=>{o.abort()},1800);try{let a=await fetch("https://raw.githubusercontent.com/robgallardof/kglacer-macro/main/src/version.ts",{signal:o.signal});if(!a.ok)return;let r=await a.text(),l=/APP_VERSION = '([^']+)'/.exec(r)?.[1];if(!l)return;if(this.compareSemver(l,L)<=0)return;let t=`kglacer-macro:update-notice:${l}`;if(localStorage.getItem(t)==="dismissed")return;if(confirm(`Hay una versión nueva (${l}) disponible. Tu versión actual es ${L}. ¿Quieres actualizar ahora?`))this.openUrlInNewTab("https://github.com/robgallardof/kglacer-macro/raw/refs/heads/main/dist.user.js");else localStorage.setItem(t,"dismissed")}catch{}finally{clearTimeout(s)}}compareSemver(o,s){let a=o.split(".").map((i)=>Number(i)||0),r=s.split(".").map((i)=>Number(i)||0);for(let i=0;i<3;i++){if((a[i]??0)>(r[i]??0))return 1;if((a[i]??0)<(r[i]??0))return-1}return 0}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;this.trackAction("active_image_colors_opened",{source:"widget",image:this.imageTelemetry(this.activeImageIndex)}),o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,this.trackAction("active_image_lock_changed",{source:"widget",locked:o.lock,image:this.imageTelemetry(this.activeImageIndex)}),o.update(),P(this.bot)}async waitAndClickPaintButton(){this.trackAction("paint_button_wait_started",{source:"widget"}),await this.run(g("taskWaitingPaintButton"),async()=>{for(;;){if(this.isChallengeBlockingPaint()){this.trackAction("paint_blocked_by_challenge",{source:"widget"}),await this.waitForChallengeToResolve(),await new Promise((s)=>setTimeout(s,250));continue}let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){await this.triggerNativePaintClickWithChallengeRecovery(o),this.trackAction("paint_button_flow_completed",{source:"widget"});return}await new Promise((s)=>setTimeout(s,500))}})}async drawAndClickPaintWhenReady(){if(this.trackAction("draw_and_paint_started",{source:"widget",drawButtonEnabled:!this.$draw.disabled}),!this.$draw.disabled)await this.bot.draw();await this.waitAndClickPaintButton(),this.trackAction("draw_and_paint_completed",{source:"widget"})}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((a)=>Array.from(document.querySelectorAll(a))).find((a)=>/pintar|paint/i.test(a.textContent))}triggerNativePaintClick(o){o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),o.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),o.click()}async triggerNativePaintClickWithChallengeRecovery(o){for(let a=0;a<3;a++){let r=a===0?o:this.findNativePaintButton();if(!r)return;if(r.disabled||r.ariaDisabled==="true")return;this.trackAction("native_paint_clicked",{source:"widget",attempt:a+1,maxAttempts:3,buttonText:r.textContent.trim()}),this.triggerNativePaintClick(r);let i=await this.waitForPaintAttemptOutcome(6000);if(this.trackAction("native_paint_attempt_result",{source:"widget",attempt:a+1,maxAttempts:3,outcome:i}),i==="painted")return;if(i==="challenge"){await this.waitForChallengeToResolve(),await new Promise((l)=>setTimeout(l,350));continue}await new Promise((l)=>setTimeout(l,350))}console.log("[KGM][Widget] Paint click finished without a clear success signal after retries")}async waitForPaintAttemptOutcome(o){let s=Date.now();while(Date.now()-s<=o){if(this.isChallengeBlockingPaint())return"challenge";let a=this.findNativePaintButton();if(a&&(a.disabled||a.ariaDisabled==="true"))return await this.waitForDelayedChallenge(1200)?"challenge":"painted";await new Promise((r)=>setTimeout(r,200))}return"unknown"}async waitForDelayedChallenge(o){let s=Date.now();while(Date.now()-s<=o){if(this.isChallengeBlockingPaint())return!0;await new Promise((a)=>setTimeout(a,150))}return!1}async waitForChallengeToResolve(){await this.run(g("taskWaitingChallengeResolve"),async()=>{let o=Date.now(),s=90000;while(this.isChallengeBlockingPaint()&&Date.now()-o<=90000)await new Promise((a)=>setTimeout(a,500))})}isChallengeBlockingPaint(){let a=Array.from(document.querySelectorAll('h-captcha, .h-captcha, iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], [data-hcaptcha-widget-id]')).filter((l)=>{if(l.closest("dialog")?.matches("dialog:not([open])"))return!1;let t=globalThis.getComputedStyle(l);if(t.display==="none"||t.visibility==="hidden")return!1;let c=l.getBoundingClientRect();return c.width>0&&c.height>0});if(!a.length)return!1;let r=document.querySelector("dialog.modal[open], dialog[open]");if(r?.querySelector('h-captcha, .h-captcha, iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], [data-hcaptcha-widget-id]')){if(!r)return!1;if(!Array.from(r.querySelectorAll('textarea[name="h-captcha-response"], textarea[name^="h-captcha-response-"]')).some((t)=>t.value.trim().length>0))return!0}return a.some((l)=>{let t=l.closest("h-captcha")??l.parentElement??document.documentElement,c=Array.from(t.querySelectorAll('textarea[name="h-captcha-response"], textarea[name^="h-captcha-response-"]'));if(!c.length)return!0;return c.every((n)=>n.value.trim().length===0)})}}var Za=2;function Ea(){let o=globalThis;if(typeof o.fp_assemble_injection!=="function")o.fp_assemble_injection=()=>({});if(!o.__kgmUnhandledRejectionPatched)o.__kgmUnhandledRejectionPatched=!0,o.addEventListener("unhandledrejection",(s)=>{let a=s.reason,r=typeof a==="object"&&a!==null&&"name"in a&&typeof a.name==="string"?a.name:"",i=a instanceof Error?a.message:a;if(r==="NotAllowedError"&&i.includes("play() failed"))s.preventDefault()});if(!o.__kgmMediaPlayPatched&&"HTMLMediaElement"in o){o.__kgmMediaPlayPatched=!0;let s=Reflect.get(o.HTMLMediaElement.prototype,"play");o.HTMLMediaElement.prototype.play=function(){return Reflect.apply(s,this,[]).catch((i)=>{let l=i instanceof Error?i.message:i;if((typeof i==="object"&&i!==null&&"name"in i&&typeof i.name==="string"?i.name:"")==="NotAllowedError"&&l.includes("play() failed"))return;throw i})}}}var ra="[KGM]",ia="kgm-access-locked";class la{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;accountCookieTokenCache;accountCookieTokenSource="none";accountCookieTokenWarmup;controlSession=Ao();controlAccessAllowed=!1;log(o,s){if(s===void 0)console.log(`${ra} ${o}`);else console.log(`${ra} ${o}`,s)}constructor(){this.log("Boot sequence started"),document.body.classList.add(ia);let o=Eo();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let r=0;r<o.images.length;r++){let i=o.images[r];ao({x:i.position[0]-1000,y:i.position[1]-1000}),ao({x:i.position[0]+1000,y:i.position[1]+1000})}this.strategy=o.strategy}let s=JSON.parse(localStorage.getItem("kglacer-macro:proxy-config")??"{}");qo(s),this.registerFetchInterceptor(),this.log("Fetch interceptor registered"),this.primeAccountCookieToken();let a=document.createElement("style");a.textContent=Oo.replace("FAKE_FAVORITE_LOCATIONS",Y.length.toString()),document.head.append(a),this.log("Styles injected",{fakeFavoriteLocations:Y.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureControlAccess(),document.body.classList.remove(ia),this._widget=new Co(this),await this.widget.run(g("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let r=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((i)=>{for(let l=0;l<i.length;l++)if(i[l].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(r,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await T(500),await this.updateColors(),o)for(let i=0;i<o.images.length;i++){let l=await j.fromJSON(this,o.images[i]);this.images.push(l),l.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled"),this.trackAction("bot_loaded",{source:"startup",restoredImages:this.images.length,totalTasks:this.getTotalPendingTasks()})})})()}async ensureControlAccess(){let o=Ao();if(co(o)){this.controlSession=o,this.controlAccessAllowed=!0;try{await this.refreshControlAccess("startup");return}catch(s){if(this.log("Cached Control API session rejected",{reason:s instanceof Error?s.message:"unknown"}),this.shouldClearControlSession(s))v(),this.controlSession=null,this.controlAccessAllowed=!1;else{this.log("Keeping cached Control API session after transient check failure");return}}}await new Promise((s)=>{let a=document.createElement("dialog");a.className="kgm-modal access-dialog",a.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(a),N(a);let r=a.querySelector(".access-serial"),i=a.querySelector(".access-submit"),l=a.querySelector(".access-error"),t=a.querySelector(".access-locale");t.innerHTML=Go().map((c)=>`<option value="${c}" ${c===y()?"selected":""}>${c.toUpperCase()}</option>`).join(""),t.addEventListener("change",()=>{po(t.value),N(a)}),a.addEventListener("cancel",(c)=>{c.preventDefault()}),a.querySelector("form").addEventListener("submit",(c)=>{c.preventDefault(),l.textContent="",i.disabled=!0,i.textContent=g("loginChecking"),(async()=>{try{let[n,e]=await Promise.all([this.withTimeout(this.fetchAccountInfo(!0).catch(()=>null),900,null),this.resolveAccountCookieForControl()]);this.controlSession=await Qo({serialKey:r.value.trim(),wplaceMe:n,wplaceCookieJToken:e.token,wplaceCookieStatus:e.status}),this.controlAccessAllowed=!0,this.trackAction("serial_login_success",{source:"serial_modal",hasWplaceAccount:Boolean(n)}),this.syncAccountInfoWithControl("login_background"),a.close(),a.remove(),s()}catch(n){let e=n instanceof Error?n.message:g("loginErrorUnknown");l.textContent=this.mapControlLoginError(e),i.disabled=!1,i.textContent=g("loginSubmit")}})()}),a.showModal(),r.focus()})}mapControlLoginError(o){if(/invalid_serial|invalid_token|blocked_token|expired_license|inactive_license/i.test(o))return g("invalidAccessKey");if(/device_limit/i.test(o))return g("accessDeviceLimit");return g("loginErrorUnknown")}shouldClearControlSession(o){if(!(o instanceof I))return!1;if(o.status===401||o.status===403)return!0;return/invalid|expired|inactive|blocked|device_limit/i.test(o.reason??o.message)}getControlSession(){return this.controlSession}isControlAccessAllowed(){return this.controlAccessAllowed&&co(this.controlSession)}async refreshControlAccess(o="manual"){if(!this.controlSession)throw Error(g("accessLoginRequired"));let s=o==="startup",[a,r]=await Promise.all([this.withTimeout(this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),s?900:1800,null),this.resolveAccountCookieForControl({timeoutMs:s?550:750})]);return this.controlSession=await no({session:this.controlSession,eventType:"check",wplaceMe:a,wplaceCookieJToken:r.token,cookieStatus:r.status,metadata:{reason:o}}),this.controlAccessAllowed=!0,{session:this.controlSession,cookieStatus:r.status}}ensureFeatureAccess(o){if(this.isControlAccessAllowed())return!0;this.log("Feature blocked by Control API access state",{feature:o});try{this.widget.status=`⚠️ ${g("accessDenied")}`}catch{}return!1}getPageWindow(){return globalThis.unsafeWindow??globalThis}async fetchAccountInfo(o=!1){if(!o&&this.me)return this.me;let s=await fetch("https://backend.wplace.live/me",{credentials:"include",cache:"no-store"});if(!s.ok)throw Error(`/me failed (${s.status})`);let a=await s.json();return this.me=a,a}async getAccountCookieStatus(o={}){let s=await this.readAccountCookieToken(o);return{hasToken:Boolean(s),source:this.accountCookieTokenSource,token:s}}async readAccountCookieToken(o={}){let s=this.accountCookieTokenCache;if(!o.force&&this.accountCookieTokenCache)return this.accountCookieTokenCache;let a=this.getCookieFromDocument("j");if(a)return this.accountCookieTokenCache=a,this.accountCookieTokenSource="document",a;let r=await this.readCookieWithCookieStore("j");if(r)return this.accountCookieTokenCache=r,this.accountCookieTokenSource="cookie_store",r;let i=await this.readCookieWithUserscriptApi("j",o);if(i){if(this.accountCookieTokenCache=i,!this.accountCookieTokenSource.startsWith("gm_cookie"))this.accountCookieTokenSource="gm_cookie";return i}if(s)return s;return this.accountCookieTokenSource="none",null}primeAccountCookieToken(){return this.accountCookieTokenWarmup??=this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:2000}).finally(()=>{this.accountCookieTokenWarmup=void 0}),this.accountCookieTokenWarmup}async resolveAccountCookieForControl(o={}){let a=await this.withTimeout(this.accountCookieTokenWarmup??this.primeAccountCookieToken(),o.timeoutMs??750,null)??await this.readAccountCookieToken({force:!0,exhaustive:!0,timeoutMs:o.timeoutMs??2000});return{token:a,status:{hasToken:Boolean(a),source:a?this.accountCookieTokenSource:"none"}}}getCookieFromDocument(o){let s=this.getPageWindow(),a=[document.cookie,s.document.cookie].filter((r)=>typeof r==="string");for(let r of a){let i=this.parseCookieString(r,o);if(i)return i}return null}parseCookieString(o,s){let a=`${s}=`;for(let r of o.split(";")){let i=r.trim();if(!i.startsWith(a))continue;let l=i.slice(a.length);try{return decodeURIComponent(l)}catch{return l}}return null}async readCookieWithCookieStore(o){let s=this.getPageWindow(),a=[Reflect.get(globalThis,"cookieStore"),Reflect.get(s,"cookieStore")];for(let r of a){if(!r||typeof r!=="object")continue;let i=r.get;if(typeof i!=="function")continue;try{let t=await i.call(r,o);if(t?.value)return t.value}catch(t){this.log("cookieStore read failed",t)}let l=r.getAll;if(typeof l!=="function")continue;try{let t=await l.call(r,{name:o}),c=this.findCookieValue(t,o);if(c)return c}catch{try{let t=await l.call(r,o),c=this.findCookieValue(t,o);if(c)return c}catch(t){this.log("cookieStore getAll read failed",t)}}}return null}async readCookieWithUserscriptApi(o,s={}){let a=this.getPageWindow(),r=globalThis,i=a,l=[r.GM?.cookie,i.GM?.cookie,r.GM_cookie,i.GM_cookie].filter((f)=>f!==void 0&&f!==null);this.log("Reading WPlace j cookie through userscript APIs",{apiCount:l.length,cookieDomain:".wplace.live",cookieName:o});let t=location.protocol==="http:"||location.protocol==="https:"?location.href:"https://wplace.live/",c=[{name:o},{name:o,partitionKey:{}},{url:t,name:o},{url:t,name:o,partitionKey:{}},{url:t,domain:".wplace.live",name:o,path:"/"},{url:"https://wplace.live/",name:o},{url:"https://wplace.live/",name:o,partitionKey:{}},{url:"https://wplace.live/",domain:".wplace.live",name:o,path:"/"},{url:"https://www.wplace.live/",name:o},{url:"https://www.wplace.live/",domain:".wplace.live",name:o,path:"/"},{url:"https://backend.wplace.live/",name:o},{url:"https://backend.wplace.live/",domain:".wplace.live",name:o,path:"/"},{domain:".wplace.live",name:o,path:"/"},{domain:".wplace.live",name:o},{domain:"wplace.live",name:o,path:"/"},{domain:"wplace.live",name:o},{firstPartyDomain:"wplace.live",domain:".wplace.live",name:o}],n=[{url:t},{url:t,partitionKey:{}},{url:"https://wplace.live/",name:o,path:"/"},{url:"https://wplace.live/"},{url:"https://wplace.live/",partitionKey:{}},{url:"https://www.wplace.live/",name:o,path:"/"},{url:"https://www.wplace.live/"},{url:"https://backend.wplace.live/",name:o,path:"/"},{url:"https://backend.wplace.live/"},{domain:".wplace.live"},{domain:"wplace.live"},{firstPartyDomain:"https://wplace.live",domain:".wplace.live",name:o},{name:o},{name:o,path:"/"},{name:o,partitionKey:{}},{}],e=s.timeoutMs??2000,p=await this.findCookieWithUserscriptQueries(l,this.dedupeCookieQueries(c),o,e);if(p)return p;if(s.exhaustive===!1)return null;let d=await this.findCookieWithUserscriptQueries(l,this.dedupeCookieQueries(n),o,e);if(d)return d;return null}async findCookieWithUserscriptQueries(o,s,a,r){return new Promise((i)=>{let l=0,t=!1,c=(e)=>{if(t)return;if(!e&&l>0)return;t=!0,i(e)},n=["list","get"];for(let e of o)for(let p of s)for(let d of n)l++,this.callUserscriptCookieApi(e,d,p,r).then((f)=>{if(t)return;let w=d==="list"?this.findCookieValue(f,a):this.extractCookieValue(f,a);if(!w)return;this.accountCookieTokenSource=`gm_cookie:${d}:${this.describeCookieQuery(p)}`,c(w)}).finally(()=>{l--,c(null)});c(null)})}dedupeCookieQueries(o){let s=new Set;return o.filter((a)=>{let r=JSON.stringify(a);if(s.has(r))return!1;return s.add(r),!0})}describeCookieQuery(o){if(o.domain)return o.domain;if(o.url)return o.url;if(o.firstPartyDomain)return o.firstPartyDomain;if(o.name)return o.name;return"all"}async callUserscriptCookieApi(o,s,a,r=500){return new Promise((i)=>{let l=!1,t=(n)=>{if(l)return;l=!0,i(n)},c=(...n)=>{t(this.normalizeUserscriptCookieCallbackArgs(n))};try{if(typeof o==="function"){let n=o(s,a,c);this.resolveCookieApiResult(n,t)}else if(o&&typeof o==="object"){let n=o[s];if(typeof n==="function"){let e=n.call(o,a,c);this.resolveCookieApiResult(e,t)}else t(void 0)}else t(void 0)}catch(n){this.log(`GM.cookie ${s} failed`,n),t(void 0)}window.setTimeout(()=>{t(void 0)},r)})}normalizeUserscriptCookieCallbackArgs(o){if(o.length<=1)return o[0];return o.find((a)=>{if(Array.isArray(a))return!0;if(!a||typeof a!=="object")return!1;let r=a;return Array.isArray(r.cookies)||typeof r.name==="string"||typeof r.value==="string"})??o}resolveCookieApiResult(o,s){if(o&&typeof o.then==="function"){o.then(s,()=>{s(void 0)});return}if(o!==void 0)s(o)}findCookieValue(o,s){let a=this.normalizeCookieList(o);for(let r of a)if(r.name===s&&r.value)return r.value;return null}extractCookieValue(o,s){let a=o;if(a?.name===s&&a.value)return a.value;if(a&&!a.name&&a.value)return a.value;return this.findCookieValue(o,s)}normalizeCookieList(o){if(Array.isArray(o))return o.flatMap((s)=>this.normalizeCookieList(s));if(o&&typeof o==="object"){let s=o;if(Array.isArray(s.cookies))return this.normalizeCookieList(s.cookies);if(s.cookie)return this.normalizeCookieList(s.cookie);if(s.result)return this.normalizeCookieList(s.result);if(s.response)return this.normalizeCookieList(s.response);if(s.name||s.value)return[s]}return[]}async withTimeout(o,s,a){return new Promise((r)=>{let i=!1,l=(t)=>{if(i)return;i=!0,r(t)};o.then(l,()=>{l(a)}),window.setTimeout(()=>{l(a)},s)})}async syncAccountInfoWithControl(o="account_info"){if(!this.controlSession)return{ok:!1,cookieStatus:{hasToken:!1,source:this.accountCookieTokenSource}};let[s,a]=await Promise.all([this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),this.resolveAccountCookieForControl({timeoutMs:750})]);try{return this.controlSession=await no({session:this.controlSession,eventType:"heartbeat",wplaceMe:s,wplaceCookieJToken:a.token,cookieStatus:a.status,metadata:{app:ko,version:L,reason:o,sentAt:new Date().toISOString(),cookieName:"j",accountTokenAvailable:Boolean(a.token),jTokenAvailable:Boolean(a.token),page:{href:location.href,host:location.host}}}),this.controlAccessAllowed=!0,{ok:!0,cookieStatus:a.status}}catch(r){if(this.shouldClearControlSession(r))v(),this.controlSession=null,this.controlAccessAllowed=!1;return this.log("Control API sync failed",{reason:r instanceof Error?r.message:"unknown"}),{ok:!1,cookieStatus:a.status}}}trackAction(o,s={}){this.sendControlAction(o,s)}async sendControlAction(o,s={}){let a=this.controlSession;if(!a||!co(a))return;let[r,i]=await Promise.all([this.withTimeout(this.me?Promise.resolve(this.me):this.fetchAccountInfo().catch(()=>null),650,null),this.resolveAccountCookieForControl({force:!0,exhaustive:!0,timeoutMs:650})]);try{this.controlSession=await no({session:a,eventType:"action",wplaceMe:r,wplaceCookieJToken:i.token,cookieStatus:i.status,metadata:this.sanitizeTelemetryValue({app:ko,version:L,eventName:o,action:o,sentAt:new Date().toISOString(),cookieName:"j",accountTokenAvailable:Boolean(i.token),jTokenAvailable:Boolean(i.token),...this.buildActionTelemetryContext(),...s})}),this.controlAccessAllowed=!0}catch(l){if(this.shouldClearControlSession(l))v(),this.controlSession=null,this.controlAccessAllowed=!1;this.log("Control API action event failed",{action:o,reason:l instanceof Error?l.message:"unknown"})}}buildActionTelemetryContext(){return{page:this.getPageTelemetry(),viewport:{width:window.innerWidth,height:window.innerHeight,devicePixelRatio:window.devicePixelRatio},mapCenter:this.getWorldPositionForTelemetry({x:window.innerWidth/2,y:window.innerHeight/2}),botState:{strategy:this.strategy,images:this.images.length,totalTasks:this.getTotalPendingTasks(),unavailableColors:this.unavailableColors.size,accessAllowed:this.isControlAccessAllowed()},images:this.summarizeImagesForTelemetry()}}getPageTelemetry(){try{let o=new URL(location.href);return{href:o.href,origin:o.origin,host:o.host,pathname:o.pathname,search:o.search,hash:o.hash,query:Object.fromEntries(Array.from(o.searchParams.entries()).slice(0,25))}}catch{return{href:location.href,host:location.host}}}getWorldPositionForTelemetry(o){try{return this.serializeWorldPositionForTelemetry(H.fromScreenPosition(this,o))}catch{return null}}summarizeImageForTelemetry(o,s=this.images.indexOf(o)){let a=o.pixels.pixels,r=a.length,i=a[0]?.length??0,l=null;try{l=o.position.toScreenPosition()}catch{l=null}return{index:s,width:i,height:r,tasks:o.tasks.length,strategy:o.strategy,opacity:o.opacity,lock:o.lock,drawTransparentPixels:o.drawTransparentPixels,drawColorsInOrder:o.drawColorsInOrder,skipUnavailableColors:o.skipUnavailableColors,colors:o.colors.length,disabledColors:o.colors.filter((t)=>t.disabled).length,position:this.serializeWorldPositionForTelemetry(o.position),screenPosition:l}}summarizeImagesForTelemetry(){return this.images.slice(0,20).map((o,s)=>this.summarizeImageForTelemetry(o,s))}serializeWorldPositionForTelemetry(o){return{globalX:o.globalX,globalY:o.globalY,tileX:o.tileX,tileY:o.tileY,x:o.x,y:o.y}}getTotalPendingTasks(){return this.images.reduce((o,s)=>o+s.tasks.length,0)}sanitizeTelemetryValue(o,s=0,a=new WeakSet){if(o===null||o===void 0)return o;if(typeof o==="number"||typeof o==="boolean"||typeof o==="bigint")return typeof o==="bigint"?o.toString():o;if(typeof o==="string"){if(o.startsWith("data:"))return`[data-url:${o.length}]`;if(o.length>2048)return`${o.slice(0,2048)}…[truncated]`;return o}if(s>=5)return"[max-depth]";if(Array.isArray(o))return o.slice(0,50).map((r)=>this.sanitizeTelemetryValue(r,s+1,a));if(typeof o==="object"){if(a.has(o))return"[circular]";a.add(o);let r={};for(let[i,l]of Object.entries(o).slice(0,80)){if(/token|secret|password|authorization/i.test(i)&&typeof l==="string"){r[i]="[redacted]";continue}r[i]=this.sanitizeTelemetryValue(l,s+1,a)}return r}if(typeof o==="symbol")return o.description??"[symbol]";if(typeof o==="function")return`[function:${o.name||"anonymous"}]`;return"[unsupported]"}draw(){if(!this.ensureFeatureAccess("draw"))return Promise.resolve();this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.trackAction("draw_requested",{source:"bot",strategy:this.strategy,images:this.images.length,totalTasks:this.getTotalPendingTasks()}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),s=(a)=>{if(!a.shiftKey)a.stopPropagation()};return this.widget.run(g("taskDrawing"),async()=>{await this.widget.run(g("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",s,!0),o.addEventListener("wheel",s,!0),this.updateTasks();let a=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((c)=>c.json()),r=Math.floor(a.charges.count),i=r;this.log("Charges fetched",{charges:r});let l=0;for(let c=0;c<this.images.length;c++)l+=this.images[c].tasks.length;switch(this.log("Tasks prepared",{tasks:l}),this.trackAction("draw_started",{source:"bot",strategy:this.strategy,charges:r,preparedTasks:l,images:this.images.length}),this.strategy){case"ALL":{while(r>0){let c=!0;for(let n=0;n<this.images.length;n++){let e=this.images[n].tasks.shift();if(!e)continue;this.drawTask(e),r--,await T(1),c=!1}if(c)break}break}case"PERCENTAGE":{for(let c=0;c<l&&r>0;c++){let n=1,e;for(let p=0;p<this.images.length;p++){let d=this.images[p],f=1-d.tasks.length/(d.pixels.pixels.length*d.pixels.pixels[0].length);if(f<n)n=f,e=d}this.drawTask(e.tasks.shift()),r--,await T(1)}break}case"SEQUENTIAL":for(let c=0;c<this.images.length;c++){let n=this.images[c];for(let e=n.tasks.shift();e&&r>0;e=n.tasks.shift())this.drawTask(e),r--,await T(1)}}this.widget.update(),await this.readMap(),this.updateTasks();let t=this.getTotalPendingTasks();this.log("Draw flow finished",{remainingCharges:r,remainingTasks:t}),this.trackAction("draw_completed",{source:"bot",strategy:this.strategy,startCharges:i,remainingCharges:r,usedCharges:Math.max(0,i-r),preparedTasks:l,remainingTasks:t,images:this.images.length})},()=>{globalThis.removeEventListener("mousemove",s,!0),o.removeEventListener("wheel",s,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}toJSON(){return{version:Za,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let s=document.querySelector(".maplibregl-canvas"),a=window.innerWidth/2,r=window.innerHeight/2,i=a-o.x,l=r-o.y;function t(c,n,e){s.dispatchEvent(new MouseEvent(c,{bubbles:!0,cancelable:!0,clientX:n,clientY:e,buttons:1}))}t("mousedown",a,r),t("mousemove",i,l),t("mouseup",i,l)}readMap(){this.mapsCache.clear();let o=new Set;for(let a=0;a<this.images.length;a++){let r=this.images[a],{tileX:i,tileY:l}=new H(this,r.position.globalX+r.pixels.pixels[0].length,r.position.globalY+r.pixels.pixels.length);for(let t=r.position.tileX;t<=i;t++)for(let c=r.position.tileY;c<=l;c++)o.add(`${t}/${c}`)}let s=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${g("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(a)=>{this.mapsCache.set(a,await x.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${a}.png`,exactColor:!0})),this.widget.status=`⌛ ${g("taskReadingMap")} [${++s}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let s=0,a=1,r=1/0,i=1/0;for(let c=0;c<this.$stars.length;c++){let{x:n,y:e}=R(this.$stars[c]);if(n<o.x&&e<o.y){let p=o.x-n+(o.y-e);if(p<r)r=p,s=c}else if(n>o.x&&e>o.y){let p=n-o.x+(e-o.y);if(p<i)i=p,a=c}}let l=R(this.$stars[s]),t=W[s];return{anchorScreenPosition:l,anchorWorldPosition:t,pixelSize:(R(this.$stars[a]).x-l.x)/(W[a].x-t.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await T(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await T(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await T(1)}drawTask(o){if(this.lastColor!==o.color){let r=document.getElementById("color-"+o.color);if(!r){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}r.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let s=o.position.pixelSize/2,a=o.position.toScreenPosition();if(!Number.isFinite(a.x)||!Number.isFinite(a.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:a.x+s,clientY:a.y+s,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),o.position.setMapColor(o.color)}async paintRandomPixelInViewport(){if(!this.ensureFeatureAccess("autoFarm"))return;this.trackAction("auto_farm_random_pixel_requested",{source:"bot"});try{await this.updateColors();let o=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((f)=>!f.disabled&&f.getAttribute("aria-disabled")!=="true"&&f.offsetParent!==null);if(!o.length)return;let s=o[Math.floor(Math.random()*o.length)],a=Number.parseInt(s.id.slice(6),10);if(!Number.isFinite(a))return;let r=document.querySelector(".maplibregl-canvas");if(!r)return;let i=r.getBoundingClientRect(),l=24,t=i.left+l,c=i.right-l,n=i.top+l,e=i.bottom-l;if(c<=t||e<=n)return;let p=t+Math.random()*(c-t),d=n+Math.random()*(e-n);this.drawTask({color:a,position:H.fromScreenPosition(this,{x:p,y:d})}),this.trackAction("auto_farm_random_pixel_drawn",{source:"bot",color:a,screenPosition:{x:p,y:d}})}catch(o){this.log("Auto farm tick failed",o),this.trackAction("auto_farm_random_pixel_failed",{source:"bot",reason:o instanceof Error?o.message:"unknown"})}}async drawRandomPixelsBatch(o,s){if(!this.ensureFeatureAccess("autoFarm"))return 0;let a=Math.max(1,Math.floor(o)),r=0;return this.trackAction("auto_farm_draw_batch_requested",{source:"bot",requestedLimit:o,normalizedLimit:a,preferredColor:s??null}),await this.widget.run(g("taskDrawingRandomPixels"),async()=>{await this.widget.run(g("taskInitializingDraw"),()=>this.updateColors());let i=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((w)=>!w.disabled&&w.getAttribute("aria-disabled")!=="true"&&w.offsetParent!==null),l=document.querySelector(".maplibregl-canvas");if(!i.length||!l)return;let t=s===void 0?void 0:i.find((w)=>Number.parseInt(w.id.slice(6),10)===s);if(s!==void 0&&!t)return;let c=l.getBoundingClientRect(),n=24,e=c.left+n,p=c.right-n,d=c.top+n,f=c.bottom-n;if(p<=e||f<=d)return;for(let w=0;w<a;w++){let m=t??i[Math.floor(Math.random()*i.length)],h=Number.parseInt(m.id.slice(6),10);if(!Number.isFinite(h))continue;let u=e+Math.random()*(p-e),b=d+Math.random()*(f-d);this.drawTask({color:h,position:H.fromScreenPosition(this,{x:u,y:b})}),r++,await T(1)}}),this.trackAction("auto_farm_draw_batch_completed",{source:"bot",requestedLimit:o,normalizedLimit:a,preferredColor:s??null,drawn:r}),r}async drawOverlayPixelsBatch(o){if(!this.ensureFeatureAccess("autoDraw"))return 0;let s=Math.max(1,Math.floor(o)),a=0;return this.trackAction("auto_draw_overlay_batch_requested",{source:"bot",requestedLimit:o,normalizedLimit:s,strategy:this.strategy,totalTasks:this.getTotalPendingTasks()}),await this.widget.run(g("taskDrawingOverlayPixels"),async()=>{await this.widget.run(g("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),this.updateTasks();for(let r=0;r<s;r++){let i=this.takeNextTaskFromStrategy();if(!i)break;this.drawTask(i),a++,await T(1)}this.widget.update()}),this.trackAction("auto_draw_overlay_batch_completed",{source:"bot",requestedLimit:o,normalizedLimit:s,drawn:a,strategy:this.strategy,totalTasks:this.getTotalPendingTasks()}),a}takeNextTaskFromStrategy(){switch(this.strategy){case"ALL":case"SEQUENTIAL":{for(let o=0;o<this.images.length;o++){let s=this.images[o].tasks.shift();if(s)return s}return}case"PERCENTAGE":{let o,s=Number.POSITIVE_INFINITY;for(let a=0;a<this.images.length;a++){let r=this.images[a];if(!r.tasks.length)continue;let i=r.pixels.pixels.length*r.pixels.pixels[0].length,l=1-r.tasks.length/i;if(l<s)s=l,o=r}return o?.tasks.shift()}}}registerFetchInterceptor(){let o=this.getPageWindow(),s=o.fetch.bind(o),a=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/,r=async(i,l)=>{let t=await s(i,l),c=t.clone(),n=this.resolveFetchUrl(i);if(t.url==="https://backend.wplace.live/me")this.me=await c.json(),this.me.favoriteLocations.unshift(...Y),this.me.maxFavoriteLocations=1/0,t.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length}),this.syncAccountInfoWithControl("wplace_me").catch((p)=>{this.log("Control API /me sync failed",p)}),this.trackAction("wplace_me_observed",{source:"fetch_interceptor",accountId:this.me.id,accountName:this.me.name,accountCountry:this.me.country});let e=a.exec(n);if(e){let p=new H(this,+e[1],+e[2],+e[3],+e[4]);for(let d=0;d<this.markerPixelPositionResolvers.length;d++)this.markerPixelPositionResolvers[d](p);this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event"),this.trackAction("wplace_pixel_request",{source:"fetch_interceptor",requestUrl:n,method:this.resolveFetchMethod(i,l),body:this.summarizeFetchBody(l),position:this.serializeWorldPositionForTelemetry(p)})}return t};o.fetch=r,globalThis.fetch=r}resolveFetchUrl(o){if(typeof o==="string")return o;if(o instanceof URL)return o.href;if(o&&typeof o==="object"&&"url"in o){let s=o.url;if(typeof s==="string")return s}return""}resolveFetchMethod(o,s){if(typeof s?.method==="string")return s.method;if(o&&typeof o==="object"&&"method"in o){let a=o.method;if(typeof a==="string")return a}return"GET"}summarizeFetchBody(o){let s=o?.body;if(!s)return null;if(typeof s==="string"){if(s.length>2048)return`${s.slice(0,2048)}…[truncated]`;return s}if(s instanceof URLSearchParams)return Object.fromEntries(Array.from(s.entries()).slice(0,50));if(s instanceof FormData){let a={};for(let[r,i]of Array.from(s.entries()).slice(0,50)){if(typeof i==="string"){a[r]=i;continue}let l=i;a[r]={name:l.name,size:l.size,type:l.type}}return a}if(s instanceof Blob)return{type:s.type,size:s.size};if(s instanceof ArrayBuffer)return{type:"ArrayBuffer",byteLength:s.byteLength};if(ArrayBuffer.isView(s))return{type:s.constructor.name,byteLength:s.byteLength};return{type:typeof s}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await T(1)}waitForElement(o,s){return this.log("Waiting for element",{name:o,selector:s}),this.widget.run(`${g("taskWaitingFor")} ${o}`,()=>{return new Promise((a)=>{let r=document.querySelector(s);if(r){a(r);return}let i=new MutationObserver(()=>{let l=document.querySelector(s);if(l)i.disconnect(),a(l)});i.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,Y.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}Ea();if(location.hostname.includes("hcaptcha.com"))Jo();else globalThis.kglacerMacro=new la,globalThis.kgm=globalThis.kglacerMacro,globalThis.wbot=globalThis.kglacerMacro;

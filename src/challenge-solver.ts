const CHALLENGE_LOG_PREFIX = '[KGM][Challenge]'

function log(message: string, payload?: unknown) {
  if (payload === undefined) console.log(`${CHALLENGE_LOG_PREFIX} ${message}`)
  else console.log(`${CHALLENGE_LOG_PREFIX} ${message}`, payload)
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractNumbers(text: string) {
  return [...text.matchAll(/-?\d+/g)].map((match) =>
    Number.parseInt(match[0], 10),
  )
}

function solveMathExpression(text: string) {
  const normalized = normalize(text).replace(/,/g, '.')
  const expression = /(-?\d+(?:\.\d+)?)\s*([+\-*/x×])\s*(-?\d+(?:\.\d+)?)/.exec(
    normalized,
  )
  if (!expression) return
  const left = Number.parseFloat(expression[1]!)
  const operator = expression[2]!
  const right = Number.parseFloat(expression[3]!)
  if (!Number.isFinite(left) || !Number.isFinite(right)) return
  if (operator === '+') return String(left + right)
  if (operator === '-') return String(left - right)
  if (operator === '/' && right !== 0) return String(left / right)
  if ((operator === 'x' || operator === '×' || operator === '*') && right !== 0)
    return String(left * right)
}

function answerBoolean(text: string) {
  const normalized = normalize(text)
  const numbers = extractNumbers(normalized)
  if (
    /es .* par|is .* even|numero par|número par/.test(normalized) &&
    numbers.length > 0
  )
    return numbers[0]! % 2 === 0 ? 'sí' : 'no'

  if (
    /es .* impar|is .* odd|numero impar|número impar/.test(normalized) &&
    numbers.length > 0
  )
    return numbers[0]! % 2 !== 0 ? 'sí' : 'no'

  const comparison = /(-?\d+)\s*(>|<|>=|<=|=|==)\s*(-?\d+)/.exec(normalized)
  if (comparison) {
    const left = Number.parseInt(comparison[1]!, 10)
    const right = Number.parseInt(comparison[3]!, 10)
    const operator = comparison[2]!
    const truth =
      operator === '>'
        ? left > right
        : operator === '<'
          ? left < right
          : operator === '>='
            ? left >= right
            : operator === '<='
              ? left <= right
              : left === right
    return truth ? 'sí' : 'no'
  }

  if (/verdadero|true/.test(normalized)) return 'sí'
  if (/falso|false/.test(normalized)) return 'no'
}

function solvePrompt(prompt: string, promptDetails: string) {
  const fullPrompt = `${prompt} ${promptDetails}`.trim()
  const normalized = normalize(fullPrompt)
  const mathAnswer = solveMathExpression(fullPrompt)
  if (mathAnswer !== undefined) return mathAnswer
  const booleanAnswer = answerBoolean(fullPrompt)
  if (booleanAnswer) return booleanAnswer
  if (/responde (si|sí) o no|answer yes or no/.test(normalized))
    return Math.random() < 0.5 ? 'sí' : 'no'
  return 'sí'
}

async function humanType(element: HTMLInputElement, text: string) {
  element.focus()
  element.value = ''
  element.dispatchEvent(new Event('input', { bubbles: true }))
  for (let index = 0; index < text.length; index++) {
    element.value += text[index]!
    element.dispatchEvent(new Event('input', { bubbles: true }))
    await sleep(35 + Math.floor(Math.random() * 55))
  }
  element.dispatchEvent(new Event('change', { bubbles: true }))
}

function simulateClick(element: HTMLElement | null) {
  if (!element) return
  element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
  element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
  element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
  element.click()
}

async function switchToTextChallenge() {
  simulateClick(document.querySelector<HTMLElement>('#menu-info'))
  await sleep(150)
  simulateClick(document.querySelector<HTMLElement>('#text_challenge'))
}

function isSolved() {
  const success = document.querySelector('[aria-live="polite"]')
  const error = document.querySelector('div.error-text')
  const hasError = /intentalo de nuevo|try again|incorrect/i.test(
    normalize(error?.textContent ?? ''),
  )
  return Boolean(success && !hasError)
}

async function solveLoop() {
  await sleep(1_000)
  await switchToTextChallenge()
  for (;;) {
    if (isSolved()) {
      log('Challenge solved')
      return
    }
    const prompt =
      document.querySelector<HTMLElement>('h2.prompt-text#prompt')?.innerText ??
      ''
    const promptDetails =
      document.querySelector<HTMLElement>('div.text-text#prompt-text')
        ?.innerText ?? ''
    const input = document.querySelector<HTMLInputElement>('input[type="text"]')
    const submit = document.querySelector<HTMLElement>('.button-submit')
    if (!prompt || !promptDetails || !input || !submit) {
      await sleep(300)
      continue
    }
    const answer = solvePrompt(prompt, promptDetails)
    log('Answering text challenge', { prompt, promptDetails, answer })
    await humanType(input, answer)
    await sleep(180)
    simulateClick(submit)
    await sleep(2_200)
  }
}

export function initChallengeSolver() {
  if (!location.hostname.includes('hcaptcha.com')) return
  log('Solver booted')
  void solveLoop().catch((error: unknown) => {
    console.error(`${CHALLENGE_LOG_PREFIX} Solver crashed`, error)
  })
}

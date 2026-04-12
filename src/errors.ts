import { KGlacerMacro } from './bot'

export class KGlacerMacroError extends Error {
  public name = 'KGlacerMacroError'
  public constructor(message: string, bot: KGlacerMacro) {
    super(message)
    bot.widget.status = message
  }
}

export class NotInitializedError extends KGlacerMacroError {
  public name = 'NotInitializedError'
  public constructor(bot: KGlacerMacro) {
    super('❌ Not initialized', bot)
  }
}

export class NoImageError extends KGlacerMacroError {
  public name = 'NoImageError'
  public constructor(bot: KGlacerMacro) {
    super('❌ No image is selected', bot)
  }
}

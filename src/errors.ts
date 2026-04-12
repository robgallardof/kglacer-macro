import { WPlaceBot } from './bot'

export class KGlacerMacroError extends Error {
  public name = 'KGlacerMacroError'
  public constructor(message: string, bot: WPlaceBot) {
    super(message)
    bot.widget.status = message
  }
}

export class NotInitializedError extends KGlacerMacroError {
  public name = 'NotInitializedError'
  public constructor(bot: WPlaceBot) {
    super('❌ Not initialized', bot)
  }
}

export class NoImageError extends KGlacerMacroError {
  public name = 'NoImageError'
  public constructor(bot: WPlaceBot) {
    super('❌ No image is selected', bot)
  }
}

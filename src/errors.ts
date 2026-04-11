<<<<<<< HEAD
import { WPlaceBot } from './bot'

export class WPlaceBotError extends Error {
  public name = 'WPlaceBotError'
  public constructor(message: string, bot: WPlaceBot) {
    super(message)
    bot.widget.status = message
  }
}

export class NotInitializedError extends WPlaceBotError {
  public name = 'NotInitializedError'
  public constructor(bot: WPlaceBot) {
    super('❌ Not initialized', bot)
  }
}

export class NoImageError extends WPlaceBotError {
  public name = 'NoImageError'
  public constructor(bot: WPlaceBot) {
    super('❌ No image is selected', bot)
  }
=======
import { KglacerMacro } from './bot';

export class KglacerMacroError extends Error {
	public name = 'KglacerMacroError';
	public constructor(message: string, bot: KglacerMacro) {
		super(message);
		bot.widget.status = message;
	}
}

export class NotInitializedError extends KglacerMacroError {
	public name = 'NotInitializedError';
	public constructor(bot: KglacerMacro) {
		super('❌ Not initialized', bot);
	}
}

export class NoImageError extends KglacerMacroError {
	public name = 'NoImageError';
	public constructor(bot: KglacerMacro) {
		super('❌ No image is selected', bot);
	}
>>>>>>> d6e8f17a211b2cef7128ade79a63e7e33d3fc87b
}

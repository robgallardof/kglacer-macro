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
}

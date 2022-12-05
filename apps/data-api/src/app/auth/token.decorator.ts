import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Id } from '@drone-races/shared';

export interface Token {
	email: Id;
	id: string;
}

export const InjectToken = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext) => {
		const response = ctx.switchToHttp().getResponse();
		return response.locals.token;
	}
);

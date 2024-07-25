import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpMethods } from '../../../src/types/HttpMethods';
import { LOGGER } from '../../../src/services/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	switch (req.method) {
		case HttpMethods.GET:
			return res.status(StatusCodes.OK).json({ hello: 'world' });
		default:
			LOGGER.print_error(res, StatusCodes.METHOD_NOT_ALLOWED, ReasonPhrases.METHOD_NOT_ALLOWED);
	}
}

import { LOGGER } from '@/services/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethods } from '@/enums/HttpMethods';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const idBoard: string | null = req.query.idBoard as string;

	switch (req.method) {
		case HttpMethods.POST:
			if (!idBoard) {
				LOGGER.print_error('You need to specify an id');
				return res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
			}
			break;
		default:
			LOGGER.print_error(ReasonPhrases.METHOD_NOT_ALLOWED);
			return res.status(StatusCodes.METHOD_NOT_ALLOWED).json(ReasonPhrases.METHOD_NOT_ALLOWED);
	}
}

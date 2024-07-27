import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpMethods } from '@/enums/HttpMethods';
import { LOGGER } from '@/services/logger';
import { getAllBoards } from '../../../src/db/queries/boards';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	switch (req.method) {
		case HttpMethods.GET:
			try {
				return res.status(StatusCodes.OK).json({ boards: await getAllBoards() });
			} catch (error) {
				LOGGER.print_stack(error, ReasonPhrases.INTERNAL_SERVER_ERROR);
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
			}
		default:
			LOGGER.print_error(ReasonPhrases.METHOD_NOT_ALLOWED);
			return res.status(StatusCodes.METHOD_NOT_ALLOWED).json(ReasonPhrases.METHOD_NOT_ALLOWED);
	}
}

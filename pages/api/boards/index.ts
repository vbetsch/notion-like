import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpMethods } from '@/enums/HttpMethods';
import { LOGGER } from '@/services/logger';
import { BoardsListResultType } from '@/types/api/queries/boards/BoardsListResultType';
import { getAllBoards } from '@/db/queries/boards';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	let result: BoardsListResultType;

	switch (req.method) {
		case HttpMethods.GET:
			try {
				result = { boards: await getAllBoards() };
				return res.status(StatusCodes.OK).json(result);
			} catch (error) {
				LOGGER.print_stack(error, ReasonPhrases.INTERNAL_SERVER_ERROR);
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
			}
		default:
			LOGGER.print_error(ReasonPhrases.METHOD_NOT_ALLOWED);
			return res.status(StatusCodes.METHOD_NOT_ALLOWED).json(ReasonPhrases.METHOD_NOT_ALLOWED);
	}
}

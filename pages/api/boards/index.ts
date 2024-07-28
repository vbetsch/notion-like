import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpMethods } from '@/enums/HttpMethods';
import { getAllBoards } from '@/db/queries/boards';
import { BoardsListResultType } from '@/api/types/BoardsResultsTypes';
import { RESPONSE } from '@/services/response';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	let result: BoardsListResultType;

	switch (req.method) {
		case HttpMethods.GET:
			try {
				result = { boards: await getAllBoards() };
				return res.status(StatusCodes.OK).json(result);
			} catch (error) {
				return RESPONSE.return_stack(
					res,
					error,
					StatusCodes.INTERNAL_SERVER_ERROR,
					ReasonPhrases.INTERNAL_SERVER_ERROR,
				);
			}
		default:
			return RESPONSE.return_error(res, StatusCodes.METHOD_NOT_ALLOWED, ReasonPhrases.METHOD_NOT_ALLOWED);
	}
}

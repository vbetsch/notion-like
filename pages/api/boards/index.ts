import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { HttpMethods } from '@/enums/HttpMethods';
import { RESPONSE } from '@/services/response';
import { DB } from '@/db/index';
import { BoardsListResultType } from '@/api/types/ResultsTypes';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	let result: BoardsListResultType;

	switch (req.method) {
		case HttpMethods.GET:
			try {
				result = { boards: await DB.QUERIES.BOARDS.getAllBoards() };
				return res.status(StatusCodes.OK).json(result);
			} catch (error) {
				return RESPONSE.compute_stack(res, error);
			}
		default:
			return RESPONSE.compute_error(res, StatusCodes.METHOD_NOT_ALLOWED);
	}
}

import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
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
				return RESPONSE.compute_stack(res, error);
			}
		default:
			return RESPONSE.compute_error(res, StatusCodes.METHOD_NOT_ALLOWED);
	}
}

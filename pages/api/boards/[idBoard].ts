import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethods } from '@/enums/HttpMethods';
import { StatusCodes } from 'http-status-codes';
import { getBoardById } from '@/db/queries/boards';
import { RESPONSE } from '@/services/response';
import { BoardResultType } from '@/api/types/BoardsResultsTypes';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const idBoard: string = req.query.idBoard as string;
	let result: BoardResultType;

	switch (req.method) {
		case HttpMethods.GET:
			try {
				result = {
					board: await getBoardById(idBoard),
				};
			} catch (error) {
				return RESPONSE.compute_stack(res, error);
			}

			if (!result.board) {
				return RESPONSE.compute_warning(
					res,
					StatusCodes.NOT_FOUND,
					`No board found with id '${idBoard}'`,
					result,
				);
			}

			return res.status(StatusCodes.OK).json(result);
		default:
			return RESPONSE.compute_error(res, StatusCodes.METHOD_NOT_ALLOWED);
	}
}

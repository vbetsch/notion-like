import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpMethods } from '@/enums/HttpMethods';
import { LOGGER } from '@/services/logger';
import Board, { BoardType } from '@/models/Board';
import dbConnect from '@/lib/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	let board: BoardType;
	switch (req.method) {
		case HttpMethods.GET:
			try {
				await dbConnect();
				board = await Board.create({ name: 'fatoumata' });
				return res.status(StatusCodes.OK).json({ hello: 'world', board: board });
			} catch (e) {
				LOGGER.print_stack(res, StatusCodes.INTERNAL_SERVER_ERROR, e, ReasonPhrases.INTERNAL_SERVER_ERROR);
			}
			break;
		default:
			LOGGER.print_error(res, StatusCodes.METHOD_NOT_ALLOWED, ReasonPhrases.METHOD_NOT_ALLOWED);
	}
}

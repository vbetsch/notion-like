import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethods } from '@/enums/HttpMethods';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { LOGGER } from '@/services/logger';
import { getBoardById } from '@/db/queries/boards';
import { BoardType } from '@/db/types/BoardType';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const idBoard: string = req.query.idBoard as string;
	let board: BoardType | null;

	switch (req.method) {
		case HttpMethods.GET:
			try {
				board = await getBoardById(idBoard);
			} catch (error) {
				LOGGER.print_stack(error, ReasonPhrases.INTERNAL_SERVER_ERROR);
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
			}

			if (!board) {
				LOGGER.print_warning(`No board found with id ${idBoard}`);
				return res.status(StatusCodes.NOT_FOUND).json({ board: board });
			}

			return res.status(StatusCodes.OK).json({ board: board });
		default:
			LOGGER.print_error(ReasonPhrases.METHOD_NOT_ALLOWED);
			return res.status(StatusCodes.METHOD_NOT_ALLOWED).json(ReasonPhrases.METHOD_NOT_ALLOWED);
	}
}

import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethods } from '@/enums/HttpMethods';
import { StatusCodes } from 'http-status-codes';
import { RESPONSE } from '@/services/response';
import { DB } from '@/db/index';
import { BoardModelType } from '@/db/types/models/BoardModelType';
import { ColumnModelType } from '@/db/types/models/ColumnModelType';
import { ColumnsListResultType, CreateColumnResultType } from '@/api/types/ResultsTypes';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const idBoard: string | null = req.query.idBoard as string;

	let board: BoardModelType | null;
	let column: ColumnModelType;
	let board_updated: BoardModelType | null;
	let getResult: ColumnsListResultType;
	let postResult: CreateColumnResultType;

	switch (req.method) {
		case HttpMethods.GET:
			if (!idBoard) {
				return RESPONSE.compute_error(res, StatusCodes.UNAUTHORIZED, 'You need to specify a board id');
			}

			try {
				board = await DB.QUERIES.BOARDS.getBoardById(idBoard);
			} catch (error) {
				return RESPONSE.compute_stack(res, error);
			}

			if (!board) {
				return RESPONSE.compute_error(
					res,
					StatusCodes.NOT_FOUND,
					`The board specified by id '${idBoard}' does not exist`,
				);
			}

			try {
				getResult = { columns: await DB.QUERIES.COLUMNS.getColumnsByBoardId(idBoard) };
			} catch (error) {
				return RESPONSE.compute_stack(res, error);
			}

			return res.status(StatusCodes.OK).json(getResult);
		case HttpMethods.POST:
			if (!idBoard) {
				return RESPONSE.compute_error(res, StatusCodes.UNAUTHORIZED, 'You need to specify a board id');
			}

			try {
				board = await DB.QUERIES.BOARDS.getBoardById(idBoard);
			} catch (error) {
				return RESPONSE.compute_stack(res, error);
			}

			if (!board) {
				return RESPONSE.compute_error(
					res,
					StatusCodes.NOT_FOUND,
					`The board specified by id '${idBoard}' does not exist`,
				);
			}

			try {
				column = await DB.QUERIES.COLUMNS.createOneColumn(board._id as string, req.body);
			} catch (error) {
				return RESPONSE.compute_stack(res, error);
			}

			try {
				board_updated = await DB.QUERIES.BOARDS.addColumnToBoard(board, column);
			} catch (error) {
				return RESPONSE.compute_stack(res, error);
			}

			if (!board_updated) {
				return RESPONSE.compute_error(
					res,
					StatusCodes.INTERNAL_SERVER_ERROR,
					'Column could not be added to board',
				);
			}

			postResult = {
				column_inserted: column,
				board_updated,
			};

			return res.status(StatusCodes.OK).json(postResult);
		default:
			return RESPONSE.compute_error(res, StatusCodes.METHOD_NOT_ALLOWED);
	}
}

import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethods } from '@/enums/HttpMethods';
import { RESPONSE } from '@/services/response';
import { StatusCodes } from 'http-status-codes';
import { ColumnModelType } from '@/db/types/models/ColumnModelType';
import { DB } from '@/db/index';
import { CardModelType } from '@/db/types/models/CardModelType';
import { CardsListResultType, CreateCardResultType } from '@/api/types/ResultsTypes';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const idColumn: string | null = req.query.idColumn as string;

	let column: ColumnModelType | null;
	let card: CardModelType;
	let column_updated: ColumnModelType | null;
	let postResult: CreateCardResultType;
	let getResult: CardsListResultType;

	switch (req.method) {
		case HttpMethods.GET:
			if (!idColumn) {
				return RESPONSE.compute_error(res, StatusCodes.UNAUTHORIZED, 'You need to specify a column id');
			}

			try {
				column = await DB.QUERIES.COLUMNS.getColumnById(idColumn);
			} catch (error) {
				return RESPONSE.compute_stack(res, error);
			}

			if (!column) {
				return RESPONSE.compute_error(
					res,
					StatusCodes.NOT_FOUND,
					`The column specified by id '${idColumn}' does not exist`,
				);
			}

			try {
				getResult = { cards: await DB.QUERIES.CARDS.getCardsByColumnId(idColumn) };
			} catch (error) {
				return RESPONSE.compute_stack(res, error);
			}

			return res.status(StatusCodes.OK).json(getResult);

		case HttpMethods.POST:
			if (!idColumn) {
				return RESPONSE.compute_error(res, StatusCodes.UNAUTHORIZED, 'You need to specify a column id');
			}

			try {
				column = await DB.QUERIES.COLUMNS.getColumnById(idColumn);
			} catch (error) {
				return RESPONSE.compute_stack(res, error);
			}

			if (!column) {
				return RESPONSE.compute_error(
					res,
					StatusCodes.NOT_FOUND,
					`The column specified by id '${idColumn}' does not exist`,
				);
			}

			try {
				card = await DB.QUERIES.CARDS.createOneCard(column._id as string, req.body);
			} catch (error) {
				return RESPONSE.compute_stack(res, error);
			}

			try {
				column_updated = await DB.QUERIES.COLUMNS.addCardToColumn(card, column);
			} catch (error) {
				return RESPONSE.compute_stack(res, error);
			}

			if (!column_updated) {
				return RESPONSE.compute_error(
					res,
					StatusCodes.INTERNAL_SERVER_ERROR,
					'Card could not be added to column',
				);
			}

			postResult = {
				card_inserted: card,
				column_updated,
			};

			return res.status(StatusCodes.OK).json(postResult);
		default:
			return RESPONSE.compute_error(res, StatusCodes.METHOD_NOT_ALLOWED);
	}
}

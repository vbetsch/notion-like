import { describe, expect, it } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import { HttpMethods } from '@/enums/HttpMethods';
import handler from '@/pages/api/cards/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { BasicErrorResultType } from '@/api/types/ResultsTypes';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { TESTS } from '../../index';
import Card from '@/db/models/Card';
import {
	MockCardsListResultType,
	MockCreateCardResultType,
	MockCreateColumnResultType,
} from '../../mocks/types/results';
import Column from '@/db/models/Column';
import Board from '@/db/models/Board';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose');

jest.mock('../../../lib/dbConnect', () => ({
	__esModule: true,
	default: jest.fn().mockResolvedValue(null),
}));

describe('[API] /cards', () => {
	beforeEach(() => {
		mockingoose.resetAll();
	});
	it('GET - should return that you need to specify an id', async () => {
		const { req, res } = createMocks({
			method: HttpMethods.GET,
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.UNAUTHORIZED,
			message: 'You need to specify a column id',
		};

		expect(res._getStatusCode()).toBe(StatusCodes.UNAUTHORIZED);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('GET - should return 500 while trying to getColumnById', async () => {
		mockingoose(Column).toReturn(TESTS.MOCKS.COMMON.ERROR, 'findOne');

		const { req, res } = createMocks({
			method: HttpMethods.GET,
			query: {
				idColumn: TESTS.MOCKS.COLUMNS.VALID_COLUMN_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.INTERNAL_SERVER_ERROR,
			message: TESTS.MOCKS.COMMON.ERROR_MESSAGE,
		};

		expect(res._getStatusCode()).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('GET - should return 404 no column found', async () => {
		mockingoose(Column).toReturn(null, 'findOne');

		const { req, res } = createMocks({
			method: HttpMethods.GET,
			query: {
				idColumn: TESTS.MOCKS.COMMON.NOT_VALID_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.NOT_FOUND,
			message: `The column specified by id '${TESTS.MOCKS.COMMON.NOT_VALID_ID}' does not exist`,
		};

		expect(res._getStatusCode()).toBe(StatusCodes.NOT_FOUND);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('GET - should return 500 while trying to getCardsByColumnId', async () => {
		mockingoose(Column).toReturn(TESTS.MOCKS.COLUMNS.ONE_COLUMN, 'findOne');
		mockingoose(Card).toReturn(TESTS.MOCKS.COMMON.ERROR, 'find');

		const { req, res } = createMocks({
			method: HttpMethods.GET,
			query: {
				idColumn: TESTS.MOCKS.COLUMNS.VALID_COLUMN_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.INTERNAL_SERVER_ERROR,
			message: TESTS.MOCKS.COMMON.ERROR_MESSAGE,
		};

		expect(res._getStatusCode()).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('GET - should return 200 with cards of column expected', async () => {
		const _cards = TESTS.MOCKS.CARDS.ALL_CARDS.filter(
			card => card.columnId === TESTS.MOCKS.COLUMNS.VALID_COLUMN_ID,
		);

		mockingoose(Column).toReturn(TESTS.MOCKS.COLUMNS.ONE_COLUMN, 'findOne');
		mockingoose(Card).toReturn(_cards, 'find');

		const { req, res } = createMocks({
			method: HttpMethods.GET,
			query: {
				idColumn: TESTS.MOCKS.COLUMNS.VALID_COLUMN_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: MockCardsListResultType = {
			cards: _cards,
		};

		expect(res._getStatusCode()).toBe(StatusCodes.OK);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('POST - should return that you need to specify an id', async () => {
		const { req, res } = createMocks({
			method: HttpMethods.POST,
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.UNAUTHORIZED,
			message: 'You need to specify a column id',
		};

		expect(res._getStatusCode()).toBe(StatusCodes.UNAUTHORIZED);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('POST - should return 500 while trying to getColumnById', async () => {
		mockingoose(Column).toReturn(TESTS.MOCKS.COMMON.ERROR, 'findOne');

		const { req, res } = createMocks({
			method: HttpMethods.POST,
			query: {
				idColumn: TESTS.MOCKS.COLUMNS.VALID_COLUMN_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.INTERNAL_SERVER_ERROR,
			message: TESTS.MOCKS.COMMON.ERROR_MESSAGE,
		};

		expect(res._getStatusCode()).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('POST - should return 404 no column found', async () => {
		mockingoose(Column).toReturn(null, 'findOne');

		const { req, res } = createMocks({
			method: HttpMethods.POST,
			query: {
				idColumn: TESTS.MOCKS.COMMON.NOT_VALID_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.NOT_FOUND,
			message: `The column specified by id '${TESTS.MOCKS.COMMON.NOT_VALID_ID}' does not exist`,
		};

		expect(res._getStatusCode()).toBe(StatusCodes.NOT_FOUND);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('POST - should return 500 while trying to createOneCard', async () => {
		mockingoose(Column).toReturn(TESTS.MOCKS.COLUMNS.ONE_COLUMN, 'findOne');
		mockingoose(Column).toReturn(TESTS.MOCKS.COMMON.ERROR, 'save');

		const { req, res } = createMocks({
			method: HttpMethods.POST,
			query: {
				idColumn: TESTS.MOCKS.COLUMNS.VALID_COLUMN_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.INTERNAL_SERVER_ERROR,
			message: 'Card could not be added to column',
		};

		expect(res._getStatusCode()).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('POST - should return 500 while trying to addCardToColumn', async () => {
		mockingoose(Column).toReturn(TESTS.MOCKS.COLUMNS.ONE_COLUMN, 'findOne');
		mockingoose(Column).toReturn(TESTS.MOCKS.COMMON.ERROR, 'findOneAndUpdate');

		const { req, res } = createMocks({
			method: HttpMethods.POST,
			query: {
				idColumn: TESTS.MOCKS.COLUMNS.VALID_COLUMN_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.INTERNAL_SERVER_ERROR,
			message: TESTS.MOCKS.COMMON.ERROR_MESSAGE,
		};

		expect(res._getStatusCode()).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('POST - should return 500 when column could not be added to board', async () => {
		mockingoose(Column).toReturn(TESTS.MOCKS.COLUMNS.ONE_COLUMN, 'findOne');
		mockingoose(Column).toReturn(null, 'findOneAndUpdate');

		const { req, res } = createMocks({
			method: HttpMethods.POST,
			query: {
				idColumn: TESTS.MOCKS.COLUMNS.VALID_COLUMN_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.INTERNAL_SERVER_ERROR,
			message: 'Card could not be added to column',
		};

		expect(res._getStatusCode()).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('POST - should return 200 with column updated and card inserted', async () => {
		mockingoose(Column).toReturn(TESTS.MOCKS.COLUMNS.ONE_COLUMN, 'findOne');
		mockingoose(Card).toReturn(TESTS.MOCKS.CARDS.ONE_CARD, 'save');
		mockingoose(Column).toReturn(TESTS.MOCKS.COLUMNS.ONE_COLUMN, 'findOneAndUpdate');

		const { req, res } = createMocks({
			method: HttpMethods.POST,
			query: {
				idColumn: TESTS.MOCKS.COLUMNS.VALID_COLUMN_ID,
			},
			body: TESTS.MOCKS.CARDS.ONE_CARD,
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: MockCreateCardResultType = {
			column_updated: TESTS.MOCKS.COLUMNS.ONE_COLUMN,
			card_inserted: TESTS.MOCKS.CARDS.ONE_CARD,
		};

		expect(res._getStatusCode()).toBe(StatusCodes.OK);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('should return 405 if method is not allowed', async () => {
		const { req, res } = createMocks({
			method: HttpMethods.PUT,
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = { reason: ReasonPhrases.METHOD_NOT_ALLOWED };

		expect(res._getStatusCode()).toBe(StatusCodes.METHOD_NOT_ALLOWED);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
});

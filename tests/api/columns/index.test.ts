import { describe, expect, it } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import { HttpMethods } from '@/enums/HttpMethods';
import handler from '@/pages/api/columns/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { BasicErrorResultType } from '@/api/types/ResultsTypes';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Board from '@/db/models/Board';
import { TESTS } from '../../index';
import Column from '@/db/models/Column';
import { MockCreateColumnResultType } from '../../mocks/types/results';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose');

jest.mock('../../../lib/dbConnect', () => ({
	__esModule: true,
	default: jest.fn().mockResolvedValue(null),
}));

describe('[API] /columns', () => {
	beforeEach(() => {
		mockingoose.resetAll();
	});
	it('POST - should return that you need to specify an id', async () => {
		const { req, res } = createMocks({
			method: HttpMethods.POST,
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.UNAUTHORIZED,
			message: 'You need to specify an id',
		};

		expect(res._getStatusCode()).toBe(StatusCodes.UNAUTHORIZED);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('POST - should return 500 while trying to getBoardById', async () => {
		mockingoose(Board).toReturn(TESTS.MOCKS.COMMON.ERROR, 'findOne');

		const { req, res } = createMocks({
			method: HttpMethods.POST,
			query: {
				idBoard: TESTS.MOCKS.COMMON.VALID_ID,
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
	it('POST - should return 404 no board found', async () => {
		mockingoose(Board).toReturn(null, 'findOne');

		const { req, res } = createMocks({
			method: HttpMethods.POST,
			query: {
				idBoard: TESTS.MOCKS.COMMON.NOT_VALID_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.NOT_FOUND,
			message: `The board specified by id '${TESTS.MOCKS.COMMON.NOT_VALID_ID}' does not exist`,
		};

		expect(res._getStatusCode()).toBe(StatusCodes.NOT_FOUND);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('POST - should return 500 while trying to createOneColumn', async () => {
		mockingoose(Board).toReturn(TESTS.MOCKS.BOARDS.ONE_BOARD, 'findOne');
		mockingoose(Column).toReturn(TESTS.MOCKS.COMMON.ERROR, 'save');

		const { req, res } = createMocks({
			method: HttpMethods.POST,
			query: {
				idBoard: TESTS.MOCKS.COMMON.VALID_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.INTERNAL_SERVER_ERROR,
			message: 'Column could not be added to board',
		};

		expect(res._getStatusCode()).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('POST - should return 500 while trying to addColumnToBoard', async () => {
		mockingoose(Board).toReturn(TESTS.MOCKS.BOARDS.ONE_BOARD, 'findOne');
		mockingoose(Board).toReturn(TESTS.MOCKS.COMMON.ERROR, 'findOneAndUpdate');

		const { req, res } = createMocks({
			method: HttpMethods.POST,
			query: {
				idBoard: TESTS.MOCKS.COMMON.VALID_ID,
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
		mockingoose(Board).toReturn(TESTS.MOCKS.BOARDS.ONE_BOARD, 'findOne');
		mockingoose(Board).toReturn(null, 'findOneAndUpdate');

		const { req, res } = createMocks({
			method: HttpMethods.POST,
			query: {
				idBoard: TESTS.MOCKS.COMMON.VALID_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: BasicErrorResultType = {
			reason: ReasonPhrases.INTERNAL_SERVER_ERROR,
			message: 'Column could not be added to board',
		};

		expect(res._getStatusCode()).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(_result);
	});
	it('POST - should return 200 with board updated and column inserted', async () => {
		mockingoose(Board).toReturn(TESTS.MOCKS.BOARDS.ONE_BOARD, 'findOne');
		mockingoose(Column).toReturn(TESTS.MOCKS.COLUMNS.ONE_COLUMN, 'save');
		mockingoose(Board).toReturn(TESTS.MOCKS.BOARDS.ONE_BOARD, 'findOneAndUpdate');

		const { req, res } = createMocks({
			method: HttpMethods.POST,
			query: {
				idBoard: TESTS.MOCKS.COMMON.VALID_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		const _result: MockCreateColumnResultType = {
			board_updated: TESTS.MOCKS.BOARDS.ONE_BOARD,
			column_inserted: TESTS.MOCKS.COLUMNS.ONE_COLUMN,
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

import { describe, expect, it } from '@jest/globals';
import Board from '../../../src/db/models/Board';
import { createMocks } from 'node-mocks-http';
import { HttpMethods } from '@/enums/HttpMethods';
import handler from '../../../pages/api/boards/[idBoard]';
import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { TESTS } from '../../index';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose');

jest.mock('../../../lib/dbConnect', () => ({
	__esModule: true,
	default: jest.fn().mockResolvedValue(null),
}));

describe('[API] /boards/{idBoard}', () => {
	beforeEach(() => {
		mockingoose.resetAll();
	});

	it('GET - should return one board', async () => {
		mockingoose(Board).toReturn(TESTS.MOCKS.BOARDS.ONE_BOARD, 'findOne');

		const { req, res } = createMocks({
			method: HttpMethods.GET,
			query: {
				idBoard: TESTS.MOCKS.COMMON.VALID_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		expect(res._getStatusCode()).toBe(StatusCodes.OK);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual({ board: TESTS.MOCKS.BOARDS.ONE_BOARD });
	});
	it('GET - should return 404', async () => {
		mockingoose(Board).toReturn(null, 'findOne');

		const { req, res } = createMocks({
			method: HttpMethods.GET,
			query: {
				idBoard: TESTS.MOCKS.COMMON.NOT_VALID_ID,
			},
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		expect(res._getStatusCode()).toBe(StatusCodes.NOT_FOUND);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual({ board: null });
	});
	it('GET - should return 500', async () => {
		mockingoose(Board).toReturn(TESTS.MOCKS.COMMON.ERROR, 'findOne');

		const { req, res } = createMocks({
			method: HttpMethods.GET,
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		expect(res._getStatusCode()).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(ReasonPhrases.INTERNAL_SERVER_ERROR);
	});
	it('should return 405 if method is not allowed', async () => {
		const { req, res } = createMocks({
			method: HttpMethods.PUT,
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		expect(res._getStatusCode()).toBe(StatusCodes.METHOD_NOT_ALLOWED);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(ReasonPhrases.METHOD_NOT_ALLOWED);
	});
});

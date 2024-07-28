import { TESTS } from '../../index';
import { createMocks } from 'node-mocks-http';
import { HttpMethods } from '@/enums/HttpMethods';
import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { describe, it, expect } from '@jest/globals';
import Board from '@/db/models/Board';
import handler from '@/pages/api/boards';
import { BasicErrorResultType } from '@/api/types/ErrorsResultsTypes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose');

jest.mock('../../../lib/dbConnect', () => ({
	__esModule: true,
	default: jest.fn().mockResolvedValue(null),
}));

describe('[API] /boards', () => {
	beforeEach(() => {
		mockingoose.resetAll();
	});

	it('GET - should return all boards', async () => {
		mockingoose(Board).toReturn(TESTS.MOCKS.BOARDS.ALL_BOARDS, 'find');

		const { req, res } = createMocks({
			method: HttpMethods.GET,
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		expect(res._getStatusCode()).toBe(StatusCodes.OK);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual({ boards: TESTS.MOCKS.BOARDS.ALL_BOARDS });
	});
	it('GET - should return 500', async () => {
		mockingoose(Board).toReturn(TESTS.MOCKS.COMMON.ERROR, 'find');

		const { req, res } = createMocks({
			method: HttpMethods.GET,
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

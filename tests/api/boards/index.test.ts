import { TESTS } from '../../index';
import { createMocks } from 'node-mocks-http';
import { HttpMethods } from '@/enums/HttpMethods';
import handler from '../../../pages/api/boards/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { getAllBoards } from '../../../src/db/queries/boards';
import { describe, it, expect } from '@jest/globals';

jest.mock('../../../src/db/queries/boards', () => ({
	getAllBoards: jest.fn(),
}));

describe('[API] /boards', () => {
	it('GET - should return all boards', async () => {
		(getAllBoards as jest.Mock).mockResolvedValue(TESTS.MOCKS.BOARDS.ALL_BOARDS);

		const { req, res } = createMocks({
			method: HttpMethods.GET,
		});

		await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

		expect(res._getStatusCode()).toBe(StatusCodes.OK);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual({ boards: TESTS.MOCKS.BOARDS.ALL_BOARDS });
	});
	it('GET - should return 500', async () => {
		(getAllBoards as jest.Mock).mockRejectedValue(new Error('TEST'));

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

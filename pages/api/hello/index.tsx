import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpMethods } from '../../../src/enums/HttpMethods';
import { LOGGER } from '../../../src/services/logger';
import { API } from '../../../src/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	switch (req.method) {
		case HttpMethods.GET:
			// try {
			// 	const result = await API.QUERIES.HELLO.test();
			// 	console.log('(26/07/2024 00:32)  @reyks  [ index.tsx:11 ]  db  ', result);
			// } catch (e) {
			// 	console.error(e);
			// }
			return res.status(StatusCodes.OK).json({ hello: 'world' });
		default:
			LOGGER.print_error(res, StatusCodes.METHOD_NOT_ALLOWED, ReasonPhrases.METHOD_NOT_ALLOWED);
	}
}

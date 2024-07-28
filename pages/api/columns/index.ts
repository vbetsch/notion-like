import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethods } from '@/enums/HttpMethods';
import { StatusCodes } from 'http-status-codes';
import { RESPONSE } from '@/services/response';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const idBoard: string | null = req.query.idBoard as string;

	switch (req.method) {
		case HttpMethods.POST:
			if (!idBoard) {
				return RESPONSE.compute_error(res, StatusCodes.UNAUTHORIZED, 'You need to specify an id');
			}
			break;
		default:
			return RESPONSE.compute_error(res, StatusCodes.METHOD_NOT_ALLOWED);
	}
}

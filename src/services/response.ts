import { NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { LOGGER } from '@/services/logger';
import { BasicErrorResultType } from '@/api/types/ErrorsResultsTypes';

// const return_warning = (response: NextApiResponse) => {};
const return_error = (response: NextApiResponse, status: StatusCodes, reason: ReasonPhrases) => {
	LOGGER.print_error(reason);
	return response.status(status).json(reason);
};
const return_stack = (response: NextApiResponse, error: unknown, status: StatusCodes, reason: ReasonPhrases) => {
	const _err: string | unknown = error instanceof Error ? error.message : error;
	const _result: BasicErrorResultType = {
		message: error instanceof Error ? error.message : undefined,
		reason,
	};
	LOGGER.print_stack(_err, reason);
	return response.status(status).json(_result);
};

export const RESPONSE = {
	// return_warning,
	return_error,
	return_stack,
};

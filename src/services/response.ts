import { NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { LOGGER } from '@/services/logger';
import { BasicErrorResultType } from '@/api/types/ErrorsResultsTypes';

// const return_warning = (response: NextApiResponse) => {};
const return_error = (response: NextApiResponse, status: StatusCodes, reason: ReasonPhrases, message?: string) => {
	LOGGER.print_error(reason);
	return response.status(status).json({ reason, message });
};
const return_stack = (response: NextApiResponse, error: unknown, status: StatusCodes, reason: ReasonPhrases) => {
	const _err: string | unknown = error instanceof Error ? error.message : error;
	const _result: BasicErrorResultType = {
		reason,
		message: error instanceof Error ? error.message : undefined,
	};
	LOGGER.print_stack(_err, reason);
	return response.status(status).json(_result);
};

export const RESPONSE = {
	// return_warning,
	return_error,
	return_stack,
};

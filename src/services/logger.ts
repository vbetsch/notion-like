// const _INTERNAL = {}
// const CONSTANTS = {}

const print_info = (message: string, url?: string) => {
	console.info(`${url && `(${url}) `}INFO: ${message}`);
};
const print_warning = (message: string, component?: string) => {
	console.warn(`WARNING:${component && ` [${component}]`} ${message}`);
};
const print_error = (message: string) => {
	console.error(`ERROR: ${message}`);
};
const print_stack = (error: unknown, message?: string) => {
	console.error(`ERROR:${message || ` ${message} ->`} ${error instanceof Error ? error.message : error}`);
};

const print_no_data = (element?: string) => {
	print_warning(`No ${element || 'data'} were found`);
};

export const LOGGER = {
	// CONSTANTS,
	print_info,
	print_warning,
	print_error,
	print_stack,

	print_no_data,
};

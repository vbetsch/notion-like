import { API } from '@/api/index';
import { BoardsListResultType } from '@/types/api/queries/boards/BoardsListResultType';

const getBoards = async (): Promise<BoardsListResultType> => {
	return await API.getAPIDataFromUrl(API.CONSTANTS.URI.BOARDS.ALL, 'Get all boards');
};

export const BOARDS = {
	getBoards,
};

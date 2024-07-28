import { API } from '@/api/index';
import { BoardResultType, BoardsListResultType } from '@/api/types/BoardsResultsTypes';

const getBoards = async (): Promise<BoardsListResultType> => {
	return await API.getAPIDataFromUrl(API.CONSTANTS.URI.BOARDS.ALL, 'Get all boards');
};
const getOneBoard = async (id: string): Promise<BoardResultType> => {
	return await API.getAPIDataFromUrl(`${API.CONSTANTS.URI.BOARDS.ALL}/${id}`, `Get board by id=${id}`);
};

export const BOARDS = {
	getBoards,
	getOneBoard,
};

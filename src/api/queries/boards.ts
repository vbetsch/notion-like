import { API } from '@/api/index';
import { BasicErrorResultType, BoardResultType, BoardsListResultType } from '@/api/types/ResultsTypes';

const getBoards = async (): Promise<BoardsListResultType | BasicErrorResultType> => {
	return await API.getAPIDataFromUrl(API.CONSTANTS.URI.BOARDS.ALL, 'Get all boards');
};
const getOneBoard = async (id: string): Promise<BoardResultType | BasicErrorResultType> => {
	return await API.getAPIDataFromUrl(`${API.CONSTANTS.URI.BOARDS.ALL}/${id}`, `Get board by id=${id}`);
};

export const BOARDS = {
	getBoards,
	getOneBoard,
};

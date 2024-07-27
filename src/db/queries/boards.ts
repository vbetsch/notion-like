import { BoardType } from '@/types/db/BoardType';
import Board from '@/db/models/Board';

const getAllBoards = async (): Promise<BoardType[]> => {
	return Board.find({});
};

export const BOARDS = {
	getAllBoards,
};

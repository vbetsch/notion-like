import { BoardType } from '@/types/db/BoardType';
import Board from '../models/Board';
import dbConnect from '@/lib/dbConnect';

const getAllBoards = async (): Promise<BoardType[]> => {
	await dbConnect();
	return Board.find({}).sort({ name: 1 });
};
const getBoardById = async (id: string): Promise<BoardType | null> => {
	await dbConnect();
	return Board.findById(id);
};

export { getAllBoards, getBoardById };

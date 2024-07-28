import Board from '../models/Board';
import dbConnect from '@/lib/dbConnect';
import { BoardModelType } from '@/db/types/models/BoardModelType';

const getAllBoards = async (): Promise<BoardModelType[]> => {
	await dbConnect();
	return Board.find({}).sort({ name: 1 });
};
const getBoardById = async (id: string): Promise<BoardModelType | null> => {
	await dbConnect();
	return Board.findById(id);
};

export const BOARDS = { getAllBoards, getBoardById };

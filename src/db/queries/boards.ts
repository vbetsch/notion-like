import { BoardType } from '@/types/db/BoardType';
import Board from '../models/Board';
import dbConnect from '@/lib/dbConnect';

const getAllBoards = async (): Promise<BoardType[]> => {
	await dbConnect();
	return Board.find({}).sort({ name: 1 });
};

export { getAllBoards };

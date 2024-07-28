import Board from '../models/Board';
import dbConnect from '@/lib/dbConnect';
import { BoardModelType } from '@/db/types/models/BoardModelType';
import { ColumnModelType } from '@/db/types/models/ColumnModelType';

const getAllBoards = async (): Promise<BoardModelType[]> => {
	await dbConnect();
	return Board.find({}).sort({ name: 1 });
};
const getBoardById = async (id: string): Promise<BoardModelType | null> => {
	await dbConnect();
	return Board.findById(id);
};
const addColumnToBoard = async (board: BoardModelType, column: ColumnModelType): Promise<BoardModelType | null> => {
	await dbConnect();
	return Board.findOneAndUpdate({ _id: board.id }, { columns: [...board.columns, column] }, { new: true });
};

export const BOARDS = { getAllBoards, getBoardById, addColumnToBoard };

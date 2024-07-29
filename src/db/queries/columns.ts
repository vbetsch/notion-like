import dbConnect from '@/lib/dbConnect';
import Column from '@/db/models/Column';
import { ColumnModelType } from '@/db/types/models/ColumnModelType';
import { ColumnCreateDto } from '@/db/types/dto/columns';
import { CardModelType } from '@/db/types/models/CardModelType';

const getColumnsByBoardId = async (boardId: string): Promise<ColumnModelType[]> => {
	await dbConnect();
	return Column.find({ boardId }).sort({ order: 1 });
};
const getColumnById = async (id: string): Promise<ColumnModelType | null> => {
	await dbConnect();
	return Column.findById(id);
};
const createOneColumn = async (boardId: string, column: ColumnCreateDto): Promise<ColumnModelType> => {
	await dbConnect();
	return Column.create({
		...column,
		boardId,
	});
};
const addCardToColumn = async (card: CardModelType, column: ColumnModelType): Promise<ColumnModelType | null> => {
	await dbConnect();
	return Column.findOneAndUpdate({ _id: column.id }, { cards: [...column.cards, card] }, { new: true });
};

export const COLUMNS = { getColumnsByBoardId, getColumnById, createOneColumn, addCardToColumn };

import dbConnect from '@/lib/dbConnect';
import Column from '@/db/models/Column';
import { ColumnModelType } from '@/db/types/models/ColumnModelType';
import { ColumnCreateDto } from '@/db/types/dto/columns';

const getAllColumns = async (): Promise<ColumnModelType[]> => {
	await dbConnect();
	return Column.find({}).sort({ order: 1 });
};
const createOneColumn = async (boardId: string, column: ColumnCreateDto): Promise<ColumnModelType> => {
	await dbConnect();
	return Column.create({
		...column,
		boardId,
	});
};

export const COLUMNS = { getAllColumns, createOneColumn };

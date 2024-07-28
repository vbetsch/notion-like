import mongoose from 'mongoose';

export interface ColumnType extends mongoose.Document {
	name: string;
	order: number;
	cards: mongoose.Types.ObjectId[];
	boardId: mongoose.Types.ObjectId;
}

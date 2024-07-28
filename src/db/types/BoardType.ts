import mongoose from 'mongoose';

export interface BoardType extends mongoose.Document {
	name: string;
	columns: mongoose.Types.ObjectId[];
}

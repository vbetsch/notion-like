import mongoose from 'mongoose';

export interface BoardModelType extends mongoose.Document {
	name: string;
	columns: mongoose.Types.ObjectId[];
}

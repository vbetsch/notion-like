import mongoose from 'mongoose';

export interface CardModelType extends mongoose.Document {
	name: string;
	description?: string;
	columnId: mongoose.Types.ObjectId;
}

import mongoose from 'mongoose';

export interface CardType extends mongoose.Document {
	name: string;
	description: string;
	columnId: mongoose.Types.ObjectId;
}

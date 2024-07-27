import mongoose from 'mongoose';

export interface CardType extends mongoose.Document {
	name: string;
	description: string;
}

const CardSchema = new mongoose.Schema<CardType>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
});

export default mongoose.models.Card || mongoose.model<CardType>('Card', CardSchema);

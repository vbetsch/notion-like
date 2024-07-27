import mongoose from 'mongoose';
import { CardType } from '@/types/db/CardType';

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

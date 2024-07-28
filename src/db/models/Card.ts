import mongoose from 'mongoose';
import { CardType } from '@/db/types/CardType';

const CardSchema = new mongoose.Schema<CardType>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	columnId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Column',
	},
});

export default mongoose.models.Card || mongoose.model<CardType>('Card', CardSchema);

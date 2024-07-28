import mongoose from 'mongoose';
import { CardModelType } from '@/db/types/models/CardModelType';

const CardSchema = new mongoose.Schema<CardModelType>({
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

export default mongoose.models.Card || mongoose.model<CardModelType>('Card', CardSchema);

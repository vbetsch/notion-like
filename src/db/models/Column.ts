import mongoose from 'mongoose';
import { ColumnModelType } from '@/db/types/models/ColumnModelType';

const ColumnSchema = new mongoose.Schema<ColumnModelType>({
	name: {
		type: String,
		required: true,
	},
	order: {
		type: Number,
		required: true,
	},
	cards: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Card',
		},
	],
	boardId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Board',
	},
});

export default mongoose.models.Column || mongoose.model<ColumnModelType>('Column', ColumnSchema);

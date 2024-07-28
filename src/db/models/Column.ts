import mongoose from 'mongoose';
import { ColumnType } from '@/db/types/ColumnType';

const ColumnSchema = new mongoose.Schema<ColumnType>({
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

export default mongoose.models.Column || mongoose.model<ColumnType>('Column', ColumnSchema);

import mongoose from 'mongoose';
import { BoardModelType } from '@/db/types/models/BoardModelType';

const BoardSchema = new mongoose.Schema<BoardModelType>({
	name: {
		type: String,
		required: true,
	},
	columns: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Column',
		},
	],
});

export default mongoose.models.Board || mongoose.model<BoardModelType>('Board', BoardSchema);

import mongoose from 'mongoose';
import { BoardType } from '@/db/types/BoardType';

const BoardSchema = new mongoose.Schema<BoardType>({
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

export default mongoose.models.Board || mongoose.model<BoardType>('Board', BoardSchema);

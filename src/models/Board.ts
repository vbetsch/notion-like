import mongoose from 'mongoose';

export interface BoardType extends mongoose.Document {
	name: string;
	columns: mongoose.Types.ObjectId[];
}

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

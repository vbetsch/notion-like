import mongoose from 'mongoose';

export interface BoardType extends mongoose.Document {
	name: string;
}

const BoardSchema = new mongoose.Schema<BoardType>({
	name: {
		type: String,
		required: true,
	},
});

export default mongoose.models.Board || mongoose.model<BoardType>('Board', BoardSchema);

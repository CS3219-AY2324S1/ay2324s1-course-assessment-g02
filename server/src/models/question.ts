import { model, InferSchemaType, Schema } from 'mongoose';

const questionSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: {
    type: [String], // Define it as an array of strings
    required: true,
  },
  complexity: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
});

type Question = InferSchemaType<typeof questionSchema>;

export default model<Question>('Question', questionSchema);

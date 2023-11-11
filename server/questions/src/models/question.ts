import { prop, getModelForClass } from '@typegoose/typegoose';

class Question {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ type: String, required: true })
  public categories!: string[];

  @prop({ required: true, enum: ['Easy', 'Medium', 'Hard'] })
  public complexity!: string;
}

const QuestionModel = getModelForClass(Question);

export default QuestionModel;

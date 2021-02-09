import { Document, Model, Types } from 'mongoose';

export interface IBookDocument extends Document {
  id: Types.ObjectId;
  authorId: {
    type: Types.ObjectId;
    ref: 'Author';
  };
  title: String;
}

export interface IBookModel extends Model<IBookDocument> {}

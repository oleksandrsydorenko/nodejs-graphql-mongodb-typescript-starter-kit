import { Document, Model, Types } from 'mongoose';

export interface IAuthorDocument extends Document {
  id: Types.ObjectId;
  bookIds: string[];
  name: string;
}

export interface IAuthorModel extends Model<IAuthorDocument> {}

export interface IBookDocument extends Document {
  id: Types.ObjectId;
  authorId: {
    type: Types.ObjectId;
    ref: 'Author';
  };
  title: String;
}

export interface IBookModel extends Model<IBookDocument> {}

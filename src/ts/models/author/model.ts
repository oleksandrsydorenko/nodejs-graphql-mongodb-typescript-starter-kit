import { Document, Model, Types } from 'mongoose';

export interface IAuthorDocument extends Document {
  id: Types.ObjectId;
  bookIds: [
    {
      type: Types.ObjectId;
      ref: 'Book';
    },
  ];
  name: string;
}

export interface IAuthorModel extends Model<IAuthorDocument> {}

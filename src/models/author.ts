import { Document, Schema, Model, model, models, Types } from 'mongoose';

export interface IAuthorDocument extends Document {
  id: Types.ObjectId;
  bookIds: string[];
  name: string;
}

export interface IAuthorModel extends Model<IAuthorDocument> {}

const AuthorSchema: Schema = new Schema(
  {
    bookIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        trim: true,
      },
    ],
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

AuthorSchema.post('findOneAndDelete', async function findOneAndDelete(author) {
  if (!author) {
    return;
  }

  await models.Book.deleteMany({ authorId: author._id });
});

const AuthorModel: IAuthorModel = model<IAuthorDocument, IAuthorModel>(
  'Author',
  AuthorSchema,
);

export default AuthorModel;

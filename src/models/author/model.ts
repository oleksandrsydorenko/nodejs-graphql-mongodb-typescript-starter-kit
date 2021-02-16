import { model, models, Schema } from 'mongoose';
import { IAuthorDocument, IAuthorModel } from '@ts';

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

AuthorSchema.post(
  'findOneAndDelete',
  async function findOneAndDeleteHook(author: IAuthorDocument) {
    if (!author) {
      return;
    }

    await models.Book.deleteMany({ authorId: author._id });
  },
);

const AuthorModel: IAuthorModel = model<IAuthorDocument, IAuthorModel>(
  'Author',
  AuthorSchema,
);

export default AuthorModel;

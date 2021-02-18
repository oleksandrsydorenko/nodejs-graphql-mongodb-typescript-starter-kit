import { ApolloError } from 'apollo-server';
import { model, models, Schema } from 'mongoose';

import { ERROR_RESPONSE } from '@constants';
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
      throw new ApolloError(
        ERROR_RESPONSE.AUTHOR_DOES_NOT_EXISTS.message,
        ERROR_RESPONSE.AUTHOR_DOES_NOT_EXISTS.code,
      );
    }

    await models.Book.deleteMany({ authorId: author._id });
  },
);

const AuthorModel: IAuthorModel = model<IAuthorDocument, IAuthorModel>(
  'Author',
  AuthorSchema,
);

export default AuthorModel;

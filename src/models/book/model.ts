import { ApolloError } from 'apollo-server';
import { model, models, Schema } from 'mongoose';

import { ERROR_RESPONSE } from '@constants';
import { IBookDocument, IBookModel } from '@ts';

const BookSchema: Schema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

BookSchema.post(
  'findOneAndDelete',
  async function findOneAndDeleteHook(book: IBookDocument) {
    if (!book) {
      throw new ApolloError(
        ERROR_RESPONSE.BOOK_DOES_NOT_EXISTS.message,
        ERROR_RESPONSE.BOOK_DOES_NOT_EXISTS.code,
      );
    }

    await models.Author.findOneAndUpdate(
      { _id: book.authorId },
      {
        $pull: {
          bookIds: book._id,
        },
      },
    );
  },
);

const BookModel: IBookModel = model<IBookDocument, IBookModel>(
  'Book',
  BookSchema,
);

export default BookModel;

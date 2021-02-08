import { Schema, model, models } from 'mongoose';
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
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

BookSchema.post('findOneAndDelete', async function deleteOne(book) {
  if (!book) {
    return;
  }

  await models.Author.findOneAndUpdate(this.authorId, {
    $pull: {
      bookIds: book._id,
    },
  });
});

const BookModel: IBookModel = model<IBookDocument, IBookModel>(
  'Book',
  BookSchema,
);

export default BookModel;

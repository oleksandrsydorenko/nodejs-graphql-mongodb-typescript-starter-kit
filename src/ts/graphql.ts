import { IAuthorModel, IBookModel } from './models';

export interface IContext {
  models: {
    Author: IAuthorModel;
    Book: IBookModel;
  };
}

export type IResolver<TParent, TArgs, TResponse> = (
  parent: TParent,
  args: TArgs,
  context: IContext,
) => Promise<TResponse>;

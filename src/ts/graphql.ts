import { IAuthorModel, IBookModel } from './models';
import { IError } from './base';

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
) => Promise<TResponse | IError>;

export const cacheControl: string = `
  directive @cacheControl (
      maxAge: Int
      scope: CacheControlScope
  ) on OBJECT | FIELD | FIELD_DEFINITION

  enum CacheControlScope {
    PRIVATE
    PUBLIC
  }
`;

export default [cacheControl];

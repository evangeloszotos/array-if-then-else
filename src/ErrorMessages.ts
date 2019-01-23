export interface ErrorMessages {
  argumentIsNotAnArray: string;
  callbackReturnsNoStrictBoolean: string;
}

export const errorMessages: ErrorMessages = {
  argumentIsNotAnArray: 'Expecting first argument to be array',
  callbackReturnsNoStrictBoolean: 'Callback should return only true or false'
};

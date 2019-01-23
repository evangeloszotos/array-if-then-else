import isFunction from 'is-function';
import { errorMessages } from './ErrorMessages';

export default function arrayIfThenElse(
  array: any[],
  searchElementOrCallback: any,
  thenResult: any = true,
  elseResult: any = false,
): any {
  if (!Array.isArray(array)) {
    throw errorMessages.argumentIsNotAnArray;
  }

  let callback: (item: any) => boolean = null;

  if (isFunction(searchElementOrCallback)) {
    callback = <(item: any) => boolean>searchElementOrCallback;
  } else {
    callback = element => element === searchElementOrCallback;
  }

  const meetsCondition = arraySomeWithBooleanCallback(array, callback);
  return meetsCondition ? thenResult : elseResult;
}

function arraySomeWithBooleanCallback(
  array: any[],
  callback: (item: any) => boolean,
): boolean {
  let result = false;
  let element = null;
  let lastCallbackResult = null;
  for (let i = 0; i < array.length; ++i) {
    element = array[i];
    lastCallbackResult = callback(element);

    const isResultStrictBoolean = !(lastCallbackResult === false || lastCallbackResult === true);
    if (isResultStrictBoolean) {
      throw errorMessages.callbackReturnsNoStrictBoolean
    }

    if (lastCallbackResult) {
      result = true;
      break;
    }
  }

  return result;
}

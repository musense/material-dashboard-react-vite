import {
  deleteSubmitKey,
  checkHasNoChildren,
  isDate,
  isArray,
  isObject,
  isImage,
  checkValueEqual,
  checkDateEqual
} from './fnHelper';

export default function recurseCheckAndDelete(state, initialState) {
  const submitState = { ...state }
  for (const key in initialState) {
    const stateValue = initialState[key];

    if (isImage(key) && checkValueEqual(stateValue, submitState, key)) {
      deleteSubmitKey(submitState, key);
    }

    if (isObject(stateValue)) {
      const trimmedState = recurseCheckAndDelete(submitState[key], stateValue)
      if (checkHasNoChildren(trimmedState)) {
        deleteSubmitKey(submitState, key);
      }
    }

    if (isArray(stateValue) && checkValueEqual(stateValue, submitState, key)) {
      deleteSubmitKey(submitState, key);
    }

    if (isDate(stateValue) && checkDateEqual(stateValue, submitState, key)) {
      deleteSubmitKey(submitState, key);
    }

    if (checkValueEqual(stateValue, submitState, key)) {
      deleteSubmitKey(submitState, key);
    }
  }

  return submitState
}

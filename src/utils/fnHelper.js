
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

function deleteSubmitKey(submitState, key) {
  delete submitState[key];
}

function checkHasNoChildren(trimmedState) {
  return trimmedState && Object.values(trimmedState).length === 0;
}

/**
 * Checks if the given value is a valid date string.
 *
 * @param {string} value - The value to check for validity as a date string.
 * @returns {boolean} Returns `true` if the value is a valid date string, otherwise `false`.
 * @example
 * const result = isDate('2023-12-4 15:30');
 * console.log(result); // true
 */
function isDate(value) {
  return dayjs(value, 'YYYY-M-D H:m', true).isValid();
}

function isArray(value) {
  return value && Array.isArray(value);
}

function isObject(value) {
  return value && !Array.isArray(value) && typeof value === 'object';
}

function isImage(key) {
  return key.toLowerCase().includes('image');
}


function checkValueEqual(value, submitState, key) {
  console.log("🚀 ~ file: fnHelper.js:42 ~ checkValueEqual ~ value:", value)
  console.log("🚀 ~ file: fnHelper.js:42 ~ checkValueEqual ~ submitState[key]:", submitState[key])
  console.log("🚀 ~ file: fnHelper.js:42 ~ checkValueEqual ~ JSON.stringify(value) === JSON.stringify(submitState[key]):", JSON.stringify(value) === JSON.stringify(submitState[key]));

  return JSON.stringify(value) === JSON.stringify(submitState[key]);
}

function checkDateEqual(value, submitState, key) {
  return dayjs(value).isSame(submitState[key], 'minutes')
}

export {
  deleteSubmitKey,
  checkHasNoChildren,
  isDate,
  isArray,
  isObject,
  isImage,
  checkValueEqual,
  checkDateEqual
}
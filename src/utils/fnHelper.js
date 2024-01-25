
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

function deleteSubmitKey(submitState, key) {
  if (key === 'tags' || key === 'categories') {
    console.log("🚀 ~ file: fnHelper.js:8 ~ deleteSubmitKey ~ submitState, key:", submitState, key)
  }
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

/**
 * 檢查一個值是否為非空物件。
 *
 * @param {*} value - 要檢查的值
 * @returns {boolean} 如果值是非空物件，則返回 true，否則返回 false。
 */
function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isImage(key) {
  return key.toLowerCase().includes('image');
}


/**
 * 檢查兩個值是否相等，使用 JSON 字符串序列化進行比較。
 *
 * @param {*} value - 要比較的值
 * @param {object} submitState - 提交狀態的物件
 * @param {string} key - 物件的鍵
 * @returns {boolean} 如果值相等，則返回 true；否則返回 false。
 */
function checkValueEqual(value, submitState, key) {
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
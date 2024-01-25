import { isObject, checkValueEqual } from './fnHelper';

/**
 * 判斷表單是否有修改的函數
 *
 * @param {object} initialState - 表單的初始狀態
 * @param {object} currentState - 當前表單的狀態
 * @returns {boolean} 如果表單有修改，則返回 true；否則返回 false。
 */
export default function isFormModified(initialState, currentState) {
  console.log("🚀 ~ file: recurseCheckAndDelete.js:11 ~ isFormModified ~ currentState:", currentState)
  console.log("🚀 ~ file: recurseCheckAndDelete.js:11 ~ isFormModified ~ initialState:", initialState)
  // 如果 currentState 為空，表示沒有修改
  if (!currentState) return false;


  /**
    * 遞迴檢查每個屬性，判斷是否有修改
    *
    * @param {object} initial - 初始狀態的物件
    * @param {object} current - 當前狀態的物件
    * @returns {boolean} 如果有修改，則返回 true；否則返回 false。
    */
  function recurseCheck(initial, current) {
    for (const key in initial) {

      // 取得初始和當前值
      const initialValue = initial[key];
      const currentValue = current[key];

      // 如果是物件，繼續遞迴檢查
      if (isObject(initialValue)) {
        if (recurseCheck(initialValue, currentValue)) {
          return true; // 子物件有修改
        }
      } else {
        // 檢查基本類型和陣列是否相等
        if (!checkValueEqual(initialValue, current, key)) {
          return true; // 值有修改
        }
      }
    }

    return false;
  }

  // 返回遞迴檢查的結果
  return recurseCheck(initialState, currentState);
}

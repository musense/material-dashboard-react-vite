import { useCallback } from "react";
import { useDispatch } from 'react-redux';
import * as GetSlateAction from "@actions/GetSlateAction";
import * as GetEditorAction from "@actions/GetEditorAction";

/**
 * 自定義 hook，提供處理編輯器相關事件的回呼函數。
 *
 * @returns {Object} 包含處理編輯器儲存、更新和預覽事件的回呼函數的對象。
 * @property {function} onEditorSave - 處理編輯器儲存事件的回呼函數。
 * @property {function} onEditorUpdate - 更新編輯器的回呼函數，用於更新編輯器的數據或標記為草稿。
 * @property {function} onPreviewSave - 儲存預覽的回呼函數，用於保存預覽數據。
 *
 * @example
 * 使用範例
 * const { onEditorSave, onEditorUpdate, onPreviewSave } = useEditorSave();
 * const editorData = { serialNumber: 123, / * 其他數據 * / };
 * onEditorSave(editorData, true);
 */
export default function useEditorSave() {
  const dispatch = useDispatch();

  /**
  * 處理編輯器儲存事件的回呼函數。
  *
  * @param {Object} data - 編輯器的數據。
  * @param {boolean} [willBeDraft=false] - 標誌是否將數據保存為草稿。預設值為 false。
  * @param {boolean} [__NO_PAYLOAD_BACK__=false] - 標誌是否在 payload 中不包含返回數據。預設值為 false。
  * @returns {void}
  *
  * @example
  * 使用範例
  * const editorData = { serialNumber: 123, / * 其他數據 * / };
  * onEditorSave(editorData, true, true);
  */
  const onEditorSave = useCallback((data, willBeDraft = false, __NO_PAYLOAD_BACK__ = false) => {
    dispatch({
      type: GetEditorAction.ADD_EDITOR,
      payload: {
        data,
        willBeDraft,
        serialNumber: data.serialNumber,
        __NO_PAYLOAD_BACK__
      },
    })
  }, [dispatch])

  /**
   * 更新編輯器的回呼函數，用於更新編輯器的數據或標記為草稿。
   *
   * @param {Object} data - 新的編輯器數據。
   * @param {string|null} [id=null] - 編輯器的唯一標識符。可以為 null。
   * @param {boolean} [draft=false] - 標誌是否將數據標記為草稿。預設值為 false。
   * @param {boolean} [__NO_PAYLOAD_BACK=false] - 標誌是否在 payload 中不包含返回數據。預設值為 false。
   * @returns {void}
   *
   * @example
   * 使用範例
   * const updatedData = { / * 新的數據 * / };
   * onEditorUpdate(updatedData, 'editor123', true, true);
   */
  const onEditorUpdate = useCallback((data, id = null, draft = false, __NO_PAYLOAD_BACK__ = false) => {
    dispatch({
      type: GetEditorAction.UPDATE_EDITOR,
      payload: {
        id: id,
        data: data,
        draft: draft,
        __NO_PAYLOAD_BACK__
      },
    })
  }, [dispatch])


  /**
   * 儲存預覽的回呼函數，用於保存預覽數據。
   *
   * @param {Object} data - 預覽的數據。
   * @returns {void}
   *
   * @example
   * // 使用範例
   * const previewData = { / * 預覽的數據 * / };
   * onPreviewSave(previewData);
   */
  const onPreviewSave = useCallback((data) => {
    console.log("🚀 ~ file: useEditorSave.js:36 ~ onPreviewSave ~ data:", data)
    dispatch({
      type: GetSlateAction.PREVIEW_EDITOR,
      payload: {
        data: data
      },
    })
  }, [dispatch])

  return {
    onEditorSave,
    onEditorUpdate,
    onPreviewSave,
  }
}

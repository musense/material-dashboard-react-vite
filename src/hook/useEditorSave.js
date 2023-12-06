import { useCallback } from "react";
import { useDispatch } from 'react-redux';
import * as GetSlateAction from "@actions/GetSlateAction";
import * as GetEditorAction from "@actions/GetEditorAction";

export default function useEditorSave() {
  const dispatch = useDispatch();

  const onEditorSave = useCallback((data, willBeDraft = false, serialNumber = null) => {
    console.log("🚀 ~ file: useEditorSave.js:10 ~ onEditorSave ~ serialNumber:", serialNumber)
    console.log("🚀 ~ file: useEditorSave.js:10 ~ onEditorSave ~ willBeDraft:", willBeDraft)
    console.log("🚀 ~ file: useEditorSave.js:10 ~ onEditorSave ~ data:", data)

    dispatch({
      type: GetEditorAction.ADD_EDITOR,
      payload: {
        data,
        willBeDraft,
        serialNumber
      },
    })
  }, [dispatch])

  const onEditorUpdate = useCallback((data, id = null, draft = false) => {
    dispatch({
      type: GetEditorAction.UPDATE_EDITOR,
      payload: {
        id: id,
        data: data,
        draft: draft
      },
    })
  }, [dispatch])

  const onPreviewSave = useCallback((data) => {
    console.log("🚀 ~ file: useEditorSave.js:36 ~ onPreviewSave ~ data:", data)
    dispatch({
      type: GetSlateAction.PREVIEW_EDITOR,
      payload: {
        data: data
      },
    })
  }, [dispatch])

  return { onEditorSave, onEditorUpdate, onPreviewSave }
}

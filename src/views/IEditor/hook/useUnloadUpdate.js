import { useCallback } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useEditorForm from "./useEditorForm";
import { useSelector } from "react-redux";
import { getEditorUpdated } from "../../../reducers/GetSlateReducer";
import useUnloadSaveCallback from "../../../hook/useUnloadCallback"

export default function useUnloadUpdate({ id, draft }) {
  const { onEditorUpdate } = useEditorSave()
  const { slateForm } = useEditorForm();
  const editorUpdated = useSelector(state => getEditorUpdated(state, 'update'))

  const handleUnload = useCallback(() => {
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ 頁面即將卸載，執行一些清理操作...")
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ handleUnload ~ draft:", draft)
    if (!id) return
    if (!draft) return
    if (!editorUpdated) return
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ handleUnload ~ slateForm:", slateForm)

    if (!slateForm.title || !slateForm.htmlContent) return

    onEditorUpdate(slateForm, id, true)
  }, [editorUpdated, slateForm, onEditorUpdate, id, draft]);

  useUnloadSaveCallback(handleUnload)
}

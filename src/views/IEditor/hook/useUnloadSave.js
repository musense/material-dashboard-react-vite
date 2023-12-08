import { useCallback } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useEditorForm from "./useEditorForm";
import { useSelector } from "react-redux";
import { getEditorUpdated } from "../../../reducers/GetSlateReducer";
import useUnloadSaveCallback from "../../../hook/useUnloadCallback"

export default function useUnloadSave() {
  const { onEditorSave } = useEditorSave()
  const { slateForm } = useEditorForm();
  const editorUpdated = useSelector(state => getEditorUpdated(state, 'add_new'))

  const handleUnload = useCallback(() => {
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ 頁面即將卸載，執行一些清理操作...")
    if (!editorUpdated) return
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ handleUnload ~ slateForm:", slateForm)

    if (!slateForm.title || !slateForm.htmlContent) return

    onEditorSave(slateForm, true)
  }, [editorUpdated, slateForm, onEditorSave]);

  useUnloadSaveCallback(handleUnload);
}

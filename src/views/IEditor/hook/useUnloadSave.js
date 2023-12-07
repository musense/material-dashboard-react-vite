import { useCallback, useEffect } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useEditorForm from "./useEditorForm";
import { useSelector } from "react-redux";
import { getEditorUpdated } from "../../../reducers/GetSlateReducer";

export default function useUnloadSave({ createType, draft = false }) {
  const { onEditorSave } = useEditorSave()
  const { slateForm } = useEditorForm();
  const editorUpdated = useSelector(state => getEditorUpdated(state, createType))

  const handleUnload = useCallback(() => {
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ 頁面即將卸載，執行一些清理操作...")
    if (!editorUpdated) return
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ handleUnload ~ draft:", draft)
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ handleUnload ~ slateForm:", slateForm)

    if (!slateForm.title || !slateForm.htmlContent) return
    if (!(createType === 'add_new' || (createType === 'update' && draft))) return

    onEditorSave(slateForm, true)
  }, [editorUpdated, draft, slateForm, onEditorSave, createType]);

  useEffect(() => {
    window.addEventListener('unload', handleUnload);
    return () => window.removeEventListener('unload', handleUnload);
  }, [handleUnload]);

}

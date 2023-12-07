import { useCallback, useEffect } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useEditorForm from "./useEditorForm";
import { useSelector } from "react-redux";
import { getEditorUpdated } from "../../../reducers/GetSlateReducer";
import { useSearchParams } from "react-router-dom";

export default function useUnloadSave({ createType }) {
  const { onEditorSave } = useEditorSave()
  const { serverEditorForm, editorForm } = useEditorForm();
  const editorUpdated = useSelector(state => getEditorUpdated(state, createType))

  const [searchParams, setSearchParams] = useSearchParams();
  const draft = searchParams.get('draft') === 'true';
  console.log("🚀 ~ file: index.jsx:29 ~ IEditor ~ draft:", draft)

  useEffect(() => {
    setSearchParams({
      draft: serverEditorForm?.draft || draft
    })
  }, [setSearchParams, draft, serverEditorForm]);

  const handleUnload = useCallback(() => {
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ 頁面即將卸載，執行一些清理操作...")
    if (!editorUpdated) return
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ handleUnload ~ draft:", draft)
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ handleUnload ~ editorForm:", editorForm)

    if (!editorForm.title || !editorForm.htmlContent) return
    if (!(createType === 'add_new' || (createType === 'update' && draft))) return

    onEditorSave(editorForm, true)
  }, [onEditorSave, editorForm, draft, editorUpdated, createType]);

  useEffect(() => {
    window.addEventListener('unload', handleUnload);
    return () => window.removeEventListener('unload', handleUnload);
  }, [handleUnload]);

}

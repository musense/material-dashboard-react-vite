import useEditorSave from "../../../hook/useEditorSave";
import useUnloadCallback from "../../../hook/useUnloadCallback"
import useSlateForm from "./useSlateForm";
import useResetPage from "./useResetPage";
import useEditorUpdated from "./useEditorUpdated";

export default function useUnloadSaveDraftPage() {
  const { onEditorSave } = useEditorSave()
  const slateForm = useSlateForm();
  const editorUpdated = useEditorUpdated()

  const handleResetPage = useResetPage()

  function handleUnloadSaveDraftPage() {
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ 頁面即將卸載，執行一些清理操作...")
    if (!editorUpdated) return
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ handleUnload ~ slateForm:", slateForm)

    if (!slateForm.title || !slateForm.htmlContent) return

    onEditorSave(slateForm, true)
    handleResetPage()
  }

  useUnloadCallback(handleUnloadSaveDraftPage);
}

import useEditorSave from "../../../hook/useEditorSave";
import useSlateForm from "./useSlateForm";
import useUnloadCallback from "../../../hook/useUnloadCallback"
import useResetPage from "./useResetPage";
import useEditorUpdated from "./useEditorUpdated";

export default function useUnloadUpdateDraftPage({ id, draft }) {
  const { onEditorUpdate } = useEditorSave()
  const slateForm = useSlateForm();
  const editorUpdated = useEditorUpdated()

  const handleResetPage = useResetPage()

  function handleUnloadUpdateDraftPage() {
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ 頁面即將卸載，執行一些清理操作...")
    if (!id) return
    if (!draft) return
    if (!editorUpdated) return
    if (!slateForm.title || !slateForm.htmlContent) return
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ handleUnload ~ slateForm:", slateForm)
    console.log("🚀 ~ file: useUnloadSave.js:10 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    onEditorUpdate(slateForm, id, true)
    handleResetPage()
  }

  useUnloadCallback(handleUnloadUpdateDraftPage)
}

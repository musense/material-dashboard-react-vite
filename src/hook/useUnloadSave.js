import { useCallback, useEffect } from "react";

export default function useUnloadSave({
  onEditorSave,
  submitState,
  draft,
  editorUpdated
}) {

  const handleUnload = useCallback(() => {
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ 頁面即將卸載，執行一些清理操作...")
    if (!editorUpdated) return
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ handleUnload ~ draft:", draft)
    console.log("🚀 ~ file: useUnloadSave.js:10 ~ handleUnload ~ submitState:", submitState)
    if (!draft) return
    if (!submitState.title || !submitState.htmlContent) return
    // save draft submitState
    onEditorSave(submitState, true)
  }, [onEditorSave, submitState, draft, editorUpdated]);

  useEffect(() => {
    window.addEventListener('unload', handleUnload);
    return () => window.removeEventListener('unload', handleUnload);
  }, [handleUnload]);

}

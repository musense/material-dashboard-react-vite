import { useEffect } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useEditorForm from "./useEditorForm";
import useErrorMessage from "../../../hook/useErrorMessage";

export default function useSavePage({ draft = false } = {}) {
  const { onEditorSave } = useEditorSave()
  const { submitForm, editorForm } = useEditorForm();
  const message = useErrorMessage();
  useEffect(() => {
    if (message !== 'check__OK!') return

    if (draft) {
      onEditorSave(editorForm, false, editorForm.serialNumber)
      return
    }
    onEditorSave(submitForm)
  }, [editorForm, draft, message, onEditorSave, submitForm]);

}

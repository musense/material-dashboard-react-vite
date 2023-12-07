import { useEffect } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useEditorForm from "./useEditorForm";
import useErrorMessage from "../../../hook/useErrorMessage";

export default function useSaveDraftPage({ draft = false }) {
  const { onEditorSave } = useEditorSave()
  const { submitForm, submitWithSerialNumber } = useEditorForm();
  console.log("🚀 ~ file: useSaveDraftPage.js:11 ~ useSaveDraftPage ~ submitForm:", submitForm)

  const message = useErrorMessage();
  useEffect(() => {
    if (message !== 'check__OK!') return
    if (!draft) return

    onEditorSave(submitWithSerialNumber, false)
  }, [message, draft, onEditorSave, submitWithSerialNumber]);
}

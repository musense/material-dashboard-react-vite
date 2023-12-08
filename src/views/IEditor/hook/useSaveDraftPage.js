import { useEffect } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useEditorForm from "./useEditorForm";
import useErrorMessage from "../../../hook/useErrorMessage";

export default function useSaveDraftPage({ draft = false }) {
  const { submitWithSerialNumber } = useEditorForm();
  const { onEditorSave } = useEditorSave()
  const message = useErrorMessage();

  useEffect(() => {
    if (message !== 'check__OK!') return
    if (!draft) return

    onEditorSave(submitWithSerialNumber, false)
  }, [message, draft, onEditorSave, submitWithSerialNumber]);
}

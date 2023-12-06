import { useEffect } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useEditorForm from "./useEditorForm";
import useErrorMessage from "../../../hook/useErrorMessage";

export default function useSavePage() {
  const { onEditorSave } = useEditorSave()
  const { submitForm } = useEditorForm();
  const message = useErrorMessage();
  useEffect(() => {
    if (message !== 'check__OK!') return

    onEditorSave(submitForm)
  }, [message, onEditorSave, submitForm]);

}

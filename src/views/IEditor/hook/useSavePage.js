import { useEffect } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useEditorForm from "./useEditorForm";
import useErrorMessage from "../../../hook/useErrorMessage";
import useIsPreview from "./useIsPreview";

export default function useSavePage() {
  const isPreview = useIsPreview()
  const { onEditorSave } = useEditorSave()
  const { submitForm } = useEditorForm();

  const message = useErrorMessage();
  useEffect(() => {
    if (message !== 'check__OK!') return
    if (isPreview) return

    onEditorSave(submitForm)
  }, [message, isPreview, onEditorSave, submitForm]);

}

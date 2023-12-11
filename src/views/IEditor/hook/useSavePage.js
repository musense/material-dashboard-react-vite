import { useEffect } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useErrorMessage from "../../../hook/useErrorMessage";
import useIsPreview from "./useIsPreview";
import useSubmitForm from "./useSubmitForm";

export default function useSavePage() {
  const isPreview = useIsPreview()
  const { onEditorSave } = useEditorSave()
  const submitForm = useSubmitForm();

  const message = useErrorMessage();
  useEffect(() => {
    if (message !== 'check__OK!') return
    if (isPreview) return

    onEditorSave(submitForm)
  }, [message, isPreview, onEditorSave, submitForm]);

}

import { useEffect } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useErrorMessage from "../../../hook/useErrorMessage";
import useIsPreview from "./useIsPreview";
import useSubmitForm from "./useSubmitForm";

export default function useSaveDraftPage({ draft = false }) {
  const isPreview = useIsPreview()
  const submitForm = useSubmitForm();
  const { onEditorSave } = useEditorSave()
  const message = useErrorMessage();

  useEffect(() => {
    if (isPreview) return
    if (message !== 'check__OK!') return
    if (!draft) return

    onEditorSave(submitForm, false)
  }, [isPreview, message, draft, onEditorSave, submitForm]);
}

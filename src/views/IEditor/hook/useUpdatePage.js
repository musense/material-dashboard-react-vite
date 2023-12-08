import { useEffect } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useEditorForm from "./useEditorForm";
import useErrorMessage from "../../../hook/useErrorMessage";
import useIsPreview from "./useIsPreview";

export default function useUpdatePage({ id, draft = false }) {
  const isPreview = useIsPreview()
  const { submitForm } = useEditorForm();
  const { onEditorUpdate } = useEditorSave()
  const message = useErrorMessage();

  useEffect(() => {
    if (isPreview) return
    if (message !== 'check__OK!') return
    if (!id) return

    onEditorUpdate(submitForm, id, draft)
  }, [message, draft, id, isPreview, onEditorUpdate, submitForm]);
}

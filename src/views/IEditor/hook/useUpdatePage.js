import { useEffect } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useEditorForm from "./useEditorForm";
import useErrorMessage from "../../../hook/useErrorMessage";
import useSaveDraftPage from "./useSaveDraftPage";

export default function useUpdatePage({ id, draft = false }) {

  const { submitForm } = useEditorForm();
  const { onEditorUpdate } = useEditorSave()
  const message = useErrorMessage();

  useSaveDraftPage({ draft })

  useEffect(() => {
    if (message !== 'check__OK!') return
    if (draft) return
    if (!id) return

    onEditorUpdate(submitForm, id)
  }, [message, draft, id, onEditorUpdate, submitForm]);
}

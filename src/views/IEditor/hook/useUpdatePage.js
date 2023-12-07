import React, { useEffect } from "react";
import useEditorSave from "../../../hook/useEditorSave";
import useEditorForm from "./useEditorForm";
import useErrorMessage from "../../../hook/useErrorMessage";

export default function useUpdatePage({ id }) {

  const { submitForm } = useEditorForm();
  const { onEditorUpdate } = useEditorSave()
  const message = useErrorMessage();
  useEffect(() => {
    if (message !== 'check__OK!') return
    if (id) {
      onEditorUpdate(submitForm, id)
      return
    }
  }, [id, onEditorUpdate, message, submitForm]);
}

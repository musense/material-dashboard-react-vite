import useEditorForm from "./useEditorForm";

export default function useEditorIDAndDraft() {
  const serverEditorForm = useEditorForm()
  return {
    id: serverEditorForm?.id,
    draft: serverEditorForm?.draft
  }
}

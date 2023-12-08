import { useSelector } from "react-redux";
import { getEditor } from "../../../reducers/GetEditorReducer";

export default function useEditorIDAndDraft() {
  const serverEditorForm = useSelector(getEditor)
  return {
    id: serverEditorForm?.id,
    draft: serverEditorForm?.draft
  }
}

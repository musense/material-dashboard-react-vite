import { useSelector } from "react-redux";
import { getEditor } from "../../../reducers/GetEditorReducer";
import { getEditorForm, getSubmitState } from "../../../reducers/GetSlateReducer";

export default function useEditorForm() {

  const serverEditorForm = useSelector(getEditor);
  const submitForm = useSelector(getSubmitState);
  const editorForm = useSelector(getEditorForm);

  return {
    serverEditorForm,
    submitForm,
    editorForm
  }
}

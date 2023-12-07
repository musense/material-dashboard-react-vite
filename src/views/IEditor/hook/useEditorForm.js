import { useSelector } from "react-redux";
import { getEditor } from "../../../reducers/GetEditorReducer";
import { getSlateForm, getSubmitForm, getSubmitState } from "../../../reducers/GetSlateReducer";

export default function useEditorForm() {

  const serverEditorForm = useSelector(getEditor);
  const submitForm = useSelector(getSubmitState);
  const slateForm = useSelector(getSlateForm);
  const submitWithSerialNumber = useSelector(getSubmitForm);

  return {
    serverEditorForm,
    submitForm,
    slateForm,
    submitWithSerialNumber
  }
}

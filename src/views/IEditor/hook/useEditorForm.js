import { useSelector } from "react-redux";
import { getEditor } from "../../../reducers/GetEditorReducer";

export default function useEditorForm() {

  const serverEditorForm = useSelector(getEditor);

  return serverEditorForm
}

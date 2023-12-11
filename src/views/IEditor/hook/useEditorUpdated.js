import { useSelector } from "react-redux";
import { getEditorUpdated } from "../../../reducers/GetSlateReducer";

export default function useEditorUpdated(createType) {
  const editorUpdated = useSelector(state => getEditorUpdated(state, createType))

  return editorUpdated
}

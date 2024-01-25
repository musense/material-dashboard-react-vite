import { useSelector } from "react-redux";
import getErrorMessage from '../utils/getErrorMessage';
import { getSlateErrorMessage } from "../reducers/GetSlateReducer";
import { getEditorErrorMessage } from "../reducers/GetEditorReducer";

export default function useErrorMessage() {

  const returnMessage = useSelector(getSlateErrorMessage);
  const errorMessage = useSelector(getEditorErrorMessage);
  const message = getErrorMessage(errorMessage, returnMessage)

  return message;
}

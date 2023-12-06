import { useSelector } from "react-redux";
import getErrorMessage from '../utils/getErrorMessage';

export default function useErrorMessage() {

  const returnMessage = useSelector((state) => state.getSlateReducer.errorMessage);
  const errorMessage = useSelector((state) => state.getEditorReducer.errorMessage);
  const message = getErrorMessage(errorMessage, returnMessage)

  return message;
}

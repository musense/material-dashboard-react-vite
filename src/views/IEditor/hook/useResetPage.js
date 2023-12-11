import { useDispatch } from "react-redux";
import * as GetEditorAction from "../../../actions/GetEditorAction";
import * as GetSlateAction from "../../../actions/GetSlateAction";
// import useUnloadCallback from "../../../hook/useUnloadCallback";

export default function useResetPage() {
  const dispatch = useDispatch();

  function handleResetPage() {
    dispatch({ type: GetEditorAction.RESET_EDITOR })
    dispatch({ type: GetSlateAction.RESET_FORM_VALUE })
  }

  return handleResetPage;
}

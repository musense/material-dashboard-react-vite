import { useSelector } from "react-redux";
import { getSlateForm } from "../../../reducers/GetSlateReducer";

export default function useSlateForm() {
  const slateForm = useSelector(getSlateForm);

  return slateForm
}

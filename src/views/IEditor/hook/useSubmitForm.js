import { useSelector } from "react-redux";
import { getSubmitForm } from "../../../reducers/GetSlateReducer";

export default function useSubmitForm() {
  const submitForm = useSelector(getSubmitForm);

  return submitForm
}

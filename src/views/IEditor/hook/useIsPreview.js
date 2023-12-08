import { useSelector } from "react-redux";
import { getIsPreview } from "../../../reducers/GetSlateReducer";

export default function useIsPreview() {
  const isPreview = useSelector(getIsPreview);

  return isPreview
}

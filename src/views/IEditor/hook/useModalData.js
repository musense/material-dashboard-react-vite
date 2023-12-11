// import { getModalData } from "../../../reducers/GetEditorReducer";

import { getEditor } from "../../../reducers/GetEditorReducer";
import { getTempSitemapUrl } from "../../../reducers/GetSlateReducer";
import { useSelector } from "react-redux";

export default function useModalData() {
  // const modalData = getModalData();
  const editor = useSelector(getEditor);
  const tempSitemapUrl = useSelector(getTempSitemapUrl);
  const modalData = {
    ...editor,
    tempSitemapUrl
  }

  console.log("🚀 ~ file: useModalData.js:5 ~ useModalData ~ modalData:", modalData)
  return modalData
}

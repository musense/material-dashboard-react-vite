import { useEffect, useState } from "react";
import { getDialogConfirm, getDialogContentData, getDialogData, getDialogMessageDialogReturnValue } from "../../../reducers/GetDialogReducer";
import { getEditor } from "../../../reducers/GetEditorReducer";
import { getTempSitemapUrl } from "../../../reducers/GetSlateReducer";
import { useSelector } from "react-redux";

export default function useModalData() {

  const contentData = useSelector(getDialogContentData);
  const modalConfirmData = useSelector(getDialogData);
  const confirm = useSelector(getDialogConfirm);
  const messageDialogReturnValue = useSelector(getDialogMessageDialogReturnValue);

  const editor = useSelector(getEditor);
  const tempSitemapUrl = useSelector(getTempSitemapUrl);

  const [modalData, setModalData] = useState();

  useEffect(() => {
    if (contentData) {
      setModalData(contentData);
    } else {
      setModalData({
        ...editor,
        tempSitemapUrl
      });
    }

    return () => {
      setModalData(null);
    }
  }, [contentData, editor, tempSitemapUrl]);
  console.log("🚀 ~ file: useModalData.js:5 ~ useModalData ~ modalData:", modalData)
  return {
    modalData,
    modalConfirmData,
    confirm,
    messageDialogReturnValue,
  }
}

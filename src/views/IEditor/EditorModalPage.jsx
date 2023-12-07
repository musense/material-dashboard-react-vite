import React, { useMemo } from "react";
import useErrorMessage from "../../hook/useErrorMessage";
import { useSelector } from "react-redux";
import { getTempSitemapUrl } from "../../reducers/GetSlateReducer";
import useModalResult from "../../hook/useModalResult";
import useEditorForm from "./hook/useEditorForm";
import useEditorModal from "./hook/useEditorModal";
import useModalRootRef from "../../hook/useModalRootRef";
import MessageDialog from "../../components/Modal/MessageDialog";
import { createPortal } from "react-dom";

export default function EditorModalPage() {

  const modalRoot = useModalRootRef()

  const { serverEditorForm } = useEditorForm();
  console.log("🚀 ~ file: EditorModalPage.jsx:17 ~ EditorModalPage ~ serverEditorForm:", serverEditorForm)
  const errorMessage = useErrorMessage();
  console.log("🚀 ~ file: EditorModalPage.jsx:17 ~ EditorModalPage ~ errorMessage:", errorMessage)
  const tempSitemapUrl = useSelector(getTempSitemapUrl);

  const modalData = useMemo(() => {
    return {
      ...serverEditorForm,
      tempSitemapUrl,
    }
  }, [tempSitemapUrl, serverEditorForm])
  console.log("🚀 ~ file: EditorModalPage.jsx:17 ~ modalData ~ modalData:", modalData)

  const modalResults = useModalResult({
    message: errorMessage,
    name: '文章',
    data: modalData,
    isEditor: true
  })
  console.log("🚀 ~ file: EditorModalPage.jsx:17 ~ EditorModalPage ~ modalResults:", modalResults)

  const {
    open,
    handleClose
  } = useEditorModal(modalResults.title)

  return modalRoot && createPortal(
    <MessageDialog
      dialogTitle={modalResults.title}
      dialogContent={modalResults.content}
      editorID={modalResults.editorID}
      editorDraft={modalResults.editorDraft}
      sitemapUrl={modalResults.sitemapUrl}
      success={modalResults.success}
      open={open}
      setClose={handleClose}
      editor={true} />,
    modalRoot)
}



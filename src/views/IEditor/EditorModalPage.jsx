import React from "react";
import useErrorMessage from "../../hook/useErrorMessage";
import useModalResult from "../../hook/useModalResult";
import useEditorModal from "./hook/useEditorModal";
import useModalRootRef from "../../hook/useModalRootRef";
import MessageDialog from "../../components/Modal/MessageDialog";
import { createPortal } from "react-dom";
import useModalData from "./hook/useModalData";

export default function EditorModalPage() {

  const modalRoot = useModalRootRef()

  const {
    modalData,
    modalConfirmData,
    confirm,
    messageDialogReturnValue,
  } = useModalData()

  const errorMessage = useErrorMessage();

  console.log("🚀 ~ file: EditorModalPage.jsx:17 ~ modalData ~ confirm:", confirm)
  console.log("🚀 ~ file: EditorModalPage.jsx:17 ~ modalData ~ modalData:", modalData)
  console.log("🚀 ~ file: EditorModalPage.jsx:17 ~ modalData ~ modalConfirmData:", modalConfirmData)
  console.log("🚀 ~ file: EditorModalPage.jsx:17 ~ modalData ~ messageDialogReturnValue:", messageDialogReturnValue)

  const modalResults = useModalResult({
    message: errorMessage,
    name: '文章',
    data: modalData,
    isEditor: true
  })
  console.log("🚀 ~ file: EditorModalPage.jsx:20 ~ EditorModalPage ~ modalResults:", modalResults)

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
      editor={true}
      confirm={confirm}
      modalCloseReturnValue={modalConfirmData}
    />,
    modalRoot)
}



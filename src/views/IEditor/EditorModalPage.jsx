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
  const message = useErrorMessage();
  const tempSitemapUrl = useSelector(getTempSitemapUrl);
  console.log("🚀 ~ file: index.jsx:35 ~ NewIEditor ~ tempSitemapUrl:", tempSitemapUrl)

  const {
    title,
    content,
    editorID,
    sitemapUrl,
    success
  } = useModalResult({
    message,
    name: '文章',
    data: {
      ...serverEditorForm,
      tempSitemapUrl
    },
    isEditor: true
  })
  const {
    open,
    handleClose
  } = useEditorModal(title)

  return modalRoot && createPortal(
    <MessageDialog
      dialogTitle={title}
      dialogContent={content}
      editorID={editorID}
      sitemapUrl={sitemapUrl}
      success={success}
      open={open}
      setClose={handleClose}
      editor={true} />,
    modalRoot)
}

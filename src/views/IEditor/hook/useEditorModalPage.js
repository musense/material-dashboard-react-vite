import useErrorMessage from "../../../hook/useErrorMessage";
import { useSelector } from "react-redux";
import { getTempSitemapUrl } from "../../../reducers/GetSlateReducer";
import useModalResult from "../../../hook/useModalResult";
import useEditorForm from "./useEditorForm";
import useEditorModal from "./useEditorModal";

export default function useEditorModalPage() {

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

  return {
    modalFn: {
      open,
      handleClose
    },
    modalData: {
      title,
      content,
      editorID,
      sitemapUrl,
      success
    }
  }
}

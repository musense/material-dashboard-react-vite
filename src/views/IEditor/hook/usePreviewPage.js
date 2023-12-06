import { useSelector } from "react-redux";
import usePreview from "../../../hook/usePreview";
import { getIsPreview } from "../../../reducers/GetSlateReducer";
import useEditorSave from "../../../hook/useEditorSave";
import { useEffect } from "react";
import useErrorMessage from "../../../hook/useErrorMessage";
import useEditorForm from "./useEditorForm";

export default function usePreviewPage() {
  const isPreview = useSelector(getIsPreview);
  const message = useErrorMessage();
  const { onPreviewSave } = useEditorSave()
  const { submitForm } = useEditorForm();

  useEffect(() => {
    if (message !== 'check__OK!') return
    if (isPreview) {
      onPreviewSave(submitForm)
      // onEditorSave(editorForm, true)
      return
    }
  }, [message, submitForm, isPreview, onPreviewSave]);

  const previewID = useSelector((state) => state.getSlateReducer.previewID);
  console.log("🚀 ~ file: previewPage.jsx:7 ~ PreviewPage ~ previewID:", previewID)

  usePreview(previewID)
}

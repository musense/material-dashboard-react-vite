import { useEffect } from "react";
import useErrorMessage from "../../../hook/useErrorMessage";
import { useSelector } from "react-redux";
import usePreview from "../../../hook/usePreview";
import useEditorSave from "../../../hook/useEditorSave";
import useIsPreview from "./useIsPreview";
import { getPreviewID } from "../../../reducers/GetSlateReducer";
import { useLocation } from "react-router-dom";
import useSearchParamsPage from "./useSearchParamsPage";
import useSubmitForm from "./useSubmitForm";

export default function usePreviewPage(removeStorageValue = null) {
  const isPreview = useIsPreview()
  const previewID = useSelector(getPreviewID);
  const message = useErrorMessage();
  const { onPreviewSave, onEditorSave, onEditorUpdate } = useEditorSave()
  const submitForm = useSubmitForm();
  const { id, draft } = useSearchParamsPage()
  const location = useLocation()

  usePreview(previewID)

  useEffect(() => {
    if (!isPreview) return
    if (message !== 'check__OK!') return

    console.log("🚀 ~ file: usePreviewPage.js:19 ~ useEffect ~ submitForm:", submitForm)
    onPreviewSave(submitForm)
    removeStorageValue && removeStorageValue()
    if (location.pathname.includes('/admin/editorList/new')) {
      onEditorSave(submitForm, true)
      return
    }
    if (draft) {
      onEditorUpdate(submitForm, id, true)
      return
    }
  }, [message, submitForm, isPreview, onPreviewSave, location, onEditorSave, onEditorUpdate, id, draft, removeStorageValue]);

}

import { useEffect } from "react";
import { useDispatch } from 'react-redux';

export default function usePreview(previewID, isPreview) {
  const mainSiteUrl = import.meta.env.VITE_MAIN_URL
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPreview) return
    if (!previewID) return
    window.open(`${mainSiteUrl}/preview/${previewID}`, '_blank')
    dispatch({ type: "PREVIEW_FINISHED" })
  }, [dispatch, isPreview, previewID, mainSiteUrl]);
}

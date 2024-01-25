import { useSelector } from "react-redux";
import { getCategories, getContentForm, getMedia, getPublishInfo, getTags, getWebHeader } from "../../../reducers/GetSlateReducer";
import { isEqual } from "lodash";
import { useRef, useMemo } from "react"

export default function useSlateForm() {

  const contentFormData = useSelector(getContentForm)
  const webHeaderData = useSelector(getWebHeader)
  const tagsData = useSelector(getTags)
  const categoriesData = useSelector(getCategories)
  const mediaData = useSelector(getMedia)
  const publishInfoData = useSelector(getPublishInfo)

  const contentFormRef = useRef(contentFormData)
  const webHeaderRef = useRef(webHeaderData)
  const tagsRef = useRef(tagsData)
  const categoriesRef = useRef(categoriesData)
  const mediaRef = useRef(mediaData)
  const publishInfoRef = useRef(publishInfoData)

  const contentForm = useMemo(() => {
    if (isEqual(contentFormRef.current, contentFormData)) {
      return contentFormRef.current
    }
    contentFormRef.current = contentFormData
    return contentFormData
  }, [contentFormData])

  const webHeader = useMemo(() => {
    if (isEqual(webHeaderRef.current, webHeaderData)) {
      return webHeaderRef.current
    }
    webHeaderRef.current = webHeaderData
    return webHeaderData
  }, [webHeaderData])

  const tags = useMemo(() => {
    if (isEqual(tagsRef.current, tagsData)) {
      return tagsRef.current
    }
    tagsRef.current = tagsData
    return tagsData
  }, [tagsData])

  const categories = useMemo(() => {
    if (isEqual(categoriesRef.current, categoriesData)) {
      return categoriesRef.current
    }
    categoriesRef.current = categoriesData
    return categoriesData
  }, [categoriesData])

  const media = useMemo(() => {
    if (isEqual(mediaRef.current, mediaData)) {
      return mediaRef.current
    }
    mediaRef.current = mediaData
    return mediaData
  }, [mediaData])

  const publishInfo = useMemo(() => {
    if (isEqual(publishInfoRef.current, publishInfoData)) {
      return publishInfoRef.current
    }
    publishInfoRef.current = publishInfoData
    return publishInfoData
  }, [publishInfoData])

  const slateForm = {
    contentForm,
    detailForm: {
      webHeader,
      tags,
      categories,
      media,
      publishInfo
    }
  }
  console.log("🚀 ~ file: useSlateForm.js:83 ~ slateForm ~ slateForm:", slateForm)

  return slateForm
}

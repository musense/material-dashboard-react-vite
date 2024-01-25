import { useSelector } from "react-redux";
import { getEditorUpdated } from "../../../reducers/GetSlateReducer";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function useEditorUpdated() {

  const location = useLocation()
  const createType = useMemo(() => {
    if (location.pathname.includes('/admin/editorList/new')) return 'add_new'
    if (location.pathname.includes('/admin/editorList/update')) return 'update'

    return ''
  }, [location.pathname])
  const editorUpdated = useSelector(state => getEditorUpdated(state, createType))

  return editorUpdated
}

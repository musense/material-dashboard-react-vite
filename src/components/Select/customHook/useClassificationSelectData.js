import { useMemo } from "react";
import { useSelector } from 'react-redux';
import { getEditorClassList } from "../../../reducers/GetClassReducer";

export default function useClassificationSelectData() {
  const editorClassList = useSelector(getEditorClassList);
  console.log("🚀 ~ file: useClassificationSelectData.jsx:7 ~ useClassificationSelectData ~ editorClassList:", editorClassList)

  const classOptions = useMemo(() => {
    if (!editorClassList) return []
    return editorClassList
      .map(c => ({
        value: c._id,
        label: c.name,
      }))
  }, [editorClassList])

  return classOptions && classOptions
}

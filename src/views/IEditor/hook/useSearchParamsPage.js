import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { getEditor } from "../../../reducers/GetEditorReducer";

export default function useSearchParamsPage() {

  const serverEditorForm = useSelector(getEditor)

  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const draft = searchParams.get('draft') === 'true';
  console.log("🚀 ~ file: index.jsx:29 ~ IEditor ~ draft:", draft)

  useEffect(() => {
    setSearchParams({
      draft: serverEditorForm?.draft || draft
    })
  }, [setSearchParams, draft, serverEditorForm]);

  return {
    id,
    draft
  };
}

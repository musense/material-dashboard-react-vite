import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useEditorForm from "./useEditorForm";

export default function useSearchParamsPage() {

  const serverEditorForm = useEditorForm();

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

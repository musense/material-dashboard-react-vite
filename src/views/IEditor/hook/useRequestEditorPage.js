import useRequestEditorByID from "../../../hook/useRequestEditorByID";
import useEditorForm from "./useEditorForm";

export default function useRequestEditorPage({ id, draft }) {

  const serverEditorForm = useEditorForm();

  useRequestEditorByID(id, draft, serverEditorForm)
}

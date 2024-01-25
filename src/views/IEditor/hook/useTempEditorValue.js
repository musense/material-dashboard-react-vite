import { useLocalStorage, useDebounce } from "react-use";
import useEditorUpdated from "./useEditorUpdated";
import useSlateForm from "./useSlateForm";

export default function useTempEditorValue() {

  const editorUpdated = useEditorUpdated()
  const slateForm = useSlateForm()

  const [storageValue, setStorageValue, removeStorageValue] = useLocalStorage('temp-editor-value');
  const [editorUpdatedState, setEditorUpdatedState, removeEditorUpdatedState] = useLocalStorage('editor-update-state');

  console.log("🚀 ~ file: useTempEditorValue.js:34 ~ slateForm ~ slateForm:", slateForm)

  useDebounce(
    () => {
      console.log("🚀 ~ file: useTempEditorValue.js:40 ~ useTempEditorValue ~ editorUpdated:", editorUpdated)
      setEditorUpdatedState(editorUpdated);
      if (!editorUpdated) {
        removeStorageValue();
        return
      }
      setStorageValue(slateForm);
    },
    2000,
    [slateForm, editorUpdated]
  );

  return {
    storageValue,
    setStorageValue,
    removeStorageValue
  };
}

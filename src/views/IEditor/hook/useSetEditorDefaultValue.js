import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as GetSlateAction from "@actions/GetSlateAction";
import * as GetDialogAction from "@actions/GetDialogAction";
import useEditorForm from "./useEditorForm";

export default function useSetEditorDefaultValue(editor = null) {
  const dispatch = useDispatch();
  const serverEditorForm = useEditorForm()

  useEffect(() => {
    if (!serverEditorForm) return

    // if (editor) {
    //   dispatch({
    //     type: GetDialogAction.ON_EDITOR_STORAGE_VALUE_EXISTED,
    //     payload: {
    //       message: 'temp editor existed',
    //       confirm: true,
    //     }
    //   })
    //   return
    // }

    dispatch({
      type: GetSlateAction.SET_DEFAULT_FORM_VALUE,
      payload: {
        allProps: serverEditorForm
      },
    })
  }, [dispatch, serverEditorForm, editor]);

}

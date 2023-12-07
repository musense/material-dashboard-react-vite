import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as GetSlateAction from "@actions/GetSlateAction";
import useEditorForm from "../views/IEditor/hook/useEditorForm";

export default function useSetEditorDefaultValue() {
  const dispatch = useDispatch();
  const { serverEditorForm } = useEditorForm()

  useEffect(() => {
    if (!serverEditorForm) {
      dispatch({
        type: GetSlateAction.RESET_FORM_VALUE,
      })
      return
    }
    dispatch({
      type: GetSlateAction.SET_DEFAULT_FORM_VALUE,
      payload: {
        allProps: serverEditorForm
      },
    })
  }, [dispatch, serverEditorForm]);

}

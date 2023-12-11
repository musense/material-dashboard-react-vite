import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as GetSlateAction from "@actions/GetSlateAction";
// import * as GetEditorAction from '@actions/GetEditorAction';

export default function useResetEditorState(route) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      // if (route === '/admin/editorList/new') {
      // reset form value
      dispatch({
        type: GetSlateAction.RESET_FORM_VALUE,
      })
      return
      // }
    }
  }, [dispatch, route]);

}

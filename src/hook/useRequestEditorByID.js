import React, { useCallback, useEffect } from "react";
import *  as GetEditorAction from "@actions/GetEditorAction";
import { useDispatch } from 'react-redux';

export default function useRequestEditorByID(id, draft, editor) {
  console.log("🚀 ~ file: useRequestEditorByID.js:6 ~ useRequestEditorByID ~ willBeDraft:", draft)

  const dispatch = useDispatch();

  const requestEditorByID = useCallback((id, draft) => {
    dispatch({
      type: GetEditorAction.REQUEST_EDITOR_BY_ID,
      payload: {
        data: id,
        draft: draft
      },
    });
  }, [dispatch])

  useEffect(() => {
    if (editor) return
    requestEditorByID(id, draft)
  }, [editor, id, draft, requestEditorByID]);
}

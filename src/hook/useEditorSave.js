import React, { useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import * as GetSlateAction from "@actions/GetSlateAction";
import * as GetEditorAction from "@actions/GetEditorAction";

export default function useEditorSave() {
  const dispatch = useDispatch();

  const onEditorSave = useCallback((data, draft = false) => {

    dispatch({
      type: GetEditorAction.ADD_EDITOR,
      payload: {
        data: data,
        draft: draft
      },
    })
  }, [dispatch])

  const onEditorUpdate = useCallback((data, id = null, draft = false) => {
    dispatch({
      type: GetEditorAction.UPDATE_EDITOR,
      payload: {
        id: id,
        data: data,
        draft: draft
      },
    })
  }, [dispatch])

  const onPreviewSave = useCallback((data) => {
    dispatch({
      type: GetSlateAction.PREVIEW_EDITOR,
      payload: {
        data: data
      },
    })
  }, [dispatch])

  return { onEditorSave, onEditorUpdate, onPreviewSave }
}

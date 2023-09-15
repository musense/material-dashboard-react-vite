import React, { useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import * as GetSlateAction from "@actions/GetSlateAction";
import * as GetEditorAction from "@actions/GetEditorAction";

export default function useEditorSave(message, submitState, isPreview, id = null) {
    const dispatch = useDispatch();

    const onEditorSave = useCallback((data, id = null) => {

        dispatch({
            type: GetEditorAction.ADD_EDITOR,
            payload: {
                data: data,
                draft: false
            },
        })
    }, [dispatch])

    const onEditorUpdate = useCallback((data, id = null) => {
        dispatch({
            type: GetEditorAction.UPDATE_EDITOR,
            payload: {
                id: id,
                data: data,
                draft: false
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

    useEffect(() => {
        if (message !== 'check__OK!') return
        if (isPreview) {
            onPreviewSave(submitState)
            return
        }
        if (id) {
            onEditorUpdate(submitState, id)
            return
        }
        onEditorSave(submitState)
    }, [message, submitState, isPreview, id, onPreviewSave, onEditorUpdate, onEditorSave]);

    return { onEditorSave, onEditorUpdate, onPreviewSave }
}

import React, { useCallback, useEffect } from "react";
import *  as GetEditorAction from "@actions/GetEditorAction";
import { useDispatch } from 'react-redux';

export default function useRequestEditorByID(id, editor) {

    const dispatch = useDispatch();

    const requestEditorByID = useCallback((id) => {
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_BY_ID,
            payload: {
                data: id
            },
        });
    }, [dispatch])

    useEffect(() => {
        if (editor) return
        requestEditorByID(id)
    }, [editor, id, requestEditorByID]);
}

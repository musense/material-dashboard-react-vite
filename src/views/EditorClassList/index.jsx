import React, { useEffect } from 'react';
import EditorLeftWrapper from "./EditorLeftWrapper";
import EditorRightWrapper from "./EditorRightWrapper";
import { useDispatch, useSelector } from 'react-redux';
import * as GetClassAction from '../../actions/GetClassAction';
import { reDispatchMessage } from './../../reducers/errorMessage';

const headerMap = {
    headerRow: [
        { name: '分類名稱', patchKey: 'name', type: "string" },
        { name: '英文名稱', patchKey: 'keyName', type: "string" },
        {
            type: "__edit_cell__",
            copyText: "customUrl",
            editType: GetClassAction.EDITING_CLASS
        }
    ],
    patchType: GetClassAction.SHOW_CLASS_LIST_SORTING,
    reducerName: 'getClassReducer',
};

function EditorClassList() {

    const dispatch = useDispatch();
    const returnMessage = useSelector(state => state.getClassReducer.errorMessage);
    useEffect(() => {
        if (reDispatchMessage.includes(returnMessage)) {
            dispatch({ type: GetClassAction.REQUEST_CLASS_LIST })
        }
    }, [returnMessage]);

    useEffect(() => {
        // dispatch({ type: GetClassAction.REQUEST_PARENT_CLASS })
        dispatch({ type: GetClassAction.REQUEST_CLASS_LIST })
    }, []);

    return (
        <div className={'manager-container'}>
            <EditorRightWrapper headerMap={headerMap} />
            <EditorLeftWrapper />
        </div >

    );
}

export default EditorClassList;






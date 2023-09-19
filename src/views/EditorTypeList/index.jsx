import React, { useEffect } from 'react';
import Card from '@components/Card/Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import EditorTabs from "./EditorTabs.jsx";
import EditorTypeBody from "./EditorTypeBody.jsx";
import * as GetEditorAction from "../../actions/GetEditorAction";
import { reDispatchMessage } from './../../reducers/errorMessage';
import { getEditorErrorMessage } from '@reducers/GetEditorReducer';
import useQuery from '../../hook/useQuery.js';

function EditorTypeList() {

    // useEffect(() => {
    //     if (reDispatchMessage.includes(serverMessage)) {
    //         dispatch({ type: GetEditorAction.REQUEST_EDITOR })
    //     }
    // }, [serverMessage]);

    // useEffect(() => {
    //     dispatch({ type: GetEditorAction.REQUEST_EDITOR });
    // }, [])

    return (
        <div className={'container'}>
            <EditorTabs />
        </div>
    );
}


export default EditorTypeList;
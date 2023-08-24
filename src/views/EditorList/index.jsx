import React, { useEffect } from 'react';
import Card from '@components/Card/Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import EditorListHeader from "./EditorListHeader";
import EditorListBody from "./EditorListBody";
import * as GetEditorAction from "../../actions/GetEditorAction";
import { reDispatchMessage } from './../../reducers/errorMessage';
import { getEditorErrorMessage } from '@reducers/GetEditorReducer';

function EditorList() {

  const dispatch = useDispatch();
  const serverMessage = useSelector(getEditorErrorMessage);

  useEffect(() => {
    if (reDispatchMessage.includes(serverMessage)) {
      dispatch({ type: GetEditorAction.REQUEST_EDITOR })
    }
  }, [serverMessage]);

  useEffect(() => {
    dispatch({ type: GetEditorAction.REQUEST_EDITOR });
  }, [])

  return (
    <div className={'container'}>
      <Card>
        <EditorListHeader />
        <EditorListBody />
      </Card>
      <Outlet />
    </div>
  );
}


export default EditorList;







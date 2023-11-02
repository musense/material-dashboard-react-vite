import React, { useEffect } from 'react';
import Card from '@components/Card/Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import EditorListHeader from "./EditorListHeader";
import EditorListBody from "./EditorListBody";
import * as GetEditorAction from "../../actions/GetEditorAction";
import { reDispatchMessage } from './../../reducers/errorMessage';
import { getEditorErrorMessage } from '@reducers/GetEditorReducer';

const disableRoute = import.meta.env.VITE_DISABLE_ROUTE_NAME
// disableRoute !== '文章分類管理' && { name: "分類", patchKey: "categories.name", className: "flex-2", type: "string" },
const headerMap = {
  headerRow: [
    { name: "序號", patchKey: "serialNumber", type: "number" },
    {
      name: "圖片/影片",
      src: "media.homeImagePath",
      checkKey: "media.contentImagePath",
      alt: "media.altText",
      type: "image",
      className: "flex-2 image-container"
    },
    { name: "標題", patchKey: "content.title", className: "flex-3 left-wrap", type: "stringl5lines" },
    { name: "瀏覽數", patchKey: "pageView", type: "number" },
    {
      name: "狀態",
      patchKey: "status",
      checkKey: ["isPublished", "isScheduled"],
      showKeys: ["publishDate", "scheduleTime"],
      className: "flex-2",
      type: "stringdp"
    },
    { name: "更新日期", patchKey: "updateDate", className: "flex-2", type: "date" },
    {
      type: "__edit_cell__",
      copyText: "webHeader.customUrl",
      deleteText: "content.title",
      editData: "_id",
      editType: GetEditorAction.REQUEST_EDITOR_BY_ID,
      className: "flex-2"
    }
  ],
  patchType: GetEditorAction.SHOW_EDITOR_LIST_SORTING,
  reducerName: 'getEditorReducer'
}


function EditorList() {

  const dispatch = useDispatch();
  const serverMessage = useSelector(getEditorErrorMessage);

  useEffect(() => {
    if (reDispatchMessage.includes(serverMessage)) {
      dispatch({ type: GetEditorAction.REQUEST_EDITOR })
    }
  }, [dispatch, serverMessage]);

  useEffect(() => {
    dispatch({ type: GetEditorAction.REQUEST_EDITOR });
  }, [dispatch])

  useEffect(() => {
    if (disableRoute !== '文章分類管理') {
      const classificationColumn = { name: "分類", patchKey: "categories.name", className: "flex-2", type: "string" }
      headerMap.headerRowCount.splice(1, 0, classificationColumn)
    }
  }, []);


  return (
    <div className={'container'}>
      <Card>
        <EditorListHeader />
        <EditorListBody headerMap={headerMap} />
      </Card>
      <Outlet />
    </div>
  );
}


export default EditorList;







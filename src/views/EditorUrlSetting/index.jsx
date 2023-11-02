import React, { useEffect } from 'react'
import Card from '@components/Card/Card.jsx'
import EditorUrlHeader from './EditorUrlHeader'
import EditorUrlBody from './EditorUrlBody'
import * as GetEditorUrlAction from '../../actions/GetEditorUrlAction';
import { useDispatch } from 'react-redux';


const headerMap = {
  headerRow: [
    { checkKey: '_id', type: '__checkbox__', className: 'flex-1' },
    { name: '網址', patchKey: 'url', type: 'stringl', className: 'flex-3' },
    { name: '創建時間', patchKey: 'createdAt', type: 'date', className: 'flex-2' },
    { name: '更新時間', patchKey: 'updatedAt', type: 'date', className: 'flex-2' },
    { name: '網域測試', patchKey: 'pingStatus', type: 'stringicon', className: 'flex-2' },
    { name: 'https測試', patchKey: 'axiosStatus', type: 'stringicon', className: 'flex-2' },
    { name: '上次測試日期', patchKey: 'checkStatusUpdatedAt', type: 'date', className: 'flex-2' },
    {
      type: "__edit_cell__",
      deleteButton: false,
      copyText: "url",
      editType: GetEditorUrlAction.EDITING_URL,
      className: "flex-1"
    }
  ],
  patchType: GetEditorUrlAction.SHOW_EDITOR_URL_LIST_SORTING,
  reducerName: 'getEditorUrlReducer',
}

const EditorUrlSetting = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GetEditorUrlAction.CHECK_EDITOR_URL_ALL });
  }, [dispatch])

  return (
    <div className={'container'}>
      <Card>
        <EditorUrlHeader />
        <EditorUrlBody headerMap={headerMap} />
      </Card>
    </div>
  )
}

export default EditorUrlSetting

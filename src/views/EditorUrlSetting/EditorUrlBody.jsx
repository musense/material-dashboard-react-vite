import React, { useCallback, useEffect, useState } from 'react'
import CardBody from '@components/Card/CardBody.jsx'
import RowHeader from '../../components/RowHeader/RowHeader.jsx'
import RowBody from '../../components/RowBody/RowBody'
import MessageDialog from '@components/Modal/MessageDialog.jsx'
import useModal from '../../hook/useModal'
import { useDispatch, useSelector } from 'react-redux'
import getErrorMessage from '../../utils/getErrorMessage'
import useModalResult from '../../hook/useModalResult'
import EditorUrlSearchForm from './EditorUrlSearchForm';
import EditorUrlListButtonList from './EditorUrlListButtonList';
import EditorUrlSubstitution from './EditorUrlSubstitution';
import {
  getEditorUrlList,
  getTotalPage,
  getCurrentPage,
  getTotalCount,
  getEditorUrlShowList,
  getEditorUrlErrorMessage,
  getSelectedPatchKey
} from '@reducers/GetEditorUrlReducer'
import { Button } from '@mui/material'
import * as GetEditorUrlAction from '../../actions/GetEditorUrlAction'
import { buttonProps } from '../EditorList/EditorListButtonList'
import { getSelectedUrlId } from '../../reducers/GetEditorUrlReducer.js'

const InnerEditorUrlSearchForm = React.memo(EditorUrlSearchForm);
const InnerEditorUrlListButtonList = React.memo(EditorUrlListButtonList);

const EditorUrlBody = ({ headerMap }) => {

  const dispatch = useDispatch()

  const showList = useSelector(getEditorUrlList);
  console.log("🚀 ~ file: EditorUrlBody.jsx:32 ~ EditorUrlBody ~ showList:", showList)

  const selectedId = useSelector(getSelectedUrlId);
  const contentData = useSelector((state) => state.getDialogReducer.contentData);
  const data = useSelector((state) => state.getDialogReducer.data);
  const confirm = useSelector((state) => state.getDialogReducer.confirm);
  const messageDialogReturnValue = useSelector((state) => state.getDialogReducer.messageDialogReturnValue);
  const dialogMessage = useSelector((state) => state.getDialogReducer.message);

  const currentPage = useSelector(getCurrentPage);
  const totalPage = useSelector(getTotalPage);
  const totalCount = useSelector(getTotalCount);
  const selectedPatchKey = useSelector(getSelectedPatchKey);
  const serverMessage = useSelector(getEditorUrlErrorMessage);
  console.log("🚀 ------------------------------------------------------------------------------🚀")
  console.log("🚀 ~ file: EditorUrlBody.jsx:42 ~ EditorUrlBody ~ serverMessage:", serverMessage)
  console.log("🚀 ------------------------------------------------------------------------------🚀")

  const [checkUrlList, setCheckUrlList] = useState([]);
  console.log("🚀 ----------------------------------------------------------------------------🚀")
  console.log("🚀 ~ file: EditorUrlBody.jsx:52 ~ EditorUrlBody ~ checkUrlList:", checkUrlList)
  console.log("🚀 ----------------------------------------------------------------------------🚀")
  useEffect(() => {

  }, [serverMessage]);

  // let checkBoxList

  useEffect(() => {

    const selectAllCheckbox = document.querySelector('#select-all')
    console.log("🚀 ----------------------------------------------------------------------------------🚀")
    console.log("🚀 ~ file: EditorUrlBody.jsx:60 ~ useEffect ~ selectAllCheckbox:", selectAllCheckbox)
    console.log("🚀 ----------------------------------------------------------------------------------🚀")

    selectAllCheckbox.addEventListener('change', e => {
      const checkBoxList = document.querySelectorAll('input[id^=checkbox_]')
      console.log("🚀 ------------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: EditorUrlBody.jsx:60 ~ useEffect ~ checkBoxList:", checkBoxList)
      console.log("🚀 ~ file: EditorUrlBody.jsx:60 ~ useEffect ~ checkBoxList.length:", checkBoxList.length)
      console.log("🚀 ------------------------------------------------------------------------🚀")
      const checked = e.target.checked;
      if (checked) {
        setCheckUrlList([
          ...showList.map(item => item._id)
        ])
      } else {
        setCheckUrlList([])
      }
      for (let i = 0; i < checkBoxList.length; i++) {
        checkBoxList[i].checked = e.target.checked
      }
    })

    if (serverMessage === 'check successfully') {
      setCheckUrlList([])

      selectAllCheckbox.checked = false
      const checkBoxList = document.querySelectorAll('input[id^=checkbox_]')
      for (let i = 0; i < checkBoxList.length; i++) {
        checkBoxList[i].checked = false
      }
    }

  }, [serverMessage]);

  const message = getErrorMessage(dialogMessage, serverMessage)
  const { title, content, success } = useModalResult({
    message,
    name: '網址設定',
    data: contentData,
  })

  const {
    open: openDialog,
    handleOpen,
    handleClose: handleCloseDialog
  } = useModal(title)

  const checkUrlValidity = useCallback(() => {
    if (checkUrlList.length === 0) {
      dispatch({
        type: GetEditorUrlAction.SET_ERROR_MESSAGE,
        payload: {
          message: 'please select at least one url'
        }
      })
      return
    }
    dispatch({
      type: GetEditorUrlAction.CHECK_EDITOR_URL,
      payload: checkUrlList
    })
  }, [dispatch, checkUrlList])

  return (
    <CardBody>
      <InnerEditorUrlSearchForm />
      {/* <InnerEditorUrlListButtonList
        currentPage={currentPage}
        totalPage={totalPage}
        totalCount={totalCount}
        createButton={false}
      /> */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '16px' }}>
        <EditorUrlSubstitution />
        <Button
          {...buttonProps}
          sx={{ ml: 'auto' }}
          onClick={checkUrlValidity}>測試</Button>
      </div>
      <form className='view-list-form'>
        <RowHeader
          headerConfig={headerMap}
          selectedPatchKey={selectedPatchKey}
        />
        <RowBody
          headerConfig={headerMap}
          showList={showList}
          handleOpenDialog={handleOpen}
          setStatus={setCheckUrlList}
          height={'530px'}
          selectedId={selectedId}
          selectedIdArray={checkUrlList}
        />
      </form>
      <MessageDialog
        dialogTitle={title}
        dialogContent={content}
        success={success}
        open={openDialog}
        setClose={handleCloseDialog}
        confirm={confirm}
        data={data}
      />
    </CardBody>
  )
}

export default EditorUrlBody




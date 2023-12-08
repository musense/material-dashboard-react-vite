
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CardBody from '@components/Card/CardBody.jsx';
import { useSelector } from 'react-redux';
import MediaModal from '../../components/Modal/MediaModal';
import * as GetEditorAction from '../../actions/GetEditorAction';
import EditorSearchForm from './EditorSearchForm';
import EditorListButtonList from './EditorListButtonList';
import RowHeader from '../../components/RowHeader/RowHeader';
import RowBody from '../../components/RowBody/RowBody';
// import RowBody from './RowBody';
import MessageDialog from '../../components/Modal/MessageDialog';
import useModalResult from '../../hook/useModalResult';
import useModal from '../../hook/useModal';
import useDeleteSelectedRow from '@hook/useDeleteSelectedRow';
import getErrorMessage from '@utils/getErrorMessage';
import { useNavigate } from 'react-router-dom';

import {
  getEditor,
  getTotalPage,
  getCurrentPage,
  getTotalCount,
  getEditorShowList,
  getEditorErrorMessage,
  getSelectedPatchKey
} from '@reducers/GetEditorReducer'
import { getDialogConfirm, getDialogContentData, getDialogData, getDialogMessage, getDialogMessageDialogReturnValue } from '../../reducers/GetDialogReducer';

const InnerEditorListButtonList = React.memo(EditorListButtonList);
const InnerEditorSearchForm = React.memo(EditorSearchForm);

const InnerRowHeader = React.memo(RowHeader);
// const InnerRowBody = React.memo(RowBody);
export default function EditorListBody({ headerMap }) {
  const navigate = useNavigate();
  const editor = useSelector(getEditor)
  console.log("🚀 ~ file: EditorListBody.jsx:32 ~ EditorListBody ~ editor:", editor)
  const showList = useSelector(getEditorShowList);
  const currentPage = useSelector(getCurrentPage);
  const totalPage = useSelector(getTotalPage);
  const totalCount = useSelector(getTotalCount);
  const selectedPatchKey = useSelector(getSelectedPatchKey);
  const serverMessage = useSelector(getEditorErrorMessage);

  console.log("🚀 ~ file: EditorListBody.jsx:34 ~ EditorListBody ~ showList:", showList)

  const contentData = useSelector(getDialogContentData);
  const modalConfirmData = useSelector(getDialogData);
  const confirm = useSelector(getDialogConfirm);
  const messageDialogReturnValue = useSelector(getDialogMessageDialogReturnValue);
  const dialogMessage = useSelector(getDialogMessage);
  console.log("🚀 ~ file: EditorListBody.jsx:54 ~ EditorListBody ~ modalConfirmData:", modalConfirmData)
  console.log("🚀 ~ file: EditorListBody.jsx:54 ~ EditorListBody ~ messageDialogReturnValue:", messageDialogReturnValue)

  const errorMessage = getErrorMessage(dialogMessage, serverMessage)
  console.log("🚀 ~ file: EditorListBody.jsx:45 ~ EditorListBody ~ errorMessage:", errorMessage)

  const navigateCheckArray = useMemo(() => {
    return ['User is verified', 'get successfully']
  }, [])
  useEffect(() => {
    if (errorMessage === navigateCheckArray[0]) navigateCheckArray.shift()
  }, [navigateCheckArray, errorMessage]);
  useEffect(() => {
    if (navigateCheckArray.length === 0) {
      editor?._id && navigate(`/admin/editorList/update/${editor?._id}`)
    }
  }, [navigateCheckArray, errorMessage, navigate, editor]);

  useDeleteSelectedRow(messageDialogReturnValue, {
    deleteType: GetEditorAction.BUNCH_DELETE_EDITOR,
  });

  const {
    title,
    content,
    success
  } = useModalResult({
    message: errorMessage,
    name: '文章',
    data: contentData,
  })

  console.log("🚀 ~ file: EditorListBody.jsx:77 ~ EditorListBody ~ title:", title)
  const {
    open,
    handleOpen,
    handleClose
  } = useModal()

  const {
    open: openDialog,
    handleClose: handleCloseDialog
  } = useModal(title)


  const [mediaInfo, setMediaInfo] = useState(null);

  const onPreviewMedia = useCallback((e, item) => {
    e.stopPropagation();
    handleOpen();
    setMediaInfo(item);
  }, [handleOpen, setMediaInfo])

  return <CardBody>
    <InnerEditorSearchForm />
    <InnerEditorListButtonList
      currentPage={currentPage}
      totalPage={totalPage}
      totalCount={totalCount}
    />
    <form className='view-list-form'>
      <InnerRowHeader
        headerConfig={headerMap}
        selectedPatchKey={selectedPatchKey} />
      <RowBody
        headerConfig={headerMap}
        showList={showList}
        handleOpenDialog={handleOpen}
        setMediaInfo={onPreviewMedia}
      />
    </form>
    <MediaModal
      open={open}
      handleClose={handleClose}
      mediaInfo={mediaInfo}
    />
    <MessageDialog
      dialogTitle={title}
      dialogContent={content}
      success={success}
      open={openDialog}
      setClose={handleCloseDialog}
      confirm={confirm}
      data={modalConfirmData}
    />
  </CardBody>;
}


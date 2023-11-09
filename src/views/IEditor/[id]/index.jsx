import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ContentEditorForm from "./../ContentEditorForm.jsx"
import DetailForm from "../DetailForm/DetailForm.jsx"
import MessageDialog from '../../../components/Modal/MessageDialog.jsx';

import useModalResult from '@hook/useModalResult';
import useSetEditorDefaultValue from '../../../hook/useSetEditorDefaultValue.js';
import usePreview from '../../../hook/usePreview.js';
import useEditorModal from '../../../hook/useEditorModal.js';
import useEditorSave from '../../../hook/useEditorSave.js';
import useRequestEditorByID from '../../../hook/useRequestEditorByID.js';
import useBeforeUnloadSave from '../../../hook/useBeforeUnloadSave.js';
import { useLoaderData } from 'react-router-dom';
import getErrorMessage from '@utils/getErrorMessage.js';
import { getEditor } from '@reducers/GetEditorReducer'
import { getSubmitState } from '../../../reducers/GetSlateReducer.js';

function IEditor() {

  // const data = useLoaderData()
  const { id } = useParams();
  const editor = useSelector(getEditor);

  const submitState = useSelector(getSubmitState);
  const isPreview = useSelector((state) => state.getSlateReducer.isPreview);
  const returnMessage = useSelector((state) => state.getSlateReducer.errorMessage);
  const errorMessage = useSelector((state) => state.getEditorReducer.errorMessage);
  const previewID = useSelector((state) => state.getSlateReducer.previewID);
  const message = getErrorMessage(errorMessage, returnMessage)


  console.log("🚀 ~ file: index.jsx:26 ~ IEditor ~ submitState:", submitState)

  const {
    title,
    content,
    // id,
    sitemapUrl,
    success
  } = useModalResult({
    message,
    name: '文章',
    data: editor,
    isEditor: true
  })
  useRequestEditorByID(id, editor)
  useSetEditorDefaultValue(editor)


  usePreview(previewID, isPreview)
  const {
    onEditorUpdate,
    onPreviewSave
  } = useEditorSave()

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
  }, [message, submitState, isPreview, id]);
  // useBeforeUnloadSave(onEditorSave)

  const {
    open,
    handleClose
  } = useEditorModal(title)

  return (
    <div className={'container'}>
      <div className={'wrapper'}>
        <div className={'left-side'}>
          <ContentEditorForm />
        </div>
        <div className={'right-side'}>
          <DetailForm
            createType={'update'} />
        </div>
      </div>
      <MessageDialog
        dialogTitle={title}
        dialogContent={content}
        editorID={id}
        sitemapUrl={sitemapUrl}
        success={success}
        open={open}
        setClose={handleClose}
        editor={true}
      />
    </div>
  );
}

export default IEditor;


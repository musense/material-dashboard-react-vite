import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ContentEditorForm from "./ContentEditorForm.jsx"
import DetailForm from "./DetailForm/DetailForm.jsx"
import MessageDialog from '@components/Modal/MessageDialog.jsx';

import useModalResult from '@hook/useModalResult';
import useSetEditorDefaultValue from '@hook/useSetEditorDefaultValue.js';
import usePreview from '@hook/usePreview.js';
import useEditorModal from '@hook/useEditorModal.js';
import useEditorSave from '@hook/useEditorSave.js';
import useUnloadSave from '@hook/useUnloadSave.js';
import getErrorMessage from '@utils/getErrorMessage.js';
import { getEditorForm, getTempSitemapUrl, getEditorUpdated } from '../../reducers/GetSlateReducer.js';

function NewIEditor() {

  useSetEditorDefaultValue()

  const editor = useSelector((state) => state.getEditorReducer.editor);

  const submitState = useSelector(getEditorForm);
  console.log("🚀 ~ file: index.jsx:23 ~ NewIEditor ~ submitState:", submitState)

  const isPreview = useSelector((state) => state.getSlateReducer.isPreview);
  const returnMessage = useSelector((state) => state.getSlateReducer.errorMessage);
  const errorMessage = useSelector((state) => state.getEditorReducer.errorMessage);
  const previewID = useSelector((state) => state.getSlateReducer.previewID);
  const message = getErrorMessage(errorMessage, returnMessage)
  const editorUpdated = useSelector(state => getEditorUpdated(state, 'add_new'))
  const tempSitemapUrl = useSelector(getTempSitemapUrl);

  const [modalData, setModalData] = useState(null);
  useEffect(() => {
    if (!editor) return

    setModalData({
      ...editor,
      tempSitemapUrl
    })
  }, [editor, tempSitemapUrl]);

  const {
    title,
    content,
    editorID,
    sitemapUrl,
    success
  } = useModalResult({
    message,
    name: '文章',
    data: modalData,
    isEditor: true
  })

  const {
    open,
    handleClose
  } = useEditorModal(title)
  console.log("🚀 ~ file: index.jsx:23 ~ NewIEditor ~ submitState:", submitState)
  usePreview(previewID, isPreview)
  // useEditorSave(message, submitState, isPreview)
  const {
    onEditorSave,
    onPreviewSave
  } = useEditorSave()

  useUnloadSave({
    onEditorSave,
    submitState,
    draft: true,
    editorUpdated
  })

  useEffect(() => {
    if (message !== 'check__OK!') return
    if (isPreview) {
      onPreviewSave(submitState)
      return
    }
    onEditorSave(submitState)
  }, [message, submitState, isPreview, onEditorSave, onPreviewSave]);
  // useUnloadSave(onEditorSave)

  return (
    <div className={'container'}>
      <div className={'wrapper'}>
        <div className={'left-side'}>
          <ContentEditorForm />
        </div>
        <div className={'right-side'}>
          <DetailForm
            createType={'add_new'} />
        </div>
      </div>
      <MessageDialog
        dialogTitle={title}
        dialogContent={content}
        editorID={editorID}
        sitemapUrl={sitemapUrl}
        success={success}
        open={open}
        setClose={handleClose}
        editor={true}
      />
    </div>
  );
}

export default NewIEditor;


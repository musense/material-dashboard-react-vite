import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ContentEditorForm from "./../ContentEditorForm.jsx"
import DetailForm from "../DetailForm/DetailForm.jsx"
import MessageDialog from '../../../components/Modal/MessageDialog.jsx';

import useModalResult from '../../../hook/useModalResult';
import useSetEditorDefaultValue from '../../../hook/useSetEditorDefaultValue.js';
import usePreview from '../../../hook/usePreview.js';
import useEditorModal from '../../../hook/useEditorModal.js';
import useEditorSave from '../../../hook/useEditorSave.js';
import useRequestEditorByID from '../../../hook/useRequestEditorByID.js';
import useUnloadSave from '../../../hook/useUnloadSave.js';
import { useLoaderData } from 'react-router-dom';
import getErrorMessage from '@utils/getErrorMessage.js';
import { getEditor } from '@reducers/GetEditorReducer'
import { getEditorForm, getTempSitemapUrl, getEditorUpdated } from '../../../reducers/GetSlateReducer.js';

function IEditor() {

  // const data = useLoaderData()
  const { id } = useParams();
  const editor = useSelector(getEditor);
  console.log("🚀 ~ file: index.jsx:25 ~ IEditor ~ editor:", editor)

  const [searchParams, setSearchParams] = useSearchParams();
  const draft = searchParams.get('draft') === 'true';
  console.log("🚀 ~ file: index.jsx:29 ~ IEditor ~ draft:", draft)

  useEffect(() => {
    setSearchParams({
      draft: editor?.draft || draft
    })
  }, [setSearchParams, draft, editor]);

  const submitState = useSelector(getEditorForm);
  const isPreview = useSelector((state) => state.getSlateReducer.isPreview);
  const returnMessage = useSelector((state) => state.getSlateReducer.errorMessage);
  const errorMessage = useSelector((state) => state.getEditorReducer.errorMessage);
  const previewID = useSelector((state) => state.getSlateReducer.previewID);
  const message = getErrorMessage(errorMessage, returnMessage)

  const editorUpdated = useSelector(state => getEditorUpdated(state, 'update'))
  const tempSitemapUrl = useSelector(getTempSitemapUrl);

  const [modalData, setModalData] = useState(null);
  useEffect(() => {
    if (!editor) return

    setModalData({
      ...editor,
      tempSitemapUrl
    })
  }, [editor, tempSitemapUrl]);

  console.log("🚀 ~ file: index.jsx:45 ~ IEditor ~ editorUpdated:", editorUpdated)

  console.log("🚀 ~ file: index.jsx:26 ~ IEditor ~ submitState:", submitState)

  const {
    title,
    content,
    editorID,
    editorDraft,
    sitemapUrl,
    success
  } = useModalResult({
    message,
    name: '文章',
    data: modalData,
    isEditor: true
  })
  useRequestEditorByID(id, draft, editor)
  useSetEditorDefaultValue(editor)

  console.log("🚀 ----------------------------------------------------------🚀")
  console.log("🚀 ~ file: index.jsx:52 ~ IEditor ~ sitemapUrl:", sitemapUrl)
  console.log("🚀 ----------------------------------------------------------🚀")
  usePreview(previewID, isPreview)
  const {
    onEditorSave,
    onEditorUpdate,
    onPreviewSave
  } = useEditorSave()

  useUnloadSave({
    onEditorSave,
    submitState,
    draft,
    editorUpdated
  })

  useEffect(() => {
    if (message !== 'check__OK!') return
    if (isPreview) {
      onPreviewSave(submitState)
      return
    }
    if (draft === true) {
      onEditorSave(submitState, false, editor?.serialNumber)
      return
    }

    // if (id) {
    //   onEditorUpdate(submitState, id)
    //   return
    // }
  }, [message, isPreview, submitState, id, onPreviewSave, onEditorUpdate, draft, onEditorSave, editor]);

  useEffect(() => {
    if (message !== 'check__OK!') return
    console.log("🚀 ~ file: index.jsx:107 ~ useEffect ~ submitState:", submitState)
    console.log("🚀 ~ file: index.jsx:107 ~ useEffect ~ id:", id)
    if (id) {
      onEditorUpdate(submitState, id)
      return
    }
  }, [id, message, onEditorUpdate, submitState]);
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
            createType={draft === true ? 'add_new' : 'update'} />
        </div>
      </div>
      <MessageDialog
        dialogTitle={title}
        dialogContent={content}
        editorID={editorID}
        editorDraft={editorDraft}
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


import React, { } from 'react';
import ContentEditorForm from "./ContentEditorForm.jsx"
import DetailForm from "./DetailForm/DetailForm.jsx"
import MessageDialog from '@components/Modal/MessageDialog.jsx';
import useSetEditorDefaultValue from '@hook/useSetEditorDefaultValue.js';
import useUnloadSave from './hook/useUnloadSave.js';
import usePreviewPage from './hook/usePreviewPage';
import useSavePage from './hook/useSavePage';
import useEditorModalPage from './hook/useEditorModalPage.js';

function NewIEditor() {

  useSetEditorDefaultValue()
  usePreviewPage()
  useSavePage()
  useUnloadSave('add_new')
  const {
    modalFn: {
      open,
      handleClose
    },
    modalData: {
      title,
      content,
      editorID,
      sitemapUrl,
      success
    }
  } = useEditorModalPage()

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


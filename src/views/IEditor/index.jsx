import React from 'react';
import useSetEditorDefaultValue from '@hook/useSetEditorDefaultValue.js';
import useUnloadSave from './hook/useUnloadSave.js';
import usePreviewPage from './hook/usePreviewPage';
import useSavePage from './hook/useSavePage';
import EditorPage from './EditorPage.jsx';

function NewIEditor() {

  useSetEditorDefaultValue()
  usePreviewPage()
  useSavePage()
  useUnloadSave({ createType: 'add_new' })

  return <EditorPage createType={'add_new'} />
}

export default NewIEditor;




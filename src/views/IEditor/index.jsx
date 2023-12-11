import React from 'react';
import useSetEditorDefaultValue from './hook/useSetEditorDefaultValue';
import usePreviewPage from './hook/usePreviewPage';
import useSavePage from './hook/useSavePage';
import useUnloadSaveDraftPage from './hook/useUnloadSaveDraftPage';
import EditorPage from './EditorPage';

function NewIEditor() {

  useSetEditorDefaultValue()
  usePreviewPage()
  useSavePage()
  useUnloadSaveDraftPage({ createType: 'add_new' })


  return <EditorPage createType={'add_new'} />
}

export default NewIEditor;




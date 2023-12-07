import React from 'react';
import useSetEditorDefaultValue from './hook/useSetEditorDefaultValue';
import usePreviewPage from './hook/usePreviewPage';
import useSavePage from './hook/useSavePage';
import useUnloadSave from './hook/useUnloadSave';
import EditorPage from './EditorPage';

function NewIEditor() {

  useSetEditorDefaultValue()
  usePreviewPage()
  useSavePage()
  useUnloadSave({ createType: 'add_new' })

  return <EditorPage createType={'add_new'} />
}

export default NewIEditor;




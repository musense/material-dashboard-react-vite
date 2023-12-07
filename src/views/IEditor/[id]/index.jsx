import React from 'react';
import useSearchParamsPage from '../hook/useSearchParamsPage';
import useRequestEditorPage from '../hook/useRequestEditorPage';
import useSetEditorDefaultValue from '../hook/useSetEditorDefaultValue';
import usePreviewPage from '../hook/usePreviewPage';
import useUpdatePage from '../hook/useUpdatePage';
import useUnloadSave from '../hook/useUnloadSave';
import EditorPage from '../EditorPage';

function IEditor() {

  const {
    id,
    draft
  } = useSearchParamsPage()

  useRequestEditorPage({ id, draft })
  useSetEditorDefaultValue()
  usePreviewPage()
  useUpdatePage({ id, draft })
  useUnloadSave({ createType: 'update', draft })

  return <EditorPage createType={draft === true ? 'add_new' : 'update'} />
}

export default IEditor;


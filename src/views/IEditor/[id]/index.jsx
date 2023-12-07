import React from 'react';
import useSetEditorDefaultValue from '../../../hook/useSetEditorDefaultValue.js';
import useUnloadSave from '../hook/useUnloadSave.js';
import usePreviewPage from '../hook/usePreviewPage.js';
import useSavePage from '../hook/useSavePage.js';
import useSearchParamsPage from '../hook/useSearchParamsPage.js';
import EditorPage from '../EditorPage.jsx';
import useUpdatePage from '../hook/useUpdatePage.js';
import useRequestEditorPage from '../hook/useRequestEditorPage.js';

function IEditor() {

  const {
    id,
    draft
  } = useSearchParamsPage()

  useRequestEditorPage({ id, draft })
  useSetEditorDefaultValue()
  usePreviewPage()
  useSavePage({ draft })
  useUpdatePage({ id })
  useUnloadSave({ createType: 'update' })

  return <EditorPage createType={draft === true ? 'add_new' : 'update'} />
}

export default IEditor;


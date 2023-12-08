import React from "react";
import ContentEditorForm from "./ContentForm/ContentEditorForm.jsx"
import DetailForm from "./DetailForm/DetailForm.jsx"
import EditorModalPage from './EditorModalPage.jsx';

export default function EditorPage({ createType }) {
  return <div className={'container'}>
    <EditorModalPage />
    <div className={'wrapper'}>
      <div className={'left-side'}>
        <ContentEditorForm />
      </div>
      <div className={'right-side'}>
        <DetailForm createType={createType} />
      </div>
    </div>
  </div>;
}

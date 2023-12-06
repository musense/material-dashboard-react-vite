import React, { useEffect } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor'
import MyUploadAdapter from './MyUploadAdapter'
import MyScrollbar from '@components/MyScrollbar/MyScrollbar';
import { css } from '@emotion/css'
import MuEditorConfig from './MuEditorConfig.js'

export default function MuEditor({ value, setValue }) {

  //! 個人使用，若要商業用途，請購買商業許可版本以移除logo
  useEffect(() => {
    const removeCKBodyWrapper = () => {
      const ckPoweredByBalloon = document.querySelector('.ck-powered-by-balloon');
      if (ckPoweredByBalloon === null) return false
      if (ckPoweredByBalloon) {
        ckPoweredByBalloon.remove();
        return true
      }
    }
    const interval = setInterval(() => {
      const removeSuccess = removeCKBodyWrapper()
      if (removeSuccess) clearInterval(interval)
    }, 1)
  }, []);

  return (
    <div className={css` 
    position: inherit;
    background: rgb(255, 255, 255);
    max-width: 100%;
    height: calc(100% - 82px);
    overflow: hidden;
    `}>
      <MyScrollbar height={'calc(100% )'} >
        {/* <div id="editor" /> */}
        <CKEditor
          editor={CustomEditor}
          config={MuEditorConfig}
          data={value}
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            editor.model.document.on('click', (e, data) => {
              if (data.domEvent.target.tagName === 'A') {
                data.domEvent.target.setAttribute('target', '_blank');
              }
            })
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
              return new MyUploadAdapter(loader);
            };
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setValue(data)
          }}
          onBlur={(event, editor) => {
            const data = editor.getData();
            // console.log('Blur.', { editor, data });
            // setValue(data)
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </MyScrollbar>
    </div>
  )
}

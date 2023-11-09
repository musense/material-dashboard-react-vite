import React, { useEffect } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import MyUploadAdapter from './MyUploadAdapter'
import MyScrollbar from '@components/MyScrollbar/MyScrollbar';
import { css } from '@emotion/css'

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
        <CKEditor
          editor={Editor}
          config={{
            removePlugins: ['Style'],
            ui: {
              viewportOffset: {
                right: 0,
              }
            }
          }}
          data={value}
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
              return new MyUploadAdapter(loader);
            };
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
          }}
          onBlur={(event, editor) => {
            const data = editor.getData();
            console.log('Blur.', { editor, data });
            setValue(data)
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </MyScrollbar>
    </div>
  )
}

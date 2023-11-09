import React, { useCallback } from "react";
// import SlateEditor from '../../components/SlateEditor/SlateEditor';
import { useDispatch, useSelector } from "react-redux";
import * as GetSlateAction from '@actions/GetSlateAction';
import MuEditor from "../../components/MuEditor/MuEditor";

const ContentEditorForm = () => {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.getSlateReducer.contentForm?.title);
  const htmlContent = useSelector((state) => state.getSlateReducer.contentForm?.htmlContent)

  // const ckBodyWrapperRef = React.useRef(null);
  const onPropertyChange = useCallback((value, property) => {
    if (JSON.stringify(value) === JSON.stringify(htmlContent)) return
    dispatch({
      type: GetSlateAction.SET_PROPERTY,
      payload: {
        allProps: {
          form: 'contentForm',
          info: null,
          property: property,
          value: value
        }
      }
    })
  }, [dispatch, htmlContent])

  const onSlateEditorChange = useCallback((value) => {
    onPropertyChange(value, 'htmlContent')
  }, [onPropertyChange])

  return (
    <form>
      <div className='iEditor-Title-Container'>
        <label htmlFor='title'>文章標題</label>
        <input
          name='title'
          id='content-editor-title'
          type='text'
          value={title}
          onChange={e => onPropertyChange(e.target.value, 'title')}
        />
      </div>
      {/* <div> */}
      <MuEditor
        value={htmlContent}
        setValue={onSlateEditorChange}
      />
      {/* </div> */}
    </form>
  );
}

export default ContentEditorForm;
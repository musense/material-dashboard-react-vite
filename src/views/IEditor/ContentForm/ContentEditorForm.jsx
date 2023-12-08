import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as GetSlateAction from '@actions/GetSlateAction';
import MuEditor from "./MuEditor/MuEditor";
import ContentTitle from "./ContentTitle";

const ContentEditorForm = () => {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.getSlateReducer.contentForm?.title);
  const htmlContent = useSelector((state) => state.getSlateReducer.contentForm?.htmlContent)

  const onPropertyChange = useCallback((value, property) => {
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
  }, [dispatch])

  const onTitleChange = useCallback((e) => {
    onPropertyChange(e.target.value, 'title')
  }, [onPropertyChange])
  const onSlateEditorChange = useCallback((value) => {
    onPropertyChange(value, 'htmlContent')
  }, [onPropertyChange])

  return (
    <form>
      <ContentTitle
        value={title}
        onChange={onTitleChange}
      />
      <MuEditor
        value={htmlContent}
        setValue={onSlateEditorChange}
      />
    </form>
  );
}

export default ContentEditorForm;
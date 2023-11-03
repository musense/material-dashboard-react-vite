import React, { useCallback, useState } from "react";
import { Button, Stack } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUrl, getSelectedUrlId, getSubstitutionUrl } from "../../reducers/GetEditorUrlReducer";
import { buttonProps } from "../EditorList/EditorListButtonList";
import * as GetEditorUrlAction from "../../actions/GetEditorUrlAction";

const divStyle = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  flexGrow: 0,
}

export default function EditorUrlSubstitution() {
  // const [substitutionUrl, setSubstitutionUrl] = useState();
  const selectedUrlId = useSelector(getSelectedUrlId)
  const selectedUrl = useSelector(getSelectedUrl) ?? ''
  const substitutionUrl = useSelector(getSubstitutionUrl) ?? ''

  const dispatch = useDispatch();

  const substituteUrl = useCallback(() => {
    if (!substitutionUrl) return ''
    const confirmResult = confirm("確定要替換嗎？")
    if (!confirmResult) return
    //* either success or fail, need
    //* a modal to tell user the result message
    dispatch({
      type: GetEditorUrlAction.UPDATE_EDITOR_URL,
      payload: {
        id: selectedUrlId,
        data: substitutionUrl
      }
    })
  }, [dispatch, selectedUrlId, substitutionUrl])

  const setSubstitutionUrl = useCallback((url) => {
    dispatch({
      type: GetEditorUrlAction.SET_SUBSTITUTION_URL,
      payload: {
        substitutionUrl: url
      }
    })
  }, [dispatch])

  const cancelEditing = useCallback(() => {
    dispatch({
      type: GetEditorUrlAction.CANCEL_EDITING_URL,
    })
  }, [dispatch])

  return <Stack
    width={630}
    direction={'row'}
    alignItems={'stretch'}
    justifyContent={'space-between'}
    spacing={2}
    useFlexGap={true}
  >
    <div style={divStyle}><label>替換文章內網址:</label></div>
    <div style={divStyle}>
      <label htmlFor="originalUrl">原始網址</label>
      <input title={selectedUrl} id={'originalUrl'} disabled={true} type="text" value={selectedUrl} style={{ width: 'fit-content' }} />
    </div>
    <div style={divStyle}>
      <label htmlFor="substituteUrl">替換網址</label>
      <input disabled={!selectedUrlId} id={'substituteUrl'} type="text" value={substitutionUrl} onChange={e => (setSubstitutionUrl(e.target.value))} />
    </div>
    <div style={divStyle}>
      <Button disabled={!selectedUrlId} {...buttonProps} color="error" onClick={substituteUrl}>替換</Button>
    </div>
    <div style={divStyle}>
      <Button disabled={!selectedUrlId} {...buttonProps} onClick={cancelEditing}>取消</Button>
    </div>
  </Stack>
}
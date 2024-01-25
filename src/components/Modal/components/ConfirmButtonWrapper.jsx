import React, { useCallback } from 'react'
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import * as GetDialogAction from '@actions/GetDialogAction';

export default function ConfirmButtonWrapper({
  confirm,
  dialogContent,
  data,
  modalCloseReturnValue,
  setClose,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onModalClose = useCallback((data, modalCloseReturnValue) => {
    console.log("🚀 ~ file: ConfirmButtonWrapper.jsx:17 ~ onModalClose ~ data:", data)
    console.log("🚀 ~ file: ConfirmButtonWrapper.jsx:17 ~ onModalClose ~ returnValue:", modalCloseReturnValue)
    dispatch({
      type: GetDialogAction.ON_MODAL_CLOSE,
      payload: {
        messageDialogReturnValue: data ?? modalCloseReturnValue,
      }
    })
  }, [dispatch])

  const onEditorDenied = useCallback((dialogContent) => {
    if (dialogContent === '您已被登出！'
      || dialogContent === '您已登出！'
      || dialogContent === '取得資料出現錯誤！即將導回登入頁！'
    ) {
      dispatch({ type: "RESET_STATE_DATA" });
      navigate('/login', { replace: true })
    }
  }, [dispatch, navigate])

  const handleClose = useCallback((dialogContent) => {
    setClose()
    onModalClose(false)
    onEditorDenied(dialogContent)
  }, [setClose, onModalClose, onEditorDenied])

  const handleCloseOK = useCallback((data, modalCloseReturnValue) => {
    setClose()
    onModalClose(data, modalCloseReturnValue)
  }, [setClose, onModalClose])

  const ConFirmButton = <DialogActions>
    <Button onClick={() => handleClose(dialogContent)}>算了</Button>
    <Button onClick={() => handleCloseOK(data, modalCloseReturnValue)} autoFocus>好</Button>
  </DialogActions>;

  const NormalCloseButton = <DialogActions>
    <Button onClick={() => handleClose(dialogContent)} autoFocus>好</Button>
  </DialogActions>;

  return confirm
    ? ConFirmButton
    : NormalCloseButton
}

import React, { useCallback } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

import ConfirmButtonWrapper from './components/ConfirmButtonWrapper';
import EditorButtonWrapper from './components/EditorButtonWrapper';

const style = (w) => ({
  minWidth: 300,
  height: 'fit-content',
  m: 0,
  p: 3,
  [w && 'width']: w,
})

export default function MessageDialog({
  open,
  setClose,
  dialogTitle,
  dialogContent,
  success = null,
  editorID = null,
  editorDraft = null,
  sitemapUrl = null,
  confirm = null,
  data = null,
  editor = null,
  width = null,
}) {
  const handleClose = useCallback((event, reason) => {
    if (reason === 'backdropClick') return
    setClose()
  }, [setClose])
  return dialogTitle && (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEscapeKeyDown={true}
    >
      <Box sx={style(width)}>
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        {editor
          ? <EditorButtonWrapper
            success={success}
            dialogTitle={dialogTitle}
            dialogContent={dialogContent}
            editorID={editorID}
            editorDraft={editorDraft}
            sitemapUrl={sitemapUrl}
            setClose={handleClose}
          />
          : <ConfirmButtonWrapper
            confirm={confirm}
            dialogContent={dialogContent}
            data={data}
            setClose={setClose}
          />
        }
      </Box>
    </Dialog>
  )
}






import React from "react";
import BodyCell from "./../BodyCell/BodyCell";
import { Stack } from '@mui/material';
import IconCell from "./IconCell";
import useEditCellFunction from "./../../hook/useEditCellFunction"

export default function EditBodyCell({
  isDraft,
  copyText,
  id,
  name,
  editType,
  editData,
  className = '',
  callback = null,
  copyButton = true,
  editButton = true,
  deleteButton = true,
}) {
  const {
    onCopy,
    onDelete,
    onEdit
  } = useEditCellFunction({
    isDraft,
    onDelete: {
      id,
      name,
    },
    onEdit: {
      editType,
      editData: editData,
      callback: callback,
    }
  }
  )
  return <BodyCell className={className} children={
    <Stack spacing={2} direction={'row'}
      useFlexGap flexWrap="wrap" justifyContent={"space-evenly"}
    >
      {copyButton && <InnerCopyIconButton
        copyText={copyText}
        onCopy={onCopy}
      />}
      {editButton && <InnerEditIconButton
        onEdit={onEdit}
      />}
      {deleteButton && <InnerDeleteIconButton
        onDelete={onDelete} />}
    </Stack>} />;
}

const InnerCopyIconButton = React.memo(CopyIconButton)
const InnerEditIconButton = React.memo(EditIconButton)
const InnerDeleteIconButton = React.memo(DeleteIconButton)

function DeleteIconButton({ onDelete }) {
  return <IconCell
    iconName={'trashCan'}
    iconTitle={'刪除'}
    callback={onDelete} />;
}

function EditIconButton({ onEdit }) {
  return <IconCell
    iconName={'pen'}
    iconTitle={'編輯'}
    callback={onEdit} />;
}

function CopyIconButton({ copyText, onCopy }) {
  return <IconCell
    copy={copyText ? true : false}
    iconName={'link'}
    iconTitle={'複製連結'}
    copyText={copyText}
    callback={onCopy} />;
}

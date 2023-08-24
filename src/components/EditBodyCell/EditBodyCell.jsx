import React from "react";
import BodyCell from "./../BodyCell/BodyCell";
import { Stack } from '@mui/material';
import IconCell from "./IconCell";
import useEditCellFunction from "@hook/useEditCellFunction";

export default function EditBodyCell({
    copyText,
    id,
    name,
    editType,
    editData,
    className,
    callback = null
}) {
    console.log("🚀 ~ file: EditBodyCell.jsx:16 ~ name:", name)
    console.log("🚀 ~ file: EditBodyCell.jsx:16 ~ id:", id)
    const {
        onCopy,
        onDelete,
        onEdit
    } = useEditCellFunction({
        onDelete: {
            id,
            name,
        },
        onEdit: {
            editType,
            editData: editData,
            callback: callback
        }
    }
    )
    return <BodyCell className={className} children={
        <Stack spacing={2} direction={'row'}
            useFlexGap flexWrap="wrap" justifyContent={"space-evenly"}
        >
            <IconCell
                copy={copyText ? true : false}
                iconName={'link'}
                iconTitle={'複製連結'}
                copyText={copyText}
                callback={onCopy}
            />
            <IconCell
                iconName={'pen'}
                iconTitle={'編輯'}
                callback={onEdit}
            />
            <IconCell
                iconName={'trashCan'}
                iconTitle={'刪除'}
                callback={onDelete}
            />
        </Stack>} />;
}



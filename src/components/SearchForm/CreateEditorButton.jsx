import React from "react";
import Button from '@mui/material/Button';

export default function CreateEditorButton({
    buttonProps,
    onAddNew
}) {
    return <Button
        {...buttonProps}
        onClick={onAddNew}>
        新增文章
    </Button>;
}



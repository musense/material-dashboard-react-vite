import React from "react";
import Button from '@mui/material/Button';

export default function PrevButton({
    buttonProps,
    currentPage,
    onPageButtonClick
}) {
    return <Button
        {...buttonProps}
        disabled={currentPage === 1}
        onClick={() => onPageButtonClick(currentPage - 1)}>
        上一頁
    </Button>;
}

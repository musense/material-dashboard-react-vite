import React from "react";
import Button from '@mui/material/Button';

export default function NextButton({
    buttonProps,
    currentPage,
    totalPage,
    onPageButtonClick
}) {
    return <Button
        {...buttonProps}
        disabled={currentPage === totalPage}
        onClick={() => onPageButtonClick(currentPage + 1)}>
        下一頁
    </Button>;
}

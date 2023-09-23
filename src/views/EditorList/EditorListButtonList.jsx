import React, { useCallback, useMemo } from "react";
import { shallowEqual, useDispatch } from 'react-redux';
import * as GetEditorAction from '../../actions/GetEditorAction';
import { useNavigate } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import PageButtonList from "@components/PageButtonList/PageButtonList";
import { Typography } from "@mui/material";

export default function EditorListButtonList({
    currentPage,
    totalPage,
    totalCount
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onAddNew = useCallback(() => {
        dispatch({
            type: GetEditorAction.ADD_NEW_EDITOR
        });
        navigate('/admin/editorList/new');
    }, [dispatch, navigate])

    const onPageButtonClick = useCallback((pageNumber) => {
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_PAGE,
            payload: pageNumber

        })
    }, [dispatch])

    const buttonProps = useMemo(() => ({
        color: 'info',
        size: 'small',
        variant: 'contained',
    }), [])

    return <Stack spacing={2} direction={'row'}
        display={'flex'} useFlexGap flexWrap="wrap"
        alignItems={'center'} sx={{ my: '1rem' }}>
        <InnerCreateEditorButton
            buttonProps={buttonProps}
            onAddNew={onAddNew}
        />
        <InnerPrevButton
            buttonProps={buttonProps}
            currentPage={currentPage}
            onPageButtonClick={onPageButtonClick}
        />
        <InnerPageButtonList
            totalPage={totalPage}
            currentPage={currentPage}
            patchType={GetEditorAction.REQUEST_EDITOR_PAGE} />
        <InnerNextButton
            buttonProps={buttonProps}
            currentPage={currentPage}
            totalPage={totalPage}
            onPageButtonClick={onPageButtonClick}
        />
        <InnerSummedUpText
            totalCount={totalCount}
        />
    </Stack>;
}
const InnerPageButtonList = React.memo(PageButtonList)
const InnerPrevButton = React.memo(PrevButton)
const InnerNextButton = React.memo(NextButton)
const InnerCreateEditorButton = React.memo(CreateEditorButton)
const InnerSummedUpText = React.memo(SummedUpText)

function SummedUpText({ totalCount }) {
    return <Typography sx={{ fontSize: 16 }}>
        合計：{totalCount}筆
    </Typography>;
}

function NextButton({
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

function CreateEditorButton({
    buttonProps,
    onAddNew
}) {
    return <Button
        {...buttonProps}
        onClick={onAddNew}>
        新增文章
    </Button>;
}

function PrevButton({
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

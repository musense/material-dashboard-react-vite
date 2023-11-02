import React, { useCallback, useMemo } from "react";
import { useDispatch } from 'react-redux';
import * as GetEditorAction from '../../actions/GetEditorAction';
import { useNavigate } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import PageButtonList from "@components/PageButtonList/PageButtonList";
import PrevButton from "../../components/SearchForm/PrevButton";
import NextButton from "../../components/SearchForm/NextButton";
import CreateEditorButton from "../../components/SearchForm/CreateEditorButton";
import SummedUpText from "../../components/SearchForm/SummedUpText";

const InnerPageButtonList = React.memo(PageButtonList)
const InnerPrevButton = React.memo(PrevButton)
const InnerNextButton = React.memo(NextButton)
const InnerCreateEditorButton = React.memo(CreateEditorButton)
const InnerSummedUpText = React.memo(SummedUpText)

export default function EditorListButtonList({
  currentPage,
  totalPage,
  totalCount,
  createButton = true
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
    {createButton && <InnerCreateEditorButton
      buttonProps={buttonProps}
      onAddNew={onAddNew}
    />}
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
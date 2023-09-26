import React from "react";
import PageButtonList from '../../components/PageButtonList/PageButtonList';
import Stack from "@mui/material/Stack";
import { useDispatch } from 'react-redux';
import * as GetBannerAction from '../../actions/GetBannerAction';
import PrevButton from "../../components/SearchForm/PrevButton";
import NextButton from "../../components/SearchForm/NextButton";
import SummedUpText from "../../components/SearchForm/SummedUpText";

const InnerPageButtonList = React.memo(PageButtonList)
const InnerPrevButton = React.memo(PrevButton)
const InnerNextButton = React.memo(NextButton)
const InnerSummedUpText = React.memo(SummedUpText)

export default function BannerButtonList({
    currentPage,
    totalPage,
    totalCount
}) {

    const dispatch = useDispatch();

    function onPageButtonClick(pageNumber) {
        dispatch({
            type: GetBannerAction.REQUEST_BANNER_PAGE,
            payload: pageNumber

        })
    }

    const buttonProps = {
        color: 'info',
        size: 'small',
        variant: 'contained',
    }

    return <Stack spacing={2} direction={'row'}
        display={'flex'} useFlexGap flexWrap="wrap"
        alignItems={'center'} sx={{ my: '1rem' }}>
        <InnerPrevButton
            buttonProps={buttonProps}
            currentPage={currentPage}
            onPageButtonClick={onPageButtonClick}
        />
        <InnerPageButtonList
            totalPage={totalPage}
            currentPage={currentPage}
            patchType={GetBannerAction.REQUEST_EDITOR_PAGE} />
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
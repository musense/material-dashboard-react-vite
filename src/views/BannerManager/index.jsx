import React, { useEffect } from 'react';
import BannerLeftWrapper from "./BannerLeftWrapper";
import BannerRightWrapper from "./BannerRightWrapper";
import { useDispatch, useSelector } from 'react-redux';
import * as GetBannerAction from '../../actions/GetBannerAction';
import { reDispatchMessage, errorMessage } from './../../reducers/errorMessage';
import { useLoaderData } from 'react-router';

const BannerDispatchMessage = [
    ...reDispatchMessage,
    errorMessage.addSuccess
]

const headerMap = {
    headerRow: [
        { name: "序號", patchKey: "serialNumber", type: "number", className: "flex-1" },
        { name: "Banner名稱", patchKey: "name", type: "string", className: "flex-3" },
        {
            name: "圖片/影片",
            src: "homeImagePath",
            checkKey: "contentImagePath",
            alt: "hyperlink",
            type: "image",
            className: "flex-3 image-container"
        },
        { name: "排序", patchKey: "sort", type: "number", className: "flex-1" },
        { name: "超連結", patchKey: "hyperlink", type: "string", className: "flex-3" },
        {
            name: "排程時間",
            patchKey: "startDate",
            checkKey: ["eternal"],
            showKeys: ["startDate", "endDate"],
            type: "dateps",
            className: "flex-3"
        },
        { name: "狀態", patchKey: "status", type: "string", className: "flex-2" },
        {
            type: "__edit_cell__",
            copyText: "hyperlink",
            editType: GetBannerAction.EDITING_BANNER,
            // cancelEditType: GetBannerAction.CANCEL_EDITING_BANNER,
            className: "flex-3"
        }
    ],
    patchType: GetBannerAction.SHOW_BANNER_LIST_SORTING,
    reducerName: 'getBannerReducer'
}

function BannerList() {
    const dispatch = useDispatch();
    const returnMessage = useSelector(state => state.getBannerReducer.errorMessage);

    useEffect(() => {
        if (BannerDispatchMessage.includes(returnMessage)) {
            dispatch({ type: GetBannerAction.REQUEST_BANNER })
        }
        // return () => {
        //     dispatch({ type: GetBannerAction.CANCEL_EDITING_BANNER })
        // }
    }, [returnMessage, dispatch]);

    return (
        <div className={'manager-container'}>
            <BannerRightWrapper headerMap={headerMap} />
            <BannerLeftWrapper />
        </div >

    );
}

export default BannerList;






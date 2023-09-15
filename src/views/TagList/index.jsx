import React, { useEffect } from 'react';
import TagLeftWrapper from "./TagLeftWrapper";
import TagRightWrapper from "./TagRightWrapper";
import { useDispatch, useSelector } from 'react-redux';
import * as GetTagsAction from '../../actions/GetTagsAction';
import { reDispatchMessage, errorMessage } from './../../reducers/errorMessage';

const tagDispatchMessage = [
    ...reDispatchMessage,
    errorMessage.addSuccess
]

const headerMap = {
    headerRow: [
        { name: "標籤名稱", patchKey: "name", type: "string" },
        { name: "創建日期", patchKey: "createDate", type: "date" },
        { name: "標籤觸及次數", patchKey: "pageView", type: "number" },
        {
            name: "熱門標籤排序",
            patchKey: "sorting",
            checkKey: "popular",
            type: "number-",
            className: {
                [true]: 'is-popular-tag',
                [false]: 'not-popular-tag'
            }
        },
        {
            type: "__edit_cell__",
            copyText: "webHeader.customUrl",
            editType: GetTagsAction.EDITING_TAG
        }
    ],
    patchType: GetTagsAction.SHOW_TAG_LIST_SORTING,
    reducerName: 'getTagsReducer'
}

function TagList() {

    const dispatch = useDispatch();
    const returnMessage = useSelector(state => state.getTagsReducer.errorMessage);
    useEffect(() => {
        if (tagDispatchMessage.includes(returnMessage)) {
            dispatch({ type: GetTagsAction.REQUEST_TAG })
        }
    }, [returnMessage, dispatch]);


    return (
        <div className={'manager-container'}>
            <TagRightWrapper headerMap={headerMap} />
            <TagLeftWrapper />
        </div >

    );
}

export default TagList;






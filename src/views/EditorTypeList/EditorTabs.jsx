import React, { useCallback, useEffect } from 'react';
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import { useDispatch } from 'react-redux';
import searchMap from '../../hook/useQuery.js';
import * as GetEditorTypeAction from "../../actions/GetEditorTypeAction.js";
import EditorTypeList from './EditorTypeList.jsx';
import { useNavigate, createSearchParams } from "react-router-dom";

export default function EditorTabs() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const search = searchMap()
    const type = search.get('type') ?? 'top'
    console.log("🚀 ~ file: EditorTabs.jsx:29 ~ EditorTabs ~ type:", type)

    const GetDefaultTypeList = useCallback((actionType) => {
        if (actionType === '') return
        dispatch({
            type: GetEditorTypeAction[actionType]
        });
    }, [dispatch])

    const GetDefaultNotTypeList = useCallback(() => {
        dispatch({
            type: GetEditorTypeAction.SEARCH_EDITOR_TYPE_LIST,
            payload: {
                search: '',
                type: type,
                page: 1
            }
        });
    }, [dispatch, type])

    useEffect(() => {
        switch (type) {
            case 'top': {
                GetDefaultTypeList('REQUEST_TOP_EDITOR');
                GetDefaultNotTypeList();
                break;
            }
            case 'popular': {
                GetDefaultTypeList('REQUEST_HOT_EDITOR');
                GetDefaultNotTypeList();
                break;
            }
            case 'recommend': {
                GetDefaultTypeList('REQUEST_RECOMMEND_EDITOR');
                GetDefaultNotTypeList();
                break;
            }
            default: {
                GetDefaultTypeList('REQUEST_TOP_EDITOR');
                GetDefaultNotTypeList();
                break;
            }
        }
    }, [GetDefaultNotTypeList, GetDefaultTypeList, type]);

    const onTabClickHandler = useCallback((targetType, searchType) => {
        if (searchType === targetType) return
        navigate({
            pathname: ".",
            search: createSearchParams({
                type: targetType
            }).toString()
        })
    }, [navigate])

    return (
        <CustomTabs
            headerColor="primary"
            className='CardHeader-tabs'
            search={type}
            tabs={[
                {
                    color: "primary",
                    tabName: "置頂文章",
                    onClick: () => onTabClickHandler('top', type),
                    tabContent: <EditorTypeList type={'top'} />,
                },
                {
                    color: "primary",
                    tabName: "熱門文章",
                    onClick: () => onTabClickHandler('popular', type),
                    tabContent: <EditorTypeList type={'popular'} />,
                },
                {
                    color: "primary",
                    tabName: "推薦文章",
                    onClick: () => onTabClickHandler('recommend', type),
                    tabContent: <EditorTypeList type={'recommend'} />,
                },
            ]}
        />
    )

}



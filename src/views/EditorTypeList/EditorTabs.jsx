import React, { useCallback, useEffect } from 'react';
import CustomTabs from "@components/CustomTabs/CustomTabs.jsx";

import { useDispatch, useSelector } from 'react-redux';
import searchMap from '../../hook/useQuery.js';
import * as GetEditorTypeAction from "../../actions/GetEditorTypeAction.js";
import { getHotList, getNotHotList, getNotRecommendList, getNotTopList, getRecommendList, getTopList, getErrorMessage } from '../../reducers/GetEditorTypeReducer.js';
import EditorTypeList from './EditorTypeList.jsx';
import { useNavigate, createSearchParams } from "react-router-dom";

const InnerEditorTypeList = React.memo(EditorTypeList)


export default function EditorTabs() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const topList = useSelector(getTopList)
    const notTopList = useSelector(getNotTopList)
    const hotList = useSelector(getHotList)
    const notHotList = useSelector(getNotHotList)
    const recommendList = useSelector(getRecommendList)
    const notRecommendList = useSelector(getNotRecommendList)

    const serverErrorMessage = useSelector(getErrorMessage)

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
                    tabContent: (
                        <InnerEditorTypeList
                            type={'top'}
                            notList={notTopList}
                            list={topList}
                            errorMessage={serverErrorMessage}
                        />
                    ),
                },
                {
                    color: "primary",
                    tabName: "熱門文章",
                    onClick: () => onTabClickHandler('popular', type),
                    tabContent: (
                        <InnerEditorTypeList
                            type={'popular'}
                            notList={notHotList}
                            list={hotList}
                            errorMessage={serverErrorMessage}
                        />
                    ),
                },
                {
                    color: "primary",
                    tabName: "推薦文章",
                    onClick: () => onTabClickHandler('recommend', type),
                    tabContent: (
                        <InnerEditorTypeList
                            type={'recommend'}
                            notList={notRecommendList}
                            list={recommendList}
                            errorMessage={serverErrorMessage}
                        />
                    ),
                },
            ]}
        />
    )

}



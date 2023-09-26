import React, { useCallback, useEffect } from 'react';
import CustomTabs from "@components/CustomTabs/CustomTabs.jsx";

import { useDispatch, useSelector } from 'react-redux';
import searchMap from '../../hook/useQuery.js';
import * as GetEditorAction from "../../actions/GetEditorAction.js";
import { getHotList, getNotHotList, getNotRecommendList, getNotTopList, getRecommendList, getTopList } from '../../reducers/GetEditorReducer.js';
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

    const search = searchMap()
    const type = search.get('type') ?? 'top'

    const GetDefaultTypeList = useCallback((actionType) => {
        if (actionType === '') return
        dispatch({
            type: GetEditorAction[actionType]
        });
    }, [dispatch])

    const GetDefaultNotTypeList = useCallback(() => {
        dispatch({
            type: GetEditorAction.SEARCH_EDITOR_TYPE_LIST,
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
        console.log("🚀 ~ file: EditorTabs.jsx:72 ~ onTabClickHandler ~ searchType:", searchType)
        console.log("🚀 ~ file: EditorTabs.jsx:72 ~ onTabClickHandler ~ targetType:", targetType)
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
                            list={hotList} />
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
                            list={recommendList} />
                    ),
                },
            ]}
        />
    )

}



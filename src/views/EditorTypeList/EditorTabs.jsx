import React, { useCallback, useEffect } from 'react';
import Card from "@components/Card/Card.jsx";
import CardBody from "@components/Card/CardBody.jsx";
import CardFooter from "@components/Card/CardFooter.jsx";
import CardHeader from "@components/Card/CardHeader.jsx";
import CardIcon from "@components/Card/CardIcon.jsx";
import CustomTabs from "@components/CustomTabs/CustomTabs.jsx";
import GridContainer from "@components/Grid/GridContainer.jsx";
import GridItem from "@components/Grid/GridItem.jsx";

import { useDispatch, useSelector } from 'react-redux';
import searchMap from '../../hook/useQuery.js';
import * as GetEditorAction from "../../actions/GetEditorAction.js";
import { getHotList, getNotHotList, getNotRecommendList, getNotTopList, getRecommendList, getTopList } from '../../reducers/GetEditorReducer.js';
import EditorTypeList from './EditorTypeList.jsx';
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";

export default function EditorTabs() {

    const location = useLocation();
    console.log("🚀 ~ file: EditorTabs.jsx:21 ~ EditorTabs ~ location:", location)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const topList = useSelector(getTopList)
    const notTopList = useSelector(getNotTopList)
    const hotList = useSelector(getHotList)
    const notHotList = useSelector(getNotHotList)
    const recommendList = useSelector(getRecommendList)
    const notRecommendList = useSelector(getNotRecommendList)

    const search = new searchMap()
    const type = search.get('type') ?? 'top'
    console.log("🚀 ~ file: EditorTabs.jsx:34 ~ EditorTabs ~ type:", type)

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

    return (
        <CustomTabs
            headerColor="primary"
            className='CardHeader-tabs'
            tabs={[
                {
                    color: "primary",
                    tabName: "置頂文章",
                    onClick: () => navigate({
                        pathname: ".",
                        search: createSearchParams({
                            type: "top"
                        }).toString()
                    }),
                    tabContent: (
                        <EditorTypeList
                            type={'top'}
                            notList={notTopList}
                            list={topList}
                        />
                    ),
                },
                {
                    color: "primary",
                    tabName: "熱門文章",
                    onClick: () => navigate({
                        pathname: ".",
                        search: createSearchParams({
                            type: "popular"
                        }).toString()
                    }),
                    tabContent: (
                        <EditorTypeList
                            type={'popular'}
                            notList={notHotList}
                            list={hotList} />
                    ),
                },
                {
                    color: "primary",
                    tabName: "推薦文章",
                    onClick: () => navigate({
                        pathname: ".",
                        search: createSearchParams({
                            type: "recommend"
                        }).toString()
                    }),
                    tabContent: (
                        <EditorTypeList
                            type={'recommend'}
                            notList={notRecommendList}
                            list={recommendList} />
                    ),
                },
            ]}
        />
    )

}






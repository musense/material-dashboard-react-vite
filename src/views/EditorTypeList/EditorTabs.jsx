import React, { useEffect } from 'react';
import Card from "@components/Card/Card.jsx";
import CardBody from "@components/Card/CardBody.jsx";
import CardFooter from "@components/Card/CardFooter.jsx";
import CardHeader from "@components/Card/CardHeader.jsx";
import CardIcon from "@components/Card/CardIcon.jsx";
import CustomTabs from "@components/CustomTabs/CustomTabs.jsx";
import GridContainer from "@components/Grid/GridContainer.jsx";
import GridItem from "@components/Grid/GridItem.jsx";

import { useDispatch, useSelector } from 'react-redux';
import useQuery from '../../hook/useQuery.js';
import * as GetEditorAction from "../../actions/GetEditorAction.js";
import { getHotList, getNotHotList, getNotRecommendList, getNotTopList, getRecommendList, getTopList } from '../../reducers/GetEditorReducer.js';
import EditorTypeList from './EditorTypeList.jsx';

export default function EditorTabs() {

    const search = new useQuery()
    const dispatch = useDispatch();

    const topList = useSelector(getTopList)
    const notTopList = useSelector(getNotTopList)
    const hotList = useSelector(getHotList)
    const notHotList = useSelector(getNotHotList)
    const recommendList = useSelector(getRecommendList)
    const notRecommendList = useSelector(getNotRecommendList)
    console.log("🚀 ~ file: EditorTypeHeader.jsx:54 ~ EditorTabs ~ topList:", topList)
    console.log("🚀 ~ file: EditorTypeHeader.jsx:54 ~ EditorTabs ~ notTopList:", notTopList)
    useEffect(() => {
        console.log("🚀 ~ file: index.jsx:23 ~ EditorTypeList ~ search:", search)
        console.log("🚀 ~ file: index.jsx:23 ~ EditorTypeList ~ search.get('type'):", search.get('type'))
        dispatch({
            type: GetEditorAction.REQUEST_TOP_EDITOR
        })
        dispatch({
            type: GetEditorAction.SEARCH_NOT_TOP_EDITOR_LIST
        })
        dispatch({
            type: GetEditorAction.REQUEST_HOT_EDITOR
        })
        dispatch({
            type: GetEditorAction.SEARCH_NOT_HOT_EDITOR_LIST
        })
        dispatch({
            type: GetEditorAction.REQUEST_RECOMMEND_EDITOR
        })
        dispatch({
            type: GetEditorAction.SEARCH_NOT_RECOMMEND_EDITOR_LIST
        })
        switch (search.get('type')) {
            case 'news': {
                dispatch({
                    type: GetEditorAction.REQUEST_TOP_EDITOR
                })
                dispatch({
                    type: GetEditorAction.SEARCH_NOT_TOP_EDITOR_LIST
                })
                break;
            }
            case 'hot': {
                dispatch({
                    type: GetEditorAction.REQUEST_HOT_EDITOR
                })
                dispatch({
                    type: GetEditorAction.SEARCH_NOT_HOT_EDITOR_LIST
                })
                break;
            }
            case 'recommend': {
                // dispatch recommend contents list
                break;
            }
            default: {
                dispatch({
                    type: GetEditorAction.REQUEST_TOP_EDITOR
                })
                dispatch({
                    type: GetEditorAction.SEARCH_NOT_TOP_EDITOR_LIST
                })
                break;
            }
        }


    }, []);


    return <CustomTabs
        headerColor="primary"
        className='CardHeader-tabs'
        tabs={[
            {
                color: "primary",
                tabName: "置頂文章",
                // tabIcon: BugReport,
                tabContent: (
                    <EditorTypeList
                        type={'置頂'}
                        notList={notTopList}
                        list={topList}
                    />
                ),
            },
            {
                color: "primary",
                tabName: "熱門文章",
                // tabIcon: Code,
                tabContent: (
                    <EditorTypeList
                        type={'熱門'}
                        notList={notHotList}
                        list={hotList} />
                ),
            },
            {
                color: "primary",
                tabName: "推薦文章",
                // tabIcon: Cloud,
                tabContent: (
                    <EditorTypeList
                        type={'推薦'}
                        notList={notRecommendList}
                        list={recommendList} />
                ),
            },
        ]}
    />;
}






import { createSelector } from 'reselect';
import * as GetEditorTypeAction from '../actions/GetEditorTypeAction';
import { errorMessage } from './errorMessage';

const initialState = {
    topTitleState: null,
    notTopTitleState: null,
    hotTitleState: null,
    notHotTitleState: null,
    recommendTitleState: null,
    notRecommendTitleState: null,
    list: null,
    notList: null,
    type: null,
    currentPage: null,
    totalCount: null,
    errorMessage: null,
}
const getEditorTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetEditorTypeAction.REQUEST_TOP_EDITOR_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    top: {
                        list: action.payload.topTitleList,
                        currentPage: action.payload.currentPage,
                        totalCount: action.payload.totalCount,
                        errorMessage: errorMessage.getFinish,
                    }
                }
                // topTitleState: {
                //     list: action.payload.topTitleList,
                //     currentPage: action.payload.currentPage,
                //     totalCount: action.payload.totalCount,
                //     errorMessage: errorMessage.getFinish,
                // },
            }
        case GetEditorTypeAction.REQUEST_NOT_TOP_EDITOR_SUCCESS:
            return {
                ...state,
                notList: {
                    ...state.notList,
                    top: {
                        list: action.payload.notTopTitleList,
                        currentPage: action.payload.currentPage,
                        totalCount: action.payload.totalCount,
                        errorMessage: errorMessage.getFinish,
                    }
                }
                // notTopTitleState: {
                //     list: action.payload.notTopTitleList,
                //     currentPage: action.payload.currentPage,
                //     totalCount: action.payload.totalCount,
                //     errorMessage: errorMessage.getFinish,
                // },
            }
        case GetEditorTypeAction.REQUEST_HOT_EDITOR_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    popular: {
                        list: action.payload.hotTitleList,
                        currentPage: action.payload.currentPage,
                        totalCount: action.payload.totalCount,
                        errorMessage: errorMessage.getFinish,
                    }
                }
                // hotTitleState: {
                //     list: action.payload.hotTitleList,
                //     currentPage: action.payload.currentPage,
                //     totalCount: action.payload.totalCount,
                //     errorMessage: errorMessage.getFinish,
                // },
            }
        case GetEditorTypeAction.REQUEST_NOT_HOT_EDITOR_SUCCESS:
            return {
                ...state,
                notList: {
                    ...state.notList,
                    popular: {
                        list: action.payload.notHotTitleList,
                        currentPage: action.payload.currentPage,
                        totalCount: action.payload.totalCount,
                        errorMessage: errorMessage.getFinish,
                    }
                }
                // notHotTitleState: {
                //     list: action.payload.notHotTitleList,
                //     currentPage: action.payload.currentPage,
                //     totalCount: action.payload.totalCount,
                //     errorMessage: errorMessage.getFinish,
                // },
            }
        case GetEditorTypeAction.REQUEST_RECOMMEND_EDITOR_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    recommend: {
                        list: action.payload.recommendTitleList,
                        currentPage: action.payload.currentPage,
                        totalCount: action.payload.totalCount,
                        errorMessage: errorMessage.getFinish,
                    }
                }
                // recommendTitleState: {
                //     list: action.payload.recommendTitleList,
                //     currentPage: action.payload.currentPage,
                //     totalCount: action.payload.totalCount,
                //     errorMessage: errorMessage.getFinish,
                // },
            }
        case GetEditorTypeAction.REQUEST_NOT_RECOMMEND_EDITOR_SUCCESS:
            return {
                ...state,
                notList: {
                    ...state.notList,
                    recommend: {
                        list: action.payload.notRecommendTitleList,
                        currentPage: action.payload.currentPage,
                        totalCount: action.payload.totalCount,
                        errorMessage: errorMessage.getFinish,
                    }
                }
                // notRecommendTitleState: {
                //     list: action.payload.notRecommendTitleList,
                //     currentPage: action.payload.currentPage,
                //     totalCount: action.payload.totalCount,
                //     errorMessage: errorMessage.getFinish,
                // },
            }
        case GetEditorTypeAction.BUNCH_MODIFY_TYPE_LIST_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.updateSuccess,
            }
        case GetEditorTypeAction.SET_MODAL_CONTEXT:
            return {
                ...state,
                type: action.payload.type,
            }
        case GetEditorTypeAction.BUNCH_MODIFY_TYPE_LIST_FAIL:
            return {
                ...state,
                errorMessage: action.payload.errorMessage ?? errorMessage.updateFail,
            }
        case "SET_ERROR_MESSAGE":
            return {
                ...state,
                errorMessage: action.payload.message
            }
        case "RESET_STATE_DATA": {
            return {
                ...initialState,
            }
        }
        // case "ON_MODAL_CLOSE": {
        //     return {
        //         ...state,
        //         errorMessage: null,
        //     }
        // }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default getEditorTypeReducer

const getList = state => state.getEditorTypeReducer.list
const getNotList = state => state.getEditorTypeReducer.notList

const getTopList = createSelector(
    [getList],
    (state) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:236 ~ state:", state)
        return state?.top?.list
    }
)

const getNotTopList = createSelector(
    [getNotList],
    (state) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:244 ~ state:", state)
        return state?.top?.list
    }
)
const getHotList = createSelector(
    [getList],
    (state) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:236 ~ state:", state)
        return state?.popular?.list
    }
)

const getNotHotList = createSelector(
    [getNotList],
    (state) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:244 ~ state:", state)
        return state?.popular?.list
    }
)
const getRecommendList = createSelector(
    [getList],
    (state) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:236 ~ state:", state)
        return state?.recommend?.list
    }
)

const getNotRecommendList = createSelector(
    [getNotList],
    (state) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:244 ~ state:", state)
        return state?.recommend?.list
    }
)

const getTypeList = createSelector(
    [getList, (state, type) => type],
    (list, type) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:232 ~ getTypeList:", { list: list, type })
        if (!type) return []
        return list ? list[type]?.list : []
    }
)

const getTypeNotList = createSelector(
    [getNotList, (state, type) => type],
    (notList, type) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:240 ~ getTypeNotList:", { notList: notList, type })
        if (!type) return []
        return notList ? notList[type]?.list : []
    }
)



const getErrorMessage = state => state.getEditorTypeReducer.errorMessage


export {
    getTopList,
    getNotTopList,
    getHotList,
    getNotHotList,
    getRecommendList,
    getNotRecommendList,
    getErrorMessage,
    getTypeList,
    getTypeNotList
}
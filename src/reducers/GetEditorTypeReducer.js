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
    currentPage: null,
    totalCount: null,
    errorMessage: null,
}
const getEditorTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetEditorTypeAction.REQUEST_TOP_EDITOR_SUCCESS:
            return {
                ...state,
                topTitleState: {
                    list: action.payload.topTitleList,
                    currentPage: action.payload.currentPage,
                    totalCount: action.payload.totalCount,
                    errorMessage: errorMessage.getFinish,
                },
            }
        case GetEditorTypeAction.REQUEST_NOT_TOP_EDITOR_SUCCESS:
            return {
                ...state,
                notTopTitleState: {
                    list: action.payload.notTopTitleList,
                    currentPage: action.payload.currentPage,
                    totalCount: action.payload.totalCount,
                    errorMessage: errorMessage.getFinish,
                },
            }
        case GetEditorTypeAction.REQUEST_HOT_EDITOR_SUCCESS:
            return {
                ...state,
                hotTitleState: {
                    list: action.payload.hotTitleList,
                    currentPage: action.payload.currentPage,
                    totalCount: action.payload.totalCount,
                    errorMessage: errorMessage.getFinish,
                },
            }
        case GetEditorTypeAction.REQUEST_NOT_HOT_EDITOR_SUCCESS:
            return {
                ...state,
                notHotTitleState: {
                    list: action.payload.notHotTitleList,
                    currentPage: action.payload.currentPage,
                    totalCount: action.payload.totalCount,
                    errorMessage: errorMessage.getFinish,
                },
            }
        case GetEditorTypeAction.REQUEST_RECOMMEND_EDITOR_SUCCESS:
            return {
                ...state,
                recommendTitleState: {
                    list: action.payload.recommendTitleList,
                    currentPage: action.payload.currentPage,
                    totalCount: action.payload.totalCount,
                    errorMessage: errorMessage.getFinish,
                },
            }
        case GetEditorTypeAction.REQUEST_NOT_RECOMMEND_EDITOR_SUCCESS:
            return {
                ...state,
                notRecommendTitleState: {
                    list: action.payload.notRecommendTitleList,
                    currentPage: action.payload.currentPage,
                    totalCount: action.payload.totalCount,
                    errorMessage: errorMessage.getFinish,
                },
            }
        case GetEditorTypeAction.BUNCH_MODIFY_TYPE_LIST_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.updateSuccess,
            }
        case GetEditorTypeAction.BUNCH_MODIFY_TYPE_LIST_FAIL:
            return {
                ...state,
                errorMessage: action.payload.errorMessage ?? errorMessage.updateFail,
            }
        case "RESET_STATE_DATA": {
            return {
                ...initialState,
            }
        }
        case "ON_MODAL_CLOSE": {
            return {
                ...state,
                errorMessage: null,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default getEditorTypeReducer

const getTopState = state => state.getEditorTypeReducer.topTitleState
const getNotTopState = state => state.getEditorTypeReducer.notTopTitleState

const getTopList = createSelector(
    [getTopState],
    (state) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:236 ~ state:", state)
        return state?.list
    }
)

const getNotTopList = createSelector(
    [getNotTopState],
    (state) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:244 ~ state:", state)
        return state?.list
    }
)

const getHotState = state => state.getEditorTypeReducer.hotTitleState
const getNotHotState = state => state.getEditorTypeReducer.notHotTitleState

const getHotList = createSelector(
    [getHotState],
    (state) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:236 ~ state:", state)
        return state?.list
    }
)

const getNotHotList = createSelector(
    [getNotHotState],
    (state) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:244 ~ state:", state)
        return state?.list
    }
)

const getRecommendState = state => state.getEditorTypeReducer.recommendTitleState
const getNotRecommendState = state => state.getEditorTypeReducer.notRecommendTitleState

const getRecommendList = createSelector(
    [getRecommendState],
    (state) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:236 ~ state:", state)
        return state?.list
    }
)

const getNotRecommendList = createSelector(
    [getNotRecommendState],
    (state) => {
        console.log("🚀 ~ file: GetEditorTypeReducer.js:244 ~ state:", state)
        return state?.list
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
    getErrorMessage
}
import { all, put, take } from 'redux-saga/effects';
import * as GetEditorTypeAction from "../../actions/GetEditorTypeAction";
import { instance } from "./AxiosInstance";
import { getGetErrorMessage } from '../apiHelperFunc';

// GET
function* GetTopContentList(payload = { page: 1 }) {
    const { page } = payload;
    try {
        const response = yield instance.get(`/editor/topAndNews?pageNumber=${page}&limit=9999`);
        const responseData = yield response.data
        console.log("🚀 ~ file: GetEditorTypeList.js:12 ~ function*GetTopContentList ~ responseData:", responseData)
        const { totalCount, currentPage, data: topTitleList } = responseData

        yield put({
            type: GetEditorTypeAction.REQUEST_TOP_EDITOR_SUCCESS,
            payload: {
                topTitleList: topTitleList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetEditorTypeAction.REQUEST_TOP_EDITOR_FAIL)
    }
}

// GET
function* GetNotTopWithSearchList(payload = { page: 1, search: '' }) {
    const { page, search } = payload
    try {
        const response = yield instance.get(`/editor/searchUntop?pageNumber=${page}&limit=9999&name=${search}`);
        const responseData = yield response.data
        console.log("🚀 ~ file: GetEditorTypeList.js:34 ~ function*GetNotTopWithSearchList ~ responseData:", responseData)
        const { totalCount, currentPage, data: notTopTitleList } = responseData

        yield put({
            type: GetEditorTypeAction.REQUEST_NOT_TOP_EDITOR_SUCCESS,
            payload: {
                notTopTitleList: notTopTitleList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetEditorTypeAction.REQUEST_TOP_EDITOR_FAIL)
    }
}

// GET
function* GetHotContentList(payload = { page: 1 }) {
    const { page } = payload;
    try {
        const response = yield instance.get(`/editor/popular?pageNumber=${page}&limit=9999`);
        const responseData = yield response.data
        const { totalCount, currentPage, data: hotTitleList } = responseData

        yield put({
            type: GetEditorTypeAction.REQUEST_HOT_EDITOR_SUCCESS,
            payload: {
                hotTitleList: hotTitleList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetEditorTypeAction.REQUEST_HOT_EDITOR_FAIL)
    }
}

// GET
function* GetNotHotWithSearchList(payload = { page: 1, search: '' }) {
    const { page, search } = payload
    try {
        const response = yield instance.get(`/editor/searchUnpopular?pageNumber=${page}limit=9999&name=${search}`);
        const responseData = yield response.data
        const { totalCount, currentPage, data: notHotTitleList } = responseData

        yield put({
            type: GetEditorTypeAction.REQUEST_NOT_HOT_EDITOR_SUCCESS,
            payload: {
                notHotTitleList: notHotTitleList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetEditorTypeAction.REQUEST_HOT_EDITOR_FAIL)
    }
}

// GET
function* GetRecommendContentList(payload = { page: 1 }) {
    const { page } = payload;
    try {
        const response = yield instance.get(`/editor/recommend?pageNumber=${page}&limit=9999`);
        const responseData = yield response.data
        const { totalCount, currentPage, data: recommendTitleList } = responseData

        yield put({
            type: GetEditorTypeAction.REQUEST_RECOMMEND_EDITOR_SUCCESS,
            payload: {
                recommendTitleList: recommendTitleList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetEditorTypeAction.REQUEST_RECOMMEND_EDITOR_FAIL)
    }
}

// GET
function* GetNotRecommendWithSearchList(payload = { page: 1, search: '' }) {
    const { page, search } = payload
    try {
        const response = yield instance.get(`/editor/searchUnrecommend?pageNumber=${page}&limit=9999&name=${search}`);
        const responseData = yield response.data
        const { totalCount, currentPage, data: notRecommendTitleList } = responseData

        yield put({
            type: GetEditorTypeAction.REQUEST_NOT_RECOMMEND_EDITOR_SUCCESS,
            payload: {
                notRecommendTitleList: notRecommendTitleList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetEditorTypeAction.REQUEST_RECOMMEND_EDITOR_FAIL)
    }
}

// PATCH
function* TopBunchModifyList(payload = { list: [] }) {
    const { list } = payload
    try {
        const response = yield instance.patch(`/editor/top/bunchModifiedByIds`, {
            'ids': list
        });
        const responseData = yield response.data
        const { updateCount, failedCount } = responseData

        yield put({
            type: GetEditorTypeAction.BUNCH_MODIFY_TYPE_LIST_SUCCESS,
            payload: {
                updateCount: parseInt(updateCount),
                failedCount: parseInt(failedCount),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetEditorTypeAction.BUNCH_MODIFY_TYPE_LIST_FAIL)
    }
}

// PATCH
function* PopularBunchModifyList(payload = { list: [] }) {
    const { list } = payload
    try {
        const response = yield instance.patch(`/editor/popular/bunchModifiedByIds`, {
            'ids': list
        });
        const responseData = yield response.data
        const { updateCount, failedCount } = responseData

        yield put({
            type: GetEditorTypeAction.BUNCH_MODIFY_TYPE_LIST_SUCCESS,
            payload: {
                updateCount: parseInt(updateCount),
                failedCount: parseInt(failedCount),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetEditorTypeAction.BUNCH_MODIFY_TYPE_LIST_FAIL)
    }
}

// PATCH
function* RecommendBunchModifyList(payload = { list: [] }) {
    const { list } = payload
    try {
        const response = yield instance.patch(`/editor/recommend/bunchModifiedByIds`, {
            'ids': list
        });
        const responseData = yield response.data
        const { updateCount, failedCount } = responseData

        yield put({
            type: GetEditorTypeAction.BUNCH_MODIFY_TYPE_LIST_SUCCESS,
            payload: {
                updateCount: parseInt(updateCount),
                failedCount: parseInt(failedCount),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetEditorTypeAction.BUNCH_MODIFY_TYPE_LIST_FAIL)
    }
}


function* watchGetTopEditorSaga() {
    while (true) {
        const { payload } = yield take(GetEditorTypeAction.REQUEST_TOP_EDITOR)
        // yield AuthUser(GetEditorAction.AUTH_USER_SUCCESS, GetEditorAction.AUTH_USER_FAIL)
        yield GetTopContentList(payload)
    }
}

function* watchGetNotTopEditorSaga() {
    while (true) {
        const { payload } = yield take(GetEditorTypeAction.SEARCH_NOT_TOP_EDITOR_LIST)
        // yield AuthUser(GetEditorAction.AUTH_USER_SUCCESS, GetEditorAction.AUTH_USER_FAIL)
        yield GetNotTopWithSearchList(payload)
    }
}

function* watchGetHotEditorSaga() {
    while (true) {
        const { payload } = yield take(GetEditorTypeAction.REQUEST_HOT_EDITOR)
        // yield AuthUser(GetEditorAction.AUTH_USER_SUCCESS, GetEditorAction.AUTH_USER_FAIL)
        yield GetHotContentList(payload)
    }
}

function* watchGetNotHotEditorSaga() {
    while (true) {
        const { payload } = yield take(GetEditorTypeAction.SEARCH_NOT_HOT_EDITOR_LIST)
        // yield AuthUser(GetEditorAction.AUTH_USER_SUCCESS, GetEditorAction.AUTH_USER_FAIL)
        yield GetNotHotWithSearchList(payload)
    }
}

function* watchGetRecommendEditorSaga() {
    while (true) {
        const { payload } = yield take(GetEditorTypeAction.REQUEST_RECOMMEND_EDITOR)
        // yield AuthUser(GetEditorAction.AUTH_USER_SUCCESS, GetEditorAction.AUTH_USER_FAIL)
        yield GetRecommendContentList(payload)
    }
}

function* watchGetNotRecommendEditorSaga() {
    while (true) {
        const { payload } = yield take(GetEditorTypeAction.SEARCH_NOT_RECOMMEND_EDITOR_LIST)
        // yield AuthUser(GetEditorAction.AUTH_USER_SUCCESS, GetEditorAction.AUTH_USER_FAIL)
        yield GetNotRecommendWithSearchList(payload)
    }
}

function* watchBunchModifyEditorTypeSaga() {
    while (true) {
        const { payload } = yield take(GetEditorTypeAction.BUNCH_MODIFY_TYPE_LIST)
        switch (payload.type) {
            case 'top': {
                yield TopBunchModifyList(payload)
            }
                break;
            case 'popular': {
                yield PopularBunchModifyList(payload)
            }
                break;
            case 'recommend': {
                yield RecommendBunchModifyList(payload)
            }
                break;
            default:
                break;
        }
    }
}

function* watchSearchEditorTypeSaga() {
    while (true) {
        const { payload } = yield take(GetEditorTypeAction.SEARCH_EDITOR_TYPE_LIST)
        switch (payload.type) {
            case 'top': {
                yield GetNotTopWithSearchList(payload)
            }
                break;
            case 'popular': {
                yield GetNotHotWithSearchList(payload)
            }
                break;
            case 'recommend': {
                yield GetNotRecommendWithSearchList(payload)
            }
                break;
            default:
                break;
        }
    }
}

function* mySaga() {
    yield all([
        watchGetTopEditorSaga(),
        watchGetNotTopEditorSaga(),
        watchGetHotEditorSaga(),
        watchGetNotHotEditorSaga(),
        watchGetRecommendEditorSaga(),
        watchGetNotRecommendEditorSaga(),
        watchBunchModifyEditorTypeSaga(),
        watchSearchEditorTypeSaga(),
    ])
}

export default mySaga;
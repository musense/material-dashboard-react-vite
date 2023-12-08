import { all, put, take, takeEvery } from 'redux-saga/effects';
import * as GetEditorAction from "../../actions/GetEditorAction";
import * as GetSlateAction from "../../actions/GetSlateAction";
import { formInstance, instance } from "./AxiosInstance";
import { toBackendFormData, toFrontendData } from "./../apiHelperFunc";
import { errorMessage } from '../../reducers/errorMessage';
import dayjs from 'dayjs';
import { getErrorMessage, getGetErrorMessage } from '../apiHelperFunc';

// GET
function* GetEditorTitleList(payload = 1) {
  try {
    const startDate = new Date(`${dayjs().subtract(3, 'month').format('YYYY-MM-DD')} 00:00:00`).getTime()
    const endDate = new Date(`${dayjs().format('YYYY-MM-DD')} 23:59:59`).getTime()
    const response = yield instance.get(encodeURI(`/editor?limit=10000&startDate=${startDate}&endDate=${endDate}&pageNumber=${payload}&status=全部`));
    const responseData = yield response.data.data;

    responseData.sort((data1, data2) => new Date(data2.updatedAt) - new Date(data1.updatedAt))
    const titleList = toFrontendData(responseData)
    const totalCount = parseInt(responseData.length)

    yield put({
      type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS,
      payload: {
        titleList,
        totalCount: totalCount,
        currentPage: 1,
      }
    })
  } catch (error) {
    yield getGetErrorMessage(error, GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL)
  }
}

// GET :_id
function* GetEditorByID(payload) {
  const { data, draft } = payload
  console.log("🚀 ~ file: GetEditorList.js:38 ~ function*GetEditorByID ~ draft:", draft)
  const draftQuery = draft ? `?draft=${draft ? 1 : 0}` : ''
  try {

    const response = yield instance.get(`/editor/${data}${draftQuery}`);
    const responseData = yield response.data;
    // return
    const mappedEditorData = toFrontendData(responseData)
    console.log("🚀 ~ file: GetEditorList.js:50 ~ function*GetEditorByID ~ mappedEditorData:", mappedEditorData)
    // return
    yield put({
      type: GetEditorAction.REQUEST_EDITOR_SUCCESS,
      payload: mappedEditorData,
    })
  } catch (error) {
    yield getGetErrorMessage(error, GetEditorAction.REQUEST_EDITOR_FAIL)
  }
}

/// /editor?
/// title=${title}
/// category=${category}
/// startDate=${startDate}
/// endDate=${endDate}
// GET
function* SearchEditor(payload) {
  const {
    title,
    categories: categoryName,
    status: statusName,
    createDate,
  } = payload

  const {
    startDate,
    endDate
  } = createDate

  try {
    const startDateToSeconds = new Date(`${dayjs(startDate).format('YYYY-MM-DD')} 00:00:00`).getTime()
    const endDateToSeconds = new Date(`${dayjs(endDate).format('YYYY-MM-DD')} 23:59:59`).getTime()

    const titleQuery = title ? `title=${title}&` : ''
    const categoryQuery = categoryName ? `category=${categoryName}&` : ''
    const statusQuery = statusName ? `status=${statusName}&` : ''
    const startDateQuery = `startDate=${startDateToSeconds}&`
    const endDateQuery = `endDate=${endDateToSeconds}&`

    const response = yield instance.get(encodeURI(`/editor?limit=10000&${startDateQuery}${endDateQuery}pageNumber=1&${statusQuery}${titleQuery}${categoryQuery}`));
    const responseData = yield response.data.data;

    responseData.sort((data1, data2) => new Date(data2.updatedAt) - new Date(data1.updatedAt))
    const titleList = toFrontendData(responseData)
    const totalCount = parseInt(responseData.length)

    // return
    yield put({
      type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS,
      payload: {
        titleList,
        totalCount: totalCount,
        currentPage: 1,
      }
    })
  } catch (error) {
    yield getGetErrorMessage(error, GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL)
  }
}

// POST
function* AddEditor(payload) {
  try {
    const { data, willBeDraft, serialNumber } = payload
    let response
    const requestFormData = toBackendFormData(
      data,
      {
        willBeDraft,
        serialNumber
      })
    // return
    if (willBeDraft) {
      //* 是草稿時執行以下程式
      if (typeof requestFormData.get('contentImagePath') === 'object') {
        response = yield formInstance.post(`/draftEditor`, requestFormData);
      }
      if (typeof requestFormData.get('contentImagePath') === 'string') {
        response = yield instance.post(`/draftEditor`, requestFormData);
      }
    } else {
      //* 不是草稿時執行以下程式
      if (typeof requestFormData.get('contentImagePath') === 'object') {
        response = yield formInstance.post(`/editor`, requestFormData);
      }
      if (typeof requestFormData.get('contentImagePath') === 'string') {
        response = yield instance.post(`/editor`, requestFormData);
      }
    }

    let editor;
    if (willBeDraft) {
      editor = yield response.data.newDraft;
    } else {
      editor = yield response.data;
    }
    const mappedEditorData = toFrontendData(editor)

    yield put({
      type: GetEditorAction.ADD_EDITOR_SUCCESS,
      payload: {
        _id: mappedEditorData._id,
        editor: mappedEditorData,
      }
    })

  } catch (error) {
    yield getErrorMessage(error, GetEditorAction.ADD_EDITOR_FAIL)
  }
}

// POST
function* PreviewEditor(payload) {
  try {
    const { data } = payload
    console.log("🚀 ~ file: GetEditorList.js:157 ~ function*PreviewEditor ~ data:", data)
    const requestFormData = toBackendFormData(data)
    // return
    let response
    if (typeof requestFormData.get('contentImagePath') === 'object') {
      response = yield formInstance.post(`/tempEditor`, requestFormData);
    } else if (typeof requestFormData.get('contentImagePath') === 'string') {
      response = yield instance.post(`/tempEditor`, requestFormData);
    }
    const { id: previewID } = yield response.data.data;
    // return
    yield put({
      type: GetSlateAction.PREVIEW_EDITOR_SUCCESS,
      payload: {
        previewID
      },
      errorMessage: errorMessage.addSuccess
    })

  } catch (error) {
    yield getErrorMessage(error, GetSlateAction.PREVIEW_EDITOR_FAIL)
  }
}

// PATCH
function* UpdateEditor(payload) {
  // return
  const { id, data, draft } = payload
  console.log("🚀 ~ file: GetEditorList.js:183 ~ function*UpdateEditor ~ draft:", draft)
  try {
    const requestFormData = toBackendFormData(data, { willBeDraft: draft })
    const categories = requestFormData.get('categories')
    console.log("🚀 ~ file: GetEditorList.js:201 ~ function*UpdateEditor ~ categories:", categories)
    // return
    let response

    if (draft === true) {
      if (typeof requestFormData.get('contentImagePath') === 'object') {
        response = yield formInstance.patch(`/draftEditor/${id}`, requestFormData);
      } else if (typeof requestFormData.get('contentImagePath') === 'string') {
        response = yield instance.patch(`/draftEditor/${id}`, requestFormData);
      }
    } else {
      if (typeof requestFormData.get('contentImagePath') === 'object') {
        response = yield formInstance.patch(`/editor/${id}`, requestFormData);
      } else if (typeof requestFormData.get('contentImagePath') === 'string') {
        response = yield instance.patch(`/editor/${id}`, requestFormData);
      }
    }

    const { message } = yield response.data;
    yield put({
      type: GetEditorAction.UPDATE_EDITOR_SUCCESS,
      payload: {
        message
      }
    })
  } catch (error) {
    yield getErrorMessage(error, GetEditorAction.UPDATE_EDITOR_FAIL)
  }
}

// DELETE
function* DeleteEditor(payload) {
  try {
    const { id, draft } = payload
    console.log("🚀 ~ file: GetEditorList.js:214 ~ function*DeleteEditor ~ id, draft:", id, draft)

    let response,
      data
    if (draft === true) {
      data = { 'id': id }
      response = yield instance.delete(`/draftEditor`, { data });
    } else {
      data = { 'ids': id }
      response = yield instance.delete(`/editor/bunchDeleteByIds`, { data });
    }
    const responseData = yield response.data.data;
    yield put({
      type: GetEditorAction.DELETE_EDITOR_SUCCESS,
      payload: responseData
    })
  } catch (error) {
    yield getErrorMessage(error, GetEditorAction.DELETE_EDITOR_FAIL)
  }
}

function* AuthUser(patchSuccessType, patchFailType) {
  try {
    const authResponse = yield instance.post(`/editor/verifyUser`)
    const message = yield authResponse.data.message;
    yield put({
      type: patchSuccessType,
      payload: {
        errorMessage: message
      }
    })
  } catch (error) {
    yield getErrorMessage(error, patchFailType)
  }
}

function* watchAddEditorSaga() {
  while (true) {
    const { payload } = yield take(GetEditorAction.ADD_EDITOR)
    yield AddEditor(payload)
  }
}

function* watchPreviewEditorSaga() {
  while (true) {
    const { payload } = yield take(GetSlateAction.PREVIEW_EDITOR)
    yield PreviewEditor(payload)
  }
}
function* watchGetEditorTitleListSaga() {
  while (true) {
    const { payload } = yield take(GetEditorAction.REQUEST_EDITOR)
    yield GetEditorTitleList(payload)
  }
}

function* watchUpdateEditorSaga() {
  while (true) {
    const { payload } = yield take(GetEditorAction.UPDATE_EDITOR)
    yield UpdateEditor(payload)
  }
}

function* watchSearchEditorSaga() {
  while (true) {
    const { payload } = yield take(GetEditorAction.SEARCH_EDITOR_LIST)
    yield SearchEditor(payload)
  }
}

function* watchDeleteEditorSaga() {
  while (true) {
    const { payload } = yield take(GetEditorAction.BUNCH_DELETE_EDITOR)
    yield DeleteEditor(payload)
  }
}

function* watchGetEditorByIDSaga() {
  while (true) {
    const { payload } = yield take(GetEditorAction.REQUEST_EDITOR_BY_ID)
    yield AuthUser(GetEditorAction.AUTH_USER_SUCCESS, GetEditorAction.AUTH_USER_FAIL)
    yield GetEditorByID(payload)
  }
}

function* watchAddNewEditorAuth() {
  while (true) {
    yield take(GetEditorAction.ADD_NEW_EDITOR)
    yield AuthUser(GetEditorAction.AUTH_USER_SUCCESS, GetEditorAction.AUTH_USER_FAIL)
  }
}

function* mySaga() {
  yield all([
    watchUpdateEditorSaga(),
    watchPreviewEditorSaga(),
    watchGetEditorTitleListSaga(),
    watchSearchEditorSaga(),
    watchAddEditorSaga(),
    watchDeleteEditorSaga(),
    watchGetEditorByIDSaga(),
    watchAddNewEditorAuth()
  ])
}

export default mySaga;




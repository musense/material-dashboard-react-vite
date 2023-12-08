import { all, put, take } from 'redux-saga/effects';
import * as GetEditorUrlAction from "../../actions/GetEditorUrlAction";
import { formInstance, instance } from "./AxiosInstance";
import { getErrorMessage, getGetErrorMessage } from '../apiHelperFunc';

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

function* GetEditorLinks(payload) {
  // const { data } = payload
  try {
    // const response = yield instance.get(`/editor/${payload.data._id}`);

    const response = yield instance.get(`/editorLink`);
    const responseData = yield response.data.data;
    console.log("🚀 ~ file: GetEditorUrl.js:28 ~ function*GetEditorLinks ~ responseData:", responseData)

    yield put({
      type: GetEditorUrlAction.REQUEST_EDITOR_URL_SUCCESS,
      payload: {
        editorUrlList: responseData
      },
    })
  } catch (error) {
    yield getGetErrorMessage(error, GetEditorUrlAction.REQUEST_EDITOR_URL_FAIL)
  }
}

// POST
function* TriggerAllEditorUrlCheck(payload) {
  try {
    // const { data } = payload

    const response = yield instance.post(`/editorLink/getAndPost`, {});
    const responseData = yield response.data.data;

    yield put({
      type: GetEditorUrlAction.CHECK_EDITOR_URL_ALL_SUCCESS,
      payload: {
        editorUrlList: responseData,
      }
    })

  } catch (error) {
    yield getErrorMessage(error, GetEditorUrlAction.CHECK_EDITOR_URL_ALL_FAIL)
  }
}

//! not implemented yet
// POST
function* EditorUrlCheck(payload) {
  try {
    const data = {
      'ids': payload
    }

    const response = yield instance.post(`/editorLink/checkLink`, data);

    const responseData = yield response.data.results;
    console.log("🚀 ~ file: GetEditorUrl.js:74 ~ function*EditorUrlCheck ~ responseData:", responseData)

    yield put({
      type: GetEditorUrlAction.CHECK_EDITOR_URL_SUCCESS,
      payload: {
        checkEditorUrlList: responseData,

      }
    })

  } catch (error) {
    yield getErrorMessage(error, GetEditorUrlAction.CHECK_EDITOR_URL_FAIL)
  }
}

// PATCH
function* UpdateEditorUrl(payload) {
  // return
  const { id, data } = payload
  try {

    const response = yield instance.patch(`/editorLink/updateLink/${id}`, {
      newUrl: data
    });
    const { message, data: returnData } = yield response.data;
    yield put({
      type: GetEditorUrlAction.UPDATE_EDITOR_URL_SUCCESS,
      payload: {
        message,
        oldUrlId: id,
        newEditorUrl: returnData[0],
      }
    })
  } catch (error) {
    console.log("🚀 ~ file: GetEditorUrl.js:104 ~ function*UpdateEditorUrl ~ error:", error)
    yield getErrorMessage(error, GetEditorUrlAction.UPDATE_EDITOR_URL_FAIL)
  }
}

function* watchGetEditorUrlSaga() {
  while (true) {
    const { payload } = yield take(GetEditorUrlAction.REQUEST_EDITOR_URL)
    // yield AuthUser(payload)
    yield GetEditorLinks(payload)
  }
}

function* watchTriggerAllEditorUrlCheckSaga() {
  while (true) {
    const { payload } = yield take(GetEditorUrlAction.CHECK_EDITOR_URL_ALL)
    // yield AuthUser(payload)
    yield TriggerAllEditorUrlCheck(payload)
  }
}

function* watchEditorUrlCheckSaga() {
  while (true) {
    const { payload } = yield take(GetEditorUrlAction.CHECK_EDITOR_URL)
    // yield AuthUser(payload)
    yield EditorUrlCheck(payload)
  }
}

function* watchUpdateEditorUrlSaga() {
  while (true) {
    const { payload } = yield take(GetEditorUrlAction.UPDATE_EDITOR_URL)
    // yield AuthUser(payload)
    yield UpdateEditorUrl(payload)
  }
}

function* mySaga() {
  yield all([
    watchGetEditorUrlSaga(),
    watchTriggerAllEditorUrlCheckSaga(),
    watchEditorUrlCheckSaga(),
    watchUpdateEditorUrlSaga(),
  ])
}

export default mySaga;
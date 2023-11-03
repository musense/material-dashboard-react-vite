import { createSelector } from 'reselect';
import * as GetEditorUrlAction from '../actions/GetEditorUrlAction';
import * as GetSlateAction from '../actions/GetSlateAction';
import { errorMessage } from './errorMessage';
import getSortedList from '@utils/getSortedList';
import dayjs from 'dayjs';

const initialState = {
  sortingMap: {
    url: 'asc',
    createdAt: 'asc',
    updatedAt: 'asc',
    pingStatus: 'asc',
    axiosStatus: 'asc',
    checkStatusUpdatedAt: 'asc',
  },
  searchEditorUrlList: null,
  selectedEditorUrl: null,
  selectedPatchKey: null,
  editorUrlList: null,
  showList: null,
  currentPage: null,
  totalCount: null,
  errorMessage: null,
}
const getEditorUrlReducer = (state = initialState, action) => {
  switch (action.type) {
    case GetEditorUrlAction.SEARCH_EDITOR_URL_LIST:
      const { url,
        // createDate 
      } = action.payload
      // const { startDate, endDate } = createDate
      let filteredData
      if (url === '') {
        filteredData = [...state.editorUrlList]
        // .filter(
        //   editorUrl => new Date(editorUrl.checkStatusUpdatedAt) >= new Date(startDate) && new Date(editorUrl.checkStatusUpdatedAt) <= new Date()
        // )
      } else {
        filteredData = state.editorUrlList.filter(
          editorUrl => editorUrl.url.includes(url)
          // && new Date(editorUrl.checkStatusUpdatedAt) >= new Date(startDate) && new Date(editorUrl.checkStatusUpdatedAt) <= new Date()
        )
      }

      return {
        ...state,
        searchEditorUrlList: filteredData,
        showList: transformToShowList(filteredData)
      }
    case GetEditorUrlAction.REQUEST_EDITOR_URL_FAIL:
    case GetEditorUrlAction.CHECK_EDITOR_URL_FAIL:
    case GetEditorUrlAction.CHECK_EDITOR_URL_ALL_FAIL:
    case GetEditorUrlAction.UPDATE_EDITOR_URL_FAIL:
    case GetEditorUrlAction.AUTH_USER_FAIL: {
      let errorMessage;
      return {
        ...state,
        errorMessage: errorMessage
      }
    }
    case GetEditorUrlAction.SHOW_EDITOR_URL_LIST_SORTING: {
      const { key } = action.payload;
      return {
        ...state,
        showList: getSortedList(state.showList, key, state.sortingMap),
        sortingMap: {
          ...state.sortingMap,
          [key]: state.sortingMap[key] === 'asc' ? 'desc' : 'asc',
        },
        selectedPatchKey: key,
        currentPage: 1
      }
    }
    case GetEditorUrlAction.EDITING_URL:
      const { data } = action.payload
      return {
        ...state,
        selectedEditorUrl: {
          _id: data._id,
          url: data.url,
        }
      }
    case GetEditorUrlAction.CANCEL_EDITING_URL:
      return {
        ...state,
        selectedEditorUrl: null
      }
    case GetEditorUrlAction.UPDATE_EDITOR_URL_SUCCESS:
      const { newEditorUrl, oldUrlId } = action.payload
      const editorIndex = state.editorUrlList.findIndex(editor => editor._id === oldUrlId)
      state.editorUrlList.splice(editorIndex, 1, newEditorUrl)
      return {
        ...state,
        showList: transformToShowList(state.editorUrlList),
        errorMessage: action.payload.message
      }
    case GetEditorUrlAction.CHECK_EDITOR_URL:
      return {
        ...state,
        errorMessage: null
      }
    case GetEditorUrlAction.CHECK_EDITOR_URL_SUCCESS:
      const { checkEditorUrlList } = action.payload
      checkEditorUrlList.map(checkEditor => {
        stateEditorUrlListSplice(checkEditor);
      })
      function stateEditorUrlListSplice(checkEditorUrlList) {
        const editorIndex = state.editorUrlList.findIndex(editor => editor._id === checkEditorUrlList._id);
        state.editorUrlList.splice(editorIndex, 1, checkEditorUrlList);
      }
      return {
        ...state,
        showList: transformToShowList(state.editorUrlList),
        errorMessage: errorMessage.checkFinish
      }
    case GetEditorUrlAction.REQUEST_EDITOR_URL_SUCCESS:
    case GetEditorUrlAction.CHECK_EDITOR_URL_ALL_SUCCESS:
      return {
        ...state,
        editorUrlList: action.payload.editorUrlList,
        showList: transformToShowList(action.payload.editorUrlList),
        errorMessage: errorMessage.getFinish
      }
    case GetEditorUrlAction.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload.message
      }
    case GetSlateAction.CHECK_BEFORE_SUBMIT:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    case "RESET_STATE_DATA": {
      return {
        ...initialState,
        sortingMap: {
          ...initialState.sortingMap
        }
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }


}

export default getEditorUrlReducer

const getEditorUrlList = state => state.getEditorUrlReducer.showList
  && state.getEditorUrlReducer.showList
const getCurrentPage = state => state.getEditorUrlReducer.currentPage

const getTotalPage = state => Math.ceil(state.getEditorUrlReducer.totalCount / 10)
const getTotalCount = state => state.getEditorUrlReducer.totalCount

const getSelectedPatchKey = state => state.getEditorUrlReducer.selectedPatchKey
const getEditorUrlErrorMessage = state => state.getEditorUrlReducer.errorMessage

const getEditorUrlShowList = createSelector(
  [getEditorUrlList, getCurrentPage],
  (editorUrlList, currentPage) => {
    const start = (currentPage - 1) * 10;
    const end = start + 10
    return editorUrlList?.slice(start, end)
  })

const getSelectedUrl = state => state.getEditorUrlReducer.selectedEditorUrl &&
  state.getEditorUrlReducer.selectedEditorUrl.url

const getSelectedUrlId = state => state.getEditorUrlReducer.selectedEditorUrl &&
  state.getEditorUrlReducer.selectedEditorUrl._id
export {
  getEditorUrlList,
  getCurrentPage,
  getTotalPage,
  getTotalCount,
  getSelectedPatchKey,
  getEditorUrlErrorMessage,
  getEditorUrlShowList,
  getSelectedUrl,
  getSelectedUrlId,
}

function transformToShowList(editorUrlList) {
  return editorUrlList.map(editorUrl => {
    return {
      ...editorUrl,
      pingStatus: editorUrl.pingStatus === 'isAlive' ? true : false,
      axiosStatus: editorUrl.axiosStatusCode !== null
        ? editorUrl.axiosStatusCode >= 200 && editorUrl.axiosStatusCode < 400
          ? true
          : false
        : false
    };
  });
}

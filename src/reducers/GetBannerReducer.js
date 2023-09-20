import getSortedList from '@utils/getSortedList';
import *  as GetBannerAction from '../actions/GetBannerAction';
import { errorMessage } from './errorMessage';
import { createSelector } from 'reselect'
import dayjs from 'dayjs';
import flattenObj from '../utils/flattenObj';
import getSubmitObject from '../utils/getSubmitState';

const initialState = {
    sortingMap: {
        serialNumber: 'asc',
        name: 'asc',
        sort: 'asc',
        hyperlink: 'asc',
        startDate: 'asc',
        status: 'asc',
    },
    selectedPatchKey: null,
    bannerList: null,
    selectedBanner: {
        _id: '',
        name: '',
        serialNumber: '',
        sort: '',
        remark: '',
        status: '',
        hyperlink: '',
        media: {
            contentImagePath: '',
            homeImagePath: '',
        },
        publishInfo: {
            isOnShelvesImmediate: false,
            eternal: false,
            display: false,
            isScheduled: false,
            scheduledAt: {
                startDate: null,
                endDate: null
            }
        }
    },
    showUrl: '',
    updateInitialState: null,
    submitState: null,
    currentPage: null,
    totalCount: null,
    isEditing: false,
    errorMessage: null,
}

const getBannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetBannerAction.CANCEL_EDITING_BANNER: {
            return {
                ...state,
                selectedBanner: {
                    ...initialState.selectedBanner,
                    ...initialState.selectedBanner.media,
                    ...initialState.selectedBanner.publishInfo,
                    ...initialState.selectedBanner.publishInfo.scheduledAt,
                },
                showUrl: '',
                isEditing: false
            }
        }
        case GetBannerAction.SET_SHOW_URL: {
            return {
                ...state,
                showUrl: action.payload.showUrl,
            }
        }
        case GetBannerAction.SET_BANNER_PROPERTY: {
            const { value, property, info, detail } = action.payload.allProps
            if (!detail && !info) {
                return {
                    ...state,
                    selectedBanner: {
                        ...state.selectedBanner,
                        [property]: value,
                        [`!~${property}`]: state.updateInitialState ? state.updateInitialState[property] : undefined,
                    }
                }
            }
            if (!detail) {
                return {
                    ...state,
                    selectedBanner: {
                        ...state.selectedBanner,
                        [info]: {
                            ...state.selectedBanner[info],
                            [property]: value,
                            [`!~${property}`]: state.updateInitialState ? state.updateInitialState[info][property] : undefined,
                        }
                    }
                }
            }
            return {
                ...state,
                selectedBanner: {
                    ...state.selectedBanner,
                    [info]: {
                        ...state.selectedBanner[info],
                        [detail]: {
                            ...state.selectedBanner[info][detail],
                            [property]: value,
                            [`!~${property}`]: state.updateInitialState ? state.updateInitialState[info][detail][property] : undefined,
                        }
                    }
                }
            }
        }
        case GetBannerAction.EDITING_BANNER: {
            const {
                ...props
            } = action.payload.data

            const selectedBanner = {
                _id: props._id,
                name: props.name,
                serialNumber: props.serialNumber,
                sort: props.sort,
                remark: props.remark,
                status: props.status,
                eternal: props.eternal ?? false,
                display: props.display ?? false,
                hyperlink: props.hyperlink,
                media: {
                    homeImagePath: props.homeImagePath,
                    contentImagePath: props.contentImagePath,
                },
                publishInfo: {
                    eternal: props.eternal ?? false,
                    display: props.display ?? false,
                    isScheduled: props.eternal || props.startDate || props.endDate ? true : false,
                    scheduledAt: {
                        startDate: props.startDate,
                        endDate: props.endDate
                    }
                }
            }
            return {
                ...state,
                selectedBanner: selectedBanner,
                updateInitialState: selectedBanner,
                showUrl: props.homeImagePath,
                isEditing: true,
            }
        }
        case GetBannerAction.ADD_BANNER_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.addSuccess
            }
        case GetBannerAction.UPDATE_BANNER_SUCCESS:
            return {
                ...state,
                // bannerList: action.payload,
                errorMessage: errorMessage.updateSuccess
            }
        case GetBannerAction.DELETE_BANNER_SUCCESS:
            return {
                ...state,
                bannerList: action.payload,
                errorMessage: errorMessage.deleteSuccess
            }
        case GetBannerAction.ADD_BANNER_FAIL:
        case GetBannerAction.UPDATE_BANNER_FAIL:
        case GetBannerAction.DELETE_BANNER_FAIL: {
            const serverErrorMessage = action.payload.errorMessage
            let errorMessage;
            console.log("🚀 ~ file: GetBannerReducer.js:170 ~ getBannerReducer ~ serverErrorMessage:", serverErrorMessage)
            if (serverErrorMessage.indexOf('E11000 duplicate key error') !== -1 && serverErrorMessage.indexOf('sort_1') !== -1) {
                errorMessage = 'duplicate sorting error'
            } else if (serverErrorMessage.indexOf('E11000 duplicate key error') !== -1) {
                errorMessage = 'duplicate key error'
            } else {
                errorMessage = serverErrorMessage
            }
            return {
                ...state,
                errorMessage: errorMessage
            }
        }
        case GetBannerAction.REQUEST_BANNER_SUCCESS:
            return {
                ...state,
                bannerList: action.payload.bannerList,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount,
                errorMessage: errorMessage.getFinish
            }
        case GetBannerAction.REQUEST_BANNER_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case GetBannerAction.SHOW_BANNER_LIST_SORTING: {
            const { key } = action.payload;
            return {
                ...state,
                bannerList: getSortedList(state.bannerList, key, state.sortingMap),
                sortingMap: {
                    ...state.sortingMap,
                    [key]: state.sortingMap[key] === 'asc' ? 'desc' : 'asc',
                },
                selectedPatchKey: key,
                currentPage: 1
            }
        }
        case GetBannerAction.GET_BANNER_SUCCESS:
            return {
                ...state,
                bannerList: action.payload,
                errorMessage: null
            }

        case GetBannerAction.GET_BANNER_FAIL:
        case GetBannerAction.REQUEST_POPULAR_BANNER_FAIL: {
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            }
        }
        case GetBannerAction.SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.payload.message
            }
        }
        case GetBannerAction.CHECK_BANNER_BEFORE_SUBMIT: {
            let submitState = {}
            const createType = action.payload.createType;
            if (createType === 'add_new') {
                submitState = { ...state.selectedBanner }
                console.log("🚀 ~ file: GetBannerReducer.js:230 ~ getBannerReducer ~ submitState:", submitState)
            } else {
                const selectedBanner = flattenObj({ ...state.selectedBanner })
                console.log("🚀 ~ file: GetBannerReducer.js:239 ~ getBannerReducer ~ selectedBanner:", selectedBanner)

                submitState = getSubmitObject(selectedBanner)
                console.log("🚀 ~ file: GetBannerReducer.js:237 ~ getBannerReducer ~ submitState:", submitState)

            }
            return {
                ...state,
                submitState: submitState,
                updateInitialState: null,
            }
        }
        case GetBannerAction.RESET_BANNER_SUBMIT_STATE: {
            return {
                ...state,
                submitState: null
            }
        }
        case GetBannerAction.UPDATE_BANNER:
        case GetBannerAction.DELETE_BANNER:
            return {
                ...state,
                errorMessage: null
            }
        case "RESET_STATE_DATA": {
            return {
                ...initialState,
                sortingMap: {
                    ...initialState.sortingMap
                },
                selectedBanner: {
                    ...initialState.selectedBanner
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

export default getBannerReducer

const getBannerList = state => state.getBannerReducer?.bannerList && [...state.getBannerReducer.bannerList]
const getCurrentPage = state => state.getBannerReducer?.currentPage

const getTotalPage = state => Math.ceil(state.getBannerReducer.totalCount / 10)
const getTotalCount = state => state.getBannerReducer.totalCount

const getSelectedPatchKey = state => state.getBannerReducer.selectedPatchKey
const getBannerErrorMessage = state => state.getBannerReducer.errorMessage
const getNextSorting = state => state.getBannerReducer.nextSorting

const getIsEditing = state => state.getBannerReducer.isEditing
const getShowUrl = state => state.getBannerReducer.showUrl

const getBannerShowList = createSelector(
    [getBannerList, getCurrentPage],
    (bannerList, currentPage) => {
        const start = (currentPage - 1) * 10;
        const end = start + 10
        return bannerList?.slice(start, end)
    })

const getSelectedBanner = state => state.getBannerReducer.selectedBanner && state.getBannerReducer.selectedBanner

const getSelectedBannerMedia = createSelector(
    [getSelectedBanner],
    (selectedBanner) => selectedBanner?.media
)

const getSelectedBannerPublishInfo = createSelector(
    [getSelectedBanner],
    (selectedBanner) => selectedBanner?.publishInfo
)

const getSelectedBannerPublishInfoSchedulePeriod = createSelector(
    [getSelectedBannerPublishInfo],
    (publishInfo) => publishInfo?.scheduledAt
)

const getStartDate = createSelector(
    [getSelectedBannerPublishInfoSchedulePeriod],
    (scheduledAt) => scheduledAt.startDate
)

const getEndDate = createSelector(
    [getSelectedBannerPublishInfoSchedulePeriod],
    (scheduledAt) => scheduledAt.endDate
)



const getSubmitState = (state) => state.getBannerReducer?.submitState && state.getBannerReducer.submitState

export {
    getBannerList,
    getCurrentPage,
    getTotalPage,
    getTotalCount,
    getSelectedPatchKey,
    getBannerErrorMessage,
    getNextSorting,
    getIsEditing,
    getShowUrl,
    getBannerShowList,
    getSelectedBanner,
    getSelectedBannerMedia,
    getSelectedBannerPublishInfo,
    getSelectedBannerPublishInfoSchedulePeriod,
    getStartDate,
    getEndDate,
    getSubmitState
}
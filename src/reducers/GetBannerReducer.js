import getSortedList from '@utils/getSortedList';
import *  as GetBannerAction from '../actions/GetBannerAction';
import { errorMessage } from './errorMessage';
import { createSelector } from 'reselect'

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
        media: {
            contentImagePath: '',
            homeImagePath: '',
            hyperlink: '',
        },
        publishInfo: {
            isEternal: false,
            isDisplay: false,
            isScheduled: false,
            scheduledAt: {
                startDate: '',
                endDate: ''
            }
        }
    },
    showUrl: '',
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
                },
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
                        }
                    }
                }
            }
        }
        case GetBannerAction.EDITING_BANNER:
            const banner = action.payload.data;
            console.log("🚀 ~ file: GetBannerReducer.js:81 ~ getBannerReducer ~ banner:", banner)
            return {
                ...state,
                selectedBanner: {
                    _id: banner._id,
                    name: banner.name,
                    serialNumber: banner.serialNumber,
                    sort: banner.sort,
                    remark: banner.remark,
                    status: banner.status,
                    eternal: banner.eternal,
                    display: banner.display,
                    media: {
                        homeImagePath: banner.homeImagePath,
                        contentImagePath: banner.contentImagePath,
                        hyperlink: banner.hyperlink,
                    },
                    publishInfo: {
                        isEternal: banner.eternal,
                        isDisplay: banner.display,
                        isScheduled: banner.startDate || banner.endDate ? true : false,
                        scheduledAt: {
                            startDate: banner.startDate,
                            endDate: banner.endDate
                        }
                    }
                },
                showUrl: banner.homeImagePath,
                isEditing: true,
            }
        case GetBannerAction.ADD_BANNER_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.addSuccess
            }
        case GetBannerAction.UPDATE_BANNER_SUCCESS:
            return {
                ...state,
                bannerList: action.payload,
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
            let errorMessage;
            if (action.payload.errorMessage.indexOf('E11000 duplicate key error') !== -1) {
                errorMessage = 'duplicate key error'
            } else {
                errorMessage = action.payload.errorMessage
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
            const start = (action.payload - 1) * 10;
            const end = start + 10
            return {
                ...state,
                currentPage: action.payload
            }
        case GetBannerAction.SHOW_BANNER_LIST_SORTING:
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
const getSelectedBannerMedia = state => state.getBannerReducer.selectedBanner?.media
const getSelectedBannerPublishInfo = state => state.getBannerReducer.selectedBanner?.publishInfo
const getSelectedBannerPublishInfoSchedulePeriod = state => state.getBannerReducer.selectedBanner?.publishInfo.scheduledAt




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
}
import { all, put, take, takeEvery } from 'redux-saga/effects';
import * as GetBannerAction from "../../actions/GetBannerAction";
import { instance } from "./AxiosInstance";
import { generateImageFile, getErrorMessage, getGetErrorMessage } from '../apiHelperFunc';
import dayjs from 'dayjs';
function toBackendFormData(requestData) {
    const formData = new FormData()


    requestData.name && formData.append('name', JSON.stringify(requestData.name))
    requestData.sort && formData.append('sort', JSON.stringify(requestData.sort))
    requestData.hyperlink && formData.append('hyperlink', JSON.stringify(requestData.hyperlink))
    requestData.remark && formData.append('remark', JSON.stringify(requestData.remark))
    requestData.display && formData.append('display', JSON.stringify(requestData.display))

    // if ('eternal' in requestData) {
    requestData.eternal && formData.append('eternal', JSON.stringify(requestData.eternal))
    if (!requestData.eternal) {
        requestData.startDate && formData.append('startDate', JSON.stringify(requestData.startDate))
        requestData.endDate && formData.append('endDate', JSON.stringify(requestData.endDate))
    }
    // }

    if ('media' in requestData) {
        Object.entries(requestData.media).forEach(([key, value]) => {
            if (key === 'contentImagePath') {
                if (value === null || value === '') {
                    formData.append(key, new Blob([''], { type: 'text/plain' }))
                    return
                }
                if (value.indexOf('data:image') !== -1) {
                    const imageFile = generateImageFile(value);
                    formData.append('contentImagePath', imageFile)
                } else {
                    formData.append('contentImagePath', new Blob([value], { type: 'text/plain' }))
                }
                return
            }
            if (key === 'homeImagePath') {
                if (value === null || value === '') {
                    formData.append(key, new Blob([''], { type: 'text/plain' }))
                    return
                }
                value !== null && formData.append('homeImagePath', new Blob([value], { type: 'text/plain' }))
                return
            }
        })
    }

    return formData
}


function* GetBannerList() {
    try {
        const startDate = new Date(`${dayjs().subtract(3, 'month').format('YYYY-MM-DD')} 00:00:00`).getTime()
        const endDate = new Date(`${dayjs().format('YYYY-MM-DD')} 23:59:59`).getTime()
        const startDateString = `startDate=${startDate}`
        const endDateString = `endDate=${new Date(endDate).getTime()}`

        const response = yield instance.get(`/banner/dashboard?pageNumber=1&limit=10&${startDateString}&${endDateString}`);
        const { currentPage, totalCount, data: bannerList } = yield response.data
        // const bannerList = toFrontendData(responseData)
        yield put({
            type: GetBannerAction.REQUEST_BANNER_SUCCESS,
            payload: {
                bannerList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            },
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetBannerAction.REQUEST_POPULAR_BANNER_FAIL)
    }
}

// function* GetBannerList(payload = 1) {
//     try {

//         const titleString = title ? `name=${title}&` : ''
//         const displayString = display ? `display=${display}&` : ''
//         const statusString = status ? `status=${status}&` : ''
//         const startDateString = createDate
//             ? createDate.startDate
//                 ? `startDate=${new Date(createDate.startDate).getTime()}&`
//                 : ''
//             : ''
//         const endDateString = createDate
//             ? createDate.endDate
//                 ? `endDate=${new Date(createDate.endDate).getTime()}&`
//                 : ''
//             : ''

//         const response = yield instance.get(`/banner/dashboard?pageNumber=1&limit=10000${startDateString}${endDateString}${titleString}${displayString}${statusString}`);

//         const { currentPage, totalCount, data: bannerList } = yield response.data


//         yield put({
//             type: GetBannerAction.REQUEST_BANNER_SUCCESS,
//             payload: {
//                 bannerList,
//                 totalCount: parseInt(totalCount),
//                 currentPage: parseInt(currentPage),
//                 nextSorting,
//             },
//         })
//     } catch (error) {
//         yield getGetErrorMessage(error, GetBannerAction.GET_BANNER_FAIL)
//     }
// }


function* SearchBanner(payload) {

    const { title, createDate } = payload
    try {

        const titleString = title ? `name=${title}&` : ''
        const startDateString = createDate
            ? createDate.startDate
                ? `startDate=${new Date(createDate.startDate).getTime()}&`
                : ''
            : ''
        const endDateString = createDate
            ? createDate.endDate
                ? `endDate=${new Date(createDate.endDate).getTime()}&`
                : ''
            : ''
        const response = yield instance.get(`/banner?limit=10000&pageNumber=1&${titleString}${startDateString}${endDateString}`);
        const { currentPage, totalCount, data: responseData } = yield response.data
        const bannerList = toFrontendData(responseData)
        // return
        yield put({
            type: GetBannerAction.REQUEST_BANNER_SUCCESS,
            payload: {
                bannerList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetBannerAction.GET_BANNER_FAIL)
    }
}

// POST
function* AddBanner(payload) {
    // {
    //     "name": "我是橫幅123",
    //     "sort": 8,
    //     "hyperlink": "人與人之間的超連結",
    //     "remark": "人最重要的是回憶，Banner也是",
    //     "eternal": true,
    //     "display": false,
    //     "homeImagePath": "Unknown Type: binary",
    //     "contentImagePath": "Unknown Type: binary",
    //     "startDate": "2023-07-01T09:45:59.090Z",
    //     "endDate": "2023-07-31T09:45:59.090Z"
    //   }
    const { data } = payload
    try {
        console.log("🚀 ~ file: GetBannerList.js:165 ~ function*AddBanner ~ data:", data)
        const requestData = toBackendFormData(data)
        console.log("🚀 ~ file: GetBannerList.js:165 ~ function*AddBanner ~ requestData:", requestData)
        // return
        const response = yield instance.post(`/banner`, requestData);
        const responseData = yield response.data;
        console.log("🚀 ~ file: GetBannerList.js:172 ~ function*AddBanner ~ responseData:", responseData)
        yield put({
            type: GetBannerAction.ADD_BANNER_SUCCESS,
            payload: null
        })
    } catch (error) {
        yield getErrorMessage(error, GetBannerAction.ADD_BANNER_FAIL)
    }
}

// PATCH
function* UpdateBanner(payload) {
    try {
        // {
        //     "name": "我是橫幅123",
        //     "sort": 8,
        //     "hyperlink": "人與人之間的超連結",
        //     "remark": "人最重要的是回憶，Banner也是",
        //     "eternal": true,
        //     "display": false,
        //     "homeImagePath": "Unknown Type: binary",
        //     "contentImagePath": "Unknown Type: binary",
        //     "startDate": "2023-07-01T09:45:59.090Z",
        //     "endDate": "2023-07-31T09:45:59.090Z"
        //   }
        const { _id, ...data } = payload;
        console.log("🚀 ~ file: GetBannerList.js:150 ~ function*UpdateBanner ~ data:", data)
        console.log("🚀 ~ file: GetBannerList.js:150 ~ function*UpdateBanner ~ _id:", _id)
        const requestData = toBackendFormData(data)
        // return
        const response = yield instance.patch(`/banner/${_id}`, requestData);
        // const bannerList = yield response.data;
        const { message } = yield response;
        yield put({
            type: GetBannerAction.UPDATE_BANNER_SUCCESS,
            payload: message
        })
    } catch (error) {
        yield getErrorMessage(error, GetBannerAction.UPDATE_BANNER_FAIL)
    }
}

// DELETE
function* DeleteBanner(payload) {
    try {
        const data = {
            'ids': payload
        }


        const response = yield instance.delete(`/banner/bunchDeleteByIds`, {
            "data": data
        });
        const responseData = yield response.data.data;
        yield put({
            type: GetBannerAction.DELETE_BANNER_SUCCESS,
            payload: responseData
        })
    } catch (error) {
        yield getErrorMessage(error, GetBannerAction.DELETE_BANNER_FAIL)
    }
}

function* watchGetBannerListSaga() {
    while (true) {
        const { payload } = yield take(GetBannerAction.REQUEST_BANNER)
        yield GetBannerList(payload)
    }
}

// function* watchGetPopularBannerListSaga() {
//     while (true) {
//         const { payload } = yield take(GetBannerAction.REQUEST_POPULAR_BANNER)
//         yield GetPopularBannerList(payload)
//     }
// }

function* watchAddBanner() {
    while (true) {
        const { payload } = yield take(GetBannerAction.ADD_BANNER)
        yield AddBanner(payload)
    }
}

function* watchSearchBanner() {
    while (true) {
        const { payload } = yield take(GetBannerAction.SEARCH_BANNER_LIST)
        yield SearchBanner(payload)
    }
}

function* watchUpdateBanner() {
    while (true) {
        const { payload } = yield take(GetBannerAction.EDIT_SAVING_BANNER)
        yield UpdateBanner(payload)
    }
}

function* watchDeleteBanner() {
    while (true) {
        const { payload } = yield take(GetBannerAction.BUNCH_DELETE_BANNER)
        yield DeleteBanner(payload)
    }
}

function* mySaga() {
    yield all([
        // watchGetPopularBannerListSaga(),
        watchSearchBanner(),
        watchGetBannerListSaga(),
        watchUpdateBanner(),
        watchAddBanner(),
        watchDeleteBanner(),
    ])
}

export default mySaga;
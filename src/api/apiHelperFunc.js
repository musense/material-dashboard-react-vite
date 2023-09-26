import { put } from 'redux-saga/effects';

export function toFrontendData(responseData) {
    if (Array.isArray(responseData)) {
        return responseData.map(item => ({
            _id: item._id,
            serialNumber: item.serialNumber,
            content: {
                title: item.title,
                content: item.content
            },
            sorting: {
                isNews: {
                    get: () => item.topSorting ? true : false,
                    newsSorting: item.topSorting,
                },
                isHot: {
                    get: () => item.popularSorting ? true : false,
                    hotSorting: item.popularSorting,
                },
                isRecommend: {
                    get: () => item.recommendSorting ? true : false,
                    recommendSorting: item.recommendSorting,
                },
            },
            tags: item.tags && item.tags.length > 0
                ? item.tags
                : [],
            categories: item.categories
                ? item.categories
                : null,
            webHeader: {
                headTitle: item.headTitle || '',
                headDescription: item.headDescription || '',
                headKeyword: item.headKeyword || '',
                manualUrl: item.manualUrl || '',
                customUrl: item.sitemapUrl || '',
            },
            media: {
                contentImagePath: item.contentImagePath || '',
                homeImagePath: item.homeImagePath || '',
                altText: item.altText || '',
            },
            pageView: item.pageView,
            hidden: item.hidden || false,
            createDate: item.createdAt,
            updateDate: item.updatedAt,
            sitemapUrl: item.sitemapUrl,
            isScheduled: item.scheduledAt ? true : false,
            scheduleTime: item.scheduledAt,
            status: item.status,
            publishDate: item.publishedAt,
            isPublished: item.publishedAt ? true : false,
        })

        )
    }
    else {
        return {
            _id: responseData._id,
            serialNumber: responseData.serialNumber,
            content: {
                title: responseData.title,
                content: responseData.content
            },
            sorting: {
                isNews: {
                    get: () => responseData.topSorting ? true : false,
                    newsSorting: responseData.topSorting,
                },
                isHot: {
                    get: () => responseData.popularSorting ? true : false,
                    hotSorting: responseData.popularSorting,
                },
                isRecommend: {
                    get: () => responseData.recommendSorting ? true : false,
                    recommendSorting: responseData.recommendSorting,
                },
            },
            tags: responseData.tags && responseData.tags.length > 0
                ? responseData.tags
                : [],
            categories: responseData.categories
                ? responseData.categories
                : null,
            webHeader: {
                headTitle: responseData.headTitle || '',
                headDescription: responseData.headDescription || '',
                headKeyword: responseData.headKeyword || '',
                manualUrl: responseData.manualUrl || '',
                customUrl: responseData.sitemapUrl || '',
            },
            media: {
                contentImagePath: responseData.contentImagePath || '',
                homeImagePath: responseData.homeImagePath || '',
                altText: responseData.altText || '',
            },
            pageView: responseData.pageView,
            hidden: responseData.hidden || false,
            createDate: responseData.createdAt,
            updateDate: responseData.updatedAt,
            sitemapUrl: responseData.sitemapUrl,
            isScheduled: responseData.scheduledAt ? true : false,
            scheduleTime: responseData.scheduledAt,
            status: responseData.status,
            publishDate: responseData.publishedAt,
            isPublished: responseData.publishedAt ? true : false,
        }
    }
}

export function toBackendFormData(requestData) {
    const formData = new FormData()

    'title' in requestData && formData.append('title', JSON.stringify(requestData.title))
    'content' in requestData && formData.append('content', JSON.stringify(requestData.content))

    if ('webHeader' in requestData) {
        Object.entries(requestData.webHeader).forEach(([key, value]) => {
            if (key === 'sitemapUrl') return;
            formData.append(key, JSON.stringify(value))
        })
    }
    if ('tags' in requestData) {
        const tagValue = requestData.tags === null ? '[]' : JSON.stringify(requestData.tags)
        formData.append('tags', tagValue)
    }
    if ('categories' in requestData) {
        const categoriesValue = requestData.categories.every(c => c === null) ? null : JSON.stringify(requestData.categories)
        formData.append('categories', categoriesValue)
    }
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
            formData.append('altText', JSON.stringify(value))
        })
    }
    if ('publishInfo' in requestData) {
        Object.entries(requestData.publishInfo).forEach(([key, value]) => {
            formData.append(key, JSON.stringify(value))
        })
    }
    if ('draft' in requestData) {
        formData.append('draft', JSON.stringify(requestData.draft))
    }

    return formData
}


export function generateImageFile(value) {
    const dataUrl = value;
    // Extract the base64-encoded data from the data URI
    const dataType = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ext = dataType.split('/')[1];
    const base64Data = dataUrl.split(',')[1];
    // Decode the base64 data to binary data
    const binaryData = atob(base64Data);
    // Convert the binary data to a Uint8Array
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }
    // Create a new Blob using the Uint8Array
    const imageBlob = new Blob([uint8Array]);
    // Create a new File using the Blob
    const imageFile = new File([imageBlob], `imageFile.${ext}`, { type: dataType, lastModified: Date.now() });
    return imageFile;
}

export function* getErrorMessage(error, patchType) {
    let errorMessage;
    if (!error) {
        yield put({
            type: patchType,
            payload: {
                errorMessage: 'Something went wrong!'
            }
        })
        return
    }
    if (error.response) {
        console.log("🚀 ~ file: apiHelperFunc.js:203 ~ function*getErrorMessage ~ error.response.data:", error.response.data)
        errorMessage = error.response.data.message || error.response.data.messages.join(',')
    } else {
        errorMessage = error.code
    }

    if (error.response) {
        yield put({
            type: patchType,
            payload: {
                errorMessage: errorMessage
            }

        })
    }
}

export function* getGetErrorMessage(error, patchType) {
    console.log("🚀 ~ file: apiHelperFunc.js:225 ~ function*getGetErrorMessage ~ error.message:", error.message)
    let errorMessage = error.message
    if (error?.message === 'Request failed with status code 440') {
        errorMessage = 'Please login first'
    }
    yield put({
        type: patchType,
        payload: {
            errorMessage: errorMessage
        }
    })
}


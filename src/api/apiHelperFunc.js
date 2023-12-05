import { put } from 'redux-saga/effects';
import { isArray } from '../utils/fnHelper';

export function toFrontendData(responseData) {

  const returnObj = (serverObj) => {
    return {
      _id: serverObj._id,
      serialNumber: serverObj.serialNumber,
      content: {
        title: serverObj.title,
        htmlContent: serverObj.htmlContent
      },
      sorting: {
        isNews: {
          get: () => serverObj.topSorting ? true : false,
          newsSorting: serverObj.topSorting,
        },
        isHot: {
          get: () => serverObj.popularSorting ? true : false,
          hotSorting: serverObj.popularSorting,
        },
        isRecommend: {
          get: () => serverObj.recommendSorting ? true : false,
          recommendSorting: serverObj.recommendSorting,
        },
      },
      tags: serverObj.tags && serverObj.tags.length > 0
        ? serverObj.tags
        : [],
      categories: serverObj.categories
        ? serverObj.categories
        : null,
      webHeader: {
        headTitle: serverObj.headTitle || '',
        headDescription: serverObj.headDescription || '',
        headKeyword: serverObj.headKeyword || '',
        manualUrl: serverObj.manualUrl || '',
        customUrl: serverObj.sitemapUrl || '',
      },
      media: {
        contentImagePath: serverObj.contentImagePath || '',
        homeImagePath: serverObj.homeImagePath || '',
        altText: serverObj.altText || '',
      },
      pageView: serverObj.pageView,
      hidden: serverObj.hidden || false,
      createDate: serverObj.createdAt,
      updateDate: serverObj.updatedAt,
      sitemapUrl: serverObj.sitemapUrl,
      isScheduled: serverObj.scheduledAt ? true : false,
      scheduleDate: serverObj.scheduledAt,
      status: serverObj.status,
      publishDate: serverObj.publishedAt,
      isPublished: serverObj.publishedAt ? true : false,
      draft: serverObj.draft
    };
  }

  if (isArray(responseData)) {
    return responseData.map(returnObj)
  }

  return returnObj(responseData)
}

export function toBackendFormData(
  requestData,
  { willBeDraft = false,
    serialNumber = null
  } = {}
) {
  const formData = new FormData()

  if (checkKeyExists(requestData, 'title')) {
    appendTextFormData('title', requestData.title);
  }
  if (checkKeyExists(requestData, 'htmlContent')) {
    appendTextFormData('htmlContent', requestData.htmlContent);
  }
  if (checkKeyExists(requestData, 'webHeader')) {
    Object.entries(requestData.webHeader).forEach(([key, value]) => {
      if (key === 'sitemapUrl') return;
      appendTextFormData(key, value);
    })
  }
  if (checkKeyExists(requestData, 'tags')) {
    const tagValue = requestData.tags === null
      ? []
      : requestData.tags
    appendTextFormData('tags', tagValue);
  }
  if (checkKeyExists(requestData, 'categories')) {
    const categoriesValue = requestData.categories.every(c => c === null)
      ? null
      : requestData.categories
    appendTextFormData('categories', categoriesValue);
  }
  if (checkKeyExists(requestData, 'media')) {
    Object.entries(requestData.media).forEach(([key, value]) => {
      if (key === 'contentImagePath') {
        if (!value) {
          appendBlobFormData('contentImagePath', '');
          return
        }
        if (value.includes('data:image')) {
          const imageFile = generateImageFile(value);
          appendFormData('contentImagePath', imageFile);
          return
        }
        appendBlobFormData('contentImagePath', value);
      }
      if (key === 'homeImagePath') {
        if (!value) return

        appendBlobFormData('homeImagePath', value);
      }
      if (key === 'altText') {
        appendTextFormData('altText', value);
      }
    })
  }



  if (willBeDraft === false) {
    if (serialNumber) {
      appendFormData('serialNumber', serialNumber);
      // appendTextFormData('draft', false);
    }
    appendPublishInfoToFormData(requestData);
  }
  appendTextFormData('draft', willBeDraft);


  return formData

  function appendPublishInfoToFormData(data) {
    if (checkKeyExists(data, 'publishInfo')) {
      // isScheduled is a client only property
      Object.entries(data.publishInfo).forEach(([key, value]) => {
        if (key === 'hidden') {
          appendTextFormData(key, value);
        }
        if (key === 'scheduledAt') {
          if (data.publishInfo['isScheduled'] === false) return;

          appendTextFormData(key, value);
        }
      });
    }
  }
  function checkKeyExists(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  function appendFormData(key, value) {
    formData.append(key, value);
  }
  function appendBlobFormData(key, value) {
    formData.append(key, new Blob([value], { type: 'text/plain' }));
  }
  function appendTextFormData(key, value) {
    formData.append(key, JSON.stringify(value));
  }
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


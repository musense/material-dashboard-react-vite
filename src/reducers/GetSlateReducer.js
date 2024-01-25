import * as GetSlateAction from './../actions/GetSlateAction';
import isFormModified from '../utils/recurseCheckAndDelete';
// import recurseCheckAndDelete from '../utils/recurseCheckAndDelete';
import generateErrorMessage from '../utils/generateErrorMessage';
import { createSelector } from 'reselect';

const initialState = {
  contentForm: {
    title: '',
    htmlContent: '',
  },
  detailForm: {
    webHeader: {
      headTitle: '',
      headDescription: '',
      headKeyword: '',
      manualUrl: '',
      sitemapUrl: '',
    },
    tags: null,
    categories: null,
    media: {
      contentImagePath: '',
      homeImagePath: '',
      altText: '',
    },
    publishInfo: {
      hidden: false,
      isScheduled: false,
      scheduledAt: ''
    }
  },
  serialNumber: null,
  status: '',
  showUrl: '',
  updateInitialState: null,
  submitState: null,
  isPreview: false,
  draft: false,
  previewID: null,
  errorMessage: null,
}

const getSlateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PREVIEW_FINISHED": {
      return {
        ...state,
        isPreview: false,
        previewID: null,
      }
    }
    case GetSlateAction.PREVIEW_EDITOR_SUCCESS: {
      return {
        ...state,
        previewID: action.payload.previewID,
        errorMessage: action.payload.errorMessage,
      }
    }
    case GetSlateAction.PREVIEW_EDITOR_FAIL: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      }
    }
    case GetSlateAction.SET_DEFAULT_FORM_VALUE: {
      const {
        ...props
      } = action.payload.allProps
      const contentForm = {
        title: props.content.title,
        htmlContent: props.content.htmlContent || initialState.contentForm.htmlContent,
      }
      const detailForm = {
        webHeader: {
          headTitle: props.webHeader.headTitle,
          headDescription: props.webHeader.headDescription,
          headKeyword: props.webHeader.headKeyword,
          manualUrl: props.webHeader.manualUrl,
          sitemapUrl: props.sitemapUrl,
        },
        tags: props.tags || initialState.detailForm.tags,
        categories: props.categories || initialState.detailForm.categories,
        media: {
          contentImagePath: props.media.contentImagePath,
          homeImagePath: props.media.homeImagePath,
          altText: props.media.altText,
        },
        publishInfo: {
          hidden: props.hidden,
          isScheduled: props.isScheduled,
          scheduledAt: props.scheduleDate
        }
      }

      return {
        ...state,
        contentForm: { ...contentForm },
        detailForm: { ...detailForm },
        updateInitialState: {
          contentForm: { ...contentForm },
          detailForm: { ...detailForm },
        },
        showUrl: detailForm.media.contentImagePath,
        status: props.status,
        draft: props.draft,
        serialNumber: props.serialNumber,
      }
    }
    case GetSlateAction.RESET_FORM_VALUE: {
      return {
        ...initialState,
      }
    }
    case GetSlateAction.SET_SHOW_URL: {
      return {
        ...state,
        showUrl: action.payload.showUrl,
      }
    }
    case GetSlateAction.SET_PROPERTY: {
      const { form, info, property, value = null } = action.payload.allProps
      return info ? {
        ...state,
        [form]: {
          ...state[form],
          [info]: {
            ...state[form][info],
            [property]: value,
          }
        }
      } : {
        ...state,
        [form]: {
          ...state[form],
          [property]: value,
        }
      }
    }
    case GetSlateAction.CHECK_BEFORE_SUBMIT: {
      const isPreview = action.payload.isPreview
      const submitState = JSON.parse(JSON.stringify({ ...state.contentForm, ...state.detailForm }))
      console.log("🚀 ~ file: GetSlateReducer.js:141 ~ getSlateReducer ~ submitState:", submitState)
      let errorMessage,
        cachedInitialState,
        trimmedState

      if (action.payload.errorMessage) {
        errorMessage = action.payload.errorMessage
      } else {
        errorMessage = generateErrorMessage(state, initialState)
      }
      if (errorMessage) {
        return {
          ...state,
          errorMessage: errorMessage
        }
      } else {
        if (isPreview) {
          trimmedState = { ...submitState }
          return {
            ...state,
            submitState: trimmedState,
            isPreview: isPreview,
            errorMessage: 'check__OK!'
          }
        }
        // cloneDeep
        const createType = action.payload.createType

        if (createType === "add_new") {
          cachedInitialState = JSON.parse(JSON.stringify({ ...initialState.contentForm, ...initialState.detailForm }))
          trimmedState = isFormModified(cachedInitialState, submitState)
        } else if (createType === "update") {
          cachedInitialState = JSON.parse(JSON.stringify({ ...state.updateInitialState.contentForm, ...state.updateInitialState.detailForm }))
          trimmedState = isFormModified(cachedInitialState, submitState)
          errorMessage = generateErrorMessage(trimmedState)
        } else {
          throw new Error('invalid createType')
        }
      }
      // return
      return {
        ...state,
        submitState: trimmedState,
        isPreview: false,
        errorMessage: errorMessage || 'check__OK!'
      }
    }
    case "SET_ERROR_MESSAGE": {
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    }
    case "RESET_STATE_DATA": {
      return {
        ...initialState,
        errorMessage: '--reset-error-message'
      }
    }
    default:
      return { ...state }
  }

}

export default getSlateReducer

const pageSiteUrl = import.meta.env.VITE_PAGE_URL

const getManualUrl = state => state?.getSlateReducer.detailForm.webHeader.manualUrl

const getTempSitemapUrl = createSelector(
  [getManualUrl],
  (manualUrl) => {
    if (!manualUrl) return ''
    return `${pageSiteUrl}/p_${manualUrl}.html`
  }
)
const getSerialNumber = state => state.getSlateReducer.serialNumber
const getSubmitState = state => state.getSlateReducer.submitState

const getSubmitForm = createSelector(
  [getSubmitState, getSerialNumber],
  (submitState, serialNumber) => {
    return {
      ...submitState,
      serialNumber: serialNumber
    }
  }
)

const getContentForm = state => state.getSlateReducer.contentForm

const getWebHeader = state => state.getSlateReducer.detailForm.webHeader
const getTags = state => state.getSlateReducer.detailForm.tags
const getCategories = state => state.getSlateReducer.detailForm.categories
const getMedia = state => state.getSlateReducer.detailForm.media
const getPublishInfo = state => state.getSlateReducer.detailForm.publishInfo

const getSlateForm = createSelector(
  [getContentForm, getWebHeader, getTags, getCategories, getMedia, getPublishInfo],
  (contentForm, webHeader, tags, categories, media, publishInfo) => {

    return {
      contentForm,
      detailForm: {
        webHeader,
        tags,
        categories,
        media,
        publishInfo
      }
    }
  }
)
console.log("🚀 ~ file: GetSlateReducer.js:264 ~ getSlateForm:", getSlateForm)

const getUpdateInitialForm = state => ({
  ...(state.getSlateReducer.updateInitialState && { contentForm: state.getSlateReducer.updateInitialState.contentForm }),
  ...(state.getSlateReducer.updateInitialState && { detailForm: state.getSlateReducer.updateInitialState.detailForm })
})

const getEditorUpdated = createSelector(
  [getSlateForm, getUpdateInitialForm, (state, createType) => (createType)],
  (slateForm, updateInitialForm, createType) => {
    if (createType === '') return undefined
    const cachedInitialState = createType === 'add_new'
      ? { contentForm: initialState.contentForm, detailForm: initialState.detailForm }
      : { ...updateInitialForm }
    const isModified = isFormModified(cachedInitialState, slateForm)
    // Object.keys(trimmedState).forEach(key => {
    //   if (key === 'publishInfo') {
    //     delete trimmedState.publishInfo
    //   }
    // })
    console.log("🚀 ~ file: GetSlateReducer.js:222 ~ isModified:", isModified)

    return isModified
  }
)

const getIsPreview = state => state.getSlateReducer.isPreview
const getPreviewID = state => state.getSlateReducer.previewID

const getSlateErrorMessage = state => state.getSlateReducer.errorMessage
export {
  getSubmitState,
  getSubmitForm,
  getSlateForm,
  getEditorUpdated,
  getTempSitemapUrl,
  getIsPreview,
  getPreviewID,
  getSlateErrorMessage,
  getContentForm,
  getWebHeader,
  getTags,
  getCategories,
  getMedia,
  getPublishInfo,
}
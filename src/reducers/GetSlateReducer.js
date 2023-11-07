import * as GetSlateAction from './../actions/GetSlateAction';
import recurseCheckAndDelete from '../utils/recurseCheckAndDelete';
import generateErrorMessage from '../utils/generateErrorMessage';
import { createSelector } from 'reselect';

const initialState = {
  contentForm: {
    title: '',
    content: [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ],
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
    // initialValue須給array
    categories: [],
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
  showUrl: '',
  updateInitialState: null,
  submitState: null,
  isPreview: false,
  isDraft: false,
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
        title: props.content.title || '',
        content: props.content.content || initialState.contentForm.content,
      }
      const detailForm = {
        webHeader: {
          headTitle: props.webHeader.headTitle || '',
          headDescription: props.webHeader.headDescription || '',
          headKeyword: props.webHeader.headKeyword || '',
          manualUrl: '',
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
          scheduledAt: props.scheduleTime
        }
      }

      return {
        ...state,
        contentForm: JSON.parse(JSON.stringify(contentForm)),
        detailForm: JSON.parse(JSON.stringify(detailForm)),
        updateInitialState: {
          contentForm: JSON.parse(JSON.stringify(contentForm)),
          detailForm: JSON.parse(JSON.stringify(detailForm)),
        },
        showUrl: detailForm.media.contentImagePath
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
          trimmedState = recurseCheckAndDelete(submitState, cachedInitialState, createType)
        } else if (createType === "update") {
          cachedInitialState = JSON.parse(JSON.stringify({ ...state.updateInitialState.contentForm, ...state.updateInitialState.detailForm }))
          trimmedState = recurseCheckAndDelete(submitState, cachedInitialState, createType)
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

const getEditorForm = state => ({
  ...state.getSlateReducer.contentForm,
  ...state.getSlateReducer.detailForm,
})

const getUpdateInitialForm = state => ({
  ...(state.getSlateReducer.updateInitialState && state.getSlateReducer.updateInitialState.contentForm),
  ...(state.getSlateReducer.updateInitialState && state.getSlateReducer.updateInitialState.detailForm)
})

const getEditorUpdated = createSelector(
  [getEditorForm, getUpdateInitialForm, (state, createType) => (createType)],
  (form, updateInitialForm, createType) => {
    if (createType === '') return false
    // console.log("🚀 ----------------------------------------------🚀")
    // console.log("🚀 ~ file: GetSlateReducer.js:222 ~ form:", form)
    // console.log("🚀 ~ file: GetSlateReducer.js:222 ~ updateInitialForm:", updateInitialForm)
    // console.log("🚀 ~ file: GetSlateReducer.js:222 ~ createType:", createType)
    // console.log("🚀 ----------------------------------------------------------🚀")
    const cachedInitialState = createType === 'add_new'
      ? { ...initialState.contentForm, ...initialState.detailForm }
      : { ...updateInitialForm }
    const trimmedState = recurseCheckAndDelete(form, cachedInitialState, createType)
    // console.log("🚀 --------------------------------------------------------------🚀")
    // console.log("🚀 ~ file: GetSlateReducer.js:222 ~ trimmedState:", trimmedState)
    console.log("🚀 ~ file: GetSlateReducer.js:222 ~ Object.keys(trimmedState).length:", Object.keys(trimmedState).length)
    // console.log("🚀 --------------------------------------------------------------🚀")

    return Object.keys(trimmedState).length > 0 ? true : false
  }
)


export {
  getEditorUpdated
}
import { combineReducers } from "redux";
import getTagsReducer from './GetTagsReducer'
import getEditorReducer from './GetEditorReducer'
import getEditorUrlReducer from './GetEditorUrlReducer'
import getEditorTypeReducer from './GetEditorTypeReducer'
import getUserReducer from './GetUserReducer'
import getClassReducer from './GetClassReducer'
import getDialogReducer from './GetDialogReducer'
import getSlateReducer from './GetSlateReducer'
import getBannerReducer from './GetBannerReducer'
import getSearchReducer from './GetSearchReducer'
import getConfigReducer from './GetConfigReducer'

const rootReducer = combineReducers({
  getTagsReducer: getTagsReducer,
  getEditorReducer: getEditorReducer,
  getEditorTypeReducer: getEditorTypeReducer,
  getUserReducer: getUserReducer,
  getClassReducer: getClassReducer,
  getDialogReducer: getDialogReducer,
  getSlateReducer: getSlateReducer,
  getBannerReducer: getBannerReducer,
  getSearchReducer: getSearchReducer,
  getConfigReducer: getConfigReducer,
  getEditorUrlReducer: getEditorUrlReducer,
});

export default rootReducer;
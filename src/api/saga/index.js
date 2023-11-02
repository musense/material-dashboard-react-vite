import { all } from "redux-saga/effects";
import GetEditorList from "./GetEditorList";
import GetEditorUrl from "./GetEditorUrl";
import GetEditorTypeList from "./GetEditorTypeList";
import GetTagList from "./GetTagList";
import GetUserList from "./GetUserList";
import GetClassList from "./GetClassList";
import GetBannerList from "./GetBannerList";

function* rootSaga() {
  yield all([
    GetTagList(),
    GetEditorList(),
    GetEditorUrl(),
    GetEditorTypeList(),
    GetUserList(),
    GetClassList(),
    GetBannerList(),
  ]);
}

export default rootSaga;

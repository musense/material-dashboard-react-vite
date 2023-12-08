import { getModalData } from "../../../reducers/GetDialogReducer";

export default function useModalData() {
  const modalData = getModalData();
  console.log("🚀 ~ file: useModalData.js:5 ~ useModalData ~ modalData:", modalData)
  return modalData
}

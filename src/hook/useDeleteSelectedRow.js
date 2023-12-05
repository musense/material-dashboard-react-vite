import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as GetDialogAction from '@actions/GetDialogAction';

export default function useDeleteSelectedRow(messageDialogReturnValue, {
  deleteType
}) {
  console.log("🚀 ~ file: useDeleteSelectedRow.js:6 ~ useDeleteSelectedRow ~ messageDialogReturnValue:", messageDialogReturnValue)

  const dispatch = useDispatch();

  useEffect(() => {
    if (!messageDialogReturnValue) return;
    const { id, isDraft } = messageDialogReturnValue
    console.log("🚀 ~ file: useDeleteSelectedRow.js:21 ~ useEffect ~ isDraft:", isDraft)
    dispatch({
      type: deleteType,
      payload: {
        id: isDraft ? id : [id],
        draft: isDraft
      }
    });
    dispatch({
      type: GetDialogAction.RESET_MODAL_STATUS
    });
  }, [messageDialogReturnValue, deleteType, dispatch]);
}

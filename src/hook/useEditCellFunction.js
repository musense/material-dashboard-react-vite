import { useCallback } from "react";
import { useDispatch } from 'react-redux';
import * as GetDialogAction from '@actions/GetDialogAction';

export default function useEditCellFunction({
  draft,
  handleOpenDialog,
  onDelete: {
    id,
    name,
  },
  onEdit: {
    editType,
    editData,
    callback = null
  },

}) {
  const dispatch = useDispatch();
  const onCopy = useCallback((sitemapUrl, result) => {
    dispatch({
      type: GetDialogAction.COPY_SITEMAP,
      payload: {
        contentData: result ? sitemapUrl : '',
        message: result ? 'copy sitemapUrl successfully' : 'copy sitemapUrl failed',
      },
    });
    handleOpenDialog && handleOpenDialog();
  }, [handleOpenDialog, dispatch]);

  const onDelete = useCallback(() => {
    console.log("🚀 ~ file: useEditCellFunction.js:36 ~ onDelete ~ id:", id)
    console.log("🚀 ~ file: useEditCellFunction.js:36 ~ onDelete ~ name:", name)
    dispatch({
      type: GetDialogAction.ON_DELETE_EDITOR,
      payload: {
        data: { id, draft },
        contentData: name,
        message: 'delete one',
        confirm: true,
      },
    });
    handleOpenDialog && handleOpenDialog()
  }, [handleOpenDialog, dispatch, id, name, draft])

  const onEdit = useCallback(() => {
    console.log("🚀 ~ file: useEditCellFunction.js:50 ~ onEdit ~ editData:", editData)
    dispatch({
      type: editType,
      payload: {
        data: editData,
        draft: draft
      },
    });
    callback && callback()
  }, [dispatch, callback, editType, editData, draft])

  return {
    onCopy,
    onDelete,
    onEdit,
  }
}

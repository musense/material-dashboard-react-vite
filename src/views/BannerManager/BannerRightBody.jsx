import React, { useState } from "react";
import { useSelector } from 'react-redux';
import * as GetBannerAction from '../../actions/GetBannerAction';
import CardBody from '@components/Card/CardBody.jsx';
import BannerSearchForm from './BannerSearchForm';
import MessageDialog from '../../components/Modal/MessageDialog';
import RowHeader from '@components/RowHeader/RowHeader';
import RowBody from './../../components/RowBody/RowBody';
// import RowBody from './RowBody';
import BannerButtonList from './BannerButtonList';
import useModal from "../../hook/useModal";
import useModalResult from "../../hook/useModalResult";
import useDeleteSelectedRow from "@hook/useDeleteSelectedRow";
import getErrorMessage from "@utils/getErrorMessage";
import {
  getBannerErrorMessage,
  getBannerShowList,
  getCurrentPage,
  getSelectedPatchKey,
  getTotalCount,
  getTotalPage
} from "@reducers/GetBannerReducer";
import MediaModal from "@components/Modal/MediaModal";
import { useCallback } from "react";
import { getSelectedBanner } from "../../reducers/GetBannerReducer";

const InnerRowHeader = React.memo(RowHeader)
// const InnerRowBody = React.memo(RowBody)

const InnerBannerButtonList = React.memo(BannerButtonList);
const InnerBannerSearchForm = React.memo(BannerSearchForm);

export default function BannerRightBody({ headerMap }) {

  const selectedBanner = useSelector(getSelectedBanner)

  const selectedPatchKey = useSelector(getSelectedPatchKey);
  const currentPage = useSelector(getCurrentPage);
  const showList = useSelector(getBannerShowList)
  const totalPage = useSelector(getTotalPage);
  const totalCount = useSelector(getTotalCount);
  const serverMessage = useSelector(getBannerErrorMessage);

  console.log("🚀 ~ file: BannerRightBody.jsx:29 ~ BannerRightBody ~ showList:", showList)

  const {
    message: dialogMessage,
    contentData,
    data,
    confirm,
    messageDialogReturnValue
  } = useSelector((state) => state.getDialogReducer);

  useDeleteSelectedRow(messageDialogReturnValue, {
    deleteType: GetBannerAction.BUNCH_DELETE_BANNER
  });

  const errorMessage = getErrorMessage(dialogMessage, serverMessage)

  const {
    title,
    content,
    success
  } = useModalResult({
    message: errorMessage,
    name: 'Banner',
    data: contentData,
  })

  const {
    open,
    handleOpen,
    handleClose
  } = useModal()

  const {
    open: openDialog,
    handleClose: handleCloseDialog
  } = useModal(title)

  const [mediaInfo, setMediaInfo] = useState(null);

  const onPreviewMedia = useCallback((e, item) => {
    e.stopPropagation();
    handleOpen();
    setMediaInfo(item);
  }, [handleOpen, setMediaInfo])

  return <CardBody>
    <InnerBannerSearchForm />
    <InnerBannerButtonList
      currentPage={currentPage}
      totalPage={totalPage}
      totalCount={totalCount}
    />
    <form className='view-list-form'>
      <InnerRowHeader
        headerConfig={headerMap}
        selectedPatchKey={selectedPatchKey} />
      <RowBody
        headerConfig={headerMap}
        showList={showList}
        handleOpen={handleOpen}
        setMediaInfo={onPreviewMedia}
        className={'Banner'}
        selectedId={selectedBanner._id}
      />

    </form>
    <MediaModal
      open={open}
      handleClose={handleClose}
      mediaInfo={mediaInfo}
    />
    <MessageDialog
      dialogTitle={title}
      dialogContent={content}
      success={success}
      open={openDialog}
      setClose={handleCloseDialog}
      confirm={confirm}
      data={data}
    />
  </CardBody>;
}
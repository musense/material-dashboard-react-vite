import React from 'react';

import { useSelector } from 'react-redux';
import * as GetClassAction from '@actions/GetClassAction';

import Card from '@components/Card/Card.jsx';
import CardBody from '@components/Card/CardBody.jsx';
import GridContainer from '@components/Grid/GridContainer.jsx';
import GridItem from '@components/Grid/GridItem.jsx';
import EditorClassButtonList from './EditorClassButtonList';
import EditorHeader from './EditorHeader';

import MessageDialog from '@components/Modal/MessageDialog';
import RowHeader from '../EditorList/RowHeader';
// import RowBody from './RowBody';
import RowBody from './../../components/RowBody/Rowbody';
import useModal from '../../hook/useModal';
import useModalResult from '../../hook/useModalResult';
import useDeleteSelectedRow from '@hook/useDeleteSelectedRow';
import getErrorMessage from '@utils/getErrorMessage';
import { getClassErrorMessage, getClassShowList, getCurrentPage, getSelectedPatchKey, getTotalCount, getTotalPage } from '@reducers/GetClassReducer';
import { getMaxSizeClassName } from '../../reducers/GetConfigReducer';

export default function EditorRightWrapper({ headerMap }) {

    const maxSize = useSelector(getMaxSizeClassName);
    const id = useSelector((state) => state.getClassReducer.editorClass.id);
    const currentPage = useSelector(getCurrentPage);
    const showList = useSelector(getClassShowList);
    const totalPage = useSelector(getTotalPage);
    const totalCount = useSelector(getTotalCount);
    const selectedPatchKey = useSelector(getSelectedPatchKey);
    const serverMessage = useSelector(getClassErrorMessage);

    console.log("🚀 ~ file: EditorRightWrapper.jsx:33 ~ EditorRightWrapper ~ showList:", showList)

    const {
        message: dialogMessage,
        contentData,
        data,
        confirm,
        messageDialogReturnValue
    } = useSelector((state) => state.getDialogReducer);

    useDeleteSelectedRow(messageDialogReturnValue, {
        deleteType: GetClassAction.BUNCH_DELETE_CLASS
    });

    const errorMessage = getErrorMessage(dialogMessage, serverMessage)

    const {
        title,
        content,
        success
    } = useModalResult({
        message: errorMessage,
        name: '分類',
        data: contentData
    })

    const {
        open: openDialog,
        handleOpen: handleOpenDialog,
        handleClose: handleCloseDialog
    } = useModal(title)

    return (
        <div className={`right-wrapper ${maxSize}`}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <EditorHeader />
                        <CardBody>
                            <EditorClassButtonList
                                currentPage={currentPage}
                                totalPage={totalPage}
                                totalCount={totalCount}
                            />
                            <form className='view-list-form'>
                                <RowHeader
                                    headerConfig={headerMap}
                                    selectedPatchKey={selectedPatchKey} />
                                <RowBody
                                    headerConfig={headerMap}
                                    showList={showList}
                                    handleOpenDialog={handleOpenDialog}
                                    className="editor-class"
                                    selectedId={id}
                                />
                            </form>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <MessageDialog
                dialogTitle={title}
                dialogContent={content}
                success={success}
                open={openDialog}
                setClose={handleCloseDialog}
                confirm={confirm}
                data={data}
            />
        </div>
    );
}



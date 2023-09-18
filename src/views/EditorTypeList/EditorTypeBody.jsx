
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CardBody from '@components/Card/CardBody.jsx';
import { useSelector } from 'react-redux';

// import RowBody from './RowBody';
import MessageDialog from '../../components/Modal/MessageDialog';
import useModalResult from '../../hook/useModalResult';
import useModal from '../../hook/useModal';

export default function EditorListBody({ headerMap }) {

    // const showList = useSelector(getEditorShowList);

    // const {
    //     open: openDialog,
    //     handleOpen: handleOpenDialog,
    //     handleClose: handleCloseDialog
    // } = useModal(title)

    return <CardBody>
        {/* <MessageDialog
            dialogTitle={title}
            dialogContent={content}
            success={success}
            open={openDialog}
            setClose={handleCloseDialog}
            confirm={confirm}
            data={data}
        /> */}
    </CardBody>;
}


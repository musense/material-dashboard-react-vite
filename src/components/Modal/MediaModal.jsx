import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Iframe from "react-iframe";
import CloseIcon from "../Icon/CloseIcon";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: 'transparent',
    border: 'unset',
    boxShadow: 'unset',
    p: 0,
};

const imageDivStyle = {
    width: "auto",
    height: "500px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}
const imageStyle = {
    width: 'auto',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
}

export default function MediaModal({ open, handleClose, mediaInfo }) {

    const onClose = useCallback((event, reason) => {
        if (reason === 'backdropClick') return
        handleClose()
    }, [handleClose])
    const [isImage, setIsImage] = useState(true);
    const [iframeUrl, setIframeUrl] = useState(undefined);


    useEffect(() => {
        if (!mediaInfo) return
        if (mediaInfo.media.contentImagePath.indexOf('youtube') !== -1) {
            // const src = getProperty('src');
            setIsImage(false)
            setIframeUrl(mediaInfo.media.contentImagePath)
        } else {
            setIsImage(true)
            setIframeUrl(mediaInfo.media.contentImagePath)
        }

    }, [mediaInfo]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <CloseIcon
                    color="white"
                    onClose={onClose}
                    distance={-30} />
                {isImage ?
                    <div style={imageDivStyle}>
                        <img src={iframeUrl} style={imageStyle} />
                    </div>
                    :
                    <Iframe
                        url={iframeUrl}
                        loading='lazy'
                        width="888px"
                        height="500PX"
                        display="block"
                        position="relative"
                    />}
            </Box>
        </Modal >
    )
}

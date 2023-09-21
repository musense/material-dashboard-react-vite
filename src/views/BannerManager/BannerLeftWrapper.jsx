import React, { useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as GetBannerAction from '@actions/GetBannerAction';
import Card from '@components/Card/Card.jsx';
import CardBody from '@components/Card/CardBody.jsx';
import CardHeader from '@components/Card/CardHeader.jsx';
import usePressEnterEventHandler from '@hook/usePressEnterEventHandler';
import useModalResult from '@hook/useModalResult';

import MessageDialog from '@components/Modal/MessageDialog';
import useModal from '@hook/useModal';
import Media from '@components/Media/Media';
import FormButtonList from '@components/FormButtonList/FormButtonList';
import BannerPublishInfo from './BannerPublishInfo';
import MyScrollbar from '@components/MyScrollbar/MyScrollbar';
import {
    getBannerErrorMessage,
    getIsEditing,
    getSelectedBanner,
    getSelectedBannerMedia,
    getSelectedBannerPublishInfo,
    getShowUrl,
    getSubmitState
} from '@reducers/GetBannerReducer';
import SingleBannerStatusSelector from '@components/Select/SingleBannerStatusSelect'
import { Checkbox, FormControlLabel } from '@mui/material';
import { getEndDate, getStartDate } from '../../reducers/GetBannerReducer';

export default function BannerLeftWrapper() {

    const formRef = useRef(null);
    const dispatch = useDispatch();

    const selectedBanner = useSelector(getSelectedBanner)
    const submitState = useSelector(getSubmitState)
    console.log("🚀 ~ file: BannerLeftWrapper.jsx:35 ~ BannerLeftWrapper ~ selectedBanner:", selectedBanner)
    const selectedBannerMedia = useSelector(getSelectedBannerMedia)
    const selectedBannerPublishInfo = useSelector(getSelectedBannerPublishInfo)

    const startDate = useSelector(getStartDate)
    const endDate = useSelector(getEndDate)

    const isEditing = useSelector(getIsEditing);
    const showUrl = useSelector(getShowUrl);
    const serverMessage = useSelector(getBannerErrorMessage);

    const onAddNewEditor = useCallback(() => {

        let tempData = {}
        console.log("🚀 ~ file: BannerLeftWrapper.jsx:69 ~ onAddNewEditor ~ isEditing:", isEditing)
        if (isEditing === true) {
            // 編輯
            console.log("🚀 ~ file: BannerLeftWrapper.jsx:73 ~ onAddNewEditor ~ submitState:", submitState)

            for (const key in submitState) {
                if (key === 'contentImagePath' || key === 'homeImagePath') {
                    tempData = {
                        ...tempData,
                        media: {
                            ...tempData.media,
                            [key]: submitState[key]
                        }
                    }
                } else {
                    tempData = {
                        ...tempData,
                        [key]: submitState[key]
                    }
                }
            }
            console.log("🚀 ~ file: BannerLeftWrapper.jsx:73 ~ onAddNewEditor ~ tempData:", tempData)
            // return
            dispatch({
                type: GetBannerAction.EDIT_SAVING_BANNER,
                payload: {
                    ...tempData,
                    _id: selectedBanner._id
                }
            });
        } else {
            // 新增

            console.log("🚀 ~ file: BannerLeftWrapper.jsx:94 ~ onAddNewEditor ~ submitState:", submitState)
            if (!('name' in submitState)) {
                dispatch({
                    type: GetBannerAction.SET_ERROR_MESSAGE,
                    payload: {
                        message: 'please add Banner name',
                    }
                })
                return
            }
            if (!('contentImagePath' in submitState.media)) {
                dispatch({
                    type: GetBannerAction.SET_ERROR_MESSAGE,
                    payload: {
                        message: 'please add Banner image',
                    }
                })
                return
            }

            tempData = {
                name: submitState?.name,
                // sort: submitState?.sort,
                hyperlink: submitState?.hyperlink,
                remark: submitState?.remark,

                eternal: submitState?.publishInfo.eternal,
                display: submitState?.publishInfo.display,

                startDate: new Date(submitState?.publishInfo.scheduledAt.startDate).getTime(),
                endDate: new Date(submitState?.publishInfo.scheduledAt.endDate).getTime(),
                media: {
                    homeImagePath: submitState?.media.homeImagePath,
                    contentImagePath: submitState?.media.contentImagePath,
                }

            }


            if ('sort' in submitState) {
                if (typeof parseInt(selectedBanner.sort) !== 'number') {
                    dispatch({
                        type: GetBannerAction.SET_ERROR_MESSAGE,
                        payload: {
                            message: 'sorting should be typeof number',
                        }
                    })
                    return
                }
                if (parseInt(selectedBanner.sort) < 1) {
                    dispatch({
                        type: GetBannerAction.SET_ERROR_MESSAGE,
                        payload: {
                            message: 'sorting should be equal or greater than 1',
                        }
                    })
                    return
                }
                tempData = {
                    ...tempData,
                    sort: submitState?.sort
                }
            }

            console.log("🚀 ~ file: BannerLeftWrapper.jsx:94 ~ onAddNewEditor ~ tempData:", tempData)
            dispatch({
                type: GetBannerAction.ADD_BANNER,
                payload: {
                    data: tempData
                },
            });
        }
    }, [dispatch, isEditing, selectedBanner._id, selectedBanner.sort, submitState])

    useEffect(() => {
        if (submitState !== null) {
            onAddNewEditor()
            dispatch({
                type: GetBannerAction.RESET_BANNER_SUBMIT_STATE
            })
        }
    }, [dispatch, onAddNewEditor, submitState]);

    usePressEnterEventHandler(formRef)
    const {
        title,
        content,
        success
    } = useModalResult({
        message: serverMessage,
        name: 'Banner'
    })

    const {
        open,
        handleClose
    } = useModal(title)


    const onReset = useCallback(() => {

        dispatch({
            type: GetBannerAction.CANCEL_EDITING_BANNER
        })
    }, [dispatch])

    const onPropertyChange = useCallback((value, property, info = null, detail = null) => {
        dispatch({
            type: GetBannerAction.SET_BANNER_PROPERTY,
            payload: {
                allProps: {
                    property: property,
                    value: value,
                    info: info,
                    detail: detail
                }
            }
        })
    }, [dispatch])

    const onShowUrlChange = useCallback((value) => {
        dispatch({
            type: GetBannerAction.SET_SHOW_URL,
            payload: {
                showUrl: value
            }
        })
    }, [dispatch])

    const handleModalClose = useCallback(() => {
        handleClose()
        // onReset()
    }, [onReset, handleClose])

    const statusStyle = {
        display: 'block',
        fontWeight: 'bold',
        fontSize: '24px',
        color: selectedBanner.status === '進行中'
            ? '#009900'
            : selectedBanner.status === '已排程'
                ? '#000099'
                : selectedBanner.status === '下架'
                    ? '#990000'
                    : '#000000',
        textAlign: 'center',
        lineHeight: '60px',
    }
    const statusString = selectedBanner.status === '下架' ? '已下架' : selectedBanner.status
    const checkboxString = selectedBanner.status === '下架' ? "上架" : "下架"
    return <div className={'left-wrapper'}>
        <Card>
            <CardHeader color="primary">
                <h4>{isEditing ? '編輯' : '新增'}</h4>
            </CardHeader>
            <CardBody>
                {/* <MyScrollbar component='div' height='739px'> */}
                <MyScrollbar component='div' height='calc(100vh - 220px)'>
                    <form ref={formRef} name='class-form' className='banner-submit-form'>
                        <div>
                            <input type="hidden" name='_id' value={selectedBanner._id} />
                        </div>
                        {/* <div className={'banner-status'}>
                            <span style={statusStyle}>{statusString}</span>

                            {selectedBanner.status !== '' && <FormControlLabel control={<Checkbox />} label={checkboxString} />}
                        </div> */}
                        <div>
                            <label htmlFor="name">Banner名稱</label>
                            <input type="text" name='name' value={selectedBanner.name} onChange={e => onPropertyChange(e.target.value, 'name')} />
                        </div>
                        <div>
                            <label htmlFor="sorting">排序</label>
                            <input type="number" min={1} name='sorting' value={selectedBanner.sort} onChange={e => onPropertyChange(e.target.value, 'sort')} />
                        </div>
                        <div>
                            <label htmlFor="hyperlink">超連結</label>
                            <input type="text" name='hyperlink' value={selectedBannerMedia.hyperlink || undefined} onChange={e => onPropertyChange(e.target.value, 'hyperlink')} />
                        </div>
                        <Media
                            onPropertyChange={onPropertyChange}
                            onShowUrlChange={onShowUrlChange}
                            showUrl={showUrl}
                            alt={false}
                        />
                        <BannerPublishInfo
                            isOnShelvesImmediate={selectedBannerPublishInfo.isOnShelvesImmediate}
                            eternal={selectedBannerPublishInfo.eternal}
                            display={selectedBannerPublishInfo.display}
                            startDate={startDate}
                            endDate={endDate}
                            onPropertyChange={onPropertyChange}
                        />
                        <div>
                            <label htmlFor="remark">備註</label>
                            <textarea type="text" name='remark' value={selectedBanner.remark || undefined} onChange={e => onPropertyChange(e.target.value, 'remark')} />
                        </div>
                        <FormButtonList
                            isEditing={isEditing}
                            onReset={onReset}
                            checkPatchType={GetBannerAction.CHECK_BANNER_BEFORE_SUBMIT}
                        // callback={onAddNewEditor}
                        />
                    </form>
                </MyScrollbar>
            </CardBody>
        </Card>
        <MessageDialog
            dialogTitle={title}
            dialogContent={content}
            success={success}
            open={open}
            setClose={handleModalClose}
        />
    </div >;
}



import React, { useEffect } from 'react';
import BannerLeftWrapper from "./BannerLeftWrapper";
import BannerRightWrapper from "./BannerRightWrapper";
import { useDispatch, useSelector } from 'react-redux';
import * as GetBannerAction from '../../actions/GetBannerAction';
import { reDispatchMessage, errorMessage } from './../../reducers/errorMessage';
import { useLoaderData } from 'react-router';

const BannerDispatchMessage = [
    ...reDispatchMessage,
    errorMessage.addSuccess
]

function BannerList() {
    const dispatch = useDispatch();
    const returnMessage = useSelector(state => state.getBannerReducer.errorMessage);

    useEffect(() => {
        if (BannerDispatchMessage.includes(returnMessage)) {
            dispatch({ type: GetBannerAction.REQUEST_BANNER })
        }
        return () => {
            dispatch({ type: GetBannerAction.CANCEL_EDITING_BANNER })
        }
    }, [returnMessage]);


    return (
        <div className={'manager-container'}>
            <BannerRightWrapper />
            <BannerLeftWrapper />
        </div >

    );
}

export default BannerList;






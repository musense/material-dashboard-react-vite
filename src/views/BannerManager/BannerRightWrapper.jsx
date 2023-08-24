import React from 'react';
import Card from '@components/Card/Card.jsx';
import BannerRightHeader from './BannerRightHeader';
import BannerRightBody from './BannerRightBody';
import { useSelector } from 'react-redux';
import { getMaxSizeClassName } from '../../reducers/GetConfigReducer';

export default function BannerRightWrapper() {

    const maxSize = useSelector(getMaxSizeClassName);

    return <div className={`right-wrapper ${maxSize}`}>
        <Card>
            <BannerRightHeader title={'Banner管理'} />
            <BannerRightBody />
        </Card>
    </div>;
}










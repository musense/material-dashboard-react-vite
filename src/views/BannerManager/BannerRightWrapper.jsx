import React from 'react';
import Card from '@components/Card/Card.jsx';
import BannerRightHeader from './BannerRightHeader';
import BannerRightBody from './BannerRightBody';
import { useSelector } from 'react-redux';
import { maxSizeStyle } from '../../reducers/GetConfigReducer';

export default function BannerRightWrapper({ styles }) {

    const maxSize = useSelector(state => maxSizeStyle(state, styles));

    return <div className={`${styles['banner-right-wrapper']} ${maxSize}`}>
        <Card>
            <BannerRightHeader title={'Banner管理'} />
            <BannerRightBody />
        </Card>
    </div>;
}










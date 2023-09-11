import React from 'react';
import Card from '@components/Card/Card.jsx';
import TagRightHeader from './TagRightHeader';
import TagRightBody from './TagRightBody';
import { useSelector } from 'react-redux';
import { getMaxSizeClassName } from '../../reducers/GetConfigReducer';

export default function TagRightWrapper({ headerMap }) {

    const maxSize = useSelector(getMaxSizeClassName);

    return <div className={`right-wrapper ${maxSize}`}>
        <Card>
            <TagRightHeader />
            <TagRightBody headerMap={headerMap} />
        </Card>
    </div>;
}










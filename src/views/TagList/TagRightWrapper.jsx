import React from 'react';
import Card from '@components/Card/Card.jsx';
import styles from './TagList.module.css'
import TagRightHeader from './TagRightHeader';
import TagRightBody from './TagRightBody';
import { useSelector } from 'react-redux';
import { maxSizeStyle } from '../../reducers/GetConfigReducer';

export default function TagRightWrapper() {

    const maxSize = useSelector(state => maxSizeStyle(state, styles));

    return <div className={`${styles['tag-right-wrapper']} ${maxSize}`}>
        <Card>
            <TagRightHeader />
            <TagRightBody />
        </Card>
    </div>;
}










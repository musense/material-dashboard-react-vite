import React, { useEffect, useRef, useCallback, useState } from "react";
import styles from './ContentFilterInput.module.css'
import * as GetEditorTypeAction from "../../actions/GetEditorTypeAction.js";
import { useDispatch, useSelector } from 'react-redux';

export default function ContentsFilterInput({
    type,
    className
}) {
    const inputRef = useRef(null);
    const dispatch = useDispatch()
    const [lastSentValue, setLastSentValue] = useState('');
    console.log("🚀 ~ file: ContentFilterInput.jsx:10 ~ ContentsFilterInput ~ lastSentValue:", lastSentValue)

    const onButtonClick = useCallback(() => {
        if (inputRef.current === null) return
        if (lastSentValue === inputRef.current.value) return
        dispatch({
            type: GetEditorTypeAction.SEARCH_EDITOR_TYPE_LIST,
            payload: {
                search: inputRef.current.value,
                type: type,
                page: 1
            }
        })
        setLastSentValue(inputRef.current.value)
    }, [dispatch, type, lastSentValue])

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onButtonClick();
        }
    }

    useEffect(() => {
        if (inputRef.current === null) {
            return
        } else {
            inputRef.current.focus();
        }

    }, [inputRef]);

    return <div className={`
        ${styles['content-filter-container']} 
        ${className ? styles[className] : ''}
    `}>
        <div>
            <label htmlFor="typeTitle">標題</label>
            <input
                id="typeTitle"
                className={styles['filter-input']}
                ref={inputRef}
                type="text"
                placeholder="查詢標題..."
                onKeyDown={handleKeyPress}
            />
        </div>
        <button className={styles['filter-button']} onClick={onButtonClick}>查詢</button>
    </div>;
}

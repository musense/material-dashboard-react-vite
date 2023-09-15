import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styles from "./FormButtonList.module.css"

export default function FormButtonList({
    isEditing,
    onReset,
    checkPatchType,
    callback = null
}) {
    const dispatch = useDispatch();
    const onSubmit = useCallback((e) => {

        dispatch({
            type: checkPatchType,
            payload: {
                createType: isEditing ? 'update' : 'add_new',
            }
        })
        callback && callback(e)
    }, [dispatch, checkPatchType, isEditing, callback])

    return isEditing
        ? <FormButtonContainer
            resetValue="取消"
            submitValue="儲存"
            onReset={onReset}
            onSubmit={onSubmit}
        />
        : <FormButtonContainer
            resetValue="清空"
            submitValue="新增"
            onReset={onReset}
            onSubmit={onSubmit}
        />
}

const FormButtonContainer = ({ resetValue, submitValue, onReset, onSubmit }) => {
    return <div className={styles['form-button-container']}>
        <input type='button' defaultValue={resetValue} onClick={(e) => onReset(e)} />
        <input className='submit-btn' type='button' defaultValue={submitValue} onClick={onSubmit} title="Enter" />
    </div>
}
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from 'styled-components'

import ContentsFilterInput from "./ContentFilterInput";
import * as GetEditorTypeAction from "../../actions/GetEditorTypeAction.js";
import { useDispatch, useSelector } from 'react-redux';
import MessageDialog from "../../components/Modal/MessageDialog";
import useModal from "../../hook/useModal";
import useModalResult from "../../hook/useModalResult";
import getErrorMessage from "../../utils/getErrorMessage";
import CustomDragContext from "./CustomDragContext";

import {
    getTypeList,
    getTypeNotList
} from '../../reducers/GetEditorTypeReducer.js';

export const borderRadius = 2;

const DropContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    width: fit-content;
    margin: 0 auto;
    gap: 10px;
`
const DropHeader = styled.div`
    display: flex;
    flex-direction: row;
    gap: 200px;
    &>div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        border-radius: 5px;
    }
`
const DropBody = styled(DropHeader)`
    height: fit-content;
    &>div{
        justify-content: flex-start;
    }
`
const ButtonWrapper = styled.div`
    position: relative;
    width: 500px;
    text-align: right;
`
const SubmitButton = styled.button`
    border: none;
    height: 1.8rem;
    width: 180px;
    color: white;
    background-color: darkviolet;
    cursor: pointer;
    align-self: flex-end;
    &:hover{
        background-color: violet;
    }
`
const InnerContentsFilterInput = React.memo(ContentsFilterInput)

export default function EditorTypeList({ type }) {
    const list = useSelector(state => getTypeList(state, type));
    const notList = useSelector(state => getTypeNotList(state, type));

    const dispatch = useDispatch();
    const modalMessageType = useSelector(state => state.getEditorTypeReducer.type);
    const serverMessage = useSelector(state => state.getEditorTypeReducer.errorMessage);
    const [lastDispatchList, setLastDispatchList] = useState([]);
    const [dispatchList, setDispatchList] = useState([]);
    const [readyToDispatchKeyList, setReadyToDispatchKeyList] = useState([]);

    const [removeList, setRemoveList] = useState([]);
    const [state, setState] = useState(
        {
            notList: {
                items: []
            },
            list: {
                items: []
            },
        }
    );
    console.log("🚀 ~ file: EditorTypeList.jsx:89 ~ EditorTypeList ~ state:", state)

    const setDispatchListFunction = useCallback((list) => {
        const sortingList = list.map((item, index) => {
            return ({
                [item._id]: index + 1
            });
        });
        const readyToDispatchKeyList = list.reduce((acc, curr) => {
            return [
                ...acc,
                curr._id
            ]
        }, [])
        setReadyToDispatchKeyList(readyToDispatchKeyList)
        setDispatchList(sortingList);
    }, [])

    useEffect(() => {
        if (list) {
            setState(prevState => ({
                ...prevState,
                list: {
                    items: [...list]
                }
            }))
            setDispatchListFunction(list);
        }
    }, [list, setDispatchListFunction])

    useEffect(() => {
        if (notList) {
            setState(prevState => {
                const filteredNotList = notList.filter(notItem => !readyToDispatchKeyList.includes(notItem._id));
                return {
                    ...prevState,
                    notList: {
                        items: [...filteredNotList]
                    }
                }
            })
        }
    }, [notList, readyToDispatchKeyList]);

    const onDragEnd = useCallback((result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        // 拷貝新的items (來自state)
        let newItemObj = { ...state };

        // splice(start, deleteCount, item )
        // 從source剪下被拖曳的元素
        const [remove] = newItemObj[source.droppableId].items.splice(
            source.index,
            1
        );

        // 在destination位置貼上被拖曳的元素
        newItemObj[destination.droppableId].items.splice(
            destination.index,
            0,
            remove
        );

        // set state新的 state
        setState(newItemObj);
        if (source.droppableId !== destination.droppableId && destination.droppableId === 'notList') {
            const filteredList = newItemObj[source.droppableId].items.filter(item => item[remove._id] === undefined)
            setDispatchListFunction(filteredList)
            setRemoveList(prevState => [
                ...prevState,
                { [remove._id]: -1 }
            ])
        }
        if (destination.droppableId === 'list') {
            setDispatchListFunction(newItemObj[destination.droppableId].items)
        }
    }, [setDispatchListFunction, state])

    const onSubmit = useCallback(() => {
        const checkIfDispatchListNotChanged = [
            ...dispatchList,
            ...removeList
        ].every((item, index) => {
            const lastDispatchItem = lastDispatchList[index]
            const test = lastDispatchItem && Object.entries(item).map(([id, order]) => {
                return lastDispatchItem[id] && lastDispatchItem[id] === order
            })[0]
            return !!test
        })

        if (checkIfDispatchListNotChanged) {
            setModalTitle('nothing to update!')
            return
        }

        if (type === 'top' && dispatchList.length > 2) {
            // modal alert
            // length larger than 2 will not be cut off but only the top 2 will be showed on the index page
        }

        if (type === 'popular' && dispatchList.length > 5) {
            // modal alert
            // length larger than 5 will be cut off due to useless
            dispatchList.splice(5, dispatchList.length)
        }

        dispatch({
            type: GetEditorTypeAction.BUNCH_MODIFY_TYPE_LIST,
            payload: {
                type: type,
                list: [
                    ...dispatchList,
                    ...removeList
                ]
            }
        })
        setLastDispatchList([
            ...dispatchList,
            ...removeList
        ])
    }, [dispatch, dispatchList, removeList, type, lastDispatchList])


    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        setModalTitle(modalMessageType)
    }, [modalMessageType]);

    const message = getErrorMessage(modalTitle, serverMessage)
    console.log("🚀 ~ file: EditorTypeList.jsx:205 ~ message:", message)

    const {
        title,
        content,
        success
    } = useModalResult({
        message: message
    })

    const {
        open: openDialog,
        handleClose,
    } = useModal(title)

    const handleCloseDialog = useCallback(() => {
        handleClose()
        dispatch({
            type: GetEditorTypeAction.SET_MODAL_CONTEXT,
            payload: {
                type: ''
            }
        })
    }, [handleClose, dispatch])


    const submitButton = useMemo(() => {
        return <SubmitButton onClick={onSubmit}>確認</SubmitButton>
    }, [onSubmit])
    return <DropContainer>
        <DropHeader>
            <div>
                <InnerContentsFilterInput type={type} className="tabs" />
            </div>
            <div>
                <ButtonWrapper>
                    {submitButton}
                </ButtonWrapper>
            </div>
        </DropHeader>
        <DropBody>
            <CustomDragContext
                onDragEnd={onDragEnd}
                state={state}
                type={type}
            />
        </DropBody>
        <MessageDialog
            dialogTitle={title}
            dialogContent={content}
            success={success}
            open={openDialog}
            setClose={handleCloseDialog}
            confirm={false}
            data={"Hello World"}
            width={400}
        />
    </DropContainer>
}
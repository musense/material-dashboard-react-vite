import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import MyScrollbar from "../../components/MyScrollbar/MyScrollbar";
import styled from 'styled-components'
import Item, { grid } from "./Item";
import ContentsFilterInput from "./ContentFilterInput";
import * as GetEditorAction from "../../actions/GetEditorAction.js";
import { useDispatch } from 'react-redux';
import Icon from "../Icons/Icon";
import MessageDialog from "../../components/Modal/MessageDialog";
import useModal from "../../hook/useModal";

const droppableHeight = 630
export const borderRadius = 2;

const DropContainer = styled.div`
    margin: 0 auto;
    width: fit-content;
`
const DropHeader = styled.div`
    display: flex;
    flex-direction: row;
    gap: 200px;
    &>div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
`
const DropBody = DropHeader

const TitleH2 = styled.h2`
    position: relative;
    width: fit-content;
    text-align: center;
    margin: 0;

    &>button{
        position: absolute;
        top: 50%;
        right: -25px;
        transform: translateY(-50%);
    }
`
const DraggableWrapper = styled.div`
  padding: ${grid}px;
  width: 500px;
  flex-grow: 1;
  transition: background-color 0.2s ease;
  ${(props) =>
        props.isDraggingOver
            ? `background-color: lightblue`
            : `background-color: lightgrey`
    };
`;

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
const IconButton = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
`

const typeMap = new Map([
    ["top", "置頂"],
    ["popular", "熱門"],
    ["recommend", "推薦"],
])


const ItemList = ({ items, droppableId }) => {
    return items.map((item, index) => (
        <Item
            key={item._id}
            item={item}
            order={index}
            droppableId={droppableId}
        />
    ))
}

const InnerContentsFilterInput = React.memo(ContentsFilterInput)

export default function EditorTypeList({ type, notList, list }) {

    const dispatch = useDispatch();
    const [lastDispatchList, setLastDispatchList] = useState([]);
    const [dispatchList, setDispatchList] = useState([]);
    const [removeList, setRemoveList] = useState([]);
    const [state, setState] = useState(
        {
            list: {
                items: []
            },
            notList: {
                items: []
            },
        }
    );

    const setDispatchListFunction = useCallback((list) => {
        const sortingList = list.map((item, index) => {
            return ({
                [item._id]: index + 1
            });
        });
        setDispatchList(sortingList);
    }, [])

    useEffect(() => {
        if (notList) {
            setState(prevState => ({
                notList: {
                    items: [...notList]
                },
                list: {
                    items: prevState.list.items
                }
            }))
        }
        if (list) {
            setState(prevState => ({
                notList: {
                    items: prevState.notList.items
                },
                list: {
                    items: [...list]
                }
            }))
            setDispatchListFunction(list);
        }

    }, [notList, list, setDispatchListFunction]);

    const onDragEnd = useCallback((result) => {
        const { source, destination } = result;
        console.log("🚀 ~ file: EditorTypeList.jsx:179 ~ onDragEnd ~ destination:", destination)

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
        console.log("🚀 ~ file: EditorTypeList.jsx:201 ~ onDragEnd ~ newItemObj:", newItemObj)

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
            console.log("🚀 ~ file: EditorTypeList.jsx:216 ~ onDragEnd ~ destination.droppableId:", destination.droppableId)
            setDispatchListFunction(newItemObj[destination.droppableId].items)
        }
    }, [setDispatchListFunction, state])

    const onSubmit = useCallback(() => {
        if ([
            ...dispatchList,
            ...removeList
        ].every((item, index) => {
            const lastDispatchItem = lastDispatchList[index]
            return lastDispatchItem && Object.entries(item).map(([id, order]) =>
                lastDispatchItem[id] && lastDispatchItem[id] === order
            )
        })) return
        console.log("🚀 ~ file: EditorTypeList.jsx:259 ~ onSubmit ~ onSubmit!!!")

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
            type: GetEditorAction.BUNCH_MODIFY_TYPE_LIST,
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
    const [modalContent, setModalContent] = useState('');

    const {
        open: openDialog,
        handleOpen: handleOpenDialog,
        handleClose: handleCloseDialog
    } = useModal(modalTitle)

    const setModalContext = useCallback((type) => {
        switch (type) {
            case 'top': {
                setModalTitle('置頂文章規則')
                setModalContent(`可插入原先於首頁依發布日期排序的文章，\n但於首頁最多只可插入2篇，\n因此置頂文章超過2篇會以灰色呈現，\n若想在網頁看到更多置頂文章，\n請點選「記事一覽」查詢。`)
            } break;
            case 'popular': {
                setModalTitle('熱門文章規則')
                setModalContent(`熱門文章首先以觀看次數自然排序，\n且仍可人工插入排序，\n但於首頁最多只會呈現5篇熱門文章，\n因此超過5篇者將以灰色呈現，\n並將於確認後移除熱門文章，\n恢復到非熱門文章區。`)
            } break;
            case 'recommend': {
                setModalTitle('推薦文章規則')
                setModalContent(`可插入無上限推薦文章，\n但首頁最多只會顯示8篇，\n因此超過8篇者將以灰色呈現。`)
            } break;

            default: {
                setModalTitle('')
                setModalContent('')
            }
                break;
        }
        handleOpenDialog()
    }, [handleOpenDialog])

    const submitButton = useMemo(() => {
        return <SubmitButton onClick={onSubmit}>確認</SubmitButton>
    }, [onSubmit])
    return <DropContainer>
        <DropHeader>
            <div>
                <TitleH2>非{typeMap.get(type)}文章</TitleH2>
                <InnerContentsFilterInput type={type} />
            </div>
            <div>
                <TitleH2>
                    {typeMap.get(type)}文章
                    <IconButton onClick={() => setModalContext(type)}>
                        <Icon icon={'question'} />
                    </IconButton>
                </TitleH2>
                <ButtonWrapper>
                    {submitButton}
                </ButtonWrapper>
            </div>
        </DropHeader>
        <DropBody>
            <CustomDragContext
                onDragEnd={onDragEnd}
                state={state}
            />
        </DropBody>
        <MessageDialog
            dialogTitle={modalTitle}
            dialogContent={modalContent}
            // success={success}
            open={openDialog}
            setClose={handleCloseDialog}
            confirm={false}
            data={"Hello World"}
            width={400}
        />
    </DropContainer>
}


function CustomDragContext({
    onDragEnd,
    state
}) {
    return <DragDropContext
        // onDragStart={onDragStart}
        // onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
    >
        {Object.keys(state).map((key, ind) => (
            <MyScrollbar key={ind} height={`${droppableHeight}px`}>
                <Droppable droppableId={key}>
                    {(provided, snapshot) => (
                        <DraggableWrapper
                            ref={provided.innerRef}
                            className={key}
                            isDraggingOver={snapshot.isDraggingOver}
                            {...provided.droppableProps}
                        >
                            <ItemList
                                items={state[key]?.items}
                                droppableId={key} />
                            {provided.placeholder}
                        </DraggableWrapper>
                    )}
                </Droppable>
            </MyScrollbar>
        ))}
    </DragDropContext>;
}


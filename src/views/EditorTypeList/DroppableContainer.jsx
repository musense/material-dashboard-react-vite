import React, { useCallback, useEffect, useState } from "react";
import { Droppable } from 'react-beautiful-dnd';
import MyScrollbar from "../../components/MyScrollbar/MyScrollbar";
import styled from 'styled-components'
import Item, { grid } from "./Item";
import Icon from "../Icons/Icon";
import { useDispatch } from "react-redux";
import * as GetEditorTypeAction from "../../actions/GetEditorTypeAction.js";

const DroppableWrapper = styled.div`
  padding: ${grid}px;
  width: 500px;
  flex-grow: 1;
  justify-content: flex-start;
  transition: background-color 0.2s ease, height 0.2s ease;
  height: fit-content;
  overflow: auto;

  ${(props) =>
        props.isDraggingOver
            ? `background-color: lightblue`
            : `background-color: lightgrey`
    };
`;
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
const TitleH2 = styled.h2`
    position: relative;
    width: fit-content;
    text-align: center;
    margin: 0;
    align-self: flex-start;
    user-select: none;
    font-weight: bold;
    font-size: 1.8em;

    &>button{
        position: absolute;
        top: 50%;
        right: -25px;
        transform: translateY(-50%);
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
export default function DroppableContainer({
    droppableId,
    state,
    type,
}) {

    const [count, setCount] = useState(6);
    const [draggableHeight, setDraggableHeight] = useState(80);
    const gap = 8

    useEffect(() => {
        const count = state[droppableId].items.length
        if (type === 'popular') {
            if (count >= 5) {
                setCount(5)
            } else {
                // fit-content
                setCount(0)
            }
            setDraggableHeight(104)
            return
        }
        // top or recommend
        if (count >= 6) {
            setCount(6)
        } else {
            // fit-content
            setCount(0)
        }
        setDraggableHeight(80)
        return
    }, [type, state, droppableId]);
    return <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
            <DroppableWrapper
                ref={provided.innerRef}
                className={droppableId}
                isDraggingOver={snapshot.isDraggingOver}
                {...provided.droppableProps}
            >
                <DroppableTitle
                    droppableId={droppableId}
                    type={type}
                />
                <MyScrollbar height={getHeight()}>
                    <ItemList
                        items={state[droppableId]?.items}
                        droppableId={droppableId} />
                    {provided.placeholder}
                </MyScrollbar>
            </DroppableWrapper>
        )}
    </Droppable>

    function getHeight() {
        let droppableHeight = count * draggableHeight + count * gap
        if (droppableHeight === 0) {
            droppableHeight = 'fit-content'
        } else {
            droppableHeight = `${droppableHeight}px`
        }
        return droppableHeight;
    }
}

function DroppableTitle({
    droppableId,
    type
}) {

    const dispatch = useDispatch();
    const setModalContextDispatch = useCallback((type) => {
        let message = ''
        switch (type) {
            case 'top': {
                message = 'top contents rule'
            } break;
            case 'popular': {
                message = 'hot contents rule'
            } break;
            case 'recommend': {
                message = 'recommend contents rule'
            } break;

            default: {
                message = ''
            } break;
        }
        dispatch({
            type: GetEditorTypeAction.SET_MODAL_CONTEXT,
            payload: {
                type: message
            }
        })
    }, [dispatch])

    return droppableId === 'notList'
        ? <TitleH2>全部文章</TitleH2>
        : (
            <TitleH2>
                {typeMap.get(type)}文章
                <IconButton onClick={() => setModalContextDispatch(type)}>
                    <Icon icon={'question'} size={12} />
                </IconButton>
            </TitleH2>
        );
}


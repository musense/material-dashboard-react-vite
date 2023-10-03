import React, { useCallback } from "react";
import { Droppable } from 'react-beautiful-dnd';
import MyScrollbar from "../../components/MyScrollbar/MyScrollbar";
import styled from 'styled-components'
import Item, { grid } from "./Item";
import Icon from "../Icons/Icon";
import { useDispatch } from "react-redux";
import * as GetEditorTypeAction from "../../actions/GetEditorTypeAction.js";

const droppableHeight = 630

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
    return <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
            <DraggableWrapper
                ref={provided.innerRef}
                className={droppableId}
                isDraggingOver={snapshot.isDraggingOver}
                {...provided.droppableProps}
            >
                {
                    droppableId === 'notList'
                        ? <TitleH2>全部文章</TitleH2>
                        : (
                            <TitleH2>
                                {typeMap.get(type)}文章
                                <IconButton onClick={() => setModalContextDispatch(type)}>
                                    <Icon icon={'question'} />
                                </IconButton>
                            </TitleH2>
                        )
                }
                <MyScrollbar height={`${droppableHeight}px`}>
                    <ItemList
                        items={state[droppableId]?.items}
                        droppableId={droppableId} />
                    {provided.placeholder}
                </MyScrollbar>
            </DraggableWrapper>
        )}
    </Droppable>
}

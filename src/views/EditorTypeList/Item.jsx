import React, { useMemo } from "react";
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import Icon from "../Icons/Icon";
import getUpdateDateTime from "../../utils/getUpdateDateTime";

export const grid = 8;
const transparency = 0.6

const getItemStyle = (isDragging, draggableStyle, type, sorting) => {
    return {// some basic styles to make the items look a bit nicer.

        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        textAlign: "center",
        borderRadius: "5px",
        background: "white",

        boxShadow:
            isDragging
                ? "-4px 4px 5px 0 rgb(0 0 0 / 0.2)"
                : "none",

        opacity: type === 'topSorting'
            ? sorting > 2 && transparency
            : type === "popularSorting"
                ? sorting > 5 && transparency
                : type === "recommendSorting"
                    ? sorting > 8 && transparency
                    : 1
        ,

        // styles we need to apply on draggables
        ...draggableStyle
    };
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  &>*:first-child {
    text-align: center;
    width: 100px;
    flex-shrink: 0;
    margin-left: auto;
  } 
  &>*:nth-child(2){
    text-align: left;
    flex-grow: 1;
  }
  &>*:nth-child(3),
  &>*:nth-child(4),
  &>*:nth-child(5){
      width: 30px;
      flex-shrink: 0;
      text-align: center;
  }

  &>*:nth-child(3){
    padding-right: 10px;
  }
`

export default function Item({
    item,
    order,
    droppableId
}) {
    let className = ''
    if (droppableId === 'list') {
        className = item.topSorting !== undefined
            ? ['topSorting', Number(order) + 1]
            : item.popularSorting !== undefined
                ? ['popularSorting', Number(order) + 1]
                : item.recommendSorting !== undefined
                    ? ['recommendSorting', Number(order) + 1]
                    : ''
    }
    const dragIcon = useMemo(() => <Icon icon="drag" />, []);

    return (
        <Draggable
            draggableId={item._id}
            index={order}
            className={className}>
            {(provided, snapshot) => {
                return (
                    <ItemDiv
                        ref={provided.innerRef}
                        snapshot={snapshot}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            className[0],
                            className[1]
                        )}
                    >
                        {item.pageView !== undefined
                            ? (
                                <div style={{ width: '170px' }}>
                                    <span style={{ whiteSpace: 'nowrap' }}>{getUpdateDateTime(item.publishedAt)}</span>
                                    <br /><span>人氣：{item.pageView}</span>
                                </div>
                            )
                            : (
                                <div>
                                    <span>{getUpdateDateTime(item.publishedAt)}</span>
                                </div>
                            )
                        }
                        <span className={'ellipsis lineClamp2'}>{item.title}</span>
                        <span>{item.serialNumber}</span>
                        {dragIcon}
                        {droppableId === 'list' && <span>{order + 1}</span>}
                    </ItemDiv>
                )
            }}
        </Draggable >);
}
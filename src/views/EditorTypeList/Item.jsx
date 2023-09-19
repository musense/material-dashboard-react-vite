import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import Icon from "../Icons/Icon";
import getUpdateDateTime from "../../utils/getUpdateDateTime";

export const grid = 8;
const transparency = 0.6

const getItemStyle = (isDragging, draggableStyle, type, sorting) => {
    console.log("🚀 ~ file: Item.jsx:11 ~ getItemStyle ~ sorting:", sorting)
    return {// some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        textAlign: "center",
        borderRadius: "5px",
        // change background colour if dragging
        background: isDragging ? "lightgreen" : "white",


        opacity: type === 'topSorting'
            ? sorting > 2 && transparency
            : type === "popularSorting"
                ? sorting > 5 && transparency
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

const TimeAvatar = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background-color: #e38b29;
  color: black;
  position: absolute;
  right: 2%;
  top: -20%;
`;

export default function Item({ item, index, droppableId }) {

    const topSorting = item.topSorting !== undefined
        ? item.topSorting
        : undefined;
    const popularSorting = item.popularSorting !== undefined
        ? item.popularSorting
        : undefined;
    const recommendSorting = item.recommendSorting !== undefined
        ? item.recommendSorting
        : undefined;
    let className = []
    if (droppableId === 'list') {
        if (topSorting !== undefined) {
            className = ['topSorting', Number(index) + 1];
        } else if (popularSorting !== undefined) {
            className = ['popularSorting', Number(index) + 1];

        } else if (recommendSorting !== undefined) {
            className = ['recommendSorting'];
        }
    }
    return (
        <Draggable
            draggableId={item._id}
            index={index}
            className={className}>
            {(provided, snapshot) => {
                return (
                    <div
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
                        <ItemDiv>
                            <div>
                                <span>{getUpdateDateTime(item.publishedAt)}</span>
                                {item.pageView !== undefined && <>
                                    <br /><span>人氣：{item.pageView}</span>
                                </>
                                }
                            </div>
                            <span>{item.title}</span>
                            <span>{item.serialNumber}</span>
                            <Icon icon="drag" />
                            {droppableId === 'list' && <span>{index + 1}</span>}
                        </ItemDiv>
                        {/* <TimeAvatar>{item.score}</TimeAvatar> */}
                    </div>)
            }}
        </Draggable >);
}
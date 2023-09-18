import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'

export const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const DragItem = styled.div`
  user-select: none;
  min-height: 50px;
  padding: 16px;
  font-size: 1em;
  text-align: center;
  background-color: #7895b2;
  color: #e8dfca;
  margin-bottom: 10px;
  position: relative;
`;

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

export default function Item({ item, index }) {
    return (
        <Draggable draggableId={item._id} index={index}>
            {(provided, snapshot) => {
                return (
                    <DragItem
                        ref={provided.innerRef}
                        snapshot={snapshot}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            provided.isDragging,
                            provided.draggableProps.style,
                        )}
                    >
                        {item.title}
                        {/* <TimeAvatar>{item.score}</TimeAvatar> */}
                    </DragItem>)
            }}
        </Draggable >);
}
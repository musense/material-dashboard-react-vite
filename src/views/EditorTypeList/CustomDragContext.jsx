import React from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableContainer from "./DroppableContainer";

export default function CustomDragContext({
    onDragEnd,
    state,
    type,
}) {
    return <DragDropContext
        onDragEnd={onDragEnd}
    >
        {Object.keys(state).map((key, ind) => (
            <DroppableContainer
                key={ind}
                droppableId={key}
                state={state}
                type={type}
            />
        ))}
    </DragDropContext>;
}


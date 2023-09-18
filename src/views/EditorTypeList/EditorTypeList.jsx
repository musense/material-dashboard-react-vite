import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import memoizeOne from 'memoize-one';
import MyScrollbar from "../../components/MyScrollbar/MyScrollbar";
import { colors } from '@atlaskit/theme';
import styled from 'styled-components'
import Item, { grid } from "./Item";

const mainStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    // flexDirection: "row",
    // gap: "50px",
    // alignItems: "flex-start",
    // width: "100%",
    // height: "100%"
}

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 500
});

const TitleH2 = styled.h2`
    width: 500px;
    text-align: center;
`
const DraggableWrapper = styled.div`
  padding: ${grid}px;
  min-height: 200px;
  height: fit-content;
  flex-grow: 1;
  transition: background-color 0.2s ease;
  ${(props) =>
        props.isDraggingOver ? `background-color: lightblue` : `background-color: lightgrey`};
`;

export default function EditorTypeList({ type, notList, list }) {

    const [state, setState] = useState(
        {
            notList:
                { items: [] },

            list:
                { items: [] }
        }
    );

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
        }

    }, [notList, list]);

    const onDragEnd = (event) => {
        const { source, destination } = event;

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

        // 計算sprint內的分數總和
        // const newTotalScoreSum = newItemObj.sprintList.items.reduce(
        //   (acc, val) => acc + val.score,
        //   0
        // );
        // setTotalScoreSum(newTotalScoreSum);
    };
    return <div>
        <div style={mainStyle}>
            <TitleH2>非{type}文章</TitleH2>
            <TitleH2>{type}文章</TitleH2>
        </div>
        <div style={mainStyle}>
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.keys(state).map((key, ind) => (
                    <MyScrollbar key={ind} height="700px">
                        <Droppable droppableId={key}>
                            {(provided, snapshot) => (
                                <DraggableWrapper
                                    ref={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    {state[key]?.items.map((el, index) => (
                                        <Item
                                            key={el._id}
                                            item={el}
                                            index={index}
                                        />
                                    ))}
                                </DraggableWrapper>

                            )}
                        </Droppable>
                    </MyScrollbar>

                ))}

            </DragDropContext>
        </div>
    </div>
}



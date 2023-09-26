const onDragStart_start = {
    draggableId: "64db0d0f765b7ea6cfd3e343",
    type: "DEFAULT",
    source: {
        droppableId: "notList",
        index: 0
    },
    mode: "FLUID"
}

const OnDragUpdate__result = {
    ...onDragStart_start,
    combine: null,
    destination: {
        droppableId: "notList",
        index: 1
    }
}

const OnDragEnd__result = {
    ...OnDragUpdate__result,
    reason: "DROP",
}
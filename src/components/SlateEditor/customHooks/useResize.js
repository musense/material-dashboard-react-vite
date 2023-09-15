import { useState, useCallback } from 'react';

const useResize = () => {
    const [size, setSize] = useState({ width: 50, height: 50 });
    const [resizing, setResizing] = useState(false);

    const preventDrag = useCallback((e) => {
        e.preventDefault();
    }, []);

    const onMouseMove = useCallback((e) => {
        setSize(currentSize => ({
            width: currentSize.width + e.movementX,
            height: currentSize.height + e.movementY
        }));
    }, [setSize])

    const onMouseUp = useCallback(() => {
        // document.querySelector("[data-slate-editor]>table").classList.remove('resizing');
        onMouseMove && document.removeEventListener("mousemove", onMouseMove);
        onMouseUp && document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("dragstart", preventDrag);
        setResizing(false);
    }, [setResizing, onMouseMove, preventDrag])

    const onMouseDown = useCallback(() => {
        document.addEventListener("dragstart", preventDrag);
        // document.querySelector("[data-slate-editor]>table").classList.add('resizing');
        onMouseMove && document.addEventListener("mousemove", onMouseMove);
        onMouseUp && document.addEventListener("mouseup", onMouseUp);
        setResizing(true);
    }, [setResizing, onMouseMove, onMouseUp, preventDrag])

    return [size, onMouseDown, resizing];
}


export default useResize;
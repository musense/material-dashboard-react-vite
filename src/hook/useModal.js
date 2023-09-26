import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useModal(data) {
    console.log("🚀 ~ file: useModal.js:5 ~ useModal ~ data:", data)

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = useCallback(
        () => setOpen(true)
        , [setOpen]);
    const handleClose = useCallback(() => {
        setOpen(false)
        dispatch({
            type: "SET_ERROR_MESSAGE",
            payload: {
                message: '--reset-error-message',
            }
        })
        dispatch({
            type: "RESET_DIALOG_STATE",
        })
    }, [setOpen, dispatch]);

    useEffect(() => {
        if (data) handleOpen()
    }, [data, handleOpen]);

    return { open, handleOpen, handleClose };
}

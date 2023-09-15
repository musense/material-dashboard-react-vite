import { useEffect } from "react";

export default function useSetDateTimeDispatch(dispatch, date, time) {

    useEffect(() => {

        const getDate = (dayObject) => `${dayObject['$y']}/${dayObject['$M'] + 1}/${dayObject['$D']}`
        const getTime = (dayObject) => `${dayObject['$H']}:${dayObject['$m']}`

        const dateTime = `${getDate(date)} ${getTime(time)}`
        // if (defaultValue === null) return
        // if (!dateTime) return
        dispatch(dateTime)
    }, [dispatch, date, time])
}

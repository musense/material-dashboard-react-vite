import { useEffect, useMemo } from "react";

export default function useSetDateTimeDispatch(dispatch, date, time) {

  const dateTime = useMemo(() => {
    const getTime = (dayObject) => `${dayObject['$H']}:${dayObject['$m']}`
    const getDate = (dayObject) => `${dayObject['$y']}/${dayObject['$M'] + 1}/${dayObject['$D']}`

    return `${getDate(date)} ${getTime(time)}`
  }, [date, time])

  useEffect(() => {
    dispatch(dateTime)
  }, [dispatch, dateTime])
}

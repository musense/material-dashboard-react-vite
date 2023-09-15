import { useState, useEffect } from "react";
import dayjs from 'dayjs';

export default function useSetDateTimeDefaultValue(defaultValue) {

    const [date, setDate] = useState(dayjs(new Date()));
    const [time, setTime] = useState(dayjs(new Date()));

    useEffect(() => {
        const value = defaultValue
            ? defaultValue === 'now'
                ? new Date()
                : new Date(defaultValue)
            : new Date()
        setDate(dayjs(value))
        setTime(dayjs(value))
    }, [defaultValue]);

    return {
        date,
        time,
        setDate,
        setTime
    }
}

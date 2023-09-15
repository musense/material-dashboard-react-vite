import React, { useCallback } from "react";
import CustomRadio from '../../components/CustomRadio/CustomRadio';
import DateTimeSelector from "../../components/DateSelector/DateTimeSelector";
import { Stack } from "@mui/material";
// import dayjs from 'dayjs';

export default function BannerPublishInfo({
    isOnShelvesImmediate,
    display,
    eternal,
    startDate,
    endDate,
    onPropertyChange
}) {

    const setIsOnShelvesImmediate = useCallback((value) => {
        // onPropertyChange(value, 'isScheduled', 'publishInfo')
        onPropertyChange(value, 'isOnShelvesImmediate', 'publishInfo')
        if (value === true) {
            onPropertyChange('now', 'startDate', 'publishInfo', 'scheduledAt')
        }
    }, [onPropertyChange])

    const onIsDisplay = useCallback((value) => {
        onPropertyChange(value, 'display', 'publishInfo')
    }, [onPropertyChange])

    const onIsEternal = useCallback((value) => {
        onPropertyChange(value, 'eternal', 'publishInfo')
        if (value === true) {
            onPropertyChange('now', 'startDate', 'publishInfo', 'scheduledAt')
            onPropertyChange('now', 'endDate', 'publishInfo', 'scheduledAt')
        }
    }, [onPropertyChange])

    const onStartDateChange = useCallback((value) => {
        onPropertyChange(value, 'startDate', 'publishInfo', 'scheduledAt')
    }, [onPropertyChange])

    const onEndDateChange = useCallback((value) => {
        onPropertyChange(value, 'endDate', 'publishInfo', 'scheduledAt')
    }, [onPropertyChange])

    return <section id="publishInfo">
        <div>
            <Stack direction={"column"} spacing={2}>
                <Stack direction={"row"} spacing={1} justifyContent={'space-evenly'}>
                    <CustomRadio
                        value={display}
                        label={'設為顯示'}
                        setState={onIsDisplay} />
                    <CustomRadio
                        value={isOnShelvesImmediate}
                        label={'立即上架'}
                        setState={setIsOnShelvesImmediate} />
                    <CustomRadio
                        value={eternal}
                        label={'設為常駐'}
                        setState={onIsEternal}
                    />
                </Stack>
                <Stack direction={"column"} spacing={2}>
                    <DateTimeSelector
                        disabled={isOnShelvesImmediate || eternal}
                        defaultValue={startDate}
                        title={'排程開始日期'}
                        setState={onStartDateChange} />
                    <DateTimeSelector
                        disabled={eternal}
                        defaultValue={endDate}
                        title={'排程結束日期'}
                        setState={onEndDateChange} />
                </Stack>
            </Stack>
        </div>
    </section>;
}

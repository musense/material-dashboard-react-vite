import React, { useCallback } from "react";
import CustomRadio from '@components/CustomRadio/CustomRadio';
import DateTimeSelector from "@components/DateSelector/DateTimeSelector";
import { Stack } from "@mui/material";

export default function PublishInfo({
    hidden,
    isScheduled,
    onPropertyChange,
    scheduledAt
}) {
    const onPublishInfoHiddenChange = useCallback((value) => {
        onPropertyChange(value, 'hidden', 'publishInfo')
    }, [onPropertyChange])

    const onPublishInfoIsScheduledChange = useCallback((value) => {
        onPropertyChange(value, 'isScheduled', 'publishInfo')
    }, [onPropertyChange])

    const onPublishReservedPublishDateTimeChange = useCallback((value) => {
        onPropertyChange(value, 'scheduledAt', 'publishInfo')
    }, [onPropertyChange])
    return <section id="publishInfo">
        <div>
            <Stack direction={"column"} spacing={2}>
                <CustomRadio
                    value={hidden}
                    label={'將這篇文章「隱藏」'}
                    setState={onPublishInfoHiddenChange} />
                {hidden && <CustomRadio
                    disabled={!hidden}
                    value={isScheduled}
                    label={'是否排程上版'}
                    setState={onPublishInfoIsScheduledChange} />}
                {hidden && isScheduled && <DateTimeSelector
                    defaultValue={scheduledAt}
                    title={'排程日期'}
                    setState={onPublishReservedPublishDateTimeChange} />}
            </Stack>
        </div>
    </section>;
}

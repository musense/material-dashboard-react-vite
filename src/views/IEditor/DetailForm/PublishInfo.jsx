import React, { useCallback, useMemo } from "react";
import CustomRadio from '@components/CustomRadio/CustomRadio';
import DateTimeSelector from "@components/DateSelector/DateTimeSelector";
import { Stack } from "@mui/material";

export default function PublishInfo({
  hidden,
  isScheduled,
  onPropertyChange,
  scheduledAt,
  status
}) {
  const onPublishInfoHiddenChange = useCallback((value) => {
    onPropertyChange(value, 'hidden', 'publishInfo')
  }, [onPropertyChange])

  const onPublishReservedPublishDateTimeChange = useCallback((value) => {
    onPropertyChange(value, 'scheduledAt', 'publishInfo')
  }, [onPropertyChange])

  const onPublishInfoIsScheduledChange = useCallback((value) => {
    onPropertyChange(value, 'isScheduled', 'publishInfo')
    if (value === false) {
      onPublishReservedPublishDateTimeChange('')
    }
  }, [onPropertyChange, onPublishReservedPublishDateTimeChange])

  const isHiddenRadio = useMemo(() => {
    return (
      <CustomRadio
        value={hidden}
        label={'將這篇文章「隱藏」'}
        setState={onPublishInfoHiddenChange}
      />
    )
  }, [hidden, onPublishInfoHiddenChange])

  const isPublishedRadio = useMemo(() => {
    if (status == '已發布') return null
    if (!hidden) return null

    return (
      <CustomRadio
        disabled={!hidden}
        value={isScheduled}
        label={'是否排程上版'}
        setState={onPublishInfoIsScheduledChange} />
    )
  }, [hidden, onPublishInfoIsScheduledChange, isScheduled, status])

  const dateTimeSelector = useMemo(() => {
    if (status == '已發布') return null
    if (!hidden) return null
    if (!isScheduled) return null

    return (
      <DateTimeSelector
        disabled={status === '已發布'}
        defaultValue={scheduledAt}
        title={'排程日期'}
        setState={onPublishReservedPublishDateTimeChange} />
    )
  }, [hidden, onPublishReservedPublishDateTimeChange, isScheduled, status, scheduledAt])

  return <section id="publishInfo">
    <div>
      <Stack direction={"column"} spacing={2}>
        {isHiddenRadio}
        {isPublishedRadio}
        {dateTimeSelector}
      </Stack>
    </div>
  </section>;
}

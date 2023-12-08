import React from 'react';
import Selector from './base/Selector';
import useTagSelectData from './customHook/useTagSelectData';
import useNormalize from './customHook/useNormalize';
import useFormatGroupLabel from './customHook/useFormatGroupLabel';

export default function MultiTagSelectSort({
  defaultSelected,
  creatable = false,
  width = null,
  setState = null
}) {

  const { groupOptions } = useTagSelectData()

  const defaultOption = useNormalize(defaultSelected)
  const formatGroupLabel = useFormatGroupLabel()

  return (
    <Selector
      isMulti
      creatable={creatable}
      options={groupOptions}
      controlWidth={width}
      setState={setState}
      defaultSelected={defaultOption}
      formatGroupLabel={formatGroupLabel}
      name="標籤"
    />
  );
}

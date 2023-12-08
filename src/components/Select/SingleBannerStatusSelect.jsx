import React from 'react';
import Selector from './base/Selector';
import useNormalize from './customHook/useNormalize';
import useBannerStatusSelectData from './customHook/useBannerStatusSelectData';

export default function SingleStatusSelect({
  creatable,
  defaultSelected,
  width = null,
  height = null,
  setState
}) {

  const statusOptions = useBannerStatusSelectData()
  const defaultOption = useNormalize(defaultSelected)

  return (
    <Selector
      creatable={creatable}
      options={statusOptions}
      controlWidth={width}
      controlHeight={height}
      setState={setState}
      defaultSelected={defaultOption}
    />
  );
}

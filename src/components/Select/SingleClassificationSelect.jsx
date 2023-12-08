import React, { useMemo } from 'react';
import Selector from './base/Selector';
import useClassificationSelectData from './customHook/useClassificationSelectData';
import useNormalize from './customHook/useNormalize';

export default function SingleClassificationSelect({
  creatable,
  defaultSelected,
  width = null,
  height = null,
  setState = null
}) {
  console.log("🚀 ~ file: SingleClassificationSelect.jsx:12 ~ defaultSelected:", defaultSelected)

  const classOptions = useClassificationSelectData()
  const defaultOption = useNormalize(defaultSelected)
  console.log("🚀 ~ file: SingleClassificationSelect.jsx:19 ~ defaultOption:", defaultOption)
  return (
    <Selector
      creatable={creatable}
      options={classOptions}
      controlWidth={width}
      controlHeight={height}
      setState={setState}
      defaultSelected={defaultOption}
    />
  );
}

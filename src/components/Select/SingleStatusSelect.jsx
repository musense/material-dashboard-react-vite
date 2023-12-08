import React from 'react';
import Selector from './base/Selector';
import useNormalize from './customHook/useNormalize';
import useStatusSelectData from './customHook/useStatusSelectData';

//* classRef: parent form get selected value
export default function SingleStatusSelect({
  creatable,
  defaultSelected,
  width = null,
  height = null,
  setState
}) {

  const statusOptions = useStatusSelectData();
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

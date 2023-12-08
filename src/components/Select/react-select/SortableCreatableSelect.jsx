import React from "react";
import { SortableContainer } from 'react-sortable-hoc';
import CreatableSelect from 'react-select/creatable';

export default function SortableCreatableSelect(props) {
  const SortableCreatable = SortableContainer(CreatableSelect)

  return <SortableCreatable {...props} />
}

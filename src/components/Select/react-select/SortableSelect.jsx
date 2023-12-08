import React from "react";
import { SortableContainer } from 'react-sortable-hoc';
import Select from 'react-select';
export default function SortableSelect(props) {

  const SortableSelect = SortableContainer(Select)

  return <SortableSelect {...props} />;
}

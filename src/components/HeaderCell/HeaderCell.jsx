import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@views/Icons/Icon';

export default function HeaderCell({
  name,
  selectedPatchKey = '',
  patchKey = '',
  dataType = '',
  patchType = '',
  className = '',
  reducerName = ''
}) {

  const dispatch = useDispatch();
  const getSortingDirection = (state) => state[reducerName]['sortingMap'][patchKey]

  const sortingDirection = useSelector(getSortingDirection);

  const onSortingClick = (type, key) => {
    dispatch({
      type: type,
      payload: {
        key: key
      }
    })
  }
  let inputProps = {
    value:
      dataType === '__edit_cell__'
        ? '編輯'
        : dataType === '__checkbox__'
          ? '選擇'
          : name
  }

  if (patchKey) {
    inputProps = {
      ...inputProps,
      onClick: () => onSortingClick(patchType, patchKey),
      style: { cursor: 'pointer' },
    }
  }

  const icon = (patchKey) => {
    if (!patchKey) return null
    const iconName = sortingDirection === 'asc' ? 'arrowDown' : 'arrowUp'
    return < Icon icon={iconName} />
  };

  const activeClassName = patchKey === selectedPatchKey ? 'active' : ''
  if (dataType === '__checkbox__') {
    return <div className={`header-cell ${className}`}>
      <input id={'select-all'} type="checkbox" {...inputProps}
        style={{ marginRight: '5px', width: 'auto', height: 'auto' }} />
      <span {...inputProps}> {inputProps.value}</span>
    </div>
  }
  return <div className={`header-cell ${activeClassName} ${className}`}>
    <span {...inputProps}> {inputProps.value}</span>
    {icon(patchKey)}
  </div>;
}
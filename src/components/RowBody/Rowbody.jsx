import React from 'react';
import MyScrollbar from '../MyScrollbar/MyScrollbar'
import BodyRow from './BodyRow';

const InnerBodyRow = React.memo(BodyRow);

export default function RowBody({
  headerConfig,
  showList,
  handleOpenDialog,
  setMediaInfo = null,
  className = '',
  selectedId = '',
  selectedIdArray = [],
  height = null,
  setStatus = null,
}) {
  console.log("🚀 ------------------------------------------------------------🚀")
  console.log("🚀 ~ file: Rowbody.jsx:18 ~ selectedIdArray:", selectedIdArray)
  console.log("🚀 ------------------------------------------------------------🚀")

  const headerRow = headerConfig.headerRow
  return (
    <MyScrollbar height={height}>
      <div className={`view-body ${className}`}>
        {
          showList && showList.length > 0 && showList.map((item, index) => {
            return (
              <InnerBodyRow
                key={index}
                headerRow={headerRow}
                item={item}
                handleOpenDialog={handleOpenDialog}
                setMediaInfo={setMediaInfo}
                className={
                  selectedIdArray.length > 0
                    ? selectedIdArray.includes(item._id)
                      ? 'selected'
                      : ''
                    : typeof selectedId === 'string'
                      ? selectedId === item._id
                        ? 'selected' : ''
                      : ''
                }
                setStatus={setStatus}
              />
            );
          })
        }
      </div>
    </MyScrollbar>
  );
}

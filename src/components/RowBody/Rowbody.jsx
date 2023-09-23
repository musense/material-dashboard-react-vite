import React from 'react';
import MyScrollbar from './../MyScrollbar/MyScrollbar'
import BodyRow from '../BodyRow/BodyRow';

const InnerBodyRow = React.memo(BodyRow);

export default function RowBody({
    headerConfig,
    showList,
    handleOpenDialog,
    setMediaInfo = null,
    className = '',
    selectedId = ''
}) {

    const headerRow = headerConfig.headerRow
    return (
        <MyScrollbar>
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
                                className={selectedId === item._id ? 'selected' : ''}
                            />
                        );
                    })
                }
            </div>
        </MyScrollbar>
    );
}

import React from 'react';
import MyScrollbar from './../MyScrollbar/MyScrollbar'
import BodyRow from '../BodyRow/BodyRow';

export default function RowBody({
    headerConfig,
    showList,
    handleOpenDialog,
    setMediaInfo = null,
    className = ''
}) {

    const headerRow = headerConfig.headerRow
    return (
        <MyScrollbar>
            <div className={`view-body ${className}`}>
                {
                    showList && showList.length > 0 && showList.map((item, index) => {
                        return (
                            <BodyRow
                                key={index}
                                headerRow={headerRow}
                                item={item}
                                handleOpenDialog={handleOpenDialog}
                                setMediaInfo={setMediaInfo}
                            />
                        );
                    })
                }
            </div>
        </MyScrollbar>
    );
}



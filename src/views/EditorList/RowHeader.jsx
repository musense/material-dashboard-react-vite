import React from "react";
import HeaderCell from '../../components/HeaderCell/HeaderCell'


export default function RowHeader({ headerConfig, selectedPatchKey }) {
    return <div data-attr="data-header" className='view-header'>
        <InnerHeader
            headerMap={headerConfig.headerRow}
            patchType={headerConfig.patchType}
            reducerName={headerConfig.reducerName}
            selectedPatchKey={selectedPatchKey}
        />
    </div>;
}

const InnerHeader = React.memo(Header)
const InnerHeaderCell = React.memo(HeaderCell)


function Header({
    headerMap,
    patchType,
    reducerName,
    selectedPatchKey
}) {
    return <div className="header-row">
        {headerMap.map((cell, index) => {
            return <InnerHeaderCell
                key={index}
                className={cell.className}
                name={cell.name}
                patchKey={cell.patchKey}
                dataType={cell.type}
                patchType={patchType}
                reducerName={reducerName}
                selectedPatchKey={selectedPatchKey}
            />
        })}
    </div>;
}
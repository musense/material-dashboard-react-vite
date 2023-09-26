import React from "react";
import getUpdateDateTime from "../../utils/getUpdateDateTime";
import BodyCell from "../BodyCell/BodyCell";
import EditBodyCell from "../EditBodyCell/EditBodyCell";
import Stack from "@mui/material/Stack";

const InnerEditBodyCell = React.memo(EditBodyCell)

export default function BodyRow({
    headerRow,
    item,
    handleOpenDialog,
    setMediaInfo,
    className
}) {
    return <div className={`body-row ${className}`}>
        {headerRow.map((configItem, index) => {
            let cellContent
            if (configItem.patchKey?.includes(".")) {
                const splitPatchKey = configItem.patchKey.split(".")
                cellContent = item[splitPatchKey[0]] ? item[splitPatchKey[0]][splitPatchKey[1]] : null
            } else {
                cellContent = item[configItem.patchKey]
            }
            switch (configItem.type) {
                case "string": {
                    return <BodyCell key={index} className={configItem.className}>
                        {cellContent}
                    </BodyCell>
                }
                case "stringd": {
                    return <BodyCell key={index} className={configItem.className} >
                        <Stack spacing={1} direction={'column'} >
                            <span style={{
                                color: cellContent === '已發布' ? 'green'
                                    : cellContent === '已排程' ? 'red'
                                        : cellContent === '草稿' ? 'black'
                                            : 'grey',
                                fontWeight: 'bold'
                            }}>
                                {cellContent}
                            </span>
                            <span>
                                {
                                    item[configItem.checkKey[0]]
                                        ? getUpdateDateTime(item[configItem.showKeys[0]])
                                        : item[configItem.checkKey[1]]
                                            ? getUpdateDateTime(item[configItem.showKeys[1]])
                                            : null
                                }
                            </span>
                        </Stack>
                    </BodyCell>
                }
                case "stringl": {
                    return <BodyCell key={index} className={configItem.className} >
                        <div className={'ellipsis'}>
                            {cellContent}
                        </div>
                    </BodyCell>
                }
                case "date": {
                    return <BodyCell key={index} className={configItem.className}>
                        {getUpdateDateTime(cellContent)}
                    </BodyCell>
                }
                case "datep": {
                    return <BodyCell key={index} className={configItem.className} >
                        <Stack spacing={0} direction={'column'} >
                            <span>{getUpdateDateTime(item[configItem.showKeys[0]])}</span>
                            <span>~</span>
                            <span>{getUpdateDateTime(item[configItem.showKeys[1]])}</span>
                        </Stack>
                    </BodyCell>
                }
                case "dateps": {
                    let content
                    if (item[configItem.checkKey[0]] === true) {
                        content = <span>常駐</span>
                    } else {
                        content = (<>
                            <span>{getUpdateDateTime(item[configItem.showKeys[0]])}</span>
                            <span>~</span>
                            <span>{getUpdateDateTime(item[configItem.showKeys[1]])}</span>
                        </>
                        )
                    }
                    return <BodyCell key={index} className={configItem.className}>
                        <Stack spacing={0} direction={'column'} >
                            {content}
                        </Stack>
                    </BodyCell>
                }
                case "image": {
                    let imageSrc, imageTitle, imageAlt
                    if (configItem.src?.includes(".")) {
                        const splitSrc = configItem.src.split(".")
                        const splitCheckKey = configItem.checkKey.split(".")
                        const splitAlt = configItem.alt.split(".")
                        imageSrc = item[splitSrc[0]][splitSrc[1]]
                        imageTitle = item[splitCheckKey[0]][splitCheckKey[1]]
                        imageAlt = item[splitAlt[0]][splitAlt[1]]
                    } else {
                        imageSrc = item[configItem.src]
                        imageTitle = item[configItem.checkKey]
                        imageAlt = item[configItem.alt]
                    }
                    return <BodyCell key={index} className={configItem.className}>
                        {item[configItem.checkKey] !== ''
                            ? (
                                <img
                                    src={imageSrc}
                                    title={imageTitle}
                                    alt={imageAlt}
                                    onClick={e => setMediaInfo(e, item)} />
                            ) : '無圖片/縮圖'}
                    </BodyCell>
                }
                case "number": {
                    return <BodyCell key={index} className={configItem.className}>
                        {Number(cellContent)}
                    </BodyCell>
                }
                case "number-": {
                    return <BodyCell key={index} className={configItem.className[item[configItem.checkKey]]}>
                        {
                            item[configItem.checkKey]
                                ? Number(cellContent)
                                : <span>-</span>
                        }
                    </BodyCell>
                }
                case '__edit_cell__': {
                    let copyText
                        , deleteText = item.name
                        , editData = item
                    if (configItem.copyText.includes(".")) {
                        const splitText = configItem.copyText.split(".")
                        copyText = item[splitText[0]][splitText[1]]
                    } else {
                        copyText = item[configItem.copyText]
                    }

                    if (configItem.deleteText) {
                        deleteText = item[configItem.deleteText]
                    }
                    if (configItem.deleteText?.includes(".")) {
                        const splitDeleteText = configItem.deleteText.split(".")
                        deleteText = item[splitDeleteText[0]][splitDeleteText[1]]
                    }

                    if (configItem.editData) {
                        editData = item[configItem.editData]
                    }
                    return <InnerEditBodyCell
                        key={index}
                        copyText={copyText}
                        id={item._id}
                        name={deleteText}
                        editType={configItem.editType}
                        editData={editData}
                        handleOpenDialog={handleOpenDialog}
                        className={configItem.className}
                    />
                }
                default: {
                    return <BodyCell key={index}>
                        {null}
                    </BodyCell>
                }
            }
        })}
    </div>;
}
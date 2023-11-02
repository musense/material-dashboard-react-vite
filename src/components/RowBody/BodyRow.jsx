import React from "react";
import getUpdateDateTime from "../../utils/getUpdateDateTime";
import BodyCell from "../BodyCell/BodyCell";
import EditBodyCell from "../EditBodyCell/EditBodyCell";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Icon from "../../views/Icons/Icon";

const InnerEditBodyCell = React.memo(EditBodyCell)

export default function BodyRow({
  headerRow,
  item,
  handleOpenDialog,
  setMediaInfo,
  className,
  setStatus = null
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
        // string date period
        case "stringdp": {
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
        // long string
        case "stringl": {
          return <BodyCell key={index} className={configItem.className} >
            <div title={cellContent}
              style={{
                width: '100%',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}>
              {cellContent}
            </div>
          </BodyCell>
        }
        // long string 5 line
        case "stringl5lines": {
          return <BodyCell key={index} className={configItem.className} >
            <div title={cellContent} className={'ellipsis'}>
              {cellContent}
            </div>
          </BodyCell>
        }
        case "stringicon": {
          if (cellContent) {
            return <BodyCell key={index} className={configItem.className} >
              <Icon icon={'success'} />
            </BodyCell>
          }
          return <BodyCell key={index} className={configItem.className} >
            <Icon icon={'fail'} />
          </BodyCell>
        }
        case "date": {
          if (getUpdateDateTime(cellContent) === 'Not a valid date') {
            return <BodyCell key={index} className={configItem.className}>
              <span style={{ color: 'red' }}>Not a valid date</span>
            </BodyCell>
          }
          return <BodyCell key={index} className={configItem.className}>
            {getUpdateDateTime(cellContent)}
          </BodyCell>
        }
        // date period
        case "datep": {
          return <BodyCell key={index} className={configItem.className} >
            <Stack spacing={0} direction={'column'} >
              <span>{getUpdateDateTime(item[configItem.showKeys[0]])}</span>
              <span>~</span>
              <span>{getUpdateDateTime(item[configItem.showKeys[1]])}</span>
            </Stack>
          </BodyCell>
        }
        // date period with alternating string value
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
          let imageSmallImage, imageLargeImage, imageAlt
          if (configItem.src?.includes(".")) {
            const splitSrc = configItem.src.split(".")
            const splitCheckKey = configItem.checkKey.split(".")
            const splitAlt = configItem.alt.split(".")
            imageSmallImage = item[splitSrc[0]][splitSrc[1]]
            imageLargeImage = item[splitCheckKey[0]][splitCheckKey[1]]
            imageAlt = item[splitAlt[0]][splitAlt[1]]
          } else {
            imageSmallImage = item[configItem.src]
            imageLargeImage = item[configItem.checkKey]
            imageAlt = item[configItem.alt]
          }
          return <BodyCell key={index} className={configItem.className}>
            {imageSmallImage !== ''
              ? (
                <img
                  src={imageSmallImage}
                  title={imageLargeImage}
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
        // number with alternating '-' sign
        case "number-": {
          return <BodyCell key={index} className={configItem.className[item[configItem.checkKey]]}>
            {
              item[configItem.checkKey]
                ? Number(cellContent)
                : <span>-</span>
            }
          </BodyCell>
        }
        case '__checkbox__': {
          return <BodyCell key={index} className={configItem.className}>
            <input id={`checkbox_${item[configItem.checkKey]}`} style={{}} type="checkbox" value={item[configItem.checkKey]}

              onChange={e => {
                e.target.checked
                  ? setStatus(prevState => [...prevState, e.target.value])
                  : setStatus(prevState => prevState.filter(value => value !== e.target.value))
              }}
            />
          </BodyCell>
        }
        // EDIT_CELL with structured contents and styles
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
            deleteButton={configItem.deleteButton ?? true}
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
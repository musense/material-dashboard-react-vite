import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Icon from '@views/Icons/Icon';

export default function IconCell({
    iconName,
    iconTitle,
    callback,
    copy = false,
    copyText = undefined
}) {

    const iconCell = ({ iconName, iconTitle, callback = null }) => {
        let inputProps = (callback) => ({
            title: iconTitle,
            className: "edit-icon-input",
            type: "button",
            ...callback && { 'onClick': callback }
        })
        return <div className="edit-icon-wrapper" >
            <input {...inputProps(callback)} />
            < Icon icon={iconName} />
        </div>
    }

    let content
    if (!copy) {
        content = iconCell({ iconName, iconTitle, callback })
    } else {
        content = <CopyToClipboard text={copyText} onCopy={callback}>
            {iconCell({ iconName, iconTitle })}
        </CopyToClipboard>
    }
    return content
}
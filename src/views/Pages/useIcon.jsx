import React, { useMemo } from "react";
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Email from '@material-ui/icons/Email';
import Face from '@material-ui/icons/Face';

export default function useIcon(inputAdornmentIcon) {
    const lockIcon = useMemo(() => {
        return <InputAdornment position='end'>
            <Icon className={inputAdornmentIcon}>
                lock_outline
            </Icon>
        </InputAdornment>
    }, [inputAdornmentIcon])

    const emailIcon = useMemo(() => {
        return <InputAdornment position='end'>
            <Email className={inputAdornmentIcon} />
        </InputAdornment>
    }, [inputAdornmentIcon])

    const faceIcon = useMemo(() => {
        return <InputAdornment position='end'>
            <Face className={inputAdornmentIcon} />
        </InputAdornment>;
    }, [inputAdornmentIcon])

    return {
        lockIcon,
        emailIcon,
        faceIcon
    };
}

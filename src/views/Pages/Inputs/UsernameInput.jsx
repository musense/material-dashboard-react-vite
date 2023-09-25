import React from "react";
import CustomInput from "@components/CustomInput/CustomInput";

export default function UsernameInput({
    classes,
    icon,
}) {
    return <CustomInput
        labelText='Name...'
        id='name'
        formControlProps={{
            fullWidth: true,
            className: classes.formControlClassName,
        }}
        inputProps={{
            required: true,
            type: 'text',
            name: 'username',
            endAdornment: icon,
        }} />;
}

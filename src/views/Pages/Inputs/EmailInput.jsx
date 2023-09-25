import React from "react";
import CustomInput from "@components/CustomInput/CustomInput";

export default function EmailInput({
    errors,
    classes,
    icon
}) {
    return <CustomInput
        labelText='Email...'
        id='email'
        error={errors.username || errors.invalidEmailOrPassword}
        formControlProps={{
            fullWidth: true,
            className: classes.formControlClassName,
        }}
        inputProps={{
            required: true,
            name: 'username',
            endAdornment: icon,
        }} />;
}

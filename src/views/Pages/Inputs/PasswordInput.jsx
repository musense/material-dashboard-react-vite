import React from "react";
import CustomInput from "@components/CustomInput/CustomInput";

export default function PasswordInput({
    errors,
    classes,
    icon
}) {
    return <CustomInput
        labelText='Password'
        id='password'
        error={errors.password || errors.invalidEmailOrPassword}
        formControlProps={{
            fullWidth: true,
            className: classes.formControlClassName,
        }}
        inputProps={{
            type: 'password',
            required: true,
            endAdornment: icon,
        }} />;
}

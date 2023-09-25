import React, { useMemo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import customInputStyle from "@assets/jss/material-dashboard-react/components/customInputStyle.jsx";

// eslint-disable-next-line react-refresh/only-export-components
function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    onInputChange
  } = props;

  const labelClasses = useMemo(() => {
    return classNames({
      [" " + classes.labelRootError]: error,
      [" " + classes.labelRootSuccess]: success && !error
    });
  }, [classes.labelRootError, classes.labelRootSuccess, error, success])

  const underlineClasses = useMemo(() => {
    return classNames({
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true
    });
  }, [classes.underline, classes.underlineError, classes.underlineSuccess, error, success])

  const marginTop = useMemo(() => {
    return classNames({
      [classes.marginTop]: labelText === undefined
    });
  }, [classes.marginTop, labelText])

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined
        ? (
          <InputLabel
            className={classes.labelRoot + labelClasses}
            htmlFor={id}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        )
        : null}
      <Input
        onChange={onInputChange}
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        id={id}
        {...inputProps}
      />
      {error
        ? <Clear className={classes.feedback + " " + classes.labelRootError} />
        : success
          ? <Check className={classes.feedback + " " + classes.labelRootSuccess} />
          : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};

// eslint-disable-next-line react-refresh/only-export-components
export default withStyles(customInputStyle)(CustomInput);

import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Check from '@material-ui/icons/Check';

export default function RememberMeCheckBox({
    classes,
    rememberMeChecked,
    setRememberMeChecked
}) {
    return <FormControlLabel
        classes={{
            root: classes.checkboxLabelControl +
                ' ' +
                classes.checkboxLabelControlClassName,
            label: classes.checkboxLabel,
        }}
        control={<Checkbox
            tabIndex={-1}
            checked={rememberMeChecked}
            onChange={(e) => setRememberMeChecked(e.target.checked)}
            checkedIcon={<Check className={classes.checkedIcon} />}
            icon={<Check className={classes.uncheckedIcon} />}
            classes={{
                checked: classes.checked,
                root: classes.checkRoot,
            }} />}
        label={<span>記住我</span>} />;
}

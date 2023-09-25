import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@components/Card/Card.jsx';
import CardBody from '@components/Card/CardBody.jsx';
import CardFooter from '@components/Card/CardFooter.jsx';
import CardHeader from '@components/Card/CardHeader.jsx';
import Button from '@components/CustomButtons/Button.jsx';
import GridContainer from '@components/Grid/GridContainer.jsx';
import GridItem from '@components/Grid/GridItem.jsx';
import registerPageStyle from '@assets/jss/material-dashboard-react/views/registerPageStyle.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER_USER, REGISTER_USER_ERROR_RESET } from './../../actions/GetUserAction';
import { useNavigate } from 'react-router-dom';
import MessageDialog from '@components/Modal/MessageDialog';
import useModalResult from '@hook/useModalResult';

import UsernameInput from './Inputs/UsernameInput';
import EmailInput from './Inputs/EmailInput';
import PasswordInput from './Inputs/PasswordInput';
import useIcon from './useIcon';

// eslint-disable-next-line react-refresh/only-export-components
function RegisterPage(props) {
  const { classes } = props;

  const errors = {};
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const returnMessage = useSelector((state) => state.getUserReducer.errorMessage);

  const {
    title,
    content,
    success
  } = useModalResult({
    message: returnMessage
  });

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = useCallback(() => setOpen(true), []);

  const {
    lockIcon,
    emailIcon,
    faceIcon
  } = useIcon(classes.inputAdornmentIcon)

  useEffect(() => {
    if (title) handleClickOpen()
  }, [handleClickOpen, title]);

  const register = useCallback((e) => {
    e.preventDefault();

    const fields = ['email', 'username', 'password'];
    const formElements = e.target.elements;

    const formValues = fields
      .map((field) => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    console.group(`register!!!`);
    console.table(formValues);
    console.groupEnd(`register!!!`);
    dispatch({
      type: REGISTER_USER,
      payload: {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      },
    });
  }, [dispatch]);

  const handleClose = useCallback(() => {
    setOpen(false);
    dispatch({
      type: REGISTER_USER_ERROR_RESET
    })
    if (success) {
      navigate('/login', { replace: true })
    }
  }, [dispatch, navigate, success]);

  return (
    <div className={classes.container}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={register}>
            <Card className={classes.cardAnimaton}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color='primary'
              >
                <h4 className={classes.cardTitle}>註冊</h4>
              </CardHeader>
              <CardBody>
                <UsernameInput
                  classes={classes}
                  icon={faceIcon}
                />
                <EmailInput
                  errors={errors}
                  classes={classes}
                  icon={emailIcon}
                />
                <PasswordInput
                  errors={errors}
                  classes={classes}
                  icon={lockIcon}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button type='submit' color='primary' simple size='lg' block>
                  註冊
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>

      <MessageDialog
        dialogTitle={title}
        dialogContent={content}
        open={open}
        setClose={handleClose}
      />

    </div>
  );
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

// eslint-disable-next-line react-refresh/only-export-components
export default withStyles(registerPageStyle)(RegisterPage);



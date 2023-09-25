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
import loginPageStyle from '@assets/jss/material-dashboard-react/views/loginPageStyle.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import MessageDialog from '../../components/Modal/MessageDialog';
import * as GetUserAction from '@actions/GetUserAction';
import useModalResult from '@hook/useModalResult';
import useRememberMe from '@hook/useRememberMe';
import RememberMeCheckBox from './Inputs/RememberMeCheckBox';
import EmailInput from './Inputs/EmailInput';
import PasswordInput from './Inputs/PasswordInput';
import useIcon from './useIcon';
// eslint-disable-next-line react-refresh/only-export-components
function LoginPage(props) {
  const { classes } = props;

  const loginFormRef = useRef(null);

  const errors = {};
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const returnMessage = useSelector((state) => state.getUserReducer.errorMessage);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = useCallback(() => setOpen(true), []);
  const {
    emailIcon,
    lockIcon,
  } = useIcon(classes.inputAdornmentIcon)
  const {
    rememberMeChecked,
    setRememberMeChecked,
    rememberMeStorageSetter
  } = useRememberMe(loginFormRef)

  const {
    title,
    content,
    success
  } = useModalResult({
    message: returnMessage
  })

  useEffect(() => {
    if (title) handleClickOpen()
  }, [handleClickOpen, title]);

  const login = useCallback((e) => {
    e.preventDefault();

    const fields = ['username', 'password'];
    const formElements = e.target.elements;

    rememberMeStorageSetter(formElements.username.value);

    const formValues = fields
      .map((field) => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    dispatch({
      type: GetUserAction.LOGIN_USER,
      payload: {
        username: formValues.username,
        password: formValues.password,
      },
    });
  }, [dispatch, rememberMeStorageSetter]);

  const handleClose = useCallback(() => {
    setOpen(false);
    dispatch({
      type: GetUserAction.REGISTER_USER_ERROR_RESET
    })
    if (success) {
      navigate('/admin/editorList', { replace: true })
    }
  }, [dispatch, navigate, success]);

  return (
    <div className={classes.container}>
      <GridContainer justifyContent='center'>
        <GridItem xs={12} sm={6} md={4}>
          <form ref={loginFormRef} onSubmit={login}>
            <Card className={classes.cardAnimaton}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color='primary'
              >
                <h4 className={classes.cardTitle}>登入</h4>
              </CardHeader>
              <CardBody>
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
                <RememberMeCheckBox
                  classes={classes}
                  rememberMeChecked={rememberMeChecked}
                  setRememberMeChecked={setRememberMeChecked}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button type='submit' color='primary' simple size='lg' block>
                  登入
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  errors: PropTypes.object,
};

// eslint-disable-next-line react-refresh/only-export-components
export default withStyles(loginPageStyle)(LoginPage);




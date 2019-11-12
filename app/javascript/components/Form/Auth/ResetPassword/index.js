import React, { useState } from 'react'
import clsx from 'clsx'
import useForm, { FormContext } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { resetPassword } from './operations.graphql'
import { Avatar, Button, CircularProgress, Container, Grid, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useParams } from 'react-router-dom'
import { useStyles } from '../../style'
import PasswordFormControl from '../../Inputs/passwordFormControl'
import PasswordConfirmFormControl from '../../Inputs/passwordConfirmFormControl'
import { extractErrors, isEmpty } from '../../helper'
import CustomSnackbarContent from '../../../CustomSnackbar/CustomSnackbarContent'

export default function ResetPassword () {
  const classes = useStyles()
  const { resetPasswordToken, email } = useParams()
  const buttonClassname = clsx({ [classes.buttonSuccess]: false })
  const handleServerError = ({ resetPassword }) => {
    if (resetPassword.success) { return }
    setServerErrors(extractErrors(resetPassword))
  }

  const [addUser, { loading: mutationLoading, data }] = useMutation(resetPassword, { onCompleted: handleServerError })
  const methods = useForm({ mode: 'onChange' })
  const { handleSubmit, errors } = methods
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => { setShowPassword(!showPassword) }
  const handleMouseDownPassword = event => { event.preventDefault() }
  const [serverErrors, setServerErrors] = useState([])
  const onSubmit = data => addUser({
    variables:
      {
        resetPasswordToken: resetPasswordToken,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation
      }
  })

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>Reset password</Typography>
        <FormContext {...methods}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <input id='email' type='text' value={email} autoComplete='email' style={{ display: 'none' }} readOnly />
            <Grid container spacing={2}>
              {serverErrors.map((errorMessage) =>
                <Grid key={errorMessage} item xs={12}>
                  <CustomSnackbarContent variant='error' message={errorMessage} />
                </Grid>
              )}
              <Grid item xs={12}>
                <PasswordFormControl
                  showPassword={showPassword}
                  handleClickShowPassword={handleClickShowPassword}
                  handleMouseDownPassword={handleMouseDownPassword}
                  autoComplete='new-password'
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordConfirmFormControl
                  showPassword={showPassword}
                  handleClickShowPassword={handleClickShowPassword}
                  handleMouseDownPassword={handleMouseDownPassword}
                />
              </Grid>
              <Grid item xs={12} className={classes.wrapper}>
                <Button
                  color='primary'
                  variant='contained'
                  type='submit'
                  fullWidth
                  className={buttonClassname}
                  disabled={!isEmpty(errors) || mutationLoading}
                >
                Change password
                </Button>
                {mutationLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </Grid>
              {data && data.resetPassword.success && (
                <Grid item xs={12}>
                  <CustomSnackbarContent variant='success' message='Recovery instructions sent to email.' />
                </Grid>
              )}
            </Grid>
          </form>
        </FormContext>
      </div>
    </Container>
  )
}

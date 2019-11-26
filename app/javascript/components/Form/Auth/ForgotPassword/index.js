'use strict'
import React, { useState } from 'react'
import clsx from 'clsx'
import useForm, { FormContext } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { forgotPassword } from './operations.graphql'
import { Button, CircularProgress, Container, Avatar, Typography, Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useStyles } from '../../style'
import { extractErrors, isEmpty } from '../../helper'
import EmailFormControl from '../Inputs/emailFormControl'
import CustomSnackbarContent from '../../../CustomSnackbar/CustomSnackbarContent'

export default function ForgotPassword () {
  const classes = useStyles()
  const buttonClassname = clsx({ [classes.buttonSuccess]: false })
  const handleServerError = ({ forgotPassword }) => {
    if (forgotPassword.success) { return }
    setServerErrors(extractErrors(forgotPassword))
  }

  const [addUser, { loading: mutationLoading, data }] = useMutation(forgotPassword,
    { onCompleted: handleServerError })

  const methods = useForm({ mode: 'onChange' })
  const { handleSubmit, errors } = methods
  const [serverErrors, setServerErrors] = useState([])

  const onSubmit = data => addUser({
    variables: { email: data.email }
  })

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>Reset your password</Typography>
        <FormContext {...methods}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              {serverErrors.map((errorMessage) =>
                <Grid key={errorMessage} item xs={12}>
                  <CustomSnackbarContent
                    variant='error'
                    message={errorMessage}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography component='h2' variant='subtitle1'>
                Enter your email address and we will send you a link to reset your password.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <EmailFormControl />
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
                Send password reset email
                </Button>
                {mutationLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </Grid>
              {data && data.forgotPassword.success && (
                <Grid item xs={12}>
                  <CustomSnackbarContent
                    variant='success'
                    message='Recovery instructions sent to email.'
                  />
                </Grid>
              )}
            </Grid>
          </form>
        </FormContext>
      </div>
    </Container>
  )
}

'use strict'
import React, { useState } from 'react'
import clsx from 'clsx'
import useForm, { FormContext } from 'react-hook-form'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { signIn } from './operations.graphql'
import {
  Avatar, Button, Checkbox, CircularProgress, Container, FormControlLabel, Grid, Link, Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useHistory } from 'react-router-dom'
import { useStyles } from '../../style'
import PasswordFormControl from '../Inputs/passwordFormControl'
import EmailFormControl from '../Inputs/emailFormControl'
import CustomSnackbarContent from '../../../CustomSnackbar/CustomSnackbarContent'
import { isEmpty, extractErrors } from '../../helper'

export default function Registration () {
  const [serverErrors, setServerErrors] = useState([])
  const classes = useStyles()
  const client = useApolloClient()
  const history = useHistory()
  const buttonClassname = clsx({ [classes.buttonSuccess]: false })
  const handleOnCompleted = ({ signIn }) => {
    if (signIn.success) {
      client.resetStore().then(() => history.push('/'))
    } else {
      setServerErrors(extractErrors(signIn))
    }
  }

  const [addUser, { loading: mutationLoading }] = useMutation(signIn, { onCompleted: handleOnCompleted })

  const methods = useForm({ mode: 'onChange' })
  const { register, handleSubmit, errors } = methods
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => { setShowPassword(!showPassword) }
  const handleMouseDownPassword = event => { event.preventDefault() }

  const onSubmit = data => addUser({
    variables:
      {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe
      }
  })

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>Sign in to ohmuritel</Typography>
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
                <EmailFormControl />
              </Grid>
              <Grid item xs={12}>
                <PasswordFormControl
                  showPassword={showPassword}
                  handleClickShowPassword={handleClickShowPassword}
                  handleMouseDownPassword={handleMouseDownPassword}
                  autoComplete='current-password'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name='rememberMe' inputRef={register} color='primary' />} label='Remember me'
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
                Sign in
                </Button>
                {mutationLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link component='button' onClick={() => history.push('/forgot_password')} variant='body2'>
                  Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component='button' onClick={() => history.push('/registration')} variant='body2'>
                  Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </FormContext>
      </div>
    </Container>
  )
}

import React, { useState } from 'react'
import clsx from 'clsx'
import useForm, { FormContext } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { signUp } from './operations.graphql'
import {
  Avatar, Button, CircularProgress, Container, FormControl, FormHelperText, Grid, Input, InputLabel, Link, Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useHistory } from 'react-router-dom'
import { useStyles } from '../../style'
import PasswordFormControl from '../Inputs/passwordFormControl'
import PasswordConfirmFormControl from '../Inputs/passwordConfirmFormControl'
import EmailFormControlAutoValidation from '../Inputs/emailFormControlAutoValidation'
import { isEmpty, extractErrors } from '../../helper'
import CustomSnackbarContent from '../../../CustomSnackbar/CustomSnackbarContent'

export default function Registration () {
  const classes = useStyles()
  const history = useHistory()
  const buttonClassname = clsx({ [classes.buttonSuccess]: false })
  const handleOnCompleted = ({ signUp }) => {
    if (signUp.success) {
      history.push('/')
      window.location.reload()
    } else {
      setServerErrors(extractErrors(signUp))
    }
  }

  const [addUser, { loading: mutationLoading }] = useMutation(signUp, { onCompleted: handleOnCompleted })

  const methods = useForm({ mode: 'onChange' })
  const { register, handleSubmit, errors } = methods
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => { setShowPassword(!showPassword) }
  const handleMouseDownPassword = event => { event.preventDefault() }
  const [serverErrors, setServerErrors] = useState([])

  const onSubmit = data => addUser({
    variables:
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
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
        <Typography component='h1' variant='h5'>Create new account</Typography>
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
              <Grid item xs={12} sm={6}>
                <FormControl required fullWidth error={!!errors.firstName}>
                  <InputLabel htmlFor='first-name'>First name</InputLabel>
                  <Input
                    id='first-name'
                    name='firstName'
                    inputRef={register({ required: true, maxLength: 50 })}
                    autoComplete='given-name'
                    aria-describedby='first-name-error-required first-name-error-max-length'
                  />
                  {errors.firstName && errors.firstName.type === 'required' && (
                    <FormHelperText id='first-name-error-required'>This is required</FormHelperText>
                  )}
                  {errors.firstName && errors.firstName.type === 'maxLength' && (
                    <FormHelperText id='first-name-error-max-length'>Max length exceeded</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required fullWidth error={!!errors.lastName}>
                  <InputLabel htmlFor='last-name'>Last name</InputLabel>
                  <Input
                    id='last-name'
                    name='lastName'
                    inputRef={register({ required: true, maxLength: 50 })}
                    autoComplete='family-name'
                    aria-describedby='last-name-error-required last-name-error-max-length'
                  />
                  {errors.lastName && errors.lastName.type === 'required' && (
                    <FormHelperText id='last-name-error-required'>This is required</FormHelperText>
                  )}
                  {errors.lastName && errors.lastName.type === 'maxLength' && (
                    <FormHelperText id='last-name-error-max-length'>Max length exceeded</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <EmailFormControlAutoValidation validationMessage='This e-mail has already been taken' />
              </Grid>
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
                Sign up for Ohmuritel
                </Button>
                {mutationLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </Grid>
              <Grid container justify='flex-end'>
                <Grid item>
                  <Link component='button' role='link' onClick={() => history.push('/login')} variant='body2'>
                  Already have an account? Sign in
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

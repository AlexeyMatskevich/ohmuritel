import React from 'react'
import clsx from 'clsx'
import useForm from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { ADD_USER } from './operations.graphql'
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress
} from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  margin: {
    margin: theme.spacing(1)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

function isEmpty (obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) { return false }
  }
  return true
}

export default function Registration () {
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })
  const classes = useStyles()
  const [
    addUser,
    // eslint-disable-next-line no-unused-vars
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(ADD_USER)

  const buttonClassname = clsx({
    [classes.buttonSuccess]: false
  })

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

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    showPassword: false
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl className={clsx(classes.margin, classes.textField)} error={!!errors.firstName}>
        <InputLabel htmlFor='first-name'>First name</InputLabel>
        <Input
          id='first-name'
          name='firstName'
          inputRef={register({ required: true, maxLength: 50 })}
          aria-describedby='first-name-error-required first-name-error-max-length'
        />
        {errors.firstName && errors.firstName.type === 'required' && (
          <FormHelperText id='first-name-error-required'>This is required</FormHelperText>
        )}
        {errors.firstName && errors.firstName.type === 'maxLength' && (
          <FormHelperText id='first-name-error-max-length'>Max length exceeded</FormHelperText>
        )}
      </FormControl>
      <FormControl className={clsx(classes.margin, classes.textField)} error={!!errors.lastName}>
        <InputLabel htmlFor='last-name'>Last name</InputLabel>
        <Input
          id='last-name'
          name='lastName'
          inputRef={register({ required: true, maxLength: 50 })}
          aria-describedby='last-name-error-required last-name-error-max-length'
        />
        {errors.lastName && errors.lastName.type === 'required' && (
          <FormHelperText id='last-name-error-required'>This is required</FormHelperText>
        )}
        {errors.lastName && errors.lastName.type === 'maxLength' && (
          <FormHelperText id='last-name-error-max-length'>Max length exceeded</FormHelperText>
        )}
      </FormControl>
      <FormControl className={clsx(classes.margin, classes.textField)} error={!!errors.email}>
        <InputLabel htmlFor='email'>Email</InputLabel>
        <Input
          id='email'
          name='email'
          inputRef={register({
            required: true,
            maxLength: 255,
            pattern: /^[a-zA-Z0-9.!\\#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby='email-error-required email-error-pattern'
          endAdornment={
            <InputAdornment position='end'>
              <EmailIcon />
            </InputAdornment>
          }
        />
        {errors.email && errors.email.type === 'required' && (
          <FormHelperText id='email-error-required'>This is required</FormHelperText>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <FormHelperText id='email-error-pattern'>This is invalid email</FormHelperText>
        )}
      </FormControl>
      <FormControl className={clsx(classes.margin, classes.textField)} error={!!errors.password}>
        <InputLabel htmlFor='password'>Password</InputLabel>
        <Input
          id='password'
          name='password'
          type={values.showPassword ? 'text' : 'password'}
          aria-describedby='password-error-required password-error-min-length'
          inputRef={register({ required: true, minLength: 8 })}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password && errors.password.type === 'required' && (
          <FormHelperText id='password-error-required'>This is required</FormHelperText>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <FormHelperText id='password-error-min-length'>Minimal length is 8</FormHelperText>
        )}
      </FormControl>
      <FormControl className={clsx(classes.margin, classes.textField)} error={!!errors.passwordConfirmation}>
        <InputLabel htmlFor='password-confirmation'>Password</InputLabel>
        <Input
          id='password-confirmation'
          name='passwordConfirmation'
          type={values.showPassword ? 'text' : 'password'}
          aria-describedby='password-confirmation-error-required password-confirmation-error-min-length'
          inputRef={register({ required: true, minLength: 8 })}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.passwordConfirmation && errors.passwordConfirmation.type === 'required' && (
          <FormHelperText id='password-confirmation-error-required'>This is required</FormHelperText>
        )}
        {errors.passwordConfirmation && errors.passwordConfirmation.type === 'minLength' && (
          <FormHelperText id='password-confirmation-error-min-length'>Minimal length is 8</FormHelperText>
        )}
      </FormControl>

      <div className={classes.wrapper}>
        <Button
          color='primary'
          variant='contained'
          type='submit'
          className={buttonClassname}
          disabled={!isEmpty(errors) || mutationLoading}
        >
          Sign up for Ohmuritel
        </Button>
        {mutationLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      {/* {mutationError && <p>Error :( Please try again</p>} */}
    </form>
  )
}

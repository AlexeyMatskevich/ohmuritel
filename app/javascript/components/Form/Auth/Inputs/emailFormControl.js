'use strict'
import { FormControl, FormHelperText, Input, InputAdornment, InputLabel, makeStyles } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const useStyles = makeStyles(theme => ({
  mail: {
    margin: theme.spacing(1.5)
  }
}))

export default function EmailFormControl () {
  const classes = useStyles()
  const { errors, register } = useFormContext()
  const emailPattern = /^[a-zA-Z0-9.!\\#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
  const requiredAria = 'email-error-required'
  const patternAria = 'email-error-pattern'
  const serverAria = 'email-server-error'

  return (
    <FormControl required fullWidth error={!!errors.email}>
      <InputLabel htmlFor='email'>Email</InputLabel>
      <Input
        id='email'
        name='email'
        type='email'
        inputRef={register({
          required: true,
          maxLength: 255,
          pattern: emailPattern
        })}
        aria-describedby={`${requiredAria} ${patternAria} ${serverAria}`}
        autoComplete='email'
        endAdornment={
          <InputAdornment className={classes.mail} position='end'>
            <EmailIcon />
          </InputAdornment>
        }
      />
      {errors.email && errors.email.type === 'required' && (
        <FormHelperText id={requiredAria}>This is required</FormHelperText>
      )}
      {errors.email && errors.email.type === 'pattern' && (
        <FormHelperText id={patternAria}>You have entered an invalid e-mail address</FormHelperText>
      )}
    </FormControl>
  )
}

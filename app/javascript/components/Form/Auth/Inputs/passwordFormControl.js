'use strict'
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'

export default function PasswordFormControl (props) {
  const { errors, register } = useFormContext()
  const { showPassword, handleClickShowPassword, handleMouseDownPassword, autoComplete } = props
  const requiredAria = 'password-error-required'
  const minLengthAria = 'password-error-min-length'
  const serverAria = 'password-server-error'

  return (
    <FormControl required fullWidth error={!!errors.password}>
      <InputLabel htmlFor='password'>Password</InputLabel>
      <Input
        id='password'
        name='password'
        type={showPassword ? 'text' : 'password'}
        aria-describedby={`${requiredAria} ${minLengthAria} ${serverAria}`}
        inputRef={register({ required: true, minLength: 8 })}
        autoComplete={autoComplete}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {errors.password && errors.password.type === 'required' && (
        <FormHelperText id={requiredAria}>This is required</FormHelperText>)}
      {errors.password && errors.password.type === 'minLength' && (
        <FormHelperText id={minLengthAria}>The password field must be at least 8 characters</FormHelperText>)}
    </FormControl>
  )
}

PasswordFormControl.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired,
  autoComplete: PropTypes.string.isRequired
}

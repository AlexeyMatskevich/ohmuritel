import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'

export default function PasswordConfirmFormControl (props) {
  const { errors, register, watch } = useFormContext()
  const { showPassword, handleClickShowPassword, handleMouseDownPassword } = props
  const requiredAria = 'passwordConfirmation-error-required'
  const minLengthAria = 'passwordConfirmation-error-min-length'
  const validateAria = 'passwordConfirmation-error-validate'
  const serverAria = 'passwordConfirmation-server-error'

  return (
    <FormControl required fullWidth error={!!errors.passwordConfirmation}>
      <InputLabel htmlFor='password-confirmation'>Confirm Password</InputLabel>
      <Input
        id='password-confirmation'
        name='passwordConfirmation'
        type={showPassword ? 'text' : 'password'}
        aria-describedby={`${requiredAria} ${minLengthAria} ${validateAria} ${serverAria}`}
        inputRef={register({
          required: true,
          minLength: 8,
          validate: (value) => value === watch('password')
        })}
        autoComplete='new-password'
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
      {errors.passwordConfirmation && errors.passwordConfirmation.type === 'required' && (
        <FormHelperText id={requiredAria}>This is required</FormHelperText>)}
      {errors.passwordConfirmation && errors.passwordConfirmation.type === 'minLength' && (
        <FormHelperText id={minLengthAria}>The password field must be at least 8 characters</FormHelperText>)}
      {errors.passwordConfirmation && errors.passwordConfirmation.type === 'validate' && (
        <FormHelperText id={validateAria}>The Confirm Password confirmation does not match</FormHelperText>)}
    </FormControl>
  )
}

PasswordConfirmFormControl.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired
}

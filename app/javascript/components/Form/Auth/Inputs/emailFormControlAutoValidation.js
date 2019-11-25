import { FormControl, FormHelperText, Input, InputAdornment, InputLabel, makeStyles } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { userEmailTaken } from './operations.graphql'
import { useLazyQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

const useStyles = makeStyles(theme => ({
  mail: {
    margin: theme.spacing(1.5)
  }
}))

export default function EmailFormControlAutoValidation (props) {
  const { validationMessage } = props
  const classes = useStyles()
  const { errors, register, setError, clearError } = useFormContext()
  const emailPattern = /^[a-zA-Z0-9.!\\#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
  const requiredAria = 'email-error-required'
  const patternAria = 'email-error-pattern'
  const emailTakenAria = 'email-error-already-taken'
  const handleTakenEmail = ({ userEmailTaken }) => {
    userEmailTaken ? setError('email', 'emailTaken') : clearError('email')
  }

  const [getEmail] = useLazyQuery(userEmailTaken, { onCompleted: handleTakenEmail })

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
          pattern: emailPattern,
          validate: debounce(async (value) => {
            getEmail({ variables: { email: value } })
            return true
          }, 1000)
        })}
        aria-describedby={`${requiredAria} ${patternAria} ${emailTakenAria}`}
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
      {errors.email && errors.email.type === 'emailTaken' && (
        <FormHelperText id={emailTakenAria}>{validationMessage}</FormHelperText>
      )}
    </FormControl>
  )
}

EmailFormControlAutoValidation.propTypes = {
  validationMessage: PropTypes.string.isRequired
}

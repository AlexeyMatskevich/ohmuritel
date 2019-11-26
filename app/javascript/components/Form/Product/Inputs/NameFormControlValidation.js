'use strict'
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core'
import debounce from 'lodash/debounce'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useLazyQuery } from '@apollo/react-hooks'
import { productNameTaken } from './operations.graphql'

export default function NameFormControlValidation () {
  const { errors, register, setError, clearError } = useFormContext()
  const requiredAria = 'name-error-required'
  const patternAria = 'name-error-max-length'
  const serverAria = 'name-error-already-taken'

  const handleTakenName = ({ productNameTaken }) => {
    productNameTaken ? setError('name', 'nameTaken') : clearError('name')
  }

  const [getName] = useLazyQuery(productNameTaken, { onCompleted: handleTakenName })

  return (
    <FormControl required fullWidth error={!!errors.name}>
      <InputLabel color='primary' htmlFor='name'>Name</InputLabel>
      <Input
        id='name'
        name='name'
        inputRef={register({
          required: true,
          maxLength: 55,
          validate: debounce(async (value) => {
            getName({ variables: { name: value } })
            return true
          }, 1000)
        })}
        aria-describedby={`${requiredAria} ${patternAria} ${serverAria}`}
      />
      {errors.name && errors.name.type === 'required' && (
        <FormHelperText id={requiredAria}>This is required</FormHelperText>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <FormHelperText id={patternAria}>Max length exceeded</FormHelperText>
      )}
      {errors.name && errors.name.type === 'nameTaken' && (
        <FormHelperText id={serverAria}>This name has already been taken</FormHelperText>
      )}
    </FormControl>
  )
}

'use strict'
import { FormControl, FormHelperText, Input, InputAdornment, InputLabel } from '@material-ui/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function WeightFormControl () {
  const { errors, register } = useFormContext()
  const requiredAria = 'weight-error-required'
  const minAria = 'weight-error-min'

  return (
    <FormControl required fullWidth error={!!errors.weight}>
      <InputLabel htmlFor='weight'>Weight</InputLabel>
      <Input
        id='weight'
        name='weight'
        type='number'
        defaultValue='50'
        inputRef={register({ required: true, min: 1 })}
        aria-describedby={`${requiredAria} ${minAria}`}
        endAdornment={<InputAdornment position='end'>Gm</InputAdornment>}
      />
      {errors.weight && errors.weight.type === 'required' && (
        <FormHelperText id={requiredAria}>This is required</FormHelperText>
      )}
      {errors.weight && errors.weight.type === 'min' && (
        <FormHelperText id={minAria}>Must be greater than 0</FormHelperText>
      )}
    </FormControl>
  )
}

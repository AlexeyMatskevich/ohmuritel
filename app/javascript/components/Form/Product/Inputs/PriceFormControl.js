'use strict'
import { FormControl, FormHelperText, Input, InputAdornment, InputLabel } from '@material-ui/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

export default function PriceFormControl () {
  const { errors, register } = useFormContext()
  const requiredAria = 'price-error-required'
  const minAria = 'price-error-min'

  return (
    <FormControl required fullWidth error={!!errors.price}>
      <InputLabel htmlFor='price'>Price</InputLabel>
      <Input
        id='price'
        name='price'
        type='number'
        defaultValue='5'
        inputRef={register({ required: true, min: 1 })}
        aria-describedby={`${requiredAria} ${minAria}`}
        endAdornment={<InputAdornment position='end'><AttachMoneyIcon /></InputAdornment>}
      />
      {errors.price && errors.price.type === 'required' && (
        <FormHelperText id={requiredAria}>This is required</FormHelperText>
      )}
      {errors.price && errors.price.type === 'min' && (
        <FormHelperText id={minAria}>Must be greater than 0</FormHelperText>
      )}
    </FormControl>
  )
}

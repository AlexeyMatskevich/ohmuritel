'use strict'
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function PreviewDescriptionFormControl () {
  const { errors, register } = useFormContext()
  const requiredAria = 'preview-description-error-required'

  return (
    <FormControl required fullWidth error={!!errors.previewDescription}>
      <InputLabel htmlFor='preview-description'>Description for product page</InputLabel>
      <Input
        id='preview-description'
        name='previewDescription'
        multiline
        inputRef={register({ required: true, min: 1 })}
        aria-describedby={requiredAria}
      />
      {errors.price && errors.price.type === 'required' && (
        <FormHelperText id={requiredAria}>This is required</FormHelperText>
      )}
    </FormControl>
  )
}

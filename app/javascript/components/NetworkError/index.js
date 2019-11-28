'use strict'
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { networkErrors } from '../operations.graphql'
import CustomSnackbar from '../CustomSnackbar'

export default function NetworkError () {
  const { data: error } = useQuery(networkErrors)

  if (error) {
    return error.networkErrors.map((networkError, index) =>
      <CustomSnackbar key={index} variant='error' message={networkError} />
    )
  }

  return <div>{false}</div>
}

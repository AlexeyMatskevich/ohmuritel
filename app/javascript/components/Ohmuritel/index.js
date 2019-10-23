import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { USERS } from './operations.graphql'

export default function Users () {
  const { loading, error, data } = useQuery(USERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.users.map(({ email, fullName }) => (
    <div key={fullName}>
      <p>
        {email}: {fullName}
      </p>
    </div>
  ))
}

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { productsMeta } from './operations.graphql'
import ShopList from '../ShopList'

export default function Home () {
  let police
  const { loading, data } = useQuery(productsMeta)

  if (loading) {
    return false
  } else {
    police = data.currentUser ? data.currentUser.canCreateProduct.value : false
    return (
      <ShopList productsCount={data.productsCount} police={police} />
    )
  }
}

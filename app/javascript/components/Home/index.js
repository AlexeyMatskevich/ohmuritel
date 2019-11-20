import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { productsMeta } from './operations.graphql'
import ShopList from '../ShopList'
import ShopListMobile from '../ShopList/ShopListMobile'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default function Home () {
  let police
  const { loading, data } = useQuery(productsMeta)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  if (loading) {
    return false
  } else {
    police = data.currentUser ? data.currentUser.canCreateProduct.value : false
    if (matches) {
      return <ShopList productsCount={data.productsCount} police={police} />
    } else {
      return <ShopListMobile police={police} />
    }
  }
}

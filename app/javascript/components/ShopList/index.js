'use strict'
import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import ShopItem from '../ShopItem'
import NewItem from '../ShopItem/NewItem'
import { useQuery } from '@apollo/react-hooks'
import { productsPages } from './operations.graphql'
import Pagination from 'material-ui-flat-pagination/lib/Pagination'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import { useStyles } from './style'

export default function ShopList (props) {
  const classes = useStyles()
  const { productsCount, police } = props
  const pageSize = police ? 11 : 12
  const [page, setPage] = useState(1)
  const [productPage, setProductPage] = useState([])
  const { data, fetchMore } = useQuery(productsPages, { variables: { pageSize: pageSize, page: 1 } })
  const findPage = (page, data) => data.productsPages.find((productPage) => parseInt(productPage.id) === page)

  const handleFetchMore = (page) => {
    if (!findPage(page, data)) {
      fetchMore({
        variables: {
          page: page
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev

          return { productsPages: prev.productsPages.concat(fetchMoreResult.productsPages) }
        }
      })
    } else {
      setProductPage(findPage(page, data).products)
    }
  }

  const renderPage = (products) => (
    products.map((product) => (
      <Grid key={product.id} item className={classes.item} xs={12} sm={6} md={4} lg={3} xl={2}>
        <ShopItem product={product} />
      </Grid>
    ))
  )

  useEffect(() => {
    let result
    if (data !== undefined) {
      result = findPage(page, data)
      if (result) setProductPage(result.products)
    }
  }, [data])

  return (
    <Container component='main' maxWidth={false} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align='center' component='h1' variant='h5'>Ohmuritel shop</Typography>
        </Grid>
        {police &&
          <Grid item className={classes.item} xs={12} sm={6} md={4} lg={3} xl={2}>
            <NewItem />
          </Grid>}
        {renderPage(productPage)}
        <Grid item xs={12}>
          <Grid container spacing={1} direction='column' alignItems='center'>
            {data && (
              <Pagination
                nextPageLabel={<NavigateNextIcon />}
                previousPageLabel={<NavigateBeforeIcon />}
                limit={pageSize}
                offset={(page - 1) * pageSize}
                total={productsCount}
                onClick={(e, offset) => {
                  const page = offset / pageSize + 1
                  handleFetchMore(page)
                  setPage(page)
                }}
              />)}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

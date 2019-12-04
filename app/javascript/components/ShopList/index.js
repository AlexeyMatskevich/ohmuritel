'use strict'
import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Button } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import ShopItem from '../ShopItem'
import NewItem from '../ShopItem/NewItem'
import { useLazyQuery } from '@apollo/react-hooks'
import { products } from './operations.graphql'
import Pagination from 'material-ui-flat-pagination/lib/Pagination'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import { useStyles } from './style'

function useHistoryQuery () {
  return new URLSearchParams(useLocation().search)
}

export default function ShopList (props) {
  const classes = useStyles()
  const { productsCount, police } = props
  const history = useHistory()
  const query = useHistoryQuery()
  const pageSize = police ? 11 : 12
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState('creation')
  const [getProducts, { data }] = useLazyQuery(products)
  const handleOnClick = order => {
    console.log('order', order)
    setOrder(order)
    setPage(1)
    getProducts({ variables: { pageSize: pageSize, page: 1, order } })
    history.push(`/shop?page=1&sort_by=${order}`)
  }

  const renderPage = (products) => (
    products.map((product) => (
      <Grid key={product.id} item className={classes.item} xs={12} sm={6} md={4} lg={3} xl={2}>
        <ShopItem product={product} />
      </Grid>
    ))
  )

  useEffect(() => {
    const page = parseInt(query.get('page'))
    const order = query.get('sort_by')
    if (page) {
      setPage(page)
      getProducts({ variables: { pageSize: pageSize, page, order } })
    } else {
      getProducts({ variables: { pageSize: pageSize, page: 1 } })
    }
  }, [])

  return (
    <Container component='main' maxWidth={false} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align='center' component='h1' variant='h5'>Ohmuritel shop</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} direction='row' justify='flex-start' alignItems='baseline'>
            <Grid item><Typography component='p' variant='subtitle1'>Sort by:</Typography></Grid>
            <Grid item><Button onClick={() => handleOnClick('rating')}>Rating</Button></Grid>
            <Grid item><Button onClick={() => handleOnClick('reviews')}>Reviews</Button></Grid>
            <Grid item><Button onClick={() => handleOnClick('price')}>Price</Button></Grid>
            <Grid item><Button onClick={() => handleOnClick('low_price')}>Low price</Button></Grid>
            <Grid item><Button onClick={() => handleOnClick('weight')}>Weight</Button></Grid>
            <Grid item><Button onClick={() => handleOnClick('creation')}>Default</Button></Grid>
          </Grid>
        </Grid>
        {police &&
          <Grid item className={classes.item} xs={12} sm={6} md={4} lg={3} xl={2}>
            <NewItem />
          </Grid>}
        {data && renderPage(data.products)}
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
                  getProducts({ variables: { pageSize: pageSize, page, order } })
                  setPage(page)
                  history.push(`/shop?page=${page}&sort_by=${order}`)
                }}
              />)}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

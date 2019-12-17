'use strict'
import React, { useEffect } from 'react'
import { Container, Grid, Typography, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'
import ShopItem from '../../ShopItem'
import NewItem from '../../ShopItem/NewItem'
import { useLazyQuery } from '@apollo/react-hooks'
import { useHistory, useLocation } from 'react-router-dom'
import { productsConnection } from './../operations.graphql'
import { useStyles } from './../style'
import { Waypoint } from 'react-waypoint'
import { loadMore } from '../../../utils/graphql'

function useHistoryQuery () {
  return new URLSearchParams(useLocation().search)
}

export default function ShopListMobile (props) {
  const classes = useStyles()
  const { police } = props
  const query = useHistoryQuery()
  const history = useHistory()
  const [getProducts, { loading, data, fetchMore }] = useLazyQuery(productsConnection)
  const [order, setOrder] = React.useState('')
  const handleChange = event => {
    const order = event.target.value
    setOrder(order)
    getProducts({ variables: { order } })
    history.push(`/shop?sort_by=${order}`)
  }

  const renderPage = (edges) => (
    edges.map(({ node }, i) => (
      <Grid key={node.id} item className={classes.item} xs={12} sm={6} md={4} lg={3} xl={2}>
        <ShopItem product={node} />
        {data.productsConnection.pageInfo.hasNextPage && i === edges.length - 4 && (
          <Waypoint onEnter={() => { loadMore(fetchMore, data, 'productsConnection') }} />
        )}
      </Grid>
    ))
  )

  useEffect(() => {
    const order = query.get('sort_by')
    if (order) {
      getProducts({ variables: { order } })
    } else {
      getProducts()
    }
  }, [])
  return (
    <Container component='main' maxWidth={false} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align='center' component='h1' variant='h5'>Ohmuritel shop</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id='sort-by'>Sort By</InputLabel>
            <Select
              labelId='sort-by'
              value={order}
              onChange={handleChange}
            >
              <MenuItem value='creation'><em>Default</em></MenuItem>
              <MenuItem value='rating'>Rating</MenuItem>
              <MenuItem value='reviews'>Reviews</MenuItem>
              <MenuItem value='price'>Price</MenuItem>
              <MenuItem value='low_price'>Low price</MenuItem>
              <MenuItem value='weight'>Weight</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {police &&
          <Grid item className={classes.item} xs={12} sm={6} md={4} lg={3} xl={2}>
            <NewItem />
          </Grid>}
        {!loading && data && renderPage(data.productsConnection.edges)}
        {!loading && data && !data.productsConnection.pageInfo.hasNextPage && (
          <Grid item xs={12}>
            <Typography align='center' component='p' variant='subtitle1'>You looked at all the goods</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

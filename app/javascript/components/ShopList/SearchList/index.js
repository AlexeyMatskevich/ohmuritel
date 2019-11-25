import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import ShopItem from '../../ShopItem'
import { useQuery } from '@apollo/react-hooks'
import { searchProductsPages, searchProductsCount } from './operations.graphql'
import Pagination from 'material-ui-flat-pagination/lib/Pagination'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import { useStyles } from '../style'
import { useLocation } from 'react-router-dom'

function useHistoryQuery () {
  return new URLSearchParams(useLocation().search)
}

export default function ShopList () {
  const classes = useStyles()
  const pageSize = 12
  const [page, setPage] = useState(1)
  const [productPage, setProductPage] = useState([])
  const query = useHistoryQuery()
  const { data: count } = useQuery(searchProductsCount, { variables: { search: query.get('q') } })
  const { data, fetchMore } = useQuery(searchProductsPages, {
    variables: {
      pageSize,
      page: 1,
      search: query.get('q')
    }
  })

  const renderPage = (products) => {
    if (products.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography align='center' component='h2' variant='subtitle2'>
            No results were found for {query.get('q')}
          </Typography>
        </Grid>
      )
    } else {
      return products.map((product) => (
        <Grid key={product.id} item className={classes.item} xs={12} sm={6} md={4} lg={3} xl={2}>
          <ShopItem product={product} />
        </Grid>
      ))
    }
  }

  useEffect(() => {
    if (data !== undefined) {
      setProductPage(data.searchProductsPages)
    }
  }, [data])

  return (
    <Container component='main' maxWidth={false} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align='center' component='h1' variant='h5'>Search result</Typography>
        </Grid>
        {renderPage(productPage)}
        <Grid item xs={12}>
          <Grid container spacing={1} direction='column' alignItems='center'>
            {count && data && (
              <Pagination
                nextPageLabel={<NavigateNextIcon />}
                previousPageLabel={<NavigateBeforeIcon />}
                limit={pageSize}
                offset={(page - 1) * pageSize}
                total={count.searchProductsCount}
                onClick={(e, offset) => {
                  const page = offset / pageSize + 1
                  fetchMore({
                    variables: {
                      page: page
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev

                      return fetchMoreResult
                    }
                  })
                  setPage(page)
                }}
              />)}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

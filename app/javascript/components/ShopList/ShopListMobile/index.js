'use strict'
import React from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import ShopItem from '../../ShopItem'
import NewItem from '../../ShopItem/NewItem'
import { useQuery } from '@apollo/react-hooks'
import { productsConnection } from './../operations.graphql'
import { useStyles } from './../style'
import { Waypoint } from 'react-waypoint'

export default function ShopListMobile (props) {
  const classes = useStyles()
  const { police } = props
  const { loading, data, fetchMore } = useQuery(productsConnection)

  const renderPage = (edges) => (
    edges.map(({ node }, i) => (
      <Grid key={node.id} item className={classes.item} xs={12} sm={6} md={4} lg={3} xl={2}>
        <ShopItem product={node} />
        {data.productsConnection.pageInfo.hasNextPage && i === edges.length - 4 && (
          <Waypoint onEnter={() => fetchMore({
            variables: {
              cursor: data.productsConnection.pageInfo.endCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.productsConnection.edges
              const pageInfo = fetchMoreResult.productsConnection.pageInfo

              return newEdges.length
                ? {
                  productsConnection: {
                    __typename: previousResult.productsConnection.__typename,
                    edges: [...previousResult.productsConnection.edges, ...newEdges],
                    pageInfo
                  }
                }
                : previousResult
            }
          })}
          />
        )}
      </Grid>
    ))
  )

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

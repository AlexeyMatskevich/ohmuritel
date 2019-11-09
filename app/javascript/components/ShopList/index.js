import React from 'react'
import { Container, Grid, makeStyles, Typography, LinearProgress } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import Item from '../ShopItem'
import NewItem from '../ShopItem/NewItem'
import { PRODUCTS } from './operations.graphql'
import { IsUserLoggedIn } from '../operations.graphql'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  item: {
    display: 'flex'
  }
}))

export default function Home () {
  const classes = useStyles()
  const { loading, data } = useQuery(PRODUCTS)
  const { data: user } = useQuery(IsUserLoggedIn)
  const progress = () => (
    <Grid item className={classes.item} xs={12}>
      <LinearProgress />
    </Grid>
  )

  return (
    <Container component='main' maxWidth={false} className={classes.root}>
      <Grid container spacing={2}>
        {loading && progress()}
        <Grid item xs={12}>
          <Typography align='center' component='h1' variant='h5'>Ohmuritel shop</Typography>
        </Grid>
        {user.isLoggedIn &&
          <Grid item className={classes.item} xs={12} sm={6} md={4} lg={3} xl={2}>
            <NewItem />
          </Grid>}
        {data && data.products.map((product) => (
          <Grid key={product.id} item className={classes.item} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Item product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

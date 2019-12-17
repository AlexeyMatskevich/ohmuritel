import React from 'react'
import { currentOrder } from '../Order/operations.graphql'
import { useQuery } from '@apollo/react-hooks'
import { Container, Grid, Typography, makeStyles } from '@material-ui/core'
import OrderList from '../OrderList'

export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  }
}))

export default function Order () {
  const { data } = useQuery(currentOrder)
  const classes = useStyles()

  return (
    <Container component='main' maxWidth={false} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align='center' component='h1' variant='h5'>Order list</Typography>
        </Grid>
        <Grid item xs={12}>
          {data && data.currentOrder
            ? <OrderList items={data.currentOrder.orderItems} />
            : <Typography align='center' component='p' variant='subtitle1'>There are no products yet.</Typography>}
        </Grid>
      </Grid>
    </Container>
  )
}

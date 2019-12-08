import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  }
})

export default function OrderList (props) {
  const classes = useStyles()
  const { items } = props

  return (
    <Paper className={classes.root}>
      <Table aria-label='Order list'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(orderItem => (
            <TableRow key={orderItem.id}>
              <TableCell><Button>{orderItem.product.name}</Button></TableCell>
              <TableCell>{orderItem.product.price}</TableCell>
              <TableCell>{orderItem.product.weight}</TableCell>
              <TableCell>{orderItem.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

OrderList.propTypes = {
  items: PropTypes.array.isRequired
}

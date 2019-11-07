import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, CardActionArea, Card
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import Rating from '@material-ui/lab/Rating'

const useStyles = makeStyles(theme => ({
  card: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  grow: {
    flexGrow: 1
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

export default function Item (props) {
  const { name, price, previewDescription } = props
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardHeader
          title={name}
          subheader={<Rating value={4.5} readOnly />}
        />
        <CardMedia
          className={classes.media}
          image='/burger.jpg'
          title='Paella dish'
        />
        <CardContent className={classes.content}>
          <Typography variant='body2' color='textSecondary' component='p'>
            {previewDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label='add to basket'>
          <AddShoppingCartIcon />
        </IconButton>
        <div className={classes.grow} />
        <Typography variant='h6' component='p'>
          {price}
        </Typography>
        <AttachMoneyIcon />
      </CardActions>
    </Card>
  )
}

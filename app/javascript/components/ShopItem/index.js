import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, CardActionArea, Card
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import BrokenImageIcon from '@material-ui/icons/BrokenImage'
import Rating from '@material-ui/lab/Rating'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

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
    paddingTop: '56.25%', // 16:9
    position: 'relative'
  },
  brokenImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

export default function Item (props) {
  const { product: { id, name, price, previewDescription, imageUrl } } = props
  const classes = useStyles()
  const history = useHistory()

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => history.push(`/product/${id}`)}>
        <CardHeader
          title={name}
          subheader={<Rating value={4.5} readOnly />}
        />
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={name}
        >
          {!imageUrl && <BrokenImageIcon className={classes.brokenImage} />}
        </CardMedia>
        <CardContent>
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

Item.propTypes = {
  product: PropTypes.object.isRequired
}

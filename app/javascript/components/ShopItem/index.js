'use strict'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, CardActionArea, Card
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import BrokenImageIcon from '@material-ui/icons/BrokenImage'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Rating from '@material-ui/lab/Rating'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addProductToBasket } from './operations.graphql'
import { useMutation } from '@apollo/react-hooks'

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

export default function ShopItem (props) {
  const { product: { id, name, price, previewDescription, imageUrl, rating, slug } } = props
  const classes = useStyles()
  const history = useHistory()
  const [added, setAdded] = useState(false)
  const handleSuccess = ({ addProductToBasket }) => {
    if (addProductToBasket.success) {
      setAdded(true)
    }
  }

  const [addToBasket] = useMutation(addProductToBasket, { variables: { id }, onCompleted: handleSuccess })

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => history.push(`/product/${slug}`)}>
        <CardHeader
          title={name}
          subheader={<Rating value={rating} readOnly />}
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
        {added
          ? (
            <IconButton aria-label='add to basket' disabled>
              <CheckCircleIcon />
            </IconButton>
          )
          : (
            <IconButton aria-label='add to basket' onClick={addToBasket}>
              <AddShoppingCartIcon />
            </IconButton>
          )}
        <div className={classes.grow} />
        <Typography variant='h6' component='p'>
          {price}
        </Typography>
        <AttachMoneyIcon />
      </CardActions>
    </Card>
  )
}

ShopItem.propTypes = {
  product: PropTypes.object.isRequired
}

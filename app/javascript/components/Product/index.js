import React from 'react'
import { useParams } from 'react-router-dom'
import { product } from './operations.graphql'
import { useQuery } from '@apollo/react-hooks'
import {
  Card, CardActionArea, CardActions, CardMedia, Container, Grid, LinearProgress, makeStyles, Typography
} from '@material-ui/core'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import BrokenImageIcon from '@material-ui/icons/BrokenImage'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    position: 'relative'
  },
  brokenImage: {
    position: 'absolute',
    top: '49%',
    left: '49%'
  },
  grow: {
    flexGrow: 1
  }
}))

export default function Product () {
  let trixText
  const classes = useStyles()
  const { id } = useParams()
  const { loading, data } = useQuery(product, { variables: { id: id } })

  const progress = () => (
    <Grid item xs={12}>
      <LinearProgress />
    </Grid>
  )

  if (data === undefined) {
    return (
      <Container component='main' maxWidth={false} className={classes.root}>
        <Grid container spacing={2}>
          {loading && progress()}
        </Grid>
      </Container>
    )
  } else {
    trixText = () => {
      return { __html: `${data.product.description || ''}` }
    }

    return (
      <Container component='main' maxWidth={false} className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align='center' component='h1' variant='h5'>{data.product.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Card>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={data.product.imageUrl}
                  title={data.product.name}
                >
                  {!data.product.imageUrl && <BrokenImageIcon className={classes.brokenImage} />}
                </CardMedia>
              </CardActionArea>
              <CardActions disableSpacing>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Weight: {data.product.weight}
                </Typography>
                <div className={classes.grow} />
                <Typography variant='h6' component='p'>
                  {data.product.price}
                </Typography>
                <AttachMoneyIcon />
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={8}>
            <div dangerouslySetInnerHTML={trixText()} />
          </Grid>
        </Grid>
      </Container>
    )
  }
}

'use strict'
import React from 'react'
import { Divider, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { Waypoint } from 'react-waypoint'
import PropTypes from 'prop-types'
import { reviewsConnection } from './operations.graphql'
import { IsUserLoggedIn } from '../operations.graphql'
import { useQuery } from '@apollo/react-hooks'
import NewReview from './NewReview'
import { loadMore } from '../../utils/graphql'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}))

export default function Reviews (props) {
  const classes = useStyles()
  const { productId } = props
  const { loading, data, fetchMore } = useQuery(reviewsConnection, { variables: { productId } })
  const { data: user } = useQuery(IsUserLoggedIn)

  const getEdges = () => data.reviewsConnection.edges
  const hasNextPage = () => data && getEdges().length > 0 && !data.reviewsConnection.pageInfo.hasNextPage
  const hasNotNextPage = () => data && getEdges().length > 0 && data.reviewsConnection.pageInfo.hasNextPage
  const subtitle = (text) => <Typography align='center' component='p' variant='subtitle1'>{text}</Typography>

  const review = (node, i) => (
    <React.Fragment key={node.id}>
      <ListItem alignItems='flex-start'>
        <ListItemText
          primary={
            <>
              <Rating value={node.rating} readOnly aria-label='rating' />
              <br />
              {node.author.fullName}
            </>
          }
          secondary={node.body}
        />
      </ListItem>
      <Divider variant='middle' component='li' />
      {hasNotNextPage() && i === getEdges().length - 2 && (
        <Waypoint onEnter={() => { loadMore(fetchMore, data, 'reviewsConnection') }} />
      )}
    </React.Fragment>)

  return (
    <>
      {!loading && data && (
        <List className={classes.root}>
          {user.isLoggedIn
            ? <NewReview productId={productId} />
            : subtitle('Register or login into system to leave comments')}
          {getEdges().length === 0 ? subtitle('No reviews yet add') : getEdges().map(({ node }, i) => review(node, i))}
          {hasNextPage() && subtitle('You looked at all the reviews')}
        </List>
      )}
    </>
  )
}

Reviews.propTypes = {
  productId: PropTypes.string.isRequired
}

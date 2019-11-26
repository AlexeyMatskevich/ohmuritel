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
  const pageEnd = () => <Typography align='center' variant='subtitle1'>You looked at all the reviews</Typography>
  const renderNoReview = () => <Typography align='center' variant='subtitle1'>No reviews yet add</Typography>
  const renderLoginOrRegister = () => (
    <Typography align='center' variant='subtitle1'>Register or login into system to leave comments</Typography>
  )

  function review (node, i) {
    return (
      <React.Fragment key={node.id}>
        <ListItem alignItems='flex-start'>
          <ListItemText
            primary={
              <>
                <Rating value={node.rating} readOnly />
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
  }

  return (
    <>
      {!loading && data && (
        <List className={classes.root}>
          {user.isLoggedIn ? <NewReview productId={productId} /> : renderLoginOrRegister()}
          {getEdges().length === 0 ? renderNoReview() : getEdges().map(({ node }, i) => review(node, i))}
          {hasNextPage() && pageEnd()}
        </List>
      )}
    </>
  )
}

Reviews.propTypes = {
  productId: PropTypes.string.isRequired
}

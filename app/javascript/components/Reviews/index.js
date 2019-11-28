'use strict'
import React from 'react'
import { List, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { reviewsConnection } from './operations.graphql'
import { IsUserLoggedIn } from '../operations.graphql'
import { useQuery } from '@apollo/react-hooks'
import NewReview from './NewReview'
import Review from './Review'

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
  const subtitle = (text) => <Typography align='center' component='p' variant='subtitle1'>{text}</Typography>

  return (
    <>
      {!loading && data && (
        <List className={classes.root}>
          {user.isLoggedIn
            ? <NewReview productId={productId} />
            : subtitle('Register or login into system to leave comments')}
          {getEdges().length === 0
            ? subtitle('No reviews yet add')
            : getEdges().map(({ node }, i) => (
              <Review key={node.id} node={node} i={i} fetchMore={fetchMore} data={data} productId={productId} />))}
          {hasNextPage() && subtitle('You looked at all the reviews')}
        </List>
      )}
    </>
  )
}

Reviews.propTypes = {
  productId: PropTypes.string.isRequired
}

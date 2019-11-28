import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Grid, IconButton, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import DeleteIcon from '@material-ui/icons/Delete'
import { Waypoint } from 'react-waypoint'
import { deleteReview } from './operations.graphql'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { reviewsConnection } from '../operations.graphql'
import { loadMore } from '../../../utils/graphql'

const useStyles = makeStyles(() => ({ inline: { display: 'inline' } }))

export default function Review (props) {
  const { node, i, fetchMore, data, productId } = props
  const classes = useStyles()
  const getEdges = () => data.reviewsConnection.edges
  const hasNotNextPage = () => data && getEdges().length > 0 && data.reviewsConnection.pageInfo.hasNextPage
  const client = useApolloClient()
  const [removeReview] = useMutation(deleteReview, {
    update (proxy) {
      const data = proxy.readQuery({ query: reviewsConnection, variables: { productId } })
      client.writeQuery({
        query: reviewsConnection,
        data: {
          reviewsConnection: {
            edges: [...data.reviewsConnection.edges.filter(edge => edge.node.id !== node.id)],
            pageInfo: data.reviewsConnection.pageInfo,
            __typename: data.reviewsConnection.__typename
          }
        },
        variables: { productId }
      })
    }
  })

  function getOnClick () {
    return removeReview({ variables: { id: node.id } })
  }

  return (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemText
          primary={
            <>
              <Grid container justify='space-between'>
                <Grid item>
                  <Rating value={node.rating} readOnly aria-label='rating' />
                </Grid>
                {node.canDestroy.value && (
                  <Grid item>
                    <IconButton
                      aria-label='delete'
                      onClick={getOnClick}
                      className={classes.margin}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
              <br />
              {node.author.fullName}
            </>
          }
          secondary={<Typography component='p' variant='body2'>{node.body}</Typography>}
        />
      </ListItem>
      <Divider variant='middle' component='li' />
      {hasNotNextPage() && i === getEdges().length - 2 && (
        <Waypoint onEnter={() => { loadMore(fetchMore, data, 'reviewsConnection') }} />
      )}
    </>
  )
}

Review.propTypes = {
  node: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  fetchMore: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired
}

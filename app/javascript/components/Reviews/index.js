import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import Rating from '@material-ui/lab/Rating'
import { Waypoint } from 'react-waypoint'
import PropTypes from 'prop-types'
import { reviewsConnection } from './operations.graphql'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Typography } from '@material-ui/core'

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

  return (
    <>
      {!loading && data && (
        <List className={classes.root}>
          {
            data.reviewsConnection.edges.length === 0
              ? (<Typography align='center' component='p' variant='subtitle1'>No reviews yet add</Typography>)
              : data.reviewsConnection.edges.map(({ node }, i) => (
                <React.Fragment key={node.id}>
                  <ListItem alignItems='flex-start'>
                    <ListItemText
                      primary={
                        <>
                          <Rating value={node.rating} readOnly />
                          <br />
                          {node.user.fullName}
                        </>
                      }
                      secondary={node.body}
                    />
                  </ListItem>
                  <Divider variant='inset' component='li' />
                  {i === data.reviewsConnection.edges.length - 2 && (
                    <Waypoint onEnter={() => fetchMore({
                      variables: { cursor: data.reviewsConnection.pageInfo.endCursor },
                      updateQuery: (previousResult, { fetchMoreResult }) => {
                        const newEdges = fetchMoreResult.reviewsConnection.edges
                        const pageInfo = fetchMoreResult.reviewsConnection.pageInfo

                        return newEdges.length
                          ? {
                            reviewsConnection: {
                              __typename: previousResult.reviewsConnection.__typename,
                              edges: [...previousResult.reviewsConnection.edges, ...newEdges],
                              pageInfo
                            }
                          }
                          : previousResult
                      }
                    })}
                    />)}
                </React.Fragment>
              ))
          }
          {data && data.reviewsConnection.edges.length > 0 && !data.reviewsConnection.pageInfo.hasNextPage && (
            <Grid item xs={12}>
              <Typography align='center' component='p' variant='subtitle1'>You looked at all the reviews</Typography>
            </Grid>
          )}
        </List>
      )}
    </>
  )
}

Reviews.propTypes = {
  productId: PropTypes.string.isRequired
}

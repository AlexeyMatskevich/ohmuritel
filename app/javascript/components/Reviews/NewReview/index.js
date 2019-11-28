'use strict'
import {
  FormControl, FormHelperText, Input, InputLabel, ListItem, makeStyles, Button, CircularProgress
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import React, { useState } from 'react'
import useForm from 'react-hook-form'
import { createReview } from './operations.graphql'
import { reviewsConnection } from './../operations.graphql'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import { isEmpty } from '../../Form/helper'
import clsx from 'clsx'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    marginTop: theme.spacing(1),
    position: 'relative'
  }
}))

export default function NewReview (props) {
  const classes = useStyles()
  const buttonClassname = clsx({ [classes.buttonSuccess]: false })
  const client = useApolloClient()
  const { productId } = props
  const [rating, setRating] = useState(5)
  const handleSuccess = ({ createReview }) => createReview.success ? reset() : null
  const { handleSubmit, errors, register, reset } = useForm({ mode: 'onBlur' })
  const handleOnSubmit = data => addReview({ variables: { body: data.review, rating, productId } })
  const [addReview, { loading: mutationLoading }] = useMutation(createReview, {
    onCompleted: handleSuccess,
    update (proxy, { data: { createReview } }) {
      const data = proxy.readQuery({ query: reviewsConnection, variables: { productId } })
      client.writeQuery({
        query: reviewsConnection,
        data: {
          reviewsConnection: {
            edges: [{ node: createReview.review, __typename: 'ReviewEdge' }, ...data.reviewsConnection.edges],
            pageInfo: data.reviewsConnection.pageInfo,
            __typename: data.reviewsConnection.__typename
          }
        },
        variables: { productId }
      })
    }
  })

  return (
    <ListItem alignItems='flex-start'>
      <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue)
          }}
          name='rating'
          aria-label='new rating'
        />
        <FormControl required fullWidth>
          <InputLabel htmlFor='review'>Add review</InputLabel>
          <Input
            id='review'
            name='review'
            multiline
            inputRef={register({ required: true, min: 10 })}
            aria-describedby='required-review'
          />
        </FormControl>
        {errors.price && errors.price.type === 'required' && (
          <FormHelperText id='required-review'>This is required</FormHelperText>
        )}
        <div className={classes.wrapper}>
          <Button
            type='submit'
            className={buttonClassname}
            disabled={!isEmpty(errors) || mutationLoading}
          >
            Submit
          </Button>
          {mutationLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
    </ListItem>
  )
}

NewReview.propTypes = {
  productId: PropTypes.string.isRequired
}

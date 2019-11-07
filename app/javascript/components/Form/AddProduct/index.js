import React, { useState } from 'react'
import clsx from 'clsx'
import useForm from 'react-hook-form'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { createProduct, productByName } from './operations.graphql'
import { PRODUCTS } from '../../Home/operations.graphql'
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Typography,
  InputAdornment,
  Snackbar
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useStyles } from '../style'
import Snackbars from '../Snackbars'
import { isEmpty, extractErrors, sleep } from '../helper'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

export default function AddProduct () {
  const { register, handleSubmit, errors, setError, clearError, reset } = useForm({ mode: 'onChange' })
  const classes = useStyles()
  const buttonClassname = clsx({ [classes.buttonSuccess]: false })
  const [serverErrors, setServerErrors] = useState([])
  const [openError, setOpenError] = React.useState(false)
  const [openSuccess, setOpenSuccess] = React.useState(false)
  const handleError = () => setOpenError(true)
  const handleSuccess = ({ createProduct }) => {
    if (createProduct.success) {
      setOpenSuccess(true)
      reset()
    } else {
      setServerErrors(extractErrors(createProduct))
    }
  }

  const [addProduct, { loading: mutationLoading }] = useMutation(createProduct, {
    onError: handleError,
    onCompleted: handleSuccess,
    update (proxy, { data: { createProduct } }) {
      const data = proxy.readQuery({ query: PRODUCTS })
      data.products.push(createProduct.product)
      proxy.writeQuery({ query: PRODUCTS, data })
    }
  })

  const handleTakenName = ({ productByName }) => {
    productByName ? setError('name', 'nameTaken') : clearError('name')
  }

  const [getName] = useLazyQuery(productByName, { onCompleted: handleTakenName })

  const onSubmit = data => addProduct({
    variables:
      {
        name: data.name,
        weight: Number(data.weight),
        price: Number(data.price),
        previewDescription: data.previewDescription
      }
  })

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') return

    setOpenError(false)
  }

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') return

    setOpenSuccess(false)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>Add new product</Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            {serverErrors.map((errorMessage) =>
              <Grid key={errorMessage} item xs={12}>
                <Snackbars
                  variant='error'
                  message={errorMessage}
                />
              </Grid>
            )}
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              open={openError}
              autoHideDuration={6000}
              onClose={handleCloseError}
            >
              <Snackbars
                onClose={handleCloseError}
                variant='error'
                message='Error :( Please try again'
              />
            </Snackbar>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              open={openSuccess}
              autoHideDuration={6000}
              onClose={handleCloseSuccess}
            >
              <Snackbars
                onClose={handleCloseSuccess}
                variant='success'
                message='New product created successfully'
              />
            </Snackbar>
            <Grid item xs={12}>
              <FormControl required fullWidth error={!!errors.name}>
                <InputLabel color='primary' htmlFor='name'>Name</InputLabel>
                <Input
                  id='name'
                  name='name'
                  inputRef={register({
                    required: true,
                    maxLength: 55,
                    validate: {
                      nameTaken: async (value) => {
                        await sleep(1000).then(() => getName({ variables: { name: value } }))
                        return true
                      }
                    }
                  })}
                  aria-describedby='name-error-required'
                />
                {errors.name && errors.name.type === 'required' && (
                  <FormHelperText id='name-error-required'>This is required</FormHelperText>
                )}
                {errors.name && errors.name.type === 'maxLength' && (
                  <FormHelperText id='name-error-max-length'>Max length exceeded</FormHelperText>
                )}
                {errors.name && errors.name.type === 'nameTaken' && (
                  <FormHelperText id='name-error-already-taken'>This name has already been taken</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl required fullWidth error={!!errors.weight}>
                <InputLabel htmlFor='weight'>Weight</InputLabel>
                <Input
                  id='weight'
                  name='weight'
                  type='number'
                  defaultValue='50'
                  inputRef={register({ required: true, min: 1 })}
                  aria-describedby='weight-error-required weight-error-min'
                  endAdornment={<InputAdornment position='end'>Gm</InputAdornment>}
                />
                {errors.weight && errors.weight.type === 'required' && (
                  <FormHelperText id='weight-error-required'>This is required</FormHelperText>
                )}
                {errors.weight && errors.weight.type === 'min' && (
                  <FormHelperText id='weight-error-min'>Must be greater than 0</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl required fullWidth error={!!errors.price}>
                <InputLabel htmlFor='price'>Price</InputLabel>
                <Input
                  id='price'
                  name='price'
                  type='number'
                  defaultValue='5'
                  inputRef={register({ required: true, min: 1 })}
                  aria-describedby='price-error-required price-error-min'
                  endAdornment={<InputAdornment position='end'><AttachMoneyIcon /></InputAdornment>}
                />
                {errors.price && errors.price.type === 'required' && (
                  <FormHelperText id='price-error-required'>This is required</FormHelperText>
                )}
                {errors.price && errors.price.type === 'min' && (
                  <FormHelperText id='price-error-min'>Must be greater than 0</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth error={!!errors.previewDescription}>
                <InputLabel htmlFor='preview-description'>Description for product page</InputLabel>
                <Input
                  id='preview-description'
                  name='previewDescription'
                  multiline
                  inputRef={register({ required: true, min: 1 })}
                  aria-describedby='preview-description-error-required'
                />
                {errors.price && errors.price.type === 'required' && (
                  <FormHelperText id='preview-description-error-required'>This is required</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.wrapper}>
              <Button
                color='primary'
                variant='contained'
                type='submit'
                fullWidth
                className={buttonClassname}
                disabled={!isEmpty(errors) || mutationLoading}
              >
                Create
              </Button>
              {mutationLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

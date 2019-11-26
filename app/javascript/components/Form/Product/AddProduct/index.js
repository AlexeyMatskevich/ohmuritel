'use strict'
import React, { useState } from 'react'
import clsx from 'clsx'
import useForm, { FormContext } from 'react-hook-form'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { createProduct } from './operations.graphql'
import { Avatar, Button, CircularProgress, Container, Grid, Typography, Snackbar } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useStyles } from '../../style'
import CustomSnackbarContent from '../../../CustomSnackbar/CustomSnackbarContent'
import { isEmpty, extractErrors } from '../../helper'
import { TrixEditor } from 'react-trix'
import NameFormControlValidation from '../Inputs/NameFormControlValidation'
import WeightFormControl from '../Inputs/WeightFormControl'
import PriceFormControl from '../Inputs/PriceFormControl'
import PreviewDescriptionFormControl from '../Inputs/PreviewDescriptionFormControl'
import ImageFormControl from '../Inputs/ImageFormControl'
import { directUpload } from '../direct_upload'

export default function AddProduct () {
  const methods = useForm({ mode: 'onChange' })
  const { handleSubmit, errors, reset } = methods
  const client = useApolloClient()
  const classes = useStyles()
  const buttonClassname = clsx({ [classes.buttonSuccess]: false })
  const [trixInput, setTrixInput] = useState()
  const [directVariables, setDirectVariables] = useState()
  const [serverErrors, setServerErrors] = useState([])
  const [openSuccess, setOpenSuccess] = React.useState(false)
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') return

    setOpenSuccess(false)
  }

  const handleSuccess = ({ createProduct }) => {
    if (createProduct.success) {
      setOpenSuccess(true)
      client.resetStore()
      reset()
    } else {
      setServerErrors(extractErrors(createProduct))
    }
  }

  const [addProduct, { loading: mutationLoading }] = useMutation(createProduct, { onCompleted: handleSuccess })

  const onSubmit = data => {
    directUpload(directVariables.url, directVariables.headers, directVariables.file).then(() => addProduct({
      variables:
        {
          name: data.name,
          weight: Number(data.weight),
          price: Number(data.price),
          previewDescription: data.previewDescription,
          description: trixInput,
          image: directVariables.signedBlobId
        }
    }))
  }

  return (
    <Container component='main' maxWidth='xl'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>Add new product</Typography>
        <FormContext {...methods}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              {serverErrors.map((errorMessage) =>
                <Grid key={errorMessage} item md={12}>
                  <CustomSnackbarContent variant='error' message={errorMessage} />
                </Grid>
              )}
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                open={openSuccess}
                autoHideDuration={6000}
                onClose={handleCloseSuccess}
              >
                <CustomSnackbarContent
                  onClose={handleCloseSuccess}
                  variant='success'
                  message='New product created successfully'
                />
              </Snackbar>
              <Grid item container md={6} xs={12} spacing={2} alignContent='flex-start' className={classes.formLeft}>
                <Grid item container justify='center' xs={12}>
                  <Grid><ImageFormControl setDirectVariables={setDirectVariables} /></Grid>
                </Grid>
                <Grid item xs={12}>
                  <NameFormControlValidation />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <WeightFormControl />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <PriceFormControl />
                </Grid>
                <Grid item xs={12}>
                  <PreviewDescriptionFormControl />
                </Grid>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography align='center' component='h2' variant='h6'>Description</Typography>
                <TrixEditor onChange={(html) => setTrixInput(html)} />
              </Grid>
              <Grid item md={4} xs={12} className={classes.wrapper}>
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
        </FormContext>
      </div>
    </Container>
  )
}

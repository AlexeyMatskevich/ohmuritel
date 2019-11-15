import { CircularProgress, makeStyles } from '@material-ui/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import Fab from '@material-ui/core/Fab'
import CustomSnackbarContent from '../../../CustomSnackbar/CustomSnackbarContent'
import PropTypes from 'prop-types'
import { getFileMetadata } from '../get_file_media'
import { useMutation } from '@apollo/react-hooks'
import { createDirectUpload } from '../Inputs/operations.graphql'
import clsx from 'clsx'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  input: {
    display: 'none'
  },
  wrapper: {
    position: 'relative'
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
  }
}))

export default function ImageFormControl (props) {
  const { errors, register } = useFormContext()
  const { setDirectVariables } = props
  const classes = useStyles()
  const buttonClassname = clsx(classes.fab, { [classes.buttonSuccess]: false })
  const requiredAria = 'image-error-required'
  const [getDirectUpload, { loading: mutationLoading }] = useMutation(createDirectUpload)
  const handleOnChange = (file) => {
    getFileMetadata(file).then((input) => {
      getDirectUpload({ variables: { ...input } }).then(({ data }) => {
        console.log(data)
        setDirectVariables({
          ...data.createDirectUpload.directUpload,
          headers: JSON.parse(data.createDirectUpload.directUpload.headers),
          file: file
        })
      })
    })
  }

  return (
    <>
      <input
        id='add-image'
        name='addImage'
        type='file'
        accept='image/*'
        onChange={(e) => handleOnChange(e.target.files[0])}
        className={classes.input}
        ref={register({ required: true })}
        aria-describedby={requiredAria}
      />
      <label htmlFor='add-image' className={classes.wrapper}>
        <Fab
          variant='extended'
          color='primary'
          component='span'
          className={buttonClassname}
          disabled={!!mutationLoading}
        >
          <AddAPhotoIcon className={classes.extendedIcon} />
          Add photo
        </Fab>
        {mutationLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </label>
      {errors.addImage && errors.addImage.type === 'required' && (
        <CustomSnackbarContent id={requiredAria} message='This is required' variant='error' />
      )}
    </>
  )
}

ImageFormControl.propTypes = {
  setDirectVariables: PropTypes.func.isRequired
}

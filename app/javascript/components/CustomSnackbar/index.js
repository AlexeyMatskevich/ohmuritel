'use strict'
import { Snackbar } from '@material-ui/core'
import CustomSnackbarContent from './CustomSnackbarContent'
import React from 'react'
import PropTypes from 'prop-types'

export default function CustomSnackbar (props) {
  const [open, setOpen] = React.useState(true)
  const { message, variant } = props

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return

    setOpen(false)
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <CustomSnackbarContent
        onClose={handleClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  )
}

CustomSnackbar.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired
}

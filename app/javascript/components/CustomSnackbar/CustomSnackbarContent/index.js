'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import { amber, green } from '@material-ui/core/colors'
import CloseIcon from '@material-ui/icons/Close'
import { SnackbarContent, IconButton } from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles } from '@material-ui/core/styles'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export default function CustomSnackbarContent (props) {
  const classes = useStyles1()
  const { className, message, variant, onClose } = props
  const Icon = variantIcon[variant]
  const span = (
    <span id='client-snackbar' className={classes.message}>
      <Icon className={clsx(classes.icon, classes.iconVariant)} />
      {message}
    </span>)

  if (onClose) {
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby='client-snackbar'
        message={span}
        action={[
          <IconButton key='close' aria-label='close' color='inherit' onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    )
  } else {
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby='client-snackbar'
        message={span}
      />
    )
  }
}

CustomSnackbarContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  onClose: PropTypes.func
}

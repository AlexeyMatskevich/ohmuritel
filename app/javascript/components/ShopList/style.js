'use strict'
import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  item: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

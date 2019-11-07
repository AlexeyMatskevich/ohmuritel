import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import AddIcon from '@material-ui/icons/Add'

import { useHistory } from 'react-router-dom'
import { Avatar, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 300
  },
  action: {
    height: '100%'
  }
}))

export default function AddItem () {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => history.push('/new_product')} className={classes.action}>
        <Grid container justify='center' alignItems='center'>
          <Grid item>
            <Avatar alt='add new product' className={classes.avatar}>
              <AddIcon fontSize='large' />
            </Avatar>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  )
}

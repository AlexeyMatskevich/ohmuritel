import React, { useContext, useEffect } from 'react'
import { Container, Grid, makeStyles, Typography, LinearProgress, Snackbar } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import Item from '../Item'
import AddItem from '../AddItem'
import { PRODUCTS } from './operations.graphql'
import Snackbars from '../Form/Snackbars'
import { AuthContext } from '../Context'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  item: {
    display: 'flex'
  }
}))

export default function Home () {
  const classes = useStyles()
  const { loading, error, data } = useQuery(PRODUCTS)
  const [open, setOpen] = React.useState(false)
  const { authenticated } = useContext(AuthContext)

  useEffect(() => {
    setOpen(typeof error !== 'undefined')
  }, [error])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return

    setOpen(false)
  }

  const progress = () => (
    <Grid item className={classes.item} xs={12}>
      <LinearProgress />
    </Grid>
  )

  return (
    <Container component='main' maxWidth={false} className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Snackbars
          onClose={handleClose}
          variant='error'
          message='Error :( Please try again'
        />
      </Snackbar>
      <Grid container spacing={2}>
        {loading && progress()}
        <Grid item xs={12}>
          <Typography align='center' component='h1' variant='h5'>Ohmuritel shop</Typography>
        </Grid>
        {authenticated &&
          <Grid item className={classes.item} xs={12} sm={6} md={4} lg={3} xl={2}>
            <AddItem />
          </Grid>}
        {data && data.products.map(({ id, name, previewDescription, price }) => (
          <Grid key={id} item className={classes.item} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Item name={name} previewDescription={previewDescription} price={price} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

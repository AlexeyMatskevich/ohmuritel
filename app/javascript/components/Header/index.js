'use strict'
import React from 'react'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Badge, LinearProgress } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountControl from '../AccountControl'
import { useHistory } from 'react-router-dom'
import { withRouter } from 'react-router'
import { useApolloNetworkStatus } from 'react-apollo-network-status'
import Search from '../Search'
import { useQuery } from '@apollo/react-hooks'
import { currentOrderCount } from './operations.graphql'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    '&:focus-within': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    '&:active': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '400px'
    }
  }
}))

const Counts = withStyles(theme => ({
  badge: {
    right: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))(Badge)

function Header () {
  const classes = useStyles()
  const history = useHistory()
  const status = useApolloNetworkStatus()
  const { data } = useQuery(currentOrderCount)

  function handleLinkToHome () {
    history.push('/')
  }

  function handleLinkToOrder () {
    history.push('/order')
  }

  return (
    <>
      <AppBar position='sticky' role='banner'>
        <Toolbar component='nav' role='navigation' className={classes.menu}>
          <IconButton
            edge='start'
            aria-label='home'
            color='inherit'
            onClick={handleLinkToHome}
          >
            <HomeIcon />
          </IconButton>
          <div className={classes.search}>
            <Search />
          </div>
          <div className={classes.grow} />
          <IconButton
            aria-label='cart'
            color='inherit'
            onClick={handleLinkToOrder}
          >
            <Counts badgeContent={data && data.currentOrder && data.currentOrder.orderCount} color='primary'>
              <ShoppingCartIcon />
            </Counts>
          </IconButton>
          <AccountControl />
        </Toolbar>
        {status.numPendingQueries > 0 && <LinearProgress />}
      </AppBar>
    </>
  )
}

export default withRouter(Header)

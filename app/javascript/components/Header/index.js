import React from 'react'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Badge, InputBase } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'
import AccountControl from '../Form/AccountControl'
import { useHistory } from 'react-router-dom'
import { withRouter } from 'react-router'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  search: {
    position: 'relative',
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
  },
  searchIcon: {
    width: theme.spacing(5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 5),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400
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

  function handleLinkToHome () {
    history.push('/')
  }

  function handleLinkToOrder () {
    history.push('/order')
  }

  return (
    <>
      <AppBar position='static' role='banner'>
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
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              fullWidth
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <IconButton
            aria-label='cart'
            color='inherit'
            onClick={handleLinkToOrder}
          >
            <Counts badgeContent={4} color='primary'>
              <ShoppingCartIcon />
            </Counts>
          </IconButton>
          <AccountControl />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default withRouter(Header)

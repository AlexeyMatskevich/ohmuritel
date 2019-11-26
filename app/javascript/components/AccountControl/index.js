'use strict'
import React from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { useHistory } from 'react-router-dom'
import { IsUserLoggedIn } from '../operations.graphql'
import { useQuery, useApolloClient } from '@apollo/react-hooks'

export default function AccountControl () {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { data: user } = useQuery(IsUserLoggedIn)
  const client = useApolloClient()
  const history = useHistory()
  const isMenuOpen = Boolean(anchorEl)

  const handleLogoutClick = () => {
    window.localStorage.clear()
    client.resetStore().then(() => handleMenuClose())
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogoutClick} to='/'>Logout</MenuItem>
    </Menu>
  )

  const login = (
    <IconButton
      edge='end'
      aria-label='login or sign in'
      onClick={() => history.push('/login')}
      color='inherit'
    >
      <LockOpenIcon />
    </IconButton>
  )

  const account = (
    <IconButton
      edge='end'
      aria-label='account of current user'
      aria-controls={menuId}
      aria-haspopup='true'
      onClick={handleProfileMenuOpen}
      color='inherit'
    >
      <AccountCircle />
    </IconButton>
  )

  return (
    <>
      {user.isLoggedIn ? account : login}
      {renderMenu}
    </>
  )
}

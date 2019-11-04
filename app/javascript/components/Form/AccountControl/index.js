import React, { useContext } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../Context'

export default function AccountControl () {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { authenticated, setAuthenticated } = useContext(AuthContext)
  const history = useHistory()
  const isMenuOpen = Boolean(anchorEl)

  const handleLogoutClick = () => {
    setAuthenticated(false)
    handleMenuClose()
    history.push('/')
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
      <ExitToAppIcon />
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
      {authenticated ? account : login}
      {renderMenu}
    </>
  )
}

import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import { useLazyQuery } from '@apollo/react-hooks'
import { productsAutocomplete } from './operations.graphql'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  autocomplete: {
    padding: 'none'
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: 400 }
  }
}))

export default function Search () {
  const [options, setOptions] = React.useState([])
  const classes = useStyles()
  const handleCompleted = ({ productsAutocomplete }) => setOptions(productsAutocomplete)
  const history = useHistory()
  const [getProductsAutocomplete] = useLazyQuery(productsAutocomplete, {
    context: { useApolloNetworkStatus: false },
    onCompleted: handleCompleted
  })

  return (
    <Autocomplete
      className={classes.autocomplete}
      freeSolo
      id='search'
      options={options}
      onChange={(_event, value) => {
        history.push(`/search?q=${value}`)
      }}
      renderInput={params => (
        <TextField
          {...params}
          fullWidth
          className={classes.inputInput}
          variant='outlined'
          onChange={(event) => {
            getProductsAutocomplete({ variables: { search: event.target.value } })
          }}
          InputProps={{
            ...params.InputProps,
            'aria-label': 'search',
            startAdornment: <SearchIcon />
          }}
        />
      )}
    />
  )
}

import './SubscribedCityUsersList.css'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useAuthContext } from '../../../../store/AuthProvider'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import SubscribedCityUsers from './SubscribedCityUsers'
// import SubscribedCityUsers from './SubscribedCityUsers'

const SubscribedCityUsersList = ({ cities }) => {
  // const [openSubscribedUsers, setOpenSubscribedUsers] = useState(false)
  // const { displayName, date } = cities
  // const classes = useRowStyles();

  // // Context API
  // const { authState } = useAuthContext()
  // const { currentUser } = authState
  // const { subscribedCities } = currentUser

  return (
    <>
      {/* <h2></h2> */}
      {/* <hr style={{ marginTop: '-6px' }} /> */}
      <TableContainer component={Paper} className='subscribedCityUsersList'>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              {/* <TableCell /> */}
              <TableCell align='left'>Ciudad</TableCell>
              <TableCell align='center'>Día</TableCell>
              <TableCell align='center'>Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities.map(city => (
              <SubscribedCityUsers key={city.name} city={city} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SubscribedCityUsersList

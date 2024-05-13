import './SubscribedCityUsers.css'
import { useState, useEffect } from 'react'
import { beautifyDate, get12HourFormatOfDate } from '../../../../services/dateServices'
// import { useAuthContext } from '../../../../store/AuthProvider'
import { fetchSubscribedUsersOf, getCityVisitedColor } from '../../../../services/cityService'
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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Circle from '../../../map/Circle'

const SubscribedCityUsers = ({ city }) => {
  const [openSubscribedUsers, setOpenSubscribedUsers] = useState(false)
  const [subscribedUsers, setSubscribedUsers] = useState([])
  const { name, visited, date } = city

  // Context API
  // const { fetchSubscribedUsersOf } = useAuthContext()
  // const { currentUser } = authState
  // const { subscribedCities } = currentUser

  useEffect(() => {
    if (openSubscribedUsers) {
      fetchSubscribedUsersOf(city).then(users => setSubscribedUsers(users))
    }
  }, [openSubscribedUsers])

  return (
    <>
      <TableRow className='subscribedCityUsers'>
        <TableCell className='subscribedCityUsers__arrow'>
          {visited > 1 && (
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => setOpenSubscribedUsers(!openSubscribedUsers)}
            >
              {openSubscribedUsers ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        {/* <TableCell scope='row' className='subscribedCityUsers__circle'>
          <Circle visited={visited} />
        </TableCell> */}
        <TableCell
          style={{ color: getCityVisitedColor(city) }}
          className='subscribedCityUsers__displayName'
        >
          {name}
        </TableCell>
        <TableCell align='center'>
          <p>{beautifyDate(date)}</p>
        </TableCell>
        <TableCell align='center'>
          <p>{get12HourFormatOfDate(date, true)}</p>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openSubscribedUsers} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='subtitle1' gutterBottom component='div' color='secondary'>
                Suscritos
                {/* <span style={{ marginTop: '20px !important;' }}>Suscritos a la Corrida</span> */}
              </Typography>
              <Table size='small' aria-label='users'>
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
                  {subscribedUsers?.map(({ displayName }) => (
                    <TableRow key={displayName}>
                      <TableCell component='th' scope='row'>
                        {displayName}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default SubscribedCityUsers

import './SubscribedCityUsers.css'
import { useState, useEffect } from 'react'
import { beautifyDate, get12HourFormatOfDate } from '../../../../services/dateServices'
// import { useAuthContext } from '../../../../store/AuthProvider'
import { fetchSubscribedUsersOf, getVisitColor } from '../../../../services/cityService'
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

const SubscribedCityUsers = ({ city, cityUsersMap }) => {
  const [openSubscribedUsers, setOpenSubscribedUsers] = useState(false)
  const [subscribedUsers, setSubscribedUsers] = useState([])
  const { name, visited, date } = city

  // // Context API
  // const { fetchSubscribedUsersOf } = useAuthContext()
  // const { currentUser } = authState
  // const { subscribedCities } = currentUser

  useEffect(() => {
    console.log('cityUsersMap', cityUsersMap)
    if (openSubscribedUsers) {
      setSubscribedUsers(cityUsersMap.get(name))
    }
    // else setSubscribedUsers([])
    // cityUsersMap.get('Bayamón').forEach(user => {
    //   console.log('------', user.displayName)
    // })
    // cityUsersMap.forEach((users, key, map) => {
    //   console.log('--users', users, key)
    // })
    // if (openSubscribedUsers) {
    //   fetchSubscribedUsersOf(city).then(users => setSubscribedUsers(users))
    // }
  }, [openSubscribedUsers])

  return (
    <>
      <TableRow className='subscribedCityUsers'>
        {visited > 1 && (
          <TableCell className='subscribedCityUsers__arrow'>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => setOpenSubscribedUsers(!openSubscribedUsers)}
            >
              {openSubscribedUsers ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}

        {/* <TableCell scope='row' className='subscribedCityUsers__circle'>
          <Circle visited={visited} />
        </TableCell> */}
        <TableCell
          style={{ color: `${visited !== 0 ? getVisitColor(visited) : ''}` }}
          className={`subscribedCityUsers__displayName ${
            visited > 1 ? 'subscribedCityUsers__noPaddingLeft' : 'subscribedCityUsers__paddingLeft'
          }`}
          // className={`${visited > 1 ? 'subscribedCityUsers__displayName' : ''}`}
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
      <TableRow className='subscribedCityUsers__tableRow'>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openSubscribedUsers} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography
                variant='subtitle1'
                gutterBottom
                component='div'
                color='secondary'
                className='subscribedCityUsers__innerTableLab'
              >
                Suscritos a la Corrida:{' '}
                <span style={{ fontWeight: '600' }}>
                  {subscribedUsers?.length === 0 ? '' : subscribedUsers?.length + 1}
                </span>
                {/* <span style={{ marginTop: '20px !important;' }}>Suscritos a la Corrida</span> */}
              </Typography>
              <Table size='small' aria-label='users'>
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody className='subscribedCityUsers__tableBody'>
                  {subscribedUsers?.length === 0 && (
                    <TableRow key={name}>
                      <TableCell component='th' scope='row'>
                        <Typography
                          variant='caption'
                          gutterBottom
                          component='div'
                          // color='secondary'
                        >
                          Nadie Suscrito Aún
                          {/* <span style={{ marginTop: '20px !important;' }}>Suscritos a la Corrida</span> */}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  {subscribedUsers?.length > 0 && (
                    <>
                      <TableRow key={'mesias'}>
                        <TableCell component='th' scope='row'>
                          {'Jesus Córdova (El Mesias)'}
                        </TableCell>
                      </TableRow>
                      {/* {cityUsersMap.get(city.name).forEach(user => {
                        const displayName = user.displayName
                        console.log('--displayName', displayName)
                        return (
                          <TableRow key={displayName}>
                            <TableCell component='th' scope='row'>
                              {displayName}
                            </TableCell>
                          </TableRow>
                        )
                      })} */}
                      {subscribedUsers.map(({ displayName }) => (
                        <TableRow key={displayName}>
                          <TableCell>{displayName}</TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                  {/* subscribedUsers.forEach((users, key, map) => {
                    console.log('--users', users, key)
                  }) */}
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

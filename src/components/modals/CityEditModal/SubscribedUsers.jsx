import './SubscribedUsers.css'
import { Card, CardContent } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { fetchSubscribedUsersOf } from '../../../services/cityService'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const columns = [
  // { field: 'visited', headerName: '', width: 90 },
  {
    field: 'displayName',
    headerName: '',
    // description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    width: 160,
  },
]

const SubscribedUsers = ({ city }) => {
  // const { name } = city
  const [subscribedUsers, setSubscribedUsers] = useState([])

  // Context API
  // const { authState, dispatchUserCitySubscription } = useAuthContext()
  // const { currentUser } = authState
  // const { subscribedCities } = currentUser

  useEffect(() => {
    fetchSubscribedUsersOf(city).then(users => {
      setSubscribedUsers(users)
    })
    // console.log('--- fetched', fetched)
  }, [])

  // return (
  // <table className='subscribedCityUsers'>
  //   {/* <th>Suscritos</th> */}
  //   {subscribedUsers.map(({ displayName }) => (
  //     <tr key={displayName}>
  //       <td>{displayName}</td>
  //     </tr>
  //   ))}
  // </table>
  // <TableContainer component={Paper}>
  // <TableContainer>
  //   <Table className={'subscribedCityUsers'} aria-label='simple table'>
  //     {/* <TableHead>
  //       <TableRow>
  //         <TableCell>Dessert (100g serving)</TableCell>
  //         <TableCell align="right">Calories</TableCell>
  //         <TableCell align="right">Fat&nbsp;(g)</TableCell>
  //         <TableCell align="right">Carbs&nbsp;(g)</TableCell>
  //         <TableCell align="right">Protein&nbsp;(g)</TableCell>
  //       </TableRow>
  //     </TableHead> */}
  //     <TableBody>
  //       {subscribedUsers.map(({ displayName }) => (
  //         <TableRow key={displayName}>
  //           <TableCell component='th' scope='row'>
  //             {displayName}
  //           </TableCell>
  //           {/* <TableCell align="right">{row.calories}</TableCell>
  //           <TableCell align="right">{row.fat}</TableCell>
  //           <TableCell align="right">{row.carbs}</TableCell>
  //           <TableCell align="right">{row.protein}</TableCell> */}
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // </TableContainer>
  return (
    <div className={`subscribedUsers`}>
      {subscribedUsers.length === 0 && <p>Nadie suscrito aún</p>}
      {subscribedUsers.length > 0 && (
        <>
          {subscribedUsers?.map(({ displayName }) => {
            return (
              <tr key={displayName}>
                <td>
                  <p>{displayName}</p>
                </td>
                <td></td>
              </tr>
            )
          })}
        </>
      )}
    </div>
  )
}

export default SubscribedUsers

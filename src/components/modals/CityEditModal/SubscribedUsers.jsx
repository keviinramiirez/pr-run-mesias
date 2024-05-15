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
import { trucate } from '../../../services/utilService'

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
  const [subscribedUsers, setSubscribedUsers] = useState([])

  useEffect(() => {
    fetchSubscribedUsersOf(city).then(users => {
      setSubscribedUsers(users)
    })
  }, [])

  return (
    <div className={`subscribedUsers`}>
      {subscribedUsers.length === 0 && <p>Nadie suscrito aún</p>}
      {subscribedUsers.length > 0 && (
        <>
          <tr>
            <td>
              <p> {trucate('Jesus Córdova (El Mesias)')}</p>
            </td>
          </tr>
          {subscribedUsers?.map(({ displayName }) => {
            return (
              <tr key={displayName}>
                <td>
                  {/* <p>{displayName}</p> */}
                  <p>{trucate(displayName)}</p>
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

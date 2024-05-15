import './SubscribedCityUsersList.css'
import { useState, useRef, useEffect } from 'react'
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
import { fetchSubscribedUsersOf, getVisitedColor } from '../../../../services/cityService'
import Circle from '../../../map/Circle'

const tabValues = {
  tovisit: 2,
  visited: 1,
  notvisited: 0,
}
const activeBackgroundCSS = '#f3f3f3'
// const activeBorderCSS = '2px solid #0050ef'

const SubscribedCityUsersList = ({ cities }) => {
  const [activeTab, setActiveTab] = useState(tabValues.tovisit)
  const [activeCities, setActiveCities] = useState([])
  const [cityUsersMap, setCityUsersMap] = useState(new Map())
  // const [subscribedUsers, setSubscribedUsers] = useState([])

  const [labelDimensions, setLabelDimensions] = useState({})

  const tovisitLabelEl = useRef(null)
  const visitedLabelEl = useRef(null)
  const notvisitedLabelEl = useRef(null)

  // console.log('--cities', cities)
  // const { displayName, date } = cities
  // const classes = useRowStyles();

  // // Context API
  // const { authState } = useAuthContext()
  // const { currentUser } = authState
  // const { subscribedCities } = currentUser

  useEffect(() => {
    handleActiveTab(tabValues.tovisit)
  }, [])

  useEffect(() => {
    setActiveCities(cities.filter(({ visited }) => visited === activeTab))
  }, [activeTab])

  useEffect(() => {
    const map = new Map()
    if (isTovisitActive()) {
      activeCities.forEach(city => {
        if (city.visited === tabValues.tovisit) {
          fetchSubscribedUsersOf(city).then(users => {
            const cityName = city.name
            users.forEach(user => {
              const cityUsers = map.has(cityName) ? map.get(cityName) : []
              // console.log('cityUsers', cityUsers, [...cityUsers])
              map.set(cityName, [...cityUsers, user])
            })
          })
        }
      })
      // console.log('map', map)
      setCityUsersMap(map)
    } else setCityUsersMap(new Map())
    // if (isTovisitActive() && activeCities[0].visited === tabValues.visited) {}
  }, [activeCities])

  const isTovisitActive = () => activeTab === tabValues.tovisit
  const isVisitedActive = () => activeTab === tabValues.visited
  const isNotVisitedActive = () => activeTab === tabValues.notvisited

  const handleActiveTab = visitValue => {
    let top,
      left,
      iconMarginLeft = 0

    if (visitValue === tabValues.tovisit) {
      setActiveTab(tabValues.tovisit)
      iconMarginLeft = 15
      left = iconMarginLeft + tovisitLabelEl.current.offsetLeft
      top = tovisitLabelEl.current.offsetTop + tovisitLabelEl.current.clientHeight - 36
    } else if (visitValue === tabValues.visited) {
      setActiveTab(tabValues.visited)
      iconMarginLeft = 3
      left = iconMarginLeft + visitedLabelEl.current.offsetLeft
      top = visitedLabelEl.current.offsetTop + visitedLabelEl.current.clientHeight - 36
    } else if (visitValue === tabValues.notvisited) {
      setActiveTab(tabValues.notvisited)
      left = iconMarginLeft + notvisitedLabelEl.current.offsetLeft
      top = notvisitedLabelEl.current.offsetTop + notvisitedLabelEl.current.clientHeight - 36
    }
    setLabelDimensions({
      // position: 'absolute',
      top,
      left,
    })
  }
  const activeBorderCSS = () => {
    return `2px solid ${getVisitedColor(activeTab)}`
  }

  // const activeTabStyle = (tabValue) => {
  //   let borderProperty = '2px solid #32a1ce'
  //   // if (isTovisitActive())
  //   return {
  //     borderBottom: `${activeTabs.tovisit ? '2px solid #32a1ce' : ''}`,
  //   }
  // }

  return (
    <div className='subscribedCityUsersList'>
      {/* <h2></h2> */}
      {/* <hr style={{ marginTop: '-6px' }} /> */}
      <div className='subscribedCityUsersList__tabs'>
        <div
          className='subscribedCityUsersList__tab'
          style={{
            borderBottom: `${isTovisitActive() ? activeBorderCSS() : ''}`,
            backgroundColor: `${isTovisitActive() ? activeBackgroundCSS : ''}`,
            fontWeight: `${isTovisitActive() ? '600' : '500'}`,
          }}
          onClick={() => handleActiveTab(tabValues.tovisit)}
        >
          {isTovisitActive() && Object.keys(labelDimensions).length > 0 && (
            <Circle
              visited={tabValues.tovisit}
              small={true}
              labelData={{
                amountLabel: activeCities.length,
                position: 'absolute',
                top: labelDimensions.top + 'px',
                left: labelDimensions.left + 'px',
                // paddingTop: '-22px !important',
              }}
            />
          )}
          <Typography
            variant='caption'
            component='div'
            style={{ fontWeight: `${isTovisitActive() ? '600' : '500'}` }}
            ref={tovisitLabelEl}
          >
            Próximas
          </Typography>
        </div>
        <div
          className='subscribedCityUsersList__tab'
          style={{
            borderBottom: `${isVisitedActive() ? activeBorderCSS() : ''}`,
            backgroundColor: `${isVisitedActive() ? activeBackgroundCSS : ''}`,
            fontWeight: `${isVisitedActive() ? '600' : '500'}`,
          }}
          onClick={() => handleActiveTab(tabValues.visited)}
        >
          {isVisitedActive() && Object.keys(labelDimensions).length > 0 && (
            <Circle
              visited={tabValues.visited}
              small={true}
              labelData={{
                amountLabel: activeCities.length,
                position: 'absolute',
                top: labelDimensions.top + 'px',
                left: labelDimensions.left + 'px',
              }}
            />
          )}
          <Typography
            variant='caption'
            component='div'
            // className={`${isVisitedActive() ? 'marginLeft' : ''}`}
            style={{
              fontWeight: `${isVisitedActive() ? '600' : '500'}`,
            }}
            ref={visitedLabelEl}
          >
            Completadas
          </Typography>
        </div>
        <div
          className='subscribedCityUsersList__tab'
          style={{
            borderBottom: `${isNotVisitedActive() ? activeBorderCSS() : ''}`,
            backgroundColor: `${isNotVisitedActive() ? activeBackgroundCSS : ''}`,
          }}
          onClick={() => handleActiveTab(tabValues.notvisited)}
        >
          {isNotVisitedActive() && Object.keys(labelDimensions).length > 0 && (
            <Circle
              visited={tabValues.notvisited}
              small={true}
              labelData={{
                amountLabel: activeCities.length,
                position: 'absolute',
                top: labelDimensions.top + 'px',
                left: labelDimensions.left + 'px',
              }}
            />
          )}
          <Typography
            variant='caption'
            component='div'
            // className={`${isNotVisitedActive() ? 'marginLeft' : ''}`}
            style={{
              fontWeight: `${isNotVisitedActive() ? '600' : '500'}`,
              marginLeft: `${isNotVisitedActive() ? '10px !important' : ''}`,
            }}
            ref={notvisitedLabelEl}
          >
            Aún por visitar
          </Typography>
        </div>
      </div>
      <TableContainer component={Paper} className='subscribedCityUsersList__tableContainer'>
        <Table
          className='subscribedCityUsersList__table'
          stickyHeader
          aria-label='collapsible table'
        >
          <TableHead className='subscribedCityUsersList__tableHeader'>
            <TableRow className='subscribedCityUsersList__tableRow'>
              {/* {!activeTab.tovisit && <TableCell />}  */}
              {isTovisitActive() && <TableCell />}
              {/* <TableCell /> */}
              <TableCell
                align='left'
                className={`${
                  isTovisitActive()
                    ? 'subscribedCityUsersList__noPaddingLeft'
                    : 'subscribedCityUsersList__paddingLeft'
                }`}
              >
                Ciudad
              </TableCell>
              <TableCell align='center'>Día</TableCell>
              <TableCell align='center'>Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='subscribedCityUsersList__tableBody'>
            {/* {activeCities.length === 0 && (
              <TableRow className='subscribedCityUsers'>
                <TableCell className='subscribedCityUsers__arrow'>
                  Próximas corridas aparecerán aquí
                </TableCell>
              </TableRow>
            )} */}
            {cities.map(city => {
              if (city.visited !== activeTab) return null
              else {
                // setActiveCities(prev => {
                //   return [...prev, city]
                // })
                return (
                  <SubscribedCityUsers key={city.name} city={city} cityUsersMap={cityUsersMap} />
                )
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default SubscribedCityUsersList

{
  /* 
<div className='subscribedCityUsersList__tabs'>
  <div
    className='subscribedCityUsersList__tab subscribedCityUsersList__loginTab'
    style={{
      borderBottom: `${isTovisitActive() ? activeBorderCSS : ''}`,
      backgroundColor: `${isTovisitActive() ? activeBackgroundCSS : ''}`,
    }}
    onClick={() => setActiveTab(tabValues.tovisit)}
  >
    <Typography variant='caption' component='div'>
      Próximas
    </Typography>
  </div>
  <div
    className='subscribedCityUsersList__tab subscribedCityUsersList__registerTab'
    style={{
      borderBottom: `${isVisitedActive() ? activeBorderCSS : ''}`,
      backgroundColor: `${isVisitedActive() ? activeBackgroundCSS : ''}`,
    }}
    onClick={() => setActiveTab(tabValues.visited)}
  >
    <Typography variant='caption' component='div'>
      Completadas
    </Typography>
  </div>
  <div
    className='subscribedCityUsersList__tab subscribedCityUsersList__registerTab'
    style={{
      borderBottom: `${isNotVisitedActive() ? activeBorderCSS : ''}`,
      backgroundColor: `${isNotVisitedActive() ? activeBackgroundCSS : ''}`,
    }}
    onClick={() => setActiveTab(tabValues.notvisited)}
  >
    <Typography variant='caption' component='div'>
      Aún por visitar
    </Typography>
  </div>
</div> 
*/
}

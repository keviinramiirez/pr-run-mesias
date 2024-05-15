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
import {
  fetchSubscribedUsersOf,
  isTovisitValue,
  visitValuesMap,
} from '../../../../services/cityService'
import VisitedTabs from '../tables/VisitedTabs'

const SubscribedCityUsersList = ({ cities }) => {
  const [activeTab, setActiveTab] = useState(visitValuesMap.tovisit)
  const [activeCities, setActiveCities] = useState([])
  const [cityUsersMap, setCityUsersMap] = useState(new Map())
  // const [subscribedUsers, setSubscribedUsers] = useState([])

  // iconElements
  const tovisitLabelEl = useRef(null)
  const visitedLabelEl = useRef(null)
  const notvisitedLabelEl = useRef(null)
  const labelElements = {
    tovisitLabelEl,
    visitedLabelEl,
    notvisitedLabelEl,
  }

  const [labelDimensions, setLabelDimensions] = useState({})

  // const tovisitLabelEl = useRef(null)
  // const visitedLabelEl = useRef(null)
  // const notvisitedLabelEl = useRef(null)

  // console.log('--cities', cities)
  // const { displayName, date } = cities
  // const classes = useRowStyles();

  // // Context API
  // const { authState } = useAuthContext()
  // const { currentUser } = authState
  // const { subscribedCities } = currentUser

  useEffect(() => {
    handleActivateTab(visitValuesMap.tovisit, labelElements.tovisitLabelEl)
  }, [])

  useEffect(() => {
    setActiveCities(cities.filter(({ visited }) => visited === activeTab))
  }, [activeTab])

  useEffect(() => {
    const map = new Map()
    if (isTovisitValue(visitValuesMap.tovisit)) {
      activeCities.forEach(city => {
        if (city.visited === visitValuesMap.tovisit) {
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
    // if (isTovisitValue() && activeCities[0].visited === visitValuesMap.visited) {}
  }, [activeCities])

  // const isTovisitValue = () => activeTab === visitValuesMap.tovisit
  // const isVisitedActive = () => activeTab === visitValuesMap.visited
  // const isNotVisitedActive = () => activeTab === visitValuesMap.notvisited

  const handleActivateTab = (visitValue, labelEl) => {
    let top,
      left,
      iconMarginLeft = 0

    if (visitValue === visitValuesMap.tovisit) {
      setActiveTab(visitValuesMap.tovisit)
      iconMarginLeft = 15
      left = iconMarginLeft + labelEl.current.offsetLeft
      top = labelEl.current.offsetTop + labelEl.current.clientHeight - 36
    } else if (visitValue === visitValuesMap.visited) {
      setActiveTab(visitValuesMap.visited)
      iconMarginLeft = 3
      left = iconMarginLeft + labelEl.current.offsetLeft
      top = labelEl.current.offsetTop + labelEl.current.clientHeight - 36
    } else if (visitValue === visitValuesMap.notvisited) {
      setActiveTab(visitValuesMap.notvisited)
      left = iconMarginLeft + labelEl.current.offsetLeft
      top = labelEl.current.offsetTop + labelEl.current.clientHeight - 36
    }
    setLabelDimensions({
      // position: 'absolute',
      top,
      left,
    })
  }
  // const activeBorderCSS = () => {
  //   return `2px solid ${getVisitColor(activeTab)}`
  // }

  // const activeTabStyle = (tabValue) => {
  //   let borderProperty = '2px solid #32a1ce'
  //   // if (isTovisitValue())
  //   return {
  //     borderBottom: `${activeTabs.tovisit ? '2px solid #32a1ce' : ''}`,
  //   }
  // }

  return (
    <div className='subscribedCityUsersList'>
      {/* <h2></h2> */}
      {/* <hr style={{ marginTop: '-6px' }} /> */}
      <VisitedTabs
        activeCities={activeCities}
        activeTab={activeTab}
        onActivateTab={(visitValue, labelEl) => handleActivateTab(visitValue, labelEl)}
        labelDimensions={labelDimensions}
        labelElements={labelElements}
      />
      <TableContainer component={Paper} className='subscribedCityUsersList__tableContainer'>
        <Table
          className='subscribedCityUsersList__table'
          stickyHeader
          aria-label='collapsible table'
        >
          <TableHead className='subscribedCityUsersList__tableHeader'>
            <TableRow className='subscribedCityUsersList__tableRow'>
              {/* {!activeTab.tovisit && <TableCell />}  */}
              {isTovisitValue(activeTab) && <TableCell />}
              {/* <TableCell /> */}
              <TableCell
                align='left'
                className={`${
                  isTovisitValue(activeTab)
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

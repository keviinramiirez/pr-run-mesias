import './App.css'
import 'leaflet/dist/leaflet.css'
import React, { useRef, useEffect, useState, useContext } from 'react'
import { auth, db } from './Firebase'
import AuthProvider from './store/AuthProvider'
import bcrypt from 'bcryptjs'
import {
  Card,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CardContent,
  Button,
} from '@material-ui/core'
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from 'firebase/firestore'
import { FaInstagram } from 'react-icons/fa'
import PRMap from './components/Map/PRMap'
import Table from './Table'
import CitiesList from './components/CitiesList/CitiesList'
import Header from './components/Header/Header'
import LoginCard from './components/Header/LoginCard'
import { citiesVisitValues } from './utils/util'
import VisitedCitiesList from './components/VisitedCitiesList/VisitedCitiesList'

function App() {
  const [cities, setCities] = useState([])
  // const [citiesOrig, setCitiesOrig] = useState([])
  const [visitedCities, setVisitedCities] = useState([])
  const [visitedCitiesSet, setVisitedCitiesSet] = useState(new Set())
  const [modifiedCitiesMap, setModifiedCitiesMap] = useState(new Map())
  const [loginCardDimensions, setLoginCardDimensions] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  // const { signin } = useContext(AuthContext)
  // const { authState, verifyPermission, signup, resetState } = useContext(AuthContext);
  // const { userType } = authState;

  // const [mapZoom, _] = useState(8)
  // const [mapCenter, __] = useState({
  //   lat: 18.200178,
  //   lng: -66.464513,
  // })

  const iconEl = useRef(null)

  useEffect(() => {
    // const hashedToken = bcrypt.hashSync('Millonario')
    // setDoc(doc(db, 'users', 'password'), { password: hashedToken })

    const visitedSet = new Set()
    const getCities = async () => {
      // console.log('db', db)
      const q = query(collection(db, 'cities'))
      const querySnapshot = await getDocs(q)
      let id = 1
      const fetchedCities = []
      const visitedCities = []
      // console.log('querySnapshot', querySnapshot)
      querySnapshot.forEach((doc) => {
        const cityData = doc.data()
        cityData.id = id++
        fetchedCities.push(cityData)
        if (cityData.visited === citiesVisitValues.visited.visitedValue) {
          visitedCities.push(cityData)
          visitedSet.add(cityData.name)
        }
      })
      // const citiesClone = [...fetchedCities]
      // console.log('citiesClone', citiesClone)
      setCities(fetchedCities)
      // setCitiesOrig(citiesClone)
      setVisitedCities(visitedCities)
      setVisitedCitiesSet(visitedSet)
    }

    getCities()
  }, [])

  const hideLoginCard = () => {
    setLoginCardDimensions({})
  }

  const handleLoginCard = (loggedInSuccesfully = false) => {
    const isAlreadyOpen = Object.keys(loginCardDimensions).length > 0
    console.log('handleLoginCard', isAlreadyOpen, loggedInSuccesfully)

    if (isAlreadyOpen || loggedInSuccesfully) {
      hideLoginCard()
      if (loggedInSuccesfully) setLoggedIn(true)
    } else if (!isAlreadyOpen) {
      const iconMarginRightMarginRight = 32
      setLoginCardDimensions({
        top: iconEl.current.clientTop + iconEl.current.clientHeight,
        right: iconMarginRightMarginRight + iconEl.current.clientWidth,
      })
    }
  }

  const saveChanges = () => {
    const visitedSet = new Set()
    // const visitedCities = []
    cities.forEach((city) => {
      setDoc(doc(db, 'cities', city.name), city).then(() => {
        if (city.visited === citiesVisitValues.visited.visitedValue) {
          visitedCities.push(city)
          // visitedSet.add(city)
        }
      })
    })
    console.log('visitedSet', visitedSet)
    setVisitedCities(visitedCities)
    // setVisitedCitiesSet(visitedSet)
  }

  const handleCityChange = async (e, city) => {
    const selectedVisitedValue = e.target.value
    console.log('selectedVisitedValue', selectedVisitedValue)
    const toModifyIndex = cities.findIndex((c) => c.id === city.id)
    // console.log(
    //   'handleCityCha selectedVisitedValue',
    //   toModifyIndex,
    //   selectedVisitedValue
    // )

    const visitedSet = new Set(visitedCitiesSet)
    const modifiedMapClone = new Map(modifiedCitiesMap)
    let modifiedCityData = modifiedMapClone.get(city.name)
    console.log('modifiedCityData', modifiedCityData)
    console.log('city.name', city.visited)

    // if (modifiedCityData) {
    //   if (modifiedCityData.prevVisitedValue === selectedVisitedValue)
    //     modifiedMapClone.delete(city.name)
    // } else {
    //   modifiedMapClone.set(city.name, { prevVisitedValue: city.visited, city })
    //   modifiedMapClone.get(city.name).city.visited = selectedVisitedValue
    // }
    if (!modifiedCityData) {
      modifiedMapClone.set(city.name, { prevVisitedValue: city.visited, city })
      modifiedMapClone.get(city.name).city.visited = selectedVisitedValue
    } else if (modifiedCityData.prevVisitedValue === selectedVisitedValue)
      modifiedMapClone.delete(city.name)

    if (selectedVisitedValue === citiesVisitValues.visited.visitedValue) {
      visitedSet.add(city.name)
    } else {
      visitedSet.delete(city.name)
    }

    setVisitedCitiesSet(visitedSet)
    setModifiedCitiesMap(modifiedMapClone)

    let citiesClone = [...cities]
    // 2. Make a shallow copy of the item you want to mutate
    let cityToModify = { ...cities[toModifyIndex] }
    // 3. Replace the property you're intested in
    cityToModify.visited = selectedVisitedValue
    // 4. Put it back into our array. N.B. we *are* mutating the array here,
    //    but that's why we made a copy first
    citiesClone[toModifyIndex] = cityToModify
    // 5. Set the state to our new copy
    setCities(citiesClone)
  }

  const handleLogout = () => {
    setLoggedIn(false)
    hideLoginCard()
  }

  // const handleLogin = (isLoggedIn) => {
  //   if (isLoggedIn) {
  //     hideLoginCard()
  //     setLoggedIn(true)
  //   }
  // }

  return (
    <AuthProvider>
      <div className='app'>
        {/* <Input onSubmit={addCity} /> */}
        {/* <div style={{ margin: '100px;' }}>a</div> */}
        <header id='header'>
          <Header
            iconEl={iconEl}
            isLoggedIn={loggedIn}
            onLogout={handleLogout}
            // onLogin={handleLogin}
            // onLogout={(() => logout().then(redirect => setRedirectToSignin(redirect)))}
            handleLoginCard={handleLoginCard}
            loginCardDimensions={loginCardDimensions}
            onHideLoginCard={hideLoginCard}
          />

          {/* {Object.keys(loginCardDimensions).length > 0 && (
            <LoginCard
              loginCardDimensions={loginCardDimensions}
              onLogin={handleLogin}
              onHideCard={() => setLoginCardDimensions({})}
            />
          )} */}
        </header>
        {/* <div onClick={hideLoginCard}> */}

        {loggedIn && (
          <>
            {/* <section className='app__welcome' onClick={hideLoginCard}>
              <h2 style={{ paddingBottom: '10px' }}>
                BIENVENIDO MILLONARIO <span>MESIAS</span>
              </h2>
            </section> */}
            <section className='app__citiesList' onClick={hideLoginCard}>
              <h3>
                Ya corrimos en{' '}
                <span style={{ color: '#0050ef' }}>
                  {visitedCitiesSet?.size}
                </span>{' '}
                ciudades
              </h3>
              <CitiesList
                cities={cities}
                visitedAmount={visitedCitiesSet?.size}
                onCityChange={handleCityChange}
              />
              <Button
                onClick={saveChanges}
                fullWidth
                color='primary'
                variant='contained'
                style={{ marginTop: '10px' }}
              >
                Guardar Cambios
              </Button>
            </section>
          </>
        )}
        {!loggedIn && (
          <>
            <section className='app__hero' onClick={hideLoginCard}>
              <h2 style={{ paddingBottom: '10px' }}>
                ACOMPAÑANOS A CORRER A PUERTO RICO COMPLETO EN{' '}
                <span>90 DÍAS</span>
              </h2>
              <p>
                El reto consiste de correr un{' '}
                <strong style={{ color: '#0050ef' }}>5K</strong> en cada uno de
                los pueblos de Puerto Rico. También, dentro de esos{' '}
                <strong style={{ color: '#ed0000' }}>90 días</strong> tendremos
                secciones de{' '}
                <strong style={{ color: '#0050ef' }}>estiramiento</strong> y{' '}
                <strong style={{ color: '#0050ef' }}>movilidad</strong>.
              </p>
            </section>
            {cities.length > 0 && (
              <section
                className='app__visitedCitiesList'
                onClick={hideLoginCard}
              >
                <VisitedCitiesList cities={visitedCities} />
                {/* <Card className='app__cityListCard'>
                  <CardContent>
                    <h3>
                      Ya corrimos en{' '}
                      <span style={{ color: '#0050ef' }}>
                        {visitedCities.length}
                      </span>{' '}
                      ciudades
                    </h3>
                    <Table cities={cities} />
                  </CardContent>
                </Card> */}
              </section>
            )}
          </>
        )}

        {cities.length > 0 && (
          <section id='app__mapContainer' onClick={hideLoginCard}>
            <PRMap
              cities={cities}
              // originalCities={citiesOrig}
              modifiedCitiesMap={modifiedCitiesMap}
              setModifiedCitiesMap={setModifiedCitiesMap}
            />
          </section>
        )}
        {/* </div> */}
      </div>
    </AuthProvider>
  )
}

export default App

//<FormControl>
// <InputLabel id='select-label'>Aún sin visitar</InputLabel>
//<Select
//   variant='outlined'
//  onChange={handleUnvisitedCityChange}
//   value={unvisitedCities[0]?.name}
//  value={selectedCity}
// >
//   {unvisitedCities?.map((city) => {
//     console.log('cccity', city)
//     return (
// {/* <div
//       className={`util__circleWithBorder ${
//         city.visited > 0 ? 'util__Green' : 'util__Grey'
//        }`}
//     ></div>
//     <MenuItem value={city}>{city.name}</MenuItem> */}
//     <div className=''>
//     <MenuItem value={city}>
//       {/* <div
//            className={`util__circleWithBorder ${
//              city.visited > 0 ? 'util__Green' : 'util__Grey'
//            }`}
//          ></div> */}
//      <Circle visited={city.visited}></Circle>
//</MenuItem>      <span>{city.name}</span>
//</Select>    </MenuItem>
//      </div>
//    )
//  })}
//</Select>
//</FormControl>
//<button
// onClick={addSelectedCity}
// className={`app__addButton ${
//   !selectedCity ? 'app__addButtonDisabled' : ''
// }`}
//>
// Add
//</button>

//<section>
//      <FormControl>
//      <InputLabel id='select-label'>Aún sin visitar</InputLabel>
//    <Select
//    variant='outlined'
//  onCityChange={handleCityChange}
//            value={unvisitedCities[0]?.name}
//            // value={selectedCity}
//         >
//           {unvisitedCities?.map((city) => {
//             // console.log('cccity', city)
//             return (
// {/* <div
//   className={`util__circleWithBorder ${
//     city.visited > 0 ? 'util__Green' : 'util__Grey'
//   }`}
// ></div>
// <MenuItem value={city}>{city.name}</MenuItem> */}
// <div className=''>
//              <MenuItem value={city}>
//                {/* <Fragment> */}
//               {/* <div
//                     className={`util__circleWithBorder ${
//                       city.visited > 0 ? 'util__Green' : 'util__Grey'
//                     }`}
//                   ></div> */}
//                 <Circle visited={city.visited}></Circle>
//                 <span>{city.name}</span>
//                 {/* </Fragment> */}
//               </MenuItem>
// </div>
//             )
//           })}
//         </Select>
//       </FormControl>
//   <button
//     onClick={handleAddSelectedCity}
//     className={`app__addButton ${
//       !selectedCity ? 'app__addButtonDisabled' : ''
//     }`}
//   >
//     Add
//   </button>
// </section>

// const handleAddSelectedCity = () => {
//   if (!selectedCity) return

//   let visitedCitiesClone = [...visitedCities]
//   visitedCitiesClone.push({
//     id: selectedCity.id,
//     name: selectedCity.name,
//     lat: selectedCity.lat,
//     long: selectedCity.long,
//     visited: 1,
//   })
//   let sorted = sortCitiesByName(visitedCitiesClone)
//   setVisitedCities(sorted)

//   // remove the city from selected list
//   const unvisitedCitiesClone = [...unvisitedCities]
//   const selectedIndex = unvisitedCitiesClone.findIndex((unvisitedCity) => {
//     return unvisitedCity.name === selectedCity.name
//   })
//   unvisitedCitiesClone.splice(selectedIndex, 1)
//   setUnvisitedCities(unvisitedCitiesClone)
// }

// const handleCityChange = async (e) => setSelectedCity(e.target.value)

// const getCityPos = (id) => cities.findIndex((city) => city.id === id)

// const handleDragEnd = (e) => {
//   const { active, over } = e
//   console.log('e', active, over)

//   if (active.id === over.id) return

//   setCities((cities) => {
//     const originalPos = getCityPos(active.id)
//     const newPos = getCityPos(over.id)

//     return arrayMove(cities, originalPos, newPos)
//   })
// }

// const sensors = useSensors(
//   useSensor(PointerSensor),
//   useSensor(KeyboardSensor, {
//     coordinateGetter: sortableKeyboardCoordinates,
//   })
// )

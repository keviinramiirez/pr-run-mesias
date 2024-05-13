import './App.css'
import 'leaflet/dist/leaflet.css'
import React, { useRef, useEffect, useState } from 'react'
// import { db } from './auth/firebase'
// import { Timestamp, deleteField, getDoc, updateDoc } from 'firebase/firestore'
// import { collection, query, getDocs, setDoc, doc } from 'firebase/firestore'
import AuthProvider from './store/AuthProvider'
// import PRMap from './components/map/PRMap'
// import ModifiableCities from './components/cities/ModifiableCities'
import Header from './components/header/Header/Header'
// import {
//   citiesVisitValues,
//   sortCitiesByName,
//   sortCitiesByToVisit,
//   sortToVisitCitiesByDateTime,
// } from './utils/util'
// import VisitedCitiesList from './components/cities/VisitedCitiesList'
// import ToVisitCitiesList from './components/cities/ToVisitCitiesList'
import ContentView from './components/contentView/ContentView'
import { doSignOut } from './auth/auth'

function App() {
  // const [cities, setCities] = useState([])
  // const [visitedCities, setVisitedCities] = useState([])
  // // const [nModifiedVisitedCities, setNModifiedVisitedCities] = useState(0)
  // const [visitedCitiesSet, setVisitedCitiesSet] = useState(new Set())

  //
  // const [editingCity, setEditingCity] = useState(false); // determines if a city is being modified
  // const [cityToEdit, setCityToEdit] = useState(undefined); // the user with schedule to be modified

  //
  // const [modifiedCitiesMap, setModifiedCitiesMap] = useState(new Map())
  const [authCardDimensions, setAuthCardDimensions] = useState({})
  // const [loggedIn, setLoggedIn] = useState(false)

  const avatarIconEl = useRef(null)
  // SimpleDateFormat ISO_8601_FORMAT = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:sss'Z'");

  // String now = ISO_8601_FORMAT.format(new Date());

  // useEffect(() => {
  //   // const current_timestamp = Timestamp.fromDate(new Date())
  //   // console.log('current_timestamp', current_timestamp)

  //   const visitedSet = new Set()
  //   const getCities = async () => {
  //     // console.log('db', db)
  //     const q = query(collection(db, 'cities'))
  //     const querySnapshot = await getDocs(q)
  //     let id = 1
  //     let fetchedCities = []
  //     const visitedCities = []
  //     // console.log('querySnapshot', querySnapshot)
  //     querySnapshot.forEach((doc) => {
  //       const cityData = doc.data()
  //       cityData.id = id++
  //       fetchedCities.push(cityData)
  //       if (cityData.visited === citiesVisitValues.visited.visitedValue) {
  //         visitedCities.push(cityData)
  //         visitedSet.add(cityData.name)
  //       }
  //     })
  //     fetchedCities = sortCitiesByToVisit(fetchedCities)
  //     // const citiesClone = [...fetchedCities]
  //     // console.log('citiesClone', citiesClone)
  //     setCities(fetchedCities)
  //     // setCitiesOrig(citiesClone)
  //     setVisitedCities(visitedCities)
  //     setVisitedCitiesSet(visitedSet)
  //   }

  //   getCities()
  // }, [])

  useEffect(() => {
    console.log(' ')
  }, [])

  const hideAuthCard = () => {
    setAuthCardDimensions({})
  }

  const handleAuthCard = (setIsLoggedIn, loggedInSuccesfully = false) => {
    const isAlreadyOpen = Object.keys(authCardDimensions).length > 0
    // console.log('handleAuthCard', isAlreadyOpen, loggedInSuccesfully)

    if (isAlreadyOpen || loggedInSuccesfully) {
      hideAuthCard()
      if (loggedInSuccesfully) setIsLoggedIn(true)
    } else if (!isAlreadyOpen) {
      const iconMarginRightMarginRight = 32
      setAuthCardDimensions({
        top: avatarIconEl.current.clientTop + avatarIconEl.current.clientHeight,
        right: iconMarginRightMarginRight + avatarIconEl.current.clientWidth,
      })
    }
  }

  // const saveChanges = (modifiedCity) => {
  //   // console.log('-modifiedCity', modifiedCity)
  //   // if (modifiedCity.visited === 0) {
  //   //   updateDoc(doc(db, 'cities', modifiedCity.name), {
  //   //     date: deleteField(),
  //   //   })
  //   // }
  //   // else
  //   if (
  //     modifiedCity.visited === 0 ||
  //     (modifiedCity.visited > 0 && modifiedCity.date === undefined)
  //   ) {
  //     updateDoc(doc(db, 'cities', modifiedCity.name), {
  //       date: deleteField(),
  //     })
  //   }
  //   // else {
  //   setDoc(doc(db, 'cities', modifiedCity.name), modifiedCity).then(() => {
  //     // console.log('c', modifiedCity)
  //     const visitedCitiesClone = [...visitedCities]
  //     if (modifiedCity.visited === citiesVisitValues.visited.visitedValue) {
  //       visitedCitiesClone.push(modifiedCity)
  //       // visitedSet.add(city)
  //     } else {
  //       const toModifyIndex = visitedCities.findIndex((c) => c.name === modifiedCity.name)
  //       visitedCitiesClone.splice(toModifyIndex, 1)
  //       // console.log('spliced',visitedCities.findIndex((c) => c.name === modifiedCity.name))
  //     }
  //     // console.log(visitedCities)
  //     setVisitedCities(sortCitiesByName(visitedCitiesClone))
  //   })
  //   // }
  //   handleCityUIChanges(modifiedCity)

  //   // 3. Put it back into our array. N.B. we *are* mutating the array here,
  //   //    but that's why we made a copy first
  //   // visitedCitiesClone[toModifyIndex] = cityToDelete

  //   // setCities(sortCitiesByToVisit(cities))
  // }

  // const handleCityUIChanges = (city) => {
  //   // const selectedVisitedValue = e.target.value
  //   const selectedVisitedValue = city.visited
  //   // console.log('selectedVisitedValue', selectedVisitedValue)
  //   const toModifyIndex = cities.findIndex((c) => c.id === city.id)

  //   const visitedSet = new Set(visitedCitiesSet)
  //   const modifiedMapClone = new Map(modifiedCitiesMap)
  //   let modifiedCityData = modifiedMapClone.get(city.name)

  //   // original
  //   if (!modifiedCityData) {
  //     modifiedMapClone.set(city.name, { prevVisitedValue: city.visited, city })
  //     modifiedMapClone.get(city.name).city.visited = selectedVisitedValue
  //   } else if (modifiedCityData.prevVisitedValue === selectedVisitedValue)
  //     modifiedMapClone.delete(city.name)

  //   if (selectedVisitedValue === citiesVisitValues.visited.visitedValue) {
  //     visitedSet.add(city.name)
  //   } else {
  //     visitedSet.delete(city.name)
  //   }

  //   // console.log('modifiedCityData', modifiedCityData)
  //   // console.log('modifiedMapClone', modifiedMapClone)

  //   // // IF it hasn't been modified before
  //   // if (!modifiedCityData) {
  //   //   modifiedMapClone.set(city.name, { prevVisitedValue: city.visited, city })
  //   //   modifiedMapClone.get(city.name).city.visited = selectedVisitedValue
  //   //   // if (selectedVisitedValue === citiesVisitValues.notVisited.visitedValue) {
  //   //   //   setNModifiedVisitedCities(nModifiedVisitedCities - 1)
  //   //   // }
  //   // } else if (modifiedCityData.prevVisitedValue === selectedVisitedValue) {
  //   //   modifiedMapClone.delete(city.name)
  //   //   setNModifiedVisitedCities(nModifiedVisitedCities - 1)
  //   // }

  //   // if (selectedVisitedValue === citiesVisitValues.visited.visitedValue) {
  //   //   visitedSet.add(city.name)
  //   //   setNModifiedVisitedCities(nModifiedVisitedCities + 1)
  //   // }
  //   // else {
  //   //   visitedSet.delete(city.name)
  //   //   if (selectedVisitedValue === citiesVisitValues.notVisited.visitedValue)
  //   //     setNModifiedVisitedCities(nModifiedVisitedCities - 1)
  //   // }

  //   setVisitedCitiesSet(visitedSet)
  //   setModifiedCitiesMap(modifiedMapClone)

  //   let citiesClone = [...cities]
  //   // 2. Make a shallow copy of the item you want to mutate
  //   let cityToModify = { ...cities[toModifyIndex] }
  //   // 3. Replace the property you're intested in
  //   cityToModify.visited = selectedVisitedValue
  //   // 4. Put it back into our array. N.B. we *are* mutating the array here,
  //   //    but that's why we made a copy first
  //   citiesClone[toModifyIndex] = cityToModify
  //   // 5. Set the state to our new copy
  //   setCities(sortCitiesByToVisit(sortCitiesByName(citiesClone)))
  // }

  // const logg = () => {
  //   console.log('modifiedCitiesMap', modifiedCitiesMap)
  //   console.log('modifiedCityData ^ .get(name)', modifiedCitiesMap.get('Maunabo'))
  // }

  // const handleLogin = (isLoggedIn) => {
  //   if (isLoggedIn) {
  //     hideAuthCard()
  //     setLoggedIn(true)
  //   }
  // }

  // const openCityEdit = (city) => {
  //   // console.log('city', city)
  //   setCityToEdit(user);
  //   setEditingCity(true);
  // };

  // const closeScheduleEdit = () => {
  //   setCityToEdit(undefined);
  //   setEditingCity(false);
  // };

  // const saveCityData = (emp) => {
  //   console.log('emp', emp)
  //   setEditingCity(false);
  //   setCityToEdit(emp);
  // };

  const handleLogout = () => {
    doSignOut()
      .then(_ => {
        console.log('logging out')
        hideAuthCard()
      })
      .catch(err => console.log('logout err', err))
  }

  return (
    <AuthProvider>
      <div className='app'>
        {/* <Input onSubmit={addCity} /> */}
        {/* <div style={{ margin: '100px;' }}>a</div> */}
        <header id='header'>
          <Header
            iconEl={avatarIconEl}
            // isLoggedIn={loggedIn}
            onLogout={handleLogout}
            // onLogin={handleLogin}
            // onLogout={(() => logout().then(redirect => setRedirectToSignin(redirect)))}
            onAuthCardClick={handleAuthCard}
            authCardDimensions={authCardDimensions}
            onHideAuthCard={hideAuthCard}
          />

          {/* {Object.keys(authCardDimensions).length > 0 && (
            <AuthCard
              authCardDimensions={authCardDimensions}
              onLogin={handleLogin}
              onHideCard={() => setAuthCardDimensions({})}
            />
          )} */}
        </header>
        <ContentView onHideAuthCard={hideAuthCard} />
      </div>
    </AuthProvider>
  )
}

export default App

//<section>
//      <FormControl>
//      <InputLabel id='select-label'>Aún sin visitar</InputLabel>
//    <Select
//    variant='outlined'
//  onCityChange={handleCityUIChanges}
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

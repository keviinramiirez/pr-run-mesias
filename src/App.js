import './App.css'
import 'leaflet/dist/leaflet.css'
import React, { useRef, useEffect, useState } from 'react'
import AuthProvider from './store/AuthContext/AuthProvider'
import Header from './components/header/Header/Header'
import ContentView from './components/contentView/ContentView'
import { doSignOut } from './services/authService'

function App() {
  const [authCardDimensions, setAuthCardDimensions] = useState({})

  const avatarIconEl = useRef(null)

  useEffect(() => {
    console.log(' ')
  }, [])

  const hideAuthCard = () => setAuthCardDimensions({})

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

  const handleLogout = () => {
    doSignOut()
      .then(_ => {
        // console.log('logging out')
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

import './ContentView.css'
import { useAuthContext } from '../../store/AuthProvider'
import { useEffect, useState } from 'react'
import { db } from '../../auth/firebase'
import { deleteField, updateDoc, collection, query, getDocs, setDoc, doc } from 'firebase/firestore'
import { citiesVisitValues, sortCitiesByName, sortCitiesByToVisit } from '../../utils/util'
import VisitedCitiesList from './shared/cities/VisitedCitiesList'
import ToVisitCitiesList from './shared/cities/ToVisitCitiesList'
import PRMap from '../map/PRMap'
import ModifiableCitiesGuest from './guest/cities/ModifiableCitiesGuest'
import ModifiableCitiesAdmin from './admin/cities/ModifiableCitiesAdmin'
import SubscribedCityUsersList from './shared/cities/SubscribedCityUsersList'

const ContentView = ({ onHideAuthCard }) => {
  const [cities, setCities] = useState([])
  const [visitedCities, setVisitedCities] = useState([])
  // const [nModifiedVisitedCities, setNModifiedVisitedCities] = useState(0)
  const [visitedCitiesSet, setVisitedCitiesSet] = useState(new Set())
  const [modifiedCitiesMap, setModifiedCitiesMap] = useState(new Map())

  // Context API
  const { authState, setIsLoggedIn } = useAuthContext()
  const { currentUser, isLoggedIn } = authState

  useEffect(() => {
    // const current_timestamp = Timestamp.fromDate(new Date())
    // console.log('current_timestamp', current_timestamp)

    // console.log('currentUser?.type', currentUser.type)
    const visitedSet = new Set()
    const getCities = async () => {
      // console.log('db', db)
      const querySnapshot = await getDocs(query(collection(db, 'cities')))
      let id = 1
      let fetchedCities = []
      const visitedCities = []
      // console.log('querySnapshot', querySnapshot)
      querySnapshot.forEach(doc => {
        const cityData = doc.data()
        cityData.id = id++
        fetchedCities.push(cityData)
        if (cityData.visited === citiesVisitValues.visited.visitedValue) {
          visitedCities.push(cityData)
          visitedSet.add(cityData.name)
        }
        // if (cityData.subscribeCities?.length > 0)
        //   console.log('subscribeCities', cityData.subscribeCities)
      })
      fetchedCities = sortCitiesByToVisit(fetchedCities)
      // const citiesClone = [...fetchedCities]
      // console.log('citiesClone', citiesClone)
      setCities(fetchedCities)
      // setCitiesOrig(citiesClone)
      setVisitedCities(visitedCities)
      setVisitedCitiesSet(visitedSet)
    }

    getCities()
  }, [])

  const handleHideAuthCard = setIsLoggedIn => {
    onHideAuthCard(setIsLoggedIn, isLoggedIn)
  }

  // const onHideAuthCard = () => {
  //   setAuthCardDimensions({})
  // }

  // const handleAuthCard = (loggedInSuccesfully = false) => {
  //   const isAlreadyOpen = Object.keys(authCardDimensions).length > 0
  //   // console.log('handleAuthCard', isAlreadyOpen, loggedInSuccesfully)

  //   if (isAlreadyOpen || loggedInSuccesfully) {
  //     onHideAuthCard()
  //     if (loggedInSuccesfully) setLoggedIn(true)
  //   } else if (!isAlreadyOpen) {
  //     const iconMarginRightMarginRight = 32
  //     setAuthCardDimensions({
  //       top: iconEl.current.clientTop + iconEl.current.clientHeight,
  //       right: iconMarginRightMarginRight + iconEl.current.clientWidth,
  //     })
  //   }
  // }

  const saveChanges = modifiedCity => {
    // console.log('-modifiedCity', modifiedCity)
    // if (modifiedCity.visited === 0) {
    //   updateDoc(doc(db, 'cities', modifiedCity.name), {
    //     date: deleteField(),
    //   })
    // }
    // else
    if (
      modifiedCity.visited === 0 ||
      (modifiedCity.visited > 0 && modifiedCity.date === undefined)
    ) {
      updateDoc(doc(db, 'cities', modifiedCity.name), {
        date: deleteField(),
      })
    }
    // else {
    setDoc(doc(db, 'cities', modifiedCity.name), modifiedCity).then(() => {
      // console.log('c', modifiedCity)
      const visitedCitiesClone = [...visitedCities]
      if (modifiedCity.visited === citiesVisitValues.visited.visitedValue) {
        visitedCitiesClone.push(modifiedCity)
        // visitedSet.add(city)
      } else {
        const toModifyIndex = visitedCities.findIndex(c => c.name === modifiedCity.name)
        visitedCitiesClone.splice(toModifyIndex, 1)
        // console.log('spliced',visitedCities.findIndex((c) => c.name === modifiedCity.name))
      }
      // console.log(visitedCities)
      setVisitedCities(sortCitiesByName(visitedCitiesClone))
    })
    // }
    handleCityUIChanges(modifiedCity)

    // 3. Put it back into our array. N.B. we *are* mutating the array here,
    //    but that's why we made a copy first
    // visitedCitiesClone[toModifyIndex] = cityToDelete

    // setCities(sortCitiesByToVisit(cities))
  }

  const handleCityUIChanges = city => {
    // const selectedVisitedValue = e.target.value
    const selectedVisitedValue = city.visited
    // console.log('selectedVisitedValue', selectedVisitedValue)
    const toModifyIndex = cities.findIndex(c => c.id === city.id)

    const visitedSet = new Set(visitedCitiesSet)
    const modifiedMapClone = new Map(modifiedCitiesMap)
    let modifiedCityData = modifiedMapClone.get(city.name)

    // original
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

    // console.log('modifiedCityData', modifiedCityData)
    // console.log('modifiedMapClone', modifiedMapClone)

    // // IF it hasn't been modified before
    // if (!modifiedCityData) {
    //   modifiedMapClone.set(city.name, { prevVisitedValue: city.visited, city })
    //   modifiedMapClone.get(city.name).city.visited = selectedVisitedValue
    //   // if (selectedVisitedValue === citiesVisitValues.notVisited.visitedValue) {
    //   //   setNModifiedVisitedCities(nModifiedVisitedCities - 1)
    //   // }
    // } else if (modifiedCityData.prevVisitedValue === selectedVisitedValue) {
    //   modifiedMapClone.delete(city.name)
    //   setNModifiedVisitedCities(nModifiedVisitedCities - 1)
    // }

    // if (selectedVisitedValue === citiesVisitValues.visited.visitedValue) {
    //   visitedSet.add(city.name)
    //   setNModifiedVisitedCities(nModifiedVisitedCities + 1)
    // }
    // else {
    //   visitedSet.delete(city.name)
    //   if (selectedVisitedValue === citiesVisitValues.notVisited.visitedValue)
    //     setNModifiedVisitedCities(nModifiedVisitedCities - 1)
    // }

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
    setCities(sortCitiesByToVisit(sortCitiesByName(citiesClone)))
  }

  return (
    <>
      {cities?.length > 0 && (
        <>
          <section id='contentView'>
            {isLoggedIn && (
              <>
                <h4 style={{ paddingBottom: '10px', textAlign: 'justify' }}>
                  ACOMPAÑANOS A CORRER A PUERTO RICO COMPLETO EN <span>90 DÍAS</span>
                </h4>
                <hr style={{ marginTop: '-6px', marginBottom: '15px' }} />
                <div className='app__tables'>
                  <>
                    {currentUser?.type === 'admin' && (
                      <div className='app__citiesList' onClick={handleHideAuthCard}>
                        <div className='app__modifiableCitiesAdmin' onClick={handleHideAuthCard}>
                          <ModifiableCitiesAdmin
                            cities={cities}
                            visitedAmount={visitedCitiesSet?.size}
                            onCityChange={handleCityUIChanges}
                            onSaveCityChanges={city => saveChanges(city)}
                          />
                        </div>
                        {/* <ModifiableCities
                        cities={cities}
                        visitedAmount={visitedCitiesSet?.size}
                        onCityChange={handleCityUIChanges}
                        onSaveCityChanges={city => saveChanges(city)}
                      /> */}
                      </div>
                    )}

                    {currentUser?.type === 'guest' && (
                      <>
                        <div className='app__subscribedCityUsers'>
                          <SubscribedCityUsersList cities={cities} />
                        </div>
                        <div className='app__modifiableCitiesGuest' onClick={handleHideAuthCard}>
                          <ModifiableCitiesGuest
                            cities={cities}
                            onCityChange={handleCityUIChanges}
                            onSaveCityChanges={city => saveChanges(city)}
                          />
                        </div>
                      </>
                    )}
                  </>
                </div>
              </>
            )}
            {!isLoggedIn && (
              <>
                <div className='app__hero' onClick={handleHideAuthCard}>
                  <h2 style={{ paddingBottom: '10px' }}>
                    ACOMPAÑANOS A CORRER A PUERTO RICO COMPLETO EN <span>90 DÍAS</span>
                  </h2>
                  <p>
                    El reto consiste de correr un <strong style={{ color: '#0050ef' }}>5K</strong>{' '}
                    en cada uno de los pueblos de Puerto Rico. También, dentro de esos{' '}
                    <strong style={{ color: '#ed0000' }}>90 días</strong> tendremos secciones de{' '}
                    <strong style={{ color: '#0050ef' }}>estiramiento</strong> y{' '}
                    <strong style={{ color: '#0050ef' }}>movilidad</strong>.
                  </p>
                </div>

                <div className='app__subscribedCityUsers'>
                  <SubscribedCityUsersList cities={cities} />
                </div>

                {/* {cities.length > 0 && ( */}
                <div className='app__toVisitCitiesList' onClick={handleHideAuthCard}>
                  <ToVisitCitiesList
                    cities={cities}
                    visitedCitiesSet={visitedCitiesSet}
                    // nModifiedVisitedCities={nModifiedVisitedCities}
                  />
                </div>

                <div className='app__visitedCitiesList' onClick={handleHideAuthCard}>
                  <VisitedCitiesList
                    cities={visitedCities}
                    visitedAmount={visitedCitiesSet?.size}
                  />
                </div>
                {/* )} */}
              </>
            )}
          </section>
          <section id='contentView__mapContainer' onClick={handleHideAuthCard}>
            <PRMap
              cities={cities}
              // originalCities={citiesOrig}
              modifiedCitiesMap={modifiedCitiesMap}
              setModifiedCitiesMap={setModifiedCitiesMap}
            />
          </section>
        </>
      )}
    </>
  )
}

export default ContentView

import './App.css'

// import { DndContext, closestCorners } from '@dnd-kit/core'
// import { arrayMove } from '@dnd-kit/sortable'
import 'leaflet/dist/leaflet.css'
import React, { Fragment, useEffect, useState } from 'react'
import {
  Card,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CardContent,
} from '@material-ui/core'
import PRMap from './components/PRMap'
import Table from './Table'
import { auth, db } from './Firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { VisitedCitiesList } from './components/VisitedCitiesList/VisitedCitiesList'
import { sortCitiesByName } from './utils/util'
import Circle from './components/Circle/Circle'
import CitiesList from './components/CitiesList/CitiesList'

function App() {
  const [cities, setCities] = useState([])
  const [visitedCities, setVisitedCities] = useState([])
  const [unvisitedCities, setUnvisitedCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(undefined)
  const [mapZoom, _] = useState(9)
  const [mapCenter, __] = useState({
    lat: 18.200178,
    lng: -66.664513,
  })

  useEffect(() => {
    // auth.onAuthStateChanged(authUser => {
    //   console.log('USER: ', authUser);
    //   if (authUser) {
    //   }
    // })
    const getCities = async () => {
      // console.log('db', db)
      const q = query(collection(db, 'cities'))
      const querySnapshot = await getDocs(q)
      let id = 1
      const fetchedCities = []
      const visitedCities = []
      const unvisitedCities = []
      // console.log('querySnapshot', querySnapshot)
      querySnapshot.forEach((doc) => {
        const cityData = doc.data()
        cityData.id = id++
        fetchedCities.push(cityData)
        if (cityData.visited > 0) {
          visitedCities.push(cityData)
        }
        if (cityData.visited === 0) {
          unvisitedCities.push(cityData)
          console.log('unvisitedCities')
        }
      })
      setCities(fetchedCities)
      setVisitedCities(visitedCities)
      setUnvisitedCities(unvisitedCities)
    }

    getCities()

    // db.collection('cities').onSnapshot((snapshot) => {
    //   setCities(
    //     snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    //   )
    // })
  }, [])

  // useEffect(() => {
  //   if (cities.length > 0) {
  //     console.log('cccccities')

  //   }
  // }, [cities])

  // useEffect(() => {
  //   const getCountriesData = async () => {
  //     fetch('https://disease.sh/v3/covid-19/countries')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const countries = data.map((country) => ({
  //           name: country.country,
  //           value: country.countryInfo.iso2,
  //         }))
  //         let sortedData = sortCitiesByName(data)
  //         console.log('data', data)
  //         setCountries(countries)
  //         setMapCountries(data)
  //         // setTableData(sortedData)
  //       })
  //   }

  //   getCountriesData()
  // }, [])

  const handleDeleteVisited = (selectedVisitedCity) => {
    console.log('selectedVisitedCity', selectedVisitedCity)
    let unvisitedCitiesClone = [...unvisitedCities]
    unvisitedCitiesClone.push({
      id: selectedVisitedCity.id,
      name: selectedVisitedCity.name,
      lat: selectedVisitedCity.lat,
      long: selectedVisitedCity.long,
      visited: 0,
    })
    let sorted = sortCitiesByName(unvisitedCitiesClone)
    setUnvisitedCities(sorted)
    // console.log('visitedCitiesClone', visitedCitiesClone)
    // console.log('sorted', sorted)

    // remove the city from selected list
    const visitedCitiesClone = [...visitedCities]
    const selectedIndex = visitedCities.findIndex((visitedCity) => {
      return visitedCity.name === selectedVisitedCity.name
    })
    visitedCitiesClone.splice(selectedIndex, 1)
    setVisitedCities(visitedCitiesClone)
  }

  const handleAddSelectedCity = () => {
    if (!selectedCity) return

    let visitedCitiesClone = [...visitedCities]
    visitedCitiesClone.push({
      id: selectedCity.id,
      name: selectedCity.name,
      lat: selectedCity.lat,
      long: selectedCity.long,
      visited: 1,
    })
    let sorted = sortCitiesByName(visitedCitiesClone)
    setVisitedCities(sorted)

    // remove the city from selected list
    const unvisitedCitiesClone = [...unvisitedCities]
    const selectedIndex = unvisitedCitiesClone.findIndex((unvisitedCity) => {
      return unvisitedCity.name === selectedCity.name
    })
    unvisitedCitiesClone.splice(selectedIndex, 1)
    setUnvisitedCities(unvisitedCitiesClone)
  }

  const handleCityChange = async (e, city) => {
    const selectedVisitedValue = e.target.value
    console.log('handleCityCha selectedVisitedValue', selectedVisitedValue)

    // const toModify = cities.find((c) => {
    //   if (c.id === city.id) return city
    // })
    // city.visited = selectedVisitedValue

    const toModifyIndex = cities.findIndex((c) => c.id === city.id)
    console.log(toModifyIndex)

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

  const handleToVisitCityChange = (e) => {}

  return (
    <div className='app'>
      {/* <Input onSubmit={addCity} /> */}
      {/* <div style={{ margin: '100px;' }}>a</div> */}
      <section className='app__hero'>
        <h2 style={{ paddingBottom: '10px' }}>
          ACOMPAÑANOS A CORRER A PUERTO RICO COMPLETO EN <span>90 DÍAS</span>
        </h2>
        <p>
          El reto consiste de correr un{' '}
          <strong style={{ color: '#0050ef' }}>5K</strong> en cada uno de los
          pueblos de Puerto Rico. También, dentro de esos{' '}
          <strong style={{ color: '#ed0000' }}>90 días</strong> tendremos
          secciones de{' '}
          <strong style={{ color: '#0050ef' }}>estiramiento</strong> y{' '}
          <strong style={{ color: '#0050ef' }}>movilidad</strong>.
        </p>
      </section>
      <section className='app__citiesList'>
        <CitiesList cities={cities} onCityChange={handleCityChange} />
      </section>
      {/* <section>
        <Card className='app__toVisitList'>
          <CardContent>
            <FormControl>
              <InputLabel id='select-label'>TODAS</InputLabel>
              <Select
                variant='outlined'
                onChange={handleToVisitCityChange}
                value={unvisitedCities[0]?.name}
              >
                {cities?.map((city) => {
                  return (
                    <MenuItem value={city}>
                      <Circle visited={city.visited}></Circle>
                      <span>{city.name}</span>
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <button
              onClick={addSelectedCity}
              className={`app__addButton ${
                !selectedCity ? 'app__addButtonDisabled' : ''
              }`}
            >
              Add
            </button>
          </CardContent>
        </Card>
      </section> */}

      {/* <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}> */}
      {/* <div className='app__cityColumns'> */}
      {/* <VisitedCitiesList
        cities={visitedCities}
        onDeleteVisitedCity={handleDeleteVisited}
        onAddSelectedCity={handleAddSelectedCity}
      /> */}
      {/* <Column id='toDo' cities={cities}></Column> */}
      {/* </div> */}
      {/* </DndContext> */}

      {cities.length > 0 && (
        <section id='app__mapContainer'>
          <PRMap cities={cities} center={mapCenter} zoom={mapZoom} />
        </section>
      )}

      <section className='app__cities'>
        {/* <FormControl>
          <Select
            variant='outlined'
            onChange={onCityChange}
            value={cities[0]?.lat}
          >
            {cities.map((city) => {
              return city.visited <= 0 ? null : (
                <MenuItem value={city}>{city.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl> */}

        {/* Drag & Drop */}

        <Card className='app__cityList'>
          <CardContent>
            <h3>
              Ya corrimos en{' '}
              <span style={{ color: '#0050ef' }}>{visitedCities.length}</span>{' '}
              ciudades
            </h3>
            <Table cities={cities} />
          </CardContent>
        </Card>
      </section>
    </div>
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

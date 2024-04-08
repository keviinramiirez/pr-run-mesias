import './App.css'
// import './assets/css/fonts.css'
import 'leaflet/dist/leaflet.css'
import React, { Fragment, useEffect, useState } from 'react'
import {
  Card,
  MenuItem,
  Select,
  FormControl,
  CardContent,
} from '@material-ui/core'
import PRMap from './PRMap'
import Table from './Table'
import { auth, db } from './Firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

function App() {
  // const [country, setInputCountry] = useState('worldwide')
  // const [countryInfo, setCountryInfo] = useState({})
  // const [countries, setCountries] = useState([])
  const [nCitiesVisited, setNCitiesVisited] = useState(0)
  const [mapZoom, _] = useState(9)
  const [mapCenter, __] = useState({
    lat: 18.200178,
    lng: -66.664513,
  })
  const [prCities, setPrCities] = useState([])
  // const [tableData, setTableData] = useState([])
  // const [casesType, setCasesType] = useState('cases')

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
      let nVisited = 0
      const fetchedCities = []
      // console.log('querySnapshot', querySnapshot)
      querySnapshot.forEach((doc) => {
        const cityData = doc.data()
        // console.log(doc.id, ' => ', cityData)
        // console.log('prCities >>', prCities)
        // setPrCities((prev) => [...prev, cityData])
        // setPrCities((prev) => {
        //   console.log('...prev', ...prev)
        //   console.log('cityData', cityData)

        //   return [...prev, cityData]
        // }) =
        fetchedCities.push(cityData)
        if (cityData.visited > 0) nVisited++
      })
      setPrCities(fetchedCities)
      setNCitiesVisited(nVisited)
    }

    getCities()

    // db.collection('cities').onSnapshot((snapshot) => {
    //   setPrCities(
    //     snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    //   )
    // })
  }, [])

  // useEffect(() => {
  //   const getCountriesData = async () => {
  //     fetch('https://disease.sh/v3/covid-19/countries')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const countries = data.map((country) => ({
  //           name: country.country,
  //           value: country.countryInfo.iso2,
  //         }))
  //         let sortedData = sortData(data)
  //         console.log('data', data)
  //         setCountries(countries)
  //         setMapCountries(data)
  //         // setTableData(sortedData)
  //       })
  //   }

  //   getCountriesData()
  // }, [])

  // const onCountryChange = async (e) => {
  //   const countryCode = e.target.value

  //   // const endpoint = (countryCode === 'worldwide') ? 'all' : countryCode;
  //   // const url = `https://disease.sh/v3/covid-19/countries/${endpoint}`

  //   const url =
  //     countryCode === 'worldwide'
  //       ? 'https://disease.sh/v3/covid-19/all'
  //       : `https://disease.sh/v3/covid-19/countries/${countryCode}`

  //   await fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setInputCountry(countryCode)
  //       // setCountryInfo(data)
  //       setMapCenter([data.countryInfo.lat, data.countryInfo.long])
  //       setMapZoom(4)
  //     })
  // }

  // https://disease.sh/v3/covid-19/countries/
  return (
    <div className='app'>
      <div className='app__hero'>
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
        {/* <p>Acompañanos!</p> */}
        {/* <div className='app__header'>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              // onChange={onCountryChange}
              // value={country}
              value={'PR'}
            >
              <MenuItem value='worldwide'>PR</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div> */}

        {/* <div className='app__stats'>
          <InfoBox
            title='Coronavirus Cases'
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title='Recovered'
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title='Deaths'
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div> */}
      </div>
      <section id='app__mapContainer'>
        <PRMap prCities={prCities} center={mapCenter} zoom={mapZoom} />
      </section>
      {prCities.length > 0 && (
        <Card className='app__cities'>
          <CardContent>
            <h3>
              Ya corrimos en{' '}
              <span style={{ color: '#0050ef' }}>{nCitiesVisited}</span>{' '}
              ciudades
            </h3>
            <Table cities={prCities} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default App

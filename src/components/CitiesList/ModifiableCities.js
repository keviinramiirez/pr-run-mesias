import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

// import { db } from './Firebase'
// import {
//   collection,
//   query,
//   getDocs,
//   setDoc,
//   doc,
//   getDoc,
// } from 'firebase/firestore'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Card from '@material-ui/core/Card'
import ImageIcon from '@material-ui/icons/Image'
import WorkIcon from '@material-ui/icons/Work'
import BeachAccessIcon from '@material-ui/icons/BeachAccess'
import ModiableCityItem from './ModifiableCityItem'
import './ModifiableCities.css'
import CityEdit from '../modals/CityEditModal/CityEdit'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // width: '100%',
//     maxWidth: 380,
//     // backgroundColor: theme.palette.background.paper,
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '5px',
//     height: '350px !important',
//     overflow: 'scroll',
//     paddingLeft: '10px',
//   },
// }))

// const portalElement = document.getElementById('city-edit-portal')

const ModifiableCities = ({
  cities,
  visitedCities,
  visitedAmount,
  onSaveCityChanges,
  onCityChange,
}) => {
  // const classes = useStyles()

  const [editingCity, setEditingCity] = useState(false) // determines if a city is being modified
  const [cityToEdit, setCityToEdit] = useState(undefined) // the city to be modified

  useEffect(() => {
    // const getCity = async () => {
    //   const fetchedCity = doc(db, 'cities', 'SF')
    //   const docSnap = await getDoc(fetchedCity)
    //   const city = docSnap.data()
    //   console.log('city', city)
    // }
    // getCity()
  }, [])

  const openCityEdit = (city) => {
    // console.log('city', city)
    setCityToEdit(city)
    setEditingCity(true)
  }

  const closeCityEdit = () => {
    setCityToEdit(undefined)
    setEditingCity(false)
  }

  // const saveCityEdit = (modifiedCity) => {
  //   console.log('emp', modifiedCity)
  //   cities.forEach((city) => {
  //     setDoc(doc(db, 'cities', city.name), city).then(() => {
  //       if (city.visited === citiesVisitValues.visited.visitedValue) {
  //         visitedCities.push(city)
  //         // visitedSet.add(city)
  //       }
  //     })
  //   })
  //   setEditingCity(false)
  //   setCityToEdit(modifiedCity)
  // }

  const handleCityEditChanges = (city) => {
    setEditingCity(false)
    setCityToEdit(city)
    onSaveCityChanges(city)
  }

  return (
    <>
      {editingCity && (
        <CityEdit
          city={cityToEdit}
          onSaveChanges={(modifiedCity) => handleCityEditChanges(modifiedCity)}
          onCloseCityEdit={closeCityEdit}
          onCityChange={onCityChange}
        />
      )}
      <Card className='modifiableCities'>
        <h3>
          Ya corrimos en{' '}
          <span style={{ color: '#00a04b' }}>{visitedAmount}</span> ciudades
        </h3>
        <List className='modifiableCities__cardList'>
          {/* <List className={classes.root}> */}
          {cities?.map((city) => (
            <ModiableCityItem
              city={city}
              // onCityChange={onCityChange}
              onOpenCityEdit={openCityEdit}
            />
          ))}
        </List>
      </Card>
    </>
  )
}

export default ModifiableCities

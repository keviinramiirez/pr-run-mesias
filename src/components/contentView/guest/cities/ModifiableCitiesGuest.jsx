import { useState, useEffect } from 'react'
import './ModifiableCitiesGuest.css'
// import '../../../App.css'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ModifiableTable from '../../shared/tables/ModifiableTable'
import { useAuthContext } from '../../../../store/AuthProvider'

const ModifiableCitiesGuest = ({ cities, onCityChange, onSaveCityChanges }) => {
  // const [modifiableCities, setModifiableCities] = useState(cities)
  // const [editingCity, setEditingCity] = useState(false) // determines if a city is being modified
  // const [cityToEdit, setCityToEdit] = useState(undefined) // the city to be modified

  // // Context API
  // const { authState } = useAuthContext()
  // // const { subscribedCities } = currentUser

  // useEffect(() => {
  //   // setModifiableCities(sortCitiesByToVisit(sortCitiesByName(cities)))
  // }, [])

  // const handleSubscription = () => {

  // }

  // const openCityEdit = city => {
  //   // console.log('city', city)
  //   setCityToEdit(city)
  //   setEditingCity(true)
  // }

  // const closeCityEdit = () => {
  //   setCityToEdit(undefined)
  //   setEditingCity(false)
  // }

  // const handleCityEditChanges = city => {
  //   setEditingCity(false)
  //   setCityToEdit(city)
  //   onSaveCityChanges(city)
  // }

  return (
    <Card className='modifiableCitiesGuest'>
      <CardContent>
        {/* <h3>Cantidad de ciudades suscritas: {currentUser?.subscribedCities}</h3> */}

        <ModifiableTable
          modifiableCities={cities}
          isScrollable={true}
          // onSubscribe={handleSubscription}
          // visitedValue={}
          // showTable={visitedCitiesSet.size - nModifiedVisitedCities > 0}
          // visitedValue={citiesVisitValues.tovisit.visitedValue}
        />
      </CardContent>
    </Card>
  )
}

export default ModifiableCitiesGuest

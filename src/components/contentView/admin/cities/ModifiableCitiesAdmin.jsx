import { useState, useEffect } from 'react'
import './ModifiableCitiesAdmin.css'
import { Card, CardContent } from '@material-ui/core'
import ModifiableTable from '../../shared/tables/ModifiableTable'
import CityEdit from '../../../modals/CityEditModal/CityEdit'

const ModifiableCitiesAdmin = ({ cities, visitedAmount, onCityChange, onSaveCityChanges }) => {
  const [editingCity, setEditingCity] = useState(false) // determines if a city is being modified
  const [cityToEdit, setCityToEdit] = useState(undefined) // the city to be modified

  const openCityEdit = city => {
    // console.log('city', city)
    setCityToEdit(city)
    setEditingCity(true)
  }

  const closeCityEdit = () => {
    setCityToEdit(undefined)
    setEditingCity(false)
  }

  const handleCityEditChanges = city => {
    setEditingCity(false)
    setCityToEdit(city)
    onSaveCityChanges(city)
  }

  return (
    <>
      {editingCity && (
        <CityEdit
          city={cityToEdit}
          onSaveChanges={modifiedCity => handleCityEditChanges(modifiedCity)}
          onCloseCityEdit={closeCityEdit}
          onCityChange={onCityChange}
        />
      )}
      <Card className='modifiableCitiesAdmin'>
        {/* <h3>
          Ya corrimos en <span style={{ color: '#00a04b' }}>{visitedAmount}</span> ciudades
        </h3> */}
        <CardContent>
          {/* <h3>Cantidad de ciudades suscritas: {currentUser?.subscribedCities}</h3> */}

          <ModifiableTable
            modifiableCities={cities}
            isScrollable={true}
            onOpenCityEdit={openCityEdit}
            onCloseCityEdit={closeCityEdit}
            visitedAmount={visitedAmount}

            // onSubscribe={handleSubscription}
            // visitedValue={}
            // showTable={visitedCitiesSet.size - nModifiedVisitedCities > 0}
            // visitedValue={visitValuesMap.tovisit}
          />
        </CardContent>
      </Card>
    </>
  )
}

export default ModifiableCitiesAdmin

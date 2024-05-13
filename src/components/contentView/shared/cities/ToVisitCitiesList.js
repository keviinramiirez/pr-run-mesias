import { useEffect, useState } from 'react'
import './ToVisitCitiesList.css'
// import VisitedCity from '../VisitedCity'
// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Table from '../tables/Table'
import { citiesVisitValues, sortToVisitCitiesByDateTime } from '../../../../utils/util'

export const ToVisitCitiesList = ({ cities }) => {
  const [toVisitCities, setToVisitCities] = useState([])

  useEffect(() => {
    const filterToVisit = cities.filter(
      city => city.visited === citiesVisitValues.tovisit.visitedValue
    )
    setToVisitCities(sortToVisitCitiesByDateTime(filterToVisit))
  }, [cities])

  return (
    <>
      <Card className='toVisitCitiesList'>
        <CardContent>
          <h3>
            Próximas{' '}
            {toVisitCities.length > 0 && (
              <span style={{ color: '#0050ef' }}>{toVisitCities?.length}</span>
            )}{' '}
            ciudades a visitar{' '}
          </h3>

          {toVisitCities.length === 0 && (
            <p style={{ marginTop: '10px' }}>Serán publicado aquí en breve.</p>
          )}
          {toVisitCities.length > 0 && (
            <Table
              cities={toVisitCities}
              isScrollable={false}
              // showTable={visitedCitiesSet.size - nModifiedVisitedCities > 0}
              visitedValue={citiesVisitValues.tovisit.visitedValue}
            />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default ToVisitCitiesList

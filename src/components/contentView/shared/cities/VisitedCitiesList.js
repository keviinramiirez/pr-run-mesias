import React from 'react'
import './VisitedCitiesList.css'
// import VisitedCity from '../VisitedCity'
// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Table from '../../shared/tables/Table'
import { citiesVisitValues } from '../../../../utils/util'

export const VisitedCitiesList = ({ cities, visitedAmount }) => {
  return (
    <Card className='visitedCitiesList'>
      <CardContent>
        <h3>
          Ya corrimos en <span style={{ color: '#00a04b' }}>{visitedAmount}</span> ciudades
        </h3>
        <Table cities={cities} visitedValue={citiesVisitValues.visited.visitedValue} />
      </CardContent>
    </Card>
  )
}

export default VisitedCitiesList

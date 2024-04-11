import React, { useEffect, useState } from 'react'
import './VisitedCitiesList.css'
// import VisitedCity from '../VisitedCity'
// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Table from '../../Table'

export const VisitedCitiesList = ({ cities, onDeleteVisited }) => {
  return (
    <Card className='visitedCitiesList'>
      <CardContent>
        <h3>
          Ya corrimos en{' '}
          <span style={{ color: '#0050ef' }}>{cities?.length}</span> ciudades
        </h3>
        <Table cities={cities} />
      </CardContent>
    </Card>
  )
}

export default VisitedCitiesList

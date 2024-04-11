import React, { useEffect, useState } from 'react'
import './VisitedCitiesList.css'
import VisitedCity from '../VisitedCity'
// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export const VisitedCitiesList = ({ cities, onDeleteVisited }) => {
  return (
    <div className='VisitedCitiesList'>
      {/* <SortableContext items={cities} strategy={verticalListSortingStrategy}> */}
      {cities.map((city) => (
        <VisitedCity key={city.id} city={city} />
      ))}
      {/* </SortableContext> */}
    </div>
  )
}

export default VisitedCitiesList

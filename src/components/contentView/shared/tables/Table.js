import React from 'react'
import './Table.css'
import { beautifyDate, get12HourFormatOfDate } from '../../../../services/dateServices'
import { visitValuesMap } from '../../../../services/cityService'

function Table({ cities, isScrollable = true, visitValue = undefined }) {
  return (
    <div className={`table ${isScrollable ? 'table__staticHeight' : ''}`}>
      {visitValue === visitValuesMap.tovisit && (
        <tr>
          <th></th>
          {/* <th>Día</th> */}
          <th style={{ paddingLeft: '5.8em' }}>Día</th>
          <th style={{ paddingRight: '1em' }}>Hora</th>
        </tr>
      )}
      {/* {cities?.map(({ name, lat, visited, date }) => {
        const key = name + lat
        return (
          visited === visitedValue && (
            <>
              <tr key={key}>
                <td>{name}</td>
                {date && (
                  <>
                    <td>
                      <span>{beautifyDate(date)} </span>
                    </td>
                    <td>
                      <span>{get12HourFormatOfDate(date)} </span>
                    </td>
                  </>
                )}
              </tr>
            </>
          )
        )
      })} */}
      {cities?.map(({ name, lat, visited, date }) => {
        const key = name + lat
        const bool = !visitValue || visited === visitValue
        return (
          bool && (
            <>
              {/* <tr key={key}>
                  <th>Ciudad</th>
                  <th>Día</th>
                  <th>Hora</th>
                </tr> */}
              <tr key={key}>
                <td>{name}</td>
                {date && (
                  <>
                    <td>
                      <span>{beautifyDate(date)} </span>
                    </td>
                    <td>
                      <span>{get12HourFormatOfDate(date)} </span>
                    </td>
                  </>
                )}
              </tr>
            </>
          )
        )
      })}
    </div>
  )
}

export default Table

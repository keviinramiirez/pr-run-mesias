import React from 'react'
import './Table.css'

function Table({ cities }) {
  console.log(cities)
  return (
    <div className='table'>
      {cities?.map(({ name, lat, visited }) => {
        const key = name + lat
        return (
          visited > 0 && (
            <tr key={key}>
              <td>{name}</td>
              {/* <td>
                <strong>{visited}</strong>
              </td> */}
            </tr>
          )
        )
      })}
    </div>
  )
}

export default Table

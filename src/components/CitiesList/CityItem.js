// import { useSortable } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'
import './CityItem.css'
import Circle from '../Circle/Circle'
import { MenuItem, Select, InputLabel, FormControl } from '@material-ui/core'
import { useState } from 'react'

const CityItem = ({ city, onCityChange }) => {
  // const { attributes, listeners, setNodeRef, transform, transition } =
  //   useSortable(id)

  // const style = {
  //   transition,
  //   transform: CSS.Transform.toString(transform),
  // }

  const visitedValues = ['Aún por visitar', 'Ya lo corrimos', 'Próxima corrida']
  // const [selectedVisitedValue, setSelectedVisitedValue] = useState(city)

  return (
    <div
      // ref={setNodeRef}
      // style={style}
      // {...attributes}
      // {...listeners}
      className='cityItem'
    >
      {/* <input type='checkbox' className='checkbox' /> */}
      {/* {name} */}
      {/* <Circle visited={city.visited} /> */}
      <Circle visited={city.visited} city={city.name}></Circle>
      <span style={{ width: '36%' }}>{city.name}</span>
      {/* <DeleteIcon color={'secondary'} onClick={() => onDeleteVisited(city)} /> */}

      <FormControl>
        {/* <InputLabel id='select-label'></InputLabel> */}

        <Select
          variant='outlined'
          // onChange={(e) => onCityChange(e)}
          onChange={(e) => onCityChange(e, city)}
          value={city.visited}
        >
          {visitedValues.map((_, i) => {
            // console.log('bruh', visitedValue)
            return (
              <MenuItem value={i}>
                <Circle visited={i} isHidden={city.id == i}></Circle>
                <span>{visitedValues[i]}</span>
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  )
}

export default CityItem

{
  /* <Select
          variant='outlined'
          // onChange={(e) => onCityChange(e)}
          onChange={onCityChange}
          value={visitedValues[city.visited]}
        >
          {visitedValues.map((visitedValue, i) => {
            // console.log('bruh', visitedValue)
            return (
              <MenuItem value={visitedValues[i]}>
                <Circle visited={i} isHidden={city.id == i}></Circle>
                <span>{visitedValues[i]}</span>
              </MenuItem>
            )
          })}
        </Select> */
}

// import { useSortable } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'
import './VisitedCity.css'
import Circle from './Circle/Circle'
import { MenuItem, Select, InputLabel, FormControl } from '@material-ui/core'

const VisitedCity = ({ cities, city, onCityChange }) => {
  console.log('Visitiedity', cities)
  // const { attributes, listeners, setNodeRef, transform, transition } =
  //   useSortable(id)

  // const style = {
  //   transition,
  //   transform: CSS.Transform.toString(transform),
  // }

  return (
    <div
      // ref={setNodeRef}
      // style={style}
      // {...attributes}
      // {...listeners}
      className='city'
    >
      {/* <input type='checkbox' className='checkbox' /> */}
      {/* {name} */}
      {/* <Circle visited={city.visited} /> */}
      <span style={{ width: '70%' }}>{city.name}</span>
      {/* <DeleteIcon color={'secondary'} onClick={() => onDeleteVisited(city)} /> */}
      <FormControl>
        <InputLabel id='select-label'>CIUDADES</InputLabel>
        <Select
          variant='outlined'
          onChange={onCityChange}
          value={cities[0]?.name}
        >
          {cities?.map((city) => {
            return (
              <MenuItem value={city}>
                <Circle visited={city.visited}></Circle>
                <span>{city.name}</span>
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  )
}

export default VisitedCity

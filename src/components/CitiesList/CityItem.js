// import { useSortable } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'
import './CityItem.css'
import Circle from '../Circle/Circle'
import {
  MenuItem,
  Select,
  TextField,
  InputLabel,
  InputLabelProps,
  FormControl,
} from '@material-ui/core'
import { visitedValues } from '../../utils/util'

const CityItem = ({ city, onCityChange }) => {
  // const visitedValues = ['Aún por visitar', 'Ya lo corrimos', 'Próxima corrida']
  // const [selectedVisitedValue, setSelectedVisitedValue] = useState(city)

  return (
    <li
      // ref={setNodeRef}
      className='cityItem'
    >
      {/* <input type='checkbox' className='checkbox' /> */}
      {/* {name} */}
      {/* <Circle visited={city.visited} /> */}
      {/* <Circle visited={city.visited} city={city.name}></Circle> */}
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
                {/* <Circle visited={i} isHidden={city.id == i} /> */}
                <Circle visited={i} />
                <span>{visitedValues[i]}</span>
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>

      {/* <FormControl>
        <TextField
          id='time'
          label='Alarm clock'
          type='time'
          defaultValue='07:30'
          className=''
          // InputLabelProps={{
          //   shrink: true,
          // }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </FormControl> */}
    </li>
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

import './ModifiableCityItem.css'
import Circle from '../../map/Circle'
import {
  MenuItem,
  Select,
  TextField,
  InputLabel,
  InputLabelProps,
  FormControl,
  makeStyles,
  Button,
} from '@material-ui/core'
import { visitedValues } from '../../../utils/util'
import '../../../App.css'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CreateIcon from '@material-ui/icons/Create'
import {
  beautifyDate,
  get12HourFormatOfDate,
  toISOYearFormat,
} from '../../../services/dateServices'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '140px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))

const ModifiableCityItem = ({ city, onCityChange, onOpenCityEdit }) => {
  const classes = useStyles()

  return (
    <ListItem key={city.id} className='modifiableCityItem'>
      {/* <ListItemText style={{ width: '36%' }}>{city.name}</ListItemText> */}
      <Circle visited={city.visited} />
      <div className='modifiableCityItem__labels'>
        <p style={{ paddingTop: `${city.date ? '4px' : '0'}` }}>{city.name}</p>
        {city.date && (
          <>
            <span className='modifiableCityItem__dateLabel'>{beautifyDate(city.date)},</span>
            <span className='modifiableCityItem__hourLabel'>
              {get12HourFormatOfDate(city.date)}
            </span>
          </>
        )}
      </div>
      <Button onClick={() => onOpenCityEdit(city)} color='primary' variant='outlined'>
        Ver
      </Button>
      {/* <FormControl>
        <Select
          variant='outlined'
          // onChange={(e) => onCityChange(e)}
          onChange={(e) => onCityChange(e, city)}
          value={city.visited}
        >
          {visitedValues.map((_, i) => {
            // console.log('bruh', visitedValue)
            return (
              <MenuItem key={i} value={i}>
                <Circle visited={i} />
                <span>{visitedValues[i]}</span>
              </MenuItem>
            )
          })}
        </Select>
      </FormControl> */}
      {/* {city.visited > 1 && (
        <form className={classes.container} noValidate>
          <TextField
            id='date'
            label=''
            type='date'
            defaultValue='2017-05-24'
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      )} */}
      {/* <InputLabel id='select-label'></InputLabel> */}
    </ListItem>
  )
}

export default ModifiableCityItem

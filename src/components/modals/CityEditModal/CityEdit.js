import React, { useEffect, useRef, useState } from 'react'
import './CityEdit.css'
import { db } from '../../../auth/firebase'
import { collection, query, getDocs, setDoc, doc, getDoc, Timestamp } from 'firebase/firestore'
import classes from './CityEditModal.module.css'
import Modal from '../Modal'
import { visitedValues } from '../../../utils/util'
import { Button, Checkbox, FormControl, MenuItem, Select, TextField } from '@material-ui/core'
import Circle from '../../map/Circle'
import {
  beautifyDate,
  beautifyDateHour,
  get24HourFormatOfDate,
  get24HourFormatOfTime,
  toISOYearFormat,
  toJSDate,
} from '../../../services/dateServices'
import SubscribedUsers from './SubscribedUsers'

const portalElement = document.getElementById('city-edit-portal')

const CityEdit = ({ city, onCityChange, onSaveChanges, onCloseCityEdit }) => {
  // const cityToEdit = JSON.parse(JSON.stringify(city))
  const [isDateChecked, setIsDateChecked] = useState(false)
  const [isDateFieldsValid, setIsDateFieldsValid] = useState(false)
  const [selectedCityVisitValue, setSelectedCityVisitValue] = useState(city.visited)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  // const [cityToEdit, setCityToEdit] = useState(deepCopy)

  // const [selectedTime, setSelectedTime] = React.useState(new Date('2014-08-18T21:11'));

  const dateToDatetime = date => {
    const isoYearFormat = toISOYearFormat(date)
    const time24 = get24HourFormatOfDate(date)
    return `${isoYearFormat}T${time24}`
  }

  useEffect(() => {
    const getCity = async () => {
      const fetchedCity = doc(db, 'cities', city.name)
      const docSnap = await getDoc(fetchedCity)
      const cityData = docSnap.data()
      // console.log('cityData', cityData.date)
      if (cityData.date) {
        setIsDateChecked(true)
        // const isoYearFormat = toISOYearFormat(selectedDate)
        const isoDatetime = dateToDatetime(cityData.date) // 2024-04-27T16:00
        const isoYear = toISOYearFormat(isoDatetime) // 2024-04-27
        const time24 = get24HourFormatOfDate(cityData.date)
        // console.log('---time24', time24)
        setSelectedDate(isoYear)
        setSelectedTime(time24)

        // console.log(new Date(`${isoYearFormat}T${time}Z`).toISOString())
      }
      // else setIsDateFieldsValid(false)
      // setCityToEdit()
    }
    getCity()
  }, [])

  useEffect(() => {
    // if (isDateFieldsValid)
    checkDatetimeFieldsValidity()
  }, [selectedDate, selectedTime, isDateChecked])

  const checkDatetimeFieldsValidity = () => {
    if (!isDateChecked) {
      setIsDateFieldsValid(true)
      return
    }
    // console.log('check', toISOYearFormat(selectedDate), selectedTime)
    if (toISOYearFormat(selectedDate) && selectedTime) {
      // console.log('Datetimes VALID')
      setIsDateFieldsValid(true)
    } else setIsDateFieldsValid(false)
  }

  const handleVisitedChange = e => {
    const visitedValue = e.target.value
    setSelectedCityVisitValue(visitedValue)
    if (visitedValue === 0) setIsDateChecked(false)
    // onCityChange(e, city)
  }

  const handleIsDateChecked = e => {
    // console.log('IsDateChecked', e.target.checked)
    setIsDateChecked(e.target.checked)
  }

  // console.log('city', city, city.name)
  // console.log('deepCopy', deepCopy)

  const handleDateChange = e => {
    // console.log('setSelectedDate', e.target.value)
    setSelectedDate(e.target.value)
  }

  const handleTimeChange = e => {
    // console.log('setSelectedTime', e.target.value)
    setSelectedTime(e.target.value)
  }

  const handleCityToSave = () => {
    const cityToEdit = JSON.parse(JSON.stringify(city))
    cityToEdit.visited = selectedCityVisitValue
    console.log(' ')
    // cityToEdit.date = dateToDatetime()

    // console.log('selectedDate', selectedDate)
    // console.log('selectedDate', selectedDate)
    // const isoYear = toISOYearFormat(selectedDate)
    // const time24 = get24HourFormatOfDate(selectedTime)
    // console.log('isoYear', isoYear)
    // console.log('time24', time24)

    // console.log(
    //   'new Date(${isoYearFormat}T${time})',
    //   new Date(`${isoYear}T${selectedTime}Z`)
    // )
    // console.log(Timestamp.fromDate(new Date(`${isoYear}T${selectedTime}`)))
    // console.log(
    //   Firestore.Timestamp.fromDate(new Date(`${isoYear}T${selectedTime}`))
    // )
    if (!isDateChecked || selectedCityVisitValue === 0) delete cityToEdit.date
    else if (isDateChecked) {
      const newTimestamp = Timestamp.fromDate(new Date(`${selectedDate}T${selectedTime}`))
      // console.log('newTimestamp', newTimestamp)
      // console.log('dateToDatetime(newTimestamp)', dateToDatetime(newTimestamp))

      // setUserToEdit((city) => {
      //   const newCity = { ...city }
      //   newCity.date = timestamp
      //   return newCity
      // })

      cityToEdit.date = newTimestamp
    }
    // onCityChange(cityToEdit)
    onSaveChanges(cityToEdit)
  }

  return (
    <Modal onClose={onCloseCityEdit} portalElement={portalElement} classes={classes}>
      <div className='cityEdit'>
        <div className='cityEdit__container'>
          <div className='cityEdit__left'>
            <div className='cityEdit__selectField'>
              <h3>{city.name}</h3>
              <FormControl>
                <Select
                  variant='outlined'
                  // onChange={(e) => onCityChange(e)}
                  onChange={handleVisitedChange}
                  value={selectedCityVisitValue}
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
              </FormControl>
            </div>

            <div className='cityEdit__checkbox'>
              {selectedCityVisitValue > 0 && (
                <>
                  <Checkbox
                    checked={isDateChecked}
                    onChange={handleIsDateChecked}
                    // inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <p>Mostrar Fecha</p>
                </>
              )}

              {selectedCityVisitValue === 0 && (
                <p
                  style={{
                    marginTop: '5px',
                    marginBottom: '5px',
                    marginLeft: '20px',
                  }}
                >
                  NO se mostrará Día ni Hora
                </p>
              )}
            </div>
            {isDateChecked && selectedCityVisitValue > 0 && (
              <div className='cityEdit__datetime'>
                <FormControl className='cityEdit__date'>
                  <TextField
                    id='date'
                    type='date'
                    // label={'Día'}
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>

                <FormControl className='cityEdit__time'>
                  <TextField
                    id='time'
                    type='time'
                    // label={'Hora'}
                    value={selectedTime}
                    className=''
                    onChange={handleTimeChange}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </FormControl>
              </div>
            )}
          </div>
          <div className='cityEdit__right'>
            <h4>Suscritos</h4>
            <SubscribedUsers city={city} />
          </div>
        </div>
        <Button
          style={{ marginTop: '20px' }}
          onClick={() => handleCityToSave(city)}
          color='primary'
          variant='contained'
          fullWidth
          disabled={!isDateFieldsValid}
          // disabled={toISOYearFormat(selectedDate) && selectedTime}
        >
          Guardar
        </Button>
      </div>
    </Modal>
  )
}

export default CityEdit

{
  /* 
<FormControl className='cityEdit__date'>
  <TextField
    id='date'
    label=''
    type='date'
    defaultValue='2024-05-4'
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
</FormControl>

<FormControl className='cityEdit__time'>
  <TextField
    id='time'
    label='Alarm clock'
    type='time'
    defaultValue='06:30'
    className=''
    // InputLabelProps={{
    //   shrink: true,
    // }}
    inputProps={{
      step: 300, // 5 min
    }}
  />
</FormControl> */
}

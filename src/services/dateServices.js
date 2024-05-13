import { Timestamp } from 'firebase/firestore'

export const MONTH_NAME = {
  0: 'Ene',
  1: 'Feb',
  2: 'Mar',
  3: 'Abr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Ago',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dic',
}

export const DAY_NAME = {
  0: 'Martes',
  1: 'Miércoles',
  2: 'Jueves',
  3: 'Viernes',
  4: 'Sábado',
  5: 'Domingo',
  6: 'Lunes',
}

export const toJSDate = fTimestamp => {
  // console.log('fTimestamp', fTimestamp)
  return new Timestamp(fTimestamp.seconds, fTimestamp.nanoseconds).toDate()
}

export const toFirebaseTimestampSeconds = d => {
  // console.log('fTimestamp', fTimestamp)
  return d.getTime() / 1000
}

/**
 * Returns given date into ISO format string excluding the time section.
 * @param {object | string} d a timestamp or date object
 */
export const toISOYearFormat = d => {
  if (!d) return ''
  // console.log('d', d, d instanceof String)
  if (typeof d === 'string') {
    // console.log('-', d, d + 'T10:30')
    d = new Date(d) //2017-05-24T10:30
    // console.log('---', d)
  }
  let parsed = d instanceof Date && !isNaN(d) ? d : toJSDate(d)

  return !parsed
    ? ''
    : parsed.getUTCFullYear() +
        '-' +
        addLeadingZeros(parsed.getUTCMonth() + 1) +
        '-' +
        addLeadingZeros(parsed.getDate())
}

export const beautifyDateHour = d => {
  if (!d) return ''
  // const d = toJSDate(date)
  // const parsed = toJSDate(d)
  let parsed = d instanceof Date && !isNaN(d) ? new Date(d) : toJSDate(d)

  return parsed.getHours() + ':' + parsed.getMinutes() + ' ' + ''
}

/**
 * Returns the given hour string with the hour period ('AM' or 'PM').
 * @param {string} d a date object.
 * @param {boolean} spaceBeforePeriod true to add a space between the minute and the time period.
 */
export const get12HourFormatOfDate = (d, spaceBeforePeriod = false) => {
  if (!d) return null
  const split = get24HourFormatOfDate(toJSDate(d)).split(':')

  // console.log('-', d.getHours())
  let hour = Number(split[0])
  let period = 'AM'
  if (hour >= 12) period = 'PM'
  if (hour > 12) hour -= 12

  const minute = split[1] + (spaceBeforePeriod ? ' ' : '')
  return hour + ':' + minute + period
}

/**
 * Returns the given hour in 24 hour format string.
 * @param {string} t string representing the time of a day in 12 hour format.
 * @param {boolean} zeroOnHour determines adding leading zero to the hour.
 */
export const get24HourFormatOfTime = (t, zeroOnHour) => {
  if (!t) return ''

  t = String(t)
  const split = t.split(':')

  if (t.includes('PM')) {
    let hour = Number(split[0])
    if (hour !== 12) hour += 12
    return (hour + ':' + split[1]).substr(0, t.length - 2).trim()
  }

  if (t.includes('AM')) {
    let res = t.substr(0, t.length - 2).trim()
    const hour = res.split(':')[0]
    if (zeroOnHour && hour.length === 1) res = '0' + res
    return res
  }

  return t
}

/**
 * Returns a string format describing the given date (i.e. Nov. 16, 2021).
 * @param {*} d date to be beautify
 */
export const beautifyDate = d => (d ? beautifyDateStr(toISOYearFormat(d)) : '')
// export const beautifyDate = (d) =>
//   d
//     ? beautifyDateStr(toISOYearFormat(d)) + ' a las ' + get12HourFormatOfDate(d)
//     : ''

// **********  PRIVATE METHODS  **********

/**
 * Returns a string format describing the given date in string string form (i.e. Nov. 16, 2021).
 * @param {string} s iso date formatted string (i.e. 2021-11-16).
 */
const beautifyDateStr = isoStr => {
  // console.log('isoStr', isoStr)
  const split = isoStr.split('-')
  const [_, nMonth, nDay] = split
  return MONTH_NAME[nMonth - 1] + '. ' + nDay
}

const addLeadingZeros = s => ('0' + s).slice(-2)

/**
 * Returns the hours of the given date in a 24 hour format.
 * @param {string} d a date object.
 */
export const get24HourFormatOfDate = d => {
  // console.log('d', d)
  if (!d) return ''
  // if (typeof d === 'string') d = new Date(d)
  let parsed = d instanceof Date && !isNaN(d) ? new Date(d) : toJSDate(d)

  let hour = addLeadingZeros(parsed.getHours())
  const minute = addLeadingZeros(parsed.getMinutes())
  // console.log(parsed.getMinutes(), 'minute', minute)
  return hour + ':' + minute
}

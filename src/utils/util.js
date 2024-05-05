import './utils.css'

export const sortCitiesByName = (cities) => {
  const sortedData = [...cities]
  sortedData.sort((a, b) => (a.name > b.name ? 1 : -1))
  return sortedData
}

export const sortCitiesByToVisit = (cities) => {
  const sortedData = [...cities]
  sortedData.sort((a, b) => (a.visited < b.visited ? 1 : -1))
  return sortedData
}

export const sortToVisitCitiesByDateTime = (cities) => {
  const sortedByDateThenTime = [...cities]
  // console.log('cities', cities, sortedByDateThenTime)
  sortedByDateThenTime.sort((a, b) => toJSDate(a.date) - toJSDate(b.date))
  // sortedByDateThenTime.sort(
  //   (a, b) => a.createdAt.toMillis() - b.createdAt.toMillis()
  // )
  // a.createdAt.toMillis() - b.createdAt.toMillis()
  return sortedByDateThenTime
}

export const visitedValues = [
  'Aún por visitar',
  'Ya lo corrimos',
  'Próxima corrida',
]

export const citiesVisitValues = {
  notVisited: {
    visitedValue: 0,
    label: visitedValues[0],
    hex: '#808080',
    rgb: 'rgb(204, 16, 52)',
    half_op: 'rgba(204, 16, 52, 0.5)',
    radius: 2000,
  },
  visited: {
    visitedValue: 1,
    label: 'Ya lo corrimos',
    hex: '#00d061',
    rgb: 'rgb(125, 215, 29)',
    half_op: 'rgba(125, 215, 29, 0.5)',
    radius: 2000,
  },
  tovisit: {
    visitedValue: 2,
    label: 'Próxima corrida',
    hex: '#0050ef',
    rgb: 'rgb(251, 68, 67)',
    half_op: 'rgba(251, 68, 67, 0.5)',
    radius: 3500,
  },
}

export const toJSDate = (d) => {
  // console.log('d', d)
  if (d === undefined) return null
  const ts = (d.seconds + d.nanoseconds / 1000000000) * 1000
  return new Date(ts)
}

export const firebaseDateConversion = (d) => {
  // d = new Date()
  // let fTimestamp = new firebase.firestore.Timestamp.fromDate(d)
}

// export const showDataOnMap = (cities) =>
//   cities.map((city) => {
//     // console.log('city:', )
//     let radius = String(city.name).includes('edell') ? 50000 : 2000
//     let hexColor = citiesVisitValues['notVisited'].hex

//     if (city.visited === 1) hexColor = citiesVisitValues['visited'].hex
//     else if (city.visited > 1) {
//       console.log('blue city is', city.name)
//       hexColor = citiesVisitValues['tovisit'].hex
//       radius = citiesVisitValues['tovisit'].radius
//     }

//     // if (city.visited >= 0) return null

//     return (
//       <div>
//         <Circle
//           center={[city.lat, city.long]}
//           color={hexColor}
//           fillColor={hexColor}
//           fillOpacity={0.4}
//           radius={radius}
//           // className={`${city.visited < 0 ? 'circle-zoom' : ''}`}
//         >
//           <Popup>
//             <div className='util__cityInfoContainer'>
//               <div className='util__cityInfoName'>{city.name}</div>
//               <div className='util__circleContainer'>
//                 <div
//                   className={`util__circleWithBorder ${
//                     city.visited === 0
//                       ? 'util__Grey'
//                       : city.visited === 1
//                       ? 'util__Green'
//                       : 'util__Blue'
//                   }`}
//                 ></div>
//                 <div className='util__infoVisited'>
//                   {city.visited === 0 ? (
//                     <div>Ya lo corrimos</div>
//                   ) : city.visited === 1 ? (
//                     <div>Ya lo corrimos</div>
//                   ) : (
//                     <div>Próxima corrida</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Popup>
//         </Circle>
//         {city.visited > 1 && (
//           <Circle
//             center={[city.lat, city.long]}
//             color={hexColor}
//             fillColor={hexColor}
//             fillOpacity={0.4}
//             radius={radius + 4000}
//             className={`${city.visited > 1 ? 'pulsing-circle' : ''}`}
//           ></Circle>
//         )}
//       </div>
//     )
//   })

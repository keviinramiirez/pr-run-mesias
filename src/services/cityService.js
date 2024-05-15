import { toJSDate } from './dateServices'
import { db } from './firebase'
import { collection, query, getDocs, setDoc, doc } from 'firebase/firestore'

export const sortCitiesByName = cities => {
  const sortedData = [...cities]
  sortedData.sort((a, b) => (a.name > b.name ? 1 : -1))
  return sortedData
}

export const sortCitiesByTovisit = cities => {
  const sortedData = [...cities]
  sortedData.sort((a, b) => (a.visited < b.visited ? 1 : -1))
  return sortedData
}

export const sortTovisitCitiesByDateTime = cities => {
  const sortedByDateThenTime = [...cities]
  // console.log('cities', cities, sortedByDateThenTime)
  sortedByDateThenTime.sort((a, b) => toJSDate(a.date) - toJSDate(b.date))
  // sortedByDateThenTime.sort(
  //   (a, b) => a.createdAt.toMillis() - b.createdAt.toMillis()
  // )
  // a.createdAt.toMillis() - b.createdAt.toMillis()
  return sortedByDateThenTime
}

export const visitValuesMap = {
  tovisit: 2,
  visited: 1,
  notvisited: 0,
}

export const isTovisitValue = visitValue => visitValue === visitValuesMap.tovisit
export const isVisitedValue = visitValue => visitValue === visitValuesMap.visited
export const isNotvisitedValue = visitValue => visitValue === visitValuesMap.notvisited

export const getVisitColor = visitedValue => {
  let color = '#808080' //grey
  if (isTovisitValue(visitedValue)) color = '#0050ef' // blue
  else if (isVisitedValue(visitedValue)) color = '#01823d' // green
  return color
}
export const visitLabels = ['Aún por visitar', 'Ya lo corrimos', 'Próxima corrida']

export const getVisitLabel = visitedValue => {
  let label = visitLabels[0]
  if (isVisitedValue(visitedValue)) label = visitLabels[1]
  if (isTovisitValue(visitedValue)) label = visitLabels[2]
  return label
}

export const checkIsSubscribedCity = (user, city) =>
  user?.subscribedCities.some(c => c.name === city.name)

// export const getSubscribedTovisitCitiesOf = user => {
//   const subscribedTovisitCities = []
//   user?.subscribedCities.forEach(city => {
//     const tovisitCity = cities.find(mc => city.name === mc.name && mc.visited === 2)
//     if (tovisitCity) {
//       console.log(tovisitCity.name, 'subscribedTovisitCities', subscribedTovisitCities)
//       subscribedTovisitCities.push(tovisitCity)
//     }
//     // console.log('---', subcribedTovisitCity)
//   })
//   return subscribedTovisitCities
// }

export const fetchSubscribedUsersOf = async city => {
  // const q = query(collection(db, 'users'), where('subscribedCities.length', '>', 0))
  const q = query(collection(db, 'users'))
  const querySnapshot = await getDocs(q)
  const subscribedUsers = []
  querySnapshot.forEach(doc => {
    const user = doc.data()
    // const { subscribedCities } = user
    // console.log(doc.id, ' => ', user, user.displayName)
    if (user?.subscribedCities.some(c => c.name === city.name)) subscribedUsers.push(user)
  })
  // console.log('subscribedUsers', subscribedUsers)
  return subscribedUsers
}

export const subscribeUserCity = async (user, city) => {
  const { subscribedCities } = user
  let subscribedCitiesClone = [...subscribedCities]
  subscribedCitiesClone.push(city)
  // user.subscribedCities = subscribedCitiesClone
  const newUser = {
    ...user,
    subscribedCities: sortCitiesByTovisit(sortCitiesByName(subscribedCitiesClone)),
  }
  // console.log('newUser', newUser)
  await setDoc(doc(db, 'users', user.email), newUser)
  return newUser
}

export const unsubscribeUserCity = async (user, city) => {
  const { subscribedCities } = user
  let subscribedCitiesClone = [...subscribedCities]
  const toModifyIndex = subscribedCitiesClone.findIndex(c => c.name === city.name)
  // console.log('---toModifyIndex', toModifyIndex)
  subscribedCitiesClone.splice(toModifyIndex, 1)
  // let cityToModify = { ...subscribedCities[toModifyIndex] }

  // let citiesClone = [...cities]
  // let cityToModify = { ...cities[toModifyIndex] }
  // cityToModify.visited = selectedVisitedValue
  // citiesClone[toModifyIndex] = cityToModify
  // console.log('subscribedCitiesClone', subscribedCitiesClone)
  const newUser = {
    ...user,
    subscribedCities: subscribedCitiesClone,
  }
  await setDoc(doc(db, 'users', user.email), newUser)
  return newUser
}

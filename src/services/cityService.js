import { db } from '../auth/firebase'
import {
  deleteField,
  updateDoc,
  collection,
  query,
  getDocs,
  getDoc,
  setDoc,
  doc,
  where,
} from 'firebase/firestore'
import { citiesVisitValues, sortCitiesByName, sortCitiesByToVisit } from '../utils/util'

export const getCityVisitedColor = city => {
  const { visited } = city
  let color = '#808080' //grey
  if (visited === citiesVisitValues.tovisit.visitedValue) color = '#0050ef' // blue
  else if (visited === citiesVisitValues.visited.visitedValue) color = '#00a64e' // green
  return color
}

export const fetchSubscribedUsersOf = async city => {
  // const q = query(collection(db, 'users'), where('subscribedCities.length', '>', 0))
  const q = query(collection(db, 'users'))
  const querySnapshot = await getDocs(q)
  const subscribedUsers = []
  querySnapshot.forEach(doc => {
    const user = doc.data()
    // const { subscribedCities } = user
    if (doc.id !== 'password') {
      // console.log(doc.id, ' => ', user, user.displayName)
      if (user?.subscribedCities.some(c => c.name === city.name)) subscribedUsers.push(user)
    }
  })
  // console.log('subscribedUsers', subscribedUsers)
  return subscribedUsers
}

export const checkIsSubscribedCity = (user, city) =>
  user?.subscribedCities.some(c => c.name === city.name)

export const subscribeUserCity = async (user, city) => {
  const { subscribedCities } = user
  let subscribedCitiesClone = [...subscribedCities]
  subscribedCitiesClone.push(city)
  // user.subscribedCities = subscribedCitiesClone
  const newUser = {
    ...user,
    subscribedCities: sortCitiesByToVisit(sortCitiesByName(subscribedCitiesClone)),
  }
  console.log('newUser', newUser)
  await setDoc(doc(db, 'users', user.email), newUser)
  return newUser
}

export const unsubscribeUserCity = async (user, city) => {
  const { subscribedCities } = user
  let subscribedCitiesClone = [...subscribedCities]
  const toModifyIndex = subscribedCitiesClone.findIndex(c => c.name === city.name)
  console.log('---toModifyIndex', toModifyIndex)
  subscribedCitiesClone.splice(toModifyIndex, 1)
  // let cityToModify = { ...subscribedCities[toModifyIndex] }

  // let citiesClone = [...cities]
  // let cityToModify = { ...cities[toModifyIndex] }
  // cityToModify.visited = selectedVisitedValue
  // citiesClone[toModifyIndex] = cityToModify
  const newUser = {
    ...user,
    subscribedCities: subscribedCitiesClone,
  }
  await setDoc(doc(db, 'users', user.email), newUser)
  return newUser
}

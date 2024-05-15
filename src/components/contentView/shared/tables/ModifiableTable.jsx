import { useAuthContext } from '../../../../store/AuthContext/AuthProvider'
import './ModifiableTable.css'
import ModifiableCityItem from './ModifiableCityItem'

const ModifiableTable = ({
  modifiableCities,
  isScrollable,
  onOpenCityEdit,
  visitedAmount,
  subscribedTovisitSet,
  onSubscription,
}) => {
  // console.log('modifiableCities', modifiableCities)
  // const [isSubscribedCity, setIsSubscribedCity] = useState(checkIsSubscribedCity(undefined, city))
  // const [sortedCities, setSortedCities] = useState(
  //   sortCitiesByToVisit(sortCitiesByName(modifiableCities))
  // )

  // Context API
  const { authState } = useAuthContext()
  const { currentUser } = authState
  // const handleSubscription = () => {
  //   dispatchUserCitySubscription(city)
  // }

  // useEffect(() => {
  //   setIsSubscribedCity(checkIsSubscribedCity(currentUser, city))
  // }, [subscribedCities])

  // const handleSubscription = city => {
  //   dispatchUserCitySubscription(city)
  // }

  const isSubscribedCity = city => {
    return subscribedTovisitSet?.has(city)
  }

  return (
    <>
      {currentUser?.type === 'admin' && (
        <h4>
          Ya corrimos en <span style={{ color: '#00a04b' }}>{visitedAmount}</span> ciudades
        </h4>
      )}
      {currentUser?.type === 'guest' && (
        <h4>
          Ciudades Suscritas: <span>{subscribedTovisitSet?.size}</span>
        </h4>
      )}
      <div className={`modifiableTable ${isScrollable ? 'modifiableTable__staticHeight' : ''}`}>
        {modifiableCities?.map(city => (
          <ModifiableCityItem
            key={city.name}
            userType={currentUser?.type}
            city={city}
            isSubscribedCity={isSubscribedCity(city)}
            onSubscription={c => onSubscription(c, isSubscribedCity(city))}
            onOpenCityEdit={onOpenCityEdit}
          />
        ))}
      </div>
    </>
  )
}

export default ModifiableTable

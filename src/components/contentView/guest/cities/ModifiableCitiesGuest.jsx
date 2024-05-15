import './ModifiableCitiesGuest.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ModifiableTable from '../../shared/tables/ModifiableTable'

const ModifiableCitiesGuest = ({ cities, onSubscription, subscribedTovisitSet }) => {
  return (
    <Card className='modifiableCitiesGuest'>
      <CardContent>
        <ModifiableTable
          modifiableCities={cities}
          isScrollable={true}
          subscribedTovisitSet={subscribedTovisitSet}
          onSubscription={(c, isSubscribedCity) => onSubscription(c, isSubscribedCity)}
        />
      </CardContent>
    </Card>
  )
}

export default ModifiableCitiesGuest

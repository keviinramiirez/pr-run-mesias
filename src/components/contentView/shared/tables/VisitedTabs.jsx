import './VisitedTabs.css'
import { Typography } from '@material-ui/core'
import {
  getVisitColor,
  isNotvisitedValue,
  isTovisitValue,
  isVisitedValue,
  visitValuesMap,
} from '../../../../services/cityService'
import Circle from '../map/Circle'
import { useRef } from 'react'

const activeBackgroundCSS = '#f3f3f3'

const VisitedTabs = ({
  activeTab,
  activeCities,
  onActivateTab,
  labelDimensions,
  labelElements,
}) => {
  const activeBorderCSS = () => {
    return `2px solid ${getVisitColor(activeTab)}`
  }

  // const tovisitLabelEl = useRef(null)
  // const visitedLabelEl = useRef(null)
  // const notvisitedLabelEl = useRef(null)

  // useEffect(() => {
  //   handleActiveTab(visitValuesMap.tovisit)
  // }, [])

  // const handleActiveTab = visitValue => {
  //   let top,
  //     left,
  //     iconMarginLeft = 0

  //   if (visitValue === visitValuesMap.tovisit) {
  //     setActiveTab(visitValuesMap.tovisit)
  //     iconMarginLeft = 15
  //     left = iconMarginLeft + tovisitLabelEl.current.offsetLeft
  //     top = tovisitLabelEl.current.offsetTop + tovisitLabelEl.current.clientHeight - 36
  //   } else if (visitValue === visitValuesMap.visited) {
  //     setActiveTab(visitValuesMap.visited)
  //     iconMarginLeft = 3
  //     left = iconMarginLeft + visitedLabelEl.current.offsetLeft
  //     top = visitedLabelEl.current.offsetTop + visitedLabelEl.current.clientHeight - 36
  //   } else if (visitValue === visitValuesMap.notvisited) {
  //     setActiveTab(visitValuesMap.notvisited)
  //     left = iconMarginLeft + notvisitedLabelEl.current.offsetLeft
  //     top = notvisitedLabelEl.current.offsetTop + notvisitedLabelEl.current.clientHeight - 36
  //   }
  //   setLabelDimensions({
  //     // position: 'absolute',
  //     top,
  //     left,
  //   })
  // }

  return (
    <div className='VisitedTabs'>
      <div
        className='VisitedTabs__tab'
        style={{
          borderBottom: `${isTovisitValue(activeTab) ? activeBorderCSS() : ''}`,
          backgroundColor: `${isTovisitValue(activeTab) ? activeBackgroundCSS : ''}`,
          fontWeight: `${isTovisitValue(activeTab) ? '600' : '500'}`,
        }}
        onClick={() => onActivateTab(visitValuesMap.tovisit, labelElements.tovisitLabelEl)}
      >
        {isTovisitValue(activeTab) && Object.keys(labelDimensions).length > 0 && (
          <Circle
            visited={visitValuesMap.tovisit}
            small={true}
            labelData={{
              amountLabel: activeCities.length,
              position: 'absolute',
              top: labelDimensions.top + 'px',
              left: labelDimensions.left + 'px',
              // paddingTop: '-22px !important',
            }}
          />
        )}
        <Typography
          variant='caption'
          component='div'
          style={{ fontWeight: `${isTovisitValue(activeTab) ? '600' : '500'}` }}
          ref={labelElements.tovisitLabelEl}
        >
          Próximas
        </Typography>
      </div>
      <div
        className='VisitedTabs__tab'
        style={{
          borderBottom: `${isVisitedValue(activeTab) ? activeBorderCSS() : ''}`,
          backgroundColor: `${isVisitedValue(activeTab) ? activeBackgroundCSS : ''}`,
          fontWeight: `${isVisitedValue(activeTab) ? '600' : '500'}`,
        }}
        onClick={() => onActivateTab(visitValuesMap.visited, labelElements.visitedLabelEl)}
      >
        {isVisitedValue(activeTab) && Object.keys(labelDimensions).length > 0 && (
          <Circle
            visited={visitValuesMap.visited}
            small={true}
            labelData={{
              amountLabel: activeCities.length,
              position: 'absolute',
              top: labelDimensions.top + 'px',
              left: labelDimensions.left + 'px',
            }}
          />
        )}
        <Typography
          variant='caption'
          component='div'
          // className={`${isVisitedValue(activeTab) ? 'marginLeft' : ''}`}
          style={{
            fontWeight: `${isVisitedValue(activeTab) ? '600' : '500'}`,
          }}
          ref={labelElements.visitedLabelEl}
        >
          Completadas
        </Typography>
      </div>
      <div
        className='VisitedTabs__tab'
        style={{
          borderBottom: `${isNotvisitedValue(activeTab) ? activeBorderCSS() : ''}`,
          backgroundColor: `${isNotvisitedValue(activeTab) ? activeBackgroundCSS : ''}`,
        }}
        onClick={() => onActivateTab(visitValuesMap.notvisited, labelElements.notvisitedLabelEl)}
      >
        {isNotvisitedValue(activeTab) && Object.keys(labelDimensions).length > 0 && (
          <Circle
            visited={visitValuesMap.notvisited}
            small={true}
            labelData={{
              amountLabel: activeCities.length,
              position: 'absolute',
              top: labelDimensions.top + 'px',
              left: labelDimensions.left + 'px',
            }}
          />
        )}
        <Typography
          variant='caption'
          component='div'
          // className={`${isNotvisitedValue(activeTab) ? 'marginLeft' : ''}`}
          style={{
            fontWeight: `${isNotvisitedValue(activeTab) ? '600' : '500'}`,
            marginLeft: `${isNotvisitedValue(activeTab) ? '10px !important' : ''}`,
          }}
          ref={labelElements.notvisitedLabelEl}
        >
          Aún por visitar
        </Typography>
      </div>
    </div>
  )
}

export default VisitedTabs

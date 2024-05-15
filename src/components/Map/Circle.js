import './Circle.css'

const Circle = ({ visited, small = false, labelData = undefined }) => {
  // console.log('\nlabelData', labelData)
  // console.log('labelData.top', labelData?.top)
  // console.log(
  //   'labelData',
  //   String(Number(labelData?.top.substring(0, labelData?.top.indexOf('p'))) - 12) + 'px !important'
  // )
  let color = 'grey'
  if (visited === 1) color = 'green'
  else if (visited > 1) color = 'blue'

  // let top = 0
  // if (labelData) {
  //   labelData.top = String(
  //     Number(labelData.top.substring(0, labelData.top.indexOf('p'))) - 15
  //   ).concat('px !important')
  //   labelData.left = String(
  //     Number(labelData.left.substring(0, labelData.left.indexOf('p'))) + 12
  //   ).concat('px !important')
  // }
  //   top = String(
  //     Number(labelData.top.substring(0, labelData.top.indexOf('p'))) - 15
  //   ).concat('px !important')

  return (
    <>
      {labelData && (
        // <p
        //   style={{
        //     ...labelData,
        //     position: 'absolute',
        //     top: labelData.top,
        //     left: labelData.left,
        //     fontSize: `${ ? '0.6em' : ''}`,
        //     paddingLeft: '4px',
        //   }}
        // >
        //   {labelData.amountLabel}
        // </p>
        <div
          className={`notificationAmountLabel`}
          style={{ top: labelData.top, left: labelData.left }}
        >
          <span className={`label circle__${color}`}>{labelData.amountLabel || ''}</span>
        </div>
      )}
      {!labelData && (
        <div className='circle'>
          <div
            className={`circle__withBorder circle__${color} circle__regular`}
            // ${visited > 1 ? 'pulsing-circle' : ''}
            // style={{ marginRight: '10px' }}
          ></div>
        </div>
      )}
    </>
  )
}

export default Circle

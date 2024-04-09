import './Circle.css'

const Circle = ({ visited, isHidden = false }) => {
  let color = 'grey'
  if (visited === 1) color = 'green'
  else if (visited > 1) color = 'blue'
  // ${visited > 1 ? 'pulsingAnimation' : ''}

  return (
    <div className='circle'>
      <div
        className={`circle__withBorder circle__${color}`}
        // ${visited > 1 ? 'pulsing-circle' : ''}
        // style={{ marginRight: '10px' }}
      ></div>
      {/* <div className={`${visited > 1 ? 'circle__pulsingAnimation' : ''}`}></div> */}
    </div>
  )
}

export default Circle

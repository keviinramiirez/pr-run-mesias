import { useState } from 'react'
import './Input.css'

export const Input = ({ onSubmit }) => {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    if (!input) return

    onSubmit(input)

    setInput('')
  }

  return (
    <div className='app_inputContainer'>
      <input
        className='app_input'
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit} className='app__addButton'>
        Add
      </button>
    </div>
  )
}

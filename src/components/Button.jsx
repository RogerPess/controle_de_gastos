import './Button.css'
import React from 'react'



const Button = ({name, className, onclick}) => {
  

  return (
    <div>
        <button onClick={onclick} className={className} type='submit'>{name}</button>
    </div>
  )
}

export default Button
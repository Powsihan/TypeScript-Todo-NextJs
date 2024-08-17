import React from 'react'

interface ButtonProps {
    text:String,
    st?: number;
}

const Button = ({text,st}:ButtonProps) => {
  return (
    <div>
      {text},{st}
    </div>
  )
}

export default Button

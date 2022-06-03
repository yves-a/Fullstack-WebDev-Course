import React from 'react'

const Notify = (props) => {
  console.log(props.errorMessage)
  return (
    props.errorMessage && (
      <div style={{ color: 'red' }}>{props.errorMessage}</div>
    )
  )
}

export default Notify

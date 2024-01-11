import React, { useState } from 'react'
import RespawnTimer from './timers/RespawnTimer.jsx'
import VariableTimer from './timers/VariableTimer.jsx'

export const formatTime = (time) => {
  const seconds = Math.floor((time / 1000) % 60)
  const minutes = Math.floor((time / (1000 * 60)) % 60)
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)

  return (
    <>
      {`${hours.toString().padStart(2, '0')}:${
        minutes < 10 ? '0' : ''
      }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
    </>
  )
}

export const getTime = (date) => {
  return new Date(date).getTime()
}

const RemainingTime = ({ respawnTime, variableTime, id, setCardState }) => {
  const [mountRespawnTimer, setMountRespawnTimer] = useState(true)
  const [mountVariableTimer, setMountVariableTimer] = useState(false)

  const renderTimers = () => {
    setMountRespawnTimer(false)
    setMountVariableTimer(true)
    setCardState('variable')
  }

  return (
    <>
      <span style={{ ...styles, color: '#bbbbbb' }}>
        {mountRespawnTimer && (
          <RespawnTimer
            respawnTime={respawnTime}
            renderCallback={renderTimers}
          />
        )}
        {mountVariableTimer && (
          <VariableTimer
            variableTime={variableTime}
            id={id}
            setCardState={setCardState}
          />
        )}
      </span>
    </>
  )
}

export default RemainingTime

const styles = {
  textAlign: 'center',
  fontFamily: 'Roboto Flex',
  fontSize: '44px',
  fontWeight: 700,
  lineHeight: '36px',
  letterSpacing: '2.2px',
  margin: '25px 0 29px 0',
  userSelect: 'none',
  transition: 'color 1s'
}

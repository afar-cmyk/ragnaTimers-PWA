import React, { useState, useEffect } from 'react'
import { differenceInMilliseconds, minutesToMilliseconds } from 'date-fns'

export const ProgressBar = (props) => {
  const { remainingSeconds, selectedRespawn, mvpRespawn, cardState } = props
  
  const [currentSeconds, setCurrentSeconds] = useState(remainingSeconds)
  const [percent, setPercent] = useState(remainingSeconds)

  const currentDate = new Date()
  const selectedDate = new Date(selectedRespawn)
  const computeRespawn = minutesToMilliseconds(mvpRespawn)

  const difference = differenceInMilliseconds(selectedDate, currentDate)
  const percentage = Math.floor((difference / computeRespawn) * 100)

  useEffect(() => {
    setCurrentSeconds(remainingSeconds)
    setPercent(percentage)
  }, [remainingSeconds, percentage])

  const progressBar = {
    height: '11px',
    width: '100%',
    backgroundColor: colorState[cardState],
    borderRadius: '0px 0px 2px 2px',
    alignSelf: 'flex-end',
    display: 'flex',
    transition: 'background-color 1s'
  }

  return (
    <span style={progressBar}>
      <span style={progressBarFill(percent, currentSeconds)} />
    </span>
  )
}

const colorState = {
  respawn: '#EEEEEE66',
  variable: '#ef8fa55c',
  disabled: '#555555ad'
}

const progressBarFill = (percent, currentSeconds) => ({
  height: '100%',
  width: `${percent}%`,
  backgroundColor: '#2BB65280',
  borderRadius: '0px 0px 0px 3px',
  animation: `fillAnimation ${currentSeconds}s linear forwards`
})

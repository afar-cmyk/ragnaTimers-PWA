import React, { useState, useEffect } from 'react'
import { TimerRenderer, useTimer } from 'react-use-precision-timer'
import { removeTiming } from '../../../database/dbService.js'
import { getTime, formatTime } from '../../cards/RemainingTime.jsx'

const VariableTimer = ({ variableTime, id, setCardState }) => {
  const [currentColor, setCurrentColor] = useState('#c56d82')
  const callback = React.useCallback(() => {}, [])
  const timer = useTimer({ delay: 10, runOnce: true }, callback)

  useEffect(() => {
    timer.start(getTime(variableTime))
  }, [])

  useEffect(() => {
    const check = () => {
      if (timer.getRemainingTime() == 0) {
        setCurrentColor('#666666')
        setCardState('disabled')
        setTimeout(() => {
          removeTiming(id)
        }, 5000)
      }
    }

    const intervalId = setInterval(check, 10)
    return () => clearInterval(intervalId)
  }, [timer, currentColor])

  return (
    <span style={{ color: currentColor }}>
      <TimerRenderer
        timer={timer}
        render={(t) => <>{formatTime(t.getRemainingTime())}</>}
        renderRate={10}
      />
    </span>
  )
}

export default VariableTimer

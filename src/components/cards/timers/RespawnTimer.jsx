import React, { useEffect } from 'react'
import { TimerRenderer, useTimer } from 'react-use-precision-timer'
import { getTime, formatTime } from '../../cards/RemainingTime.jsx'

const RespawnTimer = ({ respawnTime, renderCallback }) => {
  const callback = React.useCallback(() => renderCallback(), [])
  const timer = useTimer({ delay: 10, runOnce: true }, callback)

  useEffect(() => {
    timer.start(getTime(respawnTime))
  }, [])

  useEffect(() => {
    const check = () => {
      if (timer.getRemainingTime() == 0) {
        renderCallback()
      }
    }

    const intervalId = setInterval(check, 10)
    return () => clearInterval(intervalId)
  }, [timer])

  return (
    <TimerRenderer
      timer={timer}
      render={(t) => <>{formatTime(t.getRemainingTime())}</>}
      renderRate={10}
    />
  )
}

export default RespawnTimer

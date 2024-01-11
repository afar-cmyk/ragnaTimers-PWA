import React, { useState } from 'react'
import { ProgressBar } from './ProgressBar.jsx'
import RemainingTime from './RemainingTime.jsx'
import { differenceInSeconds, addMinutes } from 'date-fns'
import { CardFooter } from './CardFooter.jsx'
import DataSource from '../../database/DataSource.js'
import CardBackground from './CardBackground.jsx'
import Overlay from './Overlay.jsx'

export const Card = (props) => {
  const [cardState, setCardState] = useState('respawn')
  const [overlayState, setOverlayState] = useState(false)

  let { dataId, mvpName, mapName, selectedDate } = props

  let mvpData = DataSource[mvpName]
  let formattedDate = new Date(selectedDate)

  let respawn = mvpData.maps[mapName].respawn[0]
  let variable = mvpData.maps[mapName].respawn[1]

  let respawnTime = addMinutes(formattedDate, respawn)
  let variableTime = addMinutes(formattedDate, variable)

  let respawnTimeLeft = differenceInSeconds(respawnTime, Date.now())
  let variableTimeLeft = differenceInSeconds(variableTime, respawnTime)

  return (
    <div
      style={mainContainer}
      onMouseEnter={() => setOverlayState(true)}
      onMouseLeave={() => setOverlayState(false)}
    >
      <Overlay
        overlayState={overlayState}
        setOverlayState={setOverlayState}
        id={dataId}
      />
      <CardBackground mvpName={mvpName} cardState={cardState} />
      <div style={content}>
        <div style={cardHeader}>
          <span style={headerTitile}>{mvpData['fullName']}</span>
          <span style={headerSubtitile}>{mapName}</span>
        </div>

        <RemainingTime
          id={dataId}
          respawnTime={respawnTime}
          variableTime={variableTime}
          cardState={cardState}
          setCardState={setCardState}
        />

        <CardFooter
          selectedDate={formattedDate}
          respawn={respawn}
          variable={variable}
        />

        <ProgressBar
          remainingSeconds={respawnTimeLeft}
          selectedRespawn={respawnTime}
          mvpRespawn={respawn}
          cardState={cardState}
        />
      </div>
    </div>
  )
}

const mainContainer = {
  position: 'relative',
  width: '218px',
  height: '179px',
  borderRadius: '3px',
  display: 'flex',
  overflow: 'hidden'
}

const content = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: '#090706d9'
}

const cardHeader = {
  margin: '8px 8px 0px 8px',
  display: 'flex',
  flexDirection: 'column'
}

const headerTitile = {
  color: '#bbbbbb',
  fontFamily: 'Roboto Flex',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 900,
  lineHeight: 'normal'
}

const headerSubtitile = {
  color: '#999999',
  fontFamily: 'Roboto Flex',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal'
}

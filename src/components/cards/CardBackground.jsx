import React from 'react'
import DataSource from '../../database/DataSource.js'

const CardBackground = ({ mvpName, cardState }) => {
  let mvpImage = `/assets/images/mvps/${mvpName}.png`

  const backgroundImage = {
    backgroundImage: `url(${mvpImage})`,
    backgroundPosition: DataSource[mvpName].settings.card.position,
    backgroundSize: DataSource[mvpName].settings.card.size,
    width: '100%',
    height: '100%',
    filter: colorState.filter[cardState],
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
    borderRadius: '3px',
    transition: 'filter 1s'
  }

  const backgroundBorder = {
    position: 'absolute',
    width: '99%',
    height: '99%',
    borderRadius: '3px',
    border: `1px solid ${colorState.border[cardState]}`,
    transition: 'border 1s'
  }

  return (
    <>
      <div style={backgroundBorder} />
      <div style={backgroundImage} />
    </>
  )
}

export default CardBackground

const colorState = {
  border: {
    respawn: '#ffffffe6',
    variable: '#ff86be',
    disabled: '#555555ad'
  },
  filter: {
    respawn: 'saturate(0)',
    variable: 'grayscale(0.5)',
    disabled: 'saturate(0)'
  }
}

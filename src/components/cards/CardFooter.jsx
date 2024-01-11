import React from 'react'
import { addMinutes, format } from 'date-fns'

export const CardFooter = ({ selectedDate, respawn, variable }) => {
  let respawnDate = formatDate(addMinutes(selectedDate, respawn))
  let variableDate = formatDate(addMinutes(selectedDate, variable))

  function formatDate(date) {
    return format(date, 'hh:mm a')
  }

  return (
    <div style={cardFooter}>
      <span style={footerTitle}>Respawn variable:</span>
      <span style={footerContent}>
        de <p style={respawnStyle}>{respawnDate}</p> a{' '}
        <p style={variableStyle}>{variableDate}</p>
      </span>
    </div>
  )
}

const cardFooter = {
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  margin: '0px 8px 8px 8px'
}

const footerTitle = {
  color: '#999999',
  fontFamily: 'Roboto Flex',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '12px',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textRendering: 'optimizeLegibility'
}

const footerContent = {
  color: '#999999',
  fontFamily: 'Roboto Flex',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '14px',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textRendering: 'optimizeLegibility',
  display: 'flex',
  flexDirection: 'row'
}

const footerTimes = {
  color: '#bbbbbb',
  fontFamily: 'Roboto Flex',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 900,
  margin: '0px',
  padding: '0px'
}

const respawnStyle = {
  ...footerTimes,
  marginLeft: '6px',
  marginRight: '6px'
}

const variableStyle = {
  ...footerTimes,
  marginLeft: '6px'
}

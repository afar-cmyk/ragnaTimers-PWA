import React, { useState } from 'react'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Snackbar from '@mui/joy/Snackbar'
import lodash, { toInteger } from 'lodash'
import { subDays, isBefore } from 'date-fns'
import ThumbnailsContainer from './thumbnails/ThumbnailsContainer.jsx'
import DataSource from '../database/DataSource.js'
import { addData } from '../database/dbService.js'

const NewMvpForm = () => {
  const [filteredDataSource] = useState(
    lodash.omit(DataSource, 'default', 'debug')
  )
  const [mvp, setMvp] = useState('')
  const [map, setMap] = useState('')
  const [temporal, setTemporal] = useState(true)
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [timePeriod, setTimePeriod] = useState('')
  const [open, setOpen] = useState(false)
  const [snackStatus, setSnackStatus] = useState('')

  let selectedDate = formatDate(hours, minutes, timePeriod, temporal)

  const validateHours = (event) => {
    let value = parseInt(event.target.value, 10)
    if (event.target.value == '') {
      value = ''
      setHours(value)
    } else {
      value = Math.min(12, Math.max(1, value))
      setHours(value.toString())
    }
  }

  const formatHours = () => {
    let adjustedValue
    let formattedHours
    if (hours == '') {
      formattedHours = hours
      setHours(formattedHours)
    } else {
      adjustedValue = Math.min(12, Math.max(0, parseInt(hours, 10)))
      formattedHours =
        adjustedValue <= 9 ? `0${adjustedValue}` : adjustedValue.toString()
      setHours(formattedHours)
    }
  }

  const validateMinutes = (event) => {
    let value = parseInt(event.target.value, 10)
    if (event.target.value == '') {
      value = ''
      setMinutes(value)
    } else {
      value = Math.min(59, Math.max(0, value))
      setMinutes(value.toString())
    }
  }

  const formatMinutes = () => {
    let adjustedValue
    let formattedMinutes
    if (minutes == '') {
      formattedMinutes = minutes
      setMinutes(formattedMinutes)
    } else {
      adjustedValue = Math.min(59, Math.max(0, parseInt(minutes, 10)))
      formattedMinutes =
        adjustedValue <= 9 ? `0${adjustedValue}` : adjustedValue.toString()
      setMinutes(formattedMinutes)
    }
  }

  const setCurrentTime = () => {
    const currentTime = new Date()

    const hours = currentTime.getHours()
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0')

    const minutes = currentTime.getMinutes()
    const formattedMinutes = minutes.toString().padStart(2, '0')

    const period = hours >= 12 ? 'PM' : 'AM'

    setHours(formattedHours)
    setMinutes(formattedMinutes)
    setTimePeriod(period)
    setTemporal(true)
  }

  const formatData = () => {
    const formValues = {
      mvpName: mvp,
      mapName: map,
      selectedDate: selectedDate
    }
    return formValues
  }

  function formatDate(hours, minutes, period, temporal) {
    hours = toInteger(hours) + (period === 'PM' && hours < 12 ? 12 : 0)
    const today = new Date()
    const yesterday = subDays(today, 1)
    const date = temporal ? today : yesterday
    date.setHours(toInteger(hours))
    date.setMinutes(toInteger(minutes))
    date.setSeconds(0)
    return date
  }

  const handleOnSubmit = (e) => {
    let interrupted = isBefore(selectedDate, Date.now())

    if (!interrupted) {
      e.preventDefault()
      setSnackStatus('error')
      setOpen(true)
    } else {
      e.preventDefault()
      setSnackStatus('success')
      setOpen(true)
      addData(mvp, map, selectedDate, 'true')
    }
  }

  return (
    <>
      <div className='newMvp_container'>
        <form
          id='my-form'
          style={{ display: 'flex', flexDirection: 'column', rowGap: '24px' }}
          onSubmit={handleOnSubmit}
        >
          <span className='newMvp_span_mvps'>
            <Select
              variant='plain'
              placeholder='Seleccionar MVP'
              sx={[selectStyles, Boolean(mvp) ? selectedStyles : {}]}
              onChange={(event, value) => {
                setMvp(value)
              }}
              required
            >
              {Object.keys(filteredDataSource).map((key) => {
                return (
                  <Option
                    key={key}
                    value={key}
                    sx={optionsStyles}
                    onMouseOver={() => {
                      setMvp(key)
                    }}
                  >
                    {filteredDataSource[key]['fullName']}
                  </Option>
                )
              })}
            </Select>

            <Select
              disabled={mvp == ''}
              variant='plain'
              placeholder='Seleccionar Mapa'
              sx={[selectStyles, Boolean(map) ? selectedStyles : {}]}
              onChange={(event, value) => {
                setMap(value)
              }}
              value={map}
              required
            >
              {mvp == '' ? (
                <Option value='default' sx={optionsStyles}>
                  default
                </Option>
              ) : (
                Object.keys(filteredDataSource[mvp]['maps']).map((key) => {
                  return (
                    <Option
                      key={key}
                      value={key}
                      sx={optionsStyles}
                      onMouseOver={() => {
                        setMap(key)
                      }}
                    >
                      {key}
                    </Option>
                  )
                })
              )}
            </Select>
          </span>

          <span className='newMvp_span_hora'>
            <button
              type='button'
              className='current_date_btn'
              onClick={setCurrentTime}
            />

            <Select
              name='temporal'
              variant='plain'
              placeholder='Fecha'
              sx={[
                ...temporalStyles,
                Boolean(temporal) ? selectedPeriodStyles : {}
              ]}
              onChange={(event, value) => {
                setTemporal(value)
              }}
              value={temporal}
              required
            >
              <Option value={true} sx={optionsStyles}>
                Hoy
              </Option>
              <Option value={false} sx={optionsStyles}>
                Ayer
              </Option>
            </Select>

            <input
              type='number'
              name='hora'
              id='hora_input'
              placeholder='HH'
              min='1'
              max='12'
              onChange={validateHours}
              onBlur={formatHours}
              value={hours}
              required
            />

            <span
              style={{
                color: '#ABABAB',
                fontSize: 28,
                lineHeight: 0,
                margin: '0px 6px 2px 6px'
              }}
            >
              :
            </span>

            <input
              type='number'
              name='minutos'
              id='minutos_input'
              placeholder='MM'
              min='0'
              max='59'
              onChange={validateMinutes}
              onBlur={formatMinutes}
              value={minutes}
              required
            />

            <Select
              name='timePeriod'
              variant='plain'
              placeholder='AM / PM'
              sx={[
                ...periodStyles,
                Boolean(timePeriod) ? selectedPeriodStyles : {}
              ]}
              onChange={(event, value) => {
                setTimePeriod(value)
              }}
              value={timePeriod}
              required
            >
              <Option value='AM' sx={optionsStyles}>
                AM
              </Option>
              <Option value='PM' sx={optionsStyles}>
                PM
              </Option>
            </Select>
          </span>
        </form>
        <ThumbnailsContainer mvpName={mvp} mapName={map} />
      </div>
      <Snackbar
        autoHideDuration={snackbarOptions.duration[snackStatus]}
        open={open}
        color={snackbarOptions.color[snackStatus]}
        variant='solid'
        size={snackbarOptions.size[snackStatus]}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return
          }
          setOpen(false)
        }}
      >
        {snackbarOptions.text[snackStatus]}
      </Snackbar>
    </>
  )
}

export default NewMvpForm

const snackbarOptions = {
  duration: {
    error: 14000,
    success: 4000
  },
  text: {
    error: 'La hora elegida no puede ser posterior a la fecha y hora actuales.',
    success: 'MVP creado con exito.'
  },
  color: {
    error: 'danger',
    success: 'success'
  },
  size: {
    error: 'md',
    success: 'sm'
  }
}

const selectStyles = {
  width: '100%',
  borderRadius: 3,
  maxHeight: 30,
  minHeight: 30,
  color: '#666666',
  backgroundColor: '#EEEEEE14',
  fontFamily: 'Roboto Flex',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: '700 !important',
  lineHeight: 'normal',
  boxSizing: 'border-box',
  transition: 'border 0.3s',
  border: '1px solid #1d1d1d',
  outline: 'none',
  ':hover': {
    backgroundColor: '#EEEEEE14',
    border: '1px solid #ededed26',
    color: '#ABABAB'
  },
  ':focus-visible': {
    outline: 'none',
    border: '1px solid #ABABAB !important',
    color: '#ABABAB'
  }
}

const selectedStyles = {
  backgroundColor: '#EEEEEE14',
  border: '1px solid #ededed26',
  color: '#ABABAB'
}

const optionsStyles = {
  border: '1px solid #1E1E1E',
  backgroundColor: '#1E1E1E !important',
  fontFamily: 'Roboto Flex',
  fontWeight: 400,
  color: '#ABABAB',
  fontSize: 14,
  ':hover': {
    border: '1px solid #ededed26',
    color: '#ABABAB !important',
    fontWeight: 500
  }
}

const periodStyles = [selectStyles, { width: 105, marginLeft: '16px' }]

const selectedPeriodStyles = {
  backgroundColor: '#EEEEEE14',
  border: '1px solid #ededed26',
  color: '#ABABAB'
}

const temporalStyles = [selectStyles, { width: 90, marginRight: '16px' }]

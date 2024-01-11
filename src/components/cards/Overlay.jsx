import React, { useState } from 'react'
import { removeTiming, deleteData } from '../../database/dbService.js'
import { IconContext } from 'react-icons'
import { TbTrashFilled, TbCheck } from 'react-icons/tb'

const Overlay = (props) => {
  const { overlayState, setOverlayState, id } = props

  const [deleteButton, setDeleteButton] = useState(false)
  const [finishButton, setFinishButton] = useState(false)
  const [borderColor, setBorderColor] = useState('default')
  const [isPressed, setIsPressed] = useState(false)
  const [deletePressed, setDeletePressed] = useState(false)
  const [finishPressed, setFinishPressed] = useState(false)

  const handleState = () => {
    setDeleteButton(!deleteButton)
    setFinishButton(!finishButton)
  }

  const resetBorderColor = () => {
    if (!isPressed) {
      setBorderColor('default')
    }
  }

  const overlay = {
    position: 'absolute',
    display: overlayState ? 'flex' : 'none',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '99%',
    width: '99%',
    borderRadius: '3px',
    backgroundColor: `#000000e3`,
    zIndex: 2,
    border: `1px solid ${border[borderColor]}`,
    gap: '16px',
    transition: 'border 0.35s'
  }

  const handleDelete = () => {
    setIsPressed(true)
    setDeletePressed(true)
    handleState()
    setTimeout(() => {
      deleteData(id)
    }, 1000),
      setBorderColor('delete'),
      () => setOverlayState(!overlayState)
  }

  const handleFinish = () => {
    setIsPressed(true)
    setFinishPressed(true)
    handleState()
    setBorderColor('finish')
    setTimeout(() => {
      setBorderColor('default')
      removeTiming(id)
    }, 1000),
      () => setOverlayState(!overlayState)
  }

  return (
    <div style={overlay}>
      <IconContext.Provider value={{ size: 25, className: 'trash-icon' }}>
        <button
          onClick={handleDelete}
          className='overlayButtons deleteButton'
          disabled={deleteButton}
          onMouseOver={() => setBorderColor('delete')}
          onMouseLeave={resetBorderColor}
          style={!deletePressed ? null : { backgroundColor: '#750c3c' }}
        >
          <TbTrashFilled color={!deletePressed ? null : '#999999'} />
        </button>
      </IconContext.Provider>

      <IconContext.Provider value={{ size: 30, className: 'check-icon' }}>
        <button
          onClick={handleFinish}
          className='overlayButtons finishButton'
          disabled={finishButton}
          onMouseOver={() => setBorderColor('finish')}
          onMouseLeave={resetBorderColor}
          style={!finishPressed ? null : { backgroundColor: '#0c754e' }}
        >
          <TbCheck color={!finishPressed ? null : '#999999'} />
        </button>
      </IconContext.Provider>
    </div>
  )
}

export default Overlay

const border = {
  default: '#ffffff4d',
  delete: '#ff86be4d',
  finish: '#86ffb14d'
}

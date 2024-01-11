import NewMvpForm from './NewMvpForm.jsx'

const FormContainer = () => {
  return (
    <div style={mainContainer}>
      <div style={buttonsContainer}>
        <button
          type='button'
          className='formButtons cancelButton'
          onClick={() => console.log('Cancel callback')}
        >
          Cancelar
        </button>

        <button
          form='my-form'
          type='submit'
          className='formButtons newMvpButton'
        >
          Agregar MVP
        </button>
      </div>

      <NewMvpForm />
    </div>
  )
}

export default FormContainer

const mainContainer = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '38px'
}

const buttonsContainer = {
  display: 'flex',
  flexDirection: 'column',
  columnGap: '16px',
  // gap: '8px'
  gap: '16px'
}

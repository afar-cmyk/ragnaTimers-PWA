import { useState } from 'preact/hooks'
import './app.css'
import FormContainer from './components/FormContainer.jsx'
import CardsContainer from './components/CardsContainer.jsx'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <FormContainer />
        <CardsContainer />
      </main>
    </>
  )
}

// Poner un Readme
// Poner algo que redireccione al repositorio principal
// Poner un footer o una seccion de creditos que no estorbe a la app
// Versionar los cambios

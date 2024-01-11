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

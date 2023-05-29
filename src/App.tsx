
import { useEffect, useReducer, useState } from 'react'
import './App.css'

function App() {

  const getRandomNumberFromApi = async (): Promise<number> => {
    const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new')

    const numberString = await res.text()

    // Si no podemos conectar, lanzamos un error
    // throw new Error('Ha pasado algo...')
    return parseInt(numberString)
  }

  const [number, setNumber] = useState<number>()
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [error, setError] = useState<string>()
  const [key, forceRefetch] = useReducer((x) => x + 1, 0)


  useEffect(() => {
    setIsLoading(true)
    getRandomNumberFromApi()
      .then(setNumber)
      .catch(setError)
  }, [key])

  useEffect(() => {
    if (number) {
      setIsLoading(false)
    }
  }, [number])

  useEffect(() => {
    // Si hay un error
    if (error) {
      setIsLoading(false)
    }
  }, [error])



  return (
    <div className="App App-header">
      {
        isLoading ?
          <h2>Cargando...</h2> :
          <h2>Número aleatorio: {number}</h2>
        // Si no está cargando y hay un error

      }

      {
        // Si hay un error y no está cargando
        error && !isLoading &&
        <h2>{error}</h2>
      }
      <button disabled={isLoading}
        onClick={forceRefetch}
      >
        {
          isLoading ?
            '...' :
            'Nuevo número'
        }
      </button>

    </div>
  )
}

export default App

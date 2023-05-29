
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const getRandomNumberFromApi = async (): Promise<number> => {
    const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new')

    const numberString = await res.text()
    return parseInt(numberString)
  }

  const [number, setNumber] = useState<number>()

  useEffect(() => {
    getRandomNumberFromApi().then(num => setNumber(num))
  }, [])

  return (
    <div className="App App-header">
      <h2>Número aleatorio: {number}</h2>
    </div>
  )
}

export default App

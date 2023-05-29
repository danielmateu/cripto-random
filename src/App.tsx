import { useQuery } from '@tanstack/react-query'
import './App.css'

const getRandomNumberFromApi = async (): Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new')
  const numberString = await res.text()
  if (!res.ok) {
    throw new Error('Ha pasado algo...')
  }

  return parseInt(numberString)
}

function App() {

  const query = useQuery(
    ['randomNumber'],
    getRandomNumberFromApi,
  )

  return (
    <div className="App App-header">
      {
        query.isFetching ? <h2>Cargando...</h2> : <h2>Número aleatorio: {query.data}</h2>
      }

      {
        !query.isLoading && query.isError && <h2>{`${query.error}`}</h2>
      }
      <button
        onClick={() => query.refetch()}
        disabled={query.isFetching}
      >
        {
          query.isFetching ? '...' : 'Nuevo número'
        }
      </button>

    </div>
  )
}

export default App

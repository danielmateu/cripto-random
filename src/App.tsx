import { useQuery } from '@tanstack/react-query'
import './App.css'
import { useRandom } from './hooks/useRandom'



function App() {

  const { data, isLoading, isError, error, isFetching, refetch } = useRandom()

  return (
    <div className="App App-header">
      {
        isFetching ? <h2>Cargando...</h2> : <h2>Número aleatorio: {data}</h2>
      }

      {
        !isLoading && isError && <h2>{`${error}`}</h2>
      }
      <button
        onClick={() => refetch()}
        disabled={isFetching}
      >
        {
          isFetching ? '...' : 'Nuevo número'
        }
      </button>

    </div>
  )
}

export default App

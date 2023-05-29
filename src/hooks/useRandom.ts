import { useQuery } from '@tanstack/react-query';


export const useRandom = () => {

    const getRandomNumberFromApi = async (): Promise<number> => {
        const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new')
        const numberString = await res.text()
        if (!res.ok) {
            throw new Error('Ha pasado algo...')
        }

        return parseInt(numberString)
    }
    const query = useQuery(
        ['randomNumber'],
        getRandomNumberFromApi,
        // {
        //   staleTime: 5000,
        //   retry: 3,
        //   retryDelay: 1000,
        //   cacheTime: 10000,
        // }
    )
    return {
        ...query,
        randomNumber: query.data,
    }
}

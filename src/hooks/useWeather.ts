import { useState } from 'react'

export interface WeatherState<T> {
  data: T | null
  loading: boolean
  error: Error | null
  setData: (data: T | null) => void
  setError: (error: Error | null) => void
}

/** State foundation for a future weather provider; intentionally performs no requests. */
export function useWeather<T = unknown>(): WeatherState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  return { data, loading, error, setData, setError }
}

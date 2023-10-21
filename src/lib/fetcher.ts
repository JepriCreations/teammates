import axios, { AxiosRequestConfig } from 'axios'

import { RequestError } from '@/lib/errors'

type FetcherResponse<T> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: RequestError }

type FetcherOptions = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD'
  options?: AxiosRequestConfig & {
    next: { tags?: string[]; revalidate?: false | 0 | number }
  }
  data?: any
  body?: any
}

type UnMethodOptions = Omit<FetcherOptions, 'method'>

const request = async <T = any>({
  url,
  method = 'GET',
  options,
  data,
  body,
}: FetcherOptions): Promise<
  { data: T; error?: undefined } | { data?: undefined; error: RequestError }
> => {
  try {
    const axiosConfig: AxiosRequestConfig = {
      ...options,
      method,
      url,
    }

    if (data) {
      const formData = new FormData()

      for (const [key, value] of Object.entries(data as Record<string, any>)) {
        if (value instanceof File) {
          formData.append(key, value)
        } else if (Array.isArray(value) || typeof value === 'object') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value)
        }
      }

      axiosConfig.data = formData
    }

    if (body && !data) {
      axiosConfig.data = body
    }

    const response = await axios(axiosConfig)

    return { data: response.data }
  } catch (error: any) {
    const errorData = error.response?.data
    return { error: errorData }
  }
}

const fetchWithMethod = async <T = any>(
  method: FetcherOptions['method'],
  options: UnMethodOptions
): Promise<FetcherResponse<T>> => {
  return fetcher.request({ method, ...options })
}

export const fetcher = {
  get: <T = any>(options: UnMethodOptions): Promise<FetcherResponse<T>> =>
    fetchWithMethod('GET', options),
  post: <T = any>(options: UnMethodOptions): Promise<FetcherResponse<T>> =>
    fetchWithMethod('POST', options),
  put: <T = any>(options: UnMethodOptions): Promise<FetcherResponse<T>> =>
    fetchWithMethod('PUT', options),
  patch: <T = any>(options: UnMethodOptions): Promise<FetcherResponse<T>> =>
    fetchWithMethod('PATCH', options),
  delete: <T = any>(options: UnMethodOptions): Promise<FetcherResponse<T>> =>
    fetchWithMethod('DELETE', options),
  head: <T = any>(options: UnMethodOptions): Promise<FetcherResponse<T>> =>
    fetchWithMethod('HEAD', options),
  request,
}

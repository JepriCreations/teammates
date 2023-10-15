import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import { RequestError } from '@/lib/errors'

export const fetcher = async <T = any>({
  url,
  method = 'GET',
  options,
  data,
  body,
}: {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD'
  options?: AxiosRequestConfig & {
    next: { tags?: string[]; revalidate?: false | 0 | number }
  }
  data?: any
  body?: any
}): Promise<
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

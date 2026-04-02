export interface NewsArticle {
  title: string
  source: {
    name: string
  }
  url: string
  publishedAt: string
}

export interface NewsAPIResponse {
  status: string
  articles: NewsArticle[]
}

export interface ApiSuccess<T> {
  data: T
  error: null
}

export interface ApiError {
  data: null
  error: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError
export class RequestError extends Error {
  public status?: number
  public form?: { [x: string]: any }

  constructor({
    message,
    status = 500,
    form = null,
  }: {
    message: string
    status?: number
    form?: any
  }) {
    super(message)
    this.status = status
    this.form = form
    this.name = 'RequestError'
  }
}

export class PostgressError extends Error {
  public details?: string
  public hint?: string
  public code?: string
  protected __PostgressError = true

  constructor(
    message: string,
    {
      details = '',
      hint = '',
      code = '',
    }: {
      details?: string
      hint?: string
      code?: string
    } = {}
  ) {
    super(message)
    this.details = details
    this.hint = hint
    this.code = code
    this.name = 'PostgressError'
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      details: this.details,
      hint: this.hint,
      code: this.code,
    }
  }
}

export function isPostgressError(error: unknown): error is PostgressError {
  return (
    typeof error === 'object' && error !== null && '__PostgressError' in error
  )
}

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

export class PostgresError extends Error {
  public details?: string
  public hint?: string
  public code?: string
  protected __PostgresError = true

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
    this.name = 'PostgresError'
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

export function isPostgresError(error: unknown): error is PostgresError {
  return (
    typeof error === 'object' && error !== null && '__PostgresError' in error
  )
}

export const ERROR_CODES = {
  UNAUTHENTICATED: 'unauthenticated',
  DUPLICATE_NAME: 'duplicate_name',
  DUPLICATE_APPLICATION: 'duplicate_application',
}

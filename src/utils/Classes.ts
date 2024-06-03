import { z, ZodIssueOptionalMessage } from 'zod'

export class FormResolver {
  static resolve(issue: ZodIssueOptionalMessage) {
    const { code } = issue

    switch (code) {
      case 'invalid_type':
        return {
          message: 'O campo deve ser preenchido',
        }
      case 'too_small': {
        if (issue.minimum !== 1) {
          return {
            message: `Esse campo é muito pequeno (o mínimo é ${issue.minimum} caracteres)`,
          }
        }

        return {
          message: 'O campo deve ser preenchido',
        }
      }
      case 'too_big': {
        return {
          message: `Esse campo é muito grande (o máximo é ${issue.maximum} caracteres)`,
        }
      }
      case 'invalid_string': {
        const isEmail = issue.validation === 'email'
        return {
          message: isEmail ? 'E-mail inválido' : 'O campo deve ser preenchido',
        }
      }
      case 'custom':
        return {
          message: issue.message ?? '',
        }
      default:
        return {
          message: 'O campo deve ser preenchido',
        }
    }
  }
}

export class ZodSchemaValidations {
  static currency = z.string().transform((v) => {
    const value = v.replaceAll('.', '').replace(',', '.')
    return value ? Number(value) : 0
  })
}

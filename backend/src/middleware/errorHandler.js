import { isCelebrateError } from 'celebrate'
import { consola } from 'consola'

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, next) => {
  if (!res.errorLogged) {
    consola.error(`message : ${err.message} | error : ${err}`)
    res.errorLogged = true
  }
  if (isCelebrateError(err)) {
    for (const [, value] of err.details.entries()) {
      return res.status(422).json({ message: value.details[0].message })
    }
  }

  let message = err.message

  if (res.polyglot) message = res.polyglot.t(message)
  return res.status(err.status ?? 500).json({
    message
  })
}

import Joi from 'joi'

const keyToRule = {
  email: () => Joi.string().min(4).max(16).alphanum().required(),
  password: () =>
    Joi.string()
      .min(8)
      .max(32)
      .pattern(/^[a-zA-Z0-9.，。,.~/<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]+$/, 'alphaNumSymbol')
      .required(),
  MfACode: () =>
    Joi.string()
      .length(6)
      .pattern(/^[0-9]+$/, 'numbers')
      .required(),
}

export function validateFn(filedKey, value) {
  if (value.length === 0) return true

  const rule = keyToRule[filedKey]()
  try {
    const res = rule.validate(value)
    return !res.error
  } catch (e) {
    return false
  }
}

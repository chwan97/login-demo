import { makeAutoObservable } from 'mobx'

import { LOGIN_STEP } from 'app/constants'
import { setAuthToken } from 'app/utills/fetch'
import { loginByUserNameAndPassword, loginWithMFA } from 'app/api'
import { validateFn } from 'app/utills/validate'

class LoginStore {
  step = LOGIN_STEP.STEP_1

  email = ''

  password = ''

  MfACode = ''

  hasLoginError = false

  hasMFAError = false

  validateState = {
    email: true,
    password: true,
    MfACode: true,
  }

  constructor() {
    makeAutoObservable(this)
  }

  login = async () => {
    this.validate('email', 'password')
    const { email: emailValidateState, password: ValidateState } = this.validateState
    if (!emailValidateState || !ValidateState) {
      return
    }
    const { success, data } = await loginByUserNameAndPassword({
      username: this.email,
      password: this.password,
    })

    if (success) {
      setAuthToken(data.token)
      this.step = LOGIN_STEP.STEP_2
    } else {
      this.hasLoginError = true
    }
  }

  verifyMFACode = async () => {
    this.validate('MfACode')
    const { MfACode: MfACodeValidateState } = this.validateState
    if (!MfACodeValidateState) {
      return
    }

    const { success, data } = await loginWithMFA({
      tfa: this.MfACode,
    })
    if (success) {
      window.location = 'https://www.lizhi.io'
    } else {
      this.hasMFAError = true
    }
  }

  validate = (...keys) => {
    for (const key of keys) {
      this.validateState[key] = validateFn(key, this[key])
    }
    this.validateState = {
      ...this.validateState,
    }
  }

  setPassword = event => {
    this.password = event.target.value
    this.hasLoginError = false
  }

  setEmail = event => {
    this.email = event.target.value
    this.hasLoginError = false
  }

  setMfACode = event => {
    this.MfACode = event.target.value
    this.hasMFAError = false
  }
}

export default LoginStore

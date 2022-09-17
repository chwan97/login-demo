import { makeAutoObservable } from 'mobx'
import Joi from 'joi'

import { LOGIN_STEP } from 'app/constants'
import { setAuthToken } from 'app/utills'
import { loginByUserNameAndPassword, loginWithMFA } from 'app/api'

class LoginStore {
  step = LOGIN_STEP.STEP_2

  email = ''

  password = ''

  constructor() {
    makeAutoObservable(this)
  }

  setName = event => {
    console.log(event)
    this.name = event.target.value
  }

  login = async () => {
    this.step = LOGIN_STEP.STEP_2
    return
    const { success, data } = await loginByUserNameAndPassword({
      username: 'user09',
      password: 'OpenSesame',
    })

    console.log(data)
    if (success) {
      setAuthToken(data.token)
      this.step = LOGIN_STEP.STEP_2
    }
  }

  loginMFA = async () => {
    return
    await loginWithMFA({
      tfa: '123456',
    })
  }

  validate = () => {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      birth_year3: Joi.string().alphanum().min(3).max(30).required(),
    })

    console.log(schema.validate({ username: 'bc', birth_year: 1994 }))
  }
}

export default LoginStore

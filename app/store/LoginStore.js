import { makeAutoObservable } from 'mobx'
import Joi from 'joi'

import { LOGIN_STEP } from 'app/constants'
import { setAuthToken } from 'app/utills'
import { loginByUserNameAndPassword, loginWithMFA } from 'app/api'

class LoginStore {
  step = LOGIN_STEP.STEP_1
  name = ''

  constructor() {
    makeAutoObservable(this)
  }

  setName = event => {
    console.log(event)
    this.name = event.target.value
  }

  login = async () => {
    const { success, data } = await loginByUserNameAndPassword({
      username: 'user09',
      password: 'OpenSesame',
    })

    console.log(data)
    if (success) {
      setAuthToken(data.token)
    }
  }

  loginMFA = async () => {
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

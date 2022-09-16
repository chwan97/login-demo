import { post } from 'app/utills'

async function loginByUserNameAndPassword(param) {
  return post('/api/demo/login.php?phase=1', param)
}

async function loginWithMFA(param) {
  return post('/api/demo/login.php?phase=2', param)
}

export { loginByUserNameAndPassword, loginWithMFA }

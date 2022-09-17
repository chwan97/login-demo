const { validateFn } = require('./validate')

test('email 格式测试', () => {
  expect(validateFn('email', 'wqeq21525')).toBeTruthy()
  expect(validateFn('email', 'wq')).toBeFalsy()
  expect(validateFn('email', '222222222v22222223')).toBeFalsy()
  expect(validateFn('email', '(24264)')).toBeFalsy()
  expect(validateFn('email', '{} s}')).toBeFalsy()
})

test('password 格式测试', () => {
  expect(validateFn('password', 'wqeq21525')).toBeTruthy()
  expect(validateFn('password', '&*%&@#~{}{|<>?:L')).toBeTruthy()
  expect(validateFn('password', 'wq')).toBeFalsy()
  expect(validateFn('password', 'wq22222222222222222222v2222222315')).toBeFalsy()
  expect(validateFn('password', '(24264)')).toBeFalsy()
})

test('MfACode 格式测试', () => {
  expect(validateFn('MfACode', '123123')).toBeTruthy()
  expect(validateFn('MfACode', '023123')).toBeTruthy()
  expect(validateFn('MfACode', '213')).toBeFalsy()
  expect(validateFn('MfACode', '213we')).toBeFalsy()
  expect(validateFn('MfACode', '(24264)')).toBeFalsy()
  expect(validateFn('MfACode', '{} s}')).toBeFalsy()
})

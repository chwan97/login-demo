import Head from 'next/head'
import Image from 'next/image'
import { observer, useLocalObservable } from 'mobx-react'
import classNames from 'classnames'

import LoginStore from 'app/store/LoginStore'
import Button from 'app/components/Button'
import Avatar from 'app/components/Avatar'
import Tooltips from 'app/components/Tooltips'
import { PasswordInput, EmailInput, MFAInput } from 'app/components/Input'
import iphone_tx from 'public/iphone_tx.png'
import iPhone_banner from 'public/iPhone_banner.png'
import favicon from 'public/favicon.ico'
import styles from 'app/styles/Login.module.css'
import { LOGIN_STEP } from '../app/constants'
import ErrorTips from '../app/components/ErrorTips'

function Index() {
  const loginStore = useLocalObservable(() => new LoginStore())
  const {
    step,
    email,
    password,
    MfACode,
    validateState,
    validate,
    login,
    verifyMFACode,
    setPassword,
    setEmail,
    setMfACode,
  } = loginStore
  const {
    email: emailValidateState,
    password: passwordValidateState,
    MfACode: MfACodeValidateState,
  } = validateState

  return (
    <div className={styles.container}>
      <Head>
        <title>登录</title>
        <link rel="icon" src={favicon} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.banner}>
          <Image src={iPhone_banner} />
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.brandName}>DIGITALYCHEE</div>
          <div
            className={classNames(styles.passwordForm, {
              [styles.hidden]: step !== LOGIN_STEP.STEP_1,
            })}
          >
            <div className={styles.field}>
              <EmailInput
                value={email}
                onChange={setEmail}
                onBlur={() => {
                  validate('email')
                }}
              />
              <ErrorTips text={'邮箱格式错误，请重新输入'} show={!emailValidateState} />
            </div>
            <div className={styles.field}>
              <PasswordInput
                value={password}
                onChange={setPassword}
                onBlur={() => {
                  validate('password')
                }}
              />
              <ErrorTips text={'密码格式错误，请重新输入'} show={!passwordValidateState} />
            </div>
            <div className={styles.field}>
              <Button text="下一步" onClick={login} />
            </div>
            <div className={styles.tips}>
              <Tooltips text="密码错误或邮箱与对应的密码不相符" />
            </div>
            <div className={styles.otherWayWrapper}>
              <div className={styles.otherWayBtn}>其他方式登录</div>
            </div>
          </div>
          <div
            className={classNames(styles.MFAForm, {
              [styles.hidden]: step !== LOGIN_STEP.STEP_2,
            })}
          >
            <div className={styles.avatarWrapper}>
              <Avatar url={iphone_tx} />
            </div>
            <div className={styles.field}>
              <MFAInput
                value={MfACode}
                onChange={setMfACode}
                onBlur={() => {
                  validate('MfACode')
                }}
              />
              <span clas></span>
              <ErrorTips text={'二步验证码格式错误，请重新输入'} show={!MfACodeValidateState} />
            </div>
            <div className={styles.field}>
              <Button text="确定" onClick={verifyMFACode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Index)

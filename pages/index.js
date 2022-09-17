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
import styles from 'app/styles/Login.module.css'
import { LOGIN_STEP } from '../app/constants'

function Index() {
  const loginStore = useLocalObservable(() => new LoginStore())
  const { step } = loginStore

  return (
    <div className={styles.container}>
      <Head>
        <title>登录</title>
        <link rel="icon" href="/public/favicon.ico" />
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
              <EmailInput text="密码错误或邮箱与对应的密码不相符" />
            </div>
            <div className={styles.field}>
              <PasswordInput text="密码错误或邮箱与对应的密码不相符" />
            </div>
            <div className={styles.field}>
              <Button text="下一步" onClick={() => {}} />
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
              <MFAInput text="密码错误或邮箱与对应的密码不相符" />
            </div>
            <div className={styles.field}>
              <Button text="确定" onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Index)

// <div>
// 账号：
//         <input type="text" value={loginStore.name} onChange={loginStore.setName} />
// </div>
// <div>
//   密码：
//   <input type="text" />
// </div>
// <button
//   onClick={() => {
//     console.log('loginStore.name', loginStore.name)
//     validate()
//   }}
// >
//   登录
// </button>
// <Button text="下一步" onClick={() => {}} />
// <Button
//   text="下一步4"
//   onClick={async () => {
//     await new Promise(resolve => {
//       window.setTimeout(() => {
//         resolve()
//       }, 300000)
//     })
//   }}
// />
// <Button text="测试2" disable onClick={() => {}} />
// <Button text="测试" onClick={loginStore.login} />
// <Button text="测试2" onClick={loginStore.loginMFA} />
// <Avatar url={iphone_tx} />
// <Tooltips text="密码错误或邮箱与对应的密码不相符" />
// <TextInput text="密码错误或邮箱与对应的密码不相符" />
// <TextInput text="密码错误或邮箱与对应的密码不相符" hasError />

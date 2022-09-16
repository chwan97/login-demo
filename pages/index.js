import Head from 'next/head'
import styles from 'app/styles/Login.module.css'
import LoginStore from 'app/store/LoginStore'
import { observer, useLocalObservable } from 'mobx-react'
import Button from 'app/components/Button'

function Index() {
  const loginStore = useLocalObservable(() => new LoginStore())
  return (
    <div className={styles.container}>
      <Head>
        <title>登录</title>
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <div>
        账号：
        <input type="text" value={loginStore.name} onChange={loginStore.setName} />
      </div>
      <div>
        密码：
        <input type="text" />
      </div>
      <button
        onClick={() => {
          console.log('loginStore.name', loginStore.name)
          validate()
        }}
      >
        登录
      </button>
      <Button text="测试" onClick={loginStore.login} />
      <Button text="测试2" onClick={loginStore.loginMFA} />
    </div>
  )
}

export default observer(Index)

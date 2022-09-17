import Image from 'next/image'
import classNames from 'classnames'
import { useState } from 'react'

import iphone_email from 'public/iphone_emall.png'
import iphone_password from 'public/iphone_password.png'
import styles from './styles.module.css'

function Input(props) {
  const { type, iconSrc, value, placeholderText, hasError, onBlur, onChange } = props
  const [focusing, setFocusing] = useState(false)

  return (
    <span
      className={classNames(styles.textInputWrapper, {
        [styles.focusing]: focusing,
        [styles.error]: hasError,
      })}
    >
      <span className={styles.icon}>
        <Image src={iconSrc} />
      </span>
      <input
        type={type}
        className={styles.textInput}
        value={value}
        onChange={onChange}
        onFocus={() => {
          setFocusing(true)
        }}
        onBlur={e => {
          setFocusing(false)
          onBlur && onBlur(e)
        }}
        placeholder={placeholderText}
      />
    </span>
  )
}

export function EmailInput(props) {
  return <Input type="text" iconSrc={iphone_email} placeholderText="请输入邮箱" {...props} />
}

export function PasswordInput(props) {
  return <Input type="password" iconSrc={iphone_password} placeholderText="请输入密码" {...props} />
}

export function MFAInput(props) {
  return (
    <Input
      type="text"
      iconSrc={iphone_password}
      placeholderText="请输入你的两步认证验证码"
      {...props}
    />
  )
}

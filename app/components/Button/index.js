import { useState } from 'react'
import classnames from 'classnames'
import styles from './styles.module.css'
import LoadingIcon from './LoadingIcon'

export default function Button(props) {
  const { disable = false, text, onClick } = props
  const [loading, setLoading] = useState(false)

  const handleClick = event => {
    if (disable || loading) return
    const ret = onClick(event)
    if (ret && ret.then) {
      setLoading(true)
      ret.finally(() => {
        setLoading(false)
      })
    }
  }

  return (
    <button
      className={classnames(styles.button, {
        [styles.disable]: disable,
        [styles.loading]: loading,
      })}
      disabled={disable}
      onClick={handleClick}
    >
      {loading && (
        <span className={styles.spin}>
          <LoadingIcon />
        </span>
      )}
      {text}
    </button>
  )
}

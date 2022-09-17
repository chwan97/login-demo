import classNames from 'classnames'
import styles from './styles.module.css'

export default function ErrorTips(props) {
  const { text, show } = props

  return (
    <div
      className={classNames(styles.errorTips, {
        [styles.show]: show,
      })}
    >
      {text}
    </div>
  )
}

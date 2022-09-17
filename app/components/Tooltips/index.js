import styles from './styles.module.css'

export default function Tooltips(props) {
  const { text } = props

  return <div className={styles.tooltips}>{text}</div>
}

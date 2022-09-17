import Image from 'next/image'
import styles from './styles.module.css'

export default function Avatar(props) {
  const { url } = props

  return (
    <div className={styles.avatar}>
      <Image src={url} />
    </div>
  )
}

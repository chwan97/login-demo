import { useState } from 'react'

export default function Button(props) {
  const { disable = false, text, onClick } = props
  const [loading, setLoading] = useState(false)

  const handleClick = event => {
    const ret = onClick(event)
    if (ret && ret.then) {
      setLoading(true)
      ret.finally(() => {
        setLoading(false)
      })
    }
  }

  return (
    <button disabled={disable} onClick={handleClick}>
      {loading && '加载中'}
      {text}
    </button>
  )
}

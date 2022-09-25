import { useEffect, useRef } from 'react'

const useEffectOnce = (effect) => {
  const effectFn = useRef(effect)
  const destroyFn = useRef()
  const effectCalled = useRef(false)
  const rendered = useRef(false)

  if (effectCalled.current) {
    rendered.current = true
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyFn.current = effectFn.current()
      effectCalled.current = true
    }
    return () => {
      if (rendered.current === false) return
      if (destroyFn.current) destroyFn.current()
    }
  }, [])
}
export default useEffectOnce

import {MutableRefObject, RefObject, useEffect, useRef} from 'react'

/**
 * @param callback IntersectionObserver のインスタンス生成時に渡すコールバック関数
 * @param options IntersectionObserver のインスタンス生成時に渡すオプション
 */
export const useIntersectionObserver = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): void => {
  useEffect(() => {
    const el = ref.current

    const observer = new IntersectionObserver(callback, options)

    if (el) {
      observer.observe(el)
    }

    return () => {
      const el = ref.current
      if (el) {
        observer.unobserve(el)
      }
    }
  })
}

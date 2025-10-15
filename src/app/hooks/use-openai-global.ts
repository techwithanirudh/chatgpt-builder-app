import { useSyncExternalStore } from 'react'
import {
  type OpenAIGlobals,
  SET_GLOBALS_EVENT_TYPE,
  type SetGlobalsEvent,
} from './types'

export function useOpenAIGlobal<K extends keyof OpenAIGlobals>(
  key: K
): OpenAIGlobals[K] | null {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === 'undefined') {
        return () => {}
      }

      const handleSetGlobal = (event: SetGlobalsEvent) => {
        const value = event.detail.globals[key]
        if (value === undefined) {
          return
        }

        onChange()
      }

      window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal, {
        passive: true,
      })

      return () => {
        window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal)
      }
    },
    () =>
      typeof window !== 'undefined' ? (window.openai?.[key] ?? null) : null,
    () => null
  )
}

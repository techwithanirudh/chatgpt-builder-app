import type { DisplayMode } from './types'
import { useOpenAIGlobal } from './use-openai-global'

export const useDisplayMode = (): DisplayMode | null =>
  useOpenAIGlobal('displayMode')

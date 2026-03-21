import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

export const highlighterPromise = createHighlighterCore({
  themes: [import('shiki/themes/github-dark-dimmed.mjs')],
  langs: [import('shiki/langs/typescript.mjs')],
  engine: createJavaScriptRegexEngine(),
})

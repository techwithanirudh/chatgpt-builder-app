'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useDisplayMode,
  useMaxHeight,
  useRequestDisplayMode,
  useWidgetProps,
} from './hooks'

export default function Home() {
  const toolOutput = useWidgetProps<{
    name?: string
    result?: { structuredContent?: { name?: string } }
  }>()
  const maxHeight = useMaxHeight() ?? undefined
  const displayMode = useDisplayMode()
  const requestDisplayMode = useRequestDisplayMode()

  const name = toolOutput?.result?.structuredContent?.name || toolOutput?.name

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20"
      style={{
        maxHeight,
        height: displayMode === 'fullscreen' ? maxHeight : undefined,
      }}
    >
      {displayMode !== 'fullscreen' && (
        <button
          aria-label="Enter fullscreen"
          className="fixed top-4 right-4 z-50 cursor-pointer rounded-full bg-white p-2.5 text-slate-700 shadow-lg ring-1 ring-slate-900/10 transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10 dark:hover:bg-slate-700"
          onClick={() => requestDisplayMode('fullscreen')}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <Image
          alt="Next.js logo"
          className="dark:invert"
          height={38}
          priority
          src="/next.svg"
          width={180}
        />
        <ol className="list-inside list-decimal text-center font-mono text-sm/6 sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Welcome to the ChatGPT Apps SDK Next.js Starter
          </li>
          <li className="mb-2 tracking-[-.01em]">
            Name returned from tool call: {name ?? '...'}
          </li>
          <li className="mb-2 tracking-[-.01em]">
            MCP server path:{' '}
            <Link className="underline" href="/mcp">
              /mcp
            </Link>
          </li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-transparent border-solid bg-foreground px-4 font-medium text-background text-sm transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
            href="/custom-page"
            prefetch={false}
          >
            Visit another page
          </Link>
          <a
            className="underline"
            href="https://vercel.com/templates/ai/chatgpt-app-with-next-js"
            rel="noopener noreferrer"
            target="_blank"
          >
            Deploy on Vercel
          </a>
        </div>
      </main>
    </div>
  )
}

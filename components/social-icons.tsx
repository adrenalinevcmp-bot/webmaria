import type { SVGProps } from 'react'

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  )
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M22 8.6a2.8 2.8 0 0 0-1.98-1.98C18.25 6.15 12 6.15 12 6.15s-6.25 0-8.02.47A2.8 2.8 0 0 0 2 8.6 29 29 0 0 0 1.55 12 29 29 0 0 0 2 15.4a2.8 2.8 0 0 0 1.98 1.98c1.77.47 8.02.47 8.02.47s6.25 0 8.02-.47A2.8 2.8 0 0 0 22 15.4 29 29 0 0 0 22.45 12 29 29 0 0 0 22 8.6Z" />
      <path d="m10 15 5-3-5-3v6Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

import { Fragment } from 'react'

export function RichText({ text, className }: { text?: string; className?: string }) {
  if (!text) return null
  const lines = text.split(/\n\n+/)
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <p key={index}>
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={i}>{part.slice(2, -2)}</strong>
            ) : (
              <Fragment key={i}>{part}</Fragment>
            ),
          )}
        </p>
      ))}
    </div>
  )
}

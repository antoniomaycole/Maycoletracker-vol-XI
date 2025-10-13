import React from 'react'
import { useNavigate } from 'react-router-dom'

type Industry = {
  id: string
  name: string
  icon?: string
  color?: string
  route?: string
}

export default function CpaAgent({
  industries,
  primaryCount = 4
}: {
  industries: Industry[]
  primaryCount?: number
}) {
  const navigate = useNavigate()

  const primary = industries.slice(0, primaryCount)
  const rest = industries.slice(primaryCount)

  return (
    <div className="cpa-agent">
      <div className="flex gap-3 justify-center mb-4 flex-wrap">
        {primary.map((it) => (
          <button
            key={it.id}
            onClick={() => navigate(it.route ?? '/')}
            aria-label={it.name}
            className={`px-3 py-2 rounded-sm font-medium text-sm bg-white text-blue-700 hover:shadow-sm transition`} 
            title={it.name}
          >
            {it.icon ? (<span className="mr-2">{it.icon}</span>) : null}
            {it.name}
          </button>
        ))}
        {rest.length > 0 && (
          <select
            aria-label="More industries"
            onChange={(e) => {
              const id = e.target.value
              const sel = industries.find((x) => x.id === id)
              if (sel && sel.route) navigate(sel.route)
            }}
            className="px-3 py-2 rounded-sm bg-white text-blue-700 font-medium"
            defaultValue=""
          >
            <option value="" disabled>More industries...</option>
            {rest.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}

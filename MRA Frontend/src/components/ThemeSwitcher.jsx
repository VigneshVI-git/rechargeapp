import { useEffect, useState } from 'react'
import { Palette } from 'lucide-react'

const palettes = [
  {
    name: 'Blue / Purple',
    primaryDark: '#1e3a8a',
    start: '#3b82f6',
    end: '#8b5cf6',
    surface: '#f8fafc',
    text: '#0f172a',
  },
  {
    name: 'Emerald / Teal',
    primaryDark: '#065f46',
    start: '#34d399',
    end: '#06b6d4',
    surface: '#f0fdf4',
    text: '#064e3b',
  },
  {
    name: 'Sunset',
    primaryDark: '#9a3412',
    start: '#f97316',
    end: '#ec4899',
    surface: '#fff7ed',
    text: '#3f1f0a',
  },
  {
    name: 'Indigo / Rose',
    primaryDark: '#312e81',
    start: '#6366f1',
    end: '#f472b6',
    surface: '#eef2ff',
    text: '#1f2937',
  },
]

const applyPalette = (p) => {
  const root = document.documentElement
  root.style.setProperty('--primary-dark', p.primaryDark)
  root.style.setProperty('--primary-start', p.start)
  root.style.setProperty('--primary-end', p.end)
  root.style.setProperty('--surface', p.surface)
  root.style.setProperty('--text-primary', p.text)
}

const ThemeSwitcher = () => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(palettes[0].name)

  useEffect(() => {
    const stored = localStorage.getItem('mra-theme')
    if (stored) {
      const found = palettes.find(p => p.name === stored)
      if (found) {
        setActive(found.name)
        applyPalette(found)
      }
    } else {
      applyPalette(palettes[0])
    }
  }, [])

  const handleSelect = (p) => {
    setActive(p.name)
    applyPalette(p)
    localStorage.setItem('mra-theme', p.name)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center space-x-2 bg-white text-primary-dark px-3 py-2 rounded-lg font-semibold shadow hover:shadow-md transition"
      >
        <Palette className="w-4 h-4" />
        <span className="hidden md:inline">Theme</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
          <div className="p-2 space-y-2">
            {palettes.map((p) => (
              <button
                key={p.name}
                onClick={() => handleSelect(p)}
                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition ${
                  active === p.name ? 'bg-gray-100 border border-gray-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 text-sm">{p.name}</span>
                  <span
                    className="w-10 h-6 rounded-full border"
                    style={{ background: `linear-gradient(90deg, ${p.start}, ${p.end})` }}
                  ></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeSwitcher


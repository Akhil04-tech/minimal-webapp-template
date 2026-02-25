'use client'

import { useState, useEffect } from 'react'

interface Item {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

export default function StorageManager() {
  const [items, setItems] = useState<Item[]>([])
  const [input, setInput] = useState('')
  const STORAGE_KEY = 'app_items'

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse stored items:', e)
      }
    }
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = () => {
    if (!input.trim()) return

    const newItem: Item = {
      id: Date.now().toString(),
      text: input,
      completed: false,
      createdAt: new Date().toLocaleString(),
    }

    setItems([...items, newItem])
    setInput('')
  }

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const clearAll = () => {
    if (confirm('Clear all items? This cannot be undone.')) {
      setItems([])
    }
  }

  return (
    <div className="bg-blue-700 p-8 rounded-lg shadow-lg">
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
          placeholder="Add a new item..."
          className="flex-1 px-4 py-2 rounded bg-blue-600 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addItem}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded font-semibold transition"
        >
          Add
        </button>
      </div>

      <div className="space-y-2 mb-6">
        {items.length === 0 ? (
          <p className="text-blue-200 text-center py-8">No items yet. Add one to get started!</p>
        ) : (
          items.map(item => (
            <div
              key={item.id}
              className="bg-blue-600 p-3 rounded flex items-center gap-3 hover:bg-blue-500 transition"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
                className="w-5 h-5 cursor-pointer"
              />
              <div className="flex-1">
                <p className={`${item.completed ? 'line-through text-blue-300' : 'text-white'}`}>
                  {item.text}
                </p>
                <p className="text-xs text-blue-200">{item.createdAt}</p>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-400 text-white rounded text-sm transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="text-right">
        <button
          onClick={clearAll}
          disabled={items.length === 0}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-500 text-white rounded font-semibold transition"
        >
          Clear All
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-600 rounded text-sm text-blue-100">
        <p>📊 Total Items: <strong>{items.length}</strong></p>
        <p>✅ Completed: <strong>{items.filter(i => i.completed).length}</strong></p>
      </div>
    </div>
  )
}

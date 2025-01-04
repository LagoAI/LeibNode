'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface Column<T> {
  key: keyof T
  label: string
  render?: (value: T[keyof T], item: T) => ReactNode
}

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
}

export default function ResponsiveTable<T>({ data, columns, className = '' }: ResponsiveTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      {/* Desktop View */}
      <table className="hidden md:table w-full">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800">
            {columns.map((column) => (
              <th
                key={column.key as string}
                className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
              {columns.map((column) => (
                <td
                  key={column.key as string}
                  className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300"
                >
                  {column.render
                    ? column.render(item[column.key], item)
                    : item[column.key] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleRow(index)}
              className="w-full px-4 py-3 flex items-center justify-between"
            >
              <span className="font-medium text-slate-900 dark:text-white">
                {item[columns[0].key] as ReactNode}
              </span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${
                  expandedRows.has(index) ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedRows.has(index) && (
              <div className="px-4 pb-4 space-y-2">
                {columns.slice(1).map((column) => (
                  <div key={column.key as string}>
                    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {column.label}
                    </dt>
                    <dd className="mt-1 text-sm text-slate-900 dark:text-white">
                      {column.render
                        ? column.render(item[column.key], item)
                        : item[column.key] as ReactNode}
                    </dd>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 
'use client'

import React, { useState, useMemo } from 'react'
import { SelectFieldClientComponent } from 'payload'
import { useField } from '@payloadcms/ui'
import { FieldLabel } from '@payloadcms/ui'

// Import icons exactly from the definitions
import { lucideIcons, LucideIconName } from '@/utilities/lucideIcons'
import './index.scss'

export const IconPickerField: SelectFieldClientComponent = ({ field, path, readOnly }) => {
  const { value, setValue } = useField<string>({ path })
  const [searchTerm, setSearchTerm] = useState('')

  const handleSelect = (iconName: string) => {
    if (readOnly) return
    setValue(iconName)
  }

  const filteredIcons = useMemo(() => {
    const keys = Object.keys(lucideIcons) as LucideIconName[]
    if (!searchTerm) return keys
    return keys.filter((key) => key.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm])

  return (
    <div className="custom-icon-picker">
      <label className="field-label" style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--theme-elevation-400)' }}>
        {typeof field.label === 'string' ? field.label : 'Icon'}
      </label>
      <div className="icon-picker-controls">
        <input
          type="text"
          className="icon-search-input"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={readOnly}
        />
        {value && (
          <button
            type="button"
            className="clear-icon-btn"
            onClick={() => handleSelect('')}
            disabled={readOnly}
          >
            Clear Selected
          </button>
        )}
      </div>

      <div className="icon-grid">
        <button
          type="button"
          className={`icon-item empty-state ${value === '' || !value ? 'selected' : ''}`}
          onClick={() => handleSelect('')}
          disabled={readOnly}
          title="No Icon"
        >
          <span className="empty-text">None</span>
        </button>

        {filteredIcons.map((iconName) => {
          const IconComponent = lucideIcons[iconName]
          const isSelected = value === iconName

          return (
            <button
              key={iconName}
              type="button"
              className={`icon-item ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(iconName)}
              disabled={readOnly}
              title={iconName}
            >
              <IconComponent size={20} strokeWidth={2} />
              <span className="icon-name">{iconName}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

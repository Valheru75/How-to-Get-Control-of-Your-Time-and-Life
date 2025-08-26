import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mobile-friendly utilities
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function getViewportSize() {
  if (typeof window === 'undefined') return { width: 0, height: 0 }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

// Format utilities for React Native Web compatibility
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  })
}

export function formatTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
}

// Priority utilities
export function getPriorityColor(priority: 'A' | 'B' | 'C'): string {
  switch (priority) {
    case 'A':
      return 'text-red-600 bg-red-50 border-red-200'
    case 'B':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'C':
      return 'text-green-600 bg-green-50 border-green-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

export function getPriorityLabel(priority: 'A' | 'B' | 'C'): string {
  switch (priority) {
    case 'A':
      return 'High Priority'
    case 'B':
      return 'Medium Priority'
    case 'C':
      return 'Low Priority'
    default:
      return 'Unknown Priority'
  }
}

// Goal type utilities
export function getGoalTypeLabel(type: string): string {
  switch (type) {
    case 'LIFE':
      return 'Life Goal'
    case 'THREE_YEAR':
      return '3-Year Goal'
    case 'ANNUAL':
      return 'Annual Goal'
    case 'QUARTERLY':
      return 'Quarterly Goal'
    default:
      return 'Goal'
  }
}

// Progress calculation
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

// Week calculation utilities
export function getWeekStart(date: Date = new Date()): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  return new Date(d.setDate(diff))
}

export function getWeekEnd(date: Date = new Date()): Date {
  const weekStart = getWeekStart(date)
  return new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000)
}

export function formatWeekRange(startDate: Date, endDate: Date): string {
  const start = formatDate(startDate, { month: 'short', day: 'numeric' })
  const end = formatDate(endDate, { month: 'short', day: 'numeric' })
  return `${start} - ${end}`
}

// Debounce utility for search
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
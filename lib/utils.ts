export function sanitiseArticleText(text: string): { valid: boolean; error?: string } {
  const trimmed = text.trim()

  if (trimmed.length < 100) {
    return {
      valid: false,
      error: 'Article text is too short. Please paste more of the article (minimum 100 characters).',
    }
  }

  if (trimmed.length > 8000) {
    return {
      valid: false,
      error: 'Article text is too long. Please paste the first portion of the article only (maximum 8000 characters).',
    }
  }

  return { valid: true }
}

export function formatPublishedAt(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMins = Math.floor(diffMs / (1000 * 60))

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}
export function getSafeUrl(url: string): string {
  const value = url.trim()

  if (!value) return ''

  if (
    value.startsWith('https://') ||
    value.startsWith('http://') ||
    value.startsWith('mailto:')
  ) {
    return value
  }

  return `https://${value}`
}

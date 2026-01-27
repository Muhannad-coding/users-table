export function visiblePagesFun(totalPages, currentPage) {
  const total = totalPages
  const current = currentPage
  const delta = 1 // how many pages before and after current

  const pages = []

  const start = Math.max(2, current - delta)
  const end = Math.min(total - 1, current + delta)

  pages.push(1)

  if (start > 2) {
    pages.push('...')
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < total - 1) {
    pages.push('...')
  }

  if (total > 1) {
    pages.push(total)
  }

  return pages
}

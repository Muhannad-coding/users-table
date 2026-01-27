// src/utils/initFormQuery.js
// Initializes filters, sorting, and pagination state from a query object

export function initFormQuery({ query, filters, sort, currentPage, pageSize }) {
  filters.value.name = query.name ?? ''
  filters.value.address = query.address ?? ''
  filters.value.phone = query.phone ?? ''

  sort.value.key = query.sortKey ?? null
  sort.value.direction = query.sortDir ?? 'asc'

  currentPage.value = query.page ? Number(query.page) : 1
  pageSize.value = query.pageSize ? Number(query.pageSize) : 10
}

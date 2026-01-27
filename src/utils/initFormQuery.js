export function initFormQuery({ query, filters, sort, currentPage, pageSize }) {
  // filters
  filters.value.name = query.name ?? ''
  filters.value.address = query.address ?? ''
  filters.value.phone = query.phone ?? ''

  // sorting
  sort.value.key = query.sortKey ?? null
  sort.value.direction = query.sortDir ?? 'asc'

  // pagination
  currentPage.value = query.page ? Number(query.page) : 1
  pageSize.value = query.pageSize ? Number(query.pageSize) : 10
}

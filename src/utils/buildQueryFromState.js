// src/utils/buildQueryFromState.js
// Builds a query object from the current state of filters, sorting, and pagination

export function buildQueryFromState({ filters, sort, currentPage, pageSize }) {
  return {
    name: filters.value.name || undefined,
    address: filters.value.address || undefined,
    phone: filters.value.phone || undefined,

    sortKey: sort.value.key || undefined,
    sortDir: sort.value.direction || undefined,

    page: currentPage.value !== 1 ? currentPage.value : undefined,
    pageSize: pageSize.value !== 10 ? pageSize.value : undefined,
  }
}

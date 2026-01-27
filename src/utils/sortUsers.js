// src/utils/sortUsers.js
// Sorts users based on a specified key and direction

export function sortUsers(users, sort) {
  const data = [...users]

  if (!sort.key) return data

  return data.sort((a, b) => {
    let result = 0

    if (sort.key === 'date') {
      result = a.registrationTimestamp - b.registrationTimestamp
    }

    if (sort.key === 'name') {
      result = a.name.localeCompare(b.name)

      if (result === 0) {
        result = a.registrationTimestamp - b.registrationTimestamp
      }
    }

    return sort.direction === 'asc' ? result : -result
  })
}

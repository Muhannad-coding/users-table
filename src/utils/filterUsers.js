// src/utils/filterUsers.js
// Filters users based on name, phone, and address

export function filterUsers(users, filters) {
  return users.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(filters.name.toLowerCase())

    const phoneMatch = user.phone.toLowerCase().includes(filters.phone.toLowerCase())

    const addressMatch = user.address.toLowerCase().includes(filters.address.toLowerCase())

    return nameMatch && phoneMatch && addressMatch
  })
}

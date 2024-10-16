'use client'

import { useState } from 'react'
import AsyncSelect from 'react-select/async'
import { searchUsers } from '@/app/actions/actions'
import { UserCard } from './user-card'
import { User } from '@/app/actions/schemas'

// Option type remains the same
interface Option {
  value: string
  label: string
  user: User
}

export default function UserSearch() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    const users = await searchUsers(inputValue)
    return users.map(user => ({ value: user.id, label: user.name, user }))
  }

  const handleChange = (option: Option | null) => {
    setSelectedUser(option ? option.user : null)
  }

  // Function to update the selectedUser data after saving
  const handleSave = (id: string, newUserData: Partial<User>) => {
    if(selectedUser && selectedUser.id === id){
      setSelectedUser({ ...selectedUser, ...newUserData})
    }
  }

  return (
    <div className="space-y-6">
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        placeholder="Search for a user..."
        className="w-full max-w-md mx-auto"
      />
      {/* {selectedUser && <UserCard user={selectedUser} onSave={handleSave} />} */}
      {selectedUser && <UserCard user={selectedUser} />}
    </div>
  )
}

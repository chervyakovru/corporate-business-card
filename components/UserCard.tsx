import Image from 'next/image'

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="flex items-center">
        <Image
          src={user.avatar}
          alt={user.name}
          width={64}
          height={64}
          className="rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-500">This is an existing user in our system.</p>
    </div>
  )
}


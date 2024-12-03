import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import UserCard from '@/components/UserCard'
import NewUserRequestForm from '@/components/NewUserRequestForm'

async function getUser(id: string) {
  const res = await fetch(`http://localhost:3000/api/users/${id}`)
  if (!res.ok) return undefined
  return res.json()
}

export default async function CardPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id)

  if (!user) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <UserCard user={user} />
      </Suspense>
      <NewUserRequestForm />
    </div>
  )
}


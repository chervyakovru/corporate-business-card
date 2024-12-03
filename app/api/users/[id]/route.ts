import { NextResponse } from 'next/server'

const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', avatar: '/placeholder.svg?height=64&width=64' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '/placeholder.svg?height=64&width=64' },
]

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = users.find(u => u.id === params.id)

  if (!user) {
    return new NextResponse('User not found', { status: 404 })
  }

  return NextResponse.json(user)
}


'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createNewUserRequest } from '@/app/actions'

export default function NewUserRequestForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const result = await createNewUserRequest(formData)
    if (result.success) {
      setMessage('New user request submitted successfully!')
      setIsError(false)
      setIsOpen(false)
      router.refresh()
    } else {
      setMessage('Failed to submit request. Please try again.')
      setIsError(true)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Request New User
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" role="dialog" aria-modal="true">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">New User Request</h3>
              <form className="mt-2 px-7 py-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="mb-3 px-3 py-2 border rounded-lg w-full"
                  aria-label="Full Name"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="mb-3 px-3 py-2 border rounded-lg w-full"
                  aria-label="Email"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Submit Request
                </button>
              </form>
              {message && (
                <p className={`text-sm ${isError ? 'text-red-500' : 'text-green-500'}`} aria-live="polite">
                  {message}
                </p>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}


'use server'

import { revalidatePath } from 'next/cache'
import { getTransporter } from '@/lib/emailConfig'

export async function createNewUserRequest(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  console.log('New user request:', { name, email })

  try {
    const transporter = getTransporter()
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'New User Request',
      text: `
        A new user request has been submitted:
        
        Name: ${name}
        Email: ${email}
      `,
      html: `
        <h1>New User Request</h1>
        <p>A new user request has been submitted:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
      `,
    })

    revalidatePath('/card/[id]')

    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false }
  }
}


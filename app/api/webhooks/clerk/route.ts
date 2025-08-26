import { NextRequest, NextResponse } from 'next/server'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.text()
  const body = JSON.parse(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    try {
      const { id, email_addresses, first_name, last_name, image_url, phone_numbers } = evt.data

      // Create user in database
      await prisma.user.create({
        data: {
          id: id,
          clerkId: id,
          email: email_addresses[0]?.email_address || '',
          firstName: first_name || '',
          lastName: last_name || '',
          avatar: image_url || '',
          phone: phone_numbers[0]?.phone_number || '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })

      console.log('User created in database:', id)
    } catch (error) {
      console.error('Error creating user:', error)
      return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
    }
  }

  if (eventType === 'user.updated') {
    try {
      const { id, email_addresses, first_name, last_name, image_url, phone_numbers } = evt.data

      // Update user in database
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: email_addresses[0]?.email_address || '',
          firstName: first_name || '',
          lastName: last_name || '',
          avatar: image_url || '',
          phone: phone_numbers[0]?.phone_number || '',
          updatedAt: new Date(),
        },
      })

      console.log('User updated in database:', id)
    } catch (error) {
      console.error('Error updating user:', error)
      return NextResponse.json({ error: 'Error updating user' }, { status: 500 })
    }
  }

  if (eventType === 'user.deleted') {
    try {
      const { id } = evt.data

      // Soft delete user
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          isActive: false,
          updatedAt: new Date(),
        },
      })

      console.log('User deactivated in database:', id)
    } catch (error) {
      console.error('Error deleting user:', error)
      return NextResponse.json({ error: 'Error deleting user' }, { status: 500 })
    }
  }

  return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 })
}

export async function GET() {
  return NextResponse.json({ message: 'Clerk webhook endpoint is working' }, { status: 200 })
}

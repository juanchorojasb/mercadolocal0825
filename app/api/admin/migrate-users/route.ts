import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    console.log('Starting user migration...')
    
    const users = await clerkClient.users.getUserList({ limit: 500 })
    console.log(`Found ${users.length} users to migrate`)
    
    let migrated = 0
    for (const user of users) {
      try {
        await prisma.user.upsert({
          where: { clerkId: user.id },
          update: {
            email: user.emailAddresses[0]?.emailAddress || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            avatar: user.imageUrl || '',
            updatedAt: new Date()
          },
          create: {
            id: user.id,
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            avatar: user.imageUrl || '',
            createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
            updatedAt: new Date()
          }
        })
        migrated++
        console.log(`Migrated user: ${user.emailAddresses[0]?.emailAddress}`)
      } catch (userError) {
        console.error(`Failed to migrate user ${user.id}:`, userError)
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully migrated ${migrated} of ${users.length} users` 
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({ 
      error: 'Migration failed', 
      details: error.message 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Migration endpoint ready' })
}

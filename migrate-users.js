const { PrismaClient } = require('@prisma/client')
const { createClerkClient } = require('@clerk/nextjs/server')

const prisma = new PrismaClient()

// Use your Clerk secret key from .env.local
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
})

async function migrateUsers() {
  try {
    console.log('Fetching users from Clerk...')
    const users = await clerkClient.users.getUserList({ limit: 500 })
    console.log(`Found ${users.data.length} users to migrate`)
    
    let migrated = 0
    for (const user of users.data) {
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
        console.log(`✓ Migrated: ${user.emailAddresses[0]?.emailAddress}`)
      } catch (userError) {
        console.error(`✗ Failed to migrate user ${user.id}:`, userError.message)
      }
    }
    
    console.log(`\nMigration complete: ${migrated}/${users.data.length} users migrated`)
    
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateUsers()

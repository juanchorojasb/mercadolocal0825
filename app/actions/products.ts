'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function createProduct(formData: FormData) {
  try {
    const { userId } = await auth()

    if (!userId) {
      redirect('/sign-in')
    }

    // Buscar usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    // Extraer datos del formulario
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const category = formData.get('category') as string
    const images = formData.getAll('images') as string[]

    // Buscar o crear tienda del usuario
    let userStore = await prisma.store.findFirst({
      where: { ownerId: user.id }
    })

    // Si no tiene tienda, crear una por defecto
    if (!userStore) {
      userStore = await prisma.store.create({
        data: {
          name: `Tienda de ${user.firstName}`,
          slug: `tienda-${(user.firstName || 'usuario').toLowerCase()}-${user.id.slice(-6)}`,
          ownerId: user.id,
          isActive: true,
          isVerified: false
        }
      })
    }

    // Generar slug para el producto
    const productSlug = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .slice(0, 50) // limitar longitud

    // Crear el producto asociado a la tienda
    const product = await prisma.product.create({
      data: {
        storeId: userStore.id,
        name,
        slug: productSlug,
        description,
        price,
        category,
        images: images,
        isActive: true
      }
    })

    revalidatePath('/vendedor/productos')
    return { success: true, product }
  } catch (error) {
    console.error('Error creating product:', error)
    return { success: false, error: 'Error al crear el producto' }
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  try {
    const { userId } = await auth()

    if (!userId) {
      redirect('/sign-in')
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    // Verificar que el producto pertenece al usuario
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        store: {
          ownerId: user.id
        }
      }
    })

    if (!existingProduct) {
      throw new Error('Producto no encontrado o no tienes permisos')
    }

    // Extraer datos del formulario
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const category = formData.get('category') as string
    const images = formData.getAll('images') as string[]

    // Generar nuevo slug si el nombre cambió
    const productSlug = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .slice(0, 50)

    // Actualizar producto
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        slug: productSlug,
        description,
        price,
        category,
        images: images
      }
    })

    revalidatePath('/vendedor/productos')
    return { success: true, product }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: 'Error al actualizar el producto' }
  }
}

export async function deleteProduct(productId: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      redirect('/sign-in')
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    // Verificar que el producto pertenece al usuario
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        store: {
          ownerId: user.id
        }
      }
    })

    if (!existingProduct) {
      throw new Error('Producto no encontrado o no tienes permisos')
    }

    // Eliminar producto
    await prisma.product.delete({
      where: { id: productId }
    })

    revalidatePath('/vendedor/productos')
    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: 'Error al eliminar el producto' }
  }
}

export async function toggleProductStatus(productId: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      redirect('/sign-in')
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    // Buscar producto
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        store: {
          ownerId: user.id
        }
      }
    })

    if (!existingProduct) {
      throw new Error('Producto no encontrado o no tienes permisos')
    }

    // Toggle status - CORREGIDO: usar isActive en lugar de isAvailable
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        isActive: !existingProduct.isActive
      }
    })

    revalidatePath('/vendedor/productos')
    return { success: true, product }
  } catch (error) {
    console.error('Error toggling product status:', error)
    return { success: false, error: 'Error al cambiar estado del producto' }
  }
}

export async function getUserProducts() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { success: false, products: [] }
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return { success: false, products: [] }
    }

    // Obtener productos del usuario
    const products = await prisma.product.findMany({
      where: {
        store: {
          ownerId: user.id
        }
      },
      include: {
        store: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { success: true, products }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { success: false, products: [] }
  }
}

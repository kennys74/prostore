'use server';
import { PrismaClient } from '@prisma/client';
import { convertToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';

// Get latest products
export async function getLatestProducts() {
    const prisma = new PrismaClient();
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc' },
    });

    const updatedProducts = data.map(product => ({
        ...product,
        price: product.price?.toString() ?? null,
        rating: product.rating?.toString() ?? null,
    }));

    return convertToPlainObject(updatedProducts);
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
    const prisma = new PrismaClient();
    return await prisma.product.findFirst({
        where: { slug: slug },
    });
}
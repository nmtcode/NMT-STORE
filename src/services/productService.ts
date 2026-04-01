// src/services/productService.ts
import apiClient from "../api/apiClient";
import type { DummyProductDTO, DummyResponse, Product } from "../types/product";


export const productService = {
  // جلب الكل مع الـ Mapping
  getProducts: async (): Promise<Product[]> => {
    const { data } = await apiClient.get<DummyResponse>("/products");

    return data.products.map(
      (p: DummyProductDTO): Product => ({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.thumbnail,
        rating: {
          rate: p.rating,
          count: p.reviews.length, // استخراج العدد من طول المصفوفة
        },
      }),
    );
  },

  // جلب منتج واحد
  getProductById: async (id: number | string): Promise<Product> => {
    const { data } = await apiClient.get<DummyProductDTO>(`/products/${id}`);

    return {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.thumbnail,
      rating: {
        rate: data.rating,
        count: data.reviews.length,
      },
    };
  },
};

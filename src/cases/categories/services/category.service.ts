
import { api } from "@/lib/axios";
import type { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from "../dtos/categories.dto";


export const categoryService = {
  listAll: async (): Promise<CategoryDTO[]> => {
    const response = await api.get<CategoryDTO[]>("/categories");

    return response.data;
  },

  create: async (data: CreateCategoryDTO): Promise<CategoryDTO> => {
    const response = await api.post<CategoryDTO>("/categories", data);

    return response.data;
  },

  update: async (
    id: string,
    data: UpdateCategoryDTO
  ): Promise<CategoryDTO> => {
    const response = await api.patch<CategoryDTO>(
      `/categories/${id}`,
      data
    );

    return response.data;
  },
};

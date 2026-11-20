
import {useQuery, useMutation, useQueryClient,} from "@tanstack/react-query";
import { categoryService } from "../services/category.service";
import type { UpdateCategoryDTO } from "../dtos/categories.dto";


export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.listAll,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: {
      id: string;
      data: UpdateCategoryDTO;
    }) => categoryService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

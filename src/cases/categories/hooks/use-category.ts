
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { categoryService } from "../services/category.service";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.listAll,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({mutationFn: categoryService.create, onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

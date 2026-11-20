
import { useCategories, useDeleteCategory } from "../hooks/use-category";
import type { CategoryDTO } from "../dtos/category.dto";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CategoryListProps {
  onEdit: (category: CategoryDTO) => void;
}

export function CategoryList({ onEdit }: CategoryListProps) {
  const { data: categories = [], isLoading, isError } = useCategories();

  const deleteCategory = useDeleteCategory();

  function handleDelete(id: string) {
    if (confirm("Deseja realmente excluir esta categoria?")) {
      deleteCategory.mutate(id);
    }
  }

  if (isLoading) {
    return <p>Carregando categorias...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar categorias.</p>;
  }

  if (categories.length === 0) {
    return <p>Nenhuma categoria cadastrada.</p>;
  }

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Ícone</TableHead>
            <TableHead>Situação</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">
                {category.name}
              </TableCell>

              <TableCell>
                {category.icon ?? "-"}
              </TableCell>

              <TableCell>
                <Badge variant={category.active ? "default" : "secondary"}>
                  {category.active ? "Ativa" : "Inativa"}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(category)}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={deleteCategory.isPending}
                    onClick={() => handleDelete(category.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {deleteCategory.isError && (
        <p className="p-4 text-sm text-red-500">
          Erro ao excluir categoria.
        </p>
      )}
    </div>
  );
}

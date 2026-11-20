
import { useCategories } from "../hooks/use-category";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CategoryList() {
  const { data: categories = [], isLoading, isError } = useCategories();

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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {useCreateCategory,useUpdateCategory,} from "../hooks/use-category";
import type { CategoryDTO } from "../dtos/categories.dto";

interface CategoryFormProps {
  category?: CategoryDTO;
  onCancel?: () => void;
}

export function CategoryForm({
  category,
  onCancel,
}: CategoryFormProps) {
  const [name, setName] = useState(category?.name ?? "");
  const [icon, setIcon] = useState(category?.icon ?? "");
  const [active, setActive] = useState(category?.active ?? true);

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const isEditing = !!category;

  const isPending =
    createCategory.isPending || updateCategory.isPending;

  const isError =
    createCategory.isError || updateCategory.isError;

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) return;

    const data = {
      name: name.trim(),
      icon: icon.trim() || undefined,
      active,
    };

    if (category) {
      updateCategory.mutate(
        {
          id: category.id,
          data,
        },
        {
          onSuccess: () => {
            onCancel?.();
          },
        }
      );
    } else {
      createCategory.mutate(data, {
        onSuccess: () => {
          setName("");
          setIcon("");
          setActive(true);
        },
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da categoria</Label>

        <Input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Informe o nome"
          maxLength={60}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon">URL do ícone</Label>

        <Input
          id="icon"
          type="url"
          value={icon}
          onChange={(event) => setIcon(event.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="active"
          checked={active}
          onCheckedChange={(checked) => setActive(checked === true)}
        />

        <Label htmlFor="active">Categoria ativa</Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Salvando..."
            : isEditing
              ? "Salvar alterações"
              : "Cadastrar"}
        </Button>

        {isEditing && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancelar
          </Button>
        )}
      </div>

      {isError && (
        <p className="text-sm text-red-500">
          Erro ao salvar categoria.
        </p>
      )}
    </form>
  );
}
